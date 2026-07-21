# Automatisation — Promemoria Appuntamenti (rappels de rendez-vous)

> Vague 1 du Pack Commercialista. Source : Google Calendar du cabinet (lecture seule). Canal : email.
> Guide de construction dans le GUI n8n + setup démo + script Loom.
> Livraison MVP : un workflow par client (multi-tenant = Phase 2).

---

## Ce que fait l'automatisation

Chaque soir, le système regarde les rendez-vous du lendemain dans l'agenda du cabinet et envoie automatiquement un email de rappel aux clients concernés. Résultat : moins de no-shows, moins de trous en agenda, et le cabinet ne fait rien à la main.

Bénéfice client (pitch) : "Le Suo appuntamento di domani, ricordato in automatico ai Suoi clienti. Meno buchi in agenda, zero lavoro in più."

---

## Prérequis (credentials n8n)

1. **Google Calendar OAuth2** : nouvelle credential dans n8n (même logique que ton Gmail OAuth de l'assistant email). Autoriser l'accès à l'agenda du cabinet, lecture seule suffit.
2. **Gmail OAuth2** : déjà en place (assistant email). On la réutilise pour l'envoi.

---

## Construction du workflow (GUI n8n)

Nom du workflow : `AutomaIA - Promemoria Appuntamenti`

### Nœud 1 — Schedule Trigger

- Type : Schedule Trigger
- Règle : tous les jours à **18:00** (rappel la veille au soir).

### Nœud 2 — Google Calendar : Get Many Events

- Type : Google Calendar
- Credential : Google Calendar OAuth2 (créée ci-dessus)
- Resource : **Event**, Operation : **Get Many**
- Calendar : l'agenda du cabinet
- Return All : activé
- Options à ajouter :
  - **After (timeMin)** : `={{ $now.plus({ days: 1 }).startOf('day').toISO() }}`
  - **Before (timeMax)** : `={{ $now.plus({ days: 1 }).endOf('day').toISO() }}`
  - **Single Events** : true
  - **Order By** : start time

> Astuce : ces deux expressions donnent la fenêtre "demain 00:00 → demain 23:59". Vérifie le fuseau (Europe/Rome) dans les réglages n8n.

### Nœud 3 — IF : l'évènement a un participant avec email

Évite les erreurs sur les évènements sans invité (blocs perso, rappels internes).

- Type : IF
- Condition (exists) : `={{ $json.attendees && $json.attendees[0] && $json.attendees[0].email }}`
- Branche **true** → Nœud 4. Branche **false** → rien (ignoré).

### Nœud 4 — Gmail : Send (rappel au client)

- Type : Gmail, Resource : Message, Operation : Send
- Credential : Gmail OAuth2 (existante)
- To : `={{ $json.attendees[0].email }}`
- Subject : `Promemoria: il Suo appuntamento di domani`
- Email Type : Text
- Message :

```
Gentile {{ $json.attendees[0].displayName || 'Cliente' }},

le ricordiamo il Suo appuntamento con lo studio, previsto per domani alle {{ $json.start.dateTime.substring(11,16) }}.

Se avesse bisogno di spostarlo, ci scriva pure: troveremo volentieri un nuovo orario.

A domani,
Lo studio
```

> Message conforme à la voix de marque : chaleureux, vouvoiement (Lei), zéro jargon, un seul message clair.

### Nœud 5 (optionnel) — Telegram : notifier le cabinet

Comme sur l'assistant email, un fil de tranquillité pour le cabinet.

- Type : Telegram, branché sur la sortie du Nœud 4
- Message : `Promemoria inviato a {{ $json.attendees[0].displayName || 'un cliente' }} per domani alle {{ $('Google Calendar').item.json.start.dateTime.substring(11,16) }}.`

---

## Routage

```
Schedule 18:00
  → Google Calendar (RDV de demain)
    → IF a un participant avec email
       (true)  → Gmail rappel → (option) Telegram notif
       (false) → fin
```

---

## Setup de la démo (pour le Loom)

1. Créer/choisir un Google Calendar de démonstration.
2. Y ajouter un rendez-vous **demain**, ex : titre "Consulenza fiscale - Sig. Rossi", 15:00, **invité = une deuxième adresse email que tu contrôles** (ta démo joue le client).
3. Dans n8n, ouvrir le workflow et cliquer **Execute Workflow** (pas besoin d'attendre 18:00 pour la démo).
4. Montrer l'email de rappel qui arrive dans la boîte du "client".

---

## Script Loom (démo commerciale, ~60-90s, en italien)

Narration suggérée (voix de marque, un seul CTA à la fin) :

> "Le mostro come lo studio ricorda automaticamente gli appuntamenti ai clienti, senza fare nulla a mano.
>
> Qui c'è l'agenda dello studio, con un appuntamento fissato per domani.
>
> Ogni sera, in automatico, il sistema controlla gli appuntamenti del giorno dopo e avvisa i clienti.
>
> [mostrare l'esecuzione]
>
> Ecco: il cliente riceve un promemoria gentile, con l'orario del suo appuntamento.
>
> Meno dimenticanze, meno buchi in agenda. Lei non tocca nulla, i Suoi dati restano nel Suo agenda.
>
> Se vuole attivarlo sul Suo studio, prenoti un audit gratuito di 20 minuti."

---

## Après la démo

- Une fois validé, tu peux tirer ce workflow en code avec n8nac (`workflows/n8n-as-code/`) pour le versionner.
- Passage à l'automatisation suivante (Vague 2 : relance de collecte de documents).
- Multi-tenant (un seul workflow pour tous les clients) : Phase 2, quand le volume le justifiera. Voir `agence-ia/automaia-app/docs/automazioni-n8n-partagees.md`.
