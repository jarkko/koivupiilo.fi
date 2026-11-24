# PR #3 focused review handoff

**Defect PASS; quality critique re-bound unchanged.**
HEAD `98ca22835021516aff2d922fc5b9688e2c8e9194`; UI hash
`5b9534ad287eb70ffd653ad37f70131bc7c209b5cc8dd4620911c58903657722`.
Independent GPT/Codex reviewer, Claude implementer; dispatch `ctx_af29b57cc1fa`.

## Result

U1 and U2 are verified with fresh evidence: both languages/locales,
light/dark, 390/1440, actual browser defaults 16/24/32 px; eight large-text
phone invalid-response frame strips; 48 native Chrome zoom cells across
100–200%; language/privacy paths; ordinary and reduced course motion.
Heading clearance improves from 1.14 to 4.17 px at default 24, and from
1.53 to 5.56 px at default 32. The business ID stays whole. The required
matrix has no overflow, clipping or axe violation. No regression from
`4323320` was found. Every one of the twelve changed baselines is approved
explicitly; all 48 current PR baselines are approved by SHA-256.

The eef7d25e/f42b0d0f evidence is explicitly reused for unaffected behavior,
assets, metadata, requests, recovery, keyboard, full referral/company
continuations, performance and reference comparisons. All five critique
answers and their grades/counter-argument remain unchanged; the JSON and
`critique-assessment.md` explain why they apply at the new hash. O-r1–O-r4
and S-r1 have one re-binding note, with no duplicate opportunities.

The initial broader capture harness exited 1. Its extra observations are
preserved and diagnosed in `review-notes.md` and `motion-check.json`:
the existing site footer overflows 12 px at combined 320 px/32 px default
text, and exact decorative leg endpoints can depend on font/arrival timing
with both old and new CSS. Sequential fixed-viewport scrolling reveals all
symbols and four legs. These are not U1/U2 regressions or failures of the
requested matrix; retain the footer observation for later quality work.

## Checks and warnings

- Production build: exit 0.
- `node tools/ds/ds.mjs gate --json`: exit 0, zero errors, 42 existing
  warnings: 19 missing decision Supersedes fields, one missing model-test
  results setting, one accepted retrofit notice, 15 allowed skip-link
  target warnings and six existing 404 contrast uncertainties. **Every
  warning is listed individually in [gate-warnings.md](gate-warnings.md).**
- Fresh `run visual --json`: exit 0, zero findings; see `visual.json`.
- Final `review verify --json`: exit 0, zero errors; 39 expected warnings,
  comprising two `review.uncommitted-input` and 37
  `review.uncommitted-evidence`; see `review-verify.json`. All are due to
  the explicit no-commit instruction.
- Changed documentation terms check and `git diff --check`: exit 0.
- Signup safety: eight locally intercepted invalid `a@b` submissions;
  zero live POSTs or emails. No valid address was submitted.

No product source or baseline was edited. No commit, emulator or simulator
was created. Finnish wording/tone and fixed consent text were not judged.
Safari/iOS, physical devices, speech output, text-only zoom and an actual
email round trip remain unclaimed and retain the owner's runbook scope.

## Artifacts and exact next action

- `.ds/reviews/5b9534ad287eb70ffd653ad37f70131bc7c209b5cc8dd4620911c58903657722.defect.json`
- `.ds/reviews/5b9534ad287eb70ffd653ad37f70131bc7c209b5cc8dd4620911c58903657722.critique.json`
- `.ds/reviews/steps/W0.md`, `W3.md`, `W5.md` appended with executed steps.
- `docs/design/opportunity-tree.md`: one re-binding note only.
- This evidence directory: only cited screenshot sheets and reports,
  inventoried individually in [artifacts.json](artifacts.json).
- Bulk captures, scripts and full build log remain gitignored under
  `design/shots/review-5b9534ad/`.

The coordinator should commit the accepted verdicts, steps, tree note and
cited evidence so git-tree CI can read them, then continue the existing
owner walkthrough/PR gates. No product fix is requested by this focused
review. No release or owner-device pass is claimed.
