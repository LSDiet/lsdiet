import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "why-does-stress-make-me-eat-more",
  title: "Why Does Stress Make Me Eat More?",
  excerpt:
    "Stress eating is often an emotional regulation pattern rather than a physical hunger problem.",
  metaDescription:
    "Stress affects cravings, cortisol, emotional regulation, and behavioural consistency. Learn why stress eating becomes automatic for many people.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "awareness-stages",
  topics: ["stress-eating", "emotional-eating", "cravings", "cortisol", "behavioural-patterns"],
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
        Stress eating isn't really about hunger. Food temporarily changes
        emotional state — that's the actual draw. Stress reliably
        increases cravings, impulsive eating, comfort eating, and
        reward-seeking behaviour even when the body needs nothing.
      </p>

      <h2>Why Stress Eating Becomes Automatic</h2>

      <p>
        Over enough repetitions, the brain quietly pairs food with relief,
        comfort, reward, and distraction. Eventually the behaviour fires
        without any conscious decision — which is exactly the territory{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> is built to
        expose.
      </p>

      <h2>Why Cortisol Matters</h2>

      <p>
        Chronically elevated cortisol can affect cravings, energy,
        emotional regulation, sleep, and behavioural stability. That's
        part of why LS Diet starts with psychology and awareness instead
        of food rules, and why <a href="/blog/friction-awareness">friction
        awareness</a> matters for the environment around the stress.
      </p>

      <h2>Why Awareness Has to Come First</h2>

      <p>
        Most people don't fully see their triggers, stress patterns,
        environmental cues, or emotional eating loops. Naming them is the
        first real intervention — and{" "}
        <a href="/blog/action-practice">Action Practice</a> is where the
        replacement behaviour actually gets built.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Stress eating is behavioural and emotional, not a hunger problem.
        Awareness is usually the first move that actually changes it.
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
