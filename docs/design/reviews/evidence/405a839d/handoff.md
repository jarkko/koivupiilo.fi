# Independent review handoff — PR 2

- **Verdict: PASS**, Codex reviewing Claude. Head `2711d407fe7194c21d5931bb2e86987a3101cfbb`, UI hash `405a839da7dda29b8b26f2ebdd395ba31ad4b1aff05c34952b2d75ea6be2adfe`; both still match at handoff.
- Reviews: `.ds/reviews/405a839da7dda29b8b26f2ebdd395ba31ad4b1aff05c34952b2d75ea6be2adfe.defect.json` and the matching `.critique.json`.
- Also updated W0–W5 execution records and the opportunity tree as required by the review guides. No site source, model, baseline, commit or push was changed by the reviewer. The owned local server and Orca browser tab were closed.

## Findings

1. **F1 major:** doubled-computed-font stress at 1440 pushes status/date content outside the viewport: 39 px FI / 68 px EN, both themes, on home/products pages. Evidence: `supplement.json`, `extra/text200-en-products--light.png`. Adapt the status column or stack it for enlarged text. This is extra text-only quality stress, not a claimed browser-menu zoom WCAG failure.
2. **F2 minor:** new status/date separator and label become separate grid cells on desktop. Evidence: `sheets/en-products.jpg`, `sheets/tuotteet.jpg`. Group date metadata as a layout unit while keeping approved wording.
3. **F6 inherited major:** front-page actual product screen is still absent. Evidence: `sheets/_root.jpg`, `sheets/en.jpg`. Carried forward from c4cc619c; preserve it for the design milestone.

No Finnish wording/grammar/style judgement was made. No blocking routing, translation-presence, empty-section or ordinary-size layout defect was found. All 104 current baselines and 16 deleted baselines were inspected and approved by exact SHA-256 / deleted; browser-locale duplicates were proved byte-identical. `baseline-manifest.json` is the complete mapping. Both redirects, twelve sitemap entries, canonical/hreflang pairs, real language-switch round trips and all internal links checked passed. `review-notes.md` details scope and evidence.

## Validation output

```text
Production build: exit 0
Independent full matrix capture: exit 0, no findings
Audit: exit 0, 24 route/locale visits, 4 redirects, 0 errors
Additional journeys: exit 0, 32 transitions, 0 hidden-main states
ds gate --base origin/main --json: exit 0, ok=true, 0 errors, 40 warnings
ds terms --files docs/design/opportunity-tree.md --json: exit 0, ok=true, findings=[]
ds review verify --base origin/main --json: exit 0, ok=true, 0 errors, 41 warnings
git diff --check: exit 0
```

Full output: `gate.json`, `gate.stderr`, `gate-summary.json`, `verify.json`, `verify.stderr`. Gate warnings: 19 missing Supersedes fields (D1–D19), 1 absent model-test result input, 1 acknowledgement of 9 accepted D20 model coverage gaps, 13 keyboard-only skip-link target warnings and 6 manually evaluated 404 contrast warnings. Worst calculated 404 contrast is 12.330:1 light / 11.041:1 dark; see `gate-summary.json`. Exact messages and affected routes/elements are preserved in the gate output and explained in `review-notes.md`.

Verify warnings: 2 `review.uncommitted-input`, 39 `review.uncommitted-evidence`; expected because this task forbids reviewer commits. **Next action: coordinator commits both reviews, all cited evidence and the related steps/opportunity edits, then runs the normal current-head PR gates. CI reads git rather than the working tree.**

Limits: real browser-menu zoom steps, native text-only zoom, Safari, screen reader and physical hardware were not tested; no simulator/emulator was run. External product sites, product footers and mail-client behavior were not tested. The gate did not run fresh Lighthouse or pixel regression; full capture and baseline inspection are the scoped rendered-layout evidence. These limitations are not silently presented as passes.
