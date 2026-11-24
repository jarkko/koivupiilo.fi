# Critique: Direction F, Ikkuna (the window)

Critic: independent context, did not build it. Written 2026-11-21 per design-sprint step 7, with the impeccable critique lens. All scores are estimates until a setter uses the page. Finnish wording is not judged; only layout with text.

## Evidence

- Pages: `design/directions/ratametsuri/f/index.html`, `en.html`, `build.mjs`, `concept.md`. Measured in headless Chrome at 1440x900, 1280, 1024, 390x844 and 320, computed styles, six `?state=` renders at 390 and 1440, and a reduced-motion context.
- Shots read: `design/shots/ratametsuri/f-fi-1440-light.png`, `f-fi-1440-dark.png`, `f-fi-390-light.png`, `f-fi-390-light-xl.png`, `f-fi-390-light-{error-validation,not-live,success}.png`.
- References: `docs/design/ratametsuri/references.md`; award library `kit/references/awards/`.
- Not judged: the window's contents (reshoot pending).

## Heuristics (Nielsen, 0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Status line with ring marker, sending dot, success check. |
| 2 | Match with the real world | 3 | The real window and the purple course say it; the page's own graphics (double circle) are light. |
| 3 | User control and freedom | 3 | Same as the others; the form is replaced by the message in success and not-live. |
| 4 | Consistency and standards | 4 | Looks and behaves like a Mac product page; one accent. |
| 5 | Error prevention | 3 | Input attributes and honeypot correct. |
| 6 | Recognition over recall | 4 | Requirement, lead, label, field, privacy line stacked in one column, in that order, on both widths. |
| 7 | Flexibility and efficiency | 2 | One-field page. |
| 8 | Aesthetic and minimal design | 4 | Quietest of the three; nothing decorative competes with the window. |
| 9 | Help with errors | 3 | Icon, text, focus to field. Error below the button on a phone. Privacy link wraps alone at xl. |
| 10 | Help and documentation | 2 | Privacy link, mailto fallback. |
| | Total | **31/40** | |

## Specificity

