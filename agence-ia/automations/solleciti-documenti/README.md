# Automatisation — Solleciti Documenti (relance de collecte de documents)

> Vague 2 du Pack Commercialista. Source : Google Sheet partagé. Canal : email.
> Le cabinet tient une liste des pièces manquantes par client ; le système relance automatiquement.
> Livraison MVP : un workflow par client (multi-tenant = Phase 2).

Bénéfice client (pitch) : "I documenti che mancano ai Suoi clienti, sollecitati in automatico e con garbo. Lei recupera ore ogni settimana, senza rincorrere nessuno."

---

## Pièges déjà rencontrés (à ne pas refaire)

- **Expressions en mode `fx`** : saisis SANS le `=` de tête. n8n ajoute lui-même le marqueur. Un `=` en trop casse la valeur.
- **Références à un autre nœud** : `$('Nom du nœud')` doit correspondre au nom EXACT du nœud. Le plus sûr : clique le nœud dans la liste de gauche de l'éditeur d'expression.
- **Colonnes avec espace ou accent** : utilise les crochets, ex `$json['Ultimo sollecito']`, pas `$json.Ultimo sollecito`.
- **Fuseau horaire** : vérifie Europe/Rome dans les réglages n8n.

---

## Le Google Sheet (structure)

Onglet unique, avec ces colonnes en ligne 1 (les en-têtes deviennent les clés dans n8n) :

| Cliente | Email | Documento | Scadenza | Stato | Ultimo sollecito |
|---------|-------|-----------|----------|-------|------------------|
| Mario Rossi | (ta 2e adresse) | Ricevute Q4 2025 | 31/07/2026 | In attesa | |
| Studio Bianchi | ... | F24 firmato | 28/07/2026 | Ricevuto | |

- **Stato** : "In attesa" (document pas encore reçu) ou "Ricevuto". Le cabinet met "Ricevuto" quand la pièce arrive.
- **Ultimo sollecito** : rempli par le workflow (enhancement optionnel), pour tracer la dernière relance.

---

## Prérequis (credentials n8n)

1. **Google Sheets OAuth2** : nouvelle credential (même compte Google que Calendar/Gmail). Autorise l'accès au Sheet.
2. **Gmail OAuth2** : déjà en place, on la réutilise.

---

## Construction du workflow (GUI n8n) — version cœur (4 nœuds)

Nom : `AutomaIA - Solleciti Documenti`

### Nœud 1 — Schedule Trigger
- Tous les jours à **09:00**.

### Nœud 2 — Google Sheets : Get Row(s)
- Type : Google Sheets, Operation : **Get Many Rows**
- Credential : Google Sheets OAuth2
- Document : ton Sheet ; Sheet : l'onglet
- Renvoie chaque ligne comme un item.

### Nœud 3 — Filter : garder les documents encore manquants
- Type : **Filter** (garde les items qui matchent)
- Condition : `{{ $json.Stato }}` **equals** `In attesa`
- Résultat : seules les lignes "In attesa" continuent. Les "Ricevuto" sont ignorées.

### Nœud 4 — Gmail : Send (relance au client)
- Type : Gmail, Resource : Message, Operation : Send
- Credential : Gmail OAuth2
- To : `{{ $json.Email }}`
- Subject : `Promemoria: documenti ancora da ricevere`
- Email Type : Text
- Message :

```
Gentile {{ $json.Cliente }},

le ricordiamo con cortesia che, per completare la Sua pratica, ci mancherebbe ancora: {{ $json.Documento }}.

Se possibile, ce lo faccia avere entro il {{ $json.Scadenza }}.

Se lo avesse già inviato, ignori pure questo messaggio.

La ringraziamo. Restiamo a Sua disposizione,
Lo studio
```

