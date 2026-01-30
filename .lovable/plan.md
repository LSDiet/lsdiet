

# Redesign Core Principle Section: Three Problem Cards

## Overview
Transform the current two-card layout into three parallel "Problem" cards, each following the same narrative structure as "The Biology" card. Keep the summary statement below all three cards.

---

## Final Section Structure

```text
            ┌─ The Core Principle ─┐
            │  Low-Starch. Low-Sugar.  │
            └──────────────────────────┘

+--------------------+--------------------+--------------------+
| THE BIOLOGY PROBLEM| THE CULTURE PROBLEM| THE ENVIRONMENT    |
|                    |                    |      PROBLEM       |
|   [Facts]          |   [Facts]          |   [Facts]          |
|   [Callout]        |   [Callout]        |   [Callout]        |
|   [Question]       |   [Question]       |   [Question]       |
+--------------------+--------------------+--------------------+

         "Weight loss is not just a diet change.
    It is a personal, social, and environmental challenge."
```

---

## Card Details

### Card 1: The Biology Problem (existing, just rename title)

**Title:** THE BIOLOGY PROBLEM

**Content:** Keep existing content unchanged
- Your body runs on two main fuels: sugar and fat
- HIGH sugar → fat stays stored / LOW sugar → body burns fat
- Callout about hunger staying high
- Question: "Why does eating less sugar feel harder than it should?"

---

### Card 2: The Culture Problem (NEW)

**Title:** THE CULTURE PROBLEM

**Opening:** Many cultures center meals around starch-based staples.

**Visual badges (no countries):**
```
🥖 Bread    🍚 Rice    🍝 Pasta    🍜 Noodles
```

**Callout:**
Eating differently often means pushing against tradition, family expectations, and social norms.

**Question:** "What happens when your plate contradicts your heritage?"

**Hint:** ↗ Culture shapes cravings more than we think

---

### Card 3: The Environment Problem (NEW)

**Title:** THE ENVIRONMENT PROBLEM

**Opening:** We live in a food environment dominated by ultra-processed products.

**Visual badges (updated reasons):**
```
🍭 Hyper-palatable    💵 Low Cost    📍 Highly Accessible    🔁 Habit
```

**Callout (no hyphens):**
These products are everywhere. They're cheap, engineered to taste irresistible, and impossible to avoid. Exposure is constant.

**Question:** "How do you resist what's designed to be irresistible?"

**Hint:** ↗ The deck is stacked against willpower

---

## Summary Statement (kept below cards)

```tsx
<div className="text-center mt-8">
  <p className="text-muted-foreground text-sm mb-2">
    Weight loss is not just a diet change.
  </p>
  <p className="text-primary text-sm md:text-base font-medium">
    It is a <span className="font-semibold">personal</span>, 
    <span className="font-semibold text-accent">social</span>, and 
    <span className="font-semibold">environmental</span> challenge.
  </p>
</div>
```

---

## Technical Implementation

### File: `src/components/CorePrincipleSection.tsx`

**Changes:**
1. Update grid: `md:grid-cols-2` → `md:grid-cols-3`
2. Rename "THE BIOLOGY" → "THE BIOLOGY PROBLEM"
3. Replace "The Challenge" card with two new cards: Culture Problem + Environment Problem
4. Add summary statement section below the grid

### Badge Styling

**Culture staples:**
```tsx
<div className="flex flex-wrap justify-center gap-2 mb-5">
  <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🥖 Bread</span>
  <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍚 Rice</span>
  <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍝 Pasta</span>
  <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍜 Noodles</span>
</div>
```

**Environment factors:**
```tsx
<div className="flex flex-wrap justify-center gap-2 mb-5">
  <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-600 text-xs font-medium">
    🍭 Hyper-palatable
  </span>
  <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 text-xs font-medium">
    💵 Low Cost
  </span>
  <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 text-xs font-medium">
    📍 Highly Accessible
  </span>
  <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 text-xs font-medium">
    🔁 Habit
  </span>
</div>
```

---

## Responsive Behavior

- **Desktop (md+):** 3-column grid
- **Mobile:** Stack vertically
- Cards use `flex flex-col` with consistent heights

