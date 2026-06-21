# Site WordPress AutomaIA — child theme

Thème enfant de Hello Elementor, contenant les personnalisations du site AutomaIA.

## Installation (dans LocalWP)

1. Repère le dossier de ton site local : `.../app/public/wp-content/themes/`
2. Copie le dossier `hello-elementor-child/` (ce dépôt) dedans.
3. Dans WordPress : **Apparence > Thèmes** → active **"Hello Elementor Child AutomaIA"**.
   (Le thème parent "Hello Elementor" doit rester installé, mais c'est l'enfant qu'on active.)

## Contenu

- `style.css` : en-tête du thème (lien `Template: hello-elementor` qui le rattache au parent) + variables de couleurs de la charte. Les styles complets viennent au Jour 10.
- `functions.php` : charge la feuille de style du parent puis celle de l'enfant, dans le bon ordre.

## Pourquoi un child theme

Pour personnaliser le site sans modifier le thème parent. Quand Hello Elementor est mis à jour, le parent est écrasé mais nos modifications (dans l'enfant) restent intactes.
