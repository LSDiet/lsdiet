# SEO entity restructure: LS Diet as primary brand

Reframe the site so search engines and AI tools see **LS Diet (lsdiet.com)** as the organisation and **Oscar Poon** as its founder — not the other way around. Also fix the title, description, and social handle inconsistency.

## 1. `index.html` — JSON-LD, title, meta, Twitter

**Title** → `LS Diet | Stop Weight Regain with Low-Starch Low-Sugar`

**Meta description** → `LS Diet is a low-starch, low-sugar lifestyle system created by Oscar Poon to stop weight regain through behavioural permanence, awareness training, and sustainable daily habits.`

**OG tags** → mirror new title/description; `og:url` → `https://lsdiet.com/`

**Twitter** → `@JoinLSDiet` (replaces `@WhatAboutWeight`)

**Add canonical** → `<link rel="canonical" href="https://lsdiet.com/" />`

**Restructured JSON-LD `@graph`** (Organization first, Person references it via `worksFor`, Person `@id` lives on lsdiet.com):

```text
Organization @id  https://lsdiet.com/#organization
  name          LS Diet
  url           https://lsdiet.com
  founder       → Person
  sameAs        [youtube, instagram, tiktok @JoinLSDiet]

WebSite @id     https://lsdiet.com/#website
  url           https://lsdiet.com
  name          LS Diet
  publisher     → Organization

Person @id      https://lsdiet.com/#oscar-poon
  name          Oscar Poon
  jobTitle      Founder
  worksFor      → Organization
  sameAs        [LinkedIn, YouTube @JoinLSDiet]

Book            Weight Permanence
  author        → Person
  publisher     NTL Learning Solutions Inc.
```

## 2. Per-page canonicals & schema (`src/pages/LSDietGuidePage.tsx`, `src/pages/GLP1GuidePage.tsx`)

- `link rel="canonical"` and `og:url` → `https://lsdiet.com/...`
- Article schema `author.url` and `publisher.url` → `https://lsdiet.com`
- `og:image` for GLP-1 page → `https://lsdiet.com/og-glp1-guide.png`

## 3. Sitemap & robots (`public/sitemap.xml`, `public/robots.txt`)

- All `<loc>` entries → `https://lsdiet.com/...`
- `Sitemap:` directive in robots.txt → `https://lsdiet.com/sitemap.xml`

## 4. Social handle: `@WhatAboutWeight` → `@JoinLSDiet`

YouTube URLs (`youtube.com/@WhatAboutWeight` → `youtube.com/@JoinLSDiet`) and visible labels in:
- `src/components/AboutAuthorSection.tsx` (link + alt text + label)
- `src/components/YouTubeShortsSection.tsx` (subscribe link)
- `src/components/WaitlistModal.tsx` (link)
- `src/pages/QAPage.tsx` (two answer body references)

**Leaving alone** (these are different things, not the YT handle):
- `info@whataboutweight.com` email and the legal "operating as WhatAboutWeight" trade-name references in TermsOfUse / PrivacyPolicy / HealthDisclaimer — those are entity/legal copy, not social handles.
- `oscarpoon.com` printed inside the book mockup (`BookSection.tsx`) — visual artwork on the cover, not a metadata signal.

## 5. Memory updates

Update `mem://index.md` Core: change "Primary domain oscarpoon.com" → "Primary domain lsdiet.com". Update `mem://project/domain-configuration` and `mem://brand/social-presence` to reflect lsdiet.com primary and `@JoinLSDiet` handle.

## Notes

- All edits are static head/JSON-LD/text — no behavioural code changes.
- oscarpoon.com remains a configured custom domain (it'll keep resolving), but every canonical signal now points at lsdiet.com so Google consolidates the entity there.
