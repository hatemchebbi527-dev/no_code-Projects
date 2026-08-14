# Frontend Design Skill

You are building a premium web experience. Apply this design system consistently across every component you create or modify.

---

## Typography Scale

Use a structured type scale — never arbitrary font sizes.

```
xs:   12px / 0.75rem
sm:   14px / 0.875rem
base: 16px / 1rem
lg:   18px / 1.125rem
xl:   20px / 1.25rem
2xl:  24px / 1.5rem
3xl:  30px / 1.875rem
4xl:  36px / 2.25rem
5xl:  48px / 3rem
6xl:  60px / 3.75rem
```

- Headings: font-weight 700 or 800
- Body: font-weight 400, line-height 1.6
- Labels/caps: font-weight 600, letter-spacing 0.05em
- Never use more than 3 font sizes on the same screen section

---

## Spacing System (8px base grid)

All spacing must be multiples of 8px. Use Tailwind classes that map to this grid.

```
4   → 1rem  (16px)   — tight spacing between related elements
8   → 2rem  (32px)   — section internal padding
12  → 3rem  (48px)   — between components
16  → 4rem  (64px)   — section vertical padding
24  → 6rem  (96px)   — large section gaps
32  → 8rem  (128px)  — hero vertical padding
```

Never use arbitrary pixel values. Prefer `gap-6`, `py-16`, `px-8`, etc.

---

## Color Tokens

Use semantic color tokens — never hardcode hex values.

| Token      | Purpose                        | Example value         |
|------------|--------------------------------|-----------------------|
| primary    | Brand color, CTAs, links       | #2563EB (blue-600)    |
| primary-dk | Hover state of primary         | #1D4ED8 (blue-700)    |
| neutral-50 | Page background                | #F9FAFB               |
| neutral-100| Card backgrounds               | #F3F4F6               |
| neutral-600| Body text                      | #4B5563               |
| neutral-900| Headings                       | #111827               |
| accent     | Highlights, badges, tags       | #7C3AED (violet-600)  |
| success    | Confirmations                  | #059669 (emerald-600) |

Rules:
- Primary color appears on max 20% of the page surface
- Backgrounds use neutral-50 or white only
- Never use pure black (#000000) for text — use neutral-900
- Ensure 4.5:1 contrast ratio minimum for body text

---

## Animation with Framer Motion

Framer Motion is installed. Use it for all animations. Never use raw CSS transitions for entrance animations.

### Standard patterns to apply:

**Fade-in on scroll:**
```tsx
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
  {/* content */}
</motion.div>
```

**Staggered list reveal:**
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(i => <motion.li key={i.id} variants={item}>{...}</motion.li>)}
</motion.ul>
```

**Hover button lift:**
```tsx
<motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
  Click me
</motion.button>
```

Rules:
- All scroll-triggered animations use `viewport={{ once: true }}` (fire once only)
- Duration: 0.3s for micro-interactions, 0.5s for entrances
- Use `ease: 'easeOut'` for entrances, `spring` for interactive elements
- Never animate layout-breaking properties (width, height) — animate opacity and transform only

---

## Component Patterns

### Button

```tsx
// Primary CTA
<motion.button
  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
>
  Label
</motion.button>

// Secondary
<button className="border border-neutral-300 hover:border-neutral-400 text-neutral-700 font-medium px-6 py-3 rounded-lg transition-colors">
  Label
</button>
```

### Card

```tsx
<motion.div
  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
  whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
  className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
>
  {/* icon, title, description */}
</motion.div>
```

### Section wrapper

```tsx
<section className="py-24 px-4">
  <div className="max-w-6xl mx-auto">
    {/* content */}
  </div>
</section>
```

---

## Layout Principles

- Max content width: `max-w-6xl` (1152px) or `max-w-5xl` (1024px) for text-heavy sections
- Always center content with `mx-auto`
- Mobile-first: start with single column, add `md:grid-cols-2`, `lg:grid-cols-3`
- Sections alternate background: white / neutral-50 / white
- Hero sections: min-height `min-h-screen` or `py-32`

---

## Anti-patterns to Avoid

- No generic purple-to-blue gradient backgrounds (overused AI aesthetic)
- No `text-4xl font-bold text-center` hero with no hierarchy — use size contrast
- No rainbow gradients on text unless it's a deliberate accent on one word
- No `border-2 border-dashed` placeholder boxes in production
- No `box-shadow: 0 0 20px rgba(0,0,0,0.5)` glow everywhere
- No lorem ipsum — always use realistic placeholder content
- No icon-per-bullet-point lists that all look identical — vary visual weight
- No more than 3 CTA buttons visible at once

---

## 21st.dev Component Integration

When integrating components from 21st.dev:
1. Preserve the component's visual structure but adapt colors to this token system
2. Replace hardcoded colors with Tailwind semantic classes
3. Wrap entrance animations with Framer Motion patterns above
4. Ensure the component respects the spacing grid

---

## Quality Checklist

Before declaring a component complete:
- [ ] Uses spacing grid (multiples of 8px via Tailwind)
- [ ] Uses color tokens (no random hex)
- [ ] Has scroll-triggered entrance animation (Framer Motion)
- [ ] Hover states on all interactive elements
- [ ] Responsive at mobile (375px), tablet (768px), desktop (1280px)
- [ ] No text smaller than 14px
- [ ] Headings have clear hierarchy (not all the same size)
