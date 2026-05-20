// Decides how many <LSDietCTA /> blocks to render in a blog body and where
// to insert their portal slots. Works against any rendered article wrapper
// (foundation Body, Contentful RichText, code-managed Article Body) by
// scanning top-level paragraphs after first paint.
//
// Rules:
//  - Short (<700 words):   1 CTA  → near conclusion only.
//  - Medium (700–1499):    2 CTAs → after intro + near conclusion.
//  - Long (>=1500):        3 CTAs → after intro + mid + near conclusion.
//  - Slots never stack adjacently; minimum 2 paragraphs of prose between
//    any two injected blocks (and away from the MidArticleRelated slot when
//    present).
//  - Insertion is into a placeholder <div data-lsdiet-cta-slot> that is
//    targeted by createPortal so React owns the rendered subtree.

import { useLayoutEffect, useState, type RefObject } from "react";

import type { CtaPlacement } from "@/components/LSDietCTA";

export interface CtaSlot {
  placement: CtaPlacement;
  node: HTMLDivElement;
}

interface Options {
  /** Wrapper element whose immediate children are scanned. */
  bodyRef: RefObject<HTMLElement | null>;
  /** Resets injection when this changes (typically the post slug). */
  slug: string;
  /** Hint when the caller knows a mid-related slot already exists. */
  hasMidRelatedSlot?: boolean;
}

function wordCount(text: string): number {
  return (text.match(/\S+/g) || []).length;
}

function ctaCount(words: number): number {
  if (words >= 1500) return 3;
  if (words >= 700) return 2;
  return 1;
}

function pickIndices(paragraphCount: number, count: number): number[] {
  // Fractional anchors per placement so insertion points stay balanced
  // even on very long posts.
  const anchors: Record<number, number[]> = {
    1: [0.82],
    2: [0.22, 0.82],
    3: [0.22, 0.55, 0.85],
  };
  const picks = anchors[count].map((f) =>
    Math.min(paragraphCount - 1, Math.max(1, Math.floor(paragraphCount * f))),
  );
  // Enforce min gap of 2 paragraphs between picks.
  for (let i = 1; i < picks.length; i++) {
    if (picks[i] - picks[i - 1] < 2) {
      picks[i] = Math.min(paragraphCount - 1, picks[i - 1] + 2);
    }
  }
  return picks;
}

const PLACEMENT_ORDER: CtaPlacement[] = ["intro", "mid", "bottom"];

export function useCtaInjection({ bodyRef, slug }: Options): CtaSlot[] {
  const [slots, setSlots] = useState<CtaSlot[]>([]);

  useLayoutEffect(() => {
    const wrapper = bodyRef.current;
    if (!wrapper) return;

    // Clean any previous slots from a prior render.
    wrapper.querySelectorAll("[data-lsdiet-cta-slot]").forEach((n) => n.remove());

    const text = wrapper.textContent || "";
    const words = wordCount(text);
    if (words < 80) return; // Too small to be a real post — skip entirely.

    const paragraphs = Array.from(
      wrapper.querySelectorAll<HTMLElement>(":scope > p"),
    );
    if (paragraphs.length < 3) return; // Not enough structure to inject safely.

    const desired = ctaCount(words);
    const placements: CtaPlacement[] =
      desired === 1
        ? ["bottom"]
        : desired === 2
          ? ["intro", "bottom"]
          : PLACEMENT_ORDER;

    const indices = pickIndices(paragraphs.length, desired);

    const created: CtaSlot[] = [];
    indices.forEach((idx, i) => {
      const placement = placements[i];
      const slot = document.createElement("div");
      slot.setAttribute("data-lsdiet-cta-slot", placement);
      const target = paragraphs[idx];
      target.parentNode?.insertBefore(slot, target);
      created.push({ placement, node: slot });
    });

    setSlots(created);

    return () => {
      created.forEach((s) => s.node.remove());
      setSlots([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return slots;
}
