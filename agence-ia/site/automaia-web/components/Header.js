"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";

const navItems = [
  { key: "home", href: "/" },
  { key: "servizi", href: "/servizi" },
  { key: "cliniche", href: "/cliniche" },
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
          <Link href="/audit" className="btn" onClick={() => setOpen(false)}>
            {tc("auditCta")}
          </Link>
          <LanguageSwitcher onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}
