import Link from "next/link";
import { brand, nav } from "@/lib/content";
import styles from "./Footer.module.css";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/automa_ia.it/", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
  ) },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590386292701", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 21V10a3 3 0 0 1 3-3h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hatem-chebbi-a28301294/", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.name}>Automa<span className="accent">IA</span></span>
          <p className={styles.tagline}>{brand.tagline}</p>
          <div className={styles.socials}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{s.icon}</a>
            ))}
          </div>
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
        <div className="container">© {new Date().getFullYear()} {brand.name}. Tutti i diritti riservati.</div>
      </div>
    </footer>
  );
}
