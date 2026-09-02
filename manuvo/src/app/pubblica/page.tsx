// Manuvo - pagina pubblica: un privato pubblica una richiesta (senza account).
import Link from "next/link";
import { CATEGORIES, COUNTRIES, URGENCIES } from "@/lib/constants";
import { CATEGORY_LABEL_IT, URGENCY_LABEL_IT, countryNameIt } from "@/lib/catalog";
import { LeadForm } from "./LeadForm";

export const metadata = {
  title: "Pubblica una richiesta · Manuvo",
};

export default function PubblicaPage() {
  const categories = CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABEL_IT[c] }));
  const countries = COUNTRIES.map((c) => ({ value: c, label: countryNameIt(c) }));
  const urgencies = URGENCIES.map((u) => ({ value: u, label: URGENCY_LABEL_IT[u] }));

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">M</span>
            Manuvo
          </Link>
          <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Sei un artigiano?
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Per i privati
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Hai bisogno di un lavoro in casa?
          </h1>
          <p className="mt-2 text-neutral-500">
            Descrivi cosa ti serve. E gratis e non serve alcun account. Gli
            artigiani della tua zona ti contatteranno.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <LeadForm categories={categories} countries={countries} urgencies={urgencies} />
        </div>
      </main>
    </div>
  );
}
