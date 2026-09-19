# Manuvo — Récap de session (handoff)

Document de reprise pour continuer le projet dans une nouvelle session.

## Le projet
- **Manuvo** : marketplace de mise en relation particuliers ↔ artisans (Italie). Le particulier publie une demande (sans compte), les artisans paient des **crédits** pour débloquer le contact (1 crédit = 2 €, max 3 artisans/demande).
- **Stack** : Next.js 16 (App Router) · Prisma 6 + PostgreSQL (Neon) · Auth.js v5 · next-intl (5 langues : **it/fr/en/de/ar**) · Tailwind v4 · déployé sur **Vercel**.
- **Domaine prod** : `manuvo.automa-ia.net` (projet Vercel **`no-code-projects-y1yy`**, rootDirectory `manuvo`).
- **Marque** : corail **#FF5758**, logo **hexagone + « anuvo »**.

## Workflow (à respecter)
- Branche de dev : **`claude/home-services-marketplace-euatcx`**. Après chaque merge, **repartir de `origin/main`** (elle est re-mergée à chaque fois).
- Chaque changement = 1 PR → merge dans `main`.
- Migrations Prisma toujours **additives** ; avant push : `prisma generate` + `tsc --noEmit` + `eslint` ; traductions dans les **5 langues**.
- **Sandbox** : réseau sortant bloqué → impossible de charger le site live ni de scraper ; les vrais SMS ne partent qu'en prod.

## Fait (mergé en prod)
1. Rebrand complet (logo + corail) + domaine perso ; flyers A5 + posts + kit ads régénérés.
2. **Téléphone artisan obligatoire** à l'inscription + **page profil** `/dashboard/profilo`.
3. **Capture nom/prénom** du particulier en tête de `/pubblica` + **ébauches** (`LeadDraft`) avant envoi + onglet admin **Ébauches**.
4. Admin : colonne **« Traité par »** (artisans ayant débloqué chaque demande).
5. **35 métiers** (catégories) avec icônes + traductions.
6. **Anti-faux-leads** :
   - **Vérif SMS** du numéro du particulier avant publication (`PhoneVerification`, `lib/sms.ts` Twilio + mode dev).
   - **Remboursement des crédits** avec **validation admin** (onglet **Rimborsi**) + garde-fous : corroboration X/Y signalements, taux de l'artisan, motifs cadrés.
7. **Avis par étoiles** (fondation badge vérifié) : bouton artisan → **SMS au client** → page publique `/recensione/[token]` (note 1–5).
8. Doc `docs/TWILIO.md`, `BACKLOG.md` à jour, `vercel.json` (ignoreCommand) + Ignored Build Step sur les 5 projets frères (quota Vercel réglé).

## ⚠️ Action ops en attente (bloquante pour la vérif SMS et les avis)
**Brancher Twilio** : compte + Sender ID « Manuvo » + variables `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM` sur Vercel. Sans ça, vérif SMS + demande d'avis tournent en **mode dev** (code/lien loggués, pas de vrai SMS, protection anti-faux inactive). Guide : `docs/TWILIO.md`.

## Prochaines étapes (backlog)
- **Note moyenne + badge « artisan vérifié » + page profil public** (suite directe des avis).
- Renommage **Manuvo → « Expert »** (à confirmer ; nom générique, envisager un nom composé).
- Stripe **mode Live** (KYC, clés, webhook sur le domaine).
- Meta Pixel + UTM ; **vrais visuels d'annonces** Meta/Google.
- Messagerie **artisan ↔ admin** ; **menu mobile** de l'espace artisan.
- Relancer les artisans inscrits **sans téléphone** ; **P.IVA** réelle dans les mentions légales.
- Hors Manuvo : build cassé `agence-ia/automaia-app` (projet frère du monorepo).

## Repères techniques
- Modèles clés : `User` (artisan/admin), `Lead`, `Unlock` (+ champs refund), `LeadDraft`, `PhoneVerification`, `Review`, `CreditTransaction` (types PURCHASE / SPEND / BONUS / REFUND).
- SMS : `src/lib/sms.ts` (Twilio si env présentes, sinon mode dev). Vérif : `src/lib/phone-verification.ts`. Remboursements : `src/lib/refunds.ts`. Avis : `src/lib/reviews.ts`.
- Admin : onglets Demandes / Artisans / Ébauches / Rimborsi.
- Voir `BACKLOG.md` pour la liste complète et priorisée.
