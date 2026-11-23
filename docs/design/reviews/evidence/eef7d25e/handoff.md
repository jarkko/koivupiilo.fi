# PR #3 independent UX defect re-review

**PASS** at HEAD `7271d7c2ce2b0e2b4022a7e3c5d63cb43fc9a825`.

Verdict: `.ds/reviews/eef7d25e8c6941de8e882619974b890fb73b53ec535d060b77af029feab7f054.defect.json`.
Independent reviewer: GPT/Codex; implementer: Claude. No source changes or commits.

## Findings

No blocking or non-blocking findings. **F8 is fixed:** the status now includes the verified checked date in both languages, sourced from the same `work.yml` metadata as the product list. Date contrast is 6.680:1 light and 7.833:1 dark.

- `matrix-390-font16.jpg` shows the checked dates and intentional shallower map crop. Both email fields fit completely at 390×844: bottom 837.766 px FI, 814.578 px EN.
- `matrix-1440-font16.jpg` shows the desktop hierarchy and field/button row: bottom 883.156 px FI, 889.266 px EN, within 900 px.
- `matrix-390-font24.jpg`, `matrix-1440-font24.jpg`, `zoom200-*.jpg`, and `spacing320-*.jpg` show scaling and reflow without loss.
- `fi-390-invalid-strip.jpg`, `en-390-invalid-strip.jpg`, `fi-1440-invalid-strip.jpg`, and `en-1440-invalid-strip.jpg` preserve before/about-300-ms/settled error states.

## Verification and reuse

Production frontend and Bridgetown builds passed. Fresh repository gate passed with zero errors and **42 warnings**, each preserved in `review-notes.md`: 19 decision Supersedes fields, one missing test-results configuration, one accepted retrofit, 15 allowed skip-link target warnings, six existing 404 contrast uncertainties.

Fresh visual comparison passed with no findings. **All 48 PR baseline files are individually approved by SHA-256**, including the 32 changed since the previous review and 16 unchanged privacy baselines. Each approval in the verdict cites its baseline screenshot; `baseline-manifest.json` records the reason for each one.

Fresh affected portions of W0/W1/W3: 16 layout and intercepted invalid-email cells at 390/1440, light/dark, normal/large defaults; eight explicit en-GB browser-locale checks; 12 no-JS fragment cells; 24 real native Chrome zoom cells at every offered 100–200% step; four 320 px increased-spacing cells. No overflow, clipping, bad validation focus or axe violations was found. No live signup was sent.

**Explicit evidence reuse:** `docs/design/reviews/evidence/f42b0d0f/` covers unchanged F1–F7 fixes, W5/company and privacy navigation, full success/server/rate-limit/offline/retry/native POST matrix, long-address wrapping, normal/reduced motion, keyboard, and Lighthouse. This diff changes no form/course script, privacy page, image payload or navigation; the fresh review covers date/crop/layout consequences. This is not a fresh full re-walk. Finnish wording/tone, fixed consent wording, archived prototypes, screenshot inspector and allowed skip-link warnings are excluded.

Chrome is the tested browser; native text-only zoom, Safari/iOS and speech output remain unclaimed. No emulator or simulator was started.

## Remaining workflow work

`ds review verify` accepts the verdict schema, independence and all baseline approvals. It exits 1 solely because the separate current-hash quality critique is missing; it also reports one uncommitted-input and 29 uncommitted-evidence warnings, expected under the task's no-commit instruction. Exact output is in `review-verify.json`.

The coordinator must obtain the separate quality critique and commit the accepted verdict, steps and cited evidence before CI. The defect reviewer must remain the author of this verdict. No further UX defect fix is required by this review.

## Artifacts

The verdict above; appended `.ds/reviews/steps/W0.md`, `W1.md`, `W3.md`; this evidence directory, inventoried in `artifacts.json`. Only cited images plus JSON/Markdown reports are included here. Bulk captures, scripts and logs remain in gitignored `design/shots/ux-eef7d25e/`.
