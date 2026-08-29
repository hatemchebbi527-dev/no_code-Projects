import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import styles from "./chi-sono.module.css";
import { SITE_URL } from "@/lib/brand";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.chiSono" });
  const path = "/chi-sono";
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

export default async function ChiSonoPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("chiSono");
  const tn = await getTranslations("nav");
  const metodo = t.raw("metodo");
  const fiducia = t.raw("fiducia");

  return (
    <>
      {/* INTRO con foto fondatore */}
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <Reveal variant="scale" className={styles.foto}>
            <Image
              src="/fondatore.jpg"
              alt={t("title")}
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">{tn("chiSono")}</span>
            <h1>{t("title")}</h1>
            <p className="lead mt-24">{t("intro")}</p>
          </Reveal>
        </div>
      </section>

      {/* METODO */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal><h2>{t("metodoTitle")}</h2></Reveal>
          </div>
          <div className="grid-3">
            {metodo.map((m, i) => (
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
            <Reveal><h2>{t("fiduciaTitle")}</h2></Reveal>
          </div>
          <div className="grid-3">
            {fiducia.map((f, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className={`card ${styles.fiduciaCard}`} style={{ height: "100%" }}>
                  <div className={styles.check}>✓</div>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center mt-48">
            <Link href={t("cta.href")} className="btn">{t("cta.label")}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
