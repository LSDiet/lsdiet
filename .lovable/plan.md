

## Reduce Section Spacing

This plan reduces the vertical blank space above all sections for a tighter, more compact layout.

---

### Current vs Proposed Spacing

| Section | Current | Proposed | Change |
|---------|---------|----------|--------|
| HeroSection | `pt-16 pb-8` | `pt-16 pb-4` | Reduce bottom padding |
| JourneySection | `py-16` | `py-10` | 64px → 40px |
| MethodSection | `py-16` | `py-10` | 64px → 40px |
| BookSection | `py-24` | `py-14` | 96px → 56px |
| ContactSection | `py-24` | `py-14` | 96px → 56px |

This reduces overall vertical spacing by approximately 40% while maintaining visual breathing room.

---

### Files to Modify

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Change `pb-8` to `pb-4` |
| `src/components/JourneySection.tsx` | Change `py-16` to `py-10` |
| `src/components/MethodSection.tsx` | Change `py-16` to `py-10` |
| `src/components/BookSection.tsx` | Change `py-24` to `py-14` |
| `src/components/ContactSection.tsx` | Change `py-24` to `py-14` |

---

### Additional Internal Spacing Reduction

Some sections also have large internal margins that add to the "empty" feeling:

| Location | Current | Proposed |
|----------|---------|----------|
| JourneySection intro `mb-12` | 48px | `mb-8` (32px) |
| MethodSection header `mb-12` | 48px | `mb-8` (32px) |
| MethodSection principles grid `mb-20` | 80px | `mb-12` (48px) |
| ContactSection header `mb-10` | 40px | `mb-6` (24px) |

---

### Domain Setup Note

For your `www.whataboutweight.com` domain issue, you need to add the www subdomain separately in Lovable. See the instructions above or refer to the Lovable documentation on connecting domains.

