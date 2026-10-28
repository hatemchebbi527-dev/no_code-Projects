# Manuvo — Marketing & tracking

Guide opérationnel pour le suivi des conversions (Meta Pixel) et la convention de liens (UTM).

> ⚠️ **Quand allumer quelle campagne, avec quel budget : voir `ROADMAP.md` (itinéraire unique).**
> Ce fichier ne traite que la mesure et les liens. Rappel de l'ordre : Google Search Privati (25 janv 2027) → Meta Privati (27 janv) → Meta Artigiani (8 févr, conditionnel) → Google Artigiani jamais. Aucun euro de pub avant le 25 janvier.

---

## 1. Meta Pixel

### État au 28 octobre 2026

| Élément | État |
|---------|------|
| Pixel (dataset Meta) | créé, ID `1481208763866288` |
| `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel | défini, Production + Preview, non Sensitive |
| Chargement en production | vérifié, `fbevents.js` présent dans le `<head>` |
| `PageView` | vérifié en production |
| `Lead` | **non vérifiable avant le lancement** (voir plus bas) |
| `CompleteRegistration` | **non vérifiable avant le lancement** (voir plus bas) |
| `Purchase` | non branché, attend Stripe Live |
| Vérification du domaine `automa-ia.net` | faite (TXT chez Wix) |
| Événements automatiques (détection IA de Meta) | **OFF**, à laisser sur OFF |

L'ID de Pixel est une donnée publique, exposée au navigateur. Ce n'est pas un secret.

### Ce qui est branché dans le code

Le Pixel est piloté par `NEXT_PUBLIC_META_PIXEL_ID`. Tant que la variable n'est pas définie, le Pixel ne charge pas du tout (zéro impact).

| Événement | Quand | Public | Code |
|-----------|-------|--------|------|
| `PageView` | chaque page, navigation interne incluse | tous | `src/components/MetaPixel.tsx` |
| `Lead` | une demande est publiée sur `/pubblica` | privati (demande) | `src/app/pubblica/LeadForm.tsx` |
| `CompleteRegistration` | un artisan finalise son inscription | artisans (offre) | `src/app/dashboard/page.tsx` via `PixelEvent` |
| `Purchase` | achat de crédits | artisans | **à brancher avec Stripe Live** |

Le chargement du snippet vit dans `src/lib/pixel.ts` (`loadPixel`, idempotent) et `trackPixel` l'appelle avant chaque émission. C'est volontaire : React exécute les effets des composants enfants avant ceux du layout, donc un événement peut partir avant que `MetaPixel` n'ait monté. Sans cette précaution, `CompleteRegistration` était perdu silencieusement.

### Pourquoi seul `PageView` est vérifiable avant le lancement

En mode `COMING_SOON=1`, `src/auth.config.ts` redirige `/pubblica`, `/categorie` et `/signup` vers `/`. Les deux parcours qui déclenchent `Lead` et `CompleteRegistration` sont donc inaccessibles.

Tester sur une Preview Vercel ne contourne pas le problème : `vercel.json` contient un `ignoreCommand` qui saute tout build dont `VERCEL_ENV` n'est pas `production`. Aucune preview n'est construite.

Ces deux événements se vérifient donc le jour du lancement, pas avant. Voir la checklist en section 3.

### Vérifier le Pixel sans extension

La méthode la plus fiable, et la seule qui ne dépende d'aucun outil tiers. Sur `https://manuvo.automa-ia.net`, ouvrir la console (F12) :

```js
fbq                                  // doit renvoyer une fonction
fbq.getState().pixels.map(p => p.id) // doit renvoyer ["1481208763866288"]
```

Si `fbq` est `undefined`, la variable n'est pas dans le build : vérifier Vercel, puis **redéployer**.
Si `getState` n'existe pas, `fbevents.js` n'a pas fini de charger : vérifier l'onglet Network, filtre `fbevents`.

### Vérifier avec l'extension Meta

L'extension s'appelle désormais **Meta Ads Data Advisor** (ex Meta Pixel Helper), même identifiant Chrome `fdgfkebogiimcoedlicjlajpkdmockpc`.

Pièges constatés :

- Elle ne voit pas les pages chargées **avant** son installation ou son activation. Toujours recharger la page (Ctrl+R) avant de conclure.
- Elle a besoin qu'aucun bloqueur de pub n'intercepte `connect.facebook.net`.
- Ne pas connecter son profil Facebook : la détection fonctionne déconnecté, et la connexion donne accès à des automatisations qui peuvent modifier le Pixel.

En cas de doute entre un problème de site et un problème d'extension, trancher avec la console (ci-dessus).

### Si le Pixel doit être recréé

1. **Events Manager** : `https://www.facebook.com/events_manager2/`
   Sinon : Business Suite → Tous les outils → Gestionnaire d'événements.
   Un **portefeuille d'entreprise** avec contrôle total est requis, sinon la création échoue sans message clair.
2. Bouton vert **+** → Connecter des sources de données → **Web** → Meta Pixel.
   Meta parle d'**ensembles de données** (datasets), plus de « pixels ». Pour une source web, l'ID du dataset **est** l'ID du Pixel.
