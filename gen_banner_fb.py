#!/usr/bin/env python3
"""Bannière de couverture Facebook (Page) - AutomaIA, contenu centré dans la zone sûre."""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1640, 924  # taille recommandée pour une couverture de Page Facebook
NAVY = (15, 42, 74)
NAVY2 = (22, 58, 99)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (197, 211, 226)

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


def centered(draw, segments, y, gap=0):
    """segments: list of (text, font, color). Draws them centered on one line at y."""
    widths = [draw.textlength(t, font=f) for t, f, _ in segments]
    total = sum(widths)
    x = (W - total) / 2
    for (t, f, c), w in zip(segments, widths, strict=False):
        draw.text((x, y), t, font=f, fill=c)
        x += w


# --- background: diagonal gradient navy ---
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

# subtle teal dots in the corners
random.seed(7)
for cxr, cyr in [(0, 0), (W, H)]:
    for _ in range(22):
        dx = random.randint(20, 240) * (1 if cxr == 0 else -1)
        dy = random.randint(20, 200) * (1 if cyr == 0 else -1)
        rad = random.choice([2, 3, 3, 4])
        draw.ellipse([cxr + dx - rad, cyr + dy - rad, cxr + dx + rad, cyr + dy + rad],
                     fill=(22, 184, 166, random.randint(25, 90)))

# --- centered emblem: icon + wordmark + tagline (compact, shifted up) ---
draw_mark(draw, W // 2, 248, 78, ring_color=TEAL, hands_color=WHITE)

f_word = font(MONT, 70, "Bold")
centered(draw, [("Automa", f_word, WHITE), ("IA", f_word, TEAL)], 322)

f_tag = font(MONT, 22, "SemiBold")
tag = "AUTOMAZIONE & IA"
# letter-spaced, centered
widths = [draw.textlength(c, font=f_tag) + 5 for c in tag]
total = sum(widths) - 5
x = (W - total) / 2
for c, w in zip(tag, widths, strict=False):
    draw.text((x, 408), c, font=f_tag, fill=TEAL)
    x += w

# divider accent
draw.line([(W // 2 - 80, 458), (W // 2 + 80, 458)], fill=TEAL, width=3)

# --- value proposition (centered, smaller) ---
f_h = font(MONT, 52, "Bold")
centered(draw, [("Recupera fino a ", f_h, WHITE), ("10 ore", f_h, TEAL)], 496)
centered(draw, [("a settimana", f_h, WHITE)], 560)

f_sub = font(INTER, 26, "Medium")
centered(draw, [("Automazione per studi legali e di commercialisti  ·  Dati protetti", f_sub, GREY)], 632)

out = "agence-ia/marque/facebook-banner.png"
base.save(out, "PNG")
print("saved", out)
