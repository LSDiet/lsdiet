// Public semantic blog inventory for AI-assisted content workflows.
// Returns a JSON array of all published Contentful blog posts (newest first)
// with whitelisted fields only — no body, no IDs, no secrets.
//
// URL: https://<project-ref>.supabase.co/functions/v1/blog-index
import {
  TAXONOMY,
  CONTENT_TYPES,
  DEFAULT_CONTENT_TYPE,
  CANONICAL_TOPICS,
  MAX_TOPICS_PER_POST,
  normalizeTag,
  validateCanonicalTopic,
  extractFallbackTopics,
} from "./taxonomy.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Expose-Headers": "X-Taxonomy-Warnings",
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

function resolveUrlFromRefOrString(
  raw: unknown,
  linkedSlugs: Record<string, string>,
): string | null {
  if (raw && typeof raw === "object" && (raw as any)?.sys?.id) {
    const slug = linkedSlugs[(raw as any).sys.id];
    return slug ? `${SITE}/blog/${slug}` : null;
  }
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return null;
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

    // Index linked entries by ID so we can resolve references to URLs.
    const linkedSlugs: Record<string, string> = {};
    for (const inc of data.includes?.Entry ?? []) {
      const slug = inc.fields?.slug;
      if (slug && typeof slug === "string") linkedSlugs[inc.sys.id] = slug;
    }
    for (const item of data.items ?? []) {
      const slug = item.fields?.slug;
      if (slug && typeof slug === "string") linkedSlugs[item.sys.id] = slug;
    }

    const warnings: string[] = [];
    const unknownTagLog: string[] = [];

    const inventory = (data.items ?? []).map((item: any) => {
      const f = item.fields ?? {};
      const title = String(f.title ?? "");
      const slug = String(f.slug ?? "");
      const excerpt = String(f.excerpt ?? "");
      const publishDate = f.publishDate ?? item.sys.createdAt;
      const updatedAt = item.sys.updatedAt;

      // ---- topics (free tags, max 5) ----
      let topics = dedupe(parseTopics(f.topics));
      if (topics.length === 0) topics = extractFallbackTopics(title, excerpt);
      if (topics.length > MAX_TOPICS_PER_POST) {
        warnings.push(`${slug}: truncated topics from ${topics.length} to ${MAX_TOPICS_PER_POST}`);
        topics = topics.slice(0, MAX_TOPICS_PER_POST);
      }

      // ---- canonicalTopic (single, enum-locked) ----
      let canonicalTopic = "";
      const rawCanonical = String(f.canonicalTopic ?? f.primaryTopic ?? "");
      if (rawCanonical) {
        const v = validateCanonicalTopic(rawCanonical);
        if (v.ok) {
          canonicalTopic = v.value;
        } else {
          warnings.push(
            `${slug}: canonicalTopic "${v.value}" not in CANONICAL_TOPICS` +
              (v.suggestion ? ` — did you mean "${v.suggestion}"?` : ""),
          );
        }
      }

      // ---- subTopic (optional free text, for fan-outs like Awareness Stages) ----
      const subTopic = f.subTopic ? normalizeTag(String(f.subTopic)) : null;

      // ---- contentType (validated enum) ----
      let contentType = normalizeTag(String(f.contentType ?? ""));
      if (!CONTENT_TYPES.has(contentType)) contentType = DEFAULT_CONTENT_TYPE;

      // ---- parents[] (future-ready: array today, populated by parentUrl) ----
      const parentRaw = f.parentUrl ?? f.pillarUrl ?? f.pillar ?? f.parent;
      const parentUrl = resolveUrlFromRefOrString(parentRaw, linkedSlugs);
      const parents: string[] = parentUrl ? [parentUrl] : [];

      // ---- relatedTopics[] (reserved, always present) ----
      const relatedTopics: string[] = [];

      // Audit drift on free tags.
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
        canonicalTopic,
        subTopic,
        topics,
        contentType,
        parentUrl,       // back-compat: singular
        parents,         // future-proof: array
        relatedTopics,   // reserved
      };
    });

    // Detect duplicate foundations under the same parent.
    const foundationsByParent = new Map<string, string[]>();
    for (const p of inventory) {
      if (p.contentType !== "pillar" || !p.parentUrl) continue;
      const arr = foundationsByParent.get(p.parentUrl) ?? [];
      arr.push(p.slug);
      foundationsByParent.set(p.parentUrl, arr);
    }
    for (const [parent, slugs] of foundationsByParent) {
      if (slugs.length > 1) {
        warnings.push(`duplicate foundations under ${parent}: ${slugs.join(", ")}`);
      }
    }

    if (unknownTagLog.length > 0) {
      console.log("blog-index: unknown tags encountered", [...new Set(unknownTagLog)]);
    }
    if (warnings.length > 0) {
      console.log("blog-index: governance warnings", warnings);
    }

    return new Response(JSON.stringify(inventory, null, 2), {
      status: 200,
      headers: {
        ...CORS,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "X-Content-Type-Options": "nosniff",
        "X-Taxonomy-Warnings": String(warnings.length),
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
