import { BookOpen, Syringe, Lightbulb, Sprout, Newspaper, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const hubLinks = [
  { label: "The Root of the Weight Problem", href: "/problem", Icon: BookOpen },
  { label: "GLP-1 Rebound Breakdown", href: "/glp-1-rebound-analysis", Icon: Syringe },
  { label: "The Permanence Solution", href: "/weight-permanence-training", Icon: Lightbulb },
  { label: "How LS Diet Works", href: "/what-is-ls-diet", Icon: Sprout },
  { label: "Blog & Data", href: "/blog", Icon: Newspaper },
  { label: "60-Sec Weight Regain Profile Quiz", href: "/quiz", Icon: Clock },
];

export function SkepticHubSection() {
  return (
    <section className="bg-[hsl(0_0%_4%)] py-10 md:py-14">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(0_0%_50%)]">
          Want to review the science first?
        </p>
        <p className="mt-1.5 text-sm text-[hsl(0_0%_70%)]">
          Explore our complete framework:
        </p>

        <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {hubLinks.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              onClick={() =>
                trackEvent("cta_click", {
                  location: "skeptic_hub",
                  placement: "authority_grid",
                  label,
                  destination: href,
                })
              }
              className="flex items-center gap-3 rounded-xl border border-[hsl(0_0%_16%)] bg-[hsl(0_0%_7%)] px-4 py-4 text-left transition-colors hover:border-[hsl(0_0%_26%)] hover:bg-[hsl(0_0%_10%)]"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-xs font-semibold leading-snug text-[hsl(0_0%_85%)] sm:text-sm">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
