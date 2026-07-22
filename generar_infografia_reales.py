from pathlib import Path
from tempfile import NamedTemporaryFile

from pypdf import PdfReader, PdfWriter, Transformation
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


BASE = Path(__file__).resolve().parent
SOURCE = BASE / "documentos" / "1ª BACHILLERATO MATES I" / "1-Nº Reales teoria.pdf"
OUT = BASE / "Números Reales - Infografía.pdf"

pdfmetrics.registerFont(TTFont("Calibri", r"C:\Windows\Fonts\calibri.ttf"))
pdfmetrics.registerFont(TTFont("Calibri-Bold", r"C:\Windows\Fonts\calibrib.ttf"))

W, H = A4

SECTIONS = [
    ("R", "Números reales · racionales · recta real · desigualdades", colors.HexColor("#168B8F")),
    ("| |", "Valor absoluto · aproximaciones · intervalos · entornos", colors.HexColor("#7257C8")),
    ("√", "Potencias · raíces · operaciones · racionalización", colors.HexColor("#EF6B24")),
    ("log", "Logaritmos · propiedades · forma algebraica y logarítmica", colors.HexColor("#2572C7")),
]

TABLE_TINTS = {
    # Coordinates are in the original PDF page space. Each tuple is:
    # (whole_table_rect, title_rect, color). The original page is kept intact;
    # this is only a translucent color wash over the existing tables.
    1: [
        ((32.3, 645, 300.4, 107), None, colors.HexColor("#168B8F")),
        ((32.3, 267.5, 538.0, 218), (32.3, 472.5, 538.0, 13), colors.HexColor("#28A06A")),
        ((32.3, 102.5, 535.0, 165), (32.3, 247, 535.0, 13), colors.HexColor("#2572C7")),
    ],
    2: [
        ((32.3, 726, 534.4, 56), (32.3, 769, 534.4, 13), colors.HexColor("#7257C8")),
        ((32.3, 600, 534.4, 126), (32.3, 712, 534.4, 14), colors.HexColor("#7257C8")),
        ((32.3, 492, 534.4, 108), (32.3, 586, 534.4, 14), colors.HexColor("#E3B700")),
        ((32.3, 264.5, 267.7, 220.5), (32.3, 472.5, 267.7, 12), colors.HexColor("#28A06A")),
        ((300.0, 264.5, 266.7, 220.5), (300.0, 472.5, 266.7, 12), colors.HexColor("#28A06A")),
        ((32.3, 44, 534.4, 213), (32.3, 244, 534.4, 13), colors.HexColor("#168B8F")),
    ],
    3: [
        ((35.7, 541.5, 540.3, 140.5), (35.7, 666.5, 540.3, 14), colors.HexColor("#2572C7")),
        ((35.7, 517.0, 540.3, 24.5), None, colors.HexColor("#7257C8")),
        ((98.5, 450, 426.5, 63), (98.5, 500, 426.5, 13), colors.HexColor("#7257C8")),
        ((35.7, 249.5, 531.0, 185.5), (35.7, 421, 531.0, 14), colors.HexColor("#7257C8")),
        ((35.7, 58.5, 531.0, 163.5), (35.7, 209.0, 531.0, 12.5), colors.HexColor("#EF6B24")),
    ],
    4: [
        ((36.0, 609, 530.7, 156.5), (36.0, 752, 530.7, 13.5), colors.HexColor("#2572C7")),
        ((36.0, 333, 530.7, 276), (36.0, 594.5, 530.7, 14.5), colors.HexColor("#E3B700")),
        ((36.0, 217.5, 530.7, 115.5), (36.0, 318.5, 530.7, 14.5), colors.HexColor("#2572C7")),
    ],
}

WHITE_GAPS = {
    1: [
        (32.3, 260.6, 535.0, 5.8),
    ],
    2: [
        (32.3, 627.3, 534.4, 5.5),
        (32.3, 257.4, 534.4, 5.8),
    ],
    3: [
        (35.7, 567.2, 540.3, 6.2),
    ],
}


