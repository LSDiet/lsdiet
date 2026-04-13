

## Plan: Cinematic Intro Reorder + Flanking Before/After Photos

### Part 1 — Cinematic Intro photo grid reorder + brighter photos

**Current**: 6 photos in a flat 3x2 grid (left-to-right), all at 35% opacity with year labels in photo corners.

**New layout**: 3 columns, 2 rows. Top row = 3 "fat" photos (300 lbs), bottom row = 3 "skinny" photos (220 lbs), paired vertically:

```text
  Col 1              Col 2              Col 3
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Blue shirt   │ │ White sweater│ │ Sushi/naked  │
│ (300 lbs)    │ │ (300 lbs)    │ │ (300 lbs)    │
├──── 2019 ────┤ ├──── 2022 ────┤ ├──── 2024 ────┤
│ Graduation   │ │ Wine photo   │ │ After attempt│
│ (220 lbs)    │ │ (220 lbs)    │ │ (220 lbs)    │
└──────────────┘ └──────────────┘ └──────────────┘
```

- Year label sits **between** each top/bottom pair (centered divider text), not in corners
- Photo opacity increased from 35% to ~60-65% so people can clearly see the images
- Gradient overlay lightened accordingly so text remains readable but photos are visible
- Overlay text ("Lost 80+ Lbs. Three Times.") stays centered on top

**File**: `src/components/CinematicIntro.tsx`

---

### Part 2 — Flanking before/after photos on 3 sections

Add a before photo (left) and after photo (right) flanking the content of these sections:

1. **"Why Weight Loss Fails"** (CorePrincipleSection) — Pair 1: blue shirt (300 lbs) left, graduation (220 lbs) right
2. **"The WPT Solution"** (MethodSection) — Pair 2: white sweater (300 lbs) left, wine photo (220 lbs) right  
3. **"Coming Soon"** (BookSection) — Pair 3: sushi (300 lbs) left, naked/after (220 lbs) right

Each section gets:
- A tall photo strip (~120-140px wide) on the left showing "BEFORE" with weight label
- A tall photo strip on the right showing "AFTER" with weight label
- Section content centered between them
- On mobile (below `md`), photos stack above the content as a small side-by-side pair to avoid cramped layout

**Files**: `src/components/CorePrincipleSection.tsx`, `src/components/MethodSection.tsx`, `src/components/BookSection.tsx`

---

### Part 3 — Branding cleanup in BookSection

Update remaining "Weight Permanence" references in the BookSection and MethodSection to "LS Diet":
- Browser mockup URL: "weightpermanence.com" → "oscarpoon.com"
- Course title: "Weight Permanence" → "LS Diet"
- "The WPT Solution" → "The LS Diet Solution" (or keep as-is if you prefer)

**Files**: `src/components/BookSection.tsx`, `src/components/MethodSection.tsx`

---

### Summary of files changed
1. `src/components/CinematicIntro.tsx` — reorder grid, brighten photos, move year labels between pairs
2. `src/components/CorePrincipleSection.tsx` — add flanking before/after photos
3. `src/components/MethodSection.tsx` — add flanking before/after photos + brand update
4. `src/components/BookSection.tsx` — add flanking before/after photos + brand update

