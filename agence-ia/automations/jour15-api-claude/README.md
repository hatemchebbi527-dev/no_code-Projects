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

```
python3 resume.py
```

(Le script sera construit étape par étape avec Claude Code.)
