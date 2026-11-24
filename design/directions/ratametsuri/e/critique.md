# Critique: Direction E, Rastilippu (the control flag)

Critic: independent context, did not build it. Written 2026-11-21 per design-sprint step 7, with the impeccable critique lens. All scores are estimates until a setter uses the page. Finnish wording is not judged; only layout with text.

## Evidence

- Pages: `design/directions/ratametsuri/e/index.html`, `en.html`, `assets/style.css`, `concept.md`. Measured in headless Chrome at 1440x900, 1280, 1024, 390x844 and 320; computed styles read for the default state; a keyboard focus screenshot of the language link.
- Shots read: `design/shots/ratametsuri/e-fi-1440-light.png`, `e-fi-1440-dark.png`, `e-fi-390-light.png`, `e-fi-390-light-xl.png`, `e-fi-390-light-{error-validation,not-live,success}.png`, plus a 1024 render. Block height measured across all six `?state=` renders.
- References: `docs/design/ratametsuri/references.md`; award library `kit/references/awards/`.
- Not judged: the window's contents (reshoot pending).

## Heuristics (Nielsen, 0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Status line and chip are clear, but the privacy line, a status of the request (what happens to the address), is hidden in the default state (see issue 1). |
| 2 | Match with the real world | 4 | The orange-white control flag is what every setter looks for in the forest. |
| 3 | User control and freedom | 3 | Typed address echoed in success and not-live. The form disappears after submit, so a typo cannot be fixed in place. |
| 4 | Consistency and standards | 2 | Two accents (orange brand, purple action) plus ink. Purple, the course colour, is the button, orange is everything else. Setters read purple as the course, not orange. |
| 5 | Error prevention | 3 | Correct input attributes, honeypot. |
| 6 | Recognition over recall | 3 | Requirement above the field, label visible. |
| 7 | Flexibility and efficiency | 2 | One-field page. |
| 8 | Aesthetic and minimal design | 2 | A full-bleed orange stage plus a second full orange features band with slanted edges: the page is loud, and the four features occupy as much area as the proof. |
| 9 | Help with errors | 3 | Icon, text, focus to field; not-live mailto is large and obvious. Error sits below the button on a phone. |
| 10 | Help and documentation | 1 | No privacy line visible; the link to the privacy page is only in the footer. |
| | Total | **25/40** | |

## Specificity

Category default: purple or grey chrome, a menu, a small window, a download button. E avoids all of it and is the loudest of the three. What could only be Ratametsuri: the control flag, drawn as a three-face prism, and the diagonal that cuts the stage the way the flag's faces are cut. That is specific to orienteering, not to this app: Purple Pen or Condes could put the same flag in the header. Orange is not in the app, and the brief says the page's wordmark is not an app icon; a 24 px flag in the header reads as one and pre-empts that decision. Score **4/5**: strong ownable shape, but borrowed from the sport rather than the product.

## The bar, first: references.md

| Job / baseline | Beats "ours must beat X at Y"? | Why |
|---|---|---|
| J1 vs Final Cut Pro at showing the domain in the window | Yes at 1440, **no at 390** | 790x494 window, whole app above the fold at 1440 (`e-fi-1440-light.png`, y 145-640). At 390 the full window is scaled to 358 px (`e-fi-390-light.png`): control numbers about 6-7 px, toolbar and sheet unreadable. A setter sees "an app with a map", not a course. |
| J1 vs Mela at window position | Yes | Above the fold on both widths (phone y 314-538). |
| J1 vs OCAD/Condes at size and legibility | Partly | 790 px beats 590/640 but numbers are 10-11 px, sheet digits unreadable. At 1024 the window shrinks to 391 px and sits half under the orange stage (`s-e-1024`). |
| J2 vs CoolDock/Supaste at requirement | Yes | Body 17 px, ink 16:1, directly above the field at both widths, wraps at 390. Orange chevron bullets, not decorative noise. |
| J2 vs Wispr Flow at honesty | Yes | Copy file facts only. |
| J3 vs Dave Cleaner at what the visitor knows at the button | **No** | Requirement, status and button are together, but **the privacy line is invisible in the default state** (`.beta-privacy` has opacity 0 and visibility hidden, and no rule ever shows it; computed styles confirm; `e-fi-1440-light.png` shows nothing under the field). The visitor presses the button without being told what the address is used for. |
| J3 vs Mela at placing the privacy line | **No** | Same cause. |
| J3 vs CleanShot at risk line | Yes | "kehitteillä" is the first thing under the headline. |
| Category | Yes | No menu, big window, no stock forest. |

## The bar, second: award library

