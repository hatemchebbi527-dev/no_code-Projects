# CONTEXT.md

> Mon contexte personnel et professionnel pour mon Jarvis.
> Ce fichier est mis à jour au fil du temps par Claude.

---

## Qui je suis

- **Prénom :** Hatem
- **Ville / Pays :** Rimini, Italie (côte adriatique)
- **Situation actuelle :** Employé en reconversion professionnelle active
- **Profil dominant :** Employé en transition vers Indépendant / Entrepreneur IA

---

## Ce que je fais

### Activité principale

Réceptionniste de nuit dans un hôtel à Rimini. Ce poste me laisse du temps pour me former et préparer ma transition vers une activité freelance dans le domaine de l'intelligence artificielle.

### Projet de reconversion

Je me forme activement pour devenir consultant et développeur IA indépendant. Mon objectif est de créer une agence spécialisée dans l'automatisation des processus opérationnels des entreprises et les services digitaux liés à l'IA.

**Nom de l'agence :** AutomaIA (domaine : automaia.net). Logo et charte visuelle définis dans agence-ia/marque/.

**Ce que je veux faire concrètement :**
- Créer des automatisations pour aider les entreprises à optimiser leurs processus
- Développer des applications et sites web intégrant l'IA
- Proposer des services de conseil en transformation digitale par l'IA

**Clients types visés :** cabinets de professionnels libéraux (avocats, comptables, notaires, dentistes, vétérinaires, médecins). Niche fer de lance choisie en juin 2026, élargie en août 2026 aux dentistes et vétérinaires. Médecins et professions de santé abordés avec soin (contraintes données de santé). Cibles secondaires d'expansion : instituts de beauté, agences de com/événementiel, startups.

---

## Mes objectifs

### Objectifs court terme (3 à 6 mois)

- Décrocher mon premier client freelance en IA
- Lancer un projet concret d'automatisation pour une entreprise locale

### Objectifs long terme (1 à 3 ans)

- Lancer ma propre agence IA spécialisée dans l'automatisation et les services digitaux
- Quitter mon emploi actuel d'hôtel
- Atteindre la liberté financière et sociale

---

## Mes projets en cours

Liste des projets ou chantiers actifs :

