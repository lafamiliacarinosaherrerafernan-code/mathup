from __future__ import annotations

import re
from pathlib import Path
from tempfile import NamedTemporaryFile

import pypdfium2 as pdfium
from PIL import Image
from pypdf import PdfReader, PdfWriter, Transformation
from pypdf.generic import ContentStream
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


BASE = Path(__file__).resolve().parent
SRC_DIR = next(d for d in (BASE / "documentos").iterdir() if "MATES I" in d.name)
OUT_DIR = BASE / "Infografías 1º Bachillerato Mates I"
PREVIEW_DIR = BASE / "_preview" / "infografias_batch"

W, H = A4

pdfmetrics.registerFont(TTFont("Calibri", r"C:\Windows\Fonts\calibri.ttf"))
pdfmetrics.registerFont(TTFont("Calibri-Bold", r"C:\Windows\Fonts\calibrib.ttf"))


THEMES = [
    ("R", "#168B8F", "Números reales"),
    ("C", "#7257C8", "Números complejos"),
    ("=", "#2572C7", "Ecuaciones, sistemas e inecuaciones"),
    ("trig", "#EF6B24", "Trigonometría"),
    ("geo", "#28A06A", "Geometría analítica"),
    ("con", "#E3B700", "Cónicas"),
    ("f", "#168B8F", "Funciones"),
    ("lim", "#7257C8", "Límites de sucesiones y funciones"),
    ("d/dx", "#2572C7", "Derivadas"),
    ("max", "#EF6B24", "Aplicación de derivadas"),
]

PALETTE = ["#168B8F", "#7257C8", "#2572C7", "#28A06A", "#E3B700", "#EF6B24"]
TABLE_PATTERN = ["#E1F0F0", "#E8E4F6", "#E6F0FA", "#E1F0E8", "#F8F1CE", "#F6E0D2"]
HEADER_PATTERN = ["#B9DCDC", "#C9C0E8", "#BDD6EF", "#BFE3D7", "#EFE09A", "#F0C3A9"]


