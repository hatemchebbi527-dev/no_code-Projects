// =====================================================================
// Contenu du site AutomaIA — édite les textes ici, sans toucher au code.
// Tout est en italien (voir agence-ia/marque/brand_voice.md).
// =====================================================================

export const brand = {
  name: "AutomaIA",
  tagline: "Automazione e IA per agenzie immobiliari, centri estetici e palestre",
  email: "info@automa-ia.net",
  domain: "automa-ia.net",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Centri & Palestre", href: "/cliniche" },
  { label: "Chi sono", href: "/chi-sono" },
  { label: "Contatti", href: "/contatti" },
];

export const home = {
  hero: {
    title: "La Sua attività recupera fino a 10 ore a settimana",
    subtitle:
      "Automatizzo le attività ripetitive di agenzie immobiliari, centri estetici e palestre. Meno gestione manuale, più tempo per i Suoi clienti e per il lavoro che conta davvero. I Suoi dati restano sempre protetti.",
    cta: { label: "Prenoti un audit gratuito", href: "/audit" },
  },
  stats: [
    { value: 10, suffix: "", label: "ore a settimana che può recuperare" },
    { value: 24, suffix: "/7", label: "assistente sempre attivo" },
    { value: 20, suffix: " min", label: "audit gratuito, senza impegno" },
    { value: 100, suffix: "%", label: "dati protetti e sotto il Suo controllo" },
  ],
  problema: {
    title: "Quante ore perde ogni settimana in attività che non richiedono la Sua competenza?",
    text:
      "Richieste di informazioni. Appuntamenti da confermare a mano. Le stesse domande dei clienti, ogni giorno. Promemoria che nessuno invia. Sono attività necessarie, ma ripetitive. E sommate, valgono ore preziose ogni settimana, che tolgono tempo a ciò che conta: i Suoi clienti e la Sua attività.",
  },
  offerteTeaser: {
    title: "La Sua attività si occupa da sola delle attività ripetitive",
    intro: "Creo automazioni su misura. Lei non tocca nulla di tecnico: usa solo il risultato.",
    items: [
      {
        title: "Appuntamenti e promemoria automatici",
        text: "Prenotazioni, promemoria e solleciti partono da soli. Niente più dimenticanze.",
      },
      {
        title: "Risposte automatiche alle domande ricorrenti",
        text: "Un assistente risponde 24/7 alle solite richieste, con le informazioni che Lei decide.",
      },
      {
        title: "Organizzazione e dati al sicuro",
        text: "Tutto raccolto in un unico posto. I Suoi dati restano protetti e sotto il Suo controllo.",
      },
    ],
    cta: { label: "Scopri i servizi", href: "/servizi" },
  },
  metodoTeaser: {
    title: "Un metodo semplice, senza rischi",
    text:
      "Si parte sempre da un audit gratuito di 20 minuti: insieme individuiamo dove perde più tempo, prima di qualsiasi impegno. Poi metto in piedi l'automazione, la testo, e Le mostro come funziona. Lei resta sempre al comando.",
    cta: { label: "Come lavoro", href: "/chi-sono" },
  },
  ctaFinale: {
    title: "Scopra quante ore può recuperare",
    text: "In 20 minuti, gratuitamente, individuiamo la prima automazione utile per la Sua attività.",
    cta: { label: "Prenoti il Suo audit gratuito", href: "/audit" },
  },
};

export const servizi = {
  intro: {
    title: "I servizi di AutomaIA",
    text:
      "Soluzioni su misura per agenzie immobiliari, centri estetici e palestre. Si parte dall'attività che Le ruba più tempo, in totale sicurezza.",
  },
  offerte: [
    {
      nome: "Attività Automatizzata",
      evidenza: true,
      badge: "Più richiesto",
      perche: "Per l'attività sommersa dalla gestione manuale e dalle richieste ripetitive.",
      include: [
        "Appuntamenti e promemoria automatici",
        "Solleciti automatici ai clienti",
        "Assistente FAQ attivo 24/7",
        "Dati sempre protetti",
      ],
      prezzo: "Su misura",
      nota: "Setup iniziale + abbonamento mensile",
      cta: { label: "Prenoti un audit gratuito", href: "/audit" },
    },
    {
      nome: "Attività 360",
      evidenza: false,
      perche: "Per chi vuole organizzare tutto, dalla gestione clienti alla presenza online.",
      include: [
        "Tutto di Attività Automatizzata",
        "CRM su misura per i Suoi clienti",
        "Presenza online inclusa",
        "Ottimizzazione continua",
      ],
      prezzo: "Su misura",
      nota: "Setup iniziale + abbonamento mensile",
      cta: { label: "Parliamo del Suo studio", href: "/audit" },
    },
    {
      nome: "Presenza Online",
      evidenza: false,
      perche: "Per chi vuole curare anche la propria visibilità.",
      include: [
        "Sito vetrina professionale",
        "Pubblicazione automatica sui social",
        "Modulo di contatto collegato",
      ],
      prezzo: "Su misura",
      nota: "Complemento a la carte",
      cta: { label: "Lo aggiunga al Suo studio", href: "/audit" },
    },
  ],
};

