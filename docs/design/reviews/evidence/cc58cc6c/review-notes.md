# Independent layout review: PASS, one minor finding

Reviewed head: `23da2524257f7d5441aa00aab68736784bd90d18`.
UI diff hash: `cc58cc6c376189b643694712f4e5849944535026fba7ba6beb75e3da98431d44`.
Reviewer: GPT/Codex, fresh independent worker; implementer: Claude.
Scope explicitly excludes wording and product-model policy; this verdict does not approve the removal of M1 metadata as a policy decision.

F1 (minor): at 390 px, `.feature:first-child h3` leaves a single-word final line in both languages. Apply `text-wrap: balance` to `.feature h3` or the first heading, preserving wording. See `phone-matrix.jpg` and the first two rows of `language-switch-strips.jpg`. No blocking layout findings.

Production build and the required shooter passed. All 38 generated PNGs were visually inspected, including both motion-done images; five JPEG sheets preserve the matrix, large text, native 200% zoom, and before/~300 ms/settled language/arrival strips. Standard shooter test targets are only 24 px, so the supplementary checks independently verified all visible links at 44 px or greater. Local axe: eight cells, zero violations and zero incomplete checks. Native zoom: Chrome for Testing extension uses chrome.tabs.setZoom, with observed layout widths 1440/1309/1152/960/823/720 and DPR 1/1.1/1.25/1.5/1.75/2; this is browser zoom, not CSS zoom. Screenshot capture uses CDP physical dimensions so native zoom does not crop the evidence. Reflow/spacing: 24 cells, zero horizontal overflow. Contrast: muted 6.680/7.833, CTA 6.114/7.494, course/focus 5.420/7.494 in light/dark. Four visible legs; triangle points toward control 1 (computed angular discrepancy below 0.15 degrees, visually aligned). No literal &shy; shown.

Compared the live desktop page through Orca: the large empty area below the requirements already exists in the approved composition. The beta action is fully within the required normal first screens: bottom 698 px at 390x844, 428 px at 1440x900. At 768x1024 it is below the first viewport (bottom 1106 px); large default text also requires scrolling, with no lost function. Neither is represented as first-screen success by the verdict.

Gate limitation: `node tools/ds/ds.mjs gate` stopped because Docker was unavailable (HTTP 500 on Docker version API). `gate --base origin/main --no-docker` completed with zero errors and 23 warnings, retained verbatim in `gate-local.log`: 19 `model.decision-no-supersedes` warnings (D1–D19), one `model.no-results`, one `retrofit.baselined` (nine accepted model findings), and two `gate.docker-unavailable` warnings (invariants/a11y not run). Repository Docker checks, CI visual/performance gates, Safari/iOS and text-only zoom are not claimed. No source edits, commit or push.

Lead next action: commit the verdict, evidence directory and appended review steps together; optionally address F1 in source, which changes the UI hash and needs a fresh review; normal CI gates remain mandatory before merge. Local review verification necessarily warns about these uncommitted inputs/evidence until the lead commits them.
