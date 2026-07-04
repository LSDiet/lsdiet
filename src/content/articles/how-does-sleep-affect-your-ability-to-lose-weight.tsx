import type { ArticleMeta, Article } from "./types";
import heroImage from "@/assets/blog/how-does-sleep-affect-your-ability-to-lose-weight-hero.jpg";

const meta: ArticleMeta = {
  slug: "how-does-sleep-affect-your-ability-to-lose-weight",
  title: "How Does Sleep Affect Your Ability to Lose Weight?",
  excerpt:
    "Poor sleep affects cravings, stress, emotional eating, and behavioural consistency far more than most people realize.",
  metaDescription:
    "Sleep affects cravings, stress hormones, energy, and behavioural consistency. Learn why sleep plays a major role in sustainable weight loss.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "ls-diet-foundations",
  topics: [
    "sleep",
    "cortisol",
    "cravings",
    "emotional-eating",
    "behavioural-consistency",
  ],
  primaryFoundationSlug:
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedFoundationSlugs: [
    "pattern-awareness",
    "action-practice",
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  ],
  heroImage,
  heroImageAlt: "A woman lying awake in bed next to a scale, unable to sleep",
};

function Body() {
  return (
    <>
      <p>
        Poor sleep raises cortisol and cravings, which is why short nights
        undermine weight loss even when your diet and exercise stay
        consistent. Most people pour energy into calories, exercise, and
        meal plans while quietly ignoring recovery. Recovery is where
        cravings, emotional regulation, and decision making either hold or
        fall apart.
      </p>

      <h2>Why Does Poor Sleep Spike Cravings?</h2>

      <p>
        After a short night, behaviour shifts predictably: more snacking,
        more emotional eating, more carbohydrate cravings, more quick
        dopamine hunting. None of it feels like a choice, which is exactly
        why{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> matters more
        than willpower here.
      </p>

      <h2>How Does Cortisol Cause Behavioural Drift?</h2>

      <p>
        Sustained poor sleep raises cortisol, and elevated cortisol drives
        stress eating, fatigue, visceral fat retention, and behavioural
        inconsistency. People rarely "lose discipline" overnight. Energy
        drops, stress rises, and the routines quietly stop running.
      </p>

      <p>
        A{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          low-starch low-sugar baseline
        </a>{" "}
        makes those drift days less catastrophic. You're not also riding a
        sugar rollercoaster on top of three hours of sleep debt.
      </p>

      <h2>Why Should You Treat Sleep Like a Designed Behaviour?</h2>

      <p>
        Treat sleep the same way you treat meal prep: a designed input.
        The{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        treats recovery as part of the system, not a bonus. A small,
        repeatable wind down routine from{" "}
        <a href="/blog/action-practice">Action Practice</a> outperforms any
        single "I'll sleep more this week" intention.
      </p>

      <h2>What's the Bottom Line on Sleep and Weight Loss?</h2>

      <p>
        Weight loss isn't only about food. Sleep affects cravings, stress,
        emotional stability, consistency, and how long the whole system
        survives.
      </p>

      <p>
        Walk through the full framework inside the{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          free LS Diet Course
        </a>
        .
      </p>
    </>
  );
}

const article: Article = { meta, Body };
export default article;
