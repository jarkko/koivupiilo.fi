# Critique: Direction B, "The page is a course"

Independent critic; did not build it. Scores are estimates until someone uses it.

## Evidence

Judged: `b/concept.md`, `b/index.html`, `b/en.html` (source), `shared/site.css`,
`design/shots/ratametsuri/b-fi-1440-light.png`, `b-fi-1440-dark.png`,
`b-fi-390-light.png`, `b-fi-390-light-success.png`; copy from `copy.json`; against
`docs/design/content/ratametsuri.md`, `references.md`, `model.md` (S-1, D24-D26).
Not viewed individually: b dark 390, sending/error/not-live shots, EN shots.
Not verified: the leg-through-circle geometry at 2x, and the semantics of the grid (div rows, not a table, from source).

## Heuristics (0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 2 | Status "Kehitteillä. Beta on yksityinen." is row 7 of 8, after the features; the visitor reads what it does before learning it is unreleased. |
| 2 | Match with real world | 4 | The IOF description sheet, start triangle, control circle, finish double circle and overprint purple are the audience's own language. |
| 3 | User control | 3 | Same as the others. |
| 4 | Consistency | 2 | Introduces a second accent (purple) next to the site's rust lenticel in the nav, square corners vs the site's 2 px. Two accents in view. |
| 5 | Error prevention | 3 | Same form hardening as A and C. |
| 6 | Recognition | 3 | Label visible; but the heading "Mitä sillä voi jo tehdä" is a muted cell, not a heading, and reads as a note. |
| 7 | Flexibility | 2 | Nothing extra. |
| 8 | Minimal design | 2 | Highest density: 15 px weight 500 cells, eight ruled rows, the ask is the eighth. |
| 9 | Error recovery | 3 | Message slot sits inside the sheet cell; the button is full width under the field, message order not seen. |
| 10 | Help | 3 | Privacy under the field. |

## Specificity

Category default: a calm developer-tool landing. B is the only one that is not that. The sheet is built
from the product's own domain, and the page structure (start, controls, finish) is the same shape as the
thing the app makes. The four features are literally the cells of a description sheet. This could only
belong to Ratametsuri. The risk is that it is clever for a visitor who is not already an orienteer; a
course setter will smile, a club chair may see a table.

## The bar (references.md)

- Beat Panic at one sentence: the lede is in the sheet header, same sentence, same repeated name.
- Beat CSS Wizardry at proof above the fold: the window is first in DOM and top-left, but at 1440 it is only ~740x460 and the sheet (492 wide, 855 tall) outweighs it. S-1 says the real screen leads; here the sheet leads and the screen has 400 px of dead paper below it (`b-fi-1440-light.png`). On phone the screen precedes the name and is a dashed void.
- Beat everyone at expectations: status and requirements both sit inside the sheet in middle rows; status is not prominent.
- Apple Mac pages: not like them; that is a feature. Linear/Stripe: the density and ruled grid echo Linear's tables more than Apple, which suits a tool for specialists. The finish is hand-made and therefore at risk: the circles and leg need pixel-level care.
- Award library: not read for this review; not claimed.

## Contrast (WCAG 2.2, computed)

| Pair | Light | Dark | Need |
|---|---|---|---|
| button text #fff on purple #a626a4 / #121210 on #dc84da | 6.11 | 7.46 | 4.5 |
| purple leg and symbols on paper (UI) | 5.51 | 7.45 | 3.0 |
| purple focus ring on paper | 5.51 | 7.45 | 3.0 |
| purple focus ring vs purple button | ring sits 3 px off the button, on paper: ok | ok | 3.0 |
| error on paper | 6.34 | 8.61 | 4.5 |
| muted on paper (notes) | 6.22 | 7.09 | 4.5 |
| sheet rules: ink 1 px lines | high | high | 3.0 |

Passes everywhere. The purple is only used as UI or on a button, never body text, which is what keeps it safe. Dark purple (#dc84da) is a pink-lilac, a different hue feel; it reads fine but loses the overprint look.

## Priority issues (ranked)

1. **Second accent.** Rust lenticel in the nav and purple leg in the main sit side by side on the first screen. The site language is "paper, ink, rust". Fix: either make purple the product's accent and argue it as a deliberate exception on the product page only (record it as a decision in the model), or draw the leg in ink and keep purple to the finish and the button. Do not ship both unmanaged.
2. **Status buried.** Fix: put "Kehitteillä. Beta on yksityinen." directly under the lede in the first cell, and make it the same weight as the other facts. Move "Vaatii macOS..." to just before the request row.
3. **Window is subordinate and leaves a void.** At 1440 a ~740 px window sits beside a taller sheet with blank space below it. Fix: make the window sticky (`position: sticky; top: 1.5rem`) so it stays beside the sheet while reading, or let it span two columns above a shorter sheet. On phone, put the name and lede before the window.
4. **Density vs legibility.** 15 px weight 500 text in cells, features at the same size as the status note. Fix: raise cells to 16 px and weight 450, give each feature a number in its circle (1-4, like real controls) and let the first line be the verb.
5. **"Mitä sillä voi jo tehdä" is not a heading.** It is a muted cell (`b-note`). Fix: a real h2 with the label style, or drop the row and let the circles speak.
6. **Dead air above the privacy line** inside the finish cell (about 80 px, reserved slot). Fix: reserve one line.
7. **Check the finish at 2x.** IOF drawing rules: the leg stops at the circle edge, never runs through it, and "circle and leg gaps" is a built feature of the app. Make the drawing correct or the target audience will notice.
8. **Accessibility of the grid.** If the sheet is a set of divs, keep it a list or a table with proper roles; a screen reader should hear four features, not 24 cells.

## Copy (Finnish is the source)

- **Name repeated** in the header cell: H1 "Ratametsuri" then "Ratametsuri on Mac-sovellus...". Fix: "Mac-sovellus suunnistusratojen suunnitteluun."
- **"Ulos saat radan PDF:nä..."** is a calque of "Out comes". Native: "Radasta tulee PDF tulostettavaksi ja IOF XML 3.0 -tiedosto ajanotto-ohjelmalle." (and check "ajanotto-ohjelma" vs "tulospalveluohjelma"). Worse here because the cell is narrow and the line breaks at "IOF XML / 3.0".
- "Mitä sillä voi jo tehdä": referent unclear; "Mitä Ratametsuri osaa jo".
- Error "Tämä ei ole sähköpostiosoite. Tarkista kirjoitusasu." stiff: "Osoite ei näytä oikealta. Tarkista se."
- Success "Kiitos. Lähetämme sähköpostia, kun beta avautuu." vague: "Kiitos. Kutsu tulee sähköpostiisi, kun beta avautuu."
- "Rastimääritteet IOF 2024 -symboleilla päivittyvät sitä mukaa, kun rataa muokkaat." is native but long for a cell; "Rastimääritteet päivittyvät, kun muokkaat rataa (IOF 2024 -symbolit)."

## Verdict

The only direction with a real idea. Also the one with the most risk: second accent, buried status, subordinate screen. Strong enough to be worth fixing, but only if the owner accepts a product-page-only purple.
