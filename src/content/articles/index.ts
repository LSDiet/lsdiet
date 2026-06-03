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

// Batch 3
import howDoesSleepAffectWeightLoss from "./how-does-sleep-affect-your-ability-to-lose-weight";
import canYouLoseWeightNightShifts from "./can-you-lose-weight-while-working-night-shifts";
import howMuchWeightLossAffectsMetabolism from "./how-much-does-weight-loss-affect-your-metabolism";
import howToLoseWeightQuietly from "./how-to-lose-weight-quietly-without-announcing-it";
import howMuchRealisticInAMonth from "./how-much-weight-can-you-realistically-lose-in-a-month";

// Batch 4
import canAPhysicalJobHelp from "./can-a-physical-job-help-you-lose-weight";
import doStandingDesksHelp from "./do-standing-desks-help-with-weight-loss";
import willLosingWeightImproveCareer from "./will-losing-weight-improve-your-career-prospects";
import whatShouldYouEatForLunch from "./what-should-you-eat-for-lunch-to-lose-weight";
import whatFoodsHelpLoseWeightFastest from "./what-foods-help-you-lose-weight-fastest";

// Batch 5
import canYouLoseWeightWithoutChangingDiet from "./can-you-lose-weight-without-changing-your-diet";
import howToAvoidWeightGainOfficeJob from "./how-to-avoid-weight-gain-working-an-office-job";
import canYouLoseWeightLowCarb from "./can-you-lose-weight-on-a-low-carb-diet";
import whyHealthyHabitsCollapseStress from "./why-do-healthy-habits-collapse-during-stress";
import whyDoIEatNotHungry from "./why-do-i-eat-even-when-im-not-hungry";

// Batch 6
import whyDoILoseMotivation from "./why-do-i-lose-motivation-after-a-few-weeks";
import whyDoesStressMakeMeEatMore from "./why-does-stress-make-me-eat-more";
import whyRestartEveryMonday from "./why-do-i-restart-weight-loss-every-monday";
import canYouLoseWeightWithoutHunger from "./can-you-lose-weight-without-feeling-hungry";
import doesWeightLossChangeDating from "./does-weight-loss-change-dating-and-attraction";

// Batch 7
import howToOvercomePlateaus from "./how-to-overcome-weight-loss-plateaus";
import howMuchProtein from "./how-much-protein-should-you-eat-to-lose-weight";
import whyEmotionallyEatAfterWork from "./why-do-people-emotionally-eat-after-work";
import officeJobSuccessStories from "./office-job-weight-loss-success-stories";
import bestProgramBusyProfessionals from "./whats-the-best-weight-loss-program-for-busy-professionals";

// Batch 8
import stayOnTrackBusySeasons from "./how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work";
import energyToExerciseAfterWork from "./how-to-get-energy-to-exercise-after-working-all-day";
import keepLosingAndRegaining from "./why-do-i-keep-losing-and-regaining-the-same-weight";
import easierWhenYounger from "./why-does-weight-loss-feel-easier-when-im-younger";
import canAccountabilityHelp from "./can-accountability-help-you-lose-weight";

// Batch 9
import howMuchExerciseHeartHealth from "./how-much-exercise-do-you-need-for-heart-health-and-weight-loss";

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
  // Batch 3
  howDoesSleepAffectWeightLoss,
  canYouLoseWeightNightShifts,
  howMuchWeightLossAffectsMetabolism,
  howToLoseWeightQuietly,
  howMuchRealisticInAMonth,
  // Batch 4
  canAPhysicalJobHelp,
  doStandingDesksHelp,
  willLosingWeightImproveCareer,
  whatShouldYouEatForLunch,
  whatFoodsHelpLoseWeightFastest,
  // Batch 5
  canYouLoseWeightWithoutChangingDiet,
  howToAvoidWeightGainOfficeJob,
  canYouLoseWeightLowCarb,
  whyHealthyHabitsCollapseStress,
  whyDoIEatNotHungry,
  // Batch 6
  whyDoILoseMotivation,
  whyDoesStressMakeMeEatMore,
  whyRestartEveryMonday,
  canYouLoseWeightWithoutHunger,
  doesWeightLossChangeDating,
  // Batch 7
  howToOvercomePlateaus,
  howMuchProtein,
  whyEmotionallyEatAfterWork,
  officeJobSuccessStories,
  bestProgramBusyProfessionals,
  // Batch 8
  stayOnTrackBusySeasons,
  energyToExerciseAfterWork,
  keepLosingAndRegaining,
  easierWhenYounger,
  canAccountabilityHelp,
  // Batch 9
  howMuchExerciseHeartHealth,
];


export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.meta.slug === slug);
}

export type { Article, ArticleMeta } from "./types";
