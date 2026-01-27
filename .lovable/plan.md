

## Contact Section Implementation

This plan adds a "Have a Question?" contact form section after the book pre-order section, matching the existing design language.

---

### Section Placement

```text
[BookSection] - Pre-order CTA
       ↓
[NEW: ContactSection] - Contact form
       ↓
[FooterSimple] - Copyright
```

---

### Design Approach

The contact section will:
- Follow the warm, inviting aesthetic with the cream background (`bg-secondary/30`)
- Use the same scroll-triggered fade-in animation as other sections
- Include a card-based form layout matching the existing design patterns
- Provide direct email mention (info@whataboutweight.com) as an alternative

---

### Form Fields

| Field | Type | Validation |
|-------|------|------------|
| Name | Text input | Required, max 100 characters |
| Email | Email input | Required, valid email format |
| Phone | Tel input | Optional |
| Message | Textarea | Required, max 1000 characters |

---

### Technical Details

**New File: `src/components/ContactSection.tsx`**

1. Create a new component following existing patterns
2. Use `react-hook-form` with `zod` for form validation (already installed)
3. Apply the `useScrollAnimation` hook for entrance animation
4. Use existing UI components: `Input`, `Textarea`, `Button`, `Label`
5. Include toast notifications for form submission feedback
6. Add a note directing users to email info@whataboutweight.com directly

**File: `src/pages/Index.tsx`**

1. Import the new `ContactSection` component
2. Add it between `BookSection` and `FooterSimple`

---

### Form Behaviour

Since there's no backend configured for form submissions:
- Display a success message on submit with instructions to email directly
- Clear the form after submission
- Mention that users can also email info@whataboutweight.com directly in the section header

---

### Visual Layout

```text
┌─────────────────────────────────────────────┐
│         [Have a Question? badge]            │
│                                             │
│    We'd Love to Hear From You               │
│    (subtitle with email mention)            │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  Name: [________________]           │    │
│  │  Email: [________________]          │    │
│  │  Phone: [________________]          │    │
│  │  Message:                           │    │
│  │  [                               ]  │    │
│  │  [                               ]  │    │
│  │                                     │    │
│  │  [Send Message]                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Or email us directly at                    │
│  info@whataboutweight.com                   │
└─────────────────────────────────────────────┘
```

---

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/ContactSection.tsx` | Create new component |
| `src/pages/Index.tsx` | Import and add ContactSection |

