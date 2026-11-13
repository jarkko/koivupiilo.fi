# Independent v1 follow-up review, 13 November 2026

Reviewed site head: 8ed8907d2f787e7e48a3e8dc8b8e2838d4b80d2f. Base: b34ef53.
UI hash: c4cc619c7bc641e2493f4e537e739ba711162fe389d7bd2934c30967231e9dd1.
Reviewer: codex, term_8891a925-6975-42e9-a119-0bb5888eff03. Implementer: claude.
Review records, steps and evidence only; no site source, baseline or design asset was changed. Nothing was pushed.

## Method and scope

Read AGENTS.md and kit.toml first, then the ux-review and quality-critique guides discovered through ds help/schema references in the canonical kit at /Users/jarkko/code/metamorphosis/kit/guides/. Read the mapped model, rules, voice/strategy, termbase, brief/references, web/WCAG/interaction checklists, the previous review and its findings, current templates and the seven changed site files in full. The supplied visual direction is design/boards/1-tuohi.html. D19 governs the current short sitemap and message hierarchy rather than the superseded places table. D21/D22 are material to the earlier blocking findings.

Ran a fresh production build, then exercised W0–W5 in fi_FI/en_GB using the project's existing Playwright/Chrome tooling. capture.mjs captures 13 routes × 2 widths (390/1440) × 2 themes × 2 browser locales: 104 required cells, plus eight duplicate 404 captures under the second language label. It also captures 320px and 640px/DPR2 layout simulations, for 140 PNGs in shots/. The latter is not real browser zoom. Each locale is tested against every route, including a Finnish URL with en-GB and an English URL with fi-FI. The language is defined by the route, not silently replaced by the browser locale.

audit.mjs records page text/links, language pairs, keyboard skip destinations, 200% computed-font-size stress and click-driven local transitions; supplement.mjs adds desktop W4, actual clicks on both 404 recovery links in both locales, per-item ISO dates and first-viewport geometry. All 14 tested paths (including two missing-path contexts) have no ordinary overflow, clipped element, small standalone phone target or script exception. All 14 computed-text stress cases have no viewport overflow or clipped element. The entire first Kvitti row ends at y=618.03 in each 390×844 locale check, with the headline and language switch also inside the viewport.

The scripts retain the external boundary: product/YTJ destinations and mailto subjects were inspected, external requests were blocked and no message was sent. Product-side backlinks and real mail-client behaviour are not certified. There is no form, user-editable collection, deletion, asynchronous saved state or input keyboard to fabricate; a thousand-item user-data case is not relevant to this curated seven-item static index. Keyboard skip works on every route, and every paired header language switch lands on the same page. Header and footer links remain native anchors.

Frame strips show before, approximately 300ms and after for local page/language/recovery transitions. arrival.mjs captures both front pages with ordinary and reduced motion at requested 0/300/1200ms; actual capture times are in arrival.json. Original frames retain visible text; the trunk alone grows during ordinary arrival, and reduced motion leaves it static. Sheets are viewing aids; original PNGs are the evidence if a scaled sheet obscures text.

Orca's implicit current-worktree lookup did not recognise this checkout; the existing Koivupiilo workspace was reused explicitly for an additional DOM snapshot (orca-snapshot.json). Its background full-screenshot timed out without a drawn frame. No claim relies on that failed screenshot: the full matrix and interaction evidence come from the repository's running-app capture tooling. No new workspace or helper worker was created.

Real browser zoom steps from 100% through 200%, Safari text-only zoom, VoiceOver, low-power iOS and physical devices remain unverified. A separate Chrome-preference probe did not change the measured zoom and is not counted as evidence. The 200% DOM font enlargement and 640px/DPR2 capture are extra stress/layout checks, not a substituted WCAG browser-zoom certification. The review reports observed failures and limits rather than claiming full accessibility conformance.

## Previous findings: explicit disposition

