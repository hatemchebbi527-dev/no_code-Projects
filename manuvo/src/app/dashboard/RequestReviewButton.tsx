"use client";

// Manuvo - bottone "Chiedi una recensione" su un contatto trattato.
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { requestReviewAction, type RequestReviewState } from "./review-actions";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-500" aria-label={`${n}/5`}>
      {"★".repeat(n)}
      <span className="text-neutral-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function RequestReviewButton({
  leadId,
  reviewState,
  reviewRating,
}: {
  leadId: string;
  reviewState: string;
  reviewRating: number | null;
}) {
  const t = useTranslations("review");
  const [state, formAction, isPending] = useActionState<RequestReviewState, FormData>(
    requestReviewAction,
    undefined,
  );

  // Avis deja recu : on montre les etoiles.
  if (reviewState === "done" && reviewRating) {
    return (
      <span className="mt-2 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-neutral-600">
        {t("received")} <Stars n={reviewRating} />
      </span>
    );
  }

  const requested = reviewState === "pending" || state?.success;

  return (
    <form action={formAction} className="mt-2 flex flex-col gap-1">
      <input type="hidden" name="leadId" value={leadId} />
      <button
        type="submit"
        disabled={isPending}
        className="w-fit text-xs font-medium text-red-700 underline underline-offset-2 hover:text-red-800 disabled:opacity-60"
      >
        {requested ? t("resend_cta") : t("request_cta")}
      </button>
      {requested && !state?.error && (
        <span className="text-[11px] text-neutral-400">{t("sent_hint")}</span>
      )}
      {state?.error && <span className="text-[11px] text-red-700">{state.error}</span>}
    </form>
  );
}
