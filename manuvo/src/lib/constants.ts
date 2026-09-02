// Manuvo - constantes metier partagees (validation cote code des champs "enumeres").

// ---- Economie ----
export const EUR_PER_CREDIT = 2; // 1 credit = 2 EUR
export const MIN_LEAD_COST = 3; // cout minimum d'un contact (credits)
export const MAX_LEAD_COST = 5; // cout maximum d'un contact (credits)
export const DEFAULT_LEAD_COST = 4;
export const MAX_UNLOCKS_PER_LEAD = 3; // plafond d'artisans par demande

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
export const TRANSACTION_TYPES = ["PURCHASE", "SPEND"] as const;
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

export function clampLeadCost(cost: number): number {
  return Math.max(MIN_LEAD_COST, Math.min(MAX_LEAD_COST, Math.round(cost)));
}

export function isCategory(v: string): v is Category {
  return (CATEGORIES as readonly string[]).includes(v);
}

export function isRole(v: string): v is Role {
  return (ROLES as readonly string[]).includes(v);
}
