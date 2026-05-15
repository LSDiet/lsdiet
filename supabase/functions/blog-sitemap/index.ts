// Dynamic XML sitemap for blog posts only. Linked from robots.txt.
const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";
const BASE_URL = "https://lsdiet.com";

function env(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}

Deno.serve(async () => {
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

    const urls = (data.items ?? [])
      .filter((i: any) => i.fields?.slug)
      .map((i: any) => {
        const lastmod = (i.sys.updatedAt ?? "").slice(0, 10);
        return `  <url>\n    <loc>${BASE_URL}/blog/${i.fields.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "Access-Control-Allow-Origin": "*",
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
