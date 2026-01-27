import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { JourneySection } from "@/components/JourneySection";
import { MethodSection } from "@/components/MethodSection";
import { BookSection } from "@/components/BookSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSimple } from "@/components/FooterSimple";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <JourneySection />
      <MethodSection />
      <BookSection />
      <ContactSection />
      <FooterSimple />
    </div>
  );
};

export default Index;
