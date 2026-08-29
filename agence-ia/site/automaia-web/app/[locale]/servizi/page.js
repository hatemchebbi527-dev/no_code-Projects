import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import styles from "./servizi.module.css";
import { SITE_URL } from "@/lib/brand";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.servizi" });
  const path = "/servizi";
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

export default async function ServiziPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servizi");
  const tc = await getTranslations("common");
  const offerte = t.raw("offerte");

  return (
    <>
      {/* HERO scuro */}
      <section className="section--dark" style={{ padding: "96px 0 64px" }}>
        <div className="container center" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="eyebrow">{tc("eyebrowServizi")}</span>
            <h1>{t("intro.title")}</h1>
            <p className="lead mt-24" style={{ margin: "18px auto 0" }}>
              {t("intro.text")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* OFFERTE */}
      <section className="section">
        <div className="container">
          <div className={`grid-3 ${styles.griglia}`}>
            {offerte.map((o, i) => (
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
    </>
  );
}
