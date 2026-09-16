"use client";

// Manuvo - campanella notifiche con badge aggiornato in tempo quasi reale
// (polling periodico + al ritorno sulla scheda), senza ricaricare la pagina.
import { useEffect, useState } from "react";
import Link from "next/link";

export function NotificationBell({
  initialCount,
  href,
  label,
}: {
  initialCount: number;
  href: string;
  label: string;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch("/api/notifications/unread", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { count?: number };
        if (active && typeof data.count === "number") setCount(data.count);
      } catch {
        // hors ligne / erreur passagère : on ignore
      }
    }

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

  return (
    <Link
      href={href}
      aria-label={label}
      className="relative rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -end-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
