// Decides whether to render a single <LSDietCTA /> block in a blog body and
// where to insert its portal slot. Works against any rendered article
// wrapper (foundation Body, Contentful RichText, code-managed Article Body)
// by scanning top-level paragraphs after first paint.
//
// Rules:
//  - Exactly one CTA per post, appended after all body content. Earlier
//    versions picked a fractional paragraph index to approximate "near the
//    conclusion," but that ignored headings — on short posts the computed
//    index could land the CTA directly after the final H2 and before the
//    closing paragraph, reading as a mid-section interruption. Appending
//    after everything guarantees the CTA is always the true conclusion.
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
}

function wordCount(text: string): number {
  return (text.match(/\S+/g) || []).length;
}

export function useCtaInjection({ bodyRef, slug }: Options): CtaSlot[] {
  const [slots, setSlots] = useState<CtaSlot[]>([]);

  useLayoutEffect(() => {
    const wrapper = bodyRef.current;
    if (!wrapper) return;

    // Clean any previous slot from a prior render.
    wrapper.querySelectorAll("[data-lsdiet-cta-slot]").forEach((n) => n.remove());

    const text = wrapper.textContent || "";
    if (wordCount(text) < 80) return; // Too small to be a real post — skip entirely.

    const paragraphs = wrapper.querySelectorAll(":scope > p");
    if (paragraphs.length < 2) return; // Not enough structure to inject safely.

    const slot = document.createElement("div");
    slot.setAttribute("data-lsdiet-cta-slot", "bottom");
    wrapper.appendChild(slot);

    const created: CtaSlot[] = [{ placement: "bottom", node: slot }];
    setSlots(created);

    return () => {
      created.forEach((s) => s.node.remove());
      setSlots([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return slots;
}