- Dossier projet `agence-ia/` : marque AutomaIA construite. 6 fichiers de marque (audience, brand_voice, offers_cta, graphics_brief, positionnement, prompts) + kit visuel complet (logo en plusieurs versions, bannières LinkedIn et Facebook, avatar, favicon).
- Suivi du plan "Compagnon 30 jours Claude Code" : Semaine 1 complète (Jours 1 à 7). Semaine 2 (site WordPress) SAUTÉE volontairement (site AutomaIA déjà fait en Next.js). En Semaine 3 : Jour 15 (script API Python) scaffoldé mais à finir sur sa machine, Jour 20 (offre packagée) FAIT, Jour 21 (lead magnet) FAIT, Jour 24 (pricing) FAIT. Prochain logique : Semaine 4 (prospection : Jour 22 outbound, Jour 25 proposition, Jour 26 objections). Plan complet dans context/import/compagnon-30-jours-claude-code.md
- Grille tarifaire validée (agence-ia/offres/grille-tarifaire.md) : Assistente Email 600 € + 79 €/mois, Studio Automatizzato 1 490 € + 149 €/mois (cible), Studio 360 2 490 € + 249 €/mois (premium), option Presenza Online 900 € + 49 €/mois. Calculateur ROI HTML dispo (calcolatore-roi.html).
- Offre packagée "Assistant Email Intelligent" (agence-ia/offres/assistant-email.md) : porte d'entrée, forfait 600 € + 79 €/mois (provisoire), script de démo Loom (FR + IT). Prête à présenter.
- Lead magnet "Cinque automazioni per guadagnare fino a 10 ore a settimana" (agence-ia/lead-magnet/guida-5-automazioni.md) : guide italien, mis en forme dans Canva (https://www.canva.com/d/XzCioKXQlcC-P1y). Reste à ajouter le lien d'audit et exporter en PDF. Aimant à prospects. Promesse alignée sur le site (10h).
- Premier post "build in public" publié sur LinkedIn (profil cohérent : bannière + titre + post). Priorité actuelle : construire le réseau LinkedIn pour la diffusion. Posts d'avance dans agence-ia/contenuti/.
- Workflows n8n opérationnels : veille RSS vers Google Sheet, publication Instagram automatisée (API Meta), et assistant de réponse aux emails (Gmail Trigger vers API Claude vers brouillon Gmail, filtrage des vrais mails clients via node IF, threading du brouillon dans la conversation d'origine, parsing JSON robuste avec try/catch, et notification Telegram en temps réel à chaque mail client). **Workflow complet, testé et validé de bout en bout. Premier actif démontrable en prospection.**
- **Prospection artisans automatisée (n8n + Notion)** : workflow n8n « **prospezione artigiani V4 - Google places to Notion** » qui interroge Google Places, fait qualifier chaque fiche par Claude et écrit dans le CRM Notion « CRM Artigiani — Manuvo (Rimini) » (https://app.notion.com/p/e29b4127a44046839f627d1aef3dfeaf). Le Place ID sert de clé anti-doublon. Le CRM porte, par artisan : Nome, Settore, Citta, Telefono, Email, Sito, Indirizzo, note et nombre d'avis Google, Stima collaboratori, Punteggio IA + Motivo qualifica (qualification Claude), Accroche (première ligne du message, générée par Claude), Fonte, Priorita, **Stato** (Nuovo, Da contattare, Contattato, Interessato, Pre-iscritto, Iscritto Manuvo, Non interessato), Contattato, Ultimo contatto, Follow-up J+4, Richiamato gennaio. **C'est la base unique de la prospection artisans Manuvo : plus de Google Sheet.**
- Site web 7sport-agency (7sport-agency.vercel.app) : proposition réalisée avec Claude Code pour un client réel, finie et envoyée pour validation. En attente de retour client.
- **Manuvo** (manuvo-automaia.vercel.app) : **lancement fixé au vendredi 22 janvier 2027** (décidé le 3 nov 2026, au lieu du 4 décembre), avec ouverture de la P.IVA le lundi 4 janvier 2027 pour ne pas perdre une année du régime forfettario à 5 %. Rien ne doit constituer un début d'activité avant cette date (pas d'inscription payante, pas d'encaissement). D'ici là : pré-inscriptions artisans sur le terrain (objectif 50 au 18 décembre), sprint d'inscription du 5 au 21 janvier, date publique annoncée le 13 janvier. Calendrier marketing Notion entièrement recalé sur cette date. Marketplace de mise en relation particuliers / artisans (plomberie, électricité, etc.), produit AutomaIA. Application Next.js 16 déployée sur Vercel + base Neon Postgres. Modèle économique : les artisans achètent des crédits (1 crédit = 2 €) et dépensent 3 à 5 crédits pour débloquer le contact d'un particulier (max 3 artisans par demande). **Offre d'amorçage décidée le 22 oct 2026 : 5 crediti offerts à chaque artisan inscrit pendant la phase de lancement**, soit 10 € de valeur et un seul contact débloqué. Le parrainage (étape 37) donne 5 crediti de plus **au parrain seulement**, le filleul recevant ses 5 crediti de bienvenue comme tout le monde : 5 crediti est donc le point d'entrée unique, quelle que soit la source. **Mécanisme implémenté le 23 oct 2026** : le code d'invitation est le matricule du parrain (ART-0001), champ facultatif à l'inscription prérempli par un lien `/signup?ref=ART-0001`, auto-relation `referredById` sur User, crédit versé à l'inscription du filleul dans la même transaction, plafond de 3 parrainages récompensés par 30 jours, carte « Invita un collega » dans l'espace crédits et colonne `parraine_par` dans l'export CSV admin. Socle complet et en ligne : auth (artisans + admin), packs de crédits, bacheca des demandes avec règles de déblocage, panneau admin, formulaire public sans compte, 5 langues (it défaut, en, fr, de, ar avec RTL), PWA installable, identité visuelle rouge. Fonctionnalités avancées ajoutées : matricule artisan (ART-0001) + liste admin avec contacts + export CSV, choix métiers + pays à l'inscription, mot de passe oublié par email (Resend), pages légales RGPD (titulaire affiché : AutomaIA, contact info@automa-ia.net), notifications ciblées métier+zone pour les artisans + notif de chaque demande pour l'admin (centre in-app + Web Push VAPID), et **paiement réel des crédits par Stripe Checkout** (validé en mode test). **Emails transactionnels en ligne** : domaine automa-ia.net vérifié dans Resend (DKIM + SPF via DNS Wix), expéditeur no-reply@automa-ia.net, envoi réel vers n'importe quel destinataire (réinitialisation de mot de passe fonctionnelle en production). **Web Push opérationnel** (testé sur iPhone en PWA : notification + son), avec clés VAPID régénérées et cohérentes dans Vercel. Retouches récentes : bacheca artisan filtrée par ses métiers uniquement (partout : liste, cloche), colonne Métiers dans la liste admin + export CSV, et **validation stricte du téléphone du particulier** (via libphonenumber-js selon le pays, numéro normalisé au format international) pour éviter qu'un artisan paie des crédits pour un contact inutilisable. **Base nettoyée le 3 nov 2026** (étape 16) : plus aucune donnée ni compte de démo, seul admin `info@automa-ia.net` (ADMIN_EMAIL et ADMIN_PASSWORD configurés dans Vercel), outil admin d'avis de test retiré, script réutilisable `manuvo/scripts/cleanup-prelaunch.sql` (à relancer avant le 22 janvier si des données de tournage sont créées). Liste d'attente : 2 vrais inscrits ; chaque nouvelle inscription notifie l'admin par email et push, et une page admin « Lista d'attesa » affiche les inscrits. L'app installée en mode coming soon renvoie l'admin connecté vers /admin (lien « Area riservata » pour se connecter). À finaliser côté Hatem : la P.IVA dans les pages légales quand elle existera, et passer Stripe en mode Live (vérification compte + IBAN, clés live + webhook live) avant les vrais paiements. Point de vigilance : les vidéos annoncent la vérification SMS. Plan Twilio : mini-test Verify sur compte perso le 12 novembre, dossier du nom d'expéditeur « Manuvo » le 7 décembre, version B sans SMS (interrupteur du badge dans Vercel) le 14 décembre, puis compte, code et test du 5 au 7 janvier et activation le 15 janvier. Décision SMS finale le 21 janvier.
- **Vidéos de marque Manuvo** (`manuvo/videos/`) : identité motion (« un sixième de tour », guide publié), teaser Phase 0 (musique suspense), vidéo de présentation 3D « argile » en 9:16 et 16:9 (sans musique, ajoutée sur chaque plateforme), et « Il problema n°1 » (20 s, beat hip-hop, pilier confiance : vérification SMS contre faux contacts, avec une copie à effets seuls et un extrait Story de 6 s). Le profil de marque vidéo et les choix enregistrés sont dans `manuvo/videos/BRAND.md`.
- **Climbo (en évaluation, nov 2026)** : opportunité white-label « Review Marketing Flywheel™ » (climbo.com) revendue sous ma marque. Système de 3 agents IA : **SEO** (répond à chaque avis avec mots-clés locaux), **Social** (transforme les meilleurs avis en posts/stories IG/FB/TikTok avec les photos du client), **GEO** (écrit chaque semaine un article de blog localisé sur un sous-domaine + suit le ranking du client sur Google Maps et les IA). Modèle : **paiement unique à vie, clients illimités, pas d'abonnement fixe**. **Offre après appel téléphonique du 12 nov 2026 : prix promo 997 € one-time, 0 % de commission à vie (confirmé)**, seul coût = Stripe 2-3 % + usage tokens des clients (déjà couvert par leurs abonnements mensuels). Analyse consolidée sur 8 captures + 4 vidéos démo officielles + appel du 12 nov.
  - **✅ 2 contradictions levées à l'appel (12 nov), dans le bon sens** :
    1. **Commission** : **0 % à vie confirmé**. Plus de 20 %/3 %. Prix unique promo **997 €**. (Mon ancien calcul de bascule à 5 880 € est donc sans objet.)
    2. **Review gating** : **confirmé qu'il n'y en a pas**. Le client mécontent **choisit lui-même** d'aller sur Google ou de remplir le formulaire privé vers l'administration. Le chemin public reste ouvert à tous = conforme Google/RGPD.
  - **Autres réponses de l'appel** : clients 100 % à moi ; exclusivité 500 cibles confirmée (inapprochables par les autres agences dès l'entrée en pipeline) ; **peu d'agences Climbo en Italie (marché démarré aux USA) → avantage de premier entrant réel** ; lien playground gratuit reçu à tester. **Acompte de 150 €** à verser **après** le test du playground : il est **déduit des 997 €** et **bloque la promo** ; pas de date limite ferme confirmée.
  - **Modèle de coûts réel** (vidéo prix) : frais d'entrée unique + **coûts variables** minimes prélevés sur un « solde agence » à recharger (SMS ~0,01 $, WhatsApp ~0,03 $, tokens IA 6,60 $/million ; un client complet ≈ 1,5 $/mois) + **micro-frais** 0,35 €/rapport de visibilité et 0,05 €/email trouvé. **Si le solde tombe à zéro, les agents IA et messages des clients s'arrêtent** (erreur générique) → garder le solde provisionné. Marges documentées par Climbo : Bronze coût 2 $ → prix 99 $ (×50), Argent 6 $ → 149 $ (×25), Or 17 $ → 199 $ (×11). **Prix par établissement (per sede)**. C'est l'agence qui crée ses plans clients (fonctions + limites messages/tokens).
  - **Facturation** : via **mon propre compte Stripe** (versement hebdo), portail de facturation white-label, le client change de plan en self-service.
  - **Outils de vente intégrés (gros atout débutant)** : pipeline/CRM, recherche d'entreprises sur Google Maps par catégorie/ville, **rapport de visibilité PDF en 1 clic** (position Maps, invisibilité IA, réputation vs concurrents) à imprimer ou envoyer en cold email, bouton « trouver l'email », formulaire lead-magnet à intégrer sur mon site.
  - **Support/formation** : tickets réponse <24h, Academy, formation vente (« Sales Accelerator », live mensuel), AMA hebdo, communauté, base de connaissances + assistant IA. Atout réel vu mon point faible (la vente).
  - **Exclusivité = réservation de jusqu'à 500 entreprises précises** dans l'écosystème Climbo, premier arrivé premier servi, **libérables** (une cible retirée redevient disponible aux autres). Pas un monopole géographique : ne protège pas contre un concurrent hors Climbo ni une autre agence Climbo sur d'autres entreprises. Donc **pas une raison suffisante de payer le plan 1497 €**.
  - **Autres fonctions** : AI ranking (ChatGPT/Gemini/Perplexity/Grok), analyse concurrents, gestion Google Business Profile, dashboard performance (impressions, clics, appels, itinéraires), QR par employé + classement, multi-sites, website-builder, team d'affiliés, sentiment analysis mensuelle.
  - **Reco Claude (après appel) : feu vert conditionnel.** Dossier propre : 997 € one-time, 0 % commission, conforme (pas de gating), clients 100 % à moi, premier entrant en Italie. Économie excellente (997 € récupérés avec ~7 mois d'un seul client à 149 €/mois, ~1,3 mois avec 5 clients). **La décision ne tient plus qu'à UNE chose : la qualité en italien du playground.** Séquence : (1) tester le playground **en italien** (avis +, avis −, article GEO, ton) ; (2) si OK, payer les **150 €** (déduits, promo bloquée, risque minime ; demander s'ils sont remboursables en cas d'abandon) ; (3) valider 2-3 commerces de Rimini **avant** le solde de 847 € ; (4) lancer en janvier. Rappel : date limite non confirmée = pas de vraie urgence. Produit distinct de la niche cœur (professions libérales/artisans) ; tête de pont : hôtellerie/restauration de Rimini (crédibilité via mon poste). PDF de questions (FR + IT). **Pas encore acheté ; playground pas encore testé.**
- Développement de sites web et applications simples pour signer les premiers clients

---

## Mes outils et préférences

### Outils que j'utilise au quotidien

- n8n (automatisation et workflows)
- Notion (organisation et gestion de l'information, dont le CRM Artigiani Manuvo et le calendrier marketing)
- Google Sheets (stockage de données pour les workflows)
- API Meta / Instagram (publication automatisée)
- Skill Claude Code **brand-motion-design** (HyperFrames + Three.js) : produit des vidéos motion design pro à partir de la marque. Installée dans `.claude/skills/brand-motion-design/`.

### Style de communication préféré

Mélange selon le contexte : direct et efficace pour les sujets simples, pédagogique et détaillé pour les sujets complexes ou techniques.

### Domaine où j'ai besoin du plus d'aide

Productivité et organisation au quotidien

---

## Notes importantes

> Cette section se remplira au fil du temps avec les éléments de contexte qui émergent naturellement dans mes sessions avec Claude.

[VIDE INITIALEMENT - SE REMPLIRA AU FIL DU TEMPS]
