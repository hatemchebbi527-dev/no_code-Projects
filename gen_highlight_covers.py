#!/usr/bin/env python3
"""4 couvertures de stories a la une Instagram, 1080x1920.
Instagram recadre en cercle depuis le centre : tout est centre, rien en peripherie.
Pas de texte : a la taille d'affichage (~60 px) un mot est illisible,
et Instagram ecrit deja le nom sous la pastille.
"""
import math
from PIL import Image, ImageDraw, ImageFilter

NAVY_D = (10, 32, 56)
NAVY_L = (14, 58, 74)
TEAL = (22, 184, 166)
WHITE = (255, 255, 255)
OUT = "/home/user/no_code-Projects/agence-ia/marque/instagram/highlights"
W, H = 1080, 1920
CX, CY = W // 2, H // 2
F = 3  # supersampling


def background():
    sm = Image.new("RGB", (40, 72))
    sp = sm.load()
    for y in range(72):
        for x in range(40):
            t = max(0.0, min(1.0, ((1 - x / 39) * 0.5 + (y / 71) * 0.5)))
            sp[x, y] = tuple(int(NAVY_D[i] + (NAVY_L[i] - NAVY_D[i]) * t) for i in range(3))
    img = sm.resize((W * F, H * F), Image.BICUBIC)
    g = Image.new("L", (W * F, H * F), 0)
    ImageDraw.Draw(g).ellipse([CX * F - 520 * F, CY * F - 520 * F, CX * F + 520 * F, CY * F + 520 * F], fill=45)
    g = g.filter(ImageFilter.GaussianBlur(160 * F // 2))
    return Image.composite(Image.new("RGB", (W * F, H * F), (16, 92, 96)), img, g)


def star(d, cx, cy, R, fill):
    pts = []
    for i in range(10):
        ang = math.radians(-90 + i * 36)
        r = R if i % 2 == 0 else R * 0.42
        pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
    d.polygon(pts, fill=fill)


def icon_recensioni(d):
    star(d, CX * F, CY * F, 230 * F, TEAL)


def icon_metodo(d):
    r = 52 * F
    gap = 168 * F
    ys = (CY * F - gap, CY * F, CY * F + gap)
    d.line([(CX * F, ys[0]), (CX * F, ys[2])], fill=(255, 255, 255, 190), width=16 * F)
    for i, y in enumerate(ys):
        col = TEAL if i == 2 else WHITE
        d.ellipse([CX * F - r - 9 * F, y - r - 9 * F, CX * F + r + 9 * F, y + r + 9 * F],
                  fill=NAVY_D)
        d.ellipse([CX * F - r, y - r, CX * F + r, y + r], fill=col)


def icon_report(d):
    bw = 62 * F
    gap = 44 * F
    heights = (150 * F, 250 * F, 340 * F)
    total = 3 * bw + 2 * gap
    x0 = CX * F - total // 2
    base = CY * F + 180 * F
    for i, h in enumerate(heights):
        x = x0 + i * (bw + gap)
        col = TEAL if i == 2 else WHITE
        d.rounded_rectangle([x, base - h, x + bw, base], radius=bw // 2, fill=col)


def icon_chisono(d):
    hr = 110 * F
    hy = CY * F - 110 * F
    d.ellipse([CX * F - hr, hy - hr, CX * F + hr, hy + hr], fill=WHITE)
    bw2 = 215 * F
    top = hy + 150 * F
    d.pieslice([CX * F - bw2, top, CX * F + bw2, top + 2 * bw2], start=180, end=360, fill=TEAL)


ICONS = {
    "metodo": icon_metodo,
    "recensioni": icon_recensioni,
    "report": icon_report,
    "chi-sono": icon_chisono,
}

imgs = []
for name, fn in ICONS.items():
    big = background()
    d = ImageDraw.Draw(big, "RGBA")
    fn(d)
    img = big.resize((W, H), Image.LANCZOS)
    p = f"{OUT}/cover-{name}.jpg"
    img.save(p, "JPEG", quality=94, optimize=True)
    print("saved", p)
    imgs.append((name, img))

# planche : apercu en pastille ronde, comme sur le profil
sheet = Image.new("RGB", (4 * 230, 230), (18, 18, 18))
for i, (name, im) in enumerate(imgs):
    crop = im.crop((0, (H - W) // 2, W, (H + W) // 2)).resize((190, 190), Image.LANCZOS)
    mask = Image.new("L", (190, 190), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, 189, 189], fill=255)
    sheet.paste(crop, (i * 230 + 20, 20), mask)
sheet.save("/tmp/claude-0/highlights.jpg", "JPEG", quality=92)
print("planche /tmp/claude-0/highlights.jpg")
