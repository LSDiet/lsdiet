import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const coursePoints = [
  { text: "How to lose 5–7 lbs per month ", bold: "consistently" },
  { text: "How to build ", bold: "urgency to lose weight" },
  { text: "How to ", bold: "automate weight loss behaviour" },
  { text: "How to adopt a ", bold: "Low Starch, Low Sugar lifestyle" },
  { text: "See results in 2 weeks — ", bold: "for free!" },
];

export function CourseCTASection() {
  return (
    <section className="section-dark py-20 md:py-28">
      <div className="container mx-auto max-w-2xl px-5 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          The Free 7-Day Course
        </p>
        <h2 className="mb-8 text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
          You'll learn:
        </h2>

        <ul className="mx-auto mb-10 inline-block space-y-2 text-left">
          {coursePoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-snug text-muted-foreground md:text-base"
            >
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <span>
                {point.text}
                {point.bold && <span className="font-bold text-accent">{point.bold}</span>}
              </span>
            </li>
          ))}
        </ul>

        <Button variant="accent" size="lg" className="px-10" asChild>
          <a
            href="https://www.skool.com/lsdiet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join LS Diet Course
          </a>
        </Button>
      </div>
    </section>
  );
}
