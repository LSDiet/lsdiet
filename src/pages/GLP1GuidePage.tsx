import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'Does GLP-1 work for weight loss?',
    answer:
      'Yes, GLP-1 medications support short term weight loss by suppressing appetite and slowing digestion. But they do not teach eating behaviour or build habits that persist once appetite suppression fades.',
  },
  {
    question: 'Why do many people regain weight after stopping GLP-1?',
    answer:
      'Weight regain happens because the medication reduces hunger temporarily without changing eating patterns. When normal appetite signals return, people go back to familiar food choices and behaviours.',
  },
  {
    question: 'Does GLP-1 change how people eat long term?',
    answer:
      'GLP-1 reduces appetite while it is active, but it does not retrain food decision making or address how people eat under stress, fatigue, or routine disruption.',
  },
  {
    question: 'Is GLP-1 a permanent solution for weight management?',
    answer:
      'For most people, no. Sustainable weight management requires changes in food choices, routines, and behaviour that function even without medication.',
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
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Does GLP-1 Work for Weight Loss? | Free Guide</title>
        <meta
          name="description"
          content="Why GLP-1 drugs like Ozempic and Wegovy work for weight loss, why weight returns after stopping, and what drives long-term results. Free guide."
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
              GLP-1 medications like Ozempic and Wegovy work for weight loss while you take them,
              but most people regain the weight once they stop. This guide covers why the
              medication works, why the results reverse, and what determines whether they last.
            </p>
            <Button size="lg" asChild>
              <a href="/glp-1-rebound-analysis">
                See real data on drug effectiveness and rebound
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
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
                insulin. Medications called GLP-1 receptor agonists, such as semaglutide (Ozempic,
                Wegovy) and tirzepatide (Mounjaro, Zepbound), amplify this signal, making people
                feel satisfied with less food.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For many, the effect is profound. Hunger fades. Portions shrink naturally. The
                mental effort of managing intake decreases. During this phase, weight loss can be
                significant, sometimes 10 to 15% of body weight or more.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What Doesn't GLP-1 Train You to Do?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GLP-1 medications suppress appetite. They do not retrain the eating behaviours that
                contributed to weight gain in the first place. The medication does not teach you
                how to make food decisions when hunger returns, how to navigate food environments
                full of starch and sugar, how to eat under stress or social pressure, or how to
                build routines that support low-starch eating long term.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                While appetite is reduced, these skill gaps often go unnoticed. The medication
                handles the heavy lifting. The moment it stops, or its effect fades, those gaps
                become visible.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What Happens When You Stop Taking GLP-1?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most people who discontinue GLP-1 medications regain a significant portion of the
                weight they lost. In the STEP 1 extension trial, participants regained roughly
                two-thirds of lost weight within one year of stopping semaglutide. Other GLP-1
                trials show the same pattern.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is not a medication failure. During active treatment, it did exactly what it
                was designed to do: reduce hunger and support a calorie deficit. The regain happens
                because when normal appetite signals return, so do the patterns and routines that
                led to weight gain originally.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What Does GLP-1 Not Solve?
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
                Eating is embedded in social contexts: family dinners, work lunches, holidays.
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
                How Does Weight Permanence Training™ Fix This?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What determines long-term success is not the medication itself. It's what happens
                during and after. Weight Permanence Training™ (WPT) is a neurobehavioural training
                framework built to address exactly this.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                WPT runs in three stages, starting with{' '}
                <a href="/awareness-stages" className="text-primary hover:underline">
                  Awareness
                </a>
                : recognising how specific foods trigger hunger and how routines shape eating
                patterns. Practice means building new behaviours through deliberate repetition in
                real-world contexts. Permanence means reaching the point where low-starch eating
                becomes automatic and stops requiring willpower.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Combined with GLP-1 medication, WPT turns the window of appetite suppression into
                an opportunity to build lasting skills. Instead of coasting on reduced hunger, you
                train new defaults, so when appetite returns, the foundation is already in place.
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

          {/* Primary CTA */}
          <section className="bg-secondary/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
              Want the Data Behind the Regain?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              See the real clinical numbers on how well GLP-1 drugs work and how much of the
              weight loss reverses after people stop taking them.
            </p>
            <Button size="lg" asChild>
              <a href="/glp-1-rebound-analysis">
                See real data on drug effectiveness and rebound
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </section>
        </article>
      </main>

      <FooterSimple />
    </div>
  );
}
