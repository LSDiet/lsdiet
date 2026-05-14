import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero-photo.png";

const bullets = [
  { text: "How to lose 5–7 lbs per month ", strong: "consistently" },
  { text: "How to build ", strong: "urgency to lose weight" },
  { text: "How to ", strong: "automate weight loss behaviour" },
  { text: "Adopt a ", strong: "Low Starch, Low Sugar lifestyle" },
  { text: "I don't teach ", strong: "exercise" },
  { text: "See results in ", strong: "2 weeks", animateStrong: true },
];

export function HeroPitchSection() {
  return (
    <section className="bg-[#0a0a0a] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <img
            src={heroPhoto}
            alt="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Triangle"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            THE PROBLEM ISN'T LOSING WEIGHT.
            <br />
            IT'S STAYING{" "}
            <span className="relative inline-block">
              <span className="relative z-10">CONSISTENT</span>
              <svg
                className="pointer-events-none absolute left-0 right-0 -bottom-2 w-full"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14 Q 60 4, 130 12 T 296 10"
                  stroke="hsl(0 85% 55%)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
              </svg>
            </span>
            .
          </h2>
          <p className="mt-4 text-sm text-white/70 md:text-base">
            Now I teach people how to end{" "}
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
            .
          </p>

          <p className="mt-6 text-sm text-white/80 md:text-base">You'll learn:</p>
          <ul className="mt-3 space-y-2.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="text-sm text-white/85 md:text-base">
                  {b.text}
                  <span className={`font-semibold text-accent ${b.animateStrong ? "animate-two-weeks" : ""}`}>{b.strong}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a href="https://www.skool.com/lsdiet" target="_blank" rel="noopener noreferrer">
                Join FREE LSDiet Course
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
