# Compagnon d'exécution 30 jours — En autonomie avec Claude Code

**But :** pratiquer ton plan 30 jours seul, en faisant de Claude Code ton tuteur principal pour apprendre vite et être prêt à signer.

**Comment lire ce doc :** la Partie A = la méthode (à maîtriser avant J1). La Partie B = le déroulé jour par jour. Chaque jour suit le même format : Objectif · Étapes · Mission Claude Code · À comprendre · Fait quand.

**Vérité utile :** Claude Code accélère surtout l'apprentissage technique et joue le rôle de mentor. Le visuel (canvas n8n, Elementor) se construit dans ces outils, et la vente se pratique en parlant, mais Claude Code te coache dans les trois cas. Règle d'or : toujours lui demander d'expliquer, jamais juste de "corriger". Sinon tu copies sans apprendre, et tu ne pourras pas livrer à un client.

---

## PARTIE A — La méthode pour apprendre seul

### 1. Setup initial (à faire avant J1, ~1h30)

a) Installe Claude Code (installateur natif recommandé, pas besoin de Node.js) :

* macOS / Linux : `curl -fsSL https://claude.ai/install.sh | bash`
* Windows (PowerShell) : `irm https://claude.ai/install.ps1 | iex`
* Vérifie : ferme/rouvre le terminal puis `claude --version`
* Lance `claude`, choisis « Claude account with subscription », authentifie-toi dans le navigateur.
* Dans Claude Code, tape `/doctor` pour vérifier que tout est OK.
* Prérequis OS : macOS 10.15+, Windows 10+, ou Linux. (La méthode `npm install -g @anthropic-ai/claude-code` existe aussi mais demande Node.js 18+.)

b) Crée ton QG de projet :

```
~/agence-ia/
  ├─ marque/        ← mets-y tes 6 fichiers .md (audience, brand_voice, etc.)
  ├─ automations/
  ├─ site/
  └─ journal.md     ← ton carnet d'apprentissage
```

Astuce clé : copie tes fichiers de marque dans `marque/`. Ainsi, quand tu ouvres Claude Code dans `~/agence-ia/`, il peut les lire et tout produire dans ta voix.

c) Crée tes comptes : Anthropic (abonnement + une clé API console.anthropic.com pour la semaine 3), n8n (cloud, essai gratuit), Airtable (gratuit), Canva, LocalWP (WordPress en local, gratuit), un éditeur (VS Code, optionnel).

d) Sécurité : ne jamais coller une clé API dans un message public ou un post. Garde-les dans un fichier `.env` local (Claude Code t'expliquera au J15).

### 2. La boucle d'apprentissage Claude Code (6 temps, à répéter chaque jour)

1. **Cadre** — donne le but + ton niveau : « je débute, explique au fur et à mesure ».
2. **Construis** — fais-le avancer par petites étapes, en validant chaque étape.
3. **Explique** — « explique chaque partie et pourquoi, comme à un débutant ».
4. **Refais** — refais une partie seul, sans aide (c'est ça qui ancre la compétence).
5. **Casse & répare** — casse volontairement, répare → tu comprends vraiment.
6. **Documente** — fais-lui écrire un mini-README → ça nourrit ton portfolio et ton contenu.

### 3. Règles d'autonomie (anti-blocage)

* **Timebox 25 min** : si tu bloques, arrête de tâtonner → décris le problème + l'erreur exacte à Claude Code.
* **Un concept à la fois.** Pas de tunnel : note les curiosités annexes dans `journal.md` pour plus tard.
* **Ne lance jamais du code que tu ne comprends pas** : demande l'explication d'abord.
* **Carnet quotidien** : 1 chose apprise + 1 erreur + 1 correction. C'est exactement ta matière « build in public ».
* **Definition of done** : chaque jour produit un artefact concret (un workflow, une page, un script, un post). Pas d'artefact = journée non finie.

### 4. Tes 5 prompts réutilisables (copie-les tels quels)

```
[TUTEUR]   Agis comme un mentor. Je débute en {sujet}. Objectif du jour : {but}.
           Avance par petites étapes, explique chaque étape simplement,
           et attends ma validation avant de continuer.

[EXPLIQUE] Explique ce qu'on vient de faire ligne par ligne, et pourquoi,
           comme à quelqu'un qui n'a jamais codé.

[DÉBLOQUE] Je suis bloqué. Voici ce que je voulais : {but}. Voici l'erreur : {copier}.
           Donne la cause probable et la solution la plus simple, puis explique.

[QUIZ]     Pose-moi 5 questions sur ce qu'on vient d'apprendre pour vérifier
           que j'ai compris. Corrige mes réponses.

[OFFRE]    Transforme ce qu'on vient de construire en (1) un mini-README portfolio,
           et (2) un post {plateforme} en italien selon marque/brand_voice.md.
```

---

## PARTIE B — Déroulé jour par jour

### Semaine 1 — Positionnement + n8n

**Jour 1 — Niche, offre, profils**
* Objectif : une offre claire en 1 phrase + tes 4 bios optimisées.
* Étapes : 1) Relis `audience.md`. 2) Choisis 1 service phare + 1 promesse chiffrée. 3) Réécris tes bios LinkedIn/IG/FB/TikTok.
* Claude Code : `[TUTEUR]` sujet = positionnement. « À partir de marque/audience.md et offers_cta.md, aide-moi à formuler mon ICP, mon offre phare et 4 bios courtes (italien). Écris le tout dans marque/positionnement.md. »
* À comprendre : une offre = un problème précis + un public précis + un résultat chiffré.
* Fait quand : `positionnement.md` existe et tes 4 profils sont à jour.

