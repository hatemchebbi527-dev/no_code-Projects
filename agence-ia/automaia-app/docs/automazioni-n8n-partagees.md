# Architecture — Automazioni via n8n partagé (multi-tenant)

> Document de conception. Aucune ligne de code n'est encore écrite pour ce chantier.
> Objectif : passer du modèle actuel « chaque client colle son URL n8n » à un modèle
> « un seul n8n géré par l'agence, automatisations incluses selon le plan ».
>
> Statut des sections : **[ACTÉ]** = décidé, **[À TRANCHER]** = décision produit/données requise.

---

## 1. Principe directeur [ACTÉ]

Un **unique n8n** (VPS de l'agence) héberge tous les workflows. L'app AutomaIA est :

1. le **point de contrôle** (quelle automatisation est active pour quel studio, selon son plan) ;
2. la **source de données par studio** (n8n ne parle qu'à l'app, jamais à Supabase en direct).

Chaque exécution est **scopée par `studio_id`**. Le client ne configure rien : il paie son offre, l'automatisation tourne.

Contraste avec l'existant :
- **Aujourd'hui** : `automations.n8n_webhook_url` est saisi par le client, le toggle `is_active` ne pilote rien, aucun déclenchement automatique côté app.
- **Cible** : URL n8n centralisée côté agence, `is_active` réellement respecté, déclenchement mixte pull/push, tout filtré par le plan.

---

## 2. Mapping plan → automatisation [À TRANCHER — confirmer]

| Automatisation | Plans qui l'incluent | Modèle de déclenchement |
|---|---|---|
| `email` (bozze / assistente email) | Studio Automatizzato, Studio 360 | **déjà en prod** (inbound-email) |
| `appuntamenti` | Studio Automatizzato, Studio 360 | **pull** (temporel) |
| `solleciti` | Studio Automatizzato, Studio 360 | **pull** (temporel) |
| `pubblicazione_social` | Presenza Online (add-on), inclus dans Studio 360 | **push** (à la demande) |
| `modulo_contatto` | Presenza Online (add-on), inclus dans Studio 360 | **push** (soumission formulaire) |
| `faq` | **? à définir** — quel(s) plan(s) ? | **push** (question entrante) |

Question ouverte : `faq` n'apparaît dans aucune description d'offre Stripe. À rattacher à un plan (probablement Presenza Online ou Studio 360) ou à retirer.

---

## 3. Modèle de déclenchement mixte [ACTÉ]

### 3.1 Pull — n8n planifié interroge l'app (Solleciti, Appuntamenti)

Automatisations basées sur le temps (« tous les jours, relancer les factures échues »).

```
[n8n Schedule node, ex. 07h00]
    -> GET https://app.automa-ia.net/api/n8n/pending/<type>
       Authorization: Bearer <N8N_SHARED_SECRET>
    <- 200 { studios: [ { studio_id, données_nécessaires... }, ... ] }
    -> n8n traite chaque studio (envoi email/SMS, etc.)
    -> POST https://app.automa-ia.net/api/n8n/executions
       { studio_id, type, status, detail }
    <- l'app met à jour automations.last_run_at / last_run_status
```

L'endpoint `/api/n8n/pending/:type` ne retourne **que** les studios où :
`plan inclut type` **ET** `automations.is_active = true` **ET** `plan_status = 'active'`.

### 3.2 Push — l'app appelle n8n sur événement (FAQ, Modulo contatto, Pubblicazione social)

```
[événement app : formulaire soumis / question reçue / clic « publica »]
    -> vérifier le gating (plan + is_active) côté app
    -> POST https://n8n.freelancerai.eu/webhook/<type>
       Authorization: Bearer <N8N_SHARED_SECRET>
       { studio_id, payload }
    <- n8n traite et peut rappeler /api/n8n/executions pour journaliser
```

Règle : **on ne pousse jamais vers n8n sans avoir vérifié le gating d'abord.**

---

## 4. API sécurisée app ↔ n8n [ACTÉ]

Nouveau groupe de routes serveur `/api/n8n/*`, jamais exposées au navigateur client.

| Route | Sens | Rôle |
|---|---|---|
| `GET /api/n8n/pending/:type` | n8n → app | Liste des studios actifs + données (pull) |
| `POST /api/n8n/executions` | n8n → app | Journalise le résultat d'une exécution |

Sécurité :
- Header `Authorization: Bearer <N8N_SHARED_SECRET>`, comparaison à temps constant (comme la vérif HMAC de `inbound-email`).
- Secret **uniquement en env serveur** (app + n8n), jamais côté client.
- Côté route, accès Supabase via `createAdminClient()` (service role), déjà utilisé par `inbound-email`.
- Le push app → n8n porte le même Bearer pour que n8n vérifie l'origine.
- Idempotence : un `execution` identique (même studio/type/fenêtre) ne doit pas doubler un envoi. Prévoir une clé d'idempotence.

**Choix d'archi structurant** : n8n **ne se connecte pas à Supabase directement**. Il passe par l'app. Raison : garder la logique de gating et le respect des droits centralisés, et ne pas diffuser la clé `service_role` sur le VPS n8n.

---

## 5. Sources de données par automatisation [À TRANCHER — le vrai point dur]

Rien ne se construit tant que la provenance des données n'est pas fixée. Table des besoins :

| Automatisation | Donnée nécessaire | Piste app existante | Décision requise |
|---|---|---|---|
| `solleciti` | factures impayées + contact débiteur | table `contacts` existe ; **pas** de table `invoices` | Créer une table `invoices` saisie dans l'app ? Import CSV ? Compta externe ? |
| `appuntamenti` | RDV à venir + contact | table `contacts` existe ; pas de table `appointments` | Google Calendar du client (connecteur) ou table `appointments` dans l'app ? |
| `pubblicazione_social` | comptes sociaux + contenu | contenu déjà généré (`content_items`) ; Metricool connecté | Publier via l'API Metricool ? Quels réseaux (LinkedIn décidé) ? |
| `faq` | questions entrantes + base de connaissance par studio | — | Canal des questions (email ? widget site ?) et où vit la base FAQ ? |
| `modulo_contatto` | soumissions du formulaire | formulaire actuel → Airtable externe | Rapatrier dans l'app, ou garder Airtable et n8n lit Airtable ? |

Recommandation de départ : **Solleciti** est la plus vendeuse et la plus autonome. Décider en premier d'où viennent les factures (le plus simple pour un MVP : une table `invoices` saisie/importée dans l'app).

