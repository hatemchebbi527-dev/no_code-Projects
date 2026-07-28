import Link from "next/link";
import { brand, nav } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.name}>
            Automa<span className="accent">IA</span>
          </span>
          <p className={styles.tagline}>{brand.tagline}</p>
        </div>

        <nav className={styles.links}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className={styles.contact}>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          © {new Date().getFullYear()} {brand.name}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
