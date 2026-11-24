# Critique: Direction A, "The screen is the pitch"

Independent critic; did not build it. Scores are estimates until someone uses it.

## Evidence

Judged: `a/concept.md`, `a/index.html`, `a/en.html` (source), `shared/site.css`,
`design/shots/ratametsuri/a-fi-1440-light.png`, `a-fi-1440-dark.png`,
`a-fi-390-light.png`, `a-fi-390-dark.png`, `a-fi-390-light-error-validation.png`,
`a-fi-1440-light-success.png`; copy from `copy.json`. Against
`docs/design/content/ratametsuri.md`, `docs/design/references.md`, `docs/design/model.md` (S-1, D24-D26).
Not viewed individually: the sending, not-live and error-server shots for A (same layout as the ones viewed), EN shots.

## Heuristics (0-4, estimates)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 3 | "Kehitteillä. Beta on yksityinen." sits next to the lede, early. Sending dot and result are in a reserved slot. Success has no echo of the address. |
| 2 | Match with real world | 3 | Mac window frame, IOF/PDF terms are right for the audience. |
| 3 | User control | 3 | One field, one button; nothing to undo. |
| 4 | Consistency | 3 | Site tokens only; the 56 px field/10 px radius is new but consistent within the page. |
| 5 | Error prevention | 3 | `type=email`, `autocomplete`, `inputmode`, honeypot, 16 px input (no iOS zoom). |
| 6 | Recognition | 4 | Label above the field, visible, never a placeholder. |
| 7 | Flexibility | 2 | No second route in the main state except the not-live mail fallback. Fine for one field. |
| 8 | Minimal design | 4 | About five blocks. |
| 9 | Error recovery | 2 | On phone the error text sits under the button, not under the field (see issue 3). Server error gives a mail address as exit, good. |
| 10 | Help | 3 | Privacy line and link directly under the field. |

## Specificity

Category default: the Mac-app marketing page (big window screenshot, one sentence, one CTA), i.e.
Apple's own pages minus the gradients. A is that, done in Koivupiilo's quiet language.
What could only be this product: nothing visual today. The name, the word "rasti" and the
placeholder are the only signals; no orienteering shape, colour or symbol. It will be
distinctive only through the real screenshot (map, purple overprint course, description sheet).
That is a legitimate bet (S-1: "the work is real") but it makes A depend on an asset that does not exist yet.

## The bar (references.md)

- Beat Panic at the one-sentence definition: yes, one sentence, no adjectives. Falls short only on the name repeated (see copy).
- Beat CSS Wizardry at proof above the fold: A is the only direction where proof owns the first viewport, on paper. In practice the slot is a hatched void until the screenshot lands; judged as a slot it is the right size and ratio (16:10, 12 px radius, drop-in).
- Beat everyone at expectations: requirements line is under the features, below the request. A Mac-only app should tell the visitor "macOS 14+" before they give an email; here a visitor on Windows has already scrolled past the form on phone. See issue 2.
- Apple Mac app pages: A matches the structure. It lacks the product-level finish (window chrome, shadow, a real shot). Linear/Stripe: the request block is plainer than theirs but honest and calm; that is correct for a private beta.
- Award library: no web/app-landing library entries were checked for this review (not read); not claimed.

## Contrast (WCAG 2.2, computed)

