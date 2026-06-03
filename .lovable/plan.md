
# Add the GHL Lead-Qualifying Quiz

Goal: use the quiz as a top-of-funnel lead capture in three coordinated places, with one canonical destination.

## 1. Canonical page: `/quiz`

New route `src/pages/QuizPage.tsx` (lazy-loaded in `src/App.tsx`).

Contents:
- `<Navbar />` + `<FooterSimple />` to match site chrome.
- `<Helmet>` with title "Stop Regaining Weight Quiz — LS Diet", meta description, canonical `https://lsdiet.com/quiz`, and basic `Quiz`/`WebPage` JSON-LD.
- Hero block (dark theme, amber accent) with:
  - H1: "Find Out Why You Keep Regaining Weight"
  - 1-sentence subhead about a 60-second personalized result.
  - Trust line ("Free • 100% private • Instant result").
- Embedded GHL quiz iframe in a centered, max-width container:
  - `<iframe src="https://api.leadconnectorhq.com/widget/quiz/1ppvQlwpv4RYQlq0zs66" id="1ppvQlwpv4RYQlq0zs66" title="LS Diet Quiz" />`
  - Loads `https://link.msgsndr.com/js/form_embed.js` once (via a `useEffect` that appends/removes the script tag — avoids duplicate loads on SPA navigation).
- Below the quiz: small "What happens next" 3-step strip (Answer → Get your result → Optional next step).

Add `/quiz` to `public/sitemap-pages.xml` (priority 0.9).

## 2. Homepage teaser

Insert a compact `QuizTeaserSection` on `src/pages/Index.tsx`, placed between `HeroPitchSection` and `BookSection` (high-intent slot, before the book pitch).

Contents:
- One-line headline: "Not sure why the weight keeps coming back?"
- Sub: "Take the 60-second quiz and get a personalized read on your regain pattern."
- Primary `Button variant="accent"` → native `<a href="/quiz">` (per Core rule on cross-page navigation).
- No iframe on the homepage — keeps the landing page light and routes everyone to the canonical `/quiz` page (one source of analytics + lead data).

## 3. Free Resources card

In `src/pages/FreeResources.tsx`, add the quiz as a new resource card at the top of the grid (newest-first rule from Free Resources memory), styled like existing cards:
- Badge: "Quiz"
- Title: "Why You Keep Regaining Weight"
- CTA "Take the Quiz" → `/quiz`.

## 4. Navbar (optional, recommended)

Add "Quiz" as a top-level nav link in `src/components/Navbar.tsx` between "Free Resources" and "Blog" so it's persistently discoverable. Skip if you'd rather keep nav lean.

## Technical notes

- Script injection: load `form_embed.js` from inside `QuizPage.tsx` via `useEffect`, guarding with `document.querySelector('script[src*="form_embed.js"]')` so it only loads once.
- Iframe sizing: GHL's `form_embed.js` auto-resizes the iframe height via `postMessage`; we set `width:100%`, `border:none`, `scrolling="no"` as in their snippet. Provide a min-height (e.g. 600px) to avoid layout shift before resize.
- Analytics: add `trackEvent("quiz_start_click", { location: "homepage" | "free_resources" | "navbar" })` on each CTA link, mirroring existing `cta_click` pattern.
- Respect existing rules: no background photo overlays, dark high-contrast theme, amber-orange accent, Canadian spelling.

## Out of scope

- No new backend — GHL handles capture.
- No A/B testing infrastructure.
- No quiz result page on our domain (GHL hosts result/redirect).
