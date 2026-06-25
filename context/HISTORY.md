# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-24

### Jour 17 (déclinaison de contenu) : FAIT, workflow n8n construit et testé
- Workflow "Declinazione Contenuti" construit dans n8n et testé de bout en bout : Manual Trigger → Set (variable idea) → HTTP Request Claude (node copié de l'assistant emails pour réutiliser l'auth) → Code parsing JSON. 1 idée produit bien 3 posts LinkedIn/Instagram/Facebook en italien. Critère "fait" atteint.
- Offre vendable documentée dans agence-ia/automations/jour17-declinazione-contenuti/README.md (prompt + workflow + exemple). TikTok écarté (décision 19/06).
- 2 ajustements qualité après 1er test : 1) Instagram sortait les "\n" en toutes lettres → fonction clean() ajoutée dans le node Code (replace des \n littéraux par de vrais retours à la ligne) + règle dans le prompt ; 2) Claude écrivait en "voi", or la marque est en "Lei" → décision Hatem : "Lei" partout (réseaux compris), règle "Lei singulier obligatoire" ajoutée au prompt.
- Réflexe métier : un livrable IA = prompt (le savoir-faire) + automatisation (le moteur). Service facturable à un cabinet.

### Site AutomaIA déployé en ligne sur Vercel
- Le site Next.js (agence-ia/site/automaia-web) est désormais déployé sur Vercel et public. Le formulaire de contact en production crée bien une fiche dans le CRM Airtable (testé : lead réel arrivé dans la table Prospects). Chaîne d'acquisition complète et publique : visiteur → formulaire site en ligne → webhook n8n → CRM Airtable.
- Décision git : branche claude/magical-mendel-enfcp3 fusionnée dans main (fast-forward, 85 commits, autorisé explicitement par Hatem) car le site n'existait que sur la branche et Vercel lit la branche par défaut. main est maintenant le code de référence ; Vercel déploie main. Suite du dev sur branche, à refusionner dans main pour publier.
- Config Vercel : Root Directory = agence-ia/site/automaia-web (monorepo), variable NEXT_PUBLIC_N8N_WEBHOOK_URL reportée dans les env vars Vercel (sinon le formulaire en prod enverrait dans le vide).
- Build vérifié OK avant déploiement (next build, 6 pages statiques).

### Jour 16 (Airtable comme CRM) : FAIT ET BRANCHÉ DE BOUT EN BOUT
- Flux complet fonctionnel : formulaire du site AutomaIA → webhook n8n (nouveau workflow "Sito - Nuovo Lead", path /webhook/nuovo-lead) → node Airtable Create → ligne dans la table Prospects. CRM qui se remplit tout seul, validé par soumissions réelles.
- Base CRM créée : `AutomaIA - CRM Prospect` (app2s4sQDVTe8ESGZ), table `Prospects` (tbl2D8SoJfW5RbbX9), 9 champs niche libéraux italiens. 2 fiches d'exemple conservées (Studio Bianchi, Studio Verdi), tests nettoyés.
- Côté site : variable NEXT_PUBLIC_N8N_WEBHOOK_URL configurée dans .env.local (automaia-web) pointant vers le webhook n8n. (Site désormais déployé sur Vercel, voir entrée dédiée plus haut, variable reportée sur Vercel.)
- Débogage de bout en bout (vrai entraînement) : 1) variable NEXT_PUBLIC lue au démarrage uniquement (redémarrer npm run dev) ; 2) piège Notepad .env.local.txt ; 3) workflow actif = exécutions visibles dans l'onglet Executions, pas sur le canvas ; 4) token Airtable 403 résolu en RÉGÉNÉRANT le token (la credential n8n gardait une ancienne valeur ; modifier les permissions ne suffit pas, il faut resynchroniser la valeur dans n8n). Scopes requis : data.records:write (+ read/schema par sécurité) + accès explicite à la base.
- Doc : agence-ia/automations/jour16-crm-airtable/README.md.

