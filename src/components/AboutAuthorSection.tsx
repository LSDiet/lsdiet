import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="section-dark py-14 md:py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              About the Author
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Photo */}
            <div className="md:w-48 flex-shrink-0">
              <img
                src={oscarPhoto}
                alt="Oscar Poon, founder of WhatAboutWeight"
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-lg text-[hsl(0_0%_90%)] leading-relaxed">
                Well... this really isn't about me. It's about you.
              </p>
              <p className="text-[hsl(0_0%_70%)] leading-relaxed">
                Life has enough burdens, don't let weight be another one.
              </p>

              <blockquote className="text-lg italic text-accent font-medium leading-relaxed border-l-2 border-accent/40 pl-4">
                "Lose the extra weight so you can avoid a future where your choices shrink."
              </blockquote>

              <p className="text-xs text-[hsl(0_0%_50%)] leading-relaxed">
                Oscar has a degree in psychology, spent over a year helping clients at a substance abuse centre in Vancouver, and worked a decade as a surgical market data consultant. He shares his low-starch, low-sugar journey through monthly mini-challenges on{" "}
                <a href="https://www.youtube.com/@WhatAboutWeight" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  YouTube (@WhatAboutWeight)
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
