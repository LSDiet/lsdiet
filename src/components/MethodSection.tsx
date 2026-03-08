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

function AwarenessContent({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <div className={`inline-flex items-center gap-2 mb-1 ${centered ? "justify-center" : ""}`}>
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
        <ul className={`space-y-0.5 ${centered ? "text-center" : "text-left"}`}>
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
        className="block text-[10px] text-muted-foreground hover:text-primary transition-colors mt-1"
      >
        Click to explore →
      </Link>
    </div>
  );
}

function PracticeContent({ aligned = "left" }: { aligned?: "left" | "center" }) {
  return (
    <div className={aligned === "center" ? "text-center" : "text-left"}>
      <div className={`inline-flex items-center gap-2 mb-1 ${aligned === "center" ? "justify-center" : ""}`}>
        <Activity className="w-5 h-5 text-accent" />
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          2. Practice
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        Builds the right daily choices
      </p>
      <ul className={`space-y-1 ${aligned === "center" ? "text-center" : "text-left"}`}>
        <li className="text-[11px] text-muted-foreground">• Adopt a low-starch, low-sugar lifestyle</li>
        <li className="text-[11px] text-muted-foreground">• Balance diet with cultural norms</li>
        <li className="text-[11px] text-muted-foreground">• Turn every obstacle into opportunity</li>
      </ul>
    </div>
  );
}

function PermanenceContent({ aligned = "right" }: { aligned?: "right" | "center" }) {
  return (
    <div className={aligned === "center" ? "text-center" : "text-right"}>
      <div className={`inline-flex items-center gap-2 mb-1 ${aligned === "center" ? "justify-center" : "justify-end"}`}>
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
    </div>
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
      {/* Desktop/tablet: positioned layout with SVG triangle */}
      <div className="hidden md:block">
        {/* Awareness content above triangle */}
        <div className="text-center mb-4">
          <AwarenessContent centered />
        </div>

        {/* Triangle with edge labels */}
        <div className="relative" style={{ height: 260 }}>
          <svg
            viewBox="0 0 500 240"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Triangle: top 250,20  left 60,220  right 440,220 */}
            <polygon
              points="250,20 60,220 440,220"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Left edge: Awareness → Practice */}
            <text
              x="138"
              y="125"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
              fontStyle="italic"
              transform="rotate(-47, 138, 125)"
            >
              Clarity creates priority.
            </text>
            {/* Right edge: Awareness → Permanence */}
            <text
              x="362"
              y="125"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
              fontStyle="italic"
              transform="rotate(47, 362, 125)"
            >
              Action survives disruption.
            </text>
            {/* Bottom edge */}
            <text
              x="250"
              y="238"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
              fontStyle="italic"
            >
              Priority sustains action.
            </text>
          </svg>
        </div>

        {/* Bottom vertices — Practice (left) and Permanence (right) */}
        <div className="flex justify-between mt-2">
          <div className="max-w-[240px]">
            <PracticeContent aligned="left" />
          </div>
          <div className="max-w-[260px]">
            <PermanenceContent aligned="right" />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked layout */}
      <div className="lg:hidden space-y-8">
        <div className="text-center">
          <AwarenessContent centered />
        </div>
        <div className="text-center">
          <PracticeContent aligned="center" />
        </div>
        <div className="text-center">
          <PermanenceContent aligned="center" />
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
