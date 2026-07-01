import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Users, ChevronRight, Sparkles } from "lucide-react";

import regainProfiles from "@/assets/weight-regain-profiles-banner.webp";
import heroCoupleVideo from "@/assets/hero-videos/hero-couple.mp4";
import heroPushupsVideo from "@/assets/hero-videos/hero-pushups.mp4";
import heroSweetsVideo from "@/assets/hero-videos/hero-sweets.mp4";

const PUBLISHED = "2026-06-30T12:00:00+00:00";
const UPDATED = "2026-07-01T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/problem";
const FORK_HEADLINE = "What Happens Next Is Up to You.";

const cycleWords = ["Loss", "Regain", "Rebound", "Restart"];

function RotatingCycleWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % cycleWords.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-top text-accent">
      <span className="invisible">Rebound</span>
      {cycleWords.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`absolute left-0 top-0 w-full transition-all duration-500 ease-in-out ${
            i === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {word}
        </span>
      ))}
      <span className="sr-only">Weight loss, regain, rebound, and restart.</span>
    </span>
  );
}

const heroVideos = [heroCoupleVideo, heroPushupsVideo, heroSweetsVideo];

function HeroVideoBackground() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroVideos.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 z-0">
      {heroVideos.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "none"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/45 to-primary/90" />
    </div>
  );
}

function LineChart({ d, viewBox = "0 0 200 84", dotCx, dotCy, dotColor, isVisible, label }: {
  d: string;
  viewBox?: string;
  dotCx: number;
  dotCy: number;
  dotColor: string;
  isVisible: boolean;
  label: string;
}) {
  return (
    <svg viewBox={viewBox} className="w-full h-auto block overflow-visible" role="img" aria-label={label}>
      <line x1="8" y1="66" x2="192" y2="66" stroke="hsl(var(--border))" strokeWidth="1" />
      <path
        d={d}
        fill="none"
        stroke={dotColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: isVisible ? 0 : 1,
          transition: "stroke-dashoffset 1.3s ease",
        }}
      />
      <circle
        cx={dotCx}
        cy={dotCy}
        r="4.5"
        fill={dotColor}
        className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: isVisible ? "1200ms" : "0ms" }}
      />
    </svg>
  );
}

const profiles = [
  { slug: "motivation-chaser", name: "Motivation Chaser", tagline: "Starts strong. Loses steam. Restarts. Repeat." },
  { slug: "overwhelmed-beginner", name: "Overwhelmed Beginner", tagline: "Too much advice. Zero clarity. Stuck in research mode." },
  { slug: "restarter", name: "Restarter", tagline: "Leaves before results show up. Every time." },
  { slug: "stress-eater", name: "Stress Eater", tagline: "Food has a second job, and it's not nutrition." },
  { slug: "weight-cycler", name: "Weight Cycler", tagline: "Loses weight. Gains it back. Loses it again." },
];

export default function ProblemPage() {
  const wall = useScrollAnimation(0.3);
  const trap = useScrollAnimation(0.3);
  const cliff = useScrollAnimation(0.3);
  const comparison = useScrollAnimation(0.2);

  const [mergePhase, setMergePhase] = useState(0);
  const mergeTriggered = useRef(false);
  const mergeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mergeSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !mergeTriggered.current) {
            mergeTriggered.current = true;
            setMergePhase(0);
            setTimeout(() => setMergePhase(1), 300);
            setTimeout(() => setMergePhase(2), 1400);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Why You Keep Regaining Weight | The Real Problem, Explained</title>
        <meta
          name="description"
          content="The plateau, the yo-yo, the post-GLP-1 rebound. Three different ways the weight comes back, and one underlying problem behind all of them."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Why You Keep Regaining Weight" />
        <meta property="og:description" content="Three ways it goes wrong, and the pattern behind all of them." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Why You Keep Regaining Weight",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: CANONICAL,
        })}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "The Problem", url: "/problem" }]} />

      <main data-route-root>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground rounded-b-[2.5rem] shadow-xl relative overflow-hidden pt-4 pb-14 px-4">
          <HeroVideoBackground />
          <div className="max-w-md mx-auto relative z-10 text-center">
            <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold tracking-wider text-accent mb-6 uppercase border border-white/10">
              The Problem · Why the Weight Comes Back
            </div>
            <h1 className="text-4xl font-black leading-none mb-6 tracking-tight uppercase">
              Weight <br />
              <RotatingCycleWord />
            </h1>
            <p className="text-sm text-primary-foreground/80 mb-8 leading-relaxed">
              You have already lost the weight, more than once. The problem was never getting it off. It is what happens after.{" "}
              <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent underline underline-offset-2">
                Read the full breakdown
              </a>.
            </p>

            <div className="flex flex-col gap-4">
              <Button variant="accent" size="lg" className="w-full" asChild>
                <a href="/quiz">Find Your Regain Profile <ArrowRight size={18} /></a>
              </Button>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">Join the Free Community</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Three ways it goes wrong */}
        <section className="py-14 px-4">
          <div className="max-w-md mx-auto text-center">
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">Three Ways It Goes Wrong</span>
            <h2 className="text-3xl font-black mb-8 tracking-tight text-foreground">Same starting point.<br />Three different endings.</h2>

            <div className="flex flex-col gap-6 text-left">
              {/* The Wall */}
              <a
                ref={wall.ref}
                href="/blog/how-to-overcome-weight-loss-plateaus"
                className="block bg-card p-6 rounded-3xl shadow-sm border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-lg text-foreground">The Wall</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">Stuck</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 mb-3">
                  <LineChart
                    d="M10,20 C40,22 52,50 78,54 C112,59 150,55 190,55"
                    dotCx={190}
                    dotCy={55}
                    dotColor="hsl(24 60% 50%)"
                    isVisible={wall.isVisible}
                    label="Weight drops then plateaus flat"
                  />
                </div>
                <p className="font-extrabold text-sm text-foreground mb-2">You are doing everything right, and the scale will not move.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-wider">
                  Why plateaus happen <ArrowRight size={10} />
                </span>
              </a>

              {/* The Trap */}
              <a
                ref={trap.ref}
                href="/blog/yo-yo-dieting-metabolism-myth"
                className="block bg-card p-6 rounded-3xl shadow-sm border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-lg text-foreground">The Trap</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">Yo-yo effect</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 mb-3">
                  <LineChart
                    d="M10,55 C40,20 60,20 85,45 C110,68 140,25 190,20"
                    dotCx={190}
                    dotCy={20}
                    dotColor="hsl(217 60% 50%)"
                    isVisible={trap.isVisible}
                    label="Weight drops then climbs back up in a repeating cycle"
                  />
                </div>
                <p className="font-extrabold text-sm text-foreground mb-2">You lose it, you gain it back, and every round gets harder.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-wider">
                  The yo-yo metabolism myth <ArrowRight size={10} />
                </span>
              </a>

              {/* The Cliff */}
              <a
                ref={cliff.ref}
                href="/glp-1-rebound-analysis"
                className="block bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl hover:opacity-95 transition-opacity"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-lg">The Cliff</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/20 text-accent">Off medication</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 mb-3 border border-white/10">
                  <LineChart
                    d="M10,60 C50,58 70,58 88,58 C110,58 140,20 190,16"
                    dotCx={190}
                    dotCy={16}
                    dotColor="hsl(var(--accent))"
                    isVisible={cliff.isVisible}
                    label="Weight holds low then rebounds sharply after stopping medication"
                  />
                </div>
                <p className="font-extrabold text-sm mb-2">66% of the weight comes back within a year of stopping GLP-1.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider">
                  See the GLP-1 rebound data <ArrowRight size={10} />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Same starting point, two endings */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-md mx-auto text-center">
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">The Fork</span>
            <h2 className="text-3xl font-black mb-3 tracking-tight text-foreground">{FORK_HEADLINE}</h2>
            <p className="text-muted-foreground mb-8 text-xs leading-relaxed">
              Most plans get you down. Almost none keep you there. That gap is the difference between losing weight and making it permanent.
            </p>

            <div ref={comparison.ref} className="bg-card rounded-3xl p-5 shadow-md border border-border text-left">
              <div className="text-[11px] font-black text-muted-foreground uppercase tracking-wider mb-3">Body weight over 12 months</div>
              <svg viewBox="0 0 300 180" className="w-full h-auto block overflow-visible" role="img" aria-label="Chart comparing weight rebounding upward with no plan versus staying down with Weight Permanence Training">
                <line x1="20" y1="30" x2="280" y2="30" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="20" y1="90" x2="280" y2="90" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="20" y1="150" x2="280" y2="150" stroke="hsl(var(--border))" strokeWidth="1" />
                <path
                  d="M20,40 C80,90 120,100 150,100 C190,100 230,60 280,35"
                  fill="none"
                  stroke="hsl(24 60% 50%)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: comparison.isVisible ? 0 : 1, transition: "stroke-dashoffset 1.6s ease" }}
                />
                <path
                  d="M20,40 C80,90 120,100 150,100 C190,100 230,105 280,105"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: comparison.isVisible ? 0 : 1, transition: "stroke-dashoffset 1.6s ease .2s" }}
                />
              </svg>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-[3px] rounded mt-2" style={{ background: "hsl(24 60% 50%)" }} />
                  <div>
                    <div className="font-black text-sm text-foreground">If nothing changes</div>
                    <div className="text-xs text-muted-foreground">The plateau breaks the wrong way, or the medication stops. The weight finds its way back.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-[3px] rounded mt-2 bg-primary" />
                  <div>
                    <div className="font-black text-sm text-foreground">With Weight Permanence Training™</div>
                    <div className="text-xs text-muted-foreground">You hold the line and keep going, because the habits and the identity are still there.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What actually makes it stick */}
        <section ref={mergeSectionRef} className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="text-accent" size={18} />
              <span className="text-xs font-black tracking-widest text-primary-foreground/70 uppercase block">The Solution</span>
            </div>
            <h2 className="text-3xl font-black mb-3 tracking-tight">What actually makes it stick</h2>
            <p className="text-primary-foreground/70 mb-10 text-xs leading-relaxed">
              Restriction and medication only ever address the food side.{" "}
              <a href="/what-is-ls-diet" className="text-accent underline underline-offset-2">LS Diet</a> handles that half. The other half is behavioural:{" "}
              <a href="/awareness-stages" className="text-accent underline underline-offset-2">Awareness Training</a> plus{" "}
              <a href="/blog/action-practice" className="text-accent underline underline-offset-2">Practice Training</a>. Together, that is{" "}
              <a href="/weight-permanence-training" className="text-accent underline underline-offset-2">Weight Permanence Training™</a>.
            </p>

            <div className={`flex flex-col items-center gap-3 transition-all duration-700 ${mergePhase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="/what-is-ls-diet" className="block bg-white/5 border border-white/10 px-5 py-4 rounded-2xl w-full font-black hover:border-accent/50 transition-colors">
                <div className="text-base">LS Diet</div>
                <div className="text-[11px] text-primary-foreground/60 font-medium mt-1 normal-case">Low Starch, Low Sugar. Controls insulin so fat burning stays on.</div>
              </a>
              <span className="text-primary-foreground/60 text-lg font-black">+</span>
              <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl w-full font-black">
                <div className="text-base">Weight Permanence Training™</div>
                <div className="text-[11px] text-primary-foreground/60 font-medium mt-1 normal-case">
                  <a href="/awareness-stages" className="underline underline-offset-2 hover:text-accent">Awareness Training</a>
                  {" "}+{" "}
                  <a href="/blog/action-practice" className="underline underline-offset-2 hover:text-accent">Practice Training</a>. The behavioural system that stops the weight from coming back.
                </div>
              </div>
              <span className="text-accent text-lg font-black">=</span>
              <a href="/weight-permanence-training" className="bg-accent text-accent-foreground px-5 py-5 rounded-2xl shadow-lg w-full font-black uppercase tracking-tight flex items-center justify-center gap-1 hover:opacity-95 transition-opacity">
                Weight Permanence™ <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* The Regain Profiles */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="text-accent" size={18} />
              <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block">Which One Caused Yours?</span>
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tight text-foreground">The Regain Profiles</h2>
            <p className="text-muted-foreground mb-6 text-xs leading-relaxed">
              The Wall, the Trap, and the Cliff are not random. Each one is driven by a different underlying pattern. These are the five.
            </p>

            <div className="rounded-3xl overflow-hidden border border-border shadow-sm mb-5">
              <img
                src={regainProfiles}
                alt="The five weight regain profiles: Motivation Chaser, Overwhelmed Beginner, Restarter, Stress Eater, and Weight Cycler"
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {profiles.map((p) => (
                <div key={p.slug} className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3">
                  <span className="font-black text-sm text-foreground">{p.name}</span>
                  <span className="text-[11px] text-muted-foreground text-right ml-3">{p.tagline}</span>
                </div>
              ))}
            </div>

            <a href="/quiz" className="block bg-primary text-primary-foreground rounded-2xl px-5 py-4 flex items-center justify-between hover:opacity-95 transition-opacity">
              <span className="font-black text-sm uppercase tracking-wide">Find your profile</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-accent uppercase tracking-wider">
                Take the quiz <ChevronRight size={14} />
              </span>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-black mb-4 tracking-tight text-foreground">This time, make it permanent.</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Naming the problem is step one. Here is the system built to solve it.
            </p>
            <Button variant="accent" size="lg" className="w-full" asChild>
              <a href="/weight-permanence-training">See Weight Permanence Training™ <ArrowRight size={18} /></a>
            </Button>
          </div>
        </section>
      </main>

      <FooterSimple />
    </div>
  );
}
