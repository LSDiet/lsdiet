import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';
import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Download, Loader2, ArrowRight } from 'lucide-react';
import glp1Cover from '@/assets/ebook-glp1-cover.png';

const RESOURCE_ID = 'ebook-glp1-weight-loss';
const FILE_PATH = 'Does GLP-1 work for weight loss.pdf';
const RESOURCE_TITLE = 'Does GLP-1 Work for Weight Loss?';

const faqs = [
  {
    question: 'Does GLP-1 work for weight loss?',
    answer:
      'Yes, GLP-1 medications can support short term weight loss by suppressing appetite and slowing digestion. However, they do not teach eating behaviour or build habits that persist once appetite suppression fades.',
  },
  {
    question: 'Why do many people regain weight after stopping GLP-1?',
    answer:
      'Weight regain often occurs because the medication reduces hunger temporarily without changing eating patterns. When normal appetite signals return, people frequently return to familiar food choices and behaviours.',
  },
  {
    question: 'Does GLP-1 change how people eat long term?',
    answer:
      'GLP-1 can reduce appetite while it is active, but it does not retrain food decision making or address how people eat under stress, fatigue, or routine disruption.',
  },
  {
    question: 'Is GLP-1 a permanent solution for weight management?',
    answer:
      'For most people, GLP-1 is not a standalone long term solution. Sustainable weight management usually requires changes in food choices, routines, and behaviour that function even without medication.',
  },
  {
    question: 'What should people understand before using GLP-1 for weight loss?',
    answer:
      "GLP-1 can be a tool, but it does not replace learning how hunger responds to certain foods or how habits drive weight regain. Understanding what happens after appetite suppression ends is critical.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Does GLP-1 Work for Weight Loss?',
  description:
    'Learn why GLP-1 medications like Ozempic and Wegovy work for weight loss, why weight often returns after stopping, and what determines long-term results.',
  author: {
    '@type': 'Person',
    name: 'Oscar Poon',
    url: 'https://lsdiet.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Weight Permanence',
    url: 'https://lsdiet.com',
  },
  datePublished: '2025-02-01T12:00:00+00:00',
  dateModified: '2025-02-01T12:00:00+00:00',
};

export default function GLP1GuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, hasEmail, captureAndDownload, downloadForReturningUser } =
    useLeadCapture();

  const handleDownloadClick = async () => {
    if (hasEmail) {
      await downloadForReturningUser(RESOURCE_ID, FILE_PATH, RESOURCE_TITLE);
    } else {
      setModalOpen(true);
    }
  };

  const handleModalSubmit = async (email: string, firstName: string) => {
    await captureAndDownload(email, RESOURCE_ID, FILE_PATH, RESOURCE_TITLE, firstName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Does GLP-1 Work for Weight Loss? | Free Guide</title>
        <meta
          name="description"
          content="Learn why GLP-1 medications like Ozempic and Wegovy work for weight loss, why weight often returns after stopping, and what determines long-term results. Free downloadable guide."
        />
        <link rel="canonical" href="https://lsdiet.com/does-glp-1-work" />
        <meta name="author" content="Oscar Poon" />

        {/* Open Graph */}
        <meta property="og:title" content="Does GLP-1 Work for Weight Loss? | Free Guide" />
        <meta
          property="og:description"
          content="Why GLP-1 medications like Ozempic work, why weight often returns, and what actually determines long-term results."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/does-glp-1-work" />
        <meta property="og:image" content="https://lsdiet.com/og-glp1-guide.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Does GLP-1 Work for Weight Loss?" />
        <meta
          name="twitter:description"
          content="Why GLP-1 medications like Ozempic work, why weight often returns, and what determines long-term results."
        />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <article className="container max-w-4xl">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-primary mb-6">
              Does GLP-1 Work for Weight Loss?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Many people experience significant weight loss on GLP-1 medications like Ozempic or
              Wegovy. But what happens when the medication stops? This guide explores why weight
              often returns—and what actually determines long-term results.
            </p>
            <Button size="lg" onClick={handleDownloadClick} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download the Free Guide
                </>
              )}
            </Button>
          </header>

          {/* Educational Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                How Does GLP-1 Medication Work?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GLP-1 stands for glucagon-like peptide-1, a hormone released from the gut after
                eating. It signals fullness to the brain, slows gastric emptying, and regulates
                insulin. Medications known as GLP-1 receptor agonists—such as semaglutide (Ozempic,
                Wegovy) and tirzepatide (Mounjaro, Zepbound)—amplify this signal, making people
                feel satisfied with less food.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For many, the effect is profound. Hunger fades. Portions shrink naturally. The
                mental effort of managing intake decreases. During this phase, weight loss can be
                significant—sometimes 10-15% of body weight or more.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What GLP-1 Medications Do Not Train
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GLP-1 medications suppress appetite. They do not, however, retrain the underlying
                eating behaviours that contributed to weight gain in the first place. The
                medication does not teach you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>How to make food decisions when hunger returns</li>
                <li>How to navigate food environments full of starch and sugar</li>
                <li>How to eat under stress, fatigue, or social pressure</li>
                <li>How to establish routines that support lower-starch eating long-term</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                While appetite is reduced, these skill gaps often go unnoticed. The medication
                handles the heavy lifting. But the moment the medication stops—or its effect
                diminishes—those gaps become visible.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What Happens After the Medication Stops
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Clinical data shows that most people who discontinue GLP-1 medications regain a
                significant portion of the weight they lost. In the STEP 1 extension trial,
                participants regained roughly two-thirds of lost weight within one year of stopping
                semaglutide. Similar trends have been observed across other GLP-1 trials.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is not because the medication failed. During active treatment, it did exactly
                what it was designed to do: reduce hunger and support caloric deficit. The regain
                happens because when normal appetite signals return, so do the patterns and
                routines that led to weight gain originally.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What GLP-1 Does Not Solve
              </h2>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">1. Eating Habits</h3>
              <p className="text-muted-foreground leading-relaxed">
                Without deliberate practice, people return to familiar foods and portion sizes when
                appetite suppression ends. The habits were paused, not replaced.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">
                2. Social and Cultural Pressure
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Eating is embedded in social contexts—family dinners, work lunches, holidays.
                GLP-1 does not prepare people for navigating these situations once their appetite
                normalises.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">3. Food Environment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Starch and sugar remain highly accessible. When hunger returns, so does the
                challenge of resisting foods that trigger rapid intake and blood sugar swings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                The Weight Permanence Triangle™ Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What determines long-term success is not the medication itself—it's what happens
                during and after. The Weight Permanence Triangle™ (WPT) is a neurobehavioural
                training framework designed to address exactly this.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                WPT has three stages:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>
                  <strong className="text-foreground">Awareness</strong> – Recognising how specific
                  foods trigger hunger and how routines shape eating patterns
                </li>
                <li>
                  <strong className="text-foreground">Practice</strong> – Building new behaviours
                  through deliberate repetition in real-world contexts
                </li>
                <li>
                  <strong className="text-foreground">Permanence</strong> – Reaching the point
                  where low-starch eating becomes automatic, no longer requiring willpower
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                When combined with GLP-1 medication, WPT transforms the window of appetite
                suppression into an opportunity to build lasting skills. Instead of coasting on
                reduced hunger, you actively train new defaults—so that when appetite returns, the
                foundation is already in place.
              </p>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Download CTA Section */}
          <section className="bg-secondary/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                  <img
                    src={glp1Cover}
                    alt="Does GLP-1 Work for Weight Loss? Free Guide Cover"
                    className="relative max-w-xs w-full drop-shadow-2xl rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                  Get the Full Guide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Download the complete guide to understand why GLP-1 works, why weight often
                  returns, and how to use the medication window to build lasting change.
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto animate-pulse-glow"
                  onClick={handleDownloadClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download the Free Guide
                    </>
                  )}
                </Button>
              </div>
            </div>
          </section>

          {/* Internal Link to Course */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to start using Weight Permanence Triangle™ to lose weight?
            </p>
            <a
              href="/#book"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Join the <span className="text-accent font-extrabold animate-pulse-glow">FREE</span> 7-Day Weight Permanence Course
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <div className="mt-6 flex justify-center">
              <Button size="lg" onClick={handleDownloadClick} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download the Free Guide
                  </>
                )}
              </Button>
            </div>
          </div>
        </article>
      </main>

      <FooterSimple />

      <EmailCaptureModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        resourceTitle={RESOURCE_TITLE}
        onSubmit={handleModalSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
