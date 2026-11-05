# <Product> opportunity tree

<!-- Continuous discovery: outcome → opportunities → solutions → experiments. Every feature traces back to an opportunity here. Friction notes, tester findings, data and quality critiques feed it. -->

## Outcome

<!-- The one product outcome this tree serves, measurable, taken from the brief's success measures. -->

## Opportunities

<!-- User needs, pains or desires, in the user's words. Each names its source: friction note, tester, data or critique, with a date or link. -->

- **O-c1 (W0) On first arrival, the text changes face under the reader.** No tester has reported this; it comes from the critique's measurements. Every page fetches 6 to 10 PT woff2 files (200 to 315 KiB) before the lead sentence reaches its final face. Six of those are latin-ext files that no page needs. Source: critique `5c2e92ac1c575035ac674c56a631cc5ca69f3eca2457fb9cc2748721641793b2` (2026-11-05), `.ds/reviews/5c2e92ac1c575035ac674c56a631cc5ca69f3eca2457fb9cc2748721641793b2.critique.json`, remove. Update from critique `4bd5d6884060bfaee72fd9851ec819beed06cad2243d8820a3134d10efff4f81` (2026-11-05): the latin-ext downloads are gone, and pages now fetch 3 to 6 latin faces. Still open: /fi/portfolio/ fetches PT Sans 400 italic for one emphasised title in a bold heading (that critique's remove).
- **O-c2 (W0) The first screen loads slower than the references.** CSS Wizardry (references.md, First 10 s) paints in system faces. Stripe Dot Dev (kit awards, saas-product) self-hosts two families at LCP 0.9 s. Ours measures LCP 2.1 to 3.5 s in the ds runs, and the shift cause on /portfolio/ is "Web font loaded". Source: same critique, short_of_references. Still open in critique `4bd5d688` (production build: LCP 1.8 to 2.4 s); the 11 LCP and 3 CLS retrofit rows belong here (defect F7). Update from critique `a3bbe0b1e6b027270dc056c0dbbdba177de5e62a3ee4a26326065fd07be9c2a6` (2026-11-06), `.ds/reviews/a3bbe0b1e6b027270dc056c0dbbdba177de5e62a3ee4a26326065fd07be9c2a6.critique.json`: preloading the three shared faces hides the page until the fonts land. In a local HTTP/1.1 A/B, first paint moved from 372 to 1160 ms on 1.6 Mbps (CLS 0.14 to 0 on /) and from 968 to 3336 ms on 400 kbit/s (CLS unchanged at 0.14). No font arrived sooner (remove, short_of_references).

## Solutions

<!-- Candidate solutions, each under the opportunity it serves. Several per opportunity; compare before building. -->

- **O-c1, O-c2 → 2x (critique `5c2e92ac`): first paint is the final type.** Gate each subset by unicode-range (the defect review's F1). Then preload PT Serif 400 latin and PT Sans 700 latin, and add metric-matched Georgia/Arial fallbacks (size-adjust, ascent/descent-override) so the swap moves nothing. Counter-argument: preload competes with the CSS on slow links, and the unicode-range fix alone gets most of the LCP gain. Measure both before keeping preload. Evidence: `docs/design/reviews/evidence/5c2e92ac/lh-compare.txt`, `cls-probe.json`.
- **O-c1, O-c2 → 2x (critique `a3bbe0b1`): stable first paint without waiting for fonts.** Drop the three preloads and ship metric-matched Georgia/Arial fallbacks (size-adjust, ascent/descent/line-gap-override from PT Serif 400 and PT Sans 400/700), so text paints at about 372 ms and the swap barely moves it at either link speed. Counter-argument: size-adjust matches average width, so the 390 px nav can still flip its 'SUOMEKSI' wrap; and HTTP/2 prioritisation in production may remove the preload penalty. Pass line, measured on production: FCP within 100 ms of no-preload and CLS under 0.05 at 1.6 Mbps and 400 kbit/s. Evidence: `docs/design/reviews/evidence/a3bbe0b1/fcp-probe.json`, `lh-devtools-ab.json`.

## Experiments

<!-- The cheapest test that could kill each solution: the assumption tested, the method, the pass line and the result. -->
