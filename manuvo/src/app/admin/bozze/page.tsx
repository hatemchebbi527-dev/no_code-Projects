// Manuvo - pannello admin: ebauches non finalisees (contatti "persi" da rilanciare).
import { getTranslations } from "next-intl/server";
import { getLeadDrafts } from "@/lib/admin";
import { isCategory } from "@/lib/constants";

export const metadata = { title: "Manuvo" };

export default async function AdminDraftsPage() {
  const t = await getTranslations("admin");
  const tCat = await getTranslations("categories");
  const drafts = await getLeadDrafts();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("bozze_title")}</h1>
        <p className="mt-1 text-sm text-neutral-500">{t("bozze_subtitle")}</p>
      </div>

      {drafts.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {t("empty_bozze")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-start text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-4 py-3 text-start font-semibold">{t("th_name")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_phone")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_email")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_category")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_city")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_created")}</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((d) => (
                <tr key={d.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    {`${d.firstName} ${d.lastName}`.trim()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                    {d.phone ? (
                      <a href={`tel:${d.phone}`} className="text-red-700 hover:underline">{d.phone}</a>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                    {d.email ? (
                      <a href={`mailto:${d.email}`} className="text-red-700 hover:underline">{d.email}</a>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {d.category && isCategory(d.category) ? tCat(d.category) : <span className="text-neutral-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {d.city ?? <span className="text-neutral-300">—</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-neutral-500">
                    {d.createdAt.toISOString().slice(0, 10)}
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
