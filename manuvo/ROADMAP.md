# Manuvo — Roadmap Marketing (itinéraire unique)

> **Source de vérité unique du plan marketing Manuvo.**
> Ce fichier dit *quoi* et *pourquoi*. Le calendrier Notion dit *quand*.
> Rien d'autre ne fait foi : ni les artifacts, ni `SOCIAL.md`, ni une note ailleurs.

- **Calendrier opérationnel (Notion)** : « 📅 Calendrier Marketing Manuvo — itinéraire unique »
- **CRM artisans (Notion)** : « CRM Artigiani — Manuvo (Rimini) », alimenté par le workflow n8n « prospezione artigiani V4 - Google places to Notion » (Google Places → qualification Claude → Notion). C'est lui qui porte l'état de chaque artisan, pas un Google Sheet.
- **Zone vague 1** : Rimini + 20 km · **Langue** : italien (tu) · **Handle** : `manuvo.it`
- **Site** : https://manuvo.automa-ia.net
- **Jour J : vendredi 22 janvier 2027**
- Version 5, 14 octobre 2026 : P.IVA en janvier 2027 (régime forfettario), lancement unique le 22 janvier
- Révision du 22 octobre 2026 : étape 3 avancée au 15 oct, liste des 60 remplacée par le CRM Notion, et **5 crediti** comme point d'entrée unique (bienvenue pour tous, + 5 au parrain seulement)

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
| CRM Artigiani (Notion) | État de chaque artisan : qualification, contact, intérêt, inscription |
| **`ROADMAP.md` (ce fichier)** | **L'ordre des opérations** |

## 2. Les 3 principes qui tranchent tous les arbitrages

1. **L'offre avant la demande.** Pas un euro de pub avant 30 artisans inscrits.
   Une demande publiée qui ne trouve aucun artisan détruit la confiance définitivement.
2. **Pas de pub, et pas d'argument, avant que la promesse soit vraie.** Toute la
   communication promet « contatti verificati via SMS » : sans Twilio en production,
   l'argument ne sort pas. Stripe Live conditionne le revenu.
3. **Une ville à la fois.** Rimini jusqu'à la densité, puis on duplique la recette.

## 3. Pourquoi la date passe au 22 janvier 2027

Trois contraintes se sont ajoutées après la version 1, dans cet ordre :

1. **Déplacement du 14 octobre au 5 novembre.** Aucune action terrain pendant 23 jours.
2. **La P.IVA ne peut pas s'ouvrir à distance.**
3. **La P.IVA doit s'ouvrir en janvier 2027**, sur conseil du commercialista Fiscozen : le taux
   réduit de 5 % du régime forfettario s'applique sur les 5 premières périodes d'imposition.
   Ouvrir en novembre 2026 ferait compter 2026 comme première année pour deux mois d'activité,
   soit une année pleine d'avantage perdue. Janvier 2027 donne 2027 à 2031 complètes.

La troisième commande tout le reste, parce que **Stripe Live et Twilio dépendent de la P.IVA** :
sans Stripe il n'y a pas de modèle économique, et sans Twilio la promesse « contatti verificati
via SMS » n'est pas vraie. Un lancement avant la P.IVA serait soit sans revenu, soit sans sa
promesse centrale.

**Pourquoi le 22 janvier et pas plus tard.** La chaîne réelle, en comptant large :

| Étape | Date |
|---|---|
| Dépôt de l'ouverture avec Fiscozen | lun 4 janv |
| P.IVA active | ~ven 8 janv |
| P.IVA dans les pages légales | mer 13 janv |
| Stripe Live, vrai achat testé | jeu 14 janv |
| Event `Purchase` + Twilio en production | ven 15 janv |
| Porte 2, Go/No-Go | jeu 21 janv |
| **Lancement** | **ven 22 janv** |

Huit jours de marge après Stripe Live, deux semaines après l'activation de la P.IVA. Repousser
à février n'achèterait qu'une semaine de marge supplémentaire sur un seul point, Twilio, et
coûterait deux semaines de revenu.

