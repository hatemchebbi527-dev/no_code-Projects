// Tutte le tue informazioni sono centralizzate qui. Modifica questo file per aggiornare il portfolio.

export const profile = {
  name: "Hatem Chebbi",
  role: "Freelance IA & Automazione",
  location: "Rimini, Italia",
  available: true,
  email: "hatemchebbi527@gmail.com",
  greeting: "Ciao, sono",
  tagline:
    "Aiuto le aziende ad automatizzare i processi e a integrare l'intelligenza artificiale nelle loro operazioni.",
  intro:
    "Consulente e sviluppatore freelance in IA. Progetto automazioni su misura, integrazioni di IA e applicazioni web che fanno risparmiare tempo ai team e riducono le attività ripetitive.",
  socials: [
    { label: "Email", href: "mailto:hatemchebbi527@gmail.com" },
    { label: "GitHub", href: "https://github.com/hatemchebbi527-dev" },
    { label: "LinkedIn", href: "#" },
  ],
};

// Bloc de code affiché à droite du Hero (façon "const ... = {}").
export const heroCode = {
  varName: "freelancer",
  lines: [
    { key: "name", value: '"Hatem Chebbi"' },
    { key: "skills", value: '["n8n", "IA", "Next.js", "API"]' },
    { key: "focus", value: '"Automazione dei processi"' },
    { key: "based", value: '"Rimini, Italia"' },
    { key: "status", value: '"Disponibile per progetti"' },
  ],
  call: "freelancer.build();",
};

export const about = {
  paragraphs: [
    "Sono in piena transizione verso l'attività indipendente nel campo dell'IA. Il mio obiettivo: aiutare le PMI e gli imprenditori a sfruttare l'automazione e l'intelligenza artificiale, senza complessità inutili.",
    "Mi formo costantemente sugli strumenti più recenti (automazione no-code, agenti IA, sviluppo web moderno) per offrire soluzioni concrete con un impatto misurabile sul lavoro quotidiano delle aziende.",
    "Il mio approccio è semplice: capire il bisogno reale, consegnare velocemente e iterare. Niente gergo tecnico, solo risultati.",
  ],
  stats: [
    { value: "n8n", label: "Automazione no-code" },
    { value: "IA", label: "Agenti e integrazioni" },
    { value: "Web", label: "Siti e applicazioni" },
  ],
};

export type Service = {
  title: string;
  description: string;
  points: string[];
  icon: "automation" | "ai" | "web" | "consulting";
};

export const services: Service[] = [
  {
    title: "Automazione dei processi",
    description:
      "Workflow n8n su misura per collegare i tuoi strumenti, eliminare le attività manuali e sincronizzare i dati automaticamente.",
    points: ["Workflow n8n", "Integrazioni API", "Sincronizzazione dati"],
    icon: "automation",
  },
  {
    title: "Integrazione dell'IA",
    description:
      "Implementazione di agenti e assistenti IA per il supporto clienti, la redazione, l'elaborazione di documenti e l'analisi.",
    points: ["Assistenti IA", "Elaborazione documenti", "Chatbot e supporto"],
    icon: "ai",
  },
  {
    title: "Sviluppo web e app",
    description:
      "Siti vetrina, landing page e applicazioni web moderne, veloci e orientate alla conversione.",
    points: ["Siti e landing page", "Applicazioni web", "Integrazione IA nel prodotto"],
    icon: "web",
  },
  {
    title: "Consulenza e trasformazione digitale",
    description:
      "Analisi dei tuoi processi e roadmap concreta per integrare l'IA dove ha più impatto.",
    points: ["Analisi dei processi", "Roadmap IA", "Affiancamento"],
    icon: "consulting",
  },
];

export type Project = {
  title: string;
  category: string;
  summary: string; // phrase courte affichée au recto
  description: string; // détail complet affiché au verso
  tags: string[];
  href?: string;
};

