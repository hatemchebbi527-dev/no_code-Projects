import styles from "./HeroVisualFlow.module.css";

/**
 * Variante hero : une fenêtre d'application qui montre un flux d'automatisation.
 * Des documents entrent, le hub IA les traite, des tâches partent validées.
 * Les données circulent le long des connexions (dash animé). 100% SVG + CSS.
 */
export default function HeroVisualFlow() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 440 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fenêtre / panneau flottant */}
        <g className={styles.window}>
          <rect x="34" y="46" width="372" height="280" rx="20" fill="#fff" />
          {/* barre de titre */}
          <rect x="34" y="46" width="372" height="44" rx="20" fill="#F4F6F8" />
          <rect x="34" y="70" width="372" height="20" fill="#F4F6F8" />
          <circle cx="60" cy="68" r="5" fill="#16B8A6" />
          <circle cx="78" cy="68" r="5" fill="#cbd6e4" />
          <circle cx="96" cy="68" r="5" fill="#cbd6e4" />

          {/* Connexions avec données qui circulent */}
          <path
            className={styles.flow}
            d="M150 192 H196"
            stroke="#16B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className={styles.flow}
            d="M268 192 C292 192 290 150 318 150"
            stroke="#16B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className={styles.flow2}
            d="M268 192 C292 192 290 236 318 236"
            stroke="#16B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Noeud d'entrée : documents */}
          <g>
            <rect x="58" y="168" width="92" height="48" rx="11" fill="#fff" stroke="#e8edf3" strokeWidth="1.5" />
            <rect x="72" y="182" width="18" height="20" rx="3" fill="#16B8A6" opacity="0.25" />
            <rect x="100" y="184" width="36" height="5" rx="2.5" fill="#0F2A4A" opacity="0.5" />
            <rect x="100" y="194" width="24" height="5" rx="2.5" fill="#0F2A4A" opacity="0.25" />
          </g>

          {/* Hub central : l'automatisation IA */}
          <g className={styles.hub}>
            <rect x="196" y="160" width="72" height="64" rx="16" fill="#16B8A6" />
            <path d="M236 176l-13 22h10l-3 16 14-23h-10l2-15z" fill="#0F2A4A" />
          </g>

          {/* Sorties validées */}
          <g className={`${styles.task} ${styles.taskA}`}>
            <rect x="318" y="128" width="92" height="44" rx="11" fill="#fff" stroke="#e8edf3" strokeWidth="1.5" />
            <circle cx="338" cy="150" r="9" fill="#16B8A6" opacity="0.18" />
            <path d="M334 150l3 3 5-6" stroke="#16B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="354" y="144" width="44" height="5" rx="2.5" fill="#0F2A4A" opacity="0.5" />
            <rect x="354" y="154" width="30" height="5" rx="2.5" fill="#0F2A4A" opacity="0.25" />
          </g>
          <g className={`${styles.task} ${styles.taskB}`}>
            <rect x="318" y="214" width="92" height="44" rx="11" fill="#fff" stroke="#e8edf3" strokeWidth="1.5" />
            <circle cx="338" cy="236" r="9" fill="#16B8A6" opacity="0.18" />
            <path d="M334 236l3 3 5-6" stroke="#16B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="354" y="230" width="44" height="5" rx="2.5" fill="#0F2A4A" opacity="0.5" />
            <rect x="354" y="240" width="30" height="5" rx="2.5" fill="#0F2A4A" opacity="0.25" />
          </g>
        </g>

        {/* Badge horloge : temps gagné */}
        <g className={styles.badge}>
          <circle cx="70" cy="300" r="30" fill="#0F2A4A" />
          <circle cx="70" cy="300" r="30" fill="none" stroke="#16B8A6" strokeWidth="2" opacity="0.4" />
          <circle cx="70" cy="300" r="18" fill="none" stroke="#16B8A6" strokeWidth="2.5" />
          <line className={styles.hand} x1="70" y1="300" x2="70" y2="288" stroke="#16B8A6" strokeWidth="2.5" strokeLinecap="round" />
          <line className={styles.handMin} x1="70" y1="300" x2="80" y2="300" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
