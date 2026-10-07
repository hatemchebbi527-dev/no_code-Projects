# Clips Kling AI pour le spot MANUVO

Générés le 2026-10-06 vers 12h50 UTC sur Kling AI.
Modèle `kling-video-v3_0_omni`, 1080p, 16:9, 5 s par clip, 60 crédits chacun.
360 crédits consommés sur 660.

Le spot monté à partir de ces clips est documenté dans `spot-16x9/README.md`.

## Generation IDs

Permettent de re-interroger Kling pour récupérer de nouvelles URLs quand les
précédentes expirent.

| Scène | Description | Generation ID |
|-------|-------------|---------------|
| 1 | Fuite cuisine, gros plan | `AQiteMEju1gcXCvUobmEBKKWl6yQ95WWZ7LRIwiIgJSUxw2ex5pyKmhFZa62mfJ895Ly1m-_` |
| 2 | Montage de dégâts domestiques | `ARGf4Oh9tSmCZvhTHsiWOa801XyD_ZyqjxWmHKx-X8MXsN6A2pAyMJ3KcapDN8mrBpxoe7J3` |
| 3 | Personne frustrée au smartphone | `AaDHL61I0uy_udApb_MhDqegH7QqP7EXroPfMTC9Zfqve3cg_zT7uKrWTRSPbVKMbcVEavP4` |
| 5 | Interface app, mise en relation | `ASwVRsqlLt8jH1s34-cKHxurC-O7EIXNdKJOkx6OLgR0QreZWbVxpEutSpppPtaw17eL7lhE` |
| 7 | Le plombier résout le problème | `Ae8BAiAd85hEDrj6UELrCDEpe9PL-RFzHj422O5DVg2lEuhLOimImGwKrWI5XIcQQmL31bNW` |
| 9 | Plan de marque final | `AXBiAK6fXTKadZC2L9hHcPfDGpUmOmFWWqJEAEWtKZIL7dfFq6VP5aOvra_C-t32-XqtckzY` |

Les URLs de téléchargement ne sont pas notées ici : elles portent une signature
CDN temporaire et deviennent mortes. Passer par les generation IDs ci-dessus.

## Ce qui a été retenu

Quatre clips sur six sont utilisés dans le montage.

- **Scènes 1, 3, 7** : utilisées telles quelles.
- **Scène 2** : recoupée à 3,667 s. Son quatrième et dernier plan, un gros plan
  très serré sur une porte de meuble décrochée de sa charnière, se lisait comme
  une forme géométrique en bois sans contexte. Il occupait les 1,4 dernières
  secondes.
- **Scènes 5 et 9** : écartées et recomposées en Python. Voir
  `spot-16x9/README.md` pour la liste des défauts et la raison de fond.

## Si ces scènes sont un jour regénérées

Le texte à l'écran ne passera pas, quel que soit le prompt. Générer plutôt des
plans sans texte lisible et incruster la typographie en post.

- **Scène 2** : demander un dernier plan cadré plus large, avec un geste ou une
  dégradation visible. Un gros plan statique sur un objet isolé ne raconte pas
  le problème.
- **Scène 5** : demander un écran volontairement flou, faible profondeur de
  champ, sans texte ni flèches. L'interface se compose ensuite par-dessus.
- **Scène 9** : ne pas la générer. Un lockup de marque est un aplat, il se
  compose exactement et gratuitement.

## Accès réseau

Le CDN Kling `v15-kling.klingai.com` est refusé par défaut par la politique
réseau de l'environnement cloud, avec un 403 sur le tunnel CONNECT. Sans accès,
impossible de télécharger les clips ni de les inspecter.

Pour l'autoriser : menu de l'environnement cloud dans la barre de titre de la
session, puis Edit, puis Accès réseau. Choisir Personnalisé et ajouter
`v15-kling.klingai.com` et `s15-kling.klingai.com` aux domaines autorisés, en
gardant la liste des gestionnaires de paquets par défaut.
Doc : https://code.claude.com/docs/en/cloud-environments#network-access
