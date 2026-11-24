# Recommendation: Ratametsuri landing direction

Independent critic's recommendation (decision format, scaled down). Evidence: `a/critique.md`, `b/critique.md`, `c/critique.md`, the shots in `design/shots/ratametsuri/`.

## Choice

**Direction A**, with B's one good idea borrowed in a small, controlled way.

| | A: screen first | B: course sheet | C: register row |
|---|---|---|---|
| Fits the page's job (see it, ask, one field) | best | middle | worst (ask is 1.5 screens down) |
| S-1: real screen leads | yes, by size | by order only | by order only |
| Specificity | low until the screenshot exists | highest | none |
| Consistency with the site | high | medium (second accent) | highest |
| Cost and risk | low | highest (drawing, density, a11y) | lowest |
| Contrast | all pass | all pass | all pass |

## Why A

- The page has one job: show what Ratametsuri is and take an address. A is the only one whose first viewport is the screen and whose phone layout puts the field above the fold.
- It satisfies S-1 and "Beat CSS Wizardry at proof above the fold" by design, and the slot is already the right ratio and radius for a real shot.
- It adds the least to the design system: no second accent, no new component family (the 56 px field and stage tint only).
- The weakness (nothing orienteering) is cured by the asset that has to come anyway: a real screenshot with a map, the purple course and the description sheet. B's invention would be duplicating what that screenshot shows.

## Strongest counter-argument

B is the only direction that could only be Ratametsuri, and the screenshot does not exist yet: today A is a large hatched rectangle, and a private beta of a niche tool is won by showing the audience that you speak orienteering. If the real screenshot slips, A ships as an empty page while B ships as something memorable. Also, a one-person studio's page has to be remembered, and A is the Apple default. This is a real risk. Answer: A's placeholder must not ship as the live state. If no screenshot, ship C's order with B's start/finish marks, not A.

## Fixes A needs before build

1. Put field and button above the fold at 1440x900 (cap window height around `min(70vh, 640px)`), and prove it with a re-shot.
2. Move the Mac and macOS 14 requirement next to the status line or above the field; the Mac-only fact must come before the ask.
3. Message slot between field and button; `aria-describedby` for message and privacy line; same for server error.
4. Align the window's right edge with the content (1240 vs 1384 today).
5. Success state: echo the address, add a check glyph, keep the privacy line; reserve one line, not three, for messages.
6. Non-breaking spaces in "IOF 2024", "XML 3.0", "PDF:nä".
7. Copy: drop the repeated name ("Mac-sovellus suunnistusratojen suunnitteluun."); replace "Ulos saat..." with "Radasta tulee PDF tulostettavaksi ja IOF XML 3.0 -tiedosto ajanotto-ohjelmalle." (check "tulospalveluohjelma" with Jarkko); "Mitä sillä voi jo tehdä" -> "Mitä Ratametsuri osaa jo"; error -> "Osoite ei näytä oikealta. Tarkista se."; success -> "Kiitos. Kutsu tulee sähköpostiisi, kun beta avautuu." Mirror in EN. Finnish goes through Opus plus the Finnish skills, not Codex.
8. Optional, cheap borrow from B: the purple finish double circle as a 20 px mark in the success state only (a deliberate use of the product colour on one element, which needs Jarkko's yes on introducing purple at all). Without it, skip.
9. The placeholder must not go live: gate on the real screenshot (or a named marked placeholder that Jarkko accepts for the beta window).

Needs Jarkko: whether to allow a product-page-only purple (B's idea, and fix 8). Everything else is a design call that does not need him.