def make_background(page_no, label, title, accent):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)

    dark = colors.HexColor("#1C2229")
    paper = colors.HexColor("#F8FBFD")
    muted = colors.HexColor("#B8C6D5")

    c.setFillColor(dark)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Poster-style header.
    c.setFillColor(accent)
    c.roundRect(0.55 * cm, H - 1.45 * cm, W - 1.1 * cm, 0.95 * cm, 8, fill=1, stroke=0)
    c.setFillColor(accent)
    c.circle(1.22 * cm, H - 0.98 * cm, 0.62 * cm, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("Calibri-Bold", 18 if len(label) <= 2 else 13)
    c.drawCentredString(1.22 * cm, H - 1.17 * cm, label)
    c.setFont("Calibri-Bold", 12.5)
    c.drawString(2.05 * cm, H - 1.16 * cm, title)
    c.setFont("Calibri", 8.5)
    c.setFillColor(muted)
    c.drawRightString(W - 0.65 * cm, H - 0.33 * cm, f"Números Reales - Infografía · Parte {page_no}")

    # White sheet frame for the untouched original PDF page.
    c.setFillColor(colors.Color(0, 0, 0, alpha=0.16))
    c.roundRect(0.54 * cm, 0.42 * cm, W - 1.08 * cm, H - 1.95 * cm, 8, fill=1, stroke=0)
    c.setFillColor(paper)
    c.setStrokeColor(accent)
    c.setLineWidth(2.2)
    c.roundRect(0.45 * cm, 0.52 * cm, W - 0.9 * cm, H - 2.05 * cm, 8, fill=1, stroke=1)

    # Small color rhythm marks, outside the document content.
    c.setFillColor(colors.Color(accent.red, accent.green, accent.blue, alpha=0.22))
    c.circle(W - 1.0 * cm, 1.0 * cm, 0.35 * cm, fill=1, stroke=0)
    c.circle(0.95 * cm, 1.25 * cm, 0.22 * cm, fill=1, stroke=0)

    c.save()
    return Path(tmp.name)


def make_inner_highlight_overlay(page_idx, scale, tx, ty, layer):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)

    def inset(rect, pad):
        x, y, w, h = rect
        return x + pad, y + pad, max(0, w - 2 * pad), max(0, h - 2 * pad)

    for body_rect, title_rect, color in TABLE_TINTS.get(page_idx, []):
        raw_body_rect = body_rect
        # The color layer is merged below the original PDF page, so the original
        # black table borders and text are redrawn on top. A tiny inset prevents
        # visible color from escaping if a detected border is half a point off.
        body_rect = inset(body_rect, 1.1)
        title_rect = inset(title_rect, 1.1) if title_rect else None
        x, y, w, h = body_rect
        c.setFillColor(color)
        c.setFillAlpha(0.0 if layer == "under" else 0.18)
        c.setStrokeAlpha(0)
        c.rect(tx + x * scale, ty + y * scale, w * scale, h * scale, fill=1, stroke=0)

        if title_rect and layer == "under":
            x, y, w, h = title_rect
            c.setFillColor(color)
            c.setFillAlpha(0.24)
            c.setStrokeColor(color)
            c.setStrokeAlpha(0.22)
            c.setLineWidth(0.6)
            c.rect(tx + x * scale, ty + y * scale, w * scale, h * scale, fill=1, stroke=1)

    if page_idx == 1 and layer == "over":
        # Color the nested set diagram without changing its original lines/text.
        def sx(v):
            return tx + v * scale

        def sy(v):
            return ty + v * scale

        diagram_shapes = [
            ("round", (421.0, 625.0, 85.0, 119.0), colors.HexColor("#2572C7"), 0.13, 6),
            ("round", (424.5, 631.0, 77.0, 88.0), colors.HexColor("#28A06A"), 0.14, 6),
            ("round", (429.0, 636.0, 61.0, 57.0), colors.HexColor("#E3B700"), 0.16, 5),
            ("ellipse", (432.8, 639.1, 59.5, 28.0), colors.HexColor("#EF6B24"), 0.16, 0),
        ]
        for kind, (x, y, w, h), color, alpha, radius in diagram_shapes:
            c.setFillColor(color)
            c.setFillAlpha(alpha)
            c.setStrokeAlpha(0)
            if kind == "round":
                c.roundRect(sx(x), sy(y), w * scale, h * scale, radius, fill=1, stroke=0)
            else:
                c.ellipse(sx(x), sy(y), sx(x + w), sy(y + h), fill=1, stroke=0)

    c.save()
    return Path(tmp.name)


def make_gap_overlay(page_idx, scale, tx, ty):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)

    c.setFillColor(colors.white)
    c.setFillAlpha(1)
    c.setStrokeAlpha(0)
    for x, y, w, h in WHITE_GAPS.get(page_idx, []):
        c.rect(tx + x * scale, ty + y * scale, w * scale, h * scale, fill=1, stroke=0)

    c.save()
    return Path(tmp.name)


def build():
    reader = PdfReader(str(SOURCE))
    writer = PdfWriter()

    # Scale only slightly so the full original page fits inside the colored frame.
    scale = 0.92
    tx = (W - float(reader.pages[0].mediabox.width) * scale) / 2
    ty = 0.72 * cm

    for idx, src_page in enumerate(reader.pages):
        label, title, accent = SECTIONS[idx]
        bg_path = make_background(idx + 1, label, title, accent)
        bg_page = PdfReader(str(bg_path)).pages[0]
        overlay_path = make_inner_highlight_overlay(idx + 1, scale, tx, ty, "under")
        overlay_page = PdfReader(str(overlay_path)).pages[0]
        bg_page.merge_page(overlay_page, over=True)
        bg_page.merge_transformed_page(
            src_page,
            Transformation().scale(scale).translate(tx, ty),
            over=True,
        )
        top_overlay_path = make_inner_highlight_overlay(idx + 1, scale, tx, ty, "over")
        top_overlay_page = PdfReader(str(top_overlay_path)).pages[0]
        bg_page.merge_page(top_overlay_page, over=True)
        gap_overlay_path = make_gap_overlay(idx + 1, scale, tx, ty)
        gap_overlay_page = PdfReader(str(gap_overlay_path)).pages[0]
        bg_page.merge_page(gap_overlay_page, over=True)
        writer.add_page(bg_page)
        bg_path.unlink(missing_ok=True)
        overlay_path.unlink(missing_ok=True)
        top_overlay_path.unlink(missing_ok=True)
        gap_overlay_path.unlink(missing_ok=True)

    with OUT.open("wb") as f:
        writer.write(f)


if __name__ == "__main__":
    build()
