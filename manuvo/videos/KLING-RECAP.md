# MANUVO Video Generation IDs

Generated: 2026-10-06 ~12:50 UTC
Model: kling-video-v3_0_omni | 1080p | 16:9 | 5s each
Credits used: 360 / 660 total
Status: les 6 clips sont COMPLETED

## URLs de telechargement (sans watermark)

ATTENTION: ces URLs expirent 24h apres generation, soit vers 2026-10-07 12:50 UTC.

| Scene | Description | URL |
|-------|-------------|-----|
| 1 | Fuite cuisine (close-up) | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/f248513c-52d4-4c14-b0d6-6f7d69efdd9b-CMzbT43HY7_8ACJUpL2xLA-output.mp4?x-kcdn-pid=112372 |
| 2 | Montage problemes (multi-shot) | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/2a209753-743c-4307-ac3b-03f3e53913d3-DUgKks2W6BLCV71AhomS1A-output.mp4?x-kcdn-pid=112372 |
| 3 | Personne frustree smartphone | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/7c8bba80-1827-49b8-b8f7-7df16bae908b-1xA60RQt8OkG14uXFOWyvA-output.mp4?x-kcdn-pid=112372 |
| 5 | Interface app / match pro | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/e4a01b32-1493-4986-a77a-94e56c1d75f9-zyHSIfYzg_olQPmZFSfMAw-output.mp4?x-kcdn-pid=112372 |
| 7 | Plombier resout le probleme | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/117fa65e-ec64-43ab-82dc-7c4797e8c5a7-6fllnz8ZuqydRvWX6ngbFw-output.mp4?x-kcdn-pid=112372 |
| 9 | Finale brand shot MANUVO | https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/39e75c51-4afd-4c63-88af-e14356bad2d5-eP_99LjxWf6PllvhHx2IEQ-output.mp4?x-kcdn-pid=112372 |

## Generation IDs (pour re-query sur Kling)

| Scene | Generation ID |
|-------|---------------|
| 1 | AQiteMEju1gcXCvUobmEBKKWl6yQ95WWZ7LRIwiIgJSUxw2ex5pyKmhFZa62mfJ895Ly1m-_ |
| 2 | ARGf4Oh9tSmCZvhTHsiWOa801XyD_ZyqjxWmHKx-X8MXsN6A2pAyMJ3KcapDN8mrBpxoe7J3 |
| 3 | AaDHL61I0uy_udApb_MhDqegH7QqP7EXroPfMTC9Zfqve3cg_zT7uKrWTRSPbVKMbcVEavP4 |
| 5 | ASwVRsqlLt8jH1s34-cKHxurC-O7EIXNdKJOkx6OLgR0QreZWbVxpEutSpppPtaw17eL7lhE |
| 7 | Ae8BAiAd85hEDrj6UELrCDEpe9PL-RFzHj422O5DVg2lEuhLOimImGwKrWI5XIcQQmL31bNW |
| 9 | AXBiAK6fXTKadZC2L9hHcPfDGpUmOmFWWqJEAEWtKZIL7dfFq6VP5aOvra_C-t32-XqtckzY |

## Defauts identifies a corriger (si regeneration)

- **Scene 2**: la derniere sequence ne montre pas clairement le probleme. Prompt a preciser sur le
  sujet du dernier plan.
- **Scene 5**: le clavier du telephone doit avoir des touches reelles. Les popups doivent afficher
  des profils realistes avec du texte en italien. Supprimer les 3 fleches rouges qui vont du popup
  vers l'ecran du telephone.
- **Scene 9**: le logo genere ne correspond pas au logo MANUVO d'origine. Le message doit etre
  exactement "Connetti - Trova - Risolvi", avec en dessous et centre un CTA "Scopri Manuvo".
  Note: l'upload du logo exact vers Kling est bloque par la politique reseau de l'environnement,
  donc le logo devra etre incruste en post-production plutot que genere.

## Blocage technique a connaitre

La politique reseau de l'environnement cloud refuse l'hote `v15-kling.klingai.com` (403 sur le
tunnel CONNECT). Consequences:
- impossible de telecharger les clips depuis la session
- impossible de les publier comme fichiers compagnons d'un artifact
- un `<video src>` pointant vers le CDN Kling est bloque par le sandbox de l'artifact

Pour lever ca: menu de l'environnement cloud dans la barre de titre de la session, puis Edit, puis
Network access. Soit un niveau d'acces plus large, soit Custom avec `v15-kling.klingai.com` ajoute
aux Allowed domains en gardant la liste des package managers par defaut.
Doc: https://code.claude.com/docs/en/cloud-environments#network-access

## Post-Production Notes

- Le logo MANUVO exact doit etre incruste en post-prod sur la Scene 9
- Ordre de montage: Scene1 -> Scene2 -> Scene3 -> [Logo reveal] -> Scene5 -> Scene7 -> Scene9
- Transitions: cross-fade doux ou cut net selon l'energie du montage
- Logiciel: DaVinci Resolve (gratuit) ou CapCut pour un assemblage rapide

## Artifact HTML (separe des clips Kling)

Storyboard anime en CSS/JS, 9 scenes, logo MANUVO exact embarque en base64:
https://claude.ai/artifact/8wDygEJRsFrEuWyqfYV8Sy
Version 3 = Scene 2 revenue a son etat d'origine.
Ce n'est pas photorealiste, c'est un storyboard anime a la main. Il ne contient aucune image Kling.
