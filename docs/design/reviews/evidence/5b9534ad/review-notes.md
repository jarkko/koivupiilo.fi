# Focused independent review, PR #3

**PASS:** both targeted fixes verified; no attributable regression found.
Fresh build, gate, visual and final review verification all exit 0;
`checks.json`, `gate-warnings.md` and `review-verify.json` retain their
results and every warning. See `handoff.md` for the artifact list and next action.

Reviewed HEAD: `98ca22835021516aff2d922fc5b9688e2c8e9194`.
UI hash: `5b9534ad287eb70ffd653ad37f70131bc7c209b5cc8dd4620911c58903657722`.
Reviewer: GPT/Codex, dispatch `ctx_af29b57cc1fa`, terminal
`term_0ca2b7a1-ced1-437d-9877-475d8ee0c4f1`; implementer: Claude.
This fresh context neither planned nor implemented the change.

## Scope and fresh evidence

The only product-source changes since the passing eef7d25e review are the
three files in `4323320`: course-symbol horizontal positioning, the
privacy controller's ID span, and its `.nowrap` rule. No existing `.nowrap`
consumer or `--amp` consumer outside these changes was found. The new
position formula reduces algebraically to the old formula when amplitude
is 1; the smaller amplitude is confined to the existing 19.5em media query.

Production build `BRIDGETOWN_ENV=production bundle exec rake deploy`
completed with exit 0. Scripts and bulk captures stay in ignored
`design/shots/review-5b9534ad/`. `walk-report.json` contains the executed
geometry, axe, browser locale, invalid-response, navigation and native
zoom records; contact sheets contain only screenshots cited by the review.
All requests to the signup origin were intercepted locally. The eight
submitted addresses were invalid `a@b`; no live POST or email was sent.
Consent wording was neither changed nor judged. Finnish wording and tone
are outside this review.

Fresh matrix: 24 required landing cells and 24 privacy cells at
390/1440, 16/24/32 px actual Chrome default-font preferences, Finnish
`fi-FI` and English `en-GB`, light/dark. Four additional 320/32 cells per
surface stress the layout beyond the requested matrix. Fifty-six fresh
axe runs report no violations. The required matrix has no horizontal
overflow, clipped text or offscreen text. All landing text boxes are
identical with the old and new positioning rules. At normal default text
and all desktop defaults the symbol boxes are identical too.

- **U1 verified:** at 390/24, controls 1 and 3 have 4.171875 px heading
  clearance instead of 1.140625 px; at 390/32, 5.5625 px instead of
  1.53125 px, identically in both languages/themes. Control 2 retains
  10.21875/13.625 px respectively. Start/finish stay on their original
  line. See `rail-390-font24.jpg`, `rail-390-font32.jpg`, the normal and
  desktop rail sheets, and `walk-report.json`'s `beforeCSS` comparisons.
- **U2 verified:** the exact ID `3458206-1` occupies one text-range
  rectangle with `white-space: nowrap` in every privacy cell. At 390 px
  Finnish normal text wraps before the complete ID. English and 1440 px
  remain legible, as do 24/32 px defaults. See
  `privacy-controller-390.jpg` and `privacy-controller-1440.jpg`.
- **Validation continuity:** eight invalid-response frame strips at
  390/24 and 390/32, both languages/themes, show the same entered address
  and checked consent before, approximately 300 ms into the response,
  and after. The field receives focus and its error stays adjacent. The
  button and all content remain reachable by scrolling.
- **Native resize text:** Chrome's actual global zoom control was driven
  through 100/110/125/150/175/200%, for both surfaces, languages and
  themes (48 cells). No overflow, clipping or loss appeared. Direct CDP
  viewport captures at 200% avoid Playwright's zoom screenshot artifact;
  see `zoom200-landing.jpg` and `zoom200-privacy.jpg`.
- **Paths:** the rendered `In English` / `Suomeksi` links preserve the
  product place. The consent privacy links open the corresponding policy
  and its controller details at each tested default size. W1's referral
  and W5's company-page continuation reuse the prior evidence below.

