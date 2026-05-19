import skoolTracks from "@/assets/skool-course-tracks.png";
import skoolActionPractice from "@/assets/skool-action-practice.png";

const chips = ["Daily prompts", "Awareness reps", "Habit swaps", "Progress tracking"];

export function WhatPracticeLooksLikeSection() {
  return (
    <section id="what-practice-looks-like" className="section-dark py-14 md:py-20">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            What Practice Looks Like
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            This is what <span className="text-accent">daily practice</span> looks like.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <img
              src={skoolTracks}
              alt="LS Diet course tracks inside Skool — Start Here, Action Practice, and Tools"
              loading="lazy"
              className="block w-full h-auto"
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <img
              src={skoolActionPractice}
              alt="Sample Action Practice lesson inside the LS Diet Skool community"
              loading="lazy"
              className="block w-full h-auto"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {chips.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-wide text-accent"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.skool.com/lsdiet/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] md:text-base"
          >
            Join LS Diet
          </a>
        </div>
      </div>
    </section>
  );
}
