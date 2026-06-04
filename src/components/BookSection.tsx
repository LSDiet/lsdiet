import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";
import skoolActionPractice from "@/assets/skool-action-practice.png";
import skoolStartHere from "@/assets/skool-start-here.png";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

type Pillar = {
  step: string;
  tag: string;
  title: string;
  meta: string;
  image: string;
  alt: string;
  placement: string;
  tilt: string;
};

const pillars: Pillar[] = [
  {
    step: "01",
    tag: "Psychology Training",
    title: "Why you regain — and how to stop",
    meta: "Self-paced · ~30 min",
    image: skoolStartHere,
    alt: "Psychology training modules: the problem and the solution",
    placement: "start_here_image",
    tilt: "md:-rotate-[1.5deg]",
  },
  {
    step: "02",
    tag: "Action Practice",
    title: "1 lesson a day · 30 days",
    meta: "40+ short videos",
    image: skoolActionPractice,
    alt: "Action Practice classroom: daily habit lessons",
    placement: "action_practice_image",
    tilt: "md:rotate-[1.5deg]",
  },
];

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="book" className="bg-background py-14 md:py-20">
      <div className="container max-w-5xl mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header — minimal */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Now Live on Skool · 100% Free
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              What you'll get inside
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Two parts. Zero fluff.
            </p>
          </div>

          {/* Two-pillar preview */}
          <div className="grid gap-8 md:gap-6 md:grid-cols-2 mb-10">
            {pillars.map((p) => (
              <a
                key={p.step}
                href={SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "book_section",
                    placement: p.placement,
                    destination: SKOOL_URL,
                  })
                }
                className="group relative flex flex-col"
              >
                {/* Tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-extrabold ring-1 ring-accent/40">
                    {p.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {p.meta}
                </p>

                {/* Screenshot — tilted, peek-style */}
                <div className={`relative mt-5 mx-auto w-[70%] md:w-full ${p.tilt} transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1`}>
                  <div className="absolute -inset-3 rounded-2xl bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-background">
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Single CTA */}
          <div className="text-center">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a
                href={SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "book_section",
                    placement: "primary_button",
                    label: "Join LS Diet Community",
                    destination: SKOOL_URL,
                  })
                }
              >
                Join Free — No Credit Card
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="mt-3 text-[11px] font-medium text-muted-foreground">
              Free forever · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
