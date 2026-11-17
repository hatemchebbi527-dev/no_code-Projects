"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";

// Espace client de la plateforme (marque blanche, domaine AutomaIA).
const PORTAL_URL = "https://portal.automa-ia.net";

// Pas de lien « Home » : le logo ramène déjà à l'accueil (place pour 2 CTA).
const navItems = [
  { key: "servizi", href: "/servizi" },
  { key: "hotel", href: "/hotel-ristoranti" },
  { key: "chiSono", href: "/chi-sono" },
  { key: "contatti", href: "/contatti" },
];

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="AutomaIA" width={140} height={40} priority />
        </Link>

        <button
          className={styles.burger}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href={PORTAL_URL}
            className={`${styles.link} ${styles.areaClienti}`}
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {t("areaClienti")}
          </a>
          <Link href="/audit" className={`btn btn--ghost ${styles.ctaSmall}`} onClick={() => setOpen(false)}>
            {tc("auditGratuito")}
          </Link>
          <Link href="/report" className={`btn ${styles.ctaSmall}`} onClick={() => setOpen(false)}>
            {tc("auditCta")}
          </Link>
          <LanguageSwitcher onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}
