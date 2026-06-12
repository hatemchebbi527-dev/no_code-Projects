# Workflow n8n : Publication automatique sur les réseaux sociaux

> État détaillé du projet. Fichier de référence pour reprendre le travail d'une session à l'autre.
> Dernière mise à jour : 2026-06-12

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
  → [Facebook : HTTP POST /photos]
  → [IG Créer média : HTTP POST /media] → [IG Publier : HTTP POST /media_publish]
```

Facebook et Instagram tournent en parallèle après Upload ImgBB. **TikTok reste à ajouter.**

---

## État de chaque nœud

### 1. Google Sheets Trigger — FONCTIONNEL
- Document : "Système IA réseaux Sociaux" (ID `1HplJPDzdgulmxrrlMlTRFaeAJlc4c76Pv6dPyyYLtuI`), Feuille 1
- Événement : Row Added, poll toutes les minutes
- Colonne surveillée : `Nouveaux Liens` (contient l'URL de l'article)

### 2. Scraping de l'article (HTTP Request) — FONCTIONNEL
- GET `https://r.jina.ai/{{ $json['Nouveaux Liens'] }}`, Response Format Text
- Jina Reader rend le JS et renvoie le markdown propre dans `data`. Contourne Cloudflare.

### 3. Message a model (Anthropic) — FONCTIONNEL
- Modèle `claude-sonnet-4-6`, champ source `{{ $json.data }}`, maxTokens 2000
- Prompt renforcé (JSON strict, valeurs sur une ligne) — voir plus bas

### 4. Code in JavaScript — FONCTIONNEL
- Parsing robuste (retire backticks, isole du premier `{` au dernier `}`)
- Output : `{ resume, facebook, instagram, tiktok, image_prompt }`

### 5. Générer l'image (HTTP, gpt-image-1) — FONCTIONNEL
- POST `https://api.openai.com/v1/images/generations`, Header Auth `Bearer <CLE_OPENAI>`
- Body JSON via Fields : `model` = gpt-image-1, `prompt` = `{{ $json.image_prompt }}`, `size` = 1024x1024
- Sortie : base64 dans `data[0].b64_json`

### 6. Upload ImgBB (HTTP) — FONCTIONNEL
- POST `https://api.imgbb.com/1/upload?key=<CLE_IMGBB>`, Auth None
- Body Form-Urlencoded : `image` = `{{ $json.data[0].b64_json }}`
- Sortie : URL publique dans `data.url`

### 7. Facebook (HTTP) — FONCTIONNEL, post avec image
- Page Digital Solutions, ID `1187679151092484`
- POST `https://graph.facebook.com/v25.0/1187679151092484/photos`
- Auth : Query Auth (credential "Facebook Digital Solutions" = token de page permanent)
- Body Form-Urlencoded : `url` = `{{ $json.data.url }}`, `caption` = `{{ $('Code in JavaScript').first().json.facebook }}`
- Note : sur `/photos`, le texte s'appelle `caption` (pas `message`)

### 8. Instagram — FONCTIONNEL (2 nœuds)
- **Compte Instagram Business `@digitalsolutions.it`, ID Instagram : `17841416594987462`**, lié à la page Digital Solutions
- Token : le MÊME token de page que Facebook (credential Query Auth partagée). Il porte `instagram_content_publish`.

**8a. IG Créer média (crée le container)**
- POST `https://graph.facebook.com/v25.0/17841416594987462/media`
- Auth : Query Auth (credential "Facebook Digital Solutions")
- **Send Query Parameters : ON** (PAS le body, voir piège ci-dessous) :
  - `image_url` = `{{ $json.data.url }}`
  - `caption` = `{{ $('Code in JavaScript').first().json.instagram }}`
- Send Body : OFF
- Sortie : `id` = le `creation_id`

