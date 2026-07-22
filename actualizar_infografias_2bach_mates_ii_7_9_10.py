from pathlib import Path
import importlib.util


BASE = Path(__file__).resolve().parent
SKILL_SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")
SRC_DIR = next(
    d for d in (BASE / "documentos").iterdir()
    if d.is_dir() and d.name.startswith("2") and "Mates II" in d.name
)
OUT_DIR = next(
    d for d in BASE.iterdir()
    if d.is_dir() and d.name.startswith("Infograf") and "2" in d.name and "Bachillerato" in d.name and "Mates II" in d.name
)
PREVIEW_DIR = BASE / "_preview" / "infografias_2bach_mates_ii_actualizadas"

THEMES = [
    (7, "lim", "#7257C8", "7-L\u00edmite de sucesiones y funciones"),
    (9, "d/dx", "#2572C7", "9-Derivadas"),
    (10, "max", "#28A06A", "10-Aplicaci\u00f3n de derivadas"),
]


def load_skill_module():
    spec = importlib.util.spec_from_file_location("skill_infografia", SKILL_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main():
    infografia = load_skill_module()
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    outputs = []

    for number, label, accent, title in THEMES:
        src = next(p for p in SRC_DIR.glob("*.pdf") if p.name.startswith(f"{number}-") and "teoria" in p.name.lower())
        for old_pdf in OUT_DIR.glob(f"{number}-*.pdf"):
            old_pdf.unlink()
        out = OUT_DIR / f"{title} - Infograf\u00eda.pdf"
        clean_title = title.split("-", 1)[1]
        infografia.build_infographic_pdf(src, out, title=clean_title, label=label, accent=accent, seed=number)
        outputs.append(out)
        print(out)

    infografia.make_contact_sheet(outputs, PREVIEW_DIR / "mosaico_actualizadas.png", scale=0.30, cols=4)


if __name__ == "__main__":
    main()
