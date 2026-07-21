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

**Clients types visés :** cabinets de professionnels libéraux italiens (commercialisti/comptables, avvocati/avocats, médecins). Niche fer de lance choisie en juin 2026. **Priorité affinée en juillet 2026 : les commercialisti en premier**, puis les avvocati, médecins en dernier (contraintes données de santé). Cibles secondaires d'expansion : instituts de beauté, agences de com/événementiel, startups.

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

- **Plateforme SaaS multi-tenant AutomaIA** (https://app.automa-ia.net) : application Next.js 14 + Supabase + Stripe + API Claude, déployée sur Vercel. Espace client par cabinet : dashboard, tâches/kanban, modèles de tâches récurrentes, contacts (CRM léger), génération de contenu et bozze email, abonnement Stripe (3 offres), landing page publique. Phases 1-9 du cahier des charges terminées. **Assistant email par transfert automatique (inbound Mailgun sur le domaine in.freelancerai.eu) validé de bout en bout en juillet 2026.**
- **Décision stratégique (juillet 2026) :** pour décrocher le premier client, livrer les automatisations via le **n8n central de l'agence** (géré par Hatem, le client ne touche à rien de technique et ne gère aucun crédit) plutôt que d'attendre que la plateforme SaaS soit entièrement self-service. La couche self-service des automatisations dans l'app devient une **Phase 2**, à construire quand le volume de clients le justifiera. Doc d'architecture : `agence-ia/automaia-app/docs/automazioni-n8n-partagees.md`.
- **Pack Automatisation Commercialista défini (juillet 2026)** — offre centrée sur les vraies douleurs des commercialisti : relance de collecte de documents, rappels d'échéances fiscales (scadenzario), assistant email (déjà en prod), rappels de rendez-vous, solleciti (relances de paiement). Livraison par vagues (du moins au plus sensible), source de données MVP = tableur partagé (pas d'intégration compta lourde au début). Confidentialité gérée par minimisation + contrat RGPD. Doc : `agence-ia/offre-pack-commercialista.md`.
- Dossier projet `agence-ia/` : marque AutomaIA construite. 6 fichiers de marque (audience, brand_voice, offers_cta, graphics_brief, positionnement, prompts) + kit visuel complet (logo en plusieurs versions, bannières LinkedIn et Facebook, avatar, favicon).
- Suivi du plan "Compagnon 30 jours Claude Code" : Semaine 1 complète (Jours 1 à 7). Semaine 2 (site WordPress) SAUTÉE volontairement (site AutomaIA déjà fait en Next.js). En Semaine 3 : Jour 15 (script API Python) scaffoldé mais à finir sur sa machine, Jour 20 (offre packagée) FAIT, Jour 21 (lead magnet) FAIT, Jour 24 (pricing) FAIT. Prochain logique : Semaine 4 (prospection : Jour 22 outbound, Jour 25 proposition, Jour 26 objections). Plan complet dans context/import/compagnon-30-jours-claude-code.md
- Grille tarifaire validée (agence-ia/offres/grille-tarifaire.md) : Assistente Email 600 € + 79 €/mois, Studio Automatizzato 1 490 € + 149 €/mois (cible), Studio 360 2 490 € + 249 €/mois (premium), option Presenza Online 900 € + 49 €/mois. Calculateur ROI HTML dispo (calcolatore-roi.html).
- Offre packagée "Assistant Email Intelligent" (agence-ia/offres/assistant-email.md) : porte d'entrée, forfait 600 € + 79 €/mois (provisoire), script de démo Loom (FR + IT). Prête à présenter.
- Lead magnet "Cinque automazioni per guadagnare fino a 10 ore a settimana" (agence-ia/lead-magnet/guida-5-automazioni.md) : guide italien, mis en forme dans Canva (https://www.canva.com/d/XzCioKXQlcC-P1y). Reste à ajouter le lien d'audit et exporter en PDF. Aimant à prospects. Promesse alignée sur le site (10h).
- Premier post "build in public" publié sur LinkedIn (profil cohérent : bannière + titre + post). Priorité actuelle : construire le réseau LinkedIn pour la diffusion. Posts d'avance dans agence-ia/contenuti/.
- Workflows n8n opérationnels : veille RSS vers Google Sheet, publication Instagram automatisée (API Meta), et assistant de réponse aux emails (Gmail Trigger vers API Claude vers brouillon Gmail, filtrage des vrais mails clients via node IF, threading du brouillon dans la conversation d'origine, parsing JSON robuste avec try/catch, et notification Telegram en temps réel à chaque mail client). **Workflow complet, testé et validé de bout en bout. Premier actif démontrable en prospection.**
- Site web 7sport-agency (7sport-agency.vercel.app) : proposition réalisée avec Claude Code pour un client réel, finie et envoyée pour validation. En attente de retour client.
- Développement de sites web et applications simples pour signer les premiers clients

---

## Mes outils et préférences

### Outils que j'utilise au quotidien

- n8n (automatisation et workflows, instance centrale sur le VPS de l'agence)
- Notion (organisation et gestion de l'information)
- Google Sheets (stockage de données pour les workflows)
- API Meta / Instagram (publication automatisée)
- Stack de la plateforme SaaS : Next.js 14, Supabase (Postgres/Auth/RLS), Stripe, API Claude, Vercel, Mailgun (email entrant)
- Metricool (gestion et publication réseaux sociaux, LinkedIn en priorité)

### Style de communication préféré

Mélange selon le contexte : direct et efficace pour les sujets simples, pédagogique et détaillé pour les sujets complexes ou techniques.

### Domaine où j'ai besoin du plus d'aide

Productivité et organisation au quotidien

---

## Notes importantes

> Cette section se remplira au fil du temps avec les éléments de contexte qui émergent naturellement dans mes sessions avec Claude.

- **Principe de livraison (juillet 2026) :** un seul n8n central géré par l'agence sert tous les clients. Le client fournit une matière première simple (un accès, un fichier, une autorisation révocable), l'agence construit et fait tourner, le client reçoit le résultat. Modèle "fatto per te", le client ne touche jamais à la technique.
- **Séquencer avant de tout construire :** ne pas bâtir toutes les automatisations en spéculatif avant d'avoir un client. Vendre le pack, livrer par vagues, commencer par le moins sensible pour installer la confiance.
- **Angle confidentialité :** les plus grosses douleurs (relances, rappels) ne demandent que des métadonnées (qui/quoi/quand), pas le contenu confidentiel. La confidentialité bien traitée (minimisation, accès révocables, contrat RGPD art. 28, périmètre limité à l'opérationnel du cabinet) devient un argument de vente, pas un obstacle.
