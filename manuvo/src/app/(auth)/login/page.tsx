"use client";

// Manuvo - pagina di accesso.
import { useActionState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { authenticate, type AuthState } from "../actions";

export default function LoginPage() {
  const t = useTranslations("login");
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    authenticate,
    undefined,
  );

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20";

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("email")}</span>
          <input name="email" type="email" autoComplete="email" required className={input} placeholder="you@email.com" />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("password")}</span>
          <input name="password" type="password" autoComplete="current-password" required className={input} placeholder="********" />
        </label>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        {t("no_account")}{" "}
        <Link href="/signup" className="font-semibold text-teal-700 hover:underline">
          {t("register_link")}
        </Link>
      </p>
    </div>
  );
}
