# Manuvo brand profile for video

The brand, the owner's standing choices and the films made so far. Every new film reads this first and only asks what is new.
Sources: codebase `manuvo/` (`src/app/globals.css`, `src/app/layout.tsx`, `public/logo*.svg`), `manuvo/SOCIAL.md` (content plan), owner notes. When this file and the brand's own files disagree, the brand's files win.

## Owner choices (standing: reuse for every film unless they say otherwise)
- Where films play: TikTok + Instagram Reels (+ Reel FB, Story extract), 9:16 1080x1920. Usual length: 15 to 20 s. Language on screen: **Italian**. Audience: privati in Rimini + dintorni looking for an artisan; artigiani as the second audience.
- Music: generated trap bed (`synth.py --style trap`), 140 BPM, F minor, "i VI VII v". Royalty-free, ours.
- Tone: direct, local, a bit cheeky; the problem first (fake numbers, ghost quotes), then the promise of trust.
- Brand loop in three statements: 1. Pubblichi la richiesta gratis. 2. Gli artigiani della tua zona ti contattano. 3. Contatti verificati, zero fake.
- Ending: the logo, then the CTA chosen for the phase. Phase 0 (warm-up): soft CTA only, "Presto a Rimini · @manuvo.it" (no "pubblica ora" until Twilio + Stripe Live). Site: `manuvo.automa-ia.net`.
- Rule from SOCIAL.md: 1 video = 4 posts (TikTok, Reel IG, Reel FB, Story extract).

## Chosen by Claude (the owner can overrule)
- 2026-10-01: colour rhythm ink / cream / ink / coral (drop) / cream (lockup); HUD labels in Italian; red-900 `#C6383A` for coral text on cream (contrast), coral `#FF5758` for shapes and text on ink.
- 2026-10-01: 10 bars (17.1 s) instead of 15 s so every line holds long enough to read.

## Films
| Film | Type | Date | Owner's reaction, what changed |
|---|---|---|---|
| `teaser-phase0` | Brand teaser (SOCIAL.md Phase 0, Post 2) | 2026-10-01 | v1 delivered, waiting for notes |

## Assets on file (reusable across films)
| Asset | Path | Notes |
|---|---|---|
| Logo (vertical, mark + MANUVO) | `manuvo/public/logo.svg` | SVG, coral `rgb(255,87,88)` on a white rect (skip the rect) |
| Logo mark (hexagon + wrench M) | `manuvo/public/logo-mark.svg` | SVG |
| Logo horizontal (mark + ANUVO) | `manuvo/public/logo-horizontal.svg` | SVG |
| Fonts | `videos/<film>/assets/fonts/` | Bricolage Grotesque (titles), Geist (UI), Geist Mono (HUD); from npm (@fontsource-variable, geist) |
| Music | `videos/<film>/assets/audio/bed.wav` | generated, royalty-free |

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
