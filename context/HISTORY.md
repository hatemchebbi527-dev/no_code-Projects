# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-24

### Jour 25 (proposition 1 page) : FAIT
- Modèle de proposition commerciale d'une page créé dans agence-ia/offres/modello-proposta.md, en italien (vouvoiement "Lei"), aligné sur brand_voice.md et grille-tarifaire.md.
- 6 sections à champs `{{ }}` à dupliquer par prospect : situation actuelle (mots du client), ce que je propose (en résultat), livrables concrets, délais, investissement (tableau forfait + mensuel), prochain pas (une seule action datée).
- Inclut l'explication de la logique de chaque section + règles transverses (une page max, une seule offre recommandée à l'écrit, date de validité, toujours partir de l'audit du Jour 23) et le mode d'emploi par prospect.
- Ne demandait pas la machine locale (rédaction). Fait en session.

### Point d'avancement plan 30 jours + J18 (Make.com) écarté
- Revue de l'état réel des Semaines 1 à 3, croisée avec le compagnon 30 jours :
  - **Semaine 1 (J1 à J7) : 100% faite.**
  - **Semaine 2 (J8 à J14) : sautée volontairement** (site WordPress redondant avec le site Next.js existant).
  - **Semaine 3 (J15 à J21) :** J19 couvert dans les faits par l'assistant emails (try/catch + branche erreur + notif Telegram du 23/06), J20 et J21 faits.
