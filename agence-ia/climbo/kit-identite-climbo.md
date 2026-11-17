# Kit d'identité AutomaIA pour Climbo (marque blanche)

> Valeurs exactes à saisir dans le dashboard Climbo (mode agence). L'API Climbo ne permet que de **lire** le thème et les plans, donc ces réglages se font à la main : environ 15 minutes.
> État lu via le MCP le 16 nov 2026 : nom « AutomaIA » et lien « powered by » déjà en place ; logo, favicon, couleur (`#000000`) et assistants encore aux valeurs par défaut de Climbo.

⚠️ **Règle fiscale à respecter** : tu peux tout configurer maintenant, mais **aucun client payant ni lien de paiement public avant l'ouverture de la P.IVA, le 4 janvier 2027** (sinon la date de début d'activité bascule et tu perds une année de forfettario). Le client de démo Manuvo reste sur le « Demo Plan » gratuit.

---

## 1. Branding de l'agence

Dashboard Climbo → mode agence → réglages de marque (Brand).

| Champ | Valeur | Fichier (dans `agence-ia/marque/`) |
|---|---|---|
| Nom de marque | `AutomaIA` | déjà en place |
| Logo | logo couleur, fond transparent | `logo-automaia.png` (1600×460) |
| Favicon | icône carrée | `favicon.png` (256×256) |
| Logo « powered by » | logo couleur | `logo-automaia.png` |
| Lien « powered by » | `https://automa-ia.net` | à vérifier : `www.automa-ia.net` est en place, garde-le seulement s'il redirige bien |
| Couleur principale | `#0F2A4A` (bleu nuit) | |
| Police | `Inter` | déjà en place (c'est ta police de texte) |
| Arrondi des angles | `8` | |

Les fichiers se téléchargent depuis GitHub (dossier `agence-ia/marque/`) ou depuis ton ordinateur.

---

## 2. Assistants (réglages IA)

Pas de « Agente » ni de « IA » face au client (voix de marque : zéro jargon). On parle d'**assistants**.

| Champ Climbo | Valeur appliquée (vérifiée via MCP le 17/11/2026) | Logo |
|---|---|---|
| Nom de l'assistant (`ai_name`) | `Automa IA` | non réglable dans le dashboard |
| Phrase d'invite (`prompt_sentence`) | `Ha una domanda? Mi chieda pure.` | |
| Assistant réponses aux avis (`reply_agent`) | `Automa Risposte` | `logo-automaia-avatar.png` |
| Assistant partage (`share_agent`) | `Automa Social` | `logo-automaia-avatar.png` |
| Assistant visibilité (`geo_agent`) | `Automa Ricerca` | `logo-automaia-avatar.png` |

Limites constatées :
- Noms limités à environ 15 caractères (« Assistente Recensioni » refusé).
- Pas de champ couleur par assistant ni de logo pour le nom principal dans le dashboard (champs présents dans l'API, en lecture seule).
- Le placeholder du chat (« Ask anything to Automa IA... ») reste en anglais même avec l'interface en italien. Généré par Climbo, non modifiable : à signaler au support.

---

## 3. Les 3 plans clients (à créer dans le dashboard)

Prix **par établissement (per sede), par mois**. Option annuelle conseillée : **10 × le mensuel** (2 mois offerts). Essai gratuit : **14 jours** sur les trois plans.

| | **Essenziale** | **Crescita** (à mettre en avant) | **Completo** |
|---|---|---|---|
| Prix mensuel | **99 €** | **149 €** | **199 €** |
| Prix annuel | 990 € | 1 490 € | 1 990 € |
| Collecte d'avis (lien, QR, email, SMS) | ✅ | ✅ | ✅ |
| Réponses automatiques aux avis | ✅ | ✅ | ✅ |
| Feedback privé + widget avis pour le site | ✅ | ✅ | ✅ |
| WhatsApp, campagnes, QR par employé + classement | | ✅ | ✅ |
| Partage des meilleurs avis (Instagram, Facebook) | | ✅ | ✅ |
| Gestion fiche Google, ranking Maps, analyse du sentiment | | ✅ | ✅ |
| Articles de blog hebdo + site (GEO) | | | ✅ |
| Ranking ChatGPT / Gemini / Perplexity / Grok | | | ✅ |
| TikTok + LinkedIn, analyse des concurrents | | | ✅ |
| **Limites mensuelles** | 50 SMS, 500 emails, 0 WhatsApp, 150 000 tokens | 100 SMS, 1 000 emails, 50 WhatsApp, 400 000 tokens | 200 SMS, 2 000 emails, 100 WhatsApp, 1 000 000 tokens |

**Sites d'avis à activer** (hôtellerie/restauration à Rimini) : Google, TripAdvisor, Booking, Facebook, Expedia, TheFork/OpenTable si disponible. Désactive ceux qui ne servent pas à ta cible (Zillow, Glassdoor, Indeed, App Store…) pour garder une interface simple.

**Contrôle du coût** : en créant chaque plan, Climbo affiche la « limite maximale de dépense ». Elle doit rester **sous ~15 % du prix** du plan. Les SMS et WhatsApp vers des numéros italiens coûtent plus cher que les tarifs américains montrés dans la vidéo : vérifie le coût réel dans la section Saldo et ajuste les quotas si nécessaire.

**Demo Plan** : garde-le pour les comptes internes (Manuvo, démos), sans lien de paiement public.

---

## 4. Textes en italien

### Descriptions des plans (page de paiement)

- **Essenziale** : Più recensioni a 5 stelle e una risposta curata per ognuna, senza che Lei debba occuparsene.
- **Crescita** : Tutto l'Essenziale, più WhatsApp, le recensioni migliori pubblicate sui Suoi social e la Sua scheda Google sempre aggiornata.
- **Completo** : Tutto il Crescita, più un articolo a settimana sul Suo sito e il monitoraggio della Sua posizione su Google e su ChatGPT.

### Site d'agence (site clé-en-main Climbo)

**Titre :** Più recensioni a 5 stelle. Più clienti che La trovano.

**Sous-titre :** Raccogliamo le recensioni dei Suoi clienti, rispondiamo a ognuna e La facciamo trovare su Google e sugli assistenti come ChatGPT. Lei continua a occuparsi della Sua attività.

**Bénéfice 1 : Più recensioni, ogni settimana.**
Un QR al banco, un link o un messaggio WhatsApp dopo la visita: i clienti soddisfatti lasciano la recensione in pochi secondi.

**Bénéfice 2 : Ogni recensione riceve una risposta.**
Risposte curate e personali, pubblicate per Lei, con le parole che i clienti cercano su Google.

**Bénéfice 3 : Trovato su Google e su ChatGPT.**
Un articolo locale ogni settimana e il monitoraggio della Sua posizione su Google Maps e sugli assistenti come ChatGPT e Gemini.

**Ligne locale :** AutomaIA, Rimini. Lavoriamo con hotel, ristoranti e attività dell'Emilia-Romagna.

**CTA unique :** Richieda il Suo report di visibilità gratuito.
(Brancher ce bouton sur le formulaire « rapport de visibilité » de Climbo : c'est ton aimant à prospects.)

---

## 5. Ordre de mise en place (15 min)

1. Branding (section 1) : nom, logo, favicon, couleur, arrondi, lien « powered by ».
2. Assistants (section 2) : nom, phrase d'invite, 3 assistants avec couleurs et logos.
3. Plans (section 3) : créer Essenziale, Crescita, Completo. Ne pas diffuser les liens de paiement avant le 4 janvier 2027.
4. Site d'agence (section 4) : coller les textes italiens et brancher le CTA sur le formulaire de rapport.
5. Me prévenir : je relis le thème via le MCP pour vérifier que tout est bien appliqué.

## 6. Restera ensuite (hors kit)

- **Stripe** : connecter ton compte Stripe à Climbo (toi, dans le dashboard).
- **Domaine personnalisé** : enregistrements DNS chez ton registrar (je te les prépare quand Climbo les affiche).
- **Manuvo comme client démo** : connecter sa fiche Google et ses réseaux (autorisations à faire toi-même).
- **Prompts italiens par secteur** (café/resto, hôtel) : à construire ensemble.
- **Prospection S2** via le MCP : recherche hôtels/restos Rimini, pipeline, rapports (0,35 € pièce, toujours avec ton accord).
