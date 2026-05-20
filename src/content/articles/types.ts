// Type contract for code-managed Search-driven articles.
//
// These are the high-volume, utility/search-entry layer. They are NOT
// mini-foundations: each post solves one immediate search problem and
// routes the reader UP into the foundation pillars.
//
// Precedence on slug collision (locked):
//   Foundations > Contentful > Articles
// Articles never override curated editorial content.

import type { ComponentType } from "react";

export interface ArticleMeta {
  slug: string;
  title: string;
  /** One-line teaser — used on /blog hover and as fallback meta description. */
  excerpt: string;
  metaDescription: string;
  publishDate: string;          // ISO 8601
  updatedAt: string;            // ISO 8601
  /** Must be one of CANONICAL_TOPICS. Drives /blog bucketing. */
  canonicalTopic: string;
  /** ≤5, drawn from TAXONOMY. Free search-hook tags. */
  topics: string[];
  /** The pillar this post supports. Used for "feeds into" semantics. */
  primaryFoundationSlug: string;
  /** 2–4 more foundation slugs woven contextually into the body. */
  relatedFoundationSlugs: string[];
}

export interface Article {
  meta: ArticleMeta;
  /** Renders the article body — semantic HTML with inline foundation links. */
  Body: ComponentType;
}
