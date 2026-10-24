# Reel · Perché sto costruendo Manuvo

**Type** — Reel Instagram, histoire du fondateur (build in public). Écrit à partir de la
légende du propriétaire, mot pour mot, sans rien inventer.

**Légende de référence (propriétaire)**
> Vi racconto perché sto costruendo Manuvo. Ho passato 2 ore a cercare un elettricista per
> mia madre a Rimini. Numeri falsi, nessuna risposta. Ho pensato: deve esserci un modo
> migliore. 💡 Seguici @manuvo.it

## Le choix qui structure tout : aucun visage

La légende est à la première personne. Un visage généré aurait été lu comme étant Hatem,
et aurait donc présenté une fausse identité à son audience. **Choix du propriétaire le
2026-10-24 : un montage POV, aucun visage, ni le sien ni celui de sa mère.** On voit ce
qu'il a vu : une main, un téléphone, un interrupteur mort, une rue.

## Les plans (Kling, text-to-video, 150 crédits)
`kling-video-v3_0_turbo`, 9:16, 1080p, 5 s chacun, sans audio. 50 crédits par plan.

| Segment | Source | Ce qu'on voit |
|---|---|---|
| `seg1.mp4` | plan A, 0 → 3,4 s | une main tient un téléphone dans une cage d'escalier sombre, le pouce compose, elle le porte à l'oreille |
| `seg2.mp4` | plan B, 0 → 3,45 s | la main d'une femme âgée actionne un interrupteur mort dans une cuisine sombre |
| `seg3.mp4` | plan A, 3,3 → 5,0 s | la même main redescend le téléphone |
| `seg4.mp4` | plan C, 0,79 → 5,04 s | on sort dans une rue de Rimini à l'heure bleue, la caméra bascule vers le ciel |

**Deux pièges trouvés sur les plans générés :**
1. Dans le plan B brut, la lumière **s'allume** à 4,0 s, ce qui contredit l'histoire. Seule
   la partie sombre est utilisée, et le film revient au téléphone pour « nessuna risposta ».
2. Dans le plan C, la bascule vers le ciel arrive trop tard. Le point d'entrée est décalé à
   0,79 s pour que le ciel arrive pile sous « un modo migliore ».

Les plans sources complets ne sont pas versionnés (ils coûtent 50 crédits chacun à
regénérer) : seuls les 4 segments montés le sont.

**Texte à l'écran** (italien, Bricolage 800 uppercase, les mots du propriétaire)
1. 2 ORE
2. PER TROVARE / UN ELETTRICISTA
3. PER MIA MADRE (en corail : c'est la raison, pas le détail)
4. NUMERI FALSI
5. NESSUNA / RISPOSTA
6. DEVE ESSERCI / UN MODO MIGLIORE
7. lockup + SEGUICI + pill @manuvo.it

## Contraintes dures
| # | Contrainte | Comment elle est tenue |
|---|---|---|
| 1 | Muet, aucune piste audio | demande du propriétaire en cours de production : `cues.js` `music: null, sfx: null`, les 4 segments portent `muted` et sont exportés sans piste audio |
| 2 | 9:16, 1080x1920, 60 fps | `cues.js` width/height, `--fps 60` |
| 3 | 15 s | `duration: 15.0` (9 barres à 144 BPM) |
| 4 | Aucun visage | vérifié plan par plan : seules des mains sont à l'image |
| 5 | Les plans ne sont pas étalonnés | un seul calque de lisibilité (tête sombre dégradée sur le haut du cadre), conformément à `/media-use` : un overlay, pas un grade |
| 6 | Les dernières lignes tiennent 2 s | SEGUICI et le pill arrivent ensemble à b8.4 (12,917 s), soit 2,08 s à l'écran ; `hyperframes check` le vérifie |
| 7 | Logo | `manuvo/public/logo-mark.svg` extrudé, face crème non éclairée sur corail |

## Récit (7 chapitres, 144 BPM, 9 barres)
| Chapitre | Barres | Ce qu'on voit |
|---|---|---|
| 01 Due ore | 1 → 3 | la main, le téléphone. 2 ORE, puis PER TROVARE / UN ELETTRICISTA |
| 02 Mia madre | 3 → 4 | cut net sur la cuisine sombre. PER MIA MADRE en corail |
| 03 Numeri falsi | 4 → 5 | l'interrupteur claque dans le vide. NUMERI FALSI géant, shake, onde |
| 04 Nessuna risposta | 5 → 6 | retour au téléphone qui redescend. NESSUNA / RISPOSTA |
| 05 Il respiro | 6 → 7 | cut sur la rue. Aucun texte, une barre d'air : le film respire avant le virage |
| 06 Un modo migliore | 7 → 8.3 | la bascule atteint le ciel. DEVE ESSERCI / UN MODO MIGLIORE |
| 07 Manuvo | 8.3 → fin | flood corail, le lockup se pose d'un sixième de tour, SEGUICI @manuvo.it, tenu 2,5 s |

## Signature de marque
« Un sixième de tour » : le lockup ne tourne que par pas de 60°, sur un temps, et s'arrête net.
