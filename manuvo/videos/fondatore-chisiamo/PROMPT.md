<context>
Manuvo met en relation les habitants de Rimini et les artisans de leur zone. Ce film est le post
« Coulisses : Chi siamo » du plan marketing, pilier **confiance** : présenter le fondateur et
l'histoire derrière le projet, créer de l'attente avant le lancement du 22 janvier 2027.
Public : privati et artigiani. Il doit se lire sans le son.
Lire `videos/BRAND.md` d'abord. Ce fichier n'ajoute que l'histoire et l'état du chantier.
</context>

<etat>
**Le film est construit mais incomplet.** Les quatre plans sont des placeholders. La structure,
les sous-titres, les scrims, le lockup et toute la logique de montage sont en place et validés.
Il ne reste qu'à déposer trois choses et à recaler les temps.

| Ce qui manque | Qui | Où le déposer |
|---|---|---|
| Plan 1, le fondateur au travail | Kling, après déblocage réseau | `assets/shot1.mp4` |
| Plan 2, les mains et le carnet | Kling, après déblocage réseau | `assets/shot2.mp4` |
| Plan 3, capture du vrai site | **le propriétaire** | `assets/shot3.mp4` |
| Plan 4, Rimini | propriétaire, sinon Kling | `assets/shot4.mp4` |
| La voix off | **le propriétaire** | `assets/voce.m4a` |

Remplacer chaque placeholder par un `<video>` **enfant direct de la racine**, `muted playsinline` :
```html
<video id="shot1" class="clip shot" src="assets/shot1.mp4"
       data-start="0" data-duration="5" data-track-index="0" muted playsinline></video>
```
Hors de la racine, la runtime ne le seeke jamais et il rend noir.
</etat>

<blocage>
**L'envoi de fichiers à Kling est refusé par la politique réseau de l'environnement.**
`kling.ai` et `api.klingai.com` sont bloqués ; seuls les CDN de téléchargement
(`v15-kling.klingai.com`) répondent, ce qui explique que le clip de `mestieri-reale` ait pu être
récupéré. Le propriétaire a décidé d'autoriser ces domaines, mais **le réglage ne vaut que pour
une session ouverte après le changement** : la session où ce projet a été construit reste bloquée.

Piste à tester avant d'attendre : les appels aux outils Kling passent par
`mcp-proxy.anthropic.com`, lui autorisé. Or `element_create` accepte une **URL publique** que
Kling va chercher depuis ses propres serveurs. Si la photo du fondateur peut être hébergée sur
une URL lisible sans authentification, le blocage est contourné sans toucher au réseau.
</blocage>

<inputs>
Type : teaser fondateur, pilier confiance, Phase 0.
Durée : 15 mesures à 144 BPM = 25,000 s. 12 mesures de footage (20 s) + 3 mesures de lockup (5 s).
Format : 1080x1920, 60 fps. Pas de musique dans le fichier (choix permanent BRAND.md).

**Règle qui gouverne le film : on ne voit jamais le fondateur prononcer les mots.** Il travaille,
on voit ses mains et son écran, sa voix est en off. Double raison : c'est plus crédible pour un
post de confiance, et aucun outil de synchronisation labiale fiable n'est disponible (le
connecteur Kling n'en expose pas).

**Le plan 3 est le plus important du film.** C'est une capture du vrai site, pas une image
générée. Le produit existe et tourne : une capture authentique est la preuve la plus forte,
et elle évite d'afficher une interface inventée.
</inputs>

<claims>
La légende du post est conservée **mot pour mot** à la demande du propriétaire, y compris
« artigiani verificati ». Réserve consignée : dans l'app, ce badge exige P.IVA **et** avis
clients (`src/app/page.tsx` FAQ, `src/messages/it.json` → `verified_badge`), donc personne ne le
portera au lancement. Conséquence appliquée ici sans toucher à la légende : **tout le texte à
l'écran parle du projet au futur** (« Sto costruendo », « Stiamo per lanciare »).

