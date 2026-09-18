"use client";

// Manuvo - formulaire d'edition du profil artigiano.
import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { updateProfile, type ProfileState } from "./actions";
import { CATEGORIES, COUNTRIES } from "@/lib/constants";
import { countryName } from "@/lib/catalog";

type ProfileFormProps = {
  defaults: {
    name: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    piva: string | null;
    categories: string[];
  };
};

export function ProfileForm({ defaults }: ProfileFormProps) {
  const t = useTranslations("profilo");
  const ts = useTranslations("signup");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState<ProfileState, FormData>(
    updateProfile,
    undefined,
  );

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";
  const locked =
    "rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-neutral-500";

  const countries = [...COUNTRIES]
    .map((code) => ({ code, label: countryName(code, locale) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));

  const selected = new Set(defaults.categories);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{ts("name")}</span>
        <input name="name" required defaultValue={defaults.name} className={input} />
      </label>

      {/* Email : identifiant de connexion, non modifiable ici. */}
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{ts("email")}</span>
        <input value={defaults.email} readOnly disabled className={locked} />
        <span className="text-xs text-neutral-400">{t("email_locked")}</span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{ts("phone")}</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          defaultValue={defaults.phone}
          className={input}
          placeholder={ts("phone_ph")}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{ts("country")}</span>
          <select name="country" defaultValue={defaults.country} className={input}>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{ts("city")}</span>
          <input name="city" defaultValue={defaults.city} className={input} placeholder="Rimini" />
        </label>
      </div>

      {/* P.IVA : cle anti-abus des credits, non modifiable. */}
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{ts("piva")}</span>
        <input value={defaults.piva ?? "—"} readOnly disabled className={locked} />
        <span className="text-xs text-neutral-400">{t("piva_locked")}</span>
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">{ts("categories_label")}</legend>
        <p className="text-xs text-neutral-500">{ts("categories_hint")}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="cursor-pointer">
              <input
                type="checkbox"
                name="categories"
                value={cat}
                defaultChecked={selected.has(cat)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-red-600/30">
                {tc(cat)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{t("saved")}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 w-fit rounded-lg bg-red-700 px-5 py-2.5 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
      >
        {isPending ? t("saving") : t("save")}
      </button>
    </form>
  );
}
