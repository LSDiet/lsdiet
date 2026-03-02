import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';
import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
'@/components/ui/accordion';
import { Download, Loader2, ArrowRight } from 'lucide-react';

const RESOURCE_ID = 'ebook-ls-diet-guide';
const FILE_PATH = 'Low-Starch Low-Sugar Guide.pdf';
const RESOURCE_TITLE = 'Low Starch, Low Sugar = Burn Fat';

const faqs = [
{
  question: 'What is a low-starch, low-sugar (LS) diet?',
  answer:
  'An LS diet selectively reduces foods that spike insulin—refined starches like white bread, rice, and pasta, and added or concentrated sugars—while keeping protein, healthy fats, non-starchy vegetables, and controlled portions of fruit. It is not about eliminating entire food groups; it is about choosing foods that keep insulin low so your body can access stored fat for energy.'
},
{
  question: 'How does insulin affect fat burning?',
  answer:
  'Insulin acts as a metabolic gatekeeper. When insulin is high, your body prioritises storing energy and slows fat release from adipose tissue. When insulin drops, fat burning resumes. Think of fat as the sun and insulin as cloud cover: less glucose means clearer skies and more fat burning.'
},
{
  question: 'What is the difference between No Carb and Low-Starch, Low-Sugar?',
  answer:
  'No Carb eliminates virtually all carbohydrates, including fruit, legumes, dairy with lactose, and all grains. LS reduces the highest-insulin foods—refined starch and sugar—while allowing controlled portions of lower-sugar fruits, legumes, and even small amounts of whole grains. LS is designed for social sustainability: you can share meals with family and friends without requiring a separate menu.'
},
{
  question: 'Can I lose weight without counting calories on an LS diet?',
  answer:
  'Yes. By focusing on food quality rather than caloric arithmetic, many people naturally reduce caloric intake because lower-insulin foods tend to be more satiating. The principle is straightforward: if you consistently eat less starch and sugar than you did before, insulin drops, fat burning increases, and weight declines over time.'
},
{
  question: 'Is fruit allowed on a low-starch, low-sugar diet?',
  answer:
  'Yes, in controlled portions. Lower-sugar, higher-fibre fruits such as raspberries, blackberries, strawberries, grapefruit, and kiwi are preferred. Eating fruit whole—rather than juiced or blended—slows sugar absorption and supports better insulin management.'
},
{
  question: 'What is Weight Permanence and how does it relate to LS?',
  answer:
  'Weight Permanence is a system built on three axes: Awareness (understanding what, how, when, and why you eat), Practice (applying LS principles in real-life settings), and Permanence (learning to re-anchor quickly when you go off track). LS is the dietary framework; Weight Permanence is the behavioural system that makes it last.'
}];


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Low Starch, Low Sugar = Burn Fat',
  description:
  'Learn why reducing starch and sugar lowers insulin, how it compares to no-carb diets, and how to adopt a sustainable LS lifestyle for lasting fat loss.',
  author: {
    '@type': 'Person',
    name: 'Oscar Poon',
    url: 'https://wpt-preorder.lovable.app'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Weight Permanence',
    url: 'https://wpt-preorder.lovable.app'
  },
  datePublished: '2025-03-02',
  dateModified: '2025-03-02'
};

