# Manuvo — Roadmap Marketing (itinéraire unique)

> **Source de vérité unique du plan marketing Manuvo.**
> Ce fichier dit *quoi* et *pourquoi*. Le calendrier Notion dit *quand*.
> Rien d'autre ne fait foi : ni les artifacts, ni `SOCIAL.md`, ni une note ailleurs.

- **Calendrier opérationnel (Notion)** : « 📅 Calendrier Marketing Manuvo — itinéraire unique »
- **Page de référence (Notion)** : « 🗺️ Roadmap Marketing Manuvo — itinéraire unique »
- **Zone vague 1** : Rimini + 20 km · **Langue** : italien (tu) · **Handle** : `manuvo.it`
- **Site** : https://manuvo.automa-ia.net
- Dernière mise à jour : 12 octobre 2026

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
| Artifact « Script chiamata artigiani » | Script d'appel, utilisé à l'étape 6 |
| Artifact « Manuvo · Volantini A5 » | Flyers, utilisés à l'étape 5 |
| `SOCIAL.md` | Légendes italiennes + journal de publication |
| `MARKETING.md` | Pixel Meta + convention UTM |
| **`ROADMAP.md` (ce fichier)** | **L'ordre des opérations** |

## 2. Les 3 principes qui tranchent tous les arbitrages

1. **L'offre avant la demande.** Pas un euro de pub avant 30 artisans inscrits.
   Une demande publiée qui ne trouve aucun artisan détruit la confiance définitivement.
2. **Pas de pub avant que la promesse soit vraie.** Toute la communication promet
   « contatti verificati via SMS, zero fake » : sans Twilio en production, la pub serait
   mensongère. Stripe Live conditionne le revenu.
3. **Une ville à la fois.** Rimini jusqu'à la densité, puis on duplique la recette.
   200 €/mois étalés sur l'Italie ne produisent rien.

---

## 3. L'itinéraire, étape par étape

### Phase 1 · Chauffe — lun 12 oct → dim 1 nov · budget pub : 0 €

| # | Étape | Date | Type |
|---|---|---|---|
| 1 | Figer l'itinéraire unique (ce fichier + calendrier Notion) | 12 oct | Jalon |
| 2 | Fiche Google Business Profile Manuvo | 13 oct | Technique |
| 3 | Liste de 40 artisans Rimini (5 métiers prioritaires) | 14 oct | Terrain |
| 4 | Rejoindre 5 groupes Facebook Rimini + 2 groupes artigiani | 14 oct | Terrain |
| 5 | Flyers A5 (recto artisan / recto privato) + QR → 200 ex | 15 oct | Terrain |
| 6 | Appels artisans : 10 par semaine (script dédié) | 16, 23, 30 oct · 6, 13 nov | Terrain |
| 7 | Dépôt de flyers chez 5 grossistes | 19 oct | Terrain |
| 8 | Fixer l'offre d'amorçage (crédits offerts aux 100 premiers) | 26 oct | Technique |
| 9 | Contenu chauffe : 3 posts/semaine, CTA doux « seguici » | 12 oct → 1 nov | Contenu |

**Objectif de sortie** : 30 artisans inscrits, 5 métiers couverts (idraulico, elettricista,
imbianchino, muratore, falegname), comptes sociaux vivants, fiche Google en ligne.
**Seule dépense de la phase** : ~35 € d'impression.

#### 🚦 PORTE 1 — dim 1 nov
- [ ] ≥ 30 artisans inscrits
- [ ] 5 métiers couverts
- [ ] 3 posts/semaine tenus + fiche Google en ligne
- [ ] 200 flyers distribués

**Si < 20 artisans inscrits** : prolonger la chauffe d'une semaine et décaler tout
l'itinéraire de 7 jours. Ne jamais lancer la pub sur une offre vide.

---

### Phase 2 · Pré-lancement technique — lun 2 nov → jeu 19 nov · budget pub : 0 €

