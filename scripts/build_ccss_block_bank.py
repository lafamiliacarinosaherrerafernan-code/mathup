from __future__ import annotations

import argparse
import hashlib
import html
import json
import mimetypes
import re
from pathlib import Path, PurePosixPath
from zipfile import ZipFile

from lxml import etree


NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pr": "http://schemas.openxmlformats.org/package/2006/relationships",
}
W = f"{{{NS['w']}}}"
M = f"{{{NS['m']}}}"
A = f"{{{NS['a']}}}"
R = f"{{{NS['r']}}}"

HEADING_RE = re.compile(r"^(?P<year>20\d{2})\s+-\s+(?P<rest>.+)$")
PART_RE = re.compile(r"^(?:Apartado\s+)?(?P<letter>[a-cA-C])(?:\.(?P<number>\d+))?\)\s*(?P<body>.*)$")


def node_plain_text(node: etree._Element) -> str:
    return "".join(node.xpath(".//w:t/text() | .//m:t/text()", namespaces=NS)).strip()


class DocxRenderer:
    def __init__(self, docx_path: Path, project_root: Path, block_id: str, xslt_path: Path, asset_family: str = "ccss-ii-blocks"):
        self.docx_path = docx_path
        self.project_root = project_root
        self.block_id = block_id
        self.archive = ZipFile(docx_path)
        self.transform = etree.XSLT(etree.parse(str(xslt_path)))
        rels_root = etree.fromstring(self.archive.read("word/_rels/document.xml.rels"))
        self.relationships = {
            rel.get("Id"): rel.get("Target")
            for rel in rels_root.xpath("//pr:Relationship", namespaces=NS)
        }
        self.asset_family = asset_family
        self.asset_dir = project_root / "assets" / asset_family / block_id
        self.asset_dir.mkdir(parents=True, exist_ok=True)
        self.media_cache: dict[str, str] = {}

    def close(self) -> None:
        self.archive.close()

    def mathml(self, node: etree._Element) -> str:
        result = self.transform(node)
        root = result.getroot()
        if root is None:
            return html.escape(node_plain_text(node))
        root.set("class", "native-math")
        return etree.tostring(root, encoding="unicode", method="xml")

    def image_markup(self, node: etree._Element) -> str:
        embeds = node.xpath(".//a:blip/@r:embed", namespaces=NS)
        if not embeds:
            return ""
        relationship_id = embeds[0]
        target = self.relationships.get(relationship_id, "")
        if not target:
            return ""
        archive_path = str(PurePosixPath("word") / PurePosixPath(target))
        data = self.archive.read(archive_path)
        digest = hashlib.sha256(data).hexdigest()[:16]
        suffix = Path(target).suffix.lower() or ".png"
        filename = f"{self.block_id}-{digest}{suffix}"
        output = self.asset_dir / filename
        if not output.exists():
            output.write_bytes(data)
        web_path = f"assets/{self.asset_family}/{self.block_id}/{filename}"
        mime = mimetypes.guess_type(filename)[0] or "image/png"
        return (
            f'<img class="block-exercise-figure" src="{html.escape(web_path)}" '
            f'data-mime="{html.escape(mime)}" alt="Figura necesaria para resolver el ejercicio">'
        )

    def render_run(self, node: etree._Element) -> str:
        content = "".join(self.render_node(child) for child in node if child.tag != f"{W}rPr")
        properties = node.find(f"{W}rPr")
        if properties is None or not content:
            return content
        vertical = properties.find(f"{W}vertAlign")
        if vertical is not None:
            value = vertical.get(f"{W}val")
            if value == "superscript":
                content = f"<sup>{content}</sup>"
            elif value == "subscript":
                content = f"<sub>{content}</sub>"
        if properties.find(f"{W}b") is not None:
            content = f"<strong>{content}</strong>"
        if properties.find(f"{W}i") is not None:
            content = f"<em>{content}</em>"
        return content

    def render_node(self, node: etree._Element) -> str:
        if node.tag in (f"{M}oMath", f"{M}oMathPara"):
            return self.mathml(node)
        if node.tag == f"{W}r":
            return self.render_run(node)
        if node.tag == f"{W}t":
            return html.escape(node.text or "")
        if node.tag == f"{W}tab":
            return '<span class="docx-tab" aria-hidden="true">&emsp;</span>'
        if node.tag in (f"{W}br", f"{W}cr"):
            return "<br>"
        if node.tag == f"{W}drawing":
            return self.image_markup(node)
        return "".join(self.render_node(child) for child in node)

    def paragraph_record(self, paragraph: etree._Element) -> dict[str, str]:
        markup = "".join(self.render_node(child) for child in paragraph)
        return {"plain": node_plain_text(paragraph), "html": markup.strip()}

    def records(self) -> list[dict[str, str]]:
        root = etree.fromstring(self.archive.read("word/document.xml"))
        body = root.find(f"{W}body")
        if body is None:
            return []
        records: list[dict[str, str]] = []
        for child in body:
            if child.tag == f"{W}p":
                record = self.paragraph_record(child)
                if record["plain"] or record["html"]:
                    records.append(record)
        return records


