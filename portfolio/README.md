# Portfolio — Hatem Chebbi

Portfolio personnel de Hatem Chebbi, freelance en IA et automatisation.
Construit avec Next.js 16, React 19 et Tailwind CSS v4, dans une esthétique
sombre et minimaliste inspirée de Vercel/Geist.

## Stack

- **Next.js 16** (App Router, build statique)
- **React 19**
- **Tailwind CSS v4**
- **Police Geist** (Sans + Mono)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # sert le build de production
```

## Personnaliser le contenu

Tout le contenu (texte, services, projets, liens) est centralisé dans un seul
fichier :

```
app/data.ts
```

Modifie ce fichier pour mettre à jour le portfolio, sans toucher aux composants.

- `profile` : nom, rôle, tagline, email, réseaux sociaux
- `about` : paragraphes de présentation et statistiques
- `services` : la liste des services proposés
- `projects` : tes réalisations (remplace les exemples par tes vrais projets)

## Structure

```
app/
  layout.tsx      # layout racine, polices, metadata
  page.tsx        # assemblage des sections
  globals.css     # thème, couleurs, animations
  data.ts         # TOUT le contenu éditable
components/
  Nav.tsx         # navigation fixe
  Hero.tsx        # section d'accroche
  About.tsx       # à propos
  Services.tsx    # services
  Projects.tsx    # projets
  Contact.tsx     # contact
  Footer.tsx      # pied de page
  Reveal.tsx      # animations d'apparition au scroll
  Section.tsx     # titre de section réutilisable
```

## Déploiement

Le projet est prêt pour un déploiement sur **Vercel** :
importe le dépôt sur vercel.com, Vercel détecte Next.js automatiquement.
Aucune variable d'environnement n'est nécessaire.
