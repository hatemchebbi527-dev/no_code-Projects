# 7 Sport Agency — Sito vetrina premium

Site vitrine haut de gamme pour **7 Sport Agency**, agence spécialisée en **marketing sportif et sponsorisations sportives** (San Marino). Direction artistique cinématographique, pensée pour impressionner, inspirer confiance et générer des demandes qualifiées, avec un SEO conçu dès la fondation.

> **Statut:** page d'accueil + pages Chi siamo, Servizi (liste + 6 pages détail), Clienti, Contatti (formulaire + carte). Build de production validé (18 routes).

> Le dossier s'appelle encore `step-communication/` pour des raisons historiques (7 Sport Agency détient la marque Step Communication). Le contenu et la marque du site sont **7 Sport Agency**.

---

## Stack technique

- **Next.js 15** (App Router, RSC, SSG + une route API dynamique)
- **React 18** + **TypeScript** strict
- **Tailwind CSS 3.4** (design system par tokens CSS)
- **Framer Motion** (animations, respect de `prefers-reduced-motion`)
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
│   ├── chi-siamo/            # récit, missione, valori, team
│   ├── servizi/
│   │   ├── page.tsx          # liste services + méthodologie
│   │   └── [slug]/page.tsx   # 6 pages service (SSG, FAQ, schema)
│   ├── clienti/page.tsx      # portfolio clients/projets
│   ├── contatti/page.tsx     # formulaire + Google Maps + contacts
│   ├── api/contact/route.ts  # endpoint du formulaire
│   ├── globals.css / icon.svg / sitemap.ts / robots.ts
├── components/  (layout, sections, ui, motion)
├── content/                  # services, projects, clients, testimonials, media (images)
└── lib/                      # site.ts (config centrale), jsonld.ts, utils.ts
```

**Sources de vérité:** `src/lib/site.ts` (infos, contacts, navigation) et `src/content/`.

---

## Design system

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#0B0A09` | Noir chaud profond |
| `fg` | `#F6F3EE` | Texte (blanc chaud) |
| `accent` | `#E0A04A` | Ambre/or chaud (lumière de stade) |

- **Typo:** `Fraunces` (serif editorial, titres) + `Inter` (corps).
- **Images:** composant `CinematicImage` avec **dégradé cinématographique de secours** (jamais d'image cassée). Photos stock placeholder via Unsplash, remplaçables.

---

## Données réelles intégrées

- **7 Sport Agency**, marketing sportif & sponsorisations
- Siège: **World Trade Center, Via Consiglio dei Sessanta 99, 47891 Dogana (RSM), San Marino**
- Tél: **0549 904086** · Social: Facebook, Instagram, LinkedIn réels
- 6 services réels, chiffres réels (10+ ans, 100+ clients, 900+ aziende, 40M utenti/mese)
- Clients/partenaires publics: Tour de France, Brera Holdings, Cesena FC, Vero Volley, Mantova 1911

---

## ⚠️ DA CONFERMARE / DA SOSTITUIRE

- [ ] **Email réelle** (`site.ts` → `email`, actuellement `info@7sportagency.com` supposé)
- [ ] **Photos réelles** d'événements/sport → `/public/images/` puis `content/media.ts`
- [ ] **Loghi clienti ufficiali** (SVG) → remplacer les noms texte (`content/clients.ts`)
- [ ] **Case study réels** avec métriques exactes (`content/projects.ts`)
- [ ] **Team réel** (photos, noms, rôles) dans `app/chi-siamo/page.tsx`
- [ ] **Logo officiel** 7 Sport Agency + image `og.jpg` (1200×630) dans `/public`
- [ ] **Envoi email du formulaire** (`RESEND_API_KEY`, voir `app/api/contact/route.ts`)
- [ ] Année exacte de fondation, raison sociale + P.IVA, pages légales RGPD

---

## Roadmap

- **Blog / Insights** (le vrai site a un blog) optimisé SEO
- Pages légales (privacy/cookie, RGPD)
- Documents stratégiques: SEO 12 mois, plan éditorial, CRO, acquisition
- Audit Lighthouse + mise en ligne (Vercel)
