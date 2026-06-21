# Journal d'apprentissage — Agence IA

> Mon carnet de bord du plan "Compagnon 30 jours Claude Code".
> 1 entrée par jour. Le plus récent en bas.
> Règle : 1 chose apprise + 1 erreur + 1 correction + 1 artefact. C'est ma matière "build in public".

---

## Modèle d'entrée quotidienne (à copier)

```
## [AAAA-MM-JJ] — Jour X

**Appris :**

**Erreur :**

**Correction :**

**Artefact produit :**
```

---

## 2026-06-16 — Jour 1

**Appris :**
- Une bonne offre repose sur 3 pièces obligatoires : public précis + problème précis + résultat chiffré. Si une manque, l'offre devient floue.
- Le type de compte (business/personnel) et le style de contenu (humain/corporate) sont deux choses différentes : on peut, et on doit, garder un ton humain même sur un compte business.
- Pour automatiser la publication sur les réseaux (n8n/API), il faut des comptes business sur Instagram, Facebook et TikTok.

**Erreur :**
- Au quiz sur les 3 pièces d'une bonne offre, j'en ai cité seulement 2 (problème précis + résultat chiffré), j'ai oublié le public précis.

**Correction :**
- Formule complète mémorisée : PUBLIC précis + problème précis + résultat chiffré. Mon offre phare coche les trois (avocats/comptables + admin répétitif + 10h/semaine).

**Artefact produit :**
- `marque/positionnement.md` : synthèse ICP, offre phare (italien + français) et 4 bios italiennes (LinkedIn, Instagram, Facebook, TikTok) + stratégie de comptes par plateforme.

## 2026-06-19 — Jour 2

**Appris :**
- Un workflow n8n = une suite de nodes, et entre chaque node circule du JSON. Le node suivant pioche dans ce JSON via des expressions (ex : `{{ $json.title }}`).
- Le trigger (ici RSS Feed Trigger) démarre le workflow et ne se déclenche que sur du nouveau contenu.
- Le node Google Sheets en mode Append s'exécute une fois par item reçu.
- Vu en marge (workflow Instagram) : la publication IG se fait en 2 étapes (créer le conteneur, puis publier), et il faut attendre que le conteneur soit FINISHED avant de publier.

**Erreur :**
- Workflow de veille : aucun blocage, marche du premier coup.
- Sur le workflow Instagram : erreur "Media ID is not available" (code 9007) car je publiais avant que l'image soit prête côté Instagram.