Interdits : verifica SMS (Twilio pas en production), P.IVA registrata, toute promesse de prix,
de délai ou de volume, « pubblica ora », « siamo online ».
Aucun détail personnel sur le fondateur n'est inventé : le film ne dit que ce que dit sa légende.
</claims>

<prompts-kling>
Modèle `kling-video-v3_0`, `aspect_ratio: 9:16`, `resolution: 1080p`, `duration: 10`,
`enable_audio: false`, `prefer_multi_shots: false`. Cohérence du visage via `file_upload` puis
`element_create` à partir de la photo du fondateur, l'élément étant appelé dans le prompt.

Réserve : la photo fournie est un portrait studio en costume-cravate sur fond gris, à l'opposé du
registre coulisses. Les prompts demandent une tenue décontractée ; une photo en pull donnerait un
bien meilleur résultat.

**Plan 1**
```
A man in his early forties with short dark hair and a trimmed beard, wearing a simple dark knit
sweater, sitting down at a small wooden desk in a modest home office at early morning. Shot from
behind and slightly to the side, his face only partly visible in three-quarter profile. He opens
a worn notebook and uncaps a pen. Soft natural window light from the left, warm neutral tones, a
laptop and a coffee cup on the desk, an ordinary Italian apartment interior. Subtle handheld
camera, slow lateral drift, shallow depth of field, photorealistic documentary footage, natural
skin texture, calm unhurried movement. No text, no writing, no logos, no captions, no watermarks.
```

**Plan 2**
```
Extreme close-up of a man's hands writing a short list in a worn notebook on a wooden desk, then
crossing out one line with a single stroke and setting the pen down. Natural morning window light,
warm neutral colour, visible paper grain and pen ink, realistic skin texture on the hands. Static
camera with a very slight breathing movement, shallow depth of field, photorealistic documentary
footage. No text legible in the notebook, no logos, no captions, no watermarks.
```

**Plan 4, seulement si le propriétaire n'a pas ses propres images**
```
A quiet residential street in a small Italian seaside town in late afternoon, warm low sunlight on
pastel building facades, shutters, a few parked scooters, no people in focus, off-season calm.
Slow steady panning shot, photorealistic documentary footage, natural colour, no text, no readable
signs, no brand logos, no watermarks.
```

Rejeter et régénérer si : main à six doigts, stylo qui traverse la main, écran affichant une
interface impossible, visage lisse ou cireux, vêtement qui change en cours de plan, caméra trop ample.
</prompts-kling>

<voix>
Enregistrement par le propriétaire, au téléphone, en intérieur, à 20 cm de la bouche. Ton de
conversation, pas de ton publicitaire. Les quatre lignes reprennent sa légende mot pour mot :

1. Ciao, sono il fondatore di Manuvo.
2. Sto costruendo una piattaforma per trovare artigiani verificati a Rimini,
3. perché ho vissuto il problema sulla mia pelle.
4. Stiamo per lanciare. Seguici per scoprire di più.

Les temps des sous-titres dans `cues.js` sont **provisoires** et seront recalés sur
l'enregistrement : le montage suit sa respiration, pas l'inverse.
</voix>

<gotchas>
Les cinq avertissements Craft actuels (`first_frame_empty` et quatre `dead_stretch`) sont **des
artefacts des placeholders**, qui sont des div statiques. Ils doivent disparaître une fois les
clips déposés. **Ne pas les masquer avec `data-hold`** : s'ils persistent avec les vrais clips,
c'est le signe que les clips sont trop statiques et qu'il faut les régénérer.

Les placeholders portent `data-layout-ignore` parce que leur texte tombe sous le scrim des
sous-titres et fait échouer l'audit de calque. Cet attribut part avec les placeholders.

Le scrim bas est permanent sur tout le footage, et volontairement opaque : les clips ne sont pas
encore connus, et un sous-titre cream sur une image claire tombe sous le seuil WCAG.
</gotchas>
