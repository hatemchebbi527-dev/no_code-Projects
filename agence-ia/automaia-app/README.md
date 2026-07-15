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
- [ ] Phase 9 — Déploiement Vercel + domaine `automa-ia.net`

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

## Abbonamento (Stripe)

`/dashboard/abbonamento` propose 2 plans (Studio Automatizzato, Studio 360) + l'add-on Presenza Online, chacun via une Stripe Checkout Session (`mode: "subscription"`), avec `metadata: { studio_id, kind }` propagée sur la session **et** sur la subscription (`subscription_data.metadata`) pour que le webhook puisse identifier le studio sur les événements ultérieurs. Le webhook `/api/webhooks/stripe` gère `checkout.session.completed` (active le plan/l'add-on), `customer.subscription.updated`/`.deleted` (synchronise `plan_status`/`addon_presenza_online` selon le statut Stripe). Le bouton "Gestisci abbonamento" ouvre le Customer Portal Stripe.
