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
    before: img2024a, beforeLbs: "300 LBS", beforePos: "object-top",
    after: img2024b, afterLbs: "190 LBS", afterPos: "object-top",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-10">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            I Lost <span className="text-accent">80+ Lbs</span> Three Times.
          </h1>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide leading-[1.9] text-white/70 sm:text-sm sm:leading-[1.8] md:mt-3 md:text-base md:leading-relaxed">
            <span className="relative inline-block pb-1">
              <span className="relative z-10 text-accent">Low Starch, Low Sugar (LS) Diet</span>
              <svg
                className="pointer-events-none absolute left-0 right-0 -bottom-3 w-full"
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="lsdiet-brush" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(0 85% 55%)" stopOpacity="0" />
                    <stop offset="20%" stopColor="hsl(0 85% 55%)" stopOpacity="0.95" />
                    <stop offset="80%" stopColor="hsl(0 85% 55%)" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="hsl(0 85% 55%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 10 Q 70 3, 150 9 T 296 8"
                  stroke="url(#lsdiet-brush)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            is the only way to stop the{" "}
            <span className="text-accent">weight regain</span>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {pairs.map((pair) => (
            <div
              key={pair.year}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="grid aspect-[4/3] grid-cols-2">
                <div className="relative overflow-hidden">
                  <img
                    src={pair.before}
                    alt={`Oscar in ${pair.year}, before`}
                    loading="eager"
                    className={`h-full w-full object-cover ${pair.beforePos}`}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-accent backdrop-blur-sm">
                    {pair.beforeLbs}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={pair.after}
                    alt={`Oscar in ${pair.year}, after`}
                    loading="eager"
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
      </div>
    </section>
  );
}
