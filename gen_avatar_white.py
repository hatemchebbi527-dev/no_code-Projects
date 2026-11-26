#!/usr/bin/env python3
"""Avatar AutomaIA sur fond blanc, carre, pour les photos de profil des reseaux."""
import math
from PIL import Image, ImageDraw

NAVY = (15, 42, 74)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(5, int(R / 5.2))
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    a = math.radians(end_deg)
    at = a + (width * 2.3) / R

    def oc(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(4, int(R / 9))
    draw.line([(cx, cy), (cx, cy - R * 0.58)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.44, cy + R * 0.19)], fill=hands_color, width=hwid)
    d = int(hwid * 1.5)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


# rendu x4 puis reduction, pour des bords nets
S = 1080
F = 4
img = Image.new("RGB", (S * F, S * F), WHITE)
d = ImageDraw.Draw(img)
draw_mark(d, S * F // 2, S * F // 2, int(330 * F), ring_color=TEAL, hands_color=NAVY)
img = img.resize((S, S), Image.LANCZOS)

out = "/home/user/no_code-Projects/agence-ia/marque/logo-automaia-avatar-white.png"
img.save(out, "PNG")
print("saved", out, img.size)
