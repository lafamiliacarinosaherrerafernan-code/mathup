from __future__ import annotations

import argparse
import gzip
import io
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class ReliableStaticHandler(SimpleHTTPRequestHandler):
    """Read each asset completely before writing it to the browser."""

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def copyfile(self, source, outputfile) -> None:
        payload = source.read()
        for offset in range(0, len(payload), 16 * 1024):
            outputfile.write(payload[offset:offset + 16 * 1024])
            outputfile.flush()

    def send_head(self):
        path = Path(self.translate_path(self.path))
        accepts_gzip = "gzip" in self.headers.get("Accept-Encoding", "").lower()
        if path.is_file() and accepts_gzip and path.suffix.lower() in {".html", ".css", ".js"}:
            payload = gzip.compress(path.read_bytes(), compresslevel=6)
            self.send_response(200)
            self.send_header("Content-Type", self.guess_type(str(path)))
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Vary", "Accept-Encoding")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            return io.BytesIO(payload)
        return super().send_head()


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the Margarita Salas app locally.")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--bind", default="127.0.0.1")
    args = parser.parse_args()

    root = Path(__file__).resolve().parent
    os.chdir(root)
    server = ThreadingHTTPServer((args.bind, args.port), ReliableStaticHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
