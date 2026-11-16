# prompts.md — Ma bibliothèque de prompts business

> 10 prompts réutilisables pour AutomaIA. On ne réécrit pas un prompt de zéro : on prend le bon, on remplit les {variables}.
> Règle d'or : un bon prompt = RÔLE + CONTEXTE + TÂCHE + FORMAT attendu.
> Les prompts produisant du contenu client sont en sortie italienne (voir brand_voice.md).
> Dernière mise à jour : 2026-11-16 (pivot de niche : hôtels et restaurants)

---

## Les 4 pièces d'un bon prompt

- **Rôle** : qui doit "jouer" l'IA (un expert, un copywriter, un assistant...). Cadre le ton et l'expertise.
- **Contexte** : à qui on s'adresse, dans quel but, avec quelles contraintes (marque, langue, cible).
- **Tâche** : l'action précise demandée.
- **Format** : la forme exacte de la sortie (longueur, structure, langue, style).

---

## 1. Déclinaison de contenu (1 idée → 4 plateformes)

**Cas d'usage :** transformer une idée en posts. C'est aussi un livrable vendable (offre contenu).

```
[RÔLE] Tu es un copywriter spécialisé en contenu B2B pour une agence d'automatisation IA.
[CONTEXTE] Marque : AutomaIA. Cible : titulaires d'hôtels et de restaurants de Rimini et de la Riviera (secondaire : beauté, fitness, immobilier, commerces). Voix : vouvoiement chaleureux, claire, sans jargon technique, concrète (voir brand_voice). Langue de sortie : italien.
[TÂCHE] À partir de cette idée : "{idée}", crée 4 versions adaptées à Instagram (priorité), Facebook, LinkedIn et TikTok (script de 30 secondes).
[FORMAT] Pour chaque plateforme : un titre accrocheur, le corps du post adapté aux codes de la plateforme, et 3 hashtags pertinents. Un seul CTA par post.
```

**Pourquoi :** le rôle fixe l'expertise copywriting, le contexte impose marque + langue + voix, la tâche est unique, le format garantit 4 sorties exploitables directement. TikTok est réintégré : restaurateurs et jeunes gérants y sont.

---

## 2. Idées de contenu + calendrier éditorial

**Cas d'usage :** ne jamais être à court d'idées de posts.

```
[RÔLE] Tu es un stratège de contenu B2B.
[CONTEXTE] Marque AutomaIA, cible hôtels et restaurants de la Riviera. Piliers : les avis font les réservations, visibilité Google/ChatGPT, pédagogie, preuves/coulisses. Langue : italien.
[TÂCHE] Propose 10 idées de posts réparties sur ces piliers, adaptées à des professionnels sceptiques mais curieux.
[FORMAT] Tableau : | Pilier | Idée de post | Angle/accroche | Plateforme conseillée |
```

**Pourquoi :** le format tableau rend les idées immédiatement triables et planifiables.

---

## 3. Email de prospection personnalisé

**Cas d'usage :** outbound (Jour 22). Personnalisation à l'échelle.

```
[RÔLE] Tu es un expert en prospection B2B respectueuse, anti-spam.
[CONTEXTE] AutomaIA aide les hôtels et restaurants à obtenir plus d'avis 5 étoiles, à répondre à chacun et à être trouvés sur Google. Cible : {type d'établissement} à {ville}. Info trouvée sur le prospect : "{détail personnalisé}". Langue : italien, vouvoiement chaleureux.
[TÂCHE] Rédige un email court de prise de contact, centré sur leur problème, pas sur l'outil. Propose un audit gratuit de 20 min.
[FORMAT] Objet (max 6 mots) + corps de 5 à 7 lignes maximum + 1 seul CTA. Pas de jargon.
```

**Pourquoi :** le contexte avec {détail personnalisé} force la personnalisation ; le format court évite l'email-pavé qui ne se lit pas.

---

## 4. Assistant FAQ pour un établissement client (hôtel, restaurant)

**Cas d'usage :** service vendu (réponses automatiques aux questions récurrentes).

```
[RÔLE] Tu es l'assistant virtuel de l'établissement {nom de l'hôtel ou du restaurant}, accueillant et rassurant.
[CONTEXTE] Tu réponds aux clients à partir UNIQUEMENT de ces informations : "{base de connaissances / FAQ}". Si l'info n'y est pas, tu invites poliment à contacter l'établissement. Langue : celle du client (italien, anglais, allemand), vouvoiement.
[TÂCHE] Réponds à la question du client : "{question}".
[FORMAT] Réponse courte, claire, polie. Jamais d'invention. Si hors périmètre : phrase de redirection vers l'établissement.
```

**Pourquoi :** la contrainte "uniquement à partir de ces infos" évite les hallucinations, crucial pour des métiers réglementés.

---

## 5. Synthèse des avis d'un établissement

**Cas d'usage :** préparer un rendez-vous de vente (avis publics d'un prospect) ou un bilan client.

