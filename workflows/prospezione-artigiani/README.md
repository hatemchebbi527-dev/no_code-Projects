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
  → Config - Zone e mestieri      1 recherche par comune, sur le métier actif
  → Ricerca per comune            boucle, 1 comune à la fois
       → Google Places · Ricerca  page 1, puis pages 2 et 3 via next_page_token
       → Accumula pagina          empile les résultats, rattache settore + citta
       → Altra pagina ?           oui → Attesa Google (6 s) → page suivante
  → Estrai résultats              sort les 60 résultats max par comune
  → Solo attive                   retire les activités fermées
  → Dedup intra-run               retire les doublons du run (place_id + nom normalisé)
                                  puis pioche à tour de rôle dans chaque recherche
                                  jusqu'à MAX_PER_RUN, pour couvrir tous les métiers
  → Limite per run                garde-fou à 500 fiches
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

**Le workflow traite un métier par run**, sur tous les comuni de la liste. Un run = autant d'appels Text Search que de comuni (3 par défaut), puis au maximum `MAX_PER_RUN` appels Place Details.

Pour changer de métier, une seule ligne dans `Config - Zone e mestieri` :

```js
const MESTIERE_ATTIVO = 'Idraulico';
```

Les 12 métiers disponibles sont dans la constante `CATALOGO` juste en dessous. Le nom doit être écrit exactement comme l'option de la colonne Settore dans Notion : en cas de faute de frappe, le workflow s'arrête tout de suite avec la liste des noms valides, plutôt que de tourner dans le vide.

**Le plafond se répartit entre les comuni.** `Dedup intra-run` pioche à tour de rôle une fiche dans chaque recherche. Avec 3 comuni et un plafond de 40, tu obtiens une douzaine d'artisans par ville sur le métier du jour. Sans cette répartition, Rimini mangerait tout le plafond et Santarcangelo n'entrerait jamais.

**La pagination est active.** Google sert 20 résultats par page et jusqu'à 3 pages, donc 60 résultats par recherche et 180 candidats bruts par métier sur 3 comuni. La boucle réclame les pages suivantes tant que Google renvoie un `next_page_token`.

Ce jeton n'est pas valide immédiatement après son émission, et le délai varie. Deux protections : une attente de 6 secondes avant chaque page suivante, et, si Google répond quand même `INVALID_REQUEST`, jusqu'à 2 nouvelles tentatives avec le même jeton. Sans ce rattrapage, une page refusée faisait perdre tout le reste du comune en silence, ce qui ressemble à « il n'y a plus d'artisans ».

Conséquence sur le plafond : avec 180 candidats bruts et `MAX_PER_RUN` à 40, tu ne traites qu'une fiche sur quatre. Monte `MAX_PER_RUN` à 100 ou 120 pour profiter vraiment de la pagination, en gardant en tête que chaque fiche coûte un appel Place Details et un appel à Claude.

### Tour des 12 métiers

Un métier par run, à cocher au fur et à mesure :

```
[ ] Idraulico              [ ] Piastrellista
[ ] Elettricista           [ ] Serramentista
[ ] Imbianchino            [ ] Condizionamento
[ ] Fabbro                 [ ] Giardiniere
[ ] Falegname              [ ] Muratore
[ ] Termoidraulico / Caldaie   [ ] Antennista
```

Le dédoublonnage étant sur le Place ID, un artisan déjà en base ne ressortira pas quand deux métiers se recouvrent (un termoidraulico trouvé en idraulico, par exemple).

Le trigger `Ogni lunedi 08:30` relancerait toujours le métier actif au moment où tu l'actives. Tant que tu fais le tour à la main, laisse-le désactivé.

