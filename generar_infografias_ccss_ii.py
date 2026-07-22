from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(d for d in (BASE / "documentos").iterdir() if "CCSS II" in d.name and "2" in d.name)
OUT_DIR = BASE / "Infografías 2º Bachillerato CCSS II"
PREVIEW_DIR = BASE / "_preview" / "infografias_ccss_ii"

THEMES = [
    ("M", "#168B8F", "Matrices"),
    ("det", "#7257C8", "Determinantes"),
    ("S", "#2572C7", "Resolución de sistemas mediante determinantes"),
    ("PL", "#EF6B24", "Programación lineal"),
    ("lim", "#28A06A", "Límite de funciones y continuidad"),
    ("d/dx", "#2572C7", "Derivadas y aplicación de derivadas"),
    ("∫", "#28A06A", "Integrales indefinidas"),
    ("∫ab", "#E3B700", "Integrales definidas"),
    ("P", "#7257C8", "Probabilidad"),
    ("B", "#2572C7", "Distribución de probabilidad, binomial y continuas"),
    ("μ", "#168B8F", "Muestreo e inferencia estadística"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 12):
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

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.24, cols=5)


if __name__ == "__main__":
    main()
