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

**Offre V1 du 22/11/2026** (référence complète : `AutomaIA-V1.pdf`, Google Drive > dossier Climbo). Prix **par établissement (Price per Location), par mois**. Essai gratuit et option annuelle : **non prévus dans la V1** (à décider).

| | **Bronze** | **Silver** | **Gold** |
|---|---|---|---|
| Prix mensuel | **149 €** | **299 €** | **499 €** |
| Avis Google, Booking.com, Expedia, TripAdvisor | ✅ | ✅ | ✅ |
| Créateur de site, widget, demandes d'avis, suggestions, profil, Classifica AI | ✅ | ✅ | ✅ |
| Percezione IA (6 indicateurs de visibilité et de perception sur les IA) | | ✅ | ✅ |
| Rappels, gestion d'équipe, performances Google, partage social, automatisations | | ✅ | ✅ |
| Sentimento, SEO (Automa Risposte), Social (Automa Social), GEO (Automa Ricerca), Chat AI | | ✅ | ✅ |
| Témoignages vidéo, SMTP et Twilio du client | | | ✅ |
| **SMS (segments)** | 50 | 150 | 400 |
| **WhatsApp** | 25 | 100 | 300 |
| **E-mails** | 500 | 1 500 | 3 000 |
| **Tokens IA** | 250 000 | 1 000 000 | 3 000 000 |
| **Plafond de coût mensuel** (100 % des quotas) | 9 $ | 32 $ | 92 $ |

Quota atteint : seul ce canal se bloque, renouvellement au début du mois suivant, passage à un forfait supérieur possible, **aucune recharge ponctuelle**.

Réglages retenus pour les 3 plans : Price per Location, facturation activée, **branding désactivé** (« Disabilita Branding » coché), plans visibles (« Nascondi piano » décoché).

⚠️ **Les 3 assistants IA ne sont inclus qu'à partir de Silver.** Ne jamais présenter Bronze comme « avec les 3 assistants » (site, démo, devis).

**Sites d'avis à activer** (hôtellerie/restauration à Rimini) : Google, TripAdvisor, Booking, Facebook, Expedia, TheFork/OpenTable si disponible. Désactive ceux qui ne servent pas à ta cible (Zillow, Glassdoor, Indeed, App Store…) pour garder une interface simple.

**Contrôle du coût** : tarifs de référence de la V1 : SMS 0,08 $ par segment, WhatsApp 0,10 $ par message, e-mails 0 $, IA 1 $ pour 100 000 tokens (SMS et WhatsApp varient selon le pays destinataire). En créant chaque plan, vérifier que la « limite maximale de dépense » affichée par Climbo correspond au plafond du tableau.

**Demo Plan** (Climbo) : verrouillé, non modifiable. Remplacé par notre plan gratuit **« Demo AutomaIA »** (créé le 17/11/2026, id `6afbd51f13c11035a50f18ea`) :
- sites d'avis : Google, Booking, TripAdvisor, Airbnb, Facebook, Expedia, OpenTable, Treatwell ;
- réseaux : Facebook, Instagram, TikTok (LinkedIn « coming soon » chez Climbo) ;
- toutes les fonctionnalités + Chat AI, « Filtro link recensione » coché (flux neutre, pas de gating), plan masqué ;
- limites mensuelles et d'essai : 20 SMS, 300 emails, 10 WhatsApp, 300 000 tokens, soit **3,60 $ max par mois et par établissement** ;
- 1 établissement (champ non réglable dans le dashboard).

Écart API : l'API renvoie `google` dans `disabled`, mais **Google s'affiche bien** sur la page d'avis de Manuvo (vérifié le 17/11/2026). Bug d'affichage de l'API, à ignorer. Manuvo est passé sur ce plan le 17/11/2026 (via le MCP).

**Coûts unitaires affichés dans le dashboard** (17/11/2026) : 1 SMS = 0,01 $, 1 WhatsApp = 0,04 $, 1M tokens = 10 $. La V1 retient des tarifs plus prudents (voir ci-dessus).

---

## 4. Textes en italien

### Descriptions des plans (page de paiement)

- **Bronze** : Più recensioni da Google, Booking.com, Expedia e TripAdvisor, il widget delle recensioni per il Suo sito e la Sua posizione sugli assistenti AI, tutto in un'unica area clienti.
- **Silver** : Tutto il Bronze, più i tre assistenti AI: una risposta curata a ogni recensione, le recensioni migliori sui Suoi social e articoli per farsi trovare su Google e su ChatGPT.
- **Gold** : Tutto il Silver, con quote più ampie, testimonianze video e invio dei messaggi dal Suo numero e dalla Sua email.

