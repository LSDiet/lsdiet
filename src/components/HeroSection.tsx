import img2019a from "@/assets/hero/2019a.png";
import img2019b from "@/assets/hero/2019b.png";
import img2021a from "@/assets/hero/2021a.png";
import img2021b from "@/assets/hero/2021b.png";
import img2024a from "@/assets/hero/2024a.png";
import img2024b from "@/assets/hero/2024b.png";

const rows = [
  { year: "2019", before: img2019a, after: img2019b },
  { year: "2021", before: img2021a, after: img2021b },
  { year: "2024", before: img2024a, after: img2024b },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-6 md:gap-8 md:px-8 md:py-10">
        {/* Headline */}
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            I Lost <span className="text-accent">80+ Lbs</span> Three Times.
          </h1>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/70 sm:text-sm md:mt-3 md:text-base">
            And LS Diet is the only way to stop the{" "}
            <span className="text-accent">weight regain</span>.
          </p>
        </div>

        {/* Photo timeline */}
        <div className="flex flex-col gap-4 md:gap-5">
          {rows.map((row) => (
            <div key={row.year} className="flex items-center gap-3 md:gap-4">
              <div className="w-10 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80 md:w-16 md:text-sm">
                {row.year}
              </div>
              <div className="grid flex-1 grid-cols-2 gap-3 md:gap-4">
                {[row.before, row.after].map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-white/[0.03]"
                  >
                    <img
                      src={src}
                      alt={`Oscar in ${row.year}, ${i === 0 ? "before" : "after"} weight loss`}
                      loading="lazy"
                      className="aspect-[16/10] h-full w-full object-cover transition-[filter] duration-300 hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
