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
 * ⚠️ CONTENUTO PLACEHOLDER - DA SOSTITUIRE con i progetti reali del portfolio.
 * Struttura pronta per i veri case study (obiettivo, strategia, esecuzione,
 * risultati, gallery, metriche). Immagini placeholder: vedi content/media.ts.
 */
export const projects: Project[] = [
  {
    slug: "riviera-sound-tour",
    title: "Riviera Sound Tour",
    client: "Brand placeholder",
    category: "Tour & spettacoli",
    year: "2025",
    location: "12 città · Italia",
    summary:
      "Roadshow musicale itinerante lungo la costa adriatica: palco mobile, talent e attivazioni di brand in ogni tappa.",
    metric: { value: "80k", label: "presenze totali" },
    image: img("1429962714451-bb934ecdc4ec"),
    tone: "ember",
    featured: true,
  },
  {
    slug: "innovation-summit",
    title: "Innovation Summit",
    client: "Brand placeholder",
    category: "Eventi MICE",
    year: "2025",
    location: "Rimini · Palacongressi",
    summary:
      "Congresso internazionale su due giornate con 40 speaker, regia ibrida e percorso esperienziale tra gli stand.",
    metric: { value: "1.200", label: "delegati" },
    image: img("1540575467063-178a50c2df87"),
    tone: "night",
  },
  {
    slug: "city-pop-up",
    title: "City Pop-Up Experience",
    client: "Brand placeholder",
    category: "Brand activation",
    year: "2024",
    location: "Milano · Bologna",
    summary:
      "Installazione pop-up multisensoriale nel cuore della città, con esperienza interattiva e raccolta lead in tempo reale.",
    metric: { value: "+34%", label: "lead qualificati" },
    image: img("1511795409834-ef04bbd61622"),
    tone: "gold",
  },
  {
    slug: "global-kickoff",
    title: "Global Kick-Off",
    client: "Brand placeholder",
    category: "Eventi aziendali",
    year: "2024",
    location: "Riccione",
    summary:
      "Convention annuale per la rete vendita: storytelling immersivo, premiazioni e show finale per 900 persone.",
    metric: { value: "98%", label: "soddisfazione" },
    image: img("1505373877841-8d25f7d46678"),
    tone: "slate",
  },
  {
    slug: "launch-experience",
    title: "Product Launch Experience",
    client: "Brand placeholder",
    category: "Lancio prodotti",
    year: "2024",
    location: "Rimini",
    summary:
      "Lancio di prodotto con anteprima stampa, esperienza phygital e copertura social amplificata dai creator.",
    metric: { value: "5,2M", label: "impression" },
    image: img("1492684223066-81342ee5ff30"),
    tone: "crimson",
  },
  {
    slug: "incentive-adriatica",
    title: "Incentive Adriatica",
    client: "Brand placeholder",
    category: "Eventi MICE",
    year: "2023",
    location: "Riviera Romagnola",
    summary:
      "Viaggio incentive su misura per la forza vendita top performer: esperienze esclusive e team building creativo.",
    metric: { value: "4 giorni", label: "esperienza full" },
    image: img("1540039155733-5bb30b53aa14"),
    tone: "night",
  },
];
