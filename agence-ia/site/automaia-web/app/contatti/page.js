import { contatti, brand } from "@/lib/content";
import ContactForm from "./ContactForm";
import styles from "./contatti.module.css";

export const metadata = {
  title: "Contatti — AutomaIA",
  description: "Prenoti un audit gratuito di 20 minuti per il Suo studio.",
};

export default function ContattiPage() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.intro}>
            <h1>{contatti.title}</h1>
            <p className="lead mt-24">{contatti.text}</p>
            <p className="mt-24">
              Preferisce fissare subito un appuntamento? Prenoti online un audit
              gratuito di 20 minuti, nel giorno e nell'ora che preferisce:
            </p>
            <p className="mt-16">
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Prenoti un audit gratuito
              </a>
            </p>
            <p className="mt-24">
              Oppure compili il modulo qui accanto, o scriva a{" "}
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
