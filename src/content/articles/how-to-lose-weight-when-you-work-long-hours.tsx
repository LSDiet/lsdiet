import type { ArticleMeta, Article } from "./types";

const meta: ArticleMeta = {
  slug: "how-to-lose-weight-when-you-work-long-hours",
  title: "How to Lose Weight When You Work Long Hours",
  excerpt:
    "Weight loss during long work hours is less about time management and more about behavioural prioritization.",
  metaDescription:
    "Long work hours create fatigue, procrastination, and behavioural drift. Learn how LS Diet approaches consistency during busy periods.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "stop-weight-regain",
  topics: [
    "fatigue",
    "procrastination",
    "office-weight-loss",
    "behavioural-priority",
    "consistency",
  ],
  primaryFoundationSlug: "friction-awareness",
  relatedFoundationSlugs: [
    "action-practice",
    "consequence-awareness",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
};

function Body() {
  return (
    <>
      <p>
        "I don't have time to lose weight" is usually a priority statement
        in disguise. Long hours create real fatigue — and that fatigue
        quietly turns into procrastination, convenience eating, and skipped
        routines until consistency collapses without anyone noticing.
      </p>

      <h2>Time Management vs Behaviour Management</h2>

      <p>
        People almost always find time for what's become emotionally
        important enough. The bottleneck is rarely the calendar; it's the
        weight the behaviour carries in your week. That's the exact reframe
        the{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        is built around — awareness, friction, prioritisation, and
        implementation as one system.
      </p>

      <h2>Why Fatigue Causes Drift</h2>

      <p>
        After a 60-hour week, the default options are powerful: skip the
        meal prep, order in, push movement to "tomorrow," eat for
        regulation. None of these are character flaws — they're predictable
        outputs of an environment that hasn't been redesigned. That's the
        work of{" "}
        <a href="/blog/friction-awareness">friction awareness</a>:
        identifying which defaults are quietly running your week.
      </p>

      <h2>Simple Systems Survive Real Life</h2>

      <ul>
        <li>One go to LS meal you can reheat in five minutes</li>
        <li>A 15-minute walk that doesn't require gym clothes</li>
        <li>Pre decided takeout orders for the worst nights</li>
        <li>A short daily rep from{" "}
          <a href="/blog/action-practice">Action Practice</a> instead of an
          overhaul
        </li>
      </ul>

      <p>
        Recognising the long term cost of not changing — the territory of{" "}
        <a href="/blog/consequence-awareness">consequence awareness</a> —
        often supplies the priority shift these systems need to stick.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Weight loss during busy work periods is absolutely possible. It
        just needs prioritisation, environmental structure, and repeatable
        routines designed for tired evenings — not perfect ones.
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
