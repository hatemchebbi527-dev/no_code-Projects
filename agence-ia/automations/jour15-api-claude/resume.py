"""
Jour 15 — Première API IA : résumer un texte avec l'API Claude.

But pédagogique : comprendre les 5 briques d'un appel API.
  1. La clé API   : ton mot de passe secret pour parler à l'API (jamais dans le code).
  2. Le fichier .env : où on range la clé, hors du code et hors de Git.
  3. Le client      : l'objet qui sait dialoguer avec l'API d'Anthropic.
  4. Les messages   : la conversation (rôle "user" = toi, "assistant" = Claude).
  5. Les tokens     : l'unité de mesure (et de facturation) du texte échangé.

Lancer :  python3 resume.py
"""

import os
import sys

# --- Brique 2 : charger le .env -------------------------------------------
# python-dotenv lit le fichier .env du dossier et met son contenu dans
# les "variables d'environnement". Ainsi la clé n'est jamais écrite en dur
# dans le code : on la lit, on ne la voit pas passer.
from dotenv import load_dotenv

load_dotenv()  # cherche un fichier .env à côté de ce script

# --- Brique 1 : récupérer la clé API --------------------------------------
# os.environ.get lit la variable. Si elle est absente, on s'arrête proprement
# avec un message clair, plutôt que de planter avec une erreur obscure.
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("Erreur : aucune clé trouvée.")
    print("Crée un fichier .env dans ce dossier avec :")
    print("    ANTHROPIC_API_KEY=sk-ant-...")
    print("(ta clé se crée sur https://console.anthropic.com, section API Keys)")
    sys.exit(1)

# --- Brique 3 : créer le client -------------------------------------------
# Le SDK "anthropic" fournit un client. Il prend la clé automatiquement
# depuis la variable d'environnement ANTHROPIC_API_KEY chargée plus haut.
import anthropic

client = anthropic.Anthropic()  # = anthropic.Anthropic(api_key=api_key)

# --- Le texte à résumer ----------------------------------------------------
# Pour l'exemple on met un texte en dur. Plus tard tu pourras le lire depuis
# un fichier, un email, un formulaire... c'est la même logique.
texte = """
La gestione di uno studio professionale comporta molte attività ripetitive:
rispondere alle email dei clienti, confermare gli appuntamenti, inviare
promemoria, archiviare documenti. Queste attivita, prese una per una,
sembrano piccole, ma sommate portano via diverse ore ogni settimana,
spesso la sera o nei weekend. Automatizzandone una parte, il titolare
recupera tempo da dedicare al lavoro che conta davvero e ai clienti.
"""

# --- Brique 4 + 5 : l'appel API -------------------------------------------
# messages.create = on envoie la conversation et on reçoit la réponse.
#   model       : quel modèle Claude utiliser (Haiku = rapide et économique).
#   max_tokens  : longueur MAX de la réponse (1 token ~ 4 caractères).
#   messages    : la liste des tours de parole. Ici un seul message "user"
#                 qui contient la consigne + le texte.
message = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=300,
    messages=[
        {
            "role": "user",
            "content": f"Riassumi questo testo in 2 frasi semplici, in italiano :\n\n{texte}",
        }
    ],
)

# --- Lire la réponse -------------------------------------------------------
# La réponse arrive structurée : message.content est une liste de blocs.
# Le texte se trouve dans le premier bloc, attribut .text.
resume = message.content[0].text

print("\n--- RÉSUMÉ ---")
print(resume.strip())

# --- Comprendre la facturation (tokens) -----------------------------------
# usage indique combien de tokens ont été lus (input) et écrits (output).
# C'est exactement ce qui est facturé. Le voir te donne le réflexe du coût.
print("\n--- TOKENS UTILISÉS ---")
print(f"Entrée (texte envoyé) : {message.usage.input_tokens} tokens")
print(f"Sortie (réponse)      : {message.usage.output_tokens} tokens")
