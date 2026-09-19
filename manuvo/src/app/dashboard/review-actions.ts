"use server";

// Manuvo - azione server : l'artigiano chiede una recensione al cliente (SMS).
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { requestReview } from "@/lib/reviews";

export type RequestReviewState = { error?: string; success?: boolean } | undefined;

export async function requestReviewAction(
  _prev: RequestReviewState,
  formData: FormData,
): Promise<RequestReviewState> {
  const t = await getTranslations("reviewErrors");
  const session = await auth();
  if (!session?.user) return { error: t("session") };

  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return { error: t("invalid") };

  const res = await requestReview(session.user.id, leadId);
  if (!res.ok) return { error: t(res.error) };
  revalidatePath("/dashboard");
  return { success: true };
}
