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

---

## 1. Mise en production / paiements

- [ ] **Stripe en mode Live**
  - Compléter le KYC du compte Stripe (identité + IBAN pour les virements)
  - Basculer les clés API de test vers les clés Live (variables d'environnement Vercel)
  - Pointer le webhook Stripe vers le domaine de production : `https://manuvo.automa-ia.net/api/stripe/...`
  - Tester un vrai achat de crédits de bout en bout

- [ ] **Mentions légales avec la vraie P.IVA**
  - Ajouter la Partita IVA personnelle dans les pages légales une fois l'enregistrement fait

---

## 2. Marketing / acquisition

- [ ] **Meta Pixel + UTM**
  - Installer le Meta Pixel sur le site
  - Ajouter les paramètres UTM sur les liens des annonces pour tracer les conversions

- [ ] **Régénérer les vrais visuels d'annonces (Meta / Google)**
  - Images carrées et verticales prêtes à uploader, avec le nouveau logo (hexagone + anuvo), le corail `#FF5758` et le domaine `manuvo.automa-ia.net`
  - Note : le kit actuel `manuvo-ads.html` ne contient que les textes et réglages, pas les visuels

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

---

## 4. Inspiration concurrentielle (ProntoPro)

Analyse du concurrent italien ProntoPro (modèle très proche). Point faible connu de ProntoPro : **demandes fausses ou fantômes** — principal axe de différenciation pour Manuvo.

**Priorité haute (confiance + différenciation) :**

- [x] **Anti-faux-leads** — _livré_
  - [x] Vérification du numéro du particulier par **code SMS** avant publication. ⚠️ Reste à **brancher Twilio** en prod (`docs/TWILIO.md`) ; sinon mode dev (ne bloque pas encore les faux).
  - [x] **Remboursement des crédits** avec **validation admin** (onglet Rimborsi, motif cadré).
  - [x] **Garde-fous anti-abus** : corroboration entre artisans (X/Y sur le même lead), taux de remboursement de l'artisan, motifs cadrés.
  - [x] **Traçabilité des remboursements** : historique des remboursements traités (client + artisan) + signaux de récidive (client signalé ×N, remboursements artisan ×N).
  - Argument marketing : « Chez Manuvo, tu ne paies jamais pour un faux contact »

- [x] **Système d'avis / notation vérifié** — _fait_
  - Avis possible uniquement après un déblocage réel ; lien envoyé par SMS au client (l'artisan ne le voit pas). Note moyenne + badge « artisan vérifié » (>=3 avis & moyenne >=4.0).

- [x] **Profil artisan public** — _fait (v1)_
  - Page publique `/artigiano/[matricule]` : métiers, zone, note, avis, badge vérifié ; lien de partage dans l'espace artisan.
  - [x] Badge distinct **« P.IVA registrata »** — _fait (2026-09-24)_ : affiché sur le profil public `/artigiano/[matricule]`, à côté du nom et du badge avis (bleu + icône document). Atteste que l'artisan a fourni un numéro de TVA italien valide (format 11 chiffres + checksum) à l'inscription. Libellé honnête (« registrata », pas « verificata ») car ce n'est pas encore une vérification au registre officiel.
  - [ ] Optionnel avant lancement : vraie **vérification VIES / Agenzia Entrate** (API officielle) pour confirmer que la P.IVA est active, et alors passer le libellé à « verificata ».

**Priorité moyenne :**

- [ ] **Chat intégré particulier ↔ artisan** (rejoint la messagerie du point 3)
- [ ] **Fiabilité du particulier** : marquer les clients « fantômes » (demandes jamais converties) — complète la traçabilité remboursements par n° client déjà en place
- [ ] **« 3 artisans max » comme argument de vente** (ProntoPro va jusqu'à 5)

**Priorité basse :**

- [ ] **Devis en ligne optionnel** : l'artisan propose un prix, le particulier compare
- [ ] **Paliers de recharge avec crédits offerts**

---

## 5. Naming

- [ ] **Renommage éventuel Manuvo → « Expert »** (à confirmer ; nom générique, envisager un nom composé)

---

## Hors périmètre Manuvo (monorepo)

- [ ] **Build cassé : `agence-ia/automaia-app`** (projet Vercel `no-code-projects-fibm`)
  - Échoue au déploiement, indépendamment de Manuvo, à traiter séparément
