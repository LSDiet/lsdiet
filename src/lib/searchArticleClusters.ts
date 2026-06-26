// Behavioural clusters for the blog page category blocks.
// Three clusters map directly to the LSDiet brand architecture.
// Adding new articles? Append the slug to the matching cluster.
// Unmapped supporting entries fall into "What People Are Searching" automatically.

export interface SearchArticleCluster {
  id: string;
  title: string;
  tagline: string;
  slugs: string[];
}

export const SEARCH_ARTICLE_CLUSTERS: SearchArticleCluster[] = [
  {
    id: "ls-way",
    title: "The LS Way",
    tagline: "What to eat so your body stops storing fat",
    slugs: [
      "can-you-lose-weight-on-a-low-carb-diet",
      "do-you-need-to-count-calories-to-lose-weight",
      "can-you-lose-weight-without-changing-your-diet",
      "can-you-lose-weight-without-feeling-hungry",
      "how-much-protein-should-you-eat-to-lose-weight",
      "what-foods-help-you-lose-weight-fastest",
      "what-should-you-eat-for-lunch-to-lose-weight",
      "how-to-meal-prep-for-weight-loss-on-a-busy-schedule",
      "is-diet-or-exercise-more-important-for-weight-loss",
      "can-you-lose-weight-without-going-to-the-gym",
      "how-much-exercise-do-you-need-for-heart-health-and-weight-loss",
      "can-a-physical-job-help-you-lose-weight",
      "how-does-sleep-affect-your-ability-to-lose-weight",
      "how-to-get-energy-to-exercise-after-working-all-day",
    ],
  },
  {
    id: "weight-permanence-training",
    title: "Weight Permanence Training",
    tagline: "Why you keep regaining weight and what to change",
    slugs: [
      "why-do-i-keep-restarting-weight-loss",
      "why-do-i-restart-weight-loss-every-monday",
      "why-do-i-lose-motivation-after-a-few-weeks",
      "why-does-stress-make-me-eat-more",
      "why-do-people-emotionally-eat-after-work",
      "why-do-i-eat-even-when-im-not-hungry",
      "why-do-healthy-habits-collapse-during-stress",
      "can-accountability-help-you-lose-weight",
      "how-to-stay-motivated-to-lose-weight-when-working-full-time",
      "why-ozempic-wont-keep-the-weight-off",
      "why-you-eat-at-night-even-when-youre-not-hungry",
      "why-you-regain-weight-after-stopping-ozempic",
      "youre-losing-muscle-not-just-fat-on-glp1-drugs",
      "why-do-i-keep-losing-and-regaining-the-same-weight",
      "how-to-lose-weight-quietly-without-announcing-it",
      "how-weight-loss-changes-confidence-and-social-behaviour",
      "how-much-does-weight-loss-affect-your-metabolism",
      "why-does-weight-loss-feel-easier-when-im-younger",
      "oral-glp-1-pill-what-happens-when-you-stop",
      "yo-yo-dieting-metabolism-myth",
    ],
  },
  {
    id: "what-people-are-searching",
    title: "What People Are Searching",
    tagline: "Real questions from real people, answered",
    slugs: [
      "how-to-lose-weight-with-a-desk-job",
      "how-to-lose-weight-when-you-work-long-hours",
      "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work",
      "can-stress-at-work-prevent-weight-loss",
      "can-you-lose-weight-while-working-night-shifts",
      "office-job-weight-loss-success-stories",
      "do-standing-desks-help-with-weight-loss",
      "how-to-avoid-weight-gain-working-an-office-job",
      "whats-the-best-weight-loss-program-for-busy-professionals",
      "will-losing-weight-change-how-people-treat-you-at-work",
      "will-losing-weight-improve-your-career-prospects",
      "does-weight-loss-change-dating-and-attraction",
      "how-much-weight-can-you-realistically-lose-in-a-month",
      "how-to-overcome-weight-loss-plateaus",
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
