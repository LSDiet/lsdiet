// Deterministic related-supporting-article ranking used by the
// end-of-article Related Posts grid and the mid-flow aside.
//
// Pathway picks (foundation/awareness/identity/support) are excluded by
// the caller so the three surface areas (mid-aside, pathway, related
// grid) stay distinct and minimize circular loops.
//
// Ranking priority (locked — biased toward semantic clustering, not
// keyword similarity):
//
//   Tier 1  same behavioural cluster (Office, Psychology, Food,
//           Reality, Confidence)                          +1000
//   Tier 2  same canonicalTopic (psychological/behavioural theme:
//           awareness-stages, stop-weight-regain, etc.)    +300
//   Tier 3  pillar / foundation relationship
//             • shared primaryFoundationSlug                +120
//             • current's primary in candidate's related     +40
//             • candidate's primary in current's related     +40
//             • per-overlap in relatedFoundationSlugs        +15
//   Tier 4  textual / topical similarity
//             • per-overlap topic tag                         +4
//   Tier 5  recency tiebreaker (more recent updatedAt wins)
//
// Each tier weight strictly dominates the worst possible total of all
// lower tiers, so ordering is guaranteed lexicographic by tier.
//
// Deduplication contract:
//   • current slug always excluded
//   • caller passes excludeSlugs covering pathway picks + mid-aside
//   • RelatedArticles grid receives slugs not present in either
//     upstream surface — preventing repeat anchors on the same page

import { ARTICLES, type Article } from "@/content/articles";
import { clusterOfSlug } from "./searchArticleClusters";

const W_CLUSTER = 1000;
const W_CANONICAL = 300;
const W_SHARED_PRIMARY_FOUNDATION = 120;
const W_PRIMARY_IN_RELATED = 40;
const W_RELATED_FOUNDATION_OVERLAP = 15;
const W_TOPIC_OVERLAP = 4;

export interface RankedArticle {
  article: Article;
  score: number;
  signals: string[];
}

export function rankRelatedArticles(
  current: Article,
  excludeSlugs: Set<string> = new Set(),
): RankedArticle[] {
  const cluster = clusterOfSlug(current.meta.slug);
  const clusterSlugs = new Set(cluster?.slugs ?? []);
  const currentTopics = new Set(current.meta.topics);
  const currentRelatedFoundations = new Set(current.meta.relatedFoundationSlugs);

  const candidates = ARTICLES.filter(
    (a) => a.meta.slug !== current.meta.slug && !excludeSlugs.has(a.meta.slug),
  );

  const scored: RankedArticle[] = candidates.map((a) => {
    let score = 0;
    const signals: string[] = [];

    if (clusterSlugs.has(a.meta.slug)) {
      score += W_CLUSTER;
      signals.push(`cluster:${cluster?.id}`);
    }
    if (a.meta.canonicalTopic === current.meta.canonicalTopic) {
      score += W_CANONICAL;
      signals.push(`canonical:${a.meta.canonicalTopic}`);
    }
    if (a.meta.primaryFoundationSlug === current.meta.primaryFoundationSlug) {
      score += W_SHARED_PRIMARY_FOUNDATION;
      signals.push(`primary-foundation:${a.meta.primaryFoundationSlug}`);
    }
    if (a.meta.relatedFoundationSlugs.includes(current.meta.primaryFoundationSlug)) {
      score += W_PRIMARY_IN_RELATED;
      signals.push(`primary->related:${current.meta.primaryFoundationSlug}`);
    }
    if (currentRelatedFoundations.has(a.meta.primaryFoundationSlug)) {
      score += W_PRIMARY_IN_RELATED;
      signals.push(`related->primary:${a.meta.primaryFoundationSlug}`);
    }
    let relatedOverlap = 0;
    for (const s of a.meta.relatedFoundationSlugs) {
      if (currentRelatedFoundations.has(s)) relatedOverlap += 1;
    }
    if (relatedOverlap > 0) {
      score += relatedOverlap * W_RELATED_FOUNDATION_OVERLAP;
      signals.push(`related-foundations:${relatedOverlap}`);
    }
    let topicOverlap = 0;
    for (const t of a.meta.topics) if (currentTopics.has(t)) topicOverlap += 1;
    if (topicOverlap > 0) {
      score += topicOverlap * W_TOPIC_OVERLAP;
      signals.push(`topics:${topicOverlap}`);
    }

    return { article: a, score, signals };
  });

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    // Tier 5 — recency tiebreaker (most recent updatedAt first).
    const xt = x.article.meta.updatedAt ?? "";
    const yt = y.article.meta.updatedAt ?? "";
    if (xt !== yt) return xt < yt ? 1 : -1;
    // Stable final tiebreak — slug alphabetical.
    return x.article.meta.slug < y.article.meta.slug ? -1 : 1;
  });

  return scored;
}

export function getRelatedArticles(
  current: Article,
  excludeSlugs: Set<string> = new Set(),
  limit = 5,
): Article[] {
  return rankRelatedArticles(current, excludeSlugs)
    .slice(0, limit)
    .map((r) => r.article);
}
