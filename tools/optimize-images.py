"""Make WebP copies of the site photos and point the pages at them.

    python tools/optimize-images.py

For every JPEG in assets/ (except og-image.jpg, which social networks need as JPEG) this writes
assets/<name>.webp, at most 1600 px wide, quality 72, and replaces references to the JPEG in the
pages with the WebP. Safe to re-run; the original JPEGs are kept.
"""
import pathlib
import re

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
SKIP = {"og-image.jpg"}
MAX_W = 1600


def main():
    converted = {}
    for src in sorted(ASSETS.iterdir()):
        if src.suffix.lower() not in (".jpg", ".jpeg") or src.name in SKIP:
            continue
        dst = src.with_suffix(".webp")
        if src.stem in ("neema",):  # a hand-made neema.webp already exists; keep it
            continue
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=72, method=6)
        converted[src.name] = dst.name
        print(f"{src.name:32} {src.stat().st_size // 1024:4} KB -> {dst.name:32} {dst.stat().st_size // 1024:4} KB")

    pages = list(ROOT.glob("*.html")) + list((ROOT / "partials").glob("*.html"))
    total = 0
    for page in pages:
        t = page.read_text(encoding="utf-8")
        new = t
        for jpg, webp in converted.items():
            new = re.sub(r"(assets/)" + re.escape(jpg) + r"(?=['\"?)])", r"\g<1>" + webp, new)
        if new != t:
            total += 1
            page.write_text(new, encoding="utf-8", newline="")
    print(f"updated {total} pages")


if __name__ == "__main__":
    main()
