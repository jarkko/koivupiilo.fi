"""Draw the Koivupiilo wordmark as outlines.

Hanken Grotesk 600 (OFL) with dotless i's; the three tittles are bark lenticels.
The two lenticels over "ii" differ in length and height and never touch, so they
read as two marks at every size.

Two optical sizes:
  text     header and credits, about 16-40 px: heavier, blunter lenticels, looser fit
  display  above about 40 px: finer, tapered lenticels, tighter fit

Usage:
  python wordmark.py design/assets/fonts/hanken-grotesk-latin-wght-normal.woff2 text
  python wordmark.py design/assets/fonts/hanken-grotesk-latin-wght-normal.woff2 display
Prints an SVG. Its two paths are pasted into src/_partials/_wordmark.erb.
Needs fonttools, brotli and uharfbuzz (pip).
"""
import sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
import tempfile, os

src, variant = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "text")
WGHT = 600
CAP, DESC = 697, -204

# Optical spacing, in font units, added after the glyph with that index (K o ı v u p ı ı l o).
TRACK = {"text": -8, "display": -22}[variant]
TAPER = {"text": 0.17, "display": 0.30}[variant]
TOP = 40  # room above cap height for the highest lenticel
PAIR = {  # index of the left glyph -> extra space
    "text": {1: 6, 2: 6, 5: 10, 6: 34, 7: 16},
    "display": {1: 4, 2: 4, 5: 6, 6: 26, 7: 12},
}[variant]

# Lenticels: (i index, left offset from stem centre, right offset, centre height, thickness, skew)
LENT = {
    "text": [
        (2, -146, 172, 654, 86, 0.06),
        (6, -210, 60, 624, 86, -0.05),
        (7, -72, 102, 684, 86, 0.04),
    ],
    "display": [
        (2, -168, 196, 652, 66, 0.10),
        (6, -232, 66, 624, 66, -0.08),
        (7, -92, 110, 680, 66, 0.06),
    ],
}[variant]

f = TTFont(src)
inst = instancer.instantiateVariableFont(f, {"wght": WGHT})
inst.flavor = None
tmp = os.path.join(tempfile.mkdtemp(), "hg.ttf")
inst.save(tmp)
font = hb.Font(hb.Face(hb.Blob.from_file_path(tmp)))
buf = hb.Buffer(); buf.add_str("Koıvupıılo"); buf.guess_segment_properties()
hb.shape(font, buf, {"kern": True, "liga": False})
gs = inst.getGlyphSet(); order = inst.getGlyphOrder()

def r(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s

pen = SVGPathPen(gs, ntos=r)
x = 0; stems = {}
for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
    name = order[info.codepoint]
    # flip y: SVG y grows down; baseline at y = CAP
    gs[name].draw(TransformPen(pen, Transform(1, 0, 0, -1, x, CAP + TOP)))
    if name == "dotlessi":
        stems[i] = x + (63.8 + 174.6) / 2
    x += pos.x_advance + TRACK + PAIR.get(i, 0)
width = x - TRACK
glyphs = pen.getCommands()

def lenticel(x0, x1, yc, t, skew):
    L = x1 - x0; h = t / 1.5
    a, b = L * (TAPER + skew), L * (TAPER - skew)
    y = CAP + TOP - yc
    return (f"M{r(x0)} {r(y)}C{r(x0+a)} {r(y-h)} {r(x1-b)} {r(y-h)} {r(x1)} {r(y)}"
            f"C{r(x1-b)} {r(y+h)} {r(x0+a)} {r(y+h)} {r(x0)} {r(y)}Z")

lent = "".join(lenticel(stems[i] + l, stems[i] + rr, yc, t, sk) for i, l, rr, yc, t, sk in LENT)
left, right = 71, width - (574 - 532)
vb = f"{r(left)} 0 {r(right-left)} {CAP+TOP-DESC+TOP}"
print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path d="{glyphs}"/><path d="{lent}"/></svg>')
