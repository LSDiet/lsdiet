## What's broken

Production `lsdiet.com` returns an HTML document with an empty `<head>` and no `<script type="module">` for the Vite bundle. Without that script the React app can never mount, so every page renders as a blank white screen. I confirmed this on both `/` and `/blog` — both serve the same stub. This was shipped by the most recent publish; the SPA shell itself is broken at the file level.

The likely culprit is the `scripts/prerender.mjs` Puppeteer pass writing a stripped DOM over `dist/index.html` (and every prerendered route's `index.html`). The recent GA snippet + `RouterEffects` restructuring + Helmet flow are the most recent things touching head/HTML, so one of them is corrupting `page.content()` during prerender.

## Step 1 — Restore the site immediately (you do this)

Roll back to the previous working version from chat history, then re-publish. This brings the live site back online while I diagnose the prerender properly.

<presentation-actions>
  <presentation-open-history>View History</presentation-open-history>
</presentation-actions>

Pick the most recent version from **before** the GA install / SEO sitemap work, click **Restore**, then **Publish**. After that, `lsdiet.com` should load normally again.

## Step 2 — Fix the prerender (I do this next turn)

Once you've rolled back, I'll diagnose and patch the prerender pipeline so future publishes don't ship a broken shell. Concretely I'll:

1. **Add a sanity assertion in `scripts/prerender.mjs`** — after capturing `page.content()`, fail the route (and the build) if the HTML is missing either `<head>` content or a `<script type="module"` tag. This guarantees we can never publish a blank shell again, no matter what causes the underlying corruption.
2. **Reproduce locally via a logged Puppeteer run** to identify which of these is stripping the head during prerender:
   - GA inline `<script>` IIFE in `index.html` (Puppeteer's headless flags can interact oddly with inline scripts that append to `document.head`).
   - `react-helmet-async` interaction with the prerender's `waitForFunction` timing — Helmet may have wiped+rewritten head right at snapshot time.
   - The `RouterEffects` / `useAnalyticsPageviews` hook firing a `setTimeout` that mutates the document mid-snapshot.
3. **Patch the root cause** (most likely guarding the GA snippet so it strictly no-ops under Puppeteer, e.g. checking `navigator.webdriver` *and* a hostname allowlist before touching `document.head`).
4. **Verify** by running `vite build` + the prerender script and checking that `dist/index.html` still contains both the head meta tags and the bundled `<script type="module" src="/assets/...">` tag, then re-publish.

## Why roll back first

I can't run `vite build` from plan mode to reproduce, and even in build mode the fix requires a real prerender run to validate. Restoring from history is the fastest path to a working live site — the diagnostic work then happens against a safe baseline instead of with your domain down.

<presentation-actions>
<presentation-link url="https://docs.lovable.dev/tips-tricks/troubleshooting">Troubleshooting docs</presentation-link>
</presentation-actions>
