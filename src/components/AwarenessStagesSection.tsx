import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Section 5 — Awareness Stages + Action Practice (curriculum).
 * 6-row numbered list. Routes into pillar ecosystem. No marketing CTA.
 */

type Row = {
  n: string;
  title: string;
  tag?: string;
  desc: string;
  href: string;
};

const awarenessRows: Row[] = [
  {
    n: "01",
    title: "Reality Awareness",
    desc: "Establish your honest baseline — weight, habits, and the gap between who you are and who you want to be.",
    href: "/blog/reality-awareness",
  },
  {
    n: "02",
    title: "Friction Awareness",
    desc: "Recognise the daily resistance points that quietly sabotage progress before you can act on them.",
    href: "/blog/friction-awareness",
  },
  {
    n: "03",
    title: "Pattern Awareness",
    desc: "Examine the how, who, what, when, and why of your eating behaviour to expose the loops you repeat without thinking.",
    href: "/blog/pattern-awareness",
  },
  {
    n: "04",
    title: "Consequence Awareness",
    tag: "PUSH motivation",
    desc: "Clarity on what staying the same will cost you over five, ten, twenty years.",
    href: "/blog/consequence-awareness",
  },
  {
    n: "05",
    title: "Identity Awareness",
    tag: "PULL motivation",
    desc: "Become the person for whom a low-starch, low-sugar lifestyle is simply how they live.",
    href: "/blog/identity-awareness",
  },
];

const practiceRow: Row = {
  n: "06",
  title: "Action Practice",
  tag: "where it gets implemented",
  desc: "Turn awareness into daily reps — the habit layer that makes permanence real.",
  href: "/blog/action-practice",
};

function CurriculumRow({ row, visible, delay }: { row: Row; visible: boolean; delay: number }) {
  return (
    <li
      className={`group relative transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <a
        href={row.href}
        className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr] gap-4 md:gap-6 items-start py-5 md:py-6 px-1 -mx-1 rounded-lg hover:bg-white/[0.03] transition-colors"
      >
        <span
          aria-hidden="true"
          className="relative z-10 block text-3xl md:text-5xl font-black leading-none text-accent/70 group-hover:text-accent transition-colors tabular-nums"
        >
          {row.n}
        </span>
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="text-lg md:text-2xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
              {row.title}
            </h3>
            {row.tag && (
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-accent/80">
                {row.tag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm md:text-base text-[hsl(0_0%_78%)] leading-relaxed">
            {row.desc}
          </p>
        </div>
      </a>
    </li>
  );
}

export function AwarenessStagesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="awareness-stages" className="section-dark py-14 md:py-20">
      <div ref={ref} className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Inside the Triangle
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            5 Stages of Awareness <span className="text-accent">+ Action Practice</span>
          </h2>
          <p className="mt-5 text-[hsl(0_0%_78%)] leading-relaxed text-base md:text-lg">
            A guided sequence. Read them in order — each stage builds on the last, and the sixth
            turns understanding into daily reps.
          </p>
        </div>

        <ol className="relative divide-y divide-white/5">
          {/* Connecting line — desktop only */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-[1.6rem] top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/15 to-transparent"
          />
          {awarenessRows.map((r, i) => (
            <CurriculumRow key={r.n} row={r} visible={isVisible} delay={i * 90} />
          ))}
        </ol>

        {/* Practice layer separator */}
        <div className="mt-2 pt-2 border-t-2 border-accent/30">
          <ol>
            <CurriculumRow row={practiceRow} visible={isVisible} delay={5 * 90} />
          </ol>
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-[hsl(0_0%_78%)] leading-relaxed">
          Continue to{" "}
          <a href="/blog" className="text-accent hover:underline font-medium">
            the full Foundations curriculum
          </a>
          .
        </p>
      </div>
    </section>
  );
}
