# Automatisation — Solleciti di Pagamento (relances de paiement)

> Vague 3 du Pack Commercialista. Source : Google Sheet partagé. Canal : email.
> Le cabinet suit ses factures impayées ; le système relance les clients avec tact.
> Même pattern que Solleciti Documenti / Scadenzario.

Bénéfice client (pitch) : "Le fatture non ancora saldate, sollecitate in automatico e con garbo. Lei viene pagato prima, senza dover rincorrere nessuno."

---

## Pièges déjà rencontrés (rappel)

- Expressions en mode `fx` : **sans** le `=` de tête.
- `$('Nom du nœud')` = nom EXACT du nœud (ex. `$('Leggi Fatture')`).
- Colonnes avec espace/accent : crochets.
- Dans un Filter, **la Value 1 doit correspondre au type de l'opérateur** (une condition Date compare une date, une condition String compare du texte).
- Fuseau : Europe/Rome.

---

## Le Google Sheet (structure)

| Cliente | Email | Fattura | Importo | Scadenza | Stato |
|---------|-------|---------|---------|----------|-------|
| Mario Rossi | (ta 2e adresse) | 2026-014 | 350 € | 15/07/2026 | Non pagata |
| Studio Bianchi | ... | 2026-011 | 500 € | 20/07/2026 | Pagata |

- **Fattura** : numéro de facture.
- **Importo** : montant (tu peux mettre le `€` directement, ex `350 €`).
- **Scadenza** : date d'échéance, format `dd/MM/yyyy`.
- **Stato** : "Non pagata" ou "Pagata".

---

## Prérequis (credentials n8n)
- **Google Sheets OAuth2** et **Gmail OAuth2** : déjà créées, on les réutilise.

---

## Construction (GUI n8n) — version simple (4 nœuds)

Nom : `AutomaIA - Solleciti Pagamento`

### Nœud 1 — Schedule Trigger
- Tous les jours à **09:30**.

### Nœud 2 — Leggi Fatture (Google Sheets · Get Many Rows)
- Ton Sheet + onglet.

### Nœud 3 — Solo Non Pagate (Filter)
Version simple, une condition :
- Value 1 : `{{ $json.Stato }}`
- Operator : String → is equal to
- Value 2 : `Non pagata`

### Nœud 4 — Invia Sollecito (Gmail · Send)
- To : `{{ $json.Email }}`
- Subject : `Promemoria: fattura {{ $json.Fattura }} da saldare`
- Email Type : Text
- Message :

```
Gentile {{ $json.Cliente }},

le ricordiamo con cortesia che la fattura {{ $json.Fattura }}, di {{ $json.Importo }}, risulta ancora da saldare (scadenza {{ $json.Scadenza }}).

Se ha già provveduto al pagamento, ignori pure questo messaggio e ci scusi per il disturbo.

Per qualsiasi chiarimento restiamo a Sua disposizione.
Un caro saluto,
Lo studio
```

### Routage (simple)
```
Schedule 09:30 → Leggi Fatture → Solo Non Pagate (Stato = Non pagata) → Invia Sollecito
```

---

## Option (recommandée) — relancer seulement les factures ÉCHUES

Pour ne solliciter que les factures **dépassées** (et pas celles encore dans les délais), ajoute une 2e condition. Ici on **mélange** une condition texte et une condition date, c'est permis tant que chaque Value 1 correspond à son opérateur :

- **Condition A** (texte, on garde) :
  - Value 1 : `{{ $json.Stato }}` · Operator : String → is equal to · Value 2 : `Non pagata`
- **Condition B** (date, on ajoute) :
  - Value 1 : `{{ DateTime.fromFormat(String($json.Scadenza), 'dd/MM/yyyy').toISO() }}`
  - Operator : Date & Time → **is before**
  - Value 2 : `{{ $now.startOf('day').toISO() }}`
- **Combinator** : AND

> Rappel du piège : la Value 1 de la condition B est la **date** (Scadenza), pas `$json.Stato`. Chaque condition compare le bon type.

Traduction : relance les factures **non payées ET dont l'échéance est déjà passée**.

---

## Option — Notification Telegram au cabinet
Nœud Telegram après Gmail :
```
Sollecito di pagamento inviato a {{ $('Leggi Fatture').item.json.Cliente }}: fattura {{ $('Leggi Fatture').item.json.Fattura }} di {{ $('Leggi Fatture').item.json.Importo }}.
```

---

## Option — Anti-spam (ne pas relancer tous les jours)
Ajoute une colonne `Ultimo sollecito` et un nœud **Google Sheets · Update Row** après Gmail :
- Matching column : `row_number`, valeur `{{ $('Leggi Fatture').item.json.row_number }}`
- Colonne à écrire : `Ultimo sollecito` = `{{ $now.toFormat('dd/MM/yyyy') }}`

---

## Setup de la démo (pour le Loom)
1. Crée un Google Sheet "AutomaIA - Solleciti Pagamento (demo)" avec les colonnes ci-dessus.
2. Mets 2 lignes : une "Non pagata" avec **ta 2e adresse** (Scadenza déjà passée si tu testes l'option échéance), une "Pagata".
3. **Execute Workflow**.
4. Montre que seule la facture impayée déclenche une relance, reçue dans ta 2e boîte.

---

## Script Loom (démo commerciale, ~60-90s, en italien)

> "Le mostro come lo studio sollecita i pagamenti in ritardo, in automatico e con garbo.
>
> Qui c'è l'elenco delle fatture, con lo stato: pagata o non pagata.
>
> Ogni giorno, il sistema individua le fatture ancora da saldare e invia un promemoria cortese al cliente.
>
> [mostrare l'esecuzione]
>
> Ecco: il cliente riceve un promemoria educato, con il numero della fattura, l'importo e la scadenza.
>
> E Lei riceve subito una notifica sul telefono: sa sempre quali solleciti di pagamento sono partiti, in tempo reale.
>
> Chi ha già pagato non viene disturbato. Lei viene pagato prima, senza dover rincorrere nessuno e senza imbarazzo.
>
> Se vuole attivarlo sul Suo studio, prenoti un audit gratuito di 20 minuti."

---

## Après
- Le Pack Commercialista est complet : appuntamenti, solleciti documenti, scadenzario, solleciti pagamento (+ assistente email déjà en prod).
- Reste à enregistrer les Loom de chaque automatisation.
- Multi-tenant : Phase 2. Voir `agence-ia/automaia-app/docs/automazioni-n8n-partagees.md`.
