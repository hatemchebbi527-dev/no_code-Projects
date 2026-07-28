import Link from "next/link";
import { servizi } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./servizi.module.css";

export const metadata = {
  title: "Servizi di automazione per studi professionali",
  description:
    "Automazioni su misura per avvocati, commercialisti e cliniche: appuntamenti automatici, solleciti, assistente FAQ 24/7, CRM e presenza online.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi di automazione per studi professionali",
    description:
      "Appuntamenti automatici, solleciti, assistente FAQ 24/7 e presenza online — su misura per il Suo studio.",
    url: "/servizi",
  },
};

export default function ServiziPage() {
  return (
    <>
      {/* HERO scuro */}
      <section className="section--dark" style={{ padding: "96px 0 64px" }}>
        <div className="container center" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="eyebrow">Servizi</span>
            <h1>{servizi.intro.title}</h1>
            <p className="lead mt-24" style={{ margin: "18px auto 0" }}>
              {servizi.intro.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* OFFERTE */}
      <section className="section">
        <div className="container">
          <div className={`grid-3 ${styles.griglia}`}>
            {servizi.offerte.map((o, i) => (
              <Reveal key={i} delay={i * 120}>
                <div
                  className={`card ${styles.card} ${o.evidenza ? styles.evidenza : ""}`}
                  style={{ height: "100%" }}
                >
                  {o.badge && <span className={styles.badge}>{o.badge}</span>}
                  <h3>{o.nome}</h3>
                  <p className={styles.perche}>{o.perche}</p>
                  <ul className={styles.lista}>
                    {o.include.map((v, j) => (
                      <li key={j}>{v}</li>
                    ))}
                  </ul>
                  <p className={styles.prezzo}>{o.prezzo}</p>
                  <p className={styles.nota}>{o.nota}</p>
                  <Link href={o.cta.href} className="btn">
                    {o.cta.label}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