const references = [
'Müller, M. J., Enderle, J., & Bosy-Westphal, A. (2016). Changes in energy expenditure with weight gain and weight loss in humans. Current Obesity Reports, 5(4), 413–423.',
'Misra, M., & Klibanski, A. (2014). Anorexia nervosa and bone. Journal of Endocrinology, 221(3), R163–R176.',
'Hales, C. M., Carroll, M. D., Fryar, C. D., & Ogden, C. L. (2020). Prevalence of obesity and severe obesity among adults: United States, 2017–2018. NCHS Data Brief, No. 360.',
'Monteiro, C. A., Cannon, G., Levy, R. B., et al. (2019). Ultra-processed foods: What they are and how to identify them. Public Health Nutrition, 22(5), 936–941.',
'Saltiel, A. R., & Kahn, C. R. (2001). Insulin signalling and the regulation of glucose and lipid metabolism. Nature, 414(6865), 799–806.',
'Frayn, K. N. (2010). Fat as a fuel: Emerging understanding of the adipose tissue–skeletal muscle axis. Acta Physiologica, 199(4), 509–518.',
'Reaven, G. M. (1988). Banting lecture 1988: Role of insulin resistance in human disease. Diabetes, 37(12), 1595–1607.',
'Holt, S. H. A., Miller, J. C. B., & Petocz, P. (1997). An insulin index of foods: The insulin demand generated by 1000-kJ portions of common foods. American Journal of Clinical Nutrition, 66(5), 1264–1276.',
'Bray, G. A., Nielsen, S. J., & Popkin, B. M. (2004). Consumption of high-fructose corn syrup in beverages may play a role in the epidemic of obesity. American Journal of Clinical Nutrition, 79(4), 537–543.',
'American Diabetes Association. (2024). Standards of care in diabetes—2024. Diabetes Care, 47(Suppl. 1).',
'U.S. Department of Agriculture & U.S. Department of Health and Human Services. (2026). Dietary guidelines for Americans, 2025–2030 (10th ed.).',
'Fothergill, E., Guo, J., Howard, L., et al. (2016). Persistent metabolic adaptation 6 years after "The Biggest Loser" competition. Obesity, 24(8), 1612–1619.'];


