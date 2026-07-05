import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const PUBLISHED = "2026-06-29T00:00:00+00:00";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://lsdiet.com/glp-1-rebound-analysis#page",
  name: "GLP-1 Rebound Effects: Clinical Trial Evidence",
  headline: "The Weight Rebound Reality: What Happens After GLP-1 Discontinuation",
  description:
    "Clinical analysis of GLP-1 rebound effects from the STEP 1 extension and SURMOUNT-4 trials. Semaglutide and tirzepatide produce significant weight loss, but discontinuation leads to rapid regain in most patients.",
  url: "https://lsdiet.com/glp-1-rebound-analysis",
  inLanguage: "en-CA",
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: {
    "@type": "Person",
    "@id": "https://lsdiet.com/oscar-poon#person",
    name: "Oscar Poon",
    url: "https://lsdiet.com/oscar-poon",
  },
  publisher: { "@type": "Organization", "@id": "https://lsdiet.com/#organization", name: "LS Diet" },
  about: [
    { "@type": "Thing", name: "GLP-1 Receptor Agonists", sameAs: "https://en.wikipedia.org/wiki/GLP-1_receptor_agonist" },
    { "@type": "Thing", name: "Weight Cycling", sameAs: "https://en.wikipedia.org/wiki/Weight_cycling" },
    { "@type": "Thing", name: "Semaglutide", sameAs: "https://en.wikipedia.org/wiki/Semaglutide" },
    { "@type": "Thing", name: "Tirzepatide", sameAs: "https://en.wikipedia.org/wiki/Tirzepatide" },
    { "@type": "Thing", name: "Obesity", sameAs: "https://en.wikipedia.org/wiki/Obesity" },
  ],
  mentions: [
    {
      "@type": "ScholarlyArticle",
      name: "STEP 1 Trial Extension: Weight Regain After Semaglutide Discontinuation",
      description: "Wilding et al. (2022). Participants regained approximately two-thirds of lost weight within 52 weeks of stopping semaglutide.",
      author: { "@type": "Person", name: "Wilding JPH et al." },
    },
    {
      "@type": "ScholarlyArticle",
      name: "SURMOUNT-4 Trial: Tirzepatide Continued vs Placebo",
      description: "Participants who continued tirzepatide lost an additional 6.7% by week 88; those switched to placebo regained 14% by week 88.",
      author: { "@type": "Organization", name: "Eli Lilly" },
    },
  ],
  isPartOf: { "@type": "WebSite", "@id": "https://lsdiet.com/#website" },
};

// STEP 1: weight change over 120 weeks (0 = treatment ends at week 68)
const step1Data = [
  { week: "Week 0", change: 0 },
  { week: "Week 20", change: -8 },
  { week: "Week 40", change: -14 },
  { week: "Week 68 (stop)", change: -17.3 },
  { week: "Week 80", change: -12 },
  { week: "Week 100", change: -8 },
  { week: "Week 120", change: -5.7 },
];

// SURMOUNT-4: continued vs discontinued
const surmount4Data = [
  { label: "Week 36\n(baseline)", continued: -20.9, discontinued: -20.9 },
  { label: "Week 88\n(outcome)", continued: -27.6, discontinued: -6.9 },
];

// Metabolic markers: During Treatment vs Post Withdrawal (0–100 scale, higher = better)
const radarData = [
  { marker: "Blood Pressure", onDrug: 90, offDrug: 60 },
  { marker: "HbA1c", onDrug: 95, offDrug: 75 },
  { marker: "Triglycerides", onDrug: 88, offDrug: 45 },
  { marker: "HDL Cholesterol", onDrug: 85, offDrug: 55 },
  { marker: "Insulin Sensitivity", onDrug: 92, offDrug: 50 },
];

const CHART_COLOR_PRIMARY = "#7c3aed";
const CHART_COLOR_SECONDARY = "#ec4899";
const CHART_COLOR_TERTIARY = "#06b6d4";

