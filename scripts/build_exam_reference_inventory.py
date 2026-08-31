from __future__ import annotations

import hashlib
import json
from datetime import date
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
INVENTORY_ROOT = PROJECT_ROOT / "documentos" / "Inventario variedad retos"

DEFINITIONS = (
    {
        "course_id": "1eso",
        "course": "1.º ESO",
        "school_year": "2020-2021",
        "root": PROJECT_ROOT / "documentos" / "1º ESO" / "Exámenes tipo" / "2020-2021",
        "app_themes": {
            "Números naturales",
            "Números enteros",
            "Potencias y raíces cuadradas",
            "Fracciones",
            "Expresiones algebraicas",
            "Proporcionalidad",
            "Medida, ángulos, rectas y circunferencias",
            "Semejanza, Pitágoras y áreas",
            "Cuerpos geométricos",
            "Funciones",
        },
    },
    {
        "course_id": "3eso",
        "course": "3.º ESO",
        "school_year": "2020-2021",
        "root": PROJECT_ROOT / "documentos" / "3º ESO" / "Exámenes tipo" / "2020-2021",
        "app_themes": {
            "Números reales",
            "Potencias y raíces",
            "Expresiones algebraicas",
            "Ecuaciones y sistemas de ecuaciones",
            "Proporcionalidad",
            "Sucesiones",
            "Cuerpos geométricos",
            "Funciones",
            "Estadística",
            "Probabilidad",
        },
    },
    {
        "course_id": "2eso",
        "course": "2.º ESO",
        "school_year": "2020-2021",
        "root": PROJECT_ROOT / "documentos" / "2º ESO" / "Exámenes tipo" / "2020-2021",
        "app_themes": {
            "Números enteros",
            "Potencias y raíces cuadradas",
            "Fracciones",
            "Proporcionalidad",
            "Expresiones algebraicas",
            "Sistemas de ecuaciones",
            "Figuras planas",
            "Cuerpos geométricos",
            "Funciones",
        },
    },
    {
        "course_id": "4eso-a",
        "course": "4.º ESO Opción A",
        "school_year": "2017-2018",
        "root": PROJECT_ROOT / "documentos" / "4 ESO A" / "Exámenes tipo" / "2017-2018",
        "app_themes": {
            "Números reales",
            "Radicales",
            "Proporcionalidad y matemáticas financieras",
            "Expresiones algebraicas",
            "Ecuaciones e inecuaciones",
            "Sistemas de ecuaciones e inecuaciones",
            "Semejanza y trigonometría",
            "Áreas y cuerpos geométricos",
            "Funciones",
        },
    },
    {
        "course_id": "4eso-b",
        "course": "4.º ESO Opción B",
        "school_year": "2021-2022",
        "root": PROJECT_ROOT / "documentos" / "4º ESO B" / "Exámenes tipo" / "2021-2022",
        "app_themes": {
            "Números reales",
            "Radicales y logaritmos",
            "Expresiones algebraicas",
            "Ecuaciones y sistemas de ecuaciones",
            "Inecuaciones y sistemas de inecuaciones",
            "Proporcionalidad",
            "Semejanza",
            "Trigonometría",
            "Geometría analítica",
            "Funciones",
            "Límite de funciones",
            "Derivadas",
            "Límite de sucesiones",
            "Combinatoria",
        },
    },
)


def reference_kind(name: str) -> str:
    value = name.casefold()
    if "extraordinaria" in value:
        return "Examen extraordinario"
    if "recuperación" in value:
        return "Recuperación"
    if "simulacro" in value:
        return "Simulacro"
    return "Examen"


