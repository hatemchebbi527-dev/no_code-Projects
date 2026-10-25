/*
 * cues.js: the beat sheet as data. Scene code never holds a literal time.
 *
 * Manuvo, "Coulisses: Chi siamo" (Phase 0, pilier confiance).
 * 15 bars at 144 BPM = 25.000 s: 12 bars of footage (20 s) + 3 bars of lockup.
 *
 * AUDIENCE: privati et artigiani. Le post présente le fondateur et l'histoire
 * derrière Manuvo, pour construire la confiance avant le lancement.
 *
 * RÈGLE QUI GOUVERNE LE FILM : on ne voit jamais le fondateur prononcer les mots.
 * Il travaille, on voit ses mains et son écran, sa voix est en off. Raison double :
 * c'est plus crédible, et aucun outil de synchronisation labiale fiable n'est
 * disponible (le connecteur Kling n'en expose pas).
 *
 * ÉTAT : les quatre plans sont des PLACEHOLDERS en attendant les médias. Chacun
 * sera remplacé par un <video> enfant direct de la racine (voir PROMPT.md).
 *   shot1  → Kling, le fondateur au travail, de dos/trois-quarts (10 s)
 *   shot2  → Kling, gros plan des mains et du carnet (10 s)
 *   shot3  → RÉEL, capture d'écran de manuvo.automa-ia.net (10 s) — le plan le
 *            plus important du film : la seule preuve authentique du produit
 *   shot4  → images de Rimini du propriétaire, sinon Kling
 *
 * Les temps des sous-titres sont PROVISOIRES : ils seront recalés sur la voix
 * off réelle du fondateur une fois l'enregistrement reçu.
 *
 * CLAIMS. La légende du post est conservée mot pour mot à la demande du
 * propriétaire, y compris « artigiani verificati ». Dans l'app, ce badge exige
 * P.IVA + avis clients, donc personne ne le portera au lancement. Conséquence
 * appliquée ici : tout le texte à l'écran parle du projet AU FUTUR. Interdits :
 * verifica SMS (Twilio pas en prod), P.IVA registrata, prix, délai, "pubblica ora".
 */
window.CUES = {
  name: "manuvo-fondatore-chisiamo",
  title: "Manuvo · Chi siamo",
  width: 1080,
  height: 1920,
  duration: 25.0, // 15 bars at 144 BPM
  grid: { bpm: 144, firstBeat: 0, pickupBeats: 0, beatsPerBar: 4 },
  music: null, // la voix off du fondateur porte le film; le son tendance s'ajoute par plateforme
  sfx: { dir: "assets/audio/sfx", peaks: "assets/audio/sfx/peaks.json" },
  safe: { top: 250, bottom: 420, left: 60, right: 120 },
  // Chaque plan dure 3 mesures (5 s). Remplacer `placeholder` par le fichier reçu.
  shots: [
    { id: "shot1", from: [1, 1], to: [4, 1], source: "kling", placeholder: true, what: "le fondateur s'assoit et ouvre un carnet, de dos/trois-quarts" },
    { id: "shot2", from: [4, 1], to: [7, 1], source: "kling", placeholder: true, what: "gros plan des mains, il écrit et barre une ligne" },
    { id: "shot3", from: [7, 1], to: [10, 1], source: "real", placeholder: true, what: "capture d'écran du vrai site Manuvo" },
    { id: "shot4", from: [10, 1], to: [13, 1], source: "owner-or-kling", placeholder: true, what: "Rimini, rue résidentielle en fin d'après-midi" },
  ],
  scenes: [
    { name: "01 Il fondatore", from: [1, 1], to: [4, 1], what: "Il s'assoit, ouvre un carnet. Sous-titre 1 : Ciao, sono il fondatore di Manuvo." },
    { name: "02 Il problema", from: [4, 1], to: [7, 1], what: "Ses mains écrivent une liste, barrent une ligne. Sous-titre 2 : Sto costruendo una piattaforma per trovare artigiani verificati a Rimini," },
    { name: "03 La piattaforma", from: [7, 1], to: [10, 1], what: "L'écran réel de Manuvo. Sous-titre 3 : perché ho vissuto il problema sulla mia pelle." },
    { name: "04 Rimini", from: [10, 1], to: [13, 1], what: "La ville. Sous-titre 4 : Stiamo per lanciare. Seguici per scoprire di più." },
    { name: "05 Manuvo", from: [13, 1], to: [16, 1], what: "coral. Les particules convergent vers le logo, lockup. STIAMO PER LANCIARE · @manuvo.it" },
  ],
  events: [
    { at: [1, 1], what: "ouverture sur le fondateur, déjà en mouvement" },
    { at: [1, 3], what: "sous-titre 1 apparaît" },
    { at: [2, 1], what: "le plan vit seul : il ouvre le quaderno, la camera derive" },
    { at: [3, 4], what: "le sous-titre 1 part" },
    { at: [4, 1], what: "coupe : les mains et le carnet", sfx: "pop", volume: 0.22 },
    { at: [4, 2], what: "sous-titre 2 apparaît" },
    { at: [5, 1], what: "le plan vit seul, il écrit" },
    { at: [6, 4], what: "le sous-titre 2 part" },
    { at: [7, 1], what: "coupe : l'écran réel de Manuvo", sfx: "pop", volume: 0.22 },
    { at: [7, 2], what: "sous-titre 3 apparaît" },
    { at: [8, 1], what: "le plan vit seul, l'écran défile" },
    { at: [9, 4], what: "le sous-titre 3 part" },
    { at: [10, 1], what: "coupe : Rimini", sfx: "pop", volume: 0.22 },
    { at: [10, 2], what: "sous-titre 4 apparaît" },
    { at: [11, 1], what: "le plan vit seul, panoramique sur la ville" },
    { at: [12, 4], what: "le sous-titre 4 part" },
    { at: [13, 1], what: "iris corail, les particules convergent vers le logo", sfx: "whoosh", volume: 0.3 },
    { at: [13, 3], what: "le logo devient solide, bloom, onde de choc", sfx: "chime", volume: 0.38 },
    { at: [14, 1], what: "STIAMO PER LANCIARE", sfx: "tick", volume: 0.28 },
    { at: [14, 3], what: "@manuvo.it", sfx: "pop", volume: 0.28 },
    { at: [15, 2], what: "le lockup tient jusqu'à la fin" },
  ],
};
