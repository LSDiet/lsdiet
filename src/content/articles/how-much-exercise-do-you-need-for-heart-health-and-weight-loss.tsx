import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "how-much-exercise-do-you-need-for-heart-health-and-weight-loss",
  title:
    "150 Minutes a Week Is the Heart-Health Minimum — Here's How Much More Helps (And Why Diet Still Decides Your Weight)",
  excerpt:
    "150 minutes a week protects your heart, but it won't reverse weight regain on its own. Here's what the research says — and where the LS Diet fits in.",
  metaDescription:
    "New UK Biobank research shows 150 minutes weekly is a heart-health baseline, not a weight-loss formula. Learn how exercise and the LS Diet work together.",
  publishDate: "2026-06-03",
  updatedAt: "2026-06-03",
  canonicalTopic: "action-practice-examples",
  topics: ["exercise", "heart-health", "weight-regain", "cardio", "ls-diet"],
  primaryFoundationSlug: "action-practice",
  relatedFoundationSlugs: [
    "why-people-regain-weight-after-dieting",
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
};

function Body() {
  return (
    <>
      <p>
        General medical guidelines recommend at least 150 minutes of
        moderate- or vigorous-intensity activity per week — brisk walking,
        cycling, or running. It's the number most doctors quote, and it's
        the number most people aim for when they're trying to "get
        healthier." But a closer look at the research shows 150 minutes is
        a heart-health <em>floor</em>, not a weight-loss formula — and
        understanding the difference matters if you've ever exercised
        consistently and still regained the weight.
      </p>

      <h2>Where the 150-Minute Number Comes From</h2>

      <p>
        Researchers analyzed more than 17,000 adult participants in the UK
        Biobank who wore wrist accelerometers to measure movement and
        completed a fitness test. Activity data was collected in 2013–2015
        and linked to hospital and death records through October 2022,
        with a median follow-up of 7.85 years. During that period, the
        study recorded 874 cases of atrial fibrillation, 111 cases of
        heart failure, and 92 strokes. In one of his blogs, Carlos Solis{" "}
        <a
          href="https://site-promo.com/150-minutes-a-week-is-the-heart-health-minimum/"
          target="_blank"
          rel="noopener"
        >
          breaks down what the 150-minute threshold actually buys you
        </a>{" "}
        and notes that hitting it was associated with a modest 8–9% lower
        risk of cardiovascular events regardless of fitness level.
      </p>

      <h2>150 Minutes Is a Solid Baseline — Not the Limit</h2>

      <p>
        The analysis found that bigger heart-health gains required a lot
        more movement. A greater than 30% reduction in cardiovascular risk
        corresponded to roughly three to four times the weekly activity —
        about 560–610 minutes per week, or 80–90 minutes per day. For
        people who are already inactive, older, or managing existing heart
        disease, those volumes may be unrealistic without medical
        clearance.
      </p>

      <h2>Physical Activity and Fitness Aren't the Same</h2>

      <p>
        Participants also completed a submaximal cycling test to estimate
        VO2max — a measure of how efficiently the heart, lungs, and
        muscles deliver and use oxygen. Two people can report similar
        activity habits but have very different cardiorespiratory fitness
        due to genetics, age, medical history, or past training. The
        authors suggest future guidelines might separate the minimum
        volumes needed for basic safety from the much higher volumes
        required for optimal risk reduction.
      </p>

      <h2>Who Will Have to Work Harder</h2>

      <p>
        The link between activity, fitness, and risk was nonlinear. People
        with higher fitness had a built-in protective reserve, and
        increasing activity reduced their risk faster. The least-fit
        participants needed about 370 minutes per week to hit a roughly
        20% risk reduction, while the most fit needed about 340. To reach
        roughly a 30% reduction, estimates rose to about 610 minutes per
        week for the least fit and 560 for the most fit. Translation: if
        you're starting from inactive, expect to invest more time and
        effort than someone already in shape to get the same heart
        benefit.
      </p>

      <h2>Why Exercise Alone Won't Stop Weight Regain</h2>

      <p>
        Here's where most people get stuck. They hear "150 minutes" and
        assume that ticking the cardio box will also handle the scale. It
        doesn't. Exercise of that volume protects the cardiovascular
        system — it doesn't override the dietary patterns that drive{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          weight regain after dieting
        </a>
        . You can hit 150 minutes a week and still slowly regain weight if
        your daily eating pattern keeps insulin and hunger spiking.
      </p>

      <h2>Where the LS Diet Fits In</h2>

      <p>
        The{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          low-starch, low-sugar approach
        </a>{" "}
        works on a different lever than cardio. It lets you eat until
        full, stabilizes hunger between meals, and removes the daily
        cravings that quietly undo exercise progress. Combined with a
        sustainable activity habit — even just the 150-minute baseline —
        it forms the practical side of the{" "}
        <a href="/weight-permanence-triangle">Weight Permanence Training™</a>:
        awareness of what's driving regain, plus the practice habits that
        keep results in place.
      </p>

      <h2>A Realistic Plan</h2>

      <p>
        For most people, the smartest sequence is: clear the eating
        pattern first with the LS Diet, then layer in the 150-minute
        weekly activity baseline for heart health. If your doctor clears
        you and you can safely go higher, your heart will likely gain
        extra benefit. But don't expect exercise alone to fix the regain
        cycle — that's what the LS Diet framework is built for.
      </p>

      <p>
        Learn the full system inside the{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          free LS Diet Course
        </a>
        .
      </p>

      <p className="text-sm text-zinc-500 mt-8">
        Source: Cardiovascular activity and fitness study summary,{" "}
        <a
          href="https://site-promo.com/150-minutes-a-week-is-the-heart-health-minimum/"
          target="_blank"
          rel="noopener"
        >
          site-promo.com
        </a>
        , drawing on reporting from ZME Science.
      </p>
    </>
  );
}

const article: Article = { meta, Body };
export default article;
