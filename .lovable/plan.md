# Why blog posts feel slow

There are **three sources** powering `/blog/:slug`:

1. **Foundations** — code-bundled (`src/content/foundations/*`). 9 posts. Zero network.
2. **Articles** — code-bundled (`src/content/articles/*`). ~40 posts. Zero network.
3. **Contentful** — fetched live through the `blog-posts` edge function → Lovable connector gateway → Contentful API.

### What `BlogPostPage` does today

Looking at `src/pages/BlogPostPage.tsx` (lines 129–169):

```text
slug → check Foundations (instant)
     → if miss, ALWAYS call fetchBlogPost() to Contentful
     → if Contentful returns null, fall back to Articles
```

The problem: **articles (which are local) only get checked AFTER a full Contentful round-trip fails.** So every article load eats a ~500–1500 ms edge-function call before rendering — even though the content is already in the JS bundle.

Other contributors:
- No client cache. Re-visiting the same post re-fetches every time.
- The edge function `cf()` has no caching headers on the outbound Contentful call (cache is only `max-age=30` on the response).
- No prefetch on hover from `/blog` index — clicking a Contentful card cold-starts the function.
- Each Contentful call uses `include=2` and resolves related posts inline; that's the right shape but adds payload weight.

# The fix (in priority order)

## 1. Reorder source lookup — check local first (biggest win, zero risk)

In `BlogPostPage.tsx`, check `getArticleBySlug(slug)` **before** calling `fetchBlogPost`. Foundations + Articles cover ~50 posts that should render instantly with no network at all.

```text
slug → Foundation? render
     → Article?    render          ← new
     → else        fetch Contentful
```

This alone makes every code-bundled post feel instant.

## 2. Client-side cache for Contentful posts (React Query)

Wrap `fetchBlogPost` / `listBlogPosts` / `fetchPostsByCategory` in `@tanstack/react-query` (already in the project per the memory: "React Query, Zustand"). Defaults:
- `staleTime: 5 minutes` — revisits within 5 min are instant from cache.
- `gcTime: 30 minutes`.

Effect: navigating Blog → post → back → another post stops re-hitting the network.

## 3. Prefetch on hover / viewport from `/blog` index

On the blog listing cards, add `onMouseEnter` / `IntersectionObserver` that calls `queryClient.prefetchQuery(['blog-post', slug])`. By the time the user clicks, the post is already in cache.

## 4. Edge-function response caching (low-risk tune)

Bump `blog-posts` cache headers from `max-age=30` to something like `max-age=300, s-maxage=600, stale-while-revalidate=86400`. Contentful content doesn't change minute-to-minute, and a webhook (`contentful-rebuild-hook`) already exists for invalidation on real publishes.

## 5. Optional — slim the `get` payload

The `get` action currently uses `include=2` which pulls full related-post entries + assets. We could drop to `include=1` and resolve `relatedPosts` lazily, but this is only worth doing if 1–4 don't move the needle enough.

# What changes, file by file

- `src/pages/BlogPostPage.tsx` — reorder lookup (Foundation → Article → Contentful); wrap Contentful fetch in `useQuery`.
- `src/lib/blog.ts` — no shape change; just consumed via React Query keys `['blog-post', slug]`, `['blog-list']`, `['blog-by-category', slug]`.
- `src/pages/BlogPage.tsx` + blog card component — add `onMouseEnter` prefetch using `queryClient.prefetchQuery`.
- `supabase/functions/blog-posts/index.ts` — update `Cache-Control` header on `list`, `get`, `byCategory`, `categories`.

# What I will NOT do unless you ask

- No migration of Contentful posts into the repo. Keeping editorial in Contentful is the whole point of that system.
- No service worker / offline cache — overkill for this.
- No SSR/SSG switch — that's a much bigger architectural change.

# Expected outcome

- Articles + Foundations: **instant** (no network).
- First visit to a Contentful post: same as today (~500–1500 ms), but…
- Hovered/in-view Contentful posts from `/blog`: **instant** (prefetched).
- Revisits within 5 min: **instant** (cached).
- Repeat traffic globally: faster (edge cache).
