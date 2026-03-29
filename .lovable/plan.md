

## Trim the Hero Bullet List

**Goal**: Reduce visual clutter by keeping only the 3-4 strongest, most differentiated points and removing the rest.

### What stays (4 points)
1. "How to lose 6-10 lbs per month **consistently**"
2. "How to find **PUSH and PULL motivation**"
3. "How to make weight loss decisions **automatic**"
4. "No workouts required"

### What gets removed
- "Attend a weekly live webinar hosted by Oscar" — nice-to-have detail, not a hook
- "Week 1: Weight stops climbing" — too granular for a hero
- "Week 2: Weight loss begins (repeat Week 1 activities)" — too granular for a hero

### Where the removed content goes
Move the Week 1/Week 2 timeline and webinar detail into the **BookSection** (course CTA section lower on the page), where users are already deeper in the funnel and ready for specifics.

### File changes
1. **`src/components/HeroSection.tsx`** — Trim `coursePoints` array to 4 items
2. **`src/components/BookSection.tsx`** — Add the Week 1/2 timeline and webinar mention to the course details

