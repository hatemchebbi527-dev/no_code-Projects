import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import styles from "./hotel.module.css";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

// Espace client de la plateforme (marque blanche, domaine AutomaIA).
const PORTAL_URL = "https://portal.automa-ia.net";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.hotel" });
  const path = "/hotel-ristoranti";
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({
      path,
      locale,
      title: t("title"),
      description: t("ogDescription"),
    }),
  };
}

const Stars = () => (
  <span className={styles.stars} aria-hidden="true">★★★★★</span>
);

export default async function HotelRistorantiPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hotel");
  const problemaItems = t.raw("problema.items");
  const soluzioneItems = t.raw("soluzione.items");
  const passi = t.raw("passi.items");

  return (
    <>
      {/* HERO : promesse + visuel produit (avis + réponse de l'assistant) */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1>{t("hero.title")}</h1>
            <p className="lead mt-24">{t("hero.subtitle")}</p>
            <div className={`mt-32 ${styles.heroCtas}`}>
              <Link href={t("hero.cta.href")} className="btn">
                {t("hero.cta.label")}
              </Link>
              <span className={styles.prezzoHint}>{t("hero.prezzo")}</span>
            </div>
          </Reveal>

          <Reveal delay={140} variant="scale">
            <div className={styles.mock} aria-hidden="true">
              <div className={styles.mockReview}>
                <div className={styles.mockHead}>
                  <span className={styles.mockAvatar}>{t("mock.iniziale")}</span>
                  <div>
                    <div className={styles.mockName}>{t("mock.nome")}</div>
                    <Stars />
                  </div>
                  <span className={styles.mockSource}>{t("mock.fonte")}</span>
                </div>
                <p className={styles.mockText}>{t("mock.recensione")}</p>
              </div>
              <div className={styles.mockReply}>
                <div className={styles.mockReplyHead}>
                  <span className={styles.mockDot} /> {t("mock.assistente")}
                </div>
                <p className={styles.mockText}>{t("mock.risposta")}</p>
              </div>
            </div>
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

      {/* SOLUZIONE : les 3 assistants */}
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
                      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
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

      {/* COME FUNZIONA */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
            <Reveal><h2>{t("passi.title")}</h2></Reveal>
          </div>
          <div className="grid-3">
            {passi.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card" style={{ height: "100%" }}>
                  <span className={styles.step}>{it.step}</span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREZZO */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <Reveal>
            <div className={styles.prezzo}>
              <span className="eyebrow">{t("prezzo.eyebrow")}</span>
              <p className={styles.prezzoValore}>{t("prezzo.valore")}</p>
              <p className={styles.prezzoText}>{t("prezzo.text")}</p>
              <p className={styles.prezzoClienti}>
                {t("prezzo.giaCliente")}{" "}
                <a href={PORTAL_URL}>{t("prezzo.areaClienti")}</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="section section--light">
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
