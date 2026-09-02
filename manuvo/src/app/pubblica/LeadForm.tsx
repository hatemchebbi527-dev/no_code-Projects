"use client";

// Manuvo - form pubblico per pubblicare una richiesta.
import { useActionState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createLead, type LeadFormState } from "./actions";

type Opt = { value: string; label: string };

export function LeadForm({
  categories,
  countries,
  urgencies,
}: {
  categories: Opt[];
  countries: Opt[];
  urgencies: Opt[];
}) {
  const t = useTranslations("pubblica");
  const [state, formAction, isPending] = useActionState<LeadFormState, FormData>(
    createLead,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-green-900">{t("success_title")}</h2>
        <p className="mt-2 text-sm text-green-800">{t("success_text")}</p>
        <Link
          href="/pubblica"
          className="mt-5 inline-block rounded-lg bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800"
        >
          {t("publish_another")}
        </Link>
      </div>
    );
  }

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";
  const req = <span className="text-red-600">*</span>;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("need")} {req}</span>
        <select name="category" required defaultValue="" className={input}>
          <option value="" disabled>{t("choose")}</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("desc")} {req}</span>
        <textarea name="description" required rows={4} placeholder={t("desc_ph")} className={`${input} resize-y`} />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("country")} {req}</span>
          <select name="country" defaultValue="IT" className={input}>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("city")} {req}</span>
          <input name="city" required placeholder={t("city_ph")} className={input} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("when")}</span>
        <select name="urgency" defaultValue="ASAP" className={input}>
          {urgencies.map((u) => (
            <option key={u.value} value={u.value}>{u.label}</option>
          ))}
        </select>
      </label>

      <hr className="my-1 border-neutral-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("name")} {req}</span>
          <input name="contactName" required placeholder={t("name_ph")} className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{t("phone")} {req}</span>
          <input name="contactPhone" required placeholder="+39 ..." className={input} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("email_opt")}</span>
        <input name="contactEmail" type="email" placeholder="you@email.com" className={input} />
        <span className="text-xs text-neutral-400">{t("hint")}</span>
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
