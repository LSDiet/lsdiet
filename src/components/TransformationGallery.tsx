import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pairs = [
  {
    year: "2019",
    before: { src: img201908, weight: "300 lbs" },
    after: { src: img201710, weight: "180 lbs", objectPos: "object-center" },
  },
  {
    year: "2022",
    before: { src: img202204, weight: "280 lbs" },
    after: { src: img202311, weight: "190 lbs" },
  },
  {
    year: "2024",
    before: { src: img202405, weight: "300 lbs" },
    after: { src: img202012, weight: "200 lbs" },
  },
];

export function TransformationGallery() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Transformation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            See the <span className="text-accent">Results</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid gap-6 md:grid-cols-3 max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {pairs.map((pair, i) => (
            <div
              key={pair.year}
              className="rounded-2xl border border-border/50 bg-background/70 overflow-hidden backdrop-blur-sm"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="grid grid-cols-2 aspect-[4/3]">
                <div className="relative overflow-hidden">
                  <img
                    src={pair.before.src}
                    alt={`Before — ${pair.before.weight}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_15%] scale-[1.03]"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
                    {pair.before.weight}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={pair.after.src}
                    alt={`After — ${pair.after.weight}`}
                    loading="lazy"
                    className={`h-full w-full object-cover ${pair.after.objectPos || "object-[center_15%]"} scale-[1.03]`}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                    {pair.after.weight}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Before</span>
                <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent">{pair.year}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">After</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
