import { Eye, Activity, Lock, Utensils, Users, Store } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div 
      ref={ref}
      className={`max-w-md mx-auto mb-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
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
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollAnimation();
  const { ref: coreRef, isVisible: coreVisible } = useScrollAnimation();

  return (
    <section id="method" className="py-10">
      <div className="container">
        <div className="text-center mb-8">
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
        <div ref={principlesRef} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {principles.map((principle, index) => (
            <div 
              key={principle.title} 
              className={`text-center group transition-all duration-700 ${
                principlesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <principle.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Core principle */}
        <div 
          ref={coreRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            coreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-4">
              <span className="text-sm font-medium text-accent">The Core Principle</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-normal mb-2 text-primary">
              Low Starch. Low Sugar.
            </h3>
            <p className="text-muted-foreground italic">(Simple, but not easy.)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* The Biology Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4">The Biology</h4>
              <p className="text-muted-foreground mb-4">When starch and sugar keep insulin elevated:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Your body favours fat storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Fat access is blocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Hunger stays high</span>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hunger is biological, not a lack of discipline. When this biology is amplified by a multibillion-dollar industry designed for repeat consumption, willpower alone was never going to win.
              </p>
            </div>

            {/* The Challenge Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4">The Challenge</h4>
              <p className="text-muted-foreground mb-4">Low starch and low sugar looks like a food swap on the surface. In reality, it reshapes:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Utensils className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary">How you eat in restaurants</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary">How you navigate family meals</span>
                </li>
                <li className="flex items-start gap-3">
                  <Store className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary text-sm">How you work within a food system where shelf-stable carbohydrates are cheaper and easier than fresh protein and vegetables</span>
                </li>
              </ul>
              <div className="border-t border-border pt-4 text-center">
                <p className="text-muted-foreground text-sm mb-2">This is not just a diet change.</p>
                <p className="text-primary text-sm">
                  It is a <span className="font-semibold text-primary">biological</span>, <span className="font-semibold text-accent">social</span>, and <span className="font-semibold text-primary">environmental</span> challenge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
