import styles from "./CodeBackground.module.css";

/**
 * Fond décoratif global : des blocs de code JSON (thème automatisation)
 * qui dérivent et tournent lentement dans des sens différents.
 * Très faible opacité pour rester discret et ne pas gêner la lecture.
 * Fixe, derrière le contenu, sans interaction, respecte reduced-motion.
 */
const snippets = [
  `{
  "trigger": "nuova_email",
  "azione": "bozza_risposta",
  "stato": "ok"
}`,
  `{
  "automazione": "promemoria",
  "scadenza": "F24",
  "inviato": true
}`,
  `{
  "cliente": "Rossi",
  "documenti": ["delega", "F24"],
  "sollecito": "auto"
}`,
  `{
  "appuntamento": "confermato",
  "calendar": "sync",
  "notifica": "sms"
}`,
  `{
  "ore_risparmiate": 12.5,
  "task_completati": 48,
  "errori": 0
}`,
  `{
  "workflow": "studio",
  "nodi": 6,
  "attivo": true
}`,
];

export default function CodeBackground() {
  return (
    <div className={styles.bg} aria-hidden="true">
      {snippets.map((code, i) => (
        <pre key={i} className={`${styles.snippet} ${styles["s" + (i + 1)]}`}>
          {code}
        </pre>
      ))}
    </div>
  );
}
