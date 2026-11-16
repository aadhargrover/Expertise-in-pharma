"""Build the folder to upload to cPanel.

Run from the site root:

    python tools/build-upload.py

It creates (and fully replaces):

    upload/public_html/                      <- upload the CONTENTS of this folder into cPanel's public_html
    upload/expertiseinpharma-public_html.zip <- the same thing as one zip (cPanel File Manager can extract it)

Only files the live site needs are copied: the pages, .htaccess, robots.txt, sitemap.xml,
favicon.ico and the assets that the pages, CSS and scripts actually reference. Working files
(partials/, tools/, form-backend/, *.md, the review deck, Word docs, _redirects) are left out.
"""
import pathlib
import re
import shutil
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "upload"
PUB = OUT / "public_html"
ROOT_FILES = [".htaccess", "robots.txt", "sitemap.xml", "favicon.ico"]
ALWAYS_ASSETS = ["site.css", "site.js", "forms.js", "og-image.jpg", "favicon-512.png", "apple-touch-icon.png",
                 "logo-dark.png", "logo-light.png"]


def referenced_assets(pages):
    found = set(ALWAYS_ASSETS)
    texts = [p.read_text(encoding="utf-8") for p in pages]
    texts += [(ROOT / "assets" / f).read_text(encoding="utf-8") for f in ("site.css", "site.js", "forms.js")]
    for t in texts:
        for m in re.finditer(r"assets/([A-Za-z0-9._-]+)", t):
            found.add(m.group(1))
    return sorted(f for f in found if (ROOT / "assets" / f).is_file())


def main() -> int:
    pages = sorted(ROOT.glob("*.html"))
    if PUB.exists():
        shutil.rmtree(PUB)
    (PUB / "assets").mkdir(parents=True)

    for p in pages:
        shutil.copy2(p, PUB / p.name)
    for f in ROOT_FILES:
        shutil.copy2(ROOT / f, PUB / f)
    assets = referenced_assets(pages)
    for f in assets:
        shutil.copy2(ROOT / "assets" / f, PUB / "assets" / f)

    unused = sorted(set(x.name for x in (ROOT / "assets").iterdir() if x.is_file()) - set(assets))

    zpath = OUT / "expertiseinpharma-public_html.zip"
    if zpath.exists():
        zpath.unlink()
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(PUB.rglob("*")):
            if f.is_file():
                z.write(f, f.relative_to(PUB).as_posix())

    size = sum(f.stat().st_size for f in PUB.rglob("*") if f.is_file())
    print(f"{len(pages)} pages, {len(ROOT_FILES)} root files, {len(assets)} assets -> {PUB}")
    print(f"total {size / 1_048_576:.1f} MB; zip {zpath.stat().st_size / 1_048_576:.1f} MB -> {zpath}")
    if unused:
        print("not copied (unused by any page):", ", ".join(unused))
    return 0


if __name__ == "__main__":
    sys.exit(main())
