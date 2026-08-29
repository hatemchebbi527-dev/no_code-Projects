import { getTranslations, setRequestLocale } from "next-intl/server";
import styles from "./audit.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.audit" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const CALENDLY_URL =
  "https://calendly.com/hatemchebbi527/audit-gratuito-automaia";

export default async function AuditPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("audit");
  const steps = t.raw("steps");

  return (
    <section className="section">
      <div className="container">
        {/* Intro */}
        <div className={`title-block center ${styles.intro}`}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1>{t("title")}</h1>
          <p className="lead mt-24">{t("lead")}</p>
          <p className={styles.trust}>{t("trust")}</p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((item) => (
            <div key={item.step} className={styles.stepCard}>
              <span className={styles.stepNum}>{item.step}</span>
              <p className={styles.stepTitle}>{item.title}</p>
              <p className={styles.stepDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Calendly iframe */}
        <div className={styles.iframeWrap}>
          <iframe
            src={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=16B8A6&timezone=Europe%2FRome`}
            title={t("iframeTitle")}
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
