import Link from "next/link";
import { chiSono } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./chi-sono.module.css";

export const metadata = {
  title: "Chi sono — AutomaIA",
  description:
    "Come lavoro: audit gratuito, automazione su misura, dati protetti. Il professionista resta sempre al comando.",
};

export default function ChiSonoPage() {
  return (
    <>
      <section className="section">
        <div className="container title-block center">
          <Reveal>
            <span className="eyebrow">Chi sono</span>
            <h1>{chiSono.title}</h1>
            <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
              {chiSono.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <h2>{chiSono.metodoTitle}</h2>
            </Reveal>
          </div>
          <div className="grid-3">
            {chiSono.metodo.map((m, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}>
                  <span className={styles.step}>{m.step}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <h2>{chiSono.fiduciaTitle}</h2>
            </Reveal>
          </div>
          <Reveal>
            <ul className={styles.fiducia}>
              {chiSono.fiducia.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="center mt-32">
              <Link href="/contatti" className="btn">Prenoti un audit gratuito</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
