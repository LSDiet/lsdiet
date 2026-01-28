import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-10 bg-secondary/30">
      <div className="container max-w-3xl mx-auto px-4">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              About Oscar
            </span>
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
              
              <p className="text-base text-primary/80 leading-relaxed">
                But none of that matters as much as what we can figure out together: a path where weight doesn't hold you back from living life to its full potential.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Oscar has a degree in psychology and spent over a year helping clients at a substance abuse centre in Vancouver. He also worked a decade as a surgical market data consultant, specializing in endoscopy and laparoscopy. Today, he shares his low-starch, low-sugar journey through monthly mini-challenges on{" "}
                <a 
                  href="https://youtube.com/@WhatAboutWeight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  YouTube
                </a>.
              </p>
            </div>

            {/* Photo */}
            <div className="md:w-48 flex-shrink-0">
              <img 
                src={oscarPhoto} 
                alt="Oscar" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
