
# SEO-Optimised GLP-1 Guide Page Implementation Plan

This plan creates a dedicated, SEO-optimised page at `/does-glp-1-work` for the GLP-1 ebook, with full structured data, optimised metadata, and internal linking.

---

## What This Achieves

- **Dedicated URL** (`/does-glp-1-work`) for independent indexing and focused keyword targeting
- **600+ words of indexable content** from the ebook, structured with proper headings
- **FAQ Schema** (JSON-LD) to trigger rich snippets in search results
- **GLP-1-optimised metadata** in title, description, and Open Graph tags
- **Internal links** from Q&A page and Free Resources listing page using GLP-1 language
- **Canonical URL** and proper semantic HTML structure

---

## Implementation Steps

### 1. Create Dedicated GLP-1 Guide Page

**New file:** `src/pages/GLP1GuidePage.tsx`

This page will include:

**SEO Head Section (using react-helmet-async):**
- Title: "Does GLP-1 Work for Weight Loss? | Free Guide"
- Meta description with Ozempic, Wegovy mentions
- Open Graph tags for social sharing
- FAQ Schema (JSON-LD) with the 5 FAQs provided
- Author schema linking to Oscar Poon

**Page Structure:**
```
Header (Navbar)
├── Hero Section
│   ├── H1: "Does GLP-1 Work for Weight Loss?"
│   ├── Introductory paragraph (from ebook)
│   └── Download CTA button
├── Educational Content (600-1000 words)
│   ├── H2: "How Does GLP-1 Medication Work?"
│   ├── H2: "What GLP-1 Medications Do Not Train"
│   ├── H2: "What Happens After the Medication Stops"
│   ├── H2: "What GLP-1 Does Not Solve"
│   │   ├── H3: Eating Habits
│   │   ├── H3: Social and Cultural Pressure
│   │   └── H3: Food Environment
│   └── H2: "The Weight Permanence Triangle™ Solution"
├── FAQ Section (visible accordion)
│   └── 5 FAQ items with expand/collapse
├── Download CTA Section
│   ├── eBook cover image
│   └── Download button (with email capture)
Footer (FooterSimple)
```

### 2. Install react-helmet-async

Required dependency for per-page SEO metadata:
```bash
npm install react-helmet-async
```

### 3. Add HelmetProvider to App

**File:** `src/App.tsx`

Wrap the app with `HelmetProvider` to enable per-page metadata:

```tsx
import { HelmetProvider } from 'react-helmet-async';

// Wrap AppContent with HelmetProvider
```

### 4. Add Route for New Page

**File:** `src/App.tsx`

Add route:
```tsx
<Route path="/does-glp-1-work" element={<GLP1GuidePage />} />
```

### 5. Update Free Resources Page

**File:** `src/pages/FreeResources.tsx`

- Add internal link to the dedicated GLP-1 page
- Change main CTA to "Read the Full Guide" linking to `/does-glp-1-work`
- Keep download option available on both pages

### 6. Add Internal Links from Q&A Page

**File:** `src/pages/QAPage.tsx`

Add contextual links in relevant FAQ answers mentioning GLP-1, linking to `/does-glp-1-work` with anchor text like:
- "Learn more in our free GLP-1 weight loss guide"
- "Read: Does GLP-1 Work for Weight Loss?"

---

## Technical Details

### FAQ Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does GLP-1 work for weight loss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, GLP-1 medications can support short term weight loss by suppressing appetite and slowing digestion. However, they do not teach eating behaviour or build habits that persist once appetite suppression fades."
      }
    },
    // ... 4 more FAQs
  ]
}
```

### Page Metadata

```html
<title>Does GLP-1 Work for Weight Loss? | Free Guide</title>
<meta name="description" content="Learn why GLP-1 medications like Ozempic and Wegovy work for weight loss, why weight often returns after stopping, and what determines long-term results. Free downloadable guide." />
<link rel="canonical" href="https://wpt-preorder.lovable.app/does-glp-1-work" />
```

### Content Sections (from uploaded document)

The page will display this educational content with proper H2/H3 structure:

1. **Introduction** - What GLP-1 medications are and common experiences
2. **How GLP-1 Works** - Hormone function and receptor agonists explanation
3. **What GLP-1 Doesn't Train** - Decision-making, routines, identity
4. **Post-Medication Reality** - Clinical data on weight regain
5. **Three Unsolved Problems** - Eating habits, social pressure, food environment
6. **The Weight Permanence Triangle™** - Awareness, Practice, Permanence overview
7. **Call to Action** - Download the full guide

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/GLP1GuidePage.tsx` | Create | New dedicated SEO page |
| `src/App.tsx` | Modify | Add HelmetProvider + route |
| `src/pages/FreeResources.tsx` | Modify | Add link to dedicated page |
| `src/pages/QAPage.tsx` | Modify | Add internal GLP-1 links |

---

## Post-Implementation

After approval and implementation:

1. **Test the page** at `/does-glp-1-work` to verify content and download flow
2. **Validate FAQ Schema** using Google's Rich Results Test tool
3. **Submit to Google Search Console** (manual step - you'll need to do this in your GSC dashboard)
4. **Monitor indexing** after a few days to confirm the page appears in search results
