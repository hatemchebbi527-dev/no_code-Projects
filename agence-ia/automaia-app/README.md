# AutomaIA — App SaaS

Reconstruction fonctionnelle de la plateforme AutomaIA en SaaS multi-tenant (cf. cahier des charges technique). Un "tenant" = un "studio" (cabinet professionnel italien : commercialista, avvocato).

Stack : Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Supabase (Postgres, Auth, RLS).

## État d'avancement

- [x] **Phase 1 — Setup** : scaffold Next.js/Tailwind/shadcn, schéma SQL + RLS
- [x] **Phase 2 — Auth** : signup/login + création automatique du studio + middleware `/dashboard/*`
- [ ] Phase 3 — Layout app (sidebar/topbar)
- [ ] Phase 4 — Panoramica (stats)
- [ ] Phase 5 — Workflow + Acquisizione (Kanban)
- [ ] Phase 6 — Visibilità + Bozze email (Claude API)
- [ ] Phase 7 — Automazioni (webhooks n8n)
- [ ] Phase 8 — Abbonamento (Stripe)
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
