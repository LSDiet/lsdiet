// Deterministic per-article CTA label variation. URL is always the Skool URL;
// only copy varies so 40 articles don't all end with the same line.

const CTA_VARIANTS = [
  "Learn the LS Diet system",
  "Explore the free LS Diet framework",
  "Start the free Action Practice lessons",
  "Join the LS Diet behavioural system",
  "Join the free LS Diet Course",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const CTA_URL = "https://www.skool.com/lsdiet/about";

export function getArticleCta(slug: string): string {
  return CTA_VARIANTS[hash(slug) % CTA_VARIANTS.length];
}
