# Stand NFC pour avis clients (Climbo)

Supports pour collecter les avis via NFC + QR, à revendre dans l'offre AutomaIA/Climbo (hôtellerie/restauration Rimini).

## Fichiers

- **Climbo_chevalet_recensioni.pdf** : chevalet de table A6 « Com'è andata? » (italien), zone tap NFC + QR. À personnaliser par client : nom/logo (`[ Nome dell'attività ]`) et le QR (placeholder actuel ; remplacer par le vrai lien d'avis Climbo du client).
- **Climbo_fiche_NFC.pdf** : fiche A4 matériel + programmation (quelle puce, où acheter, comment écrire le lien avec NFC Tools).
- **chevalet-source.html** / **fiche-source.html** : sources HTML (polices et QR placeholder embarqués en base64) pour régénérer ou modifier les PDF via un navigateur (impression PDF, format A6 / A4).

## Rappels clés

- Puce recommandée : **NTAG215** (NXP), vierge/réinscriptible. Éviter Mifare Classic (mal lue par iPhone).
- Toujours garder le **QR en complément** du NFC (compatibilité 100%).
- Programmation : appli **NFC Tools** → Écrire → URL → coller le lien d'avis Climbo → approcher la puce.
- Coller la puce au dos du chevalet, derrière la zone « Tocca qui ». Éviter le métal (ou puce on-metal).
