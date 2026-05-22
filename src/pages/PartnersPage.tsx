import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import lsDietLogo from "@/assets/lsdiet-wordmark.png";
import awarenessDiagram from "@/assets/5-stages-of-awareness-v2.png";

const PARTNER_TYPES = [
  "In-Person Fitness Coach",
  "Online Fitness Coach",
  "Registered Dietitian",
];

const APPLY_URL = "https://form.getformly.com/f/Vrs6N2";
const APPLY_LABEL = "Apply to Become a Partner";
const SOFT_CTA_LABEL = "See How the Partner Model Works";

function ApplyCTA({
  children,
  className,
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold tracking-tight transition-all duration-300 will-change-transform";
  const styles =
    variant === "solid"
      ? "bg-[hsl(0_0%_8%)] text-white hover:bg-[hsl(0_0%_18%)] hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_hsl(0_0%_0%/0.35)]"
      : "border border-[hsl(0_0%_18%)] text-[hsl(0_0%_8%)] hover:bg-[hsl(0_0%_8%)] hover:text-white";
  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function SoftCTA({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold tracking-tight border border-[hsl(0_0%_18%)] text-[hsl(0_0%_8%)] hover:bg-[hsl(0_0%_8%)] hover:text-white transition-all duration-300 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center text-[15px] font-semibold text-[hsl(0_0%_8%)] hover:text-[hsl(38_90%_40%)] underline underline-offset-4 decoration-[hsl(38_90%_50%)] transition-colors"
    >
      {children}
    </a>
  );
}

/** Abstract behavioural-consistency visual. */
function ConsistencyVisual() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        role="img"
        aria-label="Abstract visual representing behavioural consistency"
      >
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(38 90% 50% / 0.10)" />
            <stop offset="60%" stopColor="hsl(38 90% 50% / 0.02)" />
            <stop offset="100%" stopColor="hsl(0 0% 100% / 0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#bg)" />
        {[60, 95, 130, 165].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="hsl(0 0% 12%)"
            strokeOpacity={0.08 + i * 0.04}
            strokeWidth="1"
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="hsl(38 90% 50%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="600 200"
          transform="rotate(-90 200 200)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-800"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="200" r="6" fill="hsl(0 0% 8%)" />
        <circle cx="200" cy="200" r="14" fill="none" stroke="hsl(0 0% 8%)" strokeOpacity="0.2" strokeWidth="1">
          <animate attributeName="r" values="14;22;14" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className ?? ""}`}>
      <div className="container max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function PainCard({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-7 md:p-9 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)]">
      <h3 className="text-lg font-bold text-[hsl(0_0%_8%)] mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[hsl(0_0%_22%)] leading-snug">
            <span
              className={`mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                accent ? "bg-[hsl(38_90%_50%)]" : "bg-[hsl(0_0%_25%)]"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(0_0%_0%/0.15)]">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(38_90%_50%/0.12)] text-[hsl(38_90%_35%)] font-bold text-sm mb-4">
        {n}
      </div>
      <div className="text-lg font-bold text-[hsl(0_0%_8%)] mb-2">{title}</div>
      <div className="text-[15px] text-[hsl(0_0%_36%)] leading-relaxed">{desc}</div>
    </div>
  );
}

