# Manuvo — Marketing & tracking

Guide opérationnel pour le suivi des conversions (Meta Pixel) et la convention de liens (UTM).

---

## 1. Meta Pixel

### Ce qui est déjà branché dans le code

Le Pixel est piloté par la variable d'environnement `NEXT_PUBLIC_META_PIXEL_ID`.
Tant qu'elle n'est pas définie, le Pixel ne charge pas (zéro impact).

Événements suivis automatiquement :

| Événement | Quand | Public |
|-----------|-------|--------|
| `PageView` | chaque page (navigation incluse) | tous |
| `Lead` | une demande est publiée sur `/pubblica` | privati (demande) |
| `CompleteRegistration` | un artisan finalise son inscription | artisans (offre) |
| `Purchase` | achat de crédits | artisans — **à brancher avec Stripe Live** |

### À faire pour l'activer (5 min)

1. **Meta Events Manager** → crée un Pixel (Origine des données → Web).
2. Copie l'**ID du Pixel** (une suite de chiffres, ex. `1234567890`).
3. **Vercel** → projet → Settings → Environment Variables → **Add New** :
   - Key : `NEXT_PUBLIC_META_PIXEL_ID`
   - Value : ton ID
   - Environnements : Production (+ Preview pour tester)
   - **Ne pas** cocher Sensitive (un ID de Pixel est public).
4. Redéploie. Vérifie avec l'extension **Meta Pixel Helper** (Chrome) que `PageView` remonte.

> Remarque : l'ID de Pixel est une donnée publique, exposée au navigateur. Ce n'est pas un secret.

---

## 2. Convention UTM

Les UTM se mettent sur les **liens de tes annonces**, pas dans le code. Garde toujours la même nomenclature, sinon les stats deviennent illisibles.

Format : `https://manuvo.automa-ia.net/PAGE?utm_source=…&utm_medium=…&utm_campaign=…&utm_content=…`

| Paramètre | Rôle | Valeurs |
|-----------|------|---------|
| `utm_source` | plateforme | `facebook`, `instagram`, `tiktok`, `google`, `linkedin` |
| `utm_medium` | type | `cpc` (payant), `social` (organique), `email` |
| `utm_campaign` | campagne | `lancio_privati`, `lancio_artigiani` |
| `utm_content` | variante créa | `video1`, `carousel_idraulico`, `statica_a` |
| `utm_term` | (optionnel) mot-clé | pour Google Search |

### Où pointer selon le public

- **Privati (demande)** → page `/pubblica` (ou `/pubblica?category=idraulica` pour cibler un métier).
- **Artigiani (offre)** → page `/signup`.

### Exemples prêts à copier

Annonce Meta payante, côté privati :
```
https://manuvo.automa-ia.net/pubblica?utm_source=facebook&utm_medium=cpc&utm_campaign=lancio_privati&utm_content=video_idraulico
```

Post organique Instagram, côté artisans :
```
https://manuvo.automa-ia.net/signup?utm_source=instagram&utm_medium=social&utm_campaign=lancio_artigiani&utm_content=reel_1
```

> Meta (via `fbclid`) et Google (via `gclid` / auto-tagging) attribuent déjà les clics automatiquement. Les UTM servent surtout à **toi** pour lire tes stats de façon homogène (dans Meta/Google, et plus tard dans un outil d'analytics).

---

## 3. Reste à faire (voir BACKLOG.md)

- Brancher `Purchase` sur le flux d'achat de crédits (avec Stripe Live).
- (Optionnel) Meta Conversions API (CAPI) côté serveur pour fiabiliser le suivi malgré les bloqueurs de pub.
- Visuels d'annonces + textes d'annonces + plan de posts réseaux sociaux.
