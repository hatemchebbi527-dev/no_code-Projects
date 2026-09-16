// Manuvo - pagina legale generica (privacy, termini, cookie, note).
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { LEGAL, type LegalSlug } from "@/lib/legal";
import { LOCALES, type Locale } from "@/lib/constants";

const SLUGS: LegalSlug[] = ["privacy", "termini", "cookie", "note"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

function isSlug(v: string): v is LegalSlug {
  return (SLUGS as string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) return { title: "Manuvo" };
  const locale = (await getLocale()) as Locale;
  const doc = LEGAL[slug][locale] ?? LEGAL[slug].it;
  return { title: `${doc.title} · Manuvo` };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const doc = LEGAL[slug][locale] ?? LEGAL[slug].it;

  return (
    <article>
      <h1 className="font-display text-3xl font-extrabold tracking-tight">{doc.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {doc.updated}
      </p>

      <div className="mt-8 space-y-8">
        {doc.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold">{s.h}</h2>
            {s.p.map((para, j) => (
              <p key={j} className="mt-2 leading-relaxed text-neutral-700">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <nav className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-6 text-sm">
        {SLUGS.filter((s) => s !== slug).map((s) => (
          <Link key={s} href={`/legal/${s}`} className="font-medium text-red-700 hover:underline">
            {LEGAL[s][locale].title}
          </Link>
        ))}
      </nav>
    </article>
  );
}
