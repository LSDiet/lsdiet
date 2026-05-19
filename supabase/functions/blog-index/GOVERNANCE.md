# Taxonomy Governance — LS Diet Blog

Plain-English rules for editors. These are enforced in code by the
`blog-index` edge function (for Contentful posts) and by TypeScript +
the build (for code-managed foundations). Violations on the Contentful
side are logged and surfaced in the `X-Taxonomy-Warnings` response header.

## Two publishing systems

- **Foundations** (pillars + entity hubs) live in `src/content/foundations/`.
  Authored by Oscar / ChatGPT, implemented in code by Lovable. Slugs,
  schema, and interlinking are governed by the repo, not by Contentful.
- **Real Life Weight Questions** (supporting, comparison, FAQ) live in
  Contentful and are subject to the rules below.

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
