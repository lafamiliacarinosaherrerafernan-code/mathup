from pathlib import Path
import importlib.util
import sys

BASE = Path(r"C:\Users\aherr\OneDrive\Documentos\Codex\APP MARGARITA SALAS")
SRC_DIR = BASE / "documentos" / "1º ESO" / "Temas mios"
OUT_DIR = BASE / "Infografías 1º ESO"
PREVIEW_DIR = BASE / "_preview" / "infografias_1eso_8_9_10_actualizadas"
SCRIPT = Path(r"C:\Users\aherr\.codex\skills\skill-infografia\scripts\pdf_table_infographic.py")

spec = importlib.util.spec_from_file_location("pdf_table_infographic", SCRIPT)
mod = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = mod
spec.loader.exec_module(mod)

topics = [
    (8, SRC_DIR / "8-Semejanza, Pitágoras, Áreas.pdf", "8-Semejanza, Pitágoras y áreas", "8", "#D0558D", 80),
    (9, SRC_DIR / "9-Cuerpos geometricos Teoria.pdf", "9-Cuerpos geométricos", "3D", "#168B8F", 90),
    (10, SRC_DIR / "10-Funciones Teoria.pdf", "10-Funciones", "f(x)", "#2572C7", 100),
]

OUT_DIR.mkdir(parents=True, exist_ok=True)
for number, src, title, label, accent, seed in topics:
    if not src.exists():
        raise FileNotFoundError(src)
    for old in OUT_DIR.glob(f"{number}-*.pdf"):
        old.unlink()
    out = OUT_DIR / f"{title} - Infografía.pdf"
    mod.build_infographic_pdf(src, out, title=title, label=label, accent=accent, seed=seed)
    print(out)

mod.make_contact_sheet([OUT_DIR / f"{title} - Infografía.pdf" for _,_,title,_,_,_ in topics], PREVIEW_DIR / "mosaico_actualizadas.png", scale=0.34, cols=4)
print(PREVIEW_DIR / "mosaico_actualizadas.png")
