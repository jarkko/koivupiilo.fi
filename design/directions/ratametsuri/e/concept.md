# Direction E, "Rastilippu" (the control flag)

Files: `index.html` (fi), `en.html`, `assets/` (style.css, favicon.svg, font + licence). The page is self-contained and makes no request outside its folder. Shots: `design/shots/ratametsuri/e-*`.

## The idea

Ratametsuri's mark is the orienteering control flag, the white-and-orange marker every setter and runner looks for in the forest. The page has that moment's energy: you spot the flag, and it is bold and sure of itself. Orange is the brand (mark, fields, status). Purple is the course and the action (button, focus, links, and the course inside the app window).

## What could only belong to Ratametsuri, and what the category does

- The mark is a three-sided prism seen on its near edge; each face is cut on the diagonal into white and orange, so the colours alternate white/orange/white/orange across the faces, as on a real flag. It is drawn from an object every setter knows. It works at 16 px (favicon: ink tile, no outline) and as a large field.
- The page's one structural angle is the flag's diagonal: the orange stage behind the app window (a slanted left edge on desktop, slanted top and bottom on the phone) and the top edge of the "Tämä toimii jo" band. Nowhere else.
- Features are numbered in control circles (the course symbol), not bullets or icons.
- Category default (Purple Pen, Condes, OCAD, plain download pages): purple or grey chrome, a menu, a small window, a download button, requirements in grey under it. This page: no menu, the window is the largest object, the requirement sits in body text right above the field, the status is a named chip.

## References beaten, and where it falls short

- Final Cut Pro (window leads, domain content in it): ours names the domain with a course, its description sheet and a credit; the placeholder is abstract, so the real Kauppi screenshot must prove this.
- OCAD / Condes / Purple Pen (size and legibility of the window): the window is about 900 px wide at 1440 and bleeds to the edge; theirs are 590 / 640 px or absent.
- CoolDock / Supaste (requirement legibility): body-size text, 6:1 or better, wraps on 390 px, before the field in reading order.
- Dave Cleaner (what the visitor knows at the button): requirement, status, privacy line and maker are all inside one screen at 1440.
- Falls short of: Apple's own pages in finish of the hero (no photographic depth; the window is a flat shadowed frame), and of Linear in micro-detail (no scroll story, one arrival move only). Deliberate: the beta page should be fast and honest.

## Wordmark and type

- Wordmark: "Ratametsuri", Archivo at 78% width, weight 800, beside the mark. The h1 holds the inline SVG (aria-hidden) and the text.
- Type: **Archivo** variable (wdth 62–125, wght 100–900), one family: heading at 76–78% width and 800 weight (condensed grotesk), text at 100% width and 400. Latin subset (includes ä ö å), 90 KB woff2 from Fontsource. Licence SIL OFL 1.1, file `assets/archivo-OFL-LICENSE.txt`; source https://github.com/Omnibus-Type/Archivo, package https://fontsource.org/fonts/archivo. Not Hanken Grotesk, not Inter. Paid alternative considered: none clearly better; Druk/Compacta-class display faces are paid and sports-poster in feel.
- Finnish: no `hyphens:auto`; soft hyphens at compound boundaries only; the headline uses `text-wrap:balance` and `overflow-wrap` as a fallback.

## Colour tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| bg | #FAF8F2 | #0B1410 (forest night) | page |
| ink | #131D17 | #EDF1EA | text, borders, mark outline |
| muted | #4A564F | #A9B5AC | privacy line, footer |
| orange | #FF6A13 | #FF6A13 | fields and graphics only |
| on-orange | #131D17 | #131D17 | text on orange |
| purple | #A626A4 | #DC84DA | button, links, focus, the course |
| on-purple | #FFFFFF | #0B1410 | button label |
| field | #FFFFFF | #14211A | input |
| err | #B3261E | #FF9C92 | error text |

Hierarchy: orange never carries a word (text on orange is always ink), purple never sits on orange (the course lives inside the white or dark window; the button and focus ring sit on the page ground). So the two never touch and the real screenshot's purple course is the only purple in the stage.

