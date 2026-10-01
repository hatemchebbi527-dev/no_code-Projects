# Carrousel de chauffe « Chi siamo »

5 slides 1080×1350 pour Instagram/Facebook (Phase 0, voir `manuvo/SOCIAL.md`).
Couleurs de marque corail `#FF5758` + crème `#FAF8F4`, police **Bricolage Grotesque**,
logo officiel depuis `manuvo/public/logo-mark.svg` et `logo.svg`.

## Fichiers

- `generate.py` — génère les 5 PNG.
- `manuvo_carousel_1..5.png` — visuels prêts à uploader (ordre 1→5).
- `_assets/` — dérivés du logo (générés, non versionnés).

## Régénérer / éditer

```bash
pip install cairosvg pillow

# Police Bricolage Grotesque (SIL OFL) en local :
mkdir -p ~/.fonts && cd ~/.fonts
curl -s "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800" -o bg.css
# télécharger les .ttf listés dans bg.css (hôte fonts.gstatic.com), puis :
fc-cache -f ~/.fonts

cd manuvo/marketing/carousel && python generate.py
```

Les textes des slides sont dans `generate.py` (section S1..S5) et dans `manuvo/SOCIAL.md`.
Pour éditer sans code : Canva, format 1080×1350, police « Bricolage Grotesque », mêmes couleurs.
