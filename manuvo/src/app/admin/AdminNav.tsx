"use client";
// Manuvo - onglets del pannello admin (richieste / artigiani).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function AdminNav({
  messaggiLabel,
  messaggiUnread = 0,
}: {
  messaggiLabel: string;
  messaggiUnread?: number;
}) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const tabs = [
    { href: "/admin", label: t("nav_requests"), badge: 0 },
    { href: "/admin/artigiani", label: t("nav_artisans"), badge: 0 },
    { href: "/admin/bozze", label: t("nav_bozze"), badge: 0 },
    { href: "/admin/rimborsi", label: t("nav_rimborsi"), badge: 0 },
    { href: "/admin/messaggi", label: messaggiLabel, badge: messaggiUnread },
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
