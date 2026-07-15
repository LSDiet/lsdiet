/**
 * Build-time generator for public/just-published.json — a small, CORS-open
 * snapshot of the "Just published" grid on /blog, used by oscarpoon.ca to
 * mirror the 6 latest articles (title, hero image, date, estimated read
 * time, topic) without duplicating any article body content.
 *
 * Runs after prerender.mjs (dist/ must already be a full build). Boots a
 * static server over dist/, scrapes the rendered /blog page for the 6
 * "Just published" cards, then visits each article page to read its
 * client-computed reading time and topic breadcrumb.
 */
import { createServer } from "node:http";
import { writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sirv from "sirv";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PUBLIC_DIR = resolve(__dirname, "..", "public");
const PORT = 4321;
const TIMEOUT_MS = 20_000;
const SITE_ORIGIN = "https://lsdiet.com";

function toAbsolute(localUrl) {
  if (!localUrl) return localUrl;
  return localUrl.replace(`http://127.0.0.1:${PORT}`, SITE_ORIGIN);
}

function startServer() {
  const assets = sirv(DIST, { single: true, dev: false, etag: false, maxAge: 0 });
  return new Promise((res) => {
    const server = createServer((req, r) => assets(req, r, () => { r.statusCode = 404; r.end(); }));
    server.listen(PORT, () => res(server));
  });
}

async function scrapeJustPublished(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}/blog`, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
  await page.waitForSelector('[data-testid="just-published-card"]', { timeout: TIMEOUT_MS });

  const cards = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-testid="just-published-card"]'));
    return els.map((el) => {
      const img = el.querySelector("img");
      const h3 = el.querySelector("h3");
      const dateEl = el.querySelector("p");
      return {
        slug: el.getAttribute("data-slug") || "",
        url: el.href,
        title: h3 ? h3.textContent.trim() : "",
        image: img ? img.src : null,
        dateText: dateEl ? dateEl.textContent.trim() : "",
      };
    });
  });

  await page.close();
  return cards.slice(0, 6);
}

async function scrapeArticleMeta(browser, card) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    await page.goto(`http://127.0.0.1:${PORT}/blog/${card.slug}`, {
      waitUntil: "domcontentloaded",
      timeout: TIMEOUT_MS,
    });
    let readTimeMinutes = null;
    try {
      await page.waitForSelector('[data-testid="reading-time"]', { timeout: TIMEOUT_MS });
      const text = await page.$eval('[data-testid="reading-time"]', (el) => el.textContent || "");
      const match = text.match(/(\d+)/);
      if (match) readTimeMinutes = Number(match[1]);
    } catch {
      // Reading time is computed client-side after layout; if it never
      // shows up (e.g. article body failed to mount) we ship without it
      // rather than fail the whole build.
    }

    let topic = null;
    try {
      topic = await page.$eval('[data-testid="topic-value"]', (el) => el.textContent?.trim() || null);
    } catch {
      // Not every article has a primary foundation topic — that's fine.
    }

    let publishDateISO = null;
    try {
      publishDateISO = await page.$eval('meta[property="article:published_time"]', (el) => el.content || null);
    } catch {
      // Falls back to the short display date already scraped from /blog.
    }

    return { readTimeMinutes, topic, publishDateISO };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("[just-published] booting static server…");
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    console.log("[just-published] scraping /blog grid…");
    const cards = await scrapeJustPublished(browser);
    if (cards.length === 0) {
      throw new Error("Found zero just-published cards — refusing to ship an empty feed.");
    }

    console.log(`[just-published] found ${cards.length} cards, visiting each article…`);
    const entries = [];
    for (const card of cards) {
      const meta = await scrapeArticleMeta(browser, card);
      entries.push({
        title: card.title,
        slug: card.slug,
        url: toAbsolute(card.url),
        image: toAbsolute(card.image),
        date: meta.publishDateISO ?? card.dateText,
        readTimeMinutes: meta.readTimeMinutes,
        topic: meta.topic,
      });
      console.log(`  ✓ ${card.slug} — ${meta.readTimeMinutes ?? "?"} min, topic: ${meta.topic ?? "—"}`);
    }

    const out = {
      generatedAt: new Date().toISOString(),
      entries,
    };
    await writeFile(join(PUBLIC_DIR, "just-published.json"), JSON.stringify(out, null, 2));
    // Also write straight into dist/ since this script runs after the
    // static assets have already been copied from public/ to dist/.
    await writeFile(join(DIST, "just-published.json"), JSON.stringify(out, null, 2));
    console.log(`[just-published] wrote ${entries.length} entries to public/just-published.json`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("[just-published] failed:", err);
  process.exit(1);
});
