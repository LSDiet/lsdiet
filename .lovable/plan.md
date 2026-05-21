## /blog page changes

**1. Reorder sections** (`src/pages/BlogPage.tsx`)
New order:
1. Foundations (unchanged)
2. **Editorial Posts** (moved up)
3. **Search-driven articles** (moved down)

**2. Thumbnails on Editorial Posts** (`src/pages/BlogPage.tsx`)
- Each `<li>` row becomes a two-column flex: 80×80 (mobile) / 96×96 (desktop) rounded thumbnail on the left, existing title/excerpt/date stack on the right.
- Source: `p.featuredImage.url` from Contentful (same image used inside the post).
- Fallback: subtle accent-tinted placeholder block when `featuredImage` is missing, so layout stays consistent.
- `loading="lazy"`, `object-cover`, `aspect-square`, rounded-md.

**3. Earlier Join CTA pop-up** (`src/components/JoinFloatingBar.tsx` + mount on `/blog`)
- Current bar only appears on pages that have `#method` (homepage). On /blog the trigger is missing so the bar never shows.
- Update the hook: if `#method` isn't found, fall back to "show after the user scrolls past ~200px once."
- Mount `<JoinFloatingBar />` inside `BlogPage` (and `BlogPostPage` for consistency) so the same component runs on blog routes.
- Dismiss behaviour and styling untouched.

## /blog/:slug page changes

**4. Reading-progress bar** (new `src/components/ReadingProgressBar.tsx`, used in `src/pages/BlogPostPage.tsx`)
- Fixed 3px bar pinned to top of viewport, `z-50`, amber-accent fill on a transparent track.
- Measures progress against the article body element (passed via ref) — not the whole page — so the header/footer don't skew the percentage.
- Uses `requestAnimationFrame` + passive scroll listener; updates a CSS variable `--progress` on the bar for cheap transforms (no React re-render per scroll tick).
- Hidden when progress is 0 or 100 to stay calm; appears once the user scrolls into the article.
- Respects `prefers-reduced-motion` (no transition).

## Out of scope
- No changes to Foundations or Search-driven thumbnails.
- No changes to `StickyCountdown` behaviour.
- No data/schema changes — Contentful `featuredImage` is already mapped.

## Files touched
- `src/pages/BlogPage.tsx` — reorder sections, add thumbnails to editorial list
- `src/components/JoinFloatingBar.tsx` — fallback scroll trigger when `#method` absent
- `src/pages/BlogPostPage.tsx` — mount progress bar + Join bar
- `src/components/ReadingProgressBar.tsx` — new component