## Contrast (WCAG 2.2, computed by script)

| Mode | Pair | Colours | Ratio | Needs | Result |
|---|---|---|---|---|---|
| light | ink text on page | #131D17 / #FAF8F2 | 16.26 | 4.5 | pass |
| light | muted text on page | #4A564F / #FAF8F2 | 7.23 | 4.5 | pass |
| light | link purple on page | #A626A4 / #FAF8F2 | 5.76 | 4.5 | pass |
| light | button label on purple | #FFFFFF / #A626A4 | 6.11 | 4.5 | pass |
| light | input text on field | #131D17 / #FFFFFF | 17.27 | 4.5 | pass |
| light | error text | #B3261E / #FAF8F2 | 6.15 | 4.5 | pass |
| light | text on orange (chip, features, caption) | #131D17 / #FF6A13 | 6.02 | 4.5 | pass |
| light | input border, mark outline | #131D17 / #FAF8F2 | 16.26 | 3 | pass |
| light | button and focus ring vs page | #A626A4 / #FAF8F2 | 5.76 | 3 | pass |
| light | focus ring on field | #A626A4 / #FFFFFF | 6.11 | 3 | pass |
| light | purple course on window | #A626A4 / #FFFFFF | 6.11 | 3 | pass |
| light | orange field vs page | #FF6A13 / #FAF8F2 | 2.70 | n/a | decorative field, carries no text or meaning; the mark has an ink outline for this reason |
| light | orange as text | #FF6A13 / #FAF8F2 | 2.70 | 4.5 | would FAIL: not used |
| dark | ink text on page | #EDF1EA / #0B1410 | 16.38 | 4.5 | pass |
| dark | muted text | #A9B5AC / #0B1410 | 8.82 | 4.5 | pass |
| dark | link purple | #DC84DA / #0B1410 | 7.45 | 4.5 | pass |
| dark | button label on purple | #0B1410 / #DC84DA | 7.45 | 4.5 | pass |
| dark | input text | #EDF1EA / #14211A | 14.55 | 4.5 | pass |
| dark | error text | #FF9C92 / #0B1410 | 9.29 | 4.5 | pass |
| dark | text on orange | #131D17 / #FF6A13 | 6.02 | 4.5 | pass |
| dark | input border, mark outline | #EDF1EA / #0B1410 | 16.38 | 3 | pass |
| dark | button and focus ring vs page | #DC84DA / #0B1410 | 7.45 | 3 | pass |
| dark | focus ring on field | #DC84DA / #14211A | 6.62 | 3 | pass |
| dark | purple course on window | #DC84DA / #14120F | 7.44 | 3 | pass |
| dark | orange field vs page | #FF6A13 / #0B1410 | 6.53 | 3 | pass |

Known non-pair: purple on orange is 2.13 (light) and 1.14 (dark) and never occurs.

## Motion

| Transition | Trigger | Property | Duration | Curve | Purpose |
|---|---|---|---|---|---|
| Mark arrives | page load | transform of a mask (the orange triangles wipe in along the diagonal) | 700 ms, delay 120 (story) | ease-out (.2,.7,.1,1) | the one signature move: the flag appears |
| Headline and status rise | page load | opacity, translateY 8 px | 500 ms, delay 200 | same | text follows the mark |
| Window settles | page load | opacity, translateY 18 px, scale .985 to 1 | 600 ms, delay 350 | same | the window is the destination of the eye |
| Request states cross-fade | `data-state` change | opacity (all states stacked in one grid cell) | 150 ms | linear | cause and effect, no height change |
| Button label swap | sending | opacity of two stacked labels | 150 ms | linear | feedback without width change |

Reduced motion: no animation; everything shows in its final state at once, state changes switch instantly. Only opacity and transform animate. Plain CSS, no library.

## Request block

