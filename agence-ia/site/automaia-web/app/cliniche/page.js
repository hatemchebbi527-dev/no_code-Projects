import Link from "next/link";
import Image from "next/image";
import { cliniche } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./cliniche.module.css";

export const metadata = {
  title: "Automazione per cliniche veterinarie e mediche",
  description:
    "Prenotazioni online, promemoria automatici e accoglienza anche in inglese per la Sua clinica, attivi 24/7. Riduca le assenze e non perda più richieste fuori orario.",
  alternates: { canonical: "/cliniche" },
  openGraph: {
    title: "Automazione per cliniche veterinarie e mediche",
    description:
      "Prenotazioni online, promemoria automatici e assistenza 24/7 per la Sua clinica.",
    url: "/cliniche",
  },
};

export default function ClinichePage() {
  return (
    <>
      {/* HERO scuro con foto */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="eyebrow">{cliniche.hero.eyebrow}</span>
            <h1>{cliniche.hero.title}</h1>
            <p className="lead mt-24">{cliniche.hero.subtitle}</p>
            <div className="mt-32">
              <Link href={cliniche.hero.cta.href} className="btn">
                {cliniche.hero.cta.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140} variant="scale" className={styles.heroPhoto}>
            <Image
              src="/cliniche-reception.jpg"
              alt="Reception di una clinica veterinaria"
              fill
              sizes="(max-width: 960px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal><h2>{cliniche.problema.title}</h2></Reveal>
          </div>
          <div className="grid-3">
            {cliniche.problema.items.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUZIONE */}
      <section className="section">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <h2>{cliniche.soluzione.title}</h2>
              <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
                {cliniche.soluzione.intro}
              </p>
            </Reveal>
          </div>
          <div className="grid-3">
            {cliniche.soluzione.items.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}>
                  <div className="iconChip" style={{ color: "var(--teal)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESEMPIO CONCRETO */}
      <section className="section section--light">
        <div className="container" style={{ maxWidth: 900 }}>
          <Reveal>
            <div className={styles.esempio}>
              <span className="eyebrow">{cliniche.esempio.title}</span>
              <p className={styles.esempioText}>{cliniche.esempio.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="section">
        <div className="container title-block center" style={{ maxWidth: 700 }}>
          <Reveal>
            <h2>{cliniche.ctaFinale.title}</h2>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
              {cliniche.ctaFinale.text}
            </p>
            <div className="mt-32">
              <Link href={cliniche.ctaFinale.cta.href} className="btn">
                {cliniche.ctaFinale.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