def topics_for(course_id: str, relative_path: str) -> list[str]:
    value = relative_path.casefold().replace("\\", "/")
    if course_id == "1eso":
        if "unidad 10 y 11" in value:
            return [
                "Medida, ángulos, rectas y circunferencias",
                "Semejanza, Pitágoras y áreas",
            ]
        if "unidad 8 y 9" in value:
            return [
                "Medida, ángulos, rectas y circunferencias",
                "Semejanza, Pitágoras y áreas",
            ]
        if "unidad 7" in value:
            return ["Proporcionalidad"]
        if "unidad 6" in value:
            return ["Expresiones algebraicas"]
        if "unidad 5" in value:
            return ["Números naturales"]
        if "unidad 4" in value:
            return ["Fracciones"]
        if "unidad 3" in value:
            return ["Números enteros"]
        if "unidad 2" in value:
            return ["Números naturales"]
        if "unidad 1" in value:
            return ["Números naturales"]
    if course_id == "2eso":
        if "unidad 11" in value:
            return ["Cuerpos geométricos"]
        if "unidad 10" in value:
            return ["Figuras planas"]
        if "unidad 9" in value:
            return ["Figuras planas"]
        if "unidad 8" in value:
            return ["Funciones"]
        if "unidad 7" in value:
            return ["Sistemas de ecuaciones"]
        if "unidad 6" in value:
            return ["Sistemas de ecuaciones"]
        if "unidad 5" in value:
            return ["Expresiones algebraicas"]
        if "unidad 3 y 4" in value:
            return ["Fracciones", "Proporcionalidad"]
        if "unidad 1 y 2" in value:
            return ["Números enteros", "Potencias y raíces cuadradas"]
    if course_id == "3eso":
        if "tema 11" in value or "tema 10" in value:
            return ["Funciones"]
        if (
            "tema 8 y 9" in value
            or "tema 7" in value
            or "áreas y volumnes" in value
            or "áreas y volumenes" in value
        ):
            return ["Cuerpos geométricos"]
        if "tema 6" in value:
            return ["Sucesiones"]
        if "tema 5" in value or "tema 4" in value:
            return ["Ecuaciones y sistemas de ecuaciones"]
        if "tema 3" in value:
            return ["Expresiones algebraicas"]
        if "tema 1 y 2" in value:
            return ["Números reales", "Potencias y raíces"]
    if course_id == "4eso-b":
        if "unidad 1/" in value:
            return ["Números reales"]
        if "unidad 2/" in value:
            return ["Radicales y logaritmos"]
        if "unidad 3" in value:
            return ["Expresiones algebraicas"]
        if "unidad 4" in value or "unidad 5" in value:
            return ["Ecuaciones y sistemas de ecuaciones"]
        if "unidad 6" in value:
            return ["Inecuaciones y sistemas de inecuaciones"]
        if "unidad 7 y 8" in value:
            return ["Semejanza", "Trigonometría"]
        if "unidad 9" in value and "9,10,11" in value:
            return ["Geometría analítica", "Funciones", "Límite de funciones"]
        if "unidad 9" in value:
            return ["Geometría analítica"]
        if "unidad 10" in value:
            return ["Funciones"]
    if course_id == "4eso-a":
        if "unidad 1-2" in value:
            return ["Números reales", "Proporcionalidad y matemáticas financieras"]
        if "unidad 3-4" in value:
            return ["Expresiones algebraicas"]
        if "unidad 5-6" in value:
            return ["Ecuaciones e inecuaciones", "Sistemas de ecuaciones e inecuaciones"]
        if "unidad 7-8" in value:
            return ["Semejanza y trigonometría", "Áreas y cuerpos geométricos"]
        if "unidad 9-10" in value:
            return ["Funciones"]
        if "recuperación 1-4" in value:
            return [
                "Números reales",
                "Proporcionalidad y matemáticas financieras",
                "Expresiones algebraicas",
            ]
        if "recuperación 5-8" in value:
            return [
                "Ecuaciones e inecuaciones",
                "Sistemas de ecuaciones e inecuaciones",
                "Semejanza y trigonometría",
                "Áreas y cuerpos geométricos",
            ]
        if "recuperación junio" in value:
            app_themes = next(
                definition["app_themes"]
                for definition in DEFINITIONS
                if definition["course_id"] == "4eso-a"
            )
            return sorted(app_themes, key=str.casefold)
    return ["Pendiente de clasificación visual"]


def make_id(course_id: str, file_path: Path) -> str:
    normalized = "-".join(file_path.stem.casefold().split())
    return f"{course_id}-{normalized}"


