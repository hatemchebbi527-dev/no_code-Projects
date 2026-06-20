# Workflow : Veille AutomaIA

> Workflow n8n de veille automatisée. Surveille des actualités selon des mots-clés et les enregistre dans un Google Sheet.
> Statut : opérationnel. Dernière mise à jour : 2026-06-19

---

## À quoi ça sert

Surveiller en continu les actualités d'un secteur (ou les signaux clients) sans rien faire manuellement. Le workflow lit un flux RSS, ne garde que les actus contenant des mots-clés choisis, et ajoute chaque actu pertinente dans un Google Sheet.

**Cas d'usage :**
- Veille sectorielle (rester informé sur sa niche)
- Génération d'idées de contenu
- Base de départ pour une "veille leads" (détecter des signaux d'opportunité)

---

## Comment ça marche (3 étapes)

```
[RSS Veille]  →  [Filtre mots-clés]  →  [Ajout Sheet]
 (trigger)         (node Code JS)         (Google Sheets)
```

1. **RSS Veille** (RSS Feed Trigger) : interroge un flux RSS à intervalle régulier. Chaque actu arrive sous forme d'objet JSON (`title`, `link`, `isoDate`...).
2. **Filtre mots-clés** (node Code, JavaScript) : ne garde que les actus dont le titre contient au moins un mot-clé.
3. **Ajout Sheet** (Google Sheets, Append) : ajoute une ligne par actu retenue.

---

## Configuration

### Flux RSS (exemple Google News, ciblé italien)
```
https://news.google.com/rss/search?q=MOTS+CLES&hl=it&gl=IT&ceid=IT:it
```

### Code de filtrage (node Code)
```javascript
// Les mots-clés à surveiller (utiliser des racines de mots)
const keywords = ["avvocat", "commercialist", "notaio", "studio legale", "automazione", "fisco", "tasse", "intelligenza artificiale"];

const risultati = [];
for (const item of $input.all()) {
  const titolo = (item.json.title || "").toLowerCase();
  const trovato = keywords.some(k => titolo.includes(k.toLowerCase()));
  if (trovato) {
    risultati.push(item);
  }
}
return risultati;
```

### Google Sheets (Append)
Colonnes mappées :
- `titre` → `{{ $json.title }}`
- `lien` → `{{ $json.link }}`
- `date` → `{{ $json.isoDate }}`

---

## Comment l'adapter à un client

- **Changer le sujet** : modifier les mots-clés et la requête RSS selon le secteur du client.
- **Changer la destination** : remplacer Google Sheets par Airtable, Notion, un email, etc.
- **Affiner le filtre** : ajouter des conditions (langue, source, exclusions).

---

## Points d'attention

- Les mots-clés doivent matcher le **vocabulaire réel** du flux (utiliser des racines : `avvocat` plutôt que `avvocato`).
- Éviter les mots trop courts qui génèrent du bruit (ex : `ia`, `ai` en italien).
- Le RSS Feed Trigger ne se déclenche que sur du **nouveau** contenu.
