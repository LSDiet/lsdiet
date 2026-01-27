import { Eye, Activity, Lock } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Awareness",
    description: "Five stages of awareness to clarify why weight loss matters beyond the scale and encode it as an internal priority.",
  },
  {
    icon: Activity,
    title: "Practice",
    description: "Daily actions that reinforce a low-starch, low-sugar identity and keep health the top priority.",
  },
  {
    icon: Lock,
    title: "Permanence",
    description: "Internalized systems that keep decisions stable so behaviour follows structure rather than emotion when external cues change.",
  },
];

function TriangleDiagram() {
  return (
    <div className="max-w-2xl mx-auto mb-16">
      <svg
        viewBox="0 0 400 320"
        className="w-full h-auto"
        role="img"
        aria-label="Weight Permanence Triangle diagram showing the relationship between Awareness, Practice, and Permanence"
      >
        {/* Triangle lines */}
        <polygon
          points="200,60 60,260 340,260"
          fill="none"
          stroke="hsl(152, 35%, 28%)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Edge labels - positioned along triangle edges */}
        {/* Left edge: Action survives disruption */}
        <text
          x="110"
          y="165"
          textAnchor="middle"
          className="fill-muted-foreground text-xs italic"
          transform="rotate(-55, 110, 165)"
        >
          Action survives disruption.
        </text>

        {/* Right edge: Priority sustains action */}
        <text
          x="290"
          y="165"
          textAnchor="middle"
          className="fill-muted-foreground text-xs italic"
          transform="rotate(55, 290, 165)"
        >
          Priority sustains action.
        </text>

        {/* Bottom edge: Clarity creates priority */}
        <text
          x="200"
          y="295"
          textAnchor="middle"
          className="fill-muted-foreground text-xs italic"
        >
          Clarity creates priority.
        </text>

        {/* Permanence label (top) - Primary green */}
        <rect
          x="130"
          y="20"
          width="140"
          height="32"
          rx="16"
          fill="hsl(152, 35%, 28%)"
        />
        <text
          x="200"
          y="41"
          textAnchor="middle"
          className="fill-primary-foreground text-sm font-medium"
        >
          3. Permanence
        </text>

        {/* Awareness label (bottom left) - Teal/blue-green */}
        <rect
          x="0"
          y="262"
          width="130"
          height="32"
          rx="16"
          fill="hsl(180, 35%, 35%)"
        />
        <text
          x="65"
          y="283"
          textAnchor="middle"
          className="fill-primary-foreground text-sm font-medium"
        >
          1. Awareness
        </text>

        {/* Practice label (bottom right) - Amber/accent */}
        <rect
          x="270"
          y="262"
          width="130"
          height="32"
          rx="16"
          fill="hsl(38, 55%, 55%)"
        />
        <text
          x="335"
          y="283"
          textAnchor="middle"
          className="fill-accent-foreground text-sm font-medium"
        >
          2. Practice
        </text>
      </svg>
    </div>
  );
}

export function MethodSection() {
  return (
    <section id="method" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
            <span className="text-sm font-medium text-accent">The Method</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
            The Weight Permanence Triangle™
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Three interconnected principles that keep weight loss prioritized even when life gets busy. When it becomes the primary reference point in your brain, daily choices around food, movement, and recovery align without external reminders.
          </p>
        </div>

        {/* Professional Triangle Diagram */}
        <TriangleDiagram />

        {/* Triangle visualization */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {principles.map((principle, index) => (
            <div key={principle.title} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <principle.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Core principle */}
        <div className="max-w-2xl mx-auto text-center bg-card rounded-3xl p-8 md:p-12 border border-border">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-4">
            <span className="text-sm font-medium text-accent">The Core Principle</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-normal mb-2 text-primary">
            Low Starch. Low Sugar.
          </h3>
          <p className="text-muted-foreground italic mb-6">(Simple, but not easy.)</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            No complicated formulas. No expensive supplements. Just understanding how starch and sugar influence fat storage, and choosing food accordingly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hunger is biological, not a lack of discipline. And when a multibillion-dollar ultra-processed food industry amplifies it, willpower alone is never going to win.
          </p>
        </div>
      </div>
    </section>
  );
}
