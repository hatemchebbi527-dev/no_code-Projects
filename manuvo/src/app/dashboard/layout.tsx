// Manuvo - layout de l'espace artisan (barre du haut + navigation).
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { getUserBalance } from "@/lib/credits";
import { getUnreadCount } from "@/lib/notifications";
import { logout } from "../(auth)/actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationBell } from "@/components/NotificationBell";
import { LogoWordmark } from "@/components/LogoWordmark";
import { HeaderNav } from "./HeaderNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  // L'admin ha il suo pannello: non entra nell'area artigiano.
  if (session.user.role === "ADMIN") redirect("/admin");
  const credits = await getUserBalance(session.user.id);
  const unread = await getUnreadCount(session.user.id);
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-5 py-3">
          <Link href="/dashboard" className="me-auto flex items-center">
            <LogoWordmark className="h-7 w-auto" />
          </Link>

          <HeaderNav
            credits={credits}
            bachecaLabel={tn("bacheca")}
            creditiLabel={tn("crediti")}
            profiloLabel={tn("profilo")}
            menuLabel="Menu"
          />

          <NotificationBell initialCount={unread} href="/dashboard/notifiche" label={tn("notifiche")} />

          <LanguageSwitcher />

          {session.user.name && (
            <span
              className="hidden max-w-[90px] truncate text-sm font-medium text-neutral-700 sm:inline sm:max-w-[140px]"
              title={session.user.name}
            >
              {session.user.name}
            </span>
          )}

          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              {tc("esci")}
            </button>
          </form>
        </div>
      </header>

      {/* pb-28 sur mobile : reserve la place de la banniere d'installation fixee en bas. */}
      <main className="mx-auto max-w-4xl px-5 pt-8 pb-28 sm:pb-8">{children}</main>
    </div>
  );
}
