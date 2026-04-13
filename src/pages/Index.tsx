import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CinematicIntro } from "@/components/CinematicIntro";
import { YouTubeShortsSection } from "@/components/YouTubeShortsSection";
import { TransformationGallery } from "@/components/TransformationGallery";
import { CorePrincipleSection } from "@/components/CorePrincipleSection";
import { MethodSection } from "@/components/MethodSection";
import { BookSection } from "@/components/BookSection";
import { ContactSection } from "@/components/ContactSection";
import { AboutAuthorSection } from "@/components/AboutAuthorSection";
import { FooterSimple } from "@/components/FooterSimple";
import { StickyCountdown } from "@/components/StickyCountdown";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CinematicIntro />
      <HeroSection />
      <YouTubeShortsSection />
      <TransformationGallery />
      <CorePrincipleSection />
      <MethodSection />
      <BookSection />
      <ContactSection />
      <AboutAuthorSection />
      <FooterSimple />
      <StickyCountdown />
    </div>
  );
};

export default Index;
