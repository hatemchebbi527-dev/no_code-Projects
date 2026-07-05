// =====================================================================
// Contenu du site AutomaIA — édite les textes ici, sans toucher au code.
// Tout est en italien (voir agence-ia/marque/brand_voice.md).
// =====================================================================

export const brand = {
  name: "AutomaIA",
  tagline: "Automazione e IA per studi legali e di commercialisti",
  email: "info@automa-ia.net",
  domain: "automa-ia.net",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi sono", href: "/chi-sono" },
  { label: "Contatti", href: "/contatti" },
];

export const home = {
  hero: {
    title: "Lo studio che recupera fino a 10 ore a settimana",
    subtitle:
      "Automatizzo le attività ripetitive di avvocati e commercialisti. Meno burocrazia, più tempo per i Suoi clienti e per il lavoro che conta davvero. I Suoi dati restano sempre protetti.",
    cta: { label: "Prenoti un audit gratuito", href: "/contatti" },
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
      "Promemoria delle scadenze. Solleciti per i documenti mancanti. Le stesse domande dei clienti, ogni giorno. Appuntamenti da fissare a mano. Sono attività necessarie, ma ripetitive. E sommate, valgono ore preziose ogni settimana, che tolgono tempo a ciò che conta: i Suoi clienti e le Sue pratiche.",
  },
  offerteTeaser: {
    title: "Il Suo studio si occupa da solo delle attività ripetitive",
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
    text: "In 20 minuti, gratuitamente, individuiamo la prima automazione utile per il Suo studio.",
    cta: { label: "Prenoti il Suo audit gratuito", href: "/contatti" },
  },
};

export const servizi = {
  intro: {
    title: "I servizi di AutomaIA",
    text:
      "Soluzioni su misura per avvocati e commercialisti. Si parte dall'attività che Le ruba più tempo, in totale sicurezza.",
  },
  offerte: [
    {
      nome: "Studio Automatizzato",
      evidenza: true,
      badge: "Più richiesto",
      perche: "Per lo studio sommerso dalle attività amministrative ripetitive.",
      include: [
        "Appuntamenti e promemoria automatici",
        "Solleciti automatici ai clienti",
        "Assistente FAQ attivo 24/7",
        "Dati sempre protetti",
      ],
      prezzo: "Su misura",
      nota: "Setup iniziale + abbonamento mensile",
      cta: { label: "Prenoti un audit gratuito", href: "/contatti" },
    },
    {
      nome: "Studio 360",
      evidenza: false,
      perche: "Per chi vuole organizzare tutto, dall'amministrazione ai clienti.",
      include: [
        "Tutto di Studio Automatizzato",
        "CRM su misura per i Suoi clienti",
        "Presenza online inclusa",
        "Ottimizzazione continua",
      ],
      prezzo: "Su misura",
      nota: "Setup iniziale + abbonamento mensile",
      cta: { label: "Parliamo del Suo studio", href: "/contatti" },
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
      cta: { label: "Lo aggiunga al Suo studio", href: "/contatti" },
    },
  ],
};

export const chiSono = {
  title: "Chi sono e come lavoro",
  intro:
    "Sono il fondatore di AutomaIA. Aiuto gli studi professionali a liberarsi dalle attività ripetitive che rubano tempo, così possono concentrarsi sul loro vero lavoro. Niente gergo tecnico, niente promesse magiche: soluzioni concrete e su misura.",
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
    "Soluzioni su misura per gli studi professionali, non pacchetti generici.",
    "Nessun impegno fino a quando non vede il valore con i Suoi occhi.",
  ],
};

export const contatti = {
  title: "Prenoti il Suo audit gratuito",
  text:
    "In 20 minuti individuiamo la prima automazione utile per il Suo studio. Compili il modulo, La ricontatto io.",
  successo: "Grazie! Ho ricevuto la Sua richiesta, La ricontatto a breve.",
  errore: "Qualcosa è andato storto. Riprovi o scriva direttamente a info@automa-ia.net.",
};
