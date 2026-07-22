from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from build_ccss_block_bank import DocxRenderer, HEADING_RE, split_parts

QUESTION_START_RE = re.compile(
    r"^(?P<label>(?:\d+\s*[-–]\s*[AB]\)|(?:PRIMER|SEGUNDO|TERCER|CUARTO|QUINTO)\s+BLOQUE\s+[AB][.)]))",
    re.IGNORECASE,
)


def split_exam_questions(paragraphs: list[dict[str, str]]) -> list[tuple[str, list[dict[str, str]]]]:
    starts: list[tuple[int, str]] = []
    for index, paragraph in enumerate(paragraphs):
        match = QUESTION_START_RE.match(paragraph["plain"])
        if match:
            starts.append((index, re.sub(r"\s+", " ", match.group("label")).strip(" .)")))
    if not starts:
        return [("", paragraphs)]
    result: list[tuple[str, list[dict[str, str]]]] = []
    for position, (start, label) in enumerate(starts):
        end = starts[position + 1][0] if position + 1 < len(starts) else len(paragraphs)
        result.append((label, paragraphs[start:end]))
    return result


def build_exercises(records: list[dict[str, str]], block_id: str) -> list[dict]:
    exercises: list[dict] = []
    current_source = ""
    current: list[dict[str, str]] = []

    def flush() -> None:
        nonlocal current_source, current
        if not current_source:
            current = []
            return
        for question_label, question_paragraphs in split_exam_questions(current):
            statement, parts = split_parts(question_paragraphs)
            source = f"{current_source} - {question_label}" if question_label else current_source
            identity = hashlib.sha256(f"mates2|{block_id}|{source}".encode("utf-8")).hexdigest()[:12]
            exercises.append({
                "id": f"mates2-{block_id}-{identity}",
                "source": source,
                "statement": statement,
                "parts": parts,
            })
        current = []

    for record in records:
        match = HEADING_RE.match(record["plain"])
        if match:
            flush()
            current_source = record["plain"]
        elif current_source:
            current.append(record)
    flush()
    return exercises


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", required=True, type=Path)
    parser.add_argument("--xslt", required=True, type=Path)
    parser.add_argument("--algebra", required=True, type=Path)
    parser.add_argument("--analisis", required=True, type=Path)
    parser.add_argument("--geometria", required=True, type=Path)
    parser.add_argument("--probabilidad-estadistica", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    project_root = args.project_root.resolve()
    output = args.output.resolve()
    if project_root not in output.parents:
        raise SystemExit("El archivo de salida debe quedar dentro del proyecto.")

    sources = {
        "algebra": args.algebra,
        "analisis": args.analisis,
        "geometria": args.geometria,
        "probabilidad-estadistica": args.probabilidad_estadistica,
    }
    banks: dict[str, list[dict]] = {}
    for block_id, path in sources.items():
        renderer = DocxRenderer(path, project_root, block_id, args.xslt, "mates-ii-blocks")
        try:
            banks[block_id] = build_exercises(renderer.records(), block_id)
        finally:
            renderer.close()
        print(f"{block_id}: {len(banks[block_id])} ejercicios")

    output.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(banks, ensure_ascii=False, separators=(",", ":"))
    output.write_text(
        "// Generado desde los DOCX aportados por el usuario. No editar a mano.\n"
        f"window.MATES_II_BLOCK_EXERCISES = {payload};\n",
        encoding="utf-8",
    )
    print(output)


if __name__ == "__main__":
    main()
