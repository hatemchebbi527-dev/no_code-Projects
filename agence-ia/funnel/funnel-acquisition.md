# Funnel d'acquisition AutomaIA

> Le chemin complet du prospect inconnu jusqu'au client qui paie et reste.
> Notes stratégiques en français (usage interne Hatem). Toute copy client-facing en italien, vouvoiement (Lei), voix `agence-ia/marque/brand_voice.md`.
> Cible : cabinets de professionnels libéraux (commercialisti, avvocati, puis medici) à Rimini et en Emilia-Romagna.
> Objectif du funnel : décrocher le premier client payant, puis en faire une machine répétable qui privilégie le revenu récurrent.

---

## 1. Vue d'ensemble du funnel

Cinq étapes. Chacune a un seul objectif, un seul actif principal, un seul CTA. On ne mélange jamais deux appels à l'action.

```
   FROID                                                                 CHAUD
   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │   1      │   │   2      │   │   3      │   │   4      │   │   5      │
   │ ATTIRER  │──▶│ CAPTER   │──▶│ QUALIFIER│──▶│ CONVERTIR│──▶│ FIDÉLISER│
   │ (TOFU)   │   │ (MOFU)   │   │ (audit)  │   │ (BOFU)   │   │ + upsell │
   └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
   LinkedIn +     Lead magnet    Audit gratuit  Démo + propo   Récurrent +
   local +        (guida 5       20 min         + objections   parrainage +
   contenu        automazioni)   diagnostic     + pricing      montée gamme

   CTA:           CTA:           CTA:           CTA:           CTA:
   "Suivez /      "Scarichi la   "Prenoti       "Iniziamo      "Chi conosce
    parliamone"   guida"         l'audit"       insieme"        come Lei?"
```

