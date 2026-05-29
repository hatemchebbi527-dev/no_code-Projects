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
  description: string;
  tags: string[];
  href?: string;
};

// Sostituisci questi esempi con i tuoi progetti reali man mano.
export const projects: Project[] = [
  {
    title: "Automazione degli appuntamenti",
    category: "Automazione",
    description:
      "Workflow n8n che sincronizza le prenotazioni tra un modulo, un calendario e un CRM, con promemoria automatici via email.",
    tags: ["n8n", "Google Calendar", "Email"],
  },
  {
    title: "Assistente IA per il supporto clienti",
    category: "IA",
    description:
      "Chatbot collegato a una base di conoscenza che risponde alle domande frequenti e passa a un operatore umano quando serve.",
    tags: ["IA", "RAG", "API"],
  },
  {
    title: "Sito vetrina + prenotazioni",
    category: "Web",
    description:
      "Sito moderno e veloce per un'azienda locale, con modulo di prenotazione integrato e ottimizzazione SEO.",
    tags: ["Next.js", "Tailwind", "SEO"],
  },
  {
    title: "Pipeline di elaborazione documenti",
    category: "Automazione",
    description:
      "Estrazione automatica dei dati da fatture e preventivi, classificazione e invio a uno strumento di contabilità.",
    tags: ["IA", "OCR", "n8n"],
  },
];
