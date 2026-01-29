

# SEO Implementation Plan: Oscar Poon Entity Visibility

## Overview
Implement progressive disclosure bio in the footer with full JSON-LD structured data to establish "Oscar Poon" as a searchable entity tied to WhatAboutWeight.

---

## Changes Summary

### 1. Footer Enhancement (FooterSimple.tsx)
Add a collapsible "Founded by Oscar Poon" section using native HTML `<details>` element (crawlable by Google even when collapsed).

**Visual structure:**
```text
+--------------------------------------------------+
|  [Logo] Weight Permanence                        |
|                                                  |
|  ▶ Founded by Oscar Poon                         |
|     (expands to show bio when clicked)           |
|                                                  |
|  © 2026 NTL Learning Solutions Inc.              |
+--------------------------------------------------+
```

**Bio content (your copy):**
> **Oscar Poon** is the founder of WhatAboutWeight (Book: Weight Permanence) and the creator of the Weight Permanence Triangle™ (WPT), a neurobehavioural training designed to make weight loss intentional, sustainable, and permanent.
>
> After losing over 60 lbs multiple times and observing why willpower-based approaches repeatedly fail, he developed WPT to address the behavioural and biological drivers of weight regain.

---

### 2. JSON-LD Structured Data (index.html)
Inject three interconnected schemas into the `<head>`:

**A. Person Schema (Oscar Poon)**
- Full name, job title, description
- Links to YouTube and LinkedIn via `sameAs`
- References WhatAboutWeight as `worksFor`

**B. Book Schema (Weight Permanence)**
- Author reference pointing to Oscar Poon
- Genre: Health, Weight Loss
- Publisher: NTL Learning Solutions Inc.

**C. Organization Schema (WhatAboutWeight)**
- Founder reference pointing to Oscar Poon
- URL and description

---

### 3. Meta Tag Updates (index.html)
- Change `<meta name="author">` from "Weight Permanence" to "Oscar Poon"
- Update OG image and Twitter image to your actual site preview (optional, if you have one)

---

### 4. Image Alt Text Fix (AboutAuthorSection.tsx)
- Change `alt="Oscar"` to `alt="Oscar Poon, founder of WhatAboutWeight"`

---

## Technical Details

### File: `src/components/FooterSimple.tsx`
Add collapsible bio section with styled `<details>` element:
- Subtle styling that blends with footer
- Chevron indicator for expandability
- Bio text in muted color, non-intrusive

### File: `index.html`
Add JSON-LD script block with combined schema:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://wpt-preorder.lovable.app/#oscar-poon",
      "name": "Oscar Poon",
      "jobTitle": "Founder",
      "description": "Founder of WhatAboutWeight and creator of the Weight Permanence Triangle (WPT)...",
      "worksFor": { "@id": "https://wpt-preorder.lovable.app/#organization" },
      "sameAs": [
        "https://www.youtube.com/@WhatAboutWeight",
        "https://www.linkedin.com/in/poonoscar/"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://wpt-preorder.lovable.app/#organization",
      "name": "WhatAboutWeight",
      "url": "https://wpt-preorder.lovable.app",
      "founder": { "@id": "https://wpt-preorder.lovable.app/#oscar-poon" }
    },
    {
      "@type": "Book",
      "name": "Weight Permanence",
      "author": { "@id": "https://wpt-preorder.lovable.app/#oscar-poon" },
      "publisher": "NTL Learning Solutions Inc.",
      "genre": ["Health", "Weight Loss", "Self-Help"]
    }
  ]
}
```

### File: `src/components/AboutAuthorSection.tsx`
Update image alt text for entity association.

---

## SEO Impact

| Signal | Before | After |
|--------|--------|-------|
| "Oscar Poon" in HTML | 1 mention | 4+ mentions |
| JSON-LD Person schema | None | Full entity |
| Book-Author link | None | Explicit |
| Meta author tag | Generic | Oscar Poon |
| Image alt text | "Oscar" | Full name + context |
| Social profile links | None | YouTube, LinkedIn |

---

## User Experience
- **Default view**: Readers see only "Founded by Oscar Poon" - minimal, non-intrusive
- **On click**: Bio expands for curious readers
- **SEO**: Google sees full content regardless of collapsed state

