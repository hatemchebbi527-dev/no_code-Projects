# graphics_brief.md — Ma charte visuelle

> Couleurs, typographies et règles visuelles de ma marque.
> Sert au site (Jour 10), aux visuels Canva, aux documents et propositions.
> Charte validée (logo et nom d'agence à intégrer plus tard). Dernière mise à jour : 2026-06-16

---

## Intention visuelle

Cible : avocats, comptables, médecins. Mots-clés visuels : **confiance, sérieux, sobriété, confidentialité**, avec une touche de **modernité** pour signaler l'innovation que j'apporte. Pas de flashy, pas de gadget. Le visuel doit rassurer un professionnel qui me confie ses données.

---

## Palette de couleurs (validée)

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| Primaire | Bleu nuit | `#0F2A4A` | Fond, titres, éléments forts. Évoque confiance et sérieux |
| Accent | Vert / teal moderne | `#16B8A6` | Boutons, liens, points clés. La touche moderne et dynamique |
| Neutre foncé | Gris ardoise | `#2D3748` | Textes courants |
| Neutre clair | Gris très clair | `#F4F6F8` | Fonds de section, respiration |
| Blanc | Blanc | `#FFFFFF` | Fond principal, clarté |

Règle : le bleu nuit domine (sérieux), l'accent vert/teal est utilisé avec parcimonie (seulement les actions et points clés). Trop d'accent tue l'accent.

---

## Typographies (validée)

- **Titres :** Montserrat (sans-serif, moderne et solide). Poids 600/700.
- **Corps de texte :** Inter (sans-serif, très lisible à l'écran). Poids 400/500.

Deux polices maximum. Hiérarchie claire : gros titres, sous-titres, corps. Mobile-first (tout doit rester lisible sur téléphone).

---

## Règles visuelles

- **Espace blanc généreux** : la sobriété rassure, le fouillis inquiète.
- **Photos** : authentiques et professionnelles (cabinets, personnes au travail), jamais de banque d'images cliché type "poignée de main avec hologramme".
- **Icônes** : style ligne fine, cohérent, discret.
- **Cohérence** : mêmes couleurs et polices partout (site, Canva, propositions, réseaux).

---

## CSS de base (pour le site, Jour 10)

```css
:root {
  --primaire: #0F2A4A;
  --accent: #16B8A6;
  --neutre-fonce: #2D3748;
  --neutre-clair: #F4F6F8;
  --blanc: #FFFFFF;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--neutre-fonce);
  background: var(--blanc);
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
  color: var(--primaire);
}
```

---

## Identité de marque

- **Nom :** AutomaIA (domaine : automaia.net)
- **Logo :** horloge intégrée dans une boucle d'automatisation (flèche), symbolisant "automatiser pour gagner du temps". Le "IA" du nom est en teal pour souligner le positionnement IA.
- **Fichiers logo (dans `marque/`) :**
  - `logo-automaia.png` : fond transparent (pour fonds clairs / documents)
  - `logo-automaia-navy.png` : fond bleu nuit (pour fonds sombres)
  - `logo-automaia-icon.png` : icône seule, carré (avatar, favicon)
  - Régénérable via `gen_logo.py` à la racine du workspace

## Décisions

- [x] Nom d'agence : AutomaIA
- [x] Palette : bleu nuit + accent vert/teal (validée)
- [x] Titres en Montserrat, corps en Inter (validé)
- [x] Logo créé (horloge + boucle d'automatisation)
