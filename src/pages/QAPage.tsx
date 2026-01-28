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
    title: "Obesity is Making You Sick",
    questions: [
      {
        question: "With obesity, why are you more likely to develop type 2 diabetes?",
        answer:
          "Excess body fat, especially around the abdomen, leads to insulin resistance, which makes blood sugar harder to regulate and increases the risk of type 2 diabetes. Losing weight lowers insulin resistance and risk over time.",
      },
      {
        question: "With obesity, why are you more likely to have high blood pressure?",
        answer:
          "Obesity increases the workload on the heart and blood vessels, raising the pressure needed to circulate blood. Losing weight reduces this strain and often lowers blood pressure.",
      },
      {
        question: "With obesity, why are you more likely to develop heart disease?",
        answer:
          "Obesity contributes to high blood pressure, unhealthy cholesterol levels, and inflammation, all of which accelerate plaque buildup and raise heart disease risk. Weight loss improves these metabolic markers and reduces cardiac risk.",
      },
      {
        question: "With obesity, why are you more likely to experience stroke?",
        answer:
          "Because obesity raises blood pressure, promotes atherosclerosis, and increases clot formation, it elevates the likelihood of blood flow interruption to the brain. Reducing weight lowers these risk factors and lowers stroke risk.",
      },
      {
        question: "With obesity, why are you more likely to have insulin resistance?",
        answer:
          "Excess adipose tissue releases inflammatory chemicals and disrupts insulin signalling, resulting in insulin resistance. Weight reduction improves insulin sensitivity and decreases this risk.",
      },
      {
        question: "With obesity, why are you more likely to experience chronic inflammation?",
        answer:
          "Fat cells produce inflammatory cytokines that sustain low-grade inflammation, which contributes to metabolic disease. Losing weight reduces fat cell mass and inflammatory signalling.",
      },
      {
        question: "With obesity, why are you more likely to develop metabolic syndrome?",
        answer:
          "Obesity is central to metabolic syndrome because it promotes high blood pressure, dysregulated blood sugar, and abnormal lipids. Weight loss improves all of these components.",
      },
      {
        question: "With obesity, why are you more likely to have abnormal cholesterol levels?",
        answer:
          "Obesity increases triglycerides and lowers good HDL cholesterol while promoting LDL retention. Weight loss helps normalise lipid profiles and reduce cardiovascular risk.",
      },
      {
        question: "With obesity, why are you more likely to experience hormonal imbalance?",
        answer:
          "Excess body fat alters hormone production and regulation (including leptin, oestrogen, and insulin). Losing weight helps restore hormonal balance and healthy signalling.",
      },
      {
        question: "With obesity, why are you more likely to have impaired fat metabolism?",
        answer:
          "Obesity interferes with normal fat mobilisation and oxidation through insulin resistance and chronic inflammation. Weight loss improves metabolic flexibility and fat oxidation.",
      },
      {
        question: "With obesity, why are you more likely to develop fatty liver disease?",
        answer:
          "Excess calories and adipose overflow cause fat to accumulate in the liver (NAFLD), impairing liver function. Weight loss reduces liver fat and lowers disease progression.",
      },
      {
        question: "With obesity, why are you more likely to have gallbladder disease?",
        answer:
          "High cholesterol and excess bile saturation from obesity increase gallstone formation risk. Reducing weight can reduce cholesterol saturation and the incidence of gallbladder problems.",
      },
      {
        question: "With obesity, why are you more likely to experience breathing problems like sleep apnoea?",
        answer:
          "Fat deposits around the neck and torso narrow airways and restrict lung function, increasing sleep apnoea risk. Losing weight often improves airway patency and breathing quality.",
      },
      {
        question: "With obesity, why are you more likely to have reduced lung function?",
        answer:
          "Excess weight compresses the diaphragm and chest wall, impairing full lung expansion. Weight loss eases this mechanical restriction, improving breathing.",
      },
      {
        question: "With obesity, why are you more likely to develop osteoarthritis?",
        answer:
          "Extra body weight increases mechanical load on joints, accelerating cartilage breakdown and inflammation. Losing weight reduces joint stress and pain progression.",
      },
      {
        question: "With obesity, why are you more likely to have chronic back pain?",
        answer:
          "Additional torso weight alters posture and increases spinal loading, leading to pain and dysfunction. Weight reduction eases spinal stress and can improve comfort.",
      },
      {
        question: "With obesity, why are you more likely to develop gallstones?",
        answer:
          "Obesity increases cholesterol in bile, which forms gallstones. Weight loss reduces cholesterol saturation, reducing stone formation risk.",
      },
      {
        question: "With obesity, why are you more likely to develop chronic kidney disease?",
        answer:
          "Obesity increases blood pressure and diabetes risk, both main causes of kidney damage. Losing weight reduces these conditions and helps protect kidneys.",
      },
      {
        question: "With obesity, why are you more likely to have pregnancy complications?",
        answer:
          "Obesity raises the risk of gestational diabetes and high blood pressure in pregnancy, which threaten maternal and foetal health. Weight loss before pregnancy lowers these risks.",
      },
      {
        question: "With obesity, why are you more likely to develop certain cancers?",
        answer:
          "Obesity-associated inflammation and hormone imbalances contribute to increased risk of at least 13 cancers. Weight reduction lowers these inflammatory and hormonal drivers.",
      },
      {
        question: "With obesity, why are you more likely to experience anxiety or depression?",
        answer:
          "Obesity is associated with chronic disease stress, social stigma, and inflammatory processes that affect brain chemistry. Losing weight improves self-perception and overall mental health.",
      },
      {
        question: "With obesity, why are you more likely to have lower quality of life?",
        answer:
          "Because obesity increases disease burden, physical limitation, and social stigma, losing weight improves mobility, confidence, and life function.",
      },
      {
        question: "With obesity, why are you more likely to be diagnosed with multiple chronic diseases?",
        answer:
          "Obesity contributes to metabolic, cardiovascular, respiratory, and musculoskeletal dysregulation, so weight loss reduces the cumulative risk of multiple chronic conditions.",
      },
      {
        question: "With obesity, why are you more likely to have early onset chronic disease?",
        answer:
          "Excess adiposity accelerates metabolic dysfunction and inflammation over time, so losing weight slows disease progression and delays onset.",
      },
      {
        question: "With obesity, why are you more likely to have reduced life expectancy?",
        answer:
          "Obesity increases the risk of fatal chronic diseases like heart disease and diabetes. Intentional weight loss reduces these risks and improves longevity.",
      },
      {
        question: "With obesity, why are you more likely to experience fatigue and low energy?",
        answer:
          "Chronic inflammation and metabolic inefficiency in obesity impair energy metabolism. Losing weight improves insulin sensitivity and cellular energy use.",
      },
      {
        question: "With obesity, why are you more likely to struggle with daily physical function?",
        answer:
          "Excess weight increases mechanical and metabolic strain on muscles and joints. Weight loss improves mobility and endurance for daily activities.",
      },
      {
        question: "With obesity, why are you more likely to struggle in environments with ultra-processed foods?",
        answer:
          "Obesity is worsened where high-insulin foods are abundant because frequent insulin spikes favour fat storage. Weight reduction combined with low-starch, low-sugar eating reduces these metabolic drivers.",
      },
    ],
  },
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
        question: "Is hunger biological or a lack of discipline?",
        answer:
          "Hunger is biological, not a personal failure of discipline. It is regulated primarily by hormones: ghrelin stimulates appetite, leptin signals satiety, and insulin controls blood sugar and fat storage. When these hormones are dysregulated—often by ultra-processed foods—hunger intensifies regardless of willpower. Understanding this biology is the first step toward sustainable weight management.",
      },
      {
        question: "Why does reducing sugar reduce hunger?",
        answer:
          "When you eat starch or sugar, glucose enters your bloodstream. Your pancreas responds by secreting insulin, which directs glucose into cells for energy or stores it as glycogen in the liver and muscles. Excess glucose is converted to triglycerides (fat). Chronically high insulin blocks fat mobilisation and oxidation, keeping you dependent on glucose for energy. When you reduce starch and sugar, insulin levels drop, allowing your liver to produce ketones that enable your body to burn stored fat for fuel instead of constantly demanding more sugar—naturally calming hunger.",
      },
      {
        question: "How does insulin affect fat burning and hunger?",
        answer:
          "Insulin suppresses fat mobilisation (releasing fat from storage) and oxidation (burning fat for energy). When insulin is elevated, your body cannot efficiently access stored fat, so it signals hunger to obtain energy from food instead. Lowering insulin through reduced starch and sugar intake restores fat access and reduces hunger signals.",
      },
      {
        question: "Why does eating less not always lead to weight loss?",
        answer:
          "Calories represent energy, but the composition of those calories matters enormously. One thousand calories of grilled chicken affects your hormones differently than one thousand calories of apple pie or chocolate. Eating less does not guarantee weight loss if your biology remains in fat storage mode due to elevated insulin. What you eat—and the resulting glucose and insulin response—determines whether your body stores or burns fat.",
      },
      {
        question: "Why does calorie counting fail for long-term weight loss?",
        answer:
          "Calorie counting doesn't always fail, but people often overlook the composition of those calories. Five slices of bread made from flour, water, and yeast affect your body differently than bread from multinational brands with twenty-plus ingredients, additives, and preservatives. The hormonal response to food—not just the calorie number—determines hunger, satiety, and fat storage.",
      },
      {
        question: "Can you lose weight without tracking calories?",
        answer:
          "Absolutely. The Weight Permanence Triangle™ method discusses calorie awareness, but Oscar personally does not track calories. When hunger is regulated through a low-starch, low-sugar approach, food intake naturally decreases without the need for counting or restriction. You eat until satisfied, and your body does the rest.",
      },
      {
        question: "Why does my body resist fat loss?",
        answer:
          "Your body resists fat loss when insulin remains chronically elevated, blocking access to stored fat. This is a protective biological mechanism, not a personal failing. By reducing starch and sugar intake, you lower insulin and allow your body to mobilise and burn fat naturally.",
      },
      {
        question: "What blocks fat burning even when calories are low?",
        answer:
          "Chronically elevated insulin blocks fat mobilisation and oxidation even under calorie restriction. This is why some people struggle to lose weight despite eating very little. If you experience persistent difficulty losing weight despite sustained effort, consult a medical professional to rule out underlying metabolic or hormonal conditions.",
      },
      {
        question: "Why do low-starch and low-sugar diets reduce appetite?",
        answer:
          "Low-starch, low-sugar diets reduce insulin spikes, which allows your body to access stored fat for energy. When fat is available as fuel, your brain no longer signals urgent hunger to obtain glucose. The result is stable energy throughout the day and a natural reduction in appetite—without fighting cravings or counting calories.",
      },
      {
        question: "How does food choice affect hunger more than calories?",
        answer:
          "Food choice determines your hormonal response—particularly insulin, ghrelin, and leptin—which drives hunger far more than calorie totals. A meal rich in protein and healthy fats triggers satiety hormones that keep you full for hours, while a high-starch meal of equal calories can leave you hungry again within two hours. Biology, not arithmetic, controls appetite.",
      },
    ],
  },
  {
    title: "The Low-Starch, Low-Sugar Approach",
    questions: [
      {
        question: "What does a low-starch, low-sugar lifestyle actually mean?",
        answer:
          "A low-starch, low-sugar lifestyle means prioritizing foods that minimize insulin spikes—primarily proteins, healthy fats, and non-starchy vegetables—to restore your body's access to stored fat and naturally regulate hunger. It's not about eliminating all carbohydrates, but about choosing foods that keep blood sugar stable and allow fat to be used for energy.",
      },
      {
        question: "Is low-starch, low-sugar sustainable long term?",
        answer:
          "Yes, when paired with a structure that adapts to real-life conditions. Most weight loss programmes ignore intersectionality—your culture, financial status, accessibility, and social environment. The Weight Permanence Triangle™ method teaches you when and how to be resourceful so you can navigate life's challenges without abandoning your approach.",
      },
      {
        question: "Why is low-starch, low-sugar hard in restaurants?",
        answer:
          "Restaurants are designed around starch-based foods because they are cheap to source, filling for customers, and highly profitable. Bread, pasta, rice, and potatoes form the foundation of most menus because they cost less than protein and fresh vegetables. Additionally, starchy sides bulk up portions without increasing food costs, making low-starch options harder to find and often more expensive.",
      },
      {
        question: "How do you eat low-starch, low-sugar with family meals?",
        answer:
          "This is one of the toughest challenges. Growing up in an Asian household, carbohydrates were daily staples—rice with every meal. The Weight Permanence Triangle™ method teaches you how to communicate your situation with family so they can support your decision to look after yourself. It's not easy and requires practice. Remember: practice doesn't make perfection, but permanence.",
      },
      {
        question: "Can you follow low-starch, low-sugar without a meal plan?",
        answer:
          "Yes, when food decisions are guided by structure and principles instead of rigid scripts. Oscar doesn't follow any meal plans. You can find his monthly challenges—where he eats low-starch, low-sugar in all different environments—on his YouTube channel at youtube.com/@WhatAboutWeight.",
      },
      {
        question: "Do you need to give up all carbohydrates to lose weight?",
        answer:
          "No. Weight loss depends on insulin regulation, not eliminating all carbohydrates. Complex carbohydrates from vegetables, legumes, and some whole grains provide essential fibre, vitamins, and energy for muscle function and recovery. When you lose weight, you want to burn fat—not lean muscle. Protein and some carbohydrates support muscle protein synthesis and prevent muscle breakdown, especially during physical activity. The goal is reducing refined starches and sugars that spike insulin, not eliminating every carbohydrate.",
      },
      {
        question: "How do culture and food traditions affect weight loss?",
        answer:
          "Culture shapes your default food choices, social eating patterns, and emotional connections to food. Any sustainable approach must account for these realities rather than ignore them. The Weight Permanence Triangle™ method teaches you how to integrate cultural traditions with low-starch, low-sugar principles—so you can honour your heritage while supporting your health goals.",
      },
      {
        question: "Why is eating low-starch, low-sugar more expensive?",
        answer:
          "Protein and fresh foods are less subsidized by governments and more perishable than refined carbohydrates, which drives up their cost. Processed grains have long shelf lives and lower transportation costs, making them cheaper at the supermarket. Check out Oscar's YouTube channel (youtube.com/@WhatAboutWeight) to watch how he cooks at home to overcome the cost hurdle while eating well.",
      },
      {
        question: "How do you eat low-starch, low-sugar while travelling?",
        answer:
          "You rely on principles and fallback rules rather than ideal food options. Perfect choices are rarely available when travelling, but good-enough choices usually are. The Permanence stage of the Weight Permanence Triangle™ method addresses this with tools that stabilize decisions when your environment, context, or routine changes.",
      },
      {
        question: "Is low-starch, low-sugar a diet or a lifestyle?",
        answer:
          "It becomes a lifestyle when it's integrated into your identity rather than treated as a temporary phase. A diet is something you go on and off. A lifestyle is who you are—how you naturally make food decisions without constant deliberation. The Weight Permanence Triangle™ method is designed to build that identity-level change.",
      },
    ],
  },
  {
    title: "The Weight Permanence Triangle™ Method",
    questions: [
      {
        question: "What is the Weight Permanence Triangle™?",
        answer:
          "Founded by Oscar Poon, the Weight Permanence Triangle™ is an actionable framework built around Awareness, Practice, and Permanence that helps people lose weight and keep it off by working with biology, behaviour, and real-life constraints.",
      },
      {
        question: "How does the Weight Permanence Triangle™ work?",
        answer:
          "The Weight Permanence Triangle™ works by making weight loss an internal priority through emotionally encoded awareness to create push and pull motivation, translating that priority into daily action through practice, and protecting it with systems that hold during disruption.",
      },
      {
        question: "What are the three components of the Weight Permanence Triangle™?",
        answer:
          "The three components of the Weight Permanence Triangle™ are Awareness, which creates internal priority; Practice, which structures daily behaviour; and Permanence, an alert system that ensures consistency and compensatory effort when life gets hard.",
      },
      {
        question: "Is the Weight Permanence Triangle™ a diet meal plan?",
        answer:
          "Absolutely not. Every body is different, so the calories your body requires based on your functional goals are exclusive to you—and the food you need to eat accordingly is unique to you as well. However, you will receive directional guidance to build your own meal plan. In Phase 2, Oscar will launch a platform to connect you with local dietitians, nutrition scientists, and gym trainers in Canada and the U.S.",
      },
      {
        question: "How does the Weight Permanence Triangle™ help with long-term weight loss?",
        answer:
          "The Weight Permanence Triangle™ supports long-term weight loss by preventing abandonment after success and providing structure when motivation and routine disappear.",
      },
      {
        question: "Why does the Weight Permanence Triangle™ focus on awareness instead of motivation?",
        answer:
          "The Weight Permanence Triangle™ embeds motivation directly within the Awareness stages, where the final stages emotionally encode push and pull motivation. Tools in the Permanence axis help reassess and realign that motivation as biological, social, and environmental conditions change.",
      },
      {
        question: "What are the five stages of Awareness in the Weight Permanence Triangle™?",
        answer:
          "The five stages of Awareness are: Reality Awareness (understanding your current state), Friction Awareness (identifying obstacles), Pattern Awareness (recognising recurring behaviours), Consequence Awareness (connecting actions to outcomes), and Autonomy Awareness (taking ownership of your choices).",
      },
      {
        question: "How does emotional encoding affect weight loss?",
        answer:
          "In the Weight Permanence Triangle™, emotional encoding within the Awareness stages creates push and pull motivation that anchors behaviour. In plain English, people are most likely to act and change when they want something badly enough or absolutely hate something that needs to stop immediately. The last two stages of Awareness help you connect facts with emotions and turn them into lasting motivation.",
      },
      {
        question: "How does the Weight Permanence Triangle™ handle hunger differently from diets?",
        answer:
          "Oscar hates using hunger as a weight loss tool. The Weight Permanence Triangle™ Method reduces the biological drivers of hunger instead of forcing caloric deficiency, and explicitly encourages eating until you are full rather than relying on discomfort to lose weight.",
      },
      {
        question: "How does the Weight Permanence Triangle™ help during travel and social eating?",
        answer:
          "The Weight Permanence Triangle™ helps during travel and social eating by providing flexible decision frameworks that maintain direction without requiring perfect conditions. The Permanence tools stabilise decisions when your environment, context, or routine changes.",
      },
    ],
  },
  {
    title: "The Book",
    questions: [
      {
        question: "Is Weight Permanence a diet book?",
        answer:
          "No. Weight Permanence is not a diet book because it does not prescribe rigid food rules, meal plans, or temporary restrictions. Instead, it teaches a system for making food and lifestyle decisions that hold under real-life conditions, so weight loss becomes sustainable rather than something that collapses once a diet ends.",
      },
      {
        question: "Who is the Weight Permanence book for?",
        answer:
          "While the Weight Permanence method applies to anyone who wants to lose weight, readers aged 35 and up often resonate most because of metabolic changes, accumulated life stress, and repeated experiences of weight regain that make willpower-based approaches less effective.",
      },
      {
        question: "Does Weight Permanence require tracking?",
        answer:
          "Yes, but minimally. Oscar tracks body weight once per week and uses DEXA scans every three to six months to assess body composition, focusing on long-term trends rather than daily fluctuations or obsessive tracking.",
      },
      {
        question: "Can Weight Permanence work without meal plans?",
        answer:
          "Absolutely. Weight Permanence is designed to work without meal plans by teaching decision frameworks that allow you to choose foods confidently in any environment, including restaurants, travel, and family gatherings.",
      },
      {
        question: "How is Weight Permanence different from keto or carnivore?",
        answer:
          "Weight Permanence differs from keto and carnivore by focusing on low-starch, low-sugar rather than eliminating entire food groups. Keto restricts total carbohydrates to under 20–50 grams daily to maintain ketosis, excluding most fruits, legumes, and grains. Carnivore eliminates all plant foods entirely, relying exclusively on animal products. Weight Permanence allows non-starchy vegetables, legumes, some fruits, and complex carbohydrates in moderation—acknowledging that muscle building, performance, and long-term metabolic health often require some carbohydrates. Biologically, this approach reduces insulin spikes while preserving flexibility and nutritional variety, making it more sustainable for most people.",
      },
      {
        question: "Is Weight Permanence suitable for busy professionals?",
        answer:
          "Yes. Weight Permanence was specifically designed for busy professionals. Oscar developed the method, wrote the book, and recorded all low-starch, low-sugar educational videos while working full time as a surgical market data consultant, ensuring the system works under real workload and time constraints.",
      },
      {
        question: "Can Weight Permanence work with family and social life?",
        answer:
          "Yes. Weight Permanence accounts for cultural traditions, shared meals, and social settings by prioritising structure over perfection, allowing you to maintain direction without isolating yourself or abandoning relationships.",
      },
      {
        question: "Does Weight Permanence require intense exercise?",
        answer:
          "No. Weight Permanence recognises that every body is different, and functional goals, calorie needs, and physical capacity are unique to each individual. The method provides directional guidance to help you design your own movement and nutrition approach. Future Phase 2 tools will connect users with local dietitians, nutrition scientists, and trainers in Canada and the United States for personalised support.",
      },
      {
        question: "How long does it take to see results with Weight Permanence?",
        answer:
          "Most people experience a weight reduction of five to ten pounds per month during the first three months, after which adjustments to food intake and calorie output may be needed if a plateau occurs.",
      },
      {
        question: "Is Weight Permanence about restriction or structure?",
        answer:
          "Weight Permanence is about structure, not restriction. It focuses on building systems that regulate hunger, guide decisions, and maintain progress without relying on constant control or deprivation.",
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
