/**
 * Build-time static prerender for entity-defining SEO pages.
 *
 * Boots a static server over dist/, launches headless Chromium, navigates each
 * route, waits for `document.documentElement.dataset.rendered === "true"`, and
 * writes the serialized HTML to dist/<route>/index.html.
 *
 * Phase 1 routes are intentionally narrow — only pages that reinforce the
 * LS Diet semantic identity (weight regain prevention, behavioural permanence,
 * Weight Permanence Training). Supporting mechanism content (GLP-1, food
 * guides) stays SPA-rendered.
 */
import { createServer } from "node:http";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sirv from "sirv";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = 4319;

// Routes are derived from the sitemaps so prerender always matches what
// crawlers see. This ensures every public URL ships unique <title> and
// <meta name="description"> in static HTML (no shared index.html fallback
// description, no duplicate-meta SEO issues).
const PUBLIC_DIR = resolve(__dirname, "..", "public");

function extractLocs(xml) {
  const out = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

async function loadRoutes() {
  const files = ["sitemap-pages.xml", "blog-sitemap.xml"];
  const routes = new Set();
  for (const f of files) {
    try {
      const xml = await readFile(join(PUBLIC_DIR, f), "utf8");
      for (const loc of extractLocs(xml)) {
        const u = new URL(loc);
        const path = u.pathname || "/";
        // Skip non-prerenderable / external / asset routes.
        if (path.includes(".")) continue;
        routes.add(path === "" ? "/" : path);
      }
    } catch (err) {
      console.warn(`[prerender] could not read ${f}: ${err.message}`);
    }
  }
  if (!routes.has("/")) routes.add("/");
  return [...routes];
}

const READY_TIMEOUT_MS = 20_000;
const MOUNT_TIMEOUT_MS = 15_000;
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY ?? 4);

// Hosts/resourceTypes we block during prerender to cut wall time. These
// have zero impact on the static HTML payload (Helmet/meta/JSON-LD all
// resolve from the JS bundle alone) but a large impact on Chromium time.
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "googletagservices.com",
  "doubleclick.net",
  "youtube.com",
  "youtu.be",
  "skool.com",
];
const BLOCKED_RESOURCE_TYPES = new Set([
  "image",
  "media",
  "font",
  "stylesheet",
]);

function startServer(baselineIndexHtml) {
  // Serve hashed assets from disk, but always serve the in-memory baseline
  // index.html as the SPA fallback. This prevents a race where the `/` route's
  // prerender output overwrites dist/index.html while concurrent workers are
  // still loading other routes, which produced empty `#root` responses and the
  // `Cannot read properties of null (reading 'hasChildNodes')` crash.
  const assets = sirv(DIST, {
    single: false,
    dev: false,
    etag: false,
    maxAge: 0,
  });
  return new Promise((res) => {
    const server = createServer((req, r) => {
      assets(req, r, () => {
        r.statusCode = 200;
        r.setHeader("Content-Type", "text/html; charset=utf-8");
        r.setHeader("Cache-Control", "no-store");
        r.end(baselineIndexHtml);
      });
    });
    server.listen(PORT, () => res(server));
  });
}

