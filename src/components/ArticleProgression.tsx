// End-of-article progression for supporting articles. Renders the
// behavioural pathway as a structured 4-row list:
//   Awareness  →  Implementation  →  Identity  →  Support
// followed by a varied CTA to Skool. Minimal styling — not a salesy card.

import type { Pathway } from "@/lib/behaviouralPathway";
import { CTA_URL, getArticleCta } from "@/lib/articleCta";

interface Props {
  pathway: Pathway;
  slug: string;
}

const STEPS: Array<{ key: keyof Pathway; label: string }> = [
  { key: "awareness", label: "Awareness" },
  { key: "implementation", label: "Implementation" },
  { key: "identity", label: "Identity" },
  { key: "support", label: "Support" },
];

export function ArticleProgression({ pathway, slug }: Props) {
  const cta = getArticleCta(slug);
  return (
    <section className="mt-16 pt-8 border-t border-zinc-200">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
        Continue the LS Diet Framework
      </p>
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900 mb-6">
        Your next steps inside the system
      </h2>

      <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
        {STEPS.map(({ key, label }) => {
          const step = pathway[key];
          if (!step) return null;
          return (
            <li key={key}>
              <a
                href={step.href}
                className="group flex items-baseline gap-4 py-4 hover:bg-accent/5 -mx-2 px-2 rounded-sm transition-colors"
              >
                <span className="shrink-0 w-28 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 group-hover:text-accent transition-colors">
                  {label}
                </span>
                <span className="flex-1 text-[15px] md:text-base font-medium text-zinc-900 group-hover:text-accent transition-colors">
                  {step.title}
                </span>
                <span className="text-zinc-400 group-hover:text-accent transition-colors">→</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-base font-bold text-zinc-900 hover:text-accent transition-colors border-b-2 border-accent pb-0.5"
        >
          {cta} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
