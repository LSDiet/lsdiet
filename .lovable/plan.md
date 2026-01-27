

## Dynamic Description for Transformation Photos

Add the ability for each transformation card to show different descriptions depending on whether the "before" or "after" photo is displayed.

---

### What Will Change

Currently, each card shows the same description regardless of which photo is visible. After this update:

- **Before photo** → Shows description of that state (e.g., "Graduation weight with a lean and mobile body")
- **After photo** → Shows description of the weight gain state (e.g., "Gained 60 lbs after desk job and stress eating")

---

### Suggested Descriptions

Before providing the updated descriptions, I'd like to confirm what text you want for each "after" state:

| Card | Before Description (current) | After Description (you provide) |
|------|------------------------------|--------------------------------|
| **Card 1** | "Graduation weight with a lean and mobile body" | *What happened after the weight gain?* |
| **Card 2** | "Lost 60 lbs with veggie & smoothie cleanse" | *What happened after the regain?* |
| **Card 3** | "Lost 60 lbs with carnivore, IF & daily exercise" | *What happened after the regain?* |

---

### Technical Implementation

1. **Update the data structure** - Add an `afterDescription` field to each journey card
2. **Update the JourneyCard component** - Display `afterDescription` when hovering/tapping, and the original `description` otherwise
3. **Add smooth transition** - Apply a fade effect when the text changes to match the image transition

---

### Next Step

Please provide the descriptions you'd like to show for each "after" photo, and I'll implement the dynamic text switching.

