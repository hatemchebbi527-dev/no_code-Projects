"use server";

// Manuvo - invio della recensione dal cliente (pagina pubblica).
import { getTranslations } from "next-intl/server";
import { submitReview } from "@/lib/reviews";

export type SubmitReviewState = { error?: string; success?: boolean } | undefined;

export async function submitReviewAction(
  _prev: SubmitReviewState,
  formData: FormData,
): Promise<SubmitReviewState> {
  const t = await getTranslations("recensione");
  const token = String(formData.get("token") ?? "");
  const rating = Number(formData.get("rating") ?? 0);
  const comment = String(formData.get("comment") ?? "");
  if (!token) return { error: t("err_not_found") };

  const res = await submitReview(token, rating, comment);
  if (!res.ok) {
    const map: Record<string, string> = {
      invalid_rating: "err_invalid_rating",
      not_found: "err_not_found",
      already: "err_already",
    };
    return { error: t(map[res.error] ?? "err_generic") };
  }
  return { success: true };
}