- **Décision stratégique : Jour 18 (comparaison Make.com) ÉCARTÉ.** n8n est déjà l'outil par défaut et maîtrisé ; comparer Make maintenant ne rapproche pas d'un client. Gardé en réserve si un prospect impose Make.
- **Jours restant en attente sur la Semaine 3 : J15, J16, J17** (volontairement gardés dans la liste à reprendre).
  - J15 : 1ère API IA en script Python (scaffold créé, exécution à faire sur la machine locale : clé API + Python).
  - J16 : Airtable comme CRM (pas commencé).
  - J17 : automatisation de contenu, 1 idée → 4 déclinaisons plateformes (pas fait ; distinct de l'assistant emails).
- Note : l'assistant emails (22-23/06), hors numérotation du plan, a fait pratiquer en réel les compétences de J15 (API IA), J17 (prompt + automatisation vendable) et J19 (fiabilité). L'avancement de fond dépasse le compteur du plan.

### Plan 30 jours : WordPress sauté, passage Semaine 3, Jour 20 (offre packagée)
- Décision stratégique : Semaine 2 (site WordPress + Elementor) SAUTÉE, car le site AutomaIA existe déjà en Next.js. Refaire un site WordPress serait redondant. WordPress reste une compétence vendable à apprendre plus tard sur un site démo si besoin. Passage direct à la Semaine 3
- Jour 15 (première API IA en script Python) : dossier scaffold créé (agence-ia/automations/jour15-api-claude/ avec README + requirements.txt), mais EXÉCUTION REPORTÉE car Hatem n'était pas sur sa machine (clé API + Python requis en local). À reprendre sur sa machine : créer clé API console.anthropic.com, .env, puis écrire et lancer le script
- **Jour 20 (packager une offre) : FAIT.** Fiche offre "Assistant Email Intelligent" créée dans agence-ia/offres/assistant-email.md. Positionnée en porte d'entrée / quick win, basée sur l'actif réel (assistant emails). Contient périmètre, limites assumées, délai (5 à 7 jours), processus client, et script de démo Loom de 60s. Prix provisoires retenus (niveau moyen) : forfait de mise en place 600 € + abonnement 79 €/mois, à confirmer au Jour 24
- **Jour 21 (lead magnet) : FAIT.** Guide "Cinque automazioni per guadagnare fino a 10 ore a settimana" rédigé en italien dans agence-ia/lead-magnet/guida-5-automazioni.md, puis mis en forme dans Canva (design on-brand, lien édition https://www.canva.com/d/XzCioKXQlcC-P1y). Reste à Hatem : ajouter le lien d'audit sur le CTA et exporter en PDF
- Cohérence des messages corrigée : le lead magnet annonçait 5h, réaligné sur la promesse de marque "fino a 10 ore a settimana" (celle du site et de l'offre), avec ré-estimation honnête des temps par automatisation. Important pour ne pas perdre la confiance des prospects (incohérence repérée par Hatem)
- **Jour 24 (pricing) : FAIT.** Grille tarifaire 3 paliers avec logique d'ancrage (agence-ia/offres/grille-tarifaire.md) + calculateur ROI HTML on-brand en italien (agence-ia/offres/calcolatore-roi.html). Prix validés par Hatem : Assistente Email 600 € + 79 €/mois ; Studio Automatizzato 1 490 € + 149 €/mois (cible, "più richiesto") ; Studio 360 2 490 € + 249 €/mois (premium) ; option Presenza Online 900 € + 49 €/mois. Modèle forfait + abonnement, récurrent prioritaire
- Script de démo Loom de l'offre traduit en italien (versione "Lei") dans la fiche offre
- Portfolio : fiche Assistant emails finalisée avec lien vidéo démo Google Drive (penser à vérifier le partage public en navigation privée)

---

## 2026-06-23

### Assistant emails validé de bout en bout + 3 améliorations à ajouter
- Le workflow assistant emails est désormais testé et fonctionnel intégralement : Gmail Trigger → API Claude → parsing → node IF (filtrage est_client) → brouillon Gmail. Un vrai mail client part dans la branche true et génère un brouillon, les newsletters/notifications sont filtrées dans la branche false
- Débogage clé résolu : le body du node HTTP Request renvoyait `[object Object]` (JSON invalide). Solution = envelopper l'objet dans `JSON.stringify(...)` dans l'expression n8n, pour produire une vraie chaîne JSON et laisser n8n échapper proprement les sauts de ligne et guillemets du mail
- **Piste 1 (Threading) : FAITE et validée.** Thread ID branché sur `$('Gmail Trigger').item.json.threadId`, sujet gardé EXACT (sans "Re:", indispensable pour le rattachement au fil), et destinataire corrigé en `$('Gmail Trigger').item.json.from.value[0].address` (le champ `from` est un objet, pas une chaîne ; `headers.from` renvoyait "From: ..." invalide). Testé depuis une adresse externe (Yahoo) : le brouillon apparaît dans la bonne conversation, adressé au bon destinataire, réponse personnalisée au prénom de l'expéditeur
- **Piste 2 (Robustesse) : FAITE.** Node Code blindé avec try/catch, isolation du bloc JSON (entre 1ère { et dernière }), optional chaining et valeurs par défaut. Si JSON illisible : pas de crash, pas de brouillon foireux, champ `erreur_parsing: true`
- **Piste 3 (Extension) : FAITE.** Notification Telegram en temps réel. Choix du canal après analyse : Telegram retenu plutôt que WhatsApp (WhatsApp impose un modèle de message pré-approuvé par Meta pour les notifs proactives, trop de friction). Bot créé via BotFather, chat ID récupéré via @userinfobot, node Telegram branché en parallèle sur la sortie `true` du node IF. Message reçu et validé : expéditeur + urgence + résumé à chaque vrai mail client
- **Bilan : assistant emails 100% terminé** (filtrage + threading + robustesse + notif Telegram). Actif complet et démontrable en prospection

---

## 2026-06-22

### Premier actif démontrable : assistant de réponse aux emails (n8n + API Claude)
- Construction d'un workflow n8n complet et fonctionnel : un email arrive (Gmail Trigger) → l'API Claude (modèle Haiku) lit et comprend le mail → un node Code parse la réponse JSON → un brouillon de réponse est créé dans Gmail, prêt à relire et envoyer
- Choix produit : génération d'un BROUILLON (pas d'envoi automatique), pour que l'humain valide avant envoi. Argument de vente clé : zéro risque, le client garde le contrôle
- Débogage réalisé en autonomie guidée : champ du corps du mail (snippet vs text, Simplify désactivé sur le Gmail Trigger), nettoyage des balises markdown ```json renvoyées par Claude avant JSON.parse, et correction du rôle dans le prompt (Claude écrit AU NOM de Hatem vers l'expéditeur, pas l'inverse)
- Ajout d'un filtrage (node IF sur un champ est_client classifié par Claude) pour ne générer un brouillon que sur les vrais messages clients, en ignorant newsletters et notifications
- Statut : noté comme premier actif concret démontrable en prospection, pitch "j'installe un assistant qui pré-rédige vos réponses clients, vous validez en un clic"

---

## 2026-06-19

### Marque AutomaIA finalisée + Semaine 1 du plan complète (Jours 1 à 7)
- Marque créée : nom AutomaIA (domaine automaia.net), logo (horloge + boucle d'automatisation, couleurs bleu nuit + teal), et kit visuel complet (logo multi-versions, bannières LinkedIn et Facebook, avatar rond, favicon, icône fond blanc)
- Jour 1 du plan : positionnement.md (offre phare "récupérer jusqu'à 10h/semaine", synthèse ICP, 4 bios italiennes, stratégie de comptes par plateforme)
- Jour 2 : workflow n8n de veille RSS Google News vers Google Sheet
- Jour 3 : prompts.md, bibliothèque de 10 prompts business (3 testés et validés)
- Jour 4 : webhook + HTTP Request (comprendre comment 2 apps se parlent, test webhook via curl)
- Jour 5 : filtre par mots-clés (node Code JavaScript), workflow de veille finalisé (seules les actus pertinentes arrivent dans le Sheet)
- Jour 6 : documentation du workflow (automations/veille.md) + premier post "build in public" rédigé et PUBLIÉ sur LinkedIn (jalon : première publication AutomaIA)
- Jour 7 : bilan Semaine 1, quiz n8n réussi (8/10), 3 posts d'avance créés (contenuti/posts-settimana2.md)
- Workflow de publication Instagram automatisée fonctionnel (API Meta, flux de publication en 2 étapes)
- Décision stratégique : TikTok retiré de la stratégie marketing, la cible (avocats/comptables) n'y est pas en posture professionnelle. Priorité LinkedIn, puis Facebook et Instagram
- Prochain enjeu identifié : construire le réseau LinkedIn (0 relation) pour donner de la portée aux publications

---

## 2026-06-16

### Première proposition client + lancement du plan 30 jours
- Réalisation d'un site web (7sport-agency.vercel.app) pour un client réel avec Claude Code, fini et envoyé pour validation. Première proposition concrète envoyée à un prospect
- Adoption du plan d'apprentissage "Compagnon 30 jours Claude Code" (sauvegardé dans context/import/) : programme jour par jour couvrant n8n, WordPress/Elementor, API IA, automatisation et prospection

### Définition de la niche + fondation de marque de l'agence
- Création du dossier projet `agence-ia/` (marque/, automations/, site/, journal.md, .gitignore protégeant les secrets)
- Choix de la niche fer de lance après recherche : cabinets de professionnels libéraux (avocats, comptables, médecins), médecins en dernier à cause des contraintes sur les données de santé
- Rédaction des 4 fichiers de marque fondateurs :
  - `audience.md` : ICP, 4 problèmes clients, promesse de récupérer jusqu'à 10h/semaine, argument confidentialité
  - `brand_voice.md` : voix claire/rassurante/concrète/honnête, vouvoiement chaleureux, zéro jargon technique
  - `offers_cta.md` : 3 offres avec "Cabinet automatisé" en porte d'entrée, modèle forfait de mise en place + abonnement mensuel récurrent
  - `graphics_brief.md` : charte validée, palette bleu nuit (#0F2A4A) + accent teal (#16B8A6), titres Montserrat / corps Inter

---

## 2026-05-23

### Installation initiale du Jarvis
- Workspace personnalisé pour Hatem, basé à Rimini (Italie)
- Profil principal : Employé en reconversion vers Indépendant / Entrepreneur IA
- Activité : Réceptionniste de nuit en hôtel, en formation active pour devenir freelance IA
- Objectifs court terme identifiés : décrocher un premier client freelance en IA, lancer un projet d'automatisation pour une entreprise locale
- Vision long terme : lancer une agence IA, quitter l'emploi actuel, atteindre la liberté financière et sociale
- Projets actifs au démarrage : formation Claude Code, automatisations n8n, développement web/apps pour premiers clients
- Domaine d'aide prioritaire : productivité et organisation au quotidien
- Style de communication choisi : mélange selon le contexte (direct pour le simple, pédagogique pour le complexe)
