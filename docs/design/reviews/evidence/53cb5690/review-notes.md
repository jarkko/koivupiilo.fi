# Focused independent review of merged PR 2

Reviewed HEAD `6fd0c43fa519b62f06c46e64af97da3342148409` with parents
`67cee17e136ae1de78b76ed0a9bf992f05e652ff` and
`b55b26ea47428dd8a7e973f193ec8fe249baba5d` (origin/main).
The review hash matches the dispatch:
`53cb569055d6f756d125409b5e461e1e930354093448d66984b2d0eced419096`.
The coordinator replaced the initial one-parent commit before review;
the replacement has the same tree. Reviewer: GPT/Codex, dispatch
`ctx_71e9723ef46a`, terminal `term_e8bf3845-ed9f-4dff-b8db-d5a9fa2713cb`.
Implementer: Claude. I neither planned nor implemented the product changes.

I read the design kit, model, house rules, termbase, strategy, brief,
references, platform/WCAG/interaction checklists and the canonical
ux-review, web-quality and quality-critique guides. I checked branch,
ownership and earlier review handoffs. No helper worker was used.
The task permits a focused review of the combined surfaces. W2/W4 and
unchanged W0/W1/W3/W5 continuations retain their earlier evidence; only
the fresh actions listed below are claimed as newly executed.

## Fresh checks

The production build succeeded. The fresh Chrome harness served only
the built `output/` tree. `checks.json` summarizes results and
`walk-report.json` records each matrix cell and executed link transition.
Bulk scripts and screenshots stay in ignored `design/shots/review-53cb5690/`.
The committed screenshot sheets include only cited review evidence.

I opened both home pages, products lists, Ratametsuri pages and policies
at 390/1440, light/dark, fi-FI/en-GB, with actual browser default text
preferences of 16/24 px. I drove home → Products → Ratametsuri → privacy
and the policy's language round trip with the rendered links, in both
languages throughout that matrix. Three-frame journey sheets show
before, about 300 ms after the click, and settled states for the changed
paths in both themes and widths at 24 px. Reports cover the other cells.
The focused review includes ordinary arrival motion in journeys and
reduced motion in the geometry matrix.

I checked 320 px reflow on the two products, two Ratametsuri and two
policy pages in both locales/themes/defaults. I drove Chrome's real
`chrome://settings/appearance` zoom selector through each offered step
from 100% to 200% on the four changed pages. The report records the
layout viewport and device-pixel ratio; this is browser page zoom,
not CSS zoom or a device-scale substitution. Each changed route has a
200% screenshot sheet, with both themes. The current policy's business
ID remains one text-range rectangle in the tested cells.

I intercepted every request outside the local server. The signup script
and token used local fixtures; no address was entered, no signup was
submitted and no live request reached join.koivupiilo.fi. The review
does not repeat the earlier form-response tests.

## Baseline approval

I opened the four `*-baselines.jpg` sheets. Each sheet labels and shows
all eight complete baseline images for one route, including each browser
locale separately. All 32 current files are approved individually in
`changed-baselines.json` and `baselines_approved`. Products gain the
underlined Ratametsuri link and its checked date. Policies gain main's
Ratametsuri section, lists, subheadings and whole controller ID inside
PR 2's chrome. I found no unexplained visual change.

The other 88 current baselines match exact SHA-256 values approved in
`405a839d` or `5b9534ad`. The manifest names the source review for each.
Sixteen earlier removed /tyot/ and /en/work/ baselines remain deleted and
retain their original approval/evidence. No baseline was changed here.

## Explicit reuse and findings

Reuse `405a839d` for unchanged company-page behavior, redirect/canonical/
hreflang/sitemap checks, keyboard paths, services/company continuations,
404 recovery and contrast, and the three inherited quality findings:

- **F1, major:** at `/`, `/en/`, `/tuotteet/`, `/en/products/`, 1440 px,
  light/dark, synthetic doubling of computed font sizes extends the
  status/date column beyond the viewport (39 px FI / 68 px EN in the
  earlier report). This remains extra text-only quality stress. The fresh
  native browser-zoom pass does not turn that earlier observation into
  a conformance failure. Use adaptive status columns or the stacked layout.
- **F2, minor:** at `/tuotteet/` and `/en/products/`, 1440 px, both themes,
  normal text, the anonymous separator/date-label node becomes a separate
  grid cell. The label starts below the lenticel while the date occupies
  another cell. Group the date metadata as one layout unit. The fresh
  baseline sheets confirm this inherited polish issue.
- **F6, inherited major:** at `/` and `/en/`, 390/1440, both themes,
  the first viewport still has no actual product screen (S-1). Ratametsuri
  now supplies real proof on its own hosted page; that improves the onward
  path but does not change the front viewport. Keep the front-page issue
  for the design milestone.

Reuse `5b9534ad` for unchanged Ratametsuri normal/large-text layout,
course motion, assets, metadata, request recovery and performance
assessment, with its explicit chain to eef7d25e/f42b0d0f. The later
consent change has its own PASS `d6a4e42c`; current Ratametsuri source,
styles and localized data match that reviewed consent commit exactly.
Reuse its unchecked/checked submission, adjacent error and keyboard
evidence. None of its editorial judgments are adopted in this review.
The fresh journey and page matrix check the current merged presentation.

No new layout or UX defect was found in the focused merge surfaces.
The critique retains the previous quality answers with a corrected
hosted-proof rationale; see `critique-assessment.md`.

## Limits and validation

Finnish and English copy quality are outside scope. I recorded existing
control labels only as execution evidence. No product source, baseline,
model or claim was edited. No commit, push, simulator, emulator or helper
agent was created. Physical devices, Safari, screen-reader output,
text-only zoom and an email round trip remain unclaimed. Real device
milestone checks remain with the owner's runbook.

The gate covers invariants and axe across all 15 routes. Fresh Lighthouse
and Linux visual-regression runs are outside this focused check; their
earlier evidence is reused only for unchanged behavior. `gate.json`
records the fresh gate, `gate-warnings.md` lists every warning, and
`review-verify.json` records local review verification. The coordinator
must commit the verdicts and cited evidence for git-tree CI to use them.
