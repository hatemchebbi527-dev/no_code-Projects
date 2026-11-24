#!/usr/bin/env python3
"""Banniere de la Page entreprise LinkedIn (1128x191).
Le logo de la Page recouvre le bas gauche : on laisse ~250 px libres a gauche.
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1128, 191
NAVY = (12, 34, 60)
NAVY2 = (23, 60, 102)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (176, 194, 214)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
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
    hwid = max(2, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = max(2, R // 7)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


grad = Image.new("RGB", (W, H))
gd = grad.load()
for y in range(H):
    for x in range(0, W, 3):
        t = (x / W * 0.6 + y / H * 0.4)
        r = int(NAVY[0] + (NAVY2[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (NAVY2[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (NAVY2[2] - NAVY[2]) * t)
        for dx in range(3):
            if x + dx < W:
                gd[x + dx, y] = (r, g, b)
base = grad
draw = ImageDraw.Draw(base, "RGBA")

random.seed(3)
for _ in range(14):
    cx = random.randint(940, 1100)
    cy = random.randint(16, 80)
    rad = random.choice([2, 2, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad],
                 fill=(22, 184, 166, random.randint(25, 70)))

draw.rectangle([0, 0, 7, H], fill=TEAL)

# bloc centre a droite du logo de la Page
CX = 690

f_h = font(MONT_B, 34)
p1, p2 = "Più recensioni. ", "Più prenotazioni."
w1 = draw.textlength(p1, font=f_h)
w2 = draw.textlength(p2, font=f_h)
lx = CX - (w1 + w2) / 2
draw.text((lx, 56), p1, font=f_h, fill=WHITE)
draw.text((lx + w1, 56), p2, font=f_h, fill=TEAL)

f_sub = font(INTER_M, 19)
sub = "Hotel e ristoranti · Rimini e Riviera · automa-ia.net"
ws = draw.textlength(sub, font=f_sub)
draw.text((CX - ws / 2, 108), sub, font=f_sub, fill=GREY)

# petit logo en haut a droite
f_word = font(MONT_B, 22)
wa, wb = "Automa", "IA"
wwa = draw.textlength(wa, font=f_word)
wwb = draw.textlength(wb, font=f_word)
icon_r = 13
gap = 9
sx = W - 36 - (icon_r * 2 + gap + wwa + wwb)
draw_mark(draw, sx + icon_r, 146, icon_r, ring_color=TEAL, hands_color=WHITE)
draw.text((sx + icon_r * 2 + gap, 134), wa, font=f_word, fill=WHITE)
draw.text((sx + icon_r * 2 + gap + wwa, 134), wb, font=f_word, fill=TEAL)

out = "/home/user/no_code-Projects/agence-ia/marque/linkedin-page-cover.png"
base.save(out, "PNG")
print("saved", out, base.size)
