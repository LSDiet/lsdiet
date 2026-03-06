import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { JourneySection } from "@/components/JourneySection";
import { YouTubeShortsSection } from "@/components/YouTubeShortsSection";
import { MissingPieceSection } from "@/components/MissingPieceSection";
import { CorePrincipleSection } from "@/components/CorePrincipleSection";
import { MethodSection } from "@/components/MethodSection";
import { BookSection } from "@/components/BookSection";
import { ContactSection } from "@/components/ContactSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
import { FooterSimple } from "@/components/FooterSimple";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <JourneySection />
      <YouTubeShortsSection />
      <MissingPieceSection />
      <CorePrincipleSection />
      <MethodSection />
      <BookSection />
      <ContactSection />
      <AboutAuthorSection />
      <FooterSimple />
    </div>
  );
};

export default Index;
