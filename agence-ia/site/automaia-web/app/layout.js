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

export const metadata = {
  title: "AutomaIA — Automazione e IA per studi legali e di commercialisti",
  description:
    "Automatizzo le attività ripetitive di avvocati e commercialisti per far recuperare fino a 10 ore a settimana. Dati sempre protetti.",
  metadataBase: new URL("https://automaia.net"),
  openGraph: {
    title: "AutomaIA — Automazione per studi professionali",
    description:
      "Recupera fino a 10 ore a settimana automatizzando le attività ripetitive del tuo studio.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <CodeBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
