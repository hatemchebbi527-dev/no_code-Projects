#!/usr/bin/env python3
import math
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


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(5, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    L = width * 2.3
    a = math.radians(end_deg)
    dtheta = L / R
    at = a + dtheta

    def oc(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(4, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = R // 7
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


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

# subtle dots top-left only (clear of text and logo)
import random
random.seed(7)
for _ in range(16):
    cx = random.randint(40, 220)
    cy = random.randint(20, 110)
    rad = random.choice([2, 2, 3])
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(22, 184, 166, random.randint(25, 80)))

# left accent bar
draw.rectangle([0, 0, 10, H], fill=TEAL)

# --- LEFT/CENTER: value proposition (centered in the area left of the logo) ---
f_h = font(MONT, 52, "Bold")
f_sub = font(INTER, 25, "Medium")
cxt = 800  # centered between the profile photo (left) and the logo (right)
# line 1 with teal "10 ore"
a1 = "Recupera fino a "
a2 = "10 ore"
w1 = draw.textlength(a1, font=f_h)
w2 = draw.textlength(a2, font=f_h)
lx1 = cxt - (w1 + w2) / 2
draw.text((lx1, 118), a1, font=f_h, fill=WHITE)
draw.text((lx1 + w1, 118), a2, font=f_h, fill=TEAL)
# line 2 (centered)
wl2 = draw.textlength("a settimana", font=f_h)
draw.text((cxt - wl2 / 2, 184), "a settimana", font=f_h, fill=WHITE)
# subline (centered)
sub = "Automazione per studi legali e di commercialisti"
ws = draw.textlength(sub, font=f_sub)
draw.text((cxt - ws / 2, 262), sub, font=f_sub, fill=GREY)

# --- RIGHT: logo lockup (icon + wordmark), readable, clear of profile photo ---
lx = 1320  # horizontal center of the logo block
# icon
draw_mark(draw, lx, 150, 64, ring_color=TEAL, hands_color=WHITE)
# wordmark "AutomaIA" centered under the icon
f_word = font(MONT, 60, "Bold")
wa, wb = "Automa", "IA"
wwa = draw.textlength(wa, font=f_word)
wwb = draw.textlength(wb, font=f_word)
wx = lx - (wwa + wwb) / 2
draw.text((wx, 232), wa, font=f_word, fill=WHITE)
draw.text((wx + wwa, 232), wb, font=f_word, fill=TEAL)
# small tagline with letter spacing
f_tag = font(MONT, 18, "SemiBold")
tag = "AUTOMAZIONE & IA"
total = sum(draw.textlength(c, font=f_tag) + 4 for c in tag) - 4
tx = lx - total / 2
for c in tag:
    draw.text((tx, 308), c, font=f_tag, fill=TEAL)
    tx += draw.textlength(c, font=f_tag) + 4

out = "agence-ia/marque/linkedin-banner.png"
base.save(out, "PNG")
print("saved", out)