**Pourquoi novembre et décembre ne sont pas perdus.** Tout ce qui ne dépend pas de la P.IVA
avance à plein : contenu, technique, créas, flyers, et surtout le travail terrain. La seule
adaptation est de ne pas faire inscrire les artisans trop tôt. Un artisan inscrit en novembre
qui ne voit aucune demande pendant huit semaines se désintéresse. On construit donc une
**liste de pré-inscription** en novembre et décembre, et on la convertit en inscriptions en
janvier, juste avant l'ouverture.

| | Novembre et décembre | Janvier |
|---|---|---|
| Objet du terrain | **Pré-inscription** : nom, métier, téléphone, accord de rappel | **Inscription** réelle sur la plateforme |
| Objectif | 50 pré-inscrits au 18 décembre | 30 à 40 inscrits au 21 janvier |
| Taux de conversion retenu | — | 60 à 70 % d'une pré-inscription obtenue de vive voix |

## 4. L'itinéraire en 4 blocs d'exécution

### Bloc A · Avant le départ — lun 12 au mar 13 oct

| # | Étape | Date | Pourquoi maintenant |
|---|---|---|---|
| 1 | Figer l'itinéraire unique | 12 oct | Fait |
| 2 | Fiche Google Business Profile | 13 oct | 30 min, gratuit, commence à référencer pendant l'absence |
| 2b | **Caler avec Fiscozen le dépôt du 4 janvier** | 16 oct | Et récupérer la liste des pièces à préparer pendant le déplacement |
| 0 | **Deux questions : Fiscozen sur le début d'activité, Twilio sur Verify sans P.IVA** | 15 oct | Ne bloquent pas le plan, mais décident de l'argument SMS du lancement |

### Bloc B · Pendant le déplacement — mer 14 oct au jeu 5 nov · 100 % en ligne

| # | Étape | Date | Type |
|---|---|---|---|
| 4 | Rejoindre 7 groupes Facebook locaux | 14 oct | En ligne |
| 3 | Remplir le CRM Artigiani jusqu'à 60 lignes (workflow `prospezione artigiani V4` + ajouts manuels) | 15 oct | Bureau |
| 6a | **Prospection artisans par message : 15 par semaine** | 16, 23, 30 oct | En ligne |
| 10 | Répondre aux « cerco idraulico » dans les groupes | 19, 26 oct · 2 nov | En ligne |
| 11a | Préparer le compte Twilio (création, crédit de 20 €, lecture des exigences italiennes) | 20 oct | Technique |
| 14 | Meta Pixel actif, 3 events vérifiés | 22 oct | Technique |
| 11b | **Basculer le code SMS sur Twilio Verify** | 23 oct | Technique |
| 8 | ~~Définir l'offre d'amorçage~~ **tranché le 22 oct : 5 crediti offerts (10 €, 1 contact)** | 22 oct | Décision |
| 17 | Comptes pub prêts, 3 campagnes en pause | 28 oct | Pub |
| 18 | 6 créas publicitaires | 30 oct | Pub |
| 16 | Nettoyage de la base + retrait de l'outil d'avis test | 2 nov | Technique |
| 16b | Masquer le badge « Contatto verificato » tant que Twilio n'est pas live | 2 nov | Technique |
| 8b | **Ouvrir la pré-inscription dans le CRM** (`Pre-iscritto` + `Richiamato gennaio` en place, messages types dans `SOCIAL.md`) | 2 nov | Terrain |
| 19 | Tableau UTM figé | 3 nov | Pub |
| 9 | Contenu : 3 posts par semaine, CTA doux | 14 oct → 2 nov | Contenu |

**Objectif de sortie :** 45 artisans contactés avec un pré-accord d'appel, liste de 60
complète, tout le technique non bloquant fait, campagnes construites et en pause.

### Bloc C · Retour — jeu 5 nov au ven 18 déc · 6 semaines de pré-inscription

Objet du terrain pendant cette phase : **construire une liste de 50 artisans pré-inscrits**,
pas les inscrire. Rythme calme, 12 contacts par semaine.

