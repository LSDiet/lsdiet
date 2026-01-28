import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Weight Regain",
    questions: [
      {
        question: "Why do I regain weight even when I eat less?",
        answer:
          "Eating less often backfires because it triggers hormonal responses — cortisol rises, metabolic rate drops, and hunger intensifies. If insulin stays elevated from starch and sugar, your body remains in fat-storage mode even at lower calories. Sustainable weight loss requires addressing the biology of hunger, not just portion sizes.",
      },
      {
        question: "Why can't I keep weight off long term?",
        answer:
          "Long-term weight maintenance fails when the approach relies on willpower rather than biology. When you diet without changing what triggers hunger and cravings, your body fights back with increased appetite and reduced energy expenditure. The key is finding an eating pattern that naturally regulates hunger so maintenance doesn't feel like constant restriction.",
      },
      {
        question: "Why does every diet work until it doesn't?",
        answer:
          "Most diets create a calorie deficit that produces initial results, but they don't address the underlying drivers of overeating. Once the novelty wears off and hunger hormones adapt, the diet becomes unsustainable. A lasting approach must work with your biology — reducing hunger signals so eating less happens naturally.",
      },
    ],
  },
  {
    title: "Hunger & Biology",
    questions: [
      {
        question: "Is hunger biological or just willpower?",
        answer:
          "Hunger is primarily biological, driven by hormones like ghrelin, leptin, and insulin. Willpower can override hunger temporarily, but it's exhausting and unsustainable. The most effective weight management strategies reduce biological hunger signals rather than relying on mental discipline to ignore them.",
      },
      {
        question: "Why am I always hungry even after eating?",
        answer:
          "Constant hunger despite eating usually signals insulin and blood sugar dysregulation. High-starch and high-sugar foods spike blood sugar, trigger insulin release, and often lead to a crash that signals hunger again within hours. Stabilizing blood sugar with lower-starch, lower-sugar meals helps you feel satisfied longer.",
      },
      {
        question: "Why do I crave carbs and sugar?",
        answer:
          "Carb and sugar cravings are often driven by blood sugar instability and dopamine responses. When blood sugar drops after a high-carb meal, your brain signals you to eat more quick-energy foods. Breaking this cycle requires stabilizing blood sugar with protein, healthy fats, and non-starchy vegetables, which gradually reduces cravings over time.",
      },
    ],
  },
  {
    title: "The Low-Starch, Low-Sugar Approach",
    questions: [
      {
        question: "What is a low-starch, low-sugar diet?",
        answer:
          "A low-starch, low-sugar diet focuses on reducing foods that spike blood sugar and insulin — primarily grains, potatoes, bread, pasta, and added sugars. Instead, meals center on proteins, healthy fats, and non-starchy vegetables. This approach naturally regulates hunger hormones, making it easier to eat less without feeling deprived.",
      },
      {
        question: "How is low-starch, low-sugar different from keto?",
        answer:
          "While both reduce carbohydrates, low-starch, low-sugar is more flexible than strict keto. Keto requires very low carbs (typically under 20-50g) to maintain ketosis. A low-starch, low-sugar approach focuses on eliminating the most problematic foods without requiring ketosis, making it more sustainable for many people long-term.",
      },
      {
        question: "Can I eat until full and still lose weight?",
        answer:
          "Yes — when eating the right foods. Low-starch, low-sugar meals with adequate protein and healthy fats trigger satiety hormones that tell your brain you're satisfied. Because hunger is naturally regulated, you eat less without counting calories or fighting constant cravings. This is why the approach feels sustainable rather than restrictive.",
      },
    ],
  },
  {
    title: "The Method",
    questions: [
      {
        question: "What is the Weight Permanence Triangle?",
        answer:
          "The Weight Permanence Triangle™ is a framework for lasting weight management built on three stages: Biology (understanding how food affects hunger hormones), Behavior (building sustainable habits around eating and movement), and Permanence (creating systems that maintain results when life gets challenging). Each stage builds on the previous one.",
      },
      {
        question: "Why do I need more than just a meal plan?",
        answer:
          "Meal plans address what to eat but not why you struggle to stick with it. Lasting change requires understanding your biology (why certain foods trigger hunger), developing sustainable behaviors (habits that fit your real life), and building permanence systems (tools to stay on track when motivation fades or circumstances change).",
      },
    ],
  },
];

export default function QAPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    document.title = "Weight Loss Q&A - Why Can't I Keep Weight Off? | Weight Permanence";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Get answers to common weight loss questions. Learn why diets fail, why you're always hungry, and how a low-starch, low-sugar approach can help you lose weight permanently."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="py-10 bg-secondary/30">
          <div className="container max-w-3xl mx-auto px-4">
            <div
              className={`text-center transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-4">
                Frequently Asked Questions
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Questions About Weight Loss?
              </h1>
              <p className="text-lg text-muted-foreground">
                Common questions, real answers backed by biology.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-10">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <FAQCategory
                  key={category.title}
                  category={category}
                  delay={categoryIndex * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-secondary/30">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg text-primary mb-4">
              Ready to understand the full framework?
            </p>
            <a
              href="/#book"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Learn About the Book
            </a>
          </div>
        </section>
      </main>

      <FooterSimple />
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((category) =>
              category.questions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: q.answer,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}

function FAQCategory({
  category,
  delay,
}: {
  category: (typeof faqCategories)[0];
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className="text-xl font-semibold text-primary mb-4">{category.title}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {category.questions.map((item, index) => (
          <AccordionItem
            key={index}
            value={`${category.title}-${index}`}
            className="border border-border rounded-lg px-4 bg-card"
          >
            <AccordionTrigger className="text-left text-primary hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
