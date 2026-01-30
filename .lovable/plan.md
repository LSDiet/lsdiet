

# Plan: Add Low-Starch & Low-Sugar Images with Responsive Layout

## Goal
Add AI-generated illustrations flanking the "Low-Starch. Low-Sugar." heading, with a layout that works beautifully on both desktop and mobile.

---

## Desktop vs Mobile Layout Strategy

### Desktop (md and up)
```text
[Low-Starch Image]  Low-Starch. Low-Sugar.  [Low-Sugar Image]
```
- Images sit on either side of the heading text
- Creates a balanced, visual "bookend" effect

### Mobile (small screens)
```text
        Low-Starch. Low-Sugar.
     [Low-Starch]  [Low-Sugar]
          (side by side, smaller)
```
- Heading stays on top (full width)
- Both images appear below as a compact row
- Images scale down to fit side-by-side

---

## Technical Implementation

### 1. Generate Two AI Images
Using Lovable's image generation:
- **Low-Starch**: Minimalist illustration of vegetables, proteins, leafy greens (no bread/rice/pasta)
- **Low-Sugar**: Minimalist illustration of whole foods without sweets/desserts

Style: Clean line art or soft illustration matching the earthy green (#3a6b54) and amber (#c9a247) palette.

### 2. Update CorePrincipleSection Layout

**Current structure (lines 15-23):**
```tsx
<div className="text-center mb-8">
  <div>A New Lifestyle badge</div>
  <h3>Low-Starch. Low-Sugar.</h3>
  <p>(LSLS is difficult...)</p>
</div>
```

**New responsive structure:**
```tsx
<div className="text-center mb-8">
  <div>A New Lifestyle badge</div>
  
  {/* Responsive heading with images */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
    {/* Low-Starch image - hidden on mobile, shown on desktop left */}
    <img 
      src={lowStarchImage} 
      alt="Low-starch foods"
      className="hidden md:block w-24 h-24 object-contain"
    />
    
    <div>
      <h3>Low-Starch. Low-Sugar.</h3>
      <p>(LSLS is difficult...)</p>
    </div>
    
    {/* Low-Sugar image - hidden on mobile, shown on desktop right */}
    <img 
      src={lowSugarImage} 
      alt="Low-sugar foods"
      className="hidden md:block w-24 h-24 object-contain"
    />
  </div>
  
  {/* Mobile-only: both images below heading */}
  <div className="flex md:hidden justify-center gap-4 mt-4">
    <img src={lowStarchImage} className="w-16 h-16" />
    <img src={lowSugarImage} className="w-16 h-16" />
  </div>
</div>
```

### 3. Responsive Breakpoints

| Screen Size | Layout | Image Size |
|-------------|--------|------------|
| Mobile (<768px) | Images below heading, side-by-side | 64x64px (w-16) |
| Tablet/Desktop (>=768px) | Images flank heading left/right | 96x96px (w-24) |

---

## Why This Solves the Mobile Problem

1. **Desktop**: Images appear exactly where you want them (left of "Low-Starch", right of "Low-Sugar")
2. **Mobile**: Instead of awkward squishing, images gracefully move below the heading as a compact pair
3. **No content is hidden**: Mobile users still see both images, just repositioned

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/assets/lifestyle/low-starch.png` | New AI-generated image |
| `src/assets/lifestyle/low-sugar.png` | New AI-generated image |
| `src/components/CorePrincipleSection.tsx` | Add responsive image layout |

---

## Image Generation Prompts

**Low-Starch:**
> "Minimalist illustration of healthy low-starch foods: leafy greens, broccoli, eggs, fish, avocado. Soft earthy green and amber colour palette. Clean simple style, white background, no text."

**Low-Sugar:**
> "Minimalist illustration of healthy low-sugar foods: vegetables, nuts, cheese, meat, olive oil. Soft earthy green and amber colour palette. Clean simple style, white background, no text."

