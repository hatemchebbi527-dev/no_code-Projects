# Déploiement et migrations de base

Manuvo se déploie sur Vercel, avec une base Neon Postgres. Ce fichier dit **qui** déclenche un déploiement et **ce qui touche la base**, parce que les deux étaient liés d'une façon qui n'était écrite nulle part.

## Le chemin de déploiement

```
push sur main (chemin manuvo/**)
  └─ .github/workflows/vercel-deploy.yml  →  curl POST du deploy hook Vercel
       └─ vercel.json : ignoreCommand, puis buildCommand = npm run vercel-build
            └─ prisma generate
            └─ node prisma/migrate-deploy.mjs   ← LA BASE EST MODIFIÉE ICI
            └─ tsx prisma/ensure-base.ts        ← ET ICI (données de base)
            └─ next build
```

Deux choses à retenir de cette chaîne.

**Le succès du workflow GitHub ne prouve rien sur le déploiement.** Le job ne fait qu'un `curl` vers le deploy hook. Il passe au vert même si le build Vercel échoue ensuite. Pour savoir si un déploiement a réussi, il faut regarder Vercel, pas GitHub Actions.

**`migrate-deploy.mjs` passe par la connexion directe.** Neon route `DATABASE_URL` par PgBouncer, qui ne supporte pas les advisory locks de `prisma migrate deploy` (erreur P1002). Le script retire le `-pooler` du hostname pour les migrations ; le runtime de l'app continue d'utiliser l'URL poolée, inchangée.

## ⚠️ La règle : seule la production migre la base

> **Incident du 22 octobre 2026.** L'intégration Git de Vercel était connectée en parallèle du workflow. Un push sur une branche de travail a déclenché un build de preview, qui a exécuté `vercel-build`, donc `prisma migrate deploy`. Comme `DATABASE_URL` était la même en Preview et en Production, **la migration `add_referral` est entrée dans la base de production 35 secondes après le push**, seize heures avant que la pull request ne soit relue et mergée.
>
> La migration était purement additive, donc sans dégât. Une migration qui supprime ou renomme une colonne aurait cassé la production avant toute relecture.

Le garde-fou est dans `vercel.json`, pas dans l'interface Vercel :

```json
"ignoreCommand": "if [ \"$VERCEL_ENV\" != \"production\" ]; then exit 0; fi; git diff --quiet HEAD^ HEAD ."
```

Sortie **0** = Vercel saute le build. Sortie **1** = il continue. La condition saute donc tout environnement qui n'est pas la production, **avant** que `vercel-build` n'existe. Si `VERCEL_ENV` est absent, le build est sauté aussi : on préfère ne rien construire à construire par accident.

Ce fichier **prime sur le champ « Ignored Build Step »** de l'interface Vercel (sous Settings → Build and Deployment). Tant que `ignoreCommand` est là, le champ est sans effet : ne pas chercher à régler ça dans l'interface.

Conséquence assumée : **plus d'URL de preview**. On teste une branche en local avec `npm run dev`.

### Si on veut récupérer les previews un jour

Créer une base Neon séparée (Neon fait du branching de base pour ça) et mettre son URL dans `DATABASE_URL` pour l'environnement **Preview** sur Vercel. Les previews redeviennent utiles sans jamais toucher la production. C'est la vraie solution ; l'`ignoreCommand` est la version pauvre mais sûre.

## Checklist avant une migration destructive

Une migration additive (colonne nullable, index, clé étrangère) se déploie sans précaution : l'ancien code ignore la colonne. Pour tout le reste :

- [ ] vérifier que `DATABASE_URL` en Preview ne pointe pas sur la base de production
- [ ] découper en deux déploiements : d'abord le code qui sait vivre avec et sans la colonne, ensuite la suppression
- [ ] ne jamais renommer une colonne en une étape, ajouter puis recopier puis supprimer
- [ ] relire le SQL généré dans `prisma/migrations/`, Prisma ne prévient pas d'une perte de données en `migrate deploy`
- [ ] savoir comment revenir en arrière avant de pousser

## Vérifier qu'une migration est passée

Le log de build affiche `Applying migration ...` seulement si elle était en attente. Sinon il dit `No pending migrations to apply.`, ce qui est aussi un succès. La base est la seule source de vérité :

```sql
SELECT migration_name, finished_at, rolled_back_at
FROM "_prisma_migrations" ORDER BY started_at DESC LIMIT 5;
```

`finished_at` rempli et `rolled_back_at` vide : appliquée proprement.

## Variables d'environnement

Voir `.env.example`. `DATABASE_URL` et `AUTH_SECRET` sont nécessaires au build lui-même ; `ADMIN_EMAIL` et `ADMIN_PASSWORD` sont lus par `ensure-base.ts` à chaque déploiement ; les trois `TWILIO_*` sont optionnelles (voir `TWILIO.md`).
