## Problem
The LS Diet guide card on `/free-resources` is too tall — users must scroll to see buttons and bullets. The description is wordy and the 4 bullet points are long; generous spacing and large fonts add vertical bloat.

## Solution: Trim copy + tighten layout

### 1. Shorten the copy
**Description** (currently 2 sentences, ~30 words) → compress into 1 punchy sentence (~15 words).

**Bullet points** (currently 4 long sentences) → rewrite as 4 very short bullets (≤8 words each). Keep the key ideas: insulin/fat burning, LS vs No-Carb/Keto, 6 food categories, sustainable lifestyle.

### 2. Compact the layout
- Reduce vertical padding inside the card (`gap-12` → `gap-8`, `mb-6` → `mb-3`, etc.)
- Shrink heading size (`text-3xl md:text-4xl` → `text-2xl md:text-3xl`)
- Shrink description and bullet text (`text-muted-foreground` / `text-foreground` → slightly smaller or tighter line-height)
- Render bullets in a 2-column grid on desktop (`grid-cols-2`) so 4 bullets take 2 rows instead of 4
- Tighten bullet item spacing (`space-y-3` → `space-y-2` or `gap-2` in grid)
- Keep buttons visible at bottom without scrolling on a typical laptop viewport (~700px usable height)

### 3. Preserve existing behaviour
- Keep cover image, download flow, modal, dedicated page link
- Keep dark theme, amber accent, animation hooks
- Keep responsive: single column on mobile, compact two-column bullets on desktop

### Files to edit
- `src/pages/FreeResources.tsx` — copy and layout changes only

## Acceptance criteria
- On a 1366×768 viewport, the first resource card (cover + title + desc + bullets + buttons) is fully visible without scrolling
- Mobile still stacks vertically and remains readable
- No functional changes to download or navigation