**Jour 2 — Bases n8n + 1er workflow**
* Objectif : workflow « veille » RSS/Google News → Google Sheet.
* Étapes : 1) Crée un workflow n8n. 2) Trigger RSS. 3) Node Google Sheets (append). 4) Exécute, vérifie le Sheet.
* Claude Code : `[TUTEUR]` sujet = n8n. « Explique-moi trigger, node, et le format JSON qui circule entre les nodes, avec l'exemple RSS → Google Sheet. Donne-moi les étapes, je les fais dans n8n. »
* À comprendre : un workflow = une suite de nodes ; entre eux circule du JSON.
* Fait quand : une ligne s'ajoute automatiquement dans ton Sheet.

**Jour 3 — Prompt engineering + bibliothèque**
* Objectif : 10 prompts business réutilisables.
* Étapes : 1) Liste 10 cas d'usage de ton offre. 2) Écris 1 prompt par cas. 3) Teste-les sur Claude.
* Claude Code : « Construisons ensemble marque/prompts.md : 10 prompts business (1 par cas d'usage de mon offre). Pour chacun, explique pourquoi il est structuré ainsi (rôle, contexte, format de sortie). » puis `[EXPLIQUE]`.
* À comprendre : un bon prompt = rôle + contexte + tâche + format attendu.
* Fait quand : `prompts.md` contient 10 prompts testés.

**Jour 4 — Webhook + HTTP Request**
* Objectif : comprendre comment 2 apps se parlent.
* Étapes : 1) Ajoute un node Webhook dans n8n. 2) Déclenche-le avec `curl`. 3) Ajoute un node HTTP Request vers une API publique.
* Claude Code : `[TUTEUR]` « Explique webhook vs HTTP Request (qui appelle qui). Aide-moi à tester mon webhook n8n avec une commande curl, et explique chaque partie de la commande. »
* À comprendre : HTTP, requête/réponse, et la différence je reçois (webhook) vs je demande (HTTP request).
* Fait quand : ton webhook réagit à un `curl` et tu sais expliquer le flux.

**Jour 5 — Filtres + finaliser la veille**
* Objectif : workflow « veille leads » fiable, avec conditions.
* Étapes : 1) Ajoute IF/Switch (ex : ne garder que certains mots-clés). 2) Teste les 2 chemins. 3) Nettoie et nomme tes nodes.
* Claude Code : « Aide-moi à écrire la condition de filtrage (mots-clés) dans un node Code (JavaScript) n8n. Explique le code. » puis casse la condition et `[DÉBLOQUE]`.
* À comprendre : logique conditionnelle + lire/écrire un champ JSON.
* Fait quand : seuls les leads pertinents arrivent dans le Sheet.