**Le principe directeur :** on mène toujours par la douleur administrative (temps perdu), jamais par la technologie. On rassure sur la confidentialité à chaque étape. On chiffre le bénéfice (jusqu'à 10h/semaine) dès qu'on peut.

**Modèle économique visé à la sortie du funnel :** forfait de mise en place (one-time) + abonnement mensuel (récurrent). Le récurrent est la vraie cible, c'est lui qui crée un revenu prévisible.

---

## 2. Les métriques du funnel (à suivre chaque semaine)

Tableau de bord minimal. Sans chiffres, on pilote à l'aveugle. À tenir dans un Google Sheet ou le dashboard AutomaIA.

| Étape | Métrique clé | Objectif de départ (mois 1) | Taux de passage cible |
|---|---|---|---|
| 1. Attirer | Vues de post + nouvelles connexions ciblées | 30 connexions ICP/semaine | — |
| 2. Capter | Téléchargements du lead magnet | 10 leads/mois | ~10% des connexions |
| 3. Qualifier | Audits gratuits réservés | 4 audits/mois | ~40% des leads chauds |
| 4. Convertir | Propositions envoyées → signées | 1 client signé | ~25% des audits |
| 5. Fidéliser | Rétention abonnement + parrainages | 100% rétention M1 | 1 référence / client satisfait |

> Repère réaliste : pour 1 client signé, il faut viser environ 4 audits, environ 10 leads, environ 100 connexions ciblées. Le haut du funnel doit rester alimenté en continu. C'est là que 80% de l'effort se joue au début.

---

## 3. Étape 1 — ATTIRER (haut de funnel)

**Objectif :** être vu et reconnu par les bons cabinets. Passer d'inconnu à "ce type parle de mes problèmes".

**Actifs déjà en place :** profil LinkedIn cohérent (bannière + titre + premier post build in public), posts d'avance dans `agence-ia/contenuti/`, présence à construire.

### 3.1 Canaux, par ordre de priorité

1. **LinkedIn (canal n°1).** Là où les commercialisti et avvocati sont atteignables et où la crédibilité se construit. Deux mouvements en parallèle :
   - **Contenu** : 3 posts/semaine sur les 4 piliers (pédagogie IA, bénéfices concrets, confiance/confidentialité, preuves). Utiliser la skill `automaia-voce` pour chaque post.
   - **Réseau** : 30 notes de connexion ciblées/semaine vers l'ICP (voir modèle en 3.3).
2. **Local / proximité (canal n°2, sous-exploité et à fort levier).** AutomaIA est basée à Rimini. La proximité géographique est un angle d'accroche que personne d'autre n'a. Ordini professionnels locaux (Ordine dei Commercialisti di Rimini/Forlì), événements, associations de catégorie, bouche-à-oreille.
3. **Instagram / Facebook (canal n°3, appui).** Publication automatisée déjà opérationnelle (workflow n8n). Recycler les posts LinkedIn. Facebook reste consulté par la cible plus âgée.

### 3.2 Cadence de contenu (semaine type)

| Jour | Pilier | Format | Angle |
|---|---|---|---|
| Lundi | Pédagogie IA | Post texte | Casser un faux mythe ("L'IA non è per il mio studio") |
| Mercredi | Bénéfices concrets | Post liste | "3 attività da automatizzare già da domani" |
| Vendredi | Preuve / confiance | Post + visuel | Avant/après, mini démo, confidentialité |

> Les 3 posts de référence validés (dans le skill `automaia-voce`) sont le gabarit de ton. S'en inspirer, ne pas les recopier.

### 3.3 Note de connexion LinkedIn (modèle, max 200 caractères)

Personnalisée, sans pitch. On ouvre une conversation, on ne vend rien.

```
Buongiorno [Nome], seguo con interesse gli studi di commercialisti della zona
di Rimini. Mi farebbe piacere restare in contatto e scambiare qualche idea.
```
(178 caractères. Toujours recompter après personnalisation.)

**Variante avvocati :**
```
Buongiorno Avvocato [Cognome], mi occupo di far recuperare tempo agli studi
professionali del riminese. Sarei felice di collegarmi con Lei.
```
(148 caractères.)

### 3.4 KPI de l'étape et passage à l'étape 2

- **Mesurer :** connexions acceptées, vues de posts, commentaires/messages entrants.
- **Passage à l'étape 2 :** quand une connexion réagit (like, commentaire, réponse au message), on lui propose le lead magnet en message doux. On ne saute jamais directement à la vente.

---

## 4. Étape 2 — CAPTER (milieu de funnel)

**Objectif :** transformer une connexion tiède en lead identifié qu'on peut recontacter. On échange de la valeur (le guide) contre un contact et une intention.

**Actif déjà en place :** lead magnet `agence-ia/lead-magnet/guida-5-automazioni.md` — "Cinque automazioni per guadagnare fino a 10 ore a settimana", mis en forme dans Canva. **Reste à faire avant lancement : ajouter le lien d'audit dans le PDF et l'exporter.** C'est le goulot d'étranglement actuel du funnel, à débloquer en priorité.

### 4.1 Mécanique de capture

Le guide se donne de deux façons :
1. **En direct (DM LinkedIn)** après une interaction : on l'envoie en PDF ou lien. Simple, humain, zéro friction.
2. **Via une page de capture** sur le site AutomaIA (formulaire nom + email → envoi automatique du PDF). Permet de capter les visiteurs passifs et de bâtir une liste.

> Priorité de départ : la voie directe (DM). Elle demande zéro infra et convertit mieux au début car elle est personnelle. La page de capture se met en place en parallèle pour scaler.

### 4.2 Message d'envoi du lead magnet (DM LinkedIn, italien)

À envoyer quand une connexion a montré un signe d'intérêt.

```
Buongiorno [Nome], grazie del collegamento.

Ho preparato una breve guida con cinque attività che uno studio come il Suo
può automatizzare per recuperare fino a 10 ore a settimana, senza toccare
nulla di tecnico e con i dati sempre protetti.

Gliela lascio volentieri, senza impegno. La trova qui: [link].

Se dopo averla letta vorrà capire quale automazione avrebbe più senso nel Suo
caso, ne parliamo quando vuole.
```

Un seul CTA implicite (lire le guide). La proposition d'audit est mentionnée en douceur, sans pression.

### 4.3 KPI de l'étape et passage à l'étape 3

- **Mesurer :** nombre de guides envoyés, taux d'ouverture/lecture, réponses positives.
- **Passage à l'étape 3 :** dès qu'un lead répond au guide ou pose une question, on propose l'audit gratuit de 20 minutes. C'est le pivot le plus important du funnel.

---

## 5. Étape 3 — QUALIFIER (l'audit gratuit)

**Objectif :** le rendez-vous où tout se joue. On diagnostique un vrai problème, on crée le "aha", on qualifie le budget et la décision, et on ouvre la porte à la proposition. L'audit n'est pas une démo produit, c'est une conversation de diagnostic centrée sur LEUR cabinet.

**CTA de référence :** "Prenoti un audit gratuito di 20 minuti."

### 5.1 Pourquoi l'audit gratuit et pas une démo directe

Le prospect ne veut pas voir un outil, il veut savoir si son problème peut être résolu. L'audit inverse la posture : ce n'est pas Hatem qui vend, c'est le cabinet qui expose sa douleur et découvre qu'elle a une solution. On vend en écoutant.

### 5.2 Structure de l'audit (20 minutes, script)

Déroulé en 4 temps. But : faire dire au prospect lui-même où il perd du temps.

1. **Contexte (3 min).** "Mi racconti una Sua giornata tipo. Dove sente di perdere più tempo?" On écoute, on ne pitche pas.
2. **Diagnostic (7 min).** Creuser les 4 douleurs connues de l'ICP :
   - Prise de RDV / rappels manuels
   - Relances de documents manquants
   - Mêmes questions clients en boucle (tarifs, documents, délais)
   - Infos éparpillées (pas de CRM)
   Pour chaque douleur repérée : quantifier. "Quante ore a settimana, all'incirca?"
3. **Projection (7 min).** Renvoyer le miroir chiffré. Utiliser le **calculateur ROI** (`agence-ia/offres/calcolatore-roi.html`) en direct : "Se recuperasse [X] ore a settimana, a quanto ammonta sul mese?" Le prospect voit la valeur de ses propres mains.
4. **Pont vers la suite (3 min).** "Le preparo una proposta su misura con le due o tre automazioni prioritarie per il Suo studio. Nessun impegno. La riceve entro [délai]." → transition naturelle vers l'étape 4.

### 5.3 Grille de qualification (à remplir pendant/après l'audit)

Qualifier vite pour ne pas perdre de temps sur des prospects non mûrs.

| Critère | Question clé | Signal vert |
|---|---|---|
| Douleur | Perd-il des heures identifiables ? | Cite un chiffre précis |
| Budget | Facture-t-il à l'heure/acte ? | Oui, temps = argent pour lui |
| Décision | Est-ce lui le décideur ? | Oui (professionnel = décideur) |
| Timing | Le sujet est-il urgent ? | Débordé "en ce moment" |
| Données | Manipule-t-il du sensible ? | Oui → argument confidentialité fort |

### 5.4 KPI de l'étape et passage à l'étape 4

- **Mesurer :** audits tenus, taux "audit → proposition demandée".
- **Passage à l'étape 4 :** tout prospect qualifié (au moins douleur + décision + budget) reçoit une proposition sous 48h. Ne jamais laisser refroidir.

---

## 6. Étape 4 — CONVERTIR (bas de funnel)

**Objectif :** transformer l'audit en signature. C'est ici qu'on présente l'offre, le prix, et qu'on traite les objections.

**Actifs déjà en place :** modèle de proposition `agence-ia/offres/modello-proposta.md`, réponses aux objections `agence-ia/offres/obiezioni-risposte.md`, grille tarifaire `agence-ia/offres/grille-tarifaire.md`, script de démo Loom (FR + IT).

### 6.1 La proposition (structure gagnante)

Partir du problème du client, structurer par bénéfice, un seul CTA. Reprendre les chiffres exacts sortis de l'audit (personnalisation = crédibilité).

1. **Le constat** (leurs mots) : "Durante il nostro audit abbiamo visto che [X] ore a settimana se ne vanno in [tâches]."
2. **Ce qu'on met en place** : 2 ou 3 automatisations prioritaires, décrites en bénéfices, jamais en technologie.
3. **Le résultat chiffré** : "Risultato atteso: fino a [X] ore recuperate a settimana."
4. **La confidentialité** : "I Suoi dati restano protetti e sotto il Suo controllo, nel rispetto del GDPR." (obligatoire, à chaque proposition)
5. **Le prix** : présenter les 3 paliers côte à côte (ancrage premium → milieu → entrée), guider vers Studio Automatizzato.
6. **Un seul CTA** : "Iniziamo insieme? Le basta rispondere a questa mail."

### 6.2 Les 3 offres et le chemin de conversion

| Offre | Rôle dans le funnel | Prix |
|---|---|---|
| **Assistente Email** (entrée) | Le "oui facile". Porte d'entrée à faible engagement, sert de tremplin | 600 € + 79 €/mois |
| **Studio Automatizzato** (cible) | Le cœur. Là où on guide la majorité | 1 490 € + 149 €/mois |
| **Studio 360** (premium) | L'ancre haute. Rend le milieu raisonnable | 2 490 € + 249 €/mois |
| Option **Presenza Online** | Complément à la carte | 900 € + 49 €/mois |

**Deux chemins de conversion :**
- **Chemin direct :** audit → proposition Studio Automatizzato → signature. Idéal.
- **Chemin escalier :** si le prospect hésite sur l'engagement, entrer par Assistente Email (600 €, oui facile), livrer un résultat rapide, puis monter vers Studio Automatizzato une fois la confiance établie (voir étape 5). Le récurrent démarre dès l'entrée.

### 6.3 Annoncer le prix sans hésiter (rappel opérationnel)

- Annonce le prix, puis silence. Le premier qui parle négocie contre lui-même.
- Prix lié au résultat, jamais au temps passé : "La mise en place è di 1 490 €, e recupera fino a 10 ore a settimana."
- Mensuel = tranquillité : "L'abbonamento a 149 € al mese sono io che veglio perché tutto funzioni."
- Si "è caro" : ramener à la valeur avec le calculateur ROI. On ne baisse pas le prix, on réduit le périmètre.

### 6.4 Traiter les objections (les 4 fréquentes)

Détail complet dans `agence-ia/offres/obiezioni-risposte.md`. En résumé :

| Objection | Réponse (angle) |
|---|---|
| "È troppo caro." | Ramener à la valeur horaire récupérée. Réduire le périmètre, pas le prix. |
| "Non ho tempo adesso." | "Proprio per questo. La mise en place la gestisco io, Lei recupera tempo." |
| "I miei dati sono al sicuro?" | Confidentialité, contrôle, GDPR. Argument de vente, pas d'excuse. |
| "Devo pensarci." | Fixer un prochain point daté. "Le va bene se ci risentiamo giovedì?" |

### 6.5 Relance (la vente est dans le suivi)

La plupart des signatures arrivent après 2 à 3 relances. Séquence :
- **J+2** après proposition : "Ha avuto modo di dare un'occhiata alla proposta? Resto a disposizione per qualsiasi dubbio."
- **J+5** : apporter un élément de valeur (mini cas, précision sur la confidentialité), pas juste "allora?".
- **J+9** : relance de clôture douce. "Preferisce che ne riparliamo più avanti o partiamo ora su [entrée à faible engagement] ?"

### 6.6 KPI de l'étape et passage à l'étape 5

- **Mesurer :** propositions envoyées, taux de signature, délai audit→signature, panier moyen.
- **Passage à l'étape 5 :** dès la signature, l'onboarding démarre. Le client entre dans le récurrent.

---

## 7. Étape 5 — FIDÉLISER, MONTER EN GAMME, FAIRE PARRAINER

**Objectif :** le client signé n'est pas la fin du funnel, c'est le début du revenu récurrent et de la croissance sans acquisition payante. Trois leviers.

### 7.1 Rétention (protéger le récurrent)

Le récurrent est la priorité stratégique. On le protège par la valeur perçue :
- **Onboarding soigné** : livrer vite le premier résultat visible (effet "wow" précoce).
- **Point mensuel court** : montrer les heures récupérées ce mois-ci. Le calculateur ROI devient un outil de rétention, pas seulement de vente.
- **Proactivité** : proposer une optimisation avant que le client la demande. Le mensuel se justifie par "je veille et j'améliore".

### 7.2 Montée en gamme (upsell / cross-sell)

Chemin naturel une fois la confiance installée :
- Assistente Email (600 €) → **Studio Automatizzato** (1 490 €) : ajouter RDV, rappels, relances.
- Studio Automatizzato → **Studio 360** : ajouter CRM léger + présence en ligne.
- Tout palier → **option Presenza Online** en complément.

Déclencheur d'upsell : un résultat obtenu ("On vient de vous faire gagner X heures sur l'email. Imaginez la même chose sur les rendez-vous."). On upsell sur la preuve, jamais dans le vide.

### 7.3 Parrainage (le canal le moins cher)

Un client satisfait dans un ordre professionnel local en connaît d'autres. À activer après le premier résultat concret :
```
Sono contento che stia funzionando bene. Conosce altri colleghi, magari qui
in zona, che perdono tempo con le stesse attività? Sarei felice di offrire
anche a loro un audit gratuito, da parte Sua.
```
Le parrainage réinjecte directement en haut de funnel (étape 1), avec une confiance déjà pré-établie. C'est le bouclage vertueux.

### 7.4 Preuve sociale (nourrit tout le funnel)

Chaque client satisfait produit un actif réutilisable partout :
- Témoignage court (1 à 2 phrases + chiffre) → posts LinkedIn (étape 1), propositions (étape 4).
- Mini cas avant/après (anonymisé si besoin, secret professionnel oblige) → contenu de preuve.
- Note : demander l'accord écrit avant tout usage du nom du cabinet.

---

## 8. Plan d'action "premier client en 30 jours"

Le funnel appliqué au sprint de démarrage. Aligné sur le plan Compagnon 30 jours (Semaine 4 = prospection).

**Semaine 1 — Débloquer et armer le haut de funnel**
- [ ] Finaliser le lead magnet : ajouter le lien d'audit dans le PDF, exporter depuis Canva. (goulot actuel, priorité absolue)
- [ ] Mettre en place le lien de réservation d'audit (Calendly ou équivalent) avec confirmation automatique.
- [ ] Préparer 6 posts LinkedIn d'avance (2 semaines) via `automaia-voce`.

**Semaine 2 — Alimenter et capter**
- [ ] 30 notes de connexion ICP/semaine (commercialisti Rimini/Forlì en priorité).
- [ ] Publier 3 posts. Répondre à tout commentaire dans l'heure.
- [ ] Envoyer le lead magnet à chaque connexion qui réagit (DM modèle 4.2).

**Semaine 3 — Qualifier**
- [ ] Objectif : 4 audits gratuits réservés et tenus.
- [ ] Utiliser le script d'audit (5.2) + calculateur ROI en direct.
- [ ] Remplir la grille de qualification après chaque audit.

**Semaine 4 — Convertir**
- [ ] Envoyer 1 proposition sous 48h après chaque audit qualifié.
- [ ] Séquence de relance J+2 / J+5 / J+9.
- [ ] Objectif : 1 client signé (viser Studio Automatizzato, accepter une entrée Assistente Email).

> Si 0 signature à J+30 : le problème est presque toujours en haut de funnel (pas assez de volume) ou à l'étape audit (diagnostic trop faible, pas assez de douleur chiffrée). Regarder les taux de passage avant de toucher à l'offre ou au prix.

---

## 9. Récapitulatif : un actif par étape

| Étape | Actif principal | Où | État |
|---|---|---|---|
| 1. Attirer | Profil + posts LinkedIn | `agence-ia/contenuti/` | En place, à alimenter |
| 2. Capter | Guide 5 automazioni | `agence-ia/lead-magnet/` | À finaliser (lien audit + export) |
| 3. Qualifier | Script audit + calculateur ROI | ce doc + `agence-ia/offres/calcolatore-roi.html` | Script prêt ici |
| 4. Convertir | Proposition + objections + tarifs + démo Loom | `agence-ia/offres/` | En place |
| 5. Fidéliser | Onboarding + upsell + parrainage | ce doc | Cadre prêt |

**Le seul vrai blocage aujourd'hui : finaliser le lead magnet (lien d'audit + export PDF) et brancher le lien de réservation. Sans ça, le funnel a un trou entre l'étape 2 et l'étape 3.** C'est le premier chantier.
