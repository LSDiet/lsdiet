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
import willLosingWeightChangeTreatment from "./will-losing-weight-change-how-people-treat-you-at-work";

// Batch 10 — GLP-1 & behaviour
import whyOzempicWontKeepWeightOff from "./why-ozempic-wont-keep-the-weight-off";
import whyYouEatAtNightWhenNotHungry from "./why-you-eat-at-night-even-when-youre-not-hungry";
import losingMuscleNotFatOnGlp1 from "./youre-losing-muscle-not-just-fat-on-glp1-drugs";

// Batch 11
import whyYouRegainWeightAfterStoppingOzempic from "./why-you-regain-weight-after-stopping-ozempic";

// Batch 12
import oralGlp1PillWhatHappensWhenYouStop from "./oral-glp-1-pill-what-happens-when-you-stop";
import yoYoDietingMetabolismMyth from "./yo-yo-dieting-metabolism-myth";
// Batch 14
import doesGlp1WeightLossCount from "./does-glp1-weight-loss-count";

// Batch 15
import whyOzempicFaceHappens from "./why-ozempic-face-happens";

// Batch 16
import goodFatBadFatHighProteinDiet from "./good-fat-bad-fat-high-protein-diet";

// Batch 17
import howToAvoidGainingWeightWhileTravelingForWork from "./how-to-avoid-gaining-weight-while-traveling-for-work";

// Batch 18
import medicareGlp1CopayWontFixTheRealProblem from "./medicare-glp1-copay-wont-fix-the-real-problem";

// Batch 19
import doesFibermaxxingHelpYouLoseWeight from "./does-fibermaxxing-help-you-lose-weight";

// Batch 20
import isLosingWeightTooFastBadForYou from "./is-losing-weight-too-fast-bad-for-you";

// Batch 21
import whyLettingYourselfGoIsntWhatHappened from "./why-letting-yourself-go-isnt-what-happened";

// Batch 22
import whyOneRelaxDayTurnsIntoARelapse from "./why-one-relax-day-turns-into-a-relapse";

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
  willLosingWeightChangeTreatment,
  // Batch 10
  whyOzempicWontKeepWeightOff,
  whyYouEatAtNightWhenNotHungry,
  losingMuscleNotFatOnGlp1,
  // Batch 11
  whyYouRegainWeightAfterStoppingOzempic,
  // Batch 12
  oralGlp1PillWhatHappensWhenYouStop,
  // Batch 13
  yoYoDietingMetabolismMyth,
  // Batch 14
  doesGlp1WeightLossCount,
  // Batch 15
  whyOzempicFaceHappens,
  // Batch 16
  goodFatBadFatHighProteinDiet,
  // Batch 17
  howToAvoidGainingWeightWhileTravelingForWork,
  // Batch 18
  medicareGlp1CopayWontFixTheRealProblem,
  // Batch 19
  doesFibermaxxingHelpYouLoseWeight,
  // Batch 20
  isLosingWeightTooFastBadForYou,
  // Batch 21
  whyLettingYourselfGoIsntWhatHappened,
  // Batch 22
  whyOneRelaxDayTurnsIntoARelapse,
];


export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.meta.slug === slug);
}

// Reverse lookup for foundation pages: articles that feed into this pillar,
// primary matches first, then articles that merely reference it as related.
export function getArticlesByFoundation(foundationSlug: string, limit = 6): Article[] {
  const primary = ARTICLES.filter((a) => a.meta.primaryFoundationSlug === foundationSlug);
  const related = ARTICLES.filter(
    (a) =>
      a.meta.primaryFoundationSlug !== foundationSlug &&
      a.meta.relatedFoundationSlugs.includes(foundationSlug),
  );
  return [...primary, ...related].slice(0, limit);
}

export type { Article, ArticleMeta } from "./types";
