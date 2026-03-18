

# Implementation Plan: Hero Redesign + Waitlist Modal + Google Sheets

## Overview
Redesign the hero section to focus on the free 7-day course CTA, build a waitlist signup modal, and connect it to your Google Sheet via an edge function.

## Step 1: Store the Google Apps Script URL as a secret
Store `GOOGLE_SHEET_WEBHOOK_URL` with value `https://script.google.com/macros/s/AKfycby8n6akeSfOh4eDVMdTXBZP1192ebn7dYM125Yg9WSs0QqbP7X3C4AnMM52x8GdA2V1xQ/exec`

## Step 2: Create edge function `submit-waitlist`
**New file:** `supabase/functions/submit-waitlist/index.ts`
- Accepts `{ fullName, email, goal }` via POST
- Forwards to the Google Apps Script URL (from secret)
- Returns success/error
- Includes CORS headers
- Add to `supabase/config.toml` with `verify_jwt = false`

## Step 3: Redesign `src/components/HeroSection.tsx`
- Remove the `ComparisonTable` component entirely
- Remove the "See My Journey" button
- Keep headline: "I Lost 80+ Lbs. **Three Times.**"
- Subtitle: "Now I help obese people end" followed by "weight cycling" in light gray with a red hand-drawn strikethrough SVG overlay (using a relative-positioned span with an absolute SVG line)
- Add course pitch text: "Join my **FREE** 7-day Weight Permanence course. You'll discover:"
- 5 check-mark bullet points (compact text)
- Single centered "Join the Waitlist" button that opens the modal

## Step 4: Create `src/components/WaitlistModal.tsx`
- Responsive: Drawer on mobile, Dialog on desktop (same pattern as `EmailCaptureModal`)
- **Form state:** Full Name (input), Email (input), "#1 thing you want from this course" (textarea)
- **Thank-you state** (shown after successful submit):
  - "Thank you! We'll let you know when the course is ready. Oscar and team are aiming for mid-April."
  - "Follow Oscar to witness his transformation in real time — he's documenting the entire journey publicly."
  - Three social links with icons: YouTube (`@WhatAboutWeight`), Instagram (`@whataboutweight`), TikTok (`@whataboutweight`)
- Closeable only after submission (same dismissal pattern as EmailCaptureModal, but thank-you screen has a close button)

## Files changed

| File | Action |
|------|--------|
| `supabase/config.toml` | Add `[functions.submit-waitlist]` section |
| `supabase/functions/submit-waitlist/index.ts` | New — edge function forwarding to Google Sheet |
| `src/components/HeroSection.tsx` | Rewrite — remove comparison table, add course pitch + strikethrough visual |
| `src/components/WaitlistModal.tsx` | New — form + thank-you modal |

