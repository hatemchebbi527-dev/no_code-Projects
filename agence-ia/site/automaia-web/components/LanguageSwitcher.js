"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

const LABELS = { it: "IT", fr: "FR", en: "EN" };

export default function LanguageSwitcher({ onNavigate }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next) => {
    if (next !== locale) {
      // Reste sur la même page, change juste la langue.
      router.replace(pathname, { locale: next });
    }
    onNavigate?.();
  };

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={`${styles.option} ${loc === locale ? styles.active : ""}`}
          aria-current={loc === locale ? "true" : undefined}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
