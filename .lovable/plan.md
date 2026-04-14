

## Plan: Update Headline to Bold Condensed + Accent Stroke Style

### What changes

Update the `AnimatedLine` component in `src/components/CinematicIntro.tsx` to use the selected style:

- **Font**: Switch to `Impact` / condensed fallback stack (`Impact, 'Arial Narrow', sans-serif`)
- **"Lost 80+ Lbs" (top row)**: Hollow/outline style -- transparent fill with a `2px` accent-orange stroke (`#f59e0b`) and a warm glow shadow
- **"Three Times" (bottom row)**: Solid accent-orange fill with a `2px` black stroke and warm glow shadow
- **Letter spacing**: Wider (`0.05em`) to suit the condensed face
- Keep the existing 3D pop-in animation and staggered delays

### Files changed

1. `src/components/CinematicIntro.tsx` -- update `AnimatedLine` to accept a `variant` prop (`"outline"` vs `"solid"`), apply different stroke/fill styles per line. Update font-family on the letter spans.

