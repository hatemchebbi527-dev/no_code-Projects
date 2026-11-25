import { getTranslations, setRequestLocale } from "next-intl/server";
import BookingPage from "@/components/BookingPage";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.audit" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/audit", locale),
    openGraph: buildOpenGraph({
      path: "/audit",
      locale,
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function AuditPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingPage locale={locale} namespace="audit" campaign="audit" />;
}
