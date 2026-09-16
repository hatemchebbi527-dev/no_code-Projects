// Manuvo - pagina "Aggiungi alla Home" (installazione PWA).
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InstallGuide } from "./InstallGuide";

export const metadata = { title: "Manuvo" };

export default async function InstallaPage() {
  const t = await getTranslations("installa");

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-700 text-white">M</span>
            Manuvo
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            {t("eyebrow")}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-2 text-neutral-500">{t("subtitle")}</p>
        </div>

        <InstallGuide />
      </main>
    </div>
  );
}
