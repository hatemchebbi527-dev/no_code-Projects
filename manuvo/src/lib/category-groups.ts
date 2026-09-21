// Manuvo - regroupement des metiers par famille + accent couleur (landing).
import type { Category, Locale } from "./constants";

export type FamilyKey =
  | "casa_impianti"
  | "ristrutturazione"
  | "pulizie"
  | "esterni"
  | "benessere"
  | "eventi"
  | "trasporti"
  | "servizi";

export type Family = {
  key: FamilyKey;
  categories: Category[];
  // Classes Tailwind litterales (scannees a la compilation) : degrade du fallback.
  grad: string;
};

// Les 35 metiers repartis sans doublon ni oubli.
export const FAMILIES: Family[] = [
  {
    key: "casa_impianti",
    grad: "from-sky-500 to-blue-600",
    categories: [
      "idraulica",
      "elettricista",
      "caldaia",
      "condizionamento",
      "elettrodomestici",
      "antennista",
      "telecamere",
      "serrature",
      "fabbro",
      "vetraio",
    ],
  },
  {
    key: "ristrutturazione",
    grad: "from-amber-500 to-orange-600",
    categories: [
      "muratura",
      "imbianchino",
      "falegname",
      "ristrutturazione",
      "tappezziere",
      "spazzacamino",
    ],
  },
  {
    key: "pulizie",
    grad: "from-teal-500 to-emerald-600",
    categories: [
      "pulizie",
      "lavaggio_tappeti",
      "pulizia_cantiere",
      "colf",
      "derattizzazione",
      "disinfestazione",
    ],
  },
  {
    key: "esterni",
    grad: "from-lime-500 to-green-600",
    categories: ["giardinaggio"],
  },
  {
    key: "benessere",
    grad: "from-pink-500 to-rose-600",
    categories: ["estetista", "massaggio", "personal_trainer", "pilates"],
  },
  {
    key: "eventi",
    grad: "from-violet-500 to-purple-600",
    categories: ["fotografo", "videomaker", "dj"],
  },
  {
    key: "trasporti",
    grad: "from-slate-500 to-slate-700",
    categories: ["trasporti", "meccanico", "autista"],
  },
  {
    key: "servizi",
    grad: "from-indigo-500 to-indigo-700",
    categories: ["ripetizioni", "sviluppo_web"],
  },
];

// Libelles des familles (inline, 5 langues) : evite de toucher aux 5 gros JSON.
export const FAMILY_LABEL: Record<Locale, Record<FamilyKey, string>> = {
  it: {
    casa_impianti: "Casa e impianti",
    ristrutturazione: "Ristrutturazione e lavori",
    pulizie: "Pulizie e disinfestazione",
    esterni: "Esterni e giardino",
    benessere: "Benessere e bellezza",
    eventi: "Eventi e media",
    trasporti: "Trasporti e auto",
    servizi: "Servizi e formazione",
  },
  fr: {
    casa_impianti: "Maison et installations",
    ristrutturazione: "Renovation et travaux",
    pulizie: "Nettoyage et desinfestation",
    esterni: "Exterieurs et jardin",
    benessere: "Bien-etre et beaute",
    eventi: "Evenements et medias",
    trasporti: "Transport et auto",
    servizi: "Services et formation",
  },
  en: {
    casa_impianti: "Home & systems",
    ristrutturazione: "Renovation & works",
    pulizie: "Cleaning & pest control",
    esterni: "Outdoor & garden",
    benessere: "Wellness & beauty",
    eventi: "Events & media",
    trasporti: "Transport & auto",
    servizi: "Services & training",
  },
  de: {
    casa_impianti: "Haus & Technik",
    ristrutturazione: "Renovierung & Arbeiten",
    pulizie: "Reinigung & Schaedlingsbekaempfung",
    esterni: "Aussen & Garten",
    benessere: "Wellness & Schoenheit",
    eventi: "Events & Medien",
    trasporti: "Transport & Auto",
    servizi: "Dienste & Bildung",
  },
  ar: {
    casa_impianti: "المنزل والتجهيزات",
    ristrutturazione: "التجديد والأعمال",
    pulizie: "التنظيف ومكافحة الآفات",
    esterni: "الخارج والحديقة",
    benessere: "الصحة والجمال",
    eventi: "الفعاليات والوسائط",
    trasporti: "النقل والسيارات",
    servizi: "خدمات وتدريب",
  },
};
