# Jour 22 — Outbound : 10 premiers messages

Objectif : envoyer 10 messages personnalisés à des prospects qualifiés, pour décrocher des audits gratuits de 20 min.
Canal prioritaire : LinkedIn (ta cible y est en posture pro). Email en secours.
Voix : brand_voice.md (italien, "Lei", concret, rassurant, zéro jargon, pas de survente).

---

## 1. Qui cibler (les 10)

Critères pour cette première salve :
- **Secteur** : avocats OU comptables (ton fer de lance). Commence par UN seul secteur, c'est plus facile à affiner.
- **Zone** : Rimini et alentours (Riccione, Cesena, Forlì). Le local rassure et facilite l'audit.
- **Taille** : petit studio (1 à 5 personnes). Assez gros pour souffrir de l'administratif, assez petit pour décider vite.
- **Signal utile** : un détail repérable (poste récent, site, spécialité, avis Google). Sert à personnaliser.

But : pas 10 contacts au hasard, 10 contacts où tu peux écrire UNE phrase qui montre que tu les as regardés.

## 2. Où les trouver

- **LinkedIn** (recherche) : "Commercialista Rimini", "Avvocato Rimini". Note nom, studio, et un détail de leur profil.
- **Google Maps** : "commercialista Rimini" → studios avec fiche, site, avis. Bon pour le détail local.
- **PagineGialle / Albo professionale** : annuaires pros, pour recouper.

Au fur et à mesure, ajoute-les dans ton CRM Airtable (table Prospects) : Nome (studio), Contatto (personne), Settore, Fonte = LinkedIn, Stato = Nuovo, et dans Note le détail repéré (ta matière à personnalisation).

## 3. La séquence LinkedIn (recommandée)

### a) Note de connexion (max 300 caractères, pas de pitch)
> Buongiorno {{Nome}}, seguo gli studi {{settore}} della zona di Rimini e mi fa piacere ampliare la rete con professionisti del territorio. A presto, Hatem.

### b) Message 1 (après acceptation)
> Grazie del collegamento, {{Nome}}.
> {{prima riga personalizzata}}
> Aiuto gli studi come il Suo a recuperare diverse ore a settimana automatizzando le attività ripetitive (risposte alle email, promemoria degli appuntamenti, gestione dei contatti), mantenendo sempre il Suo controllo e la riservatezza dei dati.
> Le propongo un audit gratuito di 20 minuti: guardiamo insieme una cosa concreta da semplificare nel Suo studio, senza impegno. Le interessa?

### c) Relance (5 à 7 jours sans réponse, une seule fois)
> Buongiorno {{Nome}}, nessun problema se ora non è il momento. Le lascio comunque una breve guida gratuita con cinque automazioni utili per uno studio: {{link guida}}. Resto a disposizione se vorrà parlarne.

## 4. Variante email (si pas de LinkedIn)

**Oggetto :** Un'idea per far risparmiare tempo allo {{Studio}}

> Buongiorno {{Nome}},
> {{prima riga personalizzata}}
> Aiuto gli studi {{settore}} della zona a recuperare diverse ore a settimana automatizzando le attività ripetitive, senza perdere il controllo sui propri dati.
> Se Le fa piacere, Le offro un audit gratuito di 20 minuti per individuare una cosa concreta da semplificare nel Suo studio. Le va una breve chiamata questa settimana?
> Un saluto, Hatem — AutomaIA

## 5. La "prima riga personalizzata" (le cœur)

C'est elle qui fait la différence entre un spam et un message qui obtient une réponse. Une phrase, sur EUX, pas sur toi. Exemples :
- Avvocato : "Ho visto che il Suo studio segue molto il diritto di famiglia, un'area dove le richieste dei clienti arrivano spesso fuori orario."
- Commercialista : "Immagino che in questo periodo le scadenze fiscali Le lascino poco tempo per le risposte ai clienti."
- À partir d'un avis Google : "Ho notato gli ottimi riscontri dei Suoi clienti sulla disponibilità: è proprio quella disponibilità che si può alleggerire senza perderla."

### Méthode pour la générer à l'échelle (à exécuter sur ta machine)
Réutilise le principe du script Jour 15 / de l'assistant emails : un prompt qui prend les infos d'un prospect et renvoie UNE phrase d'accroche. Prompt type (sortie italienne, Lei) :
> Tu es Hatem (AutomaIA). À partir de ces infos sur un prospect (nome, studio, settore, dettaglio), écris UNE seule phrase d'accroche en italien, vouvoiement "Lei", chaleureuse et spécifique, qui montre que je me suis intéressé à lui. Pas de flatterie cliché, pas de pitch, pas d'emoji. Infos : {{...}}

Tu peux le faire au cas par cas (10 prospects = rapide à la main) ou automatiser via n8n (lecture d'un Sheet/Airtable → API Claude → 1re ligne par prospect).

## 6. Discipline d'envoi

- 10 messages, pas 100. La qualité de la personnalisation prime sur le volume.
- Note dans le CRM la date d'envoi et passe le Stato à "Contattato".
- Relance UNE fois après 5 à 7 jours, jamais plus.
- Objectif réel : décrocher 1 à 2 audits, pas vendre dans le message.
- Règle d'or : ne jamais sauter la prospection, même 3 minutes par jour.
