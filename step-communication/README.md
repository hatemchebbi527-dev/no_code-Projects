# Step Communication — Sito vetrina premium

Site vitrine haut de gamme pour **Step Communication**, agence d'événementiel et de marketing expérientiel basée à Rimini (depuis 2005). Construit pour impressionner, inspirer confiance et générer des demandes de devis qualifiées, avec un SEO pensé dès la fondation.

> **Statut: Phase 1 livrée.** Fondation technique complète + page d'accueil premium one-page (italien), build de production validé, SEO technique en place.

---

## Stack technique

- **Next.js 15** (App Router, React Server Components, SSG)
- **React 18** + **TypeScript** strict
- **Tailwind CSS 3.4** (design system par tokens CSS)
- **Framer Motion** (animations fluides, respect de `prefers-reduced-motion`)
- **lucide-react** (icônes), **class-variance-authority** (variants), **tailwind-merge**

---

## Démarrage rapide

```bash
npm install        # installer les dépendances
npm run dev        # serveur de dev → http://localhost:3000
npm run build      # build de production
npm run start      # servir le build de production
npm run lint       # lint
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, métadonnées SEO, JSON-LD, Header/Footer
│   ├── page.tsx          # assemblage de la page d'accueil
│   ├── globals.css       # tokens du design system + styles de base
│   ├── icon.svg          # favicon de marque
│   ├── sitemap.ts        # /sitemap.xml automatique
│   └── robots.ts         # /robots.txt automatique
├── components/
│   ├── layout/           # Header (sticky + menu mobile), Footer
│   ├── sections/         # Hero, TrustedBy, WhatWeDo, FeaturedProjects, WhyUs, Testimonials, FinalCta
│   ├── ui/               # Button (variants), SectionHeading
│   └── motion/           # Reveal (animation scroll réutilisable)
├── content/              # données éditables: services, projects, clients, testimonials
└── lib/                  # site.ts (config centrale), jsonld.ts (schema.org), utils.ts
```

**Source de vérité unique:** `src/lib/site.ts` (nom, URL, contacts, adresse, social, navigation). Modifier ici se répercute sur tout le site (header, footer, métadonnées, données structurées).

---

## Design system

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#09090B` | Noir profond (fond) |
| `bg-elevated` | `#16161A` | Cartes |
| `fg` | `#FAFAF9` | Texte (blanc chaud) |
| `fg-muted` | `#A1A1AA` | Texte secondaire |
| `accent` | `#FF4D1A` | Orange électrique (CTA, accents) |

- **Typo:** `Space Grotesk` (display, forte personnalité) + `Inter` (corps, lisibilité maximale)
- **Couleur d'accent:** un seul token (`--accent` dans `globals.css`). Pour basculer vers violet ou rouge, changer cette ligne suffit.
- **Animations:** sobres et fluides, jamais en excès. Désactivées automatiquement si l'utilisateur a activé la réduction de mouvement.

---

## SEO implémenté (Phase 1)

- ✅ Rendu côté serveur + génération statique (SSG)
- ✅ Métadonnées complètes (title dynamique, description, mots-clés italiens)
- ✅ **Open Graph** + **Twitter Cards**
- ✅ **URL canonique**
- ✅ **sitemap.xml** et **robots.txt** générés automatiquement
- ✅ **Données structurées schema.org**: `Organization`, `ProfessionalService` (local), `WebSite`
- ✅ HTML sémantique, lien d'évitement (skip link), focus visibles (accessibilité WCAG)
- ✅ En-têtes de sécurité (next.config)

---

## ⚠️ DA CONFERMARE / DA SOSTITUIRE avant la mise en ligne

Le projet est un **client réel**: les données vérifiées sont en place (nom, Rimini, 2005, fondateur Alessandro Lo Presti, adresse Via Coatit 1, téléphone 0541 22195, email eventi@stepcommunication.net). Restent à fournir/valider:

**Contenus réels (placeholders à remplacer):**
- [ ] `content/clients.ts` — vrais logos clients (SVG monochromes de préférence). *Les noms actuels sont fictifs, ne pas publier tels quels.*
- [ ] `content/projects.ts` — vrais case studies (objectif, stratégie, exécution, résultats, images)
- [ ] `content/testimonials.ts` — vrais témoignages autorisés (nom, rôle, entreprise)
- [ ] Statistiques du hero (`Hero.tsx`: « 500+ eventi », « 20 anni ») à confirmer

**Assets à ajouter dans `/public`:**
- [ ] `og.jpg` (1200×630) — image de partage social
- [ ] `logo.png` (ou SVG) — le vrai logo « Step » avec le « S » empreinte
- [ ] Vidéo `hero.mp4` + `hero-poster.jpg` (optionnel, slot prêt dans `Hero.tsx`)

**À valider:**
- [ ] Ragione sociale complète + P.IVA (pour mentions légales et schema)
- [ ] Liens Instagram / LinkedIn (`site.ts` → `social`)
- [ ] Domaine de production (actuellement `stepcommunication.net`)

---

## Roadmap (phases suivantes)

- **Phase 2** — Pages dédiées: `/chi-siamo`, `/servizi/[slug]` (6 services), `/contatti` (formulaire intelligent + calendrier + Google Maps), pages légales (privacy/cookie, RGPD).
- **Phase 3** — `/portfolio` + case studies détaillés, `/insights` (blog SEO: schema Article, fil d'Ariane, sommaire, articles liés).
- **Phase 4** — Livrables stratégiques: stratégie SEO 12 mois, plan éditorial 100 articles, stratégie CRO, plan d'acquisition organique.
- **Phase 5** — Optimisation perfs (objectif Lighthouse 95+), i18n éventuel (EN), intégrations analytics/consent.

Navigation: en Phase 1, les liens du menu pointent vers les ancres de la page d'accueil. Ils basculeront vers les routes dédiées en Phase 2.
