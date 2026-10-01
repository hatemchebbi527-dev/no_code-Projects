# Manuvo — Backlog

Liste des tâches et idées de fonctionnalités à traiter plus tard. À prioriser au fil de l'avancement du projet.

Statut : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## 0. Dette technique / ops (issu de la session du 2026-09-20/21)

- [x] **Sécurité : passer les variables secrètes Vercel en « Sensitive »** — _fait (2026-09-24)_
  - Les ~9 variables secrètes (`DATABASE_URL`, `POSTGRES_PASSWORD`, `PGPASSWORD`, `POSTGRES_URL*`, `DATABASE_URL_UNPOOLED`, `NEON_AUTH_BASE_URL`…) recréées en **Sensitive** (valeurs inchangées, masquées write-only). Build production vert après migration : la base reste bien branchée.
  - Rappel : une variable Sensitive a sa valeur masquée définitivement ; pour la modifier plus tard, il faut la supprimer puis recréer (copier la valeur avant suppression).
- [x] **Migrations Prisma auto au déploiement — rétabli (2026-09-21)**
  - `buildCommand: vercel-build` réactivé (#80) ; `prisma migrate deploy` tourne au build (prouvé par un déploiement Production Ready). Les migrations en attente s'appliquent automatiquement.
  - Reste (optionnel) : aligner le checksum de `add_unlock_refund` dans `_prisma_migrations` (drift toléré par migrate deploy).
- [x] **Déploiement Production fiable — GitHub Action + Deploy Hook (2026-09-21)**
  - `.github/workflows/vercel-deploy.yml` appelle un Deploy Hook Vercel (secret `VERCEL_DEPLOY_HOOK`) à chaque push sur `main` touchant `manuvo/**` (+ `workflow_dispatch`). Testé de bout en bout. Le webhook natif reste actif en parallèle (doublons occasionnels sans gravité).
- [ ] **Migrer les libellés inline vers les 5 fichiers de messages** : page `/artigiano/[matricule]`, carte « profil public » du profil, historique Rimborsi, aria-label « Menu » du hamburger (clé `nav.menu`), libellés des familles/tuiles de la landing, section « Come funziona ».
- [ ] **Retirer l'outil de test « avis » avant le lancement** : boutons admin « + 3 avis test » / « Reset test » sur `/admin/artigiani` (`admin/artigiani/actions.ts`) qui injectent/suppriment des avis de démonstration (note 5) pour valider le badge « artisan vérifié ». Admin uniquement. À supprimer, ou masquer derrière un flag, en production.
- [ ] **Nettoyer les données de test avant lancement** : vider les leads/unlocks/transactions/reviews/push de démonstration en base (Neon) pour partir sur une base propre.

### Infra e-mail & push configurée (session 2026-09-30)

- [x] **E-mail transactionnel opérationnel (Resend)** : domaine d'envoi **`manuvo.automa-ia.net`** vérifié dans le compte Resend qui détient la clé (DKIM + SPF/CNAME chez Wix). `EMAIL_FROM = Manuvo <noreply@manuvo.automa-ia.net>`, `RESEND_API_KEY` du bon compte. Admin destinataire = `info@automa-ia.net`.
- [x] **Web push (VAPID) réparé** : nouvelle paire de clés alignée (`VAPID_PUBLIC_KEY` = `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`). Les anciens abonnements (créés avec l'ancienne clé) échouaient en 400 ; réabonnement propre requis après changement de clé.
- [x] **Doublon admin nettoyé** : un seul compte ADMIN (`info@automa-ia.net`), mot de passe réinitialisé via « mot de passe oublié ».
- [ ] **Optionnel (hygiène) : régénérer les secrets qui ont transité en clair dans la session de chat** (clé Resend, clés VAPID) et mettre à jour Vercel, si tu veux être 100% carré.

---

## 1. Mise en production / paiements

- [x] **Recharge de crédits (test) réparée — webhook Stripe (2026-09-30)**
  - Cause : l'endpoint webhook pointait vers l'ancienne URL `manuvo-automaia.vercel.app` qui renvoyait un **308** (Stripe ne suit pas les redirections) → 100% d'échec → crédits jamais ajoutés. Corrigé vers `https://manuvo.automa-ia.net/api/stripe/webhook` (event `checkout.session.completed`), `STRIPE_WEBHOOK_SECRET` aligné. Recharge test validée (livraison 200, solde crédité).

- [ ] **Stripe en mode Live** (au lancement, avec la P.IVA)
  - Compléter le KYC du compte Stripe (identité + IBAN pour les virements)
  - Basculer les clés API de test vers les clés Live dans Vercel (`STRIPE_SECRET_KEY` = `sk_live_`, clé publique si utilisée)
  - **Recréer le webhook côté Live** : endpoint `https://manuvo.automa-ia.net/api/stripe/webhook` (event `checkout.session.completed`) et coller son `whsec_` Live dans `STRIPE_WEBHOOK_SECRET`, puis redéployer (attention : ne pas laisser une URL vercel.app qui redirige en 308)
  - Ajouter l'événement `Purchase` Meta Pixel sur l'achat
  - Tester un vrai achat de crédits de bout en bout

- [ ] **Mentions légales avec la vraie P.IVA**
  - Ajouter la Partita IVA personnelle dans les pages légales une fois l'enregistrement fait

---

## 2. Marketing / acquisition

- [~] **Meta Pixel + UTM**
  - [x] Pixel branché dans le code (2026-09-25), piloté par `NEXT_PUBLIC_META_PIXEL_ID` (inactif tant que la variable n'est pas définie). Événements : `PageView` (toutes pages), `Lead` (publication d'une demande), `CompleteRegistration` (inscription artisan).
  - [x] Convention UTM documentée + instructions de setup dans `MARKETING.md`.
  - [ ] Reste : créer le Pixel côté Meta et coller l'ID dans la variable Vercel (voir `MARKETING.md`).
  - [ ] Reste : événement `Purchase` sur l'achat de crédits (à faire avec Stripe Live).
  - [ ] Optionnel : Meta Conversions API (CAPI) serveur pour fiabiliser le suivi.

- [x] **Plan marketing + contenus (2026-09-25/27)** — _fait_
  - Artefact **« Piano Marketing Manuvo »** (stratégie chauffe + lancement, 3 phases, calendrier, posts italiens prêts à copier) ; fichier versionné `manuvo/SOCIAL.md`.
  - Artefact **« Annunci Meta e Google »** rafraîchi avec l'angle confiance (vérif SMS, zéro contact falso), targeting, mots-clés + négatifs, RSA, budget.
  - Comptes sociaux créés (handle `manuvo.it`) + bios italiennes ; visuels de profil (fond blanc + corail), couverture Facebook, bannière LinkedIn.
- [~] **Vidéos de marque en motion design (skill `brand-motion-design`, 2026-10-01)**
  - Skill installée dans le repo (`.claude/skills/brand-motion-design/`, MIT) : films HyperFrames + Three.js, 9:16, musique générée. Profil de marque vidéo : `manuvo/videos/BRAND.md`.
  - [x] Teaser Phase 0 (`manuvo/videos/teaser-phase0/`, 17 s) : v1 livrée.
  - [ ] Suite possible (même série, même HUD et musique) : « Il problema n°1 » (Phase 0, Post 3), annonce J1 « Manuvo è online » au lancement, démo « pubblica in 60s ».
- [ ] **Régénérer les vrais visuels d'annonces (Meta / Google)**
  - Images carrées et verticales prêtes à uploader, avec le nouveau logo (hexagone + anuvo), le corail `#FF5758` et le domaine `manuvo.automa-ia.net`
  - Note : les kits d'annonces ne contiennent que les textes et réglages, pas les visuels des créas

---

## 3. Fonctionnalités produit

- [x] **Espace de contact / messagerie artisan ↔ admin** — _fait (2026-09-23)_
  - Chat bidirectionnel in-app : l'artisan écrit à l'admin depuis son espace (`/dashboard/messaggi`), l'admin répond depuis sa boîte de réception (`/admin/messaggi`). Fil par artisan, statut lu/non lu, badges non-lus en temps réel (polling 25 s + focus/visibilité + point sur le hamburger mobile).
  - **Gratuit** : aucun coût extra (pas de SMS), les crédits restent réservés au déblocage des leads.

- [x] **Capter nom + prénom du particulier à l'ouverture de la page de demande** — _fait_
  - Champs Prénom + Nom en tête de `/pubblica`, autofocus + autofill, message de bienvenue personnalisé.
  - Ébauche enregistrée avant l'envoi (`LeadDraft`) ; note de confidentialité RGPD ; onglet admin Ébauches.

- [x] **Menu de navigation mobile pour l'espace artisan** — _fait_
  - Hamburger (Bacheca / Crediti / Profilo), fermeture clic ext. + Échap. Fix padding bas (bannière d'installation ne masque plus le contenu).

- [x] **Visuel de la landing / des métiers** — _fait_
  - 35 métiers regroupés en 8 familles ; pages `/categorie/[slug]` ; cartes métier et tuiles de familles en photos (Unsplash, fallback icône/dégradé) ; cartes « Come funziona » en photos ; formulaire pré-rempli via `?category=` + boutons retour.

- [x] **Section FAQ sur la landing** — _fait (2026-09-23, #96)_
  - Accordéon `<details>` (sans JS) avant la bande CTA, 7 questions/réponses dans les 5 langues (it/fr/en/de/ar). Met en avant la vérification SMS (pas de faux contact + remboursement) et la recharge de crédits libre sans minimum.

- [x] **Bouton « Accedi » visible sur mobile** — _fait_
  - Header landing : le lien de connexion s'affiche désormais en bouton compact sur mobile (était masqué sous `sm`).

- [x] **UX formulaire `/pubblica` — robustesse (2026-09-28)** — _fait_
  - Conseil au particulier sur l'écran de confirmation (comparer les 3 devis + répondre aux appels), 5 langues, visible côté privato uniquement (#103).
  - Conservation de la saisie après une erreur serveur : tous les champs passés en contrôlés (React 19 réinitialisait le formulaire) — plus de perte de données ni d'abandon (#104).
  - Bouton « Pubblica un'altra richiesta » : rechargement complet pour repartir sur un formulaire vierge (était inactif car déjà sur `/pubblica`) (#105).

---

## 4. Inspiration concurrentielle (ProntoPro)

Analyse du concurrent italien ProntoPro (modèle très proche). Point faible connu de ProntoPro : **demandes fausses ou fantômes** — principal axe de différenciation pour Manuvo.

**Priorité haute (confiance + différenciation) :**

- [x] **Anti-faux-leads** — _livré_
  - [x] Vérification du numéro du particulier par **code SMS** avant publication. ⚠️ Reste à **brancher Twilio** en prod (`docs/TWILIO.md`) ; sinon mode dev (ne bloque pas encore les faux).
  - [x] **Remboursement des crédits** avec **validation admin** (onglet Rimborsi, motif cadré).
  - [x] **Garde-fous anti-abus** : corroboration entre artisans (X/Y sur le même lead), taux de remboursement de l'artisan, motifs cadrés.
  - [x] **Traçabilité des remboursements** : historique des remboursements traités (client + artisan) + signaux de récidive (client signalé ×N, remboursements artisan ×N).
  - [x] **Notification auto des demandes de remboursement à l'admin** — _fait (2026-09-30)_ : email (Resend) + web push dès qu'un artisan signale un contact, avec lien vers `/admin/rimborsi`. Best effort, ne bloque jamais l'artisan.
  - Argument marketing : « Chez Manuvo, tu ne paies jamais pour un faux contact »

- [x] **Système d'avis / notation vérifié** — _fait_
  - Avis possible uniquement après un déblocage réel ; lien envoyé par SMS au client (l'artisan ne le voit pas). Note moyenne + badge « artisan vérifié » (>=3 avis & moyenne >=4.0).

- [x] **Profil artisan public** — _fait (v1)_
  - Page publique `/artigiano/[matricule]` : métiers, zone, note, avis, badge vérifié ; lien de partage dans l'espace artisan.
  - [x] Badge distinct **« P.IVA registrata »** — _fait (2026-09-24)_ : affiché sur le profil public `/artigiano/[matricule]`, à côté du nom et du badge avis (bleu + icône document). Atteste que l'artisan a fourni un numéro de TVA italien valide (format 11 chiffres + checksum) à l'inscription. Libellé honnête (« registrata », pas « verificata ») car ce n'est pas encore une vérification au registre officiel.
  - [ ] Optionnel avant lancement : vraie **vérification VIES / Agenzia Entrate** (API officielle) pour confirmer que la P.IVA est active, et alors passer le libellé à « verificata ».

**Priorité moyenne :**

- [ ] **Chat intégré particulier ↔ artisan** (rejoint la messagerie du point 3)
- [x] **Fiabilité du particulier / clients fantômes** — _fait (2026-09-30)_
  - **Auto-blocage des numéros récidivistes** (`lib/phone-reputation.ts`) : un numéro client avec ≥ 2 remboursements **approuvés** ne peut plus republier (bloqué dans `createLead`) et ses demandes ouvertes sont masquées de la bacheca (`getAvailableLeads`). Seuil `BLOCK_THRESHOLD`. Basé sur les remboursements validés admin uniquement.
  - **Badge « Contatto verificato »** sur chaque demande de la bacheca, avant déblocage (rend visible la garantie SMS déjà en place).
- [x] **« 3 artisans max » comme argument de vente** — _fait (2026-09-29)_ : mis en avant sur la landing (cartes privati/artigiani) et la page `/pubblica` (5 langues). Carte privati orientée bénéfice « Ricevi fino a 3 preventivi e scegli il migliore ».

**Priorité basse :**

- [ ] **Devis en ligne optionnel** : l'artisan propose un prix, le particulier compare
- [x] **Paliers de recharge avec crédits offerts** — _fait (2026-09-30)_ : champ `CreditPack.bonusCredits`, grille prix plat 2€/crédit (10cr/20€ +0, 25cr/50€ +3 popolare, 50cr/100€ +10), badge vert « +N offerti », checkout crédite le total. Testé en prod.

---

## 5. Naming

- [ ] **Renommage éventuel Manuvo → « Expert »** (à confirmer ; nom générique, envisager un nom composé)

---

## Hors périmètre Manuvo (monorepo)

- [ ] **Build cassé : `agence-ia/automaia-app`** (projet Vercel `no-code-projects-fibm`)
  - Échoue au déploiement, indépendamment de Manuvo, à traiter séparément
