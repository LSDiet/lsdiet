import { supabase } from "@/integrations/supabase/client";
import type { Document } from "@contentful/rich-text-types";

export interface BlogAsset {
  url: string | null;
  title: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Document | null;
  featuredImage: BlogAsset | null;
  publishDate: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase.functions.invoke("blog-posts", {
    body: null,
    method: "GET",
  } as any);
  // Fallback: invoke without body using direct fetch since GET-with-query needs custom URL.
  if (error || !data) {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts?action=list`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    });
    if (!r.ok) throw new Error(`Failed to load posts: ${r.status}`);
    const json = await r.json();
    return json.posts ?? [];
  }
  return (data as any).posts ?? [];
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts?action=get&slug=${encodeURIComponent(slug)}`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
  });
  if (!r.ok) throw new Error(`Failed to load post: ${r.status}`);
  const json = await r.json();
  return json.post ?? null;
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts?action=list`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
  });
  if (!r.ok) throw new Error(`Failed to load posts: ${r.status}`);
  const json = await r.json();
  return json.posts ?? [];
}

export function formatPublishDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
