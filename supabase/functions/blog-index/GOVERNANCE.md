# Taxonomy Governance — LS Diet Blog

Plain-English rules for editors. These are enforced in code by the
`blog-index` edge function (for Contentful posts) and by TypeScript +
the build (for code-managed foundations). Violations on the Contentful
side are logged and surfaced in the `X-Taxonomy-Warnings` response header.

## Three publishing systems

- **Foundations** (pillars + entity hubs) live in `src/content/foundations/`.
  Authority layer — deepest, most framework-centric content. Authored by
  Oscar / ChatGPT, implemented in code by Lovable.
- **Real Life Weight Questions** (curated editorial) live in Contentful.
- **Search-driven articles** (utility / search-entry layer) live in
  `src/content/articles/`. Bulk-publishable, no thumbnails, title-only
  on `/blog`, heavily interlinked into foundations.

### Slug-collision precedence (locked)

```
Foundations  >  Contentful  >  Articles
```

Articles NEVER override curated editorial content. Foundations always
win. This is enforced in `src/lib/blogIndex.ts` and in
`src/pages/BlogPostPage.tsx` routing.

### Article content discipline

Search-driven articles are **search-entry pages, not mini-foundations**.
Each article must:

- Solve one immediate search problem
- Answer one intent clearly
- Create recognition
- Route deeper into LS Diet

Each article must NOT:

- Re-explain the WPT framework end-to-end
- Re-teach the 5 Awareness Stages from scratch
- Repeat the entire behavioural system every time
- Compete with the foundation it supports

### Interlinking rules

- 3–6 contextual inline links per article
- One early link (when natural — no fixed word range)
- One deeper reinforcement link later in the body
- Anchor variation throughout — never repeat the same anchor twice
- Links flow upward only: articles → foundations (no reciprocal links
  from foundations back to articles)

### Anti-template variation (for bulk drops)

When publishing many articles at once, vary deliberately to avoid a
detectable same-template footprint:

- Intros (question, story, myth-bust, stat-led, direct)
- Subsection counts (2–6 H2s, not standardized)
- FAQ blocks (present in some, absent in others)
- Emotional framing (validating / challenging / calming / blunt)
- Rhythm and length (target 600–1,100 words, allow swing)
- CTA phrasing and placement


## Hard rules

1. **One `canonicalTopic` per page.** Must be exactly one of:
   - `stop-weight-regain`
   - `weight-permanence-triangle`
   - `awareness-stages`
   - `action-practice-examples`
   - `ls-diet-foundations`
   - `ls-diet-examples`

2. **Max 5 free `topics[]`** per post. Anything over 5 is truncated.

3. **Slugs are immutable after publish.** Changing a slug breaks every
   inbound link, schema reference, and crawler cache. If you must
   rename, publish a new post and 301 the old.

4. **All slugs and tags are lowercase-hyphenated.** No spaces, no
   underscores, no camelCase. `food-noise` not `Food Noise`.

5. **One foundation per parent.** Don't publish two `pillar`-type posts
   with the same `parentUrl` covering the same ground — pick one,
   merge or convert the other to `supporting`.

6. **Entity hub URLs are derived from `canonicalTopic`.** A hub for
   `stop-weight-regain` lives at `/topics/stop-weight-regain`. The
   canonical topic enum is locked → URLs cannot drift.

## Soft rules (style)

- Use Canadian English (`behaviour`, `fibre`).
- Hyphenate `low-starch` and `low-sugar`.
- Always link the parent hub from a foundation; always link a foundation
  from a supporting post.
- Author byline is always Oscar Poon, linking `/oscar-poon`.
