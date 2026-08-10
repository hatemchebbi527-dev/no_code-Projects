#!/usr/bin/env python3
"""
Genere une version 100% autonome de la landing page (keibido-artifact.html) :
- polices Google (Cormorant, Jost, Shippori Mincho) embarquees en @font-face base64
- images SVG inlinees en data URI
- fichier pur ASCII (entites HTML + echappements \\u) -> insensible a l'encodage

Sert a publier un LIEN PARTAGEABLE (artifact claude.ai) ou a heberger un fichier
unique. Pour le site final classique, utiliser index.html + assets/ (plus leger).

Usage : python3 build_artifact.py   (necessite un acces reseau a fonts.googleapis.com)
"""
import re, base64, subprocess, urllib.parse, os

HERE = os.path.dirname(os.path.abspath(__file__))
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

# Kanji / kana reellement utilises (subset Shippori Mincho -> fichier minuscule)
JP = "慶美堂鏡の中静けさ水光時清診断浄化施術余韻儀式和・"

FONTS = [
    ("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap", None, True),
    ("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap", None, True),
    ("https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;700", JP, False),
]

def curl(url, binary=False):
    r = subprocess.run(["curl", "-s", "-A", UA, url], capture_output=True)
    return r.stdout if binary else r.stdout.decode("utf-8", "replace")

def embed_fonts():
    out = []
    for url, text, latin_only in FONTS:
        if text:
            url += "&text=" + urllib.parse.quote(text)
        css = curl(url)
        for b in re.findall(r"@font-face\s*\{.*?\}", css, re.S):
            rng = re.search(r"unicode-range:\s*([^;]+);", b)
            if latin_only and rng:
                r = rng.group(1)
                if "U+0000" not in r and "U+0100" not in r:
                    continue  # on garde latin + latin-ext, on jette cyrillique/grec/vietnamien
            m = re.search(r"url\((https://[^)]+)\)", b)
            if not m:
                continue
            data = curl(m.group(1), binary=True)
            if not data or data[:4] != b"wOF2":
                continue
            out.append(b.replace(m.group(1), "data:font/woff2;base64," + base64.b64encode(data).decode()))
    return "\n".join(out)

def datauri(path):
    return "data:image/svg+xml;base64," + base64.b64encode(open(path, "rb").read()).decode()

def main():
    html = open(f"{HERE}/index.html").read()
    fonts = embed_fonts()
    mcss = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)

    for n in ["hero", "mizu", "hikari", "jikan", "sei", "experience", "founder"]:
        body = body.replace(f"assets/img/{n}.svg", datauri(f"{HERE}/assets/img/{n}.svg"))

    m = re.search(r"(<script>)(.*?)(</script>)", body, re.S)
    pre, scr, post = body[:m.start()], m.group(2), body[m.end():]

    ent = lambda s: "".join(c if ord(c) < 128 else f"&#{ord(c)};" for c in s)          # HTML
    jse = lambda s: "".join(c if ord(c) < 128 else f"\\u{ord(c):04x}" for c in s)      # JS
    css = "".join(c if ord(c) < 128 else f"\\{ord(c):04X}" for c in mcss)              # CSS

    art = ("<style>\n" + fonts + "\n" + css + "\n</style>\n"
           + ent(pre) + "<script>" + jse(scr) + "</script>" + ent(post))
    assert all(ord(c) < 128 for c in art), "des octets non-ASCII subsistent"

    out = f"{HERE}/keibido-artifact.html"
    open(out, "w").write(art)
    print(f"OK -> {out}  ({round(len(art)/1024)} KB, pur ASCII)")

if __name__ == "__main__":
    main()
