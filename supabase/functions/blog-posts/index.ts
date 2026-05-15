// Thin proxy to Contentful Delivery API via Lovable connector gateway.
// Actions: list (all published posts), get (single post by slug), sitemap (slug+date list).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";

function env(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}

async function cf(path: string, query: Record<string, string>) {
  const LOVABLE_API_KEY = env("LOVABLE_API_KEY");
  const CONTENTFUL_API_KEY = env("CONTENTFUL_API_KEY");
  const SPACE_ID = env("CONTENTFUL_SPACE_ID");
  const qs = new URLSearchParams(query).toString();
  const url = `${GATEWAY}/spaces/${SPACE_ID}/environments/master${path}?${qs}`;
  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": CONTENTFUL_API_KEY,
    },
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`Contentful gateway ${r.status}: ${body}`);
  }
  return r.json();
}

// Resolve asset links so the frontend gets flat objects.
function resolveAssets(payload: any) {
  const assets: Record<string, any> = {};
  for (const a of payload.includes?.Asset ?? []) {
    assets[a.sys.id] = {
      url: a.fields.file?.url ? `https:${a.fields.file.url}` : null,
      title: a.fields.title ?? "",
      width: a.fields.file?.details?.image?.width,
      height: a.fields.file?.details?.image?.height,
    };
  }
  return (payload.items ?? []).map((item: any) => {
    const f = item.fields;
    const featured = f.featuredImage?.sys?.id ? assets[f.featuredImage.sys.id] : null;
    return {
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      title: f.title ?? "",
      slug: f.slug ?? "",
      excerpt: f.excerpt ?? "",
      content: f.content ?? null,
      featuredImage: featured,
      publishDate: f.publishDate ?? item.sys.createdAt,
    };
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") ?? "list";
    const nowIso = new Date().toISOString();

    if (action === "list") {
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        order: "-fields.publishDate",
        "fields.publishDate[lte]": nowIso,
        include: "2",
        limit: "200",
      });
      const posts = resolveAssets(data);
      return new Response(JSON.stringify({ posts }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }

    if (action === "get") {
      const slug = url.searchParams.get("slug");
      if (!slug) {
        return new Response(JSON.stringify({ error: "slug required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        "fields.slug": slug,
        "fields.publishDate[lte]": nowIso,
        include: "2",
        limit: "1",
      });
      const posts = resolveAssets(data);
      return new Response(JSON.stringify({ post: posts[0] ?? null }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }

    if (action === "sitemap") {
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        order: "-fields.publishDate",
        "fields.publishDate[lte]": nowIso,
        select: "fields.slug,sys.updatedAt",
        limit: "1000",
      });
      const items = (data.items ?? []).map((i: any) => ({
        slug: i.fields.slug,
        updatedAt: i.sys.updatedAt,
      }));
      return new Response(JSON.stringify({ items }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=600",
        },
      });
    }

    return new Response(JSON.stringify({ error: "unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("blog-posts error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
