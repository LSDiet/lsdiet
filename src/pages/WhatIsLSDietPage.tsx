import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import foodComparisonTable from "@/assets/what-is-ls-diet/ls-diet-food-comparison-table.webp";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-26T12:00:00+00:00";

export default function WhatIsLSDietPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>What Is LS Diet? Low-Starch, Low-Sugar Eating Explained | LS Diet</title>
        <meta
          name="description"
          content="LS Diet is low-starch, low-sugar eating that keeps insulin low enough to burn fat. Learn how it works, what you eat, and why it's not keto."
        />
        <link rel="canonical" href="https://lsdiet.com/what-is-ls-diet" />
        <meta property="og:title" content="What Is LS Diet? Low-Starch, Low-Sugar Eating Explained | LS Diet" />
        <meta property="og:description" content="LS Diet is low-starch, low-sugar eating that keeps insulin low enough to burn fat. Not keto. Not a crash diet. An eating approach you can actually live." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/what-is-ls-diet" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": "https://lsdiet.com/what-is-ls-diet#page",
          name: "What Is LS Diet? Low-Starch, Low-Sugar Eating Explained",
          headline: "What Is LS Diet?",
          description: "LS Diet is low-starch, low-sugar eating that keeps insulin low enough for your body to burn fat. Learn the mechanism, the foods, and how it differs from keto.",
          about: [
            { "@type": "Thing", name: "Low-Carbohydrate Diet", sameAs: "https://en.wikipedia.org/wiki/Low-carbohydrate_diet" },
            { "@type": "Thing", name: "Insulin", sameAs: "https://en.wikipedia.org/wiki/Insulin" },
            { "@type": "Thing", name: "Insulin Resistance", sameAs: "https://en.wikipedia.org/wiki/Insulin_resistance" },
            { "@type": "Thing", name: "Dieting", sameAs: "https://en.wikipedia.org/wiki/Dieting" },
            { "@type": "Thing", name: "Weight Permanence Training", url: "https://lsdiet.com/weight-permanence-training" },
          ],
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", "@id": "https://lsdiet.com/oscar-poon#person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", "@id": "https://lsdiet.com/#organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: "https://lsdiet.com/what-is-ls-diet",
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "What Is LS Diet?", url: "/what-is-ls-diet" }]} />

      <article data-route-root className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            What Is <span className="text-accent">LS Diet?</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>June 26, 2026</time>
          </p>
        </header>

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-foreground">LS Diet is low-starch, low-sugar eating</strong> that keeps insulin low enough for your body to burn stored fat. It is not a crash diet, not a meal plan, and not a calorie-counting system. It is an eating approach built around one mechanism: when insulin stays low, fat burning turns on.
          </p>
          <p>
            Most diets focus on how fast you can lose weight. LS Diet focuses on how you can eat for the rest of your life without gaining it back. The difference sounds small. It is not.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            How LS Diet Works
          </h2>
          <p>
            Every time you eat starch or sugar, your body converts it to glucose. Your pancreas responds by releasing insulin. Insulin's job is to move that glucose into your cells for energy. The problem is that high insulin also signals your body to store fat — and blocks it from burning any.
          </p>
          <p>
            Think of it this way: fat is always there, like the sun in the sky. Insulin is the cloud cover. When insulin is high, dark clouds block the sun. Your body cannot access its own fat stores. When insulin drops, the sky clears, and fat burning resumes.
          </p>
          <p>
            LS Diet lowers insulin by targeting the two biggest glucose drivers in the average diet: starch and sugar. Three levers make this happen:
          </p>
          <ol className="list-decimal list-outside pl-6 space-y-2">
            <li><strong className="text-foreground">Eat less often</strong> — fewer meals and snacks means fewer insulin spikes across the day</li>
            <li><strong className="text-foreground">Eat smaller portions</strong> — less food means a smaller glucose load per meal</li>
            <li><strong className="text-foreground">Eat different foods</strong> — replacing high-starch and high-sugar foods with lower-insulin alternatives</li>
          </ol>
          <p>
            The third lever is the one you can start today without changing anything else. It is also the most effective long-term, which is why it is what LS Diet is named for.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            What You Eat on LS Diet
          </h2>
          <p>
            LS Diet is not an elimination diet. It is a reduction diet. You are not cutting out entire food groups. You are reducing the foods that drive insulin the most and building meals around the foods that do not.
          </p>

          <figure className="my-6">
            <img
              src={foodComparisonTable}
              alt="LS Diet vs No Carb diet food comparison table: proteins, dairy, vegetables, fruits, whole grains, healthy fats"
              className="w-full rounded-xl border border-zinc-200"
            />
            <figcaption className="text-sm text-zinc-500 mt-2 text-center">
              LS Diet compared to No Carb across six food categories. LS includes more foods — especially fruits, legumes, and controlled portions of whole grains.
            </figcaption>
          </figure>

          <p>The practical breakdown looks like this:</p>
          <p className="font-semibold text-foreground">Always eat</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Proteins: beef, pork, lamb, chicken, turkey, fish, eggs, organ meats</li>
            <li>Non-starchy vegetables: spinach, kale, lettuce, broccoli, cauliflower, zucchini, mushrooms, peppers, cabbage, green beans</li>
            <li>Healthy fats: olive oil, avocado oil, coconut oil, butter, ghee, nuts and seeds</li>
          </ul>
          <p className="font-semibold text-foreground">Eat in controlled portions</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Low-sugar fruits: raspberries, blackberries, strawberries, green apple, peach, plum, green banana</li>
            <li>Legumes: lentils, chickpeas, black beans, kidney beans, tofu, tempeh, edamame</li>
            <li>Some dairy: plain Greek yogurt, cottage cheese, full-fat milk, kefir</li>
          </ul>
          <p className="font-semibold text-foreground">Reduce significantly</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>White rice, bread, noodles, pasta, cereal, pastries, crackers</li>
            <li>Sweetened drinks, juice, soda, energy drinks</li>
            <li>Candy, chocolate bars, desserts, packaged snacks</li>
          </ul>
          <p className="font-semibold text-foreground">Occasional and intentional</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Small controlled portions of oats, quinoa, brown rice, wild rice</li>
            <li>LS-compatible substitutes: almond flour bread, flaxseed wraps, psyllium-based baking</li>
          </ul>
          <p>
            The goal is not a clean streak. The goal is a sustainable reduction in your overall insulin load across the week. A meal with rice is not a failure. A pattern of high-starch eating every day is the problem.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why LS Diet Is Not Keto
          </h2>
          <p>
            Keto (No Carb) and LS Diet work on the same mechanism: lower insulin by reducing carbohydrates. The difference is how far they go and who can actually sustain them.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-100 text-zinc-900 font-semibold text-left">
                  <th className="px-4 py-3 border border-zinc-200"></th>
                  <th className="px-4 py-3 border border-zinc-200 text-accent">LS Diet</th>
                  <th className="px-4 py-3 border border-zinc-200">Keto</th>
                  <th className="px-4 py-3 border border-zinc-200">Standard Diet</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700">
                <tr>
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Carb restriction</td>
                  <td className="px-4 py-3 border border-zinc-200">Reduce starch + sugar</td>
                  <td className="px-4 py-3 border border-zinc-200">Strict (&lt;20–50 g/day)</td>
                  <td className="px-4 py-3 border border-zinc-200">None</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Fruit allowed</td>
                  <td className="px-4 py-3 border border-zinc-200">Yes (low-sugar varieties)</td>
                  <td className="px-4 py-3 border border-zinc-200">No</td>
                  <td className="px-4 py-3 border border-zinc-200">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Grains allowed</td>
                  <td className="px-4 py-3 border border-zinc-200">In controlled portions</td>
                  <td className="px-4 py-3 border border-zinc-200">No</td>
                  <td className="px-4 py-3 border border-zinc-200">Yes</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Mechanism</td>
                  <td className="px-4 py-3 border border-zinc-200">Lowers insulin</td>
                  <td className="px-4 py-3 border border-zinc-200">Ketosis</td>
                  <td className="px-4 py-3 border border-zinc-200">No specific mechanism</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Social flexibility</td>
                  <td className="px-4 py-3 border border-zinc-200">High</td>
                  <td className="px-4 py-3 border border-zinc-200">Low</td>
                  <td className="px-4 py-3 border border-zinc-200">High</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 border border-zinc-200 font-medium text-zinc-900">Weight permanence focus</td>
                  <td className="px-4 py-3 border border-zinc-200">Yes — WPT built in</td>
                  <td className="px-4 py-3 border border-zinc-200">No</td>
                  <td className="px-4 py-3 border border-zinc-200">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Keto eliminates fruit, most dairy, all grains, and most legumes. That works metabolically. But it also means that virtually every shared meal — a family dinner, a work lunch, a holiday gathering — requires a public explanation. For many people, especially those who grew up in food cultures where rice, noodles, or bread are the daily default, this creates a social identity conflict that eventually wins.
          </p>
          <p>
            LS Diet does not ask you to announce yourself at every meal. You eat the protein, the vegetables, the healthy fats. You take a smaller portion of the starch, or skip it when you can. You make the better choice without making it a production.
          </p>
          <blockquote className="border-l-4 border-accent pl-5 my-6 text-xl md:text-2xl italic text-zinc-900 font-semibold leading-snug">
            LS is not restrictive eating. It is selective eating. The difference is psychological.
          </blockquote>
          <p>
            Speed is also not the priority. Losing 100 pounds in three months often means muscle loss and a metabolism that is slower than when you started. Unless you are managing a specific medical condition, sustainability matters more than speed. LS is built for the long run, not the sprint.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why LS Diet Exists
          </h2>
          <p>
            Oscar Poon lost more than 80 pounds. Three times. Each time, the weight came back.
          </p>
          <p>
            The first time, he went vegetarian. It worked. But every meal felt like a punishment, and the restriction eventually wore him down. The second time, he tracked calories and drank vegetable smoothies for months. He lost the weight. He was also hungry almost every day. He had willpower. He did not have peace.
          </p>
          <p>
            The third time, he went No Carb. He lost the weight again. But as an Asian Canadian surrounded by family and friends for whom rice and noodles are a daily ritual, every shared meal became a negotiation. Every gathering came with a side of explanation. The approach that worked metabolically was quietly destroying his social life.
          </p>
          <p>
            LS Diet was built as the fourth attempt — the one that does not require choosing between your health and your culture. In 2025, Oscar went from 270 to 200 pounds in 9 months using LS Diet. He hiked three peaks. He ran his first 10K. He has not regained the weight.
          </p>

          <blockquote className="border-l-4 border-accent pl-5 my-8 text-xl md:text-2xl italic text-zinc-900 font-semibold leading-snug">
            Most people do not fail to lose weight. They fail to maintain it.
          </blockquote>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            The Behavioural Layer
          </h2>
          <p>
            LS Diet handles the food. <a href="/weight-permanence-training" className="text-accent hover:underline">Weight Permanence Training™</a> handles the habits and psychology that make it stick long-term. They work together but they are not the same thing. If you want to understand why the weight keeps coming back even when you know what to eat, start with the{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">5 Awareness Stages</a>.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center space-y-3">
          <p className="text-base font-semibold text-zinc-900">Start the free LS Diet training.</p>
          <p className="text-sm text-zinc-600">Awareness Training + Action Practice. No credit card.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Join the free community
              </a>
            </Button>
          </div>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
