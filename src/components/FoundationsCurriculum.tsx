// Curriculum-style list of LS Diet Foundations.
// Title-dominant horizontal rows, manual order. Excerpt is one line by
// default and smoothly expands on hover/focus (pure CSS grid-rows trick —
// no JS, animates cleanly to natural content height).
//
// WPT is the master framework pillar; its 6 sub-pillars (5 awareness stages
// + Action Practice) render as a nested list beneath it.

import { ArrowRight } from "lucide-react";
import { FOUNDATIONS } from "@/content/foundations";

interface SubRow {
  label: string;     // e.g. "3.1"
  title: string;
  slug: string | null;
}

interface CurriculumRow {
  order: number;
  title: string;
  excerpt: string;
  slug: string | null; // null = coming soon
  thumb: string | null;
  children?: SubRow[];
}

// Placeholders for unbuilt pillars. Slugs are pre-assigned so we can flip
// them on as content lands.
const PLACEHOLDERS: CurriculumRow[] = [
  {
    order: 3,
    title: "Weight Permanence Triangle",
    excerpt:
      "The master framework. Three forces — awareness, practice, and identity — that decide whether weight loss sticks for good.",
    slug: null, // master pillar, coming soon
    thumb: null,
    children: [
      { label: "3.1", title: "Reality Awareness", slug: null },
      { label: "3.2", title: "Friction Awareness", slug: null },
      { label: "3.3", title: "Pattern Awareness", slug: null },
      { label: "3.4", title: "Consequence Awareness", slug: null },
      { label: "3.5", title: "Identity Awareness", slug: null },
      { label: "3.6", title: "Action Practice", slug: null },
    ],
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
                {/* Smooth one-line → full hover expand using grid-rows trick. */}
                <div
                  className="grid grid-rows-[1.4rem] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out mt-0.5"
                >
                  <p className="text-sm text-zinc-600 leading-snug overflow-hidden">
                    {row.excerpt}
                  </p>
                </div>
              </div>
              {isLive && (
                <ArrowRight
                  className="hidden sm:block h-5 w-5 shrink-0 self-start mt-2 text-zinc-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
                  aria-hidden
                />
              )}
            </>
          );

          const rowClass =
            "group flex items-start gap-3 md:gap-4 py-3 md:py-4 transition-colors";

          return (
            <li key={row.order} className="border-b border-border">
              {isLive ? (
                <a
                  href={`/blog/${row.slug}`}
                  className={`${rowClass} hover:bg-accent/5`}
                >
                  {inner}
                </a>
              ) : (
                <div className={`${rowClass} opacity-70`}>{inner}</div>
              )}

              {row.children && row.children.length > 0 && (
                <ul className="pl-10 md:pl-16 pb-2 border-l border-dashed border-border/60 ml-4 md:ml-5">
                  {row.children.map((child) => {
                    const childLive = !!child.slug;
                    const childInner = (
                      <>
                        <span className="text-xs md:text-sm font-bold text-accent/70 tabular-nums shrink-0 w-8">
                          {child.label}
                        </span>
                        <span className="text-sm md:text-base font-bold uppercase tracking-tight text-foreground/90">
                          {child.title}
                        </span>
                        {!childLive && (
                          <span className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">
                            Coming soon
                          </span>
                        )}
                      </>
                    );
                    const childClass =
                      "flex items-center gap-2 md:gap-3 py-1.5 md:py-2";
                    return (
                      <li key={child.label}>
                        {childLive ? (
                          <a
                            href={`/blog/${child.slug}`}
                            className={`${childClass} group hover:text-accent transition-colors`}
                          >
                            {childInner}
                          </a>
                        ) : (
                          <div className={`${childClass} opacity-60`}>{childInner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
