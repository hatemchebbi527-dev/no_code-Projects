#!/usr/bin/env python3
"""
Genere des visuels placeholder SVG cinematiques pour Keibido.
Aesthetique : washi + sumi + or kintsugi, motif enso (cercle zen au pinceau).
A remplacer par le vrai shooting photo du client.
"""
import os, math, random

OUT = os.path.dirname(os.path.abspath(__file__)) + "/img"
os.makedirs(OUT, exist_ok=True)

def enso_path(cx, cy, r, seed=0):
    """Cercle ouvert facon coup de pinceau (enso)."""
    random.seed(seed)
    pts = []
    start = math.radians(135)
    end = math.radians(135 + 300)  # cercle ouvert (300 deg)
    steps = 60
    for i in range(steps + 1):
        a = start + (end - start) * i / steps
        rr = r * (1 + random.uniform(-0.03, 0.03))
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d = f"M {pts[0][0]:.1f} {pts[0][1]:.1f} " + " ".join(
        f"L {x:.1f} {y:.1f}" for x, y in pts[1:])
    return d

def svg(name, w, h, c_light, c_mid, c_dark, accent, glow_op=0.5,
        vignette=0.55, enso_op=0.10, enso_color=None, kanji="", kanji_op=0.06,
        grain=0.06, dark=False):
    enso_color = enso_color or accent
    gx, gy = w * 0.30, h * 0.28
    er = min(w, h) * 0.30
    txt_fill = "#F5F1EA" if dark else "#1B1915"
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="bg" cx="30%" cy="26%" r="95%">
      <stop offset="0%" stop-color="{c_light}"/>
      <stop offset="52%" stop-color="{c_mid}"/>
      <stop offset="100%" stop-color="{c_dark}"/>
    </radialGradient>
    <radialGradient id="glow" cx="30%" cy="26%" r="45%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="{glow_op}"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="46%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="{vignette}"/>
    </radialGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="{grain}"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="2.2"/></filter>
  </defs>

  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect width="{w}" height="{h}" fill="url(#glow)"/>
'''
    if kanji:
        out += f'  <text x="{w*0.5:.0f}" y="{h*0.63:.0f}" font-family="Shippori Mincho, serif" font-size="{h*0.9:.0f}" fill="{txt_fill}" fill-opacity="{kanji_op}" text-anchor="middle" font-weight="600">{kanji}</text>\n'
    # enso brush circle
    out += f'  <g filter="url(#soft)" opacity="{enso_op}">\n'
    out += f'    <path d="{enso_path(gx, gy, er, seed=hash(name)%999)}" fill="none" stroke="{enso_color}" stroke-width="{er*0.09:.1f}" stroke-linecap="round"/>\n'
    out += f'    <path d="{enso_path(gx, gy, er, seed=(hash(name)+7)%999)}" fill="none" stroke="{enso_color}" stroke-width="{er*0.04:.1f}" stroke-linecap="round"/>\n'
    out += f'  </g>\n'
    # faint gold hairline
    out += f'  <line x1="{w*0.08:.0f}" y1="{h*0.86:.0f}" x2="{w*0.34:.0f}" y2="{h*0.86:.0f}" stroke="{accent}" stroke-opacity="0.35" stroke-width="1"/>\n'
    out += f'  <rect width="{w}" height="{h}" fill="url(#vig)"/>\n'
    out += f'  <rect width="{w}" height="{h}" filter="url(#grain)" opacity="0.5"/>\n'
    out += '</svg>\n'
    with open(f"{OUT}/{name}.svg", "w") as f:
        f.write(out)
    print("wrote", name)

# Hero : sombre, dramatique, or -> le texte blanc ressort
svg("hero", 2000, 1200,
    c_light="#4a4030", c_mid="#2a2418", c_dark="#14110b",
    accent="#C7A876", glow_op=0.55, vignette=0.62, enso_op=0.13,
    enso_color="#C7A876", kanji="美", kanji_op=0.05, grain=0.05, dark=True)

# Trattamenti (teintes par element)
svg("mizu",   1000, 700, "#dfe4e6", "#c3cccf", "#9aa6ab", "#7fa0ad", enso_color="#5f7f8c", kanji="水", kanji_op=0.08)  # eau
svg("hikari", 1000, 700, "#f3e6cf", "#e6cfa4", "#c9a86f", "#c7a24e", enso_color="#b98f3e", kanji="光", kanji_op=0.08)  # lumiere
svg("jikan",  1000, 700, "#e7d6bf", "#cbb08a", "#9d7b4f", "#b08d57", enso_color="#8a6d3e", kanji="時", kanji_op=0.08)  # temps
svg("sei",    1000, 700, "#dfe2d5", "#c1c7b3", "#98a184", "#8a9a72", enso_color="#6f7d55", kanji="清", kanji_op=0.08)  # purete

# Bandeau experience : sombre bois
svg("experience", 2000, 1100, "#3a3225", "#241d13", "#16110a", "#C7A876",
    glow_op=0.4, vignette=0.6, enso_op=0.10, enso_color="#C7A876", kanji="静", kanji_op=0.05, dark=True)

# Founder : washi chaud neutre
svg("founder", 1000, 1250, "#efe6d6", "#ddceb4", "#c2ad86", "#b08d57",
    glow_op=0.45, vignette=0.5, enso_op=0.09, enso_color="#8a6d3e", kanji="和", kanji_op=0.07)
