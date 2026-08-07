#!/usr/bin/env python3
"""Visuel de profil Instagram (post carré 1080x1080) - AutomaIA.
Instagram n'a pas de bannière de couverture : ce visuel sert de post épinglé /
vetrina en tête de compte, dans la même charte que les bannières LinkedIn/Facebook."""
import math
import random

from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1080
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


def centered(draw, segments, y):
    """segments: list of (text, font, color). Draws them centered on one line at y."""
    widths = [draw.textlength(t, font=f) for t, f, _ in segments]
    total = sum(widths)
    x = (W - total) / 2
    for (t, f, c), w in zip(segments, widths, strict=False):
        draw.text((x, y), t, font=f, fill=c)
        x += w


def centered_spaced(draw, text, f, color, y, gap=6):
    widths = [draw.textlength(c, font=f) + gap for c in text]
    total = sum(widths) - gap
    x = (W - total) / 2
    for c, w in zip(text, widths, strict=False):
        draw.text((x, y), c, font=f, fill=color)
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
    for _ in range(26):
        dx = random.randint(20, 260) * (1 if cxr == 0 else -1)
        dy = random.randint(20, 260) * (1 if cyr == 0 else -1)
        rad = random.choice([2, 3, 3, 4])
        draw.ellipse([cxr + dx - rad, cyr + dy - rad, cxr + dx + rad, cyr + dy + rad],
                     fill=(22, 184, 166, random.randint(25, 90)))

# thin teal frame
draw.rectangle([28, 28, W - 28, H - 28], outline=(22, 184, 166, 120), width=3)

# --- emblem: icon + wordmark + tagline ---
draw_mark(draw, W // 2, 250, 96, ring_color=TEAL, hands_color=WHITE)

f_word = font(MONT, 88, "Bold")
centered(draw, [("Automa", f_word, WHITE), ("IA", f_word, TEAL)], 348)

f_tag = font(MONT, 25, "SemiBold")
centered_spaced(draw, "AUTOMAZIONE & IA", f_tag, TEAL, 452)

# divider accent
draw.line([(W // 2 - 90, 512), (W // 2 + 90, 512)], fill=TEAL, width=3)

# --- value proposition ---
f_h = font(MONT, 66, "Bold")
centered(draw, [("Recupera fino a ", f_h, WHITE), ("10 ore", f_h, TEAL)], 566)
centered(draw, [("a settimana", f_h, WHITE)], 644)

# --- audience (health vertical included) ---
f_sub = font(INTER, 32, "Medium")
centered(draw, [("Studi legali · Commercialisti · Cliniche", f_sub, GREY)], 760)
centered(draw, [("Veterinari · Dentisti · Medici", f_sub, GREY)], 808)

# --- data note ---
f_note = font(INTER, 28, "Medium")
centered(draw, [("I tuoi dati sempre protetti", f_note, GREY)], 880)

# --- CTA pill ---
cta = "Audit gratuito di 20 min"
f_cta = font(MONT, 32, "SemiBold")
cw = draw.textlength(cta, font=f_cta)
px, py = (W - cw) / 2 - 34, 946
draw.rounded_rectangle([px, py, px + cw + 68, py + 66], radius=33, fill=TEAL)
draw.text(((W - cw) / 2, py + 14), cta, font=f_cta, fill=NAVY)

out = "agence-ia/marque/instagram-visual.png"
base.save(out, "PNG")
print("saved", out)