// Progetti reali basati sui workflow n8n e sui progetti di Hatem.
export const projects: Project[] = [
  // --- CRM Salone di parrucchieri : 5 workflow ---
  {
    title: "Promemoria appuntamento J-1",
    category: "CRM Salone",
    summary: "Promemoria SMS ed email automatici la vigilia dell'appuntamento.",
    description:
      "Ogni giorno alle 10:00, recupera gli appuntamenti previsti per l'indomani su Airtable e invia un promemoria via SMS (Twilio) e/o email (Gmail) secondo il consenso del cliente, registrando ogni invio.",
    tags: ["n8n", "Airtable", "Twilio", "Gmail"],
  },
  {
    title: "Aggiornamento cliente post-visita",
    category: "CRM Salone",
    summary: "Aggiorna la scheda cliente su Airtable dopo ogni visita.",
    description:
      "Ogni sera alle 20:00, individua gli appuntamenti completati nella giornata e aggiorna automaticamente la scheda del cliente su Airtable (data ultima visita, storico).",
    tags: ["n8n", "Airtable", "Pianificazione"],
  },
  {
    title: "Fidelizzazione J+30",
    category: "CRM Salone",
    summary: "Messaggio di fidelizzazione 30 giorni dopo l'ultima visita.",
    description:
      "Ogni giorno alle 11:00, identifica i clienti a 30 giorni dall'ultima visita e invia un messaggio di fidelizzazione via SMS o email, con tracciamento delle relance.",
    tags: ["n8n", "Twilio", "Gmail"],
  },
  {
    title: "Riattivazione inattivi 60g",
    category: "CRM Salone",
    summary: "Riconquista i clienti inattivi da oltre 60 giorni.",
    description:
      "Ogni lunedì alle 14:00, individua i clienti inattivi da 60 giorni, invia un'email o un SMS di riattivazione e contrassegna il cliente come inattivo nel CRM.",
    tags: ["n8n", "Airtable", "Twilio", "Gmail"],
  },
  {
    title: "Auguri di compleanno",
    category: "CRM Salone",
    summary: "Auguri automatici via SMS o email il giorno del compleanno.",
    description:
      "Ogni giorno alle 9:00, individua i clienti che compiono gli anni e invia automaticamente gli auguri via SMS o email, rafforzando la relazione con il cliente.",
    tags: ["n8n", "Twilio", "Gmail"],
  },

  // --- Altri progetti ---
  {
    title: "WhatsApp Assistant IA",
    category: "IA",
    summary: "Assistente WhatsApp che prenota appuntamenti e gestisce il CRM.",
    description:
      "Assistente conversazionale su WhatsApp con 33 nodi: trascrizione dei messaggi vocali (Whisper), classificazione delle richieste con OpenAI, prenotazione automatica degli appuntamenti su Google Calendar e CRM clienti su Google Sheets.",
    tags: ["n8n", "OpenAI", "WhatsApp", "Google Calendar"],
  },
  {
    title: "Business Coach IA",
    category: "IA",
    summary: "Assistente IA che guida gli imprenditori passo dopo passo.",
    description:
      "Assistente IA che accompagna gli imprenditori: analizza obiettivi, struttura piani d'azione e fornisce consigli personalizzati. Da completare con i dettagli reali del progetto.",
    tags: ["n8n", "IA", "Automazione"],
  },
  {
    title: "UIK — Progetto finale",
    category: "Web",
    summary: "Progetto finale che unisce sviluppo web e automazione.",
    description:
      "Progetto finale che combina sviluppo web e automazione. Da completare con i dettagli reali del progetto.",
    tags: ["Web", "Automazione"],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Freelance IA & Automazione",
    org: "Attività indipendente",
    period: "2025 - Presente",
    points: [
      "Progettazione di automazioni n8n su misura per PMI e attività locali.",
      "Sviluppo di assistenti IA e integrazioni (OpenAI, WhatsApp, Google Workspace).",
    ],
  },
];

export type Achievement = {
  title: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    title: "CRM Salone automatizzato",
    detail: "5 workflow n8n in produzione per la gestione clienti di un salone.",
  },
  {
    title: "Assistente WhatsApp IA",
    detail: "Pipeline conversazionale a 33 nodi con prenotazione automatica.",
  },
  {
    title: "Formazione continua",
    detail: "Specializzazione attiva su agenti IA, n8n e sviluppo web moderno.",
  },
];

export type EducationItem = {
  title: string;
  org: string;
  period: string;
  note?: string;
};

export const education: EducationItem[] = [
  {
    title: "Reconversione professionale in IA",
    org: "Percorso autodidatta e formazione pratica",
    period: "2024 - Presente",
    note: "Automazione no-code, agenti IA, sviluppo full-stack.",
  },
];