### Site d'agence (site clé-en-main Climbo, non utilisé : on garde automa-ia.net)

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
3. Plans (section 3) : créer Bronze, Silver, Gold (après Stripe, à partir du 4 janvier 2027). Ne pas diffuser les liens de paiement avant.
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

### Prompts complets avec faits client (version du 18/11/2026, appliquée à Manuvo)

Les 3 assistants reçoivent le **même bloc de faits** sur le client. Ton : Lei pour tout le contenu automatique (cohérence du blog). Avant le lancement d'un client : appel à l'action « scopri [nome] ».

**Automa Risposte** :
> Rispondi nella lingua della recensione. Se in italiano, dai del Lei. Ringrazia il cliente per nome (solo nome di battesimo) e riprendi un dettaglio concreto citato nella recensione.
> Come funziona Manuvo (usa solo questi fatti): il privato pubblica gratuitamente la sua richiesta (tipo di intervento, zona, urgenza); fino a 3 artigiani della zona di Rimini possono contattarlo con un preventivo; il privato sceglie liberamente. Manuvo mette in contatto privati e artigiani, non esegue i lavori: non scrivere mai "il nostro tecnico", "il nostro intervento" o "abbiamo riparato".
> Non inventare informazioni, offerte, sconti, garanzie, tempi o promesse. Non scrivere mai frasi come "dal contesto fornito".
> Se la recensione è negativa: scusati senza giustificarti, mostra che hai capito il problema e invita a scriverci in privato a info@automa-ia.net. Niente emoji nelle risposte negative.
> Massimo 4 frasi. Usa al massimo una parola chiave per risposta, solo se suona naturale.

