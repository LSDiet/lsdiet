// Client for the public blog-index edge function. Used by /blog (split view)
// and "Related Foundations" blocks.
//
// Three-system architecture, merged here:
//   1. Code-managed FOUNDATIONS (src/content/foundations) — authority layer.
//   2. Contentful posts via the blog-index edge function — curated editorial.
//   3. Code-managed ARTICLES (src/content/articles) — Search-driven utility layer.
//
// Slug-collision precedence (locked):
//   Foundations > Contentful > Articles
// Articles NEVER override curated editorial content; foundations override both.

import { FOUNDATIONS } from "@/content/foundations";
import { ARTICLES } from "@/content/articles";

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
  /** Featured image URL — present for foundations; optional for others. */
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

function articlesAsIndex(): BlogIndexEntry[] {
  return ARTICLES.map((a) => ({
    title: a.meta.title,
    slug: a.meta.slug,
    url: `https://lsdiet.com/blog/${a.meta.slug}`,
    excerpt: a.meta.excerpt,
    publishDate: a.meta.publishDate,
    updatedAt: a.meta.updatedAt,
    canonicalTopic: a.meta.canonicalTopic,
    subTopic: null,
    topics: a.meta.topics,
    contentType: "supporting",
    parentUrl: `https://lsdiet.com/blog/${a.meta.primaryFoundationSlug}`,
    parents: [a.meta.primaryFoundationSlug, ...a.meta.relatedFoundationSlugs].map(
      (s) => `https://lsdiet.com/blog/${s}`,
    ),
    relatedTopics: [],
    featuredImage: null,
  }));
}

export async function fetchBlogIndex(): Promise<BlogIndexEntry[]> {
  const foundations = foundationsAsIndex();
  const articles = articlesAsIndex();

  let remote: BlogIndexEntry[] = [];
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-index`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    });
    if (r.ok) {
      remote = (await r.json()) as BlogIndexEntry[];
    }
  } catch {
    // Network failure on the remote index must not break the local layers.
  }

  // Precedence: Foundations > Contentful > Articles.
  const foundationSlugs = new Set(foundations.map((e) => e.slug));
  const contentful = remote.filter((e) => !foundationSlugs.has(e.slug));
  const contentfulSlugs = new Set(contentful.map((e) => e.slug));
  const utility = articles.filter(
    (e) => !foundationSlugs.has(e.slug) && !contentfulSlugs.has(e.slug),
  );

  const merged = [...foundations, ...contentful, ...utility];
  merged.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
  return merged;
}
