/**
 * Configurazione centrale del sito.
 * Fonte unica di verità per metadati, SEO, footer, dati strutturati.
 *
 * Dati anagrafici REALI di 7 Sport Agency (San Marino).
 * Campi marcati "DA CONFERMARE" da verificare col cliente prima del lancio.
 */
export const siteConfig = {
  name: "7 Sport Agency",
  legalName: "7 Sport Agency S.r.l.",
  shortName: "7 Sport",
  // Posizionamento reale del brand.
  tagline: "Sport Marketing & Sponsorizzazioni Sportive",
  // Dominio reale dell'azienda.
  url: "https://www.7sportagency.com",
  locale: "it_IT",
  lang: "it",
  // Esperienza dichiarata (anno esatto di fondazione DA CONFERMARE).
  experience: "oltre 10 anni",
  description:
    "7 Sport Agency è l'agenzia specializzata in marketing sportivo e sponsorizzazioni sportive. Da oltre 10 anni progettiamo format di sponsorizzazione, tour promozionali ed eventi che connettono i brand alla passione dello sport.",
  // Contatti
  email: "info@7sportagency.com", // DA CONFERMARE: email reale
  phone: "+378 0549 904086",
  phoneHref: "+3780549904086",
  address: {
    venue: "World Trade Center",
    street: "Via Consiglio dei Sessanta, 99",
    city: "Dogana",
    region: "RSM",
    postalCode: "47891",
    country: "SM",
    countryName: "Repubblica di San Marino",
    // Coordinate approssimative di Dogana (RSM). DA CONFERMARE.
    lat: 43.9847,
    lng: 12.4884,
  },
  // Social reali
  social: {
    facebook: "https://www.facebook.com/7SportAgency/",
    instagram: "https://www.instagram.com/7sportagency/",
    linkedin: "https://sm.linkedin.com/company/7-sport-agency-s.r.l.",
    youtube: "", // DA CONFERMARE
  },
  // Aree servite (SEO local + dati strutturati)
  areaServed: ["San Marino", "Italia", "Europa"],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Navigazione principale (allineata alle pagine reali del sito). */
export const mainNav: NavItem[] = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Clienti", href: "/clienti" },
  { label: "Contatti", href: "/contatti" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Servizi",
    items: [
      { label: "Sport Sponsorship", href: "/servizi/sport-sponsorship" },
      { label: "Eventi e Tour", href: "/servizi/eventi-tour" },
      { label: "Fiere e Congressi", href: "/servizi/fiere-congressi" },
      { label: "Incentive", href: "/servizi/incentive" },
      { label: "Sampling", href: "/servizi/sampling" },
      { label: "Life & Sport Coaching", href: "/servizi/life-sport-coaching" },
    ],
  },
  {
    title: "Agenzia",
    items: [
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Servizi", href: "/servizi" },
      { label: "Clienti", href: "/clienti" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
];
