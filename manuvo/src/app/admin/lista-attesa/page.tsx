// Manuvo - pannello admin : iscritti alla lista d'attesa (coming soon).
// Accesso protetto dal layout admin (ruolo ADMIN).
import { getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, type Locale } from "@/lib/constants";

export const metadata = { title: "Manuvo" };
export const dynamic = "force-dynamic";

const L: Record<Locale, {
  title: string;
  subtitle: string;
  total: string;
  week: string;
  empty: string;
  email: string;
  lang: string;
  source: string;
  date: string;
  direct: string;
}> = {
  it: { title: "Lista d'attesa", subtitle: "Iscritti dalla pagina coming soon, dal più recente.", total: "Iscritti", week: "Ultimi 7 giorni", empty: "Nessun iscritto per ora.", email: "Email", lang: "Lingua", source: "Provenienza", date: "Data", direct: "diretta" },
  fr: { title: "Liste d'attente", subtitle: "Inscrits depuis la page coming soon, du plus récent au plus ancien.", total: "Inscrits", week: "7 derniers jours", empty: "Aucun inscrit pour l'instant.", email: "E-mail", lang: "Langue", source: "Provenance", date: "Date", direct: "directe" },
  en: { title: "Waitlist", subtitle: "Sign-ups from the coming soon page, newest first.", total: "Sign-ups", week: "Last 7 days", empty: "No sign-ups yet.", email: "Email", lang: "Language", source: "Source", date: "Date", direct: "direct" },
  de: { title: "Warteliste", subtitle: "Anmeldungen über die Coming-soon-Seite, neueste zuerst.", total: "Anmeldungen", week: "Letzte 7 Tage", empty: "Noch keine Anmeldungen.", email: "E-Mail", lang: "Sprache", source: "Herkunft", date: "Datum", direct: "direkt" },
  ar: { title: "قائمة الانتظار", subtitle: "المسجلون من صفحة الإطلاق القريب، الأحدث أولاً.", total: "المسجلون", week: "آخر 7 أيام", empty: "لا يوجد مسجلون بعد.", email: "البريد", lang: "اللغة", source: "المصدر", date: "التاريخ", direct: "مباشر" },
};

// Lecture hors du rendu (Date.now est impur dans un composant).
async function getWaitlist() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [entries, lastWeek] = await Promise.all([
    prisma.waitlist.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.waitlist.count({ where: { createdAt: { gte: weekAgo } } }),
  ]);
  return { entries, lastWeek };
}

export default async function AdminWaitlistPage() {
  const locale = (await getLocale()) as Locale;
  const t = L[locale] ?? L[DEFAULT_LOCALE];

  const { entries, lastWeek } = await getWaitlist();

  const fmt = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const sourceOf = (e: (typeof entries)[number]) =>
    [e.utmSource, e.utmMedium, e.utmCampaign].filter(Boolean).join(" / ") || t.direct;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t.subtitle}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="text-xs font-medium text-neutral-500">{t.total}</div>
          <div className="mt-1 text-2xl font-bold tabular-nums">{entries.length}</div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="text-xs font-medium text-neutral-500">{t.week}</div>
          <div className="mt-1 text-2xl font-bold tabular-nums">{lastWeek}</div>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {t.empty}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-500">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">{t.email}</th>
                <th className="px-4 py-3 text-start font-semibold">{t.lang}</th>
                <th className="px-4 py-3 text-start font-semibold">{t.source}</th>
                <th className="px-4 py-3 text-start font-semibold">{t.date}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium">
                    <a href={`mailto:${e.email}`} className="hover:underline">
                      {e.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 uppercase text-neutral-600">{e.lang}</td>
                  <td className="px-4 py-3 text-neutral-600">{sourceOf(e)}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-neutral-500">
                    {fmt.format(e.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
