import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsLSDietSection } from "@/components/WhatIsLSDietSection";
import { HeroPitchSection } from "@/components/HeroPitchSection";
import { CorePrincipleSection } from "@/components/CorePrincipleSection";
import { MethodSection } from "@/components/MethodSection";
import { AwarenessStagesSection } from "@/components/AwarenessStagesSection";
import { WhyDietsFailSection } from "@/components/WhyDietsFailSection";
import { BookSection } from "@/components/BookSection";
import { ContactSection } from "@/components/ContactSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
import { FooterSimple } from "@/components/FooterSimple";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatIsLSDietSection />
      <HeroPitchSection />
      <CorePrincipleSection />
      <MethodSection />
      <AwarenessStagesSection />
      <WhyDietsFailSection />
      <BookSection />
      <ContactSection />
      <AboutAuthorSection />
      <FooterSimple />
    </div>
  );
};

export default Index;
