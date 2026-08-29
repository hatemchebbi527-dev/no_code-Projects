import { Montserrat, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeBackground from "@/components/CodeBackground";
import { brand, SITE_URL } from "@/lib/brand";
import { routing } from "@/i18n/routing";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Pré-génère les deux langues au build.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Chemin canonical et alternates hreflang selon la langue.
function alternatesFor(path, locale) {
  const itUrl = `${SITE_URL}${path}`;
  const frUrl = `${SITE_URL}/fr${path}`;
  return {
    canonical: locale === "fr" ? `/fr${path}` : path || "/",
    languages: {
      it: itUrl || `${SITE_URL}/`,
      fr: frUrl,
      "x-default": itUrl || `${SITE_URL}/`,
    },
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const ogLocale = locale === "fr" ? "fr_FR" : "it_IT";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | AutomaIA",
    },
    description: t("description"),
    alternates: alternatesFor("", locale),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: locale === "fr" ? `${SITE_URL}/fr` : SITE_URL,
      siteName: "AutomaIA",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t("ogTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og-image.jpg"],
    },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Active le rendu statique pour cette langue.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "brand" });

  // JSON-LD ProfessionalService : améliore l'éligibilité aux résultats enrichis.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description: t("tagline"),
    url: locale === "fr" ? `${SITE_URL}/fr` : SITE_URL,
    email: brand.email,
    areaServed: "IT",
    inLanguage: locale,
  };

  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <CodeBackground />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
