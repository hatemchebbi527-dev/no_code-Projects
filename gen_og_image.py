#!/usr/bin/env python3
"""Images de partage (og:image) AutomaIA - niche hotels & restaurants.

Produit :
  - site/automaia-web/public/og-image.jpg    1200x630  image de marque, tout le site
  - site/automaia-web/public/og-report.jpg   1200x630  page /report uniquement
  - marque/linkedin-featured-sito.png        1200x627  section « In primo piano » LinkedIn
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (168, 187, 208)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"

SITE = "/home/user/no_code-Projects/agence-ia/site/automaia-web"
MARQUE = "/home/user/no_code-Projects/agence-ia/marque"


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_mark(draw, cx, cy, R, ring_color, hands_color):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(4, R // 6)
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    hw = width * 1.35
    a = math.radians(end_deg)
    at = a + (width * 2.3) / R

    def oc(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring_color)
    hwid = max(3, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hwid)
    d = max(2, R // 7)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


def spaced(draw, x, y, text, f, fill, extra):
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + extra
    return x


def render(W, H, badge, l1a, l1b, l2a, l2b, sub, url, title_size=68):
    c_from, c_to = (10, 32, 56), (14, 58, 74)
    small = Image.new("RGB", (60, 32))
    sp = small.load()
    for y in range(32):
        for x in range(60):
            t = max(0.0, min(1.0, ((1 - x / 59) * 0.55 + (y / 31) * 0.45)))
            sp[x, y] = tuple(int(c_from[i] + (c_to[i] - c_from[i]) * t) for i in range(3))
    base = small.resize((W, H), Image.BICUBIC)

    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse([-W * 0.25, H * 0.55, W * 0.55, H * 1.45], fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(W // 8))
    base = Image.composite(Image.new("RGB", (W, H), (16, 92, 96)), base, glow)

    draw = ImageDraw.Draw(base, "RGBA")
    random.seed(5)
    for _ in range(22):
        cx = random.randint(int(W * 0.76), W - 40)
        cy = random.randint(50, int(H * 0.38))
        rad = random.choice([2, 3, 3])
        draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad],
                     fill=(22, 184, 166, random.randint(25, 70)))

    k = H / 630.0
    PAD = int(80 * k)

    f_badge = font(MONT_SB, int(20 * k))
    sp_extra = 1.7 * k
    bw = sum(draw.textlength(c, font=f_badge) + sp_extra for c in badge) - sp_extra
    by0, bh = int(96 * k), int(50 * k)
    draw.rounded_rectangle([PAD, by0, PAD + bw + 56 * k, by0 + bh], radius=bh // 2,
                           fill=(22, 184, 166, 26), outline=TEAL, width=max(2, int(2 * k)))
    spaced(draw, PAD + 28 * k, by0 + 13 * k, badge, f_badge, TEAL, sp_extra)

    f_h = font(MONT_B, int(title_size * k))
    draw.text((PAD, int(205 * k)), l1a, font=f_h, fill=WHITE)
    draw.text((PAD + draw.textlength(l1a, font=f_h), int(205 * k)), l1b, font=f_h, fill=TEAL)
    draw.text((PAD, int(295 * k)), l2a, font=f_h, fill=WHITE)
    draw.text((PAD + draw.textlength(l2a, font=f_h), int(295 * k)), l2b, font=f_h, fill=TEAL)

    f_sub = font(INTER_M, int(28 * k))
    draw.text((PAD, int(415 * k)), sub, font=f_sub, fill=GREY)

    f_url = font(MONT_SB, int(31 * k))
    draw.text((PAD, int(540 * k)), url, font=f_url, fill=WHITE)

    f_word = font(MONT_B, int(35 * k))
    wa, wb = "Automa", "IA"
    wwa = draw.textlength(wa, font=f_word)
    wwb = draw.textlength(wb, font=f_word)
    icon_r, gap = int(19 * k), int(13 * k)
    sx = W - PAD - (icon_r * 2 + gap + wwa + wwb)
    draw_mark(draw, sx + icon_r, int(556 * k), icon_r, ring_color=TEAL, hands_color=WHITE)
    draw.text((sx + icon_r * 2 + gap, int(538 * k)), wa, font=f_word, fill=WHITE)
    draw.text((sx + icon_r * 2 + gap + wwa, int(538 * k)), wb, font=f_word, fill=TEAL)
    return base


BRAND = dict(
    badge="RECENSIONI E VISIBILITÀ · HOTEL E RISTORANTI",
    l1a="Più recensioni a ", l1b="5 stelle.",
    l2a="Più prenotazioni.", l2b="",
    sub="Hotel · Ristoranti · Rimini e Riviera romagnola",
    url="automa-ia.net",
)
REPORT = dict(
    badge="REPORT DI VISIBILITÀ · GRATUITO · 20 MINUTI",
    l1a="Scopra come La vedono", l1b="",
    l2a="oggi i ", l2b="Suoi clienti.",
    sub="Google Maps · ChatGPT · recensioni rispetto ai concorrenti",
    url="automa-ia.net/report",
    title_size=64,
)

render(1200, 630, **BRAND).save(f"{SITE}/public/og-image.jpg", "JPEG", quality=92, optimize=True)
print("saved public/og-image.jpg")

render(1200, 630, **REPORT).save(f"{SITE}/public/og-report.jpg", "JPEG", quality=92, optimize=True)
print("saved public/og-report.jpg")

render(1200, 627, **BRAND).save(f"{MARQUE}/linkedin-featured-sito.png", "PNG")
print("saved linkedin-featured-sito.png")
