#!/usr/bin/env python3
"""Déclinaisons de la marque AutomaIA : avatar rond, favicon, logo sur fond blanc."""
import math
from PIL import Image, ImageDraw, ImageFont

NAVY = (15, 42, 74, 255)
TEAL = (22, 184, 166, 255)
WHITE = (255, 255, 255, 255)
MONT = "/tmp/fonts/Montserrat.ttf"


def font(size, variation="Bold"):
    f = ImageFont.truetype(MONT, size)
    try:
        f.set_variation_by_name(variation)
    except Exception:
        pass
    return f


def draw_mark(draw, cx, cy, R, ring_color=TEAL, hands_color=WHITE):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(5, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    L = width * 2.3
    a = math.radians(end_deg)
    at = a + L / R

    def oc(ang, rad):
        return (cx + rad * math.cos(ang), cy + rad * math.sin(ang))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(4, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = R // 7
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


# 1) AVATAR rond (photo de profil réseaux) - fond navy, icône blanche, 800x800
S = 800
av = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(av)
d.ellipse([0, 0, S, S], fill=NAVY)
draw_mark(d, S // 2, S // 2, 250, ring_color=TEAL, hands_color=WHITE)
av.save("agence-ia/marque/logo-automaia-avatar.png", "PNG")
print("saved avatar")

# 2) FAVICON - carré navy arrondi + icône, 256x256
F = 256
fav = Image.new("RGBA", (F, F), (0, 0, 0, 0))
d = ImageDraw.Draw(fav)
d.rounded_rectangle([0, 0, F, F], radius=48, fill=NAVY)
draw_mark(d, F // 2, F // 2, 78, ring_color=TEAL, hands_color=WHITE)
fav.save("agence-ia/marque/favicon.png", "PNG")
print("saved favicon")

# 3) LOGO sur fond BLANC avec marges (documents, propositions)
W, Hh = 1600, 500
wb = Image.new("RGBA", (W, Hh), WHITE)
d = ImageDraw.Draw(wb)
cx, cy, R = 250, 250, 150
draw_mark(d, cx, cy, R, ring_color=TEAL, hands_color=NAVY)
f_name = font(132, "Bold")
f_tag = font(38, "SemiBold")
tx = 460
d.text((tx, 140), "Automa", font=f_name, fill=NAVY)
wn = d.textlength("Automa", font=f_name)
d.text((tx + wn, 140), "IA", font=f_name, fill=TEAL)
xx, yy = tx + 4, 290
for ch in "AUTOMAZIONE & IA":
    d.text((xx, yy), ch, font=f_tag, fill=TEAL)
    xx += d.textlength(ch, font=f_tag) + 6
wb.save("agence-ia/marque/logo-automaia-white.png", "PNG")
print("saved white-bg logo")
