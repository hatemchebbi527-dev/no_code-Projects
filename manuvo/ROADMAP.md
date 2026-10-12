# Manuvo — Roadmap Marketing (itinéraire unique)

> **Source de vérité unique du plan marketing Manuvo.**
> Ce fichier dit *quoi* et *pourquoi*. Le calendrier Notion dit *quand*.
> Rien d'autre ne fait foi : ni les artifacts, ni `SOCIAL.md`, ni une note ailleurs.

- **Calendrier opérationnel (Notion)** : « 📅 Calendrier Marketing Manuvo — itinéraire unique »
- **Zone vague 1** : Rimini + 20 km · **Langue** : italien (tu) · **Handle** : `manuvo.it`
- **Site** : https://manuvo.automa-ia.net
- **Jour J : vendredi 4 décembre 2026**
- Version 4, 12 octobre 2026 : date de lancement décalée pour tenir la promesse

---

## 1. Pourquoi ce fichier existe

Trois plans marketing coexistaient et se contredisaient (budgets différents, phases
différentes, aucune date pour les campagnes payantes). Ils deviennent des **bibliothèques**,
plus des plannings :

| Document | Nouveau rôle |
|---|---|
| Artifact « Piano Marketing Manuvo » | Bibliothèque de posts italiens prêts à copier |
| Artifact « Annunci Meta e Google · Manuvo » | Bibliothèque de textes de pub, ciblages, mots-clés, négatifs |
| Artifact « Manuvo · Campagne de lancement » | Stratégie, KPI, objectifs 90 jours |
| Artifact « Kit post di lancio » (sept.) | **Archive** — remplacé par Piano Marketing |
| Artifact « Script chiamata artigiani » | Script d'appel, utilisé aux étapes 6a à 6c |
| Artifact « Manuvo · Volantini A5 » | Flyers, utilisés aux étapes 5a et 5b |
| `SOCIAL.md` | Légendes italiennes + journal de publication |
| `MARKETING.md` | Pixel Meta + convention UTM |
| **`ROADMAP.md` (ce fichier)** | **L'ordre des opérations** |

## 2. Les 3 principes qui tranchent tous les arbitrages

1. **L'offre avant la demande.** Pas un euro de pub avant 30 artisans inscrits.
   Une demande publiée qui ne trouve aucun artisan détruit la confiance définitivement.
2. **Pas de pub, et pas d'argument, avant que la promesse soit vraie.** Toute la
   communication promet « contatti verificati via SMS » : sans Twilio en production,
   l'argument ne sort pas. Stripe Live conditionne le revenu.
3. **Une ville à la fois.** Rimini jusqu'à la densité, puis on duplique la recette.

## 3. Pourquoi la date passe du 20 novembre au 4 décembre

Deux contraintes sont arrivées après la version 1 :

1. **Déplacement du 14 octobre au 5 novembre.** Aucune action terrain pendant 23 jours.
2. **La P.IVA ne peut pas s'ouvrir à distance.** Elle démarre donc le 6 novembre, et
   **Stripe Live comme Twilio en dépendent** : l'Italie exige la pré-inscription du Sender ID
   alphanumérique avec des documents d'entreprise (code de conduite ALIAS, délibération AGCOM
   42/13/CIR), et Twilio ne publie aucun délai de traitement.

Garder le 20 novembre imposait de comprimer 5 semaines de terrain en 2, et de lancer sans
savoir si la vérification SMS serait active. Décaler de 14 jours résout les deux :

| | 20 novembre | **4 décembre** |
|---|---|---|
| Semaines de terrain | 2, en sprint | **4, au rythme normal** |
| Appels par semaine | 30 | **15**, soit 3 par jour ouvré |
| Flyers en place avant le lancement | 7 jours | **3 semaines** |
| Marge sur Twilio après soumission | 1 semaine | **3 semaines** |
| Stripe Live | 16 nov, 4 jours de marge | 18 nov, **2 semaines de marge** |
| Artisans attendus | 25 à 33 | **30 à 45** |
| Promesse SMS | en équilibre | **tenue, ou pas annoncée** |

