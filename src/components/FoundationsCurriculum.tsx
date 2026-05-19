// Curriculum-style list of LS Diet Foundations.
// Title-dominant horizontal rows, manual order, with placeholder rows for
// unbuilt pillars so the framework reads as complete from day one.

import { ArrowRight } from "lucide-react";
import { FOUNDATIONS } from "@/content/foundations";

interface CurriculumRow {
  order: number;
  title: string;
  excerpt: string;
  slug: string | null; // null = coming soon
  thumb: string | null;
}

// Placeholders for unbuilt pillars. Slugs match the planned URLs so we can
// flip them on as the content lands.
const PLACEHOLDERS: CurriculumRow[] = [
  {
    order: 3,
    title: "Weight Permanence Triangle™",
    excerpt: "The three forces that decide whether weight loss sticks.",
    slug: null,
    thumb: null,
  },
  {
    order: 4,
    title: "The 5 Awareness Stages",
    excerpt: "How awareness moves you from restarting to permanence.",
    slug: null,
    thumb: null,
  },
  {
    order: 5,
    title: "Action Practice Examples",
    excerpt: "Concrete daily practices that turn intent into identity.",
    slug: null,
    thumb: null,
  },
];

function buildRows(): CurriculumRow[] {
  const real: CurriculumRow[] = FOUNDATIONS.map((f) => ({
    order: f.meta.order,
    title: f.meta.listTitle ?? f.meta.title,
    excerpt: f.meta.excerpt,
    slug: f.meta.slug,
    thumb: f.meta.featuredImage.src,
  }));
  const realOrders = new Set(real.map((r) => r.order));
  const merged = [...real, ...PLACEHOLDERS.filter((p) => !realOrders.has(p.order))];
  merged.sort((a, b) => a.order - b.order);
  return merged;
}

export function FoundationsCurriculum() {
  const rows = buildRows();

  return (
    <section>
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
          Start Here
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-2">
          LS Diet Framework
        </h2>
        <p className="text-sm md:text-base text-zinc-700">
          Read these in order. Each one builds on the last.
        </p>
      </div>

      <ol className="border-t border-border">
        {rows.map((row) => {
          const num = String(row.order).padStart(2, "0");
          const isLive = !!row.slug;

          const inner = (
            <>
              <span className="w-8 md:w-10 shrink-0 text-lg md:text-2xl font-extrabold text-accent tabular-nums">
                {num}
              </span>
              {row.thumb ? (
                <img
                  src={row.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-md object-cover border border-border"
                />
              ) : (
                <div className="h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-md border border-dashed border-border bg-muted/40" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base md:text-xl font-extrabold uppercase tracking-tight text-foreground leading-snug">
                    {row.title}
                  </h3>
                  {!isLive && (
                    <span className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="hidden md:block text-sm text-zinc-600 line-clamp-1 mt-0.5">
                  {row.excerpt}
                </p>
              </div>
              {isLive && (
                <ArrowRight
                  className="hidden sm:block h-5 w-5 shrink-0 text-zinc-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
                  aria-hidden
                />
              )}
            </>
          );

          const rowClass =
            "group flex items-center gap-3 md:gap-4 py-3 md:py-4 border-b border-border";

          return (
            <li key={row.order}>
              {isLive ? (
                <a href={`/blog/${row.slug}`} className={`${rowClass} hover:bg-accent/5 transition-colors`}>
                  {inner}
                </a>
              ) : (
                <div className={`${rowClass} opacity-60 cursor-default`}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
