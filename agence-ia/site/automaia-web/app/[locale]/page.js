import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tb = await getTranslations("brand");

  const stats = t.raw("stats");
  const offerteItems = t.raw("offerteTeaser.items");

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPhoto}>
          <Image
            src="/hero-team.jpg"
            alt={tb("tagline")}
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
              <span className={styles.eyebrowLight}>{tb("tagline")}</span>
              <h1 className={styles.heroTitle}>
                {t("hero.titlePrefix")}{" "}
                <span className="hl">{t("hero.titleHighlight")}</span> {t("hero.titleSuffix")}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className={styles.heroSub}>{t("hero.subtitle")}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className={styles.heroCtas}>
                <Link href={t("hero.cta.href")} className="btn">
                  {t("hero.cta.label")}
                </Link>
                <Link href="/servizi" className="btn btn--light">
                  {tc("scopriServizi")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BENTO */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
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
              alt={t("problema.title")}
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2>{t("problema.title")}</h2>
            <p className="lead mt-24">{t("problema.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* OFFERTE TEASER */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal>
              <span className="eyebrow">{tc("eyebrowServizi")}</span>
              <h2>{t("offerteTeaser.title")}</h2>
              <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
                {t("offerteTeaser.intro")}
              </p>
            </Reveal>
          </div>
          <div className="grid-3">
            {offerteItems.map((item, i) => (
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
            <Link href={t("offerteTeaser.cta.href")} className="btn btn--ghost">
              {t("offerteTeaser.cta.label")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* METODO TEASER */}
      <section className="section section--deep">
        <div className="container title-block center">
          <Reveal>
            <span className="eyebrow">{tc("eyebrowMetodo")}</span>
            <h2>{t("metodoTeaser.title")}</h2>
            <p className="lead mt-24" style={{ margin: "24px auto 0" }}>
              {t("metodoTeaser.text")}
            </p>
            <div className="mt-32">
              <Link href={t("metodoTeaser.cta.href")} className="btn">
                {t("metodoTeaser.cta.label")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINALE (gradient card) */}
      <section className="section">
        <div className="container">
          <Reveal variant="scale" className={styles.ctaCard}>
            <h2>{t("ctaFinale.title")}</h2>
            <p>{t("ctaFinale.text")}</p>
            <div className="mt-32">
              <Link href={t("ctaFinale.cta.href")} className="btn btn--white">
                {t("ctaFinale.cta.label")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
