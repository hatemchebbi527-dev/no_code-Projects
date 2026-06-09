import {
  Music,
  Presentation,
  Sparkles,
  Zap,
  Building2,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { img, type Tone } from "@/content/media";

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  image: string;
  tone: Tone;
};

/**
 * I 6 pilastri di servizio.
 * Mappano i servizi REALI di Step Communication (eventi a 360°, MICE,
 * consulenza strategica) sul posizionamento premium del nuovo sito.
 * Le immagini sono placeholder (vedi content/media.ts).
 */
export const services: Service[] = [
  {
    slug: "tour-spettacoli",
    number: "01",
    title: "Tour & spettacoli itineranti",
    short: "Roadshow, tour promozionali e live che portano il brand dove vive il pubblico.",
    description:
      "Progettiamo e produciamo roadshow, tour promozionali e spettacoli dal vivo non convenzionali. Dalla logistica multi-tappa alla regia creativa, portiamo il tuo brand nelle piazze, nei festival e nei luoghi dove il pubblico è già in movimento.",
    icon: Music,
    highlights: ["Roadshow multi-tappa", "Spettacoli & live", "Logistica e produzione"],
    image: img("1501281668745-f7f57925c3b4"),
    tone: "crimson",
  },
  {
    slug: "eventi-mice",
    number: "02",
    title: "Eventi MICE",
    short: "Meeting, incentive, congressi ed esposizioni progettati per connettere e convertire.",
    description:
      "Meeting, viaggi incentive, congressi ed esposizioni curati in ogni dettaglio. Uniamo strategia, contenuti e ospitalità per creare format che informano, motivano e generano relazioni di valore tra brand e stakeholder.",
    icon: Presentation,
    highlights: ["Congressi & convention", "Viaggi incentive", "Esposizioni & fiere"],
    image: img("1505373877841-8d25f7d46678"),
    tone: "night",
  },
  {
    slug: "marketing-esperienziale",
    number: "03",
    title: "Marketing esperienziale",
    short: "Esperienze immersive che trasformano lo spettatore in protagonista.",
    description:
      "Creiamo esperienze immersive e multisensoriali che mettono le persone al centro. Ogni touchpoint è pensato per emozionare, far interagire e trasformare il contatto in una relazione duratura con il brand.",
    icon: Sparkles,
    highlights: ["Esperienze immersive", "Storytelling fisico", "Engagement multisensoriale"],
    image: img("1492684223066-81342ee5ff30"),
    tone: "gold",
  },
  {
    slug: "brand-activation",
    number: "04",
    title: "Brand activation",
    short: "Attivazioni sul territorio e nei touchpoint chiave per engagement misurabile.",
    description:
      "Attivazioni di marca sul territorio, nel retail e negli eventi: sampling, guerrilla, pop-up e installazioni che generano awareness, dati e conversioni misurabili. Dalla strategia all'esecuzione, con KPI chiari.",
    icon: Zap,
    highlights: ["Pop-up & installazioni", "Guerrilla & sampling", "Lead generation"],
    image: img("1511795409834-ef04bbd61622"),
    tone: "ember",
  },
  {
    slug: "eventi-aziendali",
    number: "05",
    title: "Eventi aziendali & lancio prodotti",
    short: "Convention, kick-off e product launch che raccontano la cultura del brand.",
    description:
      "Convention, kick-off, celebrazioni aziendali e lanci di prodotto che rafforzano la cultura interna e il posizionamento esterno. Progettiamo momenti memorabili che allineano le persone e amplificano il messaggio del brand.",
    icon: Building2,
    highlights: ["Convention & kick-off", "Product launch", "Celebrazioni corporate"],
    image: img("1540575467063-178a50c2df87"),
    tone: "slate",
  },
  {
    slug: "campagne-strategiche",
    number: "06",
    title: "Consulenza & campagne strategiche",
    short: "Studio di fattibilità, strategia, budget e promozione: la regia completa.",
    description:
      "La regia strategica completa del tuo progetto: studio di fattibilità, definizione della strategia, gestione e monitoraggio del budget, fino alla promozione più efficace dell'evento. Un unico partner dalla visione all'esecuzione.",
    icon: Compass,
    highlights: ["Studio di fattibilità", "Strategia & budget", "Promozione integrata"],
    image: img("1552664730-d307ca884978"),
    tone: "night",
  },
];
