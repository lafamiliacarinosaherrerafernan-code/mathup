"""Extract one PDF to UTF-8 text with stable page markers."""

from pathlib import Path
import sys

from pypdf import PdfReader


def main() -> int:
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract-pdf-text.py INPUT.pdf OUTPUT.txt")
    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    reader = PdfReader(source)
    pages = [
        f"===== PÁGINA {index} =====\n{page.extract_text() or ''}"
        for index, page in enumerate(reader.pages, start=1)
    ]
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("\n".join(pages), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