- **F1, privacy: fixed.** Both company routes retain only grove origin and traced-bark provenance. No house/children reference remains in the public paragraph. Necessary company address data remains under D18.
- **F2, missing front-page checked date: fixed.** Every front/work item has its own visible date immediately beside its status, with a time element and ISO datetime. The shared explanatory note now appears wherever the list partial appears. Supplement.json records all 22 row occurrences across four pages.
- **F3, undecided lifecycle: resolved by D21.** M1 and the termbase now contain the four shipped statuses. Pilot is real limited use; in progress describes unfinished non-software work. Filled/open marks agree with the text, without implying all work is released. Older Kvitti/BeachDesk dates remain 2 November; the other checked dates are 12 November. No blanket freshness claim is introduced.
- **F4, text stress: fixed in the reproduced scenario.** The former fixed three-column squeeze no longer appears. The row-body container query stacks names, statuses/dates and descriptions when enlarged rem text reduces available room. Both front/work pages and the shared coaching offers remain readable; no text200 overflow or clipping was found.
- **F5, capacity/reply: resolved by D22.** The exact approved capacity line is rendered in both languages. D22 explicitly accepts it for W4/S-3 and defers reply timing until the owner gives one. The named responder line remains, with no invented reply promise. Its specifically approved first-person wording is not a new general voice rule.
- **F6, visible product proof: still major.** The front is a list of real product names, descriptions and dated status, without an actual product screen. S-1's stronger visual ambition and references.md's proof-above-fold bar remain unmet. This retains the previous review's major design-quality classification, under approved-design, rather than silently resolving it or upgrading it to a new navigation/lifecycle blocker. D14/D19 explicitly define the current short company-index launch structure. Before closing the quality milestone, add an authentic consent-safe crop or explicitly reconcile S-1 with the owner. The pass below is not a claim that the site has reached the requested best-in-class quality bar.

## Current verdict and language

Defect verdict: **pass**, no blocking findings, one carried major finding (F6). Every rubric item is scored; approved-design remains a nonblocking fail for the inherited visual-proof gap. The critique is separately nonblocking and has no pass/fail property under the ds schema. It answers all three questions for W0–W5, with the strongest counter-argument for each 2x proposal and specific local/frozen reference mechanics.

Used suomen-kieli in assessment mode and stop-slop for English. The changed Finnish reads naturally, including the software-company definition, consulting line, status-date explanation and shortened grove story. The sport is beach volley, with Finnish inflections and spaced compounds. No forbidden synonym appears in the rendered app. English retains the same scope; a few inherited mechanical phrases are named as copy opportunities in quality-assessment.md, without inventing factual or grammatical defects.

The strongest remaining quality moves are visible proof, a concrete first coaching engagement, and less repetition before the Studio stack. The language switch already takes one action; a false local 2x claim would be weaker than verifying locale continuity across the external product-return journey. Read quality-assessment.md and the critique for the per-job comparisons. Award-library screenshot assets were not copied into this public repo. The task's write restriction takes precedence over the quality guide's canonical-tree append: opportunities.md holds candidates for the coordinator to reconcile with opportunity-tree.md.

## Baselines and checks

baseline-manifest.json and the defect record list all 104 changed baseline paths relative to main with current sha256 and matching independent route/width/theme/locale PNGs. They approve the intentional v1 replacement, including dated status rows and current copy. The front, work, Studio, coaching, company, privacy and 404 compositions were inspected in both languages and themes. No unexplained visual change was found. The baseline files themselves were not edited.

Fresh gate: **0 errors, 40 warnings**, all enabled checks pass. The warnings are:

- 19 model.decision-no-supersedes notices on historical D entries.
- 1 model.no-results notice: no tagged JUnit result input.
- 1 retrofit.baselined notice covering the nine existing M1–M3/W0–W5 missing-test gaps accepted by D20.
- 13 invariants.tap-target warnings for acknowledged keyboard-only skip links. First Tab exposes the visible focus state and Enter reaches main in every route; these are not tiny standalone phone controls.
- 6 a11y.color-contrast warnings on the bilingual 404's bark background, resolved manually against the worst possible composite: ink contrast is 12.330:1 light / 11.041:1 dark. Even muted is 4.650:1 / 4.972:1. Normal ink/muted paper pairs are 16.488/6.218 light and 15.753/7.093 dark. Tokens and the 14% maximum bark opacity are unchanged, and the visible 404 content uses ink. Calculations are in audit.json.

The task-start ci report's passing perf/visual module results are retained as automated-input.json, labelled as input evidence. The final post-commit ds ci is authoritative and is reported to the coordinator separately. Relative to the original main base, ci additionally warns retrofit.grown for the nine D20-accepted rows; this is a base-diff bookkeeping warning, not nine newly introduced gaps. Disabled imagery/tokens/lint remain explicit configuration decisions, not hidden failures.
