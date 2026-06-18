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

# --- decorative teal dots cluster (right side) ---
import random
random.seed(7)
for _ in range(70):
    cx = random.randint(W - 430, W - 20)
    cy = random.randint(20, H - 20)
    rad = random.choice([2, 2, 3, 4])
    alpha = random.randint(30, 130)
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, alpha))

# --- accent diagonal line ---
draw.line([(W - 470, H), (W - 250, 0)], fill=(22, 184, 166, 60), width=3)
draw.line([(W - 430, H), (W - 210, 0)], fill=(22, 184, 166, 30), width=2)

# left accent bar
draw.rectangle([0, 0, 10, H], fill=TEAL)

# --- text block (left-aligned, vertically centered, clear of avatar) ---
f_h1 = font(MONT, 58, "Bold")
f_h2 = font(MONT, 58, "Bold")
f_sub = font(INTER, 26, "Medium")
f_badge = font(MONT, 24, "SemiBold")

x0 = 90
line1 = "Automazione & IA"
line2 = "per studi legali e di commercialisti"

draw.text((x0, 92), line1, font=f_h1, fill=WHITE)
# accent on the "& IA" handled simply: redraw "& IA" portion in teal
w_auto = draw.textlength("Automazione ", font=f_h1)
draw.text((x0 + w_auto, 92), "& IA", font=f_h1, fill=TEAL)

draw.text((x0, 160), line2, font=f_h2, fill=WHITE)

draw.text((x0, 244), "Recupera fino a 10 ore a settimana  ·  I tuoi dati sempre protetti",
          font=f_sub, fill=GREY)

# --- badge pill ---
badge_txt = "Audit gratuito di 20 min"
pad_x, pad_y = 20, 12
tw = draw.textlength(badge_txt, font=f_badge)
bx, by = x0, 300
draw.rounded_rectangle([bx, by, bx + tw + pad_x * 2, by + 44], radius=22, fill=TEAL)
draw.text((bx + pad_x, by + pad_y - 2), badge_txt, font=f_badge, fill=NAVY)

out = "agence-ia/marque/linkedin-banner.png"
base.save(out, "PNG")
print("saved", out)
