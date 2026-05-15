import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | LS Diet</title>
        <meta name="description" content="How LS Diet (NTL Learning Solutions Inc.) collects, uses, and protects your personal information under Canadian PIPEDA law." />
        <link rel="canonical" href="https://lsdiet.com/privacy" />
        <meta property="og:title" content="Privacy Policy | LS Diet" />
        <meta property="og:description" content="How LS Diet handles your personal information under PIPEDA." />
        <meta property="og:url" content="https://lsdiet.com/privacy" />
      </Helmet>
      <Navbar />
      <main className="container max-w-3xl py-24 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 1, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p>
            NTL Learning Solutions Inc., operating as WhatAboutWeight, LSdiet, and Weight Permanence Triangle (WPT), 
            respects your privacy and is committed to protecting your personal information in accordance with 
            Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
          <p>We may collect personal information when you:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Visit our website</li>
            <li>Subscribe to emails or updates</li>
            <li>Complete a contact form</li>
            <li>Purchase products or services</li>
            <li>Interact with site analytics or cookies</li>
          </ul>
          <p>
            This information may include your name, email address, payment details, IP address, and basic usage data.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How We Use Information</h2>
          <p>We use personal information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide and improve our content, products, and services</li>
            <li>Process purchases and deliver access</li>
            <li>Communicate with you about updates or offers</li>
            <li>Understand how the site is used and improve user experience</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Third-Party Services</h2>
          <p>
            We may use trusted third-party services such as payment processors, email platforms, 
            analytics tools, or hosting providers.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Cookies and Analytics</h2>
          <p>
            Our website may use cookies or similar technologies to understand site usage and improve performance.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Data Storage and Security</h2>
          <p>
            We take reasonable steps to protect personal information against loss, misuse, or unauthorized access.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by contacting us.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact</h2>
          <p>
            For privacy inquiries, please use the contact form on our website.
          </p>
        </div>
      </main>
      <FooterSimple />
    </div>
  );
};

export default PrivacyPolicy;