**8b. IG Publier (publie le container)**
- POST `https://graph.facebook.com/v25.0/17841416594987462/media_publish`
- Auth : Query Auth (même credential)
- Paramètre `creation_id` = `{{ $json.id }}`
- Sortie : `id` du post publié
- Si erreur "media not ready" : insérer un nœud Wait de 5 s entre 8a et 8b

### 9. TikTok — NON CONFIGURÉ (prochaine et dernière étape)
- Nécessite un compte développeur TikTok séparé (developers.tiktok.com)
- API : Content Posting API — `https://open.tiktokapis.com/v2/post/publish/video/init/`
- TikTok exige une vraie vidéo (pas d'image statique)
- Piste : convertir image + texte (champ `tiktok` du Code) en vidéo courte via Creatomate ou json2video

---

## Pièges rencontrés et résolus (mémo)

- **Cloudflare** bloque le scraping HTTP simple → Jina Reader (`r.jina.ai/`) contourne.
- **HTML Extract vide** → normal avec Jina (markdown). Nœud supprimé.
- **JSON Claude invalide** → prompt strict + maxTokens 2000 + Code robuste.
- **Imgur addclient** redirige en boucle → basculé sur ImgBB.
- **Token Facebook permanent** : générer user token → l'ÉTENDRE en longue durée (Access Token Tool → Extend) → `GET /{page-id}?fields=access_token` → vérifier "Expire : Jamais" dans le debugger. Si on saute l'extension, le token de page ne dure qu'1h.
- **FB "Bad signature" (#190)** → token mal recollé dans la credential (espace, `Bearer` en trop, ou troncature). Recoller un token de page frais et propre.
- **FB "#200 requires page token"** → on utilisait le token user au lieu du token de page.
- **Liaison Instagram** : `instagram_business_account` reste absent tant que le compte IG n'est pas lié à la PAGE. La liaison se fait DEPUIS la page (Business Settings → Comptes → Pages → Digital Solutions, ou la modale "Ajout de ce profil Instagram"), PAS depuis le compte IG (son "Connecter les éléments" ne propose que les comptes publicitaires).
- **Caption Instagram vide** → en body Form-Urlencoded, n8n avale les caractères spéciaux du caption (emojis, accents, `#`). SOLUTION : passer `image_url` et `caption` en **Query Parameters** (n8n les encode proprement). Même logique pour `creation_id`.
- **Références n8n** : `{{ $json.x }}` lit le nœud juste avant (fiable) ; `{{ $('Nom').first().json.x }}` va chercher un nœud lointain (utiliser `.first()`, pas `.item`, pour éviter les soucis d'appariement). Et toujours tester via "Test workflow" (exécution complète), pas "Execute step".

---

## Pages Facebook accessibles (compte Hatem)

- Digital Solutions — ID `1187679151092484` (PAGE CIBLE, dans un Business Manager)
- AI Freelancer — ID `876702972204380`
- Vappro — ID `101613472805117`
- VAPRO — ID `220179372620386`

## Informations Meta / Facebook

- App : "Système IA Création de Contenu", ID `1049561134074981`, mode Live, produit "Facebook Login for Business"
- Business Manager : "Digital Solutions"
- Compte Instagram : `@digitalsolutions.it`, ID `17841416594987462`
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
2. ~~Image Facebook~~ — FAIT
3. ~~Instagram~~ — FAIT (image + légende + hashtags publiés)
4. **TikTok** : compte développeur + génération vidéo (Creatomate / json2video) à partir du champ `tiktok` et de l'image

**Reste à faire : TikTok uniquement.**

---

## Environnement technique

- n8n : v2.4.4 (Self Hosted)
- Graph API : v25.0
- OpenAI : `gpt-image-1` (ne renvoie que du base64, d'où ImgBB)
- Hébergement image : ImgBB (clé API en query)
- Scraping : Jina Reader (`r.jina.ai`)
- Claude : nœud natif n8n "Message a model", modèle `claude-sonnet-4-6`
