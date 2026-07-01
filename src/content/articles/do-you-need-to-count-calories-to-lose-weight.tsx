import type { ArticleMeta, Article } from "./types";

const meta: ArticleMeta = {
  slug: "do-you-need-to-count-calories-to-lose-weight",
  title: "Do You Need to Count Calories to Lose Weight?",
  excerpt:
    "Calorie counting may help some goals, but many people can lose weight sustainably without tracking every number.",
  metaDescription:
    "Many people can lose weight without calorie counting by improving food quality, fullness, and behavioural consistency.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "ls-diet-foundations",
  topics: [
    "calorie-counting",
    "sustainable-weight-loss",
    "fullness",
    "behavioural-consistency",
    "ls-diet",
  ],
  primaryFoundationSlug:
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  relatedFoundationSlugs: [
    "action-practice",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
};

function Body() {
  return (
    <>
      <p>
        No. Many people can lose weight without ever counting a calorie —
        and{" "}
        <a href="/oscar-poon">Oscar Poon</a> doesn't count them for long term
        maintenance either. The honest answer though: context matters.
      </p>

      <h2>When Counting Actually Helps</h2>

      <p>
        Calorie tracking can be useful if you're bodybuilding, training
        athletically, chasing a specific physique, or managing detailed
        performance numbers. Those are real, legitimate use cases.
      </p>

      <p>
        Most people aren't in that bucket. They want sustainable weight
        loss, fewer cravings, and a system they can hold for a decade —
        which is the goal the{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        was built around.
      </p>

      <h2>Why LS Diet Focuses on Food Quality Instead</h2>

      <p>
        Shift the inputs and the numbers usually take care of themselves. A{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          low-starch low-sugar plate
        </a>{" "}
        — built around protein, vegetables, and real fullness — tends to:
      </p>

      <ul>
        <li>Cut cravings naturally</li>
        <li>Reduce impulsive snacking</li>
        <li>Make portion sizes self-regulate</li>
        <li>Survive stressful weeks without spreadsheets</li>
      </ul>

      <h2>Why Counting Burns People Out</h2>

      <p>
        Constant tracking, guilt over off days, perfectionism, and obsessive
        measurement quietly drain people. They quit. Then they restart.
        Then they quit again. That's the loop unpacked in{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          Why People Regain Weight After Dieting
        </a>{" "}
        — and exactly what behavioural permanence is designed to interrupt.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Calorie counting is a tool, not a requirement. For most people,
        improving food quality, awareness, and a few repeatable behaviours
        from{" "}
        <a href="/blog/action-practice">Action Practice</a> gets the job
        done — without the fatigue.
      </p>

      <p>
        Walk through it inside the{" "}
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
