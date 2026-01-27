

## Professional Triangle Diagram Implementation

This plan adds a polished, professional SVG triangle diagram to the Method section, keeping your exact wording from the image.

---

### Recommended Placement: Before the Three Principles

The triangle diagram should go **after the section header** but **before** the three Awareness/Practice/Permanence cards. Here's why:

1. **Visual hierarchy** - The diagram provides an overview of how the three principles connect before diving into details
2. **Storytelling flow** - Reader sees the framework first, then gets the detailed explanation of each corner
3. **Professional look** - Creates a clear "concept → details" progression that feels polished

---

### Design Approach

Create a custom SVG triangle diagram that:

- Uses your brand colours (dark green primary for Permanence, accent colours for Awareness and Practice)
- Displays the numbered labels: "1. Awareness", "2. Practice", "3. Permanence"
- Shows the connection phrases along each edge:
  - Left edge: "Action survives disruption."
  - Right edge: "Priority sustains action."
  - Bottom edge: "Clarity creates priority."
- Responsive design that scales well on mobile and desktop
- Clean, modern styling with rounded corners on the labels

---

### Visual Preview

```text
                    ┌─────────────────┐
                    │  3. Permanence  │
                    └────────┬────────┘
                            /\
         Action survives   /  \   Priority sustains
           disruption.    /    \       action.
                         /      \
                        /        \
     ┌──────────────┐  /          \  ┌──────────────┐
     │ 1. Awareness │──────────────│ 2. Practice  │
     └──────────────┘              └──────────────┘
                   Clarity creates priority.
```

---

### Technical Implementation

**File: `src/components/MethodSection.tsx`**

1. Create an inline SVG component `TriangleDiagram` within the file
2. Use SVG elements: `<polygon>` for triangle lines, `<rect>` + `<text>` for labels
3. Position italic text along each edge using SVG `<text>` elements
4. Apply Tailwind classes for responsive sizing and colours
5. Centre the diagram with appropriate spacing

**Key styling details:**
- Permanence label: Green background (matching your primary colour)
- Awareness label: Blue-teal background
- Practice label: Orange/amber accent background  
- Triangle lines: Dark stroke matching the brand
- Edge text: Italic, muted colour for the descriptive phrases
- Overall container: Max width constraint, centred, with `mb-12` spacing before the three cards

---

### Section Structure After Implementation

```text
[Section Header: "The Weight Permanence Triangle™"]
           ↓
[NEW: Professional Triangle Diagram]
           ↓
[Existing: Three Principle Cards - Awareness, Practice, Permanence]
           ↓
[Existing: Core Principle Card - "Low Starch. Low Sugar."]
```

---

### Mobile Considerations

- The SVG will scale proportionally on smaller screens
- Text sizes will remain readable with appropriate `viewBox` settings
- Minimum width ensures labels don't become too small

