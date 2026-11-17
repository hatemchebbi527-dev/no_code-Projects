# Kit d'identité AutomaIA pour Climbo (marque blanche)

> Valeurs exactes à saisir dans le dashboard Climbo (mode agence). L'API Climbo ne permet que de **lire** le thème et les plans, donc ces réglages se font à la main : environ 15 minutes.
> État lu via le MCP le 16 nov 2026 : nom « AutomaIA » et lien « powered by » déjà en place ; logo, favicon, couleur (`#000000`) et assistants encore aux valeurs par défaut de Climbo.

⚠️ **Règle fiscale à respecter** : tu peux tout configurer maintenant, mais **aucun client payant ni lien de paiement public avant l'ouverture de la P.IVA, le 4 janvier 2027** (sinon la date de début d'activité bascule et tu perds une année de forfettario). Le client de démo Manuvo reste sur le « Demo Plan » gratuit.

---

## 1. Branding de l'agence

Dashboard Climbo → mode agence → réglages de marque (Brand).

| Champ | Valeur | Fichier (dans `agence-ia/marque/`) |
|---|---|---|
| Nom de marque | `AutomaIA` | déjà en place |
| Logo | logo couleur, fond transparent | `logo-automaia.png` (1600×460) |
| Favicon | icône carrée | `favicon.png` (256×256) |
| Logo « powered by » | logo couleur | `logo-automaia.png` |
| Lien « powered by » | `https://automa-ia.net` | à vérifier : `www.automa-ia.net` est en place, garde-le seulement s'il redirige bien |
| Couleur principale | `#0F2A4A` (bleu nuit) | |
| Police | `Inter` | déjà en place (c'est ta police de texte) |
| Arrondi des angles | `8` | |

Les fichiers se téléchargent depuis GitHub (dossier `agence-ia/marque/`) ou depuis ton ordinateur.

---

## 2. Assistants (réglages IA)

Pas de « Agente » ni de « IA » face au client (voix de marque : zéro jargon). On parle d'**assistants**.

| Champ Climbo | Valeur appliquée (vérifiée via MCP le 17/11/2026) | Logo |
|---|---|---|
| Nom de l'assistant (`ai_name`) | `Automa IA` | non réglable dans le dashboard |
| Phrase d'invite (`prompt_sentence`) | `Ha una domanda? Mi chieda pure.` | |
| Assistant réponses aux avis (`reply_agent`) | `Automa Risposte` | `logo-automaia-avatar.png` |
| Assistant partage (`share_agent`) | `Automa Social` | `logo-automaia-avatar.png` |
| Assistant visibilité (`geo_agent`) | `Automa Ricerca` | `logo-automaia-avatar.png` |

Limites constatées :
- Noms limités à environ 15 caractères (« Assistente Recensioni » refusé).
- Pas de champ couleur par assistant ni de logo pour le nom principal dans le dashboard (champs présents dans l'API, en lecture seule).
- Le placeholder du chat (« Ask anything to Automa IA... ») reste en anglais même avec l'interface en italien. Généré par Climbo, non modifiable : à signaler au support.

---

## 3. Les 3 plans clients (à créer dans le dashboard)

> ⏸️ **En attente (constat du 17/11/2026)** : un « Piano a pagamento » exige de connecter Stripe. Décision : Stripe et les 3 plans payants seront créés **après l'ouverture de la P.IVA (4 janvier 2027)**, pour ouvrir le compte Stripe directement avec la bonne identité fiscale. D'ici là, seuls des plans gratuits (« Piano gratuito ») pour les démos.

Prix **par établissement (per sede), par mois**. Option annuelle conseillée : **10 × le mensuel** (2 mois offerts). Essai gratuit : **14 jours** sur les trois plans.

| | **Essenziale** | **Crescita** (à mettre en avant) | **Completo** |
|---|---|---|---|
| Prix mensuel | **99 €** | **149 €** | **199 €** |
| Prix annuel | 990 € | 1 490 € | 1 990 € |
| Collecte d'avis (lien, QR, email, SMS) | ✅ | ✅ | ✅ |
| Réponses automatiques aux avis | ✅ | ✅ | ✅ |
| Feedback privé + widget avis pour le site | ✅ | ✅ | ✅ |
| WhatsApp, campagnes, QR par employé + classement | | ✅ | ✅ |
| Partage des meilleurs avis (Instagram, Facebook) | | ✅ | ✅ |
| Gestion fiche Google, ranking Maps, analyse du sentiment | | ✅ | ✅ |
| Articles de blog hebdo + site (GEO) | | | ✅ |
| Ranking ChatGPT / Gemini / Perplexity / Grok | | | ✅ |
| TikTok + LinkedIn, analyse des concurrents | | | ✅ |
| **Limites mensuelles** | 50 SMS, 500 emails, 0 WhatsApp, 150 000 tokens | 100 SMS, 1 000 emails, 50 WhatsApp, 400 000 tokens | 200 SMS, 2 000 emails, 100 WhatsApp, 1 000 000 tokens |

**Sites d'avis à activer** (hôtellerie/restauration à Rimini) : Google, TripAdvisor, Booking, Facebook, Expedia, TheFork/OpenTable si disponible. Désactive ceux qui ne servent pas à ta cible (Zillow, Glassdoor, Indeed, App Store…) pour garder une interface simple.

**Contrôle du coût** : en créant chaque plan, Climbo affiche la « limite maximale de dépense ». Elle doit rester **sous ~15 % du prix** du plan. Les SMS et WhatsApp vers des numéros italiens coûtent plus cher que les tarifs américains montrés dans la vidéo : vérifie le coût réel dans la section Saldo et ajuste les quotas si nécessaire.

**Demo Plan** (Climbo) : verrouillé, non modifiable. Remplacé par notre plan gratuit **« Demo AutomaIA »** (créé le 17/11/2026, id `6afbd51f13c11035a50f18ea`) :
- sites d'avis : Google, Booking, TripAdvisor, Airbnb, Facebook, Expedia, OpenTable, Treatwell ;
- réseaux : Facebook, Instagram, TikTok (LinkedIn « coming soon » chez Climbo) ;
- toutes les fonctionnalités + Chat AI, « Filtro link recensione » coché (flux neutre, pas de gating), plan masqué ;
- limites mensuelles et d'essai : 20 SMS, 300 emails, 10 WhatsApp, 300 000 tokens, soit **3,60 $ max par mois et par établissement** ;
- 1 établissement (champ non réglable dans le dashboard).

Écart API : l'API renvoie `google` dans `disabled`, mais **Google s'affiche bien** sur la page d'avis de Manuvo (vérifié le 17/11/2026). Bug d'affichage de l'API, à ignorer. Manuvo est passé sur ce plan le 17/11/2026 (via le MCP).

**Coûts unitaires constatés** : 1 SMS = 0,01 $, 1 WhatsApp = 0,04 $, 1M tokens = 10 $ (tarif SMS vers l'Italie à confirmer dans Saldo).

---

## 4. Textes en italien

### Descriptions des plans (page de paiement)

- **Essenziale** : Più recensioni a 5 stelle e una risposta curata per ognuna, senza che Lei debba occuparsene.
- **Crescita** : Tutto l'Essenziale, più WhatsApp, le recensioni migliori pubblicate sui Suoi social e la Sua scheda Google sempre aggiornata.
- **Completo** : Tutto il Crescita, più un articolo a settimana sul Suo sito e il monitoraggio della Sua posizione su Google e su ChatGPT.

### Site d'agence (site clé-en-main Climbo)

**Titre :** Più recensioni a 5 stelle. Più clienti che La trovano.

**Sous-titre :** Raccogliamo le recensioni dei Suoi clienti, rispondiamo a ognuna e La facciamo trovare su Google e sugli assistenti come ChatGPT. Lei continua a occuparsi della Sua attività.

**Bénéfice 1 : Più recensioni, ogni settimana.**
Un QR al banco, un link o un messaggio WhatsApp dopo la visita: i clienti soddisfatti lasciano la recensione in pochi secondi.

**Bénéfice 2 : Ogni recensione riceve una risposta.**
Risposte curate e personali, pubblicate per Lei, con le parole che i clienti cercano su Google.

**Bénéfice 3 : Trovato su Google e su ChatGPT.**
Un articolo locale ogni settimana e il monitoraggio della Sua posizione su Google Maps e sugli assistenti come ChatGPT e Gemini.

**Ligne locale :** AutomaIA, Rimini. Lavoriamo con hotel, ristoranti e attività dell'Emilia-Romagna.

**CTA unique :** Richieda il Suo report di visibilità gratuito.
(Brancher ce bouton sur le formulaire « rapport de visibilité » de Climbo : c'est ton aimant à prospects.)

---

## 5. Ordre de mise en place (15 min)

1. Branding (section 1) : nom, logo, favicon, couleur, arrondi, lien « powered by ».
2. Assistants (section 2) : nom, phrase d'invite, 3 assistants avec couleurs et logos.
3. Plans (section 3) : créer Essenziale, Crescita, Completo. Ne pas diffuser les liens de paiement avant le 4 janvier 2027.
4. Site d'agence (section 4) : coller les textes italiens et brancher le CTA sur le formulaire de rapport.
5. Me prévenir : je relis le thème via le MCP pour vérifier que tout est bien appliqué.

## 6. Restera ensuite (hors kit)

- **Stripe** : connecter ton compte Stripe à Climbo (toi, dans le dashboard).
- **Domaine personnalisé** : enregistrements DNS chez ton registrar (je te les prépare quand Climbo les affiche).
- **Manuvo comme client démo** : connecter sa fiche Google et ses réseaux (autorisations à faire toi-même).
- **Prompts italiens par secteur** (café/resto, hôtel) : à construire ensemble.
- **Prospection S2** via le MCP : recherche hôtels/restos Rimini, pipeline, rapports (0,35 € pièce, toujours avec ton accord).

---

## Suivi de la mise en place (17/11/2026)

- ✅ Branding, assistants (Automa Risposte, Automa Social, Automa Ricerca), phrase d'invite.
- ✅ Plan gratuit « Demo AutomaIA » créé, Manuvo basculé dessus.
- ✅ Page d'avis de Manuvo : Google bien présent, 2 liens « Manuvo » (vers manuvo.automa-ia.net) supprimés via Requests > Link.
- ⏸️ Plans payants et Stripe : après la P.IVA (4 janvier 2027).
- ✅ Page d'avis en italien : **pas de réglage de langue**, il faut traduire les textes à la main dans **Requests > Link** (chaque page de la liste déroulante). À refaire pour **chaque nouveau client** (textes types ci-dessous).
- ✅ Réseaux sociaux de Manuvo connectés (Facebook, Instagram, TikTok) ; les 3 assistants configurés (voir « Réglages types »).
- ✅ **Domaine personnalisé** (17/11/2026) : `portal.automa-ia.net` (client), `/admin` (agence), `/guides` (base de connaissances). DNS chez **Cloudflare** : CNAME `portal` → `app.mylocalbusiness.io`, **DNS only** (nuage gris, jamais proxied). Ne pas toucher `app` et `manuvo` (Vercel) ni les enregistrements Resend.
- ⚠️ **Solde d'agence : 1,20 $**, recharge minimale 100 $. Décision (17/11/2026) : pas de recharge avant le premier client (son abonnement la financera). Mode économie : **Automa Ricerca en pause** (réactiver le temps d'un article avant une démo), Risposte et Social actifs. Prospection : audits manuels ou via n8n plutôt que rapports à 0,35 €. À 0, les assistants s'arrêtent.
- Ensuite : Automa Social et Automa Ricerca absents du menu client de Manuvo (seul Automa Risposte visible), Custom URL du lien d'avis (ex. `manuvo`), placeholder anglais à signaler au support.

---

## Textes types de la page d'avis (italien, vouvoiement Lei)

À coller dans **Requests > Link** pour chaque nouveau client.

**Page Filter (1re page)**
- Titre : `Come valuta la Sua esperienza con noi?`
- Sous-titre : `Scelga un'opzione qui sotto.`
- Bouton 1 : `LASCI UNA RECENSIONE` / `Condivida la Sua esperienza`
- Bouton 2 : `CI SCRIVA` / `Contatti direttamente il nostro team`

**Page des sites d'avis**
- Titre : `Grazie, la Sua opinione conta!`
- Sous-titre : `Lasci una recensione sulla piattaforma che preferisce.`
- Option feedback : `Feedback privato`

**Langue affichée** (testé le 17/11/2026) : la page suit la **langue du téléphone du visiteur**. Téléphone en italien → textes italiens personnalisés ; autres langues → textes anglais par défaut de Climbo. Pratique pour les hôtels : les touristes étrangers voient l'anglais. Pour tester une page en italien, utiliser un appareil réglé en italien (ou une fenêtre privée sur un ordinateur en italien).

---

## Réglages types des assistants (côté client)

Chaque assistant se règle dans **sa propre section** de l'espace client :
- **Automa Risposte** : section Avis (étoile) ;
- **Automa Social** : section Engagement (icône partage) ;
- **Automa Ricerca** : section Visibilité (œil).

### Automa Social (Configurazione)
- Langue : `Italiano` (champ vide par défaut, à remplir obligatoirement) ; ton chaleureux et professionnel ; longueur courte ; 1 fois par semaine ; seuil 4 étoiles et plus ; « Sovrascrivi impostazioni manuali » activé.
- Plateformes : Facebook, Instagram, Google (TikTok à retirer si les partages échouent : il exige vidéo ou carrousel).
- Istruzioni aggiuntive :
  > Scrivi in italiano, dando del Lei al lettore. Tono caldo e professionale. Ringrazia il cliente usando solo il suo nome di battesimo. Non inventare dettagli che non sono nella recensione. Massimo 2 emoji. Chiudi con un invito semplice a contattarci o a lasciare anche Lei una recensione.

### Automa Risposte (Configurazione)
- Langue : celle de l'avis si possible (argument fort pour les hôtels) ; ton chaleureux et professionnel ; publication auto pour 4-5 étoiles, validation manuelle pour 1-3 étoiles ; « Sovrascrivi impostazioni manuali » activé.
- Istruzioni aggiuntive :
  > Rispondi nella lingua della recensione. Se in italiano, dai del Lei. Ringrazia il cliente per nome (solo nome di battesimo). Riprendi un dettaglio concreto citato nella recensione. Non inventare informazioni, offerte o promesse. Se la recensione è negativa: scusati senza giustificarti, mostra che hai capito il problema e invita a contattarci in privato. Niente emoji nelle risposte negative. Massimo 4 frasi. Usa al massimo una parola chiave per risposta, solo se suona naturale.
- Parole chiave : 3 à 5, toujours ville + service. Manuvo : `artigiani a Rimini, idraulico Rimini, elettricista Rimini, artigiani Riviera romagnola`. Hôtel : `hotel a Rimini, hotel vicino al mare Rimini, hotel per famiglie Rimini`. Restaurant : `ristorante a Rimini, ristorante di pesce Rimini, dove mangiare a Rimini`.

### Automa Ricerca (Configurazione)
- Langue : `Italiano` (anglais par défaut, à changer) ; ton chaleureux et professionnel ; longueur normale ; 1 fois par semaine ; police Inter.
- Image de couverture : **« Dalla libreria »** (vraies photos de l'établissement, à charger dans sa bibliothèque). Jamais « Fotorealistico » (fausses photos trompeuses pour un hôtel ou un restaurant).
- Approbation automatique : **désactivée** le premier mois (relire chaque article). Partage social : désactivé (Automa Social publie déjà).
- Note aggiuntive :
  > Scrivi in italiano, dando del Lei al lettore. Basati solo su quanto emerge dalle recensioni reali: non inventare prezzi, servizi, numeri o promesse. Cita la città e la zona (Rimini, Riviera romagnola). Struttura chiara con sottotitoli e una breve sezione finale di domande frequenti (FAQ) con risposte concise. Chiudi con un invito semplice a contattarci.

### Adapter par client (environ 10 min)
Copier les réglages ci-dessus, puis ajuster : mots-clés (service + quartier), ville/zone dans les instructions, textes de la page d'avis, et la langue de Social/Ricerca selon la clientèle majoritaire (italien en général, anglais pour un hôtel très international). Risposte et la page d'avis gèrent déjà le multilingue.
