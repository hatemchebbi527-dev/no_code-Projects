"use client";

// Manuvo - form pubblico per pubblicare una richiesta.
import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createLead, type LeadFormState } from "./actions";
import { saveLeadDraft } from "./draft-actions";
import { requestPhoneCode, confirmPhoneCode } from "./verify-actions";

type Opt = { value: string; label: string };

export function LeadForm({
  categories,
  countries,
  urgencies,
  defaultCategory = "",
}: {
  categories: Opt[];
  countries: Opt[];
  urgencies: Opt[];
  defaultCategory?: string;
}) {
  const t = useTranslations("pubblica");
  // Prénom capté dès l'ouverture : sert à personnaliser l'accueil ("Piacere, Mario!").
  const [firstName, setFirstName] = useState("");
  // Ebauche enregistrée avant l'envoi (best effort) : on retient son id pour la mettre à jour.
  const [draftId, setDraftId] = useState<string | null>(null);
  const draftIdRef = useRef<string | null>(null);
  const savingRef = useRef(false);
  // Verifica del telefono via SMS (anti-faux-leads).
  const [phone, setPhone] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState<LeadFormState, FormData>(
    createLead,
    undefined,
  );

  function countryFrom(form: HTMLFormElement | null): string {
    if (!form) return "IT";
    return String(new FormData(form).get("country") ?? "IT");
  }

  async function onSendCode(e: React.MouseEvent<HTMLButtonElement>) {
    const country = countryFrom(e.currentTarget.form);
    setVerifyBusy(true);
    setVerifyMsg(null);
    setDevCode(null);
    try {
      const res = await requestPhoneCode(phone, country);
      if (res.error) {
        setVerifyMsg(res.error);
        return;
      }
      setCodeSent(true);
      setDevCode(res.devCode ?? null);
    } finally {
      setVerifyBusy(false);
    }
  }

  async function onConfirmCode(e: React.MouseEvent<HTMLButtonElement>) {
    const country = countryFrom(e.currentTarget.form);
    setVerifyBusy(true);
    setVerifyMsg(null);
    try {
      const res = await confirmPhoneCode(phone, country, code);
      if (res.error) {
        setVerifyMsg(res.error);
        return;
      }
      setPhoneVerified(true);
      setCodeSent(false);
      setDevCode(null);
    } finally {
      setVerifyBusy(false);
    }
  }

  // Si le numéro change, toute vérification précédente est annulée.
  function onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value);
    if (phoneVerified || codeSent) {
      setPhoneVerified(false);
      setCodeSent(false);
      setCode("");
      setVerifyMsg(null);
      setDevCode(null);
    }
  }

  // Sauvegarde progressive de l'ebauche au fil de la saisie (au blur des champs).
  async function persistDraft(form: HTMLFormElement | null) {
    if (!form || savingRef.current) return;
    const fd = new FormData(form);
    const fn = String(fd.get("contactFirstName") ?? "").trim();
    if (!fn) return; // rien à enregistrer tant qu'il n'y a pas de prénom
    savingRef.current = true;
    try {
      const res = await saveLeadDraft({
        draftId: draftIdRef.current ?? undefined,
        firstName: fn,
        lastName: String(fd.get("contactLastName") ?? ""),
        phone: String(fd.get("contactPhone") ?? ""),
        email: String(fd.get("contactEmail") ?? ""),
        category: String(fd.get("category") ?? ""),
        city: String(fd.get("city") ?? ""),
        country: String(fd.get("country") ?? ""),
      });
      if (res?.id && draftIdRef.current !== res.id) {
        draftIdRef.current = res.id;
        setDraftId(res.id);
      }
    } finally {
      savingRef.current = false;
    }
  }

  function onFieldBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    void persistDraft(e.currentTarget.form);
  }

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
      {/* id de l'ebauche enregistree avant l'envoi : permet de la marquer convertie a la soumission. */}
      <input type="hidden" name="draftId" value={draftId ?? ""} />

      {/* Identità : catturata appena si apre la pagina, in cima al modulo. */}
      <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4">
        <span className="text-sm font-semibold text-neutral-800">{t("identity_title")}</span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("firstName")} {req}</span>
            <input
              name="contactFirstName"
              required
              autoFocus
              autoComplete="given-name"
              placeholder={t("firstName_ph")}
              className={input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={onFieldBlur}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("lastName")} {req}</span>
            <input
              name="contactLastName"
              required
              autoComplete="family-name"
              placeholder={t("lastName_ph")}
              className={input}
              onBlur={onFieldBlur}
            />
          </label>
        </div>
        {firstName.trim() && (
          <p className="text-sm font-medium text-red-800">
            {t("greeting", { name: firstName.trim() })}
          </p>
        )}
        <p className="text-xs text-neutral-400">
          {t.rich("privacy_hint", {
            privacy: (c) => (
              <Link href="/legal/privacy" className="underline hover:text-red-700">{c}</Link>
            ),
          })}
        </p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("need")} {req}</span>
        <select name="category" required defaultValue={defaultCategory} className={input} onBlur={onFieldBlur}>
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
          <input name="city" required placeholder={t("city_ph")} className={input} onBlur={onFieldBlur} />
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

      {/* Telefono con verifica via SMS (anti-faux-leads). */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{t("phone")} {req}</span>
        <div className="flex gap-2">
          <input
            name="contactPhone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+39 ..."
            className={`${input} flex-1`}
            value={phone}
            onChange={onPhoneChange}
            onBlur={onFieldBlur}
            readOnly={phoneVerified}
          />
          {phoneVerified ? (
            <span className="inline-flex flex-none items-center gap-1.5 rounded-lg bg-green-50 px-3 text-sm font-semibold text-green-700">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              {t("phone_verified")}
            </span>
          ) : (
            <button
              type="button"
              onClick={onSendCode}
              disabled={verifyBusy || phone.trim().length < 6}
              className="flex-none rounded-lg border border-red-300 bg-white px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
            >
              {codeSent ? t("resend_code") : t("verify_cta")}
            </button>
          )}
        </div>

        {codeSent && !phoneVerified && (
          <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <span className="text-xs text-neutral-600">{t("verify_sent_hint")}</span>
            {devCode && (
              <span className="text-xs font-semibold text-amber-700">{t("dev_code_hint", { code: devCode })}</span>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder={t("code_ph")}
                className={`${input} flex-1 tracking-[0.3em]`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="button"
                onClick={onConfirmCode}
                disabled={verifyBusy || code.replace(/\D/g, "").length !== 6}
                className="flex-none rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-50"
              >
                {t("confirm_code")}
              </button>
            </div>
          </div>
        )}

        {verifyMsg && <p className="text-sm text-red-700">{verifyMsg}</p>}
        {!phoneVerified && (
          <span className="text-xs text-neutral-400">{t("verify_required_hint")}</span>
        )}
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("email_opt")}</span>
        <input name="contactEmail" type="email" autoComplete="email" placeholder="you@email.com" className={input} onBlur={onFieldBlur} />
        <span className="text-xs text-neutral-400">{t("hint")}</span>
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || !phoneVerified}
        className="mt-1 rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
