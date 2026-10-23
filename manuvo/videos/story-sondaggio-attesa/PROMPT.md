# Story sondaggio · l'attesa

**Type** — carte de Story Instagram avec sondage. Le film porte la question en type
burned-in ; le sticker sondage d'Instagram est posé par-dessus par le propriétaire.

**Public** — les privati de Rimini qui ont déjà attendu un artisan. Ton direct,
un peu complice, le problème d'abord.

**Le message, en une phrase** — « Quante volte hai aspettato un artigiano che non è
mai arrivato ? » Rien d'autre.

**Texte à l'écran** (italien, Bricolage 800 uppercase)
1. QUANTE VOLTE / HAI ASPETTATO
2. UN ARTIGIANO / CHE NON È MAI
3. ARRIVATO?
4. le bloc complet tenu jusqu'à la fin + PRESTO A RIMINI · @manuvo.it

**Phase de chauffe** — aucune date, pas de « online ora », pas de « pubblica ora ».
Le CTA reste doux et le compte est la seule adresse donnée.

## Contraintes dures
| # | Contrainte | Comment elle est tenue |
|---|---|---|
| 1 | Muet, aucune piste audio | `cues.js` : `music: null, sfx: null` ; `render.mjs` passe `-an` |
| 2 | 9:16, 1080x1920, 60 fps | `cues.js` width/height, `--fps 60` |
| 3 | 10 s maximum | `duration: 10.0` |
| 4 | Bande y=1150→1500 vide | `#scrim-bot` passe en couleur pleine dès y=1150 ; tout le type vit entre y=320 et y=1110 ; bande vérifiée plate sur 15 frames |
| 5 | Dernière seconde tenue et lisible | le bloc question + le lockup + le CTA sont posés avant b6 et ne bougent plus |
| 6 | Pas d'emoji burned-in | l'émotion passe par l'horloge dont l'aiguille s'emballe puis se fige |
| 7 | Logo | `manuvo/public/logo-mark.svg` extrudé, face crème non éclairée sur corail |

## Récit (4 chapitres, 144 BPM)
| Chapitre | Barres | Fond | Ce qu'on voit |
|---|---|---|---|
| 01 Attesa | 1 → 3 | ink | l'horloge hexagonale corail, l'aiguille accélère ; les deux premières lignes |
| 02 Mai arrivato | 3 → 4 | corail | flood vers le haut, l'aiguille se fige net, ARRIVATO? en ink |
| 03 Domanda | 4 → 5 | crème | la question complète se construit une ligne par temps |
| 04 Manuvo | 5 → 7 | corail | iris sur le lockup, un sixième de tour, le CTA doux ; plan tenu |

## Signature de marque
« Un sixième de tour » : l'hexagone et le lockup ne tournent que par pas de 60°,
jamais en continu. Quatre pas dans le film, tous sur un temps.
