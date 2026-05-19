# Homepage Cognitive-Load Overhaul (Plan v3)

Goal: shift the homepage from "educational long-form" to "10-second understanding + route deeper." Cut paragraphs, add visual compression, reorder for funnel logic.

## New section order

```
1. Hero (compressed)
2. What Is LS Diet  (visual blocks, 1 sentence)
3. The Problem Isn't Losing Weight  (UNTOUCHED)
4. Why People Restart Weight Loss  (recognition list)
5. LS Diet + WPT  (1 line + A+P=P diagram only)
6. 5 Stages of Awareness + Action Practice  (UNTOUCHED)
7. What Practice Looks Like  (NEW — visual Skool preview, replaces Why Diets Fail)
8. The Free LS Diet Course
9. LS Diet FAQ  (moved below course)
10. About Oscar Poon  (UNTOUCHED, kept concise)
```

Removed entirely: `WhyDietsFailSection`.

---

## Section-by-section changes

### 1. Hero (`HeroSection.tsx`)
Strip to one headline + proof.

- Headline: **"Low-Starch, Low-Sugar Stops Weight Regain."** (accent on "Stops Weight Regain")
- Remove subheadline ("Low-Starch, Low-Sugar (LS) is the only way...")
- Remove "How do I know? / Because I lost 80+ lbs three times" block
- Transformation grid stays
- Below grid, single caption line: *"Lost 80+ lbs three times. Built LS Diet to stop restarting."*
- Keep "Join LS Diet" CTA

### 2. What Is LS Diet (`WhatIsLSDietSection.tsx`)
Replace both paragraphs with a visual block grid + one sentence.

Layout (responsive 2-column on desktop, stacked on mobile):

```
┌─────────────────────┐  ┌─────────────────────┐
│  🥩  LS             │  │  🧠  WPT            │
│  Low-Starch         │  │  Weight Permanence  │
│  Low-Sugar          │  │  Triangle™          │
│  Eat until full     │  │  Psychology +       │
│                     │  │  Behaviour Training │
└─────────────────────┘  └─────────────────────┘
              =  STOP WEIGHT REGAIN
```

One sentence below: *"LS Diet combines low-starch low-sugar eating with behavioural permanence training."*

Single link: "Read the full LS Diet overview →"

No other prose.

### 3. The Problem Isn't Losing Weight
Untouched.

### 4. Why People Restart Weight Loss
Convert from paragraph + 3-card breakdown to a recognition list. Replace the entire body with a compact bulleted list (icon + 2-4 words each):

- Stress takes over
- Old habits return
- Motivation fades
- Emotional eating comes back
- Travel and holidays disrupt routine
- Life gets busy again

Single link below: "See why people regain weight →" → `/blog/why-people-regain-weight-after-dieting`

Remove the Psychology/Biology/Environment framing entirely from this section.

### 5. LS Diet + WPT (`MethodSection.tsx`)
Compress to bare minimum.

- Keep heading
- Replace both intro paragraphs with two short lines:
  - **LS Diet = food system** (link to LS pillar)
  - **WPT = behavioural system** (link to WPT pillar)
- Keep A + P = P pill diagram
- **Remove** the italic line "Clarity creates priority. Action survives disruption. Priority sustains action."

### 6. 5 Stages + Action Practice
Untouched.

### 7. What Practice Looks Like (NEW — `WhatPracticeLooksLikeSection.tsx`)
Replaces `WhyDietsFailSection`. Visual proof that implementation exists.

Structure:
- Eyebrow: "What Practice Looks Like"
- Heading: **"This is what daily practice looks like."**
- Image 1: existing `skool-course-tracks.png` (3 tracks overview)
- Image 2: existing `skool-action-practice.png` (sample Action Practice lesson)
- 4 small caption chips below the images: `Daily prompts` · `Awareness reps` · `Habit swaps` · `Progress tracking`
- Single CTA: "Join LS Diet" → Skool

Almost no prose. Images carry the message.

### 8. Free LS Diet Course (`BookSection.tsx`)
No content changes. Just reorder so it appears before FAQ.

### 9. FAQ (`FAQSection.tsx`)
Moved to after the course. No content changes.

### 10. About Oscar Poon (`AboutAuthorSection.tsx`)
Untouched.

---

## File changes

| File | Action |
|---|---|
| `src/components/HeroSection.tsx` | Trim copy |
| `src/components/WhatIsLSDietSection.tsx` | Rewrite as visual block layout |
| `src/components/WhyDietsFailSection.tsx` | **Delete file** |
| `src/components/MethodSection.tsx` | Trim copy, remove italic line |
| `src/components/WhatPracticeLooksLikeSection.tsx` | **Create new** |
| `src/components/AwarenessStagesSection.tsx` | Rename internal heading if it currently says "Why People Restart Weight Loss" — otherwise check which existing component holds that section and convert it to the recognition list. *(Will verify exact component on implementation.)* |
| `src/pages/Index.tsx` | Update imports + reorder sections per new order |

## Notes
- Canadian English, no hyphens in prose (except "low-starch low-sugar").
- All CTA buttons remain "Join LS Diet".
- All cross-page links use native `<a>` per project rule.
- No new images needed; we reuse existing Skool screenshots for section 7.
- Interlinking budget preserved — every pillar still gets at least one inbound link from the homepage via the curriculum section and the compressed Method section.
