# Spot MANUVO 16:9

Spot promotionnel de 30,3 s, 1920x1080, 24 fps. Six scènes montées en fondus
enchaînés.

## D'où vient chaque scène

Quatre scènes viennent de clips générés sur Kling AI, deux sont composées ici
image par image.

| Scène | Durée | Source | Pourquoi |
|-------|-------|--------|----------|
| 1 | 5,04 s | Kling, intact | Fuite du robinet |
| 2 | 3,67 s | Kling, recoupé | Dégâts domestiques. Le 4e plan du clip original, un gros plan sur une porte de meuble décrochée, se lisait comme une forme en bois abstraite. Coupé à 3,667 s, là où ce plan commence. |
| 3 | 5,04 s | Kling, intact | Frustration au smartphone |
| 5 | 7,00 s | **Composée** | Interface de l'app |
| 7 | 5,04 s | Kling, intact | Le professionnel intervient |
| 9 | 7,00 s | **Composée** | Lockup de marque |

## Pourquoi les scènes 5 et 9 ne sont pas générées

Les modèles vidéo ne rendent pas du texte lisible. Les prises Kling de ces deux
scènes contenaient :

- un clavier de téléphone aux touches aléatoires (`W I T K W R K R`)
- des fiches de profil en charabia (`ECHIAVRAJB`, `TXBY PYDLAYSSB`)
- trois flèches rouges non demandées pointant vers l'écran
- un logo d'app affichant `CC`
- une requête de recherche écrite `Perdia d'acpa in cucina`
- une signature rendue `Troaba. Coneeti. Rsslvi.` au lieu de `Connetti - Trova - Risolvi`
- un CTA rendu `Scoprii Manvo` au lieu de `Scopri Manuvo`
- un logo inventé de toutes pièces : hexagone tourné de 30°, clé en diagonale au
  lieu de verticale, rouge saturé au lieu du corail, typographie grasse au lieu
  de la fine

Relancer une génération redonne un charabia différent, pas du texte correct.
Ces deux scènes sont donc composées en Python, ce qui rend chaque pixel de texte
exact et permet d'utiliser le vrai logo.

## Prérequis

- Python 3 avec Pillow et numpy
- ffmpeg et ffprobe
- la famille Inter installée dans `/usr/share/fonts/opentype/inter`
  (Debian/Ubuntu : `apt install fonts-inter`)

## Utilisation

Les scripts attendent un dossier `clips/` contenant les quatre clips Kling, aux
noms `scene1.mp4`, `scene2.mp4`, `scene3.mp4`, `scene7.mp4`.

```bash
# 1. composer les deux scènes typographiques
python3 build_scene5.py assets/logo.png s5frames
python3 build_scene9.py assets/logo.png s9frames

# 2. encoder chacune en MP4 aux specs des clips Kling
for s in 5 9; do
  ffmpeg -framerate 24 -i s${s}frames/f%04d.png \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
    -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -shortest clips/scene${s}_FIXED.mp4 -y
done

# 3. recouper la scène 2 avant son dernier plan
ffmpeg -i clips/scene2.mp4 -t 3.66 \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p \
  -c:a aac -b:a 128k clips/scene2_FIXED.mp4 -y

# 4. monter le tout
./assemble.sh        # produit ../manuvo_spot.mp4
```

## Le logo

`assets/logo.png` est la version matricée de `manuvo/public/logo.svg`, mêmes
dimensions 1280x1024. Les scripts la lisent avec Pillow, qui ne gère pas le SVG.

Le PNG a un fond blanc opaque, sans canal alpha utile. Les scripts détourent ce
fond par un remplissage depuis les bords plutôt qu'en supprimant tout pixel
blanc, sinon la clé blanche évidée à l'intérieur de l'hexagone disparaîtrait
aussi.

L'encre du logo occupe les lignes 196 à 737. Un interligne vide sépare
l'hexagone (lignes 196 à 568) du mot MANUVO (lignes 629 à 737), ce qui permet à
`cut_logo(path, "mark")` d'extraire l'hexagone seul pour l'en-tête de l'app,
où le mot serait illisible.

Couleur de marque relevée directement sur le fichier : `#FF5757`.

## Montage

`assemble.sh` enchaîne cinq fondus `xfade` de 0,5 s, plus une ouverture au noir
de 0,5 s et une fermeture de 0,8 s.

Les décalages `xfade` se mesurent sur la sortie cumulée, pas sur le clip entrant.
Chaque fondu raccourcit la frise de sa propre durée, donc le décalage suivant
doit tenir compte de tous les précédents. Le script calcule cette chaîne. Si une
durée de clip change, mettre à jour les variables `d1` à `d6` en tête du script
et rien d'autre.

L'audio est crossfadé en parallèle. Les clips Kling portent un son d'ambiance
discret, entre -52 et -32 dB de moyenne. Les deux scènes composées sont
silencieuses, et `acrossfade` lisse le passage de l'un à l'autre.

Durée finale : somme des six clips moins 2,5 s de recouvrement, soit 30,29 s.