records: list[dict] = []
for definition in DEFINITIONS:
    root: Path = definition["root"]
    for file_path in sorted(root.rglob("*")):
        if not file_path.is_file() or file_path.suffix.casefold() not in {".pdf", ".doc", ".docx"}:
            continue
        data = file_path.read_bytes()
        topics = topics_for(definition["course_id"], str(file_path.relative_to(root)))
        records.append(
            {
                "id": make_id(definition["course_id"], file_path),
                "courseId": definition["course_id"],
                "course": definition["course"],
                "schoolYear": definition["school_year"],
                "kind": reference_kind(file_path.name),
                "topics": topics,
                "source": file_path.relative_to(PROJECT_ROOT).as_posix(),
                "extension": file_path.suffix.casefold(),
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
                "use": "Referencia de dificultad, estructura y selección de ejercicios tipo examen",
                "extractionPolicy": (
                    "Conservar solo enunciados y apartados; no importar soluciones editoriales"
                ),
                "requiresVisualReview": True,
                "topicsNotCurrentlyInApp": [
                    topic for topic in topics if topic not in definition["app_themes"]
                ],
            }
        )

records.sort(key=lambda item: (item["courseId"], item["source"]))
INVENTORY_ROOT.mkdir(parents=True, exist_ok=True)
(INVENTORY_ROOT / "referencias-examenes-tipo-eso.json").write_text(
    json.dumps(records, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)

lines = [
    "# Referencias de exámenes tipo de ESO",
    "",
    f"Actualizado: {date.today().isoformat()}.",
    "",
    (
        "Los documentos originales no se modifican. Las copias del proyecto se usan para fijar "
        "el nivel, la estructura y la progresión de los retos, la aventura matemática y los "
        "exámenes. Antes de publicar un ejercicio, se revisarán visualmente sus fórmulas, tablas "
        "y figuras y se aplicará la skill `solucion-de-ejercicios`."
    ),
    "",
    "## Totales",
    "",
    f"- Referencias registradas: **{len(records)}**.",
]
for definition in DEFINITIONS:
    count = sum(record["courseId"] == definition["course_id"] for record in records)
    lines.append(f"- {definition['course']}: **{count}** documentos.")

lines.extend(
    [
        "",
        "## Cobertura temática",
        "",
        "| Curso | Tema | Documentos de referencia |",
        "|---|---|---:|",
    ]
)
for definition in DEFINITIONS:
    course_records = [
        record for record in records if record["courseId"] == definition["course_id"]
    ]
    topics = sorted(
        {topic for record in course_records for topic in record["topics"]},
        key=str.casefold,
    )
    for topic in topics:
        count = sum(topic in record["topics"] for record in course_records)
        lines.append(f"| {definition['course']} | {topic} | {count} |")

lines.extend(
    [
        "",
        "## Criterio de uso",
        "",
        "- Los retos Aprendiz introducen las destrezas necesarias de forma progresiva.",
        "- Los retos Maestro se aproximan a la combinación y dificultad de estos exámenes.",
        (
            "- La aventura matemática practica las mismas destrezas con contextos variados, "
            "sin limitarse a cambiar números."
        ),
        (
            "- Los exámenes de la aplicación combinan los temas elegidos por el alumno y "
            "mantienen este nivel de referencia."
        ),
        (
            "- Las recuperaciones y extraordinarias se consideran referencias mixtas de repaso, "
            "no bancos de un solo tema."
        ),
        (
            "- Los documentos con soluciones se conservan como referencia, pero el inventario "
            "de enunciados excluye las soluciones editoriales."
        ),
        (
            "- El archivo titulado «Examen 3 ESO und 8 y 9 áreas y volumnes» se mantiene en "
            "3.º ESO y no se mezcla con el banco de 1.º ESO."
        ),
        "",
    ]
)
(INVENTORY_ROOT / "REFERENCIAS EXAMENES TIPO ESO.md").write_text(
    "\n".join(lines),
    encoding="utf-8",
)

print(
    json.dumps(
        {
            "references": len(records),
            "byCourse": {
                definition["course_id"]: sum(
                    record["courseId"] == definition["course_id"] for record in records
                )
                for definition in DEFINITIONS
            },
        },
        ensure_ascii=False,
    )
)
