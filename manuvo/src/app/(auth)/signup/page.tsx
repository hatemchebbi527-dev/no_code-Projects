"use client";

// Manuvo - registrazione artigiano.
import { useActionState } from "react";
import Link from "next/link";
import { registerArtisan, type AuthState } from "../actions";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    registerArtisan,
    undefined,
  );

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold tracking-tight">Diventa artigiano su Manuvo</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Crea un account gratuito. Comprerai i crediti quando vuoi sbloccare un contatto.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Nome e cognome</span>
          <input
            name="name"
            required
            className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            placeholder="Mario Rossi"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            placeholder="tu@email.com"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Citta</span>
          <input
            name="city"
            className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            placeholder="Rimini"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              placeholder="min. 8 caratteri"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Conferma</span>
            <input
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              placeholder="ripeti password"
            />
          </label>
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
        >
          {isPending ? "Creazione..." : "Crea account gratis"}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        Hai gia un account?{" "}
        <Link href="/login" className="font-semibold text-teal-700 hover:underline">
          Accedi
        </Link>
      </p>
    </div>
  );
}
