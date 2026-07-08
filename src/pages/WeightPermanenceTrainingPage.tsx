import { useState, useEffect, useRef, type TouchEvent as ReactTouchEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Users, BookOpen, ChevronRight, Map, Repeat, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import regainProfiles from "@/assets/weight-regain-profiles.webp";
import aware1 from "@/assets/awareness/aware1.png";
import aware2 from "@/assets/awareness/aware2.png";
import aware3 from "@/assets/awareness/aware3.png";
import aware4 from "@/assets/awareness/aware4.png";
import aware5 from "@/assets/awareness/aware5.png";
import heroManVideo from "@/assets/hero-videos/hero-wpt-man.mp4";
import heroOfficeVideo from "@/assets/hero-videos/hero-wpt-1.mp4";
import practiceDonutVideo from "@/assets/hero-videos/practice-donut.mp4";
import practiceRunningVideo from "@/assets/hero-videos/practice-running.mp4";
import practiceBreadVideo from "@/assets/hero-videos/practice-bread.mp4";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-30T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/weight-permanence-training";

const stages = [
  {
    id: 1,
    name: "Reality Awareness",
    logo: aware1,
    chip: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
    blob: "bg-blue-500/[0.14]",
    slug: "reality-awareness",
    whatItIs: "Building an honest baseline of your current weight, habits, and patterns.",
    whatFixes: "Guessing at solutions before you know the real problem.",
  },
  {
    id: 2,
    name: "Friction Awareness",
    logo: aware2,
    chip: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
    blob: "bg-orange-500/[0.14]",
    slug: "friction-awareness",
    whatItIs: "Naming exactly what feels unsustainable about your current habits.",
    whatFixes: "Staying comfortable enough to never actually change.",
  },
  {
    id: 3,
    name: "Pattern Awareness",
    logo: aware3,
    chip: "bg-green-50 text-green-700",
    dot: "bg-green-600",
    blob: "bg-green-600/[0.14]",
    slug: "pattern-awareness",
    whatItIs: "Mapping the who, what, when, where, and why behind your eating.",
    whatFixes: "Fighting the symptom instead of the trigger.",
  },
  {
    id: 4,
    name: "Consequence Awareness",
    logo: aware4,
    chip: "bg-red-50 text-red-700",
    dot: "bg-red-600",
    blob: "bg-red-600/[0.14]",
    slug: "consequence-awareness",
    whatItIs: "Facing the real cost of staying the same for another 5 years.",
    whatFixes: "Change with no urgency behind it. Builds PUSH motivation.",
  },
  {
    id: 5,
    name: "Identity Awareness",
    logo: aware5,
    chip: "bg-teal-50 text-teal-700",
    dot: "bg-teal-600",
    blob: "bg-teal-600/[0.14]",
    slug: "identity-awareness",
    whatItIs: "Defining who you're becoming, not just what you're losing.",
    whatFixes: "Willpower running out before the weight does. Builds PULL motivation.",
  },
];

const roadmapSteps = [
  { n: "1", title: "Find Your Profile", desc: "Know which regain pattern you're breaking.", icon: Users },
  { n: "2", title: "Awareness Training (Psychology)", desc: "Find out the WHY and build the PUSH and PULL motivations.", icon: BrainCircuit },
  { n: "3", title: "Practice Training (Behaviour)", desc: "Daily modules that turn insight into automatic behaviour.", icon: Repeat },
];

const regainProfileNames = ["Motivation Chaser", "Overwhelmed Beginner", "Restarter", "Stress Eater", "Weight Cycler"];

const practiceModules = [
  "Interrupt the Trigger",
  "Break Self-Licensing",
  "Respond, Not React",
  "Redesign Your Environment",
  "Reduce Decision Friction",
  "Build Repeatable LS Meals",
  "Daily Physiology Basics",
  "Measure Weight in Time",
  "Emotional vs. Functional Eating",
  "Build the Identity",
];

const cycleWords = ["Regaining.", "Restarting.", "Rebounding."];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % cycleWords.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-top text-accent">
      <span className="invisible">Restarting.</span>
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
      <span className="sr-only">Regaining, Restarting, and Rebounding.</span>
    </span>
  );
}

const heroVideos = [heroManVideo, heroOfficeVideo];
const practiceVideos = [practiceDonutVideo, practiceRunningVideo, practiceBreadVideo];