| # | Étape | Date | Bloquant |
|---|---|---|---|
| 11 | Twilio en production (SMS réel, test bout en bout) | 2 nov | **Oui** |
| 12 | Stripe Live : KYC + IBAN + clés live + webhook live + achat testé | 4 nov | **Oui** |
| 13 | P.IVA dans les pages légales | 6 nov | **Oui** |
| 14 | Meta Pixel créé + ID dans Vercel + 3 events vérifiés | 9 nov | **Oui** |
| 15 | Event `Purchase` branché sur l'achat de crédits | 11 nov | Non |
| 16 | Nettoyage base + retrait de l'outil admin « +3 avis test » | 12 nov | **Oui** |
| 17 | Comptes pub prêts, 3 campagnes créées **en pause** | 13 nov | Non |
| 18 | Créas pub : 6 visuels (3 privati / 3 artigiani), 1:1 + 4:5 | 16 nov | Non |
| 19 | Tableau UTM figé (une seule nomenclature) | 18 nov | Non |
| 20 | Contenu pré-lancement : countdown, waitlist, révélation SMS | 5 → 19 nov | Contenu |

Détails techniques : `docs/TWILIO.md`, `MARKETING.md`, `BACKLOG.md`.
Piège Stripe connu : ne pas laisser une URL `vercel.app` qui redirige en 308 dans le webhook.

#### 🚦 PORTE 2 — jeu 19 nov (checklist 8 points)
- [ ] Twilio en prod, SMS testé
- [ ] Stripe Live, achat réel testé
- [ ] P.IVA dans les pages légales
- [ ] Pixel actif, 3 events vérifiés (+ `Purchase`)
- [ ] ≥ 30 artisans inscrits, 5 métiers couverts
- [ ] Données de test nettoyées, outil d'avis test retiré
- [ ] 6 créas pub prêtes
- [ ] Tableau UTM figé

**Règle de décision** : si Twilio **ou** Stripe Live n'est pas prêt → le lancement
organique part quand même, mais **toute la pub reste OFF**.

---

### Phase 3 · Semaine de lancement — ven 20 nov → jeu 26 nov

| Jour | Date | Action | Pub |
|---|---|---|---|
| J1 | ven 20 nov | 🔴 **Manuvo è live** : Reel + carousel IG/FB/TikTok + post LinkedIn fondateur + message aux 30 artisans inscrits + vérification des events | OFF |
| J2 | sam 21 nov | Reel démo « pubblica in 60 secondi » | OFF |
| J3 | dim 22 nov | Carousel « Come funziona in 3 passi » (+ recyclage FB) | OFF |
| J4 | **lun 23 nov** | Post confiance « zero contatti falsi » · **▶️ Google Search Privati ON** | **ON** |
| J5 | mar 24 nov | Post artisans + variante LinkedIn · suivi manuel : toute demande servie en < 6 h | ON |
| J6 | **mer 25 nov** | Story sondage / Q&A · **▶️ Meta Privati ON** | **ON** |
| J7 | jeu 26 nov | Récap + CTA · premier relevé de chiffres | ON |

Le jour J reste à **vendredi 20 novembre** (date déjà posée dans le calendrier Notion) :
le week-end est le moment où les problèmes domestiques se déclarent, et les campagnes
payantes démarrent le lundi, quand on peut les surveiller.

---

### Phase 4 · Post-lancement — ven 27 nov → dim 20 déc

| # | Étape | Date |
|---|---|---|
| 32 | Rituel du lundi : revue des 8 KPI + plan de la semaine (20 min) | chaque lundi |
| 33 | Relance des artisans inscrits mais inactifs | 1 déc |
| 34 | Récolter les 3 premiers avis vérifiés + 1 témoignage | 4 déc |
| 35 | ⚖️ Arbitrage budget pub (J+14) : garder le coût par résultat le plus bas | 7 déc |
| 36 | ▶️ Meta Artigiani ON — **conditionnel** | 7 déc |
| 37 | Parrainage artisan « 10 crediti a te, 10 a lui » | 9 déc |
| 38 | Preuve sociale : compteurs publics (chiffres réels uniquement) | 11 déc |
| 39 | Série hebdo : avant/après de chantier + « artigiano della settimana » | dès 14 déc |

**Cadence de croisière** : 3-4 TikTok/Reels · 1 carousel IG · 3 Facebook (dont groupes
locaux) · 1-2 LinkedIn par semaine. Règle de production : **1 vidéo tournée = 4 posts**.