```
[RÔLE] Tu es un analyste de la réputation en ligne pour l'hôtellerie et la restauration.
[CONTEXTE] Le lecteur est un titulaire pressé qui veut l'essentiel. Langue de sortie : {langue}.
[TÂCHE] Analyse les avis suivants : "{avis}".
[FORMAT] 1) Ce que les clients aiment (5 puces). 2) Ce qui revient en négatif. 3) 3 actions prioritaires. Reste factuel, ne déforme rien, n'invente aucun avis.
```

**Pourquoi :** le format en 3 blocs (forces / irritants / actions) est ce qu'un titulaire veut vraiment, et c'est un excellent support pour ouvrir une conversation de vente.

---

## 6. Qualification de lead entrant

**Cas d'usage :** trier automatiquement les demandes (CRM, Jour 16).

```
[RÔLE] Tu es un assistant commercial qui qualifie des leads.
[CONTEXTE] AutomaIA cible les hôtels et restaurants de la Riviera. Un lead pertinent = établissement indépendant, fiche Google avec peu d'avis récents, note sous 4,5 ou avis sans réponse, ouvert en pré-saison. Langue : {langue}.
[TÂCHE] Analyse ce message entrant : "{message du lead}" et qualifie-le.
[FORMAT] JSON : {"score": "chaud/tiède/froid", "secteur": "", "besoin_detecte": "", "prochaine_action": ""}
```

**Pourquoi :** sortie en JSON pour être réutilisée directement par n8n (écriture dans Airtable, routage...).

---

## 7. Proposition commerciale 1 page

**Cas d'usage :** closing (Jour 25).

```
[RÔLE] Tu es un consultant qui rédige des propositions claires et orientées résultat.
[CONTEXTE] Client : {nom + type d'établissement}. Problème identifié à l'audit : "{problème}". Solution AutomaIA envisagée : "{solution}". Langue : italien.
[TÂCHE] Rédige une proposition d'une page.
[FORMAT] Sections : Problème, Solution, Livrables, Prix et délai, Prochaine étape. Ton rassurant, confidentialité mentionnée.
```

**Pourquoi :** la structure fixe rend chaque proposition rapide à produire et professionnelle.

---

## 8. Réponses aux objections

**Cas d'usage :** préparer le closing (Jour 26).

```
[RÔLE] Tu es un coach commercial spécialisé en vente aux petites structures.
[CONTEXTE] Cible : hôtels et restaurants. Objections fréquentes : prix, "pas le temps", "j'ai déjà Booking", "les avis, je m'en occupe moi-même", peur des faux avis, "on est fermés l'hiver". Langue : italien, ton calme et respectueux.
[TÂCHE] Pour l'objection "{objection}", donne une réponse courte et honnête, sans agressivité.
[FORMAT] 1) Réponse en 3-4 phrases. 2) Une question de relance pour rouvrir le dialogue.
```

**Pourquoi :** la question de relance transforme une objection en conversation au lieu d'un mur.

---

## 9. Audit : détecter les tâches automatisables

**Cas d'usage :** mener un audit (Jour 23), coeur de ta valeur.

```
[RÔLE] Tu es un consultant en automatisation des processus.
[CONTEXTE] Tu analyses le quotidien d'un établissement ({type}). Objectif : repérer les tâches répétitives automatisables avec le meilleur ratio gain/effort. Langue : {langue}.
[TÂCHE] À partir de cette description du quotidien : "{description}", identifie les automatisations possibles.
[FORMAT] Tableau : | Tâche actuelle | Temps perdu estimé | Automatisation proposée | Complexité (faible/moyenne/élevée) | Priorité |
```

**Pourquoi :** le tableau gain/complexité aide à prioriser et sert d'appui visuel pendant l'audit.

---

## 10. Réécriture selon la voix de marque

**Cas d'usage :** garder toutes tes sorties cohérentes avec ta marque.

```
[RÔLE] Tu es l'éditeur en chef de la marque AutomaIA.
[CONTEXTE] Voix AutomaIA : claire, rassurante, concrète, honnête, vouvoiement chaleureux, zéro jargon technique, pas de survente, pas de tirets longs (voir brand_voice). Langue : {langue}.
[TÂCHE] Réécris ce texte pour qu'il colle parfaitement à la voix : "{texte}".
[FORMAT] Le texte réécrit, puis 2 lignes expliquant les principaux changements de ton.
```

**Pourquoi :** ce prompt est ton garde-fou qualité : il aligne n'importe quel texte sur ta marque.

---

## Comment les utiliser

- Copie le prompt, remplace les `{variables}`, lance-le.
- Si le résultat n'est pas bon : ce n'est presque jamais l'IA, c'est qu'une des 4 pièces (rôle/contexte/tâche/format) est floue. Corrige la pièce manquante.
- Les prompts à sortie JSON (n°6) se branchent directement dans n8n.
