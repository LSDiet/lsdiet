import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "why-do-i-keep-restarting-weight-loss",
  title: "Why Do I Keep Restarting Weight Loss?",
  excerpt:
    "Repeated weight regain is often a behavioural permanence problem, not an information problem.",
  metaDescription:
    "Many people repeatedly restart weight loss because the underlying behavioural systems never changed. Learn how LS Diet approaches permanence differently.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "stop-weight-regain",
  topics: [
    "weight-regain",
    "behavioural-permanence",
    "motivation",
    "dieting-psychology",
    "consistency",
  ],
  primaryFoundationSlug:
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedFoundationSlugs: [
    "friction-awareness",
    "pattern-awareness",
    "action-practice",
  ],
};

function Body() {
  return (
    <>
      <p>
        If you've lost the same 20 pounds three or four times, the issue is
        almost never information. You already know what to eat. The problem is
        that the underlying behaviour never changed — so the weight came back
        the moment life got loud again.
      </p>

      <p>
        This is the restart cycle, and it's one of the central problems
        explored in{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          Why People Regain Weight After Dieting
        </a>
        .
      </p>

      <h2>The Restart Cycle, Up Close</h2>

      <p>
        It usually looks like this: motivation spikes, weight drops, life gets
        stressful, routines collapse, old defaults return — stress eating,
        emotional eating, convenience eating — and the regain begins. The
        details vary. The pattern almost never does.
      </p>

      <h2>Why Motivation Alone Keeps Failing</h2>

      <p>
        Motivation is reactive. It shows up after embarrassment, after a
        breakup, after a health scare, before vacation, on January 1st. Then
        it leaves. Anything you built on top of it leaves with it.
      </p>

      <p>
        Permanence is built differently. The{" "}
        <a href="/weight-permanence-triangle">Weight Permanence Training™</a>{" "}
        treats motivation as one ingredient, not the whole recipe — paired
        with friction reduction, pattern recognition, and repeatable practice.
      </p>

      <h2>Awareness Comes Before Change</h2>

      <p>
        You can't fix a pattern you can't see. Most people don't fully clock
        their own triggers — the time of day, the emotion, the environment,
        the drift after a hard week. Walking through the{" "}
        <a href="/awareness-stages">5 Awareness Stages</a> is what makes those
        invisible loops finally visible, especially{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> and{" "}
        <a href="/blog/friction-awareness">friction awareness</a>.
      </p>

      <h2>Why Extreme Dieting Multiplies Restarts</h2>

      <p>
        Crash diets, starvation phases, and brutal exercise blocks produce
        fast results and fragile systems. They collapse under stress, social
        events, fatigue, or emotional pressure. Every collapse trains the
        brain that weight loss is temporary by nature.
      </p>

      <p>
        Sustainable LS eating plus repeatable behaviour — the{" "}
        <a href="/blog/action-practice">Action Practice</a> approach — points
        the opposite direction.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        The real goal isn't another round of weight loss. It's stopping the
        restart cycle for good. That requires more than a diet. It requires
        behavioural permanence.
      </p>

      <p>
        Walk through the full system inside the{" "}
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
