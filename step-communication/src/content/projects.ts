import { img, type Tone } from "@/content/media";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  location: string;
  summary: string;
  metric: { value: string; label: string };
  image: string;
  tone: Tone;
  featured?: boolean;
};

/**
 * Progetti / clienti in evidenza.
 * Basati su partnership pubbliche reali di 7 Sport Agency.
 * ⚠️ I dettagli e le metriche complete dei case study sono DA COMPLETARE
 * con il cliente (e da sostituire le immagini placeholder, vedi content/media.ts).
 */
export const projects: Project[] = [
  {
    slug: "tour-de-france-italia",
    title: "Tour de France",
    client: "Tour de France",
    category: "Ricerca sponsor",
    year: "Italia",
    location: "Sponsorship",
    summary:
      "Selezionata come una delle due agenzie incaricate delle attività di ricerca sponsor per l'Italia del Tour de France.",
    metric: { value: "2", label: "agenzie scelte per l'Italia" },
    image: img("1517649763962-0c623066013b"),
    tone: "ember",
    featured: true,
  },
  {
    slug: "brera-holdings",
    title: "Brera Holdings",
    client: "Brera Holdings PLC",
    category: "Sponsorship internazionali",
    year: "2023",
    location: "Internazionale",
    summary:
      "Commercial advisor per le sponsorizzazioni internazionali del portfolio globale di club sportivi emergenti di Brera Holdings.",
    metric: { value: "Global", label: "portfolio di club" },
    image: img("1431324155629-1a6deb1dec8d"),
    tone: "night",
  },
  {
    slug: "mantova-1911",
    title: "Mantova 1911",
    client: "Mantova 1911",
    category: "Commercial Advisor",
    year: "Calcio",
    location: "Italia",
    summary:
      "Commercial advisor per le attività di ricerca sponsor del club, a supporto della strategia commerciale.",
    metric: { value: "Serie", label: "calcio professionistico" },
    image: img("1459865264687-595d652de67e"),
    tone: "crimson",
  },
  {
    slug: "network-sport-digital",
    title: "Network Sport Digital",
    client: "Network proprietario",
    category: "Media & Partnerships",
    year: "Sempre attivo",
    location: "Italia",
    summary:
      "Network di siti dedicati ai tifosi delle principali discipline, per attività di digital marketing e visibilità degli sponsor.",
    metric: { value: "40M", label: "utenti al mese" },
    image: img("1521412644187-c49fa049e84d"),
    tone: "slate",
  },
  {
    slug: "ricerca-sponsor-network",
    title: "Ricerca Sponsor",
    client: "Aziende & club",
    category: "Sport Sponsorship",
    year: "Core business",
    location: "Italia & Europa",
    summary:
      "Un patrimonio di oltre 900 aziende messo a disposizione per connettere brand e società sportive.",
    metric: { value: "900+", label: "aziende nel network" },
    image: img("1508098682722-e99c43a406b2"),
    tone: "gold",
  },
  {
    slug: "progetti-sportivi",
    title: "100+ progetti sportivi",
    client: "Club & atleti",
    category: "Sponsorizzazioni",
    year: "10+ anni",
    location: "Multisport",
    summary:
      "Oltre cento progetti di sponsorizzazione realizzati nel calcio di Serie A e B, basket, rugby, tennis e motorsport.",
    metric: { value: "100+", label: "clienti seguiti" },
    image: img("1543351611-58f69d7c1781"),
    tone: "ember",
  },
];
