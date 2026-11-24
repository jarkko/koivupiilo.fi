# Ratametsuri product page: round 2 recommendation (critic)

Written 2026-11-21 by the independent critic. Critiques: `d/critique.md`, `e/critique.md`, `f/critique.md`. Heuristic scores are estimates; nothing here is user-tested.

## Score table

| Direction | Heuristics /40 | J1 | J2 | J3 | Contrast failures | Specificity (1-5) | Verdict |
|---|---|---|---|---|---|---|---|
| A = D Ratapainatus | 29 | beats (partly at 390: map crop only) | falls short at 1440 (requirement below fold), beats at 390 | falls short at 390 (field 1.7 screens down), partly at 1440 | 0 | 5 | The most Ratametsuri page, but the request is buried on a phone and the requirement is off-screen at 1440. |
| B = E Rastilippu | 25 | beats at 1440, falls short at 390 (7 px numbers) | beats | falls short (privacy line invisible, a bug) | 1 (focus ring on orange, both modes) | 4 | Strong flag idea, loud orange, and the privacy line never shows. |
| C = F Ikkuna | 31 | beats (course half below the fold at 1440) | beats | beats | 0 | 2 | Best request flow on both widths and the most legible window, but it looks like any Mac app page. |

## Decision

```
Decision: Which direction does the Ratametsuri product page take: D, E or F, or a merge?
Why now: The owner picks on a device next (design-sprint step 8); the page is the beta's only front door and the app screenshot is being reshot to drop into whichever is chosen.
Problem card: Who: a club setter with a Mac, opened from a chat link, on a phone or a Mac. What goes wrong: they cannot tell fast enough that it runs on their Mac and cannot leave an address. Already handled by: nothing (category pages sell a download). Smallest fix: window, requirement, field, privacy line, status on the first screen. Evidence: references.md category table; brief J1-J3 (assumptions A1-A3 are owner-only).
Today: Round 1 (a, b, c) shipped nothing; D24 sets Ratametsuri's own brand.

A. D Ratapainatus, like Stryds (own visual metaphor as the hero) and Halide (one display face)
   Shown: 1440 `design/shots/ratametsuri/d-fi-1440-light.png`; 390 `design/shots/ratametsuri/d-fi-390-light.png`.
   Closest reference: Stryds, `kit/references/awards/ios-app-landing.md#stryds`.
   Tradeoff: owns the product's own symbols (start, controls, finish) and has zero contrast failures / on a phone the field is at y 1437 and at 1440 the Mac requirement is below the fold.
B. E Rastilippu, like Stryds (saturated brand colour) and Stripe Dot Dev (display type)
   Shown: 1440 `design/shots/ratametsuri/e-fi-1440-light.png`; 390 `design/shots/ratametsuri/e-fi-390-light.png`.
   Closest reference: Halide, `kit/references/awards/ios-app-landing.md#halide`.
   Tradeoff: the loudest, most memorable shape, a flag every setter knows / orange is not the app's colour, the privacy line is hidden, and the window is a 7 px thumbnail on a phone.
C. F Ikkuna, like Glossar (plain system page, action on the first screen)
   Shown: 1440 `design/shots/ratametsuri/f-fi-1440-light.png`; 390 `design/shots/ratametsuri/f-fi-390-light.png`.
   Closest reference: Glossar, `kit/references/awards/ios-app-landing.md#glossar`.
   Tradeoff: request above the fold on both widths (field y 308 at 1440, y 495 at 390) and the largest legible window (1200 px) / the page is the Mac-app default and is specific only through the screenshot.

Recommendation: Merge, built on C. Take F's layout and request block (first screen: headline, status, requirement, field, privacy line; the window as the stage) and add D's identity to it: Barlow Semi Condensed for the wordmark and headline only (OFL, used once as in Halide), the start-triangle and control-circle language for the wordmark and feature row with the finish ring that fills on success, and D's non-hidden message slot behaviour (field stays visible, message beneath it). Drop E: its privacy-line bug, the orange stage and the 390 thumbnail outweigh the flag; if Jarkko loves the flag, keep it as the favicon and nothing else. Fix F's first screen so the whole purple course is above the 900 px fold at 1440.
Evidence: practitioner consensus: Final Cut Pro, Glossar and the category table in references.md all lead with the window or the action, and none hides the request (grade carried by references.md); measured: field position, window size, contrast and state heights were measured in headless Chrome, not eyeballed. Anecdote: specificity scores and the "looks like any Mac page" judgement are my opinion.
Strongest counter-argument: F's own critique says it is the category default, and a page that could be any Mac tool's does not "beat" the category at being memorable; a setter who sees D's course line or E's flag will remember it, and warm visitors (A1) reach the page from a person, so memorability may matter more than a field above the fold. D's rail also answers "what is this" in the app's own symbols, which F never does. The merge may end up with D's identity bolted onto F's layout and satisfy neither.
Undo: easy: a single static page in two languages; the choice commits only the page's look. The font choice (Barlow vs system) and the brand colour carry into the later own-domain and app-icon decisions, which stay open.
```

## Merge: what comes from where

| Part | From | Why |
|---|---|---|
| First-screen layout (headline left; requirement, lead, field, privacy line right; window under) and the mobile order (status, requirement, field, then the window) | F | Field at y 308 at 1440 and y 495 at 390; requirement before the field on both widths. |
| Window frame and size (plain, no bezel, 1200 px at 1440) and the phone course crop | F, with the crop re-tuned after the reshoot | Only direction where control numbers are readable at 1440 and 390. |
| Wordmark and headline type | D (Barlow Semi Condensed 600) | The one place a custom face earns its keep; F has none. |
| Start triangle in the wordmark, numbered control circles in the feature row, finish ring that fills on success | D | The only truly Ratametsuri graphics; keep them in the feature row, not as a rail through the text. |
| Request block: field stays visible, message beneath, typed address kept | D | E and F replace the form with text and leave a hole. |
| Not-live message with a large mailto link | E | E sets it at body size, D and F at 15 px muted. |
| Not taken | E's orange, diagonal stage and features band; D's page-length rail and 70 px left gutter | Loud and off-brand for the app; costs width on a phone. |

## Fixes the owner should require before the device session

1. E only if chosen: make `.beta-privacy` visible in the default state; the line is currently hidden.
2. All: put the error under the field (not under the button) on a phone, or visually bind it to the field.
3. All: re-check every crop and frame after the reshoot (D `PHONE_CROP`, F `transform-origin`, E needs a crop).
4. All: 5 to 10 s of a screen reader pass on the request block with the not-live state.

Note for the learning loop: concept.md claims were wrong in two places (D: requirement beside the field at 1440; E: privacy line visible by default). Builders should run a computed-style check on every message slot, not read the CSS.
