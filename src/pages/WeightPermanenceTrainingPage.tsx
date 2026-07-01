import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Users, BookOpen, Sparkles, Check, X, ChevronRight } from "lucide-react";

import aware1 from "@/assets/awareness/aware1.png";
import aware2 from "@/assets/awareness/aware2.png";
import aware3 from "@/assets/awareness/aware3.png";
import aware4 from "@/assets/awareness/aware4.png";
import aware5 from "@/assets/awareness/aware5.png";
import regainProfiles from "@/assets/weight-regain-profiles.webp";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-30T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/weight-permanence-training";

const stages = [
  {
    id: 1,
    name: "Reality Awareness",
    logo: aware1,
    ring: "border-blue-500",
    chip: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
    slug: "reality-awareness",
    tagline: "Establishing your baseline",
    definition: "Without an honest baseline, everything after this is guesswork, not strategy.",
    question: "On a scale of 1 to 10, how accurately do you track what you actually eat each day?",
  },
  {
    id: 2,
    name: "Friction Awareness",
    logo: aware2,
    ring: "border-orange-500",
    chip: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
    slug: "friction-awareness",
    tagline: "Recognising the gap",
    definition: "Change starts when staying the same becomes harder to live with than changing.",
    question: "Do you like your current weight, body, or energy? What are you tolerating that you are ready to stop tolerating?",
  },
  {
    id: 3,
    name: "Pattern Awareness",
    logo: aware3,
    ring: "border-green-600",
    chip: "bg-green-50 text-green-700",
    dot: "bg-green-600",
    slug: "pattern-awareness",
    tagline: "Mapping who, what, when, where, and why",
    definition: "Repeated behaviour builds the pattern, and the pattern predicts the outcome.",
    question: "When do you find yourself eating even when you are not hungry?",
  },
  {
    id: 4,
    name: "Consequence Awareness",
    logo: aware4,
    ring: "border-red-600",
    chip: "bg-red-50 text-red-700",
    dot: "bg-red-600",
    slug: "consequence-awareness",
    tagline: "The root of PUSH motivation",
    definition: "This is not self-punishment. It is naming the real cost of staying the same.",
    question: "If nothing changes, what is the most likely outcome in 5 years?",
  },
  {
    id: 5,
    name: "Identity Awareness",
    logo: aware5,
    ring: "border-teal-600",
    chip: "bg-teal-50 text-teal-700",
    dot: "bg-teal-600",
    slug: "identity-awareness",
    tagline: "The root of PULL motivation",
    definition: "You become what you repeatedly do. This stage builds the identity that makes the habit automatic.",
    question: "The version of you who never regains this weight again. Who are they?",
  },
];

function RadialStat({ pct, ringColor, trackColor, labelColor }: { pct: number; ringColor: string; trackColor: string; labelColor: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg className="w-full h-full -rotate-90">
        <circle cx="24" cy="24" r={r} stroke={trackColor} strokeWidth="4" fill="transparent" />
        <circle cx="24" cy="24" r={r} stroke={ringColor} strokeWidth="4" fill="transparent" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[9px] font-black" style={{ color: labelColor }}>{Math.round(pct * 100)}%</span>
    </div>
  );
}

export default function WeightPermanenceTrainingPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [identityToggle, setIdentityToggle] = useState<"dieter" | "permanent">("dieter");
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
            setTimeout(() => setMergePhase(3), 2500);
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
        })}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Weight Permanence Training™", url: "/weight-permanence-training" }]} />

      <main data-route-root>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground rounded-b-[2.5rem] shadow-xl relative overflow-hidden pt-4 pb-14 px-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-md mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold tracking-wider text-accent mb-6 uppercase border border-white/10">
            Weight Permanence Training™ · Coined by Oscar Poon
          </div>
          <h1 className="text-4xl font-black leading-none mb-6 tracking-tight uppercase">
            Stop <br />
            <span className="text-accent">Restarting.</span>
          </h1>
          <p className="text-sm text-primary-foreground/80 mb-8 leading-relaxed">
            The behavioural system that stops weight regain for good. Not another diet cycle. A permanent shift in how you think, decide, and act around food.{" "}
            <a href="/what-is-ls-diet" className="text-accent underline underline-offset-2">See how LS Diet fits in</a>.
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

      {/* Data section */}
      <section className="py-14 px-4">
        <div className="max-w-md mx-auto">
          <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block mb-2">The Real Problem</span>
          <h2 className="text-3xl font-black mb-8 tracking-tight text-foreground">Why the weight keeps coming back.</h2>

          <div className="flex flex-col gap-6">
            <a href="/blog/why-people-regain-weight-after-dieting" className="block bg-card p-6 rounded-3xl shadow-sm border border-border hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-5xl font-black text-foreground tracking-tight">80%</div>
                  <div className="font-extrabold text-sm text-foreground mt-1">Regain weight within 5 years</div>
                </div>
                <RadialStat pct={0.8} ringColor="hsl(var(--primary))" trackColor="hsl(var(--muted))" labelColor="hsl(var(--primary))" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-wider">
                Why diets fail long-term <ArrowRight size={10} />
              </span>
            </a>

            <a href="/glp-1-rebound-analysis" className="block bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl hover:opacity-95 transition-opacity">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-5xl font-black text-accent tracking-tight">66%</div>
                  <div className="font-extrabold text-sm mt-1">Weight regained after stopping GLP-1</div>
                </div>
                <RadialStat pct={0.66} ringColor="hsl(var(--accent))" trackColor="rgba(255,255,255,0.15)" labelColor="hsl(var(--accent))" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider">
                See the GLP-1 rebound data <ArrowRight size={10} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Merged: 5 Stages -> Formula */}
      <section ref={mergeSectionRef} className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-accent" size={18} />
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block">The Method</span>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight text-foreground">The 5 Stages of Awareness</h2>
          <p className="text-muted-foreground mb-8 text-xs">
            Tap a stage to explore it. Keep scrolling to see how all 5 combine into the formula.
          </p>

          <div className="flex justify-between items-center bg-card p-2 rounded-2xl shadow-sm border border-border mb-6 gap-1 overflow-x-auto">
            {stages.map((stage) => (
              <button key={stage.id} onClick={() => setActiveStage(stage.id)} className="focus:outline-none shrink-0" aria-label={stage.name}>
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden border-2 ${stage.ring} transition-all duration-300 ${activeStage === stage.id ? "opacity-100 scale-105" : "opacity-40"}`}
                  style={{
                    backgroundImage: `url(${stage.logo})`,
                    backgroundSize: "176px 117px",
                    backgroundPosition: "-56px -10px",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="bg-card rounded-3xl p-5 shadow-md border border-border min-h-[280px] mb-10">
            {stages.map((stage) => (
              <div key={stage.id} className={activeStage === stage.id ? "block animate-fade-in-up" : "hidden"}>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full ${stage.chip}`}>
                    Stage {stage.id}
                  </span>
                  <a href="/awareness-stages" className="text-[10px] font-bold text-muted-foreground hover:text-accent flex items-center gap-1">
                    All stages <ArrowRight size={10} />
                  </a>
                </div>
                <h3 className="text-xl font-black text-foreground mb-1">{stage.name}</h3>
                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mb-3">{stage.tagline}</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">{stage.definition}</p>
                <div className="bg-muted/50 rounded-2xl p-4 border-l-4 border-primary mb-4">
                  <div className="text-[9px] font-black uppercase tracking-wider text-muted-foreground mb-1">A question this stage asks</div>
                  <p className="font-bold text-foreground italic text-xs leading-relaxed">"{stage.question}"</p>
                </div>
                <a href={`/blog/${stage.slug}`} className="inline-flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-wider">
                  Read the full {stage.name} →
                </a>
              </div>
            ))}
          </div>

          <div className="relative min-h-[220px] flex flex-col items-center justify-center">
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${mergePhase < 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {stages.map((stage, i) => (
                <div
                  key={stage.id}
                  className={`w-10 h-10 rounded-full ${stage.dot} transition-all duration-[1100ms] ease-in-out`}
                  style={
                    mergePhase >= 1
                      ? { transform: "translateX(0px) scale(0.3)", opacity: 0.5, marginLeft: "-8px", marginRight: "-8px" }
                      : { transform: `translateX(${(i - 2) * 56}px) scale(1)`, opacity: 1 }
                  }
                />
              ))}
            </div>

            <div className={`w-full transition-all duration-700 ${mergePhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-card px-5 py-4 rounded-2xl shadow-sm border border-border w-full font-black text-foreground">
                  Awareness Training
                </div>
                <span className="text-muted-foreground text-lg font-black">+</span>
                <a href="/blog/action-practice" className="bg-card px-5 py-4 rounded-2xl shadow-sm border border-border w-full font-black text-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-1">
                  Practice Training <ArrowRight size={14} />
                </a>
                <span className="text-accent text-lg font-black">=</span>
                <div className="bg-primary text-primary-foreground px-5 py-5 rounded-2xl shadow-lg w-full font-black uppercase tracking-tight">
                  Weight Permanence™
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Alignment Rule */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="text-accent" size={28} />
            <h2 className="text-xl font-black tracking-tight uppercase">The Identity Alignment Rule</h2>
          </div>
          <p className="text-2xl font-black leading-tight mb-8">
            "Smoker smokes. Healthy people prioritise healthy behaviour."
          </p>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 mb-6">
            <button onClick={() => setIdentityToggle("dieter")} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${identityToggle === "dieter" ? "bg-destructive text-destructive-foreground shadow-md" : "text-primary-foreground/60"}`}>
              The Dieter
            </button>
            <button onClick={() => setIdentityToggle("permanent")} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${identityToggle === "permanent" ? "bg-accent text-accent-foreground shadow-md" : "text-primary-foreground/60"}`}>
              Weight Permanence
            </button>
          </div>

          <div className="bg-white/5 p-5 rounded-3xl border border-white/10 min-h-[140px] flex flex-col justify-center">
            {identityToggle === "dieter" ? (
              <div className="animate-fade-in-up">
                <div className="text-[9px] font-black text-destructive uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <X size={10} /> Moral licensing
                </div>
                <p className="font-extrabold text-sm mb-1.5 leading-snug">
                  "I had a stressful day, so I have earned this."
                </p>
                <p className="text-primary-foreground/60 text-xs">
                  Treats healthy behaviour as a tax you pay off. The negotiation never ends.
                </p>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="text-[9px] font-black text-accent uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Check size={10} /> Identity aligned
                </div>
                <p className="font-extrabold text-sm mb-1.5 leading-snug">
                  "I am someone who chooses to eat healthy because I can. That is just who I am now."
                </p>
                <p className="text-primary-foreground/70 text-xs">
                  No negotiation needed. The choice is already made because it matches your identity.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Weight Regain Profiles */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-accent" size={18} />
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase block">Which one is you?</span>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight text-foreground">The Regain Profiles</h2>
          <p className="text-muted-foreground mb-6 text-xs">Tap to find the pattern that matches you.</p>

          <a href="/quiz" className="block rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow group">
            <img src={regainProfiles} alt="The five weight regain profiles: Motivation Chaser, Weight Cycler, Overwhelmed Beginner, Stress Eater, and Restarter" className="w-full h-auto" />
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <span className="font-black text-sm uppercase tracking-wide">Find your profile</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-accent uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Take the quiz <ChevronRight size={14} />
              </span>
            </div>
          </a>
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
