"use server";

// Manuvo - azione server : l'artigiano segnala un contatto falso/irraggiungibile
// per chiedere il rimborso dei crediti (l'admin poi approva o rifiuta).
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { requestRefund, RefundError } from "@/lib/refunds";

export type RefundState = { error?: string; success?: boolean } | undefined;

const KEY: Record<string, string> = {
  NOT_FOUND: "not_found",
  ALREADY: "already",
  WINDOW_EXPIRED: "window_expired",
};

export async function requestRefundAction(
  _prev: RefundState,
  formData: FormData,
): Promise<RefundState> {
  const t = await getTranslations("refundErrors");
  const session = await auth();
  if (!session?.user) return { error: t("session") };

  const leadId = String(formData.get("leadId") ?? "");
  const reason = String(formData.get("reason") ?? "");
  if (!leadId) return { error: t("invalid") };

  try {
    await requestRefund(session.user.id, leadId, reason);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) {
    if (e instanceof RefundError) return { error: t(KEY[e.message] ?? "generic") };
    return { error: t("generic") };
  }
}