---

### Phase 5 · Mesure & vague 2 — lun 21 déc → janvier

| # | Étape | Date |
|---|---|---|
| 40 | Bilan 30 jours post-lancement vs objectifs | 21 déc |
| 41 | 🚦 **PORTE 3** : ouvrir la vague 2 ou épaissir Rimini | 21 déc |
| 42 | Écrire la « recette ville » + dupliquer le calendrier | 4 janv |

#### 🚦 PORTE 3 — les 3 conditions pour ouvrir Riccione / Cesena / Forlì
- [ ] ≥ 70 % des demandes reçoivent au moins un artisan
- [ ] Taux de rachat de crédits ≥ 40 % (les artisans reviennent sans qu'on les pousse)
- [ ] CAC artisan < 4 €

Sinon : on reste sur Rimini et on épaissit.

---

## 4. Ordre d'allumage des campagnes payantes

C'est le point qui créait le plus de confusion. Il n'y a **qu'un seul ordre valable** :

| # | Campagne | Démarrage | Budget | Destination | Condition |
|---|---|---|---|---|---|
| 1 | **Google Search · Privati** | lun 23 nov | 3,5 €/j ≈ 105 €/mois | `/pubblica` | Porte 2 passée |
| 2 | **Meta · Privati** | mer 25 nov | 2 €/j ≈ 60 €/mois | `/pubblica` | Pixel actif |
| 3 | **Meta · Artigiani** | lun 7 déc | 1,2 €/j ≈ 35 €/mois | `/signup` | Un métier manque **ou** > 30 % de demandes sans artisan |
| 4 | Google Search · Artigiani | — | 0 € | — | **Reste OFF** : volume de recherche trop faible |

Pourquoi Google avant Meta : l'intention est maximale (quelqu'un qui tape
« idraulico rimini » a le problème maintenant) et le coût par résultat est lisible
immédiatement. Meta arrive 2 jours plus tard pour pouvoir comparer les deux proprement.

Pourquoi les privati avant les artigiani : après la chauffe, c'est la **demande** qui
est rare, pas l'offre. On paie pour ce qui manque.

### Budget unique

| Période | Poste | Montant |
|---|---|---|
| Octobre (chauffe) | Impression flyers 200 ex | ~35 € (one-shot) |
| Permanent | Outils (Canva, divers) | ~25 €/mois |
| 23 nov → | Google Search Privati | ~105 €/mois |
| 25 nov → | Meta Privati | ~60 €/mois |
| 7 déc → (conditionnel) | Meta Artigiani | ~35 €/mois |
| — | Google Artigiani | 0 € |

**Total en régime établi : ≈ 200 €/mois de pub + 25 € d'outils.**
La répartition 80/60/35/25 de l'ancien plan de lancement est **remplacée** par ce tableau.

**Règle d'or** : un canal payant reste actif seulement s'il coûte moins cher qu'un artisan
recruté à la main ou qu'une demande obtenue gratuitement sur le terrain. Sinon on coupe
et on remet tout sur le canal gagnant. Avec 200 €/mois, on concentre, on ne répartit pas.

---

## 5. Tableau de bord (objectifs 90 jours)

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

Le **CAC est l'inconnue n°1**. Tant qu'il n'est pas connu, chaque euro de pub est un test,
pas un investissement.

---

## 6. Rituel quotidien (45 min, non négociable)

- [ ] 1 contenu publié ou 3-5 Stories, selon le calendrier du jour
- [ ] Répondre à tous les commentaires et DM sous 2 h
- [ ] Commenter 5 posts de comptes ou groupes locaux de Rimini
- [ ] 2 appels d'artisans (phases chauffe et pré-lancement)
- [ ] 5 min : relever les chiffres du jour

## 7. Convention de liens (rappel)

- Privati payant : `/pubblica?utm_source=google|facebook|instagram&utm_medium=cpc&utm_campaign=lancio_privati&utm_content=…`
- Artigiani payant : `/signup?utm_source=facebook&utm_medium=cpc&utm_campaign=lancio_artigiani&utm_content=…`
- Organique : `utm_medium=social`

Détail complet dans `MARKETING.md`. Changer la nomenclature en route rend les stats illisibles.
