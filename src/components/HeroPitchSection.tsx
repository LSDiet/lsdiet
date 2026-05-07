import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero-photo.png";

const bullets = [
  { text: "How to lose 5–7 lbs per month ", strong: "consistently" },
  { text: "How to build ", strong: "urgency to lose weight" },
  { text: "How to ", strong: "automate weight loss behaviour" },
  { text: "How to adopt a ", strong: "Low Starch, Low Sugar lifestyle" },
  { text: "See results in 2 weeks — ", strong: "for free!" },
];

export function HeroPitchSection() {
  return (
    <section className="bg-[#0a0a0a] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <img
            src={heroPhoto}
            alt="Oscar Poon"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            I Lost <span className="text-accent">80+ Lbs.</span>
            <br />
            <span className="text-accent">Three Times.</span>
          </h2>
          <p className="mt-4 text-sm text-white/70 md:text-base">
            Now I teach people how to end{" "}
            <span className="relative">
              weight cycling
              <span className="absolute left-0 right-0 top-1/2 h-[2px] -rotate-6 bg-accent" />
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
                  <span className="font-semibold text-accent">{b.strong}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a href="https://www.skool.com/lsdiet" target="_blank" rel="noopener noreferrer">
                Join LS Diet Course
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
