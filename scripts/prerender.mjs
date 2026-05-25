/**
 * Build-time static prerender for entity-defining SEO pages.
 *
 * Boots a static server over dist/, launches headless Chromium, navigates each
 * route, waits for `document.documentElement.dataset.rendered === "true"`, and
 * writes the serialized HTML to dist/<route>/index.html.
 *
 * Phase 1 routes are intentionally narrow — only pages that reinforce the
 * LS Diet semantic identity (weight regain prevention, behavioural permanence,
 * Weight Permanence Triangle). Supporting mechanism content (GLP-1, food
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

const ROUTES = [
  "/",
  "/what-is-ls-diet",
  "/weight-permanence-triangle",
  "/awareness-stages",
  "/about-oscar-poon",
  "/blog",
  "/blog/why-people-regain-weight-after-dieting",
];

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

  console.log(`\nPrerendering ${ROUTES.length} routes…`);
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      try {
        await prerenderRoute(browser, route);
      } catch (err) {
        console.error(`  ✗ ${route}: ${err.message}`);
        // Don't fail the whole build for one route.
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log("Prerender complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
