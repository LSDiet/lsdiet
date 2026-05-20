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
    console.log(`blog-sitemap.xml written (${count} entries)`);
  } catch (err) {
    console.warn(
      `[generate-blog-sitemap] Skipped: ${(err as Error).message}. Keeping existing public/blog-sitemap.xml if present.`,
    );
  }
}

main();
