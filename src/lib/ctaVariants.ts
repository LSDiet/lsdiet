// Category-aware copy for the single <LSDietCTA /> every post gets.
//
// Inputs that drive variant selection (first match wins):
//   1. Search-article cluster id (for code-managed articles)
//   2. Contentful category label
//   3. Foundation slug pillar
//
// Every variant points at the same place — the Weight Regain Profile quiz —
// framed as finding the specific blockage between where the reader is and
// where they want to be. Only the headline/body angle changes per category.

interface VariantCopy {
  headline: string;
  body: string;
}

const DEFAULT: VariantCopy = {
  headline: "Find what's actually blocking you",
  body: "The Weight Regain Profile pinpoints the exact gap between where you are and where you want to be, so you fix the real blockage instead of guessing.",
};

const PERMANENCE: VariantCopy = {
  headline: "Why the regain keeps happening",
  body: "The Weight Regain Profile identifies the specific pattern behind your regain cycle, so you can close that gap instead of repeating it.",
};

const PSYCHOLOGY: VariantCopy = {
  headline: "The blockage is rarely willpower",
  body: "The Weight Regain Profile surfaces the awareness gap driving restarts, emotional eating, or lost motivation, so you know what to fix first.",
};

const OFFICE: VariantCopy = {
  headline: "Find the blockage your schedule is hiding",
  body: "The Weight Regain Profile shows exactly where your routine breaks down, so the fix fits the job and hours you actually have.",
};

const FOOD: VariantCopy = {
  headline: "Find your specific food blockage",
  body: "The Weight Regain Profile pinpoints which eating pattern is keeping you stuck, so you know precisely what to change.",
};

const IDENTITY: VariantCopy = {
  headline: "Find the identity gap that's holding you back",
  body: "The Weight Regain Profile shows the specific gap between who you are now and who you need to become to stop regaining.",
};

// ---- Lookups ----

const CLUSTER_MAP: Record<string, VariantCopy> = {
  "office-work-life": OFFICE,
  "psychology-behaviour": PSYCHOLOGY,
  "food-hunger-eating": FOOD,
  "weight-loss-reality": PERMANENCE,
  "confidence-identity-social": IDENTITY,
};

const CATEGORY_MAP: Record<string, VariantCopy> = {
  "Office & Work Life": OFFICE,
  "Psychology & Behaviour": PSYCHOLOGY,
  "Nutrition & Meal Prep": FOOD,
  "Low Starch Low Sugar": FOOD,
  "LS Diet Fundamentals": DEFAULT,
  "Weight Regain": PERMANENCE,
  "Motivation & Accountability": PSYCHOLOGY,
  "Social Pressure & Identity": IDENTITY,
  "Exercise & Movement": OFFICE,
};

const FOUNDATION_SLUG_MAP: Record<string, VariantCopy> = {
  "why-people-regain-weight-after-dieting": PERMANENCE,
  "the-weight-permanence-triangle-how-to-stop-regaining-weight": PERMANENCE,
  "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting": FOOD,
  "reality-awareness": PSYCHOLOGY,
  "pattern-awareness": PSYCHOLOGY,
  "friction-awareness": OFFICE,
  "consequence-awareness": PERMANENCE,
  "identity-awareness": IDENTITY,
  "action-practice": DEFAULT,
};

export interface CtaContext {
  clusterId?: string;
  category?: string;
  foundationSlug?: string;
}

export function selectVariant(ctx: CtaContext): VariantCopy {
  if (ctx.clusterId && CLUSTER_MAP[ctx.clusterId]) return CLUSTER_MAP[ctx.clusterId];
  if (ctx.category && CATEGORY_MAP[ctx.category]) return CATEGORY_MAP[ctx.category];
  if (ctx.foundationSlug && FOUNDATION_SLUG_MAP[ctx.foundationSlug]) {
    return FOUNDATION_SLUG_MAP[ctx.foundationSlug];
  }
  return DEFAULT;
}

export function ctaCopyFor(ctx: CtaContext): VariantCopy {
  return selectVariant(ctx);
}
