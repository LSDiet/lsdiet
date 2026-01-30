
# Add Rhetorical Question Hook to Biology Card

## Overview
Add a thought-provoking question below the callout box in "The Biology" card to create a psychological pause moment that validates the reader's struggle and bridges to "The Challenge" card.

---

## The Question
**"Why does eating less sugar feel harder than it should?"**

This question works because:
- Assumes shared experience (relatable)
- Implies a hidden reason (curiosity)
- Uses emotional language ("feel")
- Validates frustration ("should" be easier)

---

## Design Approach

```text
+------------------------------------------+
| THE BIOLOGY                              |
|                                          |
| Your body runs on two main fuels:        |
| sugar and fat.                           |
|                                          |
| • HIGH sugar → fat stays stored          |
| • LOW sugar → body burns fat             |
|                                          |
| ┌────────────────────────────────────┐   |
| │ The body prioritizes sugar when... │   |
| │ When this process is disrupted,    │   |
| │ hunger stays high.                 │   |
| └────────────────────────────────────┘   |
|                                          |
|   ↓ NEW QUESTION HERE ↓                  |
|                                          |
| "Why does eating less sugar feel         |
|  harder than it should?"                 |
|         ↗ (look to Challenge card)       |
+------------------------------------------+
```

---

## Styling Options

### Option 1: Subtle italic (recommended)
- Italic text, muted color
- Feels like a natural thought continuation
- Non-intrusive, but creates pause

### Option 2: Centered with visual emphasis
- Centered text with slight accent color
- Small arrow or visual hint pointing to Challenge card
- More prominent "hook" feel

### Option 3: Speech bubble / thought style
- Light background with curved border
- Feels more conversational
- May feel too playful for the tone

---

## Technical Implementation

### File: `src/components/CorePrincipleSection.tsx`

Add a new element after the callout box (line 51) and before the closing `</div>` of the Biology card:

```tsx
{/* Rhetorical question hook */}
<p className="mt-5 text-center text-sm md:text-base italic text-muted-foreground">
  Why does eating less sugar feel harder than it should?
</p>
```

Alternative styling with subtle accent:
```tsx
<p className="mt-5 text-center text-sm md:text-base text-muted-foreground">
  <span className="italic">Why does eating less sugar feel harder than it should?</span>
  <span className="block text-xs text-accent mt-1">→</span>
</p>
```

---

## Narrative Flow After Implementation

1. **Biology facts** → Reader learns HIGH/LOW sugar dynamics
2. **Callout insight** → "When disrupted, hunger stays high"
3. **Question hook** → "Why does it feel harder than it should?" ← NEW
4. **Challenge card** → "Here's why..." (personal, social, environmental)
5. **WPT solution** → "Here's how to overcome it"

---

## Alternative Question Options (if you want to consider)

| Question | Tone |
|----------|------|
| "Why does eating less sugar feel harder than it should?" | Empathetic, curious |
| "If the biology is simple, why is the change so hard?" | Bridges biology → challenge |
| "So why do most diets still fail?" | Direct, provocative |
| "What's really blocking fat-burning mode?" | Technical curiosity |

Your original question is the strongest - it's personal ("feel"), validating ("harder than it should"), and open-ended.
