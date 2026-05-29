// Toutes tes infos sont centralisées ici. Modifie ce fichier pour mettre à jour le portfolio.

export const profile = {
  name: "Hatem Chebbi",
  role: "Freelance IA & Automatisation",
  location: "Rimini, Italie",
  available: true,
  email: "hatemchebbi527@gmail.com",
  tagline:
    "J'aide les entreprises à automatiser leurs processus et à intégrer l'intelligence artificielle dans leurs opérations.",
  intro:
    "Consultant et développeur indépendant en IA. Je conçois des automatisations sur mesure, des intégrations d'IA et des applications web qui font gagner du temps aux équipes et réduisent les tâches répétitives.",
  socials: [
    { label: "Email", href: "mailto:hatemchebbi527@gmail.com" },
    { label: "GitHub", href: "https://github.com/hatemchebbi527-dev" },
    { label: "LinkedIn", href: "#" },
  ],
};

export const about = {
  paragraphs: [
    "Je suis en reconversion active vers l'indépendance dans le domaine de l'IA. Mon objectif : aider les PME et les entrepreneurs à tirer parti de l'automatisation et de l'intelligence artificielle, sans complexité inutile.",
    "Je me forme en continu sur les outils les plus récents (automatisation no-code, agents IA, développement web moderne) pour livrer des solutions concrètes qui ont un impact mesurable sur le quotidien des entreprises.",
    "Mon approche est simple : comprendre le besoin réel, livrer vite, et itérer. Pas de jargon, des résultats.",
  ],
  stats: [
    { value: "n8n", label: "Automatisation no-code" },
    { value: "IA", label: "Agents & intégrations" },
    { value: "Web", label: "Sites & applications" },
  ],
};

export const services = [
  {
    title: "Automatisation des processus",
    description:
      "Workflows n8n sur mesure pour connecter vos outils, éliminer les tâches manuelles et synchroniser vos données automatiquement.",
    points: ["Workflows n8n", "Intégrations d'API", "Synchronisation de données"],
  },
  {
    title: "Intégration de l'IA",
    description:
      "Mise en place d'agents et d'assistants IA pour le support client, la rédaction, le traitement de documents et l'analyse.",
    points: ["Assistants IA", "Traitement de documents", "Chatbots & support"],
  },
  {
    title: "Développement web & apps",
    description:
      "Sites vitrines, landing pages et applications web modernes, rapides et orientés conversion.",
    points: ["Sites & landing pages", "Applications web", "Intégration d'IA produit"],
  },
  {
    title: "Conseil & transformation digitale",
    description:
      "Audit de vos processus et feuille de route concrète pour intégrer l'IA là où elle a le plus d'impact.",
    points: ["Audit des processus", "Feuille de route IA", "Accompagnement"],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
};

// Remplace ces exemples par tes vrais projets au fur et à mesure.
export const projects: Project[] = [
  {
    title: "Automatisation de la prise de RDV",
    category: "Automatisation",
    description:
      "Workflow n8n qui synchronise les réservations entre un formulaire, un calendrier et un CRM, avec relances automatiques par email.",
    tags: ["n8n", "Google Calendar", "Email"],
  },
  {
    title: "Assistant IA pour le support client",
    category: "IA",
    description:
      "Chatbot connecté à une base de connaissances qui répond aux questions fréquentes et escalade vers un humain si besoin.",
    tags: ["IA", "RAG", "API"],
  },
  {
    title: "Site vitrine + réservation",
    category: "Web",
    description:
      "Site moderne et rapide pour une entreprise locale, avec module de réservation intégré et optimisation SEO.",
    tags: ["Next.js", "Tailwind", "SEO"],
  },
  {
    title: "Pipeline de traitement de documents",
    category: "Automatisation",
    description:
      "Extraction automatique des données de factures et de devis, classement et envoi vers un outil comptable.",
    tags: ["IA", "OCR", "n8n"],
  },
];
