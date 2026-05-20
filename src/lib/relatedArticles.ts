// Deterministic related-supporting-article ranking used by the mid-flow
// aside on supporting article pages. Pathway picks (foundation/awareness/
// identity/support) are excluded by the caller so the two surface areas
// don't repeat each other.

import { ARTICLES, type Article } from "@/content/articles";
import { clusterOfSlug } from "./searchArticleClusters";

export function getRelatedArticles(
  current: Article,
  excludeSlugs: Set<string> = new Set(),
  limit = 5,
): Article[] {
  const cluster = clusterOfSlug(current.meta.slug);
  const clusterSlugs = new Set(cluster?.slugs ?? []);
  const currentTopics = new Set(current.meta.topics);

  const candidates = ARTICLES.filter(
    (a) => a.meta.slug !== current.meta.slug && !excludeSlugs.has(a.meta.slug),
  );

  const scored = candidates.map((a) => {
    let score = 0;
    // 1. Same cluster — strongest signal.
    if (clusterSlugs.has(a.meta.slug)) score += 100;
    // 2. Same canonicalTopic.
    if (a.meta.canonicalTopic === current.meta.canonicalTopic) score += 30;
    // 3. Shared primaryFoundationSlug.
    if (a.meta.primaryFoundationSlug === current.meta.primaryFoundationSlug) {
      score += 20;
    }
    // 4. Shared topics intersection.
    for (const t of a.meta.topics) if (currentTopics.has(t)) score += 4;
    return { article: a, score };
  });

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    // Deterministic tiebreaker — alphabetical slug.
    return x.article.meta.slug < y.article.meta.slug ? -1 : 1;
  });

  return scored.slice(0, limit).map((s) => s.article);
}
