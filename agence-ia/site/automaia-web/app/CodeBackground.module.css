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
    default: "AutomaIA — Automazione e IA per studi professionali e cliniche",
    template: "%s | AutomaIA",
  },
  description:
    "Automatizzo le attività ripetitive di avvocati, commercialisti e cliniche in Italia: appuntamenti, promemoria e risposte automatiche. Fino a 10 ore recuperate a settimana. Audit gratuito.",
  keywords: [
    "automazione studio legale",
    "automazione commercialista",
    "IA per avvocati",
    "IA per commercialisti",
    "automazione clinica veterinaria",
    "assistente virtuale studio professionale",
    "automazione processi studio professionale",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "AutomaIA",
    title: "AutomaIA — Automazione e IA per studi professionali e cliniche",
    description:
      "Recupera fino a 10 ore a settimana automatizzando le attività ripetitive del tuo studio. Audit gratuito di 20 minuti.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AutomaIA — Automazione e IA per studi professionali" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutomaIA — Automazione e IA per studi professionali e cliniche",
    description: "Recupera fino a 10 ore a settimana automatizzando le attività ripetitive del tuo studio.",
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
    "Automazione e intelligenza artificiale per studi professionali (avvocati, commercialisti) e cliniche in Italia.",
  url: SITE_URL,
  email: brand.email,
  areaServed: "IT",
  audience: {
    "@type": "Audience",
    audienceType: "Avvocati, Commercialisti, Cliniche veterinarie e mediche",
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
