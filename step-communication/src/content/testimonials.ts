export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * ⚠️ PLACEHOLDER - DA SOSTITUIRE con testimonianze reali e autorizzate
 * (club, sponsor, atleti). Raccogliere citazioni verificabili prima del lancio.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Hanno trovato lo sponsor giusto leggendo davvero il valore del nostro club. Metodo, costanza e risultati concreti.",
    author: "Nome Cognome",
    role: "Direttore Marketing",
    company: "Società sportiva placeholder",
  },
  {
    quote:
      "Per noi azienda, investire nello sport con 7 Sport Agency ha significato visibilità misurabile e un pubblico davvero in target.",
    author: "Nome Cognome",
    role: "Brand Manager",
    company: "Azienda placeholder",
  },
  {
    quote:
      "Un partner che capisce sia il linguaggio dello sport sia quello del business. Affidabili dall'idea all'esecuzione.",
    author: "Nome Cognome",
    role: "Sponsorship Manager",
    company: "Brand placeholder",
  },
];
