# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-10-26

### OpenMontage ajouté à la stack : production vidéo agentique
- Le lien transmis (fichier Drive « STUDIO — OpenMontage, i link del video ») n'était pas un skill Claude Code mais une note pointant vers **OpenMontage** (github.com/calesthio/OpenMontage, licence AGPLv3), un projet complet Python + Node de 164 Mo qui transforme Claude Code en studio de production vidéo. Il ne s'installe pas dans `.claude/skills/`, il se clone comme projet autonome et se pilote en ouvrant Claude Code **dans** son dossier
- Pipeline unique pour tous les formats : `research -> proposal -> script -> scene_plan -> assets -> edit -> compose`, avec arrêt et demande de validation à chaque choix créatif. 11 pipelines disponibles, dont Animated Explainer, Cinematic, Clip Factory, Documentary Montage, Screen Demo et Localization & Dub
- Kit d'installation persistant écrit dans le workspace : `scripts/install-openmontage.sh` (clone ou met à jour, vérifie Python 3.10+, Node 18+ et FFmpeg, lance `make setup`), `docs/OPENMONTAGE.md` (guide FR, coûts, prompts testés, limites) et le skill `.claude/skills/video-openmontage/` qui route toute demande vidéo vers le bon pipeline et annonce le coût avant de produire. Le dossier `OpenMontage/` lui-même est en `.gitignore` : projet externe de 164 Mo, réinstallable par script
- **Chemin à 0 euro confirmé** : voix off Piper TTS hors ligne, images Pexels / Unsplash / Pixabay (clés développeur gratuites), vraies séquences vidéo depuis Archive.org, NASA et Wikimedia Commons, composition Remotion ou HyperFrames, sous-titres mot à mot et encodage FFmpeg. Pour obtenir de la vraie vidéo et pas des photos animées, il faut demander un *documentary montage* avec `use real footage only`
- Chemin payant : les courts-métrages d'exemple du dépôt ont coûté de 1,33 à environ 5 dollars de génération chacun. Toutes les clés API sont facultatives, le système estime le coût avant de lancer et accepte un plafond de dépense. Ordre d'ajout retenu par qualité/prix : Pexels et Pixabay (gratuites), puis `FAL_KEY`, puis `GOOGLE_API_KEY`, puis `ELEVENLABS_API_KEY`
- **L'installation des dépendances n'a pas été faite** : `make setup` a été bloqué par le classifieur de sécurité (exécution de code externe téléchargé). Sans conséquence, parce qu'une session cloud tourne dans un conteneur éphémère sans GPU où les rendus seraient perdus de toute façon. OpenMontage doit tourner en local, via le script d'installation
- Règle de partage écrite avec le skill `brand-motion-design` déjà présent : film de marque court à partir du logo et des visuels d'un client, sans installation, `brand-motion-design` ; production longue avec voix off, recherche et archives, OpenMontage
- Piste de monétisation identifiée comme la plus rapide à vendre sans portfolio étoffé : le pipeline **Clip Factory**, le client fournit un webinaire ou un podcast et reçoit 15 à 20 shorts verticaux sous-titrés, coût de génération quasi nul. Suivi par Screen Demo (démo produit) et Localization & Dub (doublage italien, pertinent sur le marché de Rimini)

---

## 2026-10-23

### Manuvo : les previews Vercel migraient la base de production
- Découvert en vérifiant l'application de la migration `add_referral` : elle était entrée en base le **22 octobre à 22:18:04 UTC**, soit **35 secondes après le push** du commit, et seize heures avant le merge de la PR. L'intégration Git de Vercel était connectée en parallèle du workflow GitHub Actions, et `DATABASE_URL` était la même en Preview et en Production : chaque build de preview exécutait donc `prisma migrate deploy` sur la base de production
- Sans dégât ici (migration purement additive), mais une suppression ou un renommage de colonne aurait cassé la production avant toute relecture
- Correctif appliqué dans `manuvo/vercel.json` plutôt que dans l'interface Vercel, parce que `ignoreCommand` prime sur le champ « Ignored Build Step » : `if [ "$VERCEL_ENV" != "production" ]; then exit 0; fi` saute tout build non-production avant que `vercel-build` ne puisse toucher la base. Contrepartie assumée : plus d'URL de preview, on teste en local
- Règle écrite dans `manuvo/docs/DEPLOIEMENT.md` : chaîne de déploiement complète, checklist avant une migration destructive, et la façon de vérifier qu'une migration est passée (le log dit `No pending migrations to apply` quand elle l'était déjà, la base est la seule source de vérité)
- À faire un jour pour récupérer les previews : une base Neon séparée pour l'environnement Preview

