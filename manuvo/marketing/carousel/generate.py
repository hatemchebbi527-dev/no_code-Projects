#!/usr/bin/env python3
"""Genere le carrousel de chauffe « Chi siamo » (5 slides 1080x1350).

Marque Manuvo : corail #FF5758 + crème #FAF8F4, police Bricolage Grotesque,
logo vectoriel officiel (manuvo/public/logo-mark.svg et logo.svg).

Prerequis :
    pip install cairosvg pillow
    # Police Bricolage Grotesque (SIL OFL) installee en local, par ex :
    #   mkdir -p ~/.fonts && cd ~/.fonts
    #   curl -s "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800" -o bg.css
    #   # telecharger les .ttf listes dans bg.css (fonts.gstatic.com) puis :
    #   fc-cache -f ~/.fonts

Usage :
    cd manuvo/marketing/carousel && python generate.py
    -> ecrit manuvo_carousel_1.png ... _5.png dans ce dossier.
"""
import base64
import os

import cairosvg
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.normpath(os.path.join(HERE, "..", "..", "public"))
AST = os.path.join(HERE, "_assets")
os.makedirs(AST, exist_ok=True)

W, H = 1080, 1350
CORAL, INK, CREAM, MUTED = "#FF5758", "#1b1e24", "#FAF8F4", "#6b7280"
F = "Bricolage Grotesque"


def render_svg(svg_path, out, width):
    cairosvg.svg2png(url=svg_path, write_to=out, output_width=width)


def to_white(inp, out):
    im = Image.open(inp).convert("RGBA")
    _, _, _, a = im.split()
    base = Image.new("RGBA", im.size, (255, 255, 255, 0))
    base.putalpha(a)
    base.save(out)


render_svg(os.path.join(PUB, "logo-mark.svg"), os.path.join(AST, "mark_coral.png"), 300)
to_white(os.path.join(AST, "mark_coral.png"), os.path.join(AST, "mark_white.png"))
render_svg(os.path.join(PUB, "logo.svg"), os.path.join(AST, "lockup_coral.png"), 900)
to_white(os.path.join(AST, "lockup_coral.png"), os.path.join(AST, "lockup_white.png"))


def datauri(path):
    return "data:image/png;base64," + base64.b64encode(open(path, "rb").read()).decode()


def img(path, x, y, w):
    im = Image.open(path)
    h = w * im.size[1] / im.size[0]
    return f'<image x="{x}" y="{y}" width="{w}" height="{h:.0f}" xlink:href="{datauri(path)}"/>'


def T(x, y, s, size, color, weight=800, anchor="start", ls="0"):
    s = s.replace("&", "&amp;")
    return (f'<text x="{x}" y="{y}" font-family="{F}" font-size="{size}" font-weight="{weight}" '
            f'fill="{color}" text-anchor="{anchor}" letter-spacing="{ls}">{s}</text>')


def check(cx, cy, r, ring, mark):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{ring}"/>'
            f'<path d="M{cx-r*0.42} {cy} L{cx-r*0.1} {cy+r*0.34} L{cx+r*0.45} {cy-r*0.4}" '
            f'stroke="{mark}" stroke-width="{r*0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')


def SVG(bg, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="{bg}"/>{body}</svg>')


MK = 90
mark_c, mark_w = os.path.join(AST, "mark_coral.png"), os.path.join(AST, "mark_white.png")
lockup_w = os.path.join(AST, "lockup_white.png")
slides = []

# S1 corail
b = img(mark_w, 90, 80, MK)
b += T(90, 560, "Presto", 150, "#ffffff") + T(90, 705, "a Rimini.", 150, "#ffffff")
b += '<rect x="94" y="770" width="140" height="10" rx="5" fill="#ffffff"/>'
b += T(90, 895, "Basta cercare", 58, "#ffffff", 500) + T(90, 968, "artigiani a caso.", 58, "#ffffff", 500)
b += T(90, 1272, "@manuvo.it", 40, "#ffffff", 700)
slides.append(SVG(CORAL, b))

# S2 cream
b = img(mark_c, 90, 80, MK)
b += T(90, 300, "CHI SIAMO", 36, CORAL, 700, "start", "6")
b += T(90, 440, "Ciao, sono Hatem.", 80, INK, 800)
for i, ln in enumerate(["Trovare un idraulico o un", "elettricista di fiducia a Rimini",
                        "è un incubo: numeri falsi,", "preventivi fantasma,", "zero garanzie."]):
    b += T(90, 600 + i * 86, ln, 56, INK, 400)
b += T(90, 1272, "@manuvo.it", 40, MUTED, 700)
slides.append(SVG(CREAM, b))

# S3 cream + checks
b = img(mark_c, 90, 80, MK)
b += T(90, 430, "La fiducia", 90, INK, 800) + T(90, 540, "prima di tutto.", 90, INK, 800)
for i, it in enumerate(["Contatti verificati via SMS", "Recensioni reali", "Artigiani con P.IVA"]):
    y = 720 + i * 140
    b += check(128, y - 18, 38, CORAL, "#ffffff") + T(200, y, it, 54, INK, 700)
b += T(90, 1272, "@manuvo.it", 40, MUTED, 700)
slides.append(SVG(CREAM, b))

# S4 cream
b = img(mark_c, 90, 80, MK)
b += T(90, 460, "Gratis per", 90, INK, 800) + T(90, 575, "chi cerca.", 90, CORAL, 800)
for i, ln in enumerate(["Pubblichi la tua richiesta", "e sono gli artigiani della", "tua zona a contattarti."]):
    b += T(90, 760 + i * 86, ln, 56, INK, 400)
b += T(90, 1272, "@manuvo.it", 40, MUTED, 700)
slides.append(SVG(CREAM, b))

# S5 corail CTA
b = img(lockup_w, 240, 300, 600)
b += T(540, 920, "Stiamo per partire.", 64, "#ffffff", 800, "middle")
b += T(540, 1010, "Seguici  →  @manuvo.it", 52, "#ffffff", 600, "middle")
b += T(540, 1250, "manuvo.automa-ia.net", 38, "#ffffff", 400, "middle")
slides.append(SVG(CORAL, b))

for i, s in enumerate(slides, 1):
    cairosvg.svg2png(bytestring=s.encode(), write_to=os.path.join(HERE, f"manuvo_carousel_{i}.png"),
                     output_width=W, output_height=H)
    print("ok", i)