**Jour 6 — Documenter + 1er post**
* Objectif : transformer le workflow en preuve + contenu.
* Étapes : 1) Capture avant/après. 2) README du workflow. 3) Rédige le post.
* Claude Code : `[OFFRE]` plateforme = LinkedIn. « Documente le workflow veille en README (automations/veille.md) et écris un post 'build in public' italien selon brand_voice.md. »
* À comprendre : documenter = pouvoir revendre et réutiliser.
* Fait quand : README + 1 post prêt à publier.

**Jour 7 — Bilan + batch (allégé)**
* Objectif : consolider + préparer la semaine 2.
* Étapes : 1) Relis `journal.md`. 2) Auto-évaluation. 3) Batch 3 posts S2.
* Claude Code : `[QUIZ]` sujet = n8n (10 questions). Puis : « Aidons à écrire 3 posts (pilier Pedagogia IA) en italien selon le Kit Contenuti. »
* Fait quand : quiz passé + 3 posts en réserve.

### Semaine 2 — Site WordPress + Elementor (via Claude Code)

**Jour 8 — Environnement local + child theme**
* Objectif : WordPress local prêt, structure saine.
* Étapes : 1) Installe LocalWP, crée un site. 2) Installe Elementor (+ Hello theme). 3) Pointe Claude Code vers le dossier `wp-content` du site.
* Claude Code : `[TUTEUR]` « Explique l'architecture WordPress : thème, child theme, plugins, et le rôle d'Elementor. Crée un child theme propre dans ce dossier wp-content, et explique à quoi sert chaque fichier. »
* À comprendre : pourquoi un child theme (personnaliser sans tout casser à la mise à jour).
* Fait quand : site local actif + child theme créé.

**Jour 9 — Copy de la page d'accueil**
* Objectif : le texte de la home, en italien, qui convertit.
* Étapes : 1) Structure hero → problème → offre → preuve → CTA. 2) Rédige. 3) Pose le texte dans Elementor (sections vides).
* Claude Code : « Rédige le copy de ma home en italien (hero, problème, offre, preuve, 1 CTA) selon brand_voice.md et offers_cta.md. Une seule CTA. »
* À comprendre : une page = une promesse + une preuve + une action.
* Fait quand : la home a tout son texte.

**Jour 10 — Charte visuelle + CSS**
* Objectif : appliquer tes couleurs/typo (graphics_brief.md).
* Étapes : 1) Règle les couleurs/polices globales Elementor. 2) Ajoute du CSS pour les détails. 3) Vérifie le responsive mobile.
* Claude Code : « Génère le CSS de ma charte (couleurs #1A1A2E / accent #00D9A6, titres Montserrat, corps Inter) et explique exactement où le coller dans Elementor (réglages globaux vs CSS personnalisé). »
* À comprendre : variables de couleur, hiérarchie typographique, mobile-first.
* Fait quand : la home est à ta charte, lisible sur mobile.

**Jour 11 — Page Services + bloc tarifs**
* Objectif : présenter tes 3 offres proprement.
* Étapes : 1) Crée la page Services. 2) Insère un bloc tarifs. 3) 1 CTA par offre.
* Claude Code : « Crée un bloc 'tarifs 3 offres' en HTML/CSS à coller dans un widget HTML Elementor, à ma charte. Explique comment l'insérer. »
* À comprendre : widget HTML d'Elementor = liberté quand le drag-and-drop ne suffit pas.
* Fait quand : page Services en ligne (locale) avec les 3 offres.

**Jour 12 — Formulaire → n8n**
* Objectif : un lead du site arrive automatiquement dans ton système.
* Étapes : 1) Crée un formulaire (Elementor Forms). 2) Envoie ses données vers un webhook n8n. 3) Teste une soumission.
* Claude Code : `[TUTEUR]` « Explique comment envoyer les soumissions d'un formulaire Elementor vers un webhook n8n (action Webhook). Aide-moi à vérifier que les données arrivent bien, et à les router vers mon Sheet. »
* À comprendre : le site n'est pas isolé, il alimente tes automatisations.
* Fait quand : un test de formulaire crée une ligne dans ton Sheet.

**Jour 13 — SEO de base + vitesse + mise en ligne**
* Objectif : un site rapide, indexable, publié.
* Étapes : 1) Titres/metas (plugin SEO). 2) Compresse les images. 3) Migration LocalWP → hébergeur.
* Claude Code : « Donne-moi la checklist SEO on-page de base pour ce site, et la procédure pour migrer un site LocalWP vers un hébergeur mutualisé (plugin de migration, domaine, certificat HTTPS). Explique chaque étape. »
* À comprendre : title/meta/description, poids des images, et ce qu'est l'hébergement/DNS.
* Fait quand : le site démo est accessible sur une vraie URL.

