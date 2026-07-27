import Link from "next/link";
import { cliniche } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./cliniche.module.css";

export const metadata = {
  title: "Cliniche — AutomaIA",
  description:
    "Automazione per cliniche e studi veterinari: prenotazione online 24/7, promemoria automatici, accoglienza multilingue. Meno appuntamenti persi, dati protetti.",
};

export default function ClinichePage() {
  return (
    <>
      <section className="section">
        <div className="container title-block center">
          <Reveal>
            <span className="eyebrow">{cliniche.hero.eyebrow}</span>
            <h1>{cliniche.hero.title}</h1>
            <p className="lead mt-24" style={{ margin: "24px auto 0" }}>{cliniche.hero.subtitle}</p>
            <div className="mt-32"><Link href={cliniche.hero.cta.href} className="btn">{cliniche.hero.cta.label}</Link></div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="title-block center"><Reveal><h2>{cliniche.problema.title}</h2></Reveal></div>
          <div className="grid-3">
            {cliniche.problema.items.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}><h3>{it.title}</h3><p>{it.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <h2>{cliniche.soluzione.title}</h2>
              <p className="lead mt-16" style={{ margin: "16px auto 0" }}>{cliniche.soluzione.intro}</p>
            </Reveal>
          </div>
          <div className="grid-3">
            {cliniche.soluzione.items.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}><h3>{it.title}</h3><p>{it.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <div className={`card ${styles.esempio}`}>
              <span className="eyebrow">{cliniche.esempio.title}</span>
              <p className={styles.esempioText}>{cliniche.esempio.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container title-block center">
          <Reveal>
            <h2>{cliniche.ctaFinale.title}</h2>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>{cliniche.ctaFinale.text}</p>
            <div className="mt-32"><Link href={cliniche.ctaFinale.cta.href} className="btn">{cliniche.ctaFinale.cta.label}</Link></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