### Jour 15 (première API IA) : FAIT ET EXÉCUTÉ
- Script resume.py exécuté avec succès sur la machine de Hatem : premier appel réel à l'API Claude depuis son propre code Python, résumé du texte italien obtenu en 2 phrases. Jalon du Jour 15 atteint.
- Débogage mené en autonomie guidée sur sa machine Windows : module dotenv manquant (résolu avec `python -m pip install`, piège des deux Python), puis 401 invalid x-api-key causé par le placeholder non remplacé dans .env (longueur lue = 24 = faux texte). Vérification faite qu'aucune variable système n'écrasait le .env, puis recréation propre du .env avec Set-Content. Réflexe de débogage acquis (lire la valeur réellement chargée, isoler la cause).
- Compétence clé acquise : clé API + .env + structure client/messages/réponse/tokens. Brique fondatrice de toutes les futures offres IA.

### Jour 15 (première API IA) : script écrit et câblé, reste l'exécution avec clé perso
- Script resume.py écrit et commenté dans agence-ia/automations/jour15-api-claude/ : appel API Claude (modèle Haiku) pour résumer un texte italien, avec affichage des tokens (input/output) pour visualiser la facturation.
- Pédagogie : les 5 briques commentées dans le code (clé API, fichier .env, client, messages, tokens). README mis à jour avec les étapes de lancement et un rappel des 5 briques + pistes pour aller plus loin.
- Robustesse : si la clé manque, le script s'arrête proprement avec un message d'aide (testé en session, code de sortie 1, pas de crash).
- SDK anthropic 0.111.0 + python-dotenv validés (import OK). .env.example (modèle sans secret) ajouté ; exception ajoutée dans agence-ia/.gitignore pour versionner les .env.example tout en continuant de bloquer les vrais .env.
- BLOCAGE RESTANT (inchangé) : pas de clé API Anthropic dans l'environnement web et je ne peux pas en créer une. Geste final côté Hatem sur sa machine : créer la clé sur console.anthropic.com, `cp .env.example .env`, y coller la clé, `pip install -r requirements.txt`, `python3 resume.py`. ~2 min.
- ALERTE SÉCURITÉ repérée : le fichier .env à la RACINE du repo (token JWT n8n) était TRACKÉ par git (pas couvert par agence-ia/.gitignore qui ne protège que le sous-dossier).
- CORRECTION FAITE : .env racine retiré du suivi git (git rm --cached, fichier local conservé) + création d'un .gitignore racine qui bloque .env / *.env / clés / secrets et garde l'exception .env.example.
- ACTION RESTANTE CÔTÉ HATEM (importante) : le token reste présent dans l'HISTORIQUE git des commits précédents (toujours sur GitHub). Le retrait du suivi ne purge pas l'historique. Remède : RÉGÉNÉRER le token dans n8n (révoquer l'ancien, créer un nouveau). Une fois l'ancien révoqué, sa présence dans l'historique est sans danger. Option 1 retenue (régénérer, sans réécrire l'historique) plutôt que filter-repo/BFG.
- RÉSOLU le 24/06 : clé n8n identifiée (clé API publique de l'instance n8n.freelancerai.eu, utilisée uniquement par l'outil n8nac pour synchroniser les workflows-as-code de workflows/n8n-as-code/). Aucun code applicatif ne l'utilisait (le site utilise une URL de webhook, pas la clé). Ancienne clé "Jarvis-N8N" déjà expirée et supprimée. Nouvelle clé créée dans n8n, validée par appel direct à l'API n8n, puis branchée à n8nac via `--api-key-stdin` (en local, hors git). `npx n8nac list` fonctionne à nouveau. Volet sécurité clos.
- Débogage notable : 401 répétés causés par le presse-papier (copier la commande écrasait la clé à coller) ; résolu en passant la clé par une variable PowerShell ($k) puis en la pipant vers n8nac. Réflexe d'hygiène rappelé : ne jamais afficher/screenshoter une clé.

### Jour 26 (closing + objections) : doc FAIT, entraînement à faire
- Doc "5 objections → réponses" créé dans agence-ia/offres/obiezioni-risposte.md, en italien (Lei), aligné brand_voice.md et grille-tarifaire.md.
- Couvre les 5 objections clés : prix, temps, "l'IA me dépasse", "pas pour mon secteur", confiance/données. Chaque réponse en méthode 3 temps (accueillir, recadrer, rendre la main), + variante "pas maintenant" + rappels closing (réponse courte puis silence, ne jamais baisser le prix mais réduire le périmètre, honnêteté > enthousiasme).
- Reste l'entraînement (jeu de rôle prospect) pour cocher le Jour 26 à 100%.

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
