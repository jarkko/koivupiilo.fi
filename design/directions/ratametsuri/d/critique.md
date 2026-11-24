# Critique: Direction D, Ratapainatus (the overprint)

Critic: independent context, did not build it. Written 2026-11-21 per design-sprint step 7, with the impeccable critique lens. Everything below is an estimate until a setter uses the page. Finnish wording is not judged; only layout with text.

## Evidence

- Pages: `design/directions/ratametsuri/d/index.html`, `en.html`, `style.css`, `page.js`, `concept.md`. Served over http and measured in headless Chrome (1440x900, 1280, 1024, 390x844, 320).
- Shots read: `design/shots/ratametsuri/d-fi-1440-light.png`, `d-fi-1440-dark.png`, `d-fi-390-light.png`, `d-fi-390-light-xl.png`, `d-fi-390-light-{error-validation,not-live,success}.png`. Measured request-block height in all six `?state=` renders at 390 and 1440.
- References: `docs/design/ratametsuri/references.md`, `refs/` shots by path there; award library `kit/references/awards/`.
- Not judged: the window's contents (reshoot pending, identical for all three).

## Heuristics (Nielsen, 0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Status line with ring, sending label cross-fade, finish ring fills on success. Not-live and success text is 15 px muted (`.msg`), easy to miss. |
| 2 | Match with the real world | 4 | Start triangle, numbered controls, finish double circle are the setter's own symbols. |
| 3 | User control and freedom | 3 | Field keeps typed text on error; no dead ends. Success clears the field, no way to correct a typo in the sent address. |
| 4 | Consistency and standards | 3 | One purple, one button. The rail runs through the text column and changes the page's grid (left indent 4.5 rem). |
| 5 | Error prevention | 3 | `type=email`, `inputmode`, honeypot, autocomplete correct. |
| 6 | Recognition over recall | 3 | The label is visible. The Mac requirement sits far from the field at 1440 (see below). |
| 7 | Flexibility and efficiency | 2 | One-field page; nothing to accelerate. Enter submits. |
| 8 | Aesthetic and minimal design | 3 | Calm, no gradients. The rail and registration ticks are ornament-with-meaning; the first-screen gap between heading and field (about 460 px) wastes the best slot. |
| 9 | Help with errors | 3 | Icon plus text, focus to field. Error text sits below the 54 px-tall button on 390, not under the field (`d-fi-390-light-error-validation.png`). The not-live mailto is a muted 15 px link. |
| 10 | Help and documentation | 2 | Privacy link exists (404 in prototype). Beta status is clear. Nothing else needed. |
| | Total | **29/40** | |

## Specificity

Category default (Purple Pen, Condes, OCAD): a download button, a link menu, a small unreadable window, requirements as grey print. D has no menu and no download button, but its first screen is still "headline, window, form". What could only be Ratametsuri: the purple course line with start triangle, numbered controls and a finish ring that fills on success. The legs stop short of each circle exactly as the app's own circle gap does. Barlow Semi Condensed gives road-map signage character. A different app could not reuse this page by swapping the nouns. Score **5/5**. The risk is the opposite: the rail is a JS overlay (no script, no legs) and costs 70 px of text width on a phone.

## The bar, first: references.md

| Job / baseline | Beats "ours must beat X at Y"? | Why |
|---|---|---|
| J1 vs Final Cut Pro at showing the domain in the window | Yes at 1440, partly at 390 | Window 821x513 at 1440, entire window and the whole course above the fold (`d-fi-1440-light.png`, top 202, bottom 715). At 390 it serves a 3:2 map crop (305 px wide, y 315-506): control numbers 1-8 readable, but no description sheet, and the course is cut at the right edge (control 8/9 half off). It is not "the window" on a phone, it is a map. |
| J1 vs Mela at window position | Yes | Above the fold at both widths. |
| J1 vs OCAD / Condes at size and legibility | Yes at 1440 | 821 px vs 590 px. Control numbers about 11-12 px; the description-sheet digits (about 7 px) are not readable at 1440. |
| J2 vs CoolDock/Supaste at requirement legibility | **No at 1440** | The requirement is 17 px, 15:1, but it sits at y 950-1030 in the left column, below the 900 px fold and below the field row (field y 836-888). Visually the field is read first. In the DOM it precedes the form, so assistive technology is fine. At 390 it sits directly above the field and passes. |
| J2 vs Wispr Flow at honesty | Yes | Copy file wording, "Mac, jossa on macOS 14 Sonoma tai uudempi", no other platforms. |
| J3 vs Dave Cleaner at what the visitor knows at the button | Partly | Privacy line is directly under the field (15 px, 6.7:1). The maker is in the footer (y 1110), the requirement below the fold. At 390 the field is at y 1437, 1.7 screens down, after four features. |
| J3 vs Mela at placing the privacy line | Yes | Under the field. |
| J3 vs CleanShot at risk line | Yes | Status line "kehitteillä" is above the window. |
| Category (Purple Pen, Condes, OCAD) | Yes | No menu, no stock photo, a window larger than any of them, purple as course colour. |

