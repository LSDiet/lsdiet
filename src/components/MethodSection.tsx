import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Section 5 — Method (LS Diet + WPT overview).
 * Maximum compression. Two lines + A+P=P diagram. Routes into pillars.
 */
export function MethodSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="method" className="py-14 md:py-20">
      <div ref={ref} className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Framework
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            The LS Diet and the <span className="text-accent">Weight Permanence Triangle</span>
          </h2>
        </div>

        <div className="space-y-3 text-[hsl(0_0%_15%)] text-base md:text-lg text-center">
          <p>
            <a
              href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting"
              className="text-accent hover:underline font-bold"
            >
              LS Diet
            </a>{" "}
            = food system
          </p>
          <p>
            <a
              href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
              className="text-accent hover:underline font-bold"
            >
              WPT
            </a>{" "}
            = behavioural system
          </p>
        </div>

        {/* A + P = P linear equation */}
        <div
          className={`mt-10 md:mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            <Pill label="Awareness" tone="primary" />
            <Operator symbol="+" />
            <Pill label="Practice" tone="accent" />
            <Operator symbol="=" />
            <Pill label="Permanence" tone="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, tone }: { label: string; tone: "primary" | "accent" | "secondary" }) {
  const classes =
    tone === "primary"
      ? "bg-foreground text-background border-foreground"
      : tone === "accent"
        ? "bg-accent/15 text-accent border-accent/40"
        : "bg-primary/15 text-primary border-primary/40";
  return (
    <span
      className={`inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 rounded-full border-2 text-sm md:text-base font-bold uppercase tracking-wide ${classes}`}
    >
      {label}
    </span>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return (
    <span className="text-2xl md:text-3xl font-black text-[hsl(0_0%_30%)]" aria-hidden="true">
      {symbol}
    </span>
  );
}
