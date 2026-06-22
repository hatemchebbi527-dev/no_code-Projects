import Link from "next/link";
import { home, brand } from "@/lib/content";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import HeroVisual from "@/components/HeroVisual";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <Reveal>
              <span className={styles.eyebrowLight}>{brand.tagline}</span>
              <h1 className={styles.heroTitle}>{home.hero.title}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className={styles.heroSub}>{home.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={220}>
              <Link href={home.hero.cta.href} className="btn">
                {home.hero.cta.label}
              </Link>
            </Reveal>
          </div>
          <Reveal delay={160} variant="scale" className={styles.heroVisual}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {home.stats.map((s, i) => (
              <Reveal key={i} delay={i * 110} variant="scale" className={styles.statCard}>
                <div className={styles.statNum}>
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <p className={styles.statLabel}>{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="section section--light">
        <div className="container title-block center">
          <Reveal>
            <h2>{home.problema.title}</h2>
            <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
              {home.problema.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* OFFERTE TEASER */}
      <section className="section">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <span className="eyebrow">Servizi</span>
              <h2>{home.offerteTeaser.title}</h2>
              <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
                {home.offerteTeaser.intro}
              </p>
            </Reveal>
          </div>
          <div className="grid-3">
            {home.offerteTeaser.items.map((item, i) => (
              <Reveal key={i} delay={i * 120} variant="scale">
                <div className="card" style={{ height: "100%" }}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center mt-32">
            <Link href={home.offerteTeaser.cta.href} className="btn btn--ghost">
              {home.offerteTeaser.cta.label}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* METODO TEASER */}
      <section className="section section--dark">
        <div className="container title-block center">
          <Reveal>
            <span className="eyebrow">Il metodo</span>
            <h2>{home.metodoTeaser.title}</h2>
            <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
              {home.metodoTeaser.text}
            </p>
            <div className="mt-32">
              <Link href={home.metodoTeaser.cta.href} className="btn">
                {home.metodoTeaser.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="section">
        <div className="container title-block center">
          <Reveal>
            <h2>{home.ctaFinale.title}</h2>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
              {home.ctaFinale.text}
            </p>
            <div className="mt-32">
              <Link href={home.ctaFinale.cta.href} className="btn">
                {home.ctaFinale.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