**Correction :**
- Instagram : attendre la fin du traitement du conteneur avant de publier (idéalement vérifier le status_code = FINISHED en boucle plutôt qu'un délai fixe).

**Artefact produit :**
- Workflow n8n "Veille AutomaIA" : flux RSS Google News (ciblé IA + studi professionali) qui ajoute automatiquement les nouvelles actus dans un Google Sheet.

## 2026-06-19 — Jour 3

**Appris :**
- Un bon prompt repose sur 4 pièces : rôle + contexte + tâche + format attendu. Si une manque, le résultat dérive.
- La valeur d'un prompt dépend surtout de la qualité de la variable d'entrée (ex : la `{description}` du prompt d'audit). Garbage in, garbage out.
- Réalisation stratégique : TikTok n'est pas adapté à ma cible (avocats/comptables, pros sérieux). Mieux vaut concentrer mes efforts sur LinkedIn (priorité), puis Facebook et Instagram.

**Erreur :**
- J'ai lancé le prompt d'audit (n°9) en laissant la variable `{description}` vide, donc sans matière à analyser.

**Correction :**
- Toujours remplir les variables avec du concret. En vrai audit, la `{description}` vient de ce que le client raconte pendant l'appel.

**Artefact produit :**
- `marque/prompts.md` : bibliothèque de 10 prompts business (contenu, prospection, vente, services vendus). 3 prompts testés et validés (déclinaison contenu, idées de posts, audit). TikTok retiré de la stratégie marketing.

## 2026-06-19 — Jour 4

**Appris :**
- Webhook vs HTTP Request : la question clé est "qui décroche le téléphone en premier ?". Webhook = on m'appelle (je reçois, je suis passif). HTTP Request = j'appelle (je demande). Mon workflow Instagram est un HTTP Request car c'est n8n qui initie l'appel vers Meta.
- Le modèle commun est HTTP : requête → réponse.
- Le webhook est la brique qui connectera le formulaire de mon futur site à n8n (Jour 12).
- On déclenche un webhook depuis l'extérieur avec `curl` (terminal) ou un outil comme Hoppscotch.

**Erreur :**
- J'ai cru au départ qu'il fallait mettre la commande `curl` dans le node Webhook.

**Correction :**
- Le `curl` se lance dans un terminal externe (ou via Hoppscotch). Il joue le rôle de l'app extérieure qui appelle le webhook ; le webhook, lui, ne fait qu'écouter.

**Artefact produit :**
- Workflow n8n avec un node Webhook (testé et déclenché avec succès via curl) et un node HTTP Request (GET vers une API publique de test).

## 2026-06-19 — Jour 5

**Appris :**
- Logique conditionnelle dans n8n : un node Code (JavaScript) qui ne garde que les actus dont le titre contient un mot-clé. Lecture d'un champ JSON via `item.json.title`.
- `.some()` renvoie vrai si au moins un mot-clé est présent ; `.toLowerCase()` évite les soucis de majuscules.
- Un filtre ne vaut que par la qualité de ses mots-clés : ils doivent matcher le vocabulaire réel du flux.

**Erreur :**
- Le node Code ne renvoyait aucun résultat. J'ai d'abord cru à un bug.

**Correction :**
- Ce n'était pas un bug : le filtre marchait, mais mes mots-clés ne matchaient pas le vocabulaire réel (ex : "commercialista" ne matche pas "commercialisti", "studio legale" ne matche pas "avvocati"). Solution : utiliser des racines de mots ("avvocat", "commercialist") au lieu de mots entiers. Éviter les mots trop courts comme "ai"/"ia" (trop de bruit en italien).

**Artefact produit :**
- Workflow "Veille AutomaIA" finalisé : RSS → filtre par mots-clés (node Code) → Google Sheet. Seules les actus pertinentes sont enregistrées.

## 2026-06-19 — Jour 6

**Appris :**
- Documenter un workflow = pouvoir le revendre, le réutiliser et l'expliquer. Un workflow non documenté s'oublie vite.
- "Build in public" : partager le parcours de construction crée de la crédibilité et de la proximité avec l'audience.
- Pour communiquer, traduire le technique en langage client : on ne parle pas de "workflow n8n" mais d'un "petit assistant" qui fait gagner du temps.

**Erreur :**
- Aucune erreur technique. Point d'attention : un post gagne à être accompagné d'une preuve visuelle (capture avant/après).

**Correction :**
- Penser systématiquement à capturer l'avant/après pour illustrer le contenu et nourrir le portfolio.

**Artefact produit :**
- README du workflow : `automations/veille.md` (documentation réutilisable + comment l'adapter à un client).
- Post LinkedIn "build in public" en italien (selon brand_voice), publié depuis le profil personnel.

## 2026-06-19 — Jour 7 (bilan Semaine 1)

**Appris :**
- Bilan : Semaine 1 du plan bouclée (Jours 1 à 7) + marque AutomaIA complète en bonus.
- Quiz n8n : 8/10. Les fondamentaux (trigger, node, JSON, webhook vs HTTP request, filtre, publication IG en 2 étapes) sont acquis.
- JALON : premier post "build in public" publié sur LinkedIn pour AutomaIA (profil mis à jour : bannière + titre + post cohérents).
- Prochain enjeu identifié : la diffusion. Avec 0 relation LinkedIn, il faut construire le réseau pour que les posts soient vus.

**Erreur :**
- Au quiz, confusion entre le trigger RSS et le filtre : j'ai cru que le RSS Feed Trigger triait par mots-clés.

**Correction :**
- Le RSS Feed Trigger se déclenche seulement sur les NOUVELLES actus. Le tri par mots-clés est une étape séparée (le node Code). Trigger = "il y a du nouveau", filtre = "je ne garde que ce qui m'intéresse".

**Artefact produit :**
- `contenuti/posts-settimana2.md` : 3 posts d'avance (pilier Pedagogia IA) en italien, prêts à publier.

## 2026-06-19 — Jours 8 à 12 (Semaine 2, préparation à distance)

**Appris :**
- Architecture WordPress : thème, child theme, plugins, Elementor. Un child theme protège mes personnalisations des mises à jour du thème parent.
- CSS : variables de couleur, hiérarchie typographique, mobile-first (clamp() adapte les tailles à l'écran).
- Le widget HTML d'Elementor = liberté quand le drag-and-drop ne suffit pas (cartes de prix sur mesure).
- Webhook n8n : les données d'un POST arrivent sous `body` (ex : `{{ $json.body.nome }}`).

**Erreur :**
- Pas d'erreur bloquante. Points à vérifier sur machine : rendu mobile du site, et noms des champs envoyés par Elementor Forms (peuvent différer de nome/email).

**Correction :**
- Quand je brancherai le formulaire Elementor, régler les ID des champs sur nome/email/studio/messaggio OU réadapter le mapping n8n.

**Artefact produit :**
- J8 : child theme `hello-elementor-child` (style.css + functions.php) dans `site/wordpress/`.
- J9 : `site/home-copy.md`, copy de la page d'accueil en italien (hero, problème, offre, preuve, CTA).
- J10 : CSS complet de la charte dans le child theme (couleurs, Montserrat/Inter, boutons, mobile-first).
- J11 : `site/blocco-tariffe.html`, bloc 3 offres en HTML/CSS pour widget Elementor.
- J12 (côté n8n) : workflow "Lead AutomaIA" (webhook POST → Google Sheet "Leads"), testé avec succès.

**À finaliser sur machine (LocalWP) :** installer/activer le child theme (J8), coller le copy et le bloc tarifs dans Elementor (J9/J11), régler les couleurs/polices globales (J10), créer le formulaire Elementor et le brancher au webhook (J12).
