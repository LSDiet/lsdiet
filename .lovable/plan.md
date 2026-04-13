

## Plan: Fix Intro Grid + Add Dedicated Gallery + Remove Section Backgrounds

### 1. Remove section background photos
Strip `SectionPhotoFrame` wrapper from `CorePrincipleSection`, `MethodSection`, and `BookSection`. Delete `SectionPhotoFrame.tsx`.

### 2. Fix Cinematic Intro grid — photo swaps and corrections

Current mapping is wrong. Corrected:

| Column | Top (fat) | Bottom (skinny) |
|--------|-----------|-----------------|
| Left | Blue shirt (`201908`) — 300 lbs | Sushi (`202012`) — 200 lbs |
| Middle | White sweater (`202204`) — 280 lbs | Wine bottle (`202311`) — 190 lbs |
| Right | Naked/eating (`202405`) — 300 lbs | Graduation/suit (`201710`) — 220 lbs |

Also fix: graduation/suit photo uses `object-center` (not `object-[center_15%]`) to center the subject instead of leaning right. Update weight labels to match (280, 190, 200).

### 3. Add Dedicated Gallery section

New component `src/components/TransformationGallery.tsx` placed in `Index.tsx` between `YouTubeShortsSection` and `CorePrincipleSection`.

Layout: 3 cards in a responsive grid (`grid-cols-1 md:grid-cols-3`). Each card shows a side-by-side before/after photo pair with weight labels and a year badge at the bottom. Rounded corners, dark card background, matching the site's design tokens.

### Files changed
1. **Delete**: `src/components/SectionPhotoFrame.tsx`
2. **Edit**: `src/components/CorePrincipleSection.tsx` — remove SectionPhotoFrame
3. **Edit**: `src/components/MethodSection.tsx` — remove SectionPhotoFrame
4. **Edit**: `src/components/BookSection.tsx` — remove SectionPhotoFrame
5. **Edit**: `src/components/CinematicIntro.tsx` — fix photo order, labels, and suit centering
6. **New**: `src/components/TransformationGallery.tsx` — dedicated 3-card gallery
7. **Edit**: `src/pages/Index.tsx` — add TransformationGallery

