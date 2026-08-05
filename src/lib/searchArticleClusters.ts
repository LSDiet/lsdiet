// Behavioural clusters for the blog page's "Browse the shelves" section.
// Four topics, matching the client's taxonomy (see docs/BLOG_TAXONOMY.md).
// Adding new articles? Append the slug to the matching cluster.
// Unmapped supporting entries fall into "weight-permanence-training" automatically.

export interface SearchArticleCluster {
  id: string;
  title: string;
  tagline: string;
  slugs: string[];
}

export const SEARCH_ARTICLE_CLUSTERS: SearchArticleCluster[] = [
  {
    id: "weight-permanence-training",
    title: "Weight Permanence Training™",
    tagline: "The method and mindset behind lasting change.",
    slugs: [
      "yo-yo-dieting-metabolism-myth",
      "why-do-i-keep-restarting-weight-loss",
      "why-do-i-lose-motivation-after-a-few-weeks",
      "why-do-i-restart-weight-loss-every-monday",
      "why-do-i-keep-losing-and-regaining-the-same-weight",
      "why-you-eat-at-night-even-when-youre-not-hungry",
      "why-do-i-eat-even-when-im-not-hungry",
      "can-accountability-help-you-lose-weight",
      "how-to-lose-weight-quietly-without-announcing-it",
      "how-weight-loss-changes-confidence-and-social-behaviour",
      "does-weight-loss-change-dating-and-attraction",
      "is-losing-weight-too-fast-bad-for-you",
      "why-letting-yourself-go-isnt-what-happened",
      "why-ai-calorie-tracking-wont-fix-a-willpower-problem",
      "why-one-relax-day-turns-into-a-relapse",
      "why-goal-weight-doesnt-feel-like-enough",
      "why-saying-youre-fine-with-your-weight-doesnt-mean-you-are",
    ],
  },
  {
    id: "low-starch-low-sugar-science",
    title: "Low Starch, Low Sugar Science",
    tagline: "The science behind starch, sugar, and insulin.",
    slugs: [
      "does-fibermaxxing-help-you-lose-weight",
      "good-fat-bad-fat-high-protein-diet",
      "how-much-exercise-do-you-need-for-heart-health-and-weight-loss",
      "is-diet-or-exercise-more-important-for-weight-loss",
      "do-you-need-to-count-calories-to-lose-weight",
      "how-much-does-weight-loss-affect-your-metabolism",
      "how-much-weight-can-you-realistically-lose-in-a-month",
      "what-foods-help-you-lose-weight-fastest",
      "can-you-lose-weight-without-changing-your-diet",
      "can-you-lose-weight-on-a-low-carb-diet",
      "can-you-lose-weight-without-feeling-hungry",
      "how-to-overcome-weight-loss-plateaus",
      "how-much-protein-should-you-eat-to-lose-weight",
      "why-does-weight-loss-feel-easier-when-im-younger",
      "how-does-sleep-affect-your-ability-to-lose-weight",
      "why-you-cant-eat-carbs-like-you-used-to",
      "do-you-need-to-exercise-to-lose-weight",
      "do-you-need-a-continuous-glucose-monitor-to-lose-weight",
    ],
  },
  {
    id: "medication-independence",
    title: "Medication Independence",
    tagline: "GLP-1s, Ozempic, and life after the injection.",
    slugs: [
      "does-glp1-weight-loss-count",
      "oral-glp-1-pill-what-happens-when-you-stop",
      "why-you-regain-weight-after-stopping-ozempic",
      "why-ozempic-wont-keep-the-weight-off",
      "youre-losing-muscle-not-just-fat-on-glp1-drugs",
      "why-ozempic-face-happens",
      "medicare-glp1-copay-wont-fix-the-real-problem",
      "why-glp1-drugs-alone-wont-solve-europes-obesity-crisis",
    ],
  },
  {
    id: "busy-professional-execution",
    title: "Busy Professional Execution",
    tagline: "Making it work through desk jobs and night shifts.",
    slugs: [
      "how-to-lose-weight-with-a-desk-job",
      "can-stress-at-work-prevent-weight-loss",
      "how-to-lose-weight-when-you-work-long-hours",
      "can-you-lose-weight-while-working-night-shifts",
      "do-standing-desks-help-with-weight-loss",
      "how-to-avoid-weight-gain-working-an-office-job",
      "office-job-weight-loss-success-stories",
      "whats-the-best-weight-loss-program-for-busy-professionals",
      "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work",
      "how-to-get-energy-to-exercise-after-working-all-day",
      "how-to-meal-prep-for-weight-loss-on-a-busy-schedule",
      "how-to-stay-motivated-to-lose-weight-when-working-full-time",
      "why-do-healthy-habits-collapse-during-stress",
      "why-does-stress-make-me-eat-more",
      "why-do-people-emotionally-eat-after-work",
      "will-losing-weight-change-how-people-treat-you-at-work",
      "will-losing-weight-improve-your-career-prospects",
      "can-a-physical-job-help-you-lose-weight",
      "can-you-lose-weight-without-going-to-the-gym",
      "what-should-you-eat-for-lunch-to-lose-weight",
      "how-to-avoid-gaining-weight-while-traveling-for-work",
    ],
  },
];

const SLUG_TO_CLUSTER = new Map<string, SearchArticleCluster>();
for (const c of SEARCH_ARTICLE_CLUSTERS) {
  for (const s of c.slugs) SLUG_TO_CLUSTER.set(s, c);
}

export function clusterOfSlug(slug: string): SearchArticleCluster | undefined {
  return SLUG_TO_CLUSTER.get(slug);
}
