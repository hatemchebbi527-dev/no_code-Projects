// Manuvo - centro notifiche admin: ogni nuova richiesta pubblicata.
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { getNotifications, markAllRead } from "@/lib/notifications";
import { countryName } from "@/lib/catalog";
import { PushToggle } from "../../dashboard/notifiche/PushToggle";

export const metadata = { title: "Manuvo" };

export default async function AdminNotifichePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const locale = await getLocale();
  const t = await getTranslations("notifiche");
  const tCat = await getTranslations("categories");

  const notifs = await getNotifications(session.user.id);
  await markAllRead(session.user.id);

  const fmt = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle_admin")}</p>

      <div className="mt-6">
        <PushToggle />
      </div>

      {notifs.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {notifs.map((n) => (
            <li key={n.id}>
              <Link
                href="/admin"
                className={`flex items-start gap-3 rounded-xl border p-4 transition hover:bg-neutral-50 ${
                  n.readAt ? "border-neutral-200 bg-white" : "border-red-200 bg-red-50/60"
                }`}
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-neutral-300" : "bg-red-600"}`}
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className="block font-semibold">
                    {t("new_request")} · {tCat(n.lead.category)}
                  </span>
                  <span className="block text-sm text-neutral-600">
                    {n.lead.city}, {countryName(n.lead.country, locale)}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-400">{fmt.format(n.createdAt)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
