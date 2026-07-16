# AutomaIA — App SaaS

Reconstruction fonctionnelle de la plateforme AutomaIA en SaaS multi-tenant (cf. cahier des charges technique). Un "tenant" = un "studio" (cabinet professionnel italien : commercialista, avvocato).

Stack : Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Supabase (Postgres, Auth, RLS).

## État d'avancement

- [x] **Phase 1 — Setup** : scaffold Next.js/Tailwind/shadcn, schéma SQL + RLS
- [x] **Phase 2 — Auth** : signup/login + création automatique du studio + middleware `/dashboard/*`
- [x] **Phase 3 — Layout app** : sidebar (7 sections) + topbar (studio/user/déconnexion)
- [x] **Phase 4 — Panoramica** : 7 stat cards en live depuis la DB
- [x] **Phase 5 — Workflow + Acquisizione** : CRUD + Kanban drag & drop (dnd-kit)
- [x] **Phase 6 — Visibilità + Bozze email** : génération de contenu et brouillons via Claude API
- [x] **Phase 7 — Automazioni** : 5 flux n8n (toggle, URL, test connexion, historique)
- [x] **Phase 8 — Abbonamento** : Stripe Checkout (2 plans + add-on) + Customer Portal + webhook — testé de bout en bout (paiement + mise à jour du plan via webhook)
  - ⚠️ Vercel fige les variables d'environnement au moment du build : après avoir modifié une variable, il faut un **nouveau** déploiement (pas un simple "Redeploy" d'un ancien build) pour qu'il en tienne compte.
  - ⚠️ L'URL d'alias de branche (`*-git-<branche>-....vercel.app`) peut rester bloquée par "Vercel Authentication" en cache même après avoir désactivé la protection dans Project Settings > Deployment Protection. Si un service externe (Stripe, n8n...) reçoit un 401 "Protected deployment" malgré la protection désactivée, utiliser l'URL unique du déploiement (`<projet>-<hash>-....vercel.app`, visible sur la page du déploiement) à la place — ce problème disparaît une fois un vrai domaine personnalisé branché (phase 9).
