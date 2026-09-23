"use client";
// Manuvo - onglets del pannello admin (richieste / artigiani).
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

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

export function AdminNav({
  messaggiLabel,
  messaggiUnread = 0,
}: {
  messaggiLabel: string;
  messaggiUnread?: number;
}) {
  const t = useTranslations("admin");
  const pathname = usePathname();

  // Badge messaggi non letti, aggiornato lato client (polling + focus/scheda + cambio pagina).
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
  useEffect(() => {
    let active = true;
    fetchMsgUnread().then((c) => {
      if (active && c !== null) setMsgCount(c);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  const tabs = [
    { href: "/admin", label: t("nav_requests"), badge: 0 },
    { href: "/admin/artigiani", label: t("nav_artisans"), badge: 0 },
    { href: "/admin/bozze", label: t("nav_bozze"), badge: 0 },
    { href: "/admin/rimborsi", label: t("nav_rimborsi"), badge: 0 },
    { href: "/admin/messaggi", label: messaggiLabel, badge: msgCount },
  ];

  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1">
      {tabs.map((tab) => {
        const active =
          tab.href === "/admin" ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-red-700 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge > 0 && (
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold leading-none ${
                  active ? "bg-white text-red-700" : "bg-red-600 text-white"
                }`}
              >
                {tab.badge > 9 ? "9+" : tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
