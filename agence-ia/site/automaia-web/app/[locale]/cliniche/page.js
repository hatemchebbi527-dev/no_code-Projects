import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import styles from "./cliniche.module.css";
import { SITE_URL } from "@/lib/brand";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.cliniche" });
  const path = "/cliniche";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "fr" ? `/fr${path}` : path,
      languages: {
        it: `${SITE_URL}${path}`,
        fr: `${SITE_URL}/fr${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: locale === "fr" ? `${SITE_URL}/fr${path}` : `${SITE_URL}${path}`,
    },
  };
}

export default async function ClinichePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cliniche");
  const problemaItems = t.raw("problema.items");
  const soluzioneItems = t.raw("soluzione.items");

  return (
    <>
      {/* HERO scuro con foto */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1>{t("hero.title")}</h1>
            <p className="lead mt-24">{t("hero.subtitle")}</p>
            <div className="mt-32">
              <Link href={t("hero.cta.href")} className="btn">
                {t("hero.cta.label")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140} variant="scale" className={styles.heroPhoto}>
            <Image
              src="/cliniche-reception.jpg"
              alt={t("hero.eyebrow")}
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
            <Reveal><h2>{t("problema.title")}</h2></Reveal>
          </div>
          <div className="grid-3">
            {problemaItems.map((it, i) => (
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
              <h2>{t("soluzione.title")}</h2>
              <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
                {t("soluzione.intro")}
              </p>
            </Reveal>
          </div>
          <div className="grid-3">
            {soluzioneItems.map((it, i) => (
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
              <span className="eyebrow">{t("esempio.title")}</span>
              <p className={styles.esempioText}>{t("esempio.text")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="section">
        <div className="container title-block center" style={{ maxWidth: 700 }}>
          <Reveal>
            <h2>{t("ctaFinale.title")}</h2>
            <p className="lead mt-16" style={{ margin: "16px auto 0" }}>
              {t("ctaFinale.text")}
            </p>
            <div className="mt-32">
              <Link href={t("ctaFinale.cta.href")} className="btn">
                {t("ctaFinale.cta.label")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
