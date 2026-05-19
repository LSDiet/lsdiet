// Client for the public blog-index edge function. Used by /blog (split view)
// and "Related Foundations" blocks.
//
// Two-system architecture:
//   • Code-managed FOUNDATIONS (src/content/foundations) are merged in here so
//     RelatedFoundations and /blog see them alongside Contentful posts.
//   • Contentful provides the high-volume "Real Life Weight Questions" stream
//     via the blog-index edge function.

import { FOUNDATIONS } from "@/content/foundations";

export interface BlogIndexEntry {
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  publishDate: string;
  updatedAt: string;
  canonicalTopic: string;
  subTopic: string | null;
  topics: string[];
  contentType: "entity-hub" | "pillar" | "supporting" | "comparison" | "evergreen-faq";
  parentUrl: string | null;
  parents: string[];
  relatedTopics: string[];
  /** Featured image URL — present for foundations; optional for Contentful posts. */
  featuredImage?: { url: string; alt: string } | null;
}

function foundationsAsIndex(): BlogIndexEntry[] {
  return FOUNDATIONS.map((f) => ({
    title: f.meta.title,
    slug: f.meta.slug,
    url: `https://lsdiet.com/blog/${f.meta.slug}`,
    excerpt: f.meta.excerpt,
    publishDate: f.meta.publishDate,
    updatedAt: f.meta.updatedAt,
    canonicalTopic: f.meta.canonicalTopic,
    subTopic: f.meta.subTopic,
    topics: f.meta.topics,
    contentType: f.meta.contentType,
    parentUrl: f.meta.parentUrl,
    parents: f.meta.parentUrl ? [f.meta.parentUrl] : [],
    relatedTopics: f.meta.relatedTopics,
    featuredImage: { url: f.meta.featuredImage.src, alt: f.meta.featuredImage.alt },
  }));
}

export async function fetchBlogIndex(): Promise<BlogIndexEntry[]> {
  const local = foundationsAsIndex();
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-index`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    });
    if (!r.ok) throw new Error(`Failed to load blog index: ${r.status}`);
    const remote = (await r.json()) as BlogIndexEntry[];
    // Code-managed foundations win on slug collision.
    const localSlugs = new Set(local.map((e) => e.slug));
    const merged = [...local, ...remote.filter((e) => !localSlugs.has(e.slug))];
    merged.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
    return merged;
  } catch {
    // If the remote index is unreachable, still return foundations so the
    // semantic authority layer keeps working.
    return local;
  }
}
