/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, place-audio,
 * stills, render). Scene code never holds a literal time: it asks b(bar, beat).
 * `at` / `from` / `to` are [bar, beat, fraction] on the grid, or seconds.
 *
 * Manuvo, "Il problema n°1" (warm-up, pillar: trust). 12 bars at 144 BPM = 20.000 s.
 */
window.CUES = {
  name: "manuvo-problema-n1",
  title: "Manuvo · Il problema n°1",
  width: 1080,
  height: 1920,
  duration: 20.0, // 12 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 }, // assets/audio/bed.grid.json (exact)
  music: { src: "assets/audio/bed.wav", volume: 0.9, license: "generated with synth.py --style trap (royalty-free, ours)" },
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  scenes: [
    { name: "01 Hook", from: [1, 1], to: [3, 1], what: "ink. IL PROBLEMA / N°1 / QUANDO CERCHI / UN ARTIGIANO? slammed with a light glitch; fake contact cards drift in the fog" },
    { name: "02 Problema", from: [3, 1], to: [5, 1], what: "coral flip. A phone in a viewfinder: fake numbers scroll and get struck, the call rings out, the quote never comes. NUMERI FALSI. → NESSUNA RISPOSTA. → PREVENTIVI FANTASMA." },
    { name: "03 Basta", from: [5, 1], to: [6, 1], what: "ink. A coral 3D cross slams toward the lens, the frame shakes; dry cut to black: BASTA. Half a beat of silence." },
    { name: "04 Soluzione", from: [6, 1], to: [9, 1], what: "coral, clean. The phone gets the Manuvo SMS code, the code fills in, ✓ VERIFICATO. Then a fake number card hits a hexagon shield and bursts. OGNI CLIENTE VERIFICA IL NUMERO VIA SMS → UN NUMERO FALSO NON PASSA." },
    { name: "05 Beneficio", from: [9, 1], to: [11, 1], what: "cream then ink. MENO PERDITEMPO. / PIÙ LAVORO VERO., a hexagon prism turning a sixth on every beat" },
    { name: "06 Manuvo", from: [11, 1], to: [13, 1], what: "coral. Particles converge into the Manuvo logo, bloom, lockup. PRESTO A RIMINI · Seguici 👉 @manuvo.it" },
  ],
  events: [
    { at: [1, 1], what: "IL PROBLEMA slams (already moving on frame 0)", sfx: "thud", volume: 0.35 },
    { at: [1, 2], what: "N°1 slams in coral, glitch", sfx: "tick", volume: 0.35 },
    { at: [1, 3], what: "camera cut" },
    { at: [1, 4], what: "glitch on N°1", sfx: "click", volume: 0.3 },
    { at: [2, 1], what: "QUANDO CERCHI slams", sfx: "tick", volume: 0.3 },
    { at: [2, 2], what: "UN ARTIGIANO? slams", sfx: "tick", volume: 0.3 },
    { at: [2, 3], what: "camera cut, hold the hook" },
    { at: [2, 4], what: "glitch on the whole hook", sfx: "click", volume: 0.3 },
    { at: [3, 1], what: "FLIP coral · NUMERI FALSI. · numbers scroll on the phone", sfx: "thud", volume: 0.4 },
    { at: [3, 2], what: "numbers struck one by one" },
    { at: [3, 3], what: "camera cut" },
    { at: [3, 4], what: "NESSUNA RISPOSTA. · the call rings", sfx: "ping", volume: 0.3 },
    { at: [4, 1], what: "ring 2, camera cut", sfx: "ping", volume: 0.25 },
    { at: [4, 2], what: "Nessuna risposta on the screen", sfx: "click", volume: 0.3 },
    { at: [4, 3], what: "PREVENTIVI FANTASMA. · quote in attesa, ghost", sfx: "tick", volume: 0.3 },
    { at: [4, 4], what: "glitch, quote flickers out", sfx: "click", volume: 0.3 },
    { at: [5, 1], what: "cut ink: the cross slams in, shake", sfx: "thud", volume: 0.45 },
    { at: [5, 2], what: "zoom into the cross, shake", sfx: "thud", volume: 0.3 },
    { at: [5, 3], what: "dry cut to black · BASTA.", sfx: "thud", volume: 0.5 },
    { at: [5, 4, 0.5], what: "half a beat of silence" },
    { at: [6, 1], what: "coral iris (clean) · the phone · OGNI CLIENTE", sfx: "whoosh", volume: 0.3 },
    { at: [6, 2], what: "VERIFICA IL NUMERO · SMS banner drops", sfx: "ping", volume: 0.35 },
    { at: [6, 3], what: "VIA SMS. · camera cut" },
    { at: [6, 4], what: "code digits 1-3", sfx: "tick", volume: 0.25 },
    { at: [7, 1], what: "code digits 4-6, camera cut", sfx: "tick", volume: 0.25 },
    { at: [7, 3], what: "✓ VERIFICATO badge pops", sfx: "chime", volume: 0.4 },
    { at: [8, 1], what: "UN NUMERO FALSO · a fake card flies in, camera cut", sfx: "whoosh", volume: 0.25 },
    { at: [8, 2], what: "NON PASSA. · it hits the hexagon shield (a sixth of a turn) and bursts", sfx: "thud", volume: 0.4 },
    { at: [8, 3], what: "camera cut, fragments fall" },
    { at: [8, 4, 0.5], what: "cream flood up", sfx: "whoosh", volume: 0.25 },
    { at: [9, 1], what: "MENO PERDITEMPO. · ink prism turns a sixth", sfx: "tick", volume: 0.3 },
    { at: [9, 2], what: "PERDITEMPO. slams", sfx: "tick", volume: 0.3 },
    { at: [9, 3], what: "prism turns a sixth, camera cut" },
    { at: [10, 1], what: "hard cut ink · PIÙ LAVORO · coral prism", sfx: "thud", volume: 0.35 },
    { at: [10, 2], what: "VERO. slams", sfx: "tick", volume: 0.3 },
    { at: [10, 3], what: "prism turns a sixth, camera cut" },
    { at: [10, 4, 0.5], what: "coral iris from the prism", sfx: "whoosh", volume: 0.25 },
    { at: [11, 1], what: "particles converge into the logo" },
    { at: [11, 3], what: "the logo turns solid, bloom, shockwave", sfx: "chime", volume: 0.4 },
    { at: [11, 4], what: "PRESTO A RIMINI", sfx: "tick", volume: 0.3 },
    { at: [12, 1], what: "Seguici 👉 @manuvo.it", sfx: "pop", volume: 0.3 },
    { at: [12, 3], what: "hold the lockup to the end" },
  ],
};
