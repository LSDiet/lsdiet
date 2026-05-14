## Problem

Three places inject a `FAQPage` JSON-LD block, and they overlap on every route:

1. `index.html` — sitewide `@graph` includes a `FAQPage` (`@id: https://lsdiet.com/#faq`) with 7 questions. Because it's in the static `<head>`, it ships on **every** route, including `/faq`.
2. `src/components/FAQSection.tsx` — Helmet-injects a `FAQPage` with 7 questions. Renders on `/` (homepage).
3. `src/pages/CoreFAQPage.tsx` — Helmet-injects a `FAQPage` with 8 questions. Renders on `/faq`.

Result:
- `/` ships **2** FAQPage blocks (index.html + FAQSection).
- `/faq` ships **2** FAQPage blocks (index.html + CoreFAQPage).

Google Search Console flags both as duplicate FAQPage definitions.

## Fix

Single source of truth per route: remove the sitewide FAQPage from `index.html`, keep one Helmet-injected FAQPage per route.

### 1. `index.html`
Remove the entire `FAQPage` object (the `@id: https://lsdiet.com/#faq` block) from the `@graph` array. Leave `ImageObject`, `Organization`, `WebSite`, `Person`, and `Book` intact — those are correctly sitewide.

### 2. `src/components/FAQSection.tsx` (homepage)
No change. Its Helmet FAQPage becomes the only FAQPage on `/`. Add `@id: "https://lsdiet.com/#faq"` to anchor it.

### 3. `src/pages/CoreFAQPage.tsx` (`/faq`)
No change to structure. Its Helmet FAQPage becomes the only FAQPage on `/faq`. Add `@id: "https://lsdiet.com/faq#faq"` to clearly distinguish it from the homepage FAQ entity.

### 4. Audit other routes
Confirm no other page mounts `FAQSection` or injects another `FAQPage`. Quick `rg "FAQPage"` to verify only the three files above contain it; other routes (About, Awareness, WPT, guides, blog) use Article/ProfilePage/CollectionPage and are unaffected.

## Verification

- `rg -n '"@type":\s*"FAQPage"' src index.html` → expect exactly 2 matches (FAQSection.tsx, CoreFAQPage.tsx).
- View page source on `/` → one FAQPage block.
- View page source on `/faq` → one FAQPage block.
- Google Rich Results Test on both URLs → no duplicate-FAQPage warning.

## Files touched

- `index.html` (remove FAQPage from @graph)
- `src/components/FAQSection.tsx` (add `@id`)
- `src/pages/CoreFAQPage.tsx` (add `@id`)
