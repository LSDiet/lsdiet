import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsLSDietSection } from "@/components/WhatIsLSDietSection";
import { HeroPitchSection } from "@/components/HeroPitchSection";
import { AwarenessStagesSection } from "@/components/AwarenessStagesSection";

import { FAQSection } from "@/components/FAQSection";
import { BookSection } from "@/components/BookSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
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
    { "@type": "Thing", name: "Weight Permanence Triangle", sameAs: "https://lsdiet.com/weight-permanence-triangle" },
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
        <title>LS Diet — Weight Regain Prevention System | Stop Regaining Weight</title>
        <meta
          name="description"
          content="LS Diet is Oscar Poon's weight regain prevention system. Stop weight cycling for good with the Weight Permanence Triangle™ and a low-starch, low-sugar lifestyle."
        />
        <link rel="canonical" href="https://lsdiet.com/" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsLSDietSection />
        <HeroPitchSection />
        <AwarenessStagesSection />
        
        <BookSection />
        <FAQSection />
        <AboutAuthorSection />
      </main>
      <FooterSimple />
      <JoinFloatingBar />
    </div>
  );
};

export default Index;
