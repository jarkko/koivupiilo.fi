# Concepts (phase 3), 2026-11-08

Two concept boards, built from the signed strategy (D19). They are boards, not pages: each shows the idea, why it
fits the job, a first-screen fragment, mark, type, colour, the bark element, photography, motion, references and
weaknesses. Gate: Jarkko picks one (mixes allowed).

- `design/boards/1-tuohi.html`: **Tuohi (bark).** The birch becomes a mark and a system. Lenticel tittles on the
  i's of the wordmark; a trunk traced from IMG_1327 runs down each page's edge; Hanken Grotesk only; bark-white,
  ink, inner-bark rust. One photo, on Yritys.
- `design/boards/2-koivikko.html`: **Koivikko (the grove).** The place leads. A seasonal grove photo opens the site;
  Newsreader serif with Hanken for facts; colours from the September photo. The bark appears only as photography.
  Needs four season photos and six trunk crops.

Recommendation: **Tuohi**, with one thing borrowed from Koivikko: the grove photo on Yritys follows the season.
- Why: the job is the company check (strategy §1). A mark that travels to product footers, invoices and store
  listings does more for "established company" than a photo.
- Tuohi also ships without waiting on photo approvals.
- Counter-argument: Koivikko is warmer for club people, and Tuohi lives or dies on the mark's drawing.

How to look: `node design/build.mjs && python3 -m http.server -d design/out 4788`, then
`http://localhost:4788/boards/1-tuohi.html`. Shots: `node design/shoot-boards.mjs` → `design/shots/boards/`
(1440/390 × light/dark: no overflow, no failed requests). Contrast was computed for every text/paper pair; all
pass AA in both schemes.

Assets: `design/boards/assets/bark.svg` is potrace output from `design/assets/photos/birch-trunk.jpg` (IMG_1327,
own camera, see PROVENANCE.md). It is local and spike-only until Jarkko OKs the photo.
