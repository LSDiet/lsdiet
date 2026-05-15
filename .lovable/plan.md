## Diagnosis

The edge function itself is returning the correct article Open Graph tags for:

`https://joohccchfpcshlihctsm.supabase.co/functions/v1/share-blog/can-losing-weight-help-you-get-a-better-job`

It includes the article title and image.

The branded URL the user wants Facebook to see is currently not wired server-side:

`https://lsdiet.com/share/can-losing-weight-help-you-get-a-better-job`

That URL returns the normal single-page app `index.html`, so Facebook only sees the generic site title/image instead of the blog post title/image. Also, the Facebook button is still using the backend function URL, which is why the compose dialog shows the infrastructure domain.

## Plan

1. Add a `/share/:slug` frontend route
   - Create a tiny redirect page for humans who open `https://lsdiet.com/share/{slug}`.
   - It will immediately send users to `https://lsdiet.com/blog/{slug}`.
   - This keeps the route valid inside the React app.

2. Update share buttons to use the branded URL
   - Change `BlogPostPage` so Facebook/LinkedIn/X/WhatsApp/email share intents use:
     `https://lsdiet.com/share/{slug}`
   - Keep “Copy link” and native share using the canonical blog URL:
     `https://lsdiet.com/blog/{slug}`

3. Improve the edge function HTML response
   - Keep returning article-specific `og:title`, `og:description`, and `og:image`.
   - Change `og:url` to the branded share URL so Facebook caches the preview against `lsdiet.com/share/{slug}`.
   - Keep canonical and human redirect pointing to the real blog article.
   - Add explicit `Content-Type: text/html` metadata and image alt/type fields where available.

4. Deploy and verify the edge function
   - Deploy `share-blog`.
   - Test the backend share endpoint directly and confirm the response contains the correct article title/image.

## Important constraint

Lovable hosting is currently serving `/share/{slug}` as the static React app, not proxying it to the backend function. For Facebook to see server-rendered OG tags at the exact branded URL, the domain needs a host-level rewrite/proxy from:

`/share/*` → `/functions/v1/share-blog/*`

If Lovable’s hosting layer does not support that rewrite directly, the code changes above make the app consistent, but the final branded crawler preview still requires adding that rewrite at the domain/hosting edge.