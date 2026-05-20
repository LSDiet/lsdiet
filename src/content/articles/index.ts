// Registry of all code-managed Search-driven articles.
//
// Articles are the utility/search-entry layer. They are filtered out of
// the merged blog index whenever a Foundation or Contentful post shares
// the same slug (precedence: Foundations > Contentful > Articles).
//
// Add new articles by importing them and appending to ARTICLES.

import type { Article } from "./types";

export const ARTICLES: Article[] = [
  // Articles will be registered here as they are authored.
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.meta.slug === slug);
}

export type { Article, ArticleMeta } from "./types";
