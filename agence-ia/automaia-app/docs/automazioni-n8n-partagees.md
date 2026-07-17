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
| `faq` | **proposé : Presenza Online + Studio 360** (à confirmer) | **push** (question entrante) |

`faq` = bot de réponse aux **clients du studio**, alimenté par un **PDF que le studio téléverse** (base de connaissance propre à chaque studio). Comme il s'adresse aux visiteurs/clients du studio, il a sa place avec la présence en ligne (site vetrina). D'où le rattachement proposé à **Presenza Online** (donc inclus aussi dans Studio 360). À confirmer.

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

## 5. Sources de données par automatisation [DÉCIDÉ — sous-questions restantes]

Provenance fixée pour chaque automatisation (décisions Hatem). Restent des sous-questions techniques marquées **[SOUS-Q]**.

| Automatisation | Source décidée | Ce que ça implique |
|---|---|---|
| `solleciti` | **Compta externe du studio** | Intégration à un logiciel de compta tiers (API ou export). **[SOUS-Q]** lequel ? |
| `appuntamenti` | **Google Calendar du studio** | Connexion OAuth Google par studio. **[SOUS-Q]** flux de connexion. |
| `pubblicazione_social` | Contenu `content_items` + **Metricool** | Publication via API Metricool, LinkedIn (décidé). |
| `faq` | **PDF téléversé par le studio** | Stockage PDF + RAG par studio. **[SOUS-Q]** canal des questions. |
| `modulo_contatto` | **Rapatrié dans l'app** | Nouvelle table + endpoint form, plus d'Airtable. |

### 5.1 Solleciti — compta externe [SOUS-Q bloquante]

Le déclencheur pull a besoin des factures échues + contact débiteur, tirées de la compta du studio. Il faut trancher **quel(s) logiciel(s)** on supporte, car ça conditionne l'intégration :
- Beaucoup de commercialisti italiens utilisent **Fatture in Cloud**, **Aruba Fatturazione**, **TeamSystem/Danea**, etc.
- Deux modes possibles selon le logiciel :
  - **API** (idéal, ex. Fatture in Cloud a une API OAuth) → n8n lit les factures en direct, temps réel.
  - **Export CSV** que le studio dépose dans l'app → plus simple, moins « magique », dépend d'un geste manuel.
- Décision requise : **on commence par quel logiciel**, et **API ou CSV** ? Sans ça, Solleciti n'est pas constructible.

### 5.2 Appuntamenti — Google Calendar par studio [SOUS-Q]

- Chaque studio autorise l'accès à **son** Google Calendar (OAuth). À décider : OAuth intégré dans l'app (l'app stocke le refresh token, le passe à n8n scopé par studio) **ou** connexion gérée directement dans n8n.
- Reco : OAuth côté app (cohérent avec le principe « n8n ne parle qu'à l'app »), l'app expose les RDV à venir via `/api/n8n/pending/appuntamenti`.
- Les rappels partent vers l'email/téléphone de l'invité (depuis l'évènement calendrier, ou rapproché de la table `contacts`).

### 5.3 FAQ — RAG sur PDF du studio [SOUS-Q]

- Le studio téléverse un/des **PDF** → stockage (Supabase Storage), extraction texte, indexation (embeddings) par `studio_id`.
- À la question entrante, on récupère les passages pertinents et on répond via Claude API (déjà utilisée dans le projet).
- **[SOUS-Q]** canal des questions : widget de chat sur le site vetrina ? email dédié ? Détermine le déclencheur push.
- C'est l'automatisation la plus lourde (pipeline RAG). À garder pour une phase ultérieure.

### 5.4 Modulo contatto — rapatrié dans l'app [DÉCIDÉ]

- Nouvelle table `contact_submissions` (studio_id, nom, email, message, created_at).
- Le formulaire du site vetrina poste vers un endpoint app `/api/public/contact/<studio_token>`.
- À la soumission : enregistrement + push vers n8n (notification au studio, création de lead dans `contacts`, etc.).
- L'Airtable actuel est abandonné pour ce flux.

Recommandation de démarrage inchangée : **Solleciti** reste la Phase B, mais elle dépend de la sous-question 5.1 (logiciel de compta). Si cette intégration s'avère lourde, **Appuntamenti** (Google Calendar, API standard bien documentée) est un meilleur premier chantier concret.

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

## 9. Impacts base de données [DÉCIDÉ]

- **`automation_executions`** (DÉCIDÉ — historique multi-lignes) : `id, studio_id, type, status, detail, created_at`. La vue « Ultime esecuzioni » liste l'historique réel au lieu du seul dernier run. `automations.last_run_at`/`last_run_status` peut rester comme raccourci « dernier état ».
- **`contact_submissions`** (§5.4) : soumissions du formulaire vetrina rapatriées.
- **FAQ** (§5.3) : stockage PDF (Supabase Storage) + table d'index/embeddings par studio (phase ultérieure).
- **Appuntamenti / Solleciti** : pas de table de données propre — les données restent dans les systèmes sources (Google Calendar, compta externe), l'app ne fait que relayer scopé par studio. Éventuellement stocker les **tokens OAuth Google** par studio (`studio_integrations`).
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

## 12. Décisions — état

**Tranché :**
- Sources de données par automatisation (§5) : Solleciti = compta externe ; Appuntamenti = Google Calendar ; FAQ = PDF téléversé par le studio ; Modulo contatto = rapatrié dans l'app.
- Historique d'exécutions multi-lignes `automation_executions` (§9).
- Déclenchement mixte pull/push (§3).

**Sous-questions restantes avant de coder la Phase B :**
1. **§5.1 (bloquante pour Solleciti)** : quel logiciel de compta on supporte en premier, et via **API** ou **export CSV** ? (ex. Fatture in Cloud a une API OAuth.)
2. **§2** : confirmer que `faq` va bien dans **Presenza Online** (donc Studio 360).
3. **§5.3** : canal des questions FAQ (widget site vetrina ? email dédié ?).
4. **§8** : URL exacte du n8n agence pour `N8N_BASE_URL` (le VPS existe, il me faut l'URL précise).
5. **Ordre de la Phase B** : commencer par **Solleciti** (dépend de #1) ou par **Appuntamenti** (Google Calendar, plus autonome) ?
