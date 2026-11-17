"""Local preview with the same clean URLs as the live site.

    python tools/preview.py          -> http://127.0.0.1:8000/

/about serves about.html, /about.html and /about/ redirect to /about, unknown pages get 404.html
(mirrors the rules in .htaccess). For local checking only; not uploaded.
"""
import http.server
import pathlib
import sys
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def _redirect(self, to):
        self.send_response(301)
        self.send_header("Location", to)
        self.end_headers()

    def do_GET(self):
        parts = urllib.parse.urlsplit(self.path)
        path, query = parts.path, ("?" + parts.query if parts.query else "")
        name = path.strip("/")
        if path in ("/index", "/index.html"):
            return self._redirect("/" + query)
        if name.endswith(".html") and "/" not in name and (ROOT / name).is_file():
            return self._redirect("/" + name[:-5] + query)
        if path.endswith("/") and name and "/" not in name and (ROOT / f"{name}.html").is_file():
            return self._redirect("/" + name + query)
        if name and "/" not in name and "." not in name and (ROOT / f"{name}.html").is_file():
            self.path = f"/{name}.html{query}"
        elif path != "/" and not (ROOT / name).exists():
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write((ROOT / "404.html").read_bytes())
            return
        return super().do_GET()


if __name__ == "__main__":
    print(f"Preview: http://127.0.0.1:{PORT}/  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
