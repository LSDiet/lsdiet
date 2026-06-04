// Fetches the dynamic blog sitemap from the Supabase edge function and writes
// it to public/blog-sitemap.xml so it ships under the project domain
// (https://lsdiet.com/blog-sitemap.xml) instead of a supabase.co host.

import { writeFileSync } from "fs";
import { resolve } from "path";

const SOURCE_URL =
  "https://joohccchfpcshlihctsm.supabase.co/functions/v1/blog-sitemap";
const OUTPUT_PATH = resolve("public/blog-sitemap.xml");

async function main() {
  try {
    const res = await fetch(SOURCE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    if (!xml.includes("<urlset")) throw new Error("Unexpected response shape");
    writeFileSync(OUTPUT_PATH, xml);
    const count = (xml.match(/<url>/g) || []).length;

    // Surface the merge breakdown from the edge function's response headers
    // so the build log makes Contentful coverage obvious.
    const foundations = res.headers.get("x-sitemap-foundations") ?? "?";
    const articles = res.headers.get("x-sitemap-articles") ?? "?";
    const contentful = res.headers.get("x-sitemap-contentful") ?? "?";
    const categories = res.headers.get("x-sitemap-categories") ?? "?";

    console.log(
      `blog-sitemap.xml written (${count} entries — foundations=${foundations}, contentful=${contentful}, articles=${articles}, categories=${categories})`,
    );

    if (contentful === "0") {
      console.warn(
        "\n⚠️  [generate-blog-sitemap] Contentful returned 0 entries.\n" +
          "    Live blog posts will NOT be in the sitemap and will NOT be prerendered.\n" +
          "    Check CONTENTFUL_API_KEY / CONTENTFUL_SPACE_ID secrets and the blog-sitemap edge function logs.\n",
      );
    }
  } catch (err) {
    console.warn(
      `[generate-blog-sitemap] Skipped: ${(err as Error).message}. Keeping existing public/blog-sitemap.xml if present.`,
    );
  }
}

main();
