// Behavioural clusters for the blog page category blocks.
// Four clusters organised by reader mindset (not internal WPT framing).
// Adding new articles? Append the slug to the matching cluster.
// Unmapped supporting entries fall into "mind-and-habits" automatically.

export interface SearchArticleCluster {
  id: string;
  title: string;
  tagline: string;
  slugs: string[];
}

export const SEARCH_ARTICLE_CLUSTERS: SearchArticleCluster[] = [
  {
    id: "ozempic-and-weight-loss-drugs",
    title: "Ozempic & Weight Loss Drugs",
    tagline: "What the science actually says about GLP-1 medications.",
    slugs: [
      "why-ozempic-wont-keep-the-weight-off",
      "why-you-regain-weight-after-stopping-ozempic",
      "youre-losing-muscle-not-just-fat-on-glp1-drugs",
      "oral-glp-1-pill-what-happens-when-you-stop",
    ],
  },
  {
    id: "mind-and-habits",
    title: "Mind & Habits",
    tagline: "Why you eat when you're not hungry — and why you keep restarting.",
    slugs: [
      "why-do-i-keep-restarting-weight-loss",
      "why-do-i-restart-weight-loss-every-monday",
      "why-do-i-lose-motivation-after-a-few-weeks",
      "why-does-stress-make-me-eat-more",
      "why-do-people-emotionally-eat-after-work",
      "why-do-i-eat-even-when-im-not-hungry",
      "why-do-healthy-habits-collapse-during-stress",
      "why-you-eat-at-night-even-when-youre-not-hungry",
      "why-do-i-keep-losing-and-regaining-the-same-weight",
      "can-accountability-help-you-lose-weight",
      "how-to-stay-motivated-to-lose-weight-when-working-full-time",
      "how-to-lose-weight-quietly-without-announcing-it",
      "how-weight-loss-changes-confidence-and-social-behaviour",
      "does-weight-loss-change-dating-and-attraction",
      "will-losing-weight-change-how-people-treat-you-at-work",
      "will-losing-weight-improve-your-career-prospects",
      "yo-yo-dieting-metabolism-myth",
    ],
  },
  {
    id: "body-and-what-to-eat",
    title: "Body & What to Eat",
    tagline: "How food affects your hormones, metabolism, and body fat.",
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
      "how-does-sleep-affect-your-ability-to-lose-weight",
      "how-much-does-weight-loss-affect-your-metabolism",
      "why-does-weight-loss-feel-easier-when-im-younger",
      "how-much-weight-can-you-realistically-lose-in-a-month",
      "how-to-overcome-weight-loss-plateaus",
      "can-a-physical-job-help-you-lose-weight",
    ],
  },
  {
    id: "weight-loss-at-work",
    title: "Weight Loss at Work",
    tagline: "Desk jobs, night shifts, long hours, and busy seasons.",
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
      "how-to-get-energy-to-exercise-after-working-all-day",
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
