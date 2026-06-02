import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import oscarPhoto from "@/assets/oscar-photo.jpeg?w=200;400;600&format=avif;webp&as=picture";

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
            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-muted-foreground leading-relaxed">
                Hello! I'm Oscar, the founder of <strong className="text-foreground">LS Diet</strong> and the creator of the Weight Permanence Training™ (WPT). When I lost weight for the third time, I began reflecting on how I could make this my final transformation. The solution turned out to be quite simple: emotional priority.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Join the LS Diet Community, and I'll help you move from simply wanting to lose weight to being emotionally and physically ready to do whatever it takes to reach your goal and keep it.
              </p>

              <blockquote className="text-lg italic text-accent font-medium leading-relaxed border-l-2 border-accent/40 pl-4">
                "Build a future where your choices are not limited by your weight."
              </blockquote>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
