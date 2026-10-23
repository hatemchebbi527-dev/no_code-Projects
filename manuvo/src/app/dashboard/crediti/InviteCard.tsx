"use client";

// Manuvo - carta "invita un collega" : il codice invito e il link da condividere.
// Il codice e il matricolo dell'artigiano (ART-0001), gia unico: niente da generare.
import { useState } from "react";
import { useTranslations } from "next-intl";

export function InviteCard({ code, count }: { code: string; count: number }) {
  const t = useTranslations("credits");
  const [copied, setCopied] = useState(false);
  // Costruito sul client: funziona sia in locale sia in produzione, senza variabile d'ambiente.
  const link = typeof window === "undefined" ? "" : `${window.location.origin}/signup?ref=${code}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard rifiutata (contesto non sicuro o permesso negato) : il link resta selezionabile a mano.
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{t("invite_title")}</h2>
      <p className="mt-1 text-sm text-neutral-500">{t("invite_body")}</p>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("invite_code")}</span>
        <span className="font-mono text-xl font-bold tracking-wider text-red-700">{code}</span>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("invite_link")}</span>
        <div className="flex flex-wrap items-center gap-2">
          <input
            readOnly
            value={link}
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-700 outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {copied ? t("invite_copied") : t("invite_copy")}
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">{t("invite_count", { count })}</p>
      <p className="mt-1 text-xs text-neutral-400">{t("invite_cap")}</p>
    </div>
  );
}