Follows the shared contract (states, `data-state`, honeypot, `aria-describedby`/`aria-invalid`, live region, focus to field on error and to the result on success or not-live, `?state=`, `&email=`). The `?mock=ok|confirm|fail&delay=` mock exists **only in this prototype**. With an empty endpoint and no mock it shows `not-live`, never success. In `not-live` and `success` the typed address is echoed above the message (not a copy string, it is the visitor's own input).

## Worst-case findings and fixes

- The long address fits (ellipsis in the field, wraps in the echo).
- At Chrome "Very large" (24 px) the header overflowed 35 / 60 px (language link next to the wordmark): the header now wraps. The headline minimum size dropped to 2rem and breaks long words.
- The request block height is identical in all six states at 390 and 1440 (stacked grid cells).
- At 1440x900 the field ends at about 735 px, above the fold.
- Placeholder first drawing put the "to come" label over the course: moved to the top left of the window.
- Compounds break only at the soft hyphens (rasti-määritteineen, tulospalvelu-ohjelmistoon); checked at 390 and at Very large.

## Skills that ran, what each flagged, what changed

- design-kit:design-sprint (steps 2-6, one direction): concept, worst-case data and licence checks. Changed: nothing structural; it set the checks below.
- frontend-design:frontend-design: flagged numbered markers on a non-sequence (the feature circles carried 1-4) and a single-word accent habit. Changed: circles are now plain control rings, the list is a `ul`, headings carry no accented word.
- impeccable: `impeccable detect` on both files found 5 issues. Fixed: two thick side-tab borders (status line, result message; replaced by a short orange bar above the text), a thick top border on rounded items (replaced by a gradient rule). Still reported and judged false positives: "text #131d17 on #0b1410" (that is the ink-on-orange text, which sits on an orange pseudo-element and measures 6.02:1) and "features flush against bg" (the section has 3.5rem+ padding; the detector cannot see through clip-path). Critique Assessment A ran as an isolated sub-agent (no detector output). It flagged: (P0) the language link hidden under the orange stage at 1440 (fixed: header z-index, ink underline); (P1) the placeholder's labels and strokes too fine at 390 (fixed: larger type and 10-unit strokes, tag scales); (P1) the CTA below the fold on a phone (not changed: the window leads, as in Final Cut Pro; recorded as a risk); (P2) the features band heavy and generic (heading reduced to 2.75rem; the rings stay plain); (P2) a dead gap under the button on a phone (padding reduced).
- design-kit:motion: the table above, compositor-only properties, reduced path (no animation at all). Changed: story-length wipe only on the mark; the stagger and scroll reveals the guide warns about were not added.
- design-kit:real-imagery: the placeholder is plainly a placeholder (dashed "to come" tag, abstract course symbols, no map, no description sheet, no photo). The build switches to a `<picture>` with width and height once `screens/kauppi-{light,dark}.webp` exist, copying them into `assets/`. No provenance rows needed now.

Coordinator lessons applied: no `hyphens:auto` (soft hyphens only at compound boundaries: rasti&shy;määritteet, tulospalvelu&shy;ohjelmistoon); the message slot shares one cell with the privacy line, so the default state shows the privacy line, never an empty hole, and an error replaces it under the field; no fake description sheet in the placeholder; `status.label` is not shown because `status.text` already says "kehitteillä" (the label slot is unused here).

## Strings it lacked

- `status.label` is unused (it repeats `status.text`).
- The typed-address echo in not-live and success has no label (none needed).
- The placeholder label comes from the brief ("Kuvakaappaus tulossa" / "Screenshot to come").

## Open risks

- On a phone the window comes first, so the field sits about 1000 px down (below the 844 px fold); Mac requirement and field follow directly.

- The real screenshot is not in yet: the frame, the contrast of the real purple course against the window, and the load size are unverified. If the screenshot has its own window chrome, the placeholder's drawn title bar is dropped.
- A full orange band is loud. If the owner wants quieter, the features band can become ink on paper with an orange rule and the diagonal stays on the stage only.
- The mark's 3-D shading relies on two near-identical oranges and whites; at 16 px it reads as a split square, which is the intent but should be checked in a real tab.
- Archivo is a good but common grotesk; the condensed setting carries the character.
