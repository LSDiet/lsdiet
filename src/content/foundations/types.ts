// Type contract for code-managed foundation posts (pillars + entity hubs).
// These live in the codebase — NOT in Contentful — so the system fully
// controls semantic hierarchy, interlinking, schema, and URL permanence.

import type { ComponentType } from "react";

export interface FoundationFAQ {
  q: string;
  a: string;
}

export interface FoundationFeaturedImage {
  src: string;            // imported asset URL
  alt: string;
  width?: number;
  height?: number;
}

export interface FoundationMeta {
  slug: string;
  title: string;
  /** Optional shorter title for the curriculum list on /blog. Falls back to `title`. */
  listTitle?: string;
  /** Manual curriculum order (lower = earlier). Used by FoundationsCurriculum. */
  order: number;
  excerpt: string;
  metaDescription: string;
  publishDate: string;     // ISO 8601
  updatedAt: string;       // ISO 8601
  canonicalTopic: string;  // one of CANONICAL_TOPICS
  subTopic: string | null;
  topics: string[];        // ≤5, drawn from TAXONOMY
  contentType: "pillar" | "entity-hub";
  parentUrl: string | null;
  relatedTopics: string[]; // canonicalTopic refs for future interlinking
  featuredImage: FoundationFeaturedImage;
  faqs?: FoundationFAQ[];
}

export interface Foundation {
  meta: FoundationMeta;
  Body: ComponentType;     // renders the article body (semantic HTML)
}
