import { getTranslations, setRequestLocale } from "next-intl/server";
import styles from "./audit.module.css";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.audit" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/audit", locale),
  };
}

// URL du type d'événement Calendly par langue.
// Pour un rendu 100% traduit (titre + description du RDV), crée un type
// d'événement dédié dans Calendly et remplace l'URL de la clé concernée.
// Tant qu'une clé pointe sur l'événement italien, seule l'interface du widget
// est traduite (via le paramètre locale), pas le titre/description du RDV.
const CALENDLY_URLS = {
  it: "https://calendly.com/hatemchebbi527/audit-gratuito-automaia",
  fr: "https://calendly.com/hatemchebbi527/audit-gratuito-automaia",
  en: "https://calendly.com/hatemchebbi527/audit-gratuito-automaia",
};

export default async function AuditPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("audit");
  const steps = t.raw("steps");
  const calendlyUrl = CALENDLY_URLS[locale] || CALENDLY_URLS.it;

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

        {/* Calendly iframe — locale force la langue de l'interface du widget */}
        <div className={styles.iframeWrap}>
          <iframe
            src={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=16B8A6&timezone=Europe%2FRome&locale=${locale}`}
            title={t("iframeTitle")}
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
