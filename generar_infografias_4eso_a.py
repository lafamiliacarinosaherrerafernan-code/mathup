from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = BASE / "documentos" / "4 ESO A" / "Temas mios"
OUT_DIR = BASE / "Infograf\u00edas 4 ESO A"
PREVIEW_DIR = BASE / "_preview" / "infografias_4eso_a"

THEMES = [
    ("R", "#168B8F", "1-N\u00fameros reales"),
    ("\u221a", "#7257C8", "2-Radicales"),
    ("%", "#E3B700", "3-Proporcionalidad"),
    ("x", "#2572C7", "4-Expresiones algebraicas"),
    ("<=", "#EF6B24", "5-Ecuaciones e inecuaciones"),
    ("=", "#28A06A", "6-Sistemas de ecuaciones e inecuaciones"),
    ("trig", "#EF6B24", "7-Semejanza y trigonometr\u00eda"),
    ("3D", "#168B8F", "8-\u00c1reas y cuerpos geom\u00e9tricos"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 9):
        files.append(next(p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{n}-")))
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
