

# Fix Hero Section Spacing

## Problem Identified

The white space you see between the Hero section and the Journey section is caused by:

1. **`min-h-[85vh]`** - The Hero section has a minimum height of 85% of the viewport
2. **`flex items-center justify-center`** - Content is centered vertically within that tall container
3. This creates empty space at the bottom of the Hero section, between the chevron and the Journey section

The `pb-0` change is applied, but it doesn't help because the issue is the **height** of the section, not the padding.

## Solution

Change the Hero section from a fixed minimum height with centered content to a layout that:
- Aligns content to the **top** instead of center
- Uses a smaller or no minimum height
- Keeps appropriate top padding for the navbar

## Changes

### 1. Update HeroSection.tsx

```text
FROM:
  min-h-[85vh] flex items-center justify-center pt-16 pb-0

TO:
  flex flex-col justify-start pt-24 md:pt-32 pb-8
```

This will:
- Remove the 85vh minimum height constraint
- Align content to the top with generous top padding (for navbar clearance)
- Add a small bottom padding for breathing room before the next section

---

## Technical Details

| Property | Current | Proposed |
|----------|---------|----------|
| Height | `min-h-[85vh]` | No minimum (content-driven) |
| Vertical alignment | `items-center justify-center` | `justify-start` (top-aligned) |
| Top padding | `pt-16` | `pt-24 md:pt-32` (more space for navbar) |
| Bottom padding | `pb-0` | `pb-8` (small breathing room) |

