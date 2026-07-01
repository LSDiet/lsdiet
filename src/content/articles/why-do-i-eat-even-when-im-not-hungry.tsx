import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "why-do-i-eat-even-when-im-not-hungry",
  title: "Why Do I Eat Even When I'm Not Hungry?",
  excerpt:
    "Eating behaviour is often driven by emotion, habit, stress, or environment rather than true physical hunger.",
  metaDescription:
    "Many people eat emotionally, habitually, or environmentally rather than physically. Learn how LS Diet separates emotional and functional eating.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "awareness-stages",
  topics: ["emotional-eating", "cravings", "behavioural-awareness", "stress-eating", "patterns"],
  primaryFoundationSlug: "pattern-awareness",
  relatedFoundationSlugs: [
    "friction-awareness",
    "action-practice",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
};

function Body() {
  return (
    <>
      <p>
        Eating without physical hunger is extremely common. Stress,
        boredom, emotion, habit, environment, and social situations all
        trigger eating that has nothing to do with fuel.
      </p>

      <h2>Emotional Eating vs Functional Eating</h2>

      <p>
        LS Diet draws a hard line between the two. Functional eating
        solves physical hunger. Emotional eating tries to regulate emotion
        — usually temporarily, usually with diminishing returns.
      </p>

      <h2>Why Patterns Become Automatic</h2>

      <p>
        Snacking under stress, eating in front of screens, rewarding
        yourself with food, craving comfort when tired — repeat any of
        these enough times and they stop being decisions. That's where{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> comes in,
        alongside the environmental work inside{" "}
        <a href="/blog/friction-awareness">friction awareness</a>.
      </p>

      <h2>Why Awareness Has to Come First</h2>

      <p>
        You can't change behaviour you don't recognize. Pattern Awareness
        inside the{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        forces the who, what, when, where, why, and how of repeated
        eating into the open — and{" "}
        <a href="/blog/action-practice">Action Practice</a> is where you
        actually intervene on it.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Most eating problems aren't physical. They're psychological and
        environmental — which is good news, because that's the layer you
        can actually adjust.
      </p>

      <p>
        Learn the LS Diet framework and Action Practice systems inside the{" "}
        <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
          free LS Diet Course
        </a>
        .
      </p>
    </>
  );
}

const article: Article = { meta, Body };
export default article;
