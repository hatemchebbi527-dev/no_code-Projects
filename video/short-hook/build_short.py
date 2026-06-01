#!/usr/bin/env python3
"""
Moteur de montage du short cinematique "INVISIBLE BUSINESSES DIE FIRST".
Segment monte : HOOK [00:00-00:10].

Principe : 4 images fixes -> 4 plans animes (Ken Burns zoom/pan) + vignette
+ textes a l'ecran synchronises, assembles avec des fondus enchaines (xfade).
Sortie : video verticale 1080x1920, 30 fps, 10 s, prete pour Reels/TikTok/Shorts.

Usage :
    python3 build_short.py            # rendu normal (depuis assets/)
    python3 build_short.py --demo     # genere des placeholders et teste le pipeline

Aucune dependance hors ffmpeg + Python 3.
"""

import os
import sys
import subprocess
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, "assets")
OUT = os.path.join(ROOT, "out")
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

W, H = 1080, 1920          # format vertical 9:16
FPS = 30
CLIP = 2.875               # duree de chaque plan (s)
XFADE = 0.5                # duree des fondus (s)
FRAMES = round(CLIP * FPS) # frames par plan

# ---------------------------------------------------------------------------
# Definition des 4 plans du hook.
#  img       : fichier dans assets/
#  zoom      : "in" (push avant) ou "out" (recul)
#  pan       : "center" | "right" | "left" | "up"
#  captions  : liste de blocs de texte a incruster
#               text  : chemin du .txt ecrit a la volee
#               y     : position verticale (fraction de H)
#               size  : taille de police
#               color : couleur ffmpeg
#               box   : bandeau noir derriere le texte (lisibilite)
# ---------------------------------------------------------------------------
SHOTS = [
    {   # PLAN 1 - le desespoir : 0 leads, factures, payroll
        "img": "01.png", "zoom": "in", "pan": "center",
        "captions": [
            {"text": "Three months ago…\nmy business stopped\nexisting online.",
             "y": 0.72, "size": 54, "color": "white", "box": True},
        ],
    },
    {   # PLAN 2 - le chaos : appels manques + punchline
        "img": "02.png", "zoom": "in", "pan": "right",
        "captions": [
            {"text": "INVISIBLE BUSINESSES\nDIE FIRST.",
             "y": 0.40, "size": 64, "color": "#FF3B30", "box": True, "fadein": 0.35},
            {"text": "Better competitors? No.\nThey were just louder.",
             "y": 0.76, "size": 50, "color": "white", "box": True},
        ],
    },
    {   # PLAN 3 - l'enjeu : payroll due, compte a decouvert
        "img": "04.png", "zoom": "in", "pan": "up",
        "captions": [
            {"text": "I had 30 days\nto fix my visibility…\nbefore payroll hit.",
             "y": 0.72, "size": 52, "color": "white", "box": True},
        ],
    },
    {   # PLAN 4 - l'objectif visible : la solution IA
        "img": "03.png", "zoom": "out", "pan": "center",
        "captions": [
            {"text": "Get leads fast —\nwithout burning more money.",
             "y": 0.73, "size": 50, "color": "#34E0A1", "box": True, "fadein": 0.3},
        ],
    },
]


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write(p.stderr[-3000:])
        raise SystemExit(f"\nffmpeg a echoue (code {p.returncode}).")
    return p


def zoompan_expr(zoom, pan):
    """Construit l'expression zoompan (z + x/y) pour un plan."""
    d = FRAMES
    if zoom == "in":
        z = f"min(zoom+{0.7/d:.6f},1.18)"
    else:  # out : part zoome, recule doucement
        z = f"if(eq(on,0),1.18,max(zoom-{0.7/d:.6f},1.0))"
    cx = "iw/2-(iw/zoom/2)"
    cy = "ih/2-(ih/zoom/2)"
    if pan == "right":
        x = f"(iw-iw/zoom)*(on/{d-1})"; y = cy
    elif pan == "left":
        x = f"(iw-iw/zoom)*(1-on/{d-1})"; y = cy
    elif pan == "up":
        x = cx; y = f"(ih-ih/zoom)*(1-on/{d-1})"
    else:
        x = cx; y = cy
    return (f"zoompan=z='{z}':d={d}:x='{x}':y='{y}':"
            f"s={W}x{H}:fps={FPS}")


