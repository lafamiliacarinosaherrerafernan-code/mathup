"""Descarga el índice oficial de criterios PAU/EvAU de la UCLM.

Genera un manifiesto reproducible con los enlaces de Matemáticas II y
Matemáticas Aplicadas a las Ciencias Sociales II. Los PDF se guardan en una
carpeta temporal del propio proyecto para poder extraer y cotejar soluciones.
"""

from __future__ import annotations

import html
import json
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path


INDEX_URL = (
    "https://www.uclm.es/la/perfiles/preuniversitario/acceso/pau/"
    "modelosycriteriosdecorreccion/criterioscorreccion"
)
PROJECT_ROOT = Path(__file__).resolve().parents[1]
WORK_DIR = PROJECT_ROOT / "_codex_temporal" / "uclm_criteria"
MANIFEST_PATH = WORK_DIR / "manifest.json"


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[dict[str, str]] = []
        self._href = ""
        self._parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        values = dict(attrs)
        self._href = values.get("href") or ""
        self._parts = []

    def handle_data(self, data: str) -> None:
        if self._href:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "a" or not self._href:
            return
        label = re.sub(r"\s+", " ", html.unescape("".join(self._parts))).strip()
        self.links.append({"href": self._href, "label": label})
        self._href = ""
        self._parts = []


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def subject_from_url(url: str) -> str | None:
    value = urllib.parse.unquote(url).lower()
    if "matem" not in value:
        return None
    if any(token in value for token in ("social", "ccss", "aplic")):
        return "ccss-ii"
    if any(token in value for token in ("matematicasii", "matemáticasii", "matematicas-ii")):
        return "mates-ii"
    return None


def year_hint(url: str) -> str:
    decoded = urllib.parse.unquote(url)
    patterns = (
        r"CriteriosCorreccion(\d{2})(\d{2})",
        r"Criterios(?:_de_)?Correccion[_-]?(\d{2})(\d{2})",
        r"/(\d{4})[-_/](\d{4})/",
    )
    for pattern in patterns:
        match = re.search(pattern, decoded, flags=re.IGNORECASE)
        if match:
            first, second = match.groups()
            if len(first) == 2:
                return f"20{first}-20{second}"
            return f"{first}-{second}"
    return ""


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 Codex Margarita-Salas exercise audit"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def main() -> int:
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    page = fetch_bytes(INDEX_URL).decode("utf-8", errors="replace")
    parser = LinkParser()
    parser.feed(page)

    records: list[dict[str, str]] = []
    seen: set[str] = set()
    for link in parser.links:
        url = urllib.parse.urljoin(INDEX_URL, link["href"])
        subject = subject_from_url(url)
        if not subject or url in seen:
            continue
        seen.add(url)
        year = year_hint(url)
        label = link["label"] or "convocatoria"
        extension = ".pdf"
        filename = f"{subject}__{slug(year or 'sin-curso')}__{slug(label)}__{len(records)+1:03d}{extension}"
        records.append(
            {
                "subject": subject,
                "academic_year": year,
                "convocation": label,
                "url": url,
                "file": filename,
            }
        )

    records.sort(key=lambda item: (item["academic_year"], item["subject"], item["convocation"], item["url"]))
    MANIFEST_PATH.write_text(
        json.dumps(
            {"index_url": INDEX_URL, "count": len(records), "records": records},
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Manifiesto: {MANIFEST_PATH}")
    print(f"Enlaces matemáticos oficiales: {len(records)}")
    print(json.dumps(records, ensure_ascii=False, indent=2))
    return 0 if records else 2


if __name__ == "__main__":
    sys.exit(main())
