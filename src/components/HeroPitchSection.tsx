import { useEffect, useState } from "react";
import { Check, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { trackEvent } from "@/lib/analytics";
import heroPhoto from "@/assets/hero-photo.png?w=400;800;1200&format=avif;webp&as=picture";

const benefits = [
  "Lose weight",
  "Prevent weight regain",

  "Build motivation on demand",
  "Identify triggers",
  "Practice daily actions",
  "Lose weight in 2 weeks",
];


export function HeroPitchSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % benefits.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <ResponsivePicture
            src={heroPhoto}
            alt="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Training"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            A proven method to stop{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent animate-pulse-glow">weight regain</span>
            </span>
          </h2>

          <p className="mt-6 text-sm text-foreground md:text-base">In the LS Diet Community, you will:</p>
          <div className="relative mt-3">
            <ul className="flex flex-col gap-1.5">
              {benefits.map((b, i) => {
                const active = i === idx;
                return (
                  <li
                    key={b}
                    className={`relative flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-500 ${
                      active
                        ? "bg-accent/15 ring-1 ring-accent/50 shadow-[0_0_24px_-6px_hsl(var(--accent)/0.55)]"
                        : "bg-transparent ring-1 ring-transparent"
                    }`}
                  >
                    <Check
                      className={`h-5 w-5 flex-shrink-0 transition-colors duration-500 ${
                        active ? "text-accent" : "text-muted-foreground/40"
                      }`}
                    />
                    <span
                      className={`text-base md:text-lg font-semibold transition-colors duration-500 ${
                        active ? "text-accent" : "text-foreground/70"
                      }`}
                    >
                      {b}
                    </span>
                    {active && (
                      <MousePointer2
                        className="pointer-events-none absolute -right-1 top-1/2 h-5 w-5 -translate-y-1/2 text-accent drop-shadow-[0_2px_6px_hsl(var(--accent)/0.6)] animate-fade-in"
                        aria-hidden="true"
                        style={{ transform: "translateY(-50%) rotate(-15deg)" }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>


          <div className="mt-8 flex justify-center md:justify-start">

            <Button variant="accent" size="lg" className="px-8" asChild>
              <a
                href="https://www.skool.com/lsdiet/about"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_click", { location: "pitch", destination: "skool" })}
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
