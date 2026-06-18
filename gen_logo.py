#!/usr/bin/env python3
import math
from PIL import Image, ImageDraw, ImageFont

NAVY = (15, 42, 74, 255)
TEAL = (22, 184, 166, 255)
SLATE = (45, 55, 72, 255)
MONT = "/tmp/fonts/Montserrat.ttf"

NAME = "Automa"
SUFFIX = "IA"
TAGLINE = "AUTOMAZIONE & IA"


def font(path, size, variation=None):
    f = ImageFont.truetype(path, size)
    if variation:
        try:
            f.set_variation_by_name(variation)
        except Exception:
            pass
    return f


def draw_mark(draw, cx, cy, R, ring_color=TEAL, hands_color=NAVY):
    """Circular automation arrow + clock hands = automation + time."""
    bbox = [cx - R, cy - R, cx + R, cy + R]
    width = max(6, R // 6)
    # arc with a gap at the top-right
    end_deg = 318
    draw.arc(bbox, start=22, end=end_deg, fill=ring_color, width=width)
    # arrowhead cleanly attached to the arc end, pointing along the motion
    # arrowhead that hugs the circle: base straddles the ring centerline
    # equidistantly (inner/outer wings), tip continues along the circle.
    hw = width * 1.35           # half base width: equidistant inside/outside the ring line
    L = width * 2.3             # tip extension (as arc length along the circle)
    a = math.radians(end_deg)
    dtheta = L / R              # angular advance so the tip follows the circle
    at = a + dtheta

    def on_circle(angle, radius):
        return (cx + radius * math.cos(angle), cy + radius * math.sin(angle))

    inner = on_circle(a, R - hw)   # wing inside the ring
    outer = on_circle(a, R + hw)   # wing outside the ring
    tip = on_circle(at, R)         # tip on the ring centerline, further along
    draw.polygon([tip, inner, outer], fill=ring_color)
    # clock hands
    hw = max(4, R // 9)
    draw.line([(cx, cy), (cx, cy - R * 0.55)], fill=hands_color, width=hw)        # minute (up)
    draw.line([(cx, cy), (cx + R * 0.42, cy + R * 0.18)], fill=hands_color, width=hw)  # hour
    # center dot
    d = R // 7
    draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=hands_color)


def build(filename, bg, name_color, tag_color, mark_ring=TEAL, mark_hands=NAVY):
    W, Hh = 1600, 460
    img = Image.new("RGBA", (W, Hh), bg)
    d = ImageDraw.Draw(img)
    # mark
    cx, cy, R = 230, 230, 150
    draw_mark(d, cx, cy, R, ring_color=mark_ring, hands_color=mark_hands)
    # wordmark
    f_name = font(MONT, 132, "Bold")
    f_tag = font(MONT, 38, "SemiBold")
    tx = 440
    d.text((tx, 120), NAME, font=f_name, fill=name_color)
    w_name = d.textlength(NAME, font=f_name)
    d.text((tx + w_name, 120), SUFFIX, font=f_name, fill=TEAL)
    # tagline with letter spacing
    yy = 270
    xx = tx + 4
    for ch in TAGLINE:
        d.text((xx, yy), ch, font=f_tag, fill=tag_color)
        xx += d.textlength(ch, font=f_tag) + 6
    img.save(filename, "PNG")
    print("saved", filename)


# 1) main logo on transparent (for light backgrounds)
build("agence-ia/marque/logo-automaia.png", (0, 0, 0, 0),
      name_color=NAVY, tag_color=TEAL, mark_ring=TEAL, mark_hands=NAVY)

# 2) version on navy (for dark backgrounds / preview)
build("agence-ia/marque/logo-automaia-navy.png", NAVY,
      name_color=(255, 255, 255, 255), tag_color=TEAL, mark_ring=TEAL,
      mark_hands=(255, 255, 255, 255))

# 3) icon only (square, transparent) - for avatars/favicon
icon = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
di = ImageDraw.Draw(icon)
draw_mark(di, 200, 200, 150, ring_color=TEAL, hands_color=NAVY)
icon.save("agence-ia/marque/logo-automaia-icon.png", "PNG")
print("saved icon")
