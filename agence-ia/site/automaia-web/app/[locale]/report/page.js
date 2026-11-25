import { getTranslations, setRequestLocale } from "next-intl/server";
import BookingPage from "@/components/BookingPage";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.report" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/report", locale),
    openGraph: buildOpenGraph({
      path: "/report",
      locale,
      title: t("title"),
      description: t("description"),
      image: "/og-report.jpg",
    }),
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-report.jpg"],
    },
  };
}

export default async function ReportPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingPage locale={locale} namespace="report" campaign="report" optin />;
}
