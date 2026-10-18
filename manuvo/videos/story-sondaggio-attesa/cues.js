/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, stills, render).
 * Scene code never holds a literal time: it asks b(bar, beat).
 *
 * Manuvo, "Story sondaggio: l'attesa" (warm-up, Instagram Story poll card).
 * 6 bars at 144 BPM = 10.000 s. SILENT on purpose: the owner adds a track
 * from the Instagram library, so there is no music and no sfx in the master.
 */
window.CUES = {
  name: "manuvo-story-sondaggio-attesa",
  title: "Manuvo · Story sondaggio: l'attesa",
  width: 1080,
  height: 1920,
  duration: 10.0, // 6 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // silent by design: Instagram library audio is added on posting
  sfx: null,
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  // The owner drops the Instagram poll sticker in this band, so nothing is
  // drawn or moved there: no type, no subject, only flat background colour.
  sticker: { top: 1150, bottom: 1500 },
  scenes: [
    { name: "01 Attesa", from: [1, 1], to: [3, 1], what: "ink. A coral hexagon clock spins too fast in the fog, cream hand, glow at the tip. QUANTE VOLTE / HAI ASPETTATO / UN ARTIGIANO / CHE NON È MAI slam one per 2 beats, camera cut on each" },
    { name: "02 Mai arrivato", from: [3, 1], to: [4, 1], what: "coral flood up from the clock. ARRIVATO? slams giant in ink, shake and one shockwave; the hand stops dead mid-sweep, then the hexagon turns a sixth" },
    { name: "03 Domanda", from: [4, 1], to: [5, 1], what: "hard cut cream. The hexagon prism turns a sixth on every beat in ink; the full question assembles in 4 ink lines, one per beat, in the readable layout that will hold to the end" },
    { name: "04 Manuvo", from: [5, 1], to: [7, 1], what: "coral iris from the prism. The extruded logo rises reversed cream and lands with the sixth of a turn; the question holds in ink above it, CTA @manuvo.it; last bar fully held for the poll sticker" },
  ],
  events: [
    { at: [1, 1], what: "QUANTE VOLTE slams (the clock is already spinning on frame 0)" },
    { at: [1, 3], what: "HAI ASPETTATO slams, camera cut" },
    { at: [2, 1], what: "UN ARTIGIANO slams, camera cut, the sweep accelerates" },
    { at: [2, 3], what: "CHE NON È MAI slams, camera cut closer on the hand" },
    { at: [3, 1], what: "FLIP coral, flood up from the clock · ARRIVATO? slams giant · shake · shockwave · the hand stops dead" },
    { at: [3, 3], what: "the hexagon turns a sixth and stops dead (brand signature), camera cut" },
    { at: [4, 1], what: "hard cut cream · ink prism in · question line 1 QUANTE VOLTE" },
    { at: [4, 2], what: "line 2 HAI ASPETTATO UN · prism turns a sixth" },
    { at: [4, 3], what: "line 3 ARTIGIANO CHE NON · prism turns a sixth" },
    { at: [4, 4], what: "line 4 È MAI ARRIVATO? · prism turns a sixth" },
    { at: [5, 1], what: "coral iris from the prism · the logo rises · the question holds" },
    { at: [5, 3], what: "the logo lands with the sixth of a turn, bloom, one shockwave" },
    { at: [6, 1], what: "CTA PRESTO A RIMINI · @manuvo.it" },
    { at: [6, 2], what: "held to the end: nothing moves but a slow drift and the grain (the poll is voted here)" },
  ],
};
