// Registry of all code-managed foundation posts (pillars + entity hubs).
import whyPeopleRegainWeight from "./why-people-regain-weight-after-dieting";
import whyLsIsSustainable from "./why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting";
import weightPermanenceTriangle from "./the-weight-permanence-triangle-how-to-stop-regaining-weight";
import realityAwareness from "./reality-awareness";
import frictionAwareness from "./friction-awareness";
import patternAwareness from "./pattern-awareness";
import consequenceAwareness from "./consequence-awareness";
import identityAwareness from "./identity-awareness";
import actionPractice from "./action-practice";
import type { Foundation } from "./types";

export const FOUNDATIONS: Foundation[] = [
  whyPeopleRegainWeight,
  whyLsIsSustainable,
  weightPermanenceTriangle,
  realityAwareness,
  frictionAwareness,
  patternAwareness,
  consequenceAwareness,
  identityAwareness,
  actionPractice,
];

export function getFoundationBySlug(slug: string): Foundation | undefined {
  return FOUNDATIONS.find((f) => f.meta.slug === slug);
}

export type { Foundation, FoundationMeta } from "./types";
