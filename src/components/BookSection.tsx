import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";
import skoolTracks from "@/assets/skool-course-tracks.png";
import skoolActionPractice from "@/assets/skool-action-practice.png";
import skoolStartHere from "@/assets/skool-start-here.png";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="book" className="bg-background py-14 md:py-20">
      <div className="container max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Now Live on Skool
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4">
              The LS Diet Course
            </h2>
            <ul className="max-w-2xl mx-auto text-foreground text-base md:text-lg leading-relaxed text-left inline-block space-y-1.5">
              <li>✓ Identify the patterns and triggers</li>
              <li>✓ Discover meaningful reasons to change</li>
              <li>✓ Build motivation on demand</li>
              <li>✓ See results in 2 weeks</li>
            </ul>
          </div>

          {/* Tracks screenshot */}
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                location: "book_section",
                placement: "tracks_image",
                destination: SKOOL_URL,
              })
            }
            className="block relative rounded-2xl overflow-hidden border border-border shadow-2xl hover:border-accent/50 transition-colors mb-8 group"
          >
            <div className="absolute -inset-4 bg-accent/10 blur-2xl -z-10" />
            <img
              src={skoolTracks}
              alt="LS Diet course on Skool with three tracks: Start Here, Action Practice, and Tools"
              className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500"
              loading="lazy"
            />
          </a>

          {/* Inside Start Here */}
          <div className="mb-12">
            <div className="text-center mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                Inside Start Here
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Intervention to weight regain, and build motivation on demand
              </h3>
            </div>
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "book_section",
                  placement: "start_here_image",
                  destination: SKOOL_URL,
                })
              }
            className="block relative rounded-2xl overflow-hidden border border-border shadow-2xl hover:border-accent/50 transition-colors group mx-auto w-[60%] md:w-full"
          >
            <img
              src={skoolStartHere}
              alt="Start Here module on Skool with lessons on the problem and the foundation"
              className="w-full h-auto block group-hover:scale-[1.005] transition-transform duration-500"
              loading="lazy"
            />
          </a>
          </div>

          {/* Inside Action Practice */}
          <div className="mb-12">
            <div className="text-center mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                Inside Action Practice
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                30+ Video-based practice lessons you can start today
              </h3>
            </div>
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "book_section",
                  placement: "action_practice_image",
                  destination: SKOOL_URL,
                })
              }
            className="block relative rounded-2xl overflow-hidden border border-border shadow-2xl hover:border-accent/50 transition-colors group mx-auto w-[60%] md:w-full"
          >
            <img
              src={skoolActionPractice}
              alt="Action Practice classroom on Skool with daily habit lessons"
              className="w-full h-auto block group-hover:scale-[1.005] transition-transform duration-500"
              loading="lazy"
            />
          </a>
          </div>


          {/* CTA */}
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
                Join LS Diet Community
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
