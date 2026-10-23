/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, stills, render).
 * Scene code never holds a literal time: it asks b(bar, beat).
 *
 * Manuvo, "Story quiz: l'artigiano piu difficile" REAL version. A Kling-
 * generated plate of a woman in a Rimini street carries the film full bleed;
 * the Manuvo type is burned in over it and the coral lockup closes.
 * 6 bars at 144 BPM = 10.000 s. SILENT on purpose.
 */
window.CUES = {
  name: "manuvo-story-quiz-artigiani-reale",
  title: "Manuvo · Story quiz reale: l'artigiano piu difficile",
  width: 1080,
  height: 1920,
  duration: 10.0, // 6 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // silent by design: Instagram library audio is added on posting
  sfx: null,
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 social (reference/social.md)
  // Full bleed plate, so the quiz sticker lands ON the footage (owner's choice,
  // 2026-10-23). Nothing is burned in this band and the plate is dimmed there
  // so the sticker detaches; the handle pill sits below it.
  sticker: { top: 1020, bottom: 1620 },
  plate: { file: "assets/video/plate.mp4", note: "Kling kling-video-v3_0_turbo, 9:16 1080p, 10 s, muted" },
  scenes: [
    { name: "01 Lo sguardo", from: [1, 1], to: [2, 1], what: "The plate is already pushing in on her face; she holds eye contact. SECONDO TE slams in ink over the bright sky, on a cream scrim that keeps it readable" },
    { name: "02 La domanda", from: [2, 1], to: [3, 1], what: "QUAL È then L'ARTIGIANO slam one per two beats, the plate steps closer on each" },
    { name: "03 Piu difficile", from: [3, 1], to: [4, 1], what: "PIÙ DIFFICILE then DA TROVARE slam, one shake on the first; the push keeps going" },
    { name: "04 A Rimini?", from: [4, 1], to: [5, 1], what: "A coral slab floods in behind the headline and A RIMINI? slams giant in ink on it, one shockwave: the brand colour lands on the footage" },
    { name: "05 Vota", from: [5, 1], to: [5, 3], what: "The slab leaves, the two-line question recap lands in ink and holds, then the CTA VOTA QUI SOTTO E SCRIVIMI PERCHÉ" },
    { name: "06 Manuvo", from: [5, 3], to: [6, 5], what: "Coral floods over the plate; the extruded logo mark rises and lands with the sixth of a turn, one shockwave, @manuvo.it pill below the sticker band. Held 2.5 s for the vote" },
  ],
  events: [
    { at: [1, 1], what: "SECONDO TE slams · the plate is already moving on frame 0" },
    { at: [1, 3], what: "the plate steps closer (a cut every 2 beats)" },
    { at: [2, 1], what: "QUAL È slams · plate step" },
    { at: [2, 3], what: "L'ARTIGIANO slams · plate step" },
    { at: [3, 1], what: "PIÙ DIFFICILE slams · shake · plate step" },
    { at: [3, 3], what: "DA TROVARE slams · plate step" },
    { at: [4, 1], what: "the coral slab floods down behind the headline · A RIMINI? slams giant in ink · shockwave" },
    { at: [4, 3], what: "plate step, the slab holds" },
    { at: [5, 1], what: "the slab leaves upward · the question recap lands in two ink lines and never moves again" },
    { at: [5, 2], what: "CTA VOTA QUI SOTTO E SCRIVIMI PERCHÉ slams" },
    { at: [5, 3], what: "FLIP coral: the flood covers the plate, the logo mark rises in the middle" },
    { at: [6, 1], what: "the logo lands with the sixth of a turn, one shockwave · @manuvo.it pill in" },
    { at: [6, 2], what: "held to the end: nothing moves but the grain (the quiz is voted here)" },
  ],
};
