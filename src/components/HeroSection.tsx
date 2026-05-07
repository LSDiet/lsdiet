import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";

const pairs = [
  {
    year: "2019",
    before: { src: img201908, weight: "300 lbs" },
    after: { src: img201710, weight: "180 lbs" },
  },
  {
    year: "2022",
    before: { src: img202204, weight: "280 lbs" },
    after: { src: img202012, weight: "200 lbs" },
  },
  {
    year: "2025",
    before: { src: img202405, weight: "300 lbs" },
    after: { src: img202311, weight: "190 lbs" },
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
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/70 sm:text-sm md:mt-3 md:text-base">
            And LS Diet is the only way to stop the{" "}
            <span className="text-accent">weight regain</span>.
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
                    src={pair.before.src}
                    alt={`Before — ${pair.before.weight}`}
                    loading="eager"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
                    {pair.before.weight}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={pair.after.src}
                    alt={`After — ${pair.after.weight}`}
                    loading="eager"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {pair.after.weight}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                  Before
                </span>
                <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent">
                  {pair.year}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                  After
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
