# PR 2 merged review handoff

**PASS**, independent GPT/Codex review of Claude's implementation.
HEAD `6fd0c43fa519b62f06c46e64af97da3342148409`, UI hash
`53cb569055d6f756d125409b5e461e1e930354093448d66984b2d0eced419096`.

Both verdict files exist under `.ds/reviews/` with that full hash.
The critique retains the earlier answers and updates the visual-proof
rationale: Ratametsuri now has a hosted page, while the front viewport
remains text only. The opportunity tree has one assessment note and no
duplicate opportunities.

No new defect in the merged journey or policy layout. Three inherited
quality findings remain:

- **F1, major:** `/`, `/en/`, `/tuotteet/`, `/en/products/`, 1440 px,
  light/dark, synthetic 200% computed-font stress: status/date overflow.
- **F2, minor:** `/tuotteet/`, `/en/products/`, 1440 px, both themes,
  default text: status/date metadata split across grid cells.
- **F6, major:** `/`, `/en/`, 390/1440, both themes, first viewport:
  absent real product screen. Hosted Ratametsuri proof improves the onward
  path but leaves this front-page issue open.

Fresh production build, 128 matrix cells, 48 narrow reflow cells,
32 journeys/160 link transitions, and 96 native Chrome zoom cells passed.
Actual default text was 16/24 px; Chrome zoom covered
100/110/125/150/175/200%. All 32 changed baselines were inspected and
approved individually; the other 88 current files match approved SHA-256
values, and sixteen earlier deletions retain approval. Earlier 405a839d,
5b9534ad and d6a4e42c evidence is reused for the unaffected behavior named
in `review-notes.md`.

`ds gate --base origin/main --branch copy/fi-native --json`: pass,
zero errors, 42 existing warnings: 19 missing Supersedes fields,
one missing model-results setting, one accepted D20 retrofit notice,
15 allowed skip-link target warnings, six unchanged 404 contrast
uncertainties. `gate-warnings.md` lists each warning and the prior manual
contrast assessment. Final local `review verify`: exit 0, zero errors,
12 expected warnings (two uncommitted inputs and ten uncommitted evidence
files). The changed-document terms check and `git diff --check` passed.

Files written: both JSON verdicts, this evidence directory, appended
execution records in `.ds/reviews/steps/W0.md`, `W1.md`, `W3.md`, `W5.md`,
and one note in `docs/design/opportunity-tree.md`. `artifacts.json` lists
the small evidence package; bulk captures and scripts remain ignored
under `design/shots/review-53cb5690/`. Owned Chrome contexts and the local
review server are closed. No product source or baseline changed; no
commit or push was made.

No wording judgment, signup submission, real address, live signup-origin
request, emulator or simulator. Hardware, Safari, screen-reader output,
text-only zoom and a real email round trip remain unclaimed.

Next: the coordinator commits the verdicts, evidence and related docs,
then runs the normal current-head PR gates. No review blocker remains.
