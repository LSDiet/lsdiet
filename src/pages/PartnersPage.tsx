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
const CTA_LABEL = "Apply to Become a Partner";

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

function ClientCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-7 md:p-9 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)]">
      <h3 className="text-lg font-bold text-[hsl(0_0%_8%)] mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[hsl(0_0%_22%)] leading-snug">
            <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(38_90%_50%)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
          content="Connect with LS Diet members seeking long term behavioural support. 100% free leads, 100% commission free."
        />
        <meta property="og:url" content="https://lsdiet.com/partners" />
      </Helmet>

      {/* Minimal top bar */}
      <header className="sticky top-0 z-40 bg-[hsl(0_0%_99%/0.85)] backdrop-blur border-b border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <img src={lsDietLogo} alt="LS Diet" className="h-9 w-auto" />
          </a>
          <ApplyCTA className="!px-5 !py-2.5 !text-sm">Apply</ApplyCTA>
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
                Many clients know what to do. The real problem is maintaining the
                behaviours required for long term weight management.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <ApplyCTA>{CTA_LABEL}</ApplyCTA>
                <a
                  href="#problem"
                  className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold text-[hsl(0_0%_30%)] hover:text-[hsl(0_0%_8%)] transition-colors"
                >
                  See the problem ↓
                </a>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <ConsistencyVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <Section
        id="problem"
        eyebrow="The Real Problem"
        title="The problem is often not information"
        subtitle="Many clients already know they should exercise, eat better, and stay consistent. The real problem is behavioural inconsistency."
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ClientCard
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
          <ClientCard
            title="As a result, many coaches and dietitians experience:"
            items={[
              "High client dropout",
              "High churn",
              "Poor adherence",
              "Inconsistent check ins",
              "Stalled client progress",
              "Lower retention",
              "Unstable recurring revenue",
              "Repeated relapse cycles",
            ]}
          />
        </div>
      </Section>

      {/* SECTION 3 — STATISTICS */}
      <section className="py-20 md:py-28 bg-white border-y border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              By the Numbers
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
              The behavioural gap is the industry gap
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
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
                href: "https://www.canada.ca/en/public-health/services/publications/healthy-living/obesity-canada.html",
              },
              {
                stat: "50%",
                text: "of people starting exercise programs drop out within 6 months",
                source: "NIH — Exercise adherence research",
                href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2536523/",
              },
            ].map((s) => (
              <div
                key={s.stat}
                className="rounded-3xl bg-[hsl(0_0%_99%)] border border-[hsl(0_0%_92%)] p-8 md:p-10 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] mb-3">
                  {s.stat}
                </div>
                <p className="text-[15px] text-[hsl(0_0%_30%)] leading-snug mb-4">{s.text}</p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-[0.14em] text-[hsl(0_0%_50%)] hover:text-[hsl(38_90%_40%)] underline underline-offset-4 decoration-[hsl(0_0%_80%)] hover:decoration-[hsl(38_90%_40%)] transition-colors"
                >
                  Source · {s.source} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW LS DIET SOLVES */}
      <Section
        eyebrow="The Solution"
        title="How LS Diet addresses behavioural inconsistency"
        subtitle={
          <>
            LS Diet developed the{" "}
            <a
              href="https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
              className="font-semibold text-[hsl(0_0%_8%)] underline underline-offset-4 decoration-[hsl(38_90%_50%)] hover:text-[hsl(38_90%_40%)] transition-colors"
            >
              Weight Permanence Triangle™
            </a>
            , a framework built around the 5 Stages of Awareness. Each stage helps members
            see their baseline reality, the friction blocking change, the patterns driving
            behaviour, the consequences pushing them forward, and the identity pulling them
            toward a healthier self. Together, these shifts help members build a new
            identity that genuinely prioritizes weight loss, long term health, and weight
            regain prevention.
          </>
        }
      >
        {/* Replaced framework visual — 5 Stages of Awareness diagram */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[hsl(0_0%_92%)] p-4 md:p-8 mb-12 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] overflow-hidden">
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

        <div className="mt-4 max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[hsl(0_0%_40%)] mb-3">
              LS Diet does not replace
            </div>
            <ul className="space-y-2 text-[15px] text-[hsl(0_0%_22%)]">
              <li>— Fitness coaching</li>
              <li>— Exercise programming</li>
              <li>— Clinical nutrition care</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[hsl(38_90%_40%)] mb-3">
              The goal is to help members become
            </div>
            <ul className="space-y-2 text-[15px] text-[hsl(0_0%_22%)]">
              <li>— More self aware</li>
              <li>— More psychologically prepared</li>
              <li>— More behaviourally consistent</li>
              <li>— More focused on long term sustainability</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* SECTION 5 — WHY BECOME A PARTNER */}
      <section className="py-20 md:py-28 bg-white border-y border-[hsl(0_0%_92%)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
              The Partnership
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
              Why become an LS Diet Partner
            </h2>
            <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
              We connect LS Diet members seeking additional support with aligned professionals
              focused on long term behavioural consistency and sustainable body composition change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                t: "Behaviourally Prepared Members",
                d: "LS Diet members are already introduced to consistency, awareness, and long-term weight management before any partner connection.",
              },
              {
                t: "100% Commission Free",
                d: "LS Diet only provides the introduction between members and partners. All coaching and consultation revenue remains with the partner.",
              },
              {
                t: "City-Based Visibility",
                d: "Future partner listings will be organized by city to help members find local or nearby support.",
              },
              {
                t: "3 Months Free",
                d: "Partners receive free early access to the LS Diet Partner network during the initial launch period.",
              },
              {
                t: "No Results, No Payment",
                d: "If partners do not receive inquiry opportunities, there is no cost to remain listed after the free trial period.",
              },
              {
                t: "Long-Term Focused Community",
                d: "LS Diet members join to improve consistency, maintain progress, and reduce weight regain, not just pursue short-term motivation.",
              },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-3xl bg-[hsl(0_0%_99%)] border border-[hsl(0_0%_92%)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(0_0%_0%/0.15)]"
              >
                <div className="text-lg font-bold text-[hsl(0_0%_8%)] mb-2">{b.t}</div>
                <div className="text-[15px] text-[hsl(0_0%_36%)] leading-relaxed">{b.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-[hsl(0_0%_97%)] border border-[hsl(0_0%_92%)] p-6 md:p-8 text-sm text-[hsl(0_0%_36%)] leading-relaxed">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(0_0%_40%)] mb-2">
              Disclaimer
            </div>
            LS Diet does not guarantee client participation, retention, or business growth. All
            partners remain independently responsible for their services, certifications, licensing,
            and professional conduct.
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA / APPLY */}
      <section id="apply" className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(38_90%_40%)] mb-4">
            Applications Open
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[hsl(0_0%_8%)] leading-[1.1]">
            Apply to Become a Partner
          </h2>
          <p className="mt-5 text-base md:text-lg text-[hsl(0_0%_30%)] leading-relaxed">
            We are currently accepting applications for the future LS Diet Partner network.
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
            <ApplyCTA>{CTA_LABEL}</ApplyCTA>
          </div>
          <p className="mt-4 text-xs text-[hsl(0_0%_50%)]">
            Opens our short application form in a new tab.
          </p>
        </div>
      </section>

      <footer className="py-10 border-t border-[hsl(0_0%_92%)] text-center text-sm text-[hsl(0_0%_50%)]">
        <div className="container max-w-6xl">
          © {new Date().getFullYear()} LS Diet · Stop Regaining Weight ·{" "}
          <a href="/" className="hover:text-[hsl(0_0%_8%)]">
            lsdiet.com
          </a>
        </div>
      </footer>
    </main>
  );
}
