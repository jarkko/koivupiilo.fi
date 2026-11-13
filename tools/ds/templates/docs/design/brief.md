# <Product> brief

<!-- One page. Decides what is worth building and for whom; UX quality comes later. Replace every example line; delete these comments when done. -->

Status: draft · <YYYY-MM-DD> · owner: <name>. Evidence and hypotheses are kept apart: every claim below is either backed by a source in the Assumptions table or marked as an assumption there.

## Problem (in the user's words)

<!-- Quote or paraphrase a real moment the user described. No product language, no solution. -->

"We get home and someone has already bought milk, but nobody bought the bread." (owner, interview 2026-10-12)

## Who and when

<!-- The person and the moment they reach for the product. One line per person; no invented personas. -->

- A parent in a shop aisle, phone in one hand and a basket in the other, checking what the household still needs.

## What changes for them

<!-- Written as the user would describe it after a month of use, in their words. -->

"I stopped texting home from the shop. What's on the list is what we need, and nothing gets bought twice."

## Success measures

<!-- Observable signals, each with how it is measured and the target. -->

- Duplicate purchases: fewer than one a month, from the owner's friction notes over four weeks.

## Appetite

<!-- How much this is worth building before it is reshaped or stopped (Shape Up). Time, not scope. -->

Six weeks of agent work to a walking skeleton in the household's daily use; reassess before adding anything else.

## Non-goals and no-gos

<!-- What this product will not do, and what it must never do. A no-go is a line that is never crossed. -->

- Non-goal: recipes and meal planning.
- No-go: a ticked item is never lost; untick and history stay available.

## Jobs

<!-- Job stories from real moments: "When…, I want…, so I can…". One per line; the user's situation, not a feature. -->

- J1. When I'm in the shop and remember something we're out of, I want to add it in two taps, so I can keep walking.

## Scenes

<!-- Per scene: where, device, hurry, conditions, frequency. These replace personas and drive layout, type size and input. -->

| Scene | Where | Device | Hurry | Conditions | Frequency |
|---|---|---|---|---|---|
| Aisle check | Shop aisle | Phone, one hand | High | Glare, gloves in winter, poor signal | 2–3 times a week |

## Assumptions

<!-- Every belief the design rests on. Risk = what breaks if it is wrong. Evidence is provenance: owner-only (only the owner backs it), user-tested or data. An owner-only row stays unvalidated until a test or data changes its evidence; say how it will be tested. -->

| id | assumption | risk | evidence (owner-only/user-tested/data) | status and next test |
|---|---|---|---|---|
| A1 | Households share one list rather than one per person. | High: the model changes if lists are personal. | owner-only | Unvalidated. Model decision D1 builds on it; ask three other households in the first tester round. |

## Decisions

<!-- Design decisions only: layout, interaction, visual and scope choices. Product-model decisions (objects, relationships, lifecycle, vocabulary, navigation) live in model.md and are referenced here by id. D ids are one sequence across brief.md and model.md, so D7 means one thing. Each owner choice is presented in the format below, then recorded verbatim as a D line. Evidence is a grade (research, practitioner consensus, anecdote or opinion) with its basis; it is not the owner-only provenance label. When the owner decides against the evidence, the agent says so once and the D line records the dissent. -->

**Choice: How does a person tick an item?** (asked 2026-10-16)

- **A.** Tap anywhere on the row. Shown: `prototypes/tick-row.mov` on a phone, next to AnyList's list rows. Tradeoff: the biggest target for a thumb in a moving basket, but a scroll that ends on a row can tick it by accident.
- **B.** Tap a circle at the leading edge; tapping the row opens the item. Shown: `prototypes/tick-circle.mov`, next to Apple Reminders. Tradeoff: no accidental ticks and room for item details, but a smaller target while walking.
- Recommendation: A, with a 44 pt row and the tick firing on release, because ticking happens every trip and editing rarely.
- Evidence: research: Fitts's law (larger, closer targets are hit faster and more reliably); the accidental-tick risk is anecdote.
- Strongest counter-argument: Reminders, the reference most people know, uses B, so A breaks a learned habit.
- Reversible: yes, a few days of work before launch; after launch it retrains every user.
- Decided: A (owner, 2026-10-16). Recorded as D2.

- **D2** (2026-10-16) Tapping anywhere on a row ticks the item. Supersedes: none. Changed: brief.md Decisions. Evidence: research: Fitts's law; counter-argument: Reminders users expect a leading circle. Dissent: none.
- **D3** (2026-10-20) The first release is slice 1, the walking skeleton in story-map.md. Supersedes: none. Changed: story-map.md Release slices. Evidence: practitioner consensus: thin end-to-end slices in real use first (Patton, Shape Up); counter-argument: without aisle grouping the first trips may feel worse than paper. Dissent: none.
