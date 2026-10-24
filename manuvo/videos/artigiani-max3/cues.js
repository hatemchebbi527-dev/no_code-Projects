/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, place-audio,
 * stills, render). Scene code never holds a literal time: it asks b(bar, beat).
 * `at` / `from` / `to` are [bar, beat, fraction] on the grid, or seconds.
 *
 * Manuvo, "Massimo 3" (warm-up, pillar: artigiani / offre). 12 bars at 144 BPM = 20.000 s.
 *
 * The hook is a QUESTION, never a claim about competitors: "in quanti l'hanno
 * avuto?" then "non lo sai." An artisan recognises the feeling without Manuvo
 * asserting anything it cannot prove about another platform.
 * Phase 0 claims only (BRAND.md): max 3 artigiani per richiesta, il tuo
 * mestiere, la tua zona, zero abbonamenti, 5 crediti in regalo (enough for ONE
 * first contact, never implied plural). No SMS verification, no P.IVA, no
 * volume promise, no "pubblica ora".
 */
window.CUES = {
  name: "manuvo-artigiani-max3",
  title: "Manuvo · Massimo 3",
  width: 1080,
  height: 1920,
  duration: 20.0, // 12 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 }, // no bed: the grid is exact by construction
  music: null, // the owner adds trending audio per platform (BRAND.md); sfx stay quiet
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  scenes: [
    { name: "01 Hook", from: [1, 1], to: [3, 1], what: "ink. One coral request card low in frame; identical contact cards keep stacking onto it out of the fog, camera pulling back. PAGHI UN / CONTATTO. → IN QUANTI / L'HANNO AVUTO?" },
    { name: "02 Il dubbio", from: [3, 1], to: [5, 1], what: "coral flip. The stack fans out into a wall of identical cards, a counter climbing with it. CINQUE? → DIECI? → QUINDICI? → NON LO SAI." },
    { name: "03 Il taglio", from: [5, 1], to: [6, 1], what: "ink. The wall bursts; a coral 3D 3 slams toward the lens, frame shakes; dry cut: MASSIMO 3. Half a beat of silence." },
    { name: "04 La soluzione", from: [6, 1], to: [9, 1], what: "coral, clean. Three cream artisan tokens settle in a row under the hexagon shield, which turns a sixth and locks. MAX 3 / PER RICHIESTA. → IL TUO MESTIERE. → LA TUA ZONA. → ZERO ABBONAMENTI." },
    { name: "05 Beneficio", from: [9, 1], to: [11, 1], what: "cream then ink. UNA CHANCE / VERA., a hexagon prism turning a sixth on every beat; hard cut to ink for 5 CREDITI / IN REGALO. with the line Per 1 contatto. under it (the one-contact precision)" },
    { name: "06 Manuvo", from: [11, 1], to: [13, 1], what: "coral. Particles converge into the Manuvo logo, bloom, shockwave, lockup. PRESTO A RIMINI · @manuvo.it" },
  ],
  events: [
    { at: [1, 1], what: "PAGHI UN slams (cards already falling on frame 0)", sfx: "thud", volume: 0.35 },
    { at: [1, 2], what: "CONTATTO. slams in coral", sfx: "tick", volume: 0.35 },
    { at: [1, 3], what: "camera cut, a card lands on the stack", sfx: "click", volume: 0.25 },
    { at: [1, 4], what: "another card lands", sfx: "click", volume: 0.25 },
    { at: [2, 1], what: "IN QUANTI slams", sfx: "tick", volume: 0.3 },
    { at: [2, 2], what: "L'HANNO AVUTO? slams", sfx: "tick", volume: 0.3 },
    { at: [2, 3], what: "camera cut, the stack keeps growing" },
    { at: [2, 4], what: "two cards land together", sfx: "click", volume: 0.3 },
    { at: [3, 1], what: "FLIP coral · the wall fans out · CINQUE?", sfx: "whoosh", volume: 0.35 },
    { at: [3, 2], what: "counter climbs" },
    { at: [3, 3], what: "DIECI? · camera cut", sfx: "tick", volume: 0.3 },
    { at: [4, 1], what: "QUINDICI? · the wall fills the frame", sfx: "tick", volume: 0.3 },
    { at: [4, 2], what: "counter keeps climbing, cards crowd in" },
    { at: [4, 3], what: "NON LO SAI. in cream · the counter stops dead", sfx: "click", volume: 0.35 },
    { at: [5, 1], what: "cut ink: the wall bursts, the 3 slams in, shake", sfx: "thud", volume: 0.45 },
    { at: [5, 2], what: "zoom into the 3, shake", sfx: "thud", volume: 0.3 },
    { at: [5, 3], what: "dry cut · MASSIMO 3.", sfx: "thud", volume: 0.5 },
    { at: [5, 4, 0.5], what: "half a beat of silence" },
    { at: [6, 1], what: "coral iris (clean) · the shield · MAX 3", sfx: "whoosh", volume: 0.3 },
    { at: [6, 2], what: "PER RICHIESTA. · token 1 settles", sfx: "pop", volume: 0.3 },
    { at: [6, 3], what: "token 2 settles, camera cut", sfx: "pop", volume: 0.28 },
    { at: [6, 4], what: "token 3 settles: the row is full", sfx: "pop", volume: 0.26 },
    { at: [7, 1], what: "IL TUO MESTIERE. · the shield turns a sixth and locks (the three promises stack and stay)", sfx: "tick", volume: 0.3 },
    { at: [7, 3], what: "LA TUA ZONA. · camera cut", sfx: "tick", volume: 0.3 },
    { at: [8, 1], what: "ZERO ABBONAMENTI. · the shield lands flat to the lens", sfx: "chime", volume: 0.35 },
    { at: [8, 3], what: "camera cut, the three tokens glow once" },
    { at: [8, 4, 0.5], what: "cream flood up", sfx: "whoosh", volume: 0.25 },
    { at: [9, 1], what: "UNA CHANCE · ink prism turns a sixth", sfx: "tick", volume: 0.3 },
    { at: [9, 2], what: "VERA. slams", sfx: "tick", volume: 0.3 },
    { at: [9, 3], what: "prism turns a sixth, camera cut" },
    { at: [10, 1], what: "hard cut ink · 5 CREDITI · coral prism", sfx: "thud", volume: 0.35 },
    { at: [10, 2], what: "IN REGALO. slams; the line Per 1 contatto. holds under it to the end of the scene", sfx: "tick", volume: 0.3 },
    { at: [10, 3], what: "prism turns a sixth, camera cut" },
    { at: [10, 4, 0.5], what: "coral iris from the prism", sfx: "whoosh", volume: 0.25 },
    { at: [11, 1], what: "particles converge into the logo" },
    { at: [11, 3], what: "the logo turns solid, bloom, shockwave", sfx: "chime", volume: 0.4 },
    { at: [11, 4], what: "PRESTO A RIMINI", sfx: "tick", volume: 0.3 },
    { at: [12, 1], what: "@manuvo.it", sfx: "pop", volume: 0.3 },
    { at: [12, 3], what: "hold the lockup to the end" },
  ],
};
