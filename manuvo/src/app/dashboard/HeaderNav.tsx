"use client";

// Manuvo - navigation de l'espace artisan avec etat "page active" + menu mobile.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Conteggio messaggi non letti (aggiornato lato client, senza ricaricare).
async function fetchMsgUnread(): Promise<number | null> {
  try {
    const res = await fetch("/api/messages/unread", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { count?: number };
    return typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

export function HeaderNav({
  credits,
  bachecaLabel,
  creditiLabel,
  profiloLabel,
  messaggiLabel,
  messaggiUnread,
  menuLabel,
}: {
  credits: number;
  bachecaLabel: string;
  creditiLabel: string;
  profiloLabel: string;
  messaggiLabel: string;
  messaggiUnread: number;
  menuLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onBacheca = pathname === "/dashboard";
  const onCrediti = pathname.startsWith("/dashboard/crediti");
  const onProfilo = pathname.startsWith("/dashboard/profilo");
  const onMessaggi = pathname.startsWith("/dashboard/messaggi");

  // Badge messaggi non letti, aggiornato lato client (polling + focus/scheda).
  const [msgCount, setMsgCount] = useState(messaggiUnread);
  useEffect(() => {
    let active = true;
    const poll = async () => {
      const c = await fetchMsgUnread();
      if (active && c !== null) setMsgCount(c);
    };
    const id = setInterval(poll, 25_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", poll);
    poll();
    return () => {
      active = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", poll);
    };
  }, []);
  // Rinfresca al cambio pagina (es. dopo aver aperto il thread che segna letto).
  useEffect(() => {
    let active = true;
    fetchMsgUnread().then((c) => {
      if (active && c !== null) setMsgCount(c);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  // Fermeture du menu mobile avec la touche Echap.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navBase = "rounded-lg px-3 py-1.5 text-sm font-medium transition";
  const navActive = "bg-red-50 text-red-700";
  const navIdle = "text-neutral-600 hover:bg-neutral-100";

  const links = [
    { href: "/dashboard", label: bachecaLabel, active: onBacheca, badge: 0 },
    { href: "/dashboard/crediti", label: creditiLabel, active: onCrediti, badge: 0 },
    { href: "/dashboard/messaggi", label: messaggiLabel, active: onMessaggi, badge: msgCount },
    { href: "/dashboard/profilo", label: profiloLabel, active: onProfilo, badge: 0 },
  ];

  return (
    <>
      {/* Menu mobile (hamburger) : la nav desktop est masquee sous sm. */}
      <div className="relative sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={menuLabel}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          {!open && msgCount > 0 && (
            <span className="absolute -end-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white" />
          )}
        </button>

        {open && (
          <>
            {/* Clic exterieur = fermeture */}
            <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-30" />
            <nav className="absolute start-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={l.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between ${navBase} ${l.active ? navActive : navIdle}`}
                >
                  <span>{l.label}</span>
                  {l.badge > 0 && <NavBadge count={l.badge} />}
                </Link>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* Navigation desktop */}
      <nav className="hidden items-center gap-1 sm:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.active ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 ${navBase} ${l.active ? navActive : navIdle}`}
          >
            <span>{l.label}</span>
            {l.badge > 0 && <NavBadge count={l.badge} />}
          </Link>
        ))}
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

function NavBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold leading-none text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
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
