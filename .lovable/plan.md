

# Add Second eBook: "Low Starch, Low Sugar = Burn Fat"

## Title
**Low Starch, Low Sugar = Burn Fat**

## Changes

### 1. New page: `src/pages/LSDietGuidePage.tsx`
Mirrors `GLP1GuidePage.tsx` structure exactly:
- Helmet with meta/OG/Twitter tags and JSON-LD (Article + FAQ schemas)
- Hero with title and download CTA
- Content sections from the draft: starvation vs. smart eating, insulin mechanism (sun/clouds metaphor), what raises insulin, No Carb vs. LS comparison, six food categories, sustainable LS lifestyle, Weight Permanence system
- FAQ accordion (5-6 questions)
- References section with all 12 citations
- Same lead capture flow (`useLeadCapture` + `EmailCaptureModal`)

### 2. Update `src/pages/FreeResources.tsx`
Add second entry to `resources` array with title "Low Starch, Low Sugar = Burn Fat", learning points, and link to dedicated page `/ls-diet-guide`.

### 3. Update `src/App.tsx`
Add route `/ls-diet-guide` pointing to `LSDietGuidePage`.

### 4. Assets needed from you
- Cover image (I'll use a placeholder import path `src/assets/ebook-ls-cover.png`)
- Final PDF uploaded to storage bucket

