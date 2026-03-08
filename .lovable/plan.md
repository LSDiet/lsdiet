

## Plan: Merge summary into triangle diagram, remove redundant cards

The core issue is valid — having a 3-column text summary AND 3 detailed cards below the triangle creates visual redundancy. Instead of adding more content, let's **consolidate**: embed the summary directly into the triangle diagram and enhance the existing cards.

### Approach

**Remove** the subtitle (lines 93-95) and the 3 detailed principle cards below the triangle (lines 100-117).

**Enhance the triangle diagram** to include the summary text directly beside each vertex label:

- Bottom-left vertex: **Awareness** — "Creates clarity and motivation" + linked five stages chips (Reality · Friction · Pattern · Consequence · Autonomy)
- Bottom-right vertex: **Practice** — "Builds the right daily choices"
- Top vertex: **Permanence** — "Protects new habits when life gets hard"

Each vertex label becomes a small card/callout anchored to its triangle corner, with the principle name bold, the subtext in muted color below, and for Awareness, the five stages shown as small linked text.

This way there's **one visual element** (the triangle with integrated labels) instead of two competing sections.

### Layout (desktop)

```text
         ┌─────────────────────┐
         │   PERMANENCE        │
         │   Protects new      │
         │   habits when life  │
         │   gets hard         │
         └─────────────────────┘
                  ▲
                 / \
                /   \
               /     \
              /       \
             ▼         ▼
┌──────────────────┐  ┌──────────────────┐
│  AWARENESS       │  │  PRACTICE        │
│  Creates clarity │  │  Builds the right│
│  and motivation  │  │  daily choices   │
│                  │  │                  │
│  Reality·Friction│  │                  │
│  Pattern·Conseq· │  │                  │
│  Autonomy (link) │  │                  │
└──────────────────┘  └──────────────────┘
```

### File changes

**`src/components/MethodSection.tsx`**:
1. Remove lines 93-95 (old subtitle)
2. Replace the SVG triangle diagram with a CSS-based layout: a centered triangle shape (using borders or SVG) with three positioned callout cards at each vertex
3. Remove lines 100-117 (the 3 detailed principle cards) — their content is now integrated into the triangle callouts
4. Each callout card: principle name (bold uppercase, primary color), one-line subtext (muted), and for Awareness, a row of five stage names as a `<Link>` to `/qa?open=awareness-stages`
5. The italic edge labels ("Clarity creates priority", "Priority sustains action", "Action survives disruption") remain on the triangle edges
6. Mobile: stack the three callouts vertically with a simplified/smaller triangle

