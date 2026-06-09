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

### 7. Facebook (HTTP Request) — FONCTIONNEL avec token temporaire
- Method : POST
- URL : `https://graph.facebook.com/v25.0/876702972204380/feed?access_token=<TOKEN>`
- Body Content Type : Form Urlencoded
- Body Field : `message` = `{{ $json.facebook }}`
- Astuce : utiliser `{{ $('Code in JavaScript').item.json.facebook }}` si le nœud n'est pas directement connecté au Code

**Pages Facebook disponibles :**
- AI Freelancer — ID : `876702972204380` (page utilisée actuellement)
- Digital Solutions — ID : `1187679151092484` (déconnectée de l'app, à reconnecter)
- Vappro — ID : `101613472805117`

**Problème de token Facebook :**
- Les tokens de Graph API Explorer expirent en 1-2 heures
- Le token permanent via utilisateur système retourne "Application does not have permission" (error_subcode 2069007)
- L'app nécessiterait un accès avancé via App Review pour `pages_manage_posts` (demande non soumise)
- Solution temporaire : token Graph API Explorer rafraîchi manuellement
- Piste à creuser (priorité) : pour publier sur SES PROPRES pages, l'App Review n'est probablement pas nécessaire. Le vrai blocage = assignation de la page à l'utilisateur système. Voie rapide = token utilisateur longue durée (60j) puis `GET /me/accounts` pour obtenir un token de page qui n'expire jamais.

### 8. Instagram — NON CONFIGURÉ
- Permissions ajoutées dans Graph API Explorer : `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`
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
- Produits installés : Facebook Login for Business

**Business Manager**
- Nom : Digital Solutions
- Utilisateur système : `n8n-automation` (ID : 61590737788182, accès Admin)
- Page Digital Solutions assignée dans Business Manager mais pas dans l'utilisateur système (le type de ressource "Pages" n'apparaissait pas)

**Permissions Graph API Explorer (état actuel)**
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

1. **Token FB permanent** : creuser la piste "pas d'App Review pour ses propres pages" (assignation de la page à l'utilisateur système, ou token de page longue durée via `/me/accounts`).
2. **Image hosting** : héberger le base64 → URL publique (Imgur API, gratuit). Débloque Instagram et permet aussi de poster l'image sur Facebook via `/{page-id}/photos`.
3. **Instagram** : connecter le compte Business à une page FB, puis configurer les 2 nœuds HTTP Request (media + media_publish).
4. **TikTok** : créer un compte développeur, obtenir les credentials, gérer la génération vidéo.
5. **Reconnecter Digital Solutions** : résoudre le bug de déconnexion de la page de l'app.

**Ordre conseillé** : Token FB permanent → Imgur → Instagram → TikTok.

---

## Environnement technique

- n8n : v2.4.4 (Self Hosted)
- Graph API : v25.0
- OpenAI : `gpt-image-1` pour les images
- Claude : nœud natif n8n "Message a model"

> Note : DALL-E 3 existe toujours dans l'API OpenAI et peut renvoyer une URL directe (`response_format: "url"`), alternative possible à l'hébergement Imgur pour Instagram (mais URL temporaire ~1h).
