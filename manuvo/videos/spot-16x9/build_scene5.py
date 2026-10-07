"""Rebuild MANUVO Scene 5 (app interface / professional match) in post.

The Kling take had an invented keyboard layout, nonsense profile text, a wrong
app logo and three red arrows pointing at the screen. Everything on screen is
typographic, which is exactly what a video model cannot render, so the shot is
composited instead of generated.

Renders 120 frames at 1920x1080 / 24fps = 5.0s to match the other clips.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080
FPS = 24
DURATION = 7.0
NFRAMES = int(round(FPS * DURATION))

CORAL = (255, 87, 87)
GOLD = (232, 170, 60)
STAR_OFF = (216, 220, 227)
INK = (22, 24, 30)
MUTED = (122, 130, 144)
SCREEN = (245, 247, 250)
CARD = (255, 255, 255)
KEYCAP = (253, 253, 254)
KEYBED = (206, 210, 217)

QUERY = "Perdita d'acqua in cucina"
RECENT = ["Caldaia non si accende", "Montaggio cucina", "Tapparella bloccata"]

KEY_ROWS = [list("QWERTYUIOP"), list("ASDFGHJKL"), list("ZXCVBNM")]

# name, trade, rating, reviews, distance, availability, avatar colour
PROS = [
    ("Marco Ferrari", "Idraulico", 4.9, "127 recensioni", "1,2 km", "Disponibile oggi", (44, 110, 196)),
    ("Luca Bianchi", "Idraulico", 4.8, "94 recensioni", "2,1 km", "Disponibile oggi", (186, 92, 50)),
    ("Giuseppe Romano", "Idraulico", 5.0, "68 recensioni", "3,4 km", "Domani mattina", (58, 132, 106)),
]

FDIR = "/usr/share/fonts/opentype/inter"
FONTS = {
    "bold": FDIR + "/InterDisplay-Bold.otf",
    "semi": FDIR + "/InterDisplay-SemiBold.otf",
    "med": FDIR + "/Inter-Medium.otf",
    "reg": FDIR + "/Inter-Regular.otf",
}

SRC_LOGO = sys.argv[1]
OUT_DIR = sys.argv[2]

PHONE = (184, 54, 476, 972)          # x, y, w, h
CARDS_X, CARDS_W = 790, 980
CARD_H, CARD_GAP = 190, 40

# Rows of the source logo: hexagon mark above, MANUVO wordmark below.
MARK_ROWS = (196, 568)


def font(kind, size):
    return ImageFont.truetype(FONTS[kind], size)


def _clear_outer_white(a):
    rgb = a[:, :, :3].astype(np.int16)
    white = (rgb > 242).all(axis=2)
    outer = np.zeros_like(white)
    outer[0, :] = white[0, :]
    outer[-1, :] = white[-1, :]
    outer[:, 0] = white[:, 0]
    outer[:, -1] = white[:, -1]
    while True:
        g = outer.copy()
        g[1:, :] |= outer[:-1, :]
        g[:-1, :] |= outer[1:, :]
        g[:, 1:] |= outer[:, :-1]
        g[:, :-1] |= outer[:, 1:]
        g &= white
        if np.array_equal(g, outer):
            break
        outer = g
    a[:, :, 3] = np.where(outer, 0, 255).astype(np.uint8)
    return a


def cut_logo(path, part="full"):
    """Crop the logo to its ink and clear surrounding white, keeping cut-outs.

    part="mark" takes only the hexagon, which is the only piece legible at
    header size.
    """
    a = np.array(Image.open(path).convert("RGBA"))
    if part == "mark":
        a = a[MARK_ROWS[0]:MARK_ROWS[1] + 1]
    rgb = a[:, :, :3].astype(np.int16)
    ink = ~((rgb > 245).all(axis=2))
    ys, xs = np.where(ink)
    pad = 4
    a = a[max(ys.min() - pad, 0):ys.max() + pad + 1,
          max(xs.min() - pad, 0):xs.max() + pad + 1].copy()
    return Image.fromarray(_clear_outer_white(a), "RGBA")


def background():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - W * 0.30) / (W * 0.92)) ** 2 + ((yy - H * 0.48) / (H * 1.05)) ** 2)
    t = np.clip(d, 0.0, 1.0)[:, :, None]
    c0 = np.array((34, 30, 28), np.float32)
    c1 = np.array((13, 12, 13), np.float32)
    return Image.fromarray((c0 + (c1 - c0) * t).astype(np.uint8), "RGB").convert("RGBA")


def ease_out(x):
    x = min(max(x, 0.0), 1.0)
    return 1.0 - (1.0 - x) ** 3


def seg(t, a, b):
    if b <= a:
        return 1.0 if t >= b else 0.0
    return ease_out((t - a) / (b - a))


def fade(layer, opacity):
    if opacity >= 1.0:
        return layer
    out = layer.copy()
    out.putalpha(out.getchannel("A").point(lambda v: int(v * max(opacity, 0.0))))
    return out


def centre_text(d, box, text, f, fill):
    x0, y0, x1, y1 = box
    bb = d.textbbox((0, 0), text, font=f)
    d.text((x0 + (x1 - x0 - (bb[2] - bb[0])) / 2 - bb[0],
            y0 + (y1 - y0 - (bb[3] - bb[1])) / 2 - bb[1]), text, font=f, fill=fill)


def star(d, cx, cy, size, fill):
    pts = []
    for k in range(10):
        ang = -np.pi / 2 + k * np.pi / 5
        r = size / 2 if k % 2 == 0 else size / 4.7
        pts.append((cx + r * np.cos(ang), cy + r * np.sin(ang)))
    d.polygon(pts, fill=fill)


def star_row(img, x, y, size, rating):
    """Five stars with the last one partially filled, so 4.9 reads as 4.9."""
    layer = Image.new("RGBA", (int(5 * (size + 3)) + 4, size + 4), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for i in range(5):
        star(ld, i * (size + 3) + size / 2, size / 2 + 2, size, STAR_OFF)
    gold = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(gold)
    for i in range(5):
        star(gd, i * (size + 3) + size / 2, size / 2 + 2, size, GOLD)
    keep = int(round((rating / 5.0) * layer.size[0]))
    mask = Image.new("L", layer.size, 0)
    ImageDraw.Draw(mask).rectangle((0, 0, keep, layer.size[1]), fill=255)
    layer.paste(gold, (0, 0), mask)
    img.alpha_composite(layer, (int(x), int(y)))
    return x + layer.size[0]


def globe(d, cx, cy, r, col):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=col, width=2)
    d.line((cx - r, cy, cx + r, cy), fill=col, width=2)
    d.ellipse((cx - r * 0.5, cy - r, cx + r * 0.5, cy + r), outline=col, width=2)


def draw_keyboard(img, x, y, w, h):
    """iOS-style Italian QWERTY, sized so nothing is clipped at the edges."""
    d = ImageDraw.Draw(img)
    d.rectangle((x, y, x + w, y + h), fill=KEYBED)

    margin, gap = 7, 6
    avail = w - margin * 2
    kw = (avail - gap * 9) / 10.0
    kh = h * 0.175
    top = y + h * 0.055
    row_pitch = kh + h * 0.035

    for ri, row in enumerate(KEY_ROWS):
        ry = top + ri * row_pitch
        n = len(row)
        if ri == 2:
            side = kw * 1.45
            run = n * kw + (n - 1) * gap
            total = side * 2 + gap * 2 + run
            sx = x + margin + (avail - total) / 2
            d.rounded_rectangle((sx, ry, sx + side, ry + kh), radius=6, fill=(183, 188, 197))
            centre_text(d, (sx, ry, sx + side, ry + kh), "⇧", font("med", int(kh * 0.46)), INK)
            sx += side + gap
        else:
            run = n * kw + (n - 1) * gap
            sx = x + margin + (avail - run) / 2

        f = font("med", int(kh * 0.50))
        for key in row:
            d.rounded_rectangle((sx, ry, sx + kw, ry + kh), radius=6, fill=KEYCAP)
            centre_text(d, (sx, ry, sx + kw, ry + kh), key, f, INK)
            sx += kw + gap

        if ri == 2:
            sx += gap - gap
            d.rounded_rectangle((sx, ry, sx + side, ry + kh), radius=6, fill=(183, 188, 197))
            centre_text(d, (sx, ry, sx + side, ry + kh), "⌫", font("med", int(kh * 0.44)), INK)

    ry = top + 3 * row_pitch
    f = font("med", int(kh * 0.38))
    widths = [avail * 0.145, avail * 0.105, avail * 0.455, avail * 0.215]
    labels = ["123", None, "spazio", "invio"]
    sx = x + margin
    for lw, label in zip(widths, labels):
        fill = CORAL if label == "invio" else KEYCAP
        d.rounded_rectangle((sx, ry, sx + lw, ry + kh), radius=6, fill=fill)
        if label is None:
            globe(d, sx + lw / 2, ry + kh / 2, kh * 0.26, INK)
        else:
            centre_text(d, (sx, ry, sx + lw, ry + kh), label, f,
                        (255, 255, 255) if label == "invio" else INK)
        sx += lw + gap


def draw_pro(img, x, y, w, h, pro, compact=False):
    name, trade, rating, reviews, dist, avail, col = pro
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((x, y, x + w, y + h), radius=14 if compact else 18, fill=CARD)

    r = h - (20 if compact else 38)
    ax, ay = x + (12 if compact else 20), y + (10 if compact else 19)
    d.ellipse((ax, ay, ax + r, ay + r), fill=col)
    ini = "".join(p[0] for p in name.split()[:2])
    centre_text(d, (ax, ay, ax + r, ay + r), ini, font("bold", int(r * 0.40)), (255, 255, 255))

    tx = ax + r + (12 if compact else 22)
    d.text((tx, y + (10 if compact else 22)), name,
           font=font("semi", 17 if compact else 28), fill=INK)
    d.text((tx, y + (31 if compact else 58)), trade,
           font=font("med", 13 if compact else 21), fill=MUTED)

    ss = 12 if compact else 20
    sy = y + (51 if compact else 92)
    ex = star_row(img, tx, sy, ss, rating)
    label = ("%.1f" % rating) if compact else ("%.1f  ·  %s" % (rating, reviews))
    d.text((ex + 8, sy + (0 if compact else 2)), label,
           font=font("med", 13 if compact else 20), fill=MUTED)

    fd = font("med", 13 if compact else 21)
    bb = d.textbbox((0, 0), dist, font=fd)
    d.text((x + w - (12 if compact else 26) - (bb[2] - bb[0]), y + (11 if compact else 24)),
           dist, font=fd, fill=MUTED)

    fa = font("semi", 12 if compact else 19)
    bb = d.textbbox((0, 0), avail, font=fa)
    padx, pady = (9, 6) if compact else (14, 10)
    pw, ph = (bb[2] - bb[0]) + padx * 2, (bb[3] - bb[1]) + pady * 2
    px = x + w - (12 if compact else 26) - pw
    py = y + h - (10 if compact else 26) - ph
    ok = avail.startswith("Disponibile")
    d.rounded_rectangle((px, py, px + pw, py + ph), radius=ph // 2,
                        fill=(234, 247, 240) if ok else (248, 243, 234))
    d.text((px + padx - bb[0], py + pady - bb[1]), avail, font=fa,
           fill=(34, 134, 90) if ok else (166, 118, 42))


def phone_screen(t, mark):
    px, py, pw, ph = PHONE
    sw, sh = pw - 26, ph - 26
    s = Image.new("RGBA", (sw, sh), SCREEN + (255,))
    d = ImageDraw.Draw(s)

    d.text((26, 20), "9:41", font=font("semi", 19), fill=INK)
    d.rounded_rectangle((sw - 58, 22, sw - 28, 37), radius=4, outline=INK, width=2)
    d.rectangle((sw - 56, 25, sw - 38, 34), fill=INK)

    mh = 34
    mw = int(mark.width * mh / mark.height)
    s.alpha_composite(mark.resize((mw, mh), Image.LANCZOS), (26, 60))
    d.text((26 + mw + 11, 64), "MANUVO", font=font("bold", 26), fill=CORAL)

    fy = 122
    d.rounded_rectangle((20, fy, sw - 20, fy + 56), radius=15, fill=(255, 255, 255))
    d.rounded_rectangle((20, fy, sw - 20, fy + 56), radius=15, outline=(223, 227, 234), width=2)
    cx, cy = 44, fy + 28
    d.ellipse((cx - 9, cy - 9, cx + 9, cy + 9), outline=MUTED, width=3)
    d.line((cx + 7, cy + 7, cx + 14, cy + 14), fill=MUTED, width=3)

    typed = seg(t, 0.60, 3.00)
    shown = QUERY[: int(round(len(QUERY) * typed))]
    fq = font("med", 22)
    d.text((66, fy + 17), shown if shown else "Di cosa hai bisogno?",
           font=fq, fill=INK if shown else MUTED)
    if 0.60 < t < 3.05 and int(t * 2.4) % 2 == 0:
        cw = d.textbbox((0, 0), shown, font=fq)[2]
        d.line((68 + cw, fy + 15, 68 + cw, fy + 42), fill=CORAL, width=2)

    results = seg(t, 3.60, 3.90)

    if results <= 0:
        d.text((24, fy + 82), "RICERCHE RECENTI", font=font("semi", 14), fill=MUTED)
        ry = fy + 110
        for item in RECENT:
            d.ellipse((26, ry + 6, 38, ry + 18), outline=MUTED, width=2)
            d.text((50, ry), item, font=font("reg", 18), fill=(150, 157, 170))
            ry += 38
    else:
        d.text((24, fy + 82), "3 professionisti vicino a te",
               font=font("semi", 19), fill=MUTED)
        ry = fy + 116
        for i, pro in enumerate(PROS):
            a = seg(t, 3.70 + i * 0.20, 4.20 + i * 0.20)
            if a <= 0:
                continue
            row = Image.new("RGBA", (sw - 40, 96), (0, 0, 0, 0))
            draw_pro(row, 0, 0, sw - 41, 95, pro, compact=True)
            s.alpha_composite(fade(row, a), (20, int(ry + 16 * (1 - a))))
            ry += 110

    kb_h = int(sh * 0.40)
    gone = seg(t, 3.10, 3.60)
    if gone < 1.0:
        kb = Image.new("RGBA", (sw, kb_h), (0, 0, 0, 0))
        draw_keyboard(kb, 0, 0, sw, kb_h)
        s.alpha_composite(kb, (0, int(sh - kb_h + kb_h * gone)))

    return s


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    mark = cut_logo(SRC_LOGO, "mark")
    bg = background()
    px, py, pw, ph = PHONE

    for i in range(NFRAMES):
        t = i / FPS
        frame = bg.copy()

        appear = seg(t, 0.05, 0.85)
        if appear > 0:
            body = Image.new("RGBA", (pw + 60, ph + 60), (0, 0, 0, 0))
            bd = ImageDraw.Draw(body)
            bd.rounded_rectangle((30, 30, 30 + pw, 30 + ph), radius=54, fill=(24, 24, 27, 255))
            bd.rounded_rectangle((30, 30, 30 + pw, 30 + ph), radius=54,
                                 outline=(74, 74, 82, 255), width=2)
            body.alpha_composite(phone_screen(t, mark), (43, 43))
            bd = ImageDraw.Draw(body)
            nw = int(pw * 0.33)
            bd.rounded_rectangle((30 + (pw - nw) // 2, 33, 30 + (pw + nw) // 2, 33 + 27),
                                 radius=13, fill=(24, 24, 27, 255))
            frame.alpha_composite(fade(body, appear),
                                  (px - 30, py - 30 + int(28 * (1 - appear))))

        top = (H - (len(PROS) * CARD_H + (len(PROS) - 1) * CARD_GAP)) // 2
        for i2, pro in enumerate(PROS):
            a = seg(t, 3.85 + i2 * 0.30, 4.55 + i2 * 0.30)
            if a <= 0:
                continue
            card = Image.new("RGBA", (CARDS_W, CARD_H), (0, 0, 0, 0))
            draw_pro(card, 0, 0, CARDS_W - 1, CARD_H - 1, pro)
            frame.alpha_composite(fade(card, a),
                                  (CARDS_X + int(64 * (1 - a)),
                                   top + i2 * (CARD_H + CARD_GAP)))

        frame.convert("RGB").save(os.path.join(OUT_DIR, "f%04d.png" % i))

    print("rendered %d frames" % NFRAMES)
    print("query %r" % QUERY)
    print("keyboard %s" % " / ".join("".join(r) for r in KEY_ROWS))
    for p in PROS:
        print("  %s | %s | %.1f | %s | %s" % (p[0], p[1], p[2], p[4], p[5]))


main()
