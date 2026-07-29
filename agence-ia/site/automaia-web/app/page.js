import Link from "next/link";
import Image from "next/image";
import { home, brand } from "@/lib/content";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import styles from "./page.module.css";

// Inline icons for the offerte teaser cards
const icons = [
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="cal">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="chat">
      <path d="M21 12a8 8 0 1 1-3.6-6.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="shield">
      <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPhoto}>
          <Image
            src="/hero-team.jpg"
            alt="Intelligenza artificiale in uno studio professionale"
            fill
            priority
            sizes="52vw"
          />
          <div className={styles.heroPhotoFade} />
        </div>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <Reveal>
              <span className={styles.eyebrowLight}>{brand.tagline}</span>
              <h1 className={styles.heroTitle}>
                Lo studio che recupera fino a{" "}
                <span className="hl">10 ore</span> a settimana
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className={styles.heroSub}>{home.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className={styles.heroCtas}>
                <Link href={home.hero.cta.href} className="btn">
                  {home.hero.cta.label}
                </Link>
                <Link href="/servizi" className="btn btn--light">
                  Scopri i servizi
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BENTO */}
      <section className={styles.statsSection}>
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
      </section>

      {/* PROBLEMA (photo + text) */}
      <section className="section">
        <div className={`container ${styles.problema}`}>
          <Reveal variant="scale" className={styles.problemaPhoto}>
            <Image
              src="/problema-scrivania.jpg"
              alt="Scrivania di uno studio sommersa da scadenze e documenti"
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2>{home.problema.title}</h2>
            <p className="lead mt-24">{home.problema.text}</p>
          </Reveal>
        </div>
      </section>

      {/* OFFERTE TEASER */}
      <section className="section section--light">
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
                <div
                  className={`card ${styles.offCard} ${i === 1 ? styles.offCardFeatured : ""}`}
                >
                  <div className="iconChip" style={{ color: i === 1 ? "var(--teal-light)" : "var(--teal)" }}>
                    {icons[i]}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center mt-48">
            <Link href={home.offerteTeaser.cta.href} className="btn btn--ghost">
              {home.offerteTeaser.cta.label}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* METODO TEASER */}
      <section className="section section--deep">
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

      {/* CTA FINALE (gradient card) */}
      <section className="section">
        <div className="container">
          <Reveal variant="scale" className={styles.ctaCard}>
            <h2>{home.ctaFinale.title}
