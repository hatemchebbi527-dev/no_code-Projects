import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";
import styles from "./Footer.module.css";

const navItems = [
  { key: "home", href: "/" },
  { key: "servizi", href: "/servizi" },
  { key: "cliniche", href: "/cliniche" },
  { key: "chiSono", href: "/chi-sono" },
  { key: "contatti", href: "/contatti" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/automa_ia.it/", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
  ) },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590386292701", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
  ) },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hatem-chebbi-a28301294/", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.99H5.66v8.35h2.68ZM7 8.82a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.52v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.13h-2.68v8.35h2.68v-4.66c0-1.23.85-1.51 1.36-1.51.5 0 1.41.28 1.41 1.51v4.66h2.68Z" /></svg>
  ) },
];

export default async function Footer() {
  const t = await getTranslations("nav");
  const tb = await getTranslations("brand");

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.name}>Automa<span className="accent">IA</span></span>
          <p className={styles.tagline}>{tb("tagline")}</p>
        </div>

        <nav className={styles.links}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{t(item.key)}</Link>
          ))}
        </nav>

        <div className={styles.contact}>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <div className={styles.socials}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">© {new Date().getFullYear()} {brand.name}. {tb("rightsReserved")}</div>
      </div>
    </footer>
  );
}
