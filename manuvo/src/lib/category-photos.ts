// Manuvo - photo pro par metier (Unsplash). Une URL par metier ; sinon fallback (icone + degrade).
//
// Comment remplir une ligne :
//   1. Ouvrir la photo sur unsplash.com
//   2. Clic droit sur l'image > "Copier l'adresse de l'image"
//      (URL qui commence par https://images.unsplash.com/photo-...)
//   3. Coller ci-dessous, en gardant les parametres ?w=800&q=70&auto=format&fit=crop
//      pour des images legeres et bien cadrees.
//
// Les metiers sans URL affichent automatiquement leur icone sur un degrade : jamais d'image cassee.
import type { Category } from "./constants";

export const CATEGORY_PHOTO: Partial<Record<Category, string>> = {
  // Exemple (a decommenter et remplacer par une vraie URL Unsplash) :
  // idraulica: "https://images.unsplash.com/photo-XXXXXXXXXXXX?w=800&q=70&auto=format&fit=crop",
};
