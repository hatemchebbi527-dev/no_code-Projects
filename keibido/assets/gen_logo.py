#!/usr/bin/env python3
"""
Recreation vectorielle du logo Keibido (interpretation propre, a remplacer par
le fichier officiel du client pour une fidelite au pixel).
Genere : mandala.svg (anneau ornemental), sprout.svg (pousse 3 feuilles),
emblem.svg (mandala + pousse), favicon.svg (pousse sur carre creme).
Palette : or foil sur transparent.
"""
import os, math

OUT = os.path.dirname(os.path.abspath(__file__)) + "/img"
os.makedirs(OUT, exist_ok=True)

GOLD_DEFS = '''
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E9D08C"/>
      <stop offset="38%" stop-color="#C9A85A"/>
      <stop offset="70%" stop-color="#B08D3E"/>
      <stop offset="100%" stop-color="#8A6D2E"/>
    </linearGradient>
    <linearGradient id="goldv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EBD595"/>
      <stop offset="50%" stop-color="#C4A150"/>
      <stop offset="100%" stop-color="#9A7A34"/>
    </linearGradient>
  </defs>
'''

def petal(cx, cy, r0, r1, half_w):
    """Petale pointant vers le haut, base a r0, pointe a r1 (depuis le centre)."""
    bx, by = cx, cy - r0
    tx, ty = cx, cy - r1
    w = half_w
    outer = (f"M{bx:.1f},{by:.1f} "
             f"C{cx-w:.1f},{cy-(r0+ (r1-r0)*0.35):.1f} {cx-w:.1f},{cy-(r0+(r1-r0)*0.75):.1f} {tx:.1f},{ty:.1f} "
             f"C{cx+w:.1f},{cy-(r0+(r1-r0)*0.75):.1f} {cx+w:.1f},{cy-(r0+(r1-r0)*0.35):.1f} {bx:.1f},{by:.1f} Z")
    w2 = half_w*0.55
    r0b, r1b = r0+ (r1-r0)*0.10, r1-(r1-r0)*0.14
    inner = (f"M{cx:.1f},{cy-r0b:.1f} "
             f"C{cx-w2:.1f},{cy-(r0b+(r1b-r0b)*0.35):.1f} {cx-w2:.1f},{cy-(r0b+(r1b-r0b)*0.75):.1f} {cx:.1f},{cy-r1b:.1f} "
             f"C{cx+w2:.1f},{cy-(r0b+(r1b-r0b)*0.75):.1f} {cx+w2:.1f},{cy-(r0b+(r1b-r0b)*0.35):.1f} {cx:.1f},{cy-r0b:.1f} Z")
    drop = f'<circle cx="{cx:.1f}" cy="{cy-(r0+(r1-r0)*0.42):.1f}" r="{half_w*0.16:.1f}" fill="url(#gold)"/>'
    return outer, inner, drop

