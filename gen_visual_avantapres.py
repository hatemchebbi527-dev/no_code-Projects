#!/usr/bin/env python3
"""Visuel 'Prima / Dopo' pour illustrer le post veille - marque AutomaIA."""
import math
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1080
NAVY = (15, 42, 74)
NAVY2 = (22, 58, 99)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (150, 165, 185)
MUTED = (120, 135, 155)
REDISH = (224, 122, 122)

MONT = "/tmp/fonts/Montserrat.ttf"
INTER = "/tmp/fonts/Inter.ttf"


def font(path, size, variation=None):
    f = ImageFont.truetype(path, size)
    if variation:
        try:
            f.set_variation_by_name(variation)
        except Exception:
            pass
    return f


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(4, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    L = width * 2.3
    a = math.radians(end_deg)
    at = a + L / R

    def oc(ang, rad):
        return (cx + rad * math.cos(ang), cy + rad * math.sin(ang))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(3, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = R // 7
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


def cross(draw, x, y, s, color):
    draw.line([(x - s, y - s), (x + s, y + s)], fill=color, width=6)
    draw.line([(x - s, y + s), (x + s, y - s)], fill=color, width=6)


def check(draw, x, y, s, color):
    draw.line([(x - s, y), (x - s * 0.2, y + s * 0.8)], fill=color, width=7)
    draw.line([(x - s * 0.2, y + s * 0.8), (x + s, y - s * 0.7)], fill=color, width=7)


def ctext(draw, cx, y, text, f, fill):
    w = draw.textlength(text, font=f)
    draw.text((cx - w / 2, y), text, font=f, fill=fill)


# background gradient
grad = Image.new("RGB", (W, H))
gd = grad.load()
for y in range(H):
    for x in range(0, W, 4):
        t = (x / W * 0.5 + y / H * 0.5)
        r = int(NAVY[0] + (NAVY2[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (NAVY2[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (NAVY2[2] - NAVY[2]) * t)
        for dx in range(4):
            if x + dx < W:
                gd[x + dx, y] = (r, g, b)
base = grad
d = ImageDraw.Draw(base, "RGBA")

# header
f_label = font(MONT, 30, "SemiBold")
ctext(d, W // 2, 80, "MONITORAGGIO DEL SETTORE", f_label, TEAL)
f_title = font(MONT, 76, "Bold")
ctext(d, W // 2, 124, "Prima  vs  Dopo", f_title, WHITE)

# vertical divider
d.line([(W // 2, 280), (W // 2, 760)], fill=(255, 255, 255, 40), width=2)

# columns
f_col = font(MONT, 46, "Bold")
f_item = font(INTER, 32, "Medium")

# PRIMA (left)
lx = 290
ctext(d, lx, 300, "PRIMA", f_col, GREY)
prima = ["Cerco le notizie", "a mano, ogni giorno", "Tempo perso", "e disordine"]
y = 420
for i, line in enumerate(prima):
    if i in (0, 2):
        cross(d, lx - 150, y + 16, 14, REDISH)
    ctext(d, lx + 10, y, line, f_item, MUTED if False else (200, 210, 222))
    y += 64

# DOPO (right)
rx = 790
ctext(d, rx, 300, "DOPO", f_col, TEAL)
dopo = ["Tutto in automatico", "in un unico foglio", "0 minuti", "al giorno"]
y = 420
for i, line in enumerate(dopo):
    if i in (0, 2):
        check(d, rx - 170, y + 16, 16, TEAL)
    ctext(d, rx + 10, y, line, f_item, WHITE)
    y += 64

# bottom: logo lockup
draw_mark(d, W // 2 - 150, 900, 46, ring_color=TEAL, hands_color=WHITE)
f_word = font(MONT, 60, "Bold")
wa, wb = "Automa", "IA"
wwa = d.textlength(wa, font=f_word)
wwb = d.textlength(wb, font=f_word)
startx = W // 2 - 90
d.text((startx, 868), wa, font=f_word, fill=WHITE)
d.text((startx + wwa, 868), wb, font=f_word, fill=TEAL)

out = "agence-ia/contenuti/veille-prima-dopo.png"
import os
os.makedirs("agence-ia/contenuti", exist_ok=True)
base.save(out, "PNG")
print("saved", out)
