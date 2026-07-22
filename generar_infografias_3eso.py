from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(d for d in (BASE / "documentos").iterdir() if d.is_dir() and d.name.startswith("3") and "ESO" in d.name) / "Temas mios"
OUT_DIR = BASE / "Infograf\u00edas 3\u00ba ESO"
PREVIEW_DIR = BASE / "_preview" / "infografias_3eso"

THEMES = [
    ("R", "#168B8F", "1-N\u00fameros reales"),
    ("\u221a", "#7257C8", "2-Potencias y ra\u00edces"),
    ("x", "#2572C7", "3-Expresiones algebraicas"),
    ("=", "#28A06A", "4-Ecuaciones y sistemas de ecuaciones"),
    ("%", "#E3B700", "5-Proporcionalidad"),
    ("a_n", "#28A06A", "6-Sucesiones"),
    ("3D", "#168B8F", "7-Cuerpos geom\u00e9tricos"),
    ("f", "#2572C7", "8-Funciones"),
    ("\u03c3", "#7257C8", "9-Estad\u00edstica"),
    ("P", "#EF6B24", "10-Probabilidad"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 11):
        files.append(next(p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{n}-") and "teoria" in p.name.lower()))
    return files


def main():
    infografia = load_skill_module()
    OUT_DIR.mkdir(exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    for old_pdf in OUT_DIR.glob("*.pdf"):
        old_pdf.unlink()

    outputs = []
    for index, (src, (label, accent, title)) in enumerate(zip(selected_sources(), THEMES)):
        out = OUT_DIR / f"{title} - Infograf\u00eda.pdf"
        clean_title = title.split("-", 1)[1]
        infografia.build_infographic_pdf(src, out, title=clean_title, label=label, accent=accent, seed=index)
        outputs.append(out)
        print(out)

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.32, cols=4)


if __name__ == "__main__":
    main()
