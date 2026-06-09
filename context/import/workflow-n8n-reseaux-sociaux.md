# Workflow n8n : Publication automatique sur les réseaux sociaux

> État détaillé du projet. Fichier de référence pour reprendre le travail d'une session à l'autre.
> Dernière mise à jour : 2026-06-09

---

## Objectif

Prendre un lien d'article depuis Google Sheets, le résumer via Claude, générer une image, et publier automatiquement sur Facebook, Instagram et TikTok.

---

## Architecture du workflow

```
Google Sheets Trigger
  → HTTP Request (scrape)
  → HTML Extract
  → Claude (Message a model)
  → Code (JSON Parse)
  → HTTP Request (Image gpt-image-1)
  → [en parallèle] Facebook / Instagram / TikTok
```

---

## État de chaque nœud

### 1. Google Sheets Trigger — FONCTIONNEL
- Événement : Row Added
- Colonne surveillée : URL

### 2. HTTP Request (Scraping) — FONCTIONNEL
- Method : GET
- URL : `{{ $json.URL }}`
- Response Format : Text
- Le HTML brut est stocké dans le champ `data`

### 3. HTML Extract — FONCTIONNEL
- Operation : Extract HTML Content
- Source Data : JSON
- JSON Property : `data` (nom brut, sans accolades)
- CSS Selector : `article, .post-content, .entry-content, p` (à adapter selon le site)
- Return Value : Text

### 4. Claude (Message a model) — FONCTIONNEL
- Mode : complete: chat
- Le prompt génère un JSON avec 5 clés : resume, facebook, instagram, tiktok, image_prompt
- La réponse est dans `$json.content[0].text`

### 5. Code (JSON Parse) — FONCTIONNEL
- Language : JavaScript
```javascript
const response = $input.item.json.content[0].text;
let parsed;
try {
  parsed = JSON.parse(response);
} catch (e) {
  const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
  parsed = JSON.parse(cleaned);
}
return [{ json: parsed }];
```
- Output : `{ resume, facebook, instagram, tiktok, image_prompt }`

