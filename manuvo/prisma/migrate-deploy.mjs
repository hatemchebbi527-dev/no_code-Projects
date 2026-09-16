// Manuvo - applica le migrazioni sulla connessione DIRETTA (non poolata).
// Neon/PgBouncer non supporta gli advisory lock usati da `prisma migrate deploy`
// (errore P1002). L'host poolato contiene "-pooler": rimuovendolo si ottiene
// la connessione diretta, adatta alle migrazioni. Il runtime dell'app continua
// a usare DATABASE_URL (poolato) invariato.
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

// Su Vercel DATABASE_URL e' una vera env var; in locale la carichiamo da .env.
let url = process.env.DATABASE_URL || "";
if (!url && existsSync(".env")) {
  const match = readFileSync(".env", "utf8").match(
    /^DATABASE_URL\s*=\s*["']?([^"'\n]+)["']?/m,
  );
  if (match) url = match[1];
}

if (!url) {
  console.error("migrate-deploy: DATABASE_URL non impostata.");
  process.exit(1);
}

const directUrl = url.replace("-pooler", "");

execSync("prisma migrate deploy", {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: directUrl },
});
