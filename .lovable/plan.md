## Add GA4 Event Tracking

Wire `trackEvent()` from `src/lib/analytics.ts` into the components that currently lack instrumentation.

### Changes

1. **`LSDietCTA.tsx`** — fire `cta_click` on the main CTA button with `{ location: 'lsdiet_cta', label, destination }`.

2. **`JoinFloatingBar.tsx`** — fire `cta_click` on the floating join button with `{ location: 'floating_bar' }`.

3. **`BookSection.tsx`** — fire `cta_click` on any primary CTA(s) with `{ location: 'book_section' }`.

4. **`CartDrawer.tsx` / `useDirectCheckout`** — fire `begin_checkout` when the cart opens/checkout starts, with `{ items, value, currency }` pulled from current cart state. (`purchase` happens post-Stripe redirect, so it's deferred unless a thank-you route exists — will note in code.)

5. **`ShareButtons.tsx`** — fire `share` on each share-channel click with `{ method, content_type: 'article', item_id: url }`.

6. **`EmailCaptureModal.tsx`** — fire `email_capture` on successful submit with `{ source }`.

### Out of scope
- Scroll/engagement tracking (separate enhancement).
- `purchase` server-side confirmation (requires Stripe webhook or thank-you page wiring).

### Verification
- After edits, grep for new `trackEvent` calls and confirm no TS errors. User can verify in GA4 DebugView.
