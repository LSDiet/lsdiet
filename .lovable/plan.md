

## Revamp: Cinematic Scroll + LS Diet Branding

### 1. Brand update: "Weight Permanence" to "LS Diet"

**Navbar**: Change logo text from "Weight Permanence" to "LS Diet". Add tagline "Stop Restarting Weight Loss" as a smaller subtitle below or beside it.

**Hero section**: Replace "7-Day Weight Permanence Course" with "7-Day LS Diet Course". Update the subtitle line to incorporate "Stop Restarting Weight Loss".

**Footer**: Update brand name from "Weight Permanence" to "LS Diet".

### 2. Cinematic scroll-reveal above the hero

Create a new full-viewport intro section that loads BEFORE the current hero. This section uses the 6 journey photos as a faded background collage grid, with bold text overlaid in the center.

**Structure (new `CinematicIntro` component)**:
- Full-height (`100dvh`) dark section
- Background: 3-column, 2-row grid of the 6 journey photos at reduced opacity (~30-40%), with a gradient overlay fading to black at the bottom
- Weight labels on each photo (300 lbs, 220 lbs, etc.)
- Centered overlay text:
  - Small accent badge: "The Weight Yo-Yo"
  - Large headline: "Lost 80+ Lbs." / "Three Times."
  - Subtext: "Every time, he gained it all back." / "Until he figured out why."
  - Animated bouncing down-arrow to prompt scrolling
- Photos are large and impactful -- the grid spans the full viewport so each image is substantial

**Page flow becomes**: Navbar -> CinematicIntro (full screen, visual shock) -> HeroSection (CTA + course details) -> rest of page

### 3. Remove duplicate Journey section

Since the journey photos now live in the cinematic intro, the existing `JourneySection` becomes redundant. Remove it from `Index.tsx` to avoid repetition. The journey narrative labels (Stress Eating, Ultra Processed Food, Unsustainable Method) will be preserved in the new intro section.

### Files changed
1. **New**: `src/components/CinematicIntro.tsx` -- full-screen photo collage with overlay text and scroll prompt
2. **Edit**: `src/pages/Index.tsx` -- add CinematicIntro before HeroSection, remove JourneySection
3. **Edit**: `src/components/Navbar.tsx` -- "Weight Permanence" -> "LS Diet"
4. **Edit**: `src/components/HeroSection.tsx` -- update course name copy
5. **Edit**: `src/components/FooterSimple.tsx` -- update brand name