| # | Étape | Date |
|---|---|---|
| 5a | Commander les 1 600 flyers | 6 nov |
| 6b | Pré-inscription artisans : 12 contacts par semaine | 9, 16, 23, 30 nov · 7, 14 déc |
| 7a | Tour des 12 grossistes : accord de dépôt, sans flyers | 10 nov |
| 11c | **Test Twilio Verify** depuis un compte personnel | 12 nov |
| 7b | Dépôt effectif des 600 flyers artigiani | 13 nov |
| 5b | Distribution flyers privati, passage 1 | 17 nov |
| 20 | Contenu de pré-lancement, 3 posts par semaine | 18 nov → 18 déc |
| 5b | Distribution flyers privati, passage 2 | 1 déc |
| 7c | Réassort grossistes | 18 déc |
| **🚦** | **PORTE 1 — bilan terrain avant les fêtes** | **18 déc** |

#### 🚦 PORTE 1 — ven 18 décembre
- [ ] **≥ 50 artisans pré-inscrits** (nom, métier, téléphone, accord de rappel)
- [ ] 5 métiers représentés dans la liste
- [ ] 12 grossistes rencontrés deux fois, 600 flyers artigiani déposés
- [ ] 900 flyers privati distribués en 2 passages
- [ ] Twilio testé via Verify
- [ ] Tout le technique non bloquant terminé

**Si la liste compte moins de 30 pré-inscrits :** passer les deux premières semaines de janvier
en visites physiques directes plutôt qu'au téléphone, et accepter de lancer avec 20 à 25
artisans en appliquant la règle de budget réduit de la Porte 2.

### Fêtes — jeu 24 déc au dim 3 janv

Contenu réduit à 2 posts par semaine, programmés avant le 24. Terrain à zéro, grossistes
fermés, artisans en congé. Rien d'autre : c'est une pause décidée, pas un trou.

### Bloc D · Sprint final — lun 4 au jeu 21 janv

| # | Étape | Date |
|---|---|---|
| 13a | **Déposer l'ouverture de la P.IVA avec Fiscozen** | 4 janv |
| 6d | Sprint d'inscription : convertir la liste, semaine 1 | 5 janv |
| 6d | Sprint d'inscription : convertir la liste, semaine 2 | 11 janv |
| 43 | Prévenir les inscrits : on ouvre le 22, vérifier métier, zone et notifications | 11 janv |
| 13b | Inscrire la P.IVA dans les pages légales | 13 janv |
| 20 | **Reel « dal 22 gennaio » : la date devient publique** | 13 janv |
| 12 | **Stripe en mode Live**, vrai achat testé | 14 janv |
| 5b | Distribution flyers privati, passage 3 | 14 janv |
| 15 | Event `Purchase` branché | 15 janv |
| 11e | Activer Twilio en production, réactiver le badge | 15 janv |
| 20 | Story countdown + Q&A | 15 janv |
| 6c | Closing final des pré-inscrits restants | 18 janv |
| 20 | Post fondateur « perché ho creato Manuvo » | 18 janv |
| 7e | Dernier passage grossistes | 19 janv |
| 20 | Countdown J-3, J-2, J-1 | 19, 20, 21 janv |
| **🚦** | **PORTE 2 — Go/No-Go lancement** | **21 janv** |
| **🚦** | **Décision promesse SMS : version A ou B** | **21 janv** |

#### 🚦 PORTE 2 — jeu 21 janvier
- [ ] P.IVA active et dans les pages légales
- [ ] Stripe Live, vrai achat testé
- [ ] Event `Purchase` vérifié
- [ ] Twilio en production, vrai SMS reçu, badge réactivé
- [ ] Pixel actif, 3 events vérifiés
- [ ] Données de test nettoyées, outil d'avis test retiré
- [ ] 6 créas prêtes, tableau UTM figé
- [ ] **30 à 40 artisans inscrits, 5 métiers couverts**
- [ ] 1 600 flyers distribués en 3 passages

**Règles de repli :**

1. **Compteur d'artisans entre 20 et 29** → le lancement part, Google Search Privati démarre
   le 25 janvier à 2 €/jour au lieu de 3,5 €, Meta Privati attend les 30. En dessous de 20
   artisans, aucune pub.
2. **Twilio pas live** → communication version B (section 5). Improbable avec la P.IVA active
   depuis le 8 janvier et Verify déjà codé.
3. **Stripe Live KO** → c'est le seul cas qui décale le lancement, parce qu'un lancement sans
   recharge de crédits n'a pas de modèle économique. Repousser au vendredi 29 janvier.

