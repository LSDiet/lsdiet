// Public semantic blog inventory for AI-assisted content workflows.
// Returns a JSON array of all published Contentful blog posts (newest first)
// with whitelisted fields only — no body, no IDs, no secrets.
//
// URL: https://<project-ref>.supabase.co/functions/v1/blog-index
import {
  TAXONOMY,
  CONTENT_TYPES,
  DEFAULT_CONTENT_TYPE,
  normalizeTag,
  extractFallbackTopics,
} from "./taxonomy.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";
const SITE = "https://lsdiet.com";

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
  if (!r.ok) throw new Error(`Contentful gateway ${r.status}: ${await r.text()}`);
  return r.json();
}

function parseTopics(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((x) => normalizeTag(String(x))).filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw.split(",").map((x) => normalizeTag(x)).filter(Boolean);
  }
  return [];
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const nowIso = new Date().toISOString();
    const data = await cf("/entries", {
      content_type: CONTENT_TYPE,
      order: "-fields.publishDate",
      "fields.publishDate[lte]": nowIso,
      include: "1",
      limit: "1000",
    });

    // Index linked blog posts by ID so we can resolve pillar references to URLs.
    const linkedSlugs: Record<string, string> = {};
    for (const inc of data.includes?.Entry ?? []) {
      const slug = inc.fields?.slug;
      if (slug && typeof slug === "string") linkedSlugs[inc.sys.id] = slug;
    }
    // Self-index too, in case a pillar references another post in the main result set.
    for (const item of data.items ?? []) {
      const slug = item.fields?.slug;
      if (slug && typeof slug === "string") linkedSlugs[item.sys.id] = slug;
    }

    const unknownTagLog: string[] = [];
    const inventory = (data.items ?? []).map((item: any) => {
      const f = item.fields ?? {};
      const title = String(f.title ?? "");
      const slug = String(f.slug ?? "");
      const excerpt = String(f.excerpt ?? "");
      const publishDate = f.publishDate ?? item.sys.createdAt;
      const updatedAt = item.sys.updatedAt;

      // Topics: manual primary, fallback to keyword extraction.
      let topics = dedupe(parseTopics(f.topics));
      if (topics.length === 0) topics = extractFallbackTopics(title, excerpt);

      // primaryTopic: manual primary, fallback to first of topics.
      let primaryTopic = normalizeTag(String(f.primaryTopic ?? ""));
      if (!primaryTopic) primaryTopic = topics[0] ?? "";

      // Ensure primaryTopic is in topics, prepended.
      if (primaryTopic) {
        topics = dedupe([primaryTopic, ...topics]);
      }

      // contentType: validated enum.
      let contentType = normalizeTag(String(f.contentType ?? ""));
      if (!CONTENT_TYPES.has(contentType)) contentType = DEFAULT_CONTENT_TYPE;

      // pillarUrl: support either a Reference field (Link to another blogPost)
      // or a plain Short text URL.
      let pillarUrl: string | null = null;
      const pillarRaw = f.pillarUrl ?? f.pillar;
      if (pillarRaw && typeof pillarRaw === "object" && pillarRaw?.sys?.id) {
        const refSlug = linkedSlugs[pillarRaw.sys.id];
        if (refSlug) pillarUrl = `${SITE}/blog/${refSlug}`;
      } else if (typeof pillarRaw === "string" && pillarRaw.trim()) {
        pillarUrl = pillarRaw.trim();
      }

      // Audit drift: log tags not in the controlled vocabulary.
      for (const t of topics) {
        if (!TAXONOMY.has(t)) unknownTagLog.push(t);
      }

      return {
        title,
        slug,
        url: `${SITE}/blog/${slug}`,
        excerpt,
        publishDate,
        updatedAt,
        primaryTopic,
        topics,
        contentType,
        pillarUrl,
      };
    });

    if (unknownTagLog.length > 0) {
      console.log("blog-index: unknown tags encountered", [...new Set(unknownTagLog)]);
    }

    return new Response(JSON.stringify(inventory, null, 2), {
      status: 200,
      headers: {
        ...CORS,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("blog-index error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" },
    });
  }
});
