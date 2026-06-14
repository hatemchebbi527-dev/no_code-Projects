"use client";

import { useState } from "react";
import { Loader2, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const budgets = [
  "Meno di 10.000 €",
  "10.000 - 30.000 €",
  "30.000 - 75.000 €",
  "Oltre 75.000 €",
  "Da definire",
];

const projectTypes = [
  "Sport Sponsorship",
  "Eventi e Tour",
  "Fiere e Congressi",
  "Incentive",
  "Sampling",
  "Life & Sport Coaching",
  "Altro",
];

const inputBase =
  "w-full rounded-xl border border-line bg-bg-subtle px-4 text-fg placeholder:text-fg-muted/60 transition-colors focus:border-accent focus-visible:ring-0";
const labelBase =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-fg-muted";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelBase}>
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-bg-subtle p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-fg">
          Richiesta inviata, grazie!
        </h3>
        <p className="mt-3 max-w-md text-fg-muted">
          Ti rispondiamo entro 24 ore. Per urgenze, chiamaci pure allo{" "}
          {siteConfig.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-8")}
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-bg-subtle p-7 sm:p-9"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome e cognome" required>
          <input name="nome" required placeholder="Mario Rossi" className={cn(inputBase, "h-12")} />
        </Field>
        <Field label="Azienda / Club">
          <input name="azienda" placeholder="La tua organizzazione" className={cn(inputBase, "h-12")} />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            placeholder="mario@azienda.it"
            className={cn(inputBase, "h-12")}
          />
        </Field>
        <Field label="Telefono">
          <input
            name="telefono"
            type="tel"
            placeholder="+39 ..."
            className={cn(inputBase, "h-12")}
          />
        </Field>
        <Field label="Budget orientativo">
          <select name="budget" defaultValue="" className={cn(inputBase, "h-12")}>
            <option value="" disabled>
              Seleziona...
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo di progetto">
          <select name="tipoProgetto" defaultValue="" className={cn(inputBase, "h-12")}>
            <option value="" disabled>
              Seleziona...
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Il tuo progetto" required>
          <textarea
            name="messaggio"
            required
            rows={5}
            placeholder="Raccontaci obiettivi, sport o asset, tempi e cosa hai in mente..."
            className={cn(inputBase, "resize-none py-3")}
          />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-fg-muted">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-line bg-bg-subtle accent-accent"
        />
        <span>
          Ho letto e accetto la{" "}
          <a href="/privacy" className="text-fg underline underline-offset-2 hover:text-accent">
            privacy policy
          </a>{" "}
          e acconsento al trattamento dei dati. <span className="text-accent">*</span>
        </span>
      </label>

      {status === "error" && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-fg">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <span>
            Ops, qualcosa è andato storto. Riprova, oppure scrivici direttamente a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            .
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(buttonVariants({ size: "lg" }), "mt-7 w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            Invia la richiesta
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