Argument de saison en prime : début décembre est le pic des pannes de chaudière à Rimini,
le meilleur moment de l'année pour ouvrir un service d'idraulico. Et le lancement reste
avant les fêtes, avec deux semaines de croisière pour installer la boucle.

**La date devient publique le 25 novembre**, avec le Reel « dal 4 dicembre ». À partir de ce
post, elle ne se décale plus. C'est pour cela que ce décalage est décidé maintenant.

---

## 4. L'itinéraire en 3 blocs d'exécution

### Bloc A · Avant le départ — lun 12 au mar 13 oct

| # | Étape | Date | Pourquoi maintenant |
|---|---|---|---|
| 1 | Figer l'itinéraire unique | 12 oct | Fait |
| 2 | Fiche Google Business Profile | 13 oct | 30 min, gratuit, commence à référencer pendant l'absence |
| 2b | **Bloquer le rendez-vous commercialista du 6 novembre** | 13 oct | La P.IVA commande Stripe Live et Twilio. 10 min aujourd'hui, une semaine gagnée au retour |

### Bloc B · Pendant le déplacement — mer 14 oct au jeu 5 nov · 100 % en ligne

| # | Étape | Date | Type |
|---|---|---|---|
| 4 | Rejoindre 7 groupes Facebook locaux | 14 oct | En ligne |
| 6a | **Prospection artisans par message : 15 par semaine** | 16, 23, 30 oct | En ligne |
| 3 | Liste de 60 artisans (Maps, Pagine Gialle, groupes) | 19 oct | Bureau |
| 10 | Répondre aux « cerco idraulico » dans les groupes | 19, 26 oct · 2 nov | En ligne |
| 11a | Préparer le dossier Twilio (compte, crédit, pièces du Sender ID) | 20 oct | Technique |
| 14 | Meta Pixel actif, 3 events vérifiés | 22 oct | Technique |
| 11b | **Basculer le code SMS sur Twilio Verify** | 23 oct | Technique |
| 8 | Fixer l'offre d'amorçage (crédits offerts) | 26 oct | Décision |
| 17 | Comptes pub prêts, 3 campagnes en pause | 28 oct | Pub |
| 18 | 6 créas publicitaires | 30 oct | Pub |
| 16 | Nettoyage de la base + retrait de l'outil d'avis test | 2 nov | Technique |
| 16b | Masquer le badge « Contatto verificato » tant que Twilio n'est pas live | 2 nov | Technique |
| 19 | Tableau UTM figé | 3 nov | Pub |
| 9 | Contenu : 3 posts par semaine, CTA doux | 14 oct → 2 nov | Contenu |

**Objectif de sortie :** 45 artisans contactés avec un pré-accord d'appel, liste de 60
complète, tout le technique non bloquant fait, campagnes construites et en pause.

### Bloc C · Retour — jeu 5 nov au jeu 3 déc · 4 semaines de terrain

**Semaine 0, le jour du retour**

| # | Étape | Date |
|---|---|---|
| 13a | **Ouvrir la P.IVA avec le commercialista** | 6 nov |
| 5a | Commander les 1 600 flyers, livraison standard | 6 nov |

**Semaine 1 — administratif et démarrage terrain**

| # | Étape | Date |
|---|---|---|
| 6b | Appels artisans : 15 cette semaine | 9 nov |
| 7a | Tour des 12 grossistes : accord de dépôt, sans flyers | 10 nov |
| 13b | Inscrire la P.IVA dans les pages légales | 11 nov |
| 11c | Twilio : soumettre la pré-inscription du Sender ID | 12 nov |
| 7b | Dépôt effectif des 600 flyers artigiani | 13 nov |

**Semaine 2 — la plateforme devient réellement vendable**

| # | Étape | Date |
|---|---|---|
| 6b | Appels artisans : 15 cette semaine | 16 nov |
| 5b | Distribution flyers privati, passage 1 | 17 nov |
| 12 | **Stripe en mode Live**, vrai achat testé | 18 nov |
| 15 | Event `Purchase` branché sur l'achat de crédits | 19 nov |
| **🚦** | **PORTE 1 — couverture artisans à mi-parcours** | **20 nov** |

**Semaine 3 — on annonce la date**

| # | Étape | Date |
|---|---|---|
| 6b | Appels artisans : 15 cette semaine | 23 nov |
| 5b | Distribution flyers privati, passage 2 | 24 nov |
| 20 | **Reel « dal 4 dicembre » : la date devient publique** | 25 nov |
| 7c | Réassort grossistes | 26 nov |
| 11d | Vérifier le statut de la pré-inscription Twilio | 27 nov |

**Semaine 4 — closing**

| # | Étape | Date |
|---|---|---|
| 6b | Appels artisans : 15 cette semaine | 30 nov |
| 6c | Closing : relancer tous les artisans non inscrits | 1 déc |
| 5b | Distribution flyers privati, passage 3 | 2 déc |
| **🚦** | **PORTE 2 — Go/No-Go lancement** | **3 déc** |
| **🚦** | **Décision promesse SMS : version A ou B** | **3 déc** |

#### 🚦 PORTE 1 — ven 20 novembre
- [ ] ≥ 15 artisans inscrits
- [ ] 4 métiers sur 5 couverts
- [ ] 12 grossistes rencontrés, 600 flyers artigiani déposés
- [ ] P.IVA active, Stripe Live testé

Il reste deux semaines complètes après cette porte : la correction est simple et sans panique.
C'est exactement ce que le décalage a acheté.

#### 🚦 PORTE 2 — jeu 3 décembre
- [ ] P.IVA, Stripe Live, Pixel et `Purchase` validés
- [ ] Twilio en prod, vrai SMS reçu
- [ ] Données de test nettoyées, outil d'avis test retiré
- [ ] 6 créas prêtes, tableau UTM figé
- [ ] **30 à 40 artisans inscrits, 5 métiers couverts**
- [ ] 1 600 flyers distribués en 3 passages

**Règles de repli, par ordre de probabilité :**

1. **Compteur d'artisans entre 20 et 29** → le lancement part, Google Search Privati démarre
   le 7 décembre à 2 €/jour au lieu de 3,5 €, Meta Privati attend les 30. En dessous de 20
   artisans, aucune pub.
2. **Twilio toujours pas live** → communication version B (section 5). Improbable avec trois
   semaines de marge, mais la règle reste.
3. **Stripe Live KO** → le lancement organique part, toute la pub reste OFF.

---

### Phase 3 · Semaine de lancement — ven 4 déc → jeu 10 déc

| Jour | Date | Action | Pub |
|---|---|---|---|
| J1 | ven 4 déc | 🔴 **Manuvo è live** : Reel + carousel IG/FB/TikTok + post LinkedIn fondateur + message aux artisans inscrits + vérification des events | OFF |
| J2 | sam 5 déc | Reel démo « pubblica in 60 secondi » | OFF |
| J3 | dim 6 déc | Carousel « Come funziona in 3 passi » | OFF |
| J4 | **lun 7 déc** | Post confiance « zero contatti falsi » · **▶️ Google Search Privati ON** | **ON** |
| J5 | mar 8 déc | Story sondage et Q&A. **Immacolata, jour férié** : rien de B2B ce jour-là | ON |
| J6 | **mer 9 déc** | Post artisans + LinkedIn · **▶️ Meta Privati ON** | **ON** |
| J7 | jeu 10 déc | Récap + premier relevé de chiffres | ON |

Le 8 décembre est férié en Italie (Immacolata Concezione) : le pont du 7 au 8 met beaucoup de
monde à la maison, ce qui sert le côté privati, mais le post artisans et LinkedIn attendent le
mercredi 9.

### Phase 4 · Post-lancement — ven 11 déc → mer 6 janv

| # | Étape | Date |
|---|---|---|
| 32 | Rituel du lundi : revue des 8 KPI + plan de la semaine | 14, 21 déc · 4 janv |
| 33 | Relance des artisans inscrits mais inactifs | 15 déc |
| 34 | Récolter les 3 premiers avis vérifiés + 1 témoignage | 18 déc |
| 35 | ⚖️ Arbitrage budget pub (J+14 de Google) | 21 déc |
| 36 | ▶️ Meta Artigiani ON — conditionnel | 21 déc |
| 🎄 | **Période des fêtes : ralentissement assumé** | 22 déc → 6 janv |

