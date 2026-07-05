import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { ProblemHookSection } from "@/components/ProblemHookSection";
import { HeroSection } from "@/components/HeroSection";
import { BookSection } from "@/components/BookSection";
import { FAQSection } from "@/components/FAQSection";
import { QuizTeaserSection } from "@/components/QuizTeaserSection";
import { SkepticHubSection } from "@/components/SkepticHubSection";
import { FooterSimple } from "@/components/FooterSimple";

function SectionDivider() {
  return <div className="h-px w-full bg-border" />;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lsdiet.com/#organization",
  name: "LS Diet",
  legalName: "NTL Learning Solutions Inc.",
  alternateName: ["Low-Starch, Low-Sugar Diet", "LS Diet Method"],
  url: "https://lsdiet.com",
  logo: {
    "@type": "ImageObject",
    "@id": "https://lsdiet.com/#logo",
    url: "https://lsdiet.com/favicon.png",
    contentUrl: "https://lsdiet.com/favicon.png",
  },
  founder: { "@id": "https://lsdiet.com/oscar-poon#person" },
  foundingLocation: { "@type": "Place", name: "Vancouver, BC, Canada" },
  description:
    "LS Diet (Low Starch, Low Sugar) helps men and women 35+ stop regaining weight through Weight Permanence Training™ — a behavioural identity system built for permanent change.",
  disambiguatingDescription:
    "LS Diet stands for Low Starch, Low Sugar — a carbohydrate-reduction lifestyle for weight loss. It is unrelated to sodium-restricted or 'low salt' diets used for blood pressure or kidney conditions, and is not affiliated with any reptile or animal feed product.",
  knowsAbout: [
    { "@type": "Thing", name: "Weight Permanence Training", url: "https://lsdiet.com/weight-permanence-training" },
    { "@type": "Thing", name: "Low-Carbohydrate Diet", sameAs: "https://en.wikipedia.org/wiki/Low-carbohydrate_diet" },
    { "@type": "Thing", name: "Behavioural Weight Loss", sameAs: "https://en.wikipedia.org/wiki/Behavioral_weight_loss" },
    { "@type": "Thing", name: "Insulin Resistance", sameAs: "https://en.wikipedia.org/wiki/Insulin_resistance" },
    { "@type": "Thing", name: "Identity-Based Habit Change", sameAs: "https://en.wikipedia.org/wiki/Identity_(social_science)" },
    { "@type": "Thing", name: "Weight Cycling", sameAs: "https://en.wikipedia.org/wiki/Weight_cycling" },
  ],
  sameAs: [
    "https://www.youtube.com/@JoinLSDiet",
    "https://www.instagram.com/JoinLSDiet",
    "https://www.tiktok.com/@JoinLSDiet",
    "https://www.facebook.com/JoinLSDiet",
    "https://x.com/JoinLSDiet",
    "https://www.linkedin.com/company/lsdiet",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "oscar@lsdiet.com",
    contactType: "customer support",
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://lsdiet.com/#website",
  url: "https://lsdiet.com",
  name: "LS Diet",
  publisher: { "@id": "https://lsdiet.com/#organization" },
  inLanguage: "en-CA",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://lsdiet.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://lsdiet.com/#webpage",
  url: "https://lsdiet.com/",
  name: "LS Diet | Stop Regaining Weight",
  isPartOf: { "@id": "https://lsdiet.com/#website" },
  about: [
    { "@type": "Thing", name: "Weight Regain Prevention", description: "Preventing weight regain after dieting through behavioural permanence and a low-starch, low-sugar lifestyle.", sameAs: "https://en.wikipedia.org/wiki/Weight_cycling" },
    { "@type": "Thing", name: "Weight Permanence Training", url: "https://lsdiet.com/weight-permanence-training" },
    { "@type": "Thing", name: "Insulin Resistance", sameAs: "https://en.wikipedia.org/wiki/Insulin_resistance" },
    { "@type": "Thing", name: "Low-Carbohydrate Diet", sameAs: "https://en.wikipedia.org/wiki/Low-carbohydrate_diet" },
  ],
  mainEntity: { "@id": "https://lsdiet.com/#organization" },
  primaryImageOfPage: { "@id": "https://lsdiet.com/#logo" },
  author: { "@id": "https://lsdiet.com/#oscar-poon" },
  inLanguage: "en",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LS Diet — Stop Regaining Weight | Weight Permanence Training™</title>
        <meta
          name="description"
          content="Lost weight before but keep gaining it back? LS Diet helps men and women 35+ break the weight regain cycle using Weight Permanence Training™. Free training. No calorie counting."
        />
        <link rel="canonical" href="https://lsdiet.com/" />
        <meta property="og:title" content="LS Diet — Stop Regaining Weight | Weight Permanence Training™" />
        <meta property="og:description" content="Lost weight before but keep gaining it back? LS Diet helps men and women 35+ break the weight regain cycle using Weight Permanence Training™." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        {/* 1 — Problem hook + quiz CTA (hero) */}
        <ProblemHookSection />
        <SectionDivider />
        {/* 2 — Before/after carousel (credibility) */}
        <HeroSection />
        <SectionDivider />
        {/* 4 — What's inside the community */}
        <BookSection />
        <SectionDivider />
        {/* 5 — FAQ / objection handling */}
        <FAQSection />
        <SectionDivider />
        {/* 6 — Final join CTA */}
        <QuizTeaserSection />
        <SectionDivider />
        {/* 7 — Skeptic hub: authority links for readers who want proof first */}
        <SkepticHubSection />
      </main>
      <FooterSimple />
    </div>
  );
};

export default Index;
