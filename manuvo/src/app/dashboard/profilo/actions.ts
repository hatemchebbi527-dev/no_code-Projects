"use server";

// Manuvo - action serveur: mise a jour du profil artigiano.
// Champs modifiables : nom, telephone, ville, pays, mestieri.
// Email (identifiant de connexion) et P.IVA (cle anti-abus) restent figes.
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  COUNTRIES,
  isCategory,
  isValidPhone,
  normalizePhone,
  type CountryCode,
} from "@/lib/constants";

export type ProfileState = { error?: string; success?: boolean } | undefined;

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const t = await getTranslations("authErrors");
  const session = await auth();
  if (!session?.user) return { error: t("required") };

  const name = String(formData.get("name") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const city = String(formData.get("city") ?? "").trim();
  const countryRaw = String(formData.get("country") ?? "IT").trim().toUpperCase();
  const country: CountryCode = (COUNTRIES as readonly string[]).includes(countryRaw)
    ? (countryRaw as CountryCode)
    : "IT";
  const categories = [...new Set(formData.getAll("categories").map(String))].filter(isCategory);

  if (!name) {
    return { error: t("required") };
  }
  if (categories.length === 0) {
    return { error: t("no_category") };
  }
  if (!phone) {
    return { error: t("phone_required") };
  }
  if (!isValidPhone(phone)) {
    return { error: t("phone_invalid") };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      phone,
      city: city || null,
      country,
      categories: categories.join(","),
    },
  });

  revalidatePath("/dashboard/profilo");
  revalidatePath("/dashboard");
  return { success: true };
}