def selected_sources() -> list[Path]:
    files = []
    for n in range(1, 11):
        matches = [p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{n}-")]
        if matches:
            files.append(matches[0])
    return files


def output_name(src: Path) -> str:
    stem = re.sub(r"^\d+\s*-\s*", "", src.stem)
    stem = stem.replace("^LJ", " y ")
    stem = re.sub(r"\s*teoria$", "", stem, flags=re.IGNORECASE)
    stem = re.sub(r"\s+", " ", stem).strip()
    return f"{stem} - Infografía.pdf"


def make_background(label: str, title: str, page_no: int, total_pages: int, accent_hex: str):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)

    accent = colors.HexColor(accent_hex)
    dark = colors.HexColor("#1C2229")
    paper = colors.HexColor("#F8FBFD")
    muted = colors.HexColor("#B8C6D5")

    c.setFillColor(dark)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(accent)
    c.roundRect(0.55 * cm, H - 1.45 * cm, W - 1.1 * cm, 0.95 * cm, 8, fill=1, stroke=0)
    c.circle(1.22 * cm, H - 0.98 * cm, 0.62 * cm, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("Calibri-Bold", 17 if len(label) <= 2 else 11.5)
    c.drawCentredString(1.22 * cm, H - 1.17 * cm, label)
    c.setFont("Calibri-Bold", 12.2)
    c.drawString(2.05 * cm, H - 1.16 * cm, title)
    c.setFont("Calibri", 8.5)
    c.setFillColor(muted)
    c.drawRightString(W - 0.65 * cm, H - 0.33 * cm, f"Infografía · Parte {page_no}/{total_pages}")

    c.setFillColor(colors.Color(0, 0, 0, alpha=0.16))
    c.roundRect(0.54 * cm, 0.42 * cm, W - 1.08 * cm, H - 1.95 * cm, 8, fill=1, stroke=0)
    c.setFillColor(paper)
    c.setStrokeColor(accent)
    c.setLineWidth(2.2)
    c.roundRect(0.45 * cm, 0.52 * cm, W - 0.9 * cm, H - 2.05 * cm, 8, fill=1, stroke=1)

    c.setFillColor(colors.Color(accent.red, accent.green, accent.blue, alpha=0.20))
    c.circle(W - 1.0 * cm, 1.0 * cm, 0.35 * cm, fill=1, stroke=0)
    c.circle(0.95 * cm, 1.25 * cm, 0.22 * cm, fill=1, stroke=0)

    c.save()
    return Path(tmp.name)


def max_dark_run(row_pixels: list[tuple[int, int, int]], threshold=70, max_gap=2) -> tuple[int, int, int]:
    best = (0, 0, 0)
    start = None
    last = None
    gap = 0
    for i, (r, g, b) in enumerate(row_pixels):
        is_dark = r < threshold and g < threshold and b < threshold
        if is_dark:
            if start is None:
                start = i
            last = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap > max_gap:
                length = last - start + 1
                if length > best[0]:
                    best = (length, start, last)
                start = None
                last = None
                gap = 0
    if start is not None:
        length = last - start + 1
        if length > best[0]:
            best = (length, start, last)
    return best


def detect_table_rects(pdf_path: Path, page_idx: int, render_scale=2.0) -> list[tuple[float, float, float, float]]:
    doc = pdfium.PdfDocument(str(pdf_path))
    page = doc[page_idx]
    width = float(page.get_width())
    height = float(page.get_height())
    image = page.render(scale=render_scale).to_pil().convert("RGB")
    px_w, px_h = image.size

    def dark(pixel):
        r, g, b = pixel
        return r < 80 and g < 80 and b < 80

    h_segments = []
    min_h_len = max(36, int(px_w * 0.065))
    for y in range(0, px_h, 2):
        length, x0, x1 = max_dark_run([image.getpixel((x, y)) for x in range(px_w)], threshold=80, max_gap=3)
        if length >= min_h_len:
            h_segments.append((y, x0, x1))

    groups = []
    for y, x0, x1 in h_segments:
        if not groups or y > groups[-1][-1][0] + 4:
            groups.append([(y, x0, x1)])
        else:
            groups[-1].append((y, x0, x1))

    hlines = []
    for group in groups:
        ys = [g[0] for g in group]
        x0 = min(g[1] for g in group)
        x1 = max(g[2] for g in group)
        hlines.append((sum(ys) / len(ys), x0, x1))

    v_segments = []
    min_v_len = 18
    for x in range(0, px_w, 2):
        start = None
        last = None
        gap = 0
        runs = []
        for y in range(px_h):
            if dark(image.getpixel((x, y))):
                if start is None:
                    start = y
                last = y
                gap = 0
            elif start is not None:
                gap += 1
                if gap > 2:
                    if last - start + 1 >= min_v_len:
                        runs.append((start, last))
                    start = None
                    last = None
                    gap = 0
        if start is not None and last - start + 1 >= min_v_len:
            runs.append((start, last))
        for y0, y1 in runs:
            v_segments.append((x, y0, y1))

    vgroups = []
    for x, y0, y1 in v_segments:
        if not vgroups or x > vgroups[-1][-1][0] + 4:
            vgroups.append([(x, y0, y1)])
        else:
            vgroups[-1].append((x, y0, y1))

    vlines = []
    for group in vgroups:
        xs = [g[0] for g in group]
        y0 = min(g[1] for g in group)
        y1 = max(g[2] for g in group)
        vlines.append((sum(xs) / len(xs), y0, y1))

    def has_vertical_near(x_target, y0, y1, tol=18):
        needed = max(12, (y1 - y0) * 0.55)
        for x, vy0, vy1 in vlines:
            if abs(x - x_target) <= tol:
                overlap = min(y1, vy1) - max(y0, vy0)
                if overlap >= needed:
                    return True
        return False

    rects = []
    for i, top in enumerate(hlines):
        for bottom in hlines[i + 1 :]:
            y0, tx0, tx1 = top
            y1, bx0, bx1 = bottom
            if y1 - y0 < 16 or y1 - y0 > px_h * 0.60:
                continue
            overlap0 = max(tx0, bx0)
            overlap1 = min(tx1, bx1)
            width_px = overlap1 - overlap0
            if width_px < min_h_len:
                continue
            if abs(tx0 - bx0) > 28 or abs(tx1 - bx1) > 28:
                continue
            x0 = min(tx0, bx0)
            x1 = max(tx1, bx1)
            has_sides = has_vertical_near(x0, y0, y1) and has_vertical_near(x1, y0, y1)
            is_wide_table_band = width_px > px_w * 0.32 and (y1 - y0) > 18
            if has_sides or is_wide_table_band:
                rects.append((x0, y0, x1, y1))

    # Many source pages are one large Word table with several internal sections.
    # The previous pair-based pass can catch only one row; this pass catches the
    # complete bordered region when side borders continue through the gaps.
    long_hlines = [line for line in hlines if line[2] - line[1] >= px_w * 0.20]
    long_hlines.sort(key=lambda item: item[0])
    table_groups = []
    current = []
    for line in long_hlines:
        y, x0, x1 = line
        if not current:
            current = [line]
            continue
        prev_y = current[-1][0]
        gx0 = min(l[1] for l in current + [line])
        gx1 = max(l[2] for l in current + [line])
        similar_span = abs(x0 - current[-1][1]) < 45 and abs(x1 - current[-1][2]) < 45
        side_borders_continue = has_vertical_near(gx0, prev_y, y, tol=24) and has_vertical_near(gx1, prev_y, y, tol=24)
        if y - prev_y <= 48 or (similar_span and side_borders_continue):
            current.append(line)
        else:
            table_groups.append(current)
            current = [line]
    if current:
        table_groups.append(current)

    for group in table_groups:
        if len(group) < 2:
            continue
        x0 = min(line[1] for line in group)
        x1 = max(line[2] for line in group)
        y0 = min(line[0] for line in group)
        y1 = max(line[0] for line in group)
        if x1 - x0 >= px_w * 0.18 and y1 - y0 >= 18:
            rects.append((x0, y0, x1, y1))

    span_groups = []
    for line in [line for line in hlines if line[2] - line[1] >= px_w * 0.25]:
        y, x0, x1 = line
        placed = False
        for group in span_groups:
            gx0 = sum(l[1] for l in group) / len(group)
            gx1 = sum(l[2] for l in group) / len(group)
            if abs(x0 - gx0) < 35 and abs(x1 - gx1) < 35:
                group.append(line)
                placed = True
                break
        if not placed:
            span_groups.append([line])

    for group in span_groups:
        if len(group) < 2:
            continue
        x0 = min(line[1] for line in group)
        x1 = max(line[2] for line in group)
        y0 = min(line[0] for line in group)
        y1 = max(line[0] for line in group)
        if y1 - y0 >= 40:
            rects.append((x0, y0, x1, y1))

    # Merge rectangles that are vertically adjacent parts of the same table.
    merged = []
    for x0, y0, x1, y1 in sorted(rects, key=lambda r: (r[1], r[0])):
        if any(x0 >= ax0 - 3 and y0 >= ay0 - 3 and x1 <= ax1 + 3 and y1 <= ay1 + 3 for ax0, ay0, ax1, ay1 in rects if (ax0, ay0, ax1, ay1) != (x0, y0, x1, y1)):
            continue
        added = False
        for idx, (mx0, my0, mx1, my1) in enumerate(merged):
            x_overlap = min(x1, mx1) - max(x0, mx0)
            close_y = y0 <= my1 + 24 and y1 >= my0 - 24
            same_table_width = abs(x0 - mx0) < 35 and abs(x1 - mx1) < 35
            nested_or_shared = x_overlap > min(x1 - x0, mx1 - mx0) * 0.55
            if close_y and (same_table_width or nested_or_shared):
                merged[idx] = (min(mx0, x0), min(my0, y0), max(mx1, x1), max(my1, y1))
                added = True
                break
        if not added:
            merged.append((x0, y0, x1, y1))

    changed = True
    while changed:
        changed = False
        next_merged = []
        for rect in merged:
            x0, y0, x1, y1 = rect
            absorbed = False
            for idx, (mx0, my0, mx1, my1) in enumerate(next_merged):
                x_overlap = min(x1, mx1) - max(x0, mx0)
                y_overlap = min(y1, my1) - max(y0, my0)
                close = x_overlap > 0 and y0 <= my1 + 18 and y1 >= my0 - 18
                touching_grid = y_overlap > 0 and x0 <= mx1 + 18 and x1 >= mx0 - 18
                if close or touching_grid:
                    next_merged[idx] = (min(mx0, x0), min(my0, y0), max(mx1, x1), max(my1, y1))
                    changed = True
                    absorbed = True
                    break
            if not absorbed:
                next_merged.append(rect)
        merged = next_merged

    pdf_rects = []
    for x0, y0, x1, y1 in merged:
        pad = 2.2
        x = x0 / render_scale + pad
        y = height - y1 / render_scale + pad
        w = (x1 - x0) / render_scale - 2 * pad
        h = (y1 - y0) / render_scale - 2 * pad
        if w > width * 0.18 and h > 10:
            pdf_rects.append((x, y, w, h))
    return pdf_rects


def make_tint_overlay(page_size, scale, tx, ty, rects, color_hex):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)
    c.setFillColor(colors.Color(1, 1, 1, alpha=0))
    c.rect(0, 0, 1, 1, fill=1, stroke=0)
    color = colors.HexColor(color_hex)
    for x, y, w, h in rects:
        c.setFillColor(color)
        c.setFillAlpha(0.22)
        c.setStrokeAlpha(0)
        c.rect(tx + x * scale, ty + y * scale, w * scale, h * scale, fill=1, stroke=0)
        # Strengthen the upper strip only inside the detected box.
        strip_h = min(h * 0.16, 13)
        c.setFillAlpha(0.32)
        c.rect(tx + x * scale, ty + (y + h - strip_h) * scale, w * scale, strip_h * scale, fill=1, stroke=0)
    c.save()
    return Path(tmp.name)


