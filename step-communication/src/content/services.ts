import {
  Handshake,
  Flag,
  Presentation,
  Trophy,
  Package,
  Dumbbell,
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
 */
export const methodology: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Analisi & strategia",
    description:
      "Partiamo dai tuoi obiettivi e dal valore reale del tuo asset. Definiamo target, format e strategia commerciale.",
  },
  {
    step: "02",
    title: "Creatività & progettazione",
    description:
      "Trasformiamo la strategia in un format distintivo e in un progetto esecutivo dettagliato.",
  },
  {
    step: "03",
    title: "Produzione & regia",
    description:
      "Coordiniamo network, fornitori, logistica e tecnica. Sul campo, presidiamo ogni dettaglio.",
  },
  {
    step: "04",
    title: "Monitoraggio & risultati",
    description:
      "Misuriamo performance e ritorno, costantemente, e li traduciamo in valore per le attività successive.",
  },
];

/**
 * I 6 servizi reali di 7 Sport Agency.
 * Ogni servizio ha una pagina dedicata /servizi/[slug].
 * Immagini placeholder: vedi content/media.ts.
 */
export const services: Service[] = [
  {
    slug: "sport-sponsorship",
    number: "01",
    title: "Sport Sponsorship",
    short: "Format di sponsorizzazione su misura e ricerca sponsor per club, atleti e aziende.",
    description:
      "Il nostro core business. Ideiamo e realizziamo format di sponsorizzazione innovativi che mettono in contatto le aziende con il mondo dello sport. Dalla ricerca sponsor alla definizione della strategia commerciale, valorizziamo il legame tra brand e tifosi nel calcio di Serie A e B, nel basket, nel rugby, nel tennis e nel motorsport.",
    icon: Handshake,
    highlights: ["Ricerca sponsor", "Network 900+ aziende", "Calcio, basket, motorsport"],
    image: img("1431324155629-1a6deb1dec8d"),
    tone: "crimson",
    benefits: [
      "Accesso a un patrimonio di oltre 900 aziende per la ricerca sponsor",
      "Oltre 100 progetti di sponsorizzazione realizzati nei principali sport",
      "Strategia commerciale costruita sul valore reale del tuo asset sportivo",
      "Un partner che parla la lingua sia delle aziende sia delle società sportive",
    ],
    faq: [
      {
        q: "Lavorate con i club o con le aziende?",
        a: "Entrambi. Aiutiamo società sportive e atleti a trovare sponsor, e le aziende a investire nello sport nel modo più efficace per i loro obiettivi di business.",
      },
      {
        q: "In quali sport siete specializzati?",
        a: "Calcio di Serie A e Serie B, basket, rugby, tennis e motorsport. Valutiamo comunque ogni disciplina che esprima un pubblico di valore.",
      },
      {
        q: "Quanto tempo richiede trovare uno sponsor?",
        a: "La ricerca sponsor richiede metodo e costanza: i risultati migliori arrivano spesso nel medio-lungo periodo. Definiamo aspettative e tappe realistiche fin dall'inizio.",
      },
    ],
    metaTitle: "Sport Sponsorship e ricerca sponsor",
    metaDescription:
      "Sponsorizzazioni sportive e ricerca sponsor per club, atleti e aziende. 7 Sport Agency: format su misura e un network di oltre 900 aziende.",
  },
  {
    slug: "eventi-tour",
    number: "02",
    title: "Eventi e Tour",
    short: "Tour promozionali ed eventi di grande visibilità che portano il brand tra il pubblico.",
    description:
      "Progettiamo e realizziamo tour promozionali ed eventi di grande visibilità: dal concept alla scelta delle location, dalla gestione di permessi e logistica alla produzione di materiali scenografici e contenuti audiovisivi. Portiamo il tuo brand dove vive la passione, tappa dopo tappa.",
    icon: Flag,
    highlights: ["Tour promozionali", "Eventi ad alta visibilità", "Logistica e produzione"],
    image: img("1470229722913-7c0e2dbbafd3"),
    tone: "ember",
    benefits: [
      "Raggiungi il pubblico nei luoghi e nei momenti ad alta affluenza",
      "Format scalabile e replicabile su più tappe con qualità costante",
      "Permessi, logistica, allestimenti e tecnica gestiti end-to-end",
      "Contenuti audiovisivi pensati per amplificare l'eco sui canali digitali",
    ],
    faq: [
      {
        q: "Vi occupate anche di permessi e logistica?",
        a: "Sì. Gestiamo permessi, suolo pubblico, trasporti, allestimenti, tecnica e staff. Hai un solo interlocutore per l'intero tour.",
      },
      {
        q: "Producete anche i contenuti audiovisivi?",
        a: "Sì, realizziamo materiali scenografici e contenuti video pensati per la visibilità sul posto e sui canali social.",
      },
      {
        q: "Con quanto anticipo va pianificato un tour?",
        a: "Consigliamo di partire alcune settimane prima per le produzioni più articolate, ma sappiamo organizzarci anche su tempistiche più strette.",
      },
    ],
    metaTitle: "Eventi e Tour promozionali ad alta visibilità",
    metaDescription:
      "Tour promozionali ed eventi di grande visibilità per il tuo brand. 7 Sport Agency cura concept, logistica, produzione e contenuti.",
  },
  {
    slug: "fiere-congressi",
    number: "03",
    title: "Fiere e Congressi",
    short: "Presenza in fiere e congressi curata in ogni dettaglio, dallo stand alla regia.",
    description:
      "Gestiamo la tua presenza in fiere e congressi di settore, dalla progettazione dello stand all'organizzazione di convegni. Uniamo contenuto, ospitalità e tecnica per trasformare ogni appuntamento in un'occasione concreta di business e di nuove relazioni.",
    icon: Presentation,
    highlights: ["Stand & allestimenti", "Convegni & congressi", "Hospitality"],
    image: img("1505373877841-8d25f7d46678"),
    tone: "night",
    benefits: [
      "Uno stand e una presenza che ti distinguono dalla concorrenza",
      "Regia di convegni e congressi, anche in formato ibrido",
      "Gestione completa di hospitality, accrediti e fornitori",
      "Un presidio che trasforma i contatti in opportunità reali",
    ],
    faq: [
      {
        q: "Progettate anche lo stand?",
        a: "Sì, dalla progettazione creativa dello stand alla produzione e al montaggio, fino alla gestione dello staff durante la manifestazione.",
      },
      {
        q: "Gestite congressi in formato ibrido?",
        a: "Sì, con regia tecnica, streaming e contenuti pensati sia per il pubblico in sala sia per quello online.",
      },
      {
        q: "Seguite anche fiere fuori dall'Italia?",
        a: "Operiamo in Italia e all'estero, con una rete di partner locali affidabili per ogni destinazione.",
      },
    ],
    metaTitle: "Fiere e Congressi: presenza e regia di eventi",
    metaDescription:
      "Organizzazione di fiere e congressi: stand, convegni, hospitality e regia tecnica. 7 Sport Agency cura la tua presenza in ogni dettaglio.",
  },
  {
    slug: "incentive",
    number: "04",
    title: "Incentive",
    short: "Programmi incentive e corporate che motivano team, reti vendita e partner.",
    description:
      "Viaggi e programmi incentive, eventi corporate e celebrazioni che premiano e motivano le persone. Progettiamo esperienze su misura che rafforzano la cultura aziendale, fidelizzano la rete vendita e si traducono in risultati commerciali.",
    icon: Trophy,
    highlights: ["Viaggi incentive", "Eventi corporate", "Team building"],
    image: img("1540575467063-178a50c2df87"),
    tone: "slate",
    benefits: [
      "Esperienze che motivano davvero le persone e i team",
      "Programmi su misura per rete vendita, dipendenti e partner",
      "Logistica e ospitalità impeccabili, in Italia e all'estero",
      "Un ritorno concreto in engagement e performance commerciale",
    ],
    faq: [
      {
        q: "Cosa si intende per incentive?",
        a: "Sono programmi pensati per premiare e motivare persone e team: viaggi, esperienze ed eventi che rafforzano l'appartenenza e spingono i risultati.",
      },
      {
        q: "Organizzate anche la parte logistica?",
        a: "Sì, dalla selezione delle destinazioni alla gestione di transfer, hospitality e attività, ti seguiamo end-to-end.",
      },
      {
        q: "Per quali dimensioni aziendali lavorate?",
        a: "Per piccole, medie e grandi aziende: progettiamo l'esperienza giusta per ogni obiettivo e budget.",
      },
    ],
    metaTitle: "Incentive e eventi corporate",
    metaDescription:
      "Programmi incentive ed eventi corporate che motivano team e reti vendita. 7 Sport Agency progetta esperienze su misura con ritorno concreto.",
  },
  {
    slug: "sampling",
    number: "05",
    title: "Sampling",
    short: "In-store promotion e sampling per far provare il prodotto nel momento giusto.",
    description:
      "Attività di in-store promotion e sampling, con particolare attenzione all'attivazione di campagne digital. Facciamo incontrare prodotto e pubblico nei punti di contatto chiave, generando prova, awareness e dati di prima parte da mettere a frutto.",
    icon: Package,
    highlights: ["In-store promotion", "Sampling", "Attivazione digital"],
    image: img("1511795409834-ef04bbd61622"),
    tone: "gold",
    benefits: [
      "Fai provare il prodotto nel momento e nel luogo giusti",
      "Raccolta di dati e contatti di prima parte direttamente sul campo",
      "Integrazione con l'attivazione di campagne digital",
      "Presidio operativo e reportistica puntuale di ogni attività",
    ],
    faq: [
      {
        q: "Cos'è il sampling?",
        a: "È la distribuzione mirata di campioni di prodotto per farlo provare al pubblico giusto, generando prova d'acquisto, awareness e dati.",
      },
      {
        q: "Coprite più punti vendita o città?",
        a: "Sì, coordiniamo attività multi-sede con staff e materiali allineati, mantenendo coerenza di brand e qualità ovunque.",
      },
      {
        q: "Raccogliete i dati dei contatti?",
        a: "Sì, nel pieno rispetto del GDPR: progettiamo i meccanismi di raccolta e li consegniamo pronti per il follow-up.",
      },
    ],
    metaTitle: "Sampling e in-store promotion",
    metaDescription:
      "Sampling e in-store promotion con attivazione digital. 7 Sport Agency fa incontrare prodotto e pubblico generando prova, awareness e dati.",
  },
  {
    slug: "life-sport-coaching",
    number: "06",
    title: "Life & Sport Coaching",
    short: "Percorsi di life e sport coaching per atleti, team e professionisti.",
    description:
      "Percorsi di life e sport coaching pensati per atleti, squadre e professionisti che vogliono esprimere il proprio potenziale. Lavoriamo su mentalità, motivazione e performance, perché i risultati migliori nascono dall'equilibrio tra la persona e l'atleta, dentro e fuori dal campo.",
    icon: Dumbbell,
    highlights: ["Mentalità & motivazione", "Performance", "Atleti & team"],
    image: img("1517836357463-d25dfeac3438"),
    tone: "night",
    benefits: [
      "Percorsi su misura per atleti, squadre e professionisti",
      "Focus su mentalità, gestione della pressione e motivazione",
      "Strumenti concreti per migliorare costanza e performance",
      "Un equilibrio tra crescita personale e risultati sportivi",
    ],
    faq: [
      {
        q: "A chi si rivolge il coaching?",
        a: "Ad atleti, squadre e professionisti che vogliono migliorare mentalità, motivazione e performance, dentro e fuori dal campo.",
      },
      {
        q: "I percorsi sono individuali o di gruppo?",
        a: "Entrambi: costruiamo percorsi individuali o di team in base agli obiettivi della persona o della società.",
      },
      {
        q: "Il coaching è solo sportivo?",
        a: "No. Uniamo life e sport coaching, perché equilibrio personale e risultati sportivi crescono insieme.",
      },
    ],
    metaTitle: "Life & Sport Coaching per atleti e team",
    metaDescription:
      "Percorsi di life e sport coaching per atleti, squadre e professionisti. 7 Sport Agency lavora su mentalità, motivazione e performance.",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
