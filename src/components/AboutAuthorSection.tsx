import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import oscarPhoto from "@/assets/oscar-photo.jpeg?w=200;400;600&format=avif;webp&as=picture";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="section-dark py-14 md:py-20">
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
            {/* Photo */}
            <div className="md:w-48 flex-shrink-0">
              <ResponsivePicture
                src={oscarPhoto}
                alt="Oscar Poon, founder of LS Diet"
                sizes="(min-width: 768px) 192px, 60vw"
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-[hsl(0_0%_85%)] leading-relaxed">
                Oscar Poon is the founder and creator of <strong className="text-foreground">LS Diet</strong>. He
                has lost 80+ lbs three separate times — and each restart taught him that conventional diet advice
                was missing a behavioural-permanence layer. That insight became the Weight Permanence Triangle™ and
                the low-starch, low-sugar lifestyle system that LS Diet teaches today.
              </p>
              <p className="text-[hsl(0_0%_75%)] leading-relaxed text-sm">
                Oscar holds a degree in psychology, spent over a year supporting clients at a substance-abuse centre
                in Vancouver, and worked a decade as a surgical market-data consultant. That mix of behavioural
                psychology and pattern analysis shapes how LS Diet approaches weight regain — not as a food problem,
                but as a system problem.
              </p>

              <blockquote className="text-lg italic text-accent font-medium leading-relaxed border-l-2 border-accent/40 pl-4">
                "Lose the extra weight so you can avoid a future where your choices shrink."
              </blockquote>

              <p className="text-xs text-[hsl(0_0%_55%)] leading-relaxed">
                He shares his low-starch, low-sugar journey through monthly mini-challenges on{" "}
                <a href="https://www.youtube.com/@JoinLSDiet" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  YouTube (@JoinLSDiet)
                </a>
                .{" "}
                <a href="/oscar-poon" className="text-accent hover:underline font-medium">
                  Read Oscar's full story →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
