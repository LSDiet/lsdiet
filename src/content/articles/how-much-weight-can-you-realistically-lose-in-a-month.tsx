import type { ArticleMeta, Article } from "./types";
import heroImage from "@/assets/blog/how-much-weight-can-you-realistically-lose-in-a-month-hero.webp";

const meta: ArticleMeta = {
  slug: "how-much-weight-can-you-realistically-lose-in-a-month",
  title: "How Much Weight Can You Realistically Lose in a Month?",
  excerpt:
    "Most sustainable weight loss happens more gradually than extreme diet marketing suggests.",
  metaDescription:
    "Real, sustainable weight loss with LS Diet usually looks like 5 to 7 lbs a month, not the extreme drops diet marketing promises. Here's why slower wins.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "stop-weight-regain",
  topics: [
    "sustainable-weight-loss",
    "weight-regain",
    "realistic-expectations",
    "behavioural-consistency",
    "ls-diet",
  ],
  primaryFoundationSlug:
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  relatedFoundationSlugs: [
    "action-practice",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
  heroImage,
  heroImageAlt:
    "A hand watering a small growth chart, representing slow, steady progress",
};

function Body() {
  return (
    <>
      <p>
        Most people inside LS Diet lose 5 to 7 lbs a month once the system
        stabilizes. Faster is possible. Lasting faster is much rarer than
        the marketing suggests.
      </p>

      <h2>Why Do Aggressive Expectations Backfire?</h2>

      <p>
        Crash diets and aggressive cuts produce fast early numbers. A lot
        of that is water, some of it is muscle. Then comes the frustration,
        the burnout, and the regain cycle unpacked in{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          Why People Regain Weight After Dieting
        </a>
        . The number on the scale moves. The underlying behaviour doesn't.
      </p>

      <h2>Why Does Slow and Repeatable Progress Win?</h2>

      <p>
        The point isn't temporary weight loss. The point is repeatability:
        a system you can run through travel, stress, social events, and
        exhaustion. That's the work of the{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        and the daily reps inside{" "}
        <a href="/blog/action-practice">Action Practice</a>.
      </p>

      <p>
        A{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          low-starch low-sugar baseline
        </a>{" "}
        tends to produce that steady but real progress without dragging
        you through a fragile starvation phase.
      </p>

      <h2>Why Do Expectations Matter Psychologically?</h2>

      <p>
        Unrealistic expectations create discouragement even when progress
        is meaningful. People quit at month two of a system that would
        have changed their next decade. Calibrating to 5 to 7 lbs a month
        protects the behaviour from the emotional swings.
      </p>

      <h2>Is 5 to 7 Pounds a Month Actually Enough?</h2>

      <p>
        It's slower than extreme marketing promises. It's also far more
        likely to still be working a year from now. That tradeoff is the
        whole game.
      </p>

      <p>
        See the full framework inside the{" "}
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
