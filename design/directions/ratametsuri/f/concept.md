# F "Ikkuna" (the window)

Files: `index.html` (fi), `en.html`, `build.mjs` (generates both from `../copy2.json`; copies `../screens/kauppi-{light,dark}.webp` into `assets/` and uses them in a `<picture>` that follows the colour scheme; without them it falls back to a plain labelled placeholder). `assets/` holds only the two screenshots (about 410 KB each, 2400x1504, width and height set, `fetchpriority=high`). System fonts, inline SVG, no other requests. The real Kauppi shots are in the current build.

## Idea
The app is the brand. The page sets in the visitor's own system face on a quiet Mac stage, and a very large window carries the message: a purple course and its description sheet.

## What only Ratametsuri would have, and what the default does
- The four features are a course: numbered purple controls joined by a leg line (desktop), and the finish double circle is the wordmark mark. The window itself shows a real purple course with its description sheet on the Kauppi map. Default: a feature icon grid and a download badge row. (`course_words` are unused now that the drawn window is gone.)
- Request and requirement sit together in the first screen; the field ends at y=345 at 1440 (fold 900).
- Default would centre a hero over a device mock; here the window is plain (no bezel), 1200 px wide at 1440.

## References
- Beats Final Cut Pro at showing the domain (a named Finnish map, a purple course and the description sheet, readable at 1440), Mela at window position (above the fold, not below a band), CoolDock/Supaste at the requirement (body size, 5:1+, wraps), Condes/OCAD at window size.
- Falls short: closest to the category default of all three, so specificity rests on the purple, the course row and the shot itself. At 390 the window is a zoomed crop, not the whole app.

## Wordmark
"Ratametsuri", system face 600, tracking -0.015em, with a purple finish double circle (SVG, also the favicon as a data URI). No app icon tile.

