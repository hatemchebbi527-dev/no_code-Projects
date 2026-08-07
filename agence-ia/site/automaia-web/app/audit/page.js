import styles from "./audit.module.css";

export const metadata = {
  title: "Audit gratuito · AutomaIA",
  description:
    "Prenoti un audit gratuito di 20 minuti per scoprire come automatizzare il Suo studio professionale. Nessun impegno, solo un'analisi concreta.",
};

const CALENDLY_URL =
  "https://calendly.com/hatemchebbi527/audit-gratuito-automaia";

const steps = [
  {
    step: "01",
    title: "Racconto",
    desc: "Mi racconta una giornata tipo del Suo studio.",
  },
  {
    step: "02",
    title: "Analisi",
    desc: "Identifichiamo insieme le attività che rubano più tempo.",
  },
  {
    step: "03",
    title: "Piano",
    desc: "Le presento il Suo primo guadagno di tempo concreto.",
  },
];

export default function AuditPage() {
  return (
    <section className="section">
      <div className="container">
        {/* Intro */}
        <div className={`title-block center ${styles.intro}`}>
          <span className="eyebrow">Audit gratuito · 20 minuti</span>
          <h1>Scopra da dove iniziare</h1>
          <p className="lead mt-24">
            In 20 minuti analizziamo insieme le attività del Suo studio che
            rubano più tempo. Nessun impegno, nessuna vendita. Solo
            un&apos;analisi concreta del Suo primo guadagno di tempo.
          </p>
          <p className={styles.trust}>
            Dati protetti · Nessun impegno · RGPD
          </p>
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
            title="Prenota un audit gratuito AutomaIA"
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
