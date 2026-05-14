# SEO Hardening Plan v2 — Substantive foundational pages, FAQ schema, breadcrumbs, navigation

## 1. Homepage FAQ section + JSON-LD (req #1, prior turn)
Create `src/components/FAQSection.tsx` — semantic `<section id="faq">` with one `<h2>FAQ</h2>` and 7 Q/A pairs as plain `<h3>` + `<p>` (no accordion, fully crawlable). Topics:
1. What is LS Diet?
2. What does low-starch, low-sugar mean?
3. Why do people regain weight?
4. What is the Weight Permanence Triangle™?
5. Who is Oscar Poon?
6. Is LS Diet a diet or a lifestyle?
7. What exercise is recommended in LS Diet?

`<Helmet>` injects matching `FAQPage` JSON-LD. Mounted in `Index.tsx` between `WhyDietsFailSection` and `BookSection`.

## 2. Homepage WebPage schema (req #4, prior turn)
Add `<Helmet>` at the top of `src/pages/Index.tsx` with a `WebPage` JSON-LD: `mainEntity` → Organization, `about` → "Weight Permanence Triangle", `author` → Person Oscar Poon, `isPartOf` → WebSite, `primaryImageOfPage` → `#logo`.

## 3. Organization schema enrichment (req #3, prior turn)
Edit `index.html` `@graph`:
- New `ImageObject` `@id: #logo` → `https://lsdiet.com/favicon.png` (with `inLanguage`, `width`, `height`).
- Organization gets `logo: { @id: "#logo" }`, `contactPoint: { @type: "ContactPoint", email: "info@whataboutweight.com", contactType: "customer support", availableLanguage: ["English"] }`, and a contact URL pointing to the homepage `#contact` anchor.
- Person gets `url: "https://lsdiet.com/about-oscar-poon"`. `worksFor` and `sameAs` stay.

## 4. Reusable Breadcrumb (req #2, prior turn)
`src/components/PageBreadcrumb.tsx` — props `items: { name; url }[]`. Renders semantic `<nav aria-label="Breadcrumb"><ol>...</ol></nav>` plus `<Helmet>` `BreadcrumbList` JSON-LD. Used on every standalone page (six new + future).

## 5. Substantive foundational pages (UPDATED — req from this turn)
Each page is a proper foundational entity page, not a placeholder. Per-page contract:

- Minimum 400–700 words of unique copy (priority pages target ~600; secondary ~400).
- At least 3 meaningful paragraphs in the main body.
- At least one supporting H2 (and an H3 inside it where natural).
- At least 2 internal links to sibling foundational pages or homepage anchors.
- One contextual CTA near the bottom (e.g. "Join the FREE 7-Day LS Diet Course" → `https://www.skool.com/lsdiet`, or "Read Oscar's full method on the homepage" → `/#method`).
- One semantic image with descriptive alt text where it adds value (Oscar headshot, Weight Permanence Triangle diagram, transformation photo).
- Visible **"Published … · Updated …"** date line under the H1 (hard-coded ISO date — current date for "Updated").
- `<Helmet>` with unique `<title>`, unique `<meta description>`, `<link rel="canonical">`, og:* tags, no noindex, and page-appropriate JSON-LD (`Article` or `CollectionPage`, plus `BreadcrumbList` from the breadcrumb component).
- `<Navbar />` + `<PageBreadcrumb />` at top, `<FooterSimple />` at bottom.
- One `<h1>` per page; H2/H3 used for subsections.

