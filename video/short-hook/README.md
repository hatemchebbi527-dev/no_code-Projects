# Short cinématique — HOOK [00:00–00:10]

Montage par code (ffmpeg) d'un short vertical 9:16 (1080×1920, 30 fps, ~10 s)
à partir de 4 images fixes, animées en Ken Burns (zoom/pan), avec vignette,
étalonnage léger, textes incrustés synchronisés et fondus enchaînés.

## Comment générer la vidéo finale

1. Dépose tes 4 vraies images dans `assets/` avec EXACTEMENT ces noms et cet ordre :

   | Fichier        | Image (ordre réel utilisé)                                            |
   |----------------|-----------------------------------------------------------------------|
   | `assets/01.png`| L'homme tête dans les mains — dashboard **0 NEW LEADS**, factures, payroll |
   | `assets/02.png`| Au téléphone — **appels manqués**, post-its FOLLOW UP / INVOICES DUE   |
   | `assets/03.png`| Les **dashboards IA** holographiques — la solution                     |
   | `assets/04.png`| Écran **PAYROLL DUE 3 DAYS** — compte à découvert -$2,643.18           |

   > Note : le montage place l'image **04 (payroll)** en plan 3 (l'enjeu) et
   > l'image **03 (solution IA)** en plan 4 (l'objectif visible). Le mapping
   > image→plan est défini dans `SHOTS` (champ `img`) de `build_short.py`.
   >
   > JPG accepté aussi : renomme en `01.jpg`… et adapte le champ `img`.

2. Lance le rendu :

   ```bash
   python3 build_short.py
   ```

3. Récupère le résultat : `out/short_hook.mp4`

## Mode démo (validation du pipeline sans vraies images)

```bash
python3 build_short.py --demo
```

Génère des placeholders colorés et produit `out/short_hook.mp4` pour vérifier
que le montage fonctionne.

## Découpage (storyboard)

| Plan | Image | Animation        | Texte à l'écran |
|------|-------|------------------|-----------------|
| 1 | 01 | push avant, centre | « Three months ago… my business stopped existing online. » |
| 2 | 02 | push + pan droite  | **INVISIBLE BUSINESSES DIE FIRST.** + « Better competitors? No. They were just louder. » |
| 3 | 04 | push + pan haut    | « I had 30 days to fix my visibility… before payroll hit. » |
| 4 | 03 | léger recul        | « Get leads fast — without burning more money. » |

## Réglages rapides (dans `build_short.py`)

- `CLIP` : durée de chaque plan (2.875 s → total 10 s avec les fondus)
- `XFADE` : durée des fondus enchaînés
- `SHOTS` : textes, couleurs, positions, sens du zoom/pan
- Police : DejaVuSans-Bold (changeable via `FONT_BOLD`)

## Pas encore inclus (à ajouter après)

- **Voix off** : la vidéo est livrée muette avec sous-titres. Ajoute une piste
  audio (TTS ou ta voix) + musique :
  ```bash
  ffmpeg -i out/short_hook.mp4 -i voix.mp3 -i musique.mp3 \
    -filter_complex "[1]volume=1.0[v];[2]volume=0.25[m];[v][m]amix=inputs=2[a]" \
    -map 0:v -map "[a]" -shortest out/short_hook_audio.mp4
  ```
- Sous-titres en français : remplace les textes anglais dans `SHOTS`.
