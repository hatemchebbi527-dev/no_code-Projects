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

export type FaqItem = { q: string; a: string };

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
  benefits: string[];
  faq: FaqItem[];
  metaTitle: string;
  metaDescription: string;
};

/**
 * Metodologia condivisa dell'agenzia, applicata a ogni servizio.
 * Realistica: un'unica regia in 4 fasi, dalla strategia al follow-up.
 */
export const methodology: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Ascolto & strategia",
    description:
      "Partiamo dai tuoi obiettivi di business e dal pubblico. Definiamo concept, messaggi chiave, KPI e budget.",
  },
  {
    step: "02",
    title: "Creatività & progettazione",
    description:
      "Trasformiamo la strategia in un'idea forte e in un progetto esecutivo dettagliato, scenografia compresa.",
  },
  {
    step: "03",
    title: "Produzione & regia",
    description:
      "Coordiniamo fornitori, logistica e tecnica. In scena, presidiamo ogni dettaglio in tempo reale.",
  },
  {
    step: "04",
    title: "Misurazione & follow-up",
    description:
      "Raccogliamo dati e risultati, li analizziamo e li traduciamo in valore per le attivazioni successive.",
  },
];

/**
 * I 6 pilastri di servizio (servizi REALI di Step Communication).
 * Ogni servizio ha una pagina dedicata /servizi/[slug].
 * Immagini placeholder: vedi content/media.ts.
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
    benefits: [
      "Raggiungi il pubblico nei luoghi ad alta affluenza, senza aspettare che venga da te",
      "Format scalabile e replicabile su decine di tappe con qualità costante",
      "Logistica, permessi e tecnica gestiti end-to-end da un unico partner",
      "Contenuti pensati per amplificare l'eco sui social di ogni tappa",
    ],
    faq: [
      {
        q: "Quante tappe può avere un tour?",
        a: "Realizziamo da pochi appuntamenti a roadshow di decine di tappe in tutta Italia. Progettiamo il format per essere replicabile mantenendo lo stesso impatto ovunque.",
      },
      {
        q: "Vi occupate anche di permessi e logistica?",
        a: "Sì. Gestiamo permessi, suolo pubblico, trasporti, allestimenti, tecnica e staff. Tu hai un solo interlocutore per l'intero tour.",
      },
      {
        q: "Con quanto anticipo va pianificato un tour?",
        a: "Consigliamo di partire 2-3 mesi prima per le produzioni più articolate, ma sappiamo organizzarci anche su tempistiche più strette.",
      },
    ],
    metaTitle: "Tour promozionali e spettacoli itineranti",
    metaDescription:
      "Agenzia per tour promozionali, roadshow e spettacoli itineranti. Step Communication porta il tuo brand dove vive il pubblico, in tutta Italia.",
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
    benefits: [
      "Esperienze che uniscono contenuto di valore e ospitalità impeccabile",
      "Regia tecnica e contenutistica per congressi anche in formato ibrido",
      "Viaggi incentive su misura che motivano davvero le persone",
      "Gestione completa di delegati, accrediti, hospitality e fornitori",
    ],
    faq: [
      {
        q: "Cosa significa MICE?",
        a: "MICE è l'acronimo di Meeting, Incentive, Congressi ed Esposizioni: il segmento degli eventi business. Copriamo l'intera filiera, dall'ideazione alla regia.",
      },
      {
        q: "Gestite anche eventi ibridi o in streaming?",
        a: "Sì. Progettiamo congressi e convention con regia ibrida, piattaforme di streaming e contenuti pensati sia per il pubblico in sala sia per quello online.",
      },
      {
        q: "Potete occuparvi della sede e della logistica delegati?",
        a: "Assolutamente. Selezioniamo le venue, gestiamo accrediti, hospitality, transfer e l'intera esperienza dei partecipanti.",
      },
    ],
    metaTitle: "Eventi MICE: meeting, incentive, congressi ed esposizioni",
    metaDescription:
      "Agenzia MICE a Rimini: meeting, viaggi incentive, congressi ed esposizioni progettati per connettere e convertire. Regia completa con Step Communication.",
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
    benefits: [
      "Trasformi messaggi astratti in esperienze che le persone vivono e ricordano",
      "Coinvolgimento multisensoriale che aumenta memorabilità e passaparola",
      "Touchpoint progettati per generare contenuti e dati di prima parte",
      "Misurazione dell'engagement e del sentiment, non solo della presenza",
    ],
    faq: [
      {
        q: "In cosa si differenzia dal marketing tradizionale?",
        a: "Il marketing esperienziale non racconta il brand: lo fa vivere. Le persone diventano protagoniste, e questo crea un ricordo e un legame molto più forti di un messaggio passivo.",
      },
      {
        q: "Funziona solo per i grandi brand?",
        a: "No. Progettiamo esperienze su misura per ogni dimensione e budget: l'importante è l'idea giusta per il pubblico giusto.",
      },
      {
        q: "Come misurate i risultati?",
        a: "Definiamo KPI a monte: interazioni, lead raccolti, contenuti generati, sentiment, copertura. Poi rendicontiamo i risultati reali.",
      },
    ],
    metaTitle: "Marketing esperienziale: esperienze immersive di marca",
    metaDescription:
      "Agenzia di marketing esperienziale: esperienze immersive e multisensoriali che trasformano il pubblico in protagonista. Step Communication, Rimini.",
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
    benefits: [
      "Attivazioni che generano awareness e conversioni nello stesso momento",
      "Raccolta di dati e lead di prima parte direttamente sul campo",
      "Format guerrilla e pop-up ad alto impatto rispetto all'investimento",
      "Presidio operativo e reportistica puntuale di ogni attivazione",
    ],
    faq: [
      {
        q: "Che differenza c'è tra brand activation ed evento?",
        a: "Una brand activation è mirata a far compiere un'azione (provare, interagire, lasciare un contatto). È più tattica e orientata alla conversione rispetto a un evento celebrativo.",
      },
      {
        q: "Potete attivare più città in contemporanea?",
        a: "Sì, coordiniamo attivazioni multi-città con staff e materiali allineati, mantenendo coerenza di brand e qualità ovunque.",
      },
      {
        q: "Raccogliete i dati dei contatti?",
        a: "Sì, nel pieno rispetto del GDPR. Progettiamo i meccanismi di raccolta lead e li consegniamo pronti per le tue attività di follow-up.",
      },
    ],
    metaTitle: "Brand activation: attivazioni di marca sul territorio",
    metaDescription:
      "Agenzia di brand activation: pop-up, guerrilla, sampling e installazioni che generano awareness, lead e conversioni misurabili. Step Communication.",
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
    benefits: [
      "Momenti che allineano i team e rafforzano il senso di appartenenza",
      "Lanci di prodotto che creano attesa, copertura e conversazione",
      "Regia narrativa e tecnica all'altezza del tuo posizionamento",
      "Un'esperienza coerente dal palco ai contenuti post-evento",
    ],
    faq: [
      {
        q: "Organizzate sia eventi interni sia rivolti al pubblico?",
        a: "Sì. Convention, kick-off e celebrazioni per i team interni, e product launch o eventi stampa rivolti a clienti, media e pubblico esterno.",
      },
      {
        q: "Curate anche i contenuti e la parte video?",
        a: "Sì, dalla scaletta allo speaker coaching, dalla scenografia ai video e ai contenuti per i canali aziendali dopo l'evento.",
      },
      {
        q: "Gestite eventi fuori dall'Emilia-Romagna?",
        a: "Operiamo in tutta Italia e all'estero, con una rete di partner locali affidabili per ogni destinazione.",
      },
    ],
    metaTitle: "Eventi aziendali e lancio prodotti",
    metaDescription:
      "Agenzia per eventi aziendali, convention, kick-off e lancio prodotti. Step Communication crea momenti memorabili che allineano le persone e amplificano il brand.",
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
    benefits: [
      "Una strategia chiara prima di investire, con obiettivi e KPI definiti",
      "Budget pianificato e monitorato per massimizzare il ritorno",
      "Promozione integrata che fa arrivare le persone giuste all'evento",
      "Un unico partner dalla visione iniziale alla rendicontazione finale",
    ],
    faq: [
      {
        q: "Posso coinvolgervi solo per la strategia?",
        a: "Sì. Possiamo affiancarti solo nella fase di consulenza e studio di fattibilità, oppure seguire l'intero progetto fino all'esecuzione.",
      },
      {
        q: "Come gestite il budget?",
        a: "Costruiamo un budget trasparente, lo monitoriamo in corso d'opera e ti aggiorniamo costantemente, senza sorprese.",
      },
      {
        q: "Vi occupate anche della promozione dell'evento?",
        a: "Sì: definiamo e attiviamo il piano di comunicazione integrato (digitale, stampa, social, PR) per massimizzare partecipazione e visibilità.",
      },
    ],
    metaTitle: "Consulenza e campagne strategiche per eventi",
    metaDescription:
      "Consulenza strategica per eventi: studio di fattibilità, strategia, gestione budget e promozione integrata. La regia completa con Step Communication.",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
