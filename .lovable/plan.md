

## Journey Labels + Core Principle Revamp

This plan updates the journey card labels and restructures the core principle section with your scientifically accurate content in a scannable format.

---

### Part 1: Journey Card Label Updates

| Current | New |
|---------|-----|
| The Gain | Stress |
| Attempt #1 | Sustainability |
| Attempt #2 | Disruption |

**File:** `src/components/JourneySection.tsx` (lines 20, 30, 40)

---

### Part 2: Core Principle Section Revamp

**Visual Decision:** I'll emphasise "biological, social, and environmental" as three distinct inline badges/pills rather than the full sentence. This creates a stronger visual anchor and makes the takeaway instantly scannable. The full sentence becomes the lead-in.

**Challenges:** Removing travel, keeping 3 items:
- Restaurants
- Family meals  
- A food system favouring shelf-stable carbohydrates

---

### Proposed Layout

```text
┌─────────────────────────────────────────────────────────┐
│              [The Core Principle badge]                  │
│                                                         │
│              Low Starch. Low Sugar.                     │
│              (Simple, but not easy.)                    │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  THE BIOLOGY                                        ││
│  │                                                     ││
│  │  When starch and sugar keep insulin elevated:       ││
│  │  • Your body favours fat storage                    ││
│  │  • Fat access is blocked                            ││
│  │  • Hunger stays high                                ││
│  │                                                     ││
│  │  Hunger is biological, not a lack of discipline.   ││
│  │  When this biology is amplified by a multibillion- ││
│  │  dollar industry designed for repeat consumption,  ││
│  │  willpower alone was never going to win.           ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  THE CHALLENGE                                      ││
│  │                                                     ││
│  │  Low starch and low sugar looks like a food swap   ││
│  │  on the surface. In reality, it reshapes:          ││
│  │                                                     ││
│  │  🍽️  How you eat in restaurants                    ││
│  │  👨‍👩‍👧  How you navigate family meals                 ││
│  │  🏪  How you work within a food system where       ││
│  │      shelf-stable carbohydrates are cheaper and    ││
│  │      easier than fresh protein and vegetables      ││
│  │                                                     ││
│  │  ───────────────────────────────────────────────── ││
│  │                                                     ││
│  │  This is not just a diet change. It is a          ││
│  │                                                     ││
│  │  [Biological] [Social] [Environmental]             ││
│  │                                                     ││
│  │  challenge.                                        ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

The three words appear as coloured badge pills (similar to the existing accent badges) creating immediate visual impact.

---

### Technical Approach

- Two side-by-side cards on desktop, stacked on mobile
- Lucide icons: `Utensils` (restaurants), `Users` (family), `Store` (food system)
- Three inline badges for "Biological", "Social", "Environmental" using the existing badge styling
- Canadian English: "favours" throughout
- Scroll animation with `useScrollAnimation` hook

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/JourneySection.tsx` | Update 3 label values (lines 20, 30, 40) |
| `src/components/MethodSection.tsx` | Replace core principle content (lines 178-198) with new two-card layout |

