// Category- and placement-aware copy for <LSDietCTA />.
//
// Inputs that drive variant selection (first match wins):
//   1. Search-article cluster id (for code-managed articles)
//   2. Contentful category label
//   3. Foundation slug pillar
//
// Each variant exposes copy for the three placements: intro, mid, bottom.
// Messaging stays concise — no aggressive sales language. Crawlable copy
// only, no dynamic substitution at runtime.

import type { CtaPlacement } from "@/components/LSDietCTA";

interface VariantCopy {
  headline: string;
  body: string;
}

interface Variant {
  intro: VariantCopy;
  mid: VariantCopy;
  bottom: VariantCopy;
}

const DEFAULT: Variant = {
  intro: {
    headline: "Stop the regain cycle for good",
    body: "The free LS Diet Course turns low-starch, low-sugar eating into a system you can run for life — not another restart.",
  },
  mid: {
    headline: "The system behind everything you're reading",
    body: "LS Diet teaches you the Awareness stages and daily Action Practice that make weight loss permanent. Join free, work at your own pace.",
  },
  bottom: {
    headline: "Ready to make it permanent?",
    body: "Join the free LS Diet Course to follow the full Weight Permanence Triangle — Awareness, Practice, Permanence — step by step.",
  },
};

const PERMANENCE: Variant = {
  intro: {
    headline: "Why this time can actually stick",
    body: "Most diets work short-term and collapse long-term. LS Diet is built around permanence — the Weight Permanence Triangle that stops regain at the root.",
  },
  mid: {
    headline: "Permanence is a skill, not a willpower contest",
    body: "Inside the free LS Diet Course you'll learn the Awareness stages and Action Practice that prevent the rebound most diets cause.",
  },
  bottom: {
    headline: "Break the lose-regain loop",
    body: "Join the free LS Diet Course to build the awareness and practice that make weight loss stay lost.",
  },
};

const PSYCHOLOGY: Variant = {
  intro: {
    headline: "Make weight loss a mental priority, not a chore",
    body: "Restarting, emotional eating, lost motivation — these are awareness problems, not willpower problems. LS Diet rebuilds the mental layer first.",
  },
  mid: {
    headline: "Behaviour change starts with awareness",
    body: "The free LS Diet Course walks you through the five Awareness stages so the habit changes hold even on hard days.",
  },
  bottom: {
    headline: "Train the mental layer first",
    body: "Join the free LS Diet Course to rewire the daily triggers behind restarting, emotional eating, and motivation crashes.",
  },
};

const OFFICE: Variant = {
  intro: {
    headline: "Made for busy schedules, not a perfect week",
    body: "LS Diet is designed for people with desk jobs, long hours, and zero time to cook elaborate meals. Sustainable, not extreme.",
  },
  mid: {
    headline: "A system that survives your work week",
    body: "Inside the free LS Diet Course you'll learn the Action Practice that fits around meetings, fatigue, and unpredictable days.",
  },
  bottom: {
    headline: "Build it around the job you already have",
    body: "Join the free LS Diet Course to make low-starch, low-sugar eating fit your real schedule — not a fantasy one.",
  },
};

const FOOD: Variant = {
  intro: {
    headline: "Eat until full — without the regain",
    body: "Low-starch, low-sugar eating lets you stop counting and stop suffering. The LS Diet Course shows you how to run it sustainably.",
  },
  mid: {
    headline: "Sustainable eating, no calorie spreadsheets",
    body: "The free LS Diet Course covers the food rules, fullness signals, and meal structure that make the system run on autopilot.",
  },
  bottom: {
    headline: "Make low-starch low-sugar second nature",
    body: "Join the free LS Diet Course for the full food framework — what to eat, when to stop, and how to keep it going.",
  },
};

const IDENTITY: Variant = {
  intro: {
    headline: "Weight loss is an identity shift",
    body: "Lasting change happens when 'someone who eats this way' becomes who you are. LS Diet teaches that shift directly.",
  },
  mid: {
    headline: "Identity is the deepest awareness layer",
    body: "Inside the free LS Diet Course, Identity Awareness is one of the five stages that decide whether change holds for life.",
  },
  bottom: {
    headline: "Become the person who doesn't regain",
    body: "Join the free LS Diet Course to work through the identity layer that makes new behaviour feel like you.",
  },
};

// ---- Lookups ----

const CLUSTER_MAP: Record<string, Variant> = {
  "office-work-life": OFFICE,
  "psychology-behaviour": PSYCHOLOGY,
  "food-hunger-eating": FOOD,
  "weight-loss-reality": PERMANENCE,
  "confidence-identity-social": IDENTITY,
};

const CATEGORY_MAP: Record<string, Variant> = {
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

const FOUNDATION_SLUG_MAP: Record<string, Variant> = {
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

export function selectVariant(ctx: CtaContext): Variant {
  if (ctx.clusterId && CLUSTER_MAP[ctx.clusterId]) return CLUSTER_MAP[ctx.clusterId];
  if (ctx.category && CATEGORY_MAP[ctx.category]) return CATEGORY_MAP[ctx.category];
  if (ctx.foundationSlug && FOUNDATION_SLUG_MAP[ctx.foundationSlug]) {
    return FOUNDATION_SLUG_MAP[ctx.foundationSlug];
  }
  return DEFAULT;
}

export function ctaCopyFor(ctx: CtaContext, placement: CtaPlacement): VariantCopy {
  return selectVariant(ctx)[placement];
}
