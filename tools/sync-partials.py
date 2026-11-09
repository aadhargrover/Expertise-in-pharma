"""Copy the shared nav, footer and lead modal into every page.

Each page marks where a partial goes with a pair of comments, e.g.

    <!-- @partial nav -->
    ...anything here is replaced...
    <!-- /@partial nav -->

Edit the files in partials/, then run from the site root:

    python tools/sync-partials.py

The pages stay plain HTML; this script only saves copy-pasting the same block
into each file. Pages without markers are left untouched.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PARTIALS = ROOT / "partials"


def main() -> int:
    partials = {p.stem: p.read_text(encoding="utf-8").rstrip("\n") for p in PARTIALS.glob("*.html")}
    changed = 0
    for page in sorted(ROOT.glob("*.html")):
        text = page.read_text(encoding="utf-8")
        new = text
        for name, body in partials.items():
            pattern = re.compile(
                r"([ \t]*)<!-- @partial %s -->.*?<!-- /@partial %s -->" % (name, name), re.S
            )
            new = pattern.sub(
                lambda m: "%s<!-- @partial %s -->\n%s\n%s<!-- /@partial %s -->"
                % (m.group(1), name, body, m.group(1), name),
                new,
            )
        if new != text:
            page.write_text(new, encoding="utf-8", newline="")
            changed += 1
            print("updated", page.name)
    print(f"{changed} page(s) updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
