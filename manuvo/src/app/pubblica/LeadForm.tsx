"use client";

// Manuvo - form pubblico per pubblicare una richiesta.
import { useActionState } from "react";
import Link from "next/link";
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
  const [state, formAction, isPending] = useActionState<LeadFormState, FormData>(
    createLead,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-teal-600 text-white">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-teal-900">Richiesta pubblicata!</h2>
        <p className="mt-2 text-sm text-teal-800">
          Gli artigiani della tua zona possono ora vedere la richiesta e
          contattarti. I tuoi dati restano privati finche un professionista non
          li sblocca.
        </p>
        <Link
          href="/pubblica"
          className="mt-5 inline-block rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white hover:bg-teal-800"
        >
          Pubblica un'altra richiesta
        </Link>
      </div>
    );
  }

  const input =
    "rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20";

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Di cosa hai bisogno? <span className="text-red-600">*</span></span>
        <select name="category" required defaultValue="" className={input}>
          <option value="" disabled>Scegli una categoria...</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Descrivi il lavoro <span className="text-red-600">*</span></span>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Es. Perdita d'acqua sotto il lavello della cucina, serve intervento urgente."
          className={`${input} resize-y`}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Paese <span className="text-red-600">*</span></span>
          <select name="country" defaultValue="IT" className={input}>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Citta <span className="text-red-600">*</span></span>
          <input name="city" required placeholder="Es. Rimini" className={input} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Quando?</span>
        <select name="urgency" defaultValue="ASAP" className={input}>
          {urgencies.map((u) => (
            <option key={u.value} value={u.value}>{u.label}</option>
          ))}
        </select>
      </label>

      <hr className="my-1 border-neutral-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Il tuo nome <span className="text-red-600">*</span></span>
          <input name="contactName" required placeholder="Nome e cognome" className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Telefono <span className="text-red-600">*</span></span>
          <input name="contactPhone" required placeholder="+39 ..." className={input} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Email (facoltativa)</span>
        <input name="contactEmail" type="email" placeholder="tu@email.it" className={input} />
        <span className="text-xs text-neutral-400">
          I tuoi contatti restano privati finche un artigiano non li sblocca.
        </span>
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
      >
        {isPending ? "Invio..." : "Pubblica richiesta gratis"}
      </button>
    </form>
  );
}
