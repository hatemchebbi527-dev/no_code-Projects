# Manuvo — Récap de session (handoff)

Document de reprise pour continuer le projet dans une nouvelle session.

## Le projet
- **Manuvo** : marketplace de mise en relation particuliers ↔ artisans (Italie). Le particulier publie une demande (sans compte), les artisans paient des **crédits** pour débloquer le contact (1 crédit = 2 €, max 3 artisans/demande).
- **Stack** : Next.js 16 (App Router) · Prisma 6 + PostgreSQL (Neon) · Auth.js v5 · next-intl (5 langues : **it/fr/en/de/ar**, locale par cookie `NEXT_LOCALE`, pas de préfixe d'URL) · Tailwind v4 · déployé sur **Vercel**.
- **Domaine prod** : `manuvo.automa-ia.net` (projet Vercel **`no-code-projects-y1yy`**, rootDirectory `manuvo`, Production Branch = `main`).
- **Marque** : corail **#FF5758**, logo **hexagone + « anuvo »**.

## Workflow (à respecter)
- **Une branche fraîche par changement, coupée depuis `main`** (ex. `claude/manuvo-...`), puis 1 PR → squash-merge dans `main`. L'ancienne branche `claude/home-services-marketplace-euatcx` est **obsolète** (en conflit après les squash) — ne plus l'utiliser.
- Traductions dans les **5 langues**. Les libellés très locaux à une page sont parfois définis **inline** (map par locale) pour éviter de réécrire les 5 gros JSON — à migrer vers les fichiers de messages quand on veut (voir BACKLOG).
- **Sandbox** : réseau sortant bloqué → impossible de charger le site live ni de tester le rendu ; les vrais SMS ne partent qu'en prod. La vérif visuelle mobile est faite par Hatem.

## ⚠️ Points de vigilance (opérationnel)
1. **Migrations Prisma : automatiques au build (rétabli).** `buildCommand: vercel-build` est de nouveau actif dans `vercel.json` → `prisma migrate deploy` tourne à chaque déploiement (contre l'URL Neon **directe/non-poolée** pour éviter le verrou P1002). Ne plus appliquer les migrations à la main sauf incident. Règle d'or maintenue : **ne jamais éditer une migration déjà appliquée**, toujours en créer une nouvelle.
2. **Déploiement Production fiable via GitHub Action + Deploy Hook.** Le webhook natif GitHub→Vercel ratait des merges. Désormais `.github/workflows/vercel-deploy.yml` (racine du repo) appelle un **Deploy Hook Vercel** (secret repo `VERCEL_DEPLOY_HOOK`) à chaque push sur `main` touchant `manuvo/**` (+ lancement manuel `workflow_dispatch`). Note : l'`ignoreCommand` de Vercel annule le build si le commit de tête ne touche pas `manuvo/` (comportement voulu).
3. **Twilio toujours à brancher** (voir plus bas) : sans les clés, vérif SMS + demande d'avis tournent en mode dev.

## Fait (mergé en prod)
1. Rebrand complet (logo + corail) + domaine perso ; flyers A5 + posts + kit ads.
2. **Téléphone artisan obligatoire** à l'inscription + **page profil** `/dashboard/profilo`.
3. **Capture nom/prénom** du particulier en tête de `/pubblica` + **ébauches** (`LeadDraft`) + onglet admin **Ébauches**.
4. Admin : colonne **« Traité par »** (artisans ayant débloqué chaque demande).
5. **35 métiers** (catégories) avec icônes + traductions.
6. **Anti-faux-leads** : vérif SMS du numéro (`PhoneVerification`) ; **remboursement des crédits** avec validation admin (onglet **Rimborsi**) + garde-fous (corroboration X/Y, taux artisan, motifs cadrés).
7. **Avis par étoiles** : bouton artisan → SMS au client → page publique `/recensione/[token]` (note 1–5).
8. **Note moyenne + badge « artisan vérifié »** (>= 3 avis soumis ET moyenne >= 4.0). Affiché sur `/dashboard/profilo` et le tableau admin Artisans (colonne Note). Calcul à la volée (pas de migration).
9. **Menu mobile de l'espace artisan** (hamburger : Bacheca / Crediti / Profilo, fermeture clic ext. + Échap) + fix : padding bas pour que la bannière d'installation ne masque plus le dernier bloc.
10. **Page profil public** `/artigiano/[matricule]` (ex. `/artigiano/ART-0004`) : nom, ville/pays, matricule, badge vérifié, note + étoiles, métiers, avis clients (note+commentaire, sans identité client), CTA « publie ta demande ». **Données publiques uniquement** (jamais tél/email/P.IVA). Lien « Voir/partager mon profil public » dans `/dashboard/profilo`.
11. **Traçabilité des remboursements** : onglet Rimborsi → nouvelle section **Historique** (remboursements approuvés/refusés) avec artisan + client (nom+tél) + motif + date, et **signaux de récidive** (« client signalé ×N », « remboursements artisan ×N »). Voir `getRefundHistory` dans `lib/refunds.ts`.
12. **Infra déploiement** : migrations auto rétablies au build (#80) + déploiement Production fiable via GitHub Action + Deploy Hook Vercel (#82). Voir points de vigilance 1 et 2.

## Incident prod résolu (2026-09-20/21)
- Symptôme : 500 sur `/dashboard` et l'admin. Cause : la base de **prod** avait la migration `add_unlock_refund` marquée appliquée mais la colonne **`Unlock.refundReasonCode` manquait** (migration éditée après coup → jamais rejouée). Corrigé en ajoutant la colonne à la main dans Neon (`ALTER TABLE "Unlock" ADD COLUMN IF NOT EXISTS "refundReasonCode" TEXT;`).
- Leçon : **ne jamais modifier une migration déjà appliquée** → toujours en créer une nouvelle. Si un jour « column ... does not exist » : même type de fix (ajouter la colonne/table manquante dans Neon).

## Action ops en attente
**Brancher Twilio** : compte + Sender ID « Manuvo » + variables `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM` sur Vercel. Guide : `docs/TWILIO.md`.

## Prochaines étapes (voir BACKLOG.md)
- Stripe **mode Live** (KYC, clés, webhook sur le domaine).
- Meta Pixel + UTM ; **vrais visuels d'annonces** Meta/Google.
- Messagerie **artisan ↔ admin**.
- Relancer les artisans inscrits **sans téléphone** ; **P.IVA** réelle dans les mentions légales.
- Renommage éventuel **Manuvo → « Expert »** (à confirmer).
- Sécurité : marquer en **Sensitive** les variables d'env Vercel signalées « Needs Attention ».
- Dette technique : migrer les libellés inline vers les 5 JSON ; aligner l'empreinte `_prisma_migrations` de `add_unlock_refund` (checksum `622ae7b...`) ; badge « P.IVA vérifiée » distinct du badge avis.
- Hors Manuvo : build cassé `agence-ia/automaia-app`.

## Repères techniques
- Modèles clés : `User` (artisan/admin, `matricule` → `ART-0001`), `Lead`, `Unlock` (+ champs refund), `LeadDraft`, `PhoneVerification`, `Review`, `CreditTransaction` (PURCHASE / SPEND / BONUS / REFUND).
- Libs : `lib/reviews.ts` (avis + `getArtisanStats` / `getArtisanStatsMap` / `computeArtisanStats`, badge >=3 & >=4.0), `lib/refunds.ts` (`getRefundRequests` + `getRefundHistory`), `lib/sms.ts`, `lib/phone-verification.ts`, `lib/base-url.ts`, `lib/constants.ts` (`formatMatricule`).
- Composants : `components/StarRating.tsx` (`StarRating`, `VerifiedBadge`).
- Pages clés : `/dashboard` (bacheca) + layout `HeaderNav` (menu mobile), `/dashboard/profilo`, `/artigiano/[matricule]` (public), admin onglets Demandes / Artisans / Ébauches / Rimborsi (+ Historique).
- Infra : `vercel.json` (`buildCommand: vercel-build`, `ignoreCommand`), `prisma/migrate-deploy.mjs` (migrate deploy sur URL Neon directe), `.github/workflows/vercel-deploy.yml` (Deploy Hook).
- Admin : onglets Demandes / Artisans / Ébauches / Rimborsi.
