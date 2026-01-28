
# Create SEO-Optimized Q&A Page

## Overview

Build a dedicated `/qa` page designed to capture search intent from people struggling with weight issues. The FAQ content will use natural language questions that match what real people type into search engines and AI chat interfaces.

## Estimated Credits: 2-4 messages

## Technical Implementation

### Step 1: Create the Q&A Page

**New file: `src/pages/QAPage.tsx`**
- Hero section with "Questions About Weight Loss?" heading
- Four accordion categories:
  - Weight Regain
  - Hunger & Biology  
  - The Low-Starch, Low-Sugar Approach
  - The Method
- Reuses Navbar and FooterSimple components
- Scroll animations using existing `useScrollAnimation` hook
- SEO meta tags for search engine optimization

### Step 2: Update Routing

**Edit: `src/App.tsx`**
- Add `/qa` route pointing to QAPage component

### Step 3: Update Navigation

**Edit: `src/components/Navbar.tsx`**
- Add "Q&A" link to navigation
- New flow: My Journey | The Method | The Book | Q&A

## FAQ Content Categories

**Weight Regain:**
- "Why do I regain weight even when I eat less?"
- "Why can't I keep weight off long term?"
- "Why does every diet work until it doesn't?"

**Hunger & Biology:**
- "Is hunger biological or just willpower?"
- "Why am I always hungry even after eating?"
- "Why do I crave carbs and sugar?"

**Low-Starch, Low-Sugar Approach:**
- "What is a low-starch, low-sugar diet?"
- "How is low-starch, low-sugar different from keto?"
- "Can I eat until full and still lose weight?"

**The Method:**
- "What is the Weight Permanence Triangle?"
- "Why do I need more than just a meal plan?"

## Design Consistency

- Uses existing color palette and typography
- Compact padding (py-10) per project memory
- Accordion styling matches site aesthetic
- Fade-in animations on scroll
