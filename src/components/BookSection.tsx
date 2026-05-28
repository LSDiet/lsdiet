import { Button } from "@/components/ui/button";
import { Check, Compass, Dumbbell, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import skoolTracks from "@/assets/skool-course-tracks.png";
import skoolActionPractice from "@/assets/skool-action-practice.png";

const features = [
  "All lessons are short videos, no reading required",
  "3 tracks: Start Here, Action Practice, and Tools",
  "Weekly live webinar hosted by Oscar",
  "A community of members training the same habits",
  "100% free to join",
];

const tracks = [
  {
    icon: Compass,
    title: "Start Here",
    desc: "Why weight regain happens and how LS Diet helps you stop regaining weight.",
  },
  {
    icon: Dumbbell,
    title: "Action Practice",
    desc: "Train the daily actions and mental patterns that make LS Diet automatic.",
  },
  {
    icon: BookOpen,
    title: "Tools",
    desc: "eBooks and blogs published by Oscar to deepen the framework.",
  },
];

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
              The <span className="text-accent animate-pulse-glow inline-block">Free</span> LS Diet Course
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
              Build your push and pull motivations, replace old habits with daily actions, and see results in two weeks!
            </p>
          </div>

          {/* Tracks screenshot */}
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
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

          {/* Track blurbs */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Inside Action Practice */}
          <div className="mb-12">
            <div className="text-center mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                Inside Action Practice
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                25+ practice lessons you can start today for free
              </h3>
            </div>
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden border border-border shadow-2xl hover:border-accent/50 transition-colors group"
            >
              <img
                src={skoolActionPractice}
                alt="Action Practice classroom on Skool with daily habit lessons"
                className="w-full h-auto block group-hover:scale-[1.005] transition-transform duration-500"
                loading="lazy"
              />
            </a>
          </div>

          {/* Features list (centered) */}
          <ul className="max-w-xl mx-auto space-y-3 mb-10">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-[hsl(0_0%_85%)] text-sm md:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="text-center">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                Join LS Diet
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