**Pendant les fêtes :** contenu réduit à 2 posts par semaine, programmés avant le 22 décembre.
Pubs maintenues sans changement de budget, parce qu'une chaudière en panne entre Noël et le
Nouvel An est une urgence et que peu de concurrents locaux sont visibles. Terrain à zéro,
grossistes fermés. Seul réflexe à garder : toute demande servie en moins de 6 h.

### Phase 5 · Reprise et vague 2 — jeu 7 janv → fin janvier

| # | Étape | Date |
|---|---|---|
| 37 | Parrainage artisan « 10 crediti a te, 10 a lui » | 7 janv |
| 40 | 📊 Bilan 30 jours post-lancement | 8 janv |
| 38 | Preuve sociale : compteurs publics | 11 janv |
| 41 | 🚦 **PORTE 3** : ouvrir la vague 2 ou épaissir Rimini | 15 janv |
| 39 | Série hebdo : avant/après + « artigiano della settimana » | dès 18 janv |
| 42 | Écrire la « recette ville » + dupliquer le calendrier | 25 janv |

#### 🚦 PORTE 3 — les 3 conditions pour ouvrir Riccione / Cesena / Forlì
- [ ] ≥ 70 % des demandes reçoivent au moins un artisan
- [ ] Taux de rachat de crédits ≥ 40 %
- [ ] CAC artisan < 4 €

Sinon : on reste sur Rimini et on épaissit.

---

## 5. La promesse SMS : version A ou version B

L'Italie impose la pré-inscription du Sender ID alphanumérique, avec des données
d'entreprise, donc Twilio dépend de la P.IVA. Avec le décalage au 4 décembre, le dossier est
soumis le 12 novembre et vérifié le 27 : **la version A devient le scénario attendu.** Les
trois parades restent en place.

**Parade 1 : Twilio Verify** (étape 11b, pendant le déplacement). Twilio recommande Verify
pour les codes à usage unique parce qu'il prend en charge automatiquement les enregistrements
requis par pays, ce qui supprime la dépendance au Sender ID italien.

**Parade 2 : masquer ce qui n'est pas vrai** (étape 16b). Tant que Twilio tourne en mode dev,
le code s'affiche à l'écran et aucun faux numéro n'est bloqué. Le badge « Contatto
verificato » et la mention SMS de la FAQ sont conditionnés à la présence des variables Twilio.

**Parade 3 : communication version B.** Si Twilio n'est pas live le 3 décembre, le lancement
part quand même, sans un mot sur la vérification SMS. On s'appuie sur les piliers déjà vrais
en production :

- **rimborso dei crediti** si un contact débloqué est faux ou injoignable
- **recensioni reali**, possibles seulement après un vrai déblocage
- **P.IVA registrata** et badge artisan vérifié
- **massimo 3 artigiani** par demande

L'argument SMS devient un post à part entière le jour où il devient vrai. Le post J4 du
7 décembre a deux légendes, A et B, toutes deux prêtes dans le calendrier.

## 6. Ordre d'allumage des campagnes payantes

| # | Campagne | Démarrage | Budget | Destination | Condition |
|---|---|---|---|---|---|
| 1 | **Google Search · Privati** | lun 7 déc | 3,5 €/j ≈ 105 €/mois | `/pubblica` | Porte 2 passée, ≥ 30 artisans (2 €/j si 20 à 29) |
| 2 | **Meta · Privati** | mer 9 déc | 2 €/j ≈ 60 €/mois | `/pubblica` | Pixel vérifié, ≥ 30 artisans |
| 3 | **Meta · Artigiani** | lun 21 déc | 1,2 €/j ≈ 35 €/mois | `/signup` | Un métier manque **ou** > 30 % de demandes sans artisan |
| 4 | Google Search · Artigiani | — | 0 € | — | **Reste OFF** : volume de recherche trop faible |

Google avant Meta : l'intention est maximale et le coût par résultat lisible tout de suite.
Les privati avant les artigiani : après la chauffe, c'est la demande qui est rare.

## 7. Budget unique

