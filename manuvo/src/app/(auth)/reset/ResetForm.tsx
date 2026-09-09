"use client";

// Manuvo - form di reimpostazione password.
import { useActionState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { resetPassword, type ResetState } from "../actions";

export function ResetForm({ token }: { token: string }) {
  const t = useTranslations("reset");
  const [state, formAction, isPending] = useActionState<ResetState, FormData>(
    resetPassword,
    undefined,
  );

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

  if (state?.ok) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight">{t("done_title")}</h1>
        <p className="mt-2 text-sm text-neutral-600">{t("done_text")}</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-red-700 px-4 py-2.5 font-semibold text-white transition hover:bg-red-800"
        >
          {t("to_login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="token" value={token} />
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("password")}</span>
          <input name="password" type="password" autoComplete="new-password" required className={input} placeholder={t("password_ph")} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("confirm")}</span>
          <input name="confirm" type="password" autoComplete="new-password" required className={input} placeholder={t("confirm_ph")} />
        </label>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 rounded-lg bg-red-700 px-4 py-2.5 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
