// Manuvo - photo pro par metier (Unsplash). Une URL par metier ; sinon fallback (icone + degrade).
//
// Comment remplir une ligne :
//   1. Ouvrir la photo sur unsplash.com
//   2. Clic droit sur l'image > "Copier l'adresse de l'image"
//      (URL qui commence par https://images.unsplash.com/photo-...)
//   3. Coller ci-dessous.
//
// Les metiers sans URL affichent automatiquement leur icone sur un degrade : jamais d'image cassee.
import type { Category } from "./constants";

export const CATEGORY_PHOTO: Partial<Record<Category, string>> = {
  // --- Casa e impianti ---
  idraulica:
    "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  elettricista:
    "https://images.unsplash.com/photo-1732660780054-0cf9fadb9d30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  caldaia:
    "https://images.unsplash.com/photo-1749532125405-70950966b0e5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  condizionamento:
    "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  elettrodomestici:
    "https://images.unsplash.com/photo-1772476361208-27d580dd3328?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  antennista:
    "https://images.unsplash.com/photo-1550439122-419a20c0b22c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  telecamere:
    "https://images.unsplash.com/photo-1614469422872-6e09d2569cc0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  serrature:
    "https://images.unsplash.com/photo-1668934801277-0c921792d490?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  fabbro:
    "https://images.unsplash.com/photo-1614945201958-a1ea751e6b7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  vetraio:
    "https://images.unsplash.com/photo-1708576085431-f77b19960396?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