def extract_vector_table_rects(src: Path, page_idx: int) -> list[tuple[float, float, float, float]]:
    reader = PdfReader(str(src))
    page = reader.pages[page_idx]
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    content = ContentStream(page.get_contents(), page.pdf)
    rects = set()

    for operands, op in content.operations:
        if op != b"re" or len(operands) < 4:
            continue
        x, y, w, h = map(float, operands[:4])
        if w < 0:
            x += w
            w = -w
        if h < 0:
            y += h
            h = -h
        if x < -1 or y < -1 or x > width + 1 or y > height + 1:
            continue
        if w > width * 0.95 and h > height * 0.95:
            continue
        if w < 18 or h < 7:
            continue
        # Ignore very narrow graphic strips; keep real table cells and framed diagrams.
        if w * h < 170:
            continue
        rects.add((round(x, 2), round(y, 2), round(w, 2), round(h, 2)))

    ordered = sorted(rects, key=lambda r: (-(r[2] * r[3]), r[1], r[0]))
    cleaned = []
    for rect in ordered:
        x, y, w, h = rect
        area = w * h
        # If a big container almost exactly wraps several smaller cells, skip it
        # so unbounded gaps do not get washed with color.
        inner_count = 0
        inner_area = 0
        for ox, oy, ow, oh in ordered:
            if (ox, oy, ow, oh) == rect:
                continue
            inside = ox >= x - 1 and oy >= y - 1 and ox + ow <= x + w + 1 and oy + oh <= y + h + 1
            if inside and ow * oh < area * 0.96:
                inner_count += 1
                inner_area += ow * oh
        if inner_count >= 3 and inner_area > area * 0.45:
            continue
        if any(abs(x - cx) < 0.5 and abs(y - cy) < 0.5 and abs(w - cw) < 0.5 and abs(h - ch) < 0.5 for cx, cy, cw, ch in cleaned):
            continue
        cleaned.append(rect)
    return cleaned


