import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { ProblemHookSection } from "@/components/ProblemHookSection";
import { HeroSection } from "@/components/HeroSection";
import { QuizInviteCard } from "@/components/QuizInviteCard";
import { BookSection } from "@/components/BookSection";
import { FAQSection } from "@/components/FAQSection";
import { QuizTeaserSection } from "@/components/QuizTeaserSection";
import { FooterSimple } from "@/components/FooterSimple";
import { JoinFloatingBar } from "@/components/JoinFloatingBar";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://lsdiet.com/#webpage",
  url: "https://lsdiet.com/",
  name: "LS Diet | Stop Regaining Weight",
  isPartOf: { "@id": "https://lsdiet.com/#website" },
  about: [
    { "@type": "Thing", name: "Weight Regain Prevention", description: "Preventing weight regain after dieting through behavioural permanence and a low-starch, low-sugar lifestyle." },
    { "@type": "Thing", name: "Weight Permanence Training", sameAs: "https://lsdiet.com/weight-permanence-triangle" },
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
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        {/* 1 — Problem hook + quiz CTA (hero) */}
        <ProblemHookSection />
        {/* 2 — Quiz invite (captures intent immediately) */}
        <QuizInviteCard />
        {/* 3 — Before/after carousel (credibility) */}
        <HeroSection />
        {/* 4 — What's inside the community */}
        <BookSection />
        {/* 5 — FAQ / objection handling */}
        <FAQSection />
        {/* 6 — Final join CTA */}
        <QuizTeaserSection />
      </main>
      <FooterSimple />
      <JoinFloatingBar />
    </div>
  );
};

export default Index;
