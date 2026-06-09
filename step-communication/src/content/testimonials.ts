export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * ⚠️ PLACEHOLDER - DA SOSTITUIRE con testimonianze reali e autorizzate.
 * Raccogliere citazioni verificabili (nome, ruolo, azienda) prima del lancio.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Hanno trasformato il nostro lancio in un'esperienza che le persone ancora ricordano. Esecuzione impeccabile dalla strategia all'ultimo dettaglio.",
    author: "Nome Cognome",
    role: "Marketing Director",
    company: "Brand placeholder",
  },
  {
    quote:
      "Un partner che capisce gli obiettivi di business, non solo l'evento. I numeri parlano da soli: engagement e lead oltre le aspettative.",
    author: "Nome Cognome",
    role: "Head of Communication",
    company: "Brand placeholder",
  },
  {
    quote:
      "Creatività, affidabilità e una macchina organizzativa che non sbaglia un colpo. Il nostro congresso è stato un successo su ogni metrica.",
    author: "Nome Cognome",
    role: "Event Manager",
    company: "Brand placeholder",
  },
];
