// Manuvo - libelli in italiano per categorie/urgenza + nomi paese.
// (Base per l'i18n completo, che arrivera nel suo passo dedicato.)
import type { Category, Urgency } from "./constants";

export const CATEGORY_LABEL_IT: Record<Category, string> = {
  idraulica: "Idraulica",
  elettricista: "Elettricista",
  imbianchino: "Imbianchino",
  falegname: "Falegname",
  condizionamento: "Condizionatori",
  giardinaggio: "Giardinaggio",
  muratura: "Muratura",
  pulizie: "Pulizie",
  trasporti: "Trasporti e traslochi",
  spazzacamino: "Spazzacamino",
  elettrodomestici: "Riparazione elettrodomestici",
};

export const URGENCY_LABEL_IT: Record<Urgency, string> = {
  ASAP: "Il prima possibile",
  THIS_WEEK: "Questa settimana",
  NOT_URGENT: "Non urgente",
};

export function countryNameIt(code: string): string {
  try {
    return new Intl.DisplayNames(["it"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
