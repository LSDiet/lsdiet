

## Plan: Redesign Triangle with rearranged vertices, enriched content, responsive layout

### All changes in `src/components/MethodSection.tsx`

**1. Rearrange vertices:**
- **Top** → Awareness (Eye icon)
- **Bottom-left** → Practice (Activity icon)
- **Bottom-right** → Permanence (Lock icon)
- Update edge labels to match new positions:
  - Left edge (Awareness→Practice): "Clarity creates priority."
  - Right edge (Awareness→Permanence): "Action survives disruption."
  - Bottom edge (Practice→Permanence): "Priority sustains action."

**2. Awareness (top vertex) — vertical stages list:**
- Keep "Creates clarity and motivation"
- List stages vertically: "Reality Awareness", "Friction Awareness", "Pattern Awareness", "Consequence Awareness", "Autonomy Awareness"
- Add a small animated bouncing `ChevronDown` arrow beside the list to show progression
- Add subtle "Click to explore →" link text

**3. Practice (bottom-left) — expand content:**
- "Builds the right daily choices"
- Add compact bullet lines:
  - "Adopt a low-starch, low-sugar lifestyle"
  - "Balance diet with cultural norms"
  - "Turn every obstacle into opportunity"

**4. Permanence (bottom-right) — expand content:**
- "Protects new habits when life gets hard"
- Add: "Creates a psychological anchor — an internal alert system that prompts course correction back to your LS lifestyle"

**5. Shrink triangle + fix alignment:**
- Reduce container height from 480px to ~400px
- Tighten SVG polygon vertices inward to reduce empty interior space
- Use percentage-based/responsive positioning instead of fixed `w-56`/`w-60` pixel widths
- Top vertex: centered with `text-center`
- Bottom-left: `text-left`, anchored to left
- Bottom-right: `text-right`, anchored to right

**6. Responsive design — critical focus:**
- **Desktop (md+):** Positioned layout with SVG triangle and absolute-positioned callout cards at vertices
- **Tablet / half-screen (sm to md):** Hide the SVG triangle entirely at `md` breakpoint. Use a clean stacked or 1-column layout that works at any width below `md`. No absolute positioning that breaks at narrow desktop widths.
- **Mobile:** Stacked vertical layout: Awareness → Practice → Permanence, each with full expanded content. Awareness stages listed vertically with arrow. Practice bullets shown. Permanence anchor text shown. No SVG triangle — just clean cards.
- All text uses responsive sizing (`text-xs`/`text-sm`) and flexible widths (`max-w-xs` instead of fixed `w-56`)

