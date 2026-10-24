# Manuvo brand profile for video

The brand, the owner's standing choices and the films made so far. Every new film reads this first and only asks what is new.
Sources: codebase `manuvo/` (`src/app/globals.css`, `src/app/layout.tsx`, `public/logo*.svg`), `manuvo/SOCIAL.md` (content plan), owner notes. When this file and the brand's own files disagree, the brand's files win.

## Motion identity
- Full system: `manuvo/videos/motion-identity/index.html` (published guide: https://claude.ai/artifact/62Psy9tkAb3N8CKTfuirgz). Signature: "un sixième de tour" (the hexagon turns 60° in 480 ms, `cubic-bezier(.16,1,.3,1)`, stops dead, with a click). Easing tokens: avvita (enter), via (exit), click (success), rotta (routes). Every film ends on logo concept A.

## Owner choices (standing: reuse for every film unless they say otherwise)
- Where films play: TikTok + Instagram Reels (+ Reel FB, Story extract), 9:16 1080x1920. Usual length: 15 to 20 s. Language on screen: **Italian**. Audience: privati in Rimini + dintorni looking for an artisan; artigiani as the second audience.
- Music: **suspense** (owner's choice, 2026-10-01): generated bed `teaser-phase0/suspense.py` (drone, heartbeat, clock tick, F-Gb minor second, hush, riser, half-beat silence, then the turn Db / Eb / F major). 140 BPM, F minor. Royalty-free, ours. The trap bed from `synth.py` was replaced.
- Tone: direct, local, a bit cheeky; the problem first (fake numbers, ghost quotes), then the promise of trust.
- Brand loop in three statements: 1. Pubblichi la richiesta gratis. 2. Gli artigiani della tua zona ti contattano. 3. Contatti verificati, zero fake.
- Ending: the logo, then the CTA chosen for the phase. Phase 0 (warm-up): soft CTA only, "Presto a Rimini · @manuvo.it" (no "pubblica ora" until Twilio + Stripe Live). Site: `manuvo.automa-ia.net`.
- Rule from SOCIAL.md: 1 video = 4 posts (TikTok, Reel IG, Reel FB, Story extract).

- Music on presentation films: none in the file (the owner adds trending audio per platform); keep sound effects quiet.
- Music on short warm-up films written by the owner (brief "Il problema n°1", 2026-10-04): hip-hop / punchy beat, cut every 2 beats, no voice, every line burned in (4 to 6 words per shot). Deliver also an sfx-only copy so trending audio can be used instead.
- Logo on coral: reversed cream, as the app does on coral (`ComingSoon.tsx`: `brightness-0 invert`).

## Chosen by Claude (the owner can overrule)
- 2026-10-24: **never assert a fact about a competitor in a film.** The owner's brief for `artigiani-max3` said other platforms resell the same contact to ten artisans. That is unprovable and exposes Manuvo to a comparative-disparagement claim, so the film asks the artisan instead ("In quanti l'hanno avuto?" → "Non lo sai."). The feeling is recognised, nothing is asserted. Applies to every future film and caption.
- 2026-10-24: text on coral is ink `#1b1e24` (as `problema-n1` set); cream on coral is reserved for a single punchline per film.
- 2026-10-01: colour rhythm ink / cream / ink / coral (drop) / cream (lockup); HUD labels in Italian; red-900 `#C6383A` for coral text on cream (contrast), coral `#FF5758` for shapes and text on ink.
- 2026-10-01: 10 bars (17.1 s) instead of 15 s so every line holds long enough to read.

## Films
| Film | Type | Date | Owner's reaction, what changed |
|---|---|---|---|
| `teaser-phase0` | Brand teaser (SOCIAL.md Phase 0, Post 2) | 2026-10-01 | v1 trap draft: "change the music for suspense" → suspense bed synced to the picture (v2 draft); final v1 (2026-10-01): 60 fps, blur 2, 17.15 s, -14.7 LUFS, `out/manuvo-teaser-phase0/v1/` (+ `-social.mp4` at 11 Mbps, 23 MB) |
| `presentazione-9x16` / `presentazione-16x9` | Product presentation (both audiences, CTA Pubblica gratis) | 2026-10-02 | v1 flat 2D → owner: "more creative" → clay 3D (carousel style); owner: "remove the music, I add it on the platforms" (sfx kept) |
| `story-sondaggio-attesa` | Carte de Story Instagram avec sondage (artigiani / privati, phase de chauffe) | 2026-10-18 | final v1 (2026-10-18) : 1080x1920, 60 fps, blur 4, 10,000 s, **aucune piste audio** (le propriétaire ajoute une musique de la librairie IG) ; bande y=1150 à 1500 laissée vide pour le sticker sondage ; lockup depuis `logo-mark.svg` (le wordmark du logo complet rend flou à cette taille) ; owner : "supprime le cadre qui entoure le message" → viseur HUD retiré en v2 ; `out/manuvo-story-sondaggio-attesa/v2/` : master 8,96 Mo + poster (ARRIVATO?) |
| `artigiani-max3` | Teaser artigiani (pilier 4 : l'offre), brief du propriétaire, Phase 0 | 2026-10-24 | final v1 (2026-10-24) : 1080x1920, 60 fps, blur 2 (master 120 fps, 21 min de rendu en GPU logiciel), 20,000 s, **aucune piste musicale** (SFX seuls, -29,4 LUFS : volontairement sous le son tendance que le propriétaire ajoute par plateforme), corail décodé (252, 90, 89) pour (255, 87, 88), meilleur que les 245,88,90 de `problema-n1` ; hook reformulé en question (voir ci-dessus) ; claims limités à max 3 / mestiere / zona / zero abbonamenti / 5 crediti = 1 contatto ; `out/manuvo-artigiani-max3/v1/` : master 29,9 Mo, `-muted` sans aucune piste, poster (MASSIMO 3.) + `CAPTIONS.md` (4 légendes) |
| `problema-n1` | Problem / solution teaser (pillar trust: SMS verification vs fake contacts), owner's brief | 2026-10-04 | final v1 (2026-10-04): 60 fps, blur 2, 20.0 s, -13.8 LUFS, colours verified exact (grain in overlay); `out/manuvo-problema-n1/v1/`: master, `-social` (10 Mbps), `-sfx-only` (+ social), `-story-6s` (14 to 20 s), poster (hook) |

## Assets on file (reusable across films)
| Asset | Path | Notes |
|---|---|---|
| Logo (vertical, mark + MANUVO) | `manuvo/public/logo.svg` | SVG, coral `rgb(255,87,88)` on a white rect (skip the rect) |
| Logo mark (hexagon + wrench M) | `manuvo/public/logo-mark.svg` | SVG |
| Logo horizontal (mark + ANUVO) | `manuvo/public/logo-horizontal.svg` | SVG |
| Fonts | `videos/<film>/assets/fonts/` | Bricolage Grotesque (titles), Geist (UI), Geist Mono (HUD); from npm (@fontsource-variable, geist) |
| Music | `videos/<film>/assets/audio/bed.wav` | generated by `suspense.py`, royalty-free |

## Brand moment: what bends, what never does
- Bends for video: pace, light (env map, bloom on the coral highlight), depth (fog, particles), 3D, camera, transitions, grain, motion blur, HUD.
- Never bends: the palette (cream `#faf8f4`, ink `#1b1e24`, coral `#FF5758`, red scale from globals.css), coral as the one highlight, the logo files, the fonts, Italian copy, the claims.

## Hard rules
- Casing: titles uppercase in films (display face); handle `@manuvo.it` lowercase.
- Type: Bricolage Grotesque 800 for titles (`.font-display`, layout.tsx), Geist for UI text, Geist Mono for HUD/timecodes.
- Surfaces: background cream `#faf8f4` (globals.css `--background`), text ink `#1b1e24`.
- Copy: Italian, "tu" for privati (SOCIAL.md), no em dashes in captions.

## Frame (1080x1920, 60 fps)
- Full bleed. Safe zone: top 250, bottom 420, left 60, right 120 (social.md).
- Words: Bricolage 800 uppercase, 88 to 160 px, slammed on the beat.

## Color
| Token | Value | Use |
|---|---|---|
| background | `#faf8f4` | cream scenes, lockup |
| foreground | `#1b1e24` | ink scenes, text on cream and coral |
| accent | `#FF5758` | the one highlight, the logo, the drop |
| accent text on cream | `#C6383A` | red-900, passes WCAG on cream |
| deep | `#6E1618` | red-950, particles and ramps only |

## Logo and brand element
- Logo: `public/logo.svg` extruded in 3D (SVGLoader + ExtrudeGeometry): front face unlit exact coral, sides gloss red-900. Particles converge into `logo-mark.svg` before the lockup.
- Never: recolour the logo, stretch it, put it on a colour outside the palette.

## Claims
- Films may show: free for privati, no registration, SMS-verified contacts, real reviews, artisans of the zone contact you, max 3 artisans per request.
- Films must not show (yet): "online now" or "pubblica ora" before the real launch (Twilio + Stripe Live).
- Words to avoid: guarantees of price or result.

## Workspace
- `manuvo/videos/<film>/`, HyperFrames 0.8.103 (pinned in package.json), GSAP + Three.js vendored (+ SVGLoader copied from three 0.181.2).
- Skill: `.claude/skills/brand-motion-design/` (setup, synth, place-audio, beat-sheet, stills, render, verify).
- Renders in `out/` (gitignored), review stills in `review/` (gitignored).
- Trap found: with the bloom composer, `material.toneMapped = false` is ignored (the OutputPass tone-maps the whole frame). Use `renderer.toneMapping = NoToneMapping` so cream and coral stay exact.
- Trap found: a lit glossy prism on cream or ink reads grey or pink (env + specular). Caps as unlit exact swatches, sides glossy (the logo recipe). The film now blends the grain with `mix-blend-mode: overlay`.
- Trap found: `verify.py --bg` samples a corner pixel (80,80), where the vignette deliberately darkens the frame; it reads about 10 levels low and reports FAIL on a film whose swatches are exact. Check a pixel inside a flat colour area before believing it.
- Trap found: the wipe layer must live **inside** `#cam`, under `#words`. Above the words, an iris or a flood truncates a headline mid-letter (it cut "MAX 3" in half) and `check` reports it as `text_occluded`.
- Trap found: in 9:16 the camera `target` sits **above** the subject so the subject reads low in frame and the words get clean colour on top. Backwards, the ink prism landed under the ink headline and "UNA CHANCE" was invisible at 1.18:1. Headlines over wide shots only, plus a `#scrim` gradient of the scene colour wherever the subject crosses the headline band.
- Trap found: `check` Craft enforces a reading floor (0.5 s + 0.3 s a word, 2 s for the closing line). Lines that flash one at a time fail it; stacking a list of three promises so they hold together passes and reads better.
- Trap found: the grain canvas (normal blend, mid-grey, 4 to 6 % opacity) pulls every colour toward grey by 4 to 10 levels (coral #FF5758 decodes about 245,88,90; cream about 245,241,238). For exact swatches, blend the grain with `mix-blend-mode: overlay` or lower it.
