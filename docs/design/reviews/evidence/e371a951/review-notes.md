# Baseline-only independent follow-up: PASS

Reviewed head: `71dfb47190662954ae991757b504d4db05c7724e`.
UI hash: `e371a951ce062012ae672b495f23c1d3f8cb17b3bd6cb72a56bb5b72a9a2175d`.
Reviewer: GPT/Codex; baseline implementer: Claude; no reviewer source/baseline edits or commits.

All 16 modified Ratametsuri baselines are approved individually by SHA-256 in the verdict. Every new PNG was visually inspected, and every file is byte-identical to its actual render from CI run 46070955845 (artifact ds-out, id 15234035743) at 88bc78d3b3d0053261a65ca30114d960f2e10b51. The baseline manifest records paths, hashes, dimensions and exact artifact matches. No diff image exists for the size-change failures, so none is cited.

The files show the reviewed page: F1 remains fixed, the map and course symbols/legs are complete, the CTA and requirements align, the footer is intact, and there is no clipping or unexplained movement. Dimensions match the earlier reviewed renders: Finnish phones 390x1548, English phones 390x1520, all desktops 1440x1460. Both language routes were inspected at phone/desktop size, in light/dark and both browser locales. No additional finding.

Git confirms the entire delta from the CI head is exactly those 16 baseline files. Page source, assets, fonts, build configuration, kit and instructions are unchanged since the c8dc768a passing review. W0/W3/W5 executed steps and native zoom, large-default text, reflow, keyboard, motion, contrast and accessibility evidence are carried forward explicitly from c8dc768a and cc58cc6c; no fresh runtime walk is claimed for a baseline-only commit.

The downloaded CI report confirms the only errors were 16 visual.size-changed findings. Invariants, a11y, performance and all other checks passed. Its 42 existing warnings remain: 19 model.decision-no-supersedes, one model.no-results, one retrofit.baselined, 15 allowed invariants.tap-target warnings for skip links, and six 404 a11y.color-contrast uncertainties. The original complete warning list remains in c8dc768a/gate-summary.json; ci-summary.json records the counts and failing baseline cells.

Fresh `node tools/ds/ds.mjs gate --base 88bc78d` passed with zero errors and 21 existing model warnings (the same 19 decisions, missing results, accepted retrofit). This is the correct baseline-only delta; valid full runtime/CI evidence for identical render inputs was reused, and no check was disabled. A current-head green CI visual job is still a merge gate, not something this approval claims has already happened.

The new verdict is intentionally uncommitted for the lead. Commit it with this small evidence directory; previous evidence is already committed. No new JPEGs or duplicate baseline PNGs were added.

Final review verify: zero errors, four expected warnings (uncommitted verdict and three new evidence paths); all 16 baseline approval hashes were rechecked before handoff.
