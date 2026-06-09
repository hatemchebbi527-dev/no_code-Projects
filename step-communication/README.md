# Step Communication — Sito vetrina premium

Site vitrine haut de gamme pour **Step Communication**, agence d'événementiel et de marketing expérientiel basée à Rimini (depuis 2005). Direction artistique cinématographique, pensée pour impressionner, inspirer confiance et générer des demandes de devis qualifiées, avec un SEO conçu dès la fondation.

> **Statut: Phases 1 & 2 livrées.** Fondation technique + page d'accueil cinématographique + pages Chi siamo, Servizi (liste + 6 pages détail), Contatti (formulaire + carte). Build de production validé.

---

## Stack technique

- **Next.js 15** (App Router, RSC, SSG + une route API dynamique)
- **React 18** + **TypeScript** strict
- **Tailwind CSS 3.4** (design system par tokens CSS)
- **Framer Motion** (animations fluides, respect de `prefers-reduced-motion`)
- **lucide-react**, **class-variance-authority**, **tailwind-merge**

---

## Démarrage rapide

```bash
npm install        # installer les dépendances
npm run dev        # serveur de dev → http://localhost:3000
npm run build      # build de production
npm run start      # servir le build de production
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, métadonnées SEO, JSON-LD global, Header/Footer
│   ├── page.tsx              # page d'accueil
│   ├── chi-siamo/            # page Chi siamo (récit, mission, valeurs, équipe)
│   ├── servizi/
│   │   ├── page.tsx          # liste des services + méthodologie
│   │   └── [slug]/page.tsx   # page détail par service (SSG, FAQ, schema)
│   ├── contatti/page.tsx     # formulaire + Google Maps + contacts
│   ├── api/contact/route.ts  # endpoint du formulaire
│   ├── globals.css           # tokens du design system
│   ├── icon.svg / sitemap.ts / robots.ts
├── components/
│   ├── layout/               # Header (sticky + menu mobile), Footer
│   ├── sections/             # Hero, WhatWeDo, FeaturedProjects, WhyUs, Testimonials, FinalCta, ContactForm
│   ├── ui/                   # Button, SectionHeading, PageHero, CinematicImage, JsonLd
│   └── motion/               # Reveal
├── content/                  # services, projects, clients, testimonials, media (images)
└── lib/                      # site.ts (config centrale), jsonld.ts, utils.ts
```

**Sources de vérité:** `src/lib/site.ts` (infos, contacts, navigation) et `src/content/` (services, projets, images).

---

## Design system (cinématographique)

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#0B0A09` | Noir chaud profond |
| `bg-subtle` / `bg-elevated` | `#131210` / `#1A1815` | Surfaces, cartes |
| `fg` | `#F6F3EE` | Texte (blanc chaud) |
| `accent` | `#E0A04A` | Ambre/or chaud (façon lumière de scène) |

- **Typo:** `Fraunces` (serif editorial, titres) + `Inter` (corps). Italique doré sur les mots accentués.
- **Couleur d'accent:** un seul token (`--accent` dans `globals.css`).
- **Images:** composant `CinematicImage` (next/image) avec **dégradé cinématographique de secours**. Si une photo ne charge pas, le rendu reste premium, jamais d'image cassée.

---

## SEO en place

- ✅ SSR + génération statique (SSG), 1 route API dynamique
- ✅ Métadonnées par page (title, description, mots-clés, canonical)
- ✅ Open Graph + Twitter Cards
- ✅ sitemap.xml (avec les pages services) + robots.txt automatiques
- ✅ Données structurées: `Organization`, `ProfessionalService`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`
- ✅ HTML sémantique, fil d'Ariane, skip-link, focus visibles (WCAG)
- ✅ En-têtes de sécurité (next.config)

---

## Formulaire de contact

Le formulaire (`/contatti`) poste vers `/api/contact`, qui valide les données et bloque le spam (honeypot).

⚠️ **Pour recevoir les leads par email**, il faut brancher un provider d'envoi. Voir le commentaire dans `src/app/api/contact/route.ts` (exemple avec **Resend**: `npm i resend` + variable `RESEND_API_KEY`). En attendant, chaque lead est journalisé côté serveur (visible dans les logs Vercel) et le visiteur reçoit une confirmation.

---

## ⚠️ DA CONFERMARE / DA SOSTITUIRE avant la mise en ligne

Données réelles intégrées: Rimini, depuis 2005, Alessandro Lo Presti, Via Coatit 1, **0541 22195**, **eventi@stepcommunication.net**. À fournir/valider:

**Contenus réels (placeholders à remplacer):**
- [ ] **Photos réelles** des événements de Step → déposer dans `/public/images/`, puis brancher dans `src/content/media.ts` (les `src` Unsplash actuels sont des placeholders non vérifiés)
- [ ] `content/projects.ts` — vrais case studies (objectif, stratégie, résultats, images)
- [ ] `content/clients.ts` — vrais logos clients (noms actuels fictifs, ne pas publier)
- [ ] `content/testimonials.ts` — vrais témoignages autorisés
- [ ] Équipe réelle (photos, noms, rôles) dans `app/chi-siamo/page.tsx`
- [ ] Statistiques (« 500+ eventi », « 20 anni ») à confirmer

**À brancher / valider:**
- [ ] Envoi email du formulaire (`RESEND_API_KEY`, voir ci-dessus)
- [ ] Assets `/public`: `og.jpg` (1200×630), `logo` réel (le « S » empreinte)
- [ ] Liens Instagram / LinkedIn (`site.ts` → `social`)
- [ ] Raison sociale complète + P.IVA (mentions légales + schema)
- [ ] Pages légales `/privacy` et `/cookie` (RGPD)

---

## Roadmap (phases suivantes)

- **Phase 3** — `/portfolio` + case studies détaillés, `/insights` (blog SEO: schema Article, fil d'Ariane, sommaire, articles liés), pages légales RGPD.
- **Phase 4** — Livrables stratégiques: stratégie SEO 12 mois, plan éditorial 100 articles, stratégie CRO, plan d'acquisition organique.
- **Phase 5** — Audit Lighthouse et optimisation perfs (objectif 95+), i18n éventuel (EN), analytics + gestion du consentement.
