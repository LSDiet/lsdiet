

# Plan: Transform Key Question into a Sharp Visual Hook

## Goal
Make the question *"Why do certain foods leave people hungry again so soon after eating?"* visually striking and attention-grabbing - a scroll-stopping moment that invites thought, not reading fatigue.

---

## Design Approach: "The Provocative Pause"

Instead of a boxed academic-looking quote, we'll create a **dramatic standalone element** that uses:
- Large, bold typography with visual weight
- Decorative quotation marks as design elements (not inline text)
- Subtle accent underline on key words
- Scroll-triggered fade-in animation for impact
- Generous whitespace for breathing room

---

## Visual Concept

```text
                    ❝
   
     Why do certain foods leave people 
       hungry again so soon after eating?
   
                    ❞
         ────────────────
```

The oversized decorative quotes act as visual anchors, drawing the eye. The question itself is rendered in a larger, bolder style that demands attention.

---

## Technical Implementation

### File: `src/components/MissingPieceSection.tsx`

**Remove lines 195-203** (the current key question box with intro text)

**Replace with:**

```tsx
{/* The Key Question - Sharp Visual Hook */}
<div className="relative my-10 py-8">
  {/* Decorative opening quote */}
  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl md:text-7xl text-accent/30 font-serif select-none">
    "
  </span>
  
  {/* The Question */}
  <p className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-primary leading-snug max-w-2xl mx-auto px-4">
    Why do certain foods leave people{" "}
    <span className="relative inline-block">
      hungry
      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/40 rounded-full" />
    </span>{" "}
    again so soon after eating?
  </p>
  
  {/* Decorative closing quote */}
  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-6xl md:text-7xl text-accent/30 font-serif select-none rotate-180">
    "
  </span>
  
  {/* Minimal accent line below */}
  <div className="w-16 h-0.5 bg-accent/50 mx-auto mt-8" />
</div>
```

### Styling Breakdown

| Element | Style | Purpose |
|---------|-------|---------|
| Container | `my-10 py-8` | Generous vertical breathing room |
| Decorative quotes | `text-6xl text-accent/30` | Large but subtle visual anchors |
| Question text | `text-xl md:text-2xl lg:text-3xl font-semibold` | Bold, attention-grabbing |
| "hungry" underline | `bg-accent/40 h-1 rounded-full` | Highlights the key word |
| Bottom accent line | `w-16 h-0.5 bg-accent/50` | Clean visual closure |

### Optional: Add Scroll Animation

Wrap with `useScrollAnimation` for a subtle entrance:

```tsx
const { ref: questionRef, isVisible: questionVisible } = useScrollAnimation();

<div 
  ref={questionRef}
  className={`relative my-10 py-8 transition-all duration-700 ${
    questionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  {/* ... question content ... */}
</div>
```

---

## Before vs After

**Before:**
- Box with background + border
- Small intro text: "That conversation planted..."
- Italicized question in `text-lg`
- Feels like reading material

**After:**
- No box - pure typography
- No intro text - question stands alone
- Bold question in `text-2xl` with decorative quotes
- Key word "hungry" has accent underline
- Feels like a **moment of reflection**

---

## Result

The question becomes a visual **pause point** - large enough to be noticed, styled distinctively enough to feel intentional, and designed to make readers stop and think rather than skim past.

