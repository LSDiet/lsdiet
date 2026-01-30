import { Eye, Activity, Lock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const principles = [
  {
    icon: Eye,
    title: "Awareness",
    description: "Five stages of awareness that clarify why weight loss matters beyond the scale and use emotion to create internal push and pull motivation.",
  },
  {
    icon: Activity,
    title: "Practice",
    description: "Daily actions that reinforce a low-starch, low-sugar identity and keep health the top priority.",
  },
  {
    icon: Lock,
    title: "Permanence",
    description: "Tools to establish an internal alert system that flags deviations and stabilizes decisions when context, emotion, or environment changes.",
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
  const { ref: taglineRef, isVisible: taglineVisible } = useScrollAnimation();

  return (
    <section id="method" className="py-7">
      <div className="container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-accent/15 border border-accent/30 mb-6">
            <span className="text-accent font-semibold text-base md:text-lg">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
            Weight Permanence Triangle™
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            The Weight Permanence Triangle (WPT) is a guided neurobehavioural training that helps you condition weight loss to become the first daily priority, make eating and movement decisions intentional, and activate an internal alert-and-accounting system that re-anchors actions when routines, environments, or emotions derail progress.
          </p>
          <p 
            ref={taglineRef}
            className={`text-base md:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-300 ${
              taglineVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
            }`}
          >
            (Simply: It makes you want to lose weight so much that{" "}
            <span className="font-bold text-lg md:text-xl text-accent whitespace-nowrap">
              excuses stop working.
            </span>)
          </p>
          <p
            className={`text-sm md:text-base text-muted-foreground/80 max-w-lg mx-auto mt-3 italic transition-all duration-700 delay-500 ${
              taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            I spent months trying different approaches before realising that low-starch, low-sugar eating was the only way I could lose weight and build muscle without feeling hungry.
          </p>
        </div>

        {/* Professional Triangle Diagram */}
        <TriangleDiagram />

        {/* Triangle visualization */}
        <div ref={principlesRef} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div 
              key={principle.title} 
              className={`text-center group transition-all duration-700 ${
                principlesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <principle.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
