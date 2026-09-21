# Manuvo — Backlog

Liste des tâches et idées de fonctionnalités à traiter plus tard. À prioriser au fil de l'avancement du projet.

Statut : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## 0. Dette technique / ops (issu de la session du 2026-09-20/21)

- [ ] **Sécurité : passer les variables secrètes Vercel en « Sensitive »**
  - Vercel signale « Needs Attention » sur ~9 variables contenant des secrets (`DATABASE_URL`, `POSTGRES_PASSWORD`, `PGPASSWORD`, `POSTGRES_URL*`, `DATABASE_URL_UNPOOLED`, `NEON_AUTH_BASE_URL`…) : elles sont lisibles en clair dans le dashboard.
  - Action : pour chacune, `⋯` → Edit → cocher **Sensitive** (parfois recréer la variable en Sensitive). Ne pas changer les valeurs.
  - Ne pas supprimer à l'aveugle les variables gérées par l'intégration Neon (risque de recréation / lien cassé) ; Manuvo n'utilise que `DATABASE_URL`.
  - Priorité : basse, mais à faire **avant la mise en Live de Stripe**.
- [ ] **Réactiver les migrations Prisma au déploiement**
  - `buildCommand: vercel-build` a été retiré de `vercel.json` (il figeait les déploiements sur un décalage d'empreinte de `add_unlock_refund` + verrou advisory Neon P1002).
  - En attendant : appliquer chaque nouvelle migration **à la main dans la console SQL Neon** puis l'enregistrer dans `_prisma_migrations` (checksum = sha256 du `migration.sql`).
  - À faire : nettoyer le décalage d'empreinte côté prod, puis remettre `migrate deploy` au build de façon fiable.
- [ ] **Webhook GitHub→Vercel peu fiable** : plusieurs merges `main` n'ont pas déclenché de déploiement Production. À surveiller ; contournement : petit commit ou « Promote to Production ».
- [ ] **Migrer les libellés inline vers les 5 fichiers de messages** : page `/artigiano/[matricule]`, carte « profil public » du profil, historique Rimborsi, aria-label « Menu » du hamburger (clé `nav.menu`).

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

- [ ] **Espace de contact / messagerie artisan ↔ admin**
  - Niveau 1 (simple) : l'artisan envoie un message à l'admin depuis son espace ; l'admin les reçoit dans une boîte de réception au panneau admin
  - Niveau 2 (complet) : chat bidirectionnel avec fil de discussion, statut lu/non lu et notifications (réutiliser le système de notifications existant)
  - Reco : commencer par le niveau 1, faire évoluer vers le chat si le besoin se confirme

- [x] **Capter nom + prénom du particulier à l'ouverture de la page de demande** — _fait_
  - Champs Prénom + Nom en tête de `/pubblica`, autofocus + autofill, message de bienvenue personnalisé.
  - Ébauche enregistrée avant l'envoi (`LeadDraft`) ; note de confidentialité RGPD ; onglet admin Ébauches.

- [x] **Menu de navigation mobile pour l'espace artisan** — _fait_
  - Hamburger (Bacheca / Crediti / Profilo), fermeture clic ext. + Échap. Fix padding bas (bannière d'installation ne masque plus le contenu).

- [ ] **Relancer les artisans déjà inscrits pour compléter leur téléphone**
  - Les comptes créés avant l'ajout du champ téléphone n'ont pas de numéro
  - Envoyer un email les invitant à compléter leur profil (`/dashboard/profilo`)

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
  - [ ] Reste : badge distinct **« P.IVA vérifiée »** (la P.IVA est validée à l'inscription, à exposer comme badge séparé du badge avis).

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
