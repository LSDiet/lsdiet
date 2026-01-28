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
        question: "Why do I lose weight but always gain it back?",
        answer:
          "Most people lose weight by forcing short-term behaviours without building a system that holds when life and hunger return. Sustainable weight management requires a framework that adapts to changing circumstances, not just temporary restriction.",
      },
      {
        question: "Why does weight loss feel so hard even when I eat less?",
        answer:
          "Weight loss feels hard because hunger is biologically driven and intensified by modern ultra-processed food environments—not simply due to poor discipline. When your body perceives restriction, it amplifies hunger signals to protect against perceived starvation.",
      },
      {
        question: "Why does traditional dieting rely on hunger to work?",
        answer:
          "Traditional dieting works by forcing caloric restriction instead of restoring access to stored fat, which keeps hunger elevated throughout the process. A low-starch, low-sugar approach lowers insulin, allowing your body to use fat for fuel and naturally reducing appetite.",
      },
      {
        question: "Why does willpower stop working for weight loss?",
        answer:
          "Willpower fails because it is a finite resource that collapses under stress, hunger, and environmental pressure. The Weight Permanence Triangle™ aligns your goals with internal motivation so you don't rely on mental power alone.",
      },
      {
        question: "Why does weight loss fail when life gets busy?",
        answer:
          "When life gets busy, you revert to default habits because they're familiar and require no effort. Without a system designed for real-life conditions, temporary diets collapse under pressure. Building sustainable behaviours during the Practice stage ensures your approach survives disruption.",
      },
      {
        question: "Why do most diets stop working over time?",
        answer:
          "Most diets address food rules and biology but ignore social and environmental factors. The five Awareness stages in the book guide you through all of these. Monthly subscribers gain access to the Awareness Compass™—a proprietary conversational platform that identifies the gap between where you are and where you want to be, establishing clear internal push and pull motivation.",
      },
      {
        question: "Why does stress cause weight gain even when I eat carefully?",
        answer:
          "Stress elevates cortisol, a hormone that increases appetite (especially for high-calorie foods), promotes abdominal fat storage, and disrupts insulin sensitivity. Environmental cues—such as food availability, social eating, and comfort-seeking behaviours—compound the effect, making weight gain occur even when you believe your intake is controlled.",
      },
      {
        question: "Why does travelling make me regain weight?",
        answer:
          "Travel disrupts routine, food access, and decision structure, exposing the lack of a fallback system. The Permanence stage of the Weight Permanence Triangle™ addresses this with tools that establish an internal alert system, flagging deviations and stabilizing decisions when context, emotion, or environment changes.",
      },
      {
        question: "Why does weight loss feel like fighting hunger all day?",
        answer:
          "Weight loss feels like a fight when fat access is blocked and hunger remains the dominant signal. Oscar hates losing weight using hunger—it's unsustainable. A low-starch, low-sugar approach doesn't mean starving; it changes what your body is working against so hunger quiets down instead of screaming all day.",
      },
      {
        question: "Why do I regain weight after reaching my goal?",
        answer:
          "Weight regain happens because the system that created weight loss is often a temporary intervention rather than an adaptable lifestyle—so it's abandoned once the goal is reached. The Weight Permanence Triangle™ builds identity-level change that persists beyond any single goal.",
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
