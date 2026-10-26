# Prospezione Automatica — recherche et qualification de leads (Commercialisti)

**STATO : FUNZIONANTE, testé en conditions réelles le 09/07/2026.** 20 studios cherchés, 3 déjà
connus filtrés automatiquement, 18 nouveaux qualifiés et ajoutés au CRM.

Workflow n8n qui cherche des studios (Commercialisti pour commencer), les qualifie avec l'IA,
génère une accroche personnalisée, et crée les leads pertinents directement dans le CRM Airtable,
sans doublons.

---

## Ce que ce workflow fait, et ne fait pas

**Fait** : cherche des studios via l'**API Google Places** (annuaire d'entreprises public, données
professionnelles publiques : nom, adresse, téléphone, site, note). Fait qualifier chaque
studio par Claude sur des critères **structurels uniquement** (taille probable, indépendance,
absence de marque nationale/multinationale) et générer une accroche italienne prête à l'emploi
basée sur des faits concrets. Vérifie s'il existe déjà dans le CRM avant de créer une fiche.

**Important : la qualification n'utilise JAMAIS le contenu ou le ton des avis clients.** Le
sentiment des avis (satisfaction envers le commercialiste) ne dit rien sur si c'est un bon
prospect pour AutomaIA. Seul le nombre d'avis est utilisé, comme indice léger de visibilité/taille,
jamais leur contenu.

**Ne fait pas** : chercher ou extraire des profils LinkedIn automatiquement. Le scraping LinkedIn
viole ses conditions d'utilisation et expose le compte à un bannissement. Retrouver le titulaire
sur LinkedIn et envoyer le message reste une étape **manuelle**, comme pour les 7 premiers
prospects. C'est aussi ce qui rend le contact humain plus crédible.

**Coût à surveiller** : Google Places API est payant à l'usage au-delà d'un crédit gratuit mensuel
(vérifier le pricing actuel sur Google Cloud). L'appel Claude (Sonnet) par studio a aussi un coût
API. Pour une recherche de 20 studios, c'est de l'ordre de quelques dizaines de requêtes au total,
négligeable, mais à garder en tête si tu élargis beaucoup la recherche.

---

## Prérequis : la clé Google Places (à faire une fois)

1. Va sur https://console.cloud.google.com, crée un projet (ou réutilise un existant)
2. Active l'API **Places API** (bibliothèque d'API)
3. Crée une clé API (Identifiants → Créer des identifiants → Clé API)
4. Restreins-la à "Places API" uniquement (sécurité)
5. Dans n8n : Credentials → New → **Query Auth** (ou "Generic Credential" selon ta version)
   - Name : `Google Places API`
   - Query Parameter Name : `key`
   - Value : ta clé
   - Save

Le principe est le même que pour ta clé Anthropic : jamais collée dans un node en clair,
toujours dans une credential.

---

## Le workflow, node par node

### 1. Manual Trigger — "Avvia ricerca"
Pour lancer à la demande. Tu pourras plus tard le remplacer par un Schedule Trigger
(ex : chaque lundi) une fois que tu fais confiance au résultat.

### 2. Set — "Config Ricerca"
Les paramètres de la recherche, pour pouvoir réutiliser ce workflow sur d'autres secteurs
plus tard (avvocato, notaio...) en changeant juste ce node.

| Champ | Valeur |
|---|---|
| query | `commercialista` |
| area | `Rimini, Italia` |
| settoreAirtable | `Commercialista` (doit correspondre exactement à un choix du champ Settore) |

### 3. HTTP Request — "Google Places · Cerca"
- Method : GET
- URL : `https://maps.googleapis.com/maps/api/place/textsearch/json`
- Query Parameters :
  - `query` = `{{ $json.query }} a {{ $json.area }}`
  - `language` = `it`
  - `region` = `it`
- Authentication : Generic Credential Type → Query Auth → `Google Places API`

### 4. Code — "Estrai risultati"
```javascript
const results = $input.first().json.results || [];
return results.map(r => ({ json: r }));
```
Transforme le tableau `results` de la réponse Google en items n8n séparés, un par studio.

### 5. Filter — "Solo aperti"
- Condition : `{{ $json.business_status }}` **Equals** `OPERATIONAL`
- Écarte les établissements fermés définitivement ou temporairement.

### 6. SplitInBatches — "Uno alla volta"
- Batch Size : 1
- Pour traiter les studios un par un (évite de saturer les API et facilite le debug).

### 7. HTTP Request — "Google Places · Dettagli"
- Method : GET
- URL : `https://maps.googleapis.com/maps/api/place/details/json`
- Query Parameters :
  - `place_id` = `{{ $json.place_id }}`
  - `fields` = `name,formatted_phone_number,formatted_address,website,rating,user_ratings_total,reviews,business_status`
  - `language` = `it`
- Authentication : même credential `Google Places API`

Le champ `reviews` renvoie jusqu'à 5 avis publics avec leur texte : c'est notre matière de
qualification, pas besoin de scraper le site du studio.

### 8. Airtable — "Verifica duplicato"
- Resource : Record → Operation : Search
- Base : `AutomaIA - CRM Prospect`, Table : `Prospects`
- Filter by Formula : `{Nome} = "{{ $json.name }}"`

### 9. IF — "Già nel CRM?"
- Condition : le node précédent a renvoyé au moins 1 résultat
- **true** → relie vers un node NoOp "Salta (duplicato)" (fin de branche)
- **false** → continue vers l'étape 10

