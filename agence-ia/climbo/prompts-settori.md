# Prompts des assistants par secteur : Hotel et Ristorante

> Modèles à copier dans l'espace de chaque client Climbo.
> **Limite Climbo** : l'assistant de la documentation annonce 500 caractères par champ, mais le champ d'Automa Risposte de Manuvo a **réellement gardé 1 000 caractères** (le reste a été coupé, constaté le 28/11/2026). Par prudence, les modèles ci-dessous restent sous 500. Ces consignes **s'ajoutent** aux instructions de base de l'assistant, elles ne les remplacent pas. **Toujours vérifier après collage que la fin du texte est présente.**
> Tous les prompts ci-dessous font **moins de 500 caractères une fois remplis**, à condition que la ligne de faits fasse **au plus 120 caractères**.
> Réglage indispensable : **ton `Formal`** sur Automa Risposte (le ton chaleureux produit du tutoiement malgré le prompt).

Correspondance des noms dans la documentation Climbo : SEO Agent = Automa Risposte, Social Agent = Automa Social, GEO Agent = Automa Ricerca.

---

## Étape 1 : la ligne de faits (à l'onboarding, avec le titolare)

Une seule ligne, **120 caractères maximum**, collée à la place de `[FATTI]` dans les 3 assistants. Ce qui n'y figure pas n'existe pas pour l'assistant. Mettre en priorité ce qui est vrai et ce qui n'existe **pas** (c'est ce qui évite les inventions).

**Hotel**, modèle :
```
Hotel 3 stelle a Viserba di Rimini, 50 m dal mare, colazione a buffet, piscina, bici; niente parcheggio, niente spa
```

**Ristorante**, modèle :
```
Ristorante di pesce a Rimini Marina Centro, pasta fatta in casa, terrazza; niente consegna, niente menu senza glutine
```

Jamais de prix, jamais un fait non confirmé par le titolare.

---

## Étape 2 : Automa Risposte (SEO Agent)

**Où** : Reputation > AI Agent > Setup.
**Prérequis** : Google connecté via **Google Login**. L'assistant ne répond **qu'aux avis Google** (les autres plateformes restent à traiter à la main).
**Réglages** : ton `Formal` ; longueur `Normal` ; langue automatique (il répond dans la langue de chaque avis) ; seuil 4 étoiles (en dessous, réponse manuelle) ; « Override manual settings » activé.
**Délai** : la réponse part entre 2 et 5 heures après l'avis, pour paraître naturelle.
**Keywords** (champ séparé, jusqu'à 30, 60 caractères chacun) : mettre ici les mots-clés, pas dans le prompt.

### Hotel (Additional instructions)
```
Usa sempre il Lei, mai il tu (in tedesco Sie). Ringrazia l'ospite per nome e riprendi un dettaglio della recensione. Fatti: [FATTI]. Non inventare servizi, sconti, rimborsi o upgrade; mai numeri di camera o dati della prenotazione. Se negativa: scusati senza giustificarti e invita a scrivere a [EMAIL], niente emoji. Se positiva: invita a tornare. Massimo 4 frasi.
```
Keywords : `hotel a [città]`, `hotel vicino al mare [città]`, `hotel per famiglie [città]`, `hotel [quartiere]`, `colazione [città]` (seulement ce qui correspond à des services réels).

### Ristorante (Additional instructions)
```
Usa sempre il Lei, mai il tu (in tedesco Sie). Ringrazia per nome e riprendi un dettaglio (piatto, servizio, atmosfera). Fatti: [FATTI]. Non inventare piatti, sconti, omaggi o promesse; niente affermazioni su allergie. Se negativa: scusati senza giustificarti e invita a scrivere a [EMAIL], niente emoji. Se positiva: invita a tornare a tavola. Massimo 4 frasi.
```
Keywords : `ristorante a [città]`, `ristorante di pesce [città]`, `dove mangiare a [città]`, `pizzeria [quartiere]`, `cucina romagnola [città]` (selon la cuisine réelle).

---

## Étape 3 : Automa Social (Social Agent)

**Réglages** : type de publication Post (ou Story) ; légende en `Italiano`, ton chaleureux, longueur courte ; 1 fois par semaine ; seuil 4 étoiles ; photos réelles de l'établissement dans sa bibliothèque.

### Hotel (Additional instructions)
```
Scrivi in italiano dando del Lei al lettore, tono caldo. Ringrazia l'ospite solo con il nome di battesimo e riporta solo ciò che dice la recensione. Fatti: [FATTI]. Non inventare prezzi, offerte, date o servizi. Massimo 2 emoji e 3 hashtag (#[Città] #RivieraRomagnola #[Nome]). Chiudi con: prenoti direttamente su [SITO].
```

### Ristorante (Additional instructions)
```
Scrivi in italiano dando del Lei al lettore, tono caldo. Ringrazia il cliente solo con il nome di battesimo e riporta solo ciò che dice la recensione. Fatti: [FATTI]. Non inventare piatti, prezzi, offerte o date. Massimo 2 emoji e 3 hashtag (#[Città] #RivieraRomagnola #[Nome]). Chiudi con: prenoti il Suo tavolo al [TELEFONO].
```

---

## Étape 4 : Automa Ricerca (GEO Agent)

**Réglages** : langue `Italiano` (anglais par défaut, à changer) ; longueur normale ; 1 fois par semaine ; image de couverture **« Dalla libreria »** uniquement (vraies photos, jamais « Fotorealistico » pour un hôtel ou un restaurant) ; **Auto-approve désactivé** le premier mois (fenêtre de 24 h pour valider) ; partage social désactivé.

### Hotel (Additional notes)
```
Scrivi in italiano dando del Lei al lettore. Fatti: [FATTI]. Usa solo questi fatti e le recensioni reali: niente prezzi, servizi, distanze o eventi inventati. Articoli utili per chi organizza un soggiorno a [CITTÀ] (famiglie, spiaggia, zona [QUARTIERE]). Cita la Riviera romagnola. Sottotitoli e FAQ finale. Niente trattini lunghi. Chiudi con: prenoti direttamente su [SITO].
```

### Ristorante (Additional notes)
```
Scrivi in italiano dando del Lei al lettore. Fatti: [FATTI]. Usa solo questi fatti e le recensioni reali: niente piatti, prezzi, orari o eventi inventati, niente affermazioni su allergie. Articoli utili per chi cerca dove mangiare a [CITTÀ] (pesce, vista mare, piatti romagnoli). Sottotitoli e FAQ finale. Niente trattini lunghi. Chiudi con: prenoti il Suo tavolo al [TELEFONO].
```

---

## Étape 5 : vérifier avant d'activer (15 minutes)

1. **Longueur** : après collage, vérifier que la fin du texte (« Massimo 4 frasi. », « Chiudi con… ») est bien présente. Si elle est coupée, raccourcir la ligne de faits.
2. **Risposte** : générer une réponse à un avis positif et à un avis négatif. Vérifier le Lei, l'absence de promesse et la longueur.
3. **Social** : générer un post. Il ne doit citer que l'avis et les faits.
4. **Ricerca** : premier article en validation manuelle, relu avec la checklist du kit (section « Automa Ricerca : leçons des 2 premiers articles »).
5. Si un assistant tutoie : ton en `Formal`. S'il invente un service : l'ajouter en « niente … » dans la ligne de faits.
