// Reusable, crawlable conversion CTA injected into every blog post.
//
// Rules (do not break):
//  - Renders a real <a href="..."> — no JS-only handlers, no portals to
//    hidden DOM, no client-only widgets. SSR/crawlers see the link.
//  - Visually distinct from article prose: bordered card on a soft amber
//    surface, generous padding, mobile-first.
//  - Messaging is concise and varies by category + placement. No aggressive
//    sales language.

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export const LS_DIET_SKOOL_URL = "https://www.skool.com/lsdiet/about";

export type CtaPlacement = "intro" | "mid" | "bottom";

export interface LSDietCTAProps {
  headline: string;
  body: string;
  buttonLabel?: string;
  trustLine?: string;
  placement: CtaPlacement;
}

export function LSDietCTA({
  headline,
  body,
  buttonLabel = "START YOUR FREE TRAINING TODAY",
  trustLine = "Free to join · No credit card · Cancel anytime",
  placement,
}: LSDietCTAProps) {
  return (
    <aside
      data-lsdiet-cta={placement}
      className="not-prose my-10 rounded-2xl border border-accent/40 bg-accent/5 px-5 py-6 md:px-7 md:py-7 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent mb-2">
        The Free LS Diet Course
      </p>
      <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-zinc-900 leading-snug mb-2">
        {headline}
      </h3>
      <p className="text-[15px] leading-relaxed text-zinc-700 mb-4 max-w-[60ch]">
        {body}
      </p>
      <a
        href={LS_DIET_SKOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("cta_click", {
            location: "lsdiet_cta",
            placement,
            label: buttonLabel,
            destination: LS_DIET_SKOOL_URL,
          })
        }
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" aria-hidden />
      </a>
      {trustLine && (
        <p className="mt-3 text-[11px] text-zinc-500">{trustLine}</p>
      )}
    </aside>
  );
}