> Ici `$json` = la ligne du Sheet (le Filter passe l'item tel quel). Pas besoin de `$('...')`.

---

## Schéma final complet (6 nœuds)

```
[1] Ogni Giorno 09:00  (Schedule Trigger)
      → [2] Leggi Sheet  (Google Sheets: Get Many Rows)
          → [3] Solo In Attesa  (Filter: à relancer ?)
              → [4] Invia Sollecito  (Gmail: Send)
                  → [5] Aggiorna Sheet  (Google Sheets: Update Row)
                      → [6] Notifica Studio  (Telegram)
```

Flux linéaire, un item par ligne à relancer. Pour un premier test, tu peux t'arrêter au nœud 4 puis ajouter 5 et 6.

### Nœud 3 — Solo In Attesa (Filter)

**Version simple (recommandée, une seule condition) :**
- Value 1 : `{{ $json.Stato }}`
- Operator : String → is equal to
- Value 2 : `In attesa`

Seules les lignes "In attesa" passent. Suffisant pour la démo et un premier client.

**Option anti-spam (plus tard, pas pour la démo) :** pour éviter de relancer la même ligne chaque jour, remplace la condition ci-dessus par UNE condition de type **booléen**, opérateur "is true", avec cette expression (le ET/OU est à l'intérieur de l'expression, ce n'est pas deux lignes séparées) :
```
{{ $json.Stato === 'In attesa' && ( !$json['Ultimo sollecito'] || DateTime.fromFormat(String($json['Ultimo sollecito']), 'dd/MM/yyyy') < $now.minus({ days: 3 }) ) }}
```
Cette option nécessite le nœud 5 (Aggiorna Sheet) qui écrit la date de dernière relance.

### Nœud 5 — Aggiorna Sheet (Google Sheets · Update Row)
Anti-spam : trace la date de la dernière relance.
- Matching column : `row_number`, valeur `{{ $('Leggi Sheet').item.json.row_number }}`
- Colonne à écrire : `Ultimo sollecito` = `{{ $now.toFormat('dd/MM/yyyy') }}`

### Nœud 6 — Notifica Studio (Telegram)
```
Sollecito inviato a {{ $('Leggi Sheet').item.json.Cliente }} per: {{ $('Leggi Sheet').item.json.Documento }} (scadenza {{ $('Leggi Sheet').item.json.Scadenza }}).
```

> Aux nœuds 5 et 6, `$json` n'est plus la ligne du Sheet (c'est la sortie du nœud précédent), d'où le `$('Leggi Sheet')`. Nomme bien ton nœud de lecture **"Leggi Sheet"**, ou adapte le nom dans les expressions.

---

## Setup de la démo (pour le Loom)

1. Crée un Google Sheet "AutomaIA - Solleciti Documenti (demo)" avec les colonnes ci-dessus.
2. Mets **2 lignes** : une "In attesa" avec **ta 2e adresse** en Email, une "Ricevuto" (pour montrer qu'elle est ignorée).
3. Dans n8n, **Execute Workflow**.
4. Montre que seule la ligne "In attesa" déclenche une relance, et que l'email arrive dans ta 2e boîte.

---

## Script Loom (démo commerciale, ~60-90s, en italien)

> "Le mostro come lo studio sollecita da solo i documenti mancanti, senza rincorrere i clienti.
>
> Qui c'è la lista dei documenti che ancora mancano, cliente per cliente.
>
> Ogni mattina, in automatico, il sistema controlla chi non ha ancora inviato e manda un promemoria gentile.
>
> [mostrare l'esecuzione]
>
> Ecco: il cliente riceve un promemoria cortese, con il documento che manca e la scadenza.
>
> E Lei riceve subito una notifica sul telefono: sa in tempo reale quali solleciti sono partiti, senza controllare nulla.
>
> Chi ha già inviato non viene disturbato. Lei non rincorre più nessuno, e i documenti arrivano in tempo.
>
> Se vuole attivarlo sul Suo studio, prenoti un audit gratuito di 20 minuti."

---

## Après la démo
- Passage à la Vague 2 (suite) : Scadenzario / rappels d'échéances fiscales (même logique Google Sheet).
- Puis Vague 3 : Solleciti di pagamento.
- Multi-tenant : Phase 2. Voir `agence-ia/automaia-app/docs/automazioni-n8n-partagees.md`.
