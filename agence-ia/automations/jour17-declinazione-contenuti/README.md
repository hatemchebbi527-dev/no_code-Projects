# Jour 17 — Déclinaison de contenu (1 idée → 3 plateformes)

Offre vendable : à partir d'UNE idée, produire automatiquement 3 versions de post adaptées à LinkedIn, Instagram et Facebook, en italien, dans la voix de marque AutomaIA.

> TikTok volontairement écarté (décision stratégie marketing du 19/06 : la cible libéraux n'y est pas en posture pro).

## Le concept (la leçon du jour)

Un bon livrable IA = **un prompt solide + une automatisation**. Le prompt est l'actif : c'est lui qui contient ton savoir-faire (voix, plateformes, format). L'automatisation (n8n) ne fait que l'exécuter à la demande. Tu peux facturer ce service à un cabinet : "donnez-moi une idée, je vous rends 3 posts prêts à publier".

Clé technique : on demande une **sortie en JSON** pour que n8n puisse séparer proprement les 3 textes et les router (vers un Sheet, un brouillon, un message...).

## Le workflow n8n à construire

3 nodes :

1. **Trigger** : au choix, un node Manuel (pour tester) ou un Webhook (pour appeler depuis ailleurs). Il porte une variable `idea` = l'idée de départ.
2. **Node Claude (API)** : HTTP Request vers l'API Claude (modèle Haiku ou Sonnet), avec le prompt ci-dessous. Tu as déjà la credential/clé depuis l'assistant emails.
3. **Node Code (parsing)** : isole le bloc JSON de la réponse et le transforme en champs exploitables (même logique que l'assistant emails : nettoyer les ``` éventuels, JSON.parse dans un try/catch).

Sortie attendue : 3 textes utilisables (`linkedin`, `instagram`, `facebook`).

## Le prompt de déclinaison (l'actif réutilisable)

À coller dans le corps de la requête vers l'API Claude. Remplacer `{{IDEA}}` par l'idée (en n8n : `{{ $json.idea }}`).

```
Tu es le rédacteur de contenu de AutomaIA, une agence qui aide les cabinets de professionnels libéraux italiens (avocats, comptables, notaires) à automatiser leurs tâches répétitives.

VOIX DE MARQUE (à respecter strictement) :
- Italien, vouvoiement "Lei", ton chaleureux mais professionnel.
- Clair et concret : on parle bénéfices et quotidien du client, jamais d'outils ni de jargon technique (interdits : IA, API, automation, workflow, software).
- Rassurant sur le contrôle et la confidentialité des données.
- Honnête, zéro survente (interdits : rivoluzionario, magico, garantito al 100%).
- Pas de tirets longs (em dash).

TÂCHE :
À partir de l'idée ci-dessous, écris 3 versions d'un même message, adaptées à chaque plateforme :
- linkedin : ton professionnel, un peu plus développé (4 à 6 phrases), angle valeur/expertise, une seule invitation douce à la fin.
- instagram : court et percutant, une accroche forte en première ligne, quelques emojis avec parcimonie, finir par un appel à l'action et 4 à 6 hashtags pertinents en italien.
- facebook : ton local et conversationnel, proche, orienté communauté, finir par une invitation simple à écrire en privé.

IDÉE : {{IDEA}}

FORMAT DE SORTIE :
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, de la forme :
{"linkedin": "...", "instagram": "...", "facebook": "..."}
```

## Pourquoi ce prompt est construit ainsi

- **Rôle + contexte** en tête : le modèle sait qui il est et pour qui il écrit.
- **Voix de marque explicite** : on recopie les règles de brand_voice.md, sinon le modèle invente un ton générique.
- **Contraintes par plateforme** : chaque réseau a son format, c'est ce qui rend les 3 versions vraiment différentes et non un copier-coller.
- **Sortie JSON imposée** : indispensable pour que n8n exploite le résultat automatiquement. "Réponds UNIQUEMENT avec du JSON" réduit le bavardage du modèle.

## Exemple de sortie (idée testée)

Idée : "Un assistant qui pré-rédige les réponses aux emails clients fait gagner plusieurs heures par semaine à un cabinet."

**LinkedIn :**
> Quante ore passa, ogni settimana, a rispondere alle email dei suoi clienti?
> Per molti studi sono diverse, spesso la sera, quando la giornata dovrebbe essere finita.
> Esiste un modo più semplice: un assistente prepara le risposte al posto suo. Lei le rilegge, le corregge se serve, e le invia con un clic. Niente parte in automatico senza la sua approvazione, e i dati dei suoi clienti restano protetti.
> Il risultato sono diverse ore libere ogni settimana, da dedicare al lavoro che conta davvero.
> Se vuole vedere come funzionerebbe nel suo studio, ne parliamo volentieri.

**Instagram :**
> Le email dei clienti Le rubano le serate? 📨
> C'è un modo per smettere.
> Un assistente prepara le risposte, Lei controlla e invia in un clic. I suoi dati restano protetti, il controllo resta suo.
> Diverse ore libere ogni settimana, per ciò che conta davvero.
> 👉 Scopra come nel suo studio.
> #automazione #studiolegale #commercialista #produttività #AutomaIA #liberiprofessionisti

**Facebook :**
> Lavora in uno studio e passa troppo tempo a rispondere alle email?
> Non è l'unico, è uno dei lavori che rubano più ore senza che ce ne accorgiamo.
> Da AutomaIA aiutiamo gli studi della zona a recuperare quelle ore: un assistente prepara le risposte ai clienti, Lei le rilegge e le invia quando vuole. Semplice, sotto il suo controllo, con i dati al sicuro.
> Vuole vedere se può funzionare anche per Lei? Ci scriva in privato, ne parliamo senza impegno.

## Critère "fait" (Jour 17)

1 idée passée dans le workflow produit 3 textes utilisables, dans ta voix, prêts à copier-coller pour publier.
