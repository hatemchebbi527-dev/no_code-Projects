// Manuvo - pannello admin: elenco artigiani con matricola e contatti.
import { getTranslations, getLocale } from "next-intl/server";
import { getArtisans } from "@/lib/admin";
import { countryName } from "@/lib/catalog";
import { formatMatricule } from "@/lib/constants";
import { ExportButton } from "./ExportButton";

export const metadata = { title: "Manuvo" };

export default async function AdminArtisansPage() {
  const locale = await getLocale();
  const t = await getTranslations("admin");
  const artisans = await getArtisans();

  const rows = artisans.map((a) => ({
    matricule: a.matricule,
    name: a.name,
    email: a.email,
    phone: a.phone,
    city: a.city,
    country: a.country,
    credits: a.credits,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("artisans_title")}</h1>
          <p className="mt-1 text-sm text-neutral-500">{t("artisans_subtitle")}</p>
        </div>
        <ExportButton rows={rows} label={t("export_csv")} />
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {t("empty_artisans")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-start text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-4 py-3 text-start font-semibold">{t("th_matricule")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_name")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_email")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_phone")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_city")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_credits")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_joined")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.matricule} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-mono text-xs font-semibold text-red-800">
                      {formatMatricule(a.matricule)}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-800">{a.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${a.email}`} className="text-red-700 hover:underline">
                      {a.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                    {a.phone ? (
                      <a href={`tel:${a.phone}`} className="hover:underline">
                        {a.phone}
                      </a>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                    {a.city ? `${a.city}, ` : ""}
                    {countryName(a.country, locale)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-neutral-600">{a.credits}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-neutral-500">
                    {a.createdAt.slice(0, 10)}
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