export default function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[hsl(0_0%_99%)] text-[hsl(0_0%_8%)] font-sans">
      <Helmet>
        <title>LS Diet Partners — Behavioural Consistency Ecosystem</title>
        <meta
          name="description"
          content="LS Diet Partners is a network for fitness coaches and registered dietitians focused on long term behavioural consistency and weight regain prevention."
        />
        <link rel="canonical" href="https://lsdiet.com/partners" />
        <meta property="og:title" content="LS Diet Partners — Behavioural Consistency Ecosystem" />
        <meta
          property="og:description"
          content="Connect with LS Diet members seeking long term behavioural support. 100% commission free."
        />
        <meta property="og:url" content="https://lsdiet.com/partners" />
      </Helmet>

      {/* Minimal top bar */}
      <header className="sticky top-0 z-40 bg-[hsl(0_0%_99%/0.85)] backdrop-blur border-b border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <img src={lsDietLogo} alt="LS Diet" className="h-9 w-auto" />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#how-it-works"
              className="hidden sm:inline-flex text-sm font-semibold text-[hsl(0_0%_30%)] hover:text-[hsl(0_0%_8%)] px-4 py-2"
            >
              See the model
            </a>
            <ApplyCTA className="!px-5 !py-2.5 !text-sm" variant="outline">
              Apply
            </ApplyCTA>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-5">
                For Coaches & Dietitians
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[hsl(0_0%_6%)]">
                Are you losing clients because they struggle with consistency?
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[hsl(0_0%_30%)] leading-relaxed max-w-xl lg:max-w-none mx-auto">
                Most clients already know what to do. What breaks long term results is the
                behavioural layer between your sessions — and that is exactly what LS Diet
                reinforces.
              </p>

              <div className="mt-6 inline-flex items-start gap-3 rounded-2xl bg-white border border-[hsl(0_0%_92%)] px-5 py-4 text-left max-w-xl lg:max-w-none">
                <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[hsl(38_90%_50%)]" />
                <p className="text-[15px] text-[hsl(0_0%_22%)] leading-snug">
                  <strong className="text-[hsl(0_0%_8%)]">Unlimited commission-free LS Diet member referrals.</strong><br />You keep your clients, your services, and your brand.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <SoftCTA href="#how-it-works">{SOFT_CTA_LABEL}</SoftCTA>
                <ApplyCTA variant="outline" className="!px-5 !py-3 !text-sm">
                  {APPLY_LABEL}
                </ApplyCTA>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <ConsistencyVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CLIENT INCONSISTENCY PROBLEM */}
      <Section
        id="client-problem"
        eyebrow="The Client Problem"
        title="The real problem isn't information"
        subtitle="Your clients already know they should exercise, eat better, and stay consistent. The behaviour is where it falls apart."
      >
        <div className="max-w-2xl mx-auto">
          <PainCard
            title="Clients often:"
            items={[
              "Disappear after a few weeks",
              "Lose motivation after initial progress",
              "Emotionally eat during stress",
              "Struggle with consistency",
              "Repeatedly restart weight loss",
              "Regain weight after short term success",
              "Know what to do but fail to maintain it long term",
              "Stop prioritizing health once urgency fades",
            ]}
          />
        </div>
      </Section>

      {/* SECTION 3 — BUSINESS PAIN */}
      <section className="py-20 md:py-28 bg-white border-y border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              The Business Cost
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
              That inconsistency lands on your P&L
            </h2>
            <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              Behavioural drop-off doesn't just hurt the client — it quietly eats coaching businesses from the inside.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PainCard
              title="As a result, many coaches and dietitians experience:"
              accent
              items={[
                "High client dropout",
                "High churn",
                "Poor adherence",
                "Inconsistent check-ins",
                "Stalled client progress",
                "Lower retention",
                "Unstable recurring revenue",
                "Repeated relapse cycles",
              ]}
            />
          </div>
          <div className="mt-10 text-center">
            <InlineLink href="#how-it-works">See how the model fixes this →</InlineLink>
          </div>
        </div>
      </section>

      {/* SECTION 4 — STATISTICS (compact) */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-3">
              The Industry Gap
            </div>
            <p className="text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              Behavioural inconsistency is the gap conventional programs leave open.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                stat: "40%+",
                text: "of US adults have obesity",
                source: "CDC",
                href: "https://www.cdc.gov/obesity/adult-obesity-facts/index.html",
              },
              {
                stat: "65%",
                text: "of Canadian adults are overweight or living with obesity",
                source: "Government of Canada",
                href: "https://www.canada.ca/en/public-health/services/publications/healthy-living/obesity-statistics-canada.html?utm",
              },
              {
                stat: "50%",
                text: "of people starting exercise programs drop out within 6 months",
                source: "BMJ Open (PDF)",
                href: "/research/e027987.full.pdf",
              },
            ].map((s) => (
              <div
                key={s.stat}
                className="rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-6 md:p-8 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] mb-2">
                  {s.stat}
                </div>
                <p className="text-sm text-[hsl(0_0%_30%)] leading-snug mb-3">{s.text}</p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] uppercase tracking-[0.14em] text-[hsl(0_0%_50%)] hover:text-[hsl(38_90%_40%)] underline underline-offset-4 decoration-[hsl(0_0%_80%)] hover:decoration-[hsl(38_90%_40%)] transition-colors"
                >
                  {s.source} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMPLEMENT, NOT REPLACE */}
      <section className="py-20 md:py-28 bg-white border-y border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              Complement, not replace
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
              LS Diet reinforces what you already do
            </h2>
            <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              Your coaching and clinical work stays untouched. We sit underneath it, holding the
              behavioural layer steady so your clients actually stay long enough to see results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <PainCard
              title="What you continue doing"
              items={[
                "Coaching",
                "Exercise programming",
                "Accountability",
                "Nutrition guidance",
                "Body composition support",
                "Client care",
              ]}
            />
            <PainCard
              title="What LS Diet reinforces"
              accent
              items={[
                "Consistency",
                "Awareness",
                "Relapse interruption",
                "Push and pull motivation",
                "Sustainable behaviour patterns",
                "Long term progress",
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <InlineLink href="#how-it-works">See how the partner flow works →</InlineLink>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FRAMEWORK / AUTHORITY (condensed) */}
      <Section
        eyebrow="The Framework"
        title="The behavioural system is designed to reduce dropout and restart cycles"
        subtitle={
          <>
            LS Diet trains members through a proprietary framework called the{" "}
            <a
              href="https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
              className="font-semibold text-[hsl(0_0%_8%)] underline underline-offset-4 decoration-[hsl(38_90%_50%)] hover:text-[hsl(38_90%_40%)] transition-colors"
            >
              Weight Permanence Triangle™
            </a>
            . The 5 Stages of Awareness help members understand why consistency breaks down, while Action Practice reinforces daily behaviours that keep health a priority even after motivation fades.
          </>
        }
      >
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-4 md:p-8 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] overflow-hidden">
          <a
            href="https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
            className="block"
          >
            <img
              src={awarenessDiagram}
              alt="The 5 Stages of Awareness — Reality, Friction, Pattern, Consequence, and Identity Awareness behind lasting behavioural change"
              className="w-full h-auto rounded-2xl"
              loading="lazy"
            />
          </a>
        </div>
        <div className="mt-8 max-w-2xl mx-auto text-center space-y-3">
          <p className="text-[15px] text-[hsl(0_0%_36%)] leading-relaxed">
            The goal is not temporary motivation.
          </p>
          <p className="text-[15px] text-[hsl(0_0%_36%)] leading-relaxed">
            The goal is long-term consistency and reduced weight regain.
          </p>
        </div>
      </Section>

      {/* SECTION 7 — HOW THE PARTNER MODEL WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white border-y border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              The Workflow
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
              How members find you, and how the partnership grows
            </h2>
            <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              Two parallel tracks: how a member reaches you, and how your listing evolves over time.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(0_0%_45%)] mb-5 text-center lg:text-left">
                How members reach you
              </div>
              <div className="grid gap-5">
                <StepCard n={1} title="Member completes the free LS Diet course" desc="They finish the behavioural foundation first." />
                <StepCard n={2} title="They decide they want additional support" desc="Muscle building, body recomposition, strength training, or hands-on nutrition support." />
                <StepCard n={3} title="One click opens the partner list for their city" desc="Members browse partner profiles and request a connection when interested." />
                <StepCard n={4} title="Member requests to connect" desc="LS Diet notifies the partner and follows up until contact is confirmed." />
                <StepCard n={5} title="You deliver your normal service" desc="Your brand, your pricing, your client relationship." />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-5 text-center lg:text-left">
                How your listing evolves
              </div>
              <div className="grid gap-5">
                <StepCard n={1} title="Apply and get listed — free" desc="Every coach and dietitian is welcome. Once your profile is added, it becomes visible to LS Diet members." />
                <StepCard n={2} title="Stay listed free until the first member inquiry" desc="No clock starts until a member requests to connect with you." />
                <StepCard n={3} title="First inquiry starts the 90-day window" desc="From the first member connection request, you have three months to evaluate whether the listing is worthwhile." />
                <StepCard n={4} title="Choose your path after 90 days" desc="Continue your listing through LS Diet Premium ($49/month), or remain part of the ecosystem through LS Diet referral opportunities." />
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <ApplyCTA>{APPLY_LABEL}</ApplyCTA>
          </div>
        </div>
      </section>

      {/* SECTION 8 — PARTNER BENEFITS */}
      <Section
        id="benefits"
        eyebrow="The Partnership"
        title="Why become an LS Diet Partner"
        subtitle="We connect LS Diet members seeking additional support with aligned professionals focused on long term behavioural consistency."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              t: "Behaviourally Prepared Members",
              d: "LS Diet members are already introduced to consistency, awareness, and long term weight management before partner connection opportunities.",
            },
            {
              t: "Unlimited Member Referrals",
              d: "The moment a member requests to connect, your 90-day window begins — unlimited LS Diet member referrals, 100% free. If you see the value, you can request an upgrade to stay listed after 90 days.",
            },
            {
              t: "City-Based Visibility",
              d: "Members browse partners in their own city with one click.",
            },
            {
              t: "90 Days Before Anything Changes",
              d: "Your 90-day Premium window only starts after your first member inquiry — not on the day you join.",
            },
            {
              t: "Referral Revenue Opportunities",
              d: "Partners may also qualify for recurring referral revenue opportunities through select LS Diet programs.",
            },
            {
              t: "Long Term Focused Community",
              d: "LS Diet members join to improve consistency, maintain progress, and reduce weight regain — not just pursue short term motivation.",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(0_0%_0%/0.15)]"
            >
              <div className="text-lg font-bold text-[hsl(0_0%_8%)] mb-2">{b.t}</div>
              <div className="text-[15px] text-[hsl(0_0%_36%)] leading-relaxed">{b.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* NEW — MISSION & VISION */}
      <section className="py-16 md:py-20 border-t border-[hsl(0_0%_92%)]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <div className="border-l-2 border-[hsl(38_90%_50%)] pl-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-3">
                Mission
              </div>
              <p className="text-lg md:text-xl font-medium text-[hsl(0_0%_8%)] leading-snug">
                To make knowledge, awareness, and behavioural tools for preventing weight regain accessible to every overweight individual at no cost.
              </p>
            </div>
            <div className="border-l-2 border-[hsl(38_90%_50%)] pl-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-3">
                Vision
              </div>
              <p className="text-lg md:text-xl font-medium text-[hsl(0_0%_8%)] leading-snug">
                To help 10,000 people stop regaining weight and build a future no longer limited by their physical condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section id="apply" className="py-20 md:py-28 bg-white border-t border-[hsl(0_0%_92%)]">
        <div className="container max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
            Applications Open
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
            Apply to Become a Partner
          </h2>
          <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
            Free until the system proves value. Join the network and become visible to LS Diet members in your city.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {PARTNER_TYPES.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[hsl(0_0%_96%)] text-[hsl(0_0%_30%)] border border-[hsl(0_0%_92%)]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <ApplyCTA>{APPLY_LABEL}</ApplyCTA>
          </div>
          <p className="mt-4 text-xs text-[hsl(0_0%_50%)]">
            Opens our short application form in a new tab.
          </p>
        </div>
      </section>

      <footer className="py-10 border-t border-[hsl(0_0%_92%)] text-center text-sm text-[hsl(0_0%_50%)]">
        <div className="container max-w-6xl">
          <p className="text-xs text-[hsl(0_0%_55%)] max-w-3xl mx-auto leading-relaxed mb-6">
            <span className="font-semibold text-[hsl(0_0%_40%)]">Disclaimer.</span> LS Diet does
            not guarantee client participation, retention, or business growth. All partners remain
            independently responsible for their services, certifications, licensing, and
            professional conduct.
          </p>
          © {new Date().getFullYear()} NTL Learning Solutions Inc. All rights reserved. ·{" "}
          <a href="/" className="hover:text-[hsl(0_0%_8%)]">
            lsdiet.com
          </a>
        </div>
      </footer>
    </main>
  );
}