export default function LSDietGuidePage() {
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

  const handleModalSubmit = async (email: string) => {
    await captureAndDownload(email, RESOURCE_ID, FILE_PATH, RESOURCE_TITLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Low Starch, Low Sugar = Burn Fat | Free Guide</title>
        <meta
          name="description"
          content="Learn why reducing starch and sugar lowers insulin, how it compares to no-carb diets, and how to adopt a sustainable LS lifestyle for lasting fat loss. Free downloadable guide." />

        <link rel="canonical" href="https://wpt-preorder.lovable.app/ls-diet-guide" />
        <meta name="author" content="Oscar Poon" />

        {/* Open Graph */}
        <meta property="og:title" content="Low Starch, Low Sugar = Burn Fat | Free Guide" />
        <meta
          property="og:description"
          content="Why reducing starch and sugar lowers insulin and unlocks fat burning. Free guide comparing No Carb vs. LS diets." />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wpt-preorder.lovable.app/ls-diet-guide" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Low Starch, Low Sugar = Burn Fat" />
        <meta
          name="twitter:description"
          content="Why reducing starch and sugar lowers insulin and unlocks fat burning. Free guide." />


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
              Low Starch, Low Sugar = Burn Fat
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Starvation makes you skinnier, but your body pays the price. This guide explains why reducing starch and sugar lowers insulin, unlocks fat burning, and how to do it without eliminating the foods you love.



            </p>
            <Button size="lg" onClick={handleDownloadClick} disabled={isLoading}>
              {isLoading ?
              <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Loading...
                </> :

              <>
                  <Download className="w-4 h-4 mr-2" />
                  Download the Free Guide
                </>
              }
            </Button>
          </header>

          {/* Educational Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {/* Section 1: The Cost of Starvation */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">Weight Loss Has No Secret — You Just Need to Know the Cost

              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Prolonged starvation will make you skinnier within weeks. But starvation does not
                selectively burn fat. It also breaks down muscle and weakens the immune system. The
                scale drops, but your body pays the price: mood swings, decreased immune function,
                decreased bone density, loss of muscle mass, reduced metabolic rate, and increased
                long-term health risks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Historically, restrictive eating was spiritual—practised in Christianity, Islam,
                Judaism, Buddhism, and Hindu traditions as discipline and devotion, not as a weight
                loss strategy. In the modern era, the industrialization of food changed everything.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                According to the U.S. CDC, adult obesity prevalence was approximately 15% between
                1976 and 1980. By 2017–2018, it reached 42.4%. This sharp increase coincided with
                ultra-processed foods, refined starches, and added sugars becoming deeply embedded
                in the modern food supply.
              </p>
            </section>

            {/* Section 2: Three Attempts */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                I Lost 80+ Lbs Three Times. Here Is What I Learned.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Attempt 1:</strong> Removed meat completely,
                ate only vegetables two to three times a day. The weight dropped. But every meal
                felt like a punishment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Attempt 2:</strong> Vegetable smoothies,
                low-fat, low-carb meals with calorie tracking. The weight dropped. But I was hungry
                almost every day. I had willpower. I just did not have peace.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Attempt 3:</strong> Kept dietary fat high,
                removed sugar, starch, and most carbohydrates (No Carb). Insulin stayed low. Fat
                burning increased. The weight dropped again—but I was changing my social identity.
                Every gathering became a negotiation.
              </p>
              <p className="text-muted-foreground leading-relaxed">In 2025, I tested a different approach: vegetables, meats, moderate fruit, and occasional intentional carbohydrates. I lost 8–10 pounds per month consistently, going from 270 to 200 pounds in nine months. During that time, I hiked three peaks and completed my first Vancouver 10K Sun Run in 66 minutes.




              </p>
              <p className="text-muted-foreground leading-relaxed">
                Across all three attempts, one variable kept showing up: <strong className="text-foreground">carbohydrates</strong>.
              </p>
            </section>

            {/* Section 3: The Insulin Mechanism */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                The Untold Mechanism: Lower Insulin Allows Fat Burn
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you eat carbohydrates, they break down into glucose. Your pancreas detects the
                rise in blood sugar and releases insulin. Insulin acts as a metabolic gatekeeper: it
                regulates whether fatty acids are released from adipose tissue and whether they are
                burned for energy. Simply put, when insulin is high, fat burning slows down
                significantly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Fat is always there, like the sun in the sky. Insulin is the cloud cover. When
                insulin is high, dark clouds block the sun. When insulin drops, the sky clears, and
                fat burning resumes. Less glucose means clearer skies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If insulin stays elevated for long periods, your cells become less responsive—this
                is insulin resistance, which increases the risk of type 2 diabetes, cardiovascular
                disease, fatty liver disease, and other metabolic disorders.
              </p>
            </section>

            {/* Section 4: What Raises Insulin */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                What Raises Insulin the Most?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most people think of sugar first. But refined starches can raise blood glucose just
                as aggressively because they are quickly broken down into glucose during digestion.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-4">
                <li>White bread and pasta</li>
                <li>White rice</li>
                <li>Potatoes</li>
                <li>Breakfast cereals</li>
                <li>Pastries and baked goods</li>
                <li>Sweetened beverages</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Among the major nutrients, carbohydrates produce the strongest and most immediate
                insulin response. Protein stimulates insulin to a lesser degree. Dietary fat has
                minimal direct impact on insulin levels.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Many people also believe fruit is fundamentally better than added sugar. Eating
                whole fruit—with its fibre, water, and vitamins—can be part of a holistic approach.
                But at the molecular level, fructose from fruit is chemically identical to fructose
                from table sugar. Glucose raises blood sugar regardless of its source.
              </p>
            </section>

            {/* Section 5: No Carb vs LS */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                No Carb vs. Low-Starch, Low-Sugar (LS)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Using the six food categories from the 2025–2030 Dietary Guidelines for Americans:
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Protein Foods</h3>
              <p className="text-muted-foreground leading-relaxed">Both diets prioritize beef, pork, lamb, chicken, turkey, duck, fatty fish, shellfish, eggs, and organ meats. LS also allows legumes (lentils, chickpeas, black beans) and soy (tofu, tempeh, edamame) in controlled portions for fibre and gut health.




              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Dairy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Both prioritise cheese, heavy cream, butter, and ghee. LS also includes plain Greek
                yogurt, cottage cheese, full-fat milk, and kefir in controlled portions. No Carb
                may exclude milk and most yogurt due to lactose.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Vegetables</h3>
              <p className="text-muted-foreground leading-relaxed">
                Both prioritise non-starchy vegetables: spinach, kale, broccoli, cauliflower,
                zucchini, cucumber, asparagus, mushrooms, peppers, and cabbage. LS also allows
                low-starch vegetables like carrots, beets, peas, and butternut squash in controlled
                portions.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Fruits</h3>
              <p className="text-muted-foreground leading-relaxed">
                No Carb generally excludes fruit. LS allows lower-sugar, higher-fibre fruits in
                controlled portions: raspberries, blackberries, strawberries, grapefruit, kiwi,
                peach, plum, blueberries, green apple, and pear. Eat fruit whole to slow sugar
                absorption.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Whole Grains</h3>
              <p className="text-muted-foreground leading-relaxed">
                No Carb excludes all grains. LS may include small controlled portions of oats,
                quinoa, brown rice, or wild rice. LS-compatible substitutes include almond flour
                bread, coconut flour products, flaxseed wraps, and psyllium-based baking.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Healthy Fats</h3>
              <p className="text-muted-foreground leading-relaxed">
                No difference. Both rely on olive oil, avocado oil, coconut oil, butter, ghee,
                avocado, olives, nuts, and seeds as primary energy sources.
              </p>
            </section>

            {/* Section 6: Sustainable LS Lifestyle */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                Adopt a Sustainable LS Lifestyle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                LS is not restrictive eating. It is selective eating. The difference is
                psychological. When you pay attention to what you put in your mouth, when you eat,
                and how you eat, you retrain your relationship with food. You stop reacting to
                cravings and start responding with intention.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Think of weight in terms of time: spending $1,000 in one minute feels expensive.
                Spending $1,000 over three years—one dollar a day—feels manageable. It is the same
                $1,000, but the timeline changes the emotion. Losing 100 pounds in twelve months is
                healthy progress. Losing 100 pounds in three months often means muscle loss,
                hormonal disruption, and a high risk of rebound weight gain. Unless you are managing
                a serious medical condition, speed is not the priority. Sustainability is.
              </p>
            </section>

            {/* Section 7: Weight Permanence */}
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                Weight Permanence: The System Behind LS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Weight Permanence is the system developed after losing more than 80 pounds three
                times. The Weight Permanence Triangle™ is built on three axes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>
                  <strong className="text-foreground">Awareness</strong> – Be aware of what you
                  eat, how you eat, when you eat, and most importantly, why you want to lose weight.
                  Shift your priorities and uncover both the intrinsic pull that inspires you and the
                  push that compels you.
                </li>
                <li>
                  <strong className="text-foreground">Practice</strong> – Apply LS in real life, in
                  any setting. Practice does not make perfection; practice makes permanence.
                </li>
                <li>
                  <strong className="text-foreground">Permanence</strong> – You will go off track.
                  Everyone does. Permanence teaches you how to re-anchor quickly without guilt or
                  drama. No spirals. No self-punishment. Just awareness, correction, and forward
                  movement.
                </li>
              </ul>
            </section>
          </div>

          {/* References */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-6">
              References
            </h2>
            <ol className="list-decimal pl-6 text-sm text-muted-foreground space-y-2">
              {references.map((ref, i) =>
              <li key={i}>{ref}</li>
              )}
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) =>
              <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </section>

          {/* Download CTA Section */}
          <section className="bg-secondary/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-normal text-foreground mb-4">
                Get the Full Guide
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Download the complete guide to understand why lowering starch and sugar burns fat,
                how LS compares to No Carb, and how to make it sustainable for life.
              </p>
              <Button
                size="lg"
                className="animate-pulse-glow"
                onClick={handleDownloadClick}
                disabled={isLoading}>

                {isLoading ?
                <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading...
                  </> :

                <>
                    <Download className="w-4 h-4 mr-2" />
                    Download the Free Guide
                  </>
                }
              </Button>
            </div>
          </section>

          {/* Internal Link to Book */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to start using Weight Permanence Triangle™ to lose weight?
            </p>
            <a
              href="/#method"
              className="inline-flex items-center text-primary hover:underline font-medium">

              Explore the Weight Permanence Book
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <div className="mt-6 flex justify-center">
              <Button size="lg" onClick={handleDownloadClick} disabled={isLoading}>
                {isLoading ?
                <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading...
                  </> :

                <>
                    <Download className="w-4 h-4 mr-2" />
                    Download the Free Guide
                  </>
                }
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
        isLoading={isLoading} />

    </div>);

}