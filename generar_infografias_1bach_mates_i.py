from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(
    d for d in (BASE / "documentos").iterdir()
    if d.is_dir() and d.name.startswith("1") and "BACHILLERATO MATES I" in d.name.upper()
)
OUT_DIR = BASE / "Infograf\u00edas 1\u00ba Bachillerato Mates I"
PREVIEW_DIR = BASE / "_preview" / "infografias_1bach_mates_i"

THEMES = [
    ("R", "#168B8F", "1-N\u00fameros reales"),
    ("C", "#7257C8", "2-N\u00fameros complejos"),
    ("=", "#28A06A", "3-Ecuaciones, sistemas e inecuaciones"),
    ("trig", "#EF6B24", "4-Trigonometr\u00eda"),
    ("geo", "#2572C7", "5-Geometr\u00eda anal\u00edtica"),
    ("c", "#E3B700", "6-C\u00f3nicas"),
    ("f", "#168B8F", "7-Funciones"),
    ("lim", "#7257C8", "8-L\u00edmite de sucesiones y funciones"),
    ("d/dx", "#2572C7", "9-Derivadas"),
    ("max", "#28A06A", "10-Aplicaci\u00f3n de derivadas"),
    ("P", "#EF6B24", "11-Probabilidad"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 12):
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

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.25, cols=4)


if __name__ == "__main__":
    main()
