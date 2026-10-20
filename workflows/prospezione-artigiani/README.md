# Prospezione Artigiani : Google Places vers Notion

Workflow n8n qui construit le CRM des artisans de la Riviera romagnole pour le recrutement côté offre de **Manuvo**. Il cherche les artisans sur Google Places, enrichit chaque fiche, la qualifie avec Claude, et crée la ligne dans Notion sans jamais créer de doublon.

Fichier à importer : `prospezione-artigiani-notion.json`

---

## La table Notion

Elle est déjà créée, avec toutes les colonnes et leurs options :

**CRM Artigiani — Manuvo (Rimini)**
https://app.notion.com/p/e29b4127a44046839f627d1aef3dfeaf

| Usage | Identifiant |
|-------|-------------|
| `database_id` (utilisé dans le workflow) | `e29b4127-a440-4683-9f62-7d1aef3dfeaf` |
| `data_source_id` (secours, voir Dépannage) | `a8ecb59e-bb66-45d8-9f94-09729be38ef1` |

Colonnes remplies automatiquement : Nome, Settore, Stato, Punteggio IA, Priorita, Telefono, Email, Sito, Indirizzo, Citta, Rating Google, Recensioni Google, Ha sito, Accroche, Motivo qualifica, Stima collaboratori, Email trovate, Place ID, Google Maps, Fonte, Data inserimento, Note.

Colonnes que tu remplis à la main pendant la prospection : Ultimo contatto, Contattato, Follow-up J+4.

> La colonne **Place ID** est la clé anti-doublon. Ne la modifie pas et ne la supprime pas.

---

## Mise en route

**1. Importer**
Dans n8n : *Workflows > Import from File* et choisis le JSON.

**2. Brancher les credentials**

| Nœud | Credential |
|------|------------|
| `Google Places - Ricerca testo` et `Google Places - Dettagli` | Query Auth « Google Places API » (déjà pré-remplie) |
| `Claude - Qualifica e messaggio` | Header Auth « API IA » (déjà pré-remplie) |
| `Verifica duplicato Notion` et `Crea in Notion` | ta credential **Notion API**, à sélectionner sur les deux nœuds |

**3. Donner accès à la table à ton intégration Notion**
C'est l'erreur n°1. Une intégration Notion ne voit que ce qu'on lui partage. Ouvre la page de la table, menu `...` en haut à droite, *Connections*, puis ajoute ton intégration. Sans ça, l'API répond `404 object_not_found`.

**4. Premier test**
Laisse `Limite per run` à 40, réduis `Config - Zone e mestieri` à 1 comune et 1 métier, et lance `Avvia ricerca`. Vérifie une ligne dans Notion avant d'ouvrir les vannes.

---

## Ce que fait le workflow

```
Avvia ricerca  /  Ogni lunedi 08:30
  → Config - Zone e mestieri      1 item par combinaison comune x métier
  → Google Places - Ricerca testo text search, 1 appel par item
  → Estrai risultati              rattache settore + citta à chaque fiche
  → Solo attive                   retire les activités fermées
  → Dedup intra-run               retire les doublons du run (place_id + nom normalisé)
  → Limite per run                plafond de 40 fiches par run
  → Uno alla volta                boucle, 1 fiche à la fois
       → Google Places - Dettagli téléphone, site, adresse, note, lien Maps
       → Verifica duplicato Notion recherche par Place ID OU par Nom exact
       → Gia in CRM ?              oui → Salta (duplicato)
       → Prepara + Pre-filtro      exclut portails, chaînes, enseignes, enti
       → Ha sito web ?             oui → scrape du site : emails + Partita IVA
       → Claude - Qualifica        punteggio, motif, taille, première ligne de contact
       → Punteggio sufficiente ?   Basso ou écarté → Scartato
       → Crea in Notion            statut « Da contattare »
  → Riepilogo                     créés / déjà présents / écartés
```

### Les trois différences avec ta version Airtable

1. **Config unique au lieu de branches dupliquées.** Un seul nœud Code génère toutes les recherches. Ajouter un métier ou un comune, c'est une ligne, plus trois nœuds et deux merges.
2. **Anti-doublon sur le Place ID.** Le nom seul est fragile (« Rossi Impianti » contre « Rossi Impianti Srl »). Le Place ID est stable, et la requête Notion teste les deux.
3. **Priorité basée sur le téléphone.** Un artisan se contacte par téléphone ou WhatsApp, pas par formulaire. Un artisan sans site mais avec 20 avis est un bon prospect, alors qu'un cabinet sans site était un mauvais prospect dans ta version AutomaIA.

