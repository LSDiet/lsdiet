import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AboutAuthorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-10 bg-secondary/30">
      <div className="container max-w-2xl mx-auto px-4">
        <div
          className={`text-center space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-lg text-primary leading-relaxed">
            Well... this really isn't about me. It's about you — life has enough burdens, don't let weight be another one.
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Oscar has a degree in psychology and spent years helping clients at a substance abuse centre in Vancouver. He also worked a decade as a surgical market data consultant, specializing in endoscopy and laparoscopy. Today, he shares his low-starch, low-sugar journey through monthly mini-challenges on{" "}
            <a 
              href="https://youtube.com/@WhatAboutWeight" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              YouTube
            </a>.
          </p>
          
          <p className="text-base text-primary/80 leading-relaxed">
            But none of that matters as much as what we can figure out together: a path where weight doesn't hold you back from living life to its full potential.
          </p>
        </div>
      </div>
    </section>
  );
};
