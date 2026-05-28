# /plugin

> Commande pour gérer les plugins et skills depuis GitHub.

---

## Usage

```
/plugin add <utilisateur>/<repo>     # Installer un plugin depuis GitHub
/plugin list                         # Lister les plugins installés
/plugin remove <nom>                 # Supprimer un plugin installé
```

---

## Mission

### /plugin add <utilisateur>/<repo>

1. Cloner le repo GitHub dans un dossier temporaire :
   ```bash
   git clone https://github.com/<utilisateur>/<repo>.git /tmp/plugin-install/<repo>
   ```

2. Inspecter le contenu du repo pour identifier les fichiers de skill (chercher `SKILL.md`, `*.md`, dossiers de skills).

3. Copier les fichiers pertinents dans `.claude/skills/<repo>/` ou `.claude/commands/` selon leur nature :
   - Un dossier avec `SKILL.md` → copier dans `.claude/skills/<nom>/`
   - Un fichier `<commande>.md` → copier dans `.claude/commands/<commande>.md`

4. Nettoyer le dossier temporaire :
   ```bash
   rm -rf /tmp/plugin-install/<repo>
   ```

5. Confirmer l'installation et expliquer comment utiliser le plugin.

### /plugin list

Lister tous les dossiers présents dans `.claude/skills/` et `.claude/commands/` pour donner une vue d'ensemble des plugins installés.

### /plugin remove <nom>

Supprimer le dossier correspondant dans `.claude/skills/<nom>/` ou le fichier dans `.claude/commands/<nom>.md` après confirmation de l'utilisateur.

---

## Règles importantes

- Toujours afficher ce qui va être installé avant de procéder
- Demander confirmation si un plugin existant va être écrasé
- Répondre en français
- Si le repo GitHub n'existe pas ou est inaccessible, signaler l'erreur clairement