## Baselines

`baseline-manifest.json` lists all 48 PR baselines, SHA-256 and an explicit
approve verdict per file. All twelve baselines changed by `4323320` are
approved individually: the four Finnish phone files contain the intended
whole-ID line break; the eight English phone/desktop files contain only
86–231 changed raster pixels local to controller text. Every changed pixel
is in the reported controller bounding box. `baseline-changes.jpg` shows
before, current and absolute difference for each file, including separately
named browser-locale duplicates. The other 36 baseline bytes are unchanged
from eef7d25e and retain their approval evidence. No Ratametsuri baseline
changed: U1 is active only at large default text, outside those baselines.

## Explicit reuse

This is a focused diff review, not a fresh full-product review.

- Reuse `../eef7d25e/` defect and critique evidence for unchanged
  status/date, screenshot crop and assets, normal first-screen hierarchy,
  field/button placement, normal-state keyboard/accessibility and the
  previously approved direction D. Fresh comparisons confirm that U1
  moves symbols only, without moving text or changing normal geometry.
- Reuse `../f42b0d0f/fix-verification.json`, `walk-report.json`,
  `paths-report.json`, `native-post-report.json` and `perf-summary.json`
  for unchanged F1–F7 fixes, referral/company navigation, complete
  accepted/server/rate-limit/offline/retry/native POST/no-JS behavior,
  long-address wrapping, keyboard, prior reduced-motion behavior and
  Lighthouse. No form script, response contract, navigation, content,
  image payload or font payload changed. Reused LCP/CLS measurements are
  earlier lab measurements, not fresh results.
- The fixed consent contract, claims and language editorial approvals
  retain their previous owners. No new claim or model decision is made.

## Diagnostics outside the requested matrix

The initial capture harness exited 1: it treated four optional combined
320 px/32 px privacy overflows and six motion endpoint/hidden-symbol
observations as failures. The raw observations remain in
`walk-report.json`; they are not silently relabelled as successful checks.
`motion-check.json` records the narrower follow-up that establishes scope:

- At 320 px with a 32 px browser default, the site's existing footer fact
  grid extends to x=332 (12 px overflow) in both languages. Restoring the
  previous ID whitespace produces the same overflow and the same offending
  footer boxes. The controller ID itself stays whole and inside its column.
  This extra combined stress is outside the requested privacy widths and
  is not a new U2 regression. It does not invalidate the passing native
  100–200% resize-text or ordinary 320 px reflow evidence. The coordinator
  should retain this as a future footer quality observation.
- Large element screenshots can scroll/resize the capture viewport while
  course symbols are awaiting their scroll arrival. Sequentially scrolling
  each control and finish with fixed viewport screenshots yields zero
  hidden symbols and all four legs visible, in both languages/themes.
  Exact leg-endpoint geometry is timing-sensitive: a font/layout callback
  can measure symbols during their existing `scale(.55)` arrival, yielding
  about 10.8–13.3 px larger endpoint residuals after settling. This occurs
  with both the old stylesheet and current stylesheet; current English
  dark and old Finnish/light/dark and English/light also demonstrate the
  sub-0.005 px case. It is not caused by the amplitude edit, and the
  unchanged course script is not repaired in this focused review.
  `motion-before-current.jpg` shows the current clearance improvement
  alongside the same earlier course treatment; four `motion-*-font32.jpg`
  strips record fixed-viewport arrivals. Reduced-motion geometry has
  sub-0.005 px residuals throughout the fresh main matrix.

Neither extra observation changes the targeted U1/U2 approval. No new
blocking, major or minor regression was established in the requested
matrix. They are recorded here for an honest boundary on the focused pass.

Chrome is the tested browser. Safari/iOS, physical phone use, speech output
and native text-only zoom remain unclaimed. No emulator or simulator was
started. The no-commit instruction overrides the guides' commit step:
the coordinator must commit the verdicts, steps and cited evidence before
`ds ci` can see them.
