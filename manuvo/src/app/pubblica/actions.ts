"use server";

// Manuvo - creazione di una richiesta da parte di un privato (senza account).
import { prisma } from "@/lib/prisma";
import {
  CATEGORIES,
  COUNTRIES,
  URGENCIES,
  DEFAULT_LEAD_COST,
  MAX_UNLOCKS_PER_LEAD,
  isCategory,
} from "@/lib/constants";

export type LeadFormState = { error?: string; success?: boolean } | undefined;

export async function createLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const category = String(formData.get("category") ?? "");
  const country = String(formData.get("country") ?? "IT");
  const city = String(formData.get("city") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const urgency = String(formData.get("urgency") ?? "ASAP");
  const contactName = String(formData.get("contactName") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();

  if (!isCategory(category) || !(CATEGORIES as readonly string[]).includes(category)) {
    return { error: "Scegli una categoria valida." };
  }
  if (!(COUNTRIES as readonly string[]).includes(country)) {
    return { error: "Paese non valido." };
  }
  if (!city) return { error: "Indica la citta." };
  if (description.length < 10) {
    return { error: "Descrivi il lavoro (almeno 10 caratteri)." };
  }
  if (!(URGENCIES as readonly string[]).includes(urgency)) {
    return { error: "Urgenza non valida." };
  }
  if (!contactName) return { error: "Indica il tuo nome." };
  if (!contactPhone) return { error: "Indica un numero di telefono." };
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return { error: "Indirizzo email non valido." };
  }

  await prisma.lead.create({
    data: {
      category,
      country,
      city,
      description,
      urgency,
      contactName,
      contactPhone,
      contactEmail: contactEmail || null,
      creditCost: DEFAULT_LEAD_COST,
      status: "OPEN",
      unlocksCount: 0,
      maxUnlocks: MAX_UNLOCKS_PER_LEAD,
    },
  });

  return { success: true };
}
