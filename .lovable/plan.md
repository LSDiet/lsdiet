## Goal

Add one-click social sharing to individual blog articles only. Keep `/blog` index clean to protect click-through. Prioritize readability, low-friction sharing, and mobile usability.

## Channels

1. Facebook
2. LinkedIn
3. X (Twitter)
4. WhatsApp
5. Email (`mailto:`)
6. Copy link (with toast confirmation)
7. Native share sheet — only rendered when `navigator.share` exists at runtime (mobile/PWA)

All use URL-based share intents — no third-party SDKs, no tracking pixels, no extra bundle weight.

## Placement (article page only)

- **Desktop (≥1024px)**: vertical sticky rail on the left of the article column. Sticks to viewport as the reader scrolls. Icon-only, subtle, accent on hover.
- **All viewports — inline under article title**: horizontal row of icon buttons, directly under the byline. Catches early sharers.
- **Bottom of article (all viewports, primary value on mobile)**: a short prompt line + horizontal row, placed after the article body and before the "Continue reading" block.

## Bottom-of-article share prompt

Above the bottom inline share row, render a single subtle prompt line:

> Know someone struggling with weight regain? Share this article.

- One line, sentence case, body font, `text-zinc-600` (muted), no bold, no emoji, no exclamation.
- Centered, small bottom margin, share row sits right beneath it.
- Wrapped in semantic `<p>` so it reads naturally for screen readers.
- No box, border, background, or accent — it should feel like a quiet aside, not a CTA card.

## What does NOT change

- `/blog` index cards stay exactly as they are — clean, clickable, no share affordances.
- No changes to `Navbar`, footer, or other pages.
- The top inline share row (under the byline) gets no prompt — sharing intent there is already self-evident.

## New file

`src/components/ShareButtons.tsx` — single reusable component:

- Props: `url: string`, `title: string`, `variant: "rail" | "inline"`
- `rail` renders vertical icon column (desktop sticky usage).
- `inline` renders horizontal icon row (under-title and bottom usage).
- Detects `navigator.share` on mount (client-only check) and conditionally renders a "Share…" button that calls `navigator.share({ title, url })`.
- Copy button calls `navigator.clipboard.writeText(url)` and fires `toast.success("Link copied")` from `sonner`.
- Real WhatsApp glyph as inline SVG (lucide doesn't ship one); other icons from `lucide-react`: `Facebook`, `Linkedin`, `Twitter`, `Mail`, `Link2`, `Share2`.
- All link buttons are real `<a target="_blank" rel="noopener noreferrer">` with `aria-label` per channel; copy/native-share are `<button>`.
- Styling uses semantic tokens (`text-foreground`, `hover:text-accent`, `border-border`) — no hardcoded colors.

## Edits

`src/pages/BlogPostPage.tsx`:

1. Import `ShareButtons`.
2. Make the article container `relative` so the desktop rail can position against it.
3. Render desktop sticky rail (`hidden lg:block`, sticky-positioned to the left of the article column).
4. Render `<ShareButtons variant="inline" />` directly under the byline `<p>`.
5. After `<RichText>` and before the "Continue reading" `<section>`: render the prompt `<p>` followed by `<ShareButtons variant="inline" />`, both centered.

`src/pages/BlogPage.tsx`: **no changes** (per user request).

## Share intent URLs

```text
Facebook  https://www.facebook.com/sharer/sharer.php?u={URL}
LinkedIn  https://www.linkedin.com/sharing/share-offsite/?url={URL}
X         https://twitter.com/intent/tweet?url={URL}&text={TITLE}
WhatsApp  https://wa.me/?text={TITLE}%20{URL}
Email     mailto:?subject={TITLE}&body={URL}
```

URL and title are `encodeURIComponent`-wrapped.

## Acceptance check after build

- `/blog` index visually unchanged.
- Desktop: vertical share rail visible left of article, sticky on scroll; inline row also under title.
- Mobile (664px viewport): no rail; inline row under title; prompt line + inline row after article body.
- Copy button → toast "Link copied" appears, link is in clipboard.
- All share links open the correct prefilled composer in a new tab.
- Prompt line reads as a subtle aside, not a promotional banner.
