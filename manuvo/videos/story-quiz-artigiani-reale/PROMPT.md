# Story quiz · artigiani di Rimini (version réelle)

**Type** — carte de Story Instagram avec sticker quiz. Version **réaliste** demandée par le
propriétaire le 2026-10-23 en remplacement de la version clay (`story-quiz-artigiani`).

**Légende de référence (propriétaire)**
> Qual è l'artigiano più difficile da trovare a Rimini? 🔧 Idraulico ⚡ Elettricista
> 🎨 Imbianchino 🪚 Falegname (quiz sticker)

**Persona** — plan généré avec **Kling AI** (choix du propriétaire) : une femme italienne
dans une rue résidentielle de Rimini à l'heure dorée, contre-jour, qui regarde l'objectif
avec un demi-sourire complice, comme si elle venait de te poser la question. Elle ne parle
pas : la Story est muette et la question est gravée en typo Manuvo.

- Image clé : `kling-image-v3_0_omni`, 9:16, 2k, 4 passes (16 crédits). Retenue : `assets/images/keyframe-retenue.jpg`.
- Plan : `kling-video-v3_0_turbo`, 9:16, 1080p, 10 s, sans audio (100 crédits). `assets/video/plate.mp4`.
- Les 7 images écartées sont gardées en vignettes (`assets/images/ecartee-*.jpg`) pour une prochaine fois ; les PNG d'origine ne sont pas versionnés.

**Le message, en une phrase** — « Qual è l'artigiano più difficile da trovare a Rimini ? »
Le but est le vote sur le sticker, puis la réponse en DM.

## La mise en page, et pourquoi elle est inversée
Le modèle place systématiquement le visage autour du milieu bas du cadre. Plutôt que de
recadrer durement et de perdre la rue, la mise en page a été construite **autour** du plan :

| Zone | y | Contenu |
|---|---|---|
| Ciel | 250 → 880 | **laissée libre pour le sticker quiz**, lavis crème léger pour qu'il détache |
| Visage | 900 → 1340 | le plan, intact, aucun calque dessus |
| Bas | 1380 → 1700 | la typo gravée, sur un pied sombre dégradé |
| Pied | 1750 → 1830 | pill `@manuvo.it` |

Conséquence directe : le sticker est **en haut**, donc le CTA dit « **VOTA QUI SOPRA** e
scrivimi perché », pas « qui sotto ».

**Texte à l'écran** (italien, Bricolage 800 uppercase)
1. SECONDO TE
2. QUAL È / L'ARTIGIANO
3. PIÙ DIFFICILE / DA TROVARE
4. A RIMINI? (en ink sur une dalle corail qui tombe derrière)
5. rappel tenu : L'ARTIGIANO PIÙ DIFFICILE / DA TROVARE A RIMINI?
6. CTA : VOTA QUI SOPRA E SCRIVIMI PERCHÉ
7. lockup + pill @manuvo.it

**Phase de chauffe** — aucune date, pas de « online ora », pas de « pubblica ora ».

## Contraintes dures
| # | Contrainte | Comment elle est tenue |
|---|---|---|
| 1 | Muet, aucune piste audio | `cues.js` : `music: null, sfx: null` ; le plan Kling est muet et porte `muted` |
| 2 | 9:16, 1080x1920, 60 fps | `cues.js` width/height, `--fps 60` |
| 3 | 10 s | `duration: 10.0` (6 barres à 144 BPM), exactement la durée du plan |
| 4 | Le plan n'est jamais étalonné | seuls deux calques de lisibilité sont posés (lavis crème en haut, pied sombre en bas), conformément à `/media-use` : un overlay, pas un grade |
| 5 | Zone sticker libre | rien n'est gravé entre y=250 et y=880 |
| 6 | Pas d'emoji burned-in | les 4 métiers restent dans le sticker |
| 7 | Dernière seconde tenue | rappel + CTA + lockup + pill posés avant b6.2 et immobiles ensuite |
| 8 | Logo | `manuvo/public/logo-mark.svg` extrudé, face crème non éclairée sur corail |

## Récit (6 chapitres, 144 BPM, 6 barres)
| Chapitre | Barres | Ce qu'on voit |
|---|---|---|
| 01 Lo sguardo | 1 → 2 | le plan avance déjà, elle tient le regard ; SECONDO TE |
| 02 La domanda | 2 → 3 | QUAL È / L'ARTIGIANO, le plan se rapproche d'un cran par 2 temps |
| 03 Più difficile | 3 → 4 | PIÙ DIFFICILE / DA TROVARE, un shake sur le premier |
| 04 A Rimini? | 4 → 5 | la dalle corail tombe derrière, A RIMINI? géant en ink, une onde |
| 05 Vota | 5 → 5.3 | la dalle repart, rappel de la question + CTA |
| 06 Manuvo | 5.3 → fin | flood corail sur le plan, le lockup monte et se pose d'un sixième de tour, pill, plan tenu 2,5 s |

## Signature de marque
« Un sixième de tour » : le lockup ne tourne que par pas de 60°, sur un temps, et s'arrête net.
