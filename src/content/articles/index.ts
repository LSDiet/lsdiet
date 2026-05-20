// Registry of all code-managed Search-driven articles.
//
// Articles are the utility/search-entry layer. They are filtered out of
// the merged blog index whenever a Foundation or Contentful post shares
// the same slug (precedence: Foundations > Contentful > Articles).
//
// Add new articles by importing them and appending to ARTICLES.

import type { Article } from "./types";

// Batch 1
import howToLoseWeightWithADeskJob from "./how-to-lose-weight-with-a-desk-job";
import canYouLoseWeightWithoutGoingToTheGym from "./can-you-lose-weight-without-going-to-the-gym";
import whyDoIKeepRestartingWeightLoss from "./why-do-i-keep-restarting-weight-loss";
import isDietOrExerciseMoreImportantForWeightLoss from "./is-diet-or-exercise-more-important-for-weight-loss";
import canStressAtWorkPreventWeightLoss from "./can-stress-at-work-prevent-weight-loss";

// Batch 2
import howToStayMotivatedFullTime from "./how-to-stay-motivated-to-lose-weight-when-working-full-time";
import howToMealPrepBusySchedule from "./how-to-meal-prep-for-weight-loss-on-a-busy-schedule";
import doYouNeedToCountCalories from "./do-you-need-to-count-calories-to-lose-weight";
import howWeightLossChangesConfidence from "./how-weight-loss-changes-confidence-and-social-behaviour";
import howToLoseWeightLongHours from "./how-to-lose-weight-when-you-work-long-hours";

export const ARTICLES: Article[] = [
  // Batch 1
  howToLoseWeightWithADeskJob,
  canYouLoseWeightWithoutGoingToTheGym,
  whyDoIKeepRestartingWeightLoss,
  isDietOrExerciseMoreImportantForWeightLoss,
  canStressAtWorkPreventWeightLoss,
  // Batch 2
  howToStayMotivatedFullTime,
  howToMealPrepBusySchedule,
  doYouNeedToCountCalories,
  howWeightLossChangesConfidence,
  howToLoseWeightLongHours,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.meta.slug === slug);
}

export type { Article, ArticleMeta } from "./types";
