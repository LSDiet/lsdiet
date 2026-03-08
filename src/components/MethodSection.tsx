import { Eye, Activity, Lock, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const awarenessStages = [
  "Reality Awareness",
  "Friction Awareness",
  "Pattern Awareness",
  "Consequence Awareness",
  "Autonomy Awareness",
];

function AwarenessContent() {
  return (
    <>
      <div className="inline-flex items-center gap-2 mb-1">
        <Eye className="w-5 h-5 text-primary" />
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          1. Awareness
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        Creates clarity and motivation
      </p>
      <Link
        to="/qa?open=awareness-stages"
        className="group inline-flex items-start gap-2"
      >
        <ul className="space-y-1 text-left">
          {awarenessStages.map((stage) => (
            <li
              key={stage}
              className="text-[11px] font-medium text-primary group-hover:text-accent transition-colors"
            >
              {stage}
            </li>
          ))}
        </ul>
        <ChevronDown className="w-3.5 h-3.5 text-primary/60 mt-0.5 animate-bounce" />
      </Link>
      <Link
        to="/qa?open=awareness-stages"
        className="block text-[10px] text-muted-foreground hover:text-primary transition-colors mt-1.5"
      >
        Click to explore →
      </Link>
    </>
  );
}

function PracticeContent() {
  return (
    <>
      <div className="inline-flex items-center gap-2 mb-1">
        <Activity className="w-5 h-5 text-accent" />
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          2. Practice
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        Builds the right daily choices
      </p>
      <ul className="space-y-1 text-left">
        <li className="text-[11px] text-muted-foreground">
          • Adopt a low-starch, low-sugar lifestyle
        </li>
        <li className="text-[11px] text-muted-foreground">
          • Balance diet with cultural norms
        </li>
        <li className="text-[11px] text-muted-foreground">
          • Turn every obstacle into opportunity
        </li>
      </ul>
    </>
  );
}

function PermanenceContent() {
  return (
    <>
      <div className="inline-flex items-center gap-2 mb-1">
        <Lock className="w-5 h-5 text-primary" />
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          3. Permanence
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-1">
        Protects new habits when life gets hard
      </p>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Creates a psychological anchor — an internal alert system that prompts
        course correction back to your LS lifestyle
      </p>
    </>
  );
}

function TriangleDiagram() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`max-w-3xl mx-auto mb-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Desktop: positioned layout with SVG triangle */}
      <div className="hidden md:block relative" style={{ height: 420 }}>
        <svg
          viewBox="0 0 500 340"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Triangle: top 250,70  left 80,280  right 420,280 */}
          <polygon
            points="250,70 80,280 420,280"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Left edge: Awareness → Practice */}
          <text
            x="148"
            y="178"
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
            fontStyle="italic"
            transform="rotate(-51, 148, 178)"
          >
            Clarity creates priority.
          </text>
          {/* Right edge: Awareness → Permanence */}
          <text
            x="352"
            y="178"
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
            fontStyle="italic"
            transform="rotate(51, 352, 178)"
          >
            Action survives disruption.
          </text>
          {/* Bottom edge: Practice → Permanence */}
          <text
            x="250"
            y="310"
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
            fontStyle="italic"
          >
            Priority sustains action.
          </text>
        </svg>

        {/* Top vertex — Awareness */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 max-w-[220px] text-center">
          <AwarenessContent />
        </div>

        {/* Bottom-left vertex — Practice */}
        <div className="absolute left-0 bottom-0 max-w-[220px] text-left">
          <PracticeContent />
        </div>

        {/* Bottom-right vertex — Permanence */}
        <div className="absolute right-0 bottom-0 max-w-[220px] text-right">
          <PermanenceContent />
        </div>
      </div>

      {/* Mobile / tablet: stacked layout */}
      <div className="md:hidden space-y-8">
        <div className="text-center">
          <AwarenessContent />
        </div>
        <div className="text-center">
          <PracticeContent />
        </div>
        <div className="text-center">
          <PermanenceContent />
        </div>
      </div>
    </div>
  );
}

export function MethodSection() {
  return (
    <section id="method" className="py-14 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The WPT Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-6">
            Weight Permanence{" "}
            <span className="text-accent animate-pulse-glow inline-block">
              Triangle™
            </span>
          </h2>
        </div>

        <TriangleDiagram />
      </div>
    </section>
  );
}
