import heroImage from "@/assets/blog/blog-muscle-loss-reality.jpg";
import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "youre-losing-muscle-not-just-fat-on-glp1-drugs",
  title: "You're Losing Muscle, Not Just Fat, on GLP-1 Drugs",
  excerpt: "The scale goes down and that feels like progress — but up to 45% of the weight you lose on Ozempic may be muscle, not fat. Most people have no idea.",
  metaDescription: "GLP-1 drugs like Ozempic cause significant muscle loss alongside fat loss. Here's what the research shows — and why this matters more if you're over 45.",
  publishDate: "2026-06-20",
  updatedAt: "2026-06-20",
  canonicalTopic: "stop-weight-regain",
  topics: ["glp-1", "ozempic", "muscle-loss", "body-composition", "reality-awareness"],
  primaryFoundationSlug: "reality-awareness",
  relatedFoundationSlugs: ["why-people-regain-weight-after-dieting", "the-weight-permanence-triangle-how-to-stop-regaining-weight"],
  heroImage: heroImage,
  heroImageAlt: "Woman standing on a body composition scale at home with dumbbells nearby",
};

function Body() {
  return (
    <>
      <p>
        The number on the scale is going down. You feel like it is working.
        And in one sense, it is — you are lighter. But lighter does not mean
        what most people think it means. On GLP-1 medications like Ozempic or
        Wegovy, a significant portion of what you are losing is not fat. It is
        muscle.
      </p>

      <p>
        Most people on these drugs have no idea. And most do not ask.
      </p>

      <h2>What the Research Actually Shows</h2>

      <p>
        In the STEP1 clinical trial — one of the landmark semaglutide studies —
        participants lost an average of 15.3 kg over 68 weeks. Of that, 6.92 kg
        was lean mass. That is approximately 45% of the total weight lost coming
        from muscle, not fat.
      </p>

      <p>
        The COURAGE trial found a similar pattern, with roughly 35% of
        semaglutide induced weight loss attributed to lean mass reduction.
        Across multiple studies, the range sits between 35% and 45% depending
        on the patient population, the dose, and the duration of treatment.
      </p>

      <p>
        To put that in plain terms: if you lose 20 lbs on Ozempic, somewhere
        between 7 and 9 of those pounds may be muscle. The fat loss is real.
        The muscle loss is also real. The scale does not tell you which is
        which.
      </p>

      <h2>Why This Hits Harder After 45</h2>

      <p>
        Muscle is not easy to rebuild at any age. After 45 to 50, it becomes
        significantly harder. The biological process of building new muscle mass
        slows, the hormonal environment is less favourable, and recovery from
        resistance training takes longer. What you lose in your 50s on a
        GLP-1 medication may take years to recover — if it comes back at all.
      </p>

      <p>
        This matters for more than aesthetics. Muscle is metabolically active
        tissue. It burns calories at rest, helps regulate blood sugar, and
        supports joint health, balance, and mobility. Losing it quietly — while
        watching the scale drop and feeling like you are making progress — sets
        up a slower metabolism, a weaker frame, and a body that is more
        vulnerable to weight regain when the medication stops.
      </p>

      <p>
        The cruel irony is that GLP-1 drugs suppress appetite so effectively
        that people often eat far too little protein to protect their muscle.
        They are in a calorie deficit and a protein deficit simultaneously, and
        the body breaks down muscle to compensate. The weight loss looks good
        on paper. The body composition tells a different story.
      </p>

      <h2>The Honest Baseline Most People Never Establish</h2>

      <p>
        This is a knowledge problem before it is anything else. You cannot
        track what you are not measuring. Most people who start a GLP-1
        medication step on a scale once a week and call that data. They have no
        baseline body composition, no understanding of how much lean mass they
        are carrying, and no way to know whether what they are losing is
        actually what they want to lose.
      </p>

      <p>
        Stage 1 of{" "}
        <a href="/awareness-stages">Weight Permanence Training</a> is called
        Reality Awareness. It exists for exactly this reason. The 14 questions
        in this stage are designed to force an honest accounting of where you
        actually are — not where you hope you are, not what the scale says, but
        what is really happening in your body, your habits, and your
        understanding of your own health.
      </p>

      <p>
        Most people skip this step entirely. They start with the solution
        (medication, diet, exercise program) before they have any clear picture
        of the problem. That is how you end up three months into a GLP-1
        protocol with no idea that you are losing muscle faster than fat, and
        no plan to address it.
      </p>

      <h2>What Knowing This Changes</h2>

      <p>
        If you are on a GLP-1 medication right now, this is not a reason to
        stop. It is a reason to pay attention to what you are actually losing
        and to make deliberate choices about protein intake and resistance
        training while the drug is giving you room to make them.
      </p>

      <p>
        If you are considering a GLP-1 medication, build your honest baseline
        first. Know your body composition before you start so you can track
        what changes — and so you have something real to protect.
      </p>

      <p>
        The{" "}
        <a href="/weight-permanence-triangle">Weight Permanence Triangle</a>{" "}
        is built on the premise that lasting results require the right eating
        approach, the right behavioural system, and a body you understand
        clearly enough to protect. Scale weight is a starting point. It is not
        the whole picture. If you have never established what is actually
        underneath that number, that is where to begin.{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          Most weight regain happens because people never had the full picture
          to begin with.
        </a>
      </p>
    </>
  );
}

const article: Article = { meta, Body };
export default article;
