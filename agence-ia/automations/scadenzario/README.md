# Automatisation — Scadenzario (rappels d'échéances fiscales)

> Vague 2 du Pack Commercialista. Source : Google Sheet partagé. Canal : email.
> Le cabinet tient une liste des échéances fiscales par client ; le système rappelle avant la date.
> Même pattern que Solleciti Documenti.

Bénéfice client (pitch) : "Le scadenze fiscali dei Suoi clienti, ricordate in automatico prima della data. Nessuna dimenticanza, nessuna corsa dell'ultimo minuto."

---

## Pièges déjà rencontrés (rappel)

- Expressions en mode `fx` : **sans** le `=` de tête.
- `$('Nom du nœud')` = nom EXACT du nœud.
- Colonnes avec espace/accent : crochets, ex `$json['Ultimo promemoria']`.
- Fuseau : Europe/Rome.

---

## Le Google Sheet (structure)

| Cliente | Email | Scadenza | Data | Stato |
|---------|-------|----------|------|-------|
| Mario Rossi | (ta 2e adresse) | F24 | 27/07/2026 | Da ricordare |
| Studio Bianchi | ... | IVA trimestrale | 31/07/2026 | Fatto |

- **Scadenza** : le libellé (F24, IVA trimestrale, Dichiarazione redditi...).
- **Data** : la date de l'échéance, format `dd/MM/yyyy`.
- **Stato** : "Da ricordare" ou "Fatto".

---

## Prérequis (credentials n8n)

- **Google Sheets OAuth2** et **Gmail OAuth2** : déjà créées pour Solleciti Documenti, on les réutilise.

---

## Construction (GUI n8n) — version simple (4 nœuds)

Nom : `AutomaIA - Scadenzario`

### Nœud 1 — Schedule Trigger
- Tous les jours à **08:00**.

### Nœud 2 — Leggi Scadenze (Google Sheets · Get Many Rows)
- Ton Sheet + onglet.

### Nœud 3 — Scadenze da Ricordare (Filter)
Version simple, une condition (comme Solleciti Documenti) :
- Value 1 : `{{ $json.Stato }}`
- Operator : String → is equal to
- Value 2 : `Da ricordare`

### Nœud 4 — Invia Promemoria (Gmail · Send)
- To : `{{ $json.Email }}`
- Subject : `Promemoria: scadenza {{ $json.Scadenza }} in arrivo`
- Email Type : Text
- Message :

```
Gentile {{ $json.Cliente }},

le ricordiamo che si avvicina una scadenza importante: {{ $json.Scadenza }}, prevista per il {{ $json.Data }}.

Se c'è qualcosa da preparare o da inviarci, siamo a Sua disposizione per aiutarLa in tempo.

Un caro saluto,
Lo studio
```

### Routage (simple)
```
Schedule 08:00 → Leggi Scadenze → Scadenze da Ricordare (Stato = Da ricordare) → Invia Promemoria
```

---

## Option (recommandée en production) — déclenchement par DATE

Au lieu que le cabinet marque "Da ricordare" à la main, le système rappelle tout seul quand l'échéance approche (ex : dans les 5 jours). Ici on utilise VRAIMENT **deux conditions** dans le Filter, combinées en **AND** (pas d'expression compliquée, juste deux lignes).

> IMPORTANT : en passant de la version simple à celle-ci, remplace **Value 1 aussi**, pas seulement l'opérateur. Les deux conditions comparent la **Data**, plus jamais `$json.Stato`. Sinon erreur "Wrong type: 'Da ricordare' is a string but was expecting a dateTime".

- **Condition A**
  - Value 1 : `{{ DateTime.fromFormat(String($json.Data), 'dd/MM/yyyy').toISO() }}`
  - Operator : **Date & Time → is after or equal to**
  - Value 2 : `{{ $now.startOf('day').toISO() }}`
- **Condition B**
  - Value 1 : `{{ DateTime.fromFormat(String($json.Data), 'dd/MM/yyyy').toISO() }}`
  - Operator : **Date & Time → is before or equal to**
  - Value 2 : `{{ $now.plus({ days: 5 }).endOf('day').toISO() }}`
- **Combinator** : AND

Traduction : garde les échéances dont la date tombe **entre aujourd'hui et dans 5 jours**. Ajuste "5" selon le préavis voulu.

---

## Option — Notification Telegram au cabinet
Nœud Telegram après Gmail :
```
Promemoria scadenza inviato a {{ $('Leggi Scadenze').item.json.Cliente }}: {{ $('Leggi Scadenze').item.json.Scadenza }} del {{ $('Leggi Scadenze').item.json.Data }}.
```

---

## Setup de la démo (pour le Loom)
1. Crée un Google Sheet "AutomaIA - Scadenzario (demo)" avec les colonnes ci-dessus.
2. Mets 2 lignes : une "Da ricordare" avec **ta 2e adresse** (Data dans quelques jours), une "Fatto".
3. **Execute Workflow**.
4. Montre que seule l'échéance "Da ricordare" déclenche le rappel, reçu dans ta 2e boîte.

---

## Script Loom (démo commerciale, ~60-90s, en italien)

> "Le mostro come lo studio ricorda le scadenze fiscali ai clienti, in automatico, prima della data.
>
> Qui c'è l'elenco delle scadenze, cliente per cliente: F24, IVA, dichiarazioni.
>
> Il sistema controlla ogni giorno quali scadenze si avvicinano e avvisa il cliente in tempo.
>
> [mostrare l'esecuzione]
>
> Ecco: il cliente riceve un promemoria chiaro, con la scadenza e la data.
>
> E Lei riceve una notifica sul telefono nello stesso momento: tiene tutto sotto controllo, in tempo reale, senza controllare nulla.
>
> Niente più dimenticanze, niente corse dell'ultimo minuto. Lei ha tutto sotto controllo, senza pensarci.
>
> Se vuole attivarlo sul Suo studio, prenoti un audit gratuito di 20 minuti."

---

## Après
- Dernière du pack : Solleciti di pagamento (Vague 3), même logique Google Sheet.
- Multi-tenant : Phase 2. Voir `agence-ia/automaia-app/docs/automazioni-n8n-partagees.md`.