### Détail utile : la Partita IVA

Le scrape du site cherche aussi le numéro de P.IVA et le note dans la colonne Note. Manuvo demande une P.IVA enregistrée à l'inscription : un artisan qui affiche déjà la sienne est un prospect plus avancé.

---

## Régler le volume et le coût

Un run = `nombre de comuni x nombre de métiers` appels Text Search, puis au maximum `Limite per run` appels Place Details.

Réglage livré : 3 comuni x 6 métiers = 18 recherches, plafonné à 40 fiches traitées.

| Levier | Où |
|--------|-----|
| Comuni et métiers | `Config - Zone e mestieri`, listes `COMUNI` et `MESTIERI` (lignes commentées prêtes à décommenter) |
| Fiches traitées par run | `Limite per run`, champ `maxItems` |
| Sévérité du filtre | `Prepara + Pre-filtro`, liste `ESCLUDI` et seuil `numRecensioni >= 3` |
| Modèle Claude | corps du nœud `Claude - Qualifica e messaggio` |

Côté Google, Text Search et Place Details sont facturés à l'appel et chaque projet a un quota mensuel offert : vérifie l'état du tien dans la console Google Cloud avant une grosse session, les tarifs bougent.

Côté Claude, le workflow utilise `claude-opus-5-5` en effort `low`. Compte un ordre de grandeur de 0,40 à 0,60 € pour 40 fiches. Pour une session de masse, remplace le modèle par `claude-haiku-5-5` dans le corps du nœud : la qualification reste correcte pour une dizaine de fois moins cher.

Le nœud Claude envoie aussi `fallbacks: "default"` avec l'en-tête `anthropic-beta: server-side-fallback-2026-07-01` : si le modèle refuse une fiche, l'API relance la requête sur un autre modèle au lieu de renvoyer une réponse vide. Si ce nœud te renvoie une erreur 400, supprime cette ligne du corps et l'en-tête `anthropic-beta`, le reste fonctionne à l'identique.

---

## Dépannage

| Symptôme | Cause et correction |
|----------|---------------------|
| `404 object_not_found` sur un nœud Notion | La table n'est pas partagée avec l'intégration. Voir l'étape 3. |
| `validation_error` sur `Crea in Notion` | Une colonne a été renommée dans Notion. Les noms du corps JSON doivent correspondre au caractère près, accents compris (`Priorita` et `Citta` sont sans accent). |
| Erreur sur `/v1/databases/.../query` qui parle de `data_source` | Ton n8n envoie une version d'API Notion récente. Remplace l'URL du nœud `Verifica duplicato Notion` par `https://api.notion.com/v1/data_sources/a8ecb59e-bb66-45d8-9f94-09729be38ef1/query`. |
| `REQUEST_DENIED` sur Google Places | La clé n'a pas accès à l'API Places legacy. Dans Google Cloud, active *Places API*, ou migre les deux nœuds vers *Places API (New)* : `POST https://places.googleapis.com/v1/places:searchText` avec l'en-tête `X-Goog-FieldMask`. |
| Beaucoup de fiches en `Scartato` | Normal au début : le filtre retire les activités sans contact et les enseignes. Regarde le champ `motivo` du nœud `Scartato` pour voir ce qui tombe. |
| `motivo` contient « parsing fallito » | Claude n'a pas renvoyé de JSON propre. La fiche est quand même créée, avec `Punteggio IA` à `Medio`. |
| Le compteur du `Riepilogo` est faux | Les compteurs sont remis à zéro par `Dedup intra-run`. Lancer la boucle sans passer par ce nœud fausse le total. |

---

## Après l'import : la suite logique

Le workflow s'arrête à la ligne créée, statut `Da contattare`. Les deux briques qui manquent pour fermer la boucle :

1. **Envoi du premier contact.** La colonne Accroche contient déjà la première ligne du message. Un second workflow peut envoyer par email quand l'adresse existe, et sortir une liste d'appels quand il n'y a que le téléphone.
2. **Relance J+4.** La colonne `Follow-up J+4` est prête : un workflow planifié filtre `Contattato = true` et `Ultimo contatto` à plus de 4 jours.
