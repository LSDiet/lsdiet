import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import before2024 from "@/assets/hero/2024a.png?w=300;600&format=avif;webp&as=picture";
import after2024 from "@/assets/hero/2024b.png?w=300;600&format=avif;webp&as=picture";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="bg-background py-14 md:py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Founder
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              About <span className="text-accent">Oscar Poon</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Before / After transformation (2024) */}
            <div className="md:w-56 flex-shrink-0 w-full max-w-xs">
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden border border-border">
                <div className="relative aspect-[3/4] bg-white/[0.03]">
                  <ResponsivePicture
                    src={before2024}
                    alt="Oscar Poon at 310 lbs in 2024 before losing weight on LS Diet"
                    sizes="(min-width: 768px) 112px, 40vw"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-accent">
                    310 LBS
                  </span>
                </div>
                <div className="relative aspect-[3/4] bg-white/[0.03]">
                  <ResponsivePicture
                    src={after2024}
                    alt="Oscar Poon at 190 lbs in 2024 after losing weight on LS Diet"
                    sizes="(min-width: 768px) 112px, 40vw"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white">
                    190 LBS
                  </span>
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                2024 · Before → After
              </p>
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-muted-foreground leading-relaxed text-justify">
                Hello! I'm Oscar, the founder of <strong className="text-foreground">LS Diet</strong> and the creator of the Weight Permanence Training™ (WPT). When I lost weight for the third time, I began reflecting on how I could make this my final transformation. The solution turned out to be quite straightforward: emotional priority.
              </p>
              <p className="text-muted-foreground leading-relaxed text-justify">
                Join the LS Diet Community, and I'll help you move from simply wanting to lose weight to being emotionally and physically ready to do whatever it takes to reach your goal and keep it.
              </p>

              <blockquote className="italic text-accent font-medium leading-relaxed border-l-2 border-accent/40 pl-4 text-center text-xl">
                Build a future that is {"\n"}not limited by your weight.
              </blockquote>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
