# Ratametsuri quality critique: evidence and comparison

Reviewed `02542091a22d9dab1b15a6e02f65d926ecef1f73`, UI hash
`eef7d25e8c6941de8e882619974b890fb73b53ec535d060b77af029feab7f054`.
Fresh GPT/Codex critic, implementer Claude; dispatch `ctx_5ffb28d7849b`,
task `task_d2a1a5876615`. The critic did not build the product. This is a
non-blocking quality critique, not a defect verdict or an editorial review.

Critique: [.ds JSON](../../../../../.ds/reviews/eef7d25e8c6941de8e882619974b890fb73b53ec535d060b77af029feab7f054.critique.json).
Opportunities and candidate solution: [O-r1–O-r4 / S-r1](../../../opportunity-tree.md#ratametsuri-critique-eef7d25e).

## Scene and evidence limits

One flow, W0: a club course setter with a Mac follows a shared link, sees
what the app does, checks suitability and asks for a beta invite (brief
J1–J3 and J5; failure recovery J4 is reused). The critic enacted the brief's
phone-after-training scene in English/dark at 390×844, then the
Mac-at-home scene in Finnish/light at 1440×900 on the freshly built site.
This is a reviewer simulation, not observation of a target setter. No
conversion, comprehension or elapsed user-time result is claimed.

`BRIDGETOWN_ENV=production bundle exec rake deploy` passed. The script in
gitignored `design/shots/critique-eef7d25e/walk.mjs` served `output/` on a
temporary loopback port, drove headless installed Chrome through Playwright,
and closed both server and browser. It filled only invalid `a@b`, ticked the
unchanged consent, and inspected the action without submitting. All sign-up
origin traffic was blocked in this scene walk; zero POSTs were sent.

Fresh evidence: [phone](critique-en-phone-full.jpg),
[desktop](critique-fi-desktop-full.jpg), [geometry and steps](critique-scene.json).
The full captures retain the typed invalid value and checked consent; they
are an inspection state, not a submitted or successful request.

Reused, without rerunning the defect suite:

- `matrix-390-font16.jpg` and `matrix-1440-font16.jpg` show the same UI in
  both languages and both themes; the large-default matrices and zoom shots
  cover stress layouts.
- `en-390-invalid-strip.jpg`, `fi-1440-invalid-strip.jpg` and
  `walk-report.json` show the current layout's invalid-response continuity.
- The previous hash's `../f42b0d0f/walk-report.json`, `paths-report.json`,
  `native-post-report.json`, `fix-verification.json` and handoff supply
  unchanged accepted/error/offline/retry/no-JS, long-address, keyboard,
  ordinary/reduced-motion and privacy/maker-path results. This critique
  makes no fresh claim about those responses or email delivery.
- `../f42b0d0f/perf-summary.json` supplies the earlier approximately 1.73 s
  median mobile LCP and zero CLS. These are reused lab results, not a fresh
  measurement. No performance change is proposed without a new check.

No simulator, emulator, physical-phone test, Safari test or screen-reader
session was run. No Finnish language, wording or tone was evaluated; no
Finnish replacement text is proposed. Consent stays byte-exact. The
native-Mac-plus-pipeline positioning remains the owner-decided lead; no
new compatibility, platform, price, release, reliability or audience claim
is suggested. Older reference-document suggestions yield to current
discovery decisions and the task's explicit no-go list.

## 1. Remove: the separate terminology-example feature

Remove the second numbered feature as a standalone lesson in local
terminology. Retain the factual language-availability information with
requirements before the ask; its wording belongs to the editorial
pipeline. This judges the block's job and position, not the words in it.

The phone's second feature occupies y=1378.97–1512.27 (133.30 px); the
desktop counterpart occupies y=439.11–521.41 (82.30 px). It gives
terminology examples after the phone's invitation button, while the
qualification of the actual output/handoff is still further down. The
screen gains a shorter route through supporting proof and one fewer
numbered stop. This does not justify deleting language suitability (J2),
the status/date, map credit, consent, maker, output limitations or recovery.
Keep the course-line visual identity: it gives the independently branded
page a recognisable connection to the setter's work and is not the main
cost here. Grade: **anecdote**, one critic's hierarchy judgement.

## 2. Single 2x candidate: a responsive real-app proof panel

Replace the passive hero screenshot with one compact, responsive proof
panel of a real click-preview interaction on the approved Kauppi map:
actual native window context, a readable actual pointer preview, and the
resulting course visit. Use a static before/after composition from the real
app, not invented UI, new claims or decorative animation. This is one
replacement of the existing proof surface; it does not add a second funnel
or change the brand, model, positioning or sign-up lifecycle.

Why this move: the 311.20×155.59 phone image is entirely map, with no
native title bar, sidebar, description sheet or pointer preview. The
748.66×469.16 desktop image proves a native window and real course, but
its upper map title/water area takes substantial space and it does not
show the action the adjacent first feature describes. A setter can
recognise the domain without seeing the reason this particular Mac app
would feel different. Discovery §3 D1 and §5 already identify a real,
built preview as appropriate supporting proof; the later positioning
update remains controlling.

**2x is a test target, not a result:** halve the median time for target
setters to identify native Mac UI and correctly explain what the shown
click will do, against this current page, in the brief's phone and desktop
scenes. Counterbalance with ability to find requirements and request an
invite. A small counterbalanced test should first establish whether this
trust moment is actually slow; do not claim any lift until measured.

**Strongest counter-argument:** the current crop deliberately makes course
numbers readable and keeps the phone email field above the fold. A full
window shrunk to 311 px would undo that; a before/after pair could make
both frames illegible, increase weight or push the field below the first
screen. Kill this candidate if the real preview cannot stay readable in
the existing proof area while preserving field reach, credit and web
budgets. Grade: **anecdote**, a grounded but untested design hypothesis.

## 3. Comparison against every job reference

Comparisons use the project reference document's dated 2026-11-21
observations and the shared award library's 2026-10-31 entries/shots, not a
claim about those sites today. Selected closest craft references are
Flighty (real output proves value), CoolDock (suitability facts at action),
and CleanShot X (real task demonstrations and reassurance at action).
The library marks Flighty's award as an **app** award, CoolDock as a web
Honorable Mention, and CleanShot X as an indie reference with **no** web
award. They are not three equivalent web-award winners.

The award identifiers use the shared kit root convention:
`references/awards/ios-app-landing.md#flighty`, `#cooldock`, `#cleanshot-x`.
The critique JSON links to those category headings by relative filesystem
path. Private third-party reference shots remain in the shared kit/ignored
reference folder; none was copied to this public repository.

| Job and project reference | Mechanic compared | Current result and remaining gap |
|---|---|---|
| J1: Apple Final Cut Pro | A real window leads with recognisable domain content. | Our named map is stronger domain specificity. Desktop shows the actual window; phone strips it down to a map, losing the native-app half of the offer. |
| J1: Flighty, award library `#flighty` | The app's own notification output explains its value. | Our map establishes the category but no visible preview shows the smoother editing claim. The explanation stays in prose, below the phone ask. Borrow real output, not floating cards, cookies or the library's heavy loading/motion. |
| J1: Mela | Plain window frame and immediate one-line definition. | We beat its below-fold product placement. Phone loses the plain-window context entirely, so the authentic app could be mistaken for a finished map. Do not copy its screenshot sizing/performance weaknesses. |
| J2: CoolDock, award library `#cooldock` | Compact requirement facts next to the action. | Our Mac requirement is readable and before the field, meeting the stated contrast/layout target. Language suitability is isolated in the second numbered feature, after the phone ask; the decision facts do not form one compact suitability group. |
| J2: Supaste | Requirements attached to action, phone overflow is the rejected mechanic. | Our row wraps and the recorded stress suite is stronger; no clipping shortfall is asserted. The same language-suitability separation remains; do not copy scarcity or low-contrast treatment. |
| J2: Wispr Flow | Platform is explicit at the action. | Our headline, Mac requirement and audience line already make the platform explicit. No platform-label deficit warrants a change. Its one-glance suitability principle still highlights our late language section. Do not adopt platform switching or other-platform claims. |
| J3: Dave Cleaner beta test | A single address field and obvious ask. | We beat the duplicate CTA/form structure and supply consent and requirements. The phone reader can reach the ask before the detailed export limitations/testing scope; information needed for an informed beta decision is split around the action. This is a sequencing opportunity, not a demand for a duplicate CTA. |
| J3: Mela privacy line | A plain explanation rather than a policy-only dependency. | Our fixed inline consent already states address purposes, deletion and privacy destination. No warranted brevity criticism: it is a different data practice and a fixed contract. Leave its bytes alone. |
| J3: CleanShot X, award library `#cleanshot-x` | Risk reassurance is adjacent to the action; real task demos support claims. | The development status is near the hero, but the partial-description and tested-export qualifications are in the third feature. On phone that begins at y=1537.86, after the button ends at y=1025.86; desktop places it before the form. The phone decision is therefore less self-contained. No guarantee, user count or testimonial is available to import. |

The category-baseline rows at the end of the project's references file are
comparative context rather than additional job models. We meet their
explicit first-screen product-image and domain-specificity targets on
desktop. On phone, we exceed a blank/thumbnail first screen at showing a
course, but still have the same quality risk as a device collage: seeing
the map is easier than seeing how the app works. No competitor naming in
product copy is recommended.

These three shortfalls are **anecdote**: specific comparisons support them,
but no controlled research or user observation establishes their effect.
References are useful, not exhausted or too weak; use their relevant
mechanics while rejecting their documented accessibility, loading and
consent-overlay costs. A complete field above the fold remains a useful
constraint, but it is not itself evidence of understanding or a completed
request.

## Checks and handoff

The critique and tree are proposals for prioritisation, not permission to
implement source changes. Model/brand decisions are unnecessary for S-r1 as
scoped; widening it into a new positioning or navigation would require an
owner decision. No new defect was established and the existing passing
defect verdict is unchanged. Schema, gate and local review-verifier results
are recorded in `critique-checks.json` after execution. The explicit
no-commit task instruction leaves all new artifacts for the coordinator to
review and commit; git-tree evidence verification cannot be claimed before
that step.
