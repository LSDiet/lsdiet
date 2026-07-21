# Topic Backlog — Gmail Alert Insights

Written by: Gmail alert triage task (daily, Cowork scheduled).
Read by: weight-loss-audience-briefing skill, Phase 1, before presenting its 3 fresh topics.

## How this file is used

1. The Gmail triage task finds an interesting insight in a Google Alert, summarizes it for Oscar, and asks if he wants to save it as a blog topic.
2. If yes, it appends a row below with status `pending`.
3. On its next run (Mon/Wed/Fri), the blog skill reads every `pending` and `carried` row, presents them to Oscar alongside its own 3 fresh topics, and asks him to pick one for that day.
4. Any `pending`/`carried` row Oscar does not pick gets asked about directly: "Carry this to next time?"
   - Yes: row status becomes `carried`, stays in the table.
   - No: row status becomes `dropped`, and the row is deleted from this file entirely so Oscar never sees it again.
5. Whichever row Oscar does pick gets written up, and once the article is live, its status becomes `published` with the publish date and slug, matching the pattern used in `glp1-titles.md`.

## Active backlog

| Date Added | Title | Source Article | Status | Notes |
|---|---|---|---|---|
| 2026-07-20 | The Exercise Paradox: Workouts Don't Drive Weight Loss, But They Prevent Regain | SciTechDaily, "The Exercise Paradox: Why Workouts Don't Guarantee Weight Loss" (https://scitechdaily.com/the-exercise-paradox-why-workouts-dont-guarantee-weight-loss/) | pending | Exercise is weak for initial weight loss (appetite compensation, reduced non-exercise movement) but disproportionately useful for preventing regain, resistance training preserves muscle and resting energy expenditure. Fits Permanence framing directly. |
| 2026-07-21 | European Scientists Push for Integrative Approach to Obesity Prevention | Clinical Trials Arena, "European scientists advocate for integrative approach to obesity prevention" (https://www.clinicaltrialsarena.com/analyst-comment/european-scientists-advocate-integrative-approach-obesity-prevention/) | pending | Source is a GlobalData industry/policy analysis of a June 2026 Lancet Regional Health Europe paper (Holm et al., OBEClust), not consumer content. Would need reframing from EU policy angle to a practical Permanence angle before this works as a blog post, e.g. "why pills alone won't stop the regain, prevention has to be structural too." |
