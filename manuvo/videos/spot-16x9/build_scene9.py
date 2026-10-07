"""Rebuild MANUVO Scene 9 (brand finale) with the real logo and exact Italian copy.

Renders 120 frames at 1920x1080 / 24fps = 5.0s, matching the other Kling clips.
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
BG_CENTER = (255, 255, 255)
BG_EDGE = (238, 235, 232)

TAGLINE = "Connetti - Trova - Risolvi"
CTA = "Scopri Manuvo"

FONT_TAGLINE = "/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf"
FONT_CTA = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"

SRC_LOGO = sys.argv[1]
OUT_DIR = sys.argv[2]


def cut_logo(path):
    """Crop the logo to its ink and make the surrounding white transparent.

    The inner white of the wrench cut-out must survive, so the background is
    found by flooding inward from the border rather than by keying every white
    pixel.
    """
    img = Image.open(path).convert("RGBA")
    a = np.array(img)
    rgb = a[:, :, :3].astype(np.int16)

    ink = ~((rgb > 245).all(axis=2))
    ys, xs = np.where(ink)
    pad = 12
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, a.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, a.shape[1])
    a = a[y0:y1, x0:x1]
    rgb = a[:, :, :3].astype(np.int16)

    white = (rgb > 242).all(axis=2)
    outer = np.zeros_like(white)
    outer[0, :] = white[0, :]
    outer[-1, :] = white[-1, :]
    outer[:, 0] = white[:, 0]
    outer[:, -1] = white[:, -1]

    while True:
        grown = outer.copy()
        grown[1:, :] |= outer[:-1, :]
        grown[:-1, :] |= outer[1:, :]
        grown[:, 1:] |= outer[:, :-1]
        grown[:, :-1] |= outer[:, 1:]
        grown &= white
        if np.array_equal(grown, outer):
            break
        outer = grown

    # Feather the cut so antialiased edge pixels do not show a white fringe.
    alpha = np.where(outer, 0, 255).astype(np.float32)
    edge = outer & ~np.roll(outer, 1, 0) | outer & ~np.roll(outer, -1, 0)
    soft = (255 - rgb.min(axis=2)).clip(0, 255).astype(np.float32)
    alpha = np.where(edge & (soft > 0), np.maximum(alpha, soft), alpha)

    a[:, :, 3] = alpha.astype(np.uint8)
    return Image.fromarray(a, "RGBA")


def gradient_bg():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    cx, cy = W / 2.0, H * 0.42
    d = np.sqrt(((xx - cx) / (W * 0.62)) ** 2 + ((yy - cy) / (H * 0.78)) ** 2)
    t = np.clip(d, 0.0, 1.0)[:, :, None]
    c0 = np.array(BG_CENTER, np.float32)
    c1 = np.array(BG_EDGE, np.float32)
    return Image.fromarray((c0 + (c1 - c0) * t).astype(np.uint8), "RGB")


def ease_out(x):
    x = min(max(x, 0.0), 1.0)
    return 1.0 - (1.0 - x) ** 3


def seg(t, start, end):
    if end <= start:
        return 1.0
    return ease_out((t - start) / (end - start))


def paste_alpha(base, layer, box, opacity):
    if opacity <= 0.001:
        return
    if opacity < 1.0:
        layer = layer.copy()
        a = layer.getchannel("A").point(lambda v: int(v * opacity))
        layer.putalpha(a)
    base.alpha_composite(layer, box)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    logo = cut_logo(SRC_LOGO)
    bg = gradient_bg().convert("RGBA")

    f_tag = ImageFont.truetype(FONT_TAGLINE, 58)
    f_cta = ImageFont.truetype(FONT_CTA, 34)

    probe = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    tag_box = probe.textbbox((0, 0), TAGLINE, font=f_tag)
    cta_box = probe.textbbox((0, 0), CTA, font=f_cta)
    tag_w, tag_h = tag_box[2] - tag_box[0], tag_box[3] - tag_box[1]
    cta_w, cta_h = cta_box[2] - cta_box[0], cta_box[3] - cta_box[1]

    pad_x, pad_y = 44, 26
    pill_w, pill_h = cta_w + pad_x * 2, cta_h + pad_y * 2

    logo_w = 380
    logo_h = int(round(logo_w * logo.height / logo.width))
    logo_base = logo.resize((logo_w, logo_h), Image.LANCZOS)

    gap_logo_tag, gap_tag_cta = 92, 58
    block_h = logo_h + gap_logo_tag + tag_h + gap_tag_cta + pill_h
    top = (H - block_h) // 2 - 24

    logo_y = top
    tag_y = logo_y + logo_h + gap_logo_tag
    pill_y = tag_y + tag_h + gap_tag_cta

    for i in range(NFRAMES):
        t = i / FPS
        frame = bg.copy()
        drift = int(round(-8 * ease_out(t / DURATION)))

        p = seg(t, 0.20, 1.50)
        if p > 0:
            s = 0.90 + 0.10 * p
            lw, lh = int(logo_w * s), int(logo_h * s)
            paste_alpha(
                frame,
                logo_base.resize((lw, lh), Image.LANCZOS),
                ((W - lw) // 2, logo_y + (logo_h - lh) // 2 + drift),
                p,
            )

        p = seg(t, 1.80, 2.80)
        if p > 0:
            layer = Image.new("RGBA", (W, tag_h + 40), (0, 0, 0, 0))
            ImageDraw.Draw(layer).text(
                ((W - tag_w) // 2 - tag_box[0], -tag_box[1] + 20),
                TAGLINE,
                font=f_tag,
                fill=CORAL + (255,),
            )
            rise = int(round(22 * (1 - p)))
            paste_alpha(frame, layer, (0, tag_y - 20 + rise + drift), p)

        p = seg(t, 3.10, 4.00)
        if p > 0:
            layer = Image.new("RGBA", (pill_w, pill_h), (0, 0, 0, 0))
            d = ImageDraw.Draw(layer)
            d.rounded_rectangle(
                (0, 0, pill_w - 1, pill_h - 1),
                radius=pill_h // 2,
                fill=CORAL + (255,),
            )
            d.text(
                (pad_x - cta_box[0], pad_y - cta_box[1]),
                CTA,
                font=f_cta,
                fill=(255, 255, 255, 255),
            )
            s = 0.94 + 0.06 * p
            pw, ph = int(pill_w * s), int(pill_h * s)
            paste_alpha(
                frame,
                layer.resize((pw, ph), Image.LANCZOS),
                ((W - pw) // 2, pill_y + (pill_h - ph) // 2 + drift),
                p,
            )

        frame.convert("RGB").save(os.path.join(OUT_DIR, "f%04d.png" % i))

    print("rendered %d frames" % NFRAMES)
    print("logo ink %dx%d -> placed %dx%d" % (logo.width, logo.height, logo_w, logo_h))
    print("tagline %r  w=%d" % (TAGLINE, tag_w))
    print("cta %r  pill=%dx%d" % (CTA, pill_w, pill_h))


main()
