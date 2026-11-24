# PR 2 critique assessment at the merged hash

Reviewer: GPT/Codex; implementer: Claude. Reviewed HEAD
`6fd0c43fa519b62f06c46e64af97da3342148409`, UI hash
`53cb569055d6f756d125409b5e461e1e930354093448d66984b2d0eced419096`.
I used the first-arrival/company-check scene: a visitor follows a referral,
opens Products, inspects Ratametsuri, then checks the policy and company
identity. These are reviewer observations, not target-user results.

I retain the three answers from critique `405a839d` and its grades, reference
comparisons and counter-arguments. I changed the 2x answer's rationale to
acknowledge the new hosted proof. A visitor can now open a real Ratametsuri
screen without leaving koivupiilo.fi. The earlier claim that visitors must
leave the company site for visual proof no longer applies. The proposed
single improvement still concerns the front page's first viewport, where
the visitor sees product names and descriptions without a product screen.
Fresh evidence: `tuotteet-baselines.webp`, `en-products-baselines.webp`,
the two Ratametsuri `*-default24.webp` sheets and `walk-report.json`.

- **Remove:** simplify the second decorative bark field on the bilingual
  404. The merge changes neither that page nor its baseline hashes.
  Reuse the original 404 screenshot and manual contrast calculation.
- **One 2x change:** show one authorized product capture in the front
  product block. The visitor now reaches Ratametsuri's proof after two
  links through the index; the front viewport remains text only. This
  retains O-c3/S-1. The strongest counter-argument is stronger after the
  merge: Ratametsuri already has a dedicated proof page, so duplicating
  it must justify its maintenance, privacy and loading costs. No measured
  conversion or 2x effect is claimed.
- **References:** the CSS Wizardry/thoughtbot visual-proof gap remains on
  the front and index, while Ratametsuri improves the next destination.
  Panic's concise offer and bilingual mechanics remain the bar; real
  same-page switches passed. The Kisko Labs/Set Studio/Clearleft service
  comparison and Cristina Gómez founder-image comparison retain their
  original scope and evidence because those pages and baseline hashes
  are unchanged. Ottografie still provides an example of immediate
  evidence within a work list. The specific award-library anchors remain
  `references/awards/studio-portfolio.md#cristina-gomez` and
  `#ottografie-otto-van-den-toorn`. I read the local annotated entries;
  this review makes no claim about those websites today.

The policy's nested headings, links and list spacing fit the merged
company chrome. I found no extra element to remove there. Ratametsuri's
separate brand follows D24. Its existing product-specific opportunities
remain under O-r1–O-r4/S-r1 and critique `5b9534ad`; this review does not
duplicate them or replace its product-landing assessment.

The new critique JSON points to the original graded evidence and this
assessment. The opportunity tree receives one note linking the retained
O-c3–O-c6/S-1 answers to this hash and recording the hosted-proof improvement.
Finnish and English wording, tone and grammar remain outside scope.
