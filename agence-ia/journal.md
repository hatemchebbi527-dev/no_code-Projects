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
