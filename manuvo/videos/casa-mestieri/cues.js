/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, place-audio,
 * stills, render). Scene code never holds a literal time: it asks b(bar, beat).
 * `at` / `from` / `to` are [bar, beat, fraction] on the grid, or seconds.
 *
 * Manuvo, "Una casa, 40 mestieri" (warm-up, pillar 3: mestieri / cas concrets).
 * 11 bars at 144 BPM = 18.333 s, close to the 18 s reference the owner gave.
 *
 * The spine is a progression of counts: ONE point on a house, then SIX problems
 * lighting up one per beat with their trade, then the FORTY trades as a field,
 * then THREE artisans. 1 → 6 → 40 → 3.
 *
 * Audience: privati (pillar 3). Claims allowed in Phase 0: free for privati,
 * no registration, artisans of the zone contact you, up to 3 quotes.
 * Forbidden: SMS verification (Twilio not live), P.IVA, any promise of volume,
 * "pubblica ora" / "siamo online", and any before/after that would imply a job
 * Manuvo has actually delivered.
 */
window.CUES = {
  name: "manuvo-casa-mestieri",
  title: "Manuvo · Una casa, 40 mestieri",
  width: 1080,
  height: 1920,
  duration: 18.3333, // 11 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // the owner adds trending audio per platform (BRAND.md); sfx stay quiet
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 },
  scenes: [
    { name: "01 La casa", from: [1, 1], to: [3, 1], what: "ink. A house in section turns out of the dark, windows warming one by one; a single coral point pulses on it. IN CASA C'È / SEMPRE QUALCOSA." },
    { name: "02 I problemi", from: [3, 1], to: [6, 1], what: "ink, camera pushing in. Six coral markers light up on the house, one per half bar, each naming its trade: IDRAULICO · ELETTRICISTA · IMBIANCHINO · CALDAIA · FABBRO · GIARDINAGGIO." },
    { name: "03 Quaranta", from: [6, 1], to: [8, 1], what: "coral flip. The markers tear off the house and become a field of 40 cream hexagons filling the frame. 40 MESTIERI." },
    { name: "04 Come funziona", from: [8, 1], to: [10, 1], what: "coral then cream. The field collapses to three tokens. PUBBLICHI GRATIS. → TI CONTATTANO LORO. → FINO A 3 PREVENTIVI." },
    { name: "05 Manuvo", from: [10, 1], to: [12, 1], what: "coral. Particles converge into the Manuvo logo, bloom, lockup. PRESTO A RIMINI · @manuvo.it" },
  ],
  events: [
    { at: [1, 1], what: "the house turns out of the dark (already moving on frame 0)", sfx: "thud", volume: 0.3 },
    { at: [1, 2], what: "first windows warm up", sfx: "tick", volume: 0.25 },
    { at: [1, 3], what: "camera cut, more windows" },
    { at: [1, 4], what: "the coral point lands on the house", sfx: "pop", volume: 0.3 },
    { at: [2, 1], what: "IN CASA C'È slams", sfx: "tick", volume: 0.3 },
    { at: [2, 2], what: "SEMPRE QUALCOSA. slams", sfx: "tick", volume: 0.3 },
    { at: [2, 3], what: "camera cut, the point pulses" },
    { at: [3, 1], what: "marker 1 · IDRAULICO", sfx: "pop", volume: 0.32 },
    { at: [3, 3], what: "marker 2 · ELETTRICISTA, camera cut", sfx: "pop", volume: 0.3 },
    { at: [4, 1], what: "marker 3 · IMBIANCHINO", sfx: "pop", volume: 0.3 },
    { at: [4, 3], what: "marker 4 · CALDAIA, camera cut", sfx: "pop", volume: 0.28 },
    { at: [5, 1], what: "marker 5 · FABBRO", sfx: "pop", volume: 0.28 },
    { at: [5, 3], what: "marker 6 · GIARDINAGGIO, camera pulls back", sfx: "pop", volume: 0.26 },
    { at: [5, 4, 0.5], what: "half a beat of silence before the flip" },
    { at: [6, 1], what: "FLIP coral · the markers tear off and multiply into 40 hexagons", sfx: "whoosh", volume: 0.4 },
    { at: [6, 3], what: "the field settles, camera cut" },
    { at: [7, 1], what: "40 MESTIERI. slams", sfx: "thud", volume: 0.4 },
    { at: [7, 3], what: "the field breathes, camera cut" },
    { at: [8, 1], what: "the field collapses to three tokens · PUBBLICHI GRATIS.", sfx: "whoosh", volume: 0.3 },
    { at: [8, 3], what: "TI CONTATTANO LORO. · camera cut", sfx: "tick", volume: 0.3 },
    { at: [9, 1], what: "cream flood · FINO A 3 PREVENTIVI. · the three tokens line up", sfx: "chime", volume: 0.35 },
    { at: [9, 3], what: "the three tokens turn a sixth together" },
    { at: [9, 4, 0.5], what: "coral iris from the middle token", sfx: "whoosh", volume: 0.25 },
    { at: [10, 1], what: "particles converge into the logo" },
    { at: [10, 3], what: "the logo turns solid, bloom, shockwave", sfx: "chime", volume: 0.4 },
    { at: [10, 4], what: "PRESTO A RIMINI", sfx: "tick", volume: 0.3 },
    { at: [11, 2], what: "@manuvo.it", sfx: "pop", volume: 0.3 },
    { at: [11, 4], what: "hold the lockup to the end" },
  ],
};
