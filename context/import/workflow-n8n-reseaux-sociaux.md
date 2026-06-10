# Workflow n8n : Publication automatique sur les réseaux sociaux

> État détaillé du projet. Fichier de référence pour reprendre le travail d'une session à l'autre.
> Dernière mise à jour : 2026-06-10

---

## Objectif

Prendre un lien d'article depuis Google Sheets, le résumer via Claude, générer une image, et publier automatiquement sur Facebook, Instagram et TikTok.

---

## Architecture actuelle du workflow

```
Google Sheets Trigger
  → Scraping de l'article (HTTP, via Jina Reader)
  → Message a model (Claude, nœud Anthropic natif)
  → Code in JavaScript (parse JSON)
  → Générer l'image (HTTP, gpt-image-1)
  → Upload ImgBB (HTTP, héberge l'image → URL publique)
  → Facebook (HTTP, POST /photos)
```

Chaîne LINÉAIRE pour l'instant. Instagram et TikTok seront ajoutés en parallèle après Upload ImgBB (ils réutiliseront la même URL d'image).

Note : le nœud HTML Extract du tout début a été SUPPRIMÉ (Jina renvoie déjà du markdown propre, pas du HTML à parser).

---

## État de chaque nœud

### 1. Google Sheets Trigger — FONCTIONNEL
- Document : "Système IA réseaux Sociaux" (ID `1HplJPDzdgulmxrrlMlTRFaeAJlc4c76Pv6dPyyYLtuI`), Feuille 1
- Événement : Row Added, poll toutes les minutes
- **Colonne surveillée : `Nouveaux Liens`** (contient l'URL de l'article)

### 2. Scraping de l'article (HTTP Request) — FONCTIONNEL
- Method : GET
- URL : `https://r.jina.ai/{{ $json['Nouveaux Liens'] }}`
- Response Format : Text
- **Jina Reader** rend le JavaScript côté serveur et renvoie le markdown propre dans le champ `data`. Contourne les protections type Cloudflare (testé OK sur Sortlist).

### 3. Message a model (Anthropic) — FONCTIONNEL
- Nœud natif n8n `@n8n/n8n-nodes-langchain.anthropic`
- Modèle : `claude-sonnet-4-6`
- Champ source de l'article : `{{ $json.data }}`
- Option `maxTokens` : 2000 (évite la troncature du JSON)
- Prompt renforcé (voir plus bas) : JSON strict, pas de retours à la ligne dans les valeurs

### 4. Code in JavaScript — FONCTIONNEL
- Parsing robuste (retire les backticks, isole du premier `{` au dernier `}`) :
```javascript
let text = $input.item.json.content[0].text.trim();
text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
return [{ json: JSON.parse(text) }];
```
- Output : `{ resume, facebook, instagram, tiktok, image_prompt }`

