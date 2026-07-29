/* =========================================================
   AutomaIA — styles globaux (redesign navy/teal cinématique)
   ========================================================= */

:root {
  --navy: #0F2A4A;
  --navy-2: #12305A;
  --navy-deep: #081B30;
  --teal: #16B8A6;
  --teal-dark: #0E8F82;
  --teal-light: #5EEAD4;
  --cream: #F7F5F1;
  --white: #FFFFFF;
  --ink: #18202E;
  --slate: #2D3748;
  --light: #F4F6F8;
  --border: #E7E9EE;
  --muted: #64748B;
  --maxw: 1220px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  color: var(--ink);
  background: var(--white);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--teal); color: var(--navy); }

h1, h2, h3, h4 {
  font-family: var(--font-montserrat), system-ui, sans-serif;
  color: var(--navy);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
}

h1 { font-size: clamp(2.3rem, 5.5vw, 3.6rem); }
h2 { font-size: clamp(1.8rem, 3.6vw, 2.5rem); }
h3 { font-size: clamp(1.15rem, 3vw, 1.4rem); font-weight: 700; }

a { color: inherit; text-decoration: none; }

/* ---------- Layout ---------- */
.container {
  width: 100%;
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 28px;
}

.section { padding: 104px 0; }
.section--light { background: var(--cream); }
.section--dark { background: var(--navy); color: var(--white); }
.section--dark h1, .section--dark h2, .section--dark h3 { color: var(--white); }
.section--deep { background: var(--navy-deep); color: var(--white); }
.section--deep h1, .section--deep h2, .section--deep h3 { color: var(--white); }

.center { text-align: center; }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 720px; line-height: 1.75; }
.section--dark .lead, .section--deep .lead { color: #B9C6D9; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mt-48 { margin-top: 48px; }
.accent { color: var(--teal); }

/* eyebrow : petit label au-dessus d'un titre */
.eyebrow {
  display: inline-block;
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal-dark);
  margin-bottom: 14px;
}
.section--dark .eyebrow,
.section--deep .eyebrow { color: var(--teal-light); }

/* ---------- Buttons (pill) ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--teal);
  color: var(--navy);
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 15px 32px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
  box-shadow: 0 6px 20px rgba(22, 184, 166, 0.28);
}
.btn:hover { transform: translateY(-2px); background: var(--teal-dark); box-shadow: 0 10px 26px rgba(22, 184, 166, 0.34); }

.btn--ghost {
  background: transparent;
  color: var(--teal-dark);
  border: 1.5px solid var(--teal);
  box-shadow: none;
}
.btn--ghost:hover { background: var(--teal); color: var(--navy); }

/* light ghost variant on dark backgrounds */
.btn--light {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  box-shadow: none;
}
.btn--light:hover { background: rgba(255, 255, 255, 0.16); transform: translateY(-2px); }

.btn--white { background: #fff; color: var(--navy); box-shadow: 0 10px 30px rgba(0,0,0,0.18); }
.btn--white:hover { background: #fff; transform: translateY(-2px); }

/* ---------- Grid + cards ---------- */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
}
.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px 30px;
  box-shadow: 0 4px 24px rgba(15, 42, 74, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(15, 42, 74, 0.12);
  border-color: rgba(22, 184, 166, 0.4);
}
.card h3 { margin-bottom: 10px; }
.card p { color: var(--muted); }

/* card icon chip */
.iconChip {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(22, 184, 166, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
}

/* ---------- Section title block ---------- */
.title-block { max-width: 780px; margin: 0 auto 56px; }
.title-block.center { text-align: center; }

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .grid-3 { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  body { font-size: 16px; }
  .section { padding: 72px 0; }
  .btn { width: 100%; }
}
