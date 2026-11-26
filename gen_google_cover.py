#!/usr/bin/env python3
"""Photo de couverture de la fiche Google (16:9, 1200x675)."""
import math, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY_D, NAVY_L = (10, 32, 56), (14, 58, 74)
TEAL, WHITE, GREY = (22, 184, 166), (255, 255, 255), (168, 187, 208)
MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"
W, H = 1200, 675


def f(p, s):
    return ImageFont.truetype(p, s)


def mark(d, cx, cy, R, ring, hands):
    w = max(4, int(R / 5.2))
    d.arc([cx - R, cy - R, cx + R, cy + R], start=22, end=318, fill=ring, width=w)
    hw = w * 1.35
    a = math.radians(318)
    at = a + (w * 2.3) / R
    oc = lambda g, r: (cx + r * math.cos(g), cy + r * math.sin(g))
    d.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring)
    hwid = max(3, int(R / 9))
    d.line([(cx, cy), (cx, cy - R * 0.58)], fill=hands, width=hwid)
    d.line([(cx, cy), (cx + R * 0.44, cy + R * 0.19)], fill=hands, width=hwid)
    dd = int(hwid * 1.5)
    d.ellipse([cx - dd, cy - dd, cx + dd, cy + dd], fill=hands)


sm = Image.new("RGB", (40, 23))
sp = sm.load()
for y in range(23):
    for x in range(40):
        t = max(0.0, min(1.0, ((1 - x / 39) * 0.55 + (y / 22) * 0.45)))
        sp[x, y] = tuple(int(NAVY_D[i] + (NAVY_L[i] - NAVY_D[i]) * t) for i in range(3))
img = sm.resize((W, H), Image.BICUBIC)
g = Image.new("L", (W, H), 0)
ImageDraw.Draw(g).ellipse([-W * 0.25, H * 0.5, W * 0.55, H * 1.5], fill=70)
g = g.filter(ImageFilter.GaussianBlur(W // 7))
img = Image.composite(Image.new("RGB", (W, H), (16, 92, 96)), img, g)
d = ImageDraw.Draw(img, "RGBA")

random.seed(9)
for _ in range(20):
    cx = random.randint(int(W * 0.78), W - 40)
    cy = random.randint(50, int(H * 0.35))
    r = random.choice([3, 4])
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(22, 184, 166, random.randint(25, 70)))

# logo centre
wa, wb = "Automa", "IA"
fw = f(MONT_B, 64)
wwa, wwb = d.textlength(wa, font=fw), d.textlength(wb, font=fw)
ir, gp = 35, 22
block = ir * 2 + gp + wwa + wwb
sx = (W - block) / 2
mark(d, sx + ir, 232, ir, ring=TEAL, hands=WHITE)
d.text((sx + ir * 2 + gp, 196), wa, font=fw, fill=WHITE)
d.text((sx + ir * 2 + gp + wwa, 196), wb, font=fw, fill=TEAL)

fh = f(MONT_B, 44)
a1, a2 = "Recensioni e visibilità per ", "hotel e ristoranti"
w1, w2 = d.textlength(a1, font=fh), d.textlength(a2, font=fh)
lx = (W - (w1 + w2)) / 2
d.text((lx, 330), a1, font=fh, fill=WHITE)
d.text((lx + w1, 330), a2, font=fh, fill=TEAL)

fs = f(INTER_M, 26)
sub = "Rimini · Riviera romagnola"
d.text(((W - d.textlength(sub, font=fs)) / 2, 408), sub, font=fs, fill=GREY)

fu = f(MONT_SB, 25)
u = "automa-ia.net"
d.text(((W - d.textlength(u, font=fu)) / 2, 530), u, font=fu, fill=WHITE)

out = "/home/user/no_code-Projects/agence-ia/marque/google-copertina.jpg"
img.save(out, "JPEG", quality=94, optimize=True)
print("saved", out, img.size)
