import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const HealthDisclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-24 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-6">
          Health Disclaimer
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p>
            The content provided by NTL Learning Solutions Inc., operating as WhatAboutWeight, LSdiet, 
            and Weight Permanence Triangle (WPT), is for educational and informational purposes only.
          </p>

          <p>
            It is not intended to diagnose, treat, cure, or prevent any disease.
          </p>

          <p>
            Always seek advice from a qualified healthcare provider before making any changes to your 
            diet, exercise routine, or health practices.
          </p>

          <p>
            By using this website, you acknowledge full responsibility for your own health decisions 
            and agree that NTL Learning Solutions Inc. shall not be held liable for any outcomes 
            resulting from the use of information provided on this site.
          </p>
        </div>
      </main>
      <FooterSimple />
    </div>
  );
};

export default HealthDisclaimer;