**Jour 14 — Bilan + portfolio (allégé)**
* Objectif : capitaliser le site comme étude de cas.
* Claude Code : `[QUIZ]` sujet = WordPress/Elementor. Puis `[OFFRE]` : « Transforme le site en fiche portfolio (site/portfolio.md) + 1 post 'avant/après'. »
* Fait quand : fiche portfolio + post prêts ; contenu S3 batché.

### Semaine 3 — Automatisation avancée + moteur de contenu

**Jour 15 — Ta 1ère API IA (le cœur du métier)**
* Objectif : un script qui appelle l'API Claude pour résumer/générer du texte.
* Étapes : 1) Crée une clé API + un `.env`. 2) Script « texte → résumé ». 3) Lance-le, ajuste le prompt.
* Claude Code : `[TUTEUR]` « Construisons un petit script (Python) qui appelle l'API Claude pour résumer un texte. Explique : clé API, fichier .env, endpoint, structure messages, tokens. Je débute. » puis `[EXPLIQUE]`.
* À comprendre : ce qu'est un appel API (auth → requête → réponse), la brique de toutes tes offres IA.
* Fait quand : ton script renvoie un résumé, et tu sais expliquer chaque ligne.

**Jour 16 — Airtable comme CRM**
* Objectif : un CRM léger qui se remplit tout seul.
* Étapes : 1) Base Airtable (prospects, statut, source). 2) Connecte-la à n8n. 3) Le formulaire du site écrit dans Airtable.
* Claude Code : « Explique l'API Airtable et aide-moi à écrire dans ma base depuis n8n. Quelle clé, quel format ? »
* À comprendre : base de données = lignes/champs ; lecture/écriture via API.
* Fait quand : une soumission de formulaire crée une fiche Airtable.

**Jour 17 — Automatisation de contenu (offre vendable)**
* Objectif : workflow « 1 idée → 4 déclinaisons plateformes ».
* Étapes : 1) Node Claude (API) avec ton prompt de déclinaison. 2) Sortie formatée. 3) Test sur 1 idée réelle.
* Claude Code : « Aide-moi à écrire le prompt (dans un node HTTP/Code n8n) qui prend une idée et renvoie 4 versions : LinkedIn, IG, TikTok, FB, en italien selon brand_voice.md. »
* À comprendre : prompt + automatisation = un livrable que tu peux facturer.
* Fait quand : 1 idée produit 4 textes utilisables.

**Jour 18 — Make.com (comparer)**
* Objectif : savoir choisir le bon outil selon le client.
* Étapes : 1) Refais 1 workflow simple dans Make. 2) Note 3 différences. 3) Décide ton outil par défaut.
* Claude Code : « Compare n8n et Make pour mon activité (prix, courbe d'apprentissage, self-hosting). Quand recommander l'un plutôt que l'autre à un client ? »
* Fait quand : tu sais argumenter ton choix d'outil.

**Jour 19 — Gestion d'erreurs + fiabilité**
* Objectif : des automatisations qui ne cassent pas en silence.
* Étapes : 1) Ajoute try/catch + une branche d'erreur. 2) Notification en cas d'échec. 3) Teste un cas qui échoue.
* Claude Code : `[TUTEUR]` « Apprends-moi la gestion d'erreurs : try/catch, retry, logs, alerte. Ajoutons-la à mon workflow de contenu, et provoquons une erreur pour vérifier. »
* À comprendre : un livrable client doit gérer l'échec, pas juste le cas idéal.
* Fait quand : une erreur déclenche une alerte au lieu de tout planter.

**Jour 20 — Packager une offre**
* Objectif : transformer un workflow en produit avec prix et délai.
* Étapes : 1) Définis périmètre + prix + délai. 2) Fiche offre. 3) Script Loom de 60 s.
* Claude Code : « Aide-moi à écrire la fiche de mon offre 'automatisation' (périmètre, livrables, prix, délai) + un script de démo Loom de 60 s. »
* Fait quand : 1 offre packagée, prête à présenter.

