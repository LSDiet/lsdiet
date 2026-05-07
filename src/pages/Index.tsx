import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
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
