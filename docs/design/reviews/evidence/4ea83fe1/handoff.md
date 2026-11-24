# PR #3 independent UX defect review

Verdict: **FAIL** at `5501c2a6c79f1daaa4a7a3b95e78fae0a5f4101b`.

Artifact: `.ds/reviews/4ea83fe1fa66409c92a3c6ee02d10421ebad094c1225402771861e505b231dd7.defect.json`.
Reviewer: GPT/Codex; implementer: Claude; independent review requirement met.
No source files were edited and no commit was made.

## Blocking findings, ranked

1. **F1 — Confirmation breaks reflow (WCAG 1.4.10).** A 57-character email expands a 320/390 px page to 539 px with normal text and 783 px with large text; the address and following instruction extend off-screen. It affects both languages/themes. Fix the message grid's minimum sizing and break the interpolated address safely. Evidence: `shots/long-confirmation-unbroken-en-320-light-font16.jpg`, `shots/long-confirmation-unbroken-fi-390-dark-font24.jpg`, `long-confirmation-report.json` (32 cells; 24 overflow).
2. **F2 — No incoming product link (D24).** Ratametsuri is plain text on both products lists, with no link to either new page. Evidence: `shots/work-en-390-light-missing-link.jpg`, `shots/work-fi-1440-dark-missing-link.jpg`, `navigation-report.json` (all eight product-list walks have zero Ratametsuri links).
3. **F3 — Visual baselines fail.** Sixteen missing product baselines; sixteen privacy baseline size changes. Evidence: `visual.json`, `visual-evidence/ratametsuri-phone-light-fi-FI.png`, `visual-evidence/tietosuoja-phone-light-fi-FI.png`. No baselines approved.
4. **F4 — Performance budget fails.** Both product pages have median LCP 3002 ms against a 2000 ms budget, from three runs each. Evidence: `perf.json`, `lighthouse/ratametsuri-run-1.html`, `lighthouse/en-ratametsuri-run-1.html`. Lighthouse identifies the introductory status text as the LCP element; investigate its rendering delay.

## Non-blocking findings

- **F5, major:** At 390×844 and large default text, invalid-email focus returns to the field but its explanation is below the viewport, after the consent and button. Move field validation next to the input, preserving the consent label. Evidence: `shots/en-390-dark-font24-invalid-after.jpg`, `shots/fi-390-light-font24-invalid-after.jpg`, `final-report.json`.
- **F6, major:** Offline/server failure offers retry alone, missing brief J4's alternate way to request an invite. Add a direct fallback contact action in those states. Evidence: `shots/en-390-light-font16-offline.jpg`, `final-report.json` (all links listed).
- **F7, major, known owner decision:** At 1440×900 the submit button ends 49.55 px below the fold in Finnish and 28.66 px below it in English. Fit the complete action block or record the owner's acceptance of the extra scroll. Evidence in `../238053d5/shots/fi-1440-light-font16-first.jpg`, `../238053d5/shots/en-1440-dark-font16-first.jpg`, `../238053d5/walk-report.json`.

The first-press message reserve also moves following content; recorded as limited polish in `review-notes.md`, without another blocking finding. No Finnish editorial judgment or consent wording change is proposed. Archived prototypes, the screenshot inspector and allowed skip-link warnings are excluded.

## Verification and hand-back

- Production frontend and Bridgetown builds passed.
- Final-head `ds gate`: **pass**, 0 errors and 42 warnings. All warnings are listed in `review-notes.md` and preserved in `gate.json`: 19 D1–D19 missing Supersedes fields; 1 no test-results configuration; 1 accepted retrofit covering nine old model gaps; 15 allowed skip-link warnings; 6 pre-existing 404 pseudo-element contrast uncertainties.
- Additional final-build axe checks: **48 runs, zero violations**. This does not cover the horizontal-overflow finding; that requires a submitted long address.
- Live endpoint: only `a@b` submitted; script/token returned 200 and the POST correctly returned **422** with the value retained. No real address submitted. Other response cases were intercepted local fixtures; long addresses always had a filled honeypot.
- Covered FI/EN, 390/1440, light/dark, normal/large default text, form outcomes, retry, keyboard, all no-JS return states, native browser zoom at every 100–200% step, 320 px reflow/text spacing, motion/reduced motion, language switching, privacy and company verification. Original unaffected evidence at 94e0cd3 is reused with explicit continuity to 5501c2a; changed confirmation states were recaptured.
- Executed steps appended to `.ds/reviews/steps/W0.md`, `W1.md`, `W3.md`, `W5.md`.
- `ds review verify` accepts the schema/independence, rejects the failing verdict and missing separate quality critique, and warns about the uncommitted review input and 33 cited evidence files. Uncommitted artifacts are deliberate: this worker was told not to commit.

Next: fix the blocking UI issues; capture intended baselines; obtain a fresh defect review for the new UI hash and the separately required quality critique; commit the review and cited evidence before CI. Detailed evidence is in this directory and `../238053d5/`; `snapshot-continuity.json` explains the two-head evidence reuse.
