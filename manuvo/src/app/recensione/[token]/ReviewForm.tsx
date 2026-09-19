"use client";

// Manuvo - modulo pubblico di recensione (selezione stelle + commento).
import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { submitReviewAction, type SubmitReviewState } from "./actions";

export function ReviewForm({ token, artisanName }: { token: string; artisanName: string }) {
  const t = useTranslations("recensione");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [state, formAction, isPending] = useActionState<SubmitReviewState, FormData>(
    submitReviewAction,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 className="text-xl font-bold text-green-900">{t("thanks_title")}</h2>
        <p className="mt-2 text-sm text-neutral-600">{t("thanks_text")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="rating" value={rating} />
      <h1 className="text-center text-xl font-bold tracking-tight">
        {t("title", { name: artisanName })}
      </h1>
      <p className="text-center text-sm text-neutral-500">{t("subtitle")}</p>

      <div className="flex gap-1.5" role="radiogroup" aria-label={t("stars_label")}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n}`}
            className="text-4xl leading-none transition"
          >
            <span className={(hover || rating) >= n ? "text-amber-500" : "text-neutral-300"}>★</span>
          </button>
        ))}
      </div>

      <textarea
        name="comment"
        rows={3}
        placeholder={t("comment_ph")}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
      />

      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending || rating < 1}
        className="w-full rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