async function prerenderRoute(browser, route, baselineTitle) {
  const page = await browser.newPage();
  const routeLogs = [];
  const gateLogs = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (text.startsWith("[PrerenderReady]")) {
      gateLogs.push(text);
    } else if (msg.type() === "error" || msg.type() === "warning") {
      routeLogs.push(`[console.${msg.type()}] ${text}`);
    }
  });
  page.on("pageerror", (err) => {
    routeLogs.push(`[pageerror] ${err.message}`);
  });
  page.on("requestfailed", (req) => {
    const failure = req.failure();
    routeLogs.push(
      `[requestfailed] ${req.url()} ${failure ? failure.errorText : "unknown"}`,
    );
  });

  try {
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    // Block requests that don't affect the rendered HTML payload.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      const url = req.url();
      if (BLOCKED_RESOURCE_TYPES.has(type)) return req.abort();
      if (BLOCKED_HOSTS.some((h) => url.includes(h))) return req.abort();
      req.continue();
    });

    const url = `http://127.0.0.1:${PORT}${route}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: READY_TIMEOUT_MS });
    try {
      await page.waitForSelector("#root > *", { timeout: MOUNT_TIMEOUT_MS });
    } catch (waitErr) {
      const errs = routeLogs.slice(-10).join("\n      ") || "(no page errors)";
      const snapshot = await page
        .evaluate(() => {
          const root = document.getElementById("root");
          return {
            url: location.href,
            readyState: document.readyState,
            rootChildren: root ? root.childElementCount : -1,
            bodyLen: document.body ? document.body.innerHTML.length : 0,
            title: document.title,
          };
        })
        .catch((e) => ({ snapshotError: e.message }));
      throw new Error(
        `mount timeout (#root > *): ${waitErr.message}\n      snapshot: ${JSON.stringify(snapshot)}\n      page diagnostics:\n      ${errs}`,
      );
    }
    try {
      await page.waitForFunction(
        () => document.documentElement.dataset.rendered === "true",
        { timeout: READY_TIMEOUT_MS },
      );
    } catch (waitErr) {
      const tail = gateLogs.slice(-6).join("\n      ") || "(no gate logs)";
      const errs = routeLogs.slice(-10).join("\n      ") || "(no page errors)";
      throw new Error(
        `${waitErr.message}\n      last gate logs:\n      ${tail}\n      page diagnostics:\n      ${errs}`,
      );
    }

    const html = await page.content();

    const hasBundle = /<script[^>]+type=["']module["'][^>]+src=/i.test(html);
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headInner = headMatch ? headMatch[1].trim() : "";
    if (!hasBundle || headInner.length < 50) {
      throw new Error(
        `prerender produced invalid HTML for ${route} ` +
          `(hasBundle=${hasBundle}, headLen=${headInner.length}). ` +
          `Refusing to overwrite dist with a blank shell.`,
      );
    }

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyInner = bodyMatch ? bodyMatch[1] : "";
    const hasRouteEl = /<main\b|<article\b/i.test(bodyInner);
    if (bodyInner.length < 500 || !hasRouteEl) {
      throw new Error(
        `prerender produced empty body for ${route} ` +
          `(bodyLen=${bodyInner.length}, hasRouteEl=${hasRouteEl}). ` +
          `Suspense fallback was likely snapshotted — refusing to ship.`,
      );
    }

    if (route !== "/" && baselineTitle) {
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const snapshotTitle = titleMatch ? titleMatch[1].trim() : "";
      if (snapshotTitle === baselineTitle) {
        throw new Error(
          `prerender produced default index.html title for ${route} ` +
            `(Helmet did not commit). Refusing to ship.`,
        );
      }
    }

    // Duplicate-tag guard: every indexable route must ship exactly one of
    // each SEO-critical head tag. react-helmet-async does not remove
    // pre-existing static meta tags from index.html — if a future change
    // reintroduces one, this assertion fails the build loudly instead of
    // silently shipping duplicate canonicals/descriptions to crawlers.
    const tagCounts = await page.evaluate(() => ({
      title: document.querySelectorAll("title").length,
      description: document.querySelectorAll('meta[name="description"]').length,
      ogTitle: document.querySelectorAll('meta[property="og:title"]').length,
      ogDescription: document.querySelectorAll('meta[property="og:description"]').length,
      canonical: document.querySelectorAll('link[rel="canonical"]').length,
    }));
    const dupes = Object.entries(tagCounts).filter(([, n]) => n !== 1);
    if (dupes.length > 0) {
      // /qa, /privacy, /terms etc. may legitimately omit og:* if they're
      // not indexed. Only canonical/title/description are strictly required.
      const strict = dupes.filter(([k]) =>
        ["title", "description", "canonical"].includes(k),
      );
      if (strict.length > 0) {
        throw new Error(
          `duplicate or missing SEO tags on ${route}: ${JSON.stringify(tagCounts)}`,
        );
      }
      // Warn-only for og:* drift.
      console.warn(
        `  ⚠ ${route} og:* tag-count drift: ${JSON.stringify(tagCounts)}`,
      );
    }

    const stamped = html.replace(
      "<html",
      `<html data-prerendered="true"`,
    );

    const outDir =
      route === "/" ? DIST : join(DIST, ...route.split("/").filter(Boolean));
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), stamped, "utf8");
    console.log(`  ✓ ${route}`);
  } finally {
    await page.close();
  }
}