function VideoBackground({ videos, intervalMs, overlayClassName }: { videos: string[]; intervalMs: number; overlayClassName: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % videos.length), intervalMs);
    return () => clearInterval(id);
  }, [videos.length, intervalMs]);
  return (
    <div className="absolute inset-0 z-0">
      {videos.map((src, i) => (
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
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}

function ProfileCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % regainProfileNames.length), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-14 rounded-2xl border border-border bg-card flex items-center justify-center overflow-hidden">
      {regainProfileNames.map((name, i) => (
        <span
          key={name}
          aria-hidden={i !== index}
          className={`absolute font-black text-sm uppercase tracking-wide text-foreground transition-all duration-400 ease-out ${
            i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {name}?
        </span>
      ))}
    </div>
  );
}

function PracticeWordFlash() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % practiceModules.length), 1100);
    return () => clearInterval(id);
  }, []);
  return (
    <a
      href="/blog/action-practice"
      className="relative min-h-[130px] bg-black rounded-3xl flex items-center justify-center px-6 overflow-hidden"
    >
      {practiceModules.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`absolute px-6 text-center text-2xl font-black uppercase tracking-tight text-white transition-all duration-300 ease-out ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {word}
        </span>
      ))}
      <span className="sr-only">{practiceModules.join(", ")}</span>
    </a>
  );
}

function StatBar({ pct, fillColor, trackColor, visible }: { pct: number; fillColor: string; trackColor: string; visible: boolean }) {
  return (
    <div className="w-full h-4 rounded-full overflow-hidden mt-4" style={{ background: trackColor }}>
      <div
        className="h-full rounded-full transition-all duration-[2600ms] ease-out"
        style={{ width: visible ? `${pct * 100}%` : "0%", background: fillColor }}
      />
    </div>
  );
}

export default function WeightPermanenceTrainingPage() {
  const [activeStage, setActiveStage] = useState(1);
  const statsSection = useScrollAnimation(0.2);
  const touchStartX = useRef<number | null>(null);
  const activeStageData = stages.find((s) => s.id === activeStage) ?? stages[0];

  const handleStageTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleStageTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    setActiveStage((prev) => {
      if (deltaX < 0) return prev < stages.length ? prev + 1 : prev;
      return prev > 1 ? prev - 1 : prev;
    });
  };

  const [roadmapPhase, setRoadmapPhase] = useState(0);
  const roadmapTriggered = useRef(false);
  const roadmapSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = roadmapSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !roadmapTriggered.current) {
            roadmapTriggered.current = true;
            setRoadmapPhase(0);
            setTimeout(() => setRoadmapPhase(1), 200);
            setTimeout(() => setRoadmapPhase(2), 700);
            setTimeout(() => setRoadmapPhase(3), 1200);
            setTimeout(() => setRoadmapPhase(4), 1900);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Weight Permanence Training™ | The 5-Stage Method to Stop Regaining Weight</title>
        <meta
          name="description"
          content="Weight Permanence Training™ is the behavioural system that stops weight regain for good — Awareness Training plus Practice Training, coined by Oscar Poon."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Weight Permanence Training™" />
        <meta property="og:description" content="The behavioural system that stops weight regain for good. Not another diet cycle." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Weight Permanence Training™",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: CANONICAL,
          about: { "@id": "https://lsdiet.com/awareness-stages#weight-permanence-training" },
        })}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Weight Permanence Training™", url: "/weight-permanence-training" }]} />

      <main data-route-root>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground rounded-b-[2.5rem] shadow-xl relative overflow-hidden pt-4 pb-14 px-4">
        <VideoBackground videos={heroVideos} intervalMs={8000} overlayClassName="bg-gradient-to-b from-primary/60 via-primary/45 to-primary/90" />
        <div className="max-w-md mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold tracking-wider text-accent mb-6 uppercase border border-white/10">
            Weight Permanence Training™ by Oscar Poon
          </div>
          <h1 className="text-4xl font-black leading-none mb-6 tracking-tight uppercase">
            Stop <br />
            <RotatingWord />
          </h1>
          <p className="text-sm text-primary-foreground/80 mb-8 leading-relaxed">
            A permanent shift in how you think, decide, and act around food.{" "}
            <a href="/what-is-ls-diet" className="text-accent underline underline-offset-2">See how LS Diet fits in</a>.
          </p>

          <div className="flex flex-col gap-4">
            <Button variant="accent" size="lg" className="w-full" asChild>
              <a href="/quiz">Discover Your Regain Profile (Free) <ArrowRight size={18} /></a>
            </Button>
            <Button variant="secondary" size="lg" className="w-full" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">Claim Your Free Access</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Data section */}
      <section className="py-14 px-4">
        <div ref={statsSection.ref} className="max-w-md mx-auto">
          <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">The Real Problem</span>
          <h2 className="text-3xl font-black mb-8 tracking-tight text-foreground">Weight keeps coming back</h2>

          <div className="flex flex-col gap-6">
            <a href="/blog/why-people-regain-weight-after-dieting" className="block bg-card p-6 rounded-3xl shadow-sm border border-border hover:border-primary transition-colors">
              <div className="text-5xl font-black text-foreground tracking-tight">50%</div>
              <div className="font-extrabold text-sm text-foreground mt-1">Regain all lost weight within 5 years</div>
              <StatBar pct={0.5} fillColor="hsl(var(--primary))" trackColor="hsl(var(--muted))" visible={statsSection.isVisible} />
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-wider mt-4">
                Why diets fail long-term <ArrowRight size={10} />
              </span>
            </a>

            <a href="/glp-1-rebound-analysis" className="block bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl hover:opacity-95 transition-opacity">
              <div className="text-5xl font-black text-accent tracking-tight">66%</div>
              <div className="font-extrabold text-sm mt-1">Weight regained after stopping GLP-1</div>
              <StatBar pct={0.66} fillColor="hsl(var(--accent))" trackColor="rgba(255,255,255,0.15)" visible={statsSection.isVisible} />
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider mt-4">
                See the GLP-1 rebound data <ArrowRight size={10} />
              </span>
            </a>

            <a href="/blog/youre-losing-muscle-not-just-fat-on-glp1-drugs" className="block bg-card p-6 rounded-3xl shadow-sm border border-border hover:border-primary transition-colors">
              <div className="text-5xl font-black text-foreground tracking-tight">45%</div>
              <div className="font-extrabold text-sm text-foreground mt-1">Of GLP-1 weight loss may be muscle, not fat</div>
              <StatBar pct={0.45} fillColor="hsl(var(--primary))" trackColor="hsl(var(--muted))" visible={statsSection.isVisible} />
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-wider mt-4">
                Why the scale lies on GLP-1 <ArrowRight size={10} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* How to Stop Weight Regain — 1 + 2 + 3 = Weight Permanence, animated */}
      <section ref={roadmapSectionRef} className="py-14 px-4 bg-muted/30">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Map className="text-accent" size={18} />
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block">How to Stop Weight Regain</span>
          </div>
          <h2 className="text-3xl font-black mb-8 tracking-tight text-foreground">Step-by-Step Guide</h2>

          <div className="flex flex-col items-center gap-2">
            {roadmapSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="w-full flex flex-col items-center gap-2">
                  <div
                    className={`relative w-full bg-card rounded-[28px] p-4 border border-border shadow-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      roadmapPhase > i ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                  >
                    <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-accent/5 pointer-events-none" />
                    <div className="flex items-center gap-4 relative">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-md">
                          <Icon size={20} />
                        </div>
                        <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center justify-center border-2 border-card">
                          {step.n}
                        </span>
                      </div>
                      <div>
                        <div className="font-black text-sm text-foreground uppercase tracking-wide">{step.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  </div>
                  {i < roadmapSteps.length - 1 && (
                    <span
                      className={`w-8 h-8 shrink-0 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground font-black text-sm transition-opacity duration-300 ${
                        roadmapPhase > i + 1 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      +
                    </span>
                  )}
                </div>
              );
            })}

            <span
              className={`w-8 h-8 shrink-0 rounded-full bg-accent text-accent-foreground shadow-md flex items-center justify-center font-black text-sm transition-opacity duration-300 ${
                roadmapPhase >= 4 ? "opacity-100" : "opacity-0"
              }`}
            >
              =
            </span>

            <div
              className={`relative w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-[28px] p-5 shadow-lg text-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                roadmapPhase >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
              <div className="relative flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-accent" />
                <div className="font-black uppercase tracking-tight text-lg">Weight Permanence™</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 — Weight Regain Profiles, the actual entry point */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-accent" size={18} />
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block">Step 1 · Which one is you?</span>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight text-foreground">The Regain Profiles</h2>
          <p className="text-muted-foreground mb-6 text-xs">Tap to find the pattern that matches you.</p>

          <ProfileCarousel />

          <a href="/quiz" className="block rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow group mt-4">
            <img src={regainProfiles} alt="The five weight regain profiles: Motivation Chaser, Weight Cycler, Overwhelmed Beginner, Stress Eater, and Restarter" className="w-full h-auto" />
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <span className="font-black text-sm uppercase tracking-wide">Find your profile</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-accent uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Discover Your Regain Profile (Free) <ChevronRight size={14} />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Step 2 — The 5 Stages of Awareness */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">Step 2 · Psychology Training for a New Identity</span>
          <h2 className="text-3xl font-black mb-2 tracking-tight text-foreground">The 5 Stages of Awareness</h2>
          <p className="text-muted-foreground mb-8 text-xs">
            Tap a stage to see what it is and what it fixes.
          </p>

          <div className="flex justify-between items-center gap-2 mb-6">
            {stages.map((stage) => (
              <button key={stage.id} onClick={() => setActiveStage(stage.id)} className="focus:outline-none shrink-0" aria-label={stage.name}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                    activeStage === stage.id ? `${stage.dot} text-white scale-110 shadow-md` : "bg-muted text-muted-foreground opacity-60"
                  }`}
                >
                  {stage.id}
                </div>
              </button>
            ))}
          </div>

          <div
            className="relative overflow-hidden bg-gradient-to-br from-card to-[hsl(0_0%_96%)] rounded-3xl p-5 border border-border min-h-[220px] touch-pan-y"
            style={{ boxShadow: "0 24px 48px -26px rgba(0,0,0,.35)" }}
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
          >
            <div className={`absolute -right-10 -top-14 w-48 h-48 rounded-full blur-2xl pointer-events-none transition-colors duration-300 ${activeStageData.blob}`} />
            <div className={`absolute -left-12 -bottom-16 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-colors duration-300 ${activeStageData.blob}`} />

            {stages.map((stage) => (
              <div key={stage.id} className={activeStage === stage.id ? "relative block animate-fade-in-up" : "hidden"}>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full ${stage.chip}`}>
                    Stage {stage.id}
                  </span>
                  <a href="/awareness-stages" className="text-[10px] font-bold text-muted-foreground hover:text-accent flex items-center gap-1">
                    All stages <ArrowRight size={10} />
                  </a>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-foreground leading-none mb-2">
                    <span className="inline-block">
                      {stage.name.split(" ")[0]}
                      <div className={`h-1.5 w-full rounded-full mt-2 ${stage.dot}`} />
                    </span>{" "}
                    {stage.name.split(" ").slice(1).join(" ")}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={stage.logo} alt="" className="w-24 shrink-0 h-auto object-contain" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className={`rounded-2xl p-3 ${stage.chip}`}>
                      <div className="text-[9px] font-black uppercase tracking-wider opacity-70 mb-1">What it is</div>
                      <p className="text-xs leading-relaxed font-semibold">{stage.whatItIs}</p>
                    </div>
                    <div className="rounded-2xl p-3 bg-muted/60">
                      <div className="text-[9px] font-black uppercase tracking-wider text-muted-foreground mb-1">What this fixes</div>
                      <p className="text-foreground text-xs leading-relaxed font-semibold">{stage.whatFixes}</p>
                    </div>
                  </div>
                </div>

                <a href={`/blog/${stage.slug}`} className="inline-flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider">
                  Read the full {stage.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3 — Practice Training, one module flashing at a time */}
      <section id="practice-training" className="relative py-16 px-4 bg-primary text-primary-foreground overflow-hidden text-center">
        <VideoBackground videos={practiceVideos} intervalMs={5000} overlayClassName="bg-gradient-to-b from-primary/75 via-primary/70 to-primary/90" />
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Repeat className="text-accent" size={18} />
            <span className="text-xs font-black tracking-widest text-primary-foreground/70 uppercase block">Step 3 · Practice Training</span>
          </div>
          <h2 className="text-3xl font-black mb-3 tracking-tight">Make Behaviour Change Intentional</h2>
          <p className="text-primary-foreground/70 mb-8 text-xs leading-relaxed">
            Daily modules that bridge the gap between
            <br />
            wishing for a goal and actually doing it.
          </p>

          <PracticeWordFlash />

          <a href="/blog/action-practice" className="inline-flex items-center justify-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider mt-6">
            See all the Practice modules <ArrowRight size={10} />
          </a>
        </div>
      </section>

      {/* Step 4 — Weight Permanence, the destination the roadmap started with */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">Step 4 · The Outcome</span>
          <h2 className="text-3xl font-black mb-3 tracking-tight text-foreground">Weight Permanence™</h2>
          <p className="text-muted-foreground text-xs mb-8 leading-relaxed">
            Awareness Training + Practice Training. The behavioural system that stops the weight from coming back.
          </p>
          <Button variant="accent" size="lg" className="w-full" asChild>
            <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">Claim Your Free Access <ArrowRight size={18} /></a>
          </Button>
        </div>
      </section>

      {/* Internal link callout */}
      <section className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-md mx-auto bg-card p-5 rounded-3xl border border-border shadow-sm">
          <h3 className="font-extrabold text-base mb-1.5 flex items-center gap-1.5 text-foreground">
            <BookOpen size={16} className="text-accent" /> Want the nutrition side too?
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed mb-3">
            WPT™ is the behavioural half. LS Diet (Low Starch, Low Sugar) is the food half — they work together.
          </p>
          <a href="/what-is-ls-diet" className="text-xs font-black text-foreground hover:text-accent flex items-center gap-1 uppercase tracking-wider">
            Read what LS Diet is →
          </a>
        </div>
      </section>
      </main>

      <FooterSimple />
    </div>
  );
}