**Automa Social** :
> Scrivi in italiano, dando del Lei al lettore. Tono caldo e professionale. Ringrazia il cliente usando solo il suo nome di battesimo e riporta solo ciò che c'è nella recensione, senza aggiungere dettagli.
> Come funziona Manuvo (usa solo questi fatti): [même bloc]. Manuvo mette in contatto privati e artigiani, non esegue i lavori.
> Non inventare prezzi, numeri, sconti, garanzie, tempi o date. Non scrivere mai frasi come "dal contesto fornito".
> Massimo 2 emoji e massimo 3 hashtag (ad esempio #Rimini #RivieraRomagnola #Manuvo). Chiudi con un invito semplice a scoprire Manuvo.

**Automa Ricerca** : même structure (Lei, bloc de faits, interdits), avec sous-titres, FAQ finale et « Chiudi con un invito semplice a scoprire Manuvo. »

Pour un hôtel, remplacer le bloc par ses faits réels (services, langues parlées, ce qui n'existe pas) et, pour Risposte, ne jamais promettre de geste commercial ni de remboursement.

### Automa Ricerca : leçons des 2 premiers articles (Manuvo, 18/11/2026)

Sans description précise du client, Ricerca **invente son fonctionnement** (ex. « cercare per categoria », « sfogliare i profili », « vi aiutiamo noi a trovare… ») et laisse des traces de robot (« dal contesto fornito… »). Deux règles :

1. **Ajouter un bloc « fatti » propre à chaque client** dans les Note aggiuntive : comment il fonctionne réellement, ce qu'il ne fait pas, ce qu'il ne faut jamais promettre. Exemple Manuvo :
   > Come funziona Manuvo (usa solo questi fatti): il privato pubblica gratuitamente la sua richiesta (tipo di intervento, zona, urgenza); fino a 3 artigiani della zona di Rimini possono contattarlo con un preventivo; il privato sceglie liberamente. Non esistono profili da sfogliare, ricerche per categoria o foto dei lavori: non citarli mai. Non inventare prezzi, numeri, garanzie, certificazioni o date. Non scrivere mai frasi come "dal contesto fornito".
   Pour un hôtel : services réels, langues parlées, ce qui n'existe pas (pas de spa, pas de parking…), jamais de prix.
2. **Relire chaque article avant publication** (crayon), avec cette grille :
   - fonctionnement du client décrit correctement ;
   - aucune promesse de rapidité, d'assistance personnelle ou de garantie ;
   - aucun prix, chiffre, certification ou date inventés ;
   - aucune phrase « robot » ;
   - titres de section cohérents avec le texte (ex. pas de « invito a contattarci » si on a retiré l'invitation) ;
   - un seul ton sur tout le blog (Lei pour Manuvo, gardé pour la cohérence des articles).

⚠️ **« Approva automaticamente » désactivé ne bloque pas la publication.** Les articles passent en « Pianificato » et sont publiés automatiquement peu après (4 articles en environ 24 h au démarrage sur Manuvo). C'est un système d'opposition : bouton « Non pubblicare questo articolo ». La relecture doit donc se faire **dès la génération** (notification « generazione articolo » activée), et un article déjà publié se corrige avec le crayon. Au démarrage, Ricerca génère un premier lot d'articles : prévoir le coût sur le solde, puis remettre en pause si besoin.

Avant le lancement d'un client (cas Manuvo, en « coming soon » jusqu'au 22/01/2027) : pas d'appel à l'action impossible (« pubblica ora la tua richiesta »), utiliser « scopri [nome] ». Zone de service : celle déclarée par le client (« Rimini e dintorni »), ne pas l'élargir (« Riviera romagnola »).

Les images générées portent la mention « Immagine generata con AI » : acceptable pour un service (Manuvo), à éviter pour un hôtel ou un restaurant (vraies photos de la bibliothèque).

### Adapter par client (environ 10 min)
Copier les réglages ci-dessus, puis ajuster : mots-clés (service + quartier), ville/zone dans les instructions, textes de la page d'avis, et la langue de Social/Ricerca selon la clientèle majoritaire (italien en général, anglais pour un hôtel très international). Risposte et la page d'avis gèrent déjà le multilingue.

---

## Feedback privé et notifications (testé le 18/11/2026)

**Circuit du feedback privé** : bouton « Feedback » de la page d'avis → formulaire privé (rien n'est publié) → email d'alerte au titulaire → message visible dans la section **Avis** de l'espace client → réponse possible depuis l'espace client, envoyée par email au client. Testé de bout en bout sur Manuvo : tout fonctionne.

**Objet de l'email de réponse** : par défaut « Rispondi al tuo feedback » (tutoiement, mal formulé). D'après le support Climbo, il se **modifie à la main à chaque réponse**. Toujours le remplacer par : `Risposta al Suo feedback`.

Modèle de réponse à un feedback négatif (à adapter) :
> Gentile [Nome], grazie per averci scritto e per il tempo che ci ha dedicato. Ci dispiace sinceramente per [problema]. Abbiamo già [azione concreta]. Se lo desidera, saremo felici di parlarne direttamente: può contattarci al [telefono]. Speriamo di poterLa accogliere di nuovo. [Firma]

**Notifications types** (Impostazioni sede > Notifiche) :
- Emails : celle du titulaire **+ info@automa-ia.net** (jusqu'à 5 adresses) pour suivre tous les clients.
- Activées : nouvel avis, récap quotidien, nouveau contact du site, **nouveau feedback privé**, partage social automatique, **connexion d'intégration expirée** (la plus importante), **génération d'article** (Ricerca en validation manuelle), **analyse mensuelle du sentiment**, **limite mensuelle presque atteinte**.

**Modèles de demande d'avis** (Richieste > Modelli) : vides par défaut. Assistant en étapes (nom, puis contenu). Les variables s'insèrent en cliquant sur les pastilles sous le champ (Nome, Nome della località, Link di disiscrizione, Pulsante Link Recensione), jamais en les tapant. Vérifier qu'il n'y a pas d'espace entre une pastille et la ponctuation.

*Email italien (créé sur Manuvo le 22/11/2026, à dupliquer par client) :*
- Nome : `Richiesta recensione - Email`
- Mittente : nom de l'établissement · Oggetto : `Com'è andata con [Établissement]?`
- Testo Pulsante : `Lasci la Sua recensione` · Link brevi : coché · Immagine : vide

```
Buongiorno [Nome],

grazie per aver scelto [Nome della località].
Ci farebbe piacere sapere com'è andata. La Sua opinione, positiva o negativa, aiuta altre persone a scegliere con fiducia e aiuta noi a migliorare.

Le bastano due minuti:

[Pulsante Link Recensione]

Grazie di cuore,
il team di [Nome della località]

Per non ricevere più queste email: [Link di disiscrizione]
```

*Email anglais (créé sur Manuvo le 22/11/2026) :*
- Nome : `Review request - Email (EN)` · Mittente : établissement · Oggetto : `How was your experience with [Établissement]?`
- Testo Pulsante : `Leave your review` · Link brevi : coché

```
Hello [Nome],

Thank you for choosing [Nome della località].
We would love to hear how it went. Your opinion, positive or negative, helps other people choose with confidence and helps us improve.

It only takes two minutes:

[Pulsante Link Recensione]

Many thanks,
The [Nome della località] team

To stop receiving these emails: [Link di disiscrizione]
```

« positiva o negativa » / « positive or negative » : même invitation pour tous, pas de filtrage. Toujours saisir le prénom des contacts (sinon « Buongiorno , »). Dans l'aperçu, Climbo affiche « Nome Posizione » pour le nom de l'établissement. Le canal se choisit à l'étape 2 (SMS et WhatsApp grisés tant qu'ils ne sont pas actifs sur le compte). Restent à créer : SMS / WhatsApp quand le client les a dans son plan.

---

## Blog du client (option B, mise en place le 18/11/2026 sur Manuvo)

Principe : le client **garde son vrai site**. Les articles d'Automa Ricerca sont publiés sur **le blog d'Automa Ricerca** (page liste + une vraie page par article, indexables), sur un sous-domaine du client, avec un lien « Blog » sur le vrai site.

1. **Automa Ricerca > onglet Pubblica > Dominio Personalizzato** : sous-domaine **sur un seul niveau** (`blog` + `hotelrossi.it` → `blog.hotelrossi.it`). Climbo donne un CNAME vers **`blog.myblog.business`**.
2. DNS du client : CNAME `blog` → `blog.myblog.business`, **DNS only** si Cloudflare.
3. Ajouter un lien « Blog » sur le vrai site du client (menu ou pied de page).
4. Publication : **pas de bouton « publier maintenant »**. Les articles « Pianificato » partent automatiquement selon la fréquence choisie. Bouton « Non pubblicare questo articolo » pour en annuler un. Toujours relire avant (crayon pour corriger).
5. Option secondaire : widget « blog » (onglet Pubblica > Incorpora articoli) à coller dans le vrai site. Moins bon pour le SEO (contenu chargé en JavaScript).

⚠️ **Ne pas utiliser le mini-site « Sito web »** (Visibilité > Sito web) comme blog : testé sur Manuvo, il affichait des sections vides avec des titres en anglais (« What People Say », « From Our Blog : No articles found ») et pas les articles de Ricerca. Domaine retiré du mini-site.

Ordre imposé par Climbo pour changer un domaine : **supprimer d'abord le CNAME dans Cloudflare**, puis déconnecter dans Climbo, puis reconnecter ailleurs.

⚠️ Leçon Manuvo : `blog.manuvo.automa-ia.net` (2 niveaux sous `automa-ia.net`) donnait une erreur HTTPS (`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`). Passé sur **`blog-manuvo.automa-ia.net`** (1 niveau) : fonctionne. Toujours un seul niveau de sous-domaine.

**Domaine d'agence > Sito Web** (dashboard d'agence) : sert au site d'agence construit par Climbo. Non utilisé (on garde `automa-ia.net`), à laisser vide.

---

## Page d'avis : « Ci scriva » et « Feedback privato » (testé le 18/11/2026)

Les deux créent un **feedback privé** dans la section **Avis**, avec le même email d'alerte. Seul le moment change : « Ci scriva » sur la page 1 (filtre neutre), « Feedback privato » sur la page 2 (à côté de Google, Booking…). Recommandation pour hôtels et restaurants : **garder la page 1** (ne pas cocher « Disable Experience Filter »), car le mécontent est orienté vers le privé dès le départ. Les boutons d'envoi sont désactivés dans l'**aperçu** du dashboard : toujours tester sur le vrai lien.

## Rapport de visibilité (démo et prospection)

Dashboard d'agence > **Pipeline** : chercher l'établissement (catégorie + zone) → l'ajouter comme cible → générer le rapport (rayon 5 km pour un hôtel ou un restaurant en ville) → environ 30 s → lien web + PDF. Contenu : position Google Maps sur une grille, concurrents, note et avis, position sur les assistants IA (peut arriver après la partie Maps, statut « partial »).
- Coût : **0,35 € par rapport**, prélevé sur le solde d'agence.
- Langue : celle des réglages de la Pipeline → **italien**.
- **Le préparer avant le rendez-vous**, pas pendant la démo. Montrer sur tablette, laisser une copie imprimée.
- Possible aussi via le MCP Climbo (`POST /prospecting/target/{id}/report`, puis lecture de `/prospecting/report/{id}`), toujours avec accord puisque payant.

## Widget opt-in (rapport automatique depuis automa-ia.net)

Le visiteur tape le nom de son établissement, laisse son email et reçoit son rapport de visibilité ; il arrive dans la Pipeline avec le rapport déjà généré. **0,35 $ par formulaire rempli**, sur le même solde que les assistants des clients : ne l'activer qu'avec un solde rechargé.

- **Site** : intégré sur `/report` (au-dessus du calendrier), interrupteur `OPTIN_ENABLED` dans `agence-ia/site/automaia-web/lib/optin.js` (désactivé par défaut). Messages de redimensionnement acceptés uniquement depuis `portal.automa-ia.net`.
- **Textes du formulaire** (dashboard, Pipeline > widget Opt-in, non modifiables via l'API) : `Nome della Sua struttura` · `Es. Hotel Bellavista, Rimini` · `La Sua email` · bouton `Riceva il report gratuito` (forme Lei, pas « Ricevi ») · redirection vide.
- **Email « Report da opt-in »** (Impostazioni > Email) : variables Climbo au format `{{businessName}}` et `{{reportLink}}`, à insérer avec le bouton de variables (jamais tapées à la main). Dans un email de test, elles restent affichées telles quelles (pas de données réelles).
  - Objet : `Il Suo report di visibilità locale è pronto`
  - Texte :
    > Gentile titolare,
    >
    > ecco il report di visibilità locale di {{businessName}}: dove compare su Google Maps nella Sua zona e se gli assistenti AI, come ChatGPT, La consigliano quando qualcuno cerca un'attività come la Sua.
    >
    > {{reportLink}}
    >
    > Se lo desidera, possiamo commentarlo insieme in 20 minuti, gratuitamente e senza impegno. Prenoti qui l'orario che preferisce: https://automa-ia.net/report
    >
    > Cordiali saluti, Hatem · AutomaIA · Rimini · info@automa-ia.net

## Guides clients (Brand > Guide)

- Publiées sur `https://portal.automa-ia.net/guides`, à la marque AutomaIA (logo, favicon, aucune mention de Climbo). Lien « Guide » dans le pied de page d'automa-ia.net (nouvel onglet).
- Textes écrits et mis à jour par Climbo : **non modifiables**, pas de réglage du lien du logo. Sélecteur de langue intégré (italien disponible).
- Les guides gardent les noms génériques : **SEO Agent = Automa Risposte, GEO Agent = Automa Ricerca, Social Agent = Automa Social**. À expliquer au client pendant l'onboarding.
- ⚠️ Ne jamais connecter **Brand > Dominio > Sito Web** sur `portal` : ce sous-domaine sert déjà la plateforme (onglet Software). Le site d'agence Climbo n'est pas utilisé.

## Coûts réels constatés (Manuvo, novembre 2026)

- 4 articles Automa Ricerca : environ **0,37 $ au total**, soit environ **0,09 $ par article** (image comprise). Un article par semaine coûte donc environ 0,40 $ par mois et par client.
- Rapport de visibilité : 0,35 $ (opt-in ou Pipeline).
- Mode économie tant que le solde n'est pas rechargé : Ricerca et Social en pause, seul Risposte actif sur Manuvo.

## Trésorerie de janvier 2027 (complément à la V1)

La simulation de la V1 compte la consommation réelle, mais pas l'**avance de trésorerie** nécessaire avant d'encaisser le premier client.

**Sorties prévues en janvier**
- **Recharge du solde d'agence : 100 $ minimum**, payés d'avance. Elle doit être faite **avant** d'activer le premier client (à 0, les assistants s'arrêtent). Ce n'est pas une dépense en plus de la consommation : la consommation est ensuite prélevée sur ce solde. Avec 3 clients à 100 % des quotas (V1 : 27 $ à 133 $ par mois), une recharge couvre environ 1 à 3 mois.
- **Échéance Climbo du 18 janvier : 166 €** (dernière des trois).

**Entrées**
- Les abonnements des clients, encaissés par Stripe, **seulement après** l'ouverture de la P.IVA (4 janvier), l'activation de Stripe et la création des plans. Le premier paiement d'un client arrive le jour de sa souscription.

**Besoin de trésorerie avant le premier encaissement : environ 266 €** (100 $ de recharge, au taux 1 $ = 1 €, plus 166 € d'échéance), si la recharge et l'échéance tombent avant la première souscription.

**Non compté dans la V1** : frais Stripe (environ 1,5 % + 0,25 € par paiement en carte européenne, à vérifier), impôts et cotisations du régime forfettario, chevalets NFC, frais d'outils (domaine, n8n…).

**Ordre conseillé** : 1) P.IVA (4 janvier) ; 2) activation de Stripe ; 3) création des plans Bronze, Silver et Gold ; 4) recharge de 100 $ **le jour de la première signature**, pas avant ; 5) activation du client.
