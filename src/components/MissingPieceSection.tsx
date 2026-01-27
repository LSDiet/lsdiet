import { ChevronRight, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const equationSteps = [
  { text: "Lower starch and sugar", variant: "primary" },
  { text: "Lower insulin", variant: "secondary" },
  { text: "Easier fat mobilization and oxidation (fat burning)", variant: "secondary" },
  { text: "Less hunger", variant: "accent" },
  { text: "Eating less naturally", variant: "primary" },
];

function EquationFlow() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobile();

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 border-primary/20 text-primary";
      case "secondary":
        return "bg-primary/15 border-primary/25 text-primary";
      case "accent":
        return "bg-accent/15 border-accent/30 text-accent-foreground font-semibold";
      default:
        return "bg-primary/10 border-primary/20 text-primary";
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 flex-wrap"
    >
      {equationSteps.map((step, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
          <div
            className={`px-4 py-3 rounded-full border text-center text-sm md:text-base transition-all duration-700 ${getVariantClasses(step.variant)} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {step.text}
          </div>
          {index < equationSteps.length - 1 && (
            <div
              className={`text-muted-foreground transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100 + 50}ms` }}
            >
              {isMobile ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function MissingPieceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 bg-secondary/30">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25">
              <span className="text-sm font-medium text-accent">The Missing Piece</span>
            </div>
          </div>

          {/* Extended Narrative */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-border/50 mb-10">
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                Veggie cleanses, carnivore, intermittent fasting, and daily exercise — I tried them all. Every method worked until it stopped working. That's when I made a clear decision to stop chasing short-term weight loss and start building a lifelong health state.
              </p>
              <p>
                With over 40 percent of adults struggling with obesity, this isn't just a personal problem. It's a biological and environmental one. I began studying how the body responds to food and pressure, and grounded that understanding in my own repeated weight loss and regain.
              </p>
              <p>
                The result is a practical, step-by-step framework designed to serve one goal: how to eat less naturally and eat right in an environment that is not built for health. That framework became the <span className="text-primary font-medium">Weight Permanence Triangle™ Method</span>.
              </p>
            </div>
          </div>

          {/* Equation Intro */}
          <p className="text-center text-lg md:text-xl text-primary italic mb-8">
            If weight loss has always felt like fighting hunger and yourself at the same time, this is why.
          </p>
        </div>

        {/* Equation Flow Diagram */}
        <div className="max-w-5xl mx-auto mb-8">
          <EquationFlow />
        </div>

        {/* Clarifier */}
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          (Calories still matter. But when hunger is regulated, food intake naturally decreases.)
        </p>
      </div>
    </section>
  );
}
