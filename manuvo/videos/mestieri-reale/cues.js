/*
 * cues.js: the beat sheet as data. Scene code never holds a literal time.
 *
 * Manuvo, "I mestieri, davvero" (warm-up, pillar 3: mestieri / cas concrets).
 * 12 bars at 144 BPM = 20.000 s: 9 bars of real generated footage (15.04 s)
 * then 3 bars of Manuvo lockup, long enough for its three lines to be read.
 *
 * The footage is `assets/clip.mp4`, generated with Kling v3 (see
 * `videos/_kling/README.md`): four trades shot on the hands and the tools.
 * Its four shots cut at roughly 3.3 s, 7.2 s and 11.4 s, measured by sampling
 * frames; each trade label sits safely inside its own shot.
 *
 * The footage is an ILLUSTRATION, never a job delivered through Manuvo. No
 * before/after, no claim of a completed chantier (BRAND.md, 2026-10-25).
 * Audience: privati. Phase 0 claims only: gratis, senza registrazione,
 * 40 mestieri, gli artigiani della tua zona. No SMS, no P.IVA, no "pubblica ora".
 */
window.CUES = {
  name: "manuvo-mestieri-reale",
  title: "Manuvo · I mestieri, davvero",
  width: 1080,
  height: 1920,
  duration: 20.0, // 12 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // the owner adds trending audio per platform (BRAND.md)
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 },
  clip: { src: "assets/clip.mp4", duration: 15.0417, cuts: [0, 3.35, 7.2, 11.45] },
  scenes: [
    { name: "01 Idraulico", from: [1, 1], to: [3, 1], what: "real footage: a plumber's hands tightening a chrome fitting under a sink. Hook over a top scrim: IN CASA C'È / SEMPRE QUALCOSA. Trade label low: Idraulico." },
    { name: "02 Elettricista", from: [3, 1], to: [5, 2], what: "real footage: an electrician's hands wiring a wall socket. Trade label low: Elettricista." },
    { name: "03 Imbianchino", from: [5, 2], to: [7, 4], what: "real footage: a roller laying fresh white paint. Trade label low: Imbianchino." },
    { name: "04 Falegname", from: [7, 4], to: [10, 1], what: "real footage: a carpenter sanding a door frame. Trade label low: Falegname. Then the message lands on the top scrim: 40 MESTIERI. / Tutti della tua zona." },
    { name: "05 Manuvo", from: [10, 1], to: [13, 1], what: "coral. Particles converge into the Manuvo logo, bloom, lockup. Pubblichi gratis, senza registrarti. · PRESTO A RIMINI · @manuvo.it" },
  ],
  events: [
    { at: [1, 1], what: "the clip opens on the plumber's hands (already moving on frame 0)" },
    { at: [1, 2], what: "IN CASA C'È slams on the top scrim", sfx: "tick", volume: 0.3 },
    { at: [1, 3], what: "SEMPRE QUALCOSA. slams", sfx: "tick", volume: 0.3 },
    { at: [1, 4], what: "Idraulico rises low in frame", sfx: "pop", volume: 0.24 },
    { at: [2, 3], what: "the hook leaves" },
    { at: [3, 1], what: "cut in the footage: the electrician", sfx: "pop", volume: 0.26 },
    { at: [3, 2], what: "Elettricista rises" },
    { at: [4, 1], what: "the footage carries this bar alone: the electrician keeps working, no new type" },
    { at: [5, 2], what: "cut in the footage: the painter", sfx: "pop", volume: 0.26 },
    { at: [5, 3], what: "Imbianchino rises" },
    { at: [6, 1], what: "the footage carries this bar alone: the roller keeps laying paint, no new type" },
    { at: [7, 4], what: "cut in the footage: the carpenter", sfx: "pop", volume: 0.26 },
    { at: [8, 1], what: "Falegname rises" },
    { at: [8, 2], what: "40 MESTIERI. slams on the top scrim", sfx: "thud", volume: 0.35 },
    { at: [8, 4], what: "Tutti della tua zona. rises under it", sfx: "tick", volume: 0.26 },
    { at: [9, 4], what: "the labels and the message leave" },
    { at: [10, 1], what: "coral iris · particles converge into the logo", sfx: "whoosh", volume: 0.3 },
    { at: [10, 3], what: "the logo turns solid, bloom, shockwave", sfx: "chime", volume: 0.4 },
    { at: [10, 4], what: "Pubblichi gratis, senza registrarti." , sfx: "tick", volume: 0.28 },
    { at: [11, 2], what: "PRESTO A RIMINI", sfx: "tick", volume: 0.3 },
    { at: [11, 4], what: "@manuvo.it", sfx: "pop", volume: 0.3 },
    { at: [12, 2], what: "hold the lockup to the end" },
  ],
};
