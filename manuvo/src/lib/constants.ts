// Manuvo - constantes metier partagees (validation cote code des champs "enumeres").

// ---- Economie ----
export const EUR_PER_CREDIT = 2; // 1 credit = 2 EUR
export const MIN_LEAD_COST = 3; // cout minimum d'un contact (credits)
export const MAX_LEAD_COST = 5; // cout maximum d'un contact (credits)
export const DEFAULT_LEAD_COST = 4;
export const MAX_UNLOCKS_PER_LEAD = 3; // plafond d'artisans par demande
// Credits offerts a l'inscription (lancement). 1 credit = 2 EUR, un contact coute 3-5 credits.
// Verrouille une seule fois par Partita IVA (voir registerArtisan) pour eviter le farming.
export const WELCOME_CREDITS = 10;

// ---- Roles ----
export const ROLES = ["ARTIGIANO", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

// ---- Categories (metiers) ----
export const CATEGORIES = [
  "idraulica",
  "elettricista",
  "imbianchino",
  "falegname",
  "condizionamento",
  "giardinaggio",
  "muratura",
  "pulizie",
  "trasporti",
  "spazzacamino",
  "elettrodomestici",
] as const;
export type Category = (typeof CATEGORIES)[number];

// ---- Urgence ----
export const URGENCIES = ["ASAP", "THIS_WEEK", "NOT_URGENT"] as const;
export type Urgency = (typeof URGENCIES)[number];

// ---- Statut d'une demande ----
export const LEAD_STATUSES = ["OPEN", "CLOSED"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

// ---- Type de transaction ----
// BONUS = credits offerts (bienvenue) : exclus du calcul du chiffre d'affaires.
export const TRANSACTION_TYPES = ["PURCHASE", "SPEND", "BONUS"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

// ---- Pays proposes ----
export const COUNTRIES = [
  "IT", "FR", "DE", "ES", "GB", "CH", "BE", "NL", "AT", "PT", "TN", "MA",
] as const;
export type CountryCode = (typeof COUNTRIES)[number];

// ---- Langues ----
export const LOCALES = ["it", "en", "fr", "de", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";
export const RTL_LOCALES: Locale[] = ["ar"];

// ---- Helpers ----
export function creditsToEur(credits: number): number {
  return credits * EUR_PER_CREDIT;
}

// Matricule public d'un artisan : ART-0001, ART-0042, ...
export function formatMatricule(matricule: number): string {
  return `ART-${String(matricule).padStart(4, "0")}`;
}

export function clampLeadCost(cost: number): number {
  return Math.max(MIN_LEAD_COST, Math.min(MAX_LEAD_COST, Math.round(cost)));
}

export function isCategory(v: string): v is Category {
  return (CATEGORIES as readonly string[]).includes(v);
}

export function isRole(v: string): v is Role {
  return (ROLES as readonly string[]).includes(v);
}

// ---- Partita IVA (Italie) ----
// Normalise une saisie de P.IVA : enleve espaces/points et un eventuel prefixe "IT".
export function normalizePiva(raw: string): string {
  return raw.replace(/[\s.]/g, "").replace(/^IT/i, "").trim();
}

// Valide une Partita IVA italienne : 11 chiffres + somme de controle (algorithme mod-10 / Luhn).
export function isValidPiva(piva: string): boolean {
  if (!/^\d{11}$/.test(piva)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    let n = piva.charCodeAt(i) - 48;
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}
