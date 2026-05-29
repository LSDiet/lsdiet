import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqEntry = {
  q: string;
  /** Plain text answer used for JSON-LD schema */
  schemaAnswer: string;
  /** Rendered answer node with inline links */
  render: () => JSX.Element;
};

const paraCls = "text-[hsl(0_0%_20%)] leading-relaxed text-base";
const linkCls = "text-accent hover:underline font-medium";

const faqs: FaqEntry[] = [
  {
    q: "What makes LS Diet different?",
    schemaAnswer:
      "LS Diet focuses on helping you keep the weight off once you've lost it. Although losing weight is a part of the journey, the main goal is to sustain that success. A key part of this approach is the Weight Permanence Triangle (WPT), a tool for improving mental clarity, building motivation when you need it, and strengthening the emotional link between your thoughts and actions. Instead of relying only on willpower, the WPT helps you move from simply wanting to lose weight to feeling emotionally and physically ready not only to reach your goal but also to maintain it and never regain.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>
          LS Diet focuses on helping you keep the weight off once you've lost it. Although losing weight is a part of the journey, the main goal is to sustain that success. A key part of this approach is the Weight Permanence Triangle (WPT), a tool for improving mental clarity, building motivation when you need it, and strengthening the emotional link between your thoughts and actions. Instead of relying only on willpower, the WPT helps you move from simply wanting to lose weight to feeling emotionally and physically ready not only to reach your goal but also to maintain it and never regain.
        </p>
        <p>
          <a href="/weight-permanence-triangle" className={linkCls}>
            Explore the Weight Permanence Triangle™ →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "Do I have to count calories or cut out entire food groups?",
    schemaAnswer:
      "No. LS Diet follows a low-starch, low-sugar lifestyle, but it is not based on calorie counting. You do not need to weigh food, track every bite, or obsess over numbers. The focus is on learning how different foods affect hunger, cravings, energy, and long-term weight management, so you can make better decisions without constant tracking.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>
          No. LS Diet follows a low-starch, low-sugar lifestyle, but it is not based on calorie counting. You do not need to weigh food, track every bite, or obsess over numbers. The focus is on learning how different foods affect hunger, cravings, energy, and long-term weight management, so you can make better decisions without constant tracking.
        </p>
        <p>
          <a href="/blog/do-you-need-to-count-calories-to-lose-weight" className={linkCls}>
            Read: Do you need to count calories to lose weight? →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "How much time does this take each day?",
    schemaAnswer:
      "Realistically, 5 to 10 minutes per day is plenty. The goal is not to spend hours learning about weight loss. The goal is to learn a behaviour, apply it, and observe the result. For example, one Action Practice module helps you identify the foods, snacks, and triggers in your environment that make you eat even when you're not hungry. You'll then learn simple ways to create distance, friction, and an out-of-sight, out-of-mind effect that makes those decisions easier. Small changes applied consistently will produce more compounding results than spending hours looking for the perfect diet.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>Realistically, 5 to 10 minutes per day is plenty.</p>
        <p className={paraCls}>
          The goal is not to spend hours learning about weight loss. The goal is to learn a behaviour, apply it, and observe the result. For example, one Action Practice module helps you identify the foods, snacks, and triggers in your environment that make you eat even when you're not hungry. You'll then learn simple ways to create distance, friction, and an "out of sight, out of mind" effect that makes those decisions easier.
        </p>
        <p className={paraCls}>
          Small changes applied consistently will produce more compounding results than spending hours looking for the perfect diet.
        </p>
        <p>
          <a href="/blog/why-do-i-eat-even-when-im-not-hungry" className={linkCls}>
            Read: Why do I eat even when I'm not hungry? →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "Do I need to exercise?",
    schemaAnswer:
      "Not required, but it certainly helps. Weight loss comes primarily from what you eat. Exercise is optional, but I recommend a daily brisk walk or Zone 2 jog. These activities help build fitness, improve cardiovascular health, preserve muscle, and increase daily calorie expenditure without feeling overwhelming.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>Not required, but it certainly helps.</p>
        <p className={paraCls}>
          Weight loss comes primarily from what you eat. Exercise is optional, but I recommend a daily brisk walk or Zone 2 jog. These activities help build fitness, improve cardiovascular health, preserve muscle, and increase daily calorie expenditure without feeling overwhelming.
        </p>
        <p>
          <a href="/blog/is-diet-or-exercise-more-important-for-weight-loss" className={linkCls}>
            Read: Is diet or exercise more important for weight loss? →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "Is this for busy professionals?",
    schemaAnswer:
      "Yes. LS Diet was designed for people with jobs, families, responsibilities, and limited time. You do not need long workouts, complicated meal plans, or hours of meal preparation. The system is built around real-life, not ideal circumstances.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>Yes.</p>
        <p className={paraCls}>
          LS Diet was designed for people with jobs, families, responsibilities, and limited time. You do not need long workouts, complicated meal plans, or hours of meal preparation. The system is built around real-life, not ideal circumstances.
        </p>
        <p>
          <a href="/blog/whats-the-best-weight-loss-program-for-busy-professionals" className={linkCls}>
            Read: The best weight loss program for busy professionals →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "What happens inside the class?",
    schemaAnswer:
      "Inside the class, you'll learn: the weight problem (weight regain, information trap, how motivation disappears, and emotional priorities); the Weight Permanence Triangle; the 5 Stages of Awareness (Reality, Friction, Pattern, Consequence, and Identity); guided step-by-step to build your PUSH and PULL motivations; 30+ Action Practice; and practical behaviours that support long-term weight management.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>Inside the class, you'll learn:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-[hsl(0_0%_20%)] leading-relaxed text-base">
          <li>Weight problem (weight regain, information trap, how motivation disappears, and emotional priorities)</li>
          <li>The Weight Permanence Triangle</li>
          <li>The 5 Stages of Awareness (Reality, Friction, Pattern, Consequence, and Identity)</li>
          <li>Guided step-by-step to build your PUSH and PULL motivations</li>
          <li>30+ Action Practice</li>
          <li>Practical behaviours that support long-term weight management</li>
        </ul>
        <p>
          <a href="/awareness-stages" className={linkCls}>
            Explore the 5 Awareness Stages →
          </a>
        </p>
      </div>
    ),
  },
  {
    q: "How long before I see results?",
    schemaAnswer:
      "Many people start noticing positive changes within the first two weeks. Switching to a low-starch, low-sugar lifestyle often leads to initial water weight loss, which is a normal part of the process before fat loss begins. When you add a daily fast walk or Zone 2 jog, losing about 5 lbs in those first two weeks is a very common and encouraging milestone. While everyone's journey is unique, most members begin to see progress well before reaching their final goals.",
    render: () => (
      <div className="space-y-3">
        <p className={paraCls}>
          Many people start noticing positive changes within the first two weeks. Switching to a low-starch, low-sugar lifestyle often leads to initial water weight loss, which is a normal part of the process before fat loss begins.
        </p>
        <p className={paraCls}>
          When you add a daily fast walk or Zone 2 jog, <span className="font-semibold text-foreground">losing about 5 lbs in those first two weeks</span> is a very common and encouraging milestone. While everyone's journey is unique, most members begin to see progress well before reaching their final goals.
        </p>
        <p>
          <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" className={linkCls}>
            Read: Why low-starch, low-sugar is more sustainable →
          </a>
        </p>
      </div>
    ),
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://lsdiet.com/#faq",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.schemaAnswer },
  })),
};

export function FAQSection() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section id="faq" className="py-14 md:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Frequently Asked
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              LS Diet <span className="text-accent">FAQ</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-4 bg-card"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>{f.render()}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-center mt-10 text-sm">
            <a href="/faq" className="text-accent hover:underline font-medium">
              See the full LS Diet FAQ →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
