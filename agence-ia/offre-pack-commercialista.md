# Offre — Pack Automatisation Commercialista

> Définition de l'offre pour le premier segment cible (commercialisti italiens).
> Base de préparation du pitch. Décision prise le 2026-07-20.

---

## Cible

Cabinets de commercialisti italiens, non-tech, débordés par les tâches répétitives.
Positionnement : "Je m'occupe du répétitif et du chronophage de votre cabinet. Vous gardez le contrôle et la confidentialité."

Principe de livraison : **un seul n8n géré par l'agence**. Le client n'installe rien, ne configure rien, ne gère aucun crédit technique. Il fournit une matière première simple, l'agence construit et fait tourner, le client reçoit le résultat.

---

## Le pack (5 automatisations)

| # | Automatisation | Douleur visée | Ce que le client fournit | Source de données au démarrage (MVP) | Sensibilité |
|---|---|---|---|---|---|
| 1 | **Relance de collecte de documents** | Courir après les pièces des clients | Liste des pièces manquantes | Google Sheet partagé (client, document, échéance, email) | Métadonnées |
| 2 | **Rappels d'échéances fiscales (scadenzario)** | Ne rien rater (F24, dichiarazioni) | Ses échéances par client | Google Sheet partagé (client, type, date) | Métadonnées |
| 3 | **Assistant email (bozze)** ✅ *déjà en prod* | Répondre aux emails clients | Un transfert automatique dans sa boîte | Email transféré (déjà en place) | Moyenne, client relit avant envoi |
| 4 | **Rappels de rendez-vous** | Réduire les no-shows | Accès agenda en lecture seule | Google Calendar (lecture seule) | Faible |
| 5 | **Solleciti (relances de paiement)** | Se faire payer | Liste des factures impayées | Google Sheet partagé (client, montant, échéance, email) | Financière, minimisable |

**Note MVP importante :** on démarre avec un simple **tableur partagé** comme source de données, pas une intégration au logiciel de compta. Ça se met en place en une journée, sans dépendance technique lourde. L'intégration compta (ex. Fatture in Cloud) viendra plus tard, seulement si le client la demande.

---

## Ordre de livraison (on vend le pack, on livre par vagues)

Ne pas tout construire d'un coup. Livrer du plus rapide et rassurant au plus sensible :

- **Vague 1 (quelques jours)** : Rappels de RDV + Assistant email (déjà prêt). Sensibilité faible, valeur visible tout de suite, installe la confiance.
- **Vague 2** : Relance de documents + Scadenzario. Le cœur de la douleur, une fois la confiance établie.
- **Vague 3** : Solleciti. En dernier, quand la relation est solide.

---

## Gestion de la confidentialité (à mettre en avant comme argument de vente)

Les clients cibles sont soumis au segreto professionale et au RGPD. La confidentialité n'est pas un obstacle, c'est un argument si elle est traitée sérieusement :

- **Minimisation** : la plupart des automatisations ne demandent que des métadonnées (qui / quoi / quand), jamais le contenu confidentiel. Relancer un document ne demande pas de lire le document.
- **Aucun mot de passe, accès révocables** : transfert email que le client coupe quand il veut, agenda en lecture seule révocable en un clic. L'agence ne détient jamais ses identifiants.
- **Cadre légal** : contrat de sous-traitance RGPD (nomina a responsabile del trattamento, art. 28 RGPD), le même type de document qu'il signe déjà avec ses logiciels.
- **Périmètre clair** : on automatise l'opérationnel du cabinet (agenda, facturation du cabinet, relances administratives), jamais les dossiers confidentiels de ses propres clients.
- **Rétention minimale** : traitement au vol, on ne stocke pas plus que nécessaire.

---

## Lien avec les offres Stripe existantes

Ce pack correspond à l'offre **Studio Automatizzato** (appuntamenti + solleciti + assistente email), enrichie de la relance de documents et du scadenzario. Ce n'est pas une nouvelle offre à créer, c'est un affinage de l'existant.

---

## Prochaines étapes

1. Préparer le pitch commercialista (bénéfice concret et chiffré, une seule offre claire).
2. Préparer le modèle de contrat RGPD simple (nomina a responsabile art. 28).
3. Identifier un premier cabinet local à approcher.
4. Monter la Vague 1 dans n8n (rappels de RDV) pour avoir une démo prête.