Category default: a download badge row, a feature icon grid, a centred hero over a device mock. F avoids the badge row and the mock, but it is the Mac-app-page default of the last ten years: SF system type on `#f5f5f7`, hairlines, a big window with a soft shadow. What could only be Ratametsuri: the real Kauppi window with its purple course, and a thin strip of numbered controls joined by a leg as the feature row (not drawn from the app's geometry, just rings and a line). The wordmark is a double circle in SF 600. Swap the screenshot and the name and the page works for any Mac tool. Score **2/5**. The page is specific only because of the shot.

## The bar, first: references.md

| Job / baseline | Beats "ours must beat X at Y"? | Why |
|---|---|---|
| J1 vs Final Cut Pro at showing the domain in the window | Yes | 1200x750 window, the largest of the three. Control numbers about 16 px, sheet digits about 10 px: readable at 1440 (`f-fi-1440-light.png`). Caveat: the window starts at y 439, so only its top 460 px are on the first screen; controls 6-9 peek at the bottom edge and the rest of the course is below the fold. |
| J1 vs Mela at window position | Yes | The window begins above the fold on both widths. At 390 it starts at y 682 of 844. |
| J1 vs OCAD/Condes at size and legibility | Yes | 1200 px against 590 and 640 px. The best legibility of the three. |
| J2 vs CoolDock/Supaste at requirement | Yes | 17 px 500-weight line at top of the right column at 1440, above the field, ink 15.5:1; the languages line is muted 4.66:1 (thin margin). At 390 it sits directly under the status, before the field. |
| J2 vs Wispr Flow at honesty | Yes | Copy file facts only. |
| J3 vs Dave Cleaner at what the visitor knows at the button | Yes | Requirement, lead, field and privacy line within 300 px at 1440, field at y 308-352, so the whole job is in the first screen. The maker is only in the footer. |
| J3 vs Mela at placing the privacy line | Yes | Directly under the field. |
| J3 vs CleanShot at risk line | Yes | Status line under the headline. |
| Category | Yes | No menu, no stock photo; closest to the default in look. |

## The bar, second: award library

- [Glossar](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#glossar): system stack, one big line, plain privacy promise, action on the first screen at both widths, LCP 1.0 s. F matches that structure and is the only direction that does on the phone (field at y 495 of 844). Falls short: Glossar ships a single-column 480 px focus; F's 1440 first screen has a big empty left half under the headline (y 250-440).
- [Flighty](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#flighty): the product shown large and real. F's window is larger than Flighty's phone and loads two files of 410 KB, no scripts beyond the form: LCP risk on a slow phone (the image is `fetchpriority=high`). Falls short: Flighty uses the app's own output as supporting copy; F has no domain words around the window except the caption.
- [Halide](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#halide): one custom display face from the app. F uses none (system fonts, no licences), which is cheap and robust but gives up the one place a page like this can become recognisably Ratametsuri. On Windows and Android it becomes Segoe or Roboto, untested.
- Finish: hairline strokes, 12 px window radius, ring plus shadow, a spring `linear()` curve. The finish of details is high; the composition is the least ambitious.

## Contrast (recomputed from the `:root` tokens in `index.html`, WCAG 2.2)

| Pair | Light | Dark | Needs | Result |
|---|---|---|---|---|
| ink / stage | 15.46 | 15.63 | 4.5 | pass |
| muted / stage (lead, status, languages line, privacy, footer, language link) | 4.66 | 6.61 | 4.5 | pass, thin |
| muted / field | 5.07 | 5.42 | 4.5 | pass |
| accent / stage (rings, numerals, focus) | 5.62 | 6.77 | 4.5 / 3 | pass |
| on-accent / accent (button) | 6.11 | 6.77 | 4.5 | pass |
| field-line / field (input border, UI) | 3.62 | 4.27 | 3 | pass |
| field-line / stage (border vs ground) | 3.33 | 5.22 | 3 | pass |
| err / stage | 6.00 | 8.63 | 4.5 | pass |
| ink / field | 16.83 | 12.80 | 4.5 | pass |

Failures: **0**. All figures match `concept.md`. Muted text at 13-15 px in light mode has only 0.16 to spare; any greying of `#6e6e73` will fail.

## Other checks

- Email field above the 900 px fold at 1440: yes, field 308-352, the best of the three.
- Field at 390: y 495-539 of 1935, above the 844 fold; the button ends at 593. The only direction where a phone visitor can request without scrolling.
- Mac requirement before the field: yes, DOM and visual, at both widths.
- koivupiilo.fi chrome: none; footer maker line "Ratametsuri on Koivupiilo Oy:n tuote".
- Request block states: height identical across six states (191 px at 1440, 289 px at 390). Success and not-live replace the form with text and leave about 150 px of empty space (`f-fi-390-light-success.png`).
- Reduced motion: transitions off, sending dot stops, content visible at 300 ms. Pass.
- Largest text (`f-fi-390-light-xl.png`): no overflow. "suunnistus-/radat" breaks at a hyphen correctly. **Layout failure:** feature 3 breaks "IOF 2024 -/symboleilla", leaving the dash at the end of a line, apart from its word. "Tietosuoja" falls alone on its own line below the privacy sentence. The phone window crop at xl is a thin strip (about 215 px tall) and shows only controls 6-11.
- Window legibility: 1440 numbers and sheet readable. 390 crop (map area only, scaled 1.55): numbers about 12 px, readable; sidebar, toolbar and the sheet are cropped out, and a stray grid sliver sits at the left edge (`f-fi-390-light.png`, y 700-800).

## Priority issues

1. **At 1440 the course is mostly below the fold (`f-fi-1440-light.png`).** The window top is on screen, the purple course starts at y 850. Fix: put the form to the right of the headline, as now, and pull the window up about 150 px by trimming the 440 px header block, or crop the window's top bar at 1440; the course should be fully visible at 900 px.
2. **Specificity 2/5: it reads as any Mac tool.** Fix: a display face drawn for the page (Barlow Semi Condensed from D, OFL, used for the headline and wordmark only) and the app's circle-gap geometry in the feature row.
3. **The phone crop is tuned to the old shot and shows a stray grid sliver at the left edge.** Fix: re-tune `transform-origin` and scale after the reshoot; crop on the course, not the sheet edge.
4. **Success and not-live drop the form and leave a hole (`f-fi-390-light-success.png`).** Fix: keep the field visible with the address and put the message under it.
5. **Layout with text at xl:** "IOF 2024 -/symboleilla" separated, lone "Tietosuoja" line. Fix: non-breaking space before the dash-prefixed word, put the privacy link inline with `white-space:nowrap`.
6. **Muted text sits at 4.66:1 in light mode.** Fix: `#67676c` or darker for 13-15 px text.
7. **System font fallbacks untested on Windows and Android.** Fix: check once in Edge and Chrome Android; set a metric-compatible `size-adjust` if the headline rewraps.