def split_parts(paragraphs: list[dict[str, str]]) -> tuple[list[dict[str, str]], list[dict]]:
    matches: list[tuple[int, re.Match[str]]] = []
    for index, paragraph in enumerate(paragraphs):
        match = PART_RE.match(paragraph["plain"])
        if match:
            matches.append((index, match))
    use_granular = any(match.group("number") for _, match in matches)
    starts = [
        (index, match)
        for index, match in matches
        if bool(match.group("number")) == use_granular
    ]
    if not starts:
        return paragraphs, [{"label": "Resultado", "paragraphs": []}]

    first_index = starts[0][0]
    statement = paragraphs[:first_index]
    parts: list[dict] = []
    for position, (start, match) in enumerate(starts):
        end = starts[position + 1][0] if position + 1 < len(starts) else len(paragraphs)
        label = match.group("letter").lower()
        if match.group("number"):
            label += f".{match.group('number')}"
        parts.append({"label": f"{label})", "paragraphs": paragraphs[start:end]})
    return statement, parts


def build_exercises(records: list[dict[str, str]], block_id: str) -> list[dict]:
    exercises: list[dict] = []
    current_source = ""
    current: list[dict[str, str]] = []

    def flush() -> None:
        nonlocal current_source, current
        if not current_source:
            current = []
            return
        statement, parts = split_parts(current)
        identity = hashlib.sha256(f"{block_id}|{current_source}".encode("utf-8")).hexdigest()[:12]
        exercises.append({
            "id": f"ccss2-{block_id}-{identity}",
            "source": current_source,
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
    parser.add_argument("--probabilidad", required=True, type=Path)
    parser.add_argument("--estadistica", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    project_root = args.project_root.resolve()
    output = args.output.resolve()
    if project_root not in output.parents:
        raise SystemExit("El archivo de salida debe quedar dentro del proyecto.")

    sources = {
        "algebra": args.algebra,
        "analisis": args.analisis,
        "probabilidad": args.probabilidad,
        "estadistica": args.estadistica,
    }
    banks: dict[str, list[dict]] = {}
    for block_id, path in sources.items():
        renderer = DocxRenderer(path, project_root, block_id, args.xslt)
        try:
            banks[block_id] = build_exercises(renderer.records(), block_id)
        finally:
            renderer.close()
        print(f"{block_id}: {len(banks[block_id])} ejercicios")

    output.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(banks, ensure_ascii=False, separators=(",", ":"))
    output.write_text(
        "// Generado desde los DOCX aportados por el usuario. No editar a mano.\n"
        f"window.CCSS_II_BLOCK_EXERCISES = {payload};\n",
        encoding="utf-8",
    )
    print(output)


if __name__ == "__main__":
    main()
