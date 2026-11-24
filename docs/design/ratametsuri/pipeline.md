# Ratametsuri product page: design pipeline record

Which steps of the design process ran for the page, and where their outputs
are. Process: metamorphosis `docs/specs/2026-10-25-design-process-design.md`
and the web addendum `2026-10-31-web-quality-addendum.md`. Updated as steps
finish.

| # | Step | Status | Output |
|---|---|---|---|
| 0 | Facts (D6) | done | `../content/ratametsuri.md` (fact log) |
| 1 | `design-kit:problem-card` | done, updated for the product's own brand | `../content/ratametsuri.md#problem-card` |
| 2a | Groundwork: brief (problem in the user's words, who and when, what changes, success measures, appetite, non-goals) | done | `brief.md` |
| 2b | Groundwork: job stories, scenes, assumptions log | done | `brief.md` (J1–J5, A1–A9) |
| 2c | Groundwork: references, "ours must beat X at Y", Jarkko marks favourites | done; favourites open | `references.md` (shots in `refs/`, local only) |
| 2d | Story map and product model | switched off, reason written | `brief.md#story-map-and-product-model-switched-off` |
| 3 | Round 1 directions in the site's chrome (A, B, C) | rejected by Jarkko at gate 2: "It's an independent product" | `design/directions/ratametsuri/{a,b,c}/`, D24 |
| 4 | Copy, Finnish written natively, English derived | first draft done; critic and kielentarkastaja rounds run on the chosen direction | `design/directions/ratametsuri/copy2.json`, `copy2-notes.md` |
| 5 | `design-kit:design-sprint`: three directions in Ratametsuri's own brand (D, E, F) with feel prototypes of the request flow (mock endpoint, slow network, errors, not-live) | done; checker passes for each | `design/directions/ratametsuri/{d,e,f}/` |
| 6 | `impeccable`, `frontend-design` (craft, anti-pattern audit) | done inside each direction; detector findings and fixes recorded | each `concept.md` |
| 7 | `design-kit:motion` (spec, reduced motion, frame strips) | done inside each direction | each `concept.md`; strips in `design/shots/ratametsuri/*-motion-*` |
| 8 | `design-kit:real-imagery`: the app screenshot on Tampereen Pyrintö's Kauppi map | done: one capture per language and appearance (2026-11-23, Finnish UI on the Finnish page, English UI on the English page; inspector visible); on the page as `src/ratametsuri/{screen,phone}-{fi,en}-{light,dark}.webp` | `design/directions/ratametsuri/screens/` with `PROVENANCE.md` |
| 9 | Sprint critique against references and the award library (fresh context) | done | `design/directions/ratametsuri/{d,e,f}/critique.md`, `recommendation2.md` |
| 10 | Gate 2 again: directions, screenshots, critique scores | sent to the coordinator 2026-11-21 | shots in `design/shots/ratametsuri/` (local) |
| 11 | One revision round after Jarkko's pick | to do | |
| 12 | Build into `src/`, `design-kit:design-guard`, `design-kit:model-change` for D24 and the routes | to do | |
| 13 | Finnish rounds: suomen-kieli, stop-slop, toimittajan-tarkistus critic, kielentarkastaja; otsikointi for the headline | to do | |
| 14 | `design-kit:web-quality`: invariants, a11y, perf, visual baselines | to do | |
| 15 | Independent `design-kit:ux-reviewer` defect review and `design-kit:quality-critique` (another model family; never judging Finnish wording) | done: Codex ux-reviewer, 3 rounds: FAIL `4ea83fe1` at 5501c2a (F1–F7), FAIL `f42b0d0f` at 248cbea (F8), PASS `eef7d25e` at 7271d7c, which approved 48 baselines. quality-critique `eef7d25e`: non-blocking ideas for the owner, not implemented; S-r1 goes to Jarkko as one question in the runbook | `../../../.ds/reviews/{4ea83fe1…,f42b0d0f…,eef7d25e…}.defect.json`, `../../../.ds/reviews/eef7d25e…critique.json`; evidence and handoffs in `../reviews/evidence/{4ea83fe1,f42b0d0f,eef7d25e}/`; critique assessment `../reviews/evidence/eef7d25e/critique-assessment.md`; O-r1–O-r4 and S-r1 in `../opportunity-tree.md` |
| 16 | Usability pass: every state at phone and desktop, light and dark, largest text, fi and en; frame strips | done 2026-11-24: two layout defects found and fixed (U1, the course circles crowding headings at large text on a phone; U2, the business ID breaking at its hyphen on `/tietosuoja/`) | `usability-pass.md`; shots from `design/shoot-ratametsuri-site.mjs` (94, local) |
| 17 | Milestone walkthrough runbook for Jarkko (owner-validated only unless outside testers) | runbook done 2026-11-24 (about 28 min, Mac and iPhone, labels checked); labelled owner-validated only; the walk itself is Jarkko's to do | `walkthrough-runbook.md` |
