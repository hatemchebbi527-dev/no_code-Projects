/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, stills, render).
 * Scene code never holds a literal time: it asks b(bar, beat).
 *
 * Manuvo, "Story quiz: l'artigiano piu difficile" (warm-up, Instagram Story
 * quiz card). 7 bars at 140 BPM = 12.000 s. SILENT on purpose: the owner adds
 * a track from the Instagram library, so no music and no sfx in the master.
 */
window.CUES = {
  name: "manuvo-story-quiz-artigiani",
  title: "Manuvo · Story quiz: l'artigiano piu difficile",
  width: 1080,
  height: 1920,
  duration: 12.0, // 7 bars at 140 BPM
  grid: { bpm: 140, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // silent by design: Instagram library audio is added on posting
  sfx: null,
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  // The owner drops the Instagram quiz sticker (question + 4 options) in this
  // band, so nothing is drawn or moved there for the whole film: no type, no
  // subject, only flat background colour.
  sticker: { top: 1020, bottom: 1620 },
  scenes: [
    { name: "01 Secondo te", from: [1, 1], to: [3, 1], what: "ink. The coral clay persona finishes turning to camera, a sixth of a turn per beat, and leans in. SECONDO TE, then QUAL È / L'ARTIGIANO slam over the clean top. Four hexagon tokens orbit his head, one lit per beat" },
    { name: "02 Piu difficile", from: [3, 1], to: [4, 1], what: "cream flood up from the persona, shake, one shockwave. He raises his index finger, brows up, mouth open. PIÙ DIFFICILE / DA TROVARE slam giant in ink; the bust turns ink so the coral head stays the one accent" },
    { name: "03 A Rimini?", from: [4, 1], to: [5, 1], what: "hard cut back to ink. A RIMINI? giant in coral. The persona goes full coral against the dark, the tokens keep taking turns, one sixth of a turn each: which one, without answering" },
    { name: "04 Vota", from: [5, 1], to: [6, 1], what: "cream iris from the persona. He drops the hand and points down at the sticker band. The two-line question recap lands in ink and holds, then the CTA VOTA QUI SOTTO E SCRIVIMI PERCHÉ" },
    { name: "05 Manuvo", from: [6, 1], to: [7, 5], what: "coral iris. The persona turns a sixth and shrinks away behind it; the extruded logo mark rises in his slot and lands with the sixth of a turn, bloom, one shockwave; @manuvo.it pill under the band. Last bar fully held for the quiz sticker" },
  ],
  events: [
    { at: [1, 1], what: "the persona lands its sixth of a turn (already turning on frame 0) · SECONDO TE slams · token 1 lights up" },
    { at: [1, 3], what: "camera cut closer · the head turns another sixth · the eyes widen" },
    { at: [2, 1], what: "QUAL È slams · camera cut · the question mark starts drawing itself" },
    { at: [2, 3], what: "L'ARTIGIANO slams · camera cut · the question mark dot lands with its glow" },
    { at: [3, 1], what: "FLIP cream, flood up from the persona · PIÙ DIFFICILE slams giant in ink · shake · shockwave · the index finger goes up, brows up" },
    { at: [3, 3], what: "DA TROVARE slams · camera cut on the raised hand" },
    { at: [4, 1], what: "hard cut back to ink · A RIMINI? slams giant in coral · the lit token turns its sixth" },
    { at: [4, 2], what: "token 2 lights up and turns a sixth · the head tilts" },
    { at: [4, 3], what: "token 3 lights up and turns a sixth · camera cut" },
    { at: [4, 4], what: "token 4 lights up and turns a sixth" },
    { at: [5, 1], what: "FLIP cream, iris from the persona · the question recap lands in two ink lines and never moves again · the hand comes down and points at the band" },
    { at: [5, 3], what: "CTA VOTA QUI SOTTO E SCRIVIMI PERCHÉ slams in ink · the tokens keep taking turns, one per beat" },
    { at: [6, 1], what: "FLIP coral, iris · the persona turns a sixth and shrinks away behind it · the logo mark rises in his slot" },
    { at: [6, 3], what: "the logo lands with the sixth of a turn, bloom, one shockwave · @manuvo.it pill in" },
    { at: [7, 1], what: "held to the end: nothing moves but a slow camera drift and the grain (the quiz is voted here)" },
  ],
};
