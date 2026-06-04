import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { ProblemHookSection } from "@/components/ProblemHookSection";
import { HeroSection } from "@/components/HeroSection";


import { WhatIsLSDietSection } from "@/components/WhatIsLSDietSection";
import { HeroPitchSection } from "@/components/HeroPitchSection";
import { AwarenessStagesSection } from "@/components/AwarenessStagesSection";
import { QuizTeaserSection } from "@/components/QuizTeaserSection";

import { FAQSection } from "@/components/FAQSection";
import { BookSection } from "@/components/BookSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
import { FooterSimple } from "@/components/FooterSimple";
import { JoinFloatingBar } from "@/components/JoinFloatingBar";
import { QuizInviteCard } from "@/components/QuizInviteCard";
import { QuizSideTab } from "@/components/QuizSideTab";


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
        <title>LS Diet — Weight Regain Prevention System</title>
        <meta
          name="description"
          content="Oscar Poon's weight regain prevention system. Stop weight cycling with the Weight Permanence Training™ and a low-starch, low-sugar lifestyle."
        />
        <link rel="canonical" href="https://lsdiet.com/" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemHookSection />
        <QuizInviteCard />

        <HeroPitchSection />


        <BookSection />
        <WhatIsLSDietSection />
        <AwarenessStagesSection />
        <FAQSection />
        <QuizTeaserSection />
        <AboutAuthorSection />


      </main>
      <FooterSimple />
      <JoinFloatingBar />
    </div>
  );
};

export default Index;