**Jour 21 — Bilan + lead magnet (allégé)**
* Objectif : finaliser ton aimant à leads.
* Claude Code : « Rédige le contenu du guide 'Cinque automazioni per guadagnare 5 ore a settimana' (italien, brand_voice.md). » Puis `[QUIZ]` sur les API.
* Fait quand : contenu du guide prêt (tu le mettras en forme dans Canva) + contenu S4 batché.

### Semaine 4 — Prospection + premier client

**Jour 22 — Outbound + helper de personnalisation**
* Objectif : 10 messages personnalisés envoyés.
* Étapes : 1) Liste 10 prospects (Airtable). 2) Génère une 1ère ligne par prospect. 3) Envoie (LinkedIn/email).
* Claude Code : « Construisons un script qui lit un CSV de prospects et génère, via l'API Claude, une 1ère ligne personnalisée par prospect. Explique le code. »
* À comprendre : personnalisation à l'échelle = plus de réponses.
* Fait quand : 10 messages personnalisés partis.

**Jour 23 — Mener un audit de 20 min (entraînement)**
* Objectif : une trame d'audit + de l'aisance.
* Étapes : 1) Écris 5 questions clés. 2) Simule un appel. 3) Ajuste.
* Claude Code : « Joue un titolare d'estetista sceptique et pressé. Je m'entraîne à mener un audit de 20 min pour détecter 1 automatisation. Coupe-moi si je deviens trop technique, puis fais un feedback. »
* À comprendre : un audit écoute un problème, il ne vend pas un outil.
* Fait quand : tu mènes l'audit sans notes, en restant simple.

**Jour 24 — Pricing**
* Objectif : une grille tarifaire assumée.
* Étapes : 1) Forfait par offre. 2) Ancrage (3 options). 3) Mémorise tes prix.
* Claude Code : « Aide-moi à construire ma grille (3 offres, forfait + option premium) et un mini-calculateur HTML simple. Explique la logique d'ancrage. »
* Fait quand : tu annonces un prix sans hésiter.

**Jour 25 — Proposition 1 page**
* Objectif : un modèle de proposition réutilisable.
* Claude Code : « Crée un modèle de proposition 1 page (problème, solution, livrables, prix, délai, étape suivante) en italien. Explique pourquoi chaque section. »
* Fait quand : modèle prêt à dupliquer par prospect.

**Jour 26 — Closing + objections**
* Objectif : répondre calmement aux 5 objections clés.
* Claude Code : « Liste les 5 objections d'une petite entreprise (prix, temps, 'l'IA me dépasse', 'pas pour mon secteur', confiance) et donne une réponse courte pour chacune. Puis joue le prospect, je m'entraîne. »
* Fait quand : doc objections → réponses + 1 entraînement fait.

**Jour 27 — Onboarding client**
* Objectif : savoir démarrer un projet proprement.
* Claude Code : « Crée ma checklist d'onboarding (infos à demander, accès, jalons, livraison) + un formulaire d'intake (Airtable ou WP). »
* Fait quand : checklist + formulaire d'intake prêts.

**Jour 28 — Bilan mensuel + plan mois 2 (allégé)**
* Objectif : mesurer et réorienter.
* Claude Code : « Lis journal.md, résume mes progrès, identifie ma compétence la plus faible, et propose le focus du mois 2. » Puis `[QUIZ]` global.
* Fait quand : bilan écrit + objectifs mois 2.

**Jours 29–30 — Rattrapage + relances**
* Objectif : combler le point faible + relancer les prospects tièdes.
* Étapes : 1) Reprends le skill le plus faible avec `[TUTEUR]`. 2) Relance tous les prospects sans réponse. 3) Propose 2 créneaux d'audit.
* Règle : ne saute jamais la prospection, même 3 minutes.
* Fait quand : point faible repris + relances envoyées.

---

## Comment ne pas décrocher (seul)

1. **Même heure chaque jour** : l'automatisme bat la motivation.
2. **1 artefact/jour, non négociable** : workflow, page, script ou post.
3. **Le carnet est sacré** : 1 appris / 1 erreur / 1 correction → c'est ton contenu.
4. **Demande "explique", pas "corrige"** : c'est la différence entre dépendre de l'IA et savoir livrer.
5. **Mesure le dimanche, ajuste le lundi.**
