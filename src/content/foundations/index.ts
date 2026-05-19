// Registry of all code-managed foundation posts (pillars + entity hubs).
// Order is not significant — sorting happens at the consumer (newest first).
//
// To add a new foundation:
//   1. Create src/content/foundations/<slug>.tsx exporting `default` of type Foundation.
//   2. Import + add it to FOUNDATIONS below.
//   3. Add the URL to public/sitemap-pages.xml.
//
// Foundations are surfaced via:
//   - /blog/{slug} (rendered by BlogPostPage — code path checked first)
//   - /blog Foundations section
//   - RelatedFoundations component (via fetchBlogIndex merge)

import whyPeopleRegainWeight from "./why-people-regain-weight-after-dieting";
import type { Foundation } from "./types";

export const FOUNDATIONS: Foundation[] = [whyPeopleRegainWeight];

export function getFoundationBySlug(slug: string): Foundation | undefined {
  return FOUNDATIONS.find((f) => f.meta.slug === slug);
}

export type { Foundation, FoundationMeta } from "./types";
