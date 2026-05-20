// Dynamic XML sitemap for ALL /blog/* URLs. Single source of truth.
//
// Merges three sources on every request (precedence locked):
//   1. Foundations  (code-managed, mirrored slug list below)   — priority 0.9
//   2. Contentful   (live Delivery API)                        — priority 0.7
//   3. Articles     (code-managed, mirrored slug list below)   — priority 0.7
//
// `scripts/generate-blog-sitemap.ts` fetches this and writes a static cache to
// `public/blog-sitemap.xml` so the branded URL https://lsdiet.com/blog-sitemap.xml
// always serves the latest content. See docs/SITEMAP_ARCHITECTURE.md.
//
// IMPORTANT: when adding a Foundation or Article in src/content/, mirror the
// slug into the arrays below. The repo's GOVERNANCE doc enforces this.

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";
const BASE_URL = "https://lsdiet.com";

// ---- Mirrored from src/content/foundations/index.ts ----------------------
// Order matters only for human inspection; the sitemap sorts by lastmod.
const FOUNDATION_SLUGS: string[] = [
  "why-people-regain-weight-after-dieting",
  "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  "reality-awareness",
  "friction-awareness",
  "pattern-awareness",
  "consequence-awareness",
  "identity-awareness",
  "action-practice",
];

// ---- Mirrored from src/content/articles/index.ts -------------------------
const ARTICLE_SLUGS: string[] = [
  // Batch 1
  "how-to-lose-weight-with-a-desk-job",
  "can-you-lose-weight-without-going-to-the-gym",
  "why-do-i-keep-restarting-weight-loss",
  "is-diet-or-exercise-more-important-for-weight-loss",
  "can-stress-at-work-prevent-weight-loss",
  // Batch 2
  "how-to-stay-motivated-to-lose-weight-when-working-full-time",
  "how-to-meal-prep-for-weight-loss-on-a-busy-schedule",
  "do-you-need-to-count-calories-to-lose-weight",
  "how-weight-loss-changes-confidence-and-social-behaviour",
  "how-to-lose-weight-when-you-work-long-hours",
  // Batch 3
  "how-does-sleep-affect-your-ability-to-lose-weight",
  "can-you-lose-weight-while-working-night-shifts",
  "how-much-does-weight-loss-affect-your-metabolism",
  "how-to-lose-weight-quietly-without-announcing-it",
  "how-much-weight-can-you-realistically-lose-in-a-month",
  // Batch 4
  "can-a-physical-job-help-you-lose-weight",
  "do-standing-desks-help-with-weight-loss",
  "will-losing-weight-improve-your-career-prospects",
  "what-should-you-eat-for-lunch-to-lose-weight",
  "what-foods-help-you-lose-weight-fastest",
  // Batch 5
  "can-you-lose-weight-without-changing-your-diet",
  "how-to-avoid-weight-gain-working-an-office-job",
  "can-you-lose-weight-on-a-low-carb-diet",
  "why-do-healthy-habits-collapse-during-stress",
  "why-do-i-eat-even-when-im-not-hungry",
  // Batch 6
  "why-do-i-lose-motivation-after-a-few-weeks",
  "why-does-stress-make-me-eat-more",
  "why-do-i-restart-weight-loss-every-monday",
  "can-you-lose-weight-without-feeling-hungry",
  "does-weight-loss-change-dating-and-attraction",
  // Batch 7
  "how-to-overcome-weight-loss-plateaus",
  "how-much-protein-should-you-eat-to-lose-weight",
  "why-do-people-emotionally-eat-after-work",
  "office-job-weight-loss-success-stories",
  "whats-the-best-weight-loss-program-for-busy-professionals",
  // Batch 8
  "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work",
  "how-to-get-energy-to-exercise-after-working-all-day",
  "why-do-i-keep-losing-and-regaining-the-same-weight",
  "why-does-weight-loss-feel-easier-when-im-younger",
  "can-accountability-help-you-lose-weight",
];

function env(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}

interface Entry {
  slug: string;
  lastmod: string;       // YYYY-MM-DD
  priority: string;
  source: "foundation" | "contentful" | "article";
}

async function fetchContentful(): Promise<Array<{ slug: string; updatedAt: string }>> {
  try {
    const LOVABLE_API_KEY = env("LOVABLE_API_KEY");
    const CONTENTFUL_API_KEY = env("CONTENTFUL_API_KEY");
    const SPACE_ID = env("CONTENTFUL_SPACE_ID");
    const nowIso = new Date().toISOString();
    const qs = new URLSearchParams({
      content_type: CONTENT_TYPE,
      order: "-fields.publishDate",
      "fields.publishDate[lte]": nowIso,
      select: "fields.slug,sys.updatedAt",
      limit: "1000",
    }).toString();

    const r = await fetch(
      `${GATEWAY}/spaces/${SPACE_ID}/environments/master/entries?${qs}`,
      {
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": CONTENTFUL_API_KEY,
        },
      },
    );
    if (!r.ok) throw new Error(`Contentful ${r.status}: ${await r.text()}`);
    const data = await r.json();
    return (data.items ?? [])
      .filter((i: any) => i.fields?.slug)
      .map((i: any) => ({
        slug: String(i.fields.slug),
        updatedAt: String(i.sys?.updatedAt ?? new Date().toISOString()),
      }));
  } catch (err) {
    // Never let Contentful failure blank out the sitemap — log and keep going.
    console.error(
      "blog-sitemap: Contentful fetch failed, continuing with code-managed entries only:",
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function toDate(iso: string): string {
  return (iso || "").slice(0, 10) || today();
}

Deno.serve(async () => {
  try {
    const contentful = await fetchContentful();

    // Precedence: Foundations > Contentful > Articles.
    const seen = new Set<string>();
    const entries: Entry[] = [];

    for (const slug of FOUNDATION_SLUGS) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      entries.push({ slug, lastmod: today(), priority: "0.9", source: "foundation" });
    }

    for (const c of contentful) {
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      entries.push({
        slug: c.slug,
        lastmod: toDate(c.updatedAt),
        priority: "0.7",
        source: "contentful",
      });
    }

    for (const slug of ARTICLE_SLUGS) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      entries.push({ slug, lastmod: today(), priority: "0.7", source: "article" });
    }

    const urls = entries
      .map(
        (e) =>
          `  <url>\n    <loc>${BASE_URL}/blog/${e.slug}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "Access-Control-Allow-Origin": "*",
        "X-Sitemap-Count": String(entries.length),
        "X-Sitemap-Foundations": String(FOUNDATION_SLUGS.length),
        "X-Sitemap-Articles": String(ARTICLE_SLUGS.length),
        "X-Sitemap-Contentful": String(contentful.length),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("blog-sitemap error:", msg);
    return new Response(`<!-- error: ${msg} -->`, {
      status: 500,
      headers: { "Content-Type": "application/xml" },
    });
  }
});