### Phase 3 · Semaine de lancement — ven 22 janv → jeu 28 janv

| Jour | Date | Action | Pub |
|---|---|---|---|
| J1 | ven 22 janv | 🔴 **Manuvo è live** : Reel + carousel IG/FB/TikTok + post LinkedIn fondateur + message aux artisans inscrits + vérification des events | OFF |
| J2 | sam 23 janv | Reel démo « pubblica in 60 secondi » | OFF |
| J3 | dim 24 janv | Carousel « Come funziona in 3 passi » | OFF |
| J4 | **lun 25 janv** | Post confiance « zero contatti falsi » · **▶️ Google Search Privati ON** | **ON** |
| J5 | mar 26 janv | Story sondage et Q&A | ON |
| J6 | **mer 27 janv** | Post artisans + LinkedIn · **▶️ Meta Privati ON** | **ON** |
| J7 | jeu 28 janv | Récap + premier relevé de chiffres | ON |

Tout est vrai le premier jour : paiements actifs, vérification SMS en place, P.IVA affichée.

### Phase 4 · Post-lancement — ven 29 janv → lun 15 févr

| # | Étape | Date |
|---|---|---|
| — | 🚦 Bilan semaine 1 + première facturation | 29 janv |
| 32 | Rituel du lundi : revue des 8 KPI + plan de la semaine | 1, 8, 15 févr |
| 33 | Relance des artisans inscrits mais inactifs | 2 févr |
| 34 | Récolter les 3 premiers avis vérifiés + 1 témoignage | 5 févr |
| — | 💳 Vérifier les premiers encaissements avec Fiscozen | 5 févr |
| 35 | ⚖️ Arbitrage budget pub (J+14 de Google) | 8 févr |
| 36 | ▶️ Meta Artigiani ON — conditionnel | 8 févr |
| 37 | Parrainage artisan « 5 crediti per te » (au parrain seulement, le filleul a ses 5 de bienvenue) | 11 févr |
| 38 | Preuve sociale : compteurs publics | 15 févr |

### Phase 5 · Mesure et vague 2 — lun 22 févr → lun 29 mars

| # | Étape | Date |
|---|---|---|
| 39 | Série hebdo : avant/après + « artigiano della settimana » | dès 22 févr |
| 40 | 📊 Bilan 30 jours post-lancement | 22 févr |
| 41 | 🚦 **PORTE 3** : ouvrir la vague 2 ou épaissir Rimini | 22 mars |
| 42 | Écrire la « recette ville » + dupliquer le calendrier | 29 mars |

#### 🚦 PORTE 3 — les 3 conditions pour ouvrir Riccione / Cesena / Forlì
- [ ] ≥ 70 % des demandes reçoivent au moins un artisan
- [ ] Taux de rachat de crédits ≥ 40 %
- [ ] CAC artisan < 4 €

Sinon : on reste sur Rimini et on épaissit.

---

## 5. La promesse SMS : version A ou version B

L'Italie impose la pré-inscription du Sender ID alphanumérique, avec des données
d'entreprise, donc cette voie dépend de la P.IVA. Avec la P.IVA active le 8 janvier et le code
déjà basculé sur Verify, **la version A est le scénario attendu**. Les trois parades restent
en place, et le test du 12 novembre dit laquelle s'applique.

**Parade 1 : Twilio Verify** (étape 11b, pendant le déplacement). Twilio recommande Verify
pour les codes à usage unique parce qu'il prend en charge automatiquement les enregistrements
requis par pays, ce qui supprime la dépendance au Sender ID italien.

**Parade 2 : masquer ce qui n'est pas vrai** (étape 16b). Tant que Twilio tourne en mode dev,
le code s'affiche à l'écran et aucun faux numéro n'est bloqué. Le badge « Contatto
verificato » et la mention SMS de la FAQ sont conditionnés à la présence des variables Twilio.

**Parade 3 : communication version B.** Si Twilio n'est pas live le 21 janvier, le lancement
part quand même, sans un mot sur la vérification SMS. On s'appuie sur les piliers déjà vrais
en production :

- **rimborso dei crediti** si un contact débloqué est faux ou injoignable
- **recensioni reali**, possibles seulement après un vrai déblocage
- **P.IVA registrata** et badge artisan vérifié
- **massimo 3 artigiani** par demande

