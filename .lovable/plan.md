# Contentful Blog — Simplified Plan

Goal: cheapest, most reliable path to a Contentful-driven blog with strong SEO. No edge functions. No runtime backend. One build script, direct CDN fetches in the browser, automatic sitemap.

## Architecture in one paragraph

The Contentful Delivery API is a read-only CDN with a public-safe delivery token (designed to ship in browsers — same model as Algolia search keys). We call it directly from the React app using `import.meta.env.VITE_LOVABLE_CONNECTOR_CONTENTFUL_*` env vars. No edge function in the request path = no cold starts, no extra surface to maintain. A single Node script runs at build time to (a) generate `public/sitemap.xml` from all currently-live posts and (b) optionally pre-render each `/blog/[slug]` to a static HTML shell with title, meta, OG, canonical, and Article JSON-LD baked in — so Googlebot, LinkedIn, Slack, and Facebook crawlers all see fully rendered metadata without executing JS.

## 1. Connect Contentful

Use the Lovable Contentful connector. Available env vars after connect:
- `VITE_LOVABLE_CONNECTOR_CONTENTFUL_SPACE_ID` (browser-safe, non-secret)
- `VITE_LOVABLE_CONNECTOR_CONTENTFUL_DELIVERY_TOKEN` (the delivery token is designed to be public; safe to bundle)

If the connector exposes the delivery token as a server-only secret, we'll create one tiny helper that copies it to a `VITE_` var at build time, or fall back to the gateway from the build script only.

## 2. Direct browser → Contentful CDN

One small fetch helper, no React Query wrapper needed (Contentful's CDN already caches aggressively):

```ts
// src/lib/contentful.ts
const SPACE = import.meta.env.VITE_LOVABLE_CONNECTOR_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_CONTENTFUL_DELIVERY_TOKEN;
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export async function listPosts() {
  const r = await fetch(
    `${BASE}/entries?content_type=blogPost&order=-fields.publishDate&fields.publishDate[lte]=${new Date().toISOString()}&include=2`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return resolveAssets(await r.json());
}

export async function getPost(slug: string) { /* same with fields.slug=slug&limit=1 */ }
```

The `fields.publishDate[lte]=now` filter handles **future-dated post hiding automatically at every page load** — no rebuild required when a scheduled post crosses its publish time.

## 3. Routes

- `/blog` → existing `BlogPage` rewritten: fetches `listPosts()` once, renders responsive card grid (image, title, excerpt, date)
- `/blog/:slug` → new `BlogPostPage`: fetches `getPost(slug)`, renders article with `@contentful/rich-text-react-renderer`

Each card and link uses native `<a href="/blog/{slug}">` (per project rule for cross-page nav).

## 4. SEO per post

`BlogPostPage` uses `react-helmet-async` (already installed) to inject:
- `<title>{post.title}</title>` — exact title, no transforms
- `<meta name="description" content={excerpt}>`
- `<link rel="canonical" href="https://lsdiet.com/blog/{slug}">`
- OG tags (`og:type=article`, `og:title`, `og:description`, `og:image`, `og:url`)
- Article JSON-LD with `datePublished`, `dateModified`, `author: Oscar Poon`, `publisher: LS Diet`, `image`, `mainEntityOfPage`
- BreadcrumbList JSON-LD via existing `PageBreadcrumb` component (Home → Blog → title)

H1 = exact `post.title`. Internal-link block at the bottom of every post links to `/`, `/what-is-ls-diet`, `/weight-permanence-triangle`, `/faq`.

## 5. One build script does sitemap + pre-render

`scripts/build-blog.ts`, run via `prebuild` and `predev` hooks:

1. Fetch all posts from Contentful Delivery API where `publishDate <= now`
2. Write `public/sitemap.xml` with the existing 14 static routes + one `/blog/{slug}` entry per published post (lastmod from `sys.updatedAt`, priority 0.7)
3. **Pre-render**: read `dist/index.html` template (or `index.html` source) and for each published post, write `dist/blog/{slug}/index.html` with title, meta, OG, canonical, and Article JSON-LD already inlined into `<head>`. The body still hydrates as the SPA — Google and social crawlers get fully rendered metadata without executing JS.

This is ~80 lines of plain Node, no dependencies beyond `node-fetch` (built into Node 20). Pre-render runs in `postbuild` (after Vite emits `dist/`), sitemap runs in `prebuild`.

For dev (`vite dev`), pre-rendering is skipped — only the sitemap is generated. Hot reload works normally.

## 6. Robots

Confirm `public/robots.txt` allows `/blog/`. Add `Sitemap: https://lsdiet.com/sitemap.xml` if missing. No other change.

## 7. What you get

| Requirement | How it's met |
|---|---|
| Exact title preservation | Title rendered verbatim in H1, `<title>`, OG, JSON-LD — no string transforms |
| Scheduled publishing | `fields.publishDate[lte]=now` filter at runtime + build time |
| Auto sitemap | `prebuild` script regenerates from Contentful every build |
| Future-date filtering | Same filter; future posts return 404 at `/blog/:slug` and don't appear in `/blog` or sitemap |
| Canonical tags | Helmet on each post + baked into pre-rendered HTML |
| Article schema | Helmet + baked-in JSON-LD |
| Breadcrumb schema | Existing `PageBreadcrumb` component |
| Auto blog discovery | Sitemap regenerated on every publish; Google re-crawls |
| Fast publishing | Push to Contentful → live in browser within 60s (CDN cache); scheduled posts auto-appear at their date |
| Low maintenance | One config file, one build script, zero edge functions, zero database tables |
| SEO crawlability | Pre-rendered static HTML per slug with full metadata; sitemap covers everything |

## What I removed from the previous plan

- ❌ Supabase edge function (`contentful-blog`) — direct CDN call is simpler and faster
- ❌ React Query hooks (`useBlogPosts`) — Contentful CDN caches; one `fetch` is enough
- ❌ `tsx` dev dependency — use plain Node
- ❌ Separate slugs endpoint — sitemap script reuses the list call

## Files

**Create**
- `src/lib/contentful.ts` (~40 lines)
- `src/lib/contentfulRenderers.tsx` (rich-text → JSX)
- `src/pages/BlogPostPage.tsx`
- `scripts/build-blog.ts` (sitemap + pre-render)

**Edit**
- `src/App.tsx` — add `/blog/:slug` route
- `src/pages/BlogPage.tsx` — replace static list with live fetch
- `package.json` — add `prebuild`, `postbuild`, `predev` scripts; add `@contentful/rich-text-react-renderer`, `@contentful/rich-text-types`
- `public/robots.txt` — add Sitemap directive if missing

## Open question

Confirm the Contentful content type ID is `blogPost` (camelCase) with field IDs `title`, `slug`, `excerpt`, `content` (RichText), `featuredImage` (Asset), `publishDate` (Date). Paste the actual model if any IDs differ — five-minute fix.

## Order of operations after approval

1. You connect Contentful via the picker
2. I add the four new files + edits
3. First build runs the sitemap + pre-render scripts
4. You publish to push everything live
