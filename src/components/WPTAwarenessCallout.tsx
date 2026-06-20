import { Link } from "react-router-dom";

// Maps primaryFoundationSlug → awareness stage label for the callout
const STAGE_MAP: Record<string, { stage: string; label: string }> = {
  "reality-awareness":       { stage: "1", label: "Reality Awareness" },
  "friction-awareness":      { stage: "2", label: "Friction Awareness" },
  "pattern-awareness":       { stage: "3", label: "Pattern Awareness" },
  "consequence-awareness":   { stage: "4", label: "Consequence Awareness" },
  "identity-awareness":      { stage: "5", label: "Identity Awareness" },
  "action-practice":         { stage: "5", label: "Identity & Action" },
  "the-weight-permanence-triangle-how-to-stop-regaining-weight": { stage: "all", label: "Weight Permanence" },
  "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting": { stage: "all", label: "LS Diet" },
  "why-people-regain-weight-after-dieting": { stage: "all", label: "Weight Permanence" },
};

interface WPTAwarenessCalloutProps {
  primaryFoundationSlug?: string;
}

export function WPTAwarenessCallout({ primaryFoundationSlug }: WPTAwarenessCalloutProps) {
  const mapped = primaryFoundationSlug ? STAGE_MAP[primaryFoundationSlug] : null;

  const stageLabel = mapped
    ? mapped.stage === "all"
      ? "Weight Permanence Training"
      : `Stage ${mapped.stage} — ${mapped.label}`
    : "Weight Permanence Training";

  return (
    <div className="my-10 rounded-xl bg-zinc-950 text-white px-6 py-7 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
          {stageLabel}
        </p>
        <h3 className="text-xl font-bold leading-snug">
          If something in this article resonated, you've already started.
        </h3>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
          This is what Weight Permanence Training is built on — not diet rules, but self-awareness
          that makes the right choice feel obvious. The 5 Awareness Stages walk you through the full
          system in about 3 minutes.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Link
          to="/awareness-stages"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-amber-400 text-zinc-950 text-sm font-bold hover:bg-amber-300 transition-colors"
        >
          Experience the 5 Stages →
        </Link>
        <Link
          to="/quiz"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
        >
          Find your weight regain profile
        </Link>
      </div>
    </div>
  );
}
