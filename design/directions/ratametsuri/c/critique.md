# Critique: Direction C, "One more row in the register"

Independent critic; did not build it. Scores are estimates until someone uses it.

## Evidence

Judged: `c/concept.md`, `c/index.html`, `c/en.html` (source), `shared/site.css`,
`design/shots/ratametsuri/c-fi-1440-light.png`, `c-fi-390-light.png`,
`c-fi-1440-light-not-live.png`, `c-fi-390-light-error-server.png`; copy from `copy.json`; against
`docs/design/content/ratametsuri.md`, `references.md`, `model.md` (S-1, D24-D26).
Not viewed individually: dark shots (same tokens as site, no new pairs except error), sending, EN.

## Heuristics (0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 3 | Status line sits under the lede. |
| 2 | Match with real world | 2 | Plain and correct; nothing of the domain. |
| 3 | User control | 3 | |
| 4 | Consistency | 4 | Reuses `.intro/.row/.plain-list` unchanged; the page is a sibling of /tyot/. |
| 5 | Error prevention | 3 | Same hardening. |
| 6 | Recognition | 4 | Row labels left, label above field. |
| 7 | Flexibility | 2 | |
| 8 | Minimal design | 3 | Few blocks but the ask is last and low; some elements (lede + large name) repeat each other. |
| 9 | Error recovery | 3 | Message below the button; the not-live state is a good, plain fallback (`c-fi-1440-light-not-live.png`). |
| 10 | Help | 3 | |

## Specificity

Category default: the studio-site product entry (a project page in a portfolio). C is that by design:
it is the same rhythm as /tyot/ and could be any product of Koivupiilo's by swapping the words. What
could only belong to this one: nothing. It is the right answer to "does this look like one site", the
wrong answer to "does this show what it is".

## The bar (references.md)

- Beat Panic at one sentence: same sentence, name repeated.
- Beat CSS Wizardry at proof above the fold: weakest. The window is capped at 44 rem (~704x440), starts at y~480 on 1440x900 and is a quiet dotted box. S-1 (a real screen, not decoration, leads) is satisfied in order but not in weight; the screen reads as an illustration of a list.
- Beat everyone at expectations: requirements are under the features, above the request, a good order. Status is early.
- Beat Clearleft at the named human: the footer address is there; fine.
- Apple Mac pages: far from them. Linear/Stripe: matches their restraint, not their conviction.
- Award library: not read for this review; not claimed.

## Contrast (WCAG 2.2, computed)

| Pair | Light | Dark | Need |
|---|---|---|---|
| muted on paper (byline, requirements, privacy line) | 6.22 | 7.09 | 4.5 |
| error on paper | 6.34 | 8.61 | 4.5 |
| error on field (#fff / dark field) | 7.03 | high | 4.5 |
| focus ring accent on paper | 5.35 | 7.21 | 3.0 |
| rule (#d9d5cc) on paper | 1.32 | n/a | decorative separators only; ok |
| ink fill button, paper text | high | high | 4.5 |

All pass. The only new colour is the error red.

## Priority issues (ranked)

1. **The ask is far down and the screen is timid.** On 1440x900 the form is at ~y1400, 1.5 screens down; on phone at ~y1130 of 844. This is the page's one job (D24, D25). Fix: put the request row directly under the intro (above the window), or give the intro a "Pyydä betakutsu" jump link and repeat a compact field in the header cell; the window then follows as proof.
2. **Window too small and too quiet to count as proof.** Fix: raise the cap to the full body column (about 64 rem) or make it break the row grid like a figure; hatch contrast is fine, the border is the weakest part (1 px dotted).
3. **Dead half of the page.** Body measure is 36 rem; at 1440 the right 450 px of every row is empty (`c-fi-1440-light.png`). Fix: place the four features in a two-column grid, or put the window to the right of the intro.
4. **Error message sits under the button** on phone (`c-fi-390-light-error-server.png`), not under the field. Fix: message between field and button, `aria-describedby`.
5. **Large display title plus lede repeat each other** (same site pattern but here the name is in both). See copy.
6. **No orienteering signal at all.** Optional fix: one rust lenticel-style status dot (the site's own status mark, `.status--off`) before "Kehitteillä", which is on-brand and costs nothing.

## Copy (Finnish is the source)

- **Name repeated:** "Ratametsuri" display, then "Ratametsuri on Mac-sovellus suunnistusratojen suunnitteluun." Fix: "Mac-sovellus suunnistusratojen suunnitteluun."
- **"Ulos saat radan PDF:nä..."** calque of "Out comes". Native: "Radasta tulee PDF tulostettavaksi ja IOF XML 3.0 -tiedosto ajanotto-ohjelmalle." Check "ajanotto-ohjelma" vs "tulospalveluohjelma" (fact log: MeOS only narrowly tested).
- "Mitä sillä voi jo tehdä": unclear "sillä" -> "Mitä Ratametsuri osaa jo".
- Row label "Pyydä betakutsu" next to a lead "Jätä sähköpostiosoitteesi, niin lähetämme kutsun..." is fine; the not-live copy "Pyyntölomake ei ole vielä käytössä. Kirjoita osoitteeseen ... ja laita otsikoksi ”Ratametsuri beta”." is native and clear, the best of the state copy.
- Error "Tämä ei ole sähköpostiosoite. Tarkista kirjoitusasu." -> "Osoite ei näytä oikealta. Tarkista se." Success "Lähetämme sähköpostia" -> "Kutsu tulee sähköpostiisi, kun beta avautuu."

## Verdict

Safest and cheapest. Right for consistency, wrong for the one job: the ask is buried and the screen is a footnote. Would be the fallback if A and B fail.
