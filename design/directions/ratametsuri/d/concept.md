# Direction D: Ratapainatus (the overprint)

Files: `index.html` (fi), `en.html`, `assets/`. Source: `build.mjs` (generates both pages from `../copy2.json`), `style.css`, `page.js`. Re-run `node design/directions/ratametsuri/d/build.mjs` when the real screenshots land in `../screens/`; the build then swaps the placeholder for a `<picture>` that follows the colour scheme.

## The idea

The page is a course printed on paper. One purple line runs down the left margin: a start triangle joined to the wordmark, a numbered control circle for each of the four features, and a finish double circle at the request field. The reader follows the course; the screen sits beside it.

## What only Ratametsuri could have, and what the category default does

- The graphic language is the app's own: start triangle, control circles numbered in course order, straight legs that stop short of each circle's edge (the same gap the app's "circle and leg gaps" feature draws), the finish double circle. The leg geometry is computed, not drawn: the line is aimed at the centres and trimmed 3 px short of every ring.
- The finish ring fills with purple when the request succeeds. The form's result is part of the course.
- Registration ticks around the window (print crop marks, desktop only) are the one nod to "printed".
- The category default (Purple Pen, Condes, OCAD in `references.md`): a download button, a menu of links, a small unreadable window. This page has no menu, the window is the largest object, and the Mac requirement sits right next to the field.

Restraint: purple appears on the line, the circles' numerals, the status ring, the focus ring and the button. Everything else is ink and paper. The course motif is not repeated on cards, dividers or buttons.

## References it beats, and where it falls short

| Reference (`references.md`) | Beaten at | Where D falls short |
|---|---|---|
| Final Cut Pro (J1) | showing the domain in the window: it will be a named Finnish map with a purple course | none on the screen itself; at 390 px it is small (306 px) |
| OCAD (category) | legibility and size: window is about 720 px at 1440, and the single largest object | OCAD's hero is a laptop plus a phone in one picture; ours shows one window only, which is the point |
| Condes / Purple Pen | no menu, no stock photo, purple used as the course colour, not as a wall | none |
| CoolDock, Supaste (J2) | the requirement is body-size text (17 px, 15:1) in a strip directly above the field, and wraps at 390 | requirement is one row above the request, not under the button |
| Dave Cleaner (J3) | one field, one button, and what the address is used for sits under the field | the form is right-aligned to the window on desktop, so the heading and the field are about 460 px apart |
| Mela (J1) | the window is above the fold at 1440 and at 390 (about 190 px down) | none |
| Award library `saas-product.md`, `ios-app-landing.md` (Linear, Flighty, CoolDock) | calm single-idea page with real type and no gradients; Flighty's 10 s LCP: this page ships about 110 KB of fonts and no images | Linear's motion polish and Flighty's product imagery: D has one animation and no photography |

## Wordmark

"Ratametsuri" in Barlow Semi Condensed 600 (a DIN-like signage and road-map letterform with real Finnish diacritics), joined to the start triangle: a 2.2 px purple ring triangle that is also the first node of the course. The lockup scales in `em`, so it holds at the 24 px (small phone, sticky usage) and 120 px (poster) end of the range; the triangle is a stroke, not a fill, so it keeps its weight at both ends. The text is real text, with the triangle `aria-hidden`.

## Type

| Role | Font | Licence | Source |
|---|---|---|---|
| Wordmark, headline, request heading | Barlow Semi Condensed 600 | SIL OFL 1.1 | https://github.com/jpt/barlow , via https://fontsource.org/fonts/barlow-semi-condensed |
| Text, labels, numerals | Barlow 400, 500, 600 | SIL OFL 1.1 | https://github.com/jpt/barlow , via https://fontsource.org/fonts/barlow |

Self-hosted as woff2 (latin subset, which holds å ä ö and the Finnish quotes): `assets/barlow-400.woff2`, `-500`, `-600`, `barlow-sc-600.woff2`, about 90 KB in all, licence files `assets/OFL-Barlow.txt` and `OFL-Barlow-Semi-Condensed.txt`. Tabular and lining figures are on for the control numerals and the business ID. No paid font was needed; Barlow was chosen for the cartographic character, not for being free.

## Colour tokens

| Token | Light | Dark |
|---|---|---|
| paper (ground) | #f4f1ea | #131018 |
| paper2 (window, placeholder) | #e9e4d9 | #1c1824 |
| field | #fbf9f5 | #1a1621 |
| ink | #1d1a24 | #ece8f1 |
| muted | #58525f | #aba4b8 |
| edge (field border) | #7d7787 | #8d8699 |
| hair (rules, ticks) | #b9b2a6 | #4a4356 |
| purple (the only strong colour) | #a626a4 | #dc84da |
| on-purple (button text) | #ffffff | #131018 |
| danger | #b3261e | #ff9d95 |

## Contrast (WCAG 2.2, computed with `contrast.mjs`, relative luminance)

| Pair | Light | Dark | Needs |
|---|---|---|---|
| ink on paper | 15.19 | 15.59 | 4.5 |
| muted on paper (feature text, credit, footer) | 6.68 | 7.83 | 4.5 |
| muted on paper2 | 5.94 | 7.25 | 4.5 |
| purple on paper (numerals, status ring, hover) | 5.42 | 7.49 | 4.5 |
| button text on purple | 6.11 | 7.49 | 4.5 |
| danger on paper | 5.79 | 9.42 | 4.5 |
| field border vs field (UI) | 4.11 | 5.08 | 3 |
| field border vs paper (UI) | 3.83 | 5.38 | 3 |
| purple legs and rings vs paper (UI) | 5.42 | 7.49 | 3 |
| focus ring (purple) vs paper | 5.42 | 7.49 | 3 |

The dashed inner frame of the placeholder (1.66 / 1.85) is decoration only. Error text also carries an icon, so colour is not the only cue.

## Motion

Plain CSS transitions and a small script; no library. All run only when `prefers-reduced-motion` is not `reduce`; with reduce, every leg, node and the window are drawn at once and state changes are instant. The page is whole and visible without the script (no legs, a plain page).

| Transition | Trigger | Property | Duration | Curve | Purpose |
|---|---|---|---|---|---|
| Leg draws | arrival; below the fold, when its control enters the viewport | `stroke-dashoffset` 1 to 0 on the leg line | 420 ms | ease-in-out (.45,.05,.25,1) | shows the course is read in order, from start to finish |
| Control appears | when the leg before it has arrived (about 300 ms later) | opacity 0 to 1, scale .55 to 1 | 260 to 300 ms | ease-out (.2,.8,.2,1), no overshoot | each feature is a control reached in course order |
| Window rises | arrival | opacity, translateY 14 px to 0 | 750 ms, 150 ms delay | ease-out (.2,.8,.2,1) | the screen is the thing to look at once the course starts |
| Request message cross-fade | any state change | opacity (visibility switched at the end) | 220 ms | ease | tells what changed without moving the layout |
| Button label cross-fade | sending | opacity | 200 ms | ease | the press is acknowledged in place; width stays fixed |
| Finish fills | success | `fill` of the inner ring | 350 ms | ease-out | the course ends: the request is in |

Reduced variant: the first four are instant (content fully visible); the last two keep the final state with no transition. The legs are `<svg>` lines in one overlay; no layout property animates.

## Request block (contract)

`<section class="beta" id="beta" data-state data-endpoint="">` with one form, the label, input (email, autocomplete, inputmode, autocapitalize off, spellcheck off, required), a honeypot, and one button. Messages share one stacked grid cell in an `aria-live="polite"` region, so the block never changes height. The default layer of that cell is the privacy line, so the slot is never an empty hole. Errors set `aria-invalid` and `aria-describedby` on the field, keep the typed text and move focus to it. `?state=<state>&email=` renders a state statically; `?mock=ok|confirm|fail&delay=ms` exists only in this prototype (production keeps only the real endpoint and the not-live fallback). With no endpoint and no mock, a valid address gives the not-live state with the mailto fallback and never a fake success.

## Worst-case findings

- Long address (70 chars): scrolls inside the field; error and not-live messages wrap at 390 without moving the layout (checker: block height identical across all six states at 390 and 1440).
- Finnish compounds at 390: no `hyphens: auto` (it splits wrongly). Soft hyphens only at compound boundaries: tulospalvelu&shy;ohjelmistoon, rasti&shy;määritteineen, rasti&shy;määritteet. Non-breaking spaces keep "IOF 2024 -symboleilla" and "IOF XML 3.0 -tiedostona" together.
- Largest text (Chrome "Very large", 24 px): the first run overflowed horizontally by 25 and 49 px because the header (wordmark and language link) did not wrap. Fixed with `flex-wrap` and `white-space: nowrap` on the link; after the fix no element passes the viewport edge.
- The 1440 first screen: the field ends at 831 px (fold 900) after trimming the headline and spacing; the first draft was at 888 px, too tight.
- Slow network: `?mock=ok&delay=2500` shows the sending state; layout stays.

## Skills that ran, and what each flagged

- `design-kit:design-sprint` (steps 2 to 6 for this one direction): fixed the rule "domain content is real or absent", so the window is a labelled placeholder with no drawn UI, no fake map, no description sheet; set the worst-case list above; licence list.
- `frontend-design:frontend-design`: asked for a plan and a check against the generic defaults. Flagged: the cream paper with a warm accent is an AI tell (D uses cream paper but a cold purple, the product's overprint colour, and a signage grotesque instead of a serif); eyebrow labels in all caps above every heading (D keeps two quiet ones, "Tämä toimii jo" and "Mitä tarvitset", which are the copy file's own headings; the status badge was dropped); numbered markers only when the content is a sequence (here they are control numbers, a course sequence, and the only numbering on the page). Changed: removed the all-caps status pill, kept one boldness (the line).
- `impeccable` critique (two isolated sub-agents; A design review, B detector run): detector `impeccable detect --json` on both pages returned 0 findings (exit 0). Review A scored 26/32 (n/a on 7 and 10), "Good". Its priority issues and what changed: the zigzag was too steep (offsets cut from .68/.34 to .62/.38); the finish ring was oversized (2.2 rem to 2 rem); error colour was the only cue (added an icon); credit and footer text raised from 14 to 15 px. Not changed: the placeholder is the largest object but is a stand-in by design, and giving it a contour or control pattern would be a fake map or fake UI (brief forbids it); the form stays aligned with the window so the field is above the fold (the heading and field gap is the cost); a link from the status line to the form would need a string not in the copy file. The `impeccable context` step reported no PRODUCT.md (the project has none); the brief and `docs/design/ratametsuri/brief.md` stood in for it, and `init` was not run because that needs the owner.
- `design-kit:motion`: required every motion to have a named purpose and a reduced variant, compositor-only properties and no motion on frequent interactions. Changed: the table above has a purpose and reduced variant per row; only opacity, transform, stroke-dashoffset and fill animate; the window rise is the only entrance, with no per-section fade-ins.
- `design-kit:real-imagery`: the screenshot is the owner's own capture of the app on the Kauppi map, so no library selection applies; what it set is the frame: 16:10, 12 px radius, ring plus shadow, `width` and `height` from the file, `<picture>` for the dark variant, and a provenance and metadata check (`ds imagery strip`, `screens/PROVENANCE.md`) before the real shots ship. The placeholder carries the visible label "Kuvakaappaus tulossa" / "Screenshot to come". The screenshots arrived mid-build, so the final shots use them; the build still contains the placeholder branch (labelled "Kuvakaappaus tulossa" / "Screenshot to come") for when `../screens/` is absent. Provenance: `../screens/PROVENANCE.md` (own capture, map credit "Kauppi, Tampereen Pyrintö" approved by Jarkko 2026-11-21); the webp files were made from metadata-free PNGs, and `ds imagery strip` has not been run on them here.

## Strings it lacked

None. Not used on screen: `status.label` (its word repeats in `status.text`; only the text is shown, with a ring as marker), and `course_words` are used only as accessible names of the circle symbols ("rasti 1", "maali"). The placeholder label is the one allowed extra string. A visible jump link from the status line to the form was suggested by the review but would need new copy.

## Open risks

1. The real Kauppi screenshot landed during the build and is in (`assets/kauppi-light.webp`, `kauppi-dark.webp`, about 410 KB each, one loaded per scheme, `fetchpriority=high`, width and height set). At 390 px it is about 306 px wide, so the control descriptions in it are small; the phone does not zoom it. The 410 KB image is the LCP on slow phones.
2. The route is a JavaScript overlay (legs are computed from the node positions). Without script the nodes show but no legs. It is recomputed on resize and font load; a very late webfont swap shifts it for a frame.
3. The form sits under the window, so on desktop heading and field are far apart; on a phone the field is about 1,400 px down. The brief's fold check applies at 1440 only.
4. The finish animation and the success state depend on the not-yet-built signup service; until then production shows the not-live state.
5. Finnish copy such as the feature paragraphs breaks in 4 to 5 lines at 390 with 24 px text; that is acceptable but long.

## Revision: legibility, phone crop, reshoot, requirements

- Window wider at 1440: the rail is narrowed (gutter + 18.5rem) and the window column allows up to 60rem; the window is now about 820 px wide (was about 720). The email field bottom is at 888 px (fi) and 859 px (en), under the 900 px fold.
- Phone art direction: below 62rem the `<picture>` serves `assets/phone-{fi,en}-{light,dark}.webp`, a 3:2 crop of the map area around the course (controls 1 to 8 with their numbers), cut with magick from the PNG master by `build.mjs` (`PHONE_CROP`, fractions of the source). The crop must be checked by eye after the reshoot.
- Reshoot wiring: the build prefers `screens/kauppi-{fi,en}-{light,dark}.webp` (and the matching PNG master for the crop) and falls back to `kauppi-{light,dark}.webp`. Output names are `assets/screen-{lang}-{scheme}.webp`.
- "What you need" is now one unit inside the left column, directly under the request lead: label above, Mac line and languages line stacked.
- Checker: 43 shots, all checks passed.
