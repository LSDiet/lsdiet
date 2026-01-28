

# Circular Hunger Cycle Diagram

## Overview

Replace the current linear 8-step `HungerCycleFlow` with a clean, circular diagram inspired by the reference images. The diagram will have 4 nodes positioned around a circle with curved arrows connecting them in a complete loop (including the missing arrow from the last node back to the first).

## Estimated Credits: 1 message

## The 4 Nodes (consolidated from 8 steps)

| Position | Label | Sublabel (optional) |
|----------|-------|---------------------|
| **Top** | Wrong foods | High-sugar, refined-starch |
| **Right** | Blood sugar chaos | Glucose spike, insulin surge |
| **Bottom** | Hunger takes over | Cravings, low satiety |
| **Left** | Weight regain | Increased intake |

## Visual Design

Inspired by your reference images:

```text
                    ┌─────────────────┐
         ┌─────────►│   Wrong foods   │─────────┐
         │          └─────────────────┘          │
         │                                       ▼
┌────────┴────────┐                    ┌─────────────────┐
│  Weight regain  │                    │ Blood sugar     │
│                 │                    │ chaos           │
└────────┬────────┘                    └─────────┬───────┘
         ▲                                       │
         │          ┌─────────────────┐          │
         └──────────│  Hunger takes   │◄─────────┘
                    │  over           │
                    └─────────────────┘
```

## Implementation Approach

**CSS/HTML-based circular layout** (no complex SVG):
- Use absolute positioning to place 4 nodes at cardinal points around a centre
- Use SVG curved arrows (`<path>` with bezier curves) connecting each node
- Arrows form a complete clockwise loop: Top → Right → Bottom → Left → Top

**Node styling**:
- Rounded card/pill shapes with subtle borders
- "Wrong foods" highlighted in destructive/warning colour (entry point)
- "Weight regain" highlighted in destructive colour (consequence)
- Middle nodes in muted/neutral styling

**Arrow styling**:
- Smooth curved paths with arrowheads
- Subtle animation on scroll (fade in sequentially)

**Mobile responsive**:
- Maintain circular layout but scale down proportionally
- Or stack vertically with straight arrows on very small screens

## Animation

1. Nodes fade in sequentially (staggered 150ms) on scroll
2. Arrows fade in after their source node appears
3. The complete loop visually reinforces the "cycle" concept

## File Changes

### Edit: `src/components/MissingPieceSection.tsx`

**Replace:**
- `hungerCycleSteps` array (lines 6-15) with 4 consolidated cycle nodes
- `HungerCycleFlow` component (lines 17-55) with new `CircularHungerCycle` component

**New `CircularHungerCycle` features:**
- Relative container with fixed aspect ratio
- 4 absolutely positioned node cards at top, right, bottom, left
- SVG overlay with 4 curved arrow paths (including the missing loop-back arrow)
- Scroll-triggered animations via `useScrollAnimation`

**Keep unchanged:**
- `HeroSolutionReveal` component (the breakthrough reveal after the cycle)
- All other section content

## Technical Details

The circular layout uses:
- A container with `relative` positioning and `aspect-square` (or fixed height)
- Nodes positioned with `absolute` and percentage-based offsets
- SVG paths for arrows using quadratic/cubic bezier curves
- CSS transforms for centring nodes at their positions

