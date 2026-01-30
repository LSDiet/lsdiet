import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-5 bg-secondary/30">
      <div className="container max-w-3xl mx-auto px-4">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
              <span className="text-sm font-medium text-accent">About Oscar</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-lg text-primary leading-relaxed">
                  Well... this really isn't about me. It's about you.
                </p>
                <p className="text-base text-primary/90 leading-relaxed">
                  Life has enough burdens, don't let weight be another one.
                </p>
              </div>
              
              <p className="text-lg md:text-xl italic text-accent font-medium leading-relaxed border-l-4 border-accent/40 pl-4">
                "Lose the extra weight so you can avoid a future where your choices shrink."
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                But just so you know Oscar isn't an AI — he has a degree in psychology, spent over a year helping clients at a substance abuse centre in Vancouver, and worked a decade as a surgical market data consultant specialising in Endoscopy and Integrated Operating Room Equipment. He shares his low-starch, low-sugar journey through monthly mini-challenges on{" "}
                <a 
                  href="https://www.youtube.com/@WhatAboutWeight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  YouTube (@WhatAboutWeight)
                </a>
                {" "}— where the book's principles come to life.
              </p>
            </div>

            {/* Photo */}
            <div className="md:w-48 flex-shrink-0">
              <img 
                src={oscarPhoto} 
                alt="Oscar Poon, founder of WhatAboutWeight" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
