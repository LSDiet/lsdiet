
## What’s happening (in plain language)

Uploading a PDF to **Lovable Cloud storage** does **not automatically add it to the “Free Resources” page**.

Right now, the “Free Resources” page only shows items that are listed in code inside `src/pages/FreeResources.tsx`. We intentionally removed the 3 placeholder items, so the list is empty—meaning the page has nothing to display even though the PDF exists in storage.

## What I found in your project

- The route is correct: **“Free Resources” links to `/free`** (from `src/components/Navbar.tsx`).
- The page renders cards from a hardcoded array:
  - `src/pages/FreeResources.tsx` currently has: `const resources: Resource[] = [];`
- Your uploaded PDF is present in Lovable Cloud storage in the **private** bucket `free-resources` with this exact file path:
  - `eBook-Does GLP-1 work for weight loss_ (3).pdf`

## Goal

Make your uploaded PDF appear on `/free` as a downloadable resource (still protected behind the email-capture flow).

## Implementation approach

### A) Add your uploaded PDF to the resources list (fastest, minimal change)
1. Update `src/pages/FreeResources.tsx`:
   - Add a single entry to the `resources` array using:
     - `filePath: "eBook-Does GLP-1 work for weight loss_ (3).pdf"`
     - `id`: a stable slug (example: `ebook-glp1-weight-loss`)
     - `title`: derived from the filename (per your earlier preference), but displayed without “.pdf”
     - `description`: a short default description (can be edited later)

2. (Optional but recommended) Add an “empty state” UI:
   - If `resources.length === 0`, show a friendly message like:
     - “No free resources are published yet.”
   - This prevents confusion in the future if the list is empty again.

### B) (Optional later) Auto-list PDFs from storage (prevents this confusion long-term)
If you want “upload = automatically appears,” we can build a small backend function to list PDFs in the `free-resources` bucket and render them dynamically.
- Pros: No more manual code edits when you upload new PDFs.
- Cons: Anything in the bucket becomes visible by name on the page (still not downloadable without the signed link, but discoverable).

For now, we’ll proceed with option A unless you tell me you want auto-listing.

## Acceptance tests (what you’ll verify in Preview after implementation)

1. Go to `/free` and confirm you see **one** resource card.
2. Click “Download PDF”:
   - If you have no saved email, the email/consent modal should appear.
   - After submitting a valid email + checking consent, the download should start in a new tab.
3. Refresh and click download again:
   - If your email is stored, it should download without the modal.
4. Confirm the downloaded file opens and is the correct PDF.

## Technical notes (for correctness)

- The download flow uses `useLeadCapture()` which calls a backend function (`get-download-url`) to generate a 5-minute signed link from the private `free-resources` bucket.
- The `filePath` must match storage **exactly**, including spaces and `(3)`.

## If you want the filename cleaned up (optional)
Right now the stored filename includes `_(3)` which usually happens when uploading duplicates.
If you’d prefer a cleaner URL/path (recommended), we can:
- Re-upload the file with a clean name like `ebook-glp1-weight-loss.pdf`
- Update the `filePath` in the resource list
- (Optionally) delete the old storage file afterwards
