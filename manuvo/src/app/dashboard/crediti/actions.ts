"use server";

// Manuvo - action serveur d'achat de credits (paiement simule).
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { purchasePackForUser } from "@/lib/credits";

export type BuyState = { error?: string; success?: string } | undefined;

export async function buyPack(_prev: BuyState, formData: FormData): Promise<BuyState> {
  const t = await getTranslations("credits");
  const session = await auth();
  if (!session?.user) return { error: t("session_expired") };

  const packId = String(formData.get("packId") ?? "");
  if (!packId) return { error: t("invalid_pack") };

  try {
    const credits = await purchasePackForUser(session.user.id, packId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/crediti");
    return { success: t("recharge_done", { n: credits }) };
  } catch {
    return { error: t("recharge_failed") };
  }
}
