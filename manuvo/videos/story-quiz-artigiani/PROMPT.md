# Story quiz · artigiani di Rimini

**Type** — carte de Story Instagram avec sticker quiz. La vidéo porte le persona et la
question en type burned-in ; le sticker quiz d'Instagram (question + 4 options) est posé
par-dessus par le propriétaire, dans la bande réservée.

**Légende de référence (propriétaire)**
> Qual è l'artigiano più difficile da trovare a Rimini? 🔧 Idraulico ⚡ Elettricista
> 🎨 Imbianchino 🪚 Falegname (quiz sticker)

**Public** — les privati de Rimini et dintorni. Ton direct, complice, un peu provocateur :
le persona te regarde et te met au défi de répondre.

**Le message, en une phrase** — « Qual è l'artigiano più difficile da trovare a Rimini ? »
Rien d'autre. Le but est le vote et la réponse en DM.

**Persona** — personnage clay 3D construit en code (choix du propriétaire, 2026-10-23) :
tête et mains corail satinées, yeux / sourcils / bouche en ink non éclairé, index levé sur
la question. Pas de visage photoréaliste, pas de média généré. Il se tourne vers la caméra
par pas de 60° (signature de marque) et ne sort du cadre que pour laisser le logo.

Le crème éclairé vire au gris (piège déjà noté dans BRAND.md), donc le persona est corail
et le rythme des fonds évite le corail tant qu'il est à l'image : **ink → crème → ink →
crème → corail** (le corail est rendu au lockup, qui est le moment de marque).

**Les 4 options** — jamais gravées dans la vidéo (choix du propriétaire, 2026-10-23). Elles
sont portées par le sticker quiz. La vidéo les évoque par 4 jetons hexagonaux qui tournent
autour du persona, dont un seul s'allume par temps : « laquelle ? » sans donner de réponse.

**Texte à l'écran** (italien, Bricolage 800 uppercase, 16 mots en tout)
1. SECONDO TE
2. QUAL È / L'ARTIGIANO
3. PIÙ DIFFICILE / DA TROVARE
4. A RIMINI?
5. rappel tenu : L'ARTIGIANO PIÙ DIFFICILE / DA TROVARE A RIMINI? (ink, 3:1 minimum tenu sur crème et sur corail)
6. CTA : VOTA QUI SOTTO E SCRIVIMI PERCHÉ
7. lockup + pill @manuvo.it

**Phase de chauffe** — aucune date, pas de « online ora », pas de « pubblica ora ». Le
compte reste la seule adresse donnée.

## Contraintes dures
| # | Contrainte | Comment elle est tenue |
|---|---|---|
| 1 | Muet, aucune piste audio | `cues.js` : `music: null, sfx: null` ; `render.mjs` passe `-an` |
| 2 | 9:16, 1080x1920, 60 fps | `cues.js` width/height, `--fps 60` |
| 3 | 12 s | `duration: 12.0` (7 barres à 140 BPM) |
| 4 | Bande y=1020 à 1620 vide sur toute la durée | `#scrim-bot` est une dalle pleine en couleur de scène dès y=1000 : aucun texte, aucun sujet 3D n'y descend. Seules deux ondes de choc la traversent 0,6 s (b3.1 et b6.3), derrière le sticker |
| 5 | Le type vit au-dessus de y=1010 | toutes les lignes entre y=300 et y=520, le persona et le logo entre y=560 et y=1010 |
| 6 | Pas d'emoji burned-in | les 4 métiers sont évoqués par les jetons hexagonaux, pas par les emojis de la légende |
| 7 | Dernière seconde tenue et lisible | rappel + CTA + lockup + pill posés avant b7 et immobiles ensuite |
| 8 | Logo | `manuvo/public/logo-mark.svg` extrudé, face crème non éclairée sur corail |

## Récit (5 chapitres, 140 BPM, 7 barres)
| Chapitre | Barres | Fond | Ce qu'on voit |
|---|---|---|---|
| 01 Secondo te | 1 → 3 | ink | le persona clay finit de se tourner vers la caméra et s'avance, un sixième de tour par temps ; SECONDO TE, puis QUAL È / L'ARTIGIANO ; les 4 jetons orbitent |
| 02 Più difficile | 3 → 4 | crème | flood vers le haut depuis le persona, shake, onde ; il lève l'index, sourcils hauts ; PIÙ DIFFICILE / DA TROVARE en ink |
| 03 A Rimini? | 4 → 5 | ink | cut net ; A RIMINI? géant en corail ; les 4 jetons tournent, un seul allumé par temps |
| 04 Vota | 5 → 6 | crème | iris depuis le persona ; il désigne la bande du sticker ; rappel de la question + CTA en ink |
| 05 Manuvo | 6 → 7+ | corail | iris corail ; le persona tourne d'un sixième et s'efface derrière, le lockup monte à sa place et se pose d'un sixième de tour ; pill @manuvo.it sous la bande ; plan tenu 2,5 s pour le vote |

## Signature de marque
« Un sixième de tour » : la tête du persona, chaque jeton hexagonal et le lockup ne tournent
que par pas de 60°, sur un temps, et s'arrêtent net. Jamais de rotation continue.