| Levier | Où |
|--------|-----|
| Métier du run | `Config - Zone e mestieri`, constante `MESTIERE_ATTIVO` |
| Comuni | `Config - Zone e mestieri`, liste `COMUNI` (5 lignes commentées prêtes à décommenter) |
| Mots cherchés pour un métier | `Config - Zone e mestieri`, partie droite du `CATALOGO` |
| Fiches traitées par run | `Dedup intra-run`, constante `MAX_PER_RUN` (le nœud `Limite per run` n'est qu'un garde-fou à 500) |
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
| Le `Riepilogo` liste des erreurs dans `erroriRicerca` | Chaque ligne dit le comune, la page et la raison. `token mai validato` après 2 tentatives : augmente l'attente du nœud `Attesa Google` au delà de 6 secondes. `OVER_QUERY_LIMIT` : quota Google atteint pour aujourd'hui. |
| La recherche s'arrête à 20 résultats par comune | Google n'avait pas de `next_page_token` à donner : il n'y a pas plus d'artisans de ce métier dans cette ville. Le log de `Accumula pagina` dit `pagina 1 : N risultati, fine`. |
| `REQUEST_DENIED` sur Google Places | La clé n'a pas accès à l'API Places legacy. Dans Google Cloud, active *Places API*, ou migre les deux nœuds vers *Places API (New)* : `POST https://places.googleapis.com/v1/places:searchText` avec l'en-tête `X-Goog-FieldMask`. |
| Beaucoup de fiches en `Scartato` | Normal au début : le filtre retire les activités sans contact et les enseignes. Regarde le champ `motivo` du nœud `Scartato` pour voir ce qui tombe. |
| Une seule ville dans Notion | Le plafond a été atteint avant d'arriver aux autres recherches. Vérifie que `Dedup intra-run` contient bien la répartition à tour de rôle, et lis son log : `X in entrata, Y unici, Z trattati, ripartiti su N ricerche`. |
| `Mestiere sconosciuto` au lancement | `MESTIERE_ATTIVO` n'est pas écrit comme une clé du `CATALOGO`. Le message d'erreur liste les noms valides. |
| La même fiche créée plusieurs fois, toujours un artisan **qui a un site** | Le piège n8n décrit ci-dessous. `Estrai qualifica` doit vérifier que les données d'une branche parlent bien du `place_id` du tour en cours. |
| La même fiche créée plusieurs fois dans un run | L'index de Notion met quelques secondes à voir une page créée, donc `Verifica duplicato Notion` ne la voit pas encore. Le filet de sécurité est dans `Prepara + Pre-filtro` (liste `sd.trattati`), remis à zéro par `Config - Zone e mestieri`. |
| `motivo` contient « parsing fallito » | Claude n'a pas renvoyé de JSON propre. La fiche est quand même créée, avec `Punteggio IA` à `Medio`. |
| Le compteur du `Riepilogo` est faux | Les compteurs sont remis à zéro par `Dedup intra-run`. Lancer la boucle sans passer par ce nœud fausse le total. |

---

## Le piège n8n à connaître

`$('Nom du nœud').first()` renvoie **la dernière exécution de ce nœud**, pas forcément celle du tour en cours de la boucle. Quand deux branches se rejoignent (ici `Estrai email + P.IVA` pour les artisans avec site, `Senza sito (niente email)` pour les autres), un tour qui passe par la branche B lit quand même les données laissées par la branche A au tour précédent.

Résultat observé : un artisan avec site était réécrit en boucle dans Notion à la place des artisans sans site qui le suivaient. Même Place ID, mêmes coordonnées, à quelques secondes d'intervalle. La vérification anti-doublon ne pouvait rien voir : elle interrogeait Notion avec le `place_id` du vrai artisan du tour, qui lui n'existait pas encore en base.

La parade est dans `Estrai qualifica` : les données d'une branche ne sont acceptées que si leur `place_id` correspond à celui du tour en cours, donné par `Prepara + Pre-filtro` qui tourne à chaque tour.

À vérifier dans tout workflow où une boucle contient un `IF` dont les deux branches se rejoignent.

## Après l'import : la suite logique

Le workflow s'arrête à la ligne créée, statut `Da contattare`. Les deux briques qui manquent pour fermer la boucle :

1. **Envoi du premier contact.** La colonne Accroche contient déjà la première ligne du message. Un second workflow peut envoyer par email quand l'adresse existe, et sortir une liste d'appels quand il n'y a que le téléphone.
2. **Relance J+4.** La colonne `Follow-up J+4` est prête : un workflow planifié filtre `Contattato = true` et `Ultimo contatto` à plus de 4 jours.
