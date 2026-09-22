// Manuvo - photo d'illustration par famille (tuiles de la landing).
//
// Si une famille n'a pas d'URL ici, la tuile reutilise automatiquement la photo
// du 1er metier de la famille (voir category-photos.ts) ; a defaut, fallback degrade + icone.
//
// Pour forcer une photo dediee : coller une URL Unsplash
// (https://images.unsplash.com/photo-...) en face de la famille.
import type { FamilyKey } from "./category-groups";

export const FAMILY_PHOTO: Partial<Record<FamilyKey, string>> = {
  // casa_impianti: "https://images.unsplash.com/photo-...",
  // ristrutturazione: "https://images.unsplash.com/photo-...",
  // pulizie: "https://images.unsplash.com/photo-...",
  // esterni: "https://images.unsplash.com/photo-...",
  // benessere: "https://images.unsplash.com/photo-...",
  // eventi: "https://images.unsplash.com/photo-...",
  // trasporti: "https://images.unsplash.com/photo-...",
  // servizi: "https://images.unsplash.com/photo-...",
};
