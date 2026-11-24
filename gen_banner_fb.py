#!/usr/bin/env python3
"""Couverture Facebook (Page) - AutomaIA, niche hotels & restaurants.
Format 1640x624 = ratio exact de l'affichage desktop (820x312).
Tout le texte reste dans la zone centrale de 1100 px, visible aussi sur mobile.
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1640, 624
NAVY = (15, 42, 74)
NAVY2 = (22, 58, 99)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (197, 211, 226)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(5, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    L = width * 2.3
    a = math.radians(end_deg)
    at = a + L / R

    def oc(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(3, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = max(2, R // 7)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


grad = Image.new("RGB", (W, H))
gd = grad.load()
for y in range(H):
    for x in range(0, W, 4):
        t = (x / W * 0.6 + y / H * 0.4)
        r = int(NAVY[0] + (NAVY2[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (NAVY2[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (NAVY2[2] - NAVY[2]) * t)
        for dx in range(4):
            if x + dx < W:
                gd[x + dx, y] = (r, g, b)
base = grad
draw = ImageDraw.Draw(base, "RGBA")

random.seed(11)
for _ in range(22):
    cx = random.randint(40, 260)
    cy = random.randint(30, 170)
    rad = random.choice([2, 3, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(25, 80)))
for _ in range(18):
    cx = random.randint(1390, 1600)
    cy = random.randint(440, 590)
    rad = random.choice([2, 3, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(20, 65)))

CX = W // 2

# 1) logo lockup : icone + wordmark sur une ligne
f_word = font(MONT_B, 46)
wa, wb = "Automa", "IA"
wwa = draw.textlength(wa, font=f_word)
wwb = draw.textlength(wb, font=f_word)
icon_r = 27
gap = 20
block = icon_r * 2 + gap + wwa + wwb
sx = CX - block / 2
draw_mark(draw, sx + icon_r, 120, icon_r, ring_color=TEAL, hands_color=WHITE)
draw.text((sx + icon_r * 2 + gap, 94), wa, font=f_word, fill=WHITE)
draw.text((sx + icon_r * 2 + gap + wwa, 94), wb, font=f_word, fill=TEAL)

# 2) claim sur 2 lignes
f_h = font(MONT_B, 58)
l1a, l1b = "Più recensioni a ", "5 stelle"
w1a = draw.textlength(l1a, font=f_h)
w1b = draw.textlength(l1b, font=f_h)
lx = CX - (w1a + w1b) / 2
draw.text((lx, 220), l1a, font=f_h, fill=WHITE)
draw.text((lx + w1a, 220), l1b, font=f_h, fill=TEAL)

l2 = "per hotel e ristoranti"
w2 = draw.textlength(l2, font=f_h)
draw.text((CX - w2 / 2, 296), l2, font=f_h, fill=WHITE)

# 3) subline
f_sub = font(INTER_M, 28)
sub = "Rimini e Riviera · una risposta a ogni recensione · visibilità su Google"
ws = draw.textlength(sub, font=f_sub)
draw.text((CX - ws / 2, 396), sub, font=f_sub, fill=GREY)

# 4) CTA pill
f_cta = font(MONT_SB, 24)
cta = "Report di visibilità gratuito · automa-ia.net"
wc = draw.textlength(cta, font=f_cta)
pad_x, pad_y = 30, 15
bx0 = CX - (wc + pad_x * 2) / 2
by0 = 458
draw.rounded_rectangle([bx0, by0, bx0 + wc + pad_x * 2, by0 + 24 + pad_y * 2],
                       radius=9, fill=(22, 184, 166, 38), outline=TEAL, width=2)
draw.text((bx0 + pad_x, by0 + pad_y - 2), cta, font=f_cta, fill=TEAL)

out = "/home/user/no_code-Projects/agence-ia/marque/facebook-banner.png"
base.save(out, "PNG")
print("saved", out, base.size)
