# Prise de contact artisans : brouillons Gmail + relance J+4

Deux workflows n8n qui transforment le CRM Notion en messages prêts à partir. Ils ne connectent pas d'envoi automatique : **ils préparent des brouillons dans ta boîte Gmail, tu relis et tu envoies.**

| Fichier | Rôle |
|---|---|
| `primo-contatto-bozze-gmail.json` | Prépare les brouillons du premier contact |
| `relance-j4-bozze-gmail.json` | Prépare la relance 4 jours après, si pas de réponse |

Source des données : la base Notion **CRM Artigiani — Manuvo (Rimini)** (`e29b4127-a440-4683-9f62-7d1aef3dfeaf`), alimentée par le workflow `workflows/prospezione-artigiani/`.

---

## Avant de lancer : ce que tu dois savoir

**Seul un tiers de la base est concerné.** Sur 184 artisans, 67 ont une adresse email et 184 ont un téléphone. Le cold email ne remplace pas l'appel, il le complète.

**Le cadre légal italien.** L'article 130 du Codice Privacy exige le consentement préalable pour la prospection commerciale par email, et le Garante a déjà sanctionné des campagnes B2B non sollicitées. Le fait que la majorité des adresses soient des boîtes génériques (`info@`) joue en ta faveur, mais ce n'est pas une garantie. Les garde-fous intégrés au message :

- la **provenance de l'adresse** est annoncée (« Le scrivo all'indirizzo pubblicato sulla sua scheda Google »), ce qu'exige l'article 14 du RGPD quand la donnée ne vient pas de la personne ;
- un **moyen de refus** simple et explicite (« basta rispondere "no grazie" ») ;
- l'**identité complète** de l'expéditeur, avec site et email.

Quand quelqu'un demande à ne plus être contacté, passe sa fiche à `Stato = Non interessato` : le workflow ne la reprendra plus. Parles-en à ton commercialista, ça fait partie de ce qu'il doit savoir de ton activité.

**N'envoie pas depuis Resend ni depuis `no-reply@automa-ia.net`.** Ce domaine porte les emails transactionnels de Manuvo, dont les réinitialisations de mot de passe. Brûler sa réputation casserait le produit, et les conditions de Resend interdisent la prospection non sollicitée. D'où le choix de Gmail, avec ton compte habituel.

---

## Mise en route

1. **Importe les deux workflows** dans n8n.
2. **Credentials** : la credential **Notion API** sur tous les nœuds Notion, la credential **Gmail OAuth2** sur tous les nœuds Gmail.
3. **Relis le nœud `Componi email`** du premier workflow : nom, signature, liens, et surtout le texte du message. C'est ta voix, pas la mienne, change ce qui ne te ressemble pas.
4. **Lance `Primo contatto` à la main** une première fois. Va dans Gmail, ouvre les brouillons, lis-en trois ou quatre en entier.
5. Quand le texte te convient, envoie-les.
6. **Active le trigger quotidien de la relance** seulement après avoir envoyé la première salve.

---

## Workflow 1 : premier contact

```
Avvia preparazione
  → Notion · Prospect da contattare   Email remplie, Contattato décoché,
                                      Stato ≠ "Non interessato"
  → Estrai prospect                   tri Alto d'abord, plafond MAX_PER_RUN = 25
  → Uno alla volta                    boucle
       → Componi email                objet + corps, autour de l'Accroche de Notion
       → Gmail · Crea bozza           brouillon, rien n'est envoyé
       → Notion · Segna contattato    Stato = Contattato, Contattato ☑, Ultimo contatto = aujourd'hui
  → Riepilogo                         nombre de brouillons prêts
```

**Le corps de l'email n'appelle pas Claude.** L'accroche personnalisée existe déjà dans Notion, écrite pendant la prospection. Le reste est un gabarit fixe. C'est moins cher, et tu sais exactement ce qui part.

Un détail qui compte : les accroches de Notion commencent presque toutes par « Buongiorno », et le gabarit salue déjà. Le nœud retire donc le salut de l'accroche avant de l'insérer. Sans ça, chaque email disait bonjour deux fois, ce qui se repère immédiatement.

**Notion est marqué `Contattato` au moment où le brouillon est créé**, pas à l'envoi. Si tu décides de ne pas envoyer un brouillon, décoche la case à la main, sinon l'artisan ne ressortira plus.

---

## Workflow 2 : relance J+4

```
Ogni giorno 09:12  (ou lancement manuel)
  → Notion · Contattati da 4 giorni   Contattato ☑, Follow-up J+4 ☐,
                                      Stato = Contattato, Ultimo contatto ≤ J-4
  → Uno alla volta
       → Gmail · Cerca inviata        le premier email est-il vraiment parti ?
       → Gmail · Cerca risposta       a-t-il répondu ?
       → Controllo risposte           décide
       → Da relanciare ?
            oui → Componi relance → Gmail · Bozza relance → Follow-up J+4 ☑
            non → Chiudi senza relance (Follow-up J+4 ☑, rien n'est écrit)
  → Riepilogo relance                 relances prêtes, qui a répondu, non vérifiés
```

**Trois protections :**

- Si l'artisan a répondu, aucune relance. Son nom sort dans `risposte` du Riepilogo pour que tu le traites à la main.
- Si la recherche Gmail échoue, aucune relance non plus. On ne relance jamais à l'aveugle. Le nom sort dans `mai_verificati`.
- Une seule relance par artisan : `Follow-up J+4` se coche dans tous les cas, la fiche ne ressort plus.

---

## Réglages

| Levier | Où |
|---|---|
| Nombre de brouillons par run | `Estrai prospect`, constante `MAX_PER_RUN` (25) |
| Texte du premier email | `Componi email`, en tête du nœud |
| Texte de la relance | `Componi relance` |
| Délai avant relance | corps JSON de `Notion · Contattati da 4 giorni`, `$now.minus(4, 'days')` |
| Heure de la relance | nœud `Ogni giorno 09:12` |

---

## Dépannage

| Symptôme | Cause et correction |
|---|---|
| Aucun brouillon, `Riepilogo` à 0 | Tout le monde est déjà `Contattato`, ou aucune fiche n'a d'email. Vérifie dans Notion avec un filtre `Email n'est pas vide` et `Contattato` décoché. |
| Le nœud Gmail de recherche renvoie une erreur de paramètre | Selon la version de n8n, le champ de recherche s'appelle `q` sous `filters` ou sous `options`. Ouvre le nœud, cherche le champ de requête et recolle `in:sent to:{{ $json.email }}`. |
| La relance part alors que l'artisan a répondu | Sa réponse est arrivée d'une autre adresse que celle de la fiche. Passe sa fiche à `Stato = Interessato` ou `Non interessato` à la main. |
| `404 object_not_found` sur un nœud Notion | La base n'est pas partagée avec l'intégration. Voir le README de `prospezione-artigiani`. |
| Un brouillon part avec le mauvais texte | Relis `Componi email`. Et rappelle-toi la règle apprise sur le workflow de prospection : dans une boucle, `$('Nœud').first()` peut renvoyer le tour précédent. |

---

## La suite

Ces deux workflows couvrent les 67 fiches avec email. Les 117 autres n'ont qu'un téléphone, et pour un artisan c'est le meilleur canal. La brique qui manque est une **liste d'appels du jour** : une vue Notion filtrée sur `Email` vide et `Contattato` décoché, triée par `Punteggio IA`, avec l'accroche sous les yeux comme amorce de conversation. Pas besoin de workflow pour ça, une vue suffit.
