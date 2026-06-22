import Link from "next/link";
import { servizi } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./servizi.module.css";

export const metadata = {
  title: "Servizi — AutomaIA",
  description:
    "Automazione su misura per avvocati e commercialisti: appuntamenti, solleciti, assistente FAQ, CRM e presenza online.",
};

export default function ServiziPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="title-block center">
          <Reveal>
            <span className="eyebrow">Servizi</span>
            <h1>{servizi.intro.title}</h1>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
              {servizi.intro.text}
            </p>
          </Reveal>
        </div>

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
  );
}
