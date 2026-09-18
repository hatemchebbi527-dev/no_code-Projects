# Manuvo — Backlog

Liste des tâches et idées de fonctionnalités à traiter plus tard. À prioriser au fil de l'avancement du projet.

Statut : `[ ]` à faire · `[~]` en cours · `[x]` fait

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

- [ ] **Capter nom + prénom du particulier à l'ouverture de la page de demande**
  - Dès que le particulier ouvre la page `/pubblica`, capter son nom et prénom (UI/UX)
  - Objectif : personnaliser l'expérience et ne pas perdre le contact même si la demande n'est pas finalisée
  - À définir : petit champ / modal d'accueil en haut de page, puis pré-remplissage du formulaire ; penser au consentement RGPD si on stocke avant soumission

- [ ] **Menu de navigation mobile pour l'espace artisan**
  - Aujourd'hui la nav (Demandes / Crédits / Profil) est cachée sur mobile
  - Ajouter un menu (burger ou barre) pour que les artisans accèdent facilement au profil et aux crédits depuis leur téléphone

- [ ] **Relancer les artisans déjà inscrits pour compléter leur téléphone**
  - Les comptes créés avant l'ajout du champ téléphone n'ont pas de numéro
  - Envoyer un email les invitant à compléter leur profil (`/dashboard/profilo`)

---

## 4. Inspiration concurrentielle (ProntoPro)

Analyse du concurrent italien ProntoPro (modèle très proche : demande gratuite côté client, artisans qui paient des crédits pour contacter). Idées à évaluer, priorisées. Point faible connu de ProntoPro (récurrent dans les avis) : **demandes fausses ou fantômes** — c'est le principal axe de différenciation pour Manuvo.

**Priorité haute (confiance + différenciation) :**

- [ ] **Anti-faux-leads** (attaque le point faible de ProntoPro)
  - Vérification du numéro du particulier par **code SMS** avant publication de la demande
  - **Remboursement des crédits** à l'artisan si le contact est injoignable / faux
  - Argument marketing fort : « Chez Manuvo, tu ne paies jamais pour un faux contact »

- [ ] **Système d'avis / notation vérifié**
  - Un avis n'est possible qu'après un déblocage réel (interaction sur la plateforme), comme ProntoPro
  - Moteur de confiance principal du concurrent ; Manuvo n'en a aucun aujourd'hui

- [ ] **Profil artisan public + badge « P.IVA vérifiée »**
  - Page publique (métiers, zone, avis, badge de vérification)
  - Manuvo valide déjà la P.IVA à l'inscription : il reste à l'exposer

**Priorité moyenne :**

- [ ] **Chat intégré particulier ↔ artisan** (rejoint la messagerie du point 3)
- [ ] **Fiabilité du particulier** : marquer les clients « fantômes » (demandes jamais converties) pour protéger les artisans et affiner l'anti-abus
- [ ] **« 3 artisans max » comme argument de vente** : ProntoPro va jusqu'à 5 pros par demande, Manuvo plafonne à 3. À mettre en avant explicitement (moins de concurrence par lead)

**Priorité basse :**

- [ ] **Devis en ligne optionnel** : l'artisan propose un prix, le particulier compare
- [ ] **Paliers de recharge avec crédits offerts** (Manuvo a déjà les crédits de bienvenue)

> Note : ProntoPro n'a pas pu être scrapé (réseau sortant du sandbox verrouillé, et le scraping d'un concurrent pose un problème de CGU). Analyse basée sur des sources publiques (site officiel, guides tiers, avis Trustpilot).

---

## Hors périmètre Manuvo (monorepo)

- [ ] **Build cassé : `agence-ia/automaia-app`** (projet Vercel `no-code-projects-fibm`)
  - Échoue au déploiement, indépendamment de Manuvo, à traiter séparément
