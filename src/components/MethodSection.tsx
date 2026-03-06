import { Eye, Activity, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const principles = [
  {
    icon: Eye,
    title: "Awareness",
    description: (
      <>
        <Link to="/qa?open=awareness-stages" className="underline underline-offset-2 hover:text-accent transition-colors">Five stages of awareness</Link> that clarify why weight loss matters beyond the scale and use emotion to create internal push and pull motivation.
      </>
    ),
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
      className={`max-w-md mx-auto mb-14 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <svg
        viewBox="0 0 400 320"
        className="w-full h-auto"
        role="img"
        aria-label="Weight Permanence Triangle diagram showing the relationship between Awareness, Practice, and Permanence"
      >
        <polygon
          points="200,60 60,260 340,260"
          fill="none"
          stroke="hsl(152, 40%, 22%)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="110" y="165" textAnchor="middle" fill="hsl(0, 0%, 40%)" fontSize="11" fontStyle="italic" transform="rotate(-55, 110, 165)">
          Action survives disruption.
        </text>
        <text x="290" y="165" textAnchor="middle" fill="hsl(0, 0%, 40%)" fontSize="11" fontStyle="italic" transform="rotate(55, 290, 165)">
          Priority sustains action.
        </text>
        <text x="200" y="295" textAnchor="middle" fill="hsl(0, 0%, 40%)" fontSize="11" fontStyle="italic">
          Clarity creates priority.
        </text>
        <rect x="130" y="20" width="140" height="32" rx="16" fill="hsl(152, 40%, 22%)" />
        <text x="200" y="41" textAnchor="middle" fill="hsl(0, 0%, 98%)" fontSize="13" fontWeight="600">
          3. Permanence
        </text>
        <rect x="0" y="262" width="130" height="32" rx="16" fill="hsl(180, 35%, 30%)" />
        <text x="65" y="283" textAnchor="middle" fill="hsl(0, 0%, 98%)" fontSize="13" fontWeight="600">
          1. Awareness
        </text>
        <rect x="270" y="262" width="130" height="32" rx="16" fill="hsl(38, 90%, 50%)" />
        <text x="335" y="283" textAnchor="middle" fill="hsl(0, 0%, 4%)" fontSize="13" fontWeight="600">
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
    <section id="method" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The WPT Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-6">
            Weight Permanence <span className="text-accent">Triangle™</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            The Weight Permanence Triangle (WPT) is a guided neurobehavioural training that helps you condition weight loss to become the first daily priority, make eating and movement decisions intentional, and activate an internal alert-and-accounting system that re-anchors actions when routines, environments, or emotions derail progress.
          </p>
          <p
            ref={taglineRef}
            className={`text-base text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-300 ${
              taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="font-bold">(Simply: WPT helps you solve the <span className="text-accent">three real-world</span> problems.)</span>
          </p>
        </div>

        <TriangleDiagram />

        <div ref={principlesRef} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className={`text-center group transition-all duration-700 ${
                principlesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <principle.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
