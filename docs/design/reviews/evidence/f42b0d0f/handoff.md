# PR #3 independent UX defect re-review

**FAIL** at HEAD `248cbea000ee9c2da39ff9860448607e58d9ecdc`.

Verdict: `.ds/reviews/f42b0d0f558bdbfff9ef50ad1a4337a93b7d1313849e2e5f0021fd64926b45ea.defect.json`.
Independent reviewer: GPT/Codex; implementer: Claude. No product source edits or commits.

## Blocking findings, ranked

1. **F8 — M1 checked date absent from both landing-page statuses.** The pages say the app is in development but omit the date required next to the status by M1. The linked product-list entry already shows the verified `checked: 2026-11-12` date. Show the verified date beside the landing status in each locale, or obtain an explicit owner-approved model exception. This is missing metadata, not a Finnish wording/tone judgment.

   Evidence: `shots/fi-1440-light-font16-first.jpg`, `shots/en-390-dark-font24-first.jpg`, `shots/fi-1440-dark-font16-work.jpg`, `walk-report.json`; controlling requirement `docs/design/model.md` M1/D24 and source `src/_data/work.yml`.

## Prior findings

All **F1–F7 are verified fixed**, with fresh evidence and exact paths in `fix-verification.json`:

| Finding | Fresh result |
|---|---|
| F1 long confirmation reflow | 24 cells at 320/390, fonts 16/24/32, FI/EN, light/dark: zero overflow. |
| F2 product-entry navigation | All 16 links open the correct product route; both full referral paths walked. |
| F3 baselines | 48 committed new/updated files; visual module passes without findings. No baseline approval under this failing verdict. |
| F4 performance | Median LCP 1727.403 ms FI / 1727.073 ms EN, under 2000 ms; CLS 0. |
| F5 field error proximity | Error immediately below focused input, `aria-describedby=signup-error`; large-text phone captures show it in view. |
| F6 service-failure fallback | Direct beta-invite email fallback in JS failure/offline/rate-limit and no-JS try-later. |
| F7 desktop button | Button shares input row, ends at y=883.156 FI / 862.266 EN at 1440×900, as decided by the lead. |

## Non-blocking findings

None added. Known archived prototypes, screenshot inspector and allowed skip-link warnings are excluded. Consent wording was not changed or judged.

## Verification

- Production frontend and Bridgetown builds pass.
- Fresh `ds gate`: pass, zero errors, **42 warnings**, each quoted in `review-notes.md`: 19 D1–D19 Supersedes fields, one missing test-results configuration, one accepted retrofit, 15 allowed skip-link target warnings, six pre-existing 404 pseudo-element contrast uncertainties.
- Fresh visual and perf modules pass. Six complete product Lighthouse reports are under `lighthouse/`.
- W0/W1/W3/W5: explicit FI/EN locale/time-zone settings; 390/1440; light/dark; normal/large browser defaults; all signup outcomes and retry; 48 no-JS fragment cells; native POST/303 recovery with JS disabled or script unavailable; keyboard/focus; language/privacy/company paths; ordinary/reduced/mid-visit reduced motion. State changes have before/about-300-ms/settled frames.
- Native zoom at every offered 100–200% step: 48 product/privacy cells without overflow/clipping; 320 px and increased text spacing pass. Scrolled 200% evidence uses direct CDP screenshots under `shots/native200-*` to avoid a Playwright browser-zoom capture artifact.
- 32 extra axe runs: zero violations. 24 extra long-address cells: zero overflow. Repeated physical press during sending: one POST.
- Live script/token 200 and invalid `a@b` POST 422 in both languages, using locally intercepted built pages at the production origin. The earlier arbitrary-localhost CORS rejection is documented, not a product defect. No real valid address was submitted; fixture long addresses had a filled honeypot.
- `ds review verify` accepts schema/independence and rejects the failed verdict, the 48 consequently unapproved baseline hashes and missing separate quality critique. One uncommitted-input and 25 uncommitted-evidence warnings are expected under this task's no-commit instruction.

## Uncommitted artifacts and next action

The verdict above; modified `.ds/reviews/steps/W0.md`, `W1.md`, `W3.md`, `W5.md`; and `docs/design/reviews/evidence/f42b0d0f/` containing screenshots, scripts, reports, notes and this handoff. `artifacts.json` lists every artifact.

Fix F8, obtain a fresh defect review for the resulting UI hash and the separately required quality critique, then commit the accepted verdict/evidence before CI. The implementer must not edit this review verdict.
