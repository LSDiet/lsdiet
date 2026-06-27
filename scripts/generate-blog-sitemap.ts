// Fetches the dynamic blog sitemap from the Supabase edge function and writes
// it to public/blog-sitemap.xml so it ships under the project domain
// (https://lsdiet.com/blog-sitemap.xml) instead of a supabase.co host.
//
// After fetching, scans src/content/articles/*.tsx for any locally-defined
// articles that the Supabase function does not know about (e.g. new articles
// added to the TSX source before the Supabase registry is updated) and appends
// them so the prerender step picks them up automatically.

import { writeFileSync, readdirSync } from "fs";
import { resolve } from "path";

const SOURCE_URL =
  "https://joohccchfpcshlihctsm.supabase.co/functions/v1/blog-sitemap";
const OUTPUT_PATH = resolve("public/blog-sitemap.xml");
const ARTICLES_DIR = resolve("src/content/articles");
const SITE = "https://lsdiet.com";
const SKIP_FILES = new Set(["index.ts", "index.tsx", "types.ts", "types.tsx"]);

function localArticleSlugs(): string[] {
  try {
    return readdirSync(ARTICLES_DIR)
      .filter((f) => (f.endsWith(".tsx") || f.endsWith(".ts")) && !SKIP_FILES.has(f))
      .map((f) => f.replace(/\.(tsx|ts)$/, ""))
      .sort();
  } catch {
    return [];
  }
}

function slugsInXml(xml: string): Set<string> {
  const out = new Set<string>();
  const re = /\/blog\/([^<"]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.add(m[1].trim());
  return out;
}

async function main() {
  try {
    const res = await fetch(SOURCE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let xml = await res.text();
    if (!xml.includes("<urlset")) throw new Error("Unexpected response shape");

    // Surface the merge breakdown from the edge function's response headers
    // so the build log makes Contentful coverage obvious.
    const foundations = res.headers.get("x-sitemap-foundations") ?? "?";
    const articles = res.headers.get("x-sitemap-articles") ?? "?";
    const contentful = res.headers.get("x-sitemap-contentful") ?? "?";
    const categories = res.headers.get("x-sitemap-categories") ?? "?";

    // Append any local TSX articles the Supabase function doesn't know about.
    const inSitemap = slugsInXml(xml);
    const local = localArticleSlugs();
    const missing = local.filter((s) => !inSitemap.has(s));

    if (missing.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const extra = missing
        .map(
          (slug) =>
            `  <url><loc>${SITE}/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
        )
        .join("\n");
      xml = xml.replace("</urlset>", `${extra}\n</urlset>`);
      console.log(
        `[generate-blog-sitemap] Appended ${missing.length} local-only article(s): ${missing.join(", ")}`,
      );
    }

    writeFileSync(OUTPUT_PATH, xml);
    const count = (xml.match(/<url>/g) || []).length;

    console.log(
      `blog-sitemap.xml written (${count} entries — foundations=${foundations}, contentful=${contentful}, articles=${articles}+${missing.length} local, categories=${categories})`,
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
