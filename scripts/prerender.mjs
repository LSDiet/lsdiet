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
import { mkdir, readFile, writeFile } from "node:fs/promises";
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

function startServer() {
  const handler = sirv(DIST, {
    single: true,
    dev: false,
    etag: false,
    maxAge: 0,
  });
  return new Promise((res) => {
    const server = createServer((req, r) => handler(req, r));
    server.listen(PORT, () => res(server));
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    // Mark prerender environment so the app can short-circuit animations.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    const url = `http://127.0.0.1:${PORT}${route}`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: READY_TIMEOUT_MS });
    await page.waitForFunction(
      () => document.documentElement.dataset.rendered === "true",
      { timeout: READY_TIMEOUT_MS },
    );

    // Strip script tags that are bundle entries? No — keep them so hydration
    // continues. Just serialize the full document as-is.
    const html = await page.content();

    // Safety net: a valid prerender must contain the Vite bundle script and
    // a non-empty <head>. If either is missing, the page would render as a
    // blank white screen in production. Fail the route loudly instead of
    // silently overwriting dist/<route>/index.html with a broken stub.
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

    // Mark the HTML as prerendered so main.tsx switches to hydrateRoot.
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
  try {
    await readFile(join(DIST, "index.html"));
  } catch {
    throw new Error("dist/index.html not found — run `vite build` first.");
  }

  const ROUTES = await loadRoutes();
  console.log(`\nPrerendering ${ROUTES.length} routes…`);
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let successCount = 0;
  let failCount = 0;
  let blogSuccessCount = 0;
  const failures = [];

  try {
    for (const route of ROUTES) {
      try {
        await prerenderRoute(browser, route);
        successCount++;
        if (route.startsWith("/blog/")) blogSuccessCount++;
      } catch (err) {
        failCount++;
        failures.push({ route, message: err.message });
        console.error(`  ✗ ${route}: ${err.message}`);
        // Don't fail the whole build for one route.
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