### Manuvo : mécanisme de parrainage artisan implémenté
- Constat de départ : les 5 crédits de bienvenue existaient déjà dans le code (`WELCOME_CREDITS = 5` dans `src/lib/constants.ts`, versés à l'inscription et tracés en `BONUS`), mais **aucun mécanisme de parrainage**, ni en base, ni dans le formulaire, ni au backlog. L'étape 37 n'était donc pas exécutable
- Option retenue par Hatem : **crédit versé à l'inscription du filleul, avec plafond**
- Implémenté : auto-relation `referredById` sur `User` + migration `20261023000000_add_referral` ; le code d'invitation est le **matricule du parrain** (ART-0001), déjà unique et déjà affiché, donc rien à générer ; champ « Codice invito » facultatif à l'inscription, prérempli par `/signup?ref=ART-0001` ; `parseMatricule()` accepte ART-0001, art 1, 0001 ou 1
- Garde-fous : code inconnu ou mal formé refusé avec un message clair, auto-parrainage bloqué par email et par P.IVA, plafond de 3 parrainages récompensés sur 30 jours glissants. Au-delà du plafond l'attribution est quand même enregistrée (elle alimente le KPI « ≥ 20 % des inscrits venus du parrainage ») mais les crédits ne sont pas versés : le filleul n'est jamais pénalisé pour le quota de son parrain
- Le crédit du parrain et la création du filleul sont dans la même transaction Prisma, tracés en `BONUS` avec `reference: "referral:<id du filleul>"`, donc exclus du chiffre d'affaires comme les crédits de bienvenue
- Côté interface : carte « Invita un collega » dans l'espace crédits (code, lien prêt à copier, compteur de filleuls, rappel du plafond), et colonne `parraine_par` dans la liste et l'export CSV admin. Traductions ajoutées dans les 5 langues
- Vérifié : `prisma generate` passe, `npm run lint` ne laisse que les 3 problèmes préexistants, `npm run build` sort en exit 0 et `tsc --noEmit` est propre après la génération des types

---

## 2026-10-22

### Prospection artisans Manuvo : workflow n8n + CRM Notion
- Hatem a construit lui-même la prospection artisans : le workflow n8n « prospezione artigiani V4 - Google places to Notion », qui interroge Google Places, fait qualifier chaque fiche par Claude (Punteggio IA, Motivo qualifica, Accroche) et écrit dans le CRM Notion « CRM Artigiani — Manuvo (Rimini) », avec le Place ID comme clé anti-doublon
- L'avancement de chaque artisan vit dans la propriété **Stato** : Nuovo, Da contattare, Contattato, Interessato, Iscritto Manuvo, Non interessato, complétée par Contattato, Ultimo contatto et Follow-up J+4
- **Le Google Sheet « liste des 60 » est abandonné.** Les références au Sheet et à la « colonne pré-accord » ont été remplacées par le CRM dans `manuvo/ROADMAP.md` et dans cinq pages du calendrier Notion (étapes 3, 6a, 6b sem. 1 et sem. 3, 8b)
- Correction de séquencement : l'étape 6a (premiers messages, 16 oct) demandait de noter les réponses dans une base que l'étape 3 ne créait que le 19 oct. L'étape 3 est avancée au 15 oct, avant la première vague
- Offre d'amorçage tranchée (étape 8) : **5 crediti offerts** par artisan inscrit, soit 10 € de valeur. Avec un déblocage à 3-5 crédits, cela couvre **un seul contact**, quatre à cinq fois moins que le repère initial de l'étape (« de quoi débloquer 4 à 5 clients »). Coût pour 40 artisans : 400 € de revenu non encaissé, 0 € de trésorerie. Point de vigilance consigné sur la page Notion de l'étape 8 : si le taux de rachat décroche, c'est ce nombre qu'il faut bouger en premier, pas le prix du crédit
- Parrainage artisan (étape 37) arbitré dans la foulée : **5 crediti au parrain seulement**, au lieu de « 10 a te, 10 a lui ». Le filleul reçoit ses 5 crediti de bienvenue comme tout le monde, sans cumul. 5 crediti devient le point d'entrée unique quelle que soit la source d'inscription, donc la promesse faite aux pré-inscrits de la chauffe tient sans exception. Règle de déclenchement consignée : le crédit tombe à l'inscription du filleul, pas à son premier achat
- Ajouté au CRM pour l'étape 8b : l'option `Pre-iscritto` dans Stato (entre Interessato et Iscritto Manuvo) et la case `Richiamato gennaio` pour le sprint de conversion du 4 au 21 janvier. Les options existantes ont gardé leurs identifiants, aucune fiche n'a perdu sa valeur

### Manuvo : Story sondage Instagram
- Carte de Story 9:16 muette (10 s, 60 fps) portant « Quante volte hai aspettato un artigiano che non è mai arrivato ? », avec la bande y=1150 à 1500 laissée vide pour le sticker sondage. Master sans aucune piste audio, le propriétaire ajoute une musique de la librairie Instagram
- Le viseur HUD a été retiré à la demande de Hatem (« supprime le cadre qui entoure le message »), d'où un rendu v2
- Source dans `manuvo/videos/story-sondaggio-attesa/`, film ajouté à la table Films de `manuvo/videos/BRAND.md`

---

## 2026-10-04

### Manuvo : production vidéo de marque (skill brand-motion-design)
- Skill brand-motion-design installée (repo ouerf-man/brand-motion-design-skill) : vidéos HTML vers MP4 avec 3D, beat, rendu vérifié (couleurs, volume).
- Identité motion Manuvo créée (12 sections, signature « un sixième de tour ») et publiée en artifact.
- Films livrés et mergés : teaser Phase 0 (PR #116 à #118), présentation 3D « argile » 9:16 + 16:9 (PR #122), « Il problema n°1 » 20 s avec beat, copie effets seuls et extrait Story 6 s (PR #123).
- Choix enregistrés dans manuvo/videos/BRAND.md : vidéos en italien, CTA doux « Presto a Rimini · @manuvo.it » tant que Twilio et Stripe Live ne sont pas actifs, logo crème sur fond corail.
- Point de vigilance : les vidéos annoncent la vérification SMS, donc Twilio doit être actif en production au lancement.

## 2026-09-10

### Manuvo : retouches post-production (métiers, notifications push, téléphone)
- **Bacheca filtrée par métiers** : un artisan ne voit désormais que les demandes de ses propres métiers (partout : liste, logo, cloche). Avant, la bacheca montrait toutes les demandes alors que les notifications étaient déjà ciblées. Les filtres de catégorie ne montrent plus que les métiers de l'artisan (PR #41).
- **Admin** : colonne Métiers ajoutée à la liste des artisans + à l'export CSV.
- **Web Push réparé et opérationnel** (PR merges + config Vercel) : après le même piège que Resend (variables non lues au runtime), les **clés VAPID ont été régénérées** proprement et rendues cohérentes (VAPID_PUBLIC_KEY = NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY correspondante, VAPID_SUBJECT en mailto:). Notification reçue avec son testée sur iPhone en PWA. Service worker renforcé (non silencieux, vibration, renotify, manuvo-v3). Rappel iOS : le web push ne marche que si la PWA est ajoutée à l'écran d'accueil et les notifications autorisées depuis l'app.
- **Validation du téléphone** (PR #42) : le formulaire public refuse un numéro invalide (via libphonenumber-js, selon le pays de la demande) et normalise au format international avant stockage. Évite qu'un artisan paie des crédits pour un contact injoignable.

### Manuvo : marketplace artisans/particuliers construite et déployée (produit AutomaIA)
- Création complète, avec Claude Code, de **Manuvo** (manuvo-automaia.vercel.app) : plateforme qui met en relation des particuliers cherchant un travail à domicile et des artisans, monétisée par des crédits (1 crédit = 2 €, déblocage d'un contact = 3 à 5 crédits, max 3 artisans par demande). Stack : Next.js 16 (App Router, Turbopack), Prisma 6 + PostgreSQL Neon, Auth.js v5, next-intl (5 langues it/en/fr/de/ar + RTL), Tailwind 4. Déploiement Vercel (Root Directory `manuvo`), migrations via connexion directe Neon (contournement du P1002 sur le pooler).
- Socle livré et en ligne : inscription/connexion artisans + admin, packs de crédits, bacheca des demandes avec toutes les règles de déblocage (atomiques), panneau admin (coût par demande, stats), formulaire public sans compte, PWA installable, identité visuelle rouge + landing soignée.
- Fonctionnalités ajoutées et fusionnées dans cette session (PR #27 à #38) :
  - **Matricule artisan** séquentiel (ART-0001) + page admin liste des artisans (nom, email, téléphone, ville, crédits) + export CSV, utile marketing.
  - **Métiers + pays à l'inscription** artisan (prépare le ciblage des notifications).
  - **Mot de passe oublié** : jeton haché, TTL 1h, email via **Resend** (expéditeur de test onboarding@resend.dev pour l'instant).
  - **Pages légales** RGPD multilingues (confidentialité, CGU, cookies, note légale). Titulaire affiché : **AutomaIA**, contact **info@automa-ia.net**, P.IVA laissée vide (à compléter). Cookies strictement nécessaires seulement, donc pas de bannière de consentement.
  - **Notifications** ciblées métier + pays pour les artisans, et **notif de chaque demande pour l'admin** ; centre in-app avec cloche + badge live (endpoint /api/notifications/unread, rafraîchi toutes les 25s + au focus) et **Web Push** (VAPID, service worker). Clés VAPID dans Vercel.
  - **Stripe Checkout** : remplacement du paiement simulé par un vrai paiement. Session Checkout côté serveur + webhook `/api/stripe/webhook` (vérif signature, crédit idempotent via l'id de session). **Testé de bout en bout en mode test** (carte 4242, solde crédité). Idempotence et rejet des signatures invalides validés en local.
- Correctifs notables : contraste (thème clair fixe), euro réel (jamais crédits×2), cartes métiers en colonne pour éviter le débordement multilingue, VAPID subject robuste (normalise mailto:, ne casse plus le build).
- Config Vercel posée par Hatem : DATABASE_URL (Neon), AUTH_SECRET, clés VAPID (public en Config, privé en Sensitive), STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET (mode test, Production).
- **Emails Manuvo mis en production (fin de session)** : domaine **automa-ia.net vérifié dans Resend** (DKIM + SPF ajoutés dans la zone DNS **Wix**, nameservers restés chez Wix), expéditeur passé de onboarding@resend.dev à **no-reply@automa-ia.net** via la variable `EMAIL_FROM`, envoi réel vers n'importe quel destinataire. La réinitialisation de mot de passe fonctionne en production.
  - Débogage clé (plusieurs allers-retours) : les emails ne partaient pas et **aucune ligne n'apparaissait dans Resend**. Cause trouvée via les logs Vercel du POST /forgot ("External APIs: No outgoing requests") : le runtime ne voyait pas `RESEND_API_KEY` (valeur vide ou faute cachée), l'app sautait donc l'envoi en silence. Correctif : **supprimer et recréer la variable** avec une clé Resend neuve (Production coché) + **redéploiement de production sans cache**. Leçons : une variable Vercel ajoutée après un build n'existe qu'après un nouveau déploiement ; le formulaire "mot de passe oublié" ne renvoie jamais d'erreur (sécurité anti-énumération) donc il faut lire les logs ; toujours tester sur l'URL de production (manuvo-automaia.vercel.app), pas une URL de preview.
- **Reste à faire côté Hatem** : renseigner la P.IVA dans les pages légales le moment venu ; **passer Stripe en Live** (vérif compte + IBAN, clés + webhook live) avant d'encaisser de vrais paiements. Pistes futures : domaine manuvo.it, SEO, avis/notation, litiges, profil artisan éditable.

## 2026-08-07

### Élargissement de la niche : dentistes et vétérinaires ajoutés
- Cible étendue au-delà d'avocats/comptables/médecins : ajout des **dentistes et vétérinaires** (cabinets libéraux avec agenda de RDV et données sensibles, cohérents avec l'ICP existant). CONTEXT.md mis à jour en conséquence.

### Workflow n8n "1 idée → 3 plateformes + image" (Jour 17) : débogué et validé de bout en bout
- Workflow d'automatisation de contenu opérationnel : 1 idée → Claude (API) génère 3 textes adaptés (LinkedIn, Instagram, Facebook) + un prompt d'image, puis image générée (OpenAI gpt-image-1) → upload ImgBB → publication auto sur Facebook (Page /photos), Instagram (Graph API, container + publish avec Wait 30s) et LinkedIn (ugcPosts).
- Débogage clé mené en session :
  - **Facebook** : mauvais endpoint (/feed + link) → corrigé en /photos + url + message. Passage en form-urlencoded, token sorti du body (repose sur la credential Query Auth).
  - **Instagram** : erreur "Only photo or video" causée par le PNG → ajout de `output_format: jpeg` sur le node image (l'API IG n'accepte que le JPEG). Wait porté à 30s avant media_publish.
  - **Doublons de nodes** nettoyés (coller un node créait des copies suffixées "1"). Import propre du workflow complet.
  - **Textes vides** : `$('Code ').item` cassait entre branches → remplacé par `.first()` sur Facebook, Instagram et LinkedIn (JSON.stringify supprimait une clé `text` undefined côté LinkedIn = post vide).
  - **Hashtags** ajoutés aux prompts LinkedIn et Facebook (avant : Instagram uniquement).
  - **Erreur "JSON parameter needs to be valid JSON"** sur le node Claude : `=` en double au collage dans un champ déjà en mode Expression.
  - **Prompt image amélioré** : décor adapté au métier de l'idée, variété de cadrage/sujet, fin du cliché "homme assis au bureau" par défaut.
- SÉCURITÉ : token Facebook qui avait été exposé en clair → régénéré (token de Page longue durée), à conserver uniquement dans la credential n8n.
## 2026-07-09

### Prospezione Automatica : workflow construit, testé, FONCTIONNEL
- Workflow n8n complet construit et validé en conditions réelles sur "commercialista, Rimini" : 20 studios trouvés (Google Places), 3 déjà dans le CRM correctement filtrés, 18 nouveaux qualifiés et créés dans Airtable (mix Alto/Medio, aucun Basso ce lot, expliqué par le fait que les 2 candidats évidents à un score bas - Deloitte, STUCOMAS 5 associés - étaient déjà dans le CRM donc filtrés avant qualification).
- Décision de conception importante (demandée par Hatem en cours de build) : la qualification IA n'utilise PLUS le contenu/sentiment des avis clients (feedback sur le commercialiste ne prédit rien sur le fit prospect). Recentré sur des critères structurels : nombre de professionnels nommés dans le nom du studio, marque nationale/multinationale à exclure, nombre d'avis comme simple indice de visibilité. Node "Prepara testo recensioni" simplifié en "Prepara dati qualifica" (reviews retirées du pipeline).
- 3 bugs réels rencontrés et résolus en direct :
  1. 403 Airtable sur l'opération Search : le token PAT avait write mais pas data.records:read (write seul suffisait jusque-là car jamais de lecture demandée). Scope ajouté.
  2. Dédoublonnage à 100% faux positif : 8 fiches du CRM avaient un champ Nome vide (seul Contatto rempli) ; la fonction Airtable FIND("", X) renvoie toujours 1, donc ces fiches vides matchaient systématiquement. Formule corrigée avec un garde AND({Nome} != "", ...).
  3. Erreur "Sito expects a array" : champ Airtable créé par erreur en type Multiple select au lieu de URL. Type corrigé dans Airtable, puis cache de schéma n8n à rafraîchir côté node (bug classique de resource mapper n8n qui ne revalide pas le type automatiquement).
- Nettoyage post-run : 12 fiches sur 18 avaient le champ Sito dédié vide (créées avant la prise d'effet du rafraîchissement de schéma, alors que l'URL était déjà présente dans le texte de Note) ; backfill fait directement via l'accès Airtable, à partir des URLs déjà présentes dans Note.
- Réutilisable sur d'autres secteurs (avvocato, notaio) en changeant un seul node de config (Settore).

### Prospezione Automatica : workflow de sourcing + qualification de leads conçu
- Spécification complète créée dans agence-ia/automations/prospezione-automatica/README.md : workflow n8n (14 nodes) qui cherche des studios via l'API Google Places (annuaire d'entreprises public), les qualifie avec Claude (punteggio Alto/Medio/Basso + accroche italienne "Lei" générée), vérifie les doublons dans le CRM Airtable avant création, et boucle sur toute la liste.
- Décision de conception assumée : PAS de scraping LinkedIn automatique (viole les CGU, risque de bannissement de compte). Le contact humain sur LinkedIn reste manuel, comme pour les 7 premiers prospects. L'automatisation couvre uniquement la découverte + qualification (données professionnelles publiques Google), pas le contact.
- Qualification basée sur les avis Google (texte des reviews) plutôt que sur du scraping de site web : plus robuste, pas de dépendance à la structure de chaque site.
- Réutilisable pour d'autres secteurs (avvocato, notaio) en changeant un seul node de config.
- Reste à faire côté Hatem : créer une clé Google Places API (Google Cloud), créer la credential Query Auth dans n8n, construire les 14 nodes, tester sur "commercialista Rimini".

### Jalon : Semaines 1-3 du plan bouclées + 3 actifs en production
- Synthèse de la session (travaux détaillés dans les entrées du 24/06 ci-dessous) : les Semaines 1 à 3 du plan 30 jours sont terminées (J15 exécuté, J16 CRM, J17 moteur de contenu ; J18 écarté ; J19/20/21 faits). Semaine 4 entamée (J24/25/26 faits).
- Trois actifs concrets désormais EN PRODUCTION : (1) site AutomaIA déployé sur Vercel et public, (2) CRM Airtable qui se remplit seul depuis le formulaire du site, (3) moteur de contenu n8n qui publie automatiquement sur LinkedIn + Facebook + Instagram à partir d'une idée.
- Contexte mis à jour : CONTEXT.md (projets en cours, prix figés, nouveaux livrables proposition + objections, Page LinkedIn Automa IA, liste d'outils enrichie : Airtable, API Claude, Vercel, Canva, OpenAI).
- Reste sur le plan : Semaine 4 (entraînement objections J26, J22 outbound, J23 audit, J27 onboarding, J28 bilan, J29-30 relances). Aucun jour en attente sur les Semaines 1 à 3.
- Tâches techniques en suspens : mettre à jour n8n (débloquera l'image sur LinkedIn et évitera les décalages de version d'API) ; régénération du token n8n déjà faite (sécurité close).

## 2026-06-24

### Jour 17 (déclinaison de contenu) : FAIT, workflow n8n construit et testé
- Workflow "Declinazione Contenuti" construit dans n8n et testé de bout en bout : Manual Trigger → Set (variable idea) → HTTP Request Claude (node copié de l'assistant emails pour réutiliser l'auth) → Code parsing JSON. 1 idée produit bien 3 posts LinkedIn/Instagram/Facebook en italien. Critère "fait" atteint.
- Offre vendable documentée dans agence-ia/automations/jour17-declinazione-contenuti/README.md (prompt + workflow + exemple). TikTok écarté (décision 19/06).
- 2 ajustements qualité après 1er test : 1) Instagram sortait les "\n" en toutes lettres → fonction clean() ajoutée dans le node Code (replace des \n littéraux par de vrais retours à la ligne) + règle dans le prompt ; 2) Claude écrivait en "voi", or la marque est en "Lei" → décision Hatem : "Lei" partout (réseaux compris), règle "Lei singulier obligatoire" ajoutée au prompt.
- Réflexe métier : un livrable IA = prompt (le savoir-faire) + automatisation (le moteur). Service facturable à un cabinet.
- Publication multi-plateformes : branchement des nodes de publication de Hatem (Générer image OpenAI → Upload ImgBB → Facebook + Instagram via Graph API) sur la sortie du node Code. Texte récupéré par nom de node (`$('Code').item.json.facebook/instagram`) pour survivre aux nodes image qui écrasent $json.
- LinkedIn auto reporté : l'automatisation LinkedIn bloque car la credential n8n réclame un scope LinkedIn déprécié (r_emailaddress) que LinkedIn n'accorde plus. Posting Page entreprise nécessiterait en plus w_organization_social (Community Management API, validation LinkedIn). Décision : LinkedIn à la main pour l'instant ; auto à régler plus tard (mise à jour n8n, ou HTTP Request + Generic OAuth2 scope w_member_social, profil perso).
- Qualité : Haiku produisait des fautes inacceptables pour du contenu public (mots en anglais "under control", hashtag en français "#Comptabile", "#AutomalA" mal orthographié). Correctif retenu : passage à Sonnet (claude-sonnet-4-6) + règles strictes ajoutées au prompt (LANGUE italien uniquement, hashtags sans accents/fautes/mots inventés). Sonnet produit désormais des textes propres et publiables. Règle d'or rappelée : toujours relire avant de publier du contenu de marque.
- Faux problème des "\n" élucidé : les données sont propres (vrais sauts de ligne), c'est la VUE TABLE de n8n qui affiche/copie les retours à la ligne sous forme de "\n". Vérifié par témoin JS (ig.includes("\\n") = false) et expliqué : LinkedIn (bloc unique) n'affiche aucun "\n", IG/FB (multi-paragraphes) en affichent, ce qui prouve que ce sont de vrais sauts de ligne. Nettoyage robuste dans le node Code via split("\\n").join("\n").
- Workflow Declinazione Contenuti FONCTIONNEL de bout en bout : génération 3 posts propres → publication auto sur les 3 plateformes. Facebook + Instagram avec image (chaîne OpenAI image → ImgBB → Graph API). LinkedIn en texte, premier post publié avec succès.
- LinkedIn automatisé (résolu) : le node LinkedIn natif de n8n 2.4.4 est cassé (scopes dépréciés r_emailaddress via toggle "Legacy", puis version d'API morte 20250401 même en texte). Contournement retenu et fonctionnel : credential LinkedIn OAuth2 connectée (Legacy OFF, Organization Support OFF, scopes openid/profile/w_member_social, app avec produits "Share on LinkedIn" + "Sign In OpenID Connect", profil perso), puis 2 nodes HTTP Request : GET /v2/userinfo (récupère le `sub`) → POST /v2/ugcPosts (author urn:li:person:{sub}, texte depuis le node Code, shareMediaCategory NONE). Astuce débogage : référencer le node par son nom EXACT (espace inclus, ex "Code ") ou glisser le champ depuis le panneau ; pour le sub, $json.sub car node précédent direct.
- IMAGE LinkedIn encore à faire : bloquée par la version d'API du node natif. Vraie solution durable = METTRE À JOUR n8n (le node récent gère l'image + une version d'API valide). Tâche séparée pour plus tard.

### Site AutomaIA déployé en ligne sur Vercel
- Le site Next.js (agence-ia/site/automaia-web) est désormais déployé sur Vercel et public. Le formulaire de contact en production crée bien une fiche dans le CRM Airtable (testé : lead réel arrivé dans la table Prospects). Chaîne d'acquisition complète et publique : visiteur → formulaire site en ligne → webhook n8n → CRM Airtable.
- Décision git : branche claude/magical-mendel-enfcp3 fusionnée dans main (fast-forward, 85 commits, autorisé explicitement par Hatem) car le site n'existait que sur la branche et Vercel lit la branche par défaut. main est maintenant le code de référence ; Vercel déploie main. Suite du dev sur branche, à refusionner dans main pour publier.
- Config Vercel : Root Directory = agence-ia/site/automaia-web (monorepo), variable NEXT_PUBLIC_N8N_WEBHOOK_URL reportée dans les env vars Vercel (sinon le formulaire en prod enverrait dans le vide).
- Build vérifié OK avant déploiement (next build, 6 pages statiques).

### Jour 16 (Airtable comme CRM) : FAIT ET BRANCHÉ DE BOUT EN BOUT
- Flux complet fonctionnel : formulaire du site AutomaIA → webhook n8n (nouveau workflow "Sito - Nuovo Lead", path /webhook/nuovo-lead) → node Airtable Create → ligne dans la table Prospects. CRM qui se remplit tout seul, validé par soumissions réelles.
- Base CRM créée : `AutomaIA - CRM Prospect` (app2s4sQDVTe8ESGZ), table `Prospects` (tbl2D8SoJfW5RbbX9), 9 champs niche libéraux italiens. 2 fiches d'exemple conservées (Studio Bianchi, Studio Verdi), tests nettoyés.
- Côté site : variable NEXT_PUBLIC_N8N_WEBHOOK_URL configurée dans .env.local (automaia-web) pointant vers le webhook n8n. (Site désormais déployé sur Vercel, voir entrée dédiée plus haut, variable reportée sur Vercel.)
- Débogage de bout en bout (vrai entraînement) : 1) variable NEXT_PUBLIC lue au démarrage uniquement (redémarrer npm run dev) ; 2) piège Notepad .env.local.txt ; 3) workflow actif = exécutions visibles dans l'onglet Executions, pas sur le canvas ; 4) token Airtable 403 résolu en RÉGÉNÉRANT le token (la credential n8n gardait une ancienne valeur ; modifier les permissions ne suffit pas, il faut resynchroniser la valeur dans n8n). Scopes requis : data.records:write (+ read/schema par sécurité) + accès explicite à la base.
- Doc : agence-ia/automations/jour16-crm-airtable/README.md.

### Jour 15 (première API IA) : FAIT ET EXÉCUTÉ
- Script resume.py exécuté avec succès sur la machine de Hatem : premier appel réel à l'API Claude depuis son propre code Python, résumé du texte italien obtenu en 2 phrases. Jalon du Jour 15 atteint.
- Débogage mené en autonomie guidée sur sa machine Windows : module dotenv manquant (résolu avec `python -m pip install`, piège des deux Python), puis 401 invalid x-api-key causé par le placeholder non remplacé dans .env (longueur lue = 24 = faux texte). Vérification faite qu'aucune variable système n'écrasait le .env, puis recréation propre du .env avec Set-Content. Réflexe de débogage acquis (lire la valeur réellement chargée, isoler la cause).
- Compétence clé acquise : clé API + .env + structure client/messages/réponse/tokens. Brique fondatrice de toutes les futures offres IA.

### Jour 15 (première API IA) : script écrit et câblé, reste l'exécution avec clé perso
- Script resume.py écrit et commenté dans agence-ia/automations/jour15-api-claude/ : appel API Claude (modèle Haiku) pour résumer un texte italien, avec affichage des tokens (input/output) pour visualiser la facturation.
- Pédagogie : les 5 briques commentées dans le code (clé API, fichier .env, client, messages, tokens). README mis à jour avec les étapes de lancement et un rappel des 5 briques + pistes pour aller plus loin.
- Robustesse : si la clé manque, le script s'arrête proprement avec un message d'aide (testé en session, code de sortie 1, pas de crash).
- SDK anthropic 0.111.0 + python-dotenv validés (import OK). .env.example (modèle sans secret) ajouté ; exception ajoutée dans agence-ia/.gitignore pour versionner les .env.example tout en continuant de bloquer les vrais .env.
- BLOCAGE RESTANT (inchangé) : pas de clé API Anthropic dans l'environnement web et je ne peux pas en créer une. Geste final côté Hatem sur sa machine : créer la clé sur console.anthropic.com, `cp .env.example .env`, y coller la clé, `pip install -r requirements.txt`, `python3 resume.py`. ~2 min.
- ALERTE SÉCURITÉ repérée : le fichier .env à la RACINE du repo (token JWT n8n) était TRACKÉ par git (pas couvert par agence-ia/.gitignore qui ne protège que le sous-dossier).
- CORRECTION FAITE : .env racine retiré du suivi git (git rm --cached, fichier local conservé) + création d'un .gitignore racine qui bloque .env / *.env / clés / secrets et garde l'exception .env.example.
- ACTION RESTANTE CÔTÉ HATEM (importante) : le token reste présent dans l'HISTORIQUE git des commits précédents (toujours sur GitHub). Le retrait du suivi ne purge pas l'historique. Remède : RÉGÉNÉRER le token dans n8n (révoquer l'ancien, créer un nouveau). Une fois l'ancien révoqué, sa présence dans l'historique est sans danger. Option 1 retenue (régénérer, sans réécrire l'historique) plutôt que filter-repo/BFG.
- RÉSOLU le 24/06 : clé n8n identifiée (clé API publique de l'instance n8n.freelancerai.eu, utilisée uniquement par l'outil n8nac pour synchroniser les workflows-as-code de workflows/n8n-as-code/). Aucun code applicatif ne l'utilisait (le site utilise une URL de webhook, pas la clé). Ancienne clé "Jarvis-N8N" déjà expirée et supprimée. Nouvelle clé créée dans n8n, validée par appel direct à l'API n8n, puis branchée à n8nac via `--api-key-stdin` (en local, hors git). `npx n8nac list` fonctionne à nouveau. Volet sécurité clos.
- Débogage notable : 401 répétés causés par le presse-papier (copier la commande écrasait la clé à coller) ; résolu en passant la clé par une variable PowerShell ($k) puis en la pipant vers n8nac. Réflexe d'hygiène rappelé : ne jamais afficher/screenshoter une clé.

### Jour 26 (closing + objections) : doc FAIT, entraînement à faire
- Doc "5 objections → réponses" créé dans agence-ia/offres/obiezioni-risposte.md, en italien (Lei), aligné brand_voice.md et grille-tarifaire.md.
- Couvre les 5 objections clés : prix, temps, "l'IA me dépasse", "pas pour mon secteur", confiance/données. Chaque réponse en méthode 3 temps (accueillir, recadrer, rendre la main), + variante "pas maintenant" + rappels closing (réponse courte puis silence, ne jamais baisser le prix mais réduire le périmètre, honnêteté > enthousiasme).
- Reste l'entraînement (jeu de rôle prospect) pour cocher le Jour 26 à 100%.

### Jour 25 (proposition 1 page) : FAIT
- Modèle de proposition commerciale d'une page créé dans agence-ia/offres/modello-proposta.md, en italien (vouvoiement "Lei"), aligné sur brand_voice.md et grille-tarifaire.md.
- 6 sections à champs `{{ }}` à dupliquer par prospect : situation actuelle (mots du client), ce que je propose (en résultat), livrables concrets, délais, investissement (tableau forfait + mensuel), prochain pas (une seule action datée).
- Inclut l'explication de la logique de chaque section + règles transverses (une page max, une seule offre recommandée à l'écrit, date de validité, toujours partir de l'audit du Jour 23) et le mode d'emploi par prospect.
- Ne demandait pas la machine locale (rédaction). Fait en session.

### Point d'avancement plan 30 jours + J18 (Make.com) écarté
- Revue de l'état réel des Semaines 1 à 3, croisée avec le compagnon 30 jours :
  - **Semaine 1 (J1 à J7) : 100% faite.**
  - **Semaine 2 (J8 à J14) : sautée volontairement** (site WordPress redondant avec le site Next.js existant).
  - **Semaine 3 (J15 à J21) :** J19 couvert dans les faits par l'assistant emails (try/catch + branche erreur + notif Telegram du 23/06), J20 et J21 faits.
- **Décision stratégique : Jour 18 (comparaison Make.com) ÉCARTÉ.** n8n est déjà l'outil par défaut et maîtrisé ; comparer Make maintenant ne rapproche pas d'un client. Gardé en réserve si un prospect impose Make.
- **Jours restant en attente sur la Semaine 3 : J15, J16, J17** (volontairement gardés dans la liste à reprendre).
  - J15 : 1ère API IA en script Python (scaffold créé, exécution à faire sur la machine locale : clé API + Python).
  - J16 : Airtable comme CRM (pas commencé).
  - J17 : automatisation de contenu, 1 idée → 4 déclinaisons plateformes (pas fait ; distinct de l'assistant emails).
- Note : l'assistant emails (22-23/06), hors numérotation du plan, a fait pratiquer en réel les compétences de J15 (API IA), J17 (prompt + automatisation vendable) et J19 (fiabilité). L'avancement de fond dépasse le compteur du plan.

### Plan 30 jours : WordPress sauté, passage Semaine 3, Jour 20 (offre packagée)
- Décision stratégique : Semaine 2 (site WordPress + Elementor) SAUTÉE, car le site AutomaIA existe déjà en Next.js. Refaire un site WordPress serait redondant. WordPress reste une compétence vendable à apprendre plus tard sur un site démo si besoin. Passage direct à la Semaine 3
- Jour 15 (première API IA en script Python) : dossier scaffold créé (agence-ia/automations/jour15-api-claude/ avec README + requirements.txt), mais EXÉCUTION REPORTÉE car Hatem n'était pas sur sa machine (clé API + Python requis en local). À reprendre sur sa machine : créer clé API console.anthropic.com, .env, puis écrire et lancer le script
- **Jour 20 (packager une offre) : FAIT.** Fiche offre "Assistant Email Intelligent" créée dans agence-ia/offres/assistant-email.md. Positionnée en porte d'entrée / quick win, basée sur l'actif réel (assistant emails). Contient périmètre, limites assumées, délai (5 à 7 jours), processus client, et script de démo Loom de 60s. Prix provisoires retenus (niveau moyen) : forfait de mise en place 600 € + abonnement 79 €/mois, à confirmer au Jour 24
- **Jour 21 (lead magnet) : FAIT.** Guide "Cinque automazioni per guadagnare fino a 10 ore a settimana" rédigé en italien dans agence-ia/lead-magnet/guida-5-automazioni.md, puis mis en forme dans Canva (design on-brand, lien édition https://www.canva.com/d/XzCioKXQlcC-P1y). Reste à Hatem : ajouter le lien d'audit sur le CTA et exporter en PDF
- Cohérence des messages corrigée : le lead magnet annonçait 5h, réaligné sur la promesse de marque "fino a 10 ore a settimana" (celle du site et de l'offre), avec ré-estimation honnête des temps par automatisation. Important pour ne pas perdre la confiance des prospects (incohérence repérée par Hatem)
- **Jour 24 (pricing) : FAIT.** Grille tarifaire 3 paliers avec logique d'ancrage (agence-ia/offres/grille-tarifaire.md) + calculateur ROI HTML on-brand en italien (agence-ia/offres/calcolatore-roi.html). Prix validés par Hatem : Assistente Email 600 € + 79 €/mois ; Studio Automatizzato 1 490 € + 149 €/mois (cible, "più richiesto") ; Studio 360 2 490 € + 249 €/mois (premium) ; option Presenza Online 900 € + 49 €/mois. Modèle forfait + abonnement, récurrent prioritaire
- Script de démo Loom de l'offre traduit en italien (versione "Lei") dans la fiche offre
- Portfolio : fiche Assistant emails finalisée avec lien vidéo démo Google Drive (penser à vérifier le partage public en navigation privée)

---

## 2026-06-23

### Assistant emails validé de bout en bout + 3 améliorations à ajouter
- Le workflow assistant emails est désormais testé et fonctionnel intégralement : Gmail Trigger → API Claude → parsing → node IF (filtrage est_client) → brouillon Gmail. Un vrai mail client part dans la branche true et génère un brouillon, les newsletters/notifications sont filtrées dans la branche false
- Débogage clé résolu : le body du node HTTP Request renvoyait `[object Object]` (JSON invalide). Solution = envelopper l'objet dans `JSON.stringify(...)` dans l'expression n8n, pour produire une vraie chaîne JSON et laisser n8n échapper proprement les sauts de ligne et guillemets du mail
- **Piste 1 (Threading) : FAITE et validée.** Thread ID branché sur `$('Gmail Trigger').item.json.threadId`, sujet gardé EXACT (sans "Re:", indispensable pour le rattachement au fil), et destinataire corrigé en `$('Gmail Trigger').item.json.from.value[0].address` (le champ `from` est un objet, pas une chaîne ; `headers.from` renvoyait "From: ..." invalide). Testé depuis une adresse externe (Yahoo) : le brouillon apparaît dans la bonne conversation, adressé au bon destinataire, réponse personnalisée au prénom de l'expéditeur
- **Piste 2 (Robustesse) : FAITE.** Node Code blindé avec try/catch, isolation du bloc JSON (entre 1ère { et dernière }), optional chaining et valeurs par défaut. Si JSON illisible : pas de crash, pas de brouillon foireux, champ `erreur_parsing: true`
- **Piste 3 (Extension) : FAITE.** Notification Telegram en temps réel. Choix du canal après analyse : Telegram retenu plutôt que WhatsApp (WhatsApp impose un modèle de message pré-approuvé par Meta pour les notifs proactives, trop de friction). Bot créé via BotFather, chat ID récupéré via @userinfobot, node Telegram branché en parallèle sur la sortie `true` du node IF. Message reçu et validé : expéditeur + urgence + résumé à chaque vrai mail client
- **Bilan : assistant emails 100% terminé** (filtrage + threading + robustesse + notif Telegram). Actif complet et démontrable en prospection

---

## 2026-06-22

### Premier actif démontrable : assistant de réponse aux emails (n8n + API Claude)
- Construction d'un workflow n8n complet et fonctionnel : un email arrive (Gmail Trigger) → l'API Claude (modèle Haiku) lit et comprend le mail → un node Code parse la réponse JSON → un brouillon de réponse est créé dans Gmail, prêt à relire et envoyer
- Choix produit : génération d'un BROUILLON (pas d'envoi automatique), pour que l'humain valide avant envoi. Argument de vente clé : zéro risque, le client garde le contrôle
- Débogage réalisé en autonomie guidée : champ du corps du mail (snippet vs text, Simplify désactivé sur le Gmail Trigger), nettoyage des balises markdown ```json renvoyées par Claude avant JSON.parse, et correction du rôle dans le prompt (Claude écrit AU NOM de Hatem vers l'expéditeur, pas l'inverse)
- Ajout d'un filtrage (node IF sur un champ est_client classifié par Claude) pour ne générer un brouillon que sur les vrais messages clients, en ignorant newsletters et notifications
- Statut : noté comme premier actif concret démontrable en prospection, pitch "j'installe un assistant qui pré-rédige vos réponses clients, vous validez en un clic"

---

## 2026-06-19

### Marque AutomaIA finalisée + Semaine 1 du plan complète (Jours 1 à 7)
- Marque créée : nom AutomaIA (domaine automaia.net), logo (horloge + boucle d'automatisation, couleurs bleu nuit + teal), et kit visuel complet (logo multi-versions, bannières LinkedIn et Facebook, avatar rond, favicon, icône fond blanc)
- Jour 1 du plan : positionnement.md (offre phare "récupérer jusqu'à 10h/semaine", synthèse ICP, 4 bios italiennes, stratégie de comptes par plateforme)
- Jour 2 : workflow n8n de veille RSS Google News vers Google Sheet
- Jour 3 : prompts.md, bibliothèque de 10 prompts business (3 testés et validés)
- Jour 4 : webhook + HTTP Request (comprendre comment 2 apps se parlent, test webhook via curl)
- Jour 5 : filtre par mots-clés (node Code JavaScript), workflow de veille finalisé (seules les actus pertinentes arrivent dans le Sheet)
- Jour 6 : documentation du workflow (automations/veille.md) + premier post "build in public" rédigé et PUBLIÉ sur LinkedIn (jalon : première publication AutomaIA)
- Jour 7 : bilan Semaine 1, quiz n8n réussi (8/10), 3 posts d'avance créés (contenuti/posts-settimana2.md)
- Workflow de publication Instagram automatisée fonctionnel (API Meta, flux de publication en 2 étapes)
- Décision stratégique : TikTok retiré de la stratégie marketing, la cible (avocats/comptables) n'y est pas en posture professionnelle. Priorité LinkedIn, puis Facebook et Instagram
- Prochain enjeu identifié : construire le réseau LinkedIn (0 relation) pour donner de la portée aux publications

---

## 2026-06-16

### Première proposition client + lancement du plan 30 jours
- Réalisation d'un site web (7sport-agency.vercel.app) pour un client réel avec Claude Code, fini et envoyé pour validation. Première proposition concrète envoyée à un prospect
- Adoption du plan d'apprentissage "Compagnon 30 jours Claude Code" (sauvegardé dans context/import/) : programme jour par jour couvrant n8n, WordPress/Elementor, API IA, automatisation et prospection

### Définition de la niche + fondation de marque de l'agence
- Création du dossier projet `agence-ia/` (marque/, automations/, site/, journal.md, .gitignore protégeant les secrets)
- Choix de la niche fer de lance après recherche : cabinets de professionnels libéraux (avocats, comptables, médecins), médecins en dernier à cause des contraintes sur les données de santé
- Rédaction des 4 fichiers de marque fondateurs :
  - `audience.md` : ICP, 4 problèmes clients, promesse de récupérer jusqu'à 10h/semaine, argument confidentialité
  - `brand_voice.md` : voix claire/rassurante/concrète/honnête, vouvoiement chaleureux, zéro jargon technique
  - `offers_cta.md` : 3 offres avec "Cabinet automatisé" en porte d'entrée, modèle forfait de mise en place + abonnement mensuel récurrent
  - `graphics_brief.md` : charte validée, palette bleu nuit (#0F2A4A) + accent teal (#16B8A6), titres Montserrat / corps Inter

---

## 2026-05-23

### Installation initiale du Jarvis
- Workspace personnalisé pour Hatem, basé à Rimini (Italie)
- Profil principal : Employé en reconversion vers Indépendant / Entrepreneur IA
- Activité : Réceptionniste de nuit en hôtel, en formation active pour devenir freelance IA
- Objectifs court terme identifiés : décrocher un premier client freelance en IA, lancer un projet d'automatisation pour une entreprise locale
- Vision long terme : lancer une agence IA, quitter l'emploi actuel, atteindre la liberté financière et sociale
- Projets actifs au démarrage : formation Claude Code, automatisations n8n, développement web/apps pour premiers clients
- Domaine d'aide prioritaire : productivité et organisation au quotidien
- Style de communication choisi : mélange selon le contexte (direct pour le simple, pédagogique pour le complexe)
