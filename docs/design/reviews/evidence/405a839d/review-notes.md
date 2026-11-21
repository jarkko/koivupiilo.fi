# PR 2 independent review

Reviewed head: `2711d407fe7194c21d5931bb2e86987a3101cfbb`; base: `origin/main` (`81ede4e`). UI hash: `405a839da7dda29b8b26f2ebdd395ba31ad4b1aff05c34952b2d75ea6be2adfe`. Implementer: Claude; reviewer: Codex, terminal `term_dac29bd2-b715-44ea-95ee-4109b4970073`, task `task_d93e41ec00ef`, dispatch `ctx_ad2137dfcc48`.

## Boundary and method

The reviewer neither wrote nor planned this implementation. Finnish wording, grammar and style were excluded by the owner's instructions and D23. Finnish was checked only for presence, language routing, DOM completeness and geometry. Quoted control labels in steps are an execution record, not editorial feedback.

Read AGENTS.md, kit.toml, model.md (including D14/D19/D21/D22/D23), house rules, strategy, termbase, web/WCAG/interaction checklists, references, the Tuohi board, and the independent ux-review and quality-critique guides from the local canonical kit. No repository handoff file was found. Orca ownership showed the coordinator and this worker; no helpers were started.

`build.log` records a successful production build. `capture.mjs` adapts the project's existing screenshot harness to this evidence directory: all 13 configured routes, 390/1440 widths, both themes, both browser locales (fi-FI/en-GB), plus 320 and a 640 px reflow viewport. The bilingual 404 was also captured in both language contexts. All 112 matrix captures and 28 extra captures completed with `no findings`: no overflow, clipped text, failed site request, unexpected external request or console error. The keyboard-only off-screen skip link is an inherited exception in this capture script.

`audit.json` records 24 route/locale visits, real header-language clicks in both directions, header navigation, DOM empty-section checks, same-origin link HTTP checks, status/date strings, 56 walk records, four automatic redirect visits, and 26 computed-font stress visits. The twelve sitemap URLs contain both new product paths and no old product paths. The canonical and all three alternate links match each route pair. All internal links checked return 200. Both old paths contain zero-delay refresh, correct destination canonical, noindex and a direct fallback link; real browser navigation reaches the correct new route. These are static refreshes, not HTTP 301 responses. The 404 is deliberately bilingual and noindex, with separate FI/EN recovery links rather than a same-page translation.

Studio has neither a capacity section nor an empty stack list; coaching has neither an empty byline nor an empty note; company has no empty quote box; products has no empty footnote. Each remaining section has content. D23 explicitly authorizes the capacity removal, vocabulary/routes and claim additions. The claims audit records GitHub user 439; D23 releases the listed history claims. Selma remains one CV line per company language. No client case, athlete identity, third-party font or tracker was added.

Orca's embedded browser independently followed the FI Products link and English link, then rendered the EN products page at 390 in dark mode (`orca-products-phone-dark.png`). The scripted walks use real links; three-frame strips preserve before/300 ms/after for all six navigation transitions in each locale and language. `supplement.json` records both 404 recovery links, ordinary/reduced-motion cold-arrival strips and the extra text-size finding. Only the decorative trunk animates; main content remains visible.

`journeys.json` adds three-frame strips for all twelve language-switch transitions per browser locale, plus the real coaching → products → coaching link path in each language and locale: 32 transitions, all with visible main content. `journeys.log` records successful completion. These targeted captures close the initial language-transition frame gap without re-running the full matrix.

## Visual approval record

I opened all thirteen current contact sheets in `sheets/`, each containing the actual changed baseline's complete desktop light, desktop dark, phone light and phone dark image. `sheets.py` proves that the fi-FI and en-GB baseline files for each cell are byte-identical; viewing one is therefore viewing the exact pixel content of both, not assuming equivalence from the filename. I also opened both deleted-route sheets, covering all sixteen removed baselines with the same byte-identity checks. The manifest records all 120 changes: 88 modifications, 16 additions and 16 deletions. Current baseline approval is for the exact SHA-256 in that manifest.