3. À l'étape « méthode de configuration », choisir **installation manuelle** et **ignorer le code affiché** : il est déjà dans Manuvo. Ne récupérer que l'ID numérique.
4. Coller l'ID dans Vercel → Settings → Environment Variables → `NEXT_PUBLIC_META_PIXEL_ID`, Production + Preview, **sans** cocher Sensitive.
5. **Redéployer**, en décochant « Use existing Build Cache ». `NEXT_PUBLIC_*` est injecté dans le bundle **au moment du build** : sans nouveau build, rien ne change.

### Événements automatiques : laisser sur OFF

Events Manager → dataset → **Paramètres** → **Événements automatiques**.

Depuis août 2026, Meta propose de détecter des événements standard par IA, sans code. Pour Manuvo c'est à proscrire : `Lead` et `CompleteRegistration` sont déjà déclenchés explicitement. Une détection automatique produirait des doublons sur les mêmes actions, donc des chiffres faux et des campagnes optimisées sur un signal erroné.

La **correspondance avancée automatique**, dans ce même onglet, est en revanche utile et peut rester active.

---

## 2. Domaine et DNS

Point de confusion coûteux en temps, consigné ici une fois pour toutes.

| Service | Rôle |
|---------|------|
| **Wix** | registrar **et** hébergeur DNS de `automa-ia.net` (nameservers `ns2.wixdns.net`, `ns3.wixdns.net`) |
| **OVH** | héberge un VPS, **pas** ce domaine |
| **Vercel** | sert `manuvo.automa-ia.net` et `app.automa-ia.net` |

Tout enregistrement DNS pour `automa-ia.net` se modifie **chez Wix**. Un enregistrement ajouté chez OVH ne sera jamais lu.

### Ajouter un enregistrement TXT chez Wix

1. `https://manage.wix.com/account/domains`
2. Icône **Azioni** à côté de `automa-ia.net` → **Gestisci i record DNS**
3. Section **TXT (Testo)** → **+ Aggiungi record**
4. **Nome dell'host** : **laisser vide** quand un service demande un `@`. Écrire littéralement `@` crée l'enregistrement sur `@.automa-ia.net`, qui n'existe pas.
5. **Valore** : la chaîne fournie → **Salva**

### TXT en place sur la racine

```
facebook-domain-verification=…   vérification du domaine pour Meta
google-site-verification=…       vérification Google
v=spf1 include:_spf.google.com ~all   SPF des emails Google Workspace
```

Les trois coexistent. **Ne jamais supprimer le SPF** : les emails `@automa-ia.net` cesseraient de partir.

### Vérifier un enregistrement DNS depuis n'importe où

```
https://dns.google/resolve?name=automa-ia.net&type=TXT
```

### Emails ICANN : savoir lequel est urgent

Wix envoie deux types d'emails sur les coordonnées du titulaire. Ils se ressemblent, mais un seul engage une suspension.

| Email | Quand | Action |
|-------|-------|--------|
| « **Conferma** i dettagli di contatto del tuo dominio » | à l'enregistrement du domaine, ou après un changement de nom ou d'email du titulaire | **cliquer Conferma sous 14 jours**, sinon le domaine est suspendu |
| « **Controlla** le informazioni di contatto del tuo dominio » | rappel annuel (WHOIS Data Reminder Policy) | aucune, sauf si une information est fausse. L'email le dit lui-même : « se le informazioni sono corrette, non c'è niente che devi fare » |

Une suspension couperait le site vitrine, Manuvo et les emails `@automa-ia.net` d'un coup. En cas de doute sur l'état du domaine, le test le plus simple reste de vérifier qu'il résout et que le site répond.

L'email de contact WHOIS doit rester une adresse **hors** de ce domaine : si `automa-ia.net` tombe, une adresse `@automa-ia.net` ne recevrait plus rien.

Modifier les coordonnées : `https://manage.wix.com/account/domains` → **Azioni** → informations de contact. Changer le nom ou l'email du titulaire déclenche une nouvelle confirmation et un blocage de transfert de 60 jours imposé par ICANN.

---

## 3. Checklist du jour du lancement

À dérouler quand `COMING_SOON` est retiré, avant toute dépense publicitaire.

1. **`Lead`** : aller sur `/pubblica`, remplir une demande, vérifier le téléphone, publier. L'événement part au message de succès.
2. **`CompleteRegistration`** : créer un compte artisan test sur `/signup` jusqu'à l'arrivée sur `/dashboard`. L'événement part une seule fois, à l'arrivée. C'est le parcours le plus fragile historiquement, à vérifier en premier.
3. **Nettoyer les données de test** : la demande et le compte artisan créés sont de vraies données de production, supprimables depuis `/admin`.
4. **Events Manager → Test des événements** : confirmer que les trois événements arrivent côté Meta, et pas seulement dans le navigateur.
5. **Hiérarchiser les événements** (Aggregated Event Measurement), maintenant que le domaine est vérifié. Ordre de priorité suggéré : `Purchase` (quand il existera) > `CompleteRegistration` > `Lead` > `PageView`.
6. Seulement ensuite, allumer les campagnes selon `ROADMAP.md`.

---

## 4. Convention UTM

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

## 5. Reste à faire (voir BACKLOG.md)

- Vérifier `Lead` et `CompleteRegistration` au lancement (section 3).
- Brancher `Purchase` sur le flux d'achat de crédits (avec Stripe Live).
- (Optionnel) Meta Conversions API (CAPI) côté serveur pour fiabiliser le suivi malgré les bloqueurs de pub.
- Visuels d'annonces (les kits ne contiennent que les textes) — étape 18 de `ROADMAP.md`.
