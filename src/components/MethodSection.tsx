import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Section — Method. Maximum compression. Just the equation, interlinked.
 */
export function MethodSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="method" className="py-14 md:py-20">
      <div ref={ref} className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Framework
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            The LS Diet and the <span className="text-accent">Weight Permanence Triangle</span>
          </h2>
        </div>

        {/* A + P = P linear equation — the central visual */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
            <PillLink label="Awareness" tone="primary" href="/awareness-stages" />
            <Operator symbol="+" />
            <PillLink label="Practice" tone="accent" href="/blog/action-practice" />
            <Operator symbol="=" />
            <Pill label="Permanence" tone="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

const pillClasses = (tone: "primary" | "accent" | "secondary") =>
  tone === "primary"
    ? "bg-foreground text-background border-foreground"
    : tone === "accent"
      ? "bg-accent/15 text-accent border-accent/40"
      : "bg-primary/15 text-primary border-primary/40";

function Pill({ label, tone }: { label: string; tone: "primary" | "accent" | "secondary" }) {
  return (
    <span
      className={`inline-flex items-center px-5 py-2.5 md:px-7 md:py-3.5 rounded-full border-2 text-base md:text-lg font-extrabold uppercase tracking-wide ${pillClasses(tone)}`}
    >
      {label}
    </span>
  );
}

function PillLink({ label, tone, href }: { label: string; tone: "primary" | "accent" | "secondary"; href: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center px-5 py-2.5 md:px-7 md:py-3.5 rounded-full border-2 text-base md:text-lg font-extrabold uppercase tracking-wide transition-transform hover:scale-[1.03] ${pillClasses(tone)}`}
    >
      {label}
    </a>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return (
    <span className="text-2xl md:text-3xl font-black text-[hsl(0_0%_30%)]" aria-hidden="true">
      {symbol}
    </span>
  );
}
