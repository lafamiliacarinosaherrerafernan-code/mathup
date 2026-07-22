from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(d for d in (BASE / "documentos").iterdir() if "CCSSI" in d.name)
OUT_DIR = BASE / "Infografías 1º Bachillerato CCSSI"
PREVIEW_DIR = BASE / "_preview" / "infografias_ccssi"

THEMES = [
    ("est", "#168B8F", "Estadística unidimensional y bidimensional"),
    ("P", "#7257C8", "Probabilidad"),
    ("B", "#2572C7", "Distribución de probabilidad y binomial"),
    ("N", "#28A06A", "Distribuciones continuas y normal"),
    ("R", "#168B8F", "Números reales"),
    ("C", "#7257C8", "Números complejos"),
    ("=", "#2572C7", "Ecuaciones y sistemas"),
    ("<=", "#EF6B24", "Inecuaciones y sistemas"),
    ("f", "#168B8F", "Funciones"),
    ("nCr", "#E3B700", "Combinatoria"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 11):
        files.append(next(p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{n}-")))
    return files


def main():
    infografia = load_skill_module()
    OUT_DIR.mkdir(exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    outputs = []

    for index, src in enumerate(selected_sources()):
        label, accent, title = THEMES[index]
        out = OUT_DIR / f"{title} - Infografía.pdf"
        infografia.build_infographic_pdf(src, out, title=title, label=label, accent=accent, seed=index)
        outputs.append(out)
        print(out)

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.28, cols=5)


if __name__ == "__main__":
    main()