- [Halide](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#halide): one custom display face from the app's UI, used once. E uses condensed Archivo 800 for every heading; closer to Halide in spirit (display face as brand) but it is a common grotesk (concept admits it). Falls short on restraint: Halide is black and one yellow accent; E has orange, purple and ink at full strength.
- [Stryds](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md#stryds): brand colour as saturated field, hero from the product's metaphor. E commits to colour like Stryds. Falls short: Stryds' colour is the product's own rings; E's orange is not in the app, so the window sits on a colour it does not share.
- [Stripe Dot Dev](/Users/jarkko/code/metamorphosis/kit/references/awards/saas-product.md#stripe-dot-dev): display type at a decisive scale that carries the brand under 1 MB. E's 4 rem condensed headline works the same way; falls short in finish: no grid logic behind the diagonal, which appears twice with different angles (stage and features band).
- Finish: the mark at 16 px reads as a split square (concept says so); the features band at 1440 is a large flat orange with four rows of text and a lot of vertical air; shadow on the window is heavy on orange.

## Contrast (recomputed from `assets/style.css` tokens, WCAG 2.2)

| Pair | Light | Dark | Needs | Result |
|---|---|---|---|---|
| ink / bg | 16.26 | 16.38 | 4.5 | pass |
| muted / bg (footer; the privacy line, if shown) | 7.23 | 8.82 | 4.5 | pass |
| purple (link) / bg | 5.76 | 7.45 | 4.5 | pass |
| on-purple / purple (button) | 6.11 | 7.45 | 4.5 | pass |
| ink / field (input text) | 17.27 | 14.55 | 4.5 | pass |
| err / bg | 6.15 | 9.29 | 4.5 | pass |
| on-orange / orange (features, chip, caption) | 6.02 | 6.02 | 4.5 | pass |
| ink border / bg, ink border / field (UI) | 16.26 | 16.38 | 3 | pass |
| purple / field (focus ring in input) | 6.11 | 6.62 | 3 | pass |
| orange / bg (stage edge, decoration) | 2.70 | 6.53 | n/a | decoration, no text |
| **purple focus ring / orange (language link on the stage at 1440)** | **2.13** | **1.14** | 3 | **FAIL** |
| muted / orange | 2.68 | 1.35 | n/a | never used |

Failures: **1** (focus ring on the language link, both modes). `concept.md` states purple never sits on orange; it does when the language link, which lies on the orange stage at 1440 (`e-fi-1440-light.png`, top right), takes keyboard focus; screenshot `s-e-focus` confirms a purple ring on orange. Other figures match the concept table.

## Other checks

- Email field above the 900 px fold at 1440: yes, field 638-690.
- Field at 390: y 915-967 of 2088. Just under the 844 fold; needs a scroll of about 130 px. The best of D and E, worse than F.
- Mac requirement before the field: yes at both widths, DOM and visual.
- koivupiilo.fi chrome: none. Footer maker line only.
- Request block states: height identical across six states (275 px at 1440, 341 px at 390). But success and not-live swap the form for text and leave a 200 px empty hole inside the block (`e-fi-390-light-success.png`), and the typed address echo is the only trace of the field.
- Reduced motion: `animation:none` in reduce, content visible at 300 ms. Pass.
- Largest text (`e-fi-390-light-xl.png`): "Tulospalveluohjelmistoon" runs into the gutter, ending about 8 px from the screen edge past the content box; header wraps correctly. Phone footer at normal size breaks the Y-tunnus as "3458206- / 1" (`e-fi-390-light.png`, bottom): bad break.
- Window legibility: 1440 numbers about 10-11 px, sheet digits not readable. 390 numbers not readable at all.

## Priority issues

1. **The privacy line never shows (`e-fi-1440-light.png`, `e-fi-390-light.png`).** The CSS hides `.beta-privacy` and the visible-state rule omits it. Fix: add `.beta-privacy` to the default-state visible rule (and give it the same grid cell as the messages). Until then E fails J3 outright and misses the guardrail "knows what happens to the address".
2. **At 390 the window is a 7 px thumbnail (`e-fi-390-light.png`).** The page's proof is unreadable on the likeliest device. Fix: art-direct a crop of the course (as F and D do) instead of scaling the whole app.
3. **Focus ring on the language link fails 3:1 on orange.** Fix: make the ring ink on the stage (`.lang:focus-visible{outline-color:var(--ink)}`) or lift the link off the orange.
4. **Orange is not the app's colour and costs the page its calm.** Two full orange bands, a slant used twice. Fix: keep the orange to the stage behind the window and the mark; turn the features band to ink-on-bg with an orange rule (the concept's own fallback).
5. **Success and not-live leave a hole and drop the form (`e-fi-390-light-success.png`).** Fix: keep the field visible (disabled, with the address) and place the message beneath it, as D does.
6. **Layout with text:** the footer breaks "3458206-/1" at 390; "Tulospalveluohjelmistoon" overruns the content box at xl. Fix: non-breaking hyphen in the Y-tunnus, `overflow-wrap:anywhere` on the feature paragraphs.
7. **At 1024 the window is 391 px and half under the stage edge.** Fix: stack the window under the headline below 1100 px.
