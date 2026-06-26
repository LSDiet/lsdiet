import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

export function QuizTeaserSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <div className="rounded-2xl border border-accent/30 bg-card p-8 md:p-12 text-center shadow-xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-3">
            Free Community · No Credit Card
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-tight mb-4">
            Build a future not limited<br className="hidden md:block" /> by your weight
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">
            Join the LS Diet community free. Get the full Weight Permanence Training™,
            daily Action Practice modules, and a group of people doing the same work.
          </p>
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                location: "final_cta",
                destination: SKOOL_URL,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-extrabold uppercase tracking-wider text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.7)] transition-all hover:brightness-110 hover:-translate-y-0.5 md:text-lg"
          >
            Start Free Training
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
          <p className="mt-3 text-[11px] font-medium text-muted-foreground">
            100% free. No credit card.
          </p>
        </div>
      </div>
    </section>
  );
}
