import Link from "next/link";
import Image from "next/image";
import { chiSono } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./chi-sono.module.css";

export const metadata = {
  title: "Chi sono e come lavoro",
  description:
    "Il metodo AutomaIA in 3 passi: audit gratuito, automazione su misura, controllo sempre nelle Sue mani. Nessun gergo tecnico, soluzioni concrete.",
  alternates: { canonical: "/chi-sono" },
  openGraph: {
    title: "Chi sono e come lavoro",
    description:
      "Il metodo AutomaIA in 3 passi: audit gratuito, automazione su misura, Lei resta al comando.",
    url: "/chi-sono",
  },
};

export default function ChiSonoPage() {
  return (
    <>
      {/* INTRO con foto fondatore */}
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <Reveal variant="scale" className={styles.foto}>
            <Image
              src="/fondatore.jpg"
              alt="Il fondatore di AutomaIA"
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Chi sono</span>
            <h1>{chiSono.title}</h1>
            <p className="lead mt-24">{chiSono.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* METODO */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal><h2>{chiSono.metodoTitle}</h2></Reveal>
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

      {/* PERCHÉ FIDARSI */}
      <section className="section">
        <div className="container">
          <div className="title-block center">
            <Reveal><h2>{chiSono.fiduciaTitle}</h2></Reveal>
          </div>
          <div className="grid-3">
            {chiSono.fiducia.map((f, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className={`card ${styles.fiduciaCard}`} style={{ height: "100%" }}>
                  <div className={styles.check}>✓</div>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center mt-48">
            <Link href="/contatti" className="btn">Prenoti un audit gratuito</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
