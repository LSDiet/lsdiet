## What I found

LinkedIn is receiving the share endpoint HTML, but the live GET response is being served as `content-type: text/plain` on the Supabase function domain. LinkedIn then shows “Cannot display preview,” and users may see raw HTML instead of a normal article click-through. The direct browser path already returns a 302 to the canonical article, but the crawler-preview path is not reliable for LinkedIn.

Also, `share.lsdiet.com` is not resolving yet, so the app is still sharing the long Supabase function URL.

## Plan

1. **Make crawler HTML unambiguous for LinkedIn**
   - Update the share endpoint response headers to force `text/html; charset=utf-8` in the way the edge runtime/gateway preserves for normal GET requests.
   - Keep crawlers on `HTTP 200 + OG HTML`.
   - Keep humans on `HTTP 302` to `https://lsdiet.com/blog/{slug}`.
   - Add/adjust bot detection for LinkedIn variants if needed.

2. **Stop LinkedIn from using the raw Supabase URL once the custom domain is live**
   - Update frontend blog share URLs to use `https://share.lsdiet.com/functions/v1/share-blog/{slug}` instead of the Supabase function domain.
   - Keep Copy Link/native share using the clean canonical `lsdiet.com/blog/{slug}` URL.

3. **Verify the important behaviours**
   - Browser GET to the share endpoint returns `302 Location: https://lsdiet.com/blog/...`.
   - LinkedInBot GET returns `200`, `Content-Type: text/html`, and the expected OG tags.
   - LinkedIn share intent receives the branded share URL.

## Important note

Because `share.lsdiet.com` currently does not resolve, the code can be updated now, but LinkedIn previews will only fully work through the branded domain after DNS is added/propagated.