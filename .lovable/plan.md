# Part 1 — Metadata Audit & Fix

## Root cause of duplicate tags

`index.html` ships static `<title>`, `<meta name="description">`, `<meta property="og:title">`, and `<meta property="og:description">`. At runtime, `react-helmet-async` does the following:

- `<title>` — Helmet updates `document.title`, so only ONE title element survives. No duplicate.
- `<meta name="...">` / `<meta property="...">` — Helmet **appends** new tags with `data-rh="true"` but does NOT remove pre-existing static meta tags it didn't create. Result: prerendered HTML contains **two `description`, two `og:title`, two `og:description`** on every non-home route.
- `<link rel="canonical">` — not in `index.html` today, so no duplicate (good).

Helmet's dedupe only works on tags Helmet itself owns. Static tags from `index.html` are invisible to Helmet's reconciler.

## Fix

Remove the per-page-overridable tags from `index.html` and make each page own its full head via Helmet (most already do — verified all 21 page files contain `<Helmet>` and a `<link rel="canonical">`).

### `index.html` — keep only sitewide-neutral head

Remove:
- `<title>…</title>`
- `<meta name="description" …>`
- `<meta property="og:title" …>`
- `<meta property="og:description" …>`
- `<meta property="og:url" …>` (per-page)
- `<meta property="og:type" …>` (per-page)
- `<meta name="twitter:image" …>` if also set per page (keep only sitewide twitter:site)

Keep: charset, viewport, verifications, GTM, fonts, favicons, JSON-LD Organization/WebSite/Person/Book graph, `og:image` (sitewide fallback), `twitter:card`, `twitter:site`, `author`.

Add a minimal bootstrap `<title>LS Diet</title>` only as a non-SEO placeholder for the brief moment before hydration — actually omit it; Helmet sets it immediately and prerender writes the final value.

### Per-page Helmet — verified coverage

All 21 pages already render `<Helmet>` with `<title>`, `<meta name="description">`, `<link rel="canonical">`, and `og:*`. No code changes needed in pages.

Confirm each Helmet sets the full set (audit pass during implementation). For any missing `og:title`/`og:description`/`og:url`/`og:type`, add them so each page is self-contained.

### Homepage (`src/pages/Index.tsx`)

Already has Helmet with title/description/canonical/JSON-LD. Add explicit `og:title`, `og:description`, `og:url`, `og:type=website` so removing them from `index.html` doesn't drop them from `/`.

### Prerender safety net (`scripts/prerender.mjs`)

After `await page.content()`, add a programmatic dedupe assertion:

```js
const counts = await page.evaluate(() => ({
  title: document.querySelectorAll("title").length,
  desc: document.querySelectorAll('meta[name="description"]').length,
  ogTitle: document.querySelectorAll('meta[property="og:title"]').length,
  ogDesc: document.querySelectorAll('meta[property="og:description"]').length,
  canonical: document.querySelectorAll('link[rel="canonical"]').length,
}));
```

Throw if any count !== 1. This makes the build **fail loudly** if a future page reintroduces duplicates.

## Verification

After build, sample `dist/index.html` (home) and `dist/blog/<slug>/index.html` (article) and grep for each tag — expect exactly one of each.

---

# Part 2 — Deploy Speed-up (safe for SEO + UX)

Prerender currently takes ~90s for 97 routes at concurrency 2. Recommendations, ranked by impact/risk:

### 1. Raise `PRERENDER_CONCURRENCY` 2 → 4 (free, biggest win)
The Cloudflare build runner has ≥2 vCPU available. Chromium with 4 parallel pages typically halves wall time. Already supported via env var; set it in the build command. Risk: none for SEO; only contention. Worst case → revert to 2.

### 2. Reuse a single browser context, switch `waitUntil` from `"load"` → `"domcontentloaded"`
- `"load"` waits for every image, font, third-party pixel (GTM/GA). For prerender we only need React + Helmet to commit. The existing `PrerenderReady` gate already guarantees the route is hydrated.
- Saves 0.5–2s per route.

### 3. Block analytics/third-party requests during prerender
Add a `page.setRequestInterception(true)` filter that aborts:
- `googletagmanager.com`, `google-analytics.com`, `fonts.gstatic.com` (fonts already preloaded), Skool/YouTube iframes.

Saves bandwidth + time, prevents GTM from firing pageviews against headless. The `__PRERENDER__` flag already skips GA — this is belt-and-suspenders. No SEO impact (these aren't in HTML).

### 4. Disable images & CSS that aren't needed for HTML output
`request.resourceType()` filter: abort `image`, `media`, `font`, `stylesheet`. The Helmet/title/meta payload doesn't depend on them. Saves another 1–3s per route.
Risk: if a route uses `<noscript>` SEO content gated on CSS — none here. Safe.

### 5. Drop `MOUNT_TIMEOUT_MS` 30s → 10s and `READY_TIMEOUT_MS` 45s → 15s
With (3)+(4), pages mount in <1s. Lower ceilings fail fast on real bugs rather than masking them with 30s waits.

### 6. Stagger removal: drop the 250ms `i * 250` worker stagger
Now-defunct workaround for Chromium cold-start contention; removing saves ~1s.

### 7. Pre-warm Chromium once, share across all workers
Already done (one `puppeteer.launch`). Keep.

### Estimated impact
2 → ~40–50s total (≈45–55% reduction). All changes are build-time only; the shipped HTML is identical or cleaner. Zero SEO risk; zero human-viewing risk (production runtime still loads images/fonts/analytics normally).

---

# Files to modify

1. `index.html` — strip duplicatable head tags.
2. `src/pages/Index.tsx` — add `og:title`, `og:description`, `og:url`, `og:type` to Helmet.
3. Audit pass over all `src/pages/*.tsx` Helmets — fill any missing `og:*` (likely 0–3 files).
4. `scripts/prerender.mjs` — add tag-count assertion; raise concurrency default; switch to `domcontentloaded`; add request-interception to block analytics/images/fonts/stylesheets; tighten timeouts; remove stagger.

# Deliverables after implementation

- List of files actually modified.
- Sample prerendered HTML head for `/` and one `/blog/<slug>/` (greps showing single occurrence of each tag).
- Confirmation that the new prerender assertion passes for all 97 routes.
- New deploy timing vs. baseline.
