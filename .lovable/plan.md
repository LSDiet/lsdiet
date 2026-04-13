

## Plan

### 1. Remove YouTube section
Remove `YouTubeShortsSection` from `Index.tsx`.

### 2. Remove "The Weight Yo-Yo" badge
Remove the badge element from `CinematicIntro.tsx` (lines 68-70). Keep the bouncing arrow.

### 3. Add 3D animated text overlay to Cinematic Intro
Add a **"Lost 80+ Lbs Three Times"** text overlay centered on the intro grid. Letters will be dark-colored (e.g., `hsl(0 0% 10%)` or very dark charcoal) for contrast against the faded/bright photo background.

**Animation**: True 3D perspective — each letter rotates in from behind the screen (`rotateY(90deg) → 0`) with a slight scale bounce, staggered one-by-one (left to right). Fires once on page load, then stays visible.

**Implementation**: Pure CSS + React — use `perspective` on a container, each `<span>` letter gets a CSS animation with `animation-delay` based on index. No Three.js needed for this effect — CSS 3D transforms handle it cleanly and performantly.

Dark text color ensures contrast against the lighter photo grid overlay.

### 4. Fix TransformationGallery
- Swap middle "after" (sushi/`img202012`) with right "after" (wine/`img202311`)
- Update year from `2024` → `2025` on the right card

### Files changed
1. **Edit** `src/pages/Index.tsx` — remove YouTubeShortsSection import and usage
2. **Edit** `src/components/CinematicIntro.tsx` — remove "Weight Yo-Yo" badge, add 3D animated text overlay
3. **Edit** `src/index.css` — add `@keyframes letter-pop-3d` animation
4. **Edit** `src/components/TransformationGallery.tsx` — swap sushi/wine photos, update year to 2025

