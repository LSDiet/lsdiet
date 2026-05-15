## Diagnosis

Facebook's debugger returned HTTP 403 on `https://lsdiet.com/share/...` — the static file under `public/share/` is being blocked by hosting/Cloudflare before Facebook can read the OG tags. The Supabase backend function `share-blog` already returns 200 + `text/html` + correct OG tags when called directly. The fix is to point share intents at the backend function URL.

Image check (already verified): the Contentful `og:image` returns HTTP 200, `image/png`, HTTPS, no auth, single hop, 1672 × 941 — passes Facebook/LinkedIn requirements.

## Plan

1. **Point share buttons at the backend function URL**
   - Change `crawlerShareUrl` in `BlogPostPage.tsx` to `https://joohccchfpcshlihctsm.supabase.co/functions/v1/share-blog/{slug}`.
   - Facebook/LinkedIn/X/WhatsApp/email use this crawler-safe URL; humans still land on canonical `lsdiet.com/blog/{slug}` after the function redirects them.

2. **Harden the backend function for crawlers**
   - Detect `facebookexternalhit`, `LinkedInBot`, `Twitterbot`, `WhatsApp`, `Slackbot`, `TelegramBot`, `Discordbot`, `Pinterest`, `bingbot`, `Googlebot`.
   - Crawlers: pure HTML with OG tags, HTTP 200, `text/html; charset=utf-8`, no `meta refresh`, no `<script>` redirect.
   - Humans: keep the redirect to `/blog/{slug}`.

3. **Validate `og:image` per post inside the function**
   - When Contentful returns no featured image, fall back to the site default (`https://lsdiet.com/og-image.jpg`, 1200 × 630).
   - Guard against non-HTTPS URLs (skip if not `https:`).
   - Log a warning if the resolved image is missing dimensions, so future posts surface issues.

4. **Remove the dead static fallback**
   - Delete `public/share/can-losing-weight-help-you-get-a-better-job`.
   - Keep `/share/:slug` React route as a humans-only safety net.

5. **Three-step verification before pinging the user**
   - **(a)** `curl -A 'facebookexternalhit/1.1' <function-url>` → assert HTTP 200, `text/html`, OG tags present, no redirect tags.
   - **(b)** `curl -I <og:image-url-from-response>` → assert HTTP 200, `image/*`, HTTPS, no redirect chain.
   - **(c)** Tell user to paste URL into Meta Sharing Debugger and click **Scrape Again**; only call this complete after they confirm the preview shows the article title + image.