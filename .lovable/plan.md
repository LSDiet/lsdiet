## Goal

Replace the outdated "Coming Soon — FREE 7-Day LS Diet Course" section with a launched-course showcase that uses your two new Skool screenshots and reflects the actual structure (Start Here, Action Practice, Tools).

## Files affected

- `src/components/BookSection.tsx` — full rewrite of layout and copy
- `src/assets/skool-course-tracks.png` — NEW (copied from `user-uploads://image-117.png`)
- `src/assets/skool-action-practice.png` — NEW (copied from `user-uploads://image-116.png`)
- `src/components/HeroSection.tsx` — drop "7-Day" from any hero references
- `src/components/JoinFloatingBar.tsx` — drop "7-Day" if present
- `src/pages/Index.tsx` SEO copy — drop "7-Day" if present
- `mem://features/course-offering` — update memory (course is live, no 7-day label)

## New section structure

```text
┌───────────────────────────────────────────────────────────┐
│  NOW LIVE ON SKOOL                                        │
│  The Free LS Diet Course                                  │
│  Subhead: 3 tracks. Train the habits that stop weight     │
│  regain — guided by Oscar, free to join.                  │
│                                                           │
│  [ Horizontal screenshot of 3 course tracks ]             │  ← image-117
│   START HERE   |   ACTION PRACTICE   |   TOOLS            │
│                                                           │
│  3 short blurbs under the image, one per track:           │
│   • Start Here — why weight regain happens + how LS Diet  │
│                  stops it                                 │
│   • Action Practice — daily habits & mental patterns      │
│                  that make LS Diet automatic              │
│   • Tools — eBooks & blogs published by Oscar             │
│                                                           │
│  ── Inside Action Practice ──                             │
│  [ Screenshot of Action Practice classroom ]              │  ← image-116
│  Caption: 12 practice lessons — hydration, triggers,      │
│  pattern interruption, food labels, friction reduction,   │
│  social eating, habit thinking, and more.                 │
│                                                           │
│  [ Early-access bonus box — kept, lightly reworded ]      │
│  [ CTA: JOIN LS DIET ON SKOOL (FREE) → skool.com/lsdiet ] │
└───────────────────────────────────────────────────────────┘
```

The old laptop mockup with the fake 7-day lesson list is removed — replaced by real product screenshots, which are more credible now that the course actually exists.

## Copy changes

- Eyebrow: `Coming Soon` → `Now Live on Skool`
- H2: `FREE 7-Day LS Diet Course` → `The Free LS Diet Course` (with `FREE` in accent)
- Feature bullets pruned/rewritten to reflect the real product:
  - All lessons are short videos — no reading required
  - 3 tracks: Start Here, Action Practice, Tools
  - Weekly live webinar hosted by Oscar
  - Community of members training the same habits
  - 100% free to join
- CTA button: `JOIN LS DIET (FREE)` → `JOIN LS DIET ON SKOOL (FREE)` (link unchanged)
- Remove the `Week 1 / Week 2` and `7-day` phrasing wherever it appears site-wide.

## Technical notes

- Copy uploaded images into `src/assets/` and import as ES6 modules (per project convention).
- `image-117` (tracks) renders as a single wide image with a subtle ring/shadow on dark bg; clickable, opens Skool in a new tab.
- `image-116` (Action Practice) renders below as a secondary card with caption; also clickable to Skool.
- Both images get descriptive `alt` text for SEO ("LS Diet course on Skool: Start Here, Action Practice, Tools" / "Action Practice classroom on Skool — How much water should you drink?").
- Keep the existing `WaitlistModal` import only if still used; otherwise remove. CTA points directly to `https://www.skool.com/lsdiet/about` (unchanged).
- No changes to layout grid breakpoints beyond what the new single-column-with-image-stack requires; mobile keeps stacked order.

## Out of scope

- No backend / waitlist / Cloud changes.
- No countdown clock changes (already removed from Index).
- No new pages.
