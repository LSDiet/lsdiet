import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsLSDietSection } from "@/components/WhatIsLSDietSection";
import { HeroPitchSection } from "@/components/HeroPitchSection";
import { CorePrincipleSection } from "@/components/CorePrincipleSection";
import { MethodSection } from "@/components/MethodSection";
import { AwarenessStagesSection } from "@/components/AwarenessStagesSection";
import { WhyDietsFailSection } from "@/components/WhyDietsFailSection";
import { FAQSection } from "@/components/FAQSection";
import { BookSection } from "@/components/BookSection";
import { ContactSection } from "@/components/ContactSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
import { FooterSimple } from "@/components/FooterSimple";
import { JoinFloatingBar } from "@/components/JoinFloatingBar";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://lsdiet.com/#webpage",
  url: "https://lsdiet.com/",
  name: "LS Diet | Stop Restarting Weight Loss",
  isPartOf: { "@id": "https://lsdiet.com/#website" },
  about: { "@type": "Thing", name: "Weight Permanence Triangle", sameAs: "https://lsdiet.com/weight-permanence-triangle" },
  mainEntity: { "@id": "https://lsdiet.com/#organization" },
  primaryImageOfPage: { "@id": "https://lsdiet.com/#logo" },
  author: { "@id": "https://lsdiet.com/#oscar-poon" },
  inLanguage: "en",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://lsdiet.com/" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsLSDietSection />
        <HeroPitchSection />
        <CorePrincipleSection />
        <MethodSection />
        <AwarenessStagesSection />
        <WhyDietsFailSection />
        <FAQSection />
        <BookSection />
        <ContactSection />
        <AboutAuthorSection />
      </main>
      <FooterSimple />
      <JoinFloatingBar />
    </div>
  );
};

export default Index;
