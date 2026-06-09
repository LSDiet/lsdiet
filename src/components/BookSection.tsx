import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";
import skoolActionPractice from "@/assets/skool-action-practice.png";
import skoolStartHere from "@/assets/skool-start-here.png";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="book" className="bg-background py-14 md:py-20 overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Now Live on Skool · 100% Free
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              A Peek Inside
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Psychology Training + Action Practice
            </p>
          </div>

          {/* Layered screenshot composition */}
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                location: "book_section",
                placement: "screenshot_composition",
                destination: SKOOL_URL,
              })
            }
            className="group relative block mx-auto max-w-3xl mb-12 md:mb-16"
            aria-label="Open the LS Diet community on Skool"
          >
            {/* Glow */}
            <div className="absolute -inset-8 rounded-[2rem] bg-accent/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

            {/* Screenshot 1 — Psychology Training (back-left) */}
            <figure className="relative md:absolute md:left-0 md:top-0 md:w-[58%] md:-rotate-[3deg] md:translate-y-2 transition-transform duration-500 group-hover:-rotate-[1deg] group-hover:-translate-y-1">
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-background">
                <img
                  src={skoolStartHere}
                  alt="Psychology training modules inside the LS Diet course"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 md:mt-4 flex items-center gap-2 justify-center md:justify-start md:pl-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent text-[11px] font-extrabold ring-1 ring-accent/40">
                  01
                </span>
                <div className="text-left leading-tight">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                    Psychology Training
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Why you regain · self-paced
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* Screenshot 2 — Action Practice (front-right) */}
            <figure className="relative mt-8 md:mt-0 md:absolute md:right-0 md:top-16 md:w-[62%] md:rotate-[3deg] transition-transform duration-500 group-hover:rotate-[1deg] group-hover:-translate-y-1">
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-background">
                <img
                  src={skoolActionPractice}
                  alt="Action Practice classroom: 40+ short daily video lessons"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 md:mt-4 flex items-center gap-2 justify-center md:justify-end md:pr-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent text-[11px] font-extrabold ring-1 ring-accent/40">
                  02
                </span>
                <div className="text-left leading-tight">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                    Action Practice
                  </p>
                  <p className="text-xs text-muted-foreground">
                    40+ videos · 1 a day · 30 days
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* Spacer to give the absolutely-positioned figures height on md+ */}
            <div className="hidden md:block" style={{ paddingTop: "62%" }} aria-hidden="true" />
          </a>

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
                    label: "START YOUR FREE TRAINING TODAY",
                    destination: SKOOL_URL,
                  })
                }
              >
                JOIN THE COMMUNITY{"\n"}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="mt-3 text-[11px] font-medium text-muted-foreground">
              100% FREE · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
