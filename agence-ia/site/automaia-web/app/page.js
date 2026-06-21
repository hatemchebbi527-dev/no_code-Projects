import Link from "next/link";
import { home } from "@/lib/content";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>{home.hero.title}</h1>
          <p className={styles.heroSub}>{home.hero.subtitle}</p>
          <Link href={home.hero.cta.href} className="btn">
            {home.hero.cta.label}
          </Link>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="section section--light">
        <div className="container title-block center">
          <h2>{home.problema.title}</h2>
          <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
            {home.problema.text}
          </p>
        </div>
      </section>

      {/* OFFERTE TEASER */}
      <section className="section">
        <div className="container">
          <div className="title-block center">
            <h2>{home.offerteTeaser.title}</h2>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
              {home.offerteTeaser.intro}
            </p>
          </div>
          <div className="grid-3">
            {home.offerteTeaser.items.map((item, i) => (
              <div className="card" key={i}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="center mt-32">
            <Link href={home.offerteTeaser.cta.href} className="btn btn--ghost">
              {home.offerteTeaser.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* METODO TEASER */}
      <section className="section section--dark">
        <div className="container title-block center">
          <h2>{home.metodoTeaser.title}</h2>
          <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
            {home.metodoTeaser.text}
          </p>
          <div className="mt-32">
            <Link href={home.metodoTeaser.cta.href} className="btn">
              {home.metodoTeaser.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="section">
        <div className="container title-block center">
          <h2>{home.ctaFinale.title}</h2>
          <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
            {home.ctaFinale.text}
          </p>
          <div className="mt-32">
            <Link href={home.ctaFinale.cta.href} className="btn">
              {home.ctaFinale.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