| Pair | Light | Dark | Need |
|---|---|---|---|
| ink on stage (#ebe8e0 / #1b1b18) | 14.93 | n/a (ink #eeebe4 on #1b1b18 ~ 14) | 4.5 |
| muted on stage | 5.63 | 6.53 | 4.5 |
| error on paper | 6.34 | 8.61 | 4.5 |
| error on field (#fff / #1b1b18) | 7.03 | 7.93 | 4.5 |
| focus ring (accent) on paper / field | 5.35 / 5.93 | 7.21 / 6.64 | 3.0 |
| field border ink on field | 18.28 | high | 3.0 |
| button: paper on ink | high | high | 4.5 |

All pass. Dark: stage #1b1b18 vs paper #121210 is only a faint step; the dashed muted border carries the shape, which is fine.

## Priority issues (ranked)

1. **The request is below the fold on desktop.** At 1440x900 the placeholder ends at y~920 and the field is at ~1030; the concept says it starts "right under it". On phone it works (field at ~640 of 844). Fix: cap the window height at about `min(70vh, 640px)` or put the heading/field row beside the name block, so field and button are visible at 1440x900 without scrolling. Re-shoot at 1440x900 to prove it.
2. **Requirements and the Mac-only fact come after the ask.** Fix: move "Vaatii macOS 14 Sonoman tai uudemman" into the status line under the lede ("Mac-sovellus, macOS 14 tai uudempi. Kehitteillä, beta on yksityinen.") or directly above the field; keep the features below.
3. **Error/status message is detached from the field on phone.** Order is field, button, message (`a-fi-390-light-error-validation.png`). The user's eye is on the field. Fix: render the message between field and button (reserved slot), and set `aria-describedby` to it as well as the privacy line. Same for server error.
4. **Right edge misaligned.** The window is 1120 wide and ends at x=1240; the lede, button and footer end at 1384 (`a-fi-1440-light.png`). Fix: make the window span the full content width, or deliberately inset both edges; right now it looks like an error.
5. **Success state is thin.** Text only, with a big blank where the form was (`a-fi-1440-light-success.png`). Fix: echo the address ("Kutsu tulee osoitteeseen x@y.fi"), add a check mark glyph, and keep the privacy line.
6. **Wasted vertical gap** between field and privacy line (~60 px) at desktop for the reserved message slot. Fix: reserve one line (about 1.5rem), not three.
7. **Feature text at "large" size in four narrow columns breaks "IOF / 2024 / XML / 3.0"** across lines (`a-fi-1440-light.png`). Fix: non-breaking spaces in "IOF 2024", "XML 3.0", "PDF:nä".

## Copy (Finnish is the source)

- **Name repeated:** H1 "Ratametsuri" immediately followed by "Ratametsuri on Mac-sovellus suunnistusratojen suunnitteluun." Fix: lede "Mac-sovellus suunnistusratojen suunnitteluun." (EN: "A Mac app for planning orienteering courses."). With the name beside it on one line (A's layout) the repetition is most visible.
- **"Ulos saat radan PDF:nä..."** is a calque of "Out comes". Native: "Radasta tulee PDF tulostettavaksi ja IOF XML 3.0 -tiedosto ajanotto-ohjelmalle." or "Valmiin radan voi viedä PDF:nä (tulostus) ja IOF XML 3.0 -tiedostona (ajanotto-ohjelma)."
- "ajanotto-ohjelma": orienteers say "tulospalveluohjelma" (MeOS is the one named in the fact log, only narrowly tested); check with Jarkko before stating more than "tulospalveluohjelma".
- "Mitä sillä voi jo tehdä": "sillä" has no clear referent once the name is not in the sentence above. Prefer "Mitä Ratametsuri osaa jo" or "Jo valmiina".
- "Tämä ei ole sähköpostiosoite. Tarkista kirjoitusasu." is stiff and blames. "Osoite ei näytä oikealta. Tarkista se." reads natively.
- "Kiitos. Lähetämme sähköpostia, kun beta avautuu." is vague ("sähköpostia"). "Kiitos. Kutsu tulee sähköpostiisi, kun beta avautuu."
- Good: "Kartaksi kelpaa...", "Radat jakavat rastit. Kun siirrät rastia, se siirtyy kaikilla radoilla." are native. Quotes ”...” are correct Finnish.

## Verdict

Best first impression and best conversion on phone, but empty without the real screenshot and with no orienteering identity of its own. Needs issues 1-3 before build.
