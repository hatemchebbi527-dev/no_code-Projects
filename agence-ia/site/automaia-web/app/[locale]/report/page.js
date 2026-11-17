import { getTranslations, setRequestLocale } from "next-intl/server";
import BookingPage from "@/components/BookingPage";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.report" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/report", locale),
  };
}

export default async function ReportPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingPage locale={locale} namespace="report" campaign="report" />;
}
