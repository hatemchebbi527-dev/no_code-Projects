# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-23

### Assistant emails validé de bout en bout + 3 améliorations à ajouter
- Le workflow assistant emails est désormais testé et fonctionnel intégralement : Gmail Trigger → API Claude → parsing → node IF (filtrage est_client) → brouillon Gmail. Un vrai mail client part dans la branche true et génère un brouillon, les newsletters/notifications sont filtrées dans la branche false
- Débogage clé résolu : le body du node HTTP Request renvoyait `[object Object]` (JSON invalide). Solution = envelopper l'objet dans `JSON.stringify(...)` dans l'expression n8n, pour produire une vraie chaîne JSON et laisser n8n échapper proprement les sauts de ligne et guillemets du mail
- **RAPPEL : 3 améliorations importantes à ajouter au workflow (priorité confirmée par Hatem) :**
  1. **Threading** : faire apparaître le brouillon dans la bonne conversation Gmail via l'option Thread ID (`threadId` du Gmail Trigger), pour que ce soit une vraie réponse et non un mail isolé
  2. **Robustesse** : gérer le cas où Claude renvoie un JSON imparfait, pour que le workflow ne plante pas (node de sécurité / fallback sur le parsing)
  3. **Extension** : envoyer le résumé + l'urgence vers un canal externe (Telegram ou Google Sheet) pour suivre ses mails sans ouvrir Gmail

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
