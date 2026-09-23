// Manuvo - layout del pannello admin (header + guardia ruolo ADMIN).
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { getUnreadCount } from "@/lib/notifications";
import { getTotalAdminUnread } from "@/lib/messages";
import { LOCALES, type Locale } from "@/lib/constants";
import { logout } from "../(auth)/actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NotificationBell } from "@/components/NotificationBell";
import { LogoWordmark } from "@/components/LogoWordmark";
import { AdminNav } from "./AdminNav";

// Libelle de nav "Messaggi" (inline, 5 langues).
const NAV_MESSAGGI: Record<Locale, string> = {
  it: "Messaggi",
  fr: "Messages",
  en: "Messages",
  de: "Nachrichten",
  ar: "الرسائل",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");
  const unread = await getUnreadCount(session.user.id);
  const msgUnread = await getTotalAdminUnread();
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3">
          <Link href="/admin" className="me-auto flex items-center gap-2 font-extrabold tracking-tight">
            <LogoWordmark className="h-7 w-auto" />
            <span className="text-sm font-medium text-neutral-400">{tn("admin")}</span>
          </Link>
          <NotificationBell initialCount={unread} href="/admin/notifiche" label={tn("notifiche")} />
          <LanguageSwitcher />
          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              {tc("esci")}
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        <AdminNav messaggiLabel={NAV_MESSAGGI[locale]} messaggiUnread={msgUnread} />
        {children}
      </main>
    </div>
  );
}
