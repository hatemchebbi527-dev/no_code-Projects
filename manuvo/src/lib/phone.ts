// Manuvo - validazione e normalizzazione del numero di telefono del privato.
// Un numero non valido bloccherebbe un artigiano che ha pagato crediti per un contatto
// inutilizzabile: la validazione qui e severa e tiene conto del paese della richiesta.
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode as LibCountryCode,
} from "libphonenumber-js";
import type { CountryCode } from "@/lib/constants";

type PhoneResult =
  | { ok: true; e164: string; display: string }
  | { ok: false };

// Valida il telefono rispetto al paese scelto; se e in formato internazionale (+..)
// libphonenumber usa direttamente il prefisso. Restituisce anche una forma normalizzata.
export function validatePhone(raw: string, country: CountryCode): PhoneResult {
  const value = raw.trim();
  if (!value) return { ok: false };

  // Con prefisso internazionale (+39...) il paese e dedotto dal numero stesso.
  // Senza, si valida rispetto al paese della richiesta.
  const hasIntlPrefix = value.startsWith("+");
  const cc = country as LibCountryCode;
  const valid = hasIntlPrefix
    ? isValidPhoneNumber(value)
    : isValidPhoneNumber(value, cc);
  if (!valid) return { ok: false };

  const parsed = hasIntlPrefix
    ? parsePhoneNumberFromString(value)
    : parsePhoneNumberFromString(value, cc);
  if (!parsed) return { ok: false };

  return { ok: true, e164: parsed.number, display: parsed.formatInternational() };
}
