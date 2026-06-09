import {
  Music,
  Presentation,
  Sparkles,
  Zap,
  Building2,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
};

/**
 * I 6 pilastri di servizio.
 * Mappano i servizi REALI di Step Communication (eventi a 360°, MICE,
 * consulenza strategica) sul posizionamento premium del nuovo sito.
 * Ogni servizio avrà una pagina dedicata in Fase 2 (/servizi/[slug]).
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
  },
];