async function main() {
  let baselineIndexHtml;
  try {
    baselineIndexHtml = await readFile(join(DIST, "index.html"), "utf8");
  } catch {
    throw new Error("dist/index.html not found — run `vite build` first.");
  }

  const baselineTitleMatch = baselineIndexHtml.match(
    /<title[^>]*>([\s\S]*?)<\/title>/i,
  );
  const baselineTitle = baselineTitleMatch ? baselineTitleMatch[1].trim() : "";
  if (baselineTitle) {
    console.log(`[prerender] baseline index.html title: "${baselineTitle}"`);
  }

  const ROUTES = await loadRoutes();

  // Defensive cleanup: delete any pre-existing per-route index.html
  // (from a previous deploy) so a failed safety net cannot silently
  // continue serving a stale stamped snapshot. The root dist/index.html
  // is the SPA fallback and is intentionally preserved.
  for (const route of ROUTES) {
    if (route === "/") continue;
    const dir = join(DIST, ...route.split("/").filter(Boolean));
    await rm(join(dir, "index.html"), { force: true });
  }

  console.log(`[prerender] node ${process.version}, puppeteer launching…`);
  console.log(`\nPrerendering ${ROUTES.length} routes…`);
  const server = await startServer(baselineIndexHtml);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let successCount = 0;
  let failCount = 0;
  let blogSuccessCount = 0;
  const failures = [];

  try {
    console.log(`[prerender] concurrency=${CONCURRENCY}`);
    const queue = [...ROUTES];
    const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (queue.length) {
        const route = queue.shift();
        if (!route) break;
        try {
          await prerenderRoute(browser, route, baselineTitle);
          successCount++;
          if (route.startsWith("/blog/")) blogSuccessCount++;
        } catch (err) {
          failures.push({ route, message: err.message });
          console.error(`  ✗ ${route}: ${err.message}`);
        }
      }
    });
    await Promise.all(workers);

    // Serial retry pass for failures. Most timeouts in the concurrent
    // pass are resource contention (Chromium CPU starvation, slow Helmet
    // commit under load). Retrying one-at-a-time with a fresh budget
    // recovers them without flaking the build.
    if (failures.length > 0) {
      const toRetry = failures.splice(0, failures.length);
      console.log(`\n[prerender] retrying ${toRetry.length} failed routes serially…`);
      for (const { route } of toRetry) {
        try {
          await prerenderRoute(browser, route, baselineTitle);
          successCount++;
          if (route.startsWith("/blog/")) blogSuccessCount++;
          console.log(`  ↻ ${route} (recovered on retry)`);
        } catch (err) {
          failCount++;
          failures.push({ route, message: err.message });
          console.error(`  ✗ ${route} (retry failed): ${err.message}`);
        }
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(
    `\nPrerender complete: ${successCount} succeeded (${blogSuccessCount} /blog/* routes), ${failCount} failed.\n`,
  );

  if (successCount === 0 && ROUTES.length > 0) {
    console.error(
      "✗ Prerender produced ZERO successful routes. Refusing to ship a build that has no static HTML for crawlers.",
    );
    if (failures.length > 0) {
      console.error("First failure for debugging:");
      console.error(`  ${failures[0].route}: ${failures[0].message}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
