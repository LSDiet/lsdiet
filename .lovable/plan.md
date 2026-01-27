

## Add Early Access Bonus Announcement

This plan adds a visually distinct "Early Access Bonus" announcement card to the pre-order section, highlighting the 12-month free Guided Questions platform access.

---

### Placement Decision

The bonus announcement will appear **between the feature list and the Pre-Order button**. This creates a natural flow:

1. Book features (what's in the book)
2. Early access bonus (what you get extra)
3. Pre-order button (action)

---

### Visual Design

```text
┌─────────────────────────────────────────────────────────┐
│  🎁  EARLY ACCESS BONUS                                 │
│                                                         │
│  Pre-order the book and receive 12 months of free      │
│  access to the Guided Questions platform — a           │
│  structured, conversational tool that walks you        │
│  through the five stages of Awareness in the           │
│  Weight Permanence Triangle.                           │
│                                                         │
│  After the first year, access is $10/month.            │
└─────────────────────────────────────────────────────────┘
```

- Uses a subtle accent-tinted card background to stand out
- Gift icon to signal "bonus"
- "EARLY ACCESS BONUS" as a small uppercase header
- The $10/month note in a softer muted colour

---

### Technical Approach

- Add a new card component after the features `<ul>` (line 89)
- Use `Gift` icon from Lucide (already installed)
- Apply `bg-accent/10 border border-accent/20 rounded-xl p-4` for the card styling
- Keep the announcement concise and scannable
- Maintain the scroll animation context (already wrapped)

---

### File to Modify

| File | Changes |
|------|---------|
| `src/components/BookSection.tsx` | Add Early Access Bonus card between features list and button (after line 89) |

---

### New Component Structure

```tsx
{/* Early Access Bonus */}
<div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
  <div className="flex items-start gap-3">
    <Gift className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        Early Access Bonus
      </p>
      <p className="text-foreground text-sm leading-relaxed mb-2">
        Pre-order the book and receive 12 months of free access to the Guided Questions platform — a structured, conversational tool that walks you through the five stages of Awareness in the Weight Permanence Triangle.
      </p>
      <p className="text-muted-foreground text-xs">
        After the first year, access is $10/month.
      </p>
    </div>
  </div>
</div>
```

