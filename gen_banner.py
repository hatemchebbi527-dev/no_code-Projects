#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

W, H = 1584, 396
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


# --- background: diagonal gradient navy ---
base = Image.new("RGB", (W, H), NAVY)
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

# --- decorative teal dots (far-right + top-left corners, clear of centered text) ---
import random
random.seed(7)
for _ in range(55):
    cx = random.randint(W - 210, W - 20)
    cy = random.randint(20, H - 20)
    rad = random.choice([2, 2, 3, 4])
    alpha = random.randint(30, 130)
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, alpha))
for _ in range(18):
    cx = random.randint(40, 200)
    cy = random.randint(20, 120)
    rad = random.choice([2, 2, 3])
    alpha = random.randint(25, 90)
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, alpha))

# --- accent diagonal line (far right) ---
draw.line([(W - 240, H), (W - 60, 0)], fill=(22, 184, 166, 60), width=3)
draw.line([(W - 200, H), (W - 20, 0)], fill=(22, 184, 166, 30), width=2)

# left accent bar
draw.rectangle([0, 0, 10, H], fill=TEAL)

# --- text block (CENTERED, clear of profile photo on desktop) ---
f_h1 = font(MONT, 56, "Bold")
f_h2 = font(MONT, 56, "Bold")
f_sub = font(INTER, 25, "Medium")
f_badge = font(MONT, 24, "SemiBold")

cx = W // 2
line1a = "Automazione "
line1b = "& IA"
line2 = "per studi legali e di commercialisti"
subline = "Recupera fino a 10 ore a settimana  ·  I tuoi dati sempre protetti"

# line 1 (centered, with teal "& IA")
w1a = draw.textlength(line1a, font=f_h1)
w1b = draw.textlength(line1b, font=f_h1)
x1 = cx - (w1a + w1b) / 2
draw.text((x1, 78), line1a, font=f_h1, fill=WHITE)
draw.text((x1 + w1a, 78), line1b, font=f_h1, fill=TEAL)

# line 2 (centered)
w2 = draw.textlength(line2, font=f_h2)
draw.text((cx - w2 / 2, 144), line2, font=f_h2, fill=WHITE)

# subline (centered)
ws = draw.textlength(subline, font=f_sub)
draw.text((cx - ws / 2, 228), subline, font=f_sub, fill=GREY)

# --- badge pill (centered) ---
badge_txt = "Audit gratuito di 20 min"
pad_x, pad_y = 20, 12
tw = draw.textlength(badge_txt, font=f_badge)
bw = tw + pad_x * 2
bx, by = cx - bw / 2, 290
draw.rounded_rectangle([bx, by, bx + bw, by + 44], radius=22, fill=TEAL)
draw.text((bx + pad_x, by + pad_y - 2), badge_txt, font=f_badge, fill=NAVY)

out = "agence-ia/marque/linkedin-banner.png"
base.save(out, "PNG")
print("saved", out)
