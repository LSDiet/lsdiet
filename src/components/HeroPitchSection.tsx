import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { trackEvent } from "@/lib/analytics";
import heroPhoto from "@/assets/hero-photo.png?w=400;800;1200&format=avif;webp&as=picture";

const bullets = [
  { text: "How to ", strong: "stop regaining the same weight" },
  { text: "How to build ", strong: "PUSH and PULL motivation" },
  { text: "How to ", strong: "automate weight regain prevention" },
  { text: "Adopt a ", strong: "Low-Starch, Low-Sugar lifestyle" },
  { text: "Train your brain for ", strong: "weight permanence" },
  { text: "See results in ", strong: "2 weeks", animateStrong: true },
];

export function HeroPitchSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <ResponsivePicture
            src={heroPhoto}
            alt="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Triangle"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            I built{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent animate-pulse-glow">LS Diet</span>
            </span>{" "}
            to stop weight regain
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">

            Let's end{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span>weight cycling</span>
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="2" y1="34" x2="98" y2="6"
                  stroke="hsl(0 85% 55%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="140"
                  className="animate-x-stroke-1"
                />
                <line
                  x1="2" y1="6" x2="98" y2="34"
                  stroke="hsl(0 85% 55%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="140"
                  className="animate-x-stroke-2"
                />
              </svg>
            </span>
            {" "}together!
          </p>

          <p className="mt-6 text-sm text-foreground md:text-base">Join the free LS Diet class to learn:</p>
          <ul className="mt-3 space-y-2.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="text-sm text-foreground/90 md:text-base">
                  {b.text}
                  <span className={`font-semibold text-accent ${b.animateStrong ? "animate-two-weeks" : ""}`}>{b.strong}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center md:justify-start">

            <Button variant="accent" size="lg" className="px-8" asChild>
              <a
                href="https://www.skool.com/lsdiet/about"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_click", { location: "pitch", destination: "skool" })}
              >
                Join LS Diet
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
