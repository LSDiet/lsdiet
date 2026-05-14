import { Helmet } from "react-helmet-async";

const faqs = [
  {
    q: "What is LS Diet?",
    a: "LS Diet is a gentle, low-starch, low-sugar lifestyle plan lovingly developed by Oscar Poon to help prevent weight regain. It combines a straightforward food approach with the supportive Weight Permanence Triangle™—a three-part behavioural method focusing on Awareness, Practice, and Permanence—making sure that weight loss is sustainable and meaningful, rather than a never-ending cycle of restart.",
  },
  {
    q: "What does low-starch, low-sugar mean?",
    a: "This approach involves enjoying a variety of foods in a balanced way. You focus on cutting back on foods that cause big insulin spikes, like white bread, rice, pasta, and sugary products. Instead, you can still enjoy plenty of protein, healthy fats, non-starchy vegetables, and small portions of fruit. The idea is to eat until you're satisfied without stressing over calories or cutting out whole food groups, making your eating experience both healthy and enjoyable.",
  },
  {
    q: "Why do people regain weight after losing it?",
    a: "Most diets tend to focus on the food itself but often overlook the underlying behaviours that support long-term success. When stress, travel, or life disruptions happen, willpower can dwindle, and old habits tend to creep back in. By cultivating an awareness layer that creates a sense of urgency and a permanence layer that encourages early course correction, we can transform dieting into a more sustainable journey. This way, the struggle becomes less about temporary fixes and more about lasting changes, making it easier to maintain progress over time.",
  },
  {
    q: "What is the Weight Permanence Triangle™?",
    a: "The Weight Permanence Triangle™ is the framework at the centre of LS Diet. Awareness creates clarity and motivation; Practice builds daily low-starch, low-sugar choices; Permanence protects those choices when life gets hard.",
  },
  {
    q: "Who is Oscar Poon?",
    a: "Oscar Poon is the founder and creator of LS Diet. He has lost 80+ lbs three separate times, holds a degree in psychology, supported clients at a substance-abuse centre in Vancouver, and spent a decade as a surgical market-data consultant. That mix of behavioural psychology and pattern analysis shaped the LS Diet method.",
  },
  {
    q: "Is LS Diet a diet or a lifestyle?",
    a: "LS Diet is truly a way of life, not just a quick fix. It starts with a simple food framework, but the real aim is to make lasting lifestyle changes. LS Diet incorporates low-starch, low-sugar eating habits that fit seamlessly into your culture, social ways, and travels, ensuring they stick around even as motivation wanes.",
  },
  {
    q: "What exercise is recommended in LS Diet?",
    a: "LS Diet does not require exercise to lose weight. That said, exercise is strongly encouraged because it builds muscle, burns calories, and improves insulin sensitivity. The only exercise members are asked to participate in is walking and slow jogging — Oscar created a genre of music with 140 BPM, 160 BPM, and 180 BPM metronomes in the background, available free on youtube.com/@JoinLSDiet.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQSection() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section id="faq" className="section-dark py-14 md:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Frequently Asked
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              LS Diet <span className="text-accent">FAQ</span>
            </h2>
          </div>
          <div className="space-y-7">
            {faqs.map((f) => (
              <article key={f.q}>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-[hsl(0_0%_78%)] leading-relaxed text-base">{f.a}</p>
              </article>
            ))}
          </div>
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
