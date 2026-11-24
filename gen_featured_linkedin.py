#!/usr/bin/env python3
"""Vignette du lien automa-ia.net dans la section 'In primo piano' de LinkedIn.
Format 1200x627 (ratio 1.91:1), le meme que l'apercu des liens partages.
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 627
NAVY = (12, 34, 60)
NAVY2 = (23, 60, 102)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (168, 187, 208)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(4, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    a = math.radians(end_deg)
    at = a + (width * 2.3) / R

    def oc(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(3, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = max(2, R // 7)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


def spaced(draw, x, y, text, f, fill, extra):
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + extra
    return x


# fond : degrade diagonal navy
grad = Image.new("RGB", (W, H))
gd = grad.load()
for y in range(H):
    for x in range(0, W, 3):
        t = (x / W * 0.55 + y / H * 0.45)
        r = int(NAVY2[0] + (NAVY[0] - NAVY2[0]) * t)
        g = int(NAVY2[1] + (NAVY[1] - NAVY2[1]) * t)
        b = int(NAVY2[2] + (NAVY[2] - NAVY2[2]) * t)
        for dx in range(3):
            if x + dx < W:
                gd[x + dx, y] = (r, g, b)
base = grad
draw = ImageDraw.Draw(base, "RGBA")

random.seed(5)
for _ in range(20):
    cx = random.randint(900, 1160)
    cy = random.randint(60, 240)
    rad = random.choice([2, 3, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(25, 70)))

PAD = 68

# 1) pastille
f_badge = font(MONT_SB, 19)
badge = "RECENSIONI E VISIBILITÀ · HOTEL E RISTORANTI"
bw = sum(draw.textlength(c, font=f_badge) + 1.6 for c in badge) - 1.6
bx0, by0 = PAD, 62
draw.rounded_rectangle([bx0, by0, bx0 + bw + 56, by0 + 48], radius=24,
                       fill=(22, 184, 166, 26), outline=TEAL, width=2)
spaced(draw, bx0 + 28, by0 + 13, badge, f_badge, TEAL, 1.6)

# 2) titre
f_h = font(MONT_B, 66)
y1, y2 = 168, 254
a1, a2 = "Più recensioni a ", "5 stelle."
x = PAD
draw.text((x, y1), a1, font=f_h, fill=WHITE)
draw.text((x + draw.textlength(a1, font=f_h), y1), a2, font=f_h, fill=TEAL)
draw.text((PAD, y2), "Più prenotazioni.", font=f_h, fill=WHITE)

# 3) sous-titre
f_sub = font(INTER_M, 27)
draw.text((PAD, 368), "Hotel · Ristoranti · Rimini e Riviera romagnola", font=f_sub, fill=GREY)

# 4) ligne de pied
draw.line([(PAD, 470), (W - PAD, 470)], fill=(255, 255, 255, 38), width=2)

f_url = font(MONT_SB, 30)
draw.text((PAD, 512), "automa-ia.net", font=f_url, fill=WHITE)

f_word = font(MONT_B, 34)
wa, wb = "Automa", "IA"
wwa = draw.textlength(wa, font=f_word)
wwb = draw.textlength(wb, font=f_word)
icon_r = 18
gap = 13
block = icon_r * 2 + gap + wwa + wwb
sx = W - PAD - block
draw_mark(draw, sx + icon_r, 527, icon_r, ring_color=TEAL, hands_color=WHITE)
draw.text((sx + icon_r * 2 + gap, 510), wa, font=f_word, fill=WHITE)
draw.text((sx + icon_r * 2 + gap + wwa, 510), wb, font=f_word, fill=TEAL)

out = "/home/user/no_code-Projects/agence-ia/marque/linkedin-featured-sito.png"
base.save(out, "PNG")
print("saved", out, base.size)
