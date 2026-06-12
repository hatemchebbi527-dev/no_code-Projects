# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-12

### Instagram fonctionnel : le workflow publie sur Facebook ET Instagram
- Le workflow publie maintenant automatiquement sur Facebook ET Instagram (image + légende + hashtags) à partir d'un simple lien d'article
- Compte Instagram Business `@digitalsolutions.it` créé et lié à la page Digital Solutions (ID Instagram `17841416594987462`)
- Liaison faite via Business Settings, DEPUIS la page (pas depuis le compte IG). Ensuite `GET /{page-id}?fields=instagram_business_account` remonte bien l'id
- Publication Instagram en 2 nœuds : IG Créer média (POST `/media`) puis IG Publier (POST `/media_publish`)
- Piège majeur résolu : le caption partait vide en body Form-Urlencoded (à cause des emojis, accents et `#`). Solution = passer `image_url` et `caption` en **Query Parameters** (n8n les encode correctement)
- Autres pièges traités : token de page à recoller proprement (Bad signature #190), bien étendre le user token avant d'extraire le token de page (sinon 1h au lieu de permanent), références `$json` vs `$('Nom').first()`, et toujours tester en exécution complète (pas "Execute step")
- Reste à faire : TikTok uniquement (compte dev + génération vidéo)
- Détails techniques complets dans `context/import/workflow-n8n-reseaux-sociaux.md`

---

## 2026-06-10

### Workflow n8n complet et fonctionnel (publication Facebook avec image)
- Le workflow tourne de bout en bout : article → scraping → Claude → image → hébergement → publication Facebook AVEC image sur Digital Solutions (validé en vrai)
- Scraping : adoption de Jina Reader (`r.jina.ai`) pour contourner le Cloudflare des sites protégés. Nœud HTML Extract supprimé (Jina renvoie du markdown)
- Claude : modèle `claude-sonnet-4-6`, prompt renforcé (JSON strict, pas de retours à la ligne), maxTokens 2000, et Code de parsing robuste pour fiabiliser le JSON
- Image : nœud gpt-image-1 (body construit via les champs n8n)
- Hébergement image : bascule d'Imgur vers ImgBB (le formulaire addclient d'Imgur bugue), sortie `data.url`
- Facebook : passage de `/feed` à `/photos` (texte = `caption`), token de PAGE en Query Auth. Pièges résolus : token page vs user (#200), token mal transmis (#190)
- Reste à faire : Instagram (l'URL ImgBB servira pour `image_url`), puis TikTok
- Détails techniques complets dans `context/import/workflow-n8n-reseaux-sociaux.md`

### Token Facebook permanent résolu (page Digital Solutions)
- Bascule de la page cible : AI Freelancer vers Digital Solutions (`1187679151092484`)
- Obtention d'un token de page PERMANENT (Expiration "Jamais"), sans App Review : l'accès standard suffit pour publier sur ses propres pages quand on est admin de l'app et de la page
- Piège résolu : `GET /me/accounts` ne remontait que Vappro (Digital Solutions est détenue par un Business Manager). Solution = interroger directement `GET /{page-id}?fields=access_token`
- Publication de test validée sur Digital Solutions via Graph API Explorer, permission `pages_manage_posts` confirmée
- Reste à faire : brancher le token dans n8n (credential Header Auth), puis image Facebook, Imgur, Instagram, TikTok
- Détails techniques dans `context/import/workflow-n8n-reseaux-sociaux.md`

### Projet workflow n8n : publication automatique sur les réseaux sociaux
- Nouveau projet principal du moment : pipeline n8n qui prend un lien d'article (Google Sheets), le scrape, le résume via Claude, génère une image (gpt-image-1) et publie sur Facebook, Instagram et TikTok
- État : pipeline fonctionnel de bout en bout jusqu'à la publication Facebook (avec token temporaire). Instagram et TikTok pas encore configurés
- Blocages identifiés : token Facebook permanent (assignation page / utilisateur système), hébergement de l'image base64 pour Instagram, connexion compte Instagram Business, génération vidéo pour TikTok
- Plan d'action validé : Token FB permanent → hébergement image (Imgur) → Instagram → TikTok
- État technique complet documenté dans `context/import/workflow-n8n-reseaux-sociaux.md`

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
