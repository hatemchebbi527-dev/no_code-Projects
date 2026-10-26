---
name: video-openmontage
description: Produire une vidéo complète (explainer animé, trailer, montage documentaire, démo produit, shorts verticaux depuis une vidéo longue, doublage ou sous-titrage) avec OpenMontage. À utiliser quand Hatem demande de créer une vidéo, un Reel, un TikTok, un short, un explainer, une démo produit, une vidéo de prospection, de découper une vidéo longue en extraits, ou de doubler et sous-titrer une vidéo. Également quand il demande combien coûterait une vidéo IA ou quel pipeline choisir.
---

# Produire une vidéo avec OpenMontage

OpenMontage est un projet externe installé dans `OpenMontage/` à la racine du workspace.
Il n'est pas pilotable depuis ce workspace : il faut ouvrir Claude Code **dans** son dossier.

Guide complet et détail des coûts : `docs/OPENMONTAGE.md`.

## Étape 1 : vérifier l'installation

```bash
ls OpenMontage/Makefile 2>/dev/null && echo installé || echo absent
```

Si absent, proposer à Hatem de lancer `bash scripts/install-openmontage.sh` (5 à 15 minutes).
Ne jamais lancer ce script sans son accord explicite : il installe des dépendances pip et npm.

Si la session en cours est une session cloud (claude.ai/code), le dire tout de suite : le
conteneur est éphémère et sans GPU, les rendus seront perdus. OpenMontage doit tourner en local.

## Étape 2 : choisir le pipeline avant d'écrire le prompt

| Demande de Hatem | Pipeline | Coût |
|---|---|---|
| expliquer un concept, contenu pédagogique | Animated Explainer | 0 euro possible |
| vidéo de marque, teaser, trailer | Cinematic | payant conseillé |
| découper un webinaire ou un podcast en shorts | Clip Factory | 0 euro |
| essai vidéo, vidéo d'ambiance, vraies séquences | Documentary Montage | 0 euro |
| démo d'un logiciel ou d'une app | Screen Demo | 0 euro |
| sous-titrer ou doubler en italien | Localization & Dub | 0 euro |
| présentateur avatar | Avatar Spokesperson | payant |

Si Hatem fournit une vidéo de référence (YouTube, Reel, TikTok), partir de là plutôt que d'un
prompt vierge : OpenMontage analyse rythme, hook et style, puis renvoie 2 ou 3 concepts chiffrés.

## Étape 3 : annoncer le coût avant de produire

Par défaut, viser le **chemin à 0 euro** : voix Piper hors ligne, images Pexels et Pixabay,
vraies séquences Archive.org, NASA et Wikimedia, composition Remotion ou HyperFrames.

Pour de la vraie vidéo sans API payante, ajouter explicitement `use real footage only` au prompt.

N'engager des coûts de génération (1,33 à environ 5 dollars par film) que sur une mission payée
ou sur une pièce de portfolio décidée volontairement. Les clés vont dans `OpenMontage/.env`.

## Étape 4 : lancer

```bash
cd OpenMontage && claude
```

Puis donner le prompt **en anglais** (les skills internes du projet sont en anglais) :

```
Make a 45-second animated explainer about [sujet]
```
```
Make a 90-second documentary montage about [sujet]. Use real footage only, no narration.
```

Le tableau Backlot s'ouvre seul. Le rendu final arrive dans
`OpenMontage/projects/<nom-du-projet>/renders/final.mp4`.

## Quand ne pas utiliser OpenMontage

Pour un film de marque court à partir du logo et des visuels d'un client, sans installation ni
dépendance externe, utiliser plutôt le skill `brand-motion-design` déjà présent dans le workspace.
