"use client";

import { useMemo } from "react";

// Expressions de code qui flottent et tournent en fond de page.
const SNIPPETS = [
  "const engineer = {}",
  "await fetch(api)",
  "n8n.workflow.run()",
  "Promise.all([])",
  "=> { return ok }",
  "git push origin",
  "async function ()",
  "ai.invoke(prompt)",
  "map(x => x * 2)",
  "try { } catch (e)",
  "0x1F",
  "JSON.parse(data)",
  "redis.set(key)",
  "webhook.on('msg')",
  "npm run build",
  "if (success)",
  "reduce((a, b) => a)",
  "</ >",
  "docker compose up",
  "SELECT * FROM users",
  "vector.embed(text)",
  "queue.publish(job)",
  "[ ...automations ]",
  "return <App />",
];

const DRIFTS = ["drift-a", "drift-b", "drift-c"];

export default function CodeBackground() {
  // Positions/durées générées une seule fois, déterministes au montage.
  const tokens = useMemo(() => {
    return SNIPPETS.map((text, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const rnd = (n: number) => ((seed * (n + 1)) % 233280) / 233280;
      return {
        text,
        top: `${Math.round(rnd(1) * 92) + 2}%`,
        left: `${Math.round(rnd(2) * 90) + 2}%`,
        duration: `${Math.round(rnd(3) * 26) + 22}s`,
        delay: `-${Math.round(rnd(4) * 20)}s`,
        drift: DRIFTS[i % DRIFTS.length],
        rotate: Math.round(rnd(5) * 40) - 20,
        opacity: 0.06 + rnd(6) * 0.08,
      };
    });
  }, []);

  return (
    <div className="code-bg" aria-hidden="true">
      {tokens.map((t, i) => (
        <span
          key={i}
          className={`code-token ${t.drift}`}
          style={{
            top: t.top,
            left: t.left,
            animationDuration: t.duration,
            animationDelay: t.delay,
            opacity: t.opacity,
            ["--r" as string]: `${t.rotate}deg`,
          }}
        >
          {t.text}
        </span>
      ))}
    </div>
  );
}
