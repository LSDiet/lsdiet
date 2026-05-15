import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const HealthDisclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Health Disclaimer | LS Diet</title>
        <meta name="description" content="LS Diet content is educational only and is not medical advice. Always consult a qualified healthcare provider before changing your diet or routine." />
        <link rel="canonical" href="https://lsdiet.com/disclaimer" />
        <meta property="og:title" content="Health Disclaimer | LS Diet" />
        <meta property="og:description" content="LS Diet content is educational only — not medical advice." />
        <meta property="og:url" content="https://lsdiet.com/disclaimer" />
      </Helmet>
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
