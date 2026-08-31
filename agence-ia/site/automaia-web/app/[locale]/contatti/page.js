import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "./ContactForm";
import styles from "./contatti.module.css";
import { brand } from "@/lib/brand";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contatti" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/contatti", locale),
  };
}

export default async function ContattiPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contatti");
  const tc = await getTranslations("common");

  return (
    <section className="section">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.intro}>
            <h1>{t("title")}</h1>
            <p className="lead mt-24">{t("text")}</p>
            <p className="mt-24">
              {tc("oppureScriva")}{" "}
              <a className="accent" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
