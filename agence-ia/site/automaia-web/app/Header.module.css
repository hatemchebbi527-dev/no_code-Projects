import styles from "./HeroVisual.module.css";

/**
 * Illustration animée du hero : un noyau central (l'automatisation) qui
 * orchestre des tâches répétitives, avec la boucle teal du logo AutomaIA.
 * 100% SVG + CSS, aucune dépendance, respecte prefers-reduced-motion.
 */
export default function HeroVisual() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 420 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Halo doux derrière le noyau */}
        <circle cx="210" cy="190" r="120" className={styles.halo} />

        {/* Boucle d'automatisation qui tourne (motif du logo) */}
        <g className={styles.loop}>
          <circle
            cx="210"
            cy="190"
            r="92"
            stroke="#16B8A6"
            strokeWidth="2.5"
            strokeDasharray="14 12"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
        <g className={styles.loopReverse}>
          <circle
            cx="210"
            cy="190"
            r="70"
            stroke="#16B8A6"
            strokeWidth="1.6"
            strokeDasharray="4 14"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Noyau central */}
        <g className={styles.core}>
          <circle cx="210" cy="190" r="46" fill="#16B8A6" opacity="0.16" />
          <circle cx="210" cy="190" r="34" fill="#16B8A6" />
          {/* petit éclair / signe d'action */}
          <path
            d="M214 172l-12 20h9l-3 16 13-21h-9l2-15z"
            fill="#0F2A4A"
          />
        </g>

        {/* Cartes de tâches flottantes */}
        <g className={`${styles.card} ${styles.cardA}`}>
          <rect x="20" y="70" width="120" height="44" rx="11" fill="#fff" />
          <rect x="32" y="82" width="20" height="20" rx="6" fill="#16B8A6" opacity="0.2" />
          <rect x="62" y="84" width="66" height="6" rx="3" fill="#0F2A4A" opacity="0.55" />
          <rect x="62" y="96" width="44" height="6" rx="3" fill="#0F2A4A" opacity="0.25" />
        </g>

        <g className={`${styles.card} ${styles.cardB}`}>
          <rect x="280" y="44" width="120" height="44" rx="11" fill="#fff" />
          <rect x="292" y="56" width="20" height="20" rx="6" fill="#16B8A6" opacity="0.2" />
          <rect x="322" y="58" width="62" height="6" rx="3" fill="#0F2A4A" opacity="0.55" />
          <rect x="322" y="70" width="40" height="6" rx="3" fill="#0F2A4A" opacity="0.25" />
        </g>

        <g className={`${styles.card} ${styles.cardC}`}>
          <rect x="288" y="270" width="120" height="44" rx="11" fill="#fff" />
          <rect x="300" y="282" width="20" height="20" rx="6" fill="#16B8A6" opacity="0.2" />
          <rect x="330" y="284" width="62" height="6" rx="3" fill="#0F2A4A" opacity="0.55" />
          <rect x="330" y="296" width="40" height="6" rx="3" fill="#0F2A4A" opacity="0.25" />
        </g>

        <g className={`${styles.card} ${styles.cardD}`}>
          <rect x="26" y="280" width="120" height="44" rx="11" fill="#fff" />
          <rect x="38" y="292" width="20" height="20" rx="6" fill="#16B8A6" opacity="0.2" />
          <rect x="68" y="294" width="66" height="6" rx="3" fill="#0F2A4A" opacity="0.55" />
          <rect x="68" y="306" width="44" height="6" rx="3" fill="#0F2A4A" opacity="0.25" />
        </g>

        {/* Points lumineux qui circulent vers le noyau */}
        <circle className={`${styles.spark} ${styles.spark1}`} r="4" fill="#16B8A6" />
        <circle className={`${styles.spark} ${styles.spark2}`} r="4" fill="#16B8A6" />
        <circle className={`${styles.spark} ${styles.spark3}`} r="4" fill="#16B8A6" />
      </svg>
    </div>
  );
}
