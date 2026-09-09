"use client";

// Manuvo - registrazione artigiano (con mestieri e zona).
import { useActionState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { registerArtisan, type AuthState } from "../actions";
import { CATEGORIES, COUNTRIES } from "@/lib/constants";
import { countryName } from "@/lib/catalog";

function LegalConsent() {
  const tc = useTranslations("common");
  return (
    <p className="text-xs text-neutral-500">
      {tc.rich("legal_consent", {
        terms: (c) => (
          <Link href="/legal/termini" className="underline hover:text-red-700">{c}</Link>
        ),
        privacy: (c) => (
          <Link href="/legal/privacy" className="underline hover:text-red-700">{c}</Link>
        ),
      })}
    </p>
  );
}

export default function SignupPage() {
  const t = useTranslations("signup");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    registerArtisan,
    undefined,
  );

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

  const countries = [...COUNTRIES]
    .map((code) => ({ code, label: countryName(code, locale) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("name")}</span>
          <input name="name" required className={input} placeholder="Mario Rossi" />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("email")}</span>
          <input name="email" type="email" autoComplete="email" required className={input} placeholder="you@email.com" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("country")}</span>
            <select name="country" defaultValue="IT" className={input}>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("city")}</span>
            <input name="city" className={input} placeholder="Rimini" />
          </label>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">{t("categories_label")}</legend>
          <p className="text-xs text-neutral-500">{t("categories_hint")}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="cursor-pointer">
                <input type="checkbox" name="categories" value={cat} className="peer sr-only" />
                <span className="inline-block rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-red-600/30">
                  {tc(cat)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("password")}</span>
            <input name="password" type="password" autoComplete="new-password" required className={input} placeholder={t("password_ph")} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("confirm")}</span>
            <input name="confirm" type="password" autoComplete="new-password" required className={input} placeholder={t("confirm_ph")} />
          </label>
        </div>

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

        <LegalConsent />
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        {t("have_account")}{" "}
        <Link href="/login" className="font-semibold text-red-700 hover:underline">
          {t("login_link")}
        </Link>
      </p>
    </div>
  );
}
