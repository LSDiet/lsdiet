import { ChevronRight, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const equationSteps = [
  { text: "Lower starch & sugar", variant: "start" },
  { text: "Lower insulin", variant: "middle" },
  { text: "Fat burning", variant: "middle" },
  { text: "Less hunger", variant: "key" },
  { text: "Eat less naturally", variant: "end" },
];

function EquationFlow() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobile();

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "start":
        return "bg-primary/8 text-primary/90";
      case "middle":
        return "bg-muted/60 text-muted-foreground";
      case "key":
        return "bg-accent/20 text-accent-foreground font-medium";
      case "end":
        return "bg-primary/12 text-primary font-medium";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2"
    >
      {equationSteps.map((step, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2">
          <span
            className={`px-3 py-1.5 rounded-md text-xs md:text-sm transition-all duration-700 ${getVariantClasses(step.variant)} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {step.text}
          </span>
          {index < equationSteps.length - 1 && (
            <span
              className={`text-muted-foreground/50 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 80 + 40}ms` }}
            >
              {isMobile ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function MissingPieceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-7 bg-secondary/30">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Badge */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25">
              <span className="text-sm font-medium text-accent">The Missing Piece</span>
            </div>
          </div>

          {/* Extended Narrative */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-border/50 mb-8">
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
          <p className="text-center text-base md:text-lg text-primary/80 italic mb-5">
            If weight loss has always felt like fighting hunger and yourself at the same time, this is why.
          </p>
        </div>

        {/* Equation Flow Diagram */}
        <div className="max-w-4xl mx-auto mb-5">
          <EquationFlow />
        </div>

        {/* Clarifier */}
        <p className="text-center text-sm text-muted-foreground italic max-w-2xl mx-auto">
          (Calories still matter. But when hunger is regulated, food intake naturally decreases.)
        </p>
      </div>
    </section>
  );
}
