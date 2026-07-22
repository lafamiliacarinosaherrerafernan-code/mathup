from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(d for d in (BASE / "documentos").iterdir() if d.is_dir() and d.name.startswith("1") and "ESO" in d.name) / "Temas mios"
OUT_DIR = BASE / "Infograf\u00edas 1\u00ba ESO"
PREVIEW_DIR = BASE / "_preview" / "infografias_1eso"

THEMES = [
    ("N", "#168B8F", "1-N\u00fameros naturales", lambda p: next(p.glob("1-*.pdf"))),
    ("Z", "#168B8F", "2-N\u00fameros enteros", lambda p: next(p.glob("2-*.pdf"))),
    ("\u221a", "#7257C8", "3-Potencias y ra\u00edces cuadradas", lambda p: next(p.glob("3-*.pdf"))),
    ("a/b", "#2572C7", "4-Fracciones", lambda p: next(p.glob("4-*.pdf"))),
    ("x", "#28A06A", "5-Expresiones algebraicas", lambda p: next(p.glob("5-*.pdf"))),
    ("%", "#E3B700", "6-Proporcionalidad", lambda p: next(p.glob("6-*.pdf"))),
    ("\u2220", "#EF6B24", "7-Medida, \u00e1ngulos, rectas y circunferencias", lambda p: next(p.glob("7-*.pdf"))),
    ("A", "#28A06A", "8-Semejanza, Pit\u00e1goras y \u00e1reas", lambda p: next(p.glob("8-*.pdf"))),
    ("3D", "#7257C8", "9-Cuerpos geom\u00e9tricos", lambda p: next(f for f in p.glob("9-*.pdf") if "Cuerpos" in f.name)),
    ("f", "#2572C7", "10-Funciones", lambda p: next(f for f in p.glob("9-*.pdf") if "Funciones" in f.name)),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main():
    infografia = load_skill_module()
    OUT_DIR.mkdir(exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    for old_pdf in OUT_DIR.glob("*.pdf"):
        old_pdf.unlink()

    outputs = []
    for index, (label, accent, title, resolver) in enumerate(THEMES):
        src = resolver(SRC_DIR)
        out = OUT_DIR / f"{title} - Infograf\u00eda.pdf"
        clean_title = title.split("-", 1)[1]
        infografia.build_infographic_pdf(src, out, title=clean_title, label=label, accent=accent, seed=index)
        outputs.append(out)
        print(out)

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.32, cols=4)


if __name__ == "__main__":
    main()
