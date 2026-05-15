// Source-of-truth taxonomy for the LS Diet blog index.
// Flat, lowercase, hyphenated. Add new tags here BEFORE using them in Contentful.

export const TAXONOMY: ReadonlySet<string> = new Set([
  // Physiology
  "insulin-resistance",
  "blood-sugar",
  "metabolism",
  "glp-1",
  "hunger-hormones",
  "leptin",
  "ghrelin",
  "set-point",

  // Behaviour & psychology
  "food-noise",
  "cravings",
  "motivation",
  "willpower",
  "habit-formation",
  "identity-change",
  "behavioural-psychology",
  "awareness",

  // Diet mechanics
  "low-starch",
  "low-sugar",
  "carb-cycling",
  "protein",
  "fibre",
  "hidden-sugars",
  "food-labels",
  "meal-timing",
  "eating-until-full",

  // Outcomes & failure modes
  "weight-regain",
  "plateau",
  "yo-yo-dieting",
  "binge-eating",
  "restriction-failure",
  "long-term-maintenance",

  // Lifestyle context
  "social-eating",
  "restaurant-eating",
  "travel",
  "family",
  "stress",
  "sleep",
  "exercise",

  // Tools & comparisons
  "glp-1-comparison",
  "keto-comparison",
  "intermittent-fasting",
  "calorie-counting",
  "weight-loss-apps",
]);

export const CONTENT_TYPES: ReadonlySet<string> = new Set([
  "pillar",
  "supporting",
  "comparison",
  "evergreen-faq",
]);

export const DEFAULT_CONTENT_TYPE = "supporting";

// Stop words for fallback keyword extraction.
export const STOP_WORDS: ReadonlySet<string> = new Set([
  "the","a","an","and","or","but","if","then","else","of","to","in","on","at","for","with","by","from","as","is","are","was","were","be","been","being","it","its","this","that","these","those","you","your","we","our","i","my","me","they","them","their","he","she","his","her","do","does","did","done","have","has","had","will","would","can","could","should","may","might","just","not","no","yes","so","than","very","more","most","much","some","any","all","one","two","three","how","why","what","when","where","who","which","up","down","out","about","into","over","after","before","between","through","because","while","also","like","get","got","make","makes","made","new","best","top",
]);

export function normalizeTag(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractFallbackTopics(title: string, excerpt: string, max = 4): string[] {
  const text = `${title} ${excerpt}`.toLowerCase();
  const words = text.match(/[a-z][a-z-]{2,}/g) ?? [];
  const counts = new Map<string, number>();
  for (const w of words) {
    if (STOP_WORDS.has(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  // Prefer taxonomy hits first, then most-frequent remaining words.
  const taxonomyHits: string[] = [];
  for (const tag of TAXONOMY) {
    const bare = tag.replace(/-/g, " ");
    if (text.includes(tag) || text.includes(bare)) taxonomyHits.push(tag);
  }
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .filter((w) => !taxonomyHits.includes(w));
  return [...new Set([...taxonomyHits, ...ranked])].slice(0, max);
}