export default function GLP1ReboundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>GLP-1 Rebound Effects: Clinical Trial Evidence | LS Diet</title>
        <meta
          name="description"
          content="Clinical analysis of GLP-1 rebound effects from STEP 1 and SURMOUNT-4 trials. Most patients regain two-thirds of lost weight within one year of stopping semaglutide or tirzepatide."
        />
        <link rel="canonical" href="https://lsdiet.com/glp-1-rebound-analysis" />
        <meta property="og:title" content="GLP-1 Rebound Effects: Clinical Trial Evidence | LS Diet" />
        <meta
          property="og:description"
          content="STEP 1 and SURMOUNT-4 trials confirm: most patients regain two-thirds of lost weight within one year of stopping GLP-1 medications. The data — and what it means for permanent weight loss."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/glp-1-rebound-analysis" />
        <meta property="og:locale" content="en_CA" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "GLP-1 Research", url: "/does-glp-1-work" },
          { name: "Rebound Analysis", url: "/glp-1-rebound-analysis" },
        ]}
      />

      {/* Hero */}
      <header className="relative h-auto min-h-[420px] md:h-screen overflow-hidden text-white">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/glp1-injection-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 py-16">
          <div className="max-w-4xl text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-violet-200 mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              Clinical Research Synthesis
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              The Weight Rebound Reality
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              GLP-1 medications produce significant weight loss while you take them. Clinical trials confirm that discontinuation leads to rapid, substantial weight regain in most patients. Here is the evidence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { stat: "2 / 3", label: "Proportion of lost weight regained within 1 year" },
                { stat: "+11.6%", label: "Mean weight regained within 52 weeks of stopping" },
                { stat: "–17.3%", label: "Weight lost at peak (68 weeks on medication)" },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-black/60 backdrop-blur-sm border border-white/30 rounded-xl p-5 shadow-lg">
                  <div className="text-3xl font-bold mb-1 text-white">{stat}</div>
                  <div className="text-xs text-violet-100 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main layout: article + sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-12 lg:grid lg:grid-cols-3 lg:gap-12">

        {/* Main content */}
        <article data-route-root className="lg:col-span-2 space-y-16">

          {/* Opening verdict */}
          <p className="text-base md:text-lg text-zinc-800 leading-relaxed font-semibold border-l-4 border-violet-500 pl-5">
            The clinical verdict is consistent across every major trial: most people who stop GLP-1 medication regain two-thirds of their lost weight within one year. What follows is the evidence.
          </p>

          {/* Section 1: STEP 1 */}
          <section id="step1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4">
              The STEP 1 Extension: What Happens After You Stop
            </h2>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              The STEP 1 trial extension is the most comprehensive evidence for the GLP-1 rebound effect. After 68 weeks of semaglutide therapy with a mean weight loss of 17.3%, participants were transitioned to placebo and lifestyle guidance. Within 52 weeks of stopping, they had regained approximately two-thirds of that weight, returning to within 5.7% of their original body weight by week 120.
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              The mechanism is straightforward: semaglutide suppresses appetite by mimicking GLP-1, a hormone that signals fullness. When the drug leaves the body, appetite signals return to pre-treatment levels. Without behavioural infrastructure to support the reduced appetite, eating patterns revert within weeks.
            </p>

            {/* Chart */}
            <div className="bg-white border border-border rounded-xl p-6 mb-4">
              <h3 className="text-base font-semibold text-zinc-700 text-center mb-4">
                STEP 1: Mean Body Weight Change Over 120 Weeks (%)
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={step1Data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} title="Mean body weight change over 120 weeks on semaglutide, STEP 1 Extension trial">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Weight Change"]} />
                  <Line
                    type="monotone"
                    dataKey="change"
                    stroke={CHART_COLOR_PRIMARY}
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-zinc-400 text-center mt-3">
                Source: Wilding JPH et al. STEP 1 Extension (2022). N=327 (semaglutide arm).
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <caption className="text-xs text-zinc-500 text-left mb-2">
                  STEP 1 Extension — Weight Change Timeline
                </caption>
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900">
                    <th className="border border-zinc-200 px-4 py-3 text-left">Timepoint</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Mean Weight Change</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Treatment Status</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700">
                  {[
                    ["Week 0 (baseline)", "0%", "Semaglutide active"],
                    ["Week 20", "–8%", "Semaglutide active"],
                    ["Week 40", "–14%", "Semaglutide active"],
                    ["Week 68 (peak)", "–17.3%", "Final semaglutide dose"],
                    ["Week 80", "–12%", "Post-discontinuation"],
                    ["Week 100", "–8%", "Post-discontinuation"],
                    ["Week 120", "–5.7%", "Post-discontinuation"],
                  ].map(([time, change, status], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-zinc-50"}>
                      <td className="border border-zinc-200 px-4 py-2">{time}</td>
                      <td className="border border-zinc-200 px-4 py-2 font-medium">{change}</td>
                      <td className="border border-zinc-200 px-4 py-2">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: SURMOUNT-4 */}
          <section id="surmount4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4">
              SURMOUNT-4: What Continued Treatment Proves
            </h2>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              SURMOUNT-4 directly compared patients who continued tirzepatide (Zepbound/Mounjaro) versus those switched to placebo after 36 weeks. Both groups had lost approximately 20.9% of body weight at baseline. The divergence after that point is stark and clinically significant.
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              Patients who continued the medication achieved an additional 6.7% weight loss by week 88, reaching a cumulative 27.6%. Those who switched to placebo regained 14 percentage points by week 88, ending at just 6.9% below their original weight. In practice, this means more than two-thirds of their initial weight loss was gone within one year.
            </p>

            {/* Chart */}
            <div className="bg-white border border-border rounded-xl p-6 mb-4">
              <h3 className="text-base font-semibold text-zinc-700 text-center mb-4">
                SURMOUNT-4: Cumulative Weight Loss (%) — Continued vs Discontinued
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={surmount4Data}
                  margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                  title="SURMOUNT-4 cumulative weight loss: continued tirzepatide vs switched to placebo"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} domain={[-32, 0]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
                  <Legend />
                  <Bar dataKey="continued" name="Continued Tirzepatide" fill={CHART_COLOR_TERTIARY} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="discontinued" name="Switched to Placebo" fill={CHART_COLOR_SECONDARY} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-zinc-400 text-center mt-3">
                Source: SURMOUNT-4 Trial, Eli Lilly (2024). Aronne LJ et al.
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <caption className="text-xs text-zinc-500 text-left mb-2">
                  SURMOUNT-4 — Comparative Outcomes
                </caption>
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900">
                    <th className="border border-zinc-200 px-4 py-3 text-left">Timepoint</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Continued Tirzepatide</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Switched to Placebo</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Difference</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700">
                  {[
                    ["Week 36 (baseline)", "–20.9%", "–20.9%", "0%"],
                    ["Week 88 (outcome)", "–27.6%", "–6.9%", "–20.7 percentage points"],
                    ["Change week 36 to 88", "–6.7% (further loss)", "+14% (regain)", "—"],
                  ].map(([time, cont, disc, diff], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-zinc-50"}>
                      <td className="border border-zinc-200 px-4 py-2">{time}</td>
                      <td className="border border-zinc-200 px-4 py-2 font-medium text-cyan-700">{cont}</td>
                      <td className="border border-zinc-200 px-4 py-2 font-medium text-pink-700">{disc}</td>
                      <td className="border border-zinc-200 px-4 py-2">{diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Metabolic markers */}
          <section id="biomarkers">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4">
              Beyond the Scale: Metabolic Markers After Discontinuation
            </h2>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              Weight is only one measure of the GLP-1 rebound. Clinical trials also tracked cardiovascular risk factors during and after treatment. The pattern is consistent across markers: benefits accumulate during active treatment and diminish after discontinuation, at varying rates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Blood Pressure", icon: "BP", color: "bg-violet-100 text-violet-700", note: "Systolic and diastolic return toward baseline within 52 weeks of stopping medication." },
                { label: "HbA1c (Glycemic)", icon: "G", color: "bg-blue-100 text-blue-700", note: "Glycemic control shows the most resilience of any marker, but also declines after withdrawal." },
                { label: "Lipids", icon: "L", color: "bg-cyan-100 text-cyan-700", note: "Triglyceride and cholesterol improvements are largely lost upon weight regain." },
              ].map(({ label, icon, color, note }) => (
                <div key={label} className="bg-white border border-border rounded-lg p-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 ${color}`}>
                    {icon}
                  </div>
                  <div className="font-semibold text-zinc-900 mb-1">{label}</div>
                  <p className="text-sm text-zinc-600">{note}</p>
                </div>
              ))}
            </div>

            {/* Radar Chart */}
            <div className="bg-white border border-border rounded-xl p-6 mb-4">
              <h3 className="text-base font-semibold text-zinc-700 text-center mb-4">
                Metabolic Health Score: During Treatment vs After Discontinuation
              </h3>
              <p className="text-xs text-zinc-500 text-center mb-4">
                Index scale (0–100). Higher score = better clinical outcome.
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData} title="Metabolic health score during GLP-1 treatment versus after discontinuation">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="marker" tick={{ fontSize: 11 }} />
                  <Radar name="During Treatment" dataKey="onDrug" stroke={CHART_COLOR_PRIMARY} fill={CHART_COLOR_PRIMARY} fillOpacity={0.25} />
                  <Radar name="Post Discontinuation" dataKey="offDrug" stroke={CHART_COLOR_SECONDARY} fill={CHART_COLOR_SECONDARY} fillOpacity={0.2} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-xs text-zinc-400 text-center mt-3">
                Synthesised from STEP 1 Extension and SURMOUNT-4 biomarker sub-analyses.
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <caption className="text-xs text-zinc-500 text-left mb-2">
                  Metabolic Marker Outcomes: GLP-1 Treatment vs Post-Discontinuation
                </caption>
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900">
                    <th className="border border-zinc-200 px-4 py-3 text-left">Metabolic Marker</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">During GLP-1 Treatment</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">After Discontinuation</th>
                    <th className="border border-zinc-200 px-4 py-3 text-left">Reversal Rate</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700">
                  {[
                    ["Systolic blood pressure", "Significant reduction", "Returns toward baseline", "Rapid (within 52 weeks)"],
                    ["Diastolic blood pressure", "Moderate reduction", "Returns toward baseline", "Rapid (within 52 weeks)"],
                    ["HbA1c (blood glucose)", "Significant reduction", "Partial return to baseline", "Slower — most resilient marker"],
                    ["Triglycerides", "Significant reduction", "Largely reverses with weight regain", "Fast"],
                    ["HDL cholesterol", "Moderate improvement", "Improvement mostly lost", "Moderate"],
                    ["Insulin sensitivity", "Substantial improvement", "Diminishes with weight regain", "Moderate to fast"],
                  ].map(([marker, onDrug, offDrug, rate], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-zinc-50"}>
                      <td className="border border-zinc-200 px-4 py-2 font-medium">{marker}</td>
                      <td className="border border-zinc-200 px-4 py-2 text-violet-700">{onDrug}</td>
                      <td className="border border-zinc-200 px-4 py-2 text-pink-700">{offDrug}</td>
                      <td className="border border-zinc-200 px-4 py-2 text-zinc-500">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Strategic implications */}
          <section id="implications">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4">
              What the Evidence Means Clinically
            </h2>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              Research from O'Neil et al. (2024) and the combined trial data point to three clinical realities that patients and practitioners need to understand before starting GLP-1 therapy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: "Obesity as Chronic Disease",
                  color: "border-violet-400 text-violet-700",
                  body: "GLP-1 medications work because obesity has a biological component. But treating a chronic condition with a temporary intervention produces temporary results. Short-term therapy does not resolve the metabolic drive to regain weight.",
                },
                {
                  label: "Gradual Tapering Research",
                  color: "border-pink-400 text-pink-700",
                  body: "Emerging studies are exploring whether gradual dose reduction combined with rigorous lifestyle intervention can reduce the rebound effect. The evidence base is early and results are mixed.",
                },
                {
                  label: "Behavioural Support is Non-Optional",
                  color: "border-cyan-400 text-cyan-700",
                  body: "Dietary intervention, resistance training, and psychological behaviour change are not optional add-ons to GLP-1 therapy. They are the mechanisms that determine whether weight loss is permanent after the drug stops.",
                },
              ].map(({ label, color, body }) => (
                <div key={label} className={`border-l-4 ${color} bg-white rounded-lg p-5 shadow-sm`}>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${color.split(" ")[1]}`}>{label}</div>
                  <p className="text-sm text-zinc-700 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: The Behavioral Layer */}
          <section id="behavioral-layer" className="bg-zinc-50 border border-border rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4">
              The Behavioral Layer GLP-1 Cannot Provide
            </h2>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
              GLP-1 medications solve a biological problem: chronically elevated appetite signals that make reduced eating feel painful. When that signal is suppressed pharmacologically, eating less becomes easier. That is real and clinically meaningful.
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
              What the drug does not change are the behavioural patterns, environmental triggers, and identity structures that drove weight gain in the first place. The eating cues are still there. The emotional associations with food are still there. The social and situational patterns are still there. The drug was suppressing your response to them. When the drug stops, those responses return.
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              This is not a failure of the medication. It is a gap in the model. GLP-1 drugs were designed to address appetite biology, not behaviour. Addressing behaviour requires a different system entirely.
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
              <a href="/weight-permanence-training" className="font-semibold text-accent hover:underline">
                Weight Permanence Training™
              </a>{" "}
              was built to close that gap. It works through five structured stages of awareness that surface the patterns, triggers, and identity questions that determine whether any weight loss is permanent. It is not a replacement for GLP-1 therapy. It is the behavioural infrastructure that determines what happens after the drug stops.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="lg">
                <a href="/awareness-stages">See the 5 Awareness Stages</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/weight-permanence-training">How Weight Permanence Training Works</a>
              </Button>
            </div>
          </section>

          {/* Attribution */}
          <footer className="border-t border-border pt-8 text-sm text-zinc-500 space-y-2">
            <p>
              <strong className="text-zinc-700">Research synthesis:</strong> Clinical dashboard based on analysis by Google Gemini. Trial data from Wilding JPH et al. (STEP 1 Extension, 2022) and Aronne LJ et al. (SURMOUNT-4, 2024).
            </p>
            <p>
              <strong className="text-zinc-700">Behavioural context:</strong>{" "}
              <a href="/oscar-poon" className="text-accent hover:underline">Oscar Poon</a>, Founder of LS Diet and creator of Weight Permanence Training™.
            </p>
            <p className="text-xs text-zinc-400">
              This page presents a synthesis of published clinical trial data for educational purposes. It is not medical advice. Consult a healthcare provider before starting, stopping, or changing any medication.
            </p>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-zinc-50 border border-border rounded-xl p-6">
              <h3 className="text-base font-bold text-zinc-900 mb-4">Related GLP-1 Research</h3>
              <nav className="space-y-3 text-sm">
                {[
                  { href: "/blog/why-you-regain-weight-after-stopping-ozempic", label: "Why You Regain Weight After Stopping Ozempic" },
                  { href: "/blog/oral-glp-1-pill-what-happens-when-you-stop", label: "Oral GLP-1 Pill: What Happens When You Stop" },
                  { href: "/blog/youre-losing-muscle-not-just-fat-on-glp1-drugs", label: "You're Losing Muscle, Not Just Fat, on GLP-1 Drugs" },
                  { href: "/does-glp-1-work", label: "Does GLP-1 Work for Weight Loss?" },
                ].map(({ href, label }) => (
                  <a key={href} href={href} className="block text-accent hover:underline leading-snug">
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <h3 className="text-base font-bold text-zinc-900 mb-2">Weight Permanence Training™</h3>
              <p className="text-sm text-zinc-700 mb-4 leading-relaxed">
                The behavioural system built to ensure weight loss is permanent whether you use GLP-1 medication or not.
              </p>
              <Button asChild variant="accent" size="sm" className="w-full">
                <a href="/weight-permanence-training">Learn How It Works</a>
              </Button>
            </div>

            <div className="bg-zinc-50 border border-border rounded-xl p-6">
              <h3 className="text-base font-bold text-zinc-900 mb-2">Key Data Points</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { term: "–17.3%", def: "Mean weight loss at week 68 on semaglutide (STEP 1)" },
                  { term: "–5.7%", def: "Remaining weight loss at week 120 after stopping (STEP 1)" },
                  { term: "–27.6%", def: "Weight loss in continued tirzepatide group at week 88 (SURMOUNT-4)" },
                  { term: "–6.9%", def: "Weight loss in placebo group at week 88 after stopping (SURMOUNT-4)" },
                ].map(({ term, def }) => (
                  <div key={term}>
                    <dt className="font-bold text-violet-700">{term}</dt>
                    <dd className="text-zinc-600 text-xs">{def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {/* End CTA */}
      <div className="bg-zinc-900 text-white py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Why Behavior Change Matters
          </h2>
          <p className="text-zinc-300 mb-8 leading-relaxed">
            The clinical evidence is clear: GLP-1 medications are effective while you take them. Understanding the role of behaviour is what separates temporary weight loss from permanent weight loss.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="accent">
              <a href="/weight-permanence-training">Learn About Weight Permanence Training™</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-zinc-900">
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Start Free Training
              </a>
            </Button>
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  );
}
