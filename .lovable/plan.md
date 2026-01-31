

# Free Resources Download System

## Overview
Email-gated PDF download system with CASL compliance. PDFs are protected behind signed URLs - users must provide email and consent before downloading.

## User Flow

```text
Click "Download" → Check localStorage → Email found? 
                                              │
                   ┌──────────────────────────┴──────────────────────────┐
                   │                                                      │
                  YES                                                    NO
                   │                                                      │
                   │                                    ┌─────────────────────────────┐
                   │                                    │ Modal: Email + Consent      │
                   │                                    │ ☐ Required checkbox         │
                   │                                    │   (unchecked by default)    │
                   │                                    │ [Download] disabled until   │
                   │                                    │   both fields complete      │
                   │                                    └─────────────────────────────┘
                   │                                                      │
                   │                                             UPSERT to Supabase
                   │                                                      │
                   └──────────────────────────┬──────────────────────────┘
                                              │
                                    Edge Function generates
                                    signed URL (5 min expiry)
                                              │
                                        PDF downloads
```

## Consent Details

| Aspect | Value |
|--------|-------|
| Default state | Unchecked (CASL-compliant express consent) |
| Required | Yes - download button disabled until checked |
| Text | "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time." |

## Implementation Steps

### 1. Database Migration

Create leads table with CASL compliance fields:

- id (UUID, primary key)
- email (TEXT, UNIQUE, NOT NULL)
- source (TEXT, NOT NULL) - which PDF triggered signup
- created_at (TIMESTAMPTZ)
- download_count (INTEGER)
- last_download_at (TIMESTAMPTZ)
- consent_given (BOOLEAN, NOT NULL)
- consent_timestamp (TIMESTAMPTZ, NOT NULL)
- consent_text (TEXT, NOT NULL)

RLS policies allow anonymous insert/update for lead capture.

### 2. Private Storage Bucket

Create private `free-resources` bucket. Only service role can read - ensures PDFs cannot be accessed without going through the edge function.

### 3. Edge Function: get-download-url

Generates time-limited signed URLs (5 minute expiry). Called after successful lead capture to provide download link.

### 4. Free Resources Page

Grid of resource cards showing title, description, and download button. Triggers email modal for new users.

### 5. Email Capture Modal

- Email input field (required)
- Consent checkbox (required, unchecked by default)
- Download button disabled until both complete

### 6. Lead Capture Hook

Handles localStorage check, Supabase upsert, edge function call, and download trigger.

### 7. Navigation Updates

Add "Free Resources" link to Navbar and /free route to App.tsx.

## Files to Create/Modify

| File | Action |
|------|--------|
| Supabase migration | Create leads table + private bucket |
| supabase/functions/get-download-url/index.ts | Create edge function |
| supabase/config.toml | Add function config |
| src/pages/FreeResources.tsx | Create page |
| src/components/EmailCaptureModal.tsx | Create modal |
| src/hooks/useLeadCapture.ts | Create hook |
| src/components/Navbar.tsx | Add nav link |
| src/App.tsx | Add route |

## After Implementation

1. Upload PDFs to Supabase Dashboard > Storage > free-resources bucket
2. Update FreeResources.tsx with actual file paths
3. Access leads: Supabase Dashboard > Table Editor > leads
4. Export as CSV for manual Zoho import

## Security Summary

| Concern | Solution |
|---------|----------|
| Direct URL sharing | Private bucket - URLs don't work without signed token |
| Signed URL sharing | 5-minute expiry - links become invalid quickly |
| Bypassing email gate | Download requires successful DB save first |
| Compliance | Express consent (unchecked checkbox) + full audit trail |