### 5. Générer l'image (HTTP Request, gpt-image-1) — FONCTIONNEL
- Method : POST
- URL : `https://api.openai.com/v1/images/generations`
- Auth : Header Auth, `Authorization` = `Bearer <CLE_OPENAI>`
- Body : Content Type JSON, "Using Fields Below" (laisse n8n construire le JSON, pas de souci d'échappement) :
  - `model` = `gpt-image-1`
  - `prompt` = `{{ $json.image_prompt }}`
  - `size` = `1024x1024`
- Sortie : image en base64 dans `data[0].b64_json`

### 6. Upload ImgBB (HTTP Request) — FONCTIONNEL
- Method : POST
- URL : `https://api.imgbb.com/1/upload?key=<CLE_IMGBB>`
- Auth : None (la clé est dans l'URL)
- Body : Form-Urlencoded, paramètre `image` = `{{ $json.data[0].b64_json }}`
- Sortie : URL publique dans `data.url` (type `https://i.ibb.co/xxxx/image.png`)
- Choix d'ImgBB plutôt qu'Imgur : le formulaire `api.imgur.com/oauth2/addclient` d'Imgur redirige en boucle vers l'accueil (bug connu). ImgBB = clé API en un clic.

### 7. Facebook (HTTP Request) — FONCTIONNEL, post avec image validé
- Page cible : **Digital Solutions** — ID `1187679151092484`
- Method : POST
- URL : `https://graph.facebook.com/v25.0/1187679151092484/photos`
- Auth : **Query Auth** (credential "Facebook Digital Solutions"), paramètre `access_token` = le **token de page permanent**
- Body : Form-Urlencoded
  - `url` = `{{ $json.data.url }}` (URL ImgBB de l'image)
  - `caption` = `{{ $('Code in JavaScript').item.json.facebook }}`
- Note : sur `/photos`, le texte s'appelle `caption` (PAS `message` comme sur `/feed`)
- Publication avec image testée et validée sur Digital Solutions

### 8. Instagram — NON CONFIGURÉ (prochaine étape)
- Permissions déjà accordées : `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`
- Bloqueur : le compte Instagram doit être connecté à une page Facebook en tant que compte Business
- L'API Instagram nécessite 2 appels :
  1. POST `/{ig-user-id}/media` (créer le container avec `image_url` + `caption`)
  2. POST `/{ig-user-id}/media_publish` (publier avec `creation_id`)
- Bonne nouvelle : l'URL ImgBB du nœud Upload est exactement ce qu'attend le champ `image_url`. Le gros prérequis (hébergement) est donc déjà résolu.

### 9. TikTok — NON CONFIGURÉ
- Nécessite un compte développeur TikTok séparé (developers.tiktok.com)
- API : Content Posting API — `https://open.tiktokapis.com/v2/post/publish/video/init/`
- TikTok exige une vraie vidéo (pas d'image statique)
- Piste : convertir image + texte en vidéo courte via Creatomate API ou json2video

---

## Token Facebook permanent (rappel, RÉSOLU)

- Page cible : Digital Solutions `1187679151092484`, token de page **permanent** (Expiration "Jamais"), sans App Review
- Méthode : générer un user token avec les permissions `pages_*` → l'étendre en longue durée (Access Token Tool → Extend) → `GET /{page-id}?fields=access_token` → vérifier "Jamais" dans le debugger
- Piège : `GET /me/accounts` ne liste PAS les pages détenues par un Business Manager (seule Vappro remontait). D'où l'appel direct sur l'ID de la page.
- Piège : bien utiliser le token de **PAGE** (réponse du GET), pas le token **UTILISATEUR** (champ en haut à droite de Graph API Explorer). Sinon erreur `#200`. Le debugger affiche "Type: Page" pour le bon.

---

## Pièges rencontrés et résolus (mémo)

- **Cloudflare** bloque le scraping HTTP simple (403 "Just a moment") → Jina Reader (`r.jina.ai/`) contourne.
- **HTML Extract vide** → normal avec Jina (markdown, pas de HTML). Nœud supprimé.
- **JSON Claude invalide** ("Unterminated string") → retours à la ligne dans les valeurs + troncature. Réglé par prompt strict + maxTokens 2000 + Code robuste.
- **Facebook "Cannot parse access token" (190)** → token vide/mal transmis ou `access_token=` résiduel dans l'URL. Réglé par Query Auth propre.
- **Facebook "#200 requires page token"** → on utilisait le token user au lieu du token de page.
- **Imgur addclient** redirige en boucle → basculé sur ImgBB.

---

## Pages Facebook accessibles (compte Hatem)

- Digital Solutions — ID `1187679151092484` (PAGE CIBLE, dans un Business Manager)
- AI Freelancer — ID `876702972204380`
- Vappro — ID `101613472805117` (seule remontée par `/me/accounts`)
- VAPRO — ID `220179372620386`

## Informations Meta / Facebook

- App : "Système IA Création de Contenu", ID `1049561134074981`, mode Live, produit "Facebook Login for Business"
- Business Manager : "Digital Solutions"
- Permissions accordées : `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`

---

## Prompt Claude utilisé (version renforcée)

```
Tu es un expert en marketing digital.

Voici le texte d'un article : {{ $json.data }}

Génère un objet JSON valide avec EXACTEMENT ces 5 clés :
- "resume": résumé de 3 phrases
- "facebook": post de 150 mots avec 3 hashtags
- "instagram": légende de 80 mots avec 10 hashtags
- "tiktok": script de 30s au format [Hook 3s] [Corps 20s] [CTA 7s], SUR UNE SEULE LIGNE
- "image_prompt": description de l'image, en anglais

Règles STRICTES :
- Réponds UNIQUEMENT avec le JSON, rien avant, rien après
- Pas de markdown, pas de backticks
- AUCUN retour à la ligne à l'intérieur des valeurs. Pour séparer, utilise " | "
- Échappe correctement les guillemets presents dans les textes
```

---

## Prochaines étapes

1. ~~Token FB permanent~~ — FAIT
2. ~~Image Facebook~~ — FAIT (gpt-image-1 → ImgBB → /photos, post avec image validé)
3. **Instagram** : connecter le compte Business à une page FB, puis 2 nœuds HTTP (media + media_publish), en réutilisant l'URL ImgBB pour `image_url`
4. **TikTok** : compte développeur + génération vidéo (Creatomate / json2video)

**Reste à faire, ordre conseillé** : Instagram → TikTok.

---

## Environnement technique

- n8n : v2.4.4 (Self Hosted)
- Graph API : v25.0
- OpenAI : `gpt-image-1` (ne renvoie que du base64, d'où l'hébergement ImgBB)
- Hébergement image : ImgBB (clé API en query)
- Scraping : Jina Reader (`r.jina.ai`)
- Claude : nœud natif n8n "Message a model", modèle `claude-sonnet-4-6`
