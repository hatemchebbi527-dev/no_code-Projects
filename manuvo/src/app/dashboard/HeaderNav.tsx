"use client";

// Manuvo - navigation de l'espace artisan avec etat "page active".
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav({
  credits,
  bachecaLabel,
  creditiLabel,
}: {
  credits: number;
  bachecaLabel: string;
  creditiLabel: string;
}) {
  const pathname = usePathname();
  const onBacheca = pathname === "/dashboard";
  const onCrediti = pathname.startsWith("/dashboard/crediti");

  const navBase = "rounded-lg px-3 py-1.5 text-sm font-medium transition";
  const navActive = "bg-red-50 text-red-700";
  const navIdle = "text-neutral-600 hover:bg-neutral-100";

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex">
        <Link
          href="/dashboard"
          aria-current={onBacheca ? "page" : undefined}
          className={`${navBase} ${onBacheca ? navActive : navIdle}`}
        >
          {bachecaLabel}
        </Link>
        <Link
          href="/dashboard/crediti"
          aria-current={onCrediti ? "page" : undefined}
          className={`${navBase} ${onCrediti ? navActive : navIdle}`}
        >
          {creditiLabel}
        </Link>
      </nav>

      {/* Solde de credits : lien vers la recharge, en mode "actif" (non cliquable) sur la page Crediti. */}
      {onCrediti ? (
        <span
          aria-current="page"
          className="flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 ring-2 ring-amber-200"
        >
          <CoinIcon />
          <span className="tabular-nums">{credits}</span>
        </span>
      ) : (
        <Link
          href="/dashboard/crediti"
          className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
        >
          <CoinIcon />
          <span className="tabular-nums">{credits}</span>
        </Link>
      )}
    </>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
    </svg>
  );
}
