import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import {
  jsonLdScript,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Agenzia eventi e marketing esperienziale a Rimini`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "agenzia eventi",
    "agenzia marketing esperienziale",
    "agenzia eventi MICE",
    "organizzazione eventi Rimini",
    "agenzia comunicazione Rimini",
    "brand activation",
    "tour promozionali",
    "eventi aziendali",
    "marketing esperienziale",
    "event management Italia",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Trasformiamo i brand in esperienze`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.jpg", // DA AGGIUNGERE: immagine 1200x630 in /public
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — agenzia eventi e marketing esperienziale`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Trasformiamo i brand in esperienze`,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0A09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.lang} className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([
              organizationSchema(),
              localBusinessSchema(),
              websiteSchema(),
            ]),
          }}
        />
      </head>
      <body>
        {/* Skip link per accessibilità (WCAG) */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-foreground"
        >
          Vai al contenuto
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
