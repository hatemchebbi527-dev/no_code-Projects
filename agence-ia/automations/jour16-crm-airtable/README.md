# Jour 16 — Airtable comme CRM

CRM de prospection AutomaIA : une base qui se remplit toute seule depuis le formulaire du site.

## Le concept (la leçon du jour)

- **Base** Airtable = une base de données (un classeur intelligent). Identifiant : `appXXXXXXXXXXXXXX`
- **Table** = un onglet. Ici "Prospects". Identifiant : `tblXXXXXXXXXXXXXX`
- **Champ** = une colonne, avec un **type** (texte, email, liste de choix, date). Le type garantit des données propres. Chaque champ a un **nom lisible** ET un **identifiant** (`fldXXXX`)
- **Enregistrement** = une ligne (un prospect). Identifiant : `recXXXX`
- **API** = ce qui permet à n8n de lire/écrire dans la base automatiquement, sans ouvrir Airtable

## La base créée

- **Base** : `AutomaIA - CRM Prospect` (`app2s4sQDVTe8ESGZ`)
- **Table** : `Prospects` (`tbl2D8SoJfW5RbbX9`)

| Champ | Type | Choix (si liste) |
|-------|------|------------------|
| Nome | texte (principal) | nom du studio/cabinet |
| Contatto | texte | nom de la personne |
| Settore | liste | Avvocato, Commercialista, Notaio, Estetista, Medico, Altro |
| Email | email | |
| Telefono | téléphone | |
| Stato | liste | Nuovo, Contattato, Audit fissato, Proposta inviata, Cliente, Perso |
| Fonte | liste | Sito web, LinkedIn, Referral, Lead magnet, Altro |
| Note | texte long | |
| Data contatto | date (D/M/YYYY) | |

Deux fiches d'exemple ont été ajoutées pour valider l'écriture par l'API.

## Connecter n8n à Airtable (à faire dans n8n)

Cette partie se fait dans ton n8n, elle demande tes identifiants Airtable.

### 1. Créer un Personal Access Token Airtable
- Va sur https://airtable.com/create/tokens
- Crée un token avec les scopes `data.records:read` et `data.records:write`
- Donne-lui accès à la base `AutomaIA - CRM Prospect`
- Copie le token (il ne s'affiche qu'une fois). Il joue le même rôle que la clé API : secret, jamais dans un fichier suivi par git

### 2. Ajouter la credential dans n8n
- Dans n8n : Credentials → New → Airtable Personal Access Token
- Colle le token

### 3. Brancher le node Airtable sur le formulaire du site
Le site envoie déjà ses soumissions vers un webhook n8n (`NEXT_PUBLIC_N8N_WEBHOOK_URL`).
Dans le workflow qui reçoit ce webhook, ajoute en bout de chaîne :
- Node **Airtable** → opération **Create**
- Base : `AutomaIA - CRM Prospect`, Table : `Prospects`
- Mappe les champs du formulaire vers les colonnes :
  - nom du formulaire → `Nome`
  - email → `Email`
  - message → `Note`
  - `Fonte` = "Sito web" (valeur fixe)
  - `Stato` = "Nuovo" (valeur fixe)

### 4. Tester
Soumets le formulaire du site. Une nouvelle ligne doit apparaître dans la table Prospects, avec Stato = Nuovo et Fonte = Sito web. C'est le critère "fait" du Jour 16.

## Note

En n8n, le node Airtable utilise en général les **noms** de colonnes (Nome, Email...), pas les identifiants `fldXXXX`. Les identifiants ne servent que si tu appelles l'API brute (node HTTP Request).
