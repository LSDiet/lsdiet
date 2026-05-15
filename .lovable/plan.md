## Goal
Verify `https://lsdiet.com/` ownership in Google Search Console and register it as a property, so search performance data and sitemap submission become available.

## Steps

1. **Request verification token** (curl to GSC connector gateway, `META` method, identifier `https://lsdiet.com/`). Returns the exact `<meta name="google-site-verification" content="...">` string.

2. **Add the meta tag to `index.html`** inside `<head>` so it ships in the server-rendered HTML (Google won't see JS-injected tags).

3. **You republish the site.** Required — Google fetches `https://lsdiet.com/` and looks for the meta tag in the live HTML. Without a republish, verification will fail with `failedToFindMetaTag`.

4. **Call the verify endpoint** (curl). On 200 OK, ownership is recorded.

5. **Register the site as a Search Console property** via PUT to `/webmasters/v3/sites/https%3A%2F%2Flsdiet.com%2F`. After this it appears in your GSC dashboard.

6. **Submit the sitemap** by PUTting `https://lsdiet.com/sitemap.xml` to the sitemaps endpoint. (The sitemap is already a sitemap index pointing at the static pages and the dynamic blog sitemap.)

7. **Mark the `gsc:gsc` SEO finding as fixed.**

## What you'll need to do
- After step 2, click **Publish** so the meta tag goes live before I run verification.

## Notes
- Only the homepage meta tag is needed; it verifies the whole origin.
- The tag is harmless and can stay in place permanently — Google rechecks periodically.
- No code besides the single meta tag in `index.html` changes.