### 10. Code — "Prepara testo recensioni"
```javascript
const d = $json;
const reviews = (d.reviews || [])
  .slice(0, 3)
  .map(r => `"${(r.text || '').slice(0, 200)}"`)
  .join(' / ');

return [{
  json: {
    nome: d.name,
    telefono: d.formatted_phone_number || '',
    indirizzo: d.formatted_address || '',
    sito: d.website || '',
    rating: d.rating || null,
    numRecensioni: d.user_ratings_total || 0,
    recensioni: reviews || 'Nessuna recensione disponibile.'
  }
}];
```

### 11. HTTP Request — "Claude · Qualifica e genera accroche"
- Method : POST, URL : `https://api.anthropic.com/v1/messages`
- Headers (comme dans tes workflows existants) : `x-api-key` (via credential), `anthropic-version: 2023-06-01`, `content-type: application/json`
- Body :
```
={{ JSON.stringify({
  model: "claude-sonnet-4-6",
  max_tokens: 600,
  messages: [
    {
      role: "user",
      content: `Sei l'assistente di prospezione di AutomaIA, agenzia che aiuta piccoli studi professionali italiani (avvocati, commercialisti, notai) ad automatizzare le attività ripetitive (email, promemoria, gestione contatti).

CRITERI ICP: studio piccolo (1-5 persone), clientela numerosa con richieste ripetitive, probabile carico amministrativo pesante. Non è un buon fit uno studio molto grande e strutturato (probabilmente ha già sistemi interni), o uno studio con troppo pochi indizi per giudicare.

DATI DELLO STUDIO:
Nome: ${$json.nome}
Indirizzo: ${$json.indirizzo}
Sito: ${$json.sito}
Valutazione Google: ${$json.rating} (${$json.numRecensioni} recensioni)
Estratti di recensioni: ${$json.recensioni}

COMPITO: valuta la pertinenza di questo studio come prospect, e scrivi una riga di apertura personalizzata in italiano.

LINGUA: italiano corretto, nessuna parola in inglese o francese.
VOCE: vouvoiement "Lei" obbligatorio. Niente gergo tecnico (vietati: IA, API, automazione, software). Concreto, onesto, zero esagerazioni.

Rispondi SOLO con un oggetto JSON valido, senza altro testo: {"punteggio":"Alto|Medio|Basso","motivo":"...","segnale":"...","prima_riga":"..."}`
    }
  ]
}) }}
```

### 12. Code — "Estrai qualifica"
Même logique robuste que dans tes autres workflows (isoler le JSON, try/catch) :
```javascript
const raw = $input.first().json.content?.[0]?.text ?? "";
let jsonStr = raw.trim();
const start = jsonStr.indexOf("{");
const end = jsonStr.lastIndexOf("}");
if (start !== -1 && end !== -1) jsonStr = jsonStr.slice(start, end + 1);

let data;
try { data = JSON.parse(jsonStr); }
catch (e) { return [{ json: { errore_parsing: true, raw } }]; }

const prev = $('Prepara testo recensioni').item.json;

return [{
  json: {
    nome: prev.nome,
    telefono: prev.telefono,
    sito: prev.sito,
    rating: prev.rating,
    numRecensioni: prev.numRecensioni,
    punteggio: data.punteggio || 'Basso',
    motivo: data.motivo || '',
    segnale: data.segnale || '',
    prima_riga: data.prima_riga || ''
  }
}];
```

### 13. IF — "Punteggio sufficiente?"
- Condition : `{{ $json.punteggio }}` **Not Equals** `Basso`
- **false** → NoOp "Scartato (punteggio basso)"
- **true** → continue

### 14. Airtable — "Crea in CRM"
- Resource : Record → Operation : Create
- Base : `AutomaIA - CRM Prospect`, Table : `Prospects`
- Champs :
  - Nome = `{{ $json.nome }}`
  - Settore = `{{ $('Config Ricerca').item.json.settoreAirtable }}`
  - Stato = `Nuovo`
  - Fonte = `Altro` (ou `Ricerca automatica` si tu ajoutes ce choix dans Airtable)
  - Telefono = `{{ $json.telefono }}`
  - Note = `={{ "Punteggio: " + $json.punteggio + ". " + $json.motivo + " | Segnale: " + $json.segnale + " | Accroche: " + $json.prima_riga + " | Google: " + $json.rating + "/5 (" + $json.numRecensioni + " recensioni) | Sito: " + $json.sito }}`
  - Data contatto = `{{ $now.toISODate() }}` (date de découverte, pas de contact réel — sert de repère)

Relie ensuite ce node en retour vers le node **SplitInBatches** (étape 6) pour boucler sur le
studio suivant. Les branches "Salta" et "Scartato" se referment aussi vers SplitInBatches.

---

## Comment relancer sur un autre secteur

Change uniquement le node **Config Ricerca** (étape 2) :
- `query` = `avvocato` ou `notaio`
- `settoreAirtable` = `Avvocato` ou `Notaio` (doit matcher exactement les choix Airtable)

Tout le reste du workflow reste identique.

---

## Critère "fait"

Lancer le workflow une fois sur "commercialista, Rimini" et vérifier :
1. De nouvelles fiches apparaissent dans la table Prospects, avec Note remplie (punteggio, accroche)
2. Aucun doublon avec les 7 studios déjà présents
3. Les studios à faible pertinence sont bien écartés (pas de fiche créée)

À partir de là : reprendre la même méthode qu'avec les 7 premiers prospects (retrouver le
titulaire sur LinkedIn, utiliser l'accroche générée, envoyer le message).
