# Jour 15 — Première API IA (script Python → API Claude)

Petit script d'apprentissage : appeler l'API Claude depuis du code Python pour résumer un texte.
Objectif pédagogique : comprendre clé API, fichier `.env`, endpoint, structure des messages et tokens.

## Prérequis

1. **Python 3** installé (vérifier avec `python3 --version`).
2. **Une clé API Anthropic** créée sur https://console.anthropic.com (section API Keys).
   Attention : l'API est facturée à l'usage (crédits console), c'est séparé de l'abonnement Claude.
3. **Le SDK officiel** : `pip install -r requirements.txt`

## Configuration de la clé (à faire en local, jamais committé)

Crée un fichier `.env` dans ce dossier, avec dedans :

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxx
```

Ce fichier est protégé par le `.gitignore` du projet : il ne partira jamais sur GitHub.

## Lancer le script

Le script `resume.py` est écrit et commenté. Pour le lancer en local :

```
pip install -r requirements.txt        # une seule fois
cp .env.example .env                    # puis colle ta vraie clé dans .env
python3 resume.py
```

Sans clé, le script s'arrête proprement avec un message d'aide (testé). Avec ta
clé, il affiche un résumé en italien du texte d'exemple + le nombre de tokens
utilisés (ce qui est facturé).

## Les 5 briques à comprendre (le coeur du Jour 15)

1. **Clé API** : ton mot de passe secret pour l'API. Jamais dans le code.
2. **Fichier .env** : où on range la clé, hors du code et hors de Git.
3. **Client** : l'objet `anthropic.Anthropic()` qui dialogue avec l'API.
4. **Messages** : la conversation, rôle `user` (toi) et `assistant` (Claude).
5. **Tokens** : l'unité de mesure et de facturation (~4 caractères = 1 token).

Chaque brique est commentée dans `resume.py`. Lis les commentaires dans l'ordre,
c'est la leçon du jour.

## Pistes pour aller plus loin (quand tu seras à l'aise)

- Lire le texte depuis un fichier au lieu de l'écrire en dur.
- Changer le modèle (Haiku rapide/économique vs un modèle plus puissant).
- Faire varier `max_tokens` et observer l'effet sur la réponse et les tokens.