- [x] **Phase 9 — Déploiement** : app en production sur `https://app.automa-ia.net` (sous-domaine dédié ; le domaine racine `automa-ia.net` reste le site vitrine existant)
  - Variables d'environnement Production configurées séparément de Preview pour `STRIPE_SECRET_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_APP_URL` et `STRIPE_WEBHOOK_SECRET` (valeurs différentes par environnement).
  - Endpoint webhook Stripe dédié à la production (`https://app.automa-ia.net/api/webhooks/stripe`, mode Test pour l'instant — voir "Passage en mode Live" ci-dessous).
  - Supabase Auth : Site URL et Redirect URLs mis à jour pour inclure `https://app.automa-ia.net/auth/callback` (en plus de l'URL de preview et de `localhost:3000` pour le dev local).
  - `/` redirige vers `/login` (pas de landing page marketing sur ce sous-domaine).

## Setup local

```bash
npm install
cp .env.example .env.local   # renseigner les clés (voir ci-dessous)
npm run dev
```

### Connecter Supabase

1. Créer un projet sur [supabase.com](https://supabase.com) (gratuit).
2. Dans **Project Settings > API**, récupérer `Project URL`, `anon public key` et `service_role key` → les coller dans `.env.local`.
3. Appliquer le schéma : dans le **SQL Editor** de Supabase, exécuter dans l'ordre :
   - `supabase/migrations/0001_schema.sql`
   - `supabase/migrations/0002_rls.sql`
   - `supabase/migrations/0003_signup_trigger.sql`
   - `supabase/migrations/0004_stripe_addon.sql`
   - `supabase/migrations/0005_task_recurrence.sql`
   (ou via la CLI Supabase : `supabase db push` si le projet local est lié).
4. Une fois le schéma appliqué, régénérer les types TypeScript (remplace le fichier écrit à la main) :
   ```bash
   npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
   ```

### Connecter Stripe

1. Créer un compte sur [stripe.com](https://stripe.com), rester en **mode Test**.
2. **Developers > API keys** → copier la `Secret key` → `STRIPE_SECRET_KEY`.
3. **Product catalogue** → créer 3 produits avec un prix récurrent mensuel :
   Studio Automatizzato (149 €), Studio 360 (249 €), Presenza Online (49 €) → copier chaque `price_...` dans `STRIPE_PRICE_*`.
4. Optionnel : ajouter un second prix **one-time** sur chaque produit pour le forfait de mise en place
   (1 490 € / 2 490 € / 900 € selon `agence-ia/offres/grille-tarifaire.md`) → `STRIPE_PRICE_*_SETUP`.
5. Une fois déployé, **Developers > Webhooks > Add endpoint** → URL `<NEXT_PUBLIC_APP_URL>/api/webhooks/stripe`,
   événements `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   → copier le `Signing secret` → `STRIPE_WEBHOOK_SECRET`.

## Structure

```
src/
  app/                    # routes App Router
  components/ui/          # composants shadcn/ui
  lib/supabase/
    client.ts             # client navigateur (Server/Client Components)
    server.ts             # client serveur (cookies, session utilisateur)
    admin.ts              # client service role — bypass RLS, routes serveur de confiance uniquement
    types.ts              # types Database (miroir du schéma SQL)
supabase/
  migrations/
    0001_schema.sql          # tables + enums + index
    0002_rls.sql             # Row Level Security (isolation par studio_id)
    0003_signup_trigger.sql  # création automatique studio + owner à l'inscription
    0004_stripe_addon.sql    # colonne studios.addon_presenza_online
    0005_task_recurrence.sql # récurrence automatique des modèles de tâches (Modelli)
```

## Design tokens

Palette définie dans `src/app/globals.css` / `tailwind.config.ts` :

| Rôle | Couleur |
|---|---|
| Fond page | `#0B1E33` |
| Fond card | `#0F2A4A` |
| Accent (primary) | `#1FBF9E` |

## Multi-tenancy

Isolation stricte par `studio_id` via Row Level Security Postgres. La fonction `current_studio_id()` (SECURITY DEFINER, voir `0002_rls.sql`) dérive le studio du user connecté sans dépendre d'un claim JWT custom. Toutes les tables métier (sauf `studios`) ont une policy `for all using (studio_id = current_studio_id())`.

## Auth

Signup (`/signup`) collecte `studioName` + `fullName` et les passe en métadonnées à `supabase.auth.signUp()`. Le trigger `on_auth_user_created` (`0003_signup_trigger.sql`, SECURITY DEFINER sur `auth.users`) crée alors le `studio` et le `user` owner correspondants — indépendamment de l'état de confirmation de l'email. `src/middleware.ts` protège `/dashboard/*` (redirige vers `/login` si non connecté) et redirige les utilisateurs déjà connectés hors de `/login`/`/signup`.

## Récurrence des tâches (Workflow > Modelli)

Un modèle peut avoir une récurrence (`monthly`/`quarterly`/`yearly`) et une prochaine échéance (`next_due_date`). La logique de génération est centralisée dans `src/lib/recurring-tasks.ts` (`generateDueRecurringTasks`), utilisée par deux entrées :
- **Cron Vercel** (`vercel.json`, tous les jours à 6h UTC) → `/api/cron/recurring-tasks`, protégé par l'en-tête `Authorization: Bearer <CRON_SECRET>` que Vercel envoie automatiquement si la variable d'environnement `CRON_SECRET` est configurée sur le projet.
- **Bouton "Esegui ora le ricorrenze scadute"** dans Workflow > Modelli, pour déclencher la génération immédiatement (tester une récurrence sans attendre le cron), scopé au studio de l'utilisateur via RLS.

Chaque tâche générée reprend l'échéance du modèle (`due_date`), tout comme "Usa questo modello" (création manuelle). La prochaine date est recalculée en clampant au dernier jour du mois si nécessaire (ex: 31 janvier + 1 mois → 28 février).

## Bozze email (inoltro automatico)

Chaque studio a un jeton unique (`webhook_tokens`) qui sert à la fois d'identifiant d'URL webhook n8n **et** de local-part d'une adresse email dédiée : `<token>@INBOUND_EMAIL_DOMAIN` (ex: `in.automa-ia.net`). Le professionnel configure un simple transfert automatique dans sa propre boîte mail (Gmail/Outlook) vers cette adresse — aucune autorisation OAuth sur son compte n'est nécessaire, seulement un réglage qu'il gère et peut annuler lui-même.

Fonctionnement :
1. **Mailgun** (compte + sous-domaine `INBOUND_EMAIL_DOMAIN` avec ses enregistrements MX/DNS) reçoit l'email transféré.
2. Une **Route** Mailgun (`match_recipient(".*@in.automa-ia.net")`) le transmet en `POST` vers `/api/webhooks/inbound-email`.
3. La route vérifie la signature HMAC de Mailgun (`MAILGUN_WEBHOOK_SIGNING_KEY`, cf. Account > Security sur Mailgun), retrouve le studio via le local-part du destinataire, puis appelle `createEmailDraft()` (`src/lib/email-draft.ts`) — la même logique partagée par le webhook n8n et le formulaire "Prova rapida".

L'URL webhook n8n reste disponible en option avancée pour qui préfère cette voie plutôt que l'inoltro automatico.

**Filtre newsletters/commerciale** : `/api/webhooks/inbound-email` ignore silencieusement (aucune bozza créée, aucun appel Claude) tout email portant un en-tête MIME `List-Unsubscribe` (fourni par Mailgun dans `message-headers`), quasi systématique sur les newsletters et emails commerciaux légitimes, absent d'un vrai email de client.

## Passage en mode Live (Stripe)

La production tourne pour l'instant avec des clés et Price ID **Test** (aucun vrai paiement possible). Pour basculer en Live : recréer les 3 produits + prix (récurrents et setup) sur le dashboard Stripe en mode Live, remplacer `STRIPE_SECRET_KEY` et les 6 `STRIPE_PRICE_*` (scope Production) par leurs équivalents Live, et créer un nouvel endpoint webhook Live pointant vers `https://app.automa-ia.net/api/webhooks/stripe` pour obtenir un `STRIPE_WEBHOOK_SECRET` Live.

## Abbonamento (Stripe)

`/dashboard/abbonamento` propose 2 plans (Studio Automatizzato, Studio 360) + l'add-on Presenza Online, chacun via une Stripe Checkout Session (`mode: "subscription"`), avec `metadata: { studio_id, kind }` propagée sur la session **et** sur la subscription (`subscription_data.metadata`) pour que le webhook puisse identifier le studio sur les événements ultérieurs. Le webhook `/api/webhooks/stripe` gère `checkout.session.completed` (active le plan/l'add-on), `customer.subscription.updated`/`.deleted` (synchronise `plan_status`/`addon_presenza_online` selon le statut Stripe). Le bouton "Gestisci abbonamento" ouvre le Customer Portal Stripe.
