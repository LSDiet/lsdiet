
# Refreshing the Free Resources Page Header

The current heading is functional but lacks the visual polish of other pages. Here's a plan to make it more engaging while maintaining the site's minimal animation philosophy.

---

## Current State

The header section has:
- Plain `text-2xl md:text-3xl font-bold` heading
- No supporting elements (badge, subheading, or visual interest)
- Abrupt appearance (no entrance animation)

---

## Proposed Design

Match the visual language of the HeroSection and BookSection with:

1. **Accent Badge** - Small pill element above the heading (like "Pre-Order Now Available" in BookSection)
   - Text: "Free Downloads" or "100% Free"
   - Styling: `bg-accent/15 border border-accent/25 text-accent`

2. **Upgraded Heading Typography**
   - Change to `font-serif` to match other page headings
   - Highlight "LS" in accent colour for brand reinforcement
   - Slightly larger text on desktop

3. **Supporting Subtitle**
   - Brief one-liner explaining the value proposition
   - Muted colour, smaller text

4. **Subtle Background Elements**
   - Two soft blurred circles (same as HeroSection) for depth
   - Positioned behind text, pointer-events disabled

5. **Entrance Animation**
   - Staggered `animate-fade-in-up` on badge, heading, and subtitle
   - Keeps with the minimal animation philosophy (appears once, no continuous motion)

---

## Visual Preview

```text
     ┌─────────────────────────────────────────────────┐
     │                                                 │
     │         ╭──────────────────╮                    │
     │         │   100% Free      │  ← accent badge    │
     │         ╰──────────────────╯                    │
     │                                                 │
     │   Free Tools for a Low-Starch,                  │
     │      Low-Sugar (LS) Lifestyle                   │
     │                ↑ "LS" in accent colour          │
     │                                                 │
     │   Practical guides to help you eat              │
     │   better without the overwhelm.                 │
     │                ↑ muted subtitle                 │
     │                                                 │
     └─────────────────────────────────────────────────┘
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/FreeResources.tsx` | Update header section with badge, improved typography, subtitle, and animations |

---

## Technical Details

The header section (lines 62-66) will be expanded to include:

```tsx
{/* Background decorative elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
  <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
</div>

{/* Badge */}
<div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/15 border border-accent/25 mb-6 opacity-0 animate-fade-in-up">
  <span className="text-sm font-medium text-accent">100% Free</span>
</div>

{/* Heading with LS highlight */}
<h1 className="text-3xl md:text-4xl font-serif font-normal text-primary mb-4 opacity-0 animate-fade-in-up animate-delay-100">
  Free Tools for a Low-Starch, Low-Sugar{" "}
  <span className="text-accent">(LS)</span> Lifestyle
</h1>

{/* Subtitle */}
<p className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
  Practical guides to help you eat better without the overwhelm.
</p>
```

This aligns with the design patterns established in HeroSection and BookSection while keeping the page simple and focused.
