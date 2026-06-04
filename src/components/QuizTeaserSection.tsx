import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function QuizTeaserSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <div className="rounded-2xl border border-accent/30 bg-card p-8 md:p-12 text-center shadow-xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-3">
            Free 60-Second Quiz
          </p>
          <h2 className="text-2xl md:text-4xl font-serif font-normal text-primary leading-tight mb-4">
            Why does my weight <br />keep coming back?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
            Find out your Weight Regain Profile
          </p>
          <Button
            variant="accent"
            size="lg"
            className="px-8 animate-pulse-glow"
            asChild
          >
            <a
              href="/quiz"
              onClick={() =>
                trackEvent("quiz_start_click", { location: "homepage" })
              }
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