| Période | Poste | Montant |
|---|---|---|
| 6 nov | Impression 1 600 flyers + 100 affiches A4 | 60 à 90 € une fois |
| Permanent | Outils (Canva, divers) | ~25 €/mois |
| 7 déc → | Google Search Privati | ~105 €/mois |
| 9 déc → | Meta Privati | ~60 €/mois |
| 21 déc → (conditionnel) | Meta Artigiani | ~35 €/mois |
| — | Google Artigiani | 0 € |

**Total en régime établi : ≈ 200 €/mois de pub + 25 € d'outils.** Aucun euro de pub avant le
7 décembre.

### Détail des supports imprimés

| Support | Quantité | Cible | Points de dépôt |
|---|---|---|---|
| Flyer A5 artigiani | 600 | Artisans | 12 grossistes, 40 à 50 par point : idrotermosanitari, colorifici, ferramenta, outillage |
| Flyer A5 privati | 900 | Particuliers | Agences immobilières, administrateurs de copropriété, bars, laveries, tabaccherie, panneaux d'immeubles |
| Affiche A4 | 100 | Les deux | Vitrines de commerçants, bacheche condominiali |

**Arithmétique du recrutement sur 4 semaines :** 60 appels à 25-35 % donnent 15 à 20
inscriptions, les 45 contacts préparés en ligne à 15 % en donnent 7, les flyers et grossistes
avec 3 semaines d'exposition et 3 passages en donnent 6 à 18. Total réaliste **28 à 45
artisans**, pour un objectif de 30 à 40. La marge existe enfin.

## 8. Tableau de bord (objectifs à 90 jours, soit début mars)

| Indicateur | Étape AARRR | Objectif |
|---|---|---|
| % de demandes avec ≥ 1 contact débloqué — **étoile polaire** | Activation | ≥ 70 % |
| Artisans inscrits | Acquisition | 150+ |
| Artisans actifs (ont acheté des crédits) | Revenue | 50+ |
| Demandes publiées | Acquisition | 300+ |
| Délai moyen de 1re réponse | Activation | < 6 h |
| Taux de rachat de crédits | Rétention | ≥ 40 % |
| CAC artisan | Acquisition | < 4 € |
| Part des inscrits venus du parrainage | Referral | ≥ 20 % |

## 9. Rituels quotidiens

**Pendant le déplacement, 14 oct au 5 nov (30 min, en ligne)**
- [ ] 1 contenu publié ou 3-5 Stories, selon le calendrier du jour
- [ ] Répondre à tous les commentaires et DM sous 2 h
- [ ] 3 messages de prospection artisan (Instagram, groupes, WhatsApp)
- [ ] Commenter 5 posts de comptes ou groupes locaux de Rimini
- [ ] 5 min : mettre à jour la liste des 60

**Au retour, 6 nov au 3 déc (1 h, terrain au rythme normal)**
- [ ] 3 appels d'artisans par jour, en commençant par les pré-accords
- [ ] 1 passage terrain par semaine (grossiste, agence immobilière, commerçant)
- [ ] 1 contenu publié ou 3-5 Stories
- [ ] Répondre aux commentaires et DM sous 2 h
- [ ] 5 min : mettre à jour le compteur d'artisans inscrits

**Après le lancement, à partir du 4 déc**
- [ ] Toute demande publiée doit trouver un artisan en moins de 6 h, au téléphone si besoin
- [ ] Répondre aux commentaires et DM sous 2 h
- [ ] 1 contenu ou 3-5 Stories
- [ ] Lundi : revue des 8 KPI, 20 min

## 10. Convention de liens (rappel)

- Privati payant : `/pubblica?utm_source=google|facebook|instagram&utm_medium=cpc&utm_campaign=lancio_privati&utm_content=…`
- Artigiani payant : `/signup?utm_source=facebook&utm_medium=cpc&utm_campaign=lancio_artigiani&utm_content=…`
- Flyers : QR vers `/pubblica?utm_source=flyer&utm_medium=print&utm_campaign=lancio_privati`
  et `/signup?utm_source=flyer&utm_medium=print&utm_campaign=lancio_artigiani`
- Organique : `utm_medium=social`

Détail complet dans `MARKETING.md`. Changer la nomenclature en route rend les stats illisibles.