L'argument SMS devient un post à part entière le jour où il devient vrai. Le post J4 du
25 janvier a deux légendes, A et B, toutes deux prêtes dans le calendrier.

## 6. Ordre d'allumage des campagnes payantes

| # | Campagne | Démarrage | Budget | Destination | Condition |
|---|---|---|---|---|---|
| 1 | **Google Search · Privati** | lun 25 janv | 3,5 €/j ≈ 105 €/mois | `/pubblica` | Porte 2 passée, ≥ 30 artisans (2 €/j si 20 à 29) |
| 2 | **Meta · Privati** | mer 27 janv | 2 €/j ≈ 60 €/mois | `/pubblica` | Pixel vérifié, ≥ 30 artisans |
| 3 | **Meta · Artigiani** | lun 8 févr | 1,2 €/j ≈ 35 €/mois | `/signup` | Un métier manque **ou** > 30 % de demandes sans artisan |
| 4 | Google Search · Artigiani | — | 0 € | — | **Reste OFF** : volume de recherche trop faible |

Google avant Meta : l'intention est maximale et le coût par résultat lisible tout de suite.
Les privati avant les artigiani : après la chauffe, c'est la demande qui est rare.

## 7. Budget unique

| Période | Poste | Montant |
|---|---|---|
| 6 nov | Impression 1 600 flyers + 100 affiches A4 | 60 à 90 € une fois |
| Permanent | Outils (Canva, divers) | ~25 €/mois |
| 25 janv → | Google Search Privati | ~105 €/mois |
| 27 janv → | Meta Privati | ~60 €/mois |
| 8 févr → (conditionnel) | Meta Artigiani | ~35 €/mois |
| — | Google Artigiani | 0 € |

**Total en régime établi : ≈ 200 €/mois de pub + 25 € d'outils.** Aucun euro de pub avant le
25 janvier : d'ici là le budget se limite à l'impression et aux outils.

### Détail des supports imprimés

| Support | Quantité | Cible | Points de dépôt |
|---|---|---|---|
| Flyer A5 artigiani | 600 | Artisans | 12 grossistes, 40 à 50 par point : idrotermosanitari, colorifici, ferramenta, outillage |
| Flyer A5 privati | 900 | Particuliers | Agences immobilières, administrateurs de copropriété, bars, laveries, tabaccherie, panneaux d'immeubles |
| Affiche A4 | 100 | Les deux | Vitrines de commerçants, bacheche condominiali |

**Arithmétique du recrutement, en deux temps.** Novembre et décembre : 6 semaines à 12
contacts donnent 72 contacts travaillés, dont une cinquantaine acceptent la pré-inscription,
alimentés en plus par les 45 contacts préparés en ligne pendant le déplacement et par les
grossistes. Janvier : une pré-inscription obtenue de vive voix se convertit à 60-70 %, donc
une liste de 50 donne **30 à 35 inscrits** au 21 janvier, plus les inscriptions spontanées
venues des flyers et du contenu. Objectif 30 à 40 : atteint avec de la marge, et sans jamais
dépasser 12 contacts par semaine.

## 8. Tableau de bord (objectifs à 90 jours, soit fin avril 2027)

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
- [ ] 5 min : mettre à jour le CRM Artigiani (Stato, Ultimo contatto, Follow-up J+4)

**Au retour, 6 nov au 18 déc (45 min, terrain au rythme calme)**
- [ ] 2 à 3 contacts d'artisans par jour pour la pré-inscription
- [ ] 1 passage terrain par semaine (grossiste, agence immobilière, commerçant)
- [ ] 1 contenu publié ou 3-5 Stories
- [ ] Répondre aux commentaires et DM sous 2 h
- [ ] 5 min : mettre à jour le compteur d'artisans inscrits

**Sprint de janvier, 4 au 21 janv (1 h 30)**
- [ ] 5 appels de conversion par jour sur la liste des pré-inscrits
- [ ] Vérifier métier, zone et notifications de chaque nouvel inscrit
- [ ] 1 contenu publié ou 3-5 Stories
- [ ] 5 min : mettre à jour le compteur d'inscrits

**Après le lancement, à partir du 22 janv**
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
