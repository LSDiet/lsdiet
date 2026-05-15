import img2019a from "@/assets/hero/2019a.png";
import img2019b from "@/assets/hero/2019b.png";
import img2021a from "@/assets/hero/2021a.png";
import img2021b from "@/assets/hero/2021b.png";
import img2024a from "@/assets/hero/2024a.png";
import img2024b from "@/assets/hero/2024b.png";

const pairs = [
  {
    year: "2019",
    before: img2019a, beforeLbs: "300 LBS", beforePos: "object-top",
    after: img2019b, afterLbs: "180 LBS", afterPos: "object-top",
  },
  {
    year: "2022",
    before: img2021a, beforeLbs: "280 LBS", beforePos: "object-right",
    after: img2021b, afterLbs: "200 LBS", afterPos: "object-top",
  },
  {
    year: "2024",
    before: img2024a, beforeLbs: "310 LBS", beforePos: "object-top",
    after: img2024b, afterLbs: "190 LBS", afterPos: "object-top",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-10">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Stop <span className="text-accent">Restarting</span> Weight Loss
            <br />
            with LS Diet
          </h1>
          <p className="mt-6 text-lg font-bold uppercase tracking-tight text-white/90 md:text-xl">
            <span className="text-accent">Low-Starch, Low-Sugar (LS)</span> is the only way to stop the{" "}
            <span className="text-accent">weight regain</span>.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-xs font-medium uppercase tracking-wide text-white/70 sm:text-sm md:text-base">
            I Lost <span className="text-accent">80+ Lbs</span> Three Times.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {pairs.map((pair, idx) => (
            <div
              key={pair.year}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="grid aspect-[4/3] grid-cols-2">
                <div className="relative overflow-hidden">
                  <img
                    src={pair.before}
                    alt={`Oscar Poon in ${pair.year}, weighing ${pair.beforeLbs} before adopting the LS Diet low-starch, low-sugar lifestyle`}
                    loading="eager"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    width={600}
                    height={450}
                    className={`h-full w-full object-cover ${pair.beforePos}`}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-accent backdrop-blur-sm">
                    {pair.beforeLbs}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={pair.after}
                    alt={`Oscar Poon in ${pair.year}, weighing ${pair.afterLbs} after losing weight on LS Diet`}
                    loading="eager"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    width={600}
                    height={450}
                    className={`h-full w-full object-cover ${pair.afterPos}`}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white backdrop-blur-sm">
                    {pair.afterLbs}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Before</span>
                <span className="text-xl font-extrabold text-accent">{pair.year}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">After</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="https://www.skool.com/lsdiet/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] md:text-base"
          >
            JOIN LS DIET (FREE)
          </a>
        </div>
      </div>
    </section>
  );
}
