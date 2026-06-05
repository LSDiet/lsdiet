## Goal

Every non-root URL (e.g. `/oscar-poon`, `/about-oscar-poon`, `/blog/*`) must ship a static HTML file containing its real route content — its own `<title>`, description, canonical, JSON-LD, and `<main>` markup — instead of falling back to the homepage HTML.

## What's broken today

Latest deploy (`4381100`) log: `/` prerendered fine, but **all 96 lazy-loaded routes** failed safety net 2 with `bodyLen=0, hasRouteEl=false`. When a route fails, prerender doesn't overwrite `dist/<route>/index.html` — so the stale broken file from the earlier `f0347ab` deploy keeps being served. That stale file was stamped `data-prerendered="true"` but contains the homepage's `<title>`, description, canonical, and FAQ JSON-LD. That's exactly what `curl https://lsdiet.com/oscar-poon/` returns.

Why empty body: `PrerenderReady` has a 10s "give up" path that sets `dataset.rendered = "true"` even when the route never mounted. Puppeteer then snapshots the `<Suspense fallback>` (a single empty `<div>`), which trips safety net 2.

## Fix

Two coordinated changes:

### 1. `src/components/PrerenderReady.tsx`

- Remove the 10s timeout that force-sets `rendered = "true"`. The signal must mean "the real route is mounted", never "we gave up".
- Apply the strict gate (`<main>`/`<article>` present **and** `document.title !== STATIC_INDEX_TITLE` for non-root) **regardless** of `window.__PRERENDER__`. The flag-based branch is the original source of weak snapshots.
- Keep the React-Query `isFetching === 0` precondition.
- Let Puppeteer's outer `waitForFunction` timeout (20s) be the only deadline. If a route genuinely can't mount in 20s, we want safety nets to throw and the route to be skipped — not a bad snapshot shipped.

### 2. `scripts/prerender.mjs`

- Change `page.goto(url, { waitUntil: "networkidle0" })` to `{ waitUntil: "domcontentloaded" }`. GTM in `index.html` keeps long-lived connections open, so `networkidle0` is unreliable and was masking the real mount signal.
- Bump `READY_TIMEOUT_MS` from 20s → 30s so lazy chunks have headroom on a cold Cloudflare build worker.
- Add a short pre-`waitForFunction` settle: `await page.waitForSelector('#root > *', { timeout: 15_000 })` so we don't race the very first React render.
- Keep all three existing safety nets — they're now the authoritative gate.

### 3. Force a re-prerender of every route

Because failed routes leave the stale broken HTML in place, the next build needs to regenerate them. Two options:

- **Preferred (no code change):** the next successful deploy after the fix will overwrite `dist/<route>/index.html` for every route that now passes — which should be all of them.
- **Defensive:** before the per-route loop in `main()`, delete every `dist/<route>/index.html` (except `dist/index.html`) so a failed route can't silently serve a stale snapshot. This makes "fail safety net → SPA fallback to baseline `dist/index.html`" the worst case, which is still wrong but is now visibly the homepage rather than a broken stamped snapshot — easier to detect.

I'll include the defensive cleanup.

## Verification after deploy

```bash
curl -s https://lsdiet.com/oscar-poon/ | grep -E '<title>|canonical|data-prerendered'
curl -s https://lsdiet.com/about-oscar-poon/ | grep -E '<title>|canonical'
curl -s https://lsdiet.com/blog/ | grep -E '<title>|canonical'
```

Each should show its own route-specific title and canonical, with `data-prerendered="true"`.

## Out of scope

- Build-time perf (the earlier "why are deploys slow" question).
- Removing GTM from `index.html` (separate decision, not needed for this fix).
- Restructuring lazy imports — they're fine; the issue is the prerender wait logic, not the chunk loader.
