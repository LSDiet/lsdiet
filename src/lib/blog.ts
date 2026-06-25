import type { Document } from "@contentful/rich-text-types";

export interface BlogAsset {
  url: string | null;
  title: string;
  width?: number;
  height?: number;
}

export interface RelatedPostLite {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: BlogAsset | null;
}

export interface BlogPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  /** Optional SEO title override (≤60). Falls back to title. */
  seoTitle?: string;
  slug: string;
  excerpt: string;
  /** Optional meta description override (≤160). Falls back to excerpt. */
  metaDescription?: string;
  content: Document | null;
  featuredImage: BlogAsset | null;
  publishDate: string;
  category?: string;
  categorySlug?: string;
  relatedPosts?: RelatedPostLite[];
}

export interface CategorySummary {
  label: string;
  slug: string;
  count: number;
  allowed?: boolean;
}

const FN_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts`;
const AUTH = {
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
} as const;

async function getJson<T>(qs: string): Promise<T> {
  const r = await fetch(`${FN_BASE}?${qs}`, { headers: AUTH });
  if (!r.ok) throw new Error(`blog-posts ${r.status}`);
  return r.json();
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const json = await getJson<{ post: BlogPost | null }>(
    `action=get&slug=${encodeURIComponent(slug)}`,
  );
  return json.post ?? null;
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const json = await getJson<{ posts: BlogPost[] }>("action=list");
  return json.posts ?? [];
}

export async function fetchCategories(): Promise<CategorySummary[]> {
  try {
    const json = await getJson<{ categories: CategorySummary[] }>("action=categories");
    return json.categories ?? [];
  } catch {
    return [];
  }
}

export async function fetchPostsByCategory(
  slug: string,
): Promise<{ posts: BlogPost[]; category: string }> {
  try {
    const json = await getJson<{ posts: BlogPost[]; category: string }>(
      `action=byCategory&slug=${encodeURIComponent(slug)}`,
    );
    return { posts: json.posts ?? [], category: json.category ?? "" };
  } catch {
    return { posts: [], category: "" };
  }
}

/** Parse a date string without UTC-offset shift.
 *  "2026-06-24" → June 24 in every timezone, not June 23 in UTC-7. */
function parseLocalDate(iso: string): Date {
  // Date-only strings (YYYY-MM-DD) are parsed as UTC midnight by spec,
  // which shifts the displayed day back in negative-offset timezones.
  // Appending T12:00:00 treats it as local noon, safe across all zones.
  return new Date(iso.length === 10 ? iso + "T12:00:00" : iso);
}

export function formatPublishDate(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "Updated May 2026" — used for freshness display on article pages. */
export function formatUpdatedShort(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
  });
}
