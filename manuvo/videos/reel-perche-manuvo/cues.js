/*
 * cues.js: the beat sheet as data. The composition reads it in the browser
 * (window.CUES) and the scripts read it in Node (beat-sheet, stills, render).
 * Scene code never holds a literal time: it asks b(bar, beat).
 *
 * Manuvo, "Perche sto costruendo Manuvo" (Instagram Reel, founder story).
 * Three Kling POV plates carry the film; no face is ever shown, so no
 * generated likeness stands in for Hatem or for his mother.
 * 9 bars at 144 BPM = 15.000 s. SILENT on purpose (owner, 2026-10-24):
 * no bed and no effects, the Instagram library track is added on posting.
 */
window.CUES = {
  name: "manuvo-reel-perche-manuvo",
  title: "Manuvo · Perche sto costruendo Manuvo",
  width: 1080,
  height: 1920,
  duration: 15.0, // 9 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // silent by design: Instagram library audio is added on posting
  sfx: null,
  safe: { top: 250, bottom: 420, left: 60, right: 120 }, // 9:16 Reel (reference/social.md)
  // Three POV plates, no face in any of them (owner's choice, 2026-10-24).
  // Four cut segments, no face in any of them (owner's choice, 2026-10-24).
  // Shot B's light actually comes on at 4.0 s in the raw clip, which would
  // contradict the story, so only its dark part is used and the film returns
  // to the phone for "nessuna risposta".
  plates: [
    { file: "assets/video/seg1.mp4", from: [1, 1], to: [3, 1], what: "shot A, 0 to 3.4 s: a hand, a phone, a dim stairwell, the call that goes nowhere" },
    { file: "assets/video/seg2.mp4", from: [3, 1], to: [5, 1], what: "shot B, 0 to 3.45 s: an older woman's hand flicks a dead light switch, the kitchen stays dark" },
    { file: "assets/video/seg3.mp4", from: [5, 1], to: [6, 1], what: "shot A again, 3.3 to 5.0 s: the hand lowers the phone" },
    { file: "assets/video/seg4.mp4", from: [6, 1], to: [8, 3], what: "shot C, 0 to 4.25 s: out into a Rimini street at blue hour, the camera tilts up to the sky" },
  ],
  scenes: [
    { name: "01 Due ore", from: [1, 1], to: [3, 1], what: "Shot A. The hand lifts the phone and lowers it. 2 ORE slams, then PER TROVARE / UN ELETTRICISTA" },
    { name: "02 Mia madre", from: [3, 1], to: [4, 1], what: "Hard cut to shot B, the dark kitchen. PER MIA MADRE, in coral: it is the reason, not the detail" },
    { name: "03 Numeri falsi", from: [4, 1], to: [5, 1], what: "The switch flicks and nothing happens. NUMERI FALSI slams giant on an impact, one shake, one shockwave" },
    { name: "04 Nessuna risposta", from: [5, 1], to: [6, 1], what: "Back to the phone: the hand lowers it. NESSUNA / RISPOSTA holds alone" },
    { name: "05 Il respiro", from: [6, 1], to: [7, 1], what: "Hard cut to shot C: the doorway, the street, the camera starts to tilt up. No type at all, one bar of air: the film breathes before the turn" },
    { name: "06 Un modo migliore", from: [7, 1], to: [8, 3], what: "The tilt reaches the sky. DEVE ESSERCI / UN MODO MIGLIORE slams in cream" },
    { name: "07 Manuvo", from: [8, 3], to: [9, 5], what: "Coral floods up; the extruded logo mark lands with the sixth of a turn, SEGUICI @manuvo.it, held to the end" },
  ],
  events: [
    { at: [1, 1], what: "the plate is already moving · 2 ORE slams" },
    { at: [2, 1], what: "PER TROVARE slams" },
    { at: [2, 3], what: "UN ELETTRICISTA slams" },
    { at: [3, 1], what: "CUT to shot B · PER MIA MADRE slams in coral" },
    { at: [4, 1], what: "NUMERI FALSI slams giant · shake · shockwave" },
    { at: [5, 1], what: "CUT back to the phone · NESSUNA slams · RISPOSTA on beat 3" },
    { at: [6, 1], what: "CUT to shot C · no type, one bar of air" },
    { at: [7, 1], what: "DEVE ESSERCI slams in cream" },
    { at: [7, 3], what: "UN MODO MIGLIORE slams" },
    { at: [8, 3], what: "FLIP coral, flood up · the logo mark rises" },
    { at: [8, 4], what: "SEGUICI and the @manuvo.it pill land together (each closing line needs 2 s on screen)" },
    { at: [9, 1], what: "the logo lands with the sixth of a turn, one shockwave" },
    { at: [9, 2], what: "held to the end: nothing moves but the grain" },
  ],
};