Page outlines and unique angles (kept distinct so wording doesn't duplicate):

### `/what-is-ls-diet` → `WhatIsLSDietPage.tsx` (priority, ~600 words)
- H1: "What Is LS Diet?"
- Intro: defines LS Diet as a low-starch, low-sugar lifestyle system distinct from calorie-restriction diets.
- H2 "How LS Diet Differs from Conventional Diets" — contrasts macro counting, fasting, GLP-1 with the LS lifestyle's behavioural-permanence layer.
- H2 "The Three Pillars Behind LS Diet" — short cross-reference to the Weight Permanence Triangle™ page.
- Image: Oscar headshot (existing `oscar-photo.jpeg`) — alt "Oscar Poon, founder of LS Diet, the low-starch, low-sugar lifestyle system".
- Internal links: `/weight-permanence-triangle`, `/about-oscar-poon`, `/#what-is-ls-diet`.
- CTA: "Start the FREE 7-Day LS Diet Course →".

### `/weight-permanence-triangle` → `WeightPermanenceTrianglePage.tsx` (priority, ~650 words)
- H1: "The Weight Permanence Triangle™"
- Intro: framework overview — Awareness, Practice, Permanence.
- H2 "Awareness — The Source of Motivation" with H3 "The Five Awareness Stages" (brief; deep link to `/awareness-stages`).
- H2 "Practice — Daily Behaviour That Survives Stress".
- H2 "Permanence — Course Correction Before Restart".
- Image: existing journey transformation image (`hero-photo.png`) — alt "Oscar Poon demonstrating the Weight Permanence Triangle™ method".
- Internal links: `/awareness-stages`, `/what-is-ls-diet`, `/#method`.
- CTA: "See the framework in action — join the FREE 7-Day LS Diet Course".

### `/awareness-stages` → `AwarenessStagesPage.tsx` (priority, ~600 words)
- H1: "The 5 Awareness Stages"
- Intro: positions awareness as the first vertex of the Weight Permanence Triangle™ inside LS Diet.
- H2 "Push Motivation vs Pull Motivation" — explains the dual engine.
- H2 "Walking Through the Five Stages" with H3 per stage (Reality, Friction, Pattern, Consequence, Identity) — 2–3 sentences each.
- No image required; if used, the existing triangle-related asset.
- Internal links: `/weight-permanence-triangle`, `/about-oscar-poon`.
- CTA: "Join the LS Diet course to apply Awareness in real life".

### `/about-oscar-poon` → `AboutOscarPoonPage.tsx` (priority, ~600 words)
- H1: "About Oscar Poon"
- Intro: founder of LS Diet, lost 80+ lbs three times.
- H2 "Background and Method" — psychology degree, substance-abuse counselling, surgical market-data consulting, and how the mix shaped LS Diet.
- H2 "Why He Built LS Diet" — restart cycle frustration and the missing behavioural-permanence layer.
- Image: `oscar-photo.jpeg` — alt "Oscar Poon, founder of LS Diet and creator of the Weight Permanence Triangle".
- Internal links: `/what-is-ls-diet`, `/weight-permanence-triangle`, social link to `https://www.youtube.com/@JoinLSDiet`.
- CTA: "Follow Oscar on YouTube (@JoinLSDiet) and join the free course".

### `/faq` → `CoreFAQPage.tsx` (secondary, ~450 words)
- H1: "LS Diet FAQ"
- Short intro paragraph.
- H2 "About the Method" + H2 "About the Lifestyle" subsections, each with 4–5 expanded Q/A pairs (broader and deeper than the homepage FAQ — no duplicate wording).
- `FAQPage` JSON-LD via Helmet.
- Internal links: `/what-is-ls-diet`, `/weight-permanence-triangle`.
- CTA: "Have a question we missed? → /#contact".

### `/blog` → `BlogPage.tsx` (secondary, ~400 words)
- H1: "LS Diet Blog"
- Intro framing the blog as the long-form arm of LS Diet.
- H2 "What You'll Find Here" + H2 "Coming Topics" with a short bulleted list of upcoming article titles (low-starch grocery guides, Awareness deep dives, etc.).
- `CollectionPage` JSON-LD.
- Internal links: `/what-is-ls-diet`, `/faq`, `/weight-permanence-triangle`.
- CTA: "Get notified — join the free course waitlist".

### Avoiding duplicate wording
A shared definition file `src/content/lsDietDefinitions.ts` is **not** used to render copy verbatim; it only holds reference constants for terminology. Each page authors its own paragraphs from a different angle — definition (what), framework (how), psychology (why), founder (who), Q&A, blog index — so the LLM-style boilerplate ("LS Diet is a low-starch...") appears at most once per page and never as the primary opener on more than one page.

## 6. Routes registered (req from prior turn)
Add the six routes to `src/App.tsx` above the `*` catch-all.

## 7. Sitemap update
Append the six new routes to `public/sitemap.xml` (priority 0.8, `changefreq` monthly, `lastmod` = today).

## 8. Footer "Learn" navigation (req #8 prior turn)
Expand `FooterSimple.tsx` with a "Learn" column listing the six core pages using native `<a>` tags. Navbar visible nav stays unchanged (already dense for mobile); foundational pages remain crawl-discoverable via footer + in-content links from the new homepage sections.

## 9. Image alt-text audit (req #5 prior turn)
- `HeroSection` before/after grid → "Oscar Poon in {year}, weighing {lbs} before adopting the LS Diet low-starch, low-sugar lifestyle" / "Oscar Poon in {year}, weighing {lbs} after losing weight on LS Diet".
- `HeroPitchSection` → "Oscar Poon, founder of LS Diet and creator of the Weight Permanence Triangle".
- `CinematicIntro` → "Oscar Poon at {weight} lbs during his weight cycling journey before LS Diet".
- `AboutAuthorSection` already updated previously.

No keyword stuffing — each alt is one natural sentence.

## 10. SSR honesty (req #6 prior turn)
The project is a Vite client-rendered SPA — no SSR. Mitigations:
- The Organization, WebSite, Person, Book, and **FAQPage** JSON-LD will live statically inline in `index.html` (in raw HTML source before JS).
- Per-page `<Helmet>` schema additionally hydrates client-side (Googlebot executes JS).
- Visible textual SEO sections render in the initial DOM tree (no `display: none`); `useScrollAnimation` only toggles opacity/translate, so text is in the HTML even before scroll.
- A true SSR/SSG migration (Next.js, Astro) is out of scope — flagged for the user.

## Files touched
**Edited**
- `index.html` — Organization logo + ImageObject + contactPoint, FAQPage JSON-LD inlined.
- `src/App.tsx` — register six new routes.
- `src/pages/Index.tsx` — Helmet WebPage schema, mount `<FAQSection />`.
- `src/components/FooterSimple.tsx` — "Learn" column.
- `src/components/HeroSection.tsx`, `src/components/HeroPitchSection.tsx`, `src/components/CinematicIntro.tsx` — alt text refinements.
- `public/sitemap.xml` — six new entries.

**Created**
- `src/components/FAQSection.tsx`
- `src/components/PageBreadcrumb.tsx`
- `src/pages/WhatIsLSDietPage.tsx`
- `src/pages/WeightPermanenceTrianglePage.tsx`
- `src/pages/AwarenessStagesPage.tsx`
- `src/pages/AboutOscarPoonPage.tsx`
- `src/pages/CoreFAQPage.tsx` (route `/faq`)
- `src/pages/BlogPage.tsx`

## Out of scope
- SSR/SSG migration.
- Real blog post content (the `/blog` page ships as a foundational index, not a working CMS).
- Auto-updating "Updated" date — date is hard-coded ISO string and bumped manually on edits.