---

## 6. Gating par plan — règle centrale [ACTÉ]

Fonction utilitaire unique, réutilisée par l'UI **et** les endpoints :

```ts
function studioHasAutomation(studio: Studio, type: AutomationType): boolean {
  if (studio.plan_status !== "active") return false;
  switch (type) {
    case "appuntamenti":
    case "solleciti":
      return studio.plan === "studio_automatizzato" || studio.plan === "studio_360";
    case "pubblicazione_social":
    case "modulo_contatto":
      return studio.addon_presenza_online || studio.plan === "studio_360";
    case "faq":
      return /* à définir §2 */ false;
  }
}
```

Garantit qu'on n'agit jamais hors plan, même si un `is_active` traîne en base.

---

## 7. Refonte de l'UI Automazioni (client) [ACTÉ]

Retirer du côté client :
- le champ « URL webhook n8n » ;
- le bouton « Prova connessione ».

Nouvelle carte par automatisation :
- **Incluse dans le plan** → toggle `is_active` réel (le client peut mettre en pause) + badge « Attiva / In pausa ».
- **Non incluse** → état verrouillé + upsell « Disponibile con [plan] » renvoyant vers `/dashboard/abbonamento`.
- Historique : conserver la colonne « Ultima esecuzione / Esito » (alimentée par les rapports n8n).

`automations.n8n_webhook_url` : cesser de l'exposer/l'utiliser côté client. L'URL cible se dérive du type : `${N8N_BASE_URL}/webhook/<type>`. Colonne conservée en base (rétro-compat) mais dépréciée.

---

## 8. Configuration / variables d'environnement [ACTÉ]

| Variable | Rôle |
|---|---|
| `N8N_BASE_URL` | Base des webhooks n8n de l'agence, ex `https://n8n.freelancerai.eu` |
| `N8N_SHARED_SECRET` | Secret Bearer partagé app ↔ n8n (les deux sens) |

---

## 9. Impacts base de données [À TRANCHER selon §5]

- **Aucune table d'exécutions dédiée aujourd'hui** : le suivi se fait via `automations.last_run_at` / `last_run_status`. Si on veut un vrai historique multi-lignes, créer `automation_executions` (studio_id, type, status, detail, created_at). Sinon on garde le « dernier run » seulement.
- Tables données éventuelles selon décisions §5 : `invoices`, `appointments`.
- `automations.n8n_webhook_url` : dépréciée, non supprimée dans un premier temps.

---

## 10. Sécurité — points de vigilance [ACTÉ]

- `N8N_SHARED_SECRET` strictement serveur, rotation possible.
- `/api/n8n/*` rejette toute requête sans Bearer valide (401), comparaison constante.
- Push app → n8n signé par le même secret ; n8n rejette sinon.
- Idempotence sur les envois (éviter de relancer deux fois la même facture).
- Rate limiting raisonnable sur `/api/n8n/*`.
- Les données par studio ne quittent l'app que scopées par `studio_id`, jamais en masse non filtrée.

---

## 11. Phasage proposé [ACTÉ]

- **Phase A — socle** : refonte UI (retrait URL client, gating par plan §6/§7) + `N8N_BASE_URL`/`N8N_SHARED_SECRET` + squelette `/api/n8n/*`. Aucune donnée métier encore, mais base propre et sûre.
- **Phase B — première automatisation pull** : Solleciti de bout en bout (dépend de la décision §5 sur les factures).
- **Phase C — pull Appuntamenti + push FAQ / Modulo contatto**.
- **Phase D — Pubblicazione social** (Presenza Online, via Metricool).

---

## 12. Décisions à prendre avant de coder (récap)

1. **§2** : à quel(s) plan(s) rattacher `faq` ?
2. **§5 Solleciti** : d'où viennent les factures (table app à saisir / import CSV / compta externe) ?
3. **§5 Appuntamenti** : Google Calendar du client ou saisie dans l'app ?
4. **§5 Modulo contatto** : rapatrier dans l'app ou n8n lit l'Airtable existante ?
5. **§9** : historique d'exécutions multi-lignes (`automation_executions`) ou on garde juste le dernier run ?
6. Confirmer l'URL réelle du n8n agence pour `N8N_BASE_URL`.
