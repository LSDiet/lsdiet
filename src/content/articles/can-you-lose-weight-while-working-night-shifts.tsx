import type { ArticleMeta, Article } from "./types";

const meta: ArticleMeta = {
  slug: "can-you-lose-weight-while-working-night-shifts",
  title: "Can You Lose Weight While Working Night Shifts?",
  excerpt:
    "Night shifts create behavioural and environmental challenges, but sustainable systems can still make weight loss possible.",
  metaDescription:
    "Yes. Weight loss during night shifts is possible with meal prep, behavioural consistency, and low-starch low-sugar eating systems.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "action-practice-examples",
  topics: [
    "night-shift",
    "meal-prep",
    "office-weight-loss",
    "behavioural-consistency",
    "sleep",
  ],
  primaryFoundationSlug: "action-practice",
  relatedFoundationSlugs: [
    "friction-awareness",
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  ],
};

function Body() {
  return (
    <>
      <p>
        Yes — night shifts make weight loss harder, not impossible. The
        challenge isn't biology so much as environment: irregular eating
        windows, vending machine convenience, fatigue, and a body clock
        that's constantly being negotiated with.
      </p>

      <h2>What Actually Trips People Up</h2>

      <ul>
        <li>Irregular eating schedules</li>
        <li>Late night fatigue eating</li>
        <li>Vending machines and fast food as the path of least resistance</li>
        <li>Sugary energy drinks instead of sleep</li>
        <li>Inconsistent routines week to week</li>
      </ul>

      <p>
        These are environmental defaults, not character flaws. Naming them
        is the first move of{" "}
        <a href="/blog/friction-awareness">friction awareness</a> — and the
        precondition for changing them.
      </p>

      <h2>Why Meal Prep Is Non Negotiable on Nights</h2>

      <p>
        When the surrounding food environment is junk, meal prep is the only
        leverage you have. Boring works:{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          a few low-starch low-sugar staples
        </a>{" "}
        — protein, vegetables, something easy to reheat — packed before the
        shift starts.
      </p>

      <h2>Fatigue Eating Is Predictable</h2>

      <p>
        Late night exhaustion drives quick energy cravings. You'll plan
        less, snack more, and reach for sugar to push through. Building one
        small, repeatable habit from{" "}
        <a href="/blog/action-practice">Action Practice</a> beats trying to
        white knuckle the whole shift.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Night shifts are a harder difficulty setting — they reward
        preparation, environmental control, and simple systems that survive
        a 2am low point.
      </p>

      <p>
        See the full LS Diet framework inside the{" "}
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
