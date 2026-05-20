# Blog Taxonomy

## Phase 1 (current — May 2026)

Categories are a **free-text Short text field** on the Contentful `blogPost`
content type, validated in the renderer against a hard-coded allow-list
(`src/lib/category.ts` → `ALLOWED_CATEGORIES`).

### Approved categories

1. Office & Work Life
2. Psychology & Behaviour
3. Nutrition & Meal Prep
4. Exercise & Movement
5. LS Diet Fundamentals
6. Low Starch Low Sugar
7. Weight Regain
8. Motivation & Accountability
9. Social Pressure & Identity

Editors must select from this list **verbatim**. The Contentful field should
be configured with the "Predefined values" validation listing these strings —
this prevents typos at authoring time. The edge function additionally logs a
validation warning (`X-Validation-Warnings` response header) when a published
post carries a category outside the allow-list.

### URLs

- Archive: `/category/{slug}` (e.g. `/category/office-work-life`)
- Slugify rule: lowercase, non-alphanumerics → `-`, trim leading/trailing `-`

### Affected systems

- `supabase/functions/blog-posts/index.ts` — maps + validates + serves
  `?action=categories` and `?action=byCategory`
- `supabase/functions/blog-sitemap/index.ts` — emits `/category/{slug}` URLs
- `src/pages/CategoryArchivePage.tsx` — archive UI + JSON-LD
- `src/pages/BlogPage.tsx` — chip filter
- `src/pages/BlogPostPage.tsx` — badge, breadcrumb, `articleSection`

## Phase 2 (planned, before scaling past ~100 posts)

**Migrate to a dedicated `category` Contentful content type** referenced from
`blogPost.category` instead of free-text. Fields:

| Field | Type | Notes |
|---|---|---|
| `name` | Short text | display label |
| `slug` | Short text, unique | URL slug |
| `description` | Long text | archive hero copy |
| `seoTitle` | Short text (≤60) | overrides default archive `<title>` |
| `seoDescription` | Short text (≤160) | overrides default meta desc |
| `featuredImage` | Asset | optional OG image for archive |

Reasons:

- Free-text is fragile — typos silently fragment archives and split link equity.
- A content type unlocks per-category SEO copy, hero imagery, and curated
  descriptions Google rewards on hub pages.
- References enable bi-directional graph queries (`category → posts[]`,
  `post → category`) without server-side filtering.

Migration plan when triggered:

1. Create the `category` content type with the fields above.
2. Seed it with the 9 approved labels + slugs.
3. Change `blogPost.category` from Short text → Reference (single, `category`).
4. Backfill: bulk-edit existing posts to reference the new entries.
5. Update `supabase/functions/blog-posts/index.ts` to resolve the reference
   (`include=2` already covers it).
6. Drop `ALLOWED_CATEGORIES` from `src/lib/category.ts` — the content type
   becomes the source of truth.
