#!/usr/bin/env python3
"""Banniere LinkedIn (profil personnel) - AutomaIA, niche hotels & restaurants."""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1584, 396
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

random.seed(7)
for _ in range(18):
    cx = random.randint(40, 240)
    cy = random.randint(20, 120)
    rad = random.choice([2, 2, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(25, 80)))
for _ in range(14):
    cx = random.randint(1380, 1560)
    cy = random.randint(270, 376)
    rad = random.choice([2, 2, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(20, 60)))

draw.rectangle([0, 0, 10, H], fill=TEAL)

# --- centered composition (survives mobile cropping) ---
CX = 850  # slightly right of center: the profile photo sits bottom-left

# 1) small logo lockup on top
f_word = font(MONT_B, 34)
wa, wb = "Automa", "IA"
wwa = draw.textlength(wa, font=f_word)
wwb = draw.textlength(wb, font=f_word)
icon_r = 20
gap = 16
block = icon_r * 2 + gap + wwa + wwb
sx = CX - block / 2
draw_mark(draw, sx + icon_r, 66, icon_r, ring_color=TEAL, hands_color=WHITE)
draw.text((sx + icon_r * 2 + gap, 48), wa, font=f_word, fill=WHITE)
draw.text((sx + icon_r * 2 + gap + wwa, 48), wb, font=f_word, fill=TEAL)

# 2) main claim
f_h = font(MONT_B, 54)
p1, p2 = "Più recensioni. ", "Più prenotazioni."
w1 = draw.textlength(p1, font=f_h)
w2 = draw.textlength(p2, font=f_h)
lx = CX - (w1 + w2) / 2
draw.text((lx, 140), p1, font=f_h, fill=WHITE)
draw.text((lx + w1, 140), p2, font=f_h, fill=TEAL)

# 3) subline
f_sub = font(INTER_M, 27)
sub = "Hotel e ristoranti · Rimini e Riviera"
ws = draw.textlength(sub, font=f_sub)
draw.text((CX - ws / 2, 218), sub, font=f_sub, fill=GREY)

# 4) CTA pill
f_cta = font(MONT_SB, 22)
cta = "Report di visibilità gratuito"
wc = draw.textlength(cta, font=f_cta)
pad_x, pad_y = 26, 13
bx0 = CX - (wc + pad_x * 2) / 2
by0 = 278
draw.rounded_rectangle([bx0, by0, bx0 + wc + pad_x * 2, by0 + 22 + pad_y * 2],
                       radius=8, fill=(22, 184, 166, 38), outline=TEAL, width=2)
draw.text((bx0 + pad_x, by0 + pad_y - 2), cta, font=f_cta, fill=TEAL)

out = "/home/user/no_code-Projects/agence-ia/marque/linkedin-banner.png"
base.save(out, "PNG")
print("saved", out, base.size)
