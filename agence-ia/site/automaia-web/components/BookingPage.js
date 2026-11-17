import { getTranslations } from "next-intl/server";
import styles from "./BookingPage.module.css";

// Calendly (plan gratuit) : un seul type d'événement sert pour l'audit
// (automatisations) et pour le report de visibilité (avis). Le paramètre
// utm_campaign permet de savoir, dans Calendly, d'où vient chaque réservation.
// Si un jour tu as un événement par langue ou par offre, remplace l'URL ici.
const CALENDLY_URL = "https://calendly.com/hatemchebbi527/audit-gratuito-automaia";

export default async function BookingPage({ locale, namespace, campaign }) {
  const t = await getTranslations(namespace);
  const steps = t.raw("steps");
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    primary_color: "16B8A6",
    timezone: "Europe/Rome",
    locale,
    utm_source: "automa-ia.net",
    utm_campaign: campaign,
  });

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
            src={`${CALENDLY_URL}?${params.toString()}`}
            title={t("iframeTitle")}
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
