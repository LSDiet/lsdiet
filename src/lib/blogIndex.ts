// Client for the public blog-index edge function. Used by /blog (split view)
// and "Related Foundations" blocks. Returns richer metadata than blog-posts.

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
}

export async function fetchBlogIndex(): Promise<BlogIndexEntry[]> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-index`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
  });
  if (!r.ok) throw new Error(`Failed to load blog index: ${r.status}`);
  return (await r.json()) as BlogIndexEntry[];
}
