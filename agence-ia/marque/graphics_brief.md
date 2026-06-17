# graphics_brief.md — Ma charte visuelle

> Couleurs, typographies et règles visuelles de ma marque.
> Sert au site (Jour 10), aux visuels Canva, aux documents et propositions.
> PROPOSITION INITIALE à valider et ajuster. Dernière mise à jour : 2026-06-16

---

## Intention visuelle

Cible : avocats, comptables, médecins. Mots-clés visuels : **confiance, sérieux, sobriété, confidentialité**, avec une touche de **modernité** pour signaler l'innovation que j'apporte. Pas de flashy, pas de gadget. Le visuel doit rassurer un professionnel qui me confie ses données.

---

## Palette de couleurs (proposition)

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| Primaire | Bleu nuit | `#0F2A4A` | Fond, titres, éléments forts. Évoque confiance et sérieux |
| Accent | Vert / teal moderne | `#16B8A6` | Boutons, liens, points clés. La touche moderne et dynamique |
| Neutre foncé | Gris ardoise | `#2D3748` | Textes courants |
| Neutre clair | Gris très clair | `#F4F6F8` | Fonds de section, respiration |
| Blanc | Blanc | `#FFFFFF` | Fond principal, clarté |

Règle : le bleu nuit domine (sérieux), l'accent vert/teal est utilisé avec parcimonie (seulement les actions et points clés). Trop d'accent tue l'accent.

---

## Typographies (proposition)

- **Titres :** Montserrat (sans-serif, moderne et solide). Poids 600/700.
- **Corps de texte :** Inter (sans-serif, très lisible à l'écran). Poids 400/500.

Deux polices maximum. Hiérarchie claire : gros titres, sous-titres, corps. Mobile-first (tout doit rester lisible sur téléphone).

> Alternative si tu veux un côté plus "institutionnel/traditionnel" (rassurant pour avocats/médecins) : un titre en serif élégant (ex : Playfair Display ou Lora) + corps en Inter. À voir selon le ressenti que tu veux donner : moderne (sans-serif) ou classique-premium (serif).

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

## À valider

- [ ] La palette (bleu nuit + accent vert/teal) te parle ?
- [ ] Titres en sans-serif moderne (Montserrat) ou en serif classique-premium ?
- [ ] As-tu déjà un logo ou un nom d'agence figé ? (à intégrer ici une fois décidé)
