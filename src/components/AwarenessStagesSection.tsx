import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stages = [
  {
    title: "Reality Awareness",
    body: "Establish your honest baseline — weight, habits, and the gap between who you are and who you want to be.",
  },
  {
    title: "Friction Awareness",
    body: "Recognise the daily resistance points that quietly sabotage progress before you can act on them.",
  },
  {
    title: "Pattern Awareness",
    body: "Examine the how, who, what, when, and why of your eating behaviour to expose the loops you repeat without thinking.",
  },
  {
    title: "Consequence Awareness",
    body: "The root of push motivation — clarity on what staying the same will cost you over five, ten, twenty years.",
    accent: "push",
  },
  {
    title: "Identity Awareness",
    body: "The root of pull motivation — becoming the person for whom LS Diet is simply how they live.",
    accent: "pull",
  },
];

function StageCard({
  index,
  title,
  body,
  accent,
  visible,
}: {
  index: number;
  title: string;
  body: string;
  accent?: string;
  visible: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 md:p-7 transition-all duration-700 ease-out hover:border-accent/40 hover:from-accent/[0.06] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${index * 110}ms` : "0ms" }}
    >
      {/* Giant watermark numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-2 select-none text-[7rem] md:text-[9rem] font-black leading-none text-accent/10 tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:text-accent/20"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Accent bar */}
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          Stage {index + 1}
        </span>
      </div>

      <h3 className="relative text-xl md:text-2xl font-extrabold uppercase tracking-tight text-foreground mb-2">
        {title}
      </h3>

      {accent && (
        <p className="relative mb-2 text-[11px] font-semibold uppercase tracking-widest text-accent/80">
          {accent === "push" ? "Push Motivation" : "Pull Motivation"}
        </p>
      )}

      <p className="relative text-[hsl(0_0%_82%)] leading-relaxed text-sm md:text-base">
        {body}
      </p>
    </article>
  );
}

export function AwarenessStagesSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="awareness-stages" className="section-dark py-14 md:py-20">
      <div ref={ref} className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Inside Awareness
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            The 5 <span className="text-accent">Awareness Stages</span>
          </h2>
          <p className="mt-5 text-[hsl(0_0%_78%)] leading-relaxed text-base md:text-lg">
            Awareness is the first vertex of the Weight Permanence Triangle™ inside LS Diet. It moves through five
            distinct stages that build the clarity making a low-starch, low-sugar lifestyle feel like an obvious
            choice rather than a daily fight.
          </p>
        </div>

        {/* First three: 3-column grid */}
        <div className="grid gap-4 md:gap-5 md:grid-cols-3 mb-4 md:mb-5">
          {stages.slice(0, 3).map((s, i) => (
            <StageCard key={s.title} index={i} {...s} visible={isVisible} />
          ))}
        </div>

        {/* Last two (motivation roots): 2-column highlighted row */}
        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {stages.slice(3).map((s, i) => (
            <StageCard key={s.title} index={i + 3} {...s} visible={isVisible} />
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center space-y-4 text-[hsl(0_0%_78%)] leading-relaxed text-base md:text-lg">
          <p>
            Together, push and pull motivation produce behavioural permanence — the difference between losing
            weight once and never restarting again.
          </p>
          <p>
            <a href="/awareness-stages" className="text-accent hover:underline font-medium">
              Explore the 5 Awareness Stages in depth →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
