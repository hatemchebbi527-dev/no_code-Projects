"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav } from "@/lib/content";
import styles from "./Header.module.css";

export default function Header() {
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
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/audit" className="btn" onClick={() => setOpen(false)}>
            Audit gratuito
          </Link>
        </nav>
      </div>
    </header>
  );
}
