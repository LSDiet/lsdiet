

## Fix: Require Email on Mobile/Tablet Devices

### The Problem
On mobile and tablet devices, users can download PDFs without entering their email. This is likely happening because:
1. The Dialog modal can be easily dismissed on mobile (swipe gestures, back button, tapping outside)
2. Dialog modals aren't optimized for mobile touch interactions

### The Solution
Replace the Dialog with a responsive component that uses a **Drawer** on mobile/tablet and **Dialog** on desktop. Drawers are much better for mobile - they slide up from the bottom and are harder to accidentally dismiss.

### Technical Changes

**1. Create a new responsive modal component** (`src/components/EmailCaptureResponsiveModal.tsx`)
- Uses the existing `useIsMobile` hook to detect device type
- Renders a **Drawer** (from `vaul` - already installed) on mobile/tablet
- Renders the existing **Dialog** on desktop
- Both variants contain the same email capture form
- Prevents closing without email by using `modal={true}` and controlling dismiss behavior

**2. Update the Drawer to prevent easy dismissal**
- Set `dismissible={false}` to prevent swipe-to-close
- Remove the X close button on mobile
- Only allow closing after successful email submission
- This ensures users must complete the email form to proceed

**3. Update FreeResources page**
- Import and use the new responsive modal component
- No other changes needed - the hook and logic remain the same

### Form Behavior
- Modal cannot be dismissed by clicking outside or swiping
- No X/close button visible until email is submitted
- Form validation still requires valid email + consent checkbox
- After successful submission, modal closes and download starts

### Files to Modify
1. `src/components/EmailCaptureModal.tsx` - Refactor to be responsive with undismissable behavior
2. No changes needed to `FreeResources.tsx` or `useLeadCapture.ts`