The route rename replaces the old work-index baselines with products-index baselines; it does not remove product content. The shortened Studio and longer company biography have the expected new heights and contiguous section rhythm. No orphaned heading or blank row remains. The date explanation now belongs to each status and all seven products retain exactly one status and date. The 404 is shorter in both languages. Palette, typography, rules, bark edge, footer register and wordmark remain the Tuohi system. Studio before/after sheets were also opened to check the removed section and longer background in context.

## Findings and limits

- **F1, major, extra text-only stress:** at 1440 px with each computed font size doubled while layout dimensions remain fixed, the status grid on `/`, `/en/`, `/tuotteet/` and `/en/products/` extends beyond the viewport (39 px FI / 68 px EN, both themes). `.status` keeps nowrap children inside a fixed status column. The screenshot and measured boxes are in `extra/text200-en-products--light.png` and `supplement.json`. Make the column adapt or use the existing stacked layout when enlarged text needs it. This synthetic text-only stress is not a browser-menu zoom test and is not presented as a WCAG failure.
- **F2, minor, layout:** at 1440 the new separator/date label is a separate anonymous grid item, so the separator begins the date row beneath the lenticel rather than with the status. The date and its label form separate grid cells. Group the date metadata as one layout unit while preserving the approved text. This is visible in both products baseline sheets; no wording change is requested.
- **F6, inherited major, S-1:** the front still has no actual product screen. The prior independent review c4cc619c carried this as major; this PR does not fix or worsen it. Keep it for the design milestone rather than implying that the copy update meets the stronger visual-proof ambition.

At normal size, 320/390/1440 widths reflow. The extra 640 px captures test reflow, not actual browser zoom. Browser-menu zoom steps, native text-only zoom, Safari, a screen reader and physical devices were not exercised; no emulator or simulator was run. External products and a mail client's launch/send behavior are outside this site review; offer mailto destinations and subjects were inspected without sending mail. No user-editable state, form, asynchronous submission or destructive action exists to stress with zero/thousand records.

The pass is scoped to the reviewed site's correctness and these explicit limitations. F1 and F6 remain major quality work; F2 is polish. Fresh gate and review-verify outputs are separate evidence files. Uncommitted evidence warnings are expected locally because the coordinator, not this reviewer, must commit these artifacts; CI must see them in git.

## Gate result and every warning

`node tools/ds/ds.mjs gate --base origin/main --json` exited **0**, `ok: true`, with **0 errors / 40 warnings**. `gate.json` contains every exact warning; `gate-summary.json` preserves them plus counts and the manual contrast calculation.

- 19 `model.decision-no-supersedes`: D1–D19, model.md lines 101, 107, 110, 113, 116, 118, 121, 125, 128, 131, 133, 135, 136, 139, 143, 146, 148, 150, 153 lack the parser's explicit Supersedes field.
- 1 `model.no-results`: no tagged test-result glob/JUnit result exists to check.
- 1 `retrofit.baselined`: all 9 existing M1–M3 / W0–W5 test-coverage gaps remain accepted on the D20 retrofit list. This review does not claim tests were added.
- 13 `invariants.tap-target`: the keyboard-only `a.skip`, one warning per configured route. It is intentionally off-screen before focus; actual Tab/Enter visits reach main. Ordinary phone controls passed the independent measurements.
- 6 `a11y.color-contrast`: the bilingual 404's h1, first paragraph, FI recovery link, h2, second paragraph and EN recovery link sit above a decorative pseudo-element whose background axe cannot determine. The worst case, full bark coverage at opacity .14, calculates **12.330:1 light / 11.041:1 dark**, above AA even for small text. The unchanged colors and opacity are recorded in the summary, rather than treating axe's uncertainty as an automatic pass.

The gate covers invariants and axe, not fresh Lighthouse/performance or pixel regression. The independent capture and exact visual baseline inspection cover this review's rendered-layout scope; no fresh performance or pixel-comparison report is claimed. Existing accepted model debt is reported rather than silently fixed by the reviewer.
