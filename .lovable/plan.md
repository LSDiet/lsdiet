## Diagnosis

The app is a Vite + React 18 + React Router SPA. `index.html` ships only `<div id="root"></div>`, so the initial HTML response contains no body content. Crawlers and AI extractors that don't fully execute JS see an empty page; even Helmet-managed `<title>`/canonical/JSON-LD are applied post-hydration.

Fix: **build-time static prerendering (SSG)** — not SSR, not a Next migration.

- Priority page content is effectively static at build time.
- Lovable hosting serves `dist/<route>/index.html` directly when present, with SPA fallback for everything else. No server runtime, no routing changes.
- Zero changes to design tokens, Helmet, Zustand, React Query, or component structure.

SSR is overkill — no per-request personalization needs server rendering. Dynamic Contentful blog posts can stay client-rendered for now; they're already in the blog sitemap.

## Tooling

**Puppeteer-based prerender** via a small `scripts/prerender.mjs`:

1. `vite build` produces `dist/`
2. Script spins up a static server pointing at `dist/`
3. For each route, Puppeteer navigates, waits for a `data-rendered="true"` flag on `<html>`, snapshots the full DOM, and writes `dist/<route>/index.html`

Why a custom script over `vite-plugin-prerender`: avoids dependency churn, gives explicit control over the wait condition (needed because of CinematicIntro animations and React Query loading states), and keeps build-time impact predictable.

Components that touch `window`/`document` at import time (CinematicIntro, useScrollAnimation, Supabase client, Zustand persistence) are safe because Puppeteer runs the real built bundle in a real browser — no SSR-safety refactor needed.

## Revised Phase 1 routes (entity-defining only)

Prerender targets that reinforce *weight regain prevention / behavioural permanence / Weight Permanence Triangle*:

- `/`
- `/what-is-ls-diet`
- `/weight-permanence-triangle`
- `/awareness-stages`
- `/about-oscar-poon`
- `/blog`
- `/blog/why-people-regain-weight-after-dieting`

Nothing else in Phase 1. Supporting mechanism content (GLP-1, food guide, low-carb, insulin, meal planning) is deliberately excluded so the prerendered surface area maps 1:1 to LS Diet's category ownership.

## Phase 2 (later, separate pass)

- `/ls-diet-guide`
- `/does-glp-1-work`
- `/faq`, `/FreeResources`
- `/oscar-poon`
- Remaining cornerstone foundations (`src/content/foundations/*`) and selected blog articles aligned to regain-prevention narrative
- Legal pages (`/privacy`, `/terms`, `/disclaimer`) — useful for trust signals but not entity-defining

Out of scope (stays client-rendered indefinitely):
- `/product/:handle`, `/category/:slug`, `/share/:slug`, `/blog/:slug` (dynamic Contentful posts), `/partners`.

## Implementation steps

```text
1. devDependency: puppeteer + serve-handler (or sirv)
2. scripts/prerender.mjs:
   - boot static server on dist/
   - PHASE1_ROUTES = [the 7 routes above]
   - for each route: launch page, wait for
     document.documentElement.dataset.rendered === "true"
     (timeout 15s, retry once), serialize HTML, write
     dist/<route>/index.html
3. package.json: add "postbuild": "node scripts/prerender.mjs"
4. src/main.tsx: after first paint (requestIdleCallback or
   useEffect in a tiny RootReady component), set
   document.documentElement.dataset.rendered = "true"
5. /blog/why-people-regain-weight-after-dieting:
   confirm the route resolves via BlogPostPage's loader using
   either the foundations bundle (preferred — synchronous) or
   the Contentful fetch path. If Contentful-only, mark "rendered"
   after the fetch resolves so the snapshot has the article body.
6. Add the 7 routes to public/sitemap-pages.xml with priority
   weighting (1.0 home, 0.95 WPT + what-is-ls-diet + awareness,
   0.9 about-oscar-poon + the regain article, 0.8 blog index).
7. Verify each dist/<route>/index.html contains:
   - full <main> body text
   - Helmet-injected <title>, canonical, JSON-LD
   - no hydration-breaking inline state
8. Switch main.tsx from createRoot to hydrateRoot ONLY when
   document.documentElement.dataset.rendered === "true" is already
   set by prerender (detected via a build-time marker attribute).
   Otherwise keep createRoot to avoid hydration mismatch warnings
   on non-prerendered routes.
9. README: short section on how to add a route to Phase 1.
```

## Technical notes

- Lovable hosting auto-serves `dist/<route>/index.html` when present; SPA fallback handles every other route. No `_redirects` / hosting config.
- Build-time cost: ~3–8s per route × 7 routes ≈ +30–60s on `vite build`. Acceptable.
- Zero runtime perf impact — static HTML + the existing JS bundle.
- Helmet works during prerender because react-helmet-async writes into the real `<head>` of the Puppeteer page; serialized snapshot captures it.
- The `data-rendered` signal is the single source of truth for "this snapshot is ready" — avoids brittle fixed-delay waits.

## What stays unchanged

- React Router config (`src/App.tsx`)
- All components, design tokens, Tailwind, Helmet usage
- Supabase client, Zustand stores, React Query
- Existing sitemap/robots/JSON-LD entries (only adding the 7 routes)
- Deployment flow (still `vite build` → publish)

## Confirm before build

Proceeding with exactly the 7 Phase 1 routes above, custom Puppeteer script, postbuild hook — yes?