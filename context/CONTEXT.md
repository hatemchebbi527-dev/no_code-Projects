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

**Clients types visés :** cabinets de professionnels libéraux (avocats, comptables, médecins). Niche fer de lance choisie en juin 2026. Médecins abordés en dernier (contraintes données de santé). Cibles secondaires d'expansion : instituts de beauté, agences de com/événementiel, startups.

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
- Suivi du plan "Compagnon 30 jours Claude Code" : **Semaines 1 à 3 TERMINÉES.** Semaine 1 (Jours 1 à 7) complète. Semaine 2 (site WordPress) SAUTÉE volontairement (site AutomaIA déjà fait en Next.js). Semaine 3 : Jour 15 (1er appel API Claude en Python) EXÉCUTÉ, Jour 16 (CRM Airtable) FAIT, Jour 17 (moteur de contenu) FAIT, Jour 18 (Make) ÉCARTÉ, Jours 19/20/21 FAITS. Semaine 4 entamée : Jour 24 (pricing) FAIT, Jour 25 (proposition) FAIT, Jour 26 (objections, doc) FAIT. Restent : entraînement objections (J26), Jour 22 (outbound), Jour 23 (audit), Jour 27 (onboarding), Jour 28 (bilan), Jours 29-30 (relances). Plan complet dans context/import/compagnon-30-jours-claude-code.md
- **Site AutomaIA déployé sur Vercel (public).** Site Next.js dans agence-ia/site/automaia-web, déployé depuis la branche main. Le formulaire de contact alimente automatiquement le CRM. Domaine cible automaia.net à brancher quand voulu.
- **CRM de prospection Airtable "AutomaIA - CRM Prospect"** : se remplit tout seul depuis le formulaire du site (via webhook n8n). Table Prospects (Nome, Contatto, Settore, Email, Telefono, Stato, Fonte, Note, Data contatto). Chaîne d'acquisition de leads complète et en production.
- **Moteur de contenu "Declinazione Contenuti" (n8n)** : à partir d'une idée, génère 3 posts adaptés (LinkedIn, Instagram, Facebook) en italien avec le modèle Claude Sonnet, et publie automatiquement sur les 3 plateformes (LinkedIn en texte via contournement HTTP, FB + IG avec image générée). Offre vendable + outil de présence en ligne. Doc : agence-ia/automations/jour17-declinazione-contenuti/.
- Grille tarifaire VALIDÉE ET FIGÉE (agence-ia/offres/grille-tarifaire.md) : Assistente Email 600 € + 79 €/mois, Studio Automatizzato 1 490 € + 149 €/mois (cible), Studio 360 2 490 € + 249 €/mois (premium), option Presenza Online 900 € + 49 €/mois. Calculateur ROI HTML dispo (calcolatore-roi.html).
- Offre packagée "Assistant Email Intelligent" (agence-ia/offres/assistant-email.md) : porte d'entrée, forfait 600 € + 79 €/mois (prix figés), script de démo Loom (FR + IT). Prête à présenter.
- Modèle de proposition 1 page (agence-ia/offres/modello-proposta.md) et doc objections/réponses (agence-ia/offres/obiezioni-risposte.md) : outils de vente prêts à dupliquer par prospect (italien, Lei).
- Lead magnet "Cinque automazioni per guadagnare fino a 10 ore a settimana" (agence-ia/lead-magnet/guida-5-automazioni.md) : guide italien, mis en forme dans Canva (https://www.canva.com/d/XzCioKXQlcC-P1y). Reste à ajouter le lien d'audit et exporter en PDF. Aimant à prospects. Promesse alignée sur le site (10h).
- Présence LinkedIn : profil perso cohérent (bannière + titre + premier post "build in public"). Page entreprise "Automa IA" créée (publication auto sur la Page reportée, profil perso pour l'instant). Priorité : construire le réseau LinkedIn pour la diffusion. Posts d'avance dans agence-ia/contenuti/.
- Workflows n8n opérationnels : (1) veille RSS vers Google Sheet ; (2) assistant de réponse aux emails (Gmail Trigger vers API Claude vers brouillon Gmail, filtrage des vrais mails clients via node IF, threading, parsing JSON robuste, notification Telegram) **complet et validé, premier actif démontrable** ; (3) formulaire du site vers CRM Airtable ; (4) moteur de contenu multi-plateformes (idée vers 3 posts vers LinkedIn + Facebook + Instagram). Instance n8n auto-hébergée sur n8n.freelancerai.eu (gérée aussi en workflows-as-code via n8nac).
- Site web 7sport-agency (7sport-agency.vercel.app) : proposition réalisée avec Claude Code pour un client réel, finie et envoyée pour validation. En attente de retour client.
- Développement de sites web et applications simples pour signer les premiers clients

---

## Mes outils et préférences

### Outils que j'utilise au quotidien

- n8n (automatisation et workflows, instance auto-hébergée n8n.freelancerai.eu)
- API Claude / Anthropic (cœur des automatisations IA : assistant emails, moteur de contenu)
- Airtable (CRM de prospection)
- Vercel (hébergement du site AutomaIA en Next.js)
- Canva (visuels et mise en forme on-brand)
- OpenAI (génération d'images pour les posts)
- Notion (organisation et gestion de l'information)
- Google Sheets (stockage de données pour les workflows)
- API Meta / Instagram + Facebook (publication automatisée)
- LinkedIn (API pour publication, profil perso ; Page entreprise Automa IA)

### Style de communication préféré

Mélange selon le contexte : direct et efficace pour les sujets simples, pédagogique et détaillé pour les sujets complexes ou techniques.

### Domaine où j'ai besoin du plus d'aide

Productivité et organisation au quotidien

---

## Notes importantes

> Cette section se remplira au fil du temps avec les éléments de contexte qui émergent naturellement dans mes sessions avec Claude.

[VIDE INITIALEMENT - SE REMPLIRA AU FIL DU TEMPS]
