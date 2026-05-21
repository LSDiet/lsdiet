// Thin proxy to Contentful Delivery API via Lovable connector gateway.
//
// Actions:
//   list         — all published posts (with resolved relatedPosts)
//   get          — single post by slug
//   sitemap      — slug+date list (legacy; blog-sitemap is the real source)
//   categories   — distinct allowed categories + counts
//   byCategory   — posts filtered by category slug
//
// TODO (Phase 2): Migrate `category` from free-text Short text to a dedicated
// Contentful `category` content type referenced from blogPost. Until then,
// ALLOWED_CATEGORIES below is the strict allow-list and editors must pick
// from it verbatim. Out-of-list values are logged as warnings.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";

const SEO_TITLE_MAX = 60;
const META_DESC_MAX = 160;

const ALLOWED_CATEGORIES = [
  "Office & Work Life",
  "Psychology & Behaviour",
  "Nutrition & Meal Prep",
  "Exercise & Movement",
  "LS Diet Fundamentals",
  "Low Starch Low Sugar",
  "Weight Regain",
  "Motivation & Accountability",
  "Social Pressure & Identity",
];

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

function categorySlug(raw: string): string {
  return String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildIndex(payload: any) {
  const assets: Record<string, any> = {};
  for (const a of payload.includes?.Asset ?? []) {
    assets[a.sys.id] = {
      url: a.fields?.file?.url ? `https:${a.fields.file.url}` : null,
      title: a.fields?.title ?? "",
      width: a.fields?.file?.details?.image?.width,
      height: a.fields?.file?.details?.image?.height,
    };
  }
  const entries: Record<string, any> = {};
  for (const e of payload.includes?.Entry ?? []) entries[e.sys.id] = e;
  for (const e of payload.items ?? []) entries[e.sys.id] = e;
  return { assets, entries };
}

function resolveFeatured(field: any, assets: Record<string, any>) {
  const id = field?.sys?.id;
  return id ? assets[id] ?? null : null;
}

function resolveRelated(
  links: any[],
  entries: Record<string, any>,
  assets: Record<string, any>,
) {
  if (!Array.isArray(links)) return [];
  return links
    .map((l: any) => {
      const id = l?.sys?.id;
      if (!id) return null;
      const entry = entries[id];
      if (!entry?.fields?.slug) return null;
      const f = entry.fields;
      const cat = f.category ? String(f.category) : "";
      return {
        id,
        title: String(f.title ?? ""),
        slug: String(f.slug),
        excerpt: String(f.excerpt ?? ""),
        category: cat,
        categorySlug: cat ? categorySlug(cat) : "",
        featuredImage: resolveFeatured(f.featuredImage, assets),
      };
    })
    .filter(Boolean);
}

function mapPost(
  item: any,
  idx: { assets: Record<string, any>; entries: Record<string, any> },
  warnings: string[],
) {
  const f = item.fields ?? {};
  const slug = String(f.slug ?? "");
  const title = String(f.title ?? "");
  const seoTitle = f.seoTitle ? String(f.seoTitle) : "";
  const metaDescription = f.metaDescription ? String(f.metaDescription) : "";
  const excerpt = String(f.excerpt ?? "");
  const category = f.category ? String(f.category).trim() : "";

  if (seoTitle && seoTitle.length > SEO_TITLE_MAX) {
    warnings.push(`${slug}: seoTitle ${seoTitle.length}>${SEO_TITLE_MAX} chars`);
  }
  if (metaDescription && metaDescription.length > META_DESC_MAX) {
    warnings.push(`${slug}: metaDescription ${metaDescription.length}>${META_DESC_MAX} chars`);
  }
  if (!category) {
    warnings.push(`${slug}: category missing (required)`);
  } else if (!ALLOWED_CATEGORIES.includes(category)) {
    warnings.push(
      `${slug}: category "${category}" not in ALLOWED_CATEGORIES — Contentful field should restrict to enum`,
    );
  }

  return {
    id: item.sys.id,
    createdAt: item.sys.createdAt,
    updatedAt: item.sys.updatedAt,
    title,
    seoTitle,
    slug,
    excerpt,
    metaDescription,
    content: f.content ?? null,
    featuredImage: resolveFeatured(f.featuredImage, idx.assets),
    publishDate: f.publishDate ?? item.sys.createdAt,
    category,
    categorySlug: category ? categorySlug(category) : "",
    relatedPosts: resolveRelated(f.relatedPosts, idx.entries, idx.assets),
  };
}

function resolvePosts(payload: any) {
  const idx = buildIndex(payload);
  const warnings: string[] = [];
  const posts = (payload.items ?? []).map((i: any) => mapPost(i, idx, warnings));
  if (warnings.length > 0) console.log("blog-posts: validation warnings", warnings);
  return { posts, warnings };
}

function jsonResponse(body: unknown, init: ResponseInit = {}, warnings: string[] = []) {
  const headers: Record<string, string> = {
    ...corsHeaders,
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=30, s-maxage=30",
  };
  if (warnings.length) headers["X-Validation-Warnings"] = String(warnings.length);
  return new Response(JSON.stringify(body), { ...init, headers });
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
      const { posts, warnings } = resolvePosts(data);
      return jsonResponse({ posts }, {}, warnings);
    }

    if (action === "get") {
      const slug = url.searchParams.get("slug");
      if (!slug) return jsonResponse({ error: "slug required" }, { status: 400 });
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        "fields.slug": slug,
        "fields.publishDate[lte]": nowIso,
        include: "2",
        limit: "1",
      });
      const { posts, warnings } = resolvePosts(data);
      return jsonResponse({ post: posts[0] ?? null }, {}, warnings);
    }

    if (action === "categories") {
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        order: "-fields.publishDate",
        "fields.publishDate[lte]": nowIso,
        select: "fields.category",
        limit: "1000",
      });
      const counts = new Map<string, { label: string; slug: string; count: number; allowed: boolean }>();
      for (const i of data.items ?? []) {
        const raw = i.fields?.category;
        if (!raw) continue;
        const label = String(raw).trim();
        const slug = categorySlug(label);
        if (!slug) continue;
        const prev = counts.get(slug);
        if (prev) prev.count += 1;
        else
          counts.set(slug, {
            label,
            slug,
            count: 1,
            allowed: ALLOWED_CATEGORIES.includes(label),
          });
      }
      const categories = [...counts.values()].sort((a, b) => a.label.localeCompare(b.label));
      return jsonResponse({ categories, allowed: ALLOWED_CATEGORIES });
    }

    if (action === "byCategory") {
      const slugParam = url.searchParams.get("slug");
      if (!slugParam) return jsonResponse({ error: "slug required" }, { status: 400 });
      const wanted = categorySlug(slugParam);
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        order: "-fields.publishDate",
        "fields.publishDate[lte]": nowIso,
        include: "2",
        limit: "1000",
      });
      const { posts, warnings } = resolvePosts(data);
      const filtered = posts.filter((p: any) => p.categorySlug === wanted);
      return jsonResponse(
        { posts: filtered, category: filtered[0]?.category ?? "" },
        {},
        warnings,
      );
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
      return jsonResponse({ items });
    }

    return jsonResponse({ error: "unknown action" }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("blog-posts error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