export const chiSono = {
  title: "Chi sono e come lavoro",
  intro:
    "Sono il fondatore di AutomaIA. Aiuto agenzie immobiliari, centri estetici e palestre a liberarsi dalle attività ripetitive che rubano tempo, così possono concentrarsi sul loro vero lavoro. Niente gergo tecnico, niente promesse magiche: soluzioni concrete e su misura.",
  metodoTitle: "Il metodo, in 3 passi",
  metodo: [
    {
      step: "1",
      title: "Audit gratuito (20 minuti)",
      text: "Individuiamo insieme dove perde più tempo. Nessun impegno.",
    },
    {
      step: "2",
      title: "Automazione su misura",
      text: "Metto in piedi la soluzione, la testo e Le mostro come funziona.",
    },
    {
      step: "3",
      title: "Lei resta al comando",
      text: "Usa solo il risultato. I Suoi dati restano protetti e sotto il Suo controllo.",
    },
  ],
  fiduciaTitle: "Perché fidarsi",
  fiducia: [
    "Riservatezza al primo posto: i Suoi dati restano Suoi.",
    "Soluzioni su misura per la Sua attività, non pacchetti generici.",
    "Nessun impegno fino a quando non vede il valore con i Suoi occhi.",
  ],
};

export const contatti = {
  title: "Ha una domanda?",
  text:
    "Compili il modulo oppure scriva direttamente a info@automa-ia.net. La rispondo entro 24 ore. Per prenotare un audit gratuito usi invece la pagina dedicata.",
  successo: "Grazie! Ho ricevuto il Suo messaggio, La rispondo a breve.",
  errore: "Qualcosa è andato storto. Riprovi o scriva direttamente a info@automa-ia.net.",
};

export const cliniche = {
  hero: {
    eyebrow: "Centri estetici e palestre",
    title: "La Sua attività lavora anche fuori orario",
    subtitle:
      "Prenotazioni, promemoria e prime risposte ai clienti, in automatico. Lei si concentra sui trattamenti e sugli allenamenti, non sul telefono. I Suoi dati restano sempre protetti.",
    cta: { label: "Prenoti un audit gratuito", href: "/audit" },
  },
  problema: {
    title: "Ogni giorno il Suo centro perde richieste e appuntamenti, senza accorgersene",
    items: [
      { title: "Richieste fuori orario", text: "Molte richieste arrivano la sera o nel weekend, quando il centro è chiuso. Senza risposta automatica, il cliente prenota altrove." },
      { title: "Appuntamenti mancati", text: "Nel settore circa il 15% degli appuntamenti salta senza preavviso. Ogni assenza è tempo e incasso persi." },
      { title: "Le stesse domande ogni giorno", text: "Prezzi, disponibilità, durata dei trattamenti: le stesse domande ripetute che rubano ore alla reception." },
    ],
  },
  soluzione: {
    title: "AutomaIA se ne occupa al posto Suo",
    intro: "Creo automazioni su misura per il Suo centro. Lei non tocca nulla di tecnico: usa solo il risultato.",
    items: [
      { title: "Prenotazione sempre attiva", text: "I clienti fissano l'appuntamento da soli, a qualsiasi ora. Lei ritrova l'agenda già compilata." },
      { title: "Promemoria automatici", text: "Un promemoria via SMS ed email prima di ogni appuntamento. Le assenze scendono quasi a zero." },
      { title: "Assistente FAQ 24/7", text: "Un assistente risponde alle domande ricorrenti su prezzi, disponibilità e servizi, 24 ore su 24." },
    ],
  },
  esempio: {
    title: "Un esempio concreto",
    text: "Un centro estetico con reception attiva solo di mattina perdeva tutte le richieste del pomeriggio e del weekend. Con la prenotazione online e i promemoria automatici, le assenze sono scese del 60% e la reception gestisce il doppio dei clienti.",
  },
  ctaFinale: {
    title: "Scopra quanti appuntamenti può recuperare",
    text: "In 20 minuti, gratuitamente, individuiamo la prima automazione utile per il Suo centro.",
    cta: { label: "Prenoti il Suo audit gratuito", href: "/audit" },
  },
};
