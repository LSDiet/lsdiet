// Behavioural pathway routing for supporting articles.
//
// Maps any supporting article onto a fixed psychological progression:
//   Problem  →  Awareness  →  Implementation  →  Identity  →  Support
//
// Each slot resolves to a Foundation or Article with a stable title + href.
// Deterministic; deduplicated against the current slug and earlier picks.

import { ARTICLES, getArticleBySlug, type Article } from "@/content/articles";
import { FOUNDATIONS, getFoundationBySlug } from "@/content/foundations";
import { clusterOfSlug } from "./searchArticleClusters";

const AWARENESS_FOUNDATION_SLUGS = [
  "reality-awareness",
  "friction-awareness",
  "pattern-awareness",
  "consequence-awareness",
  "identity-awareness",
];

const IMPLEMENTATION_FOUNDATION = "action-practice";
const IDENTITY_FOUNDATION = "identity-awareness";
const SUPPORT_FALLBACK_ARTICLE = "can-accountability-help-you-lose-weight";

const IDENTITY_CONFIDENCE_FALLBACK_ARTICLES = [
  "how-weight-loss-changes-confidence-and-social-behaviour",
  "does-weight-loss-change-dating-and-attraction",
  "will-losing-weight-improve-your-career-prospects",
];

const IMPLEMENTATION_FALLBACK_ARTICLES = [
  "how-to-meal-prep-for-weight-loss-on-a-busy-schedule",
  "how-to-overcome-weight-loss-plateaus",
  "how-to-get-energy-to-exercise-after-working-all-day",
];

export interface PathwayStep {
  label: string;          // e.g. "Awareness"
  title: string;
  href: string;
  kind: "foundation" | "article";
}

export interface Pathway {
  awareness: PathwayStep | null;
  implementation: PathwayStep | null;
  identity: PathwayStep | null;
  support: PathwayStep | null;
}

function foundationStep(slug: string, label: string): PathwayStep | null {
  const f = getFoundationBySlug(slug);
  if (!f) return null;
  return {
    label,
    title: f.meta.listTitle ?? f.meta.title,
    href: `/blog/${f.meta.slug}`,
    kind: "foundation",
  };
}

function articleStep(slug: string, label: string): PathwayStep | null {
  const a = getArticleBySlug(slug);
  if (!a) return null;
  return {
    label,
    title: a.meta.title,
    href: `/blog/${a.meta.slug}`,
    kind: "article",
  };
}

function articleFromList(slugs: string[], used: Set<string>, label: string): PathwayStep | null {
  for (const s of slugs) {
    if (used.has(s)) continue;
    const step = articleStep(s, label);
    if (step) return step;
  }
  return null;
}

function pickAwareness(current: Article, used: Set<string>): PathwayStep | null {
  // 1. If the article's primary foundation IS an awareness foundation, use it.
  if (AWARENESS_FOUNDATION_SLUGS.includes(current.meta.primaryFoundationSlug)) {
    if (!used.has(current.meta.primaryFoundationSlug)) {
      return foundationStep(current.meta.primaryFoundationSlug, "Awareness");
    }
  }
  // 2. Otherwise, prefer an awareness foundation listed in the article's
  //    relatedFoundationSlugs.
  for (const s of current.meta.relatedFoundationSlugs) {
    if (AWARENESS_FOUNDATION_SLUGS.includes(s) && !used.has(s)) {
      return foundationStep(s, "Awareness");
    }
  }
  // 3. Fall back to pattern-awareness as the default lens.
  for (const s of ["pattern-awareness", "friction-awareness", "consequence-awareness"]) {
    if (!used.has(s)) {
      const step = foundationStep(s, "Awareness");
      if (step) return step;
    }
  }
  return null;
}

function pickImplementation(current: Article, used: Set<string>): PathwayStep | null {
  // Default: action-practice foundation.
  if (
    current.meta.primaryFoundationSlug !== IMPLEMENTATION_FOUNDATION &&
    !used.has(IMPLEMENTATION_FOUNDATION)
  ) {
    const step = foundationStep(IMPLEMENTATION_FOUNDATION, "Implementation");
    if (step) return step;
  }
  // If current article IS about action-practice (or AP foundation already
  // used), pick the strongest in-cluster behaviour demonstration.
  const cluster = clusterOfSlug(current.meta.slug);
  if (cluster) {
    const candidates = cluster.slugs.filter(
      (s) => s !== current.meta.slug && !used.has(s),
    );
    const step = articleFromList(candidates, used, "Implementation");
    if (step) return step;
  }
  return articleFromList(IMPLEMENTATION_FALLBACK_ARTICLES, used, "Implementation");
}

function pickIdentity(current: Article, used: Set<string>): PathwayStep | null {
  if (
    current.meta.primaryFoundationSlug !== IDENTITY_FOUNDATION &&
    !used.has(IDENTITY_FOUNDATION)
  ) {
    const step = foundationStep(IDENTITY_FOUNDATION, "Identity");
    if (step) return step;
  }
  return articleFromList(IDENTITY_CONFIDENCE_FALLBACK_ARTICLES, used, "Identity");
}

function pickSupport(current: Article, used: Set<string>): PathwayStep | null {
  if (current.meta.slug !== SUPPORT_FALLBACK_ARTICLE && !used.has(SUPPORT_FALLBACK_ARTICLE)) {
    const step = articleStep(SUPPORT_FALLBACK_ARTICLE, "Support");
    if (step) return step;
  }
  // Fallback: same-cluster sibling not yet used.
  const cluster = clusterOfSlug(current.meta.slug);
  if (cluster) {
    const candidates = cluster.slugs.filter(
      (s) => s !== current.meta.slug && !used.has(s),
    );
    const step = articleFromList(candidates, used, "Support");
    if (step) return step;
  }
  // Last resort: any article not yet used.
  for (const a of ARTICLES) {
    if (a.meta.slug !== current.meta.slug && !used.has(a.meta.slug)) {
      return {
        label: "Support",
        title: a.meta.title,
        href: `/blog/${a.meta.slug}`,
        kind: "article",
      };
    }
  }
  return null;
}

export function getPathway(current: Article): Pathway {
  const used = new Set<string>([current.meta.slug]);

  const awareness = pickAwareness(current, used);
  if (awareness) used.add(stepSlug(awareness));

  const implementation = pickImplementation(current, used);
  if (implementation) used.add(stepSlug(implementation));

  const identity = pickIdentity(current, used);
  if (identity) used.add(stepSlug(identity));

  const support = pickSupport(current, used);
  if (support) used.add(stepSlug(support));

  return { awareness, implementation, identity, support };
}

function stepSlug(step: PathwayStep): string {
  return step.href.replace(/^\/blog\//, "");
}

// Helper: convert ranked Article list into pathway-aware exclusion set.
export function pathwaySlugSet(p: Pathway): Set<string> {
  const set = new Set<string>();
  for (const step of [p.awareness, p.implementation, p.identity, p.support]) {
    if (step) set.add(step.href.replace(/^\/blog\//, ""));
  }
  return set;
}

// Resolve foundation title by slug (used by the authority line under byline).
export function getFoundationTitle(slug: string): string | null {
  const f = FOUNDATIONS.find((x) => x.meta.slug === slug);
  return f ? (f.meta.listTitle ?? f.meta.title) : null;
}
