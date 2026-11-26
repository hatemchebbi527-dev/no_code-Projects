#!/usr/bin/env python3
"""6 visuels carres 1080x1080 pour la grille Instagram d'AutomaIA."""
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (15, 42, 74)
NAVY_D = (10, 32, 56)
NAVY_L = (14, 58, 74)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
GREY = (168, 187, 208)

MONT_B = "/tmp/fonts/Montserrat-700.ttf"
MONT_SB = "/tmp/fonts/Montserrat-600.ttf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"
OUT = "/home/user/no_code-Projects/agence-ia/marque/instagram"
S = 1080


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_mark(draw, cx, cy, R, ring, hands):
    bbox = [cx - R, cy - R, cx + R, cy + R]
    w = max(4, int(R / 5.2))
    end = 318
    draw.arc(bbox, start=22, end=end, fill=ring, width=w)
    hw = w * 1.35
    a = math.radians(end)
    at = a + (w * 2.3) / R

    def oc(ang, rad):
        return (cx + rad * math.cos(ang), cy + rad * math.sin(ang))

    draw.polygon([oc(at, R), oc(a, R - hw), oc(a, R + hw)], fill=ring)
    hwid = max(3, int(R / 9))
    draw.line([(cx, cy), (cx, cy - R * 0.58)], fill=hands, width=hwid)
    draw.line([(cx, cy), (cx + R * 0.44, cy + R * 0.19)], fill=hands, width=hwid)
    d = int(hwid * 1.5)
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands)


def spaced(draw, x, y, text, f, fill, extra):
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + extra
    return x


def spaced_w(draw, text, f, extra):
    return sum(draw.textlength(c, font=f) + extra for c in text) - extra


def background(variant):
    if variant == "teal":
        img = Image.new("RGB", (S, S), TEAL)
        d = ImageDraw.Draw(img, "RGBA")
        glow = Image.new("L", (S, S), 0)
        ImageDraw.Draw(glow).ellipse([-S * 0.3, S * 0.5, S * 0.6, S * 1.4], fill=60)
        glow = glow.filter(ImageFilter.GaussianBlur(S // 7))
        img = Image.composite(Image.new("RGB", (S, S), (16, 150, 140)), img, glow)
        return img
    small = Image.new("RGB", (40, 40))
    sp = small.load()
    for y in range(40):
        for x in range(40):
            t = max(0.0, min(1.0, ((1 - x / 39) * 0.55 + (y / 39) * 0.45)))
            sp[x, y] = tuple(int(NAVY_D[i] + (NAVY_L[i] - NAVY_D[i]) * t) for i in range(3))
    img = small.resize((S, S), Image.BICUBIC)
    glow = Image.new("L", (S, S), 0)
    ImageDraw.Draw(glow).ellipse([-S * 0.3, S * 0.55, S * 0.55, S * 1.45], fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(S // 7))
    return Image.composite(Image.new("RGB", (S, S), (16, 92, 96)), img, glow)


def render(name, badge, lines, sub, variant="navy", size=76):
    img = background(variant)
    d = ImageDraw.Draw(img, "RGBA")

    if variant == "teal":
        fg, accent, subc, badge_c = NAVY, WHITE, (18, 60, 60), NAVY
        badge_fill = (255, 255, 255, 60)
    else:
        fg, accent, subc, badge_c = WHITE, TEAL, GREY, TEAL
        badge_fill = (22, 184, 166, 26)
        random.seed(len(badge))
        for _ in range(18):
            cx = random.randint(int(S * 0.72), S - 50)
            cy = random.randint(60, int(S * 0.3))
            r = random.choice([3, 4, 4])
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(22, 184, 166, random.randint(25, 70)))

    PAD = 92

    f_badge = font(MONT_SB, 25)
    ex = 2.2
    bw = spaced_w(d, badge, f_badge, ex)
    bh = 60
    d.rounded_rectangle([PAD, 110, PAD + bw + 64, 110 + bh], radius=bh // 2,
                        fill=badge_fill, outline=badge_c, width=3)
    spaced(d, PAD + 32, 110 + 17, badge, f_badge, badge_c, ex)

    f_h = font(MONT_B, size)
    lh = int(size * 1.22)
    total = lh * len(lines)
    y = (S - total) // 2 + 20
    for segs in lines:
        x = PAD
        for txt, kind in segs:
            col = accent if kind == "a" else fg
            d.text((x, y), txt, font=f_h, fill=col)
            x += d.textlength(txt, font=f_h)
        y += lh

    f_sub = font(INTER_M, 29)
    d.text((PAD, S - 215), sub, font=f_sub, fill=subc)

    f_word = font(MONT_B, 34)
    wa, wb = "Automa", "IA"
    wwa = d.textlength(wa, font=f_word)
    icon_r, gap = 19, 13
    d.text((PAD + icon_r * 2 + gap, S - 128), wa, font=f_word, fill=fg)
    d.text((PAD + icon_r * 2 + gap + wwa, S - 128), wb, font=f_word, fill=accent)
    draw_mark(d, PAD + icon_r, S - 110, icon_r, ring=accent, hands=fg)

    f_url = font(MONT_SB, 25)
    u = "automa-ia.net"
    d.text((S - PAD - d.textlength(u, font=f_url), S - 122), u, font=f_url, fill=subc)

    p = f"{OUT}/{name}.jpg"
    img.save(p, "JPEG", quality=94, optimize=True)
    print("saved", p)
    return img


POSTS = [
    ("01-promessa", "HOTEL E RISTORANTI · RIMINI",
     [[("Più recensioni", "n")], [("a 5 stelle.", "a")], [("Più prenotazioni.", "n")]],
     "Hotel e ristoranti · Rimini e Riviera romagnola", "navy", 76),
    ("02-problema", "IL PROBLEMA",
     [[("Ogni recensione", "n")], [("senza risposta", "a")], [("è un cliente", "n")], [("in meno.", "n")]],
     "I futuri ospiti leggono anche le risposte.", "navy", 70),
    ("03-chatgpt", "VISIBILITÀ",
     [[("Se ChatGPT", "n")], [("non La consiglia,", "n")], [("per quel cliente", "n")], [("non esiste.", "a")]],
     "Sempre più ospiti chiedono a un assistente AI dove dormire.", "navy", 66),
    ("04-risposte", "AUTOMA RISPOSTE",
     [[("Una risposta", "n")], [("curata a ogni", "n")], [("recensione.", "a")]],
     "Nella lingua del cliente. Le negative passano sempre da Lei.", "navy", 72),
    ("05-social", "AUTOMA SOCIAL",
     [[("Le Sue recensioni", "n")], [("migliori diventano", "n")], [("contenuti.", "a")]],
     "Ogni settimana, post pronti per i Suoi canali social.", "navy", 64),
    ("06-report", "GRATUITO · 20 MINUTI",
     [[("Scopra come", "n")], [("La vedono oggi", "n")], [("i Suoi clienti.", "n")]],
     "Report di visibilità gratuito · link in bio", "teal", 72),
]

imgs = [render(*p) for p in POSTS]

sheet = Image.new("RGB", (3 * 372, 2 * 372), (255, 255, 255))
for i, im in enumerate(imgs):
    sheet.paste(im.resize((360, 360), Image.LANCZOS), ((i % 3) * 372 + 6, (i // 3) * 372 + 6))
sheet.save("/tmp/claude-0/grille.jpg", "JPEG", quality=92)
print("planche /tmp/claude-0/grille.jpg")
