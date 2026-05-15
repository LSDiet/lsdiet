## Goal

Fix Facebook/LinkedIn/WhatsApp share previews showing only "lsdiet.com" with no title or image. Root cause: Vite SPA — `react-helmet-async` only injects meta tags after JS runs, but social crawlers don't execute JS, so they only ever see static `index.html`.

## Approach

Server-render the OG meta tags via a public Supabase edge function. Social share intent URLs point to that function. Crawlers read the meta and stop. Humans hitting the URL get instantly redirected to the canonical `lsdiet.com/blog/{slug}`.

URL trade-off accepted: public share URL will be the bare Supabase function URL. Can be migrated to `share.lsdiet.com` later without code changes.

## Files

### New: `supabase/functions/share-blog/index.ts`

- Public function (`verify_jwt = false` already default).
- Reads slug from path: `/share-blog/{slug}`.
- Fetches the post from Contentful using the same gateway pattern as `blog-posts/index.ts` (LOVABLE_API_KEY + CONTENTFUL_API_KEY + CONTENTFUL_SPACE_ID).
- Returns `text/html` with:
  - `<title>{post.title} | LS Diet</title>`
  - `<meta name="description">`, `og:title`, `og:description`, `og:type=article`, `og:url=https://lsdiet.com/blog/{slug}`, `og:image` (post featured image, falls back to `https://lsdiet.com/og-image.jpg`), `og:image:width`/`height` when known
  - `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
  - `<meta http-equiv="refresh" content="0; url=https://lsdiet.com/blog/{slug}">`
  - Inline `<script>window.location.replace("https://lsdiet.com/blog/{slug}")</script>` for instant client redirect
  - Body contains a single visible `<a>` to the canonical URL as a JS-disabled fallback
- All string interpolation HTML-escaped to prevent injection.
- Returns 404 HTML (still with redirect to `/blog`) if slug missing.

### New: `supabase/config.toml` block — not needed; default `verify_jwt = false` is already in effect for new functions.

### Edit: `src/components/ShareButtons.tsx`

- Add prop `crawlerShareUrl?: string` (optional, falls back to `url`).
- Use `crawlerShareUrl ?? url` in the 5 social share intents (Facebook, LinkedIn, X, WhatsApp, Email).
- Keep `url` for Copy Link and `navigator.share` (those go to humans).

### Edit: `src/pages/BlogPostPage.tsx`

- Compute:
  ```ts
  const crawlerShareUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/share-blog/${post.slug}`;
  ```
- Pass `crawlerShareUrl={crawlerShareUrl}` to all three `<ShareButtons>` instances.

## What does NOT change

- Canonical URL stays `https://lsdiet.com/blog/{slug}` in sitemap, JSON-LD, `<link rel="canonical">`, and the `og:url` rendered by the edge function. SEO attribution is unaffected.
- `BlogPage`, navbar, footer untouched.
- No SSR migration. No new dependencies.

## Verification after deploy

1. `curl -L https://joohccchfpcshlihctsm.supabase.co/functions/v1/share-blog/can-losing-weight-help-you-get-a-better-job` — should return HTML with proper `<meta property="og:image">` and `<meta property="og:title">`.
2. Paste that URL into Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) — preview should show title, description, and featured image.
3. Click the Facebook icon on the live blog post — compose dialog should now show the article preview card.
4. LinkedIn check via [Post Inspector](https://www.linkedin.com/post-inspector/).
5. Direct browser hit on the share URL — should redirect to the article in <100ms.

## Future migration note

When ready to brand the URL, set up `share.lsdiet.com` via Cloudflare Worker proxying to this same edge function. Only `crawlerShareUrl` in `BlogPostPage.tsx` changes. Zero changes to the function itself.
