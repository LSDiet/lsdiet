

## YouTube Shorts: Two-Column Redesign

### Content
**Education** (IDs): `xuN6enMPXMo`, `P9K2VctpccA`, `tN6H5UpAM9o`
**LS Lifestyle** (IDs): `EIXfSTyNcpA`, `wbEQiQkdDHs`, `Fxg65gd33W0`

Titles will be fetched at runtime via YouTube oEmbed API (`https://www.youtube.com/oembed?url=...&format=json`) using a React state + useEffect pattern. Fallback to the video ID if fetch fails.

### Changes to `YouTubeShortsSection.tsx`

- **Remove** Embla carousel — replace with a static two-column grid
- **Two category arrays** with just IDs (titles fetched dynamically)
- **Layout**: `grid grid-cols-1 md:grid-cols-2 gap-8`
- Each column:
  - Category badge at top (icon + label) — `BookOpen` for Education, `Utensils` for LS Lifestyle
  - 3 cards stacked vertically (`flex flex-col gap-4`)
- **Each card**: 9:16 thumbnail with title overlaid at bottom on a dark gradient scrim, play button centered, hover scale effect
- **Video modal** stays the same (Dialog with iframe)
- Section header and Subscribe CTA remain unchanged

