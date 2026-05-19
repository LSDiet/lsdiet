import { useState } from "react";
import { Eye, Activity, Lock, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const awarenessStages = [
  { stage: "Reality Awareness", desc: "Establishing your baseline" },
  { stage: "Friction Awareness", desc: "Recognizing the gap" },
  { stage: "Pattern Awareness", desc: "Examining the How, Who, What, When, Why" },
  { stage: "Consequence Awareness", desc: "The root of <strong>push motivation</strong>" },
  { stage: "Identity Awareness", desc: "The root of <strong>pull motivation</strong>" },
];

function AwarenessStagesDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-primary">
            The 5 Stages of Awareness
          </DialogTitle>
          <DialogDescription>
            Discover the push and pull motivation behind lasting change.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-3 mt-2">
          {awarenessStages.map((s, i) => (
            <li key={s.stage} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.stage}</p>
                <p className="text-xs text-[hsl(0_0%_22%)]" dangerouslySetInnerHTML={{ __html: s.desc }} />
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/qa?open=awareness-stages"
          className="block text-center text-sm font-medium text-primary hover:text-accent transition-colors mt-4"
        >
          Explore in detail →
        </Link>
      </DialogContent>
    </Dialog>
  );
}

function VertexLabel({
  icon: Icon,
  number,
  label,
  color,
}: {
  icon: typeof Eye;
  number: number;
  label: string;
  color: "primary" | "accent" | "secondary";
}) {
  const colorClasses =
    color === "primary"
      ? "bg-foreground text-background border-foreground"
      : color === "accent"
        ? "bg-accent/15 text-accent border-accent/30"
        : "bg-primary/15 text-primary border-primary/30";
  const iconColor =
    color === "primary"
      ? "text-background"
      : color === "accent"
        ? "text-accent"
        : "text-primary";

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colorClasses}`}>
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span className="text-sm font-bold uppercase tracking-wide">
        {number}. {label}
      </span>
    </div>
  );
}

function TriangleDiagram() {
  const { ref, isVisible } = useScrollAnimation();
  const [stagesOpen, setStagesOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={`max-w-5xl mx-auto transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <AwarenessStagesDialog open={stagesOpen} onOpenChange={setStagesOpen} />

      <div className="hidden md:block">
        <div className="text-center mb-3">
          <VertexLabel icon={Eye} number={1} label="Awareness" color="primary" />
          <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1">
            Creates clarity and motivation
          </p>
          <button
            onClick={() => setStagesOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent transition-colors group"
          >
            <span>Discover the 5 stages of awareness</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

        <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-6">
          <div className="text-left">
            <VertexLabel icon={Activity} number={2} label="Practice" color="accent" />
            <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1.5">
              Builds the right daily choices
            </p>
            <ul className="space-y-1 text-left">
              <li className="text-[11px] text-[hsl(0_0%_22%)] whitespace-nowrap">• Adopt a low-starch, low-sugar lifestyle</li>
              <li className="text-[11px] text-[hsl(0_0%_22%)] pl-[0.6em] indent-[-0.6em]">• Adapt your diet without abandoning your culture or social life</li>
              <li className="text-[11px] text-[hsl(0_0%_22%)]">• Turn every obstacle into opportunity</li>
            </ul>
          </div>

          <div>
            <svg
              viewBox="0 0 500 250"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <polygon
                points="250,15 50,200 450,200"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <text x="135" y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontStyle="italic" opacity="0.5" transform="rotate(-43, 135, 100)">
                Clarity creates priority.
              </text>
              <text x="365" y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontStyle="italic" opacity="0.5" transform="rotate(43, 365, 100)">
                Action survives disruption.
              </text>
              <text x="250" y="225" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontStyle="italic" opacity="0.5">
                Priority sustains action.
              </text>
            </svg>
          </div>

          <div className="text-left">
            <VertexLabel icon={Lock} number={3} label="Permanence" color="secondary" />
            <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1.5">
              Protects new habits when life gets hard
            </p>
            <ul className="space-y-1 text-left">
              <li className="text-[11px] text-[hsl(0_0%_22%)]">• Create a psychological anchor</li>
              <li className="text-[11px] text-[hsl(0_0%_22%)]">• Build an internal alert system</li>
              <li className="text-[11px] text-[hsl(0_0%_22%)] pl-[0.6em] indent-[-0.6em]">• Prompt course correction back to your LS lifestyle</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="md:hidden space-y-8">
        <div className="text-center">
          <VertexLabel icon={Eye} number={1} label="Awareness" color="primary" />
          <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1">
            Creates clarity and motivation
          </p>
          <button
            onClick={() => setStagesOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent transition-colors"
          >
            <span>Discover the 5 stages of awareness</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
        <div className="text-center">
          <VertexLabel icon={Activity} number={2} label="Practice" color="accent" />
          <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1.5">
            Builds the right daily choices
          </p>
          <ul className="space-y-1 text-center">
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Adopt a low-starch, low-sugar lifestyle</li>
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Adapt your diet without abandoning your culture or social life</li>
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Turn every obstacle into opportunity</li>
          </ul>
        </div>
        <div className="text-center">
          <VertexLabel icon={Lock} number={3} label="Permanence" color="secondary" />
          <p className="text-xs text-[hsl(0_0%_22%)] mt-2 mb-1.5">
            Protects new habits when life gets hard
          </p>
          <ul className="space-y-1 text-center">
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Create a psychological anchor</li>
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Build an internal alert system</li>
            <li className="text-[11px] text-[hsl(0_0%_22%)]">• Prompt course correction back to your LS lifestyle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function MethodSection() {
  return (
    <section id="method" className="py-14 md:py-20">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The LS Diet Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-6">
            The Weight Permanence <span className="text-accent animate-pulse-glow inline-block">Triangle™</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12 space-y-4 text-[hsl(0_0%_15%)] leading-relaxed text-base md:text-lg">
          <p>
            The <strong className="text-foreground">Weight Permanence Triangle™</strong> is the core framework
            inside LS Diet. It connects three pillars — <span className="text-accent">Awareness</span>,{" "}
            <span className="text-accent">Practice</span>, and{" "}
            <span className="text-accent">Permanence</span> — into a single behavioural system designed by Oscar Poon
            to end weight cycling for good.
          </p>
          <p>
            Awareness creates the clarity and motivation that make change feel urgent. Practice translates that
            clarity into daily action: adopting a low-starch, low-sugar lifestyle, adapting it to your culture and
            social life, and turning obstacles into opportunities. Permanence protects those new habits when life
            gets hard, using psychological anchors and an internal alert system to course-correct back to your LS
            lifestyle before a single bad week becomes another full restart.
          </p>
          <p className="text-sm">
            <a href="/weight-permanence-triangle" className="text-accent hover:underline font-medium">
              Read the full Weight Permanence Triangle™ breakdown →
            </a>
          </p>
        </div>

        <TriangleDiagram />
      </div>
    </section>
  );
}
