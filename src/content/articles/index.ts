// Registry of all code-managed Search-driven articles.
//
// Articles are the utility/search-entry layer. They are filtered out of
// the merged blog index whenever a Foundation or Contentful post shares
// the same slug (precedence: Foundations > Contentful > Articles).
//
// Add new articles by importing them and appending to ARTICLES.

import type { Article } from "./types";

import howToLoseWeightWithADeskJob from "./how-to-lose-weight-with-a-desk-job";
import canYouLoseWeightWithoutGoingToTheGym from "./can-you-lose-weight-without-going-to-the-gym";
import whyDoIKeepRestartingWeightLoss from "./why-do-i-keep-restarting-weight-loss";
import isDietOrExerciseMoreImportantForWeightLoss from "./is-diet-or-exercise-more-important-for-weight-loss";
import canStressAtWorkPreventWeightLoss from "./can-stress-at-work-prevent-weight-loss";

export const ARTICLES: Article[] = [
  howToLoseWeightWithADeskJob,
  canYouLoseWeightWithoutGoingToTheGym,
  whyDoIKeepRestartingWeightLoss,
  isDietOrExerciseMoreImportantForWeightLoss,
  canStressAtWorkPreventWeightLoss,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.meta.slug === slug);
}

export type { Article, ArticleMeta } from "./types";