## The bar, second: award library

- [Halide](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#halide): one custom display face from the app's own UI used once, system type doing the rest. D's Barlow is used for body, labels and numerals as well, so the display moment is diluted; Halide's face has one job. D also ships four font files (about 90 KB) where Halide ships one.
- [Stryds](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#stryds): a hero built from the app's own visual metaphor. D does this with the rail, more quietly. Falls short: the rail is below the headline, not the hero; the first screen is text left, window right, as everywhere. Stryds commits at full viewport.
- [Glossar](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#glossar): one-line privacy promise and the action on the first screen on both widths (LCP 1.0 s, 100). D's first phone screen has no action at all; the field is at y 1437.
- Finish of details: the registration ticks are desktop-only and the only "printed" nod. No scroll reveal beyond leg drawing. Fonts, hierarchy and rhythm are at award level for a one-page beta; the weak point is composition on the phone (long single column with a 70 px dead left gutter).

## Contrast (recomputed from `style.css` tokens, WCAG 2.2)

| Pair | Light | Dark | Needs | Result |
|---|---|---|---|---|
| ink / paper | 15.19 | 15.59 | 4.5 | pass |
| muted / paper (features, privacy, credit, footer) | 6.68 | 7.83 | 4.5 | pass |
| muted / paper2 (placeholder) | 5.94 | 7.25 | 4.5 | pass |
| purple / paper (numerals, hover, focus ring) | 5.42 | 7.49 | 4.5 / 3 | pass |
| on-purple / purple (button) | 6.11 | 7.49 | 4.5 | pass |
| danger / paper (error text) | 5.79 | 9.42 | 4.5 | pass |
| edge / field (input border, UI) | 4.11 | 5.08 | 3 | pass |
| edge / paper (input border vs ground) | 3.83 | 5.38 | 3 | pass |
| purple legs and rings / paper (UI) | 5.42 | 7.49 | 3 | pass |
| purple / field (focus ring in input) | 5.81 | 7.08 | 3 | pass |
| hair / paper (ticks, rule; decoration) | 1.87 | 2.00 | n/a | decoration only |

Failures: **0**. Differences from `concept.md`: none; every figure matches. Concept omits purple/field (passes).

## Other checks

- Email field above the 900 px fold at 1440: yes, field 836-888 (fi), but the privacy line (y 905-920) is on the edge and the requirement is below it.
- Field at 390: y 1437-1489 of a 1789 px page; first appears after about 1.7 screens. Fails the brief's phone intent for a one-hand visit.
- Mac requirement before the field in reading order: DOM yes, 390 visual yes, **1440 visual no**.
- koivupiilo.fi chrome: none. Only the footer maker line "Ratametsuri on Koivupiilo Oy:n tuote" (allowed).
- Request block states: block height identical in all six states (271 px at 1440, 516 px at 390). Errors tied to the field by `aria-describedby`, `aria-invalid` and focus, but the visible message is below the button on a phone.
- Reduced motion: legs and window drawn at once, no transitions, content fully visible at 300 ms (checked, opacity 1). Pass.
- Largest text (`d-fi-390-light-xl.png`): no horizontal overflow. **Layout failure:** the headline breaks "suunnistus / radat" without a hyphen, so the compound reads as two words. "IOF 2024 -symboleilla" is kept together, good. Text column at xl is about 215 px wide because of the 103 px left rail gutter.
- Window legibility: 1440, numbers 1-11 readable, sheet digits not. 390, numbers 1-8 readable in the crop; the crop is hand-tuned to the old shot and must be re-checked after the reshoot.

## Priority issues

1. **Phone: the field is 1.7 screens down (`d-fi-390-light.png`, y 1437).** Fix: move the request block above the features on narrow widths (headline, status, window, requirement, field, then features), keeping the rail only for the features.
2. **1440: requirement below the fold and beside nothing (`d-fi-1440-light.png`, y 950-1030).** Fix: put "Mitä tarvitset" in the right column between caption and field, or directly under the headline, so the Mac line is on screen with the field.
3. **Not-live and success are 15 px muted text (`d-fi-390-light-not-live.png`).** J4's fallback is the mailto; it needs body size and a visible link treatment. Fix: 17 px ink for those two messages, keep error red.
4. **Headline break "suunnistus / radat" at xl.** Fix: `overflow-wrap:normal`, a soft hyphen after "suunnistus", and shrink the rail gutter at large text.
5. **Rail costs width on phones and depends on JS.** Fix: at 390 cut the gutter to 44 px or move controls inline; render the legs in CSS as a fallback.
6. **Phone crop is tuned to the old screenshot.** Fix: re-check `PHONE_CROP` after the reshoot; show control numbers 1-11 and the description sheet if the new shot allows it.
