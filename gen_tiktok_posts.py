#!/usr/bin/env python3
"""6 visuels verticaux 1080x1920 pour un carrousel photo TikTok.
Memes messages que la serie Instagram, mis en page pour le format 9:16 et
en gardant les zones d'interface TikTok libres (bas et bord droit).
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY_D = (10, 32, 56)
NAVY_L = (14, 58, 74)
NAVY = (15, 42, 74)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (168, 187, 208)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"
OUT = "/home/user/no_code-Projects/agence-ia/marque/tiktok"
W, H = 1080, 1920


def font(p, s):
    return ImageFont.truetype(p, s)


def draw_mark(d, cx, cy, R, ring, hands):
    d.arc([cx - R, cy - R, cx + R, cy + R], start=22, end=318, fill=ring,
          width=max(4, int(R / 5.2)))
    w = max(4, int(R / 5.2))
    hw = w * 1.35
    a = math.radians(318)
    at = a + (w * 2.3) / R
    oc = lambda ang, rad: (cx + rad * math.cos(ang), cy + rad * math.sin(ang))
    d.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring)
    hwid = max(3, int(R / 9))
    d.line([(cx, cy), (cx, cy - R * 0.58)], fill=hands, width=hwid)
    d.line([(cx, cy), (cx + R * 0.44, cy + R * 0.19)], fill=hands, width=hwid)
    dd = int(hwid * 1.5)
    d.ellipse([cx - dd, cy - dd, cx + dd, cy + dd], fill=hands)


def spaced(d, x, y, t, f, fill, ex):
    for c in t:
        d.text((x, y), c, font=f, fill=fill)
        x += d.textlength(c, font=f) + ex


def spaced_w(d, t, f, ex):
    return sum(d.textlength(c, font=f) + ex for c in t) - ex


def background(variant):
    if variant == "teal":
        img = Image.new("RGB", (W, H), TEAL)
        g = Image.new("L", (W, H), 0)
        ImageDraw.Draw(g).ellipse([-W * 0.4, H * 0.55, W * 0.8, H * 1.3], fill=60)
        g = g.filter(ImageFilter.GaussianBlur(W // 5))
        return Image.composite(Image.new("RGB", (W, H), (16, 150, 140)), img, g)
    sm = Image.new("RGB", (40, 72))
    sp = sm.load()
    for y in range(72):
        for x in range(40):
            t = max(0.0, min(1.0, ((1 - x / 39) * 0.5 + (y / 71) * 0.5)))
            sp[x, y] = tuple(int(NAVY_D[i] + (NAVY_L[i] - NAVY_D[i]) * t) for i in range(3))
    img = sm.resize((W, H), Image.BICUBIC)
    g = Image.new("L", (W, H), 0)
    ImageDraw.Draw(g).ellipse([-W * 0.4, H * 0.6, W * 0.75, H * 1.35], fill=70)
    g = g.filter(ImageFilter.GaussianBlur(W // 5))
    return Image.composite(Image.new("RGB", (W, H), (16, 92, 96)), img, g)


def render(name, badge, lines, sub, variant="navy", size=86):
    img = background(variant)
    d = ImageDraw.Draw(img, "RGBA")
    if variant == "teal":
        fg, accent, subc, bc = NAVY, WHITE, (18, 60, 60), NAVY
        bfill = (255, 255, 255, 60)
    else:
        fg, accent, subc, bc = WHITE, TEAL, GREY, TEAL
        bfill = (22, 184, 166, 26)
        random.seed(len(badge))
        for _ in range(22):
            cx = random.randint(int(W * 0.6), W - 70)
            cy = random.randint(430, 640)
            r = random.choice([3, 4, 4])
            d.ellipse([cx - r, cy - r, cx + r, cy + r],
                      fill=(22, 184, 166, random.randint(25, 65)))

    PAD = 96
    f_b = font(MONT_SB, 28)
    ex = 2.4
    bw = spaced_w(d, badge, f_b, ex)
    bh = 68
    d.rounded_rectangle([PAD, 330, PAD + bw + 72, 330 + bh], radius=bh // 2,
                        fill=bfill, outline=bc, width=3)
    spaced(d, PAD + 36, 330 + 19, badge, f_b, bc, ex)

    f_h = font(MONT_B, size)
    lh = int(size * 1.24)
    y = 560
    for segs in lines:
        x = PAD
        for txt, k in segs:
            d.text((x, y), txt, font=f_h, fill=accent if k == "a" else fg)
            x += d.textlength(txt, font=f_h)
        y += lh

    f_s = font(INTER_M, 34)
    d.text((PAD, y + 60), sub, font=f_s, fill=subc)

    # pied, remonte pour rester au-dessus de l'interface TikTok
    f_w = font(MONT_B, 42)
    wa, wb = "Automa", "IA"
    wwa = d.textlength(wa, font=f_w)
    ir, gp = 23, 16
    base_y = 1430
    d.text((PAD + ir * 2 + gp, base_y), wa, font=f_w, fill=fg)
    d.text((PAD + ir * 2 + gp + wwa, base_y), wb, font=f_w, fill=accent)
    draw_mark(d, PAD + ir, base_y + 22, ir, ring=accent, hands=fg)
    f_u = font(MONT_SB, 29)
    d.text((PAD, base_y + 85), "automa-ia.net", font=f_u, fill=subc)

    p = f"{OUT}/{name}.jpg"
    img.save(p, "JPEG", quality=94, optimize=True)
    print("saved", p)
    return img


POSTS = [
    ("01-promessa", "HOTEL E RISTORANTI · RIMINI",
     [[("Più", "n")], [("recensioni", "n")], [("a 5 stelle.", "a")], [("Più", "n")], [("prenotazioni.", "n")]],
     "Rimini e Riviera romagnola", "navy", 84),
    ("02-problema", "IL PROBLEMA",
     [[("Ogni", "n")], [("recensione", "n")], [("senza risposta", "a")], [("è un cliente", "n")], [("in meno.", "n")]],
     "I futuri ospiti leggono anche le risposte.", "navy", 80),
    ("03-chatgpt", "VISIBILITÀ",
     [[("Se ChatGPT", "n")], [("non La", "n")], [("consiglia,", "n")], [("per quel cliente", "n")], [("non esiste.", "a")]],
     "Sempre più ospiti chiedono a un'AI dove dormire.", "navy", 76),
    ("04-risposte", "AUTOMA RISPOSTE",
     [[("Una risposta", "n")], [("curata a ogni", "n")], [("recensione.", "a")]],
     "Nella lingua del cliente.\nLe negative passano sempre da Lei.", "navy", 84),
    ("05-social", "AUTOMA SOCIAL",
     [[("Le Sue", "n")], [("recensioni", "n")], [("migliori", "n")], [("diventano", "n")], [("contenuti.", "a")]],
     "Ogni settimana, post pronti per i Suoi canali.", "navy", 84),
    ("06-report", "GRATUITO · 20 MINUTI",
     [[("Scopra come", "n")], [("La vedono", "n")], [("oggi i Suoi", "n")], [("clienti.", "n")]],
     "Report di visibilità gratuito.", "teal", 84),
]

imgs = []
for p in POSTS:
    name, badge, lines, sub, variant, size = p
    if "\n" in sub:
        a, b = sub.split("\n")
        img = render(name, badge, lines, a, variant, size)
        d = ImageDraw.Draw(img, "RGBA")
        col = (18, 60, 60) if variant == "teal" else GREY
        ly = 560 + int(size * 1.24) * len(lines) + 60
        d.text((96, ly + 46), b, font=font(INTER_M, 34), fill=col)
        img.save(f"{OUT}/{name}.jpg", "JPEG", quality=94, optimize=True)
    else:
        img = render(*p)
    imgs.append(img)

sheet = Image.new("RGB", (6 * 196, 348), (255, 255, 255))
for i, im in enumerate(imgs):
    sheet.paste(im.resize((186, 331), Image.LANCZOS), (i * 196 + 5, 8))
sheet.save("/tmp/claude-0/tiktok.jpg", "JPEG", quality=92)
print("planche /tmp/claude-0/tiktok.jpg")
