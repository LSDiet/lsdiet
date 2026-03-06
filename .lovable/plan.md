

## Phase 1: Colors, Typography & Button Styles

### What changes

**1. `index.html`** — Add Inter font from Google Fonts
- Add `<link>` for Inter (weights 400, 500, 600, 700, 800)

**2. `tailwind.config.ts`** — Typography + extended config
- Add `fontFamily: { sans: ['Inter', ...], serif: ['Georgia', ...] }`
- Keep existing animations/keyframes intact

**3. `src/index.css`** — New high-contrast color system
- **Light (default):** background near-white `0 0% 98%`, foreground near-black `0 0% 4%`
- **Primary:** rich dark green `152 40% 22%` (keeps brand identity but darker/bolder)
- **Accent:** bold amber `38 90% 50%` (punchier than current `38 55% 55%`)
- **Cards/borders:** subtle warm grays
- **Dark theme:** untouched (not used on the site)
- Add `.section-dark` utility class: near-black bg, white text, adjusted card/border colors for dark sections
- Update pulse-glow keyframe to use new amber value

**4. `src/components/ui/button.tsx`** — New `accent` variant
- Solid amber background, near-black text, uppercase, letter-spaced, slight hover lift
- Existing variants remain unchanged

### What stays the same
- All component logic, routing, cart, lead capture untouched
- All existing animations preserved
- Dark mode CSS vars kept as-is (unused but harmless)

