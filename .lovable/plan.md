

# Revise "The Missing Piece" Section Narrative

## Overview

Update the MissingPieceSection component to replace the current personal story with a multi-part narrative that clearly articulates what was "missing" — the biological understanding of how fat functions — and creates a logical flow to the 40% obesity statistic and the hunger/equation diagram.

## Estimated Credits: 1 message

## File Changes

### Edit: `src/components/MissingPieceSection.tsx`

**Replace the Personal Story card (lines ~89-96) with:**

1. **Opening Card** - The problem statement:
   > Veggie cleanses, carnivore, intermittent fasting, daily exercise — I followed the "eat less, exercise more" rule for years. They all worked until they stopped working.

2. **Lightbulb Moment** - Accent-styled insight block:
   > In 2025, while interviewing a surgeon about ESD — a minimally invasive procedure that reduces stomach capacity by 70–80% — a thought struck me: *"I rebound not because I lack willpower, but because I had zero understanding of how fat actually functions in my body."*

3. **The Discovery** - Brief conclusion:
   > I spent eight months learning how fat is formed, stored, and burned — testing variables until I found the pattern. When I ate the right foods at the right times, paired with the right calorie expenditure, I stayed full every day and watched my weight drop consistently every month.

4. **Transitional Bridge Line** (new element before the 40% statistic):
   > And I'm not alone in this.

**Visual Treatment:**
- Opening paragraph: Standard `bg-card/50` styling (existing)
- Lightbulb insight: Accent border-left with italicised quote styling
- Discovery: Same card, second paragraph
- Bridge line: Centered, muted text, leads into statistic

**Canadian English Applied:**
- "realisation" spelling
- "minimally invasive" (standard medical term)
- "behaviour" where applicable

## Narrative Flow After Revision

```text
┌─────────────────────────────────────────┐
│        Badge: "The Missing Piece"        │
├─────────────────────────────────────────┤
│  Opening: Tried everything, all worked   │
│           until they stopped working     │
├─────────────────────────────────────────┤
│  Lightbulb: ESD interview → realisation  │
│  "I had zero understanding of how fat    │
│   actually functions in my body"         │
├─────────────────────────────────────────┤
│  Discovery: 8 months testing → pattern   │
│  "Eat right, stay full, lose weight"     │
├─────────────────────────────────────────┤
│      Bridge: "And I'm not alone."        │
├─────────────────────────────────────────┤
│          40% Obesity Statistic           │
│  "This is more than a willpower problem" │
├─────────────────────────────────────────┤
│        Separator + Equation Intro        │
├─────────────────────────────────────────┤
│         Equation Flow Diagram            │
├─────────────────────────────────────────┤
│            Insight Card                  │
├─────────────────────────────────────────┤
│        Transition to Method              │
└─────────────────────────────────────────┘
```

## Logical Connections Created

| Element | Connects To | How |
|---------|-------------|-----|
| Personal story | Lightbulb moment | "They all worked until they stopped" → "Why?" |
| Lightbulb moment | Discovery | Zero understanding → 8 months learning |
| Discovery | Bridge line | Personal pattern found → "I'm not alone" |
| Bridge line | 40% statistic | Personal → Systemic (40% of adults) |
| 40% statistic | Equation diagram | Biology plays a role → Here's how |
| Equation diagram | Insight card | Mechanism → Philosophy |