### 6. HTTP Request (Image gpt-image-1) — FONCTIONNEL
- Method : POST
- URL : `https://api.openai.com/v1/images/generations`
- Auth : Header Auth avec `Authorization: Bearer <CLE_OPENAI>`
- Body JSON :
```json
{
  "model": "gpt-image-1",
  "prompt": "{{ $json.image_prompt }}",
  "n": 1,
  "size": "1024x1024"
}
```
- L'image est retournée en base64 dans `$json.data[0].b64_json`
- Note : `gpt-image-1` ne renvoie QUE du base64 (pas d'URL).

### 7. Facebook (HTTP Request) — FONCTIONNEL, token permanent obtenu (page Digital Solutions)
- Page cible : **Digital Solutions** — ID : `1187679151092484`
- Method : POST
- URL : `https://graph.facebook.com/v25.0/1187679151092484/feed`
- Auth : token de page **permanent**. Recommandé = credential n8n **Header Auth** (`Authorization` = `Bearer <PAGE_TOKEN>`) plutôt que le token en clair dans l'URL
- Body Content Type : Form Urlencoded
- Body Field : `message` = `{{ $('Code in JavaScript').item.json.facebook }}`
- Test de publication validé via Graph API Explorer (`POST /{page-id}/feed?message=...`)

**Pages Facebook accessibles (compte Hatem) :**
- Digital Solutions — ID : `1187679151092484` (PAGE CIBLE, détenue par le Business Manager)
- AI Freelancer — ID : `876702972204380`
- Vappro — ID : `101613472805117` (seule page remontée par `/me/accounts`)
- VAPRO — ID : `220179372620386`

**Token Facebook permanent — RÉSOLU (sans App Review) :**
- Confirmé : pas besoin d'App Review pour publier sur ses propres pages (l'accès standard suffit car Hatem est admin de l'app ET de la page)
- Piège rencontré : `GET /me/accounts` ne remontait QUE Vappro. Digital Solutions, détenue par un Business Manager, n'apparaissait pas dans la liste.
- Solution qui a marché : interroger directement la page → `GET /1187679151092484?fields=name,access_token` avec un user token → renvoie le token de page
- Vérifié dans le debugger : Type **Page**, Expiration **Jamais**, `pages_manage_posts` présent, Valide = Vrai
- Note : "L'accès aux données expire dans ~3 mois" (data access expiration). N'empêche PAS la publication. Si un jour ça coince, refaire l'extraction du token (5 min).
- Procédure pour régénérer (ou pour une autre page) : générer un user token (permissions `pages_*`) → l'étendre en longue durée (Access Token Tool → Extend Access Token) → `GET /{page-id}?fields=access_token` → vérifier "Jamais" dans le debugger

### 8. Instagram — NON CONFIGURÉ
- Permissions déjà accordées : `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`
- Bloqueur : le compte Instagram n'est pas encore connecté à une page Facebook en tant que compte Business
- Erreur "something went wrong try later" en connectant depuis l'app Instagram
- Alternative : connecter depuis les paramètres de la page Facebook ou Meta Business Suite
- L'API Instagram nécessite 2 appels :
  1. POST `/{ig-user-id}/media` (créer le container avec image_url + caption)
  2. POST `/{ig-user-id}/media_publish` (publier avec creation_id)
- L'image gpt-image-1 est en base64 : il faut l'héberger (ex : Imgur) pour obtenir l'URL publique exigée par l'API Instagram

### 9. TikTok — NON CONFIGURÉ
- Nécessite un compte développeur TikTok séparé (developers.tiktok.com)
- API : Content Posting API — `https://open.tiktokapis.com/v2/post/publish/video/init/`
- TikTok exige une vraie vidéo (pas d'image statique)
- Piste : convertir image + texte en vidéo courte via Creatomate API ou json2video

---

## Informations Meta / Facebook

**App Meta**
- Nom : "Système IA Création de Contenu"
- ID : `1049561134074981`
- Status : Publiée (mode Live)
- Produits installés : Facebook Login for Business (les permissions/assets passent par des Configurations)

**Business Manager**
- Nom : Digital Solutions
- Utilisateur système : `n8n-automation` (ID : 61590737788182, accès Admin) — piste abandonnée au profit du token de page via le compte perso
- La page Digital Solutions est reconnectée à l'app (autorisation FLB refaite en cochant la page)

**Permissions accordées (état actuel)**
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `instagram_basic`
- `instagram_content_publish`
- `instagram_manage_comments`

---

## Prompt Claude utilisé

```
Tu es un expert en marketing digital.

Voici le texte d'un article : {{ $json.content }}

Génère uniquement un objet JSON valide avec ces 5 clés :
- "resume": résumé de 3 phrases
- "facebook": post 150 mots, 3 hashtags
- "instagram": légende 80 mots, 10 hashtags
- "tiktok": script 30s [Hook 3s][Corps 20s][CTA 7s]
- "image_prompt": description image en anglais

Réponds UNIQUEMENT en JSON, sans markdown, sans backticks.
```

---

## Prochaines étapes

1. ~~Token FB permanent~~ — **FAIT** (token permanent obtenu pour Digital Solutions, voir nœud 7)
2. **Brancher le token dans n8n** : nœud Facebook → ID `1187679151092484`, token dans une credential Header Auth. Tester la publication d'un vrai article sur le workflow complet (texte seul d'abord).
3. **Image sur Facebook** : ajouter le visuel via `/{page-id}/photos`.
4. **Image hosting** : héberger le base64 → URL publique (Imgur API, gratuit). Prérequis pour Instagram.
5. **Instagram** : connecter le compte Business à une page FB, puis configurer les 2 nœuds HTTP Request (media + media_publish).
6. **TikTok** : créer un compte développeur, obtenir les credentials, gérer la génération vidéo.

**Reste à faire, ordre conseillé** : brancher token n8n + tester → image Facebook → Imgur → Instagram → TikTok.

---

## Environnement technique

- n8n : v2.4.4 (Self Hosted)
- Graph API : v25.0
- OpenAI : `gpt-image-1` pour les images
- Claude : nœud natif n8n "Message a model"

> Note : DALL-E 3 existe toujours dans l'API OpenAI et peut renvoyer une URL directe (`response_format: "url"`), alternative possible à l'hébergement Imgur pour Instagram (mais URL temporaire ~1h).
