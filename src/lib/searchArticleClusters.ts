// Behavioural clusters for the Search-driven articles section on /blog.
//
// This is the single source of truth for cluster grouping. Renders are
// driven by this config — slugs map manually into behavioural neighbourhoods,
// not by chronological feed or canonicalTopic bucketing.
//
// Adding new articles? Append the slug to the matching cluster. Unmapped
// supporting entries fall into a final "More" bucket only if they exist.

export interface SearchArticleCluster {
  id: string;
  title: string;
  description: string;
  slugs: string[];
}

export const SEARCH_ARTICLE_CLUSTERS: SearchArticleCluster[] = [
  {
    id: "office-work-life",
    title: "Office & Work Life",
    description:
      "Weight loss challenges related to office work, busy schedules, fatigue, stress, and professional routines.",
    slugs: [
      "how-to-lose-weight-with-a-desk-job",
      "how-to-lose-weight-when-you-work-long-hours",
      "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work",
      "can-stress-at-work-prevent-weight-loss",
      "can-you-lose-weight-while-working-night-shifts",
      "office-job-weight-loss-success-stories",
      "do-standing-desks-help-with-weight-loss",
      "how-to-meal-prep-for-weight-loss-on-a-busy-schedule",
      "what-should-you-eat-for-lunch-to-lose-weight",
      "how-to-get-energy-to-exercise-after-working-all-day",
    ],
  },
  {
    id: "psychology-behaviour",
    title: "Psychology & Behaviour",
    description:
      "Why people restart weight loss, emotionally eat, lose motivation, and struggle with behavioural consistency.",
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
    ],
  },
  {
    id: "food-hunger-eating",
    title: "Food, Hunger & Eating Systems",
    description:
      "Low-starch low-sugar eating, cravings, fullness, meal structure, and sustainable food systems.",
    slugs: [
      "can-you-lose-weight-on-a-low-carb-diet",
      "do-you-need-to-count-calories-to-lose-weight",
      "can-you-lose-weight-without-changing-your-diet",
      "what-foods-help-you-lose-weight-fastest",
      "can-you-lose-weight-without-feeling-hungry",
      "how-much-protein-should-you-eat-to-lose-weight",
    ],
  },
  {
    id: "weight-loss-reality",
    title: "Weight Loss Reality",
    description:
      "Realistic expectations around metabolism, plateaus, sustainability, aging, and long term consistency.",
    slugs: [
      "how-much-weight-can-you-realistically-lose-in-a-month",
      "how-to-overcome-weight-loss-plateaus",
      "how-much-does-weight-loss-affect-your-metabolism",
      "why-does-weight-loss-feel-easier-when-im-younger",
      "why-do-i-keep-losing-and-regaining-the-same-weight",
      "is-diet-or-exercise-more-important-for-weight-loss",
      "can-you-lose-weight-without-going-to-the-gym",
      "youre-losing-muscle-not-just-fat-on-glp1-drugs",
    ],
  },
  {
    id: "confidence-identity-social",
    title: "Confidence, Identity & Social Life",
    description:
      "How weight loss affects confidence, behaviour, attraction, workplace perception, and identity.",
    slugs: [
      "how-weight-loss-changes-confidence-and-social-behaviour",
      "will-losing-weight-improve-your-career-prospects",
      "does-weight-loss-change-dating-and-attraction",
      "how-to-lose-weight-quietly-without-announcing-it",
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
