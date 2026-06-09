/**
 * Configurazione centrale del sito.
 * Fonte unica di verità per metadati, SEO, footer, dati strutturati.
 *
 * I dati anagrafici sono REALI (verificati): Step Communication, Rimini, dal 2005.
 * I campi marcati "DA CONFERMARE" vanno verificati col cliente prima del lancio.
 */
export const siteConfig = {
  name: "Step Communication",
  legalName: "Step Communication", // DA CONFERMARE: ragione sociale completa + P.IVA
  shortName: "Step",
  // Claim reale dal posizionamento storico del brand.
  tagline: "Communication, Engagement & Marketing Strategist",
  // Dominio reale dell'azienda.
  url: "https://www.stepcommunication.net",
  locale: "it_IT",
  lang: "it",
  founded: 2005,
  founder: "Alessandro Lo Presti",
  description:
    "Step Communication è l'agenzia di eventi e marketing esperienziale di Rimini. Dal 2005 trasformiamo i brand in esperienze indimenticabili: tour promozionali, eventi MICE, brand activation ed eventi aziendali.",
  // Contatti
  email: "eventi@stepcommunication.net",
  phone: "+39 0541 22195",
  phoneHref: "+39054122195",
  address: {
    street: "Via Coatit, 1",
    city: "Rimini",
    region: "RN",
    postalCode: "47921",
    country: "IT",
    countryName: "Italia",
    // Coordinate approssimative di Rimini centro. DA CONFERMARE con l'indirizzo esatto.
    lat: 44.0594,
    lng: 12.5683,
  },
  // Social
  social: {
    facebook: "https://www.facebook.com/www.stepcommunication.net",
    instagram: "", // DA CONFERMARE
    linkedin: "", // DA CONFERMARE
    youtube: "", // DA CONFERMARE
  },
  // Aree geografiche servite (per SEO local + dati strutturati)
  areaServed: ["Rimini", "Emilia-Romagna", "Italia", "Europa"],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/**
 * Navigazione principale.
 * Route dedicate attive (Fase 2). "Progetti" punta ancora alla sezione
 * della home in attesa della pagina /portfolio (Fase 3).
 */
export const mainNav: NavItem[] = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Progetti", href: "/#progetti" },
  { label: "Contatti", href: "/contatti" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Servizi",
    items: [
      { label: "Tour & spettacoli", href: "/servizi/tour-spettacoli" },
      { label: "Eventi MICE", href: "/servizi/eventi-mice" },
      { label: "Marketing esperienziale", href: "/servizi/marketing-esperienziale" },
      { label: "Brand activation", href: "/servizi/brand-activation" },
      { label: "Eventi aziendali", href: "/servizi/eventi-aziendali" },
      { label: "Campagne strategiche", href: "/servizi/campagne-strategiche" },
    ],
  },
  {
    title: "Agenzia",
    items: [
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Servizi", href: "/servizi" },
      { label: "Progetti", href: "/#progetti" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
];