def mandala_group(cx, cy, scale=1.0, sw=2.2):
    r_in = 168*scale
    parts = [f'<g fill="none" stroke="url(#gold)" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round">']
    # double anneau interieur
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r_in:.1f}"/>')
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r_in-7*scale:.1f}" stroke-width="{sw*0.6:.1f}"/>')
    # anneau exterieur fin
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="{250*scale:.1f}" stroke-width="{sw*0.6:.1f}"/>')
    # petales (24)
    N=24
    for k in range(N):
        a=360/N*k
        o,i,d = petal(cx, cy, r_in+4*scale, 246*scale, 20*scale)
        parts.append(f'<g transform="rotate({a} {cx} {cy})">'
                     f'<path d="{o}"/><path d="{i}" stroke-width="{sw*0.6:.1f}"/>{d}</g>')
    # petits bourgeons a la pointe (entre = decale de 7.5deg) petits arcs
    N2=24
    for k in range(N2):
        a=360/N2*k + 360/N2/2
        # mini lotus bud
        bx,by=cx, cy-256*scale
        bud=(f'<path d="M{bx:.1f},{by+8*scale:.1f} C{bx-6*scale:.1f},{by:.1f} {bx-6*scale:.1f},{by-8*scale:.1f} {bx:.1f},{by-11*scale:.1f} '
             f'C{bx+6*scale:.1f},{by-8*scale:.1f} {bx+6*scale:.1f},{by:.1f} {bx:.1f},{by+8*scale:.1f} Z" stroke-width="{sw*0.5:.1f}"/>')
        parts.append(f'<g transform="rotate({a} {cx} {cy})">{bud}</g>')
    # anneau de points interieur
    Nd=60
    for k in range(Nd):
        a=math.radians(360/Nd*k)
        rr=(r_in-16*scale)
        x=cx+rr*math.cos(a); y=cy+rr*math.sin(a)
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{1.5*scale:.1f}" fill="url(#gold)" stroke="none"/>')
    parts.append('</g>')
    return "\n".join(parts)

def leaf(cx, base_y, height, width, angle):
    """Feuille pointue avec nervure, tournee de 'angle' deg autour de (cx,base_y)."""
    tipy=base_y-height
    midy=base_y-height*0.5
    p=(f'<path d="M{cx:.1f},{base_y:.1f} '
       f'C{cx-width:.1f},{midy:.1f} {cx-width*0.5:.1f},{tipy+height*0.12:.1f} {cx:.1f},{tipy:.1f} '
       f'C{cx+width*0.5:.1f},{tipy+height*0.12:.1f} {cx+width:.1f},{midy:.1f} {cx:.1f},{base_y:.1f} Z" '
       f'fill="none" stroke="url(#goldv)" stroke-width="2"/>')
    vein=f'<line x1="{cx:.1f}" y1="{base_y-2:.1f}" x2="{cx:.1f}" y2="{tipy+6:.1f}" stroke="url(#goldv)" stroke-width="1.4"/>'
    ribs=""
    for t in (0.35,0.55,0.72):
        yy=base_y-height*t
        dx=width*(1-t)*0.5
        ribs+=(f'<line x1="{cx:.1f}" y1="{yy:.1f}" x2="{cx-dx:.1f}" y2="{yy-height*0.06:.1f}" stroke="url(#goldv)" stroke-width="1"/>'
               f'<line x1="{cx:.1f}" y1="{yy:.1f}" x2="{cx+dx:.1f}" y2="{yy-height*0.06:.1f}" stroke="url(#goldv)" stroke-width="1"/>')
    return f'<g transform="rotate({angle} {cx} {base_y})">{p}{vein}{ribs}</g>'

def sprout_group(cx, base_y, s=1.0):
    g=['<g>']
    g.append(leaf(cx, base_y, 96*s, 30*s, 0))          # centrale
    g.append(leaf(cx, base_y, 74*s, 26*s, -34))        # gauche
    g.append(leaf(cx, base_y, 74*s, 26*s, 34))         # droite
    g.append(f'<circle cx="{cx}" cy="{base_y+4*s:.1f}" r="{3*s:.1f}" fill="url(#gold)"/>')
    g.append('</g>')
    return "\n".join(g)

def write(name, w, h, inner, bg=None, radius=0):
    b = f'<rect width="{w}" height="{h}" rx="{radius}" fill="{bg}"/>' if bg else ''
    svg=(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
         f'{GOLD_DEFS}{b}{inner}</svg>')
    open(f"{OUT}/{name}.svg","w").write(svg)
    print("wrote", name)

# mandala seul (anneau) 600x600
write("mandala", 600, 600, mandala_group(300,300,1.0))

# emblem : mandala + pousse au centre
emb = mandala_group(300,300,1.0) + sprout_group(300, 355, 1.0)
write("emblem", 600, 600, emb)

# sprout seul 240x260
write("sprout", 240, 260, sprout_group(120, 200, 1.1))

# favicon : pousse or sur carre creme arrondi 128
fav = f'<rect width="128" height="128" rx="26" fill="#F6F1E3"/>' + sprout_group(64, 96, 0.62)
write("favicon", 128, 128, fav)
