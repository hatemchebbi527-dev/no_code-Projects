# Keibido 慶美堂 — Landing Page (proposition initiale)

Centro estetico d'inspiration japonaise à Rimini. Cette landing page est la
**première proposition** à présenter au client, focalisée sur les **soins visage**.

---

## Comment la voir

**En local :** ouvre `index.html` dans un navigateur (double-clic). Aucune install.

**En ligne (site final) :** dépose le dossier `keibido/` sur n'importe quel
hébergement statique (Netlify, Vercel, GitHub Pages, OVH...). C'est prêt. Cette
version utilise `index.html` + `assets/` (plus légère, meilleure pour le SEO).

**Lien partageable (pour envoyer au client) :** `keibido-artifact.html` est une
version **100% autonome dans un seul fichier** (polices et images embarquées).
C'est cette version qui est publiée en lien claude.ai. Pour la régénérer après
avoir modifié les textes ou les visuels : `python3 build_artifact.py`.

---

## Direction créative : « Ma (間) » — l'art du vide

Luxe zen wabi-sabi. Le concept mise sur le calme, l'espace négatif et le geste lent.

| Élément | Choix |
|--------|-------|
| **Palette** | Papier washi (blanc cassé chaud), encre sumi, or kintsugi |
| **Typographie** | Cormorant Garamond (titres luxe) + Shippori Mincho (kanji) + Jost (texte) |
| **Signature** | Massage **kobido**, le lifting manuel japonais authentique |
| **Rituels viso** | Mizu 水 (hydratation), Hikari 光 (éclat), Jikan 時 (anti-âge), Sei 清 (pureté) |
| **Animations** | Hero cinématique (zoom ken-burns), révélations orchestrées au scroll, filets or, hover cartes |

L'accroche des 3 premières secondes : hero plein écran sombre et cinématique,
titre "La bellezza è un rituale" révélé en cascade, texte japonais vertical.

---

## Bilingue IT / EN

Site en **italien par défaut** (clientèle de Rimini) avec un **switcher EN**
en haut à droite (pour la clientèle touristique balnéaire). Traduction complète,
le titre et la meta description SEO changent aussi selon la langue.

---

## SEO local intégré

- Balises title / meta description optimisées "centro estetico Rimini"
- Open Graph + Twitter Card (partage réseaux sociaux)
- **Données structurées JSON-LD `BeautySalon`** : adresse, horaires, géolocalisation,
  gamme de prix, services. C'est ce que Google lit pour la fiche locale et Google Maps.
- `hreflang` it / en, HTML sémantique, hiérarchie de titres propre, `alt` sur les images.

---

## À remplacer avant mise en ligne (placeholders)

**Logo :** le logo (mandala or + pousse + "KEIBIDO Benessere Divino") a été
**recréé en vectoriel** (`assets/img/emblem.svg`, `mandala.svg`, `sprout.svg`,
`favicon.svg`, via `assets/gen_logo.py`) à partir de l'image fournie par le client.
C'est une interprétation propre et fidèle à l'esprit, à **remplacer par le fichier
officiel** (SVG/AI/PDF) du client pour une fidélité au pixel.

Les photos dans `assets/img/*.svg` (hero/rituels/espace/founder) sont des **placeholders générés sur-mesure**
(dégradés washi, motif enso au pinceau, teintes de la marque). Ils rendent la page
crédible tout de suite, mais doivent être remplacés par le **vrai shooting photo**
du client (peau lumineuse, mains, l'espace du centre, gros plans texture).
Même emplacement, même ratio : il suffit d'écraser le fichier ou de changer le `src`.

À personnaliser aussi (repérés dans le code, valeurs d'exemple) :
- Adresse : `Via Esempio 12, 47921 Rimini`
- Téléphone / WhatsApp : `+39 000 000 0000`
- Email : `ciao@keibido.it`
- Instagram, horaires, prix des rituels

> Le script `assets/gen_placeholders.py` permet de régénérer les visuels si besoin.

---

## Prochaines étapes possibles (à valider avec le client)

1. Pages internes : Trattamenti (détaillée), Filosofia / Chi siamo, Contatti + carte
2. Module de **réservation en ligne** (ou lien WhatsApp / Fresha / Treatwell)
3. Blog / Diario pour le SEO ("routine viso", "massaggio kobido"...)
4. Vraies photos + éventuelle vidéo hero cinématique
5. Logo vectoriel définitif + favicon