def drawtext(cap, tmpdir, idx):
    """Genere le filtre drawtext pour un bloc de texte (via textfile)."""
    path = os.path.join(tmpdir, f"cap_{idx}.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(cap["text"])
    parts = [
        f"fontfile={FONT_BOLD}",
        f"textfile={path}",
        f"fontsize={cap['size']}",
        f"fontcolor={cap['color']}",
        "borderw=5", "bordercolor=black@0.9",
        "line_spacing=12",
        "x=(w-text_w)/2",
        f"y=h*{cap['y']}-text_h/2",
    ]
    if cap.get("box"):
        parts += ["box=1", "boxcolor=black@0.45", "boxborderw=34"]
    if cap.get("fadein"):
        t = cap["fadein"]
        parts.append(f"alpha='if(lt(t,{t}),t/{t},1)'")
    return "drawtext=" + ":".join(parts)


def render_clip(shot, tmpdir, out_path):
    img = os.path.join(ASSETS, shot["img"])
    if not os.path.exists(img):
        raise SystemExit(f"Image manquante : {img}")
    chain = [
        # pre-agrandissement -> zoompan plus fluide, puis recadrage 9:16
        f"scale={int(W*1.5)}:{int(H*1.5)}:force_original_aspect_ratio=increase",
        f"crop={int(W*1.5)}:{int(H*1.5)}",
        zoompan_expr(shot["zoom"], shot["pan"]),
        "vignette=PI/5",
        "eq=contrast=1.06:saturation=1.08",
    ]
    for i, cap in enumerate(shot["captions"]):
        chain.append(drawtext(cap, tmpdir, f"{shot['img']}_{i}"))
    chain.append("format=yuv420p")
    vf = ",".join(chain)
    # -frames:v borne la sortie a exactement FRAMES (sinon zoompan emet d
    # frames PAR image d'entree et explose le nombre de frames).
    run(["ffmpeg", "-y", "-loop", "1", "-i", img,
         "-vf", vf, "-frames:v", str(FRAMES), "-r", str(FPS),
         "-an", out_path])


def assemble(clips, out_path):
    """Enchaine les plans avec des fondus xfade."""
    inputs = []
    for c in clips:
        inputs += ["-i", c]
    step = CLIP - XFADE
    fc = ""
    prev = "0:v"
    for k in range(1, len(clips)):
        off = step * k
        lbl = f"x{k}"
        fc += (f"[{prev}][{k}:v]xfade=transition=fade:"
               f"duration={XFADE}:offset={off:.3f}[{lbl}];")
        prev = lbl
    fc = fc.rstrip(";")
    run(["ffmpeg", "-y", *inputs, "-filter_complex", fc,
         "-map", f"[{prev}]", "-r", str(FPS),
         "-c:v", "libx264", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", out_path])


def make_demo_assets(tmpdir):
    """Cree 4 placeholders distincts pour valider le pipeline sans vraies images."""
    cols = ["0x10141f", "0x1a0f14", "0x1f1405", "0x041a14"]
    labels = ["PLAN 1 / 0 LEADS", "PLAN 2 / MISSED CALLS",
              "PLAN 3 / PAYROLL DUE", "PLAN 4 / AI SOLUTION"]
    os.makedirs(ASSETS, exist_ok=True)
    for i, (c, lab) in enumerate(zip(cols, labels), 1):
        p = os.path.join(ASSETS, f"0{i}.png")
        run(["ffmpeg", "-y", "-f", "lavfi", "-i",
             f"color=c={c}:s={W}x{H}:d=1",
             "-vf", (f"drawtext=fontfile={FONT_BOLD}:text='{lab}':"
                     f"fontcolor=white@0.25:fontsize=70:"
                     f"x=(w-text_w)/2:y=(h-text_h)/2"),
             "-frames:v", "1", p])


def main():
    demo = "--demo" in sys.argv
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        if demo:
            make_demo_assets(tmp)
        clips = []
        for n, shot in enumerate(SHOTS, 1):
            cp = os.path.join(tmp, f"clip{n}.mp4")
            print(f"  -> rendu plan {n}/{len(SHOTS)} ({shot['img']})")
            render_clip(shot, tmp, cp)
            clips.append(cp)
        out_file = os.path.join(OUT, "short_hook.mp4")
        print("  -> assemblage (fondus)")
        assemble(clips, out_file)
        dur = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", out_file],
            capture_output=True, text=True).stdout.strip()
        print(f"\nOK -> {out_file}  ({dur}s)")


if __name__ == "__main__":
    main()
