# Independent v1 review completed

Both records are filed for `2b66b9b37387a0b60254583b3c7c36a144743125aeec7b413b4eceff5fa6e5bd`, with codex reviewing claude at source head `38aea0d57eb87f064d29e486d705332dc33f1b21`. W0–W5, fi_FI/en_GB, screenshots and click evidence are committed; all 104 changed baselines have sha256 entries. No site code or copy was edited, pushed or deployed.

## Verification

`node tools/ds/ds.mjs review verify --base 8aa8b61` reads both records and their evidence successfully, then exits 1 for the intentional rejection. The only findings are `review.blocking` and `review.undecided-model-change`; there is no missing, malformed, uncommitted or unapproved-baseline finding. Exact output: [verify-final.txt](verify-final.txt), [verify-final.json](verify-final.json).

`node tools/ds/ds.mjs gate --base 8aa8b61 --json` passed with zero errors and 40 warnings. Warnings: 19 missing Supersedes fields; one missing JUnit-results configuration; one D20 warning covering nine accepted model gaps; 13 keyboard-only skip-link tap-target exemptions; six 404 contrast checks requiring manual review. The manual worst-case 404 contrast calculation passes: 12.33:1 light / 11.04:1 dark. Evidence: [gate.json](gate.json), [audit.json](audit.json), [review-notes.md](review-notes.md).

## Blocking findings

- F1: Family/house association in the company grove story violates the task privacy constraint; no face/name or exact house identification is claimed — `docs/design/reviews/evidence/2b66b9b3/shots/company-fi-390-light.png` and `shots/company-en-390-light.png`.
- F2: Front-page work statuses lack M1's last-checked date — `docs/design/reviews/evidence/2b66b9b3/shots/front-fi-1440-light.png` and `shots/front-en-1440-light.png`.
- F3: Pilot/in-progress lifecycle states lack a D extending M1 — `docs/design/reviews/evidence/2b66b9b3/shots/work-fi-390-light.png` and `shots/work-en-390-light.png`.
- F5: Studio gives neither current capacity nor a reply expectation required by W1/W4/S3 — `docs/design/reviews/evidence/2b66b9b3/shots/studio-fi-390-light.png` and `shots/studio-en-390-light.png`.

Major findings: F4, desktop work descriptions collapse under 200% computed text enlargement (not an asserted real-browser-zoom WCAG failure); F6, reconcile the absent real product screen with S-1. Actual browser zoom at every intermediate step, Safari/assistive technology/hardware, external product behaviour, mail-client launch and three-person ten-second testing remain unverified. The records describe these limits rather than fabricating a pass.

## Critique scores

Reviewer judgement: overall 7/10; clarity 9; identity 8; typography/layout 8 at normal text; proof 5; contact expectations 6; bilingual execution 9. English stop-slop assessment: directness 9, rhythm 7, trust 9, authenticity 7, density 8 = 40/50. Detail: [quality-assessment.md](quality-assessment.md). The highest-value visual move is one authentic, consent-safe product crop, retaining the compact facts and clear statement.

## Next action

Implementer resolves the blocking findings, obtains owner decisions/words where required and requests a fresh review for the resulting UI hash. `opportunities.md` contains the critique's proposed opportunity-tree additions; the canonical tree was outside this worker's permitted write paths. The failing verdict is a valid review deliverable under the dispatch, not a malformed-record failure.
