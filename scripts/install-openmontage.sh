#!/usr/bin/env bash
# Installe ou met a jour OpenMontage (studio video agentique, AGPLv3).
#
# Usage :
#   bash scripts/install-openmontage.sh
#   OPENMONTAGE_DIR=~/OpenMontage bash scripts/install-openmontage.sh
#
# OPENMONTAGE_DIR choisit ou installer OpenMontage. Par defaut : le dossier
# OpenMontage/ a la racine du depot, deja ignore par .gitignore. Sous WSL,
# une cible dans le home Linux (~/OpenMontage) rend pip et npm nettement plus
# rapides qu'un chemin /mnt/c, au prix d'une installation hors du depot.
set -euo pipefail

REPO_URL="https://github.com/calesthio/OpenMontage.git"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${OPENMONTAGE_DIR:-$ROOT/OpenMontage}"
TARGET="${TARGET/#\~/$HOME}"                 # accepte ~ meme entre quotes
case "$TARGET" in /*) ;; *) TARGET="$PWD/$TARGET" ;; esac   # force un chemin absolu

say() { printf '\n==> %s\n' "$1"; }
die() { printf '\nERREUR : %s\n' "$1" >&2; exit 1; }

say "Verification des prerequis"

command -v git >/dev/null || die "git est absent."
command -v ffmpeg >/dev/null || die "ffmpeg est absent. macOS : brew install ffmpeg | Debian/Ubuntu : sudo apt install ffmpeg"

PY=""
for c in python3.13 python3.12 python3.11 python3.10 python3 python; do
  if command -v "$c" >/dev/null && "$c" -c 'import sys; raise SystemExit(0 if sys.version_info[:2] >= (3,10) else 1)' 2>/dev/null; then
    PY="$c"; break
  fi
done
[ -n "$PY" ] || die "Python 3.10+ est absent. https://www.python.org/downloads/"

command -v node >/dev/null || die "Node.js 18+ est absent. https://nodejs.org/"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 18 ] || die "Node.js 18+ requis (version detectee : $(node --version))."

printf '    python  : %s (%s)\n' "$PY" "$("$PY" -c 'import sys; print(".".join(map(str, sys.version_info[:3])))')"
printf '    node    : %s\n' "$(node --version)"
printf '    ffmpeg  : %s\n' "$(ffmpeg -version 2>/dev/null | head -1 | cut -d' ' -f3)"
printf '    cible   : %s\n' "$TARGET"

if [ -d "$TARGET/.git" ]; then
  say "OpenMontage deja present, mise a jour"
  git -C "$TARGET" pull --ff-only
else
  say "Clonage d'OpenMontage dans $TARGET"
  git clone --depth 1 "$REPO_URL" "$TARGET"
fi

say "Installation des dependances (make setup)"
printf '    Premiere fois : comptez 5 a 15 minutes (pip + npm + Piper TTS + HyperFrames).\n\n'
cd "$TARGET"
make setup PYTHON_VERSION="$("$PY" -c 'import sys; print("%d.%d" % sys.version_info[:2])')"

[ -f "$TARGET/.env" ] || cp "$TARGET/.env.example" "$TARGET/.env"

cat <<EOF

==> Termine.

Fichier de cles  : $TARGET/.env  (toutes les cles sont facultatives)
Guide complet    : $ROOT/docs/OPENMONTAGE.md

Pour produire une video, ouvre Claude Code DANS le dossier OpenMontage :

    cd "$TARGET" && claude

Puis decris ta video, par exemple :

    Make a 45-second animated explainer about why the sky is blue

EOF