def row_band_index(rect, bands):
    x, y, w, h = rect
    cy = y + h / 2
    for idx, (lo, hi) in enumerate(bands):
        if lo - 1 <= cy <= hi + 1:
            return idx
    return 0


def make_row_bands(rects):
    rows = sorted([(y, y + h) for _, y, _, h in rects], key=lambda r: -((r[0] + r[1]) / 2))
    bands = []
    for lo, hi in rows:
        added = False
        cy = (lo + hi) / 2
        for idx, (blo, bhi) in enumerate(bands):
            bcy = (blo + bhi) / 2
            if abs(cy - bcy) <= max(4, min(hi - lo, bhi - blo) * 0.35):
                bands[idx] = (min(blo, lo), max(bhi, hi))
                added = True
                break
        if not added:
            bands.append((lo, hi))
    return bands


def make_vector_cell_overlay(scale, tx, ty, rects, seed=0):
    tmp = NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()
    c = canvas.Canvas(tmp.name, pagesize=A4)
    c.setStrokeAlpha(0)
    bands = make_row_bands(rects)
    heights = [h for _, _, _, h in rects]
    median_h = sorted(heights)[len(heights) // 2] if heights else 0
    for x, y, w, h in rects:
        band = row_band_index((x, y, w, h), bands)
        is_header_like = h <= max(14, median_h * 0.62) or band == 0
        pattern = HEADER_PATTERN if is_header_like else TABLE_PATTERN
        color = colors.HexColor(pattern[(band + seed) % len(pattern)])
        c.setFillColor(color)
        c.setFillAlpha(0.42 if is_header_like else 0.34)
        pad = 0.7
        c.rect(
            tx + (x + pad) * scale,
            ty + (y + pad) * scale,
            max(0, (w - 2 * pad) * scale),
            max(0, (h - 2 * pad) * scale),
            fill=1,
            stroke=0,
        )
    c.setFillAlpha(0)
    c.setStrokeAlpha(1)
    c.setStrokeColor(colors.black)
    c.setLineWidth(0.55)
    for x, y, w, h in rects:
        c.rect(
            tx + x * scale,
            ty + y * scale,
            w * scale,
            h * scale,
            fill=0,
            stroke=1,
        )
    c.save()
    return Path(tmp.name)


def build_infographic(src: Path, out: Path, theme_index: int):
    reader = PdfReader(str(src))
    total_pages = len(reader.pages)
    label, accent, title = THEMES[theme_index]
    writer = PdfWriter()
    page_w = float(reader.pages[0].mediabox.width)
    page_h = float(reader.pages[0].mediabox.height)
    scale = min((W - 0.9 * cm) / page_w, (H - 2.05 * cm) / page_h)
    tx = (W - page_w * scale) / 2
    ty = 0.72 * cm

    for idx, src_page in enumerate(reader.pages):
        bg_path = make_background(label, title, idx + 1, total_pages, accent)
        page = PdfReader(str(bg_path)).pages[0]
        page.merge_transformed_page(src_page, Transformation().scale(scale).translate(tx, ty), over=True)

        color = PALETTE[(theme_index + idx) % len(PALETTE)]
        rects = extract_vector_table_rects(src, idx)
        if rects:
            overlay_path = make_vector_cell_overlay(scale, tx, ty, rects, seed=theme_index)
        else:
            rects = detect_table_rects(src, idx)
            overlay_path = make_tint_overlay(A4, scale, tx, ty, rects, color)
        page.merge_page(PdfReader(str(overlay_path)).pages[0], over=True)
        writer.add_page(page)
        bg_path.unlink(missing_ok=True)
        overlay_path.unlink(missing_ok=True)

    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("wb") as f:
        writer.write(f)


def render_check(pdf_path: Path):
    doc = pdfium.PdfDocument(str(pdf_path))
    out = PREVIEW_DIR / pdf_path.stem
    out.mkdir(parents=True, exist_ok=True)
    pages = [0]
    if len(doc) > 1:
        pages.append(len(doc) - 1)
    for idx in pages:
        img = doc[idx].render(scale=1.2).to_pil().convert("RGB")
        img.save(out / f"pagina_{idx + 1}.png")


def main():
    sources = selected_sources()
    OUT_DIR.mkdir(exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    for theme_index, src in enumerate(sources):
        if src.name.startswith("1-"):
            # The first topic already has a hand-tuned infographic in this project.
            tuned = BASE / "Números Reales - Infografía corregida.pdf"
            out = OUT_DIR / output_name(src)
            out.write_bytes(tuned.read_bytes())
        else:
            out = OUT_DIR / output_name(src)
            build_infographic(src, out, theme_index)
        render_check(out)
        print(out)


if __name__ == "__main__":
    main()
