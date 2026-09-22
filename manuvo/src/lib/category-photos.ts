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

  // --- Ristrutturazione e lavori ---
  muratura:
    "https://images.unsplash.com/photo-1704005445445-2747074be8ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imbianchino:
    "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  falegname:
    "https://images.unsplash.com/photo-1667923006173-9e0d2251f608?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ristrutturazione:
    "https://images.unsplash.com/photo-1780385187605-7324343d3f76?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  tappezziere:
    "https://images.unsplash.com/photo-1653729167410-a0c5238419ac?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  spazzacamino:
    "https://images.unsplash.com/photo-1594560225349-7d4541d32e87?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  // --- Pulizie e disinfestazione ---
  pulizie:
    "https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  lavaggio_tappeti:
    "https://images.unsplash.com/photo-1742483359033-13315b247c74?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  pulizia_cantiere:
    "https://images.unsplash.com/photo-1718152421680-d1580e843cc9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  colf:
    "https://images.unsplash.com/photo-1713552566168-89c00fd622cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  derattizzazione:
    "https://images.unsplash.com/photo-1642611141599-73b9b35b4e2a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  disinfestazione:
    "https://images.unsplash.com/photo-1670989292166-8b20b9530438?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  // --- Esterni e giardino ---
  giardinaggio:
    "https://images.unsplash.com/photo-1734303023491-db8037a21f09?q=80&w=2142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  // --- Benessere e bellezza ---
  estetista:
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  massaggio:
    "https://images.unsplash.com/photo-1696841212541-449ca29397cc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  personal_trainer:
    "https://images.unsplash.com/photo-1571732154690-f6d1c3e5178a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  pilates:
    "https://images.unsplash.com/photo-1697060739671-586c21fa5e30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
