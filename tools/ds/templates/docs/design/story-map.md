# <Product> story map

<!-- Activities left to right in the order a user does them; steps under each; stories under each step, most essential first. This is the bridge into the backlog. -->

Status: draft · <YYYY-MM-DD>. Stories reference model ids (M, W) once model.md exists; they never restate the model.

## Activities

<!-- The big things a user does, in time order. Verbs, from the user's side. -->

1. Plan the shop · 2. Shop · 3. Put things away

## Steps and stories

<!-- Per activity: its steps, and under each step the stories, most essential first. A story is a user-visible capability, small enough to ship in days. -->

### 2. Shop

- **Find what's left:** see unticked items grouped by aisle · see who added an item
- **Tick off:** tick an item with one tap · undo a tick

## Release slices

<!-- Horizontal cuts through the map. Mark the walking skeleton: the thinnest end-to-end slice that real users can use daily. The owner picks the first slice from A/B options in the decision format below; the outcome is recorded as a D line in brief.md. -->

- **Slice 1 (walking skeleton):** add an item, see the list, tick an item, undo a tick, on one shared household list.
- **Slice 2:** aisle grouping, who added what.

**Choice: Which slice ships first?** (asked 2026-10-20)

- **A.** Slice 1 alone, in the household's daily use within two weeks. Shown: the clickable slice-1 build on the owner's phone, next to Apple Reminders' plain shared list. Tradeoff: real use starts soonest, but the list is in adding order, not aisle order.
- **B.** Slices 1 and 2 together, in about five weeks. Shown: the slice-1 build plus an aisle-grouping prototype, next to AnyList's aisle categories. Tradeoff: the first trip already feels finished, but three more weeks pass without field feedback.
- Recommendation: A, because field use finds problems no prototype shows, and aisle grouping can be judged from real trips.
- Evidence: practitioner consensus: walking skeletons and thin slices into real use first (Patton's story mapping, Shape Up).
- Strongest counter-argument: an unsorted list may lose against paper on the first trips and colour the household's verdict.
- Reversible: yes; slice 2 follows whichever ships first.
- Decided: A (owner, 2026-10-20). Recorded as D3.
