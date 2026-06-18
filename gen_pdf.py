#!/usr/bin/env python3
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, Preformatted, HRFlowable, ListFlowable, ListItem
)

SRC = "context/import/compagnon-30-jours-claude-code.md"
OUT = "context/import/compagnon-30-jours-claude-code.pdf"

NAVY = colors.HexColor("#0F2A4A")
TEAL = colors.HexColor("#16B8A6")
SLATE = colors.HexColor("#2D3748")
LIGHT = colors.HexColor("#F4F6F8")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle("H1x", parent=styles["Heading1"], textColor=NAVY, fontSize=20, spaceAfter=10, spaceBefore=6))
styles.add(ParagraphStyle("H2x", parent=styles["Heading2"], textColor=NAVY, fontSize=15, spaceAfter=6, spaceBefore=12))
styles.add(ParagraphStyle("H3x", parent=styles["Heading3"], textColor=TEAL, fontSize=12.5, spaceAfter=4, spaceBefore=8))
styles.add(ParagraphStyle("Body", parent=styles["BodyText"], textColor=SLATE, fontSize=10, leading=14, spaceAfter=4, alignment=TA_LEFT))
styles.add(ParagraphStyle("BulletX", parent=styles["Body"], leftIndent=14, bulletIndent=4, spaceAfter=2))
styles.add(ParagraphStyle("Quote", parent=styles["Body"], leftIndent=12, textColor=NAVY, fontName="Helvetica-Oblique", backColor=LIGHT, borderPadding=6, spaceAfter=6, spaceBefore=2))
styles.add(ParagraphStyle("CodeX", parent=styles["Code"], fontSize=8.2, leading=10.5, textColor=SLATE, backColor=LIGHT, borderPadding=6, leftIndent=4))
styles.add(ParagraphStyle("CellH", parent=styles["Body"], textColor=colors.white, fontName="Helvetica-Bold", fontSize=9))
styles.add(ParagraphStyle("Cell", parent=styles["Body"], fontSize=9, leading=12))


def inline(t):
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`(.+?)`", r'<font face="Courier" size=8.5>\1</font>', t)
    return t


def parse(md):
    flow = []
    lines = md.split("\n")
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]

        # code fence
        if line.strip().startswith("```"):
            buf = []
            i += 1
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            flow.append(Preformatted("\n".join(buf), styles["CodeX"]))
            flow.append(Spacer(1, 6))
            continue

        # table
        if line.strip().startswith("|") and i + 1 < n and re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i + 1]):
            rows = []
            header = [c.strip() for c in line.strip().strip("|").split("|")]
            rows.append(header)
            i += 2
            while i < n and lines[i].strip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            data = []
            for r, row in enumerate(rows):
                st = styles["CellH"] if r == 0 else styles["Cell"]
                data.append([Paragraph(inline(c), st) for c in row])
            tbl = Table(data, repeatRows=1, hAlign="LEFT")
            tbl.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT]),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD5E0")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]))
            flow.append(tbl)
            flow.append(Spacer(1, 8))
            continue

        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if stripped == "---":
            flow.append(Spacer(1, 4))
            flow.append(HRFlowable(width="100%", thickness=0.6, color=TEAL))
            flow.append(Spacer(1, 4))
        elif stripped.startswith("# "):
            flow.append(Paragraph(inline(stripped[2:]), styles["H1x"]))
        elif stripped.startswith("## "):
            flow.append(Paragraph(inline(stripped[3:]), styles["H2x"]))
        elif stripped.startswith("### "):
            flow.append(Paragraph(inline(stripped[4:]), styles["H3x"]))
        elif stripped.startswith(">"):
            flow.append(Paragraph(inline(stripped.lstrip("> ").rstrip()), styles["Quote"]))
        elif stripped.startswith("* ") or stripped.startswith("- "):
            flow.append(Paragraph(inline(stripped[2:]), styles["BulletX"], bulletText="•"))
        elif re.match(r"^\d+\.\s", stripped):
            num, rest = stripped.split(".", 1)
            flow.append(Paragraph(inline(rest.strip()), styles["BulletX"], bulletText=num + "."))
        else:
            flow.append(Paragraph(inline(stripped), styles["Body"]))
        i += 1
    return flow


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#94A3B8"))
    canvas.drawString(2 * cm, 1.2 * cm, "Compagnon 30 jours Claude Code")
    canvas.drawRightString(A4[0] - 2 * cm, 1.2 * cm, "Page %d" % doc.page)
    canvas.restoreState()


with open(SRC, encoding="utf-8") as f:
    md = f.read()

doc = BaseDocTemplate(OUT, pagesize=A4,
                      leftMargin=2 * cm, rightMargin=2 * cm,
                      topMargin=1.8 * cm, bottomMargin=1.8 * cm)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=footer)])
doc.build(parse(md))
print("PDF generated:", OUT)
