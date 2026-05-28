# Install Google Analytics 4

Measurement ID: `G-HSZPPVH5H8`

## Goals

1. Load GA4 sitewide on production only (real domains, not localhost / `*.lovable.app` / prerender bot)
2. Track every React Router navigation as a `page_view`
3. Track key conversions: waitlist signups, lead captures, resource downloads, outbound social clicks, hero CTA clicks
4. Stay PIPEDA-friendly and ready for future cookie consent (Consent Mode v2 defaults)
5. Verify in GA4 Realtime

## Implementation

### 1. `index.html` — inject gtag snippet

Add the official Google snippet in `<head>`, but wrap initialization so it no-ops on non-production hosts and during prerender. Set Consent Mode v2 defaults *before* `config` so any future banner can update them.

```html
<script>
  (function () {
    var host = location.hostname;
    var isProd = /(^|\.)(lsdiet\.com|lsdiet\.ca|oscarpoon\.com|oscarpoon\.ca|whataboutweight\.com|whataboutweight\.ca|betterandyetdaily\.com)$/i.test(host);
    var isBot = navigator.webdriver === true; // prerender headless
    if (!isProd || isBot) return;
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', 'G-HSZPPVH5H8', { send_page_view: false });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HSZPPVH5H8';
    document.head.appendChild(s);
  })();
</script>
```

Note: `send_page_view: false` — we'll fire pageviews from the SPA hook so the initial load and route changes are handled by one code path with the correct canonical URL.

### 2. `src/lib/analytics.ts` — typed wrapper

Small module exposing:

- `trackPageView(path, title)`
- `trackEvent(name, params?)`
- `isAnalyticsEnabled()` — checks `typeof window.gtag === 'function'`

All calls become no-ops when gtag isn't loaded (dev, preview, prerender). Keeps component code clean and SSR-safe.

### 3. `src/hooks/useAnalyticsPageviews.ts` — SPA route tracking

Hook that reads `useLocation()` and fires `page_view` on every pathname change (including the first render). Mounted once inside `AppContent` in `src/App.tsx`.

```text
location change
  → trackPageView(pathname + search, document.title)
  → gtag('event', 'page_view', { page_path, page_title, page_location })
```

### 4. Key event instrumentation

Add `trackEvent` calls in these existing files (no behaviour change, just an extra line per handler):

- `src/components/WaitlistModal.tsx` → `waitlist_submit` on successful submit
- `src/components/EmailCaptureModal.tsx` → `lead_capture_submit` with `{ resource: 'ls-diet-guide' | 'glp1-guide' }`
- `src/hooks/useLeadCapture.ts` → `resource_download` on download URL fetch
- `src/components/Footer.tsx` / `src/components/YouTubeShortsSection.tsx` → `outbound_click` with `{ network: 'youtube' | 'instagram' | 'tiktok' }`
- `src/components/HeroSection.tsx` + `HeroPitchSection.tsx` → `cta_click` with `{ location: 'hero' | 'pitch' }`

### 5. Verification

After deploy:
1. Open lsdiet.com in a normal browser, check Network for `googletagmanager.com/gtag/js?id=G-HSZPPVH5H8`
2. GA4 → Reports → Realtime — should show 1 active user
3. Click into a blog post — Realtime should show the new `page_path`
4. Submit the waitlist on a test account — `waitlist_submit` should appear in Realtime events

## Files

**New**
- `src/lib/analytics.ts`
- `src/hooks/useAnalyticsPageviews.ts`

**Edited**
- `index.html` — gtag snippet with prod/bot gating
- `src/App.tsx` — mount `useAnalyticsPageviews()` inside `AppContent`
- `src/vite-env.d.ts` — declare `window.gtag` / `dataLayer` types
- `src/components/WaitlistModal.tsx`
- `src/components/EmailCaptureModal.tsx`
- `src/hooks/useLeadCapture.ts`
- `src/components/Footer.tsx`
- `src/components/YouTubeShortsSection.tsx`
- `src/components/HeroSection.tsx`
- `src/components/HeroPitchSection.tsx`

## Notes / trade-offs

- **No cookie banner today.** GA4 will set `_ga` cookies on first visit. For Canadian audiences this is generally acceptable under PIPEDA. If you later target EU traffic, we add a banner and flip `analytics_storage` to `denied` by default.
- **No GTM.** Direct gtag.js is simpler and lighter for a site this size. We can migrate to GTM later if you want non-developers managing tags.
- **Prerender safety.** The bot check prevents your own SSG prerender pass from logging hundreds of fake pageviews on every deploy.
- **Hostname allowlist** covers all your custom domains from the project URLs list. New domains need to be added to the regex.
