import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-24 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-6">
          Terms of Use
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 1, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p>
            By accessing or using this website, you agree to these Terms of Use.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Purpose of the Website</h2>
          <p>
            NTL Learning Solutions Inc., operating as WhatAboutWeight, LSdiet, and Weight Permanence Triangle (WPT), 
            provides educational content related to weight, behaviour, and lifestyle.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">No Medical Advice</h2>
          <p>
            The information on this site is not medical advice and is not a substitute for professional care.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">User Responsibility</h2>
          <p>
            You are responsible for how you use the information on this site.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content on this site, including but not limited to text, graphics, logos, images, and software, 
            is the property of NTL Learning Solutions Inc. The trademarks "WhatAboutWeight," "LSdiet," and 
            "Weight Permanence Triangle" (WPT) are owned by NTL Learning Solutions Inc. 
            Unauthorized use of any content or trademarks is strictly prohibited.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
          <p>
            NTL Learning Solutions Inc. and its affiliates are not liable for any direct, indirect, incidental, 
            consequential, or punitive damages resulting from the use of this website or reliance on its content.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Governing Law</h2>
          <p>
            These Terms are governed by the laws of Canada and the province of Ontario. 
            Any disputes arising from these Terms shall be resolved in the courts of Ontario, Canada.
          </p>
        </div>
      </main>
      <FooterSimple />
    </div>
  );
};

export default TermsOfUse;