## Type (no files, no licences)
`-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", system-ui, "Segoe UI Variable Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Headline 650 weight, -0.034em, line-height 1.04, `text-wrap: balance`; body 17 px/1.5, -0.011em; `font-optical-sizing: auto` so SF switches Text/Display itself. Fallback: only checked on this Mac; Segoe/Roboto metrics are close and nothing depends on SF widths (all wrapping is fluid). Not rendered on Windows or Android here.

## Colour tokens
| token | light | dark |
|---|---|---|
| stage | #f5f5f7 | #1c1c1e |
| surface/field | #ffffff | #2c2c2e |
| ink | #1d1d1f | #f5f5f7 |
| muted | #6e6e73 | #a1a1a6 |
| accent (purple) | #a626a4 | #dc84da |
| on-accent | #ffffff | #1c1c1e |
| field line | #86868b | #8e8e93 |
| error | #b3261e | #ff9f95 |
| window bg/bar/side | #fff / #ececec / #f6f6f6 | #1e1e20 / #323234 / #262628 |

## Contrast (WCAG 2.2, computed)
| pair | light | dark |
|---|---|---|
| ink on stage | 15.46 | 15.63 |
| muted on stage (also status, lead, footer) | 4.66 | 6.61 |
| accent on stage (ring numerals, focus ring, rings; need 3) | 5.62 | 6.77 |
| button text on accent | 6.11 | 6.77 |
| field border on field (UI, need 3) | 3.62 | 4.27 |
| error on stage | 6.00 | 8.63 |
| muted on placeholder chip | 5.07 | 5.42 |
| accent on window canvas | 6.11 | 6.62 |

## Motion
Spring = critically damped, sampled to CSS `linear()` (700 ms, no overshoot), fallback cubic-bezier(.16,1,.3,1).
| Transition | Trigger | Property | Duration | Curve | Purpose | Reduced |
|---|---|---|---|---|---|---|
| Window rises | page load, once | opacity, translateY 28px to 0, scale .965 to 1 | 700 ms | spring | the window is the arrival; origin is below | static |
| Content fades in | after the window starts (260 ms delay) | opacity | 420 ms | ease-out | text follows the product | static |
| Caption fade | load | opacity, 500 ms delay | 420 ms | ease-out | settles last | static |
| Request states | `data-state` change | opacity (stacked grid cells, no height change) | 180 ms | ease-out | cross-fade, cause and effect | instant |
| Sending dot | sending | opacity pulse | 900 ms loop | ease | busy cue | stops |
Only compositor properties. Motion is wrapped in `prefers-reduced-motion: no-preference`.

## Request block
Contract followed. `?mock=ok|confirm|fail&delay=ms` exists only in this prototype (marked in the script); the shipped path with empty `data-endpoint` gives `not-live` with the mailto. Extra: `?variant=confirm` with `?state=success` shows the confirm text.

## Worst-case findings
- Checker: all checks passed (overflow, third-party, console, height constant across states, field above the fold at 1440: ends y=353).
- Request block: the privacy line now sits directly under the field and is the default occupant of the one message slot; error and sending text replace it in the same grid cell (privacy fades out, message fades in). Spare height from a longer message falls under the block, not between field and privacy.
- Hyphenation: `hyphens:auto` is off everywhere. Soft hyphens are written by `build.mjs` only at compound boundaries: tulospalvelu&shy;ohjelmisto, rasti&shy;määritte(et/ineen), sähköposti&shy;osoite, suunnistus&shy;radat. Checked at 390 and xl: "rasti-/määritteineen" breaks correctly; "radoilla", "sivulleen", "siirrät" no longer split. The words are unchanged (the shy is not used in title, meta or aria-label).
- 390 px: the window is a 4:3 box over the 16:10 screenshot, scaled 1.55 from origin 50% 82% so the whole purple course and control numbers show (map and its description sheet; sidebar and inspector are cropped out). The origin is tuned to this shot; a new shot with another composition needs the origin re-checked (`transform-origin` in the mobile rule).
- xl text (24 px): single column, headline three lines; no overflow.
- Long address: input ellipsis, error text `overflow-wrap:anywhere`.

## Status redundancy (for the copy rounds)
`status.label` ("Kehitteillä" / "In development") repeats the first words of `status.text` ("Ratametsuri on kehitteillä..."). Shown: the text only, with a small purple ring as marker; the label is unused. Copy rounds could drop the label or shorten the text to "Betaan pääsee mukaan kutsulla."

## Skills that ran, what each flagged, what changed
- `design-kit:design-sprint` (steps 2-6 checked for F alone; the three-direction, critique-by-fresh-context and owner steps belong to the coordinator): step 2 distinct concept, one sentence: yes, but it is the closest to the category default. Step 3 real screens: the real Kauppi window is now in. Step 4 worst-case and "domain content real or absent": flagged my drawn course window, skeleton description rows and invented-looking header as domain content that reads as the product's claim. Changed: placeholder reduced to a neutral labelled panel, and later replaced by the real shot. Step 5 feel prototype: arrival, send flow and mock exist. Step 6 licences: no fonts or libraries (system stack, no third-party code); screenshots are our own captures (see PROVENANCE.md).
- `frontend-design:frontend-design`: flagged the tells I was near: the label above each section ("Mitä tarvitset" as a small muted label), numbered markers, and a fade on content. Kept the numbers because the features are a course (controls are numbered), kept the requirement label because it is the copy heading, and kept one orchestrated arrival (window, then hero text) rather than per-section reveals. Changed: the status's bold label removed (also redundancy), type scale pushed (h3 and wordmark 22 px, headline up to 56 px).
- `impeccable` (launcher run: no PRODUCT.md or DESIGN.md exists, so it ran on the incumbent files; `impeccable detect --json` run on index.html and en.html): flagged `cramped-padding` on `.req` and `.features` (hairline borders as container edges), `flat-type-hierarchy` (h1 19 px, h3 19 px, body 17 px; the headline was a `p`), `repeating-stripes-gradient` (the placeholder hatch). Changed: hairlines drawn as background gradients rather than borders, headline is an `h2` and h3/h1 raised to 22 px, hatch removed (flat placeholder). Last run: `[]`, no findings. It offered an update to v4.10.0 (installed v4.5.2); not run. My own screenshot critique found, and I fixed: class clash `.bar`, misaligned feature rows, the dead gap in the request block, Finnish hyphenation, tiny window at 390.
- `design-kit:motion`: motion table, reduced path, spring tokens (unchanged this round).
- `design-kit:real-imagery`: applies to camera photos; the window is an app screenshot (its rules exclude screenshots from the photo pipeline, so no `ds imagery` run and no `provenance.tsv` row from me). Checked instead: the placeholder was marked "Kuvakaappaus tulossa" / "Screenshot to come" until the shots arrived; the shots are used from `screens/` with `<picture>`, width/height set, `alt=""` on the img inside a `role=img` figure carrying `screenshot_alt`; `screens/PROVENANCE.md` was read (source map approved by Jarkko, credit "Kauppi, Tampereen Pyrintö", PNG metadata removed, WebP without metadata, no camera asset). The caption uses `map_credit` with that credit. Not done: running `ds imagery`; the webp files are copied unmodified from `screens/`.

## Strings it lacked
None.

## Open risks
1. The mobile crop is tuned to this one screenshot (see above).
2. Generic-Mac-page risk remains; the course row and purple carry the specificity.
3. Non-Apple fallback fonts unverified visually. 4. The window shows an app that is at version 0.1; the shot is the Debug build.
4. Privacy links point to `/tietosuoja/` and `/en/privacy/`, which 404 in the prototype server.
