# OpenMontage : studio vidéo agentique

Projet open source (licence AGPLv3) de Calesthio AI Labs. Ce n'est pas un skill Claude Code
mais un **projet complet** (Python + Node, 164 Mo) qui transforme Claude Code en studio de
production vidéo : recherche web, proposition, script, plan de scènes, génération des assets
(images, b-roll, voix, musique), montage, rendu final. Claude s'arrête à chaque choix créatif
pour demander validation.

- Dépôt : https://github.com/calesthio/OpenMontage
- Site : https://openmontage.video
- Installé ici dans `OpenMontage/` (ignoré par git, voir `.gitignore`)

---

## 1. Installation

```bash
bash scripts/install-openmontage.sh
```

Le script vérifie les prérequis, clone ou met à jour le dépôt, lance `make setup` et crée le
fichier `.env`. Comptez 5 à 15 minutes la première fois.

**Prérequis** (le script bloque s'il en manque un) :

| Outil | Version | Installation macOS | Installation Debian/Ubuntu |
|---|---|---|---|
| Python | 3.10+ | `brew install python` | `sudo apt install python3` |
| Node.js | 18+ | `brew install node` | via [nodejs.org](https://nodejs.org/) |
| FFmpeg | toute | `brew install ffmpeg` | `sudo apt install ffmpeg` |

## 2. Utilisation

OpenMontage se pilote en ouvrant Claude Code **à l'intérieur** du dossier, pas depuis ce workspace :

```bash
cd OpenMontage && claude
```

Puis décrire la vidéo en langage naturel, en anglais de préférence (les skills du projet sont
en anglais) :

```
Make a 45-second animated explainer about why the sky is blue
```

Le tableau de bord local **Backlot** s'ouvre automatiquement et montre l'avancement du
pipeline en direct. Les rendus arrivent dans `OpenMontage/projects/<nom-du-projet>/renders/final.mp4`.

## 3. Coût réel

Le projet est gratuit. Seuls les modèles de génération sont payants, et **toutes les clés API
sont facultatives** (fichier `OpenMontage/.env`).

### Chemin à 0 euro

Disponible dès `make setup`, sans aucune clé payante :

| Besoin | Outil gratuit |
|---|---|
| Voix off | Piper TTS (hors ligne, installé par le setup) |
| Images fixes | Pexels, Unsplash, Pixabay (clés développeur gratuites) |
| Vraies séquences vidéo | Archive.org, NASA, Wikimedia Commons |
| Composition | Remotion (React) ou HyperFrames (HTML/GSAP) |
| Sous-titres, encodage, mixage | FFmpeg, génération mot à mot intégrée |

Pour rester gratuit tout en obtenant de la **vraie vidéo** et pas des photos animées, demander
explicitement un *documentary montage* avec `use real footage only`.

### Chemin payant

Les courts-métrages d'exemple du README ont coûté de **1,33 à environ 5 dollars** de génération
chacun. Le système estime le coût avant de lancer et accepte un plafond de dépense.

Clés les plus utiles à ajouter en premier, par rapport qualité/prix :

| Clé | Débloque |
|---|---|
| `PEXELS_API_KEY`, `PIXABAY_API_KEY` | banque d'images et de b-roll gratuite (clés gratuites) |
| `FAL_KEY` | images FLUX + vidéo Veo, Kling, MiniMax (la passerelle la plus polyvalente) |
| `GOOGLE_API_KEY` | images Imagen, TTS Google 700+ voix |
| `ELEVENLABS_API_KEY` | voix off premium, musique, effets sonores |

## 4. Pipelines disponibles

| Pipeline | Produit | Usage |
|---|---|---|
| Animated Explainer | explainer avec recherche, voix, visuels, musique | contenu pédagogique |
| Animation | motion graphics, typographie cinétique | réseaux sociaux, démos produit |
| Avatar Spokesperson | présentateur avatar | communication corporate, formation |
| Cinematic | trailer, teaser, film d'ambiance | films de marque, promotion |
| Clip Factory | lot de shorts classés depuis une source longue | repurposing vers Reels, TikTok |
| Documentary Montage | montage thématique depuis archives libres | essais vidéo, B-roll sans API payante |
| Hybrid | rushes + visuels IA de complément | enrichir des séquences existantes |
| Localization & Dub | sous-titrage, doublage, traduction | distribution multilingue |
| Podcast Repurpose | extraits de podcast en vidéo | marketing podcast |
| Screen Demo | captures d'écran logicielles soignées | démos produit, tutoriels |
| Talking Head | vidéo portée par un intervenant | présentations, vlogs |

Chaque pipeline suit le même flux : `research -> proposal -> script -> scene_plan -> assets -> edit -> compose`.

## 5. Prompts de démarrage

### Sans aucune clé payante

```
Make a 45-second animated explainer about why the sky is blue
```
```
Create a 60-second video about the history of the internet, with narration and captions
```
```
Make a 90-second documentary montage about what a city feels like at 4am. Use real footage only, no narration, elegiac tone.
```

### Partir d'une vidéo de référence (souvent plus rapide qu'un prompt vierge)

```
Here's a YouTube Short I love. Make me something like this, but about [ton sujet].
```

Claude analyse transcript, rythme, scènes et style, puis renvoie 2 ou 3 concepts différenciés,
un chemin d'outils honnête, une estimation de coût et un échantillon avant la production complète.

### Avec un fournisseur d'images ou de vidéo configuré (0,15 à 1,50 dollar)

```
Make a product launch teaser for a fictional smart water bottle called AquaPulse
```

La galerie complète de prompts testés est dans `OpenMontage/PROMPT_GALLERY.md`.

## 6. Pour l'activité freelance

Trois services directement facturables à partir de ce stack :

1. **Clip Factory** : un client fournit un webinaire ou un podcast, tu livres 10 à 20 shorts
   verticaux sous-titrés. Marge élevée, coût de génération quasi nul.
2. **Screen Demo** : démo produit soignée pour un éditeur de logiciel ou une app locale.
3. **Localization & Dub** : doubler et sous-titrer en italien les vidéos existantes d'un client,
   pertinent sur le marché de Rimini.

Avant de vendre, produire 2 ou 3 pièces de démonstration pour le portfolio avec le chemin à
0 euro, puis n'engager des coûts de génération que sur une mission payée.

## 7. Limites à connaître

- **Licence AGPLv3** : si tu modifies OpenMontage et que tu l'exposes comme service en ligne,
  tu dois publier tes modifications. Un usage interne pour produire des vidéos clientes ne pose
  aucun problème.
- **Pas utilisable dans une session cloud** : les sessions Claude Code sur le web tournent dans
  un conteneur éphémère, sans GPU, et les rendus disparaissent. Installe et utilise OpenMontage
  **en local** sur ta machine.
- **Prompts en anglais** : les skills internes du projet sont rédigés en anglais, les résultats
  sont plus fiables en anglais.
- **Sans clé payante** : pas de génération de plans vidéo originaux, uniquement des images
  animées ou de vraies archives libres récupérées puis montées.

## 8. Recoupement avec le skill `brand-motion-design`

Le workspace contient déjà le skill `brand-motion-design`, qui produit des films de marque
rapides en HyperFrames sans dépendance externe. Règle de partage :

- vidéo de marque courte, logo et visuels du client, aucune installation : `brand-motion-design`
- production longue, voix off, recherche, archives, pipeline complet : OpenMontage
