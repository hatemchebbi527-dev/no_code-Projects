/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, place-audio,
 * stills, render). Scene code never holds a literal time: it asks b(bar, beat).
 * `at` / `from` / `to` are [bar, beat, fraction] on the grid, or seconds.
 *
 * Manuvo, teaser Phase 0 (manuvo/SOCIAL.md, Post 2): 10 bars at 140 BPM.
 */
window.CUES = {
  name: "manuvo-teaser-phase0",
  title: "Manuvo · Teaser",
  width: 1080,
  height: 1920,
  duration: 17.1429, // 10 bars at 140 BPM
  grid: { bpm: 140, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 }, // assets/audio/bed.grid.json (exact)
  music: { src: "assets/audio/bed.wav", volume: 0.6, license: "generated with suspense.py (royalty-free, ours)" },
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  scenes: [
    { name: "01 Rimini", from: [1, 1], to: [3, 1], what: "ink. A town of lit columns; a coral point searches through it. CERCARE UN / IDRAULICO / A RIMINI…" },
    { name: "02 Numeri", from: [3, 1], to: [5, 1], what: "cream. A phone calls, coral rings go out, nobody answers. NUMERI / CHE NON / RISPONDONO. Close shot: Nessuna risposta" },
    { name: "03 Fantasma", from: [5, 1], to: [6, 1], what: "ink. Quote sheets float like ghosts and vanish one per beat. PREVENTIVI / FANTASMA." },
    { name: "04 Cambia", from: [6, 1], to: [8, 1], what: "coral drop. Scattered particles converge into the Manuvo hexagon. STA PER / CAMBIARE / TUTTO 👀" },
    { name: "05 Manuvo", from: [8, 1], to: [11, 1], what: "cream lockup. The 3D logo turns to face us. PRESTO A RIMINI / @manuvo.it" },
  ],
  events: [
    { at: [1, 2], what: "CERCARE UN slams", sfx: "tick", volume: 0.3 },
    { at: [1, 3], what: "IDRAULICO slams (coral)", sfx: "tick", volume: 0.3 },
    { at: [2, 1], what: "A RIMINI… slams" , sfx: "thud", volume: 0.35 },
    { at: [2, 3], what: "the point turns, the camera cuts" },
    { at: [2, 4, 0.5], what: "cream flood up", sfx: "whoosh", volume: 0.3 },
    { at: [3, 1], what: "NUMERI · phone rings (ring 1)", sfx: "ping", volume: 0.3 },
    { at: [3, 2], what: "CHE NON" },
    { at: [3, 3], what: "RISPONDONO. · ring 2", sfx: "ping", volume: 0.25 },
    { at: [4, 1], what: "ring 3, camera cut", sfx: "ping", volume: 0.25 },
    { at: [4, 3], what: "close shot: Nessuna risposta", sfx: "click", volume: 0.35 },
    { at: [4, 4, 0.5], what: "ink flood down", sfx: "whoosh", volume: 0.3 },
    { at: [5, 1], what: "PREVENTIVI · ghost 1 vanishes", sfx: "pop", volume: 0.25 },
    { at: [5, 2], what: "FANTASMA. · ghost 2 vanishes", sfx: "pop", volume: 0.25 },
    { at: [5, 3], what: "ghost 3 vanishes, camera cut", sfx: "pop", volume: 0.2 },
    { at: [5, 4], what: "ghost 4 vanishes; half beat of silence" },
    { at: [6, 1], what: "DROP: coral, shake, shockwave · STA PER", sfx: "thud", volume: 0.45 },
    { at: [6, 2], what: "CAMBIARE" },
    { at: [6, 3], what: "TUTTO 👀 · camera cut", sfx: "tick", volume: 0.3 },
    { at: [7, 1], what: "particles take the hexagon shape, camera cut" },
    { at: [7, 3], what: "hexagon settled, front shot" },
    { at: [7, 4, 0.5], what: "cream iris", sfx: "whoosh", volume: 0.3 },
    { at: [8, 1], what: "3D logo turns in", sfx: "chime", volume: 0.35 },
    { at: [8, 3], what: "logo faces front" },
    { at: [9, 1], what: "PRESTO A RIMINI", sfx: "tick", volume: 0.3 },
    { at: [9, 2], what: "@manuvo.it", sfx: "pop", volume: 0.3 },
    { at: [10, 1], what: "hold the lockup to the end" },
  ],
};
