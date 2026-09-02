"use server";

// Manuvo - creazione di una richiesta da parte di un privato (senza account).
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("leadErrors");
  const category = String(formData.get("category") ?? "");
  const country = String(formData.get("country") ?? "IT");
  const city = String(formData.get("city") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const urgency = String(formData.get("urgency") ?? "ASAP");
  const contactName = String(formData.get("contactName") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();

  if (!isCategory(category) || !(CATEGORIES as readonly string[]).includes(category)) {
    return { error: t("category") };
  }
  if (!(COUNTRIES as readonly string[]).includes(country)) {
    return { error: t("country") };
  }
  if (!city) return { error: t("city") };
  if (description.length < 10) {
    return { error: t("description") };
  }
  if (!(URGENCIES as readonly string[]).includes(urgency)) {
    return { error: t("urgency") };
  }
  if (!contactName) return { error: t("name") };
  if (!contactPhone) return { error: t("phone") };
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return { error: t("email") };
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
