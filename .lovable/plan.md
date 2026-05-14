## Fix: ISO 8601 datetime with timezone in all schema dates

Google's structured-data validator rejects date-only strings (`2026-05-14`) on `dateModified` for `ProfilePage`, and warns on the same field across `Article` / `WebPage` / `FAQPage` / `CollectionPage` / Blog schemas. Switch every JSON-LD date to a full ISO 8601 datetime with timezone offset.

### Pattern (applied per page)

Replace:
```ts
const PUBLISHED = "2026-05-14";
const UPDATED   = "2026-05-14";
```
with:
```ts
const PUBLISHED_ISO = "2026-05-14T12:00:00+00:00";
const UPDATED_ISO   = "2026-05-14T12:00:00+00:00";
const PUBLISHED_DISPLAY = "May 14, 2026";
const UPDATED_DISPLAY   = "May 14, 2026";
```

- JSON-LD `datePublished` / `dateModified` → use `*_ISO`.
- `<time dateTime={...}>` → use `*_ISO` (still renders the human label as children).
- Visible "Published … Updated …" text → use `*_DISPLAY`.

### Files to update

1. `src/pages/AboutOscarPoonPage.tsx` (ProfilePage) — original failing case.
2. `src/pages/WeightPermanenceTrianglePage.tsx` (Article + WebPage)
3. `src/pages/WhatIsLSDietPage.tsx` (Article)
4. `src/pages/AwarenessStagesPage.tsx` (Article)
5. `src/pages/BlogPage.tsx` (Blog/CollectionPage)
6. `src/pages/CoreFAQPage.tsx` (FAQPage) — currently no schema dates; only `<time>` attrs need ISO datetime.
7. `src/pages/GLP1GuidePage.tsx` — change `'2025-02-01'` → `'2025-02-01T12:00:00+00:00'` for both fields, plus any `<time>` attrs.
8. `src/pages/LSDietGuidePage.tsx` — change `'2025-03-02'` → `'2025-03-02T12:00:00+00:00'` for both fields, plus any `<time>` attrs.

### Verification

After edits, run `rg -n "datePublished|dateModified|dateTime=" src/pages` and confirm every value matches the `YYYY-MM-DDTHH:MM:SS+00:00` shape. Spot-check `/about-oscar-poon` in Google's Rich Results test.

No visual / copy changes — only date-string format and a new display constant.