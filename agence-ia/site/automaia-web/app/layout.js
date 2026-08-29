import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeBackground from "@/components/CodeBackground";
import { brand } from "@/lib/content";

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

// Live domain is automa-ia.net (with a hyphen). The previous metadataBase
// pointed at automaia.net, which silently broke canonical URLs and OG image
// resolution.
const SITE_URL = "https://automa-ia.net";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AutomaIA — Automazione e IA per agenzie immobiliari, centri estetici e palestre",
    template: "%s | AutomaIA",
  },
  description:
    "Automatizzo le attività ripetitive di agenzie immobiliari, centri estetici e palestre in Italia: appuntamenti, promemoria e risposte automatiche. Fino a 10 ore recuperate a settimana. Audit gratuito.",
  keywords: [
    "automazione agenzia immobiliare",
    "automazione centro estetico",
    "automazione palestra",
    "IA per agenzie immobiliari",
    "prenotazioni automatiche centro estetico",
    "assistente virtuale palestra",
    "automazione appuntamenti attività",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "AutomaIA",
    title: "AutomaIA — Automazione e IA per agenzie immobiliari, centri estetici e palestre",
    description:
      "Recupera fino a 10 ore a settimana automatizzando le attività ripetitive della tua attività. Audit gratuito di 20 minuti.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AutomaIA — Automazione e IA per agenzie immobiliari, centri estetici e palestre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutomaIA — Automazione e IA per agenzie immobiliari, centri estetici e palestre",
    description: "Recupera fino a 10 ore a settimana automatizzando le attività ripetitive della tua attività.",
    images: ["/og-image.jpg"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

// JSON-LD ProfessionalService schema: improves rich-result eligibility in
// Google and gives AI answer engines a clean description of the business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  description:
    "Automazione e intelligenza artificiale per agenzie immobiliari, centri estetici e palestre in Italia.",
  url: SITE_URL,
  email: brand.email,
  areaServed: "IT",
  audience: {
    "@type": "Audience",
    audienceType: "Agenzie immobiliari, Centri estetici, Palestre",
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automazione appuntamenti e promemoria" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Assistente virtuale FAQ 24/7" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Presenza online e CRM su misura" } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CodeBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
