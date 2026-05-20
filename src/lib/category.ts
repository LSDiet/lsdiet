// Blog post category taxonomy — Phase 1 (free-text on Contentful, enum-validated in code).
//
// TODO (Phase 2): Migrate to a dedicated `category` Contentful content type
// before scaling past ~100 posts. Free-text is fragile — typos silently fragment
// archives. The content type should expose name, slug, description, seoTitle,
// seoDescription, and become a Reference field on blogPost.
//
// Until then, this enum is the SINGLE SOURCE OF TRUTH for allowed values.
// Editors in Contentful must select from this list verbatim. Configure the
// blogPost.category field in Contentful as Short text with a "Predefined values"
// validation matching the labels below.

export const ALLOWED_CATEGORIES = [
  "Office & Work Life",
  "Psychology & Behaviour",
  "Nutrition & Meal Prep",
  "Exercise & Movement",
  "LS Diet Fundamentals",
  "Low Starch Low Sugar",
  "Weight Regain",
  "Motivation & Accountability",
  "Social Pressure & Identity",
] as const;

export type CategoryLabel = (typeof ALLOWED_CATEGORIES)[number];

export function categorySlug(raw: string): string {
  return String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CATEGORY_SLUGS: Record<string, CategoryLabel> = ALLOWED_CATEGORIES.reduce(
  (acc, label) => {
    acc[categorySlug(label)] = label;
    return acc;
  },
  {} as Record<string, CategoryLabel>,
);

export function labelForSlug(slug: string): CategoryLabel | null {
  return CATEGORY_SLUGS[slug] ?? null;
}

export function isAllowedCategory(label: string): boolean {
  return (ALLOWED_CATEGORIES as readonly string[]).includes(label.trim());
}
