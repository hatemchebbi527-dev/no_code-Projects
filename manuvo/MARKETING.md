# Manuvo — Marketing & tracking

Guide opérationnel pour le suivi des conversions (Meta Pixel) et la convention de liens (UTM).

> ⚠️ **Quand allumer quelle campagne, avec quel budget : voir `ROADMAP.md` (itinéraire unique).**
> Ce fichier ne traite que la mesure et les liens. Rappel de l'ordre : Google Search Privati (25 janv 2027) → Meta Privati (27 janv) → Meta Artigiani (8 févr, conditionnel) → Google Artigiani jamais. Aucun euro de pub avant le 25 janvier.

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
4. **Redéploie** (obligatoire) : `NEXT_PUBLIC_*` est injecté dans le bundle **au moment du build**.
   Ajouter la variable sans redéployer ne change rien, l'ancien build reste servi sans Pixel.

> Remarque : l'ID de Pixel est une donnée publique, exposée au navigateur. Ce n'est pas un secret.

### Vérification avec Meta Pixel Helper (Chrome)

Installe l'extension **Meta Pixel Helper**, puis parcours les 3 parcours. L'icône doit afficher ton ID de Pixel et les événements suivants :

| # | Parcours à faire | Événement attendu |
|---|------------------|-------------------|
| 1 | Ouvrir `https://manuvo.automa-ia.net`, puis cliquer vers une autre page | `PageView` (un par page, navigation interne incluse) |
| 2 | `/pubblica` → remplir la demande, vérifier le téléphone, publier | `Lead` (au message de succès) |
| 3 | `/signup` → inscrire un artisan test jusqu'à l'arrivée sur `/dashboard` | `CompleteRegistration` (une seule fois, à l'arrivée) |

Tests à faire en navigation **normale** (pas en navigation privée) et **sans bloqueur de pub**, sinon `fbevents.js` est bloqué et rien ne remonte.

Si rien n'apparaît, dans cet ordre :
1. Console du navigateur : `window.fbq` doit exister. Sinon la variable n'est pas dans le build → vérifier Vercel puis **redéployer**.
2. Vercel → Deployments → dernier déploiement → onglet Environment Variables : `NEXT_PUBLIC_META_PIXEL_ID` doit y figurer.
3. Si `Sensitive` a été coché par erreur : la variable n'est pas exposée au client. Supprime-la et recrée-la sans Sensitive.
4. Events Manager → Test des événements : les événements arrivent avec quelques minutes de décalage côté tableau de bord, Pixel Helper est immédiat.

Pour tester sur une Preview avant la production, la variable doit aussi être cochée sur l'environnement **Preview** (sinon le Pixel reste inactif sur les previews).

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
- Visuels d'annonces (les kits ne contiennent que les textes) — étape 18 de `ROADMAP.md`.
