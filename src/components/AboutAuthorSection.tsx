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
                Hi, I'm Oscar, the founder of <strong className="text-foreground">LS Diet</strong> and creator of the
                Weight Permanence Triangle™ (WPT). LS Diet is really about you, not me. But just so you know I'm not
                AI, I have a degree in psychology, spent time supporting people at a substance-abuse center, and
                worked for 10 years as a surgical market data consultant in Vancouver. I love studying the human mind
                and analyzing behaviour patterns.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I tried to lose weight for the third time, I asked myself, "How can I want this badly enough so I
                never have to repeat the cycle?" The answer was: emotional priority. When you want to lose weight
                enough, you'll do everything to reach your goal and keep it. It's easy to "just-do-it" once, but can
                you keep doing it even after you reach the goal? Join the community, and I'll show you how to lose
                weight and make it permanent.
              </p>

              <blockquote className="text-lg italic text-accent font-medium leading-relaxed border-l-2 border-accent/40 pl-4">
                "Lose the weight so you'll have options while you still can."
              </blockquote>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
