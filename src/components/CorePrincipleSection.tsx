const triggers = [
  "Stress takes over",
  "Old habits return",
  "Motivation fades",
  "Emotional eating comes back",
  "Travel and holidays disrupt routine",
  "Life gets busy again",
];

export function CorePrincipleSection() {
  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Restart Cycle
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            Why People <span className="text-accent">Restart</span> Weight Loss
          </h2>
        </div>

        <ul className="space-y-2.5 md:space-y-3">
          {triggers.map((t) => (
            <li
              key={t}
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3.5 md:px-6 md:py-4"
            >
              <span className="text-accent text-xl md:text-2xl" aria-hidden="true">→</span>
              <span className="text-base md:text-lg font-semibold text-foreground">{t}</span>
            </li>
          ))}
        </ul>

        <p className="text-center mt-10">
          <a
            href="/blog/why-people-regain-weight-after-dieting"
            className="text-accent hover:underline font-medium text-base"
          >
            See why people regain weight →
          </a>
        </p>
      </div>
    </section>
  );
}
