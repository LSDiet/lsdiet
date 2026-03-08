import { Eye, Activity, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const awarenessStages = ["Reality", "Friction", "Pattern", "Consequence", "Autonomy"];

function TriangleDiagram() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`max-w-4xl mx-auto mb-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Desktop: positioned layout with SVG triangle */}
      <div className="hidden md:block relative" style={{ height: 480 }}>
        {/* SVG triangle lines + edge labels */}
        <svg
          viewBox="0 0 600 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Triangle lines only — vertices: top 300,60  left 100,310  right 500,310 */}
          <polygon
            points="300,80 100,320 500,320"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Edge labels */}
          <text x="175" y="200" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontStyle="italic" transform="rotate(-50, 175, 200)">
            Action survives disruption.
          </text>
          <text x="425" y="200" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontStyle="italic" transform="rotate(50, 425, 200)">
            Priority sustains action.
          </text>
          <text x="300" y="355" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontStyle="italic">
            Clarity creates priority.
          </text>
        </svg>

        {/* Top vertex — Permanence */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">3. Permanence</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Protects new habits when life gets hard
          </p>
        </div>

        {/* Bottom-left vertex — Awareness */}
        <div className="absolute left-0 bottom-0 w-60 text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Eye className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">1. Awareness</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Creates clarity and motivation
          </p>
          <Link
            to="/qa?open=awareness-stages"
            className="inline-flex flex-wrap justify-center gap-1 group"
          >
            {awarenessStages.map((stage) => (
              <span
                key={stage}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
              >
                {stage}
              </span>
            ))}
          </Link>
        </div>

        {/* Bottom-right vertex — Practice */}
        <div className="absolute right-0 bottom-0 w-56 text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">2. Practice</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Builds the right daily choices
          </p>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden space-y-6">
        {/* Small centered triangle */}
        <svg viewBox="0 0 200 160" className="w-32 h-auto mx-auto opacity-30" aria-hidden="true">
          <polygon
            points="100,20 20,140 180,140"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Awareness */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Eye className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">1. Awareness</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Creates clarity and motivation
          </p>
          <Link
            to="/qa?open=awareness-stages"
            className="inline-flex flex-wrap justify-center gap-1 group"
          >
            {awarenessStages.map((stage) => (
              <span
                key={stage}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
              >
                {stage}
              </span>
            ))}
          </Link>
        </div>

        {/* Practice */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">2. Practice</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Builds the right daily choices
          </p>
        </div>

        {/* Permanence */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">3. Permanence</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Protects new habits when life gets hard
          </p>
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
            <span className="text-accent animate-pulse-glow inline-block">Triangle™</span>
          </h2>
        </div>

        <TriangleDiagram />
      </div>
    </section>
  );
}
