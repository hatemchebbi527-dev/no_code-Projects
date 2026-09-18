"use server";

// Manuvo - azioni server per la verifica del telefono via SMS su /pubblica.
import { getTranslations } from "next-intl/server";
import { COUNTRIES, type CountryCode } from "@/lib/constants";
import { startPhoneVerification, checkPhoneVerification } from "@/lib/phone-verification";

function countryOf(v: string): CountryCode {
  const c = v.trim().toUpperCase();
  return (COUNTRIES as readonly string[]).includes(c) ? (c as CountryCode) : "IT";
}

export type RequestCodeState = { sent?: boolean; devCode?: string; error?: string };

// Invia un codice SMS al numero indicato.
export async function requestPhoneCode(phone: string, country: string): Promise<RequestCodeState> {
  const t = await getTranslations("verifyErrors");
  const res = await startPhoneVerification(phone, countryOf(country));
  if (!res.ok) return { error: t(res.error) };
  return { sent: true, devCode: res.devCode };
}

export type ConfirmCodeState = { verified?: boolean; error?: string };

// Verifica il codice inserito.
export async function confirmPhoneCode(
  phone: string,
  country: string,
  code: string,
): Promise<ConfirmCodeState> {
  const t = await getTranslations("verifyErrors");
  const res = await checkPhoneVerification(phone, countryOf(country), code);
  if (!res.ok) return { error: t(res.error) };
  return { verified: true };
}
