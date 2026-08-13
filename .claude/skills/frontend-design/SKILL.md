---
name: frontend-design
description: Design system rules for building any web UI in this workspace (My Hope Step and other Next.js/Tailwind sites). Use this skill BEFORE writing any frontend component, page, layout, or styling — whenever building UI, choosing font sizes, spacing, colors, radii, or animations. Enforces a real modular typography scale, an 8pt spacing grid, semantic color tokens, and the project's Framer Motion animation patterns. Trigger on any request to build, style, redesign, or lay out a page, section, component, card, hero, button, or form.
---

# Frontend Design System

Follow these rules for **every** piece of UI. Never invent random font sizes,
spacing, or colors. Everything comes from the scales below. Stack: Next.js
(App Router) + TypeScript + Tailwind v4 + Framer Motion.

---

## 1. Typography scale

A real modular scale — base **16px (1rem)**, ratio **1.25 (major third)**.
Only use these steps. Never a size that isn't in this table.

| Token       | rem      | px  | Tailwind        | Line height | Weight    | Use for |
|-------------|----------|-----|-----------------|-------------|-----------|---------|
| `display`   | 3.815rem | 61  | `text-6xl`      | 1.05        | 700–800   | Hero headline only |
| `h1`        | 3.052rem | 49  | `text-5xl`      | 1.1         | 700       | Page title |
| `h2`        | 2.441rem | 39  | `text-4xl`      | 1.15        | 600–700   | Section title |
| `h3`        | 1.953rem | 31  | `text-3xl`      | 1.2         | 600       | Subsection |
| `h4`        | 1.563rem | 25  | `text-2xl`      | 1.3         | 600       | Card title |
| `body-lg`   | 1.25rem  | 20  | `text-xl`       | 1.5         | 400       | Lead paragraph, intro |
| `body`      | 1rem     | 16  | `text-base`     | 1.6         | 400       | Default body text |
| `small`     | 0.8rem   | 13  | `text-sm`       | 1.5         | 400–500   | Captions, meta, labels |
| `micro`     | 0.64rem  | 10  | `text-xs`       | 1.4         | 500       | Legal, footnotes (sparingly) |

Rules:
- **One `display` and one `h1` per page.** Don't stack two hero-sized elements.
- Headings: `tracking-tight` (`-0.02em`) and short line-height. Body: never tighten tracking.
- Body copy line length: cap at **~65–75 characters** (`max-w-prose` or `max-w-2xl`).
- Bold is for weight, not size. Never fake a heading by bolding body text.
- Font family: keep the geist sans (already wired via `layout.tsx`) for UI/body.
  Use a single display face at most. Never more than **2 font families** total.

---

## 2. Spacing — 8pt grid

All margins, padding, and gaps come from a **4px base, 8px rhythm**. Use Tailwind
steps only: `1`(4) `2`(8) `3`(12) `4`(16) `6`(24) `8`(32) `12`(48) `16`(64)
`24`(96) `32`(128). Avoid `5`, `7`, `9`, `11` and arbitrary `[13px]` values.

- Space **between related items**: `gap-2`/`gap-4`.
- Space **between sections**: `py-24` / `py-32` (generous vertical breathing room).
- Component inner padding: `p-6` (cards), `px-8 py-3` (buttons).
- Be consistent: if one card uses `p-8`, all sibling cards use `p-8`.

---

## 3. Color — semantic tokens, not raw hex

Think in **roles**, not colors. Pick from Tailwind's `slate` (neutral) + one
accent hue, and stay consistent across the whole site.

| Role         | Light bg site        | Dark bg site (current)         |
|--------------|----------------------|--------------------------------|
| Background   | `bg-white`           | `bg-slate-950` → `bg-slate-800`|
| Surface/card | `bg-slate-50`        | `bg-white/5` + `border-white/10`|
| Text primary | `text-slate-900`     | `text-white`                   |
| Text muted   | `text-slate-600`     | `text-slate-300`               |
| Text subtle  | `text-slate-400`     | `text-slate-500`               |
| Accent       | pick ONE (e.g. `indigo-500`) | same accent |
| Border       | `border-slate-200`   | `border-white/10`              |

Rules:
- **One accent hue** for the whole site. Don't scatter blue + green + pink.
- Body text must hit **WCAG AA contrast** (4.5:1). `slate-300` on `slate-900` is fine;
  `slate-500` on `slate-800` is only OK for non-essential subtle text.
- Never use pure black (`#000`) on pure white. Use `slate-900`/`slate-50`.

---

## 4. Radius, borders, elevation

- Radius scale: `rounded-lg`(8) for inputs, `rounded-2xl`(16) for cards,
  `rounded-full` for pills/buttons/avatars. Pick and stay consistent.
- Prefer **borders + subtle backgrounds** (`border-white/10 bg-white/5 backdrop-blur`)
  over heavy drop shadows on dark UIs. On light UIs, soft shadows: `shadow-sm`/`shadow-md`.
- Never a hard 1px black border. Use low-opacity borders.

---

## 5. Layout & responsive

- Center content with `mx-auto` + a max width: `max-w-3xl` (text), `max-w-5xl`
  (grids), `max-w-7xl` (full page shell). Always add horizontal padding: `px-6`.
- **Mobile-first.** Write base styles for small screens, add `sm:` / `md:` / `lg:` up.
- Grids: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. Cards should be full-height
  (`h-full`) so a row stays even.
- Tap targets ≥ 44px tall on interactive elements.

---

## 6. Motion — use the project's Framer Motion components

Animations are **not** ad-hoc. Reuse the components in
`src/components/motion/` (see project's animation guidelines):

- **Scroll fades** → wrap in `<Reveal>` (`whileInView`, plays once).
- **Staggered reveals** → `<Stagger>` + `<Stagger.Item>` for lists/grids.
- **Hover** → `<motion.*>` with `whileHover={{ y: -6, scale: 1.02 }}` and
  `transition={smoothHover}` from `variants.ts`.

Rules:
- Any file using motion starts with `"use client";`.
- Keep durations 0.4–0.6s, ease-out. No bouncy/overlong animations on content.
- All motion components already respect `prefers-reduced-motion` — keep it that way.

---

## 7. Quick checklist before shipping any UI

- [ ] Every font size is a token from §1 (no random px).
- [ ] Every spacing value is on the 8pt grid (§2).
- [ ] One accent color, AA-contrast text (§3).
- [ ] Consistent radius across siblings (§4).
- [ ] Responsive, mobile-first, `px-6` gutters (§5).
- [ ] Animations use `<Reveal>` / `<Stagger>` / `smoothHover` (§6).
- [ ] `"use client";` present wherever motion/hooks are used.
