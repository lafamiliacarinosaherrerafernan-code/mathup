from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(
    d for d in (BASE / "documentos").iterdir()
    if d.is_dir() and d.name.startswith("1") and "BACHILLERATO CCSSI" in d.name.upper()
)
OUT_DIR = BASE / "Infograf\u00edas 1\u00ba Bachillerato CCSSI"
PREVIEW_DIR = BASE / "_preview" / "infografias_1bach_ccssi"

GENERATED_THEMES = [
    ("\u03c3", "#7257C8", "1-Estad\u00edstica unidimensional y bidimensional"),
    ("P", "#EF6B24", "2-Probabilidad"),
    ("X", "#28A06A", "3-Distribuci\u00f3n binomial"),
    ("N", "#168B8F", "4-Distribuciones continuas y normal"),
    ("R", "#168B8F", "5-N\u00fameros reales"),
    ("C", "#7257C8", "6-N\u00fameros complejos"),
    ("=", "#28A06A", "7-Ecuaciones y sistemas"),
    ("<=", "#EF6B24", "8-Inecuaciones y sistemas"),
    ("f", "#2572C7", "9-Funciones"),
]

# Estas tres infografías proceden del material docente aportado y se mantienen
# como documentos maestros. El generador no debe borrarlas ni sustituirlas.
CURATED_INFOGRAPHICS = [
    "10-Derivadas - Infografía.pdf",
    "11-Aplicación de derivadas - Infografía.pdf",
    "12-Combinatoria - Infografía.pdf",
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def selected_sources():
    files = []
    for n in range(1, 10):
        files.append(next(p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{n}-") and "teoria" in p.name.lower()))
    return files


def main():
    infografia = load_skill_module()
    OUT_DIR.mkdir(exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    # Solo se sustituyen los nueve PDF que genera este script. Así se preservan
    # los temas 10, 11 y 12, cuya maquetación procede de los originales.
    for _, _, title in GENERATED_THEMES:
        old_pdf = OUT_DIR / f"{title} - Infografía.pdf"
        if old_pdf.exists():
            old_pdf.unlink()

    outputs = []
    for index, (src, (label, accent, title)) in enumerate(zip(selected_sources(), GENERATED_THEMES)):
        out = OUT_DIR / f"{title} - Infograf\u00eda.pdf"
        clean_title = title.split("-", 1)[1]
        infografia.build_infographic_pdf(src, out, title=clean_title, label=label, accent=accent, seed=index)
        outputs.append(out)
        print(out)

    for filename in CURATED_INFOGRAPHICS:
        curated = OUT_DIR / filename
        if not curated.exists():
            raise FileNotFoundError(f"Falta la infografía maestra: {curated}")
        outputs.append(curated)

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_todas_paginas.png", scale=0.27, cols=4)


if __name__ == "__main__":
    main()
