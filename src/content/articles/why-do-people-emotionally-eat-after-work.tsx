import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "why-do-people-emotionally-eat-after-work",
  title: "Why Do People Emotionally Eat After Work?",
  excerpt:
    "After long workdays, food often becomes emotional relief rather than physical fuel.",
  metaDescription:
    "Many people emotionally eat after work because stress, fatigue, and behavioural conditioning increase reward-seeking behaviour.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "awareness-stages",
  topics: ["emotional-eating", "stress", "cravings", "office-weight-loss", "behavioural-patterns"],
  primaryFoundationSlug: "pattern-awareness",
  relatedFoundationSlugs: [
    "friction-awareness",
    "action-practice",
    "why-does-stress-make-me-eat-more",
  ],
};

function Body() {
  return (
    <>
      <p>
        Most people eat very differently after work than they do at
        breakfast or lunch. The reason isn't appetite. Work creates stress,
        fatigue, frustration, emotional exhaustion, and dopamine
        depletion — and food temporarily changes that emotional state.
        Repeated nightly, it's one of the most common engines behind{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          weight regain after dieting
        </a>
        .
      </p>

      <h2>Why It Becomes Reinforced</h2>

      <p>
        Pair food with relief, comfort, reward, and relaxation enough
        times and the brain automates the response. The 6pm snack stops
        being a decision. That's exactly what{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> is built
        to expose, and why{" "}
        <a href="/blog/why-does-stress-make-me-eat-more">stress and eating
        share so many wires</a>.
      </p>

      <h2>Why Fatigue Weakens Behaviour</h2>

      <p>
        Late in the day, decision quality drops, cravings rise, and
        convenience starts winning. That's the practical case for{" "}
        <a href="/blog/friction-awareness">friction awareness</a> —
        engineering the environment so the LS option is the easy option
        when you're already tired.
      </p>

      <h2>Why Awareness Matters</h2>

      <p>
        Most people don't fully recognize their emotional triggers,
        behavioural loops, environmental cues, or stress responses. Naming
        them is the first move; replacing the behaviour is the work of{" "}
        <a href="/blog/action-practice">Action Practice</a>.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        After-work emotional eating is extremely common. Awareness and a
        simple behavioural system reduce it more reliably than discipline
        ever will.
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
