# Ratametsuri page: usability pass

Pipeline step 16. One person looked at every screen of the page's flow before the owner walks it.
This is the implementer's own pass, not an independent review. The independent reviews are
`../reviews/evidence/{4ea83fe1,f42b0d0f,eef7d25e}/`.

- Build: `BRIDGETOWN_ENV=production bundle exec rake deploy`, from branch `jarkko/ratametsuri-landing`
  at `2ddf3f2`, then again after the fixes below (`4323320`).
- Shots: `node design/shoot-ratametsuri-site.mjs` passes and writes 94 shots to
  `design/shots/ratametsuri-site/`. That folder is local only and git-ignored; rerun the script to
  get the shots again. The sign-up answers are intercepted fixtures, so nothing reaches
  join.koivupiilo.fi.
- Supplementary shots: the shoot's matrix leaves out English dark for the sign-up states and has
  large text only at 390 px. A one-off script, not kept, filled those gaps with the same fixtures.
  It also shot `/tietosuoja/`, `/en/privacy/`, `/tyot/` and `/en/work/`, and measured the gap
  between each feature's control circle and its heading.
- Every shot was looked at, not only machine-checked. Horizontal overflow
  (`scrollWidth − clientWidth`) is 0 in every shot.
- Date: 2026-11-24. Browser: Chrome. Safari and iOS are not covered here; the walkthrough runbook
  covers them on the owner's iPhone.

## Matrix

Legend:

- ✓ = looked at, no defect.
- ✓\* = looked at, a defect found there and fixed (see Findings).
- S = from the shoot; P = from the supplementary shots.

Sign-up states and the product page:

| State | 390 light fi | 390 light en | 390 dark fi | 390 dark en | 1440 light fi | 1440 light en | 1440 dark fi | 1440 dark en |
|---|---|---|---|---|---|---|---|---|
| Idle, full page | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S |
| Idle, first screen | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S | ✓ S |
| Sending ("Lähetetään…" / "Sending…") | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Check email (JS, address filled in) | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Invalid address | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Failed (server error) + email fallback | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Offline + email fallback | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Rate-limited + email fallback | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| No JS `#signup-check-email` | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| No JS `#signup-error` | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| No JS `#signup-try-later` | ✓ S | ✓ S | ✓ S | ✓ P | ✓ S | ✓ S | ✓ S | ✓ P |
| Large text (24 px default), full page | ✓\* S | ✓\* S | ✓\* S | ✓\* S | ✓ P | ✓ P | — | — |
| Long address, 16/24/32 px default text | ✓\* S | ✓\* S | ✓\* S | ✓\* S | — | — | — | — |
| Long address at 320 px, 16/24/32 px | ✓\* S | ✓\* S | ✓\* S | ✓\* S | — | — | — | — |
| Course motion, settled frame | ✓ S | — | — | — | ✓ S | — | — | — |
| Plain POST with and without JS | ✓ S | — | — | — | — | — | — | — |

At 1440 px, large text was measured in light only, for the circle-to-heading gap (16/24/32 px:
6.9 / 8.7 / 11.6 px, all clear). The rail's geometry doesn't depend on the theme.

Other pages, Ratametsuri parts only:

| Page and part | 390 light | 390 dark | 1440 light | 1440 dark |
|---|---|---|---|---|
| `/tietosuoja/`: the Ratametsuri section and the controller row | ✓\* P | ✓\* P | ✓ P | ✓ P |
| `/en/privacy/`: the Ratametsuri section and the controller row | ✓ P | ✓ P | ✓ P | ✓ P |
| `/tyot/`: the "Ratametsuri" link, "kehitteillä", "23.11.2026" | ✓ P | ✓ P | ✓ P | ✓ P |
| `/en/work/`: the "Ratametsuri" link, "in development", "23 Nov 2026" | ✓ P | ✓ P | ✓ P | ✓ P |

The work-list links point to `/ratametsuri/` and `/en/ratametsuri/`. On the work list the date sits
on the status line at 390 px and under the status word at 1440 px, the same as every other row.

## Findings

| # | Area | Evidence | Fix |
|---|---|---|---|
| U1 | Course rail at large text on a phone. Layout; fixed. | With a 24 or 32 px default text size on a phone, the page is under 19.5em wide and the rail's gutter shrinks to 1.4 × the symbol. A control placed right of the line (controls 1 and 3) then nearly touched its heading: a 1.1 px gap at 24 px and 1.5 px at 32 px, against 5.8 px at normal text. The circle read as part of the heading's first letter. | In that media query only, the controls swing half as far from the line (`--amp: .5` in `src/ratametsuri/style.css`). The gaps are now 4.2 px at 24 px and 5.6 px at 32 px. Normal text and desktop are unchanged, because `--amp` defaults to 1. Start and finish are on the line and don't move. The legs follow, because `course.js` draws them from the symbols' positions. |
| U2 | Privacy page controller row. Layout; fixed. Predates this PR. | On `/tietosuoja/` at 390 px, the controller row broke the business ID at its hyphen: "3458206-" on one line, "1, Kangasala" on the next. `/en/privacy/` wrapped before the ID by chance, so it didn't show there. | The ID is wrapped in `<span class="nowrap">` in `src/_partials/pages/_privacy.erb`, with a `.nowrap` rule in `frontend/styles/index.css`. Now "Y-tunnus" ends one line and "3458206-1, Kangasala" starts the next. |

Looked at, and not defects:

- **Long words at 32 px on a 320 px screen.** Long words break mid-word: the address, "Sähköpostiosoite" and the consent text. That is 10em of width, and the page falls back to `overflow-wrap: anywhere` on purpose, so nothing is clipped or scrolls sideways. Ordinary large text (24 px at 390 px) keeps whole words, except the long test address.
- **No legs without JS.** The course legs are drawn by `course.js`. Without JS the symbols stand alone. This is progressive enhancement.
- **Hover colour after the error.** In the invalid-address shots, the consent link sometimes shows its hover colour, because the layout moves under a still pointer. This comes from the screenshot setup, not from the page.
- **Accepted message at 1440 px.** The message starts about 8 px left of the consent text. Its check mark hangs in the gutter, the same as the error icon. This is intended.
- **Requirements at 1440 px.** The Finnish requirements wrap to their own row under the screenshot, and the English ones fit beside it. Both read cleanly.

Not covered: Safari and iOS, VoiceOver, a real email round trip, and pinch zoom on a touch screen.
These are in `walkthrough-runbook.md`, for the owner's own Mac and iPhone.

## After the fixes

- The deploy build passes. `node design/shoot-ratametsuri-site.mjs` passes again, with "all checks
  passed", and I looked at its large-text shots again.
- Rerunning the supplementary shots gives the gaps above, and the controller row now reads
  "Y-tunnus / 3458206-1, Kangasala".
- `node tools/ds/ds.mjs gate`: 0 errors.
- `node tools/ds/ds.mjs run visual` flagged only the four `/tietosuoja/` phone baselines, at
  0.107–0.113 %. Their only change is the controller row's new line break. `--update` also
  rewrote the eight `/en/privacy/` baselines; their changes stay under the limit (86–231 px) and are
  sub-pixel text rendering around the new span. Both sets were looked at before updating. None of
  the 16 Ratametsuri baselines changed, as expected, because U1 applies only with large text.
- The fixes are in commit `4323320`.
