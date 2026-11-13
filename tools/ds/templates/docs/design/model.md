# <Product> model

<!-- The product model, stated once. Plans, stories, specs and checklists reference M, W and D ids and never restate it. A change here is discussed with the owner first and recorded as a D that supersedes the old text. -->

Status: <draft | agreed YYYY-MM-DD> · Example lines describe a shared household shopping list; replace them.

## Mental model

<!-- How the user thinks about the product, in their words. Vocabulary is derived from this paragraph. -->

"We have one list on the fridge. Anyone writes on it; whoever shops crosses things off. A crossed-off line is still there until someone wipes the list."

## Objects

<!-- One ### section per object the user sees and names. Each lists relationships, actions and attributes, then its lifecycle as numbered M rules: create, edit, finish, close, reopen, archive, delete, and what is never lost. -->

### Item

- Relationships: belongs to one List; added by one Member.
- Actions: add, edit, tick, untick, delete.
- Attributes: name, quantity (optional), aisle, added by, ticked by, ticked at.
- **M1** Adding an item puts it at the top of its aisle group, unticked, visible to every member within 2 seconds.
- **M2** Ticking keeps the item on the list, struck through, until the list is cleared; untick restores it in place.
- **M3** Clearing the list moves ticked items to History; nothing is deleted without an explicit, undoable action.

## Vocabulary

<!-- One term per concept, per language, lives in termbase.tsv. List here only the core terms and the concept each names; superseded terms become forbid patterns there. -->

Terms: [termbase.tsv](termbase.tsv). Core: item, list, tick, clear, history.

## Places and navigation

<!-- A breadboard: places, what is on each, and how you move between them. Per place: primary, secondary and rare tasks with frequency, and a density stance. -->

| Place | Primary task (frequency) | Secondary | Rare | Density |
|---|---|---|---|---|
| List | Tick items (every trip) | Add an item | Clear ticked | Dense: the whole shop fits on one phone screen |

Breadboard: List → (Add field, inline) · List → History (from the menu) → back to List.

## Errors, recovery, interruption and resume

<!-- For each lifecycle step: what can fail, what the user sees, and how they recover. Then what happens when the app is interrupted mid-task and how it resumes. -->

- Offline tick: the tick shows at once, marked "Not synced", and syncs when the connection returns; a conflict keeps the tick.
- Interrupted add: a half-typed item stays in the field when the app comes back.

## Trust moments

<!-- Where the user needs proof that something worked, and what that proof is. -->

- After ticking in a shop with poor signal: the row shows when it reached the others ("Synced 10:42").

## Walkthroughs

<!-- Numbered end-to-end paths a reviewer walks in the running app. Each has a Pass when line. Mark a walkthrough that only a real device can test with device: and say why. Tests are named after these ids. -->

### W0 First run and empty states

<!-- Mandatory. The first launch, every empty state, and the path to the first useful result. -->

Open the app for the first time, create the household list, add the first item.

Pass when: a new user reaches their first item in under 30 seconds without help, and every empty state names what is missing and offers one action.

### W1 Shop one-handed

device: one-handed use, glare and real signal need a phone in a shop.

Tick five items with the thumb while walking; untick one.

Pass when: every tick lands on the first tap and the unticked item returns to its place.

## Signature moments

<!-- The 1–2 interactions this product should own, each with a written quality bar. -->

- Ticking an item: the strike-through follows the thumb, a light haptic confirms it, and the row settles in under 200 ms.

## Non-goals

<!-- What the product model deliberately leaves out. -->

- Prices and budgets.

## Decisions

<!-- Product-model decisions only; design decisions live in brief.md, and D ids are one sequence across both files. Every model change is first put to the owner as a choice in the format below, then recorded verbatim as a D line in this exact format. Evidence is a grade (research, practitioner consensus, anecdote or opinion) with its basis, never the owner-only provenance label; when the owner decides against the evidence, Dissent records it. In the same change: search docs, plans, UI strings and identifiers for the superseded concept; rewrite or remove every hit and list each changed passage under Changed; quote the superseded wording under Supersedes and add a forbid pattern for it to termbase.tsv; then play back the updated model to the owner as an experience ("You tick the eggs… tomorrow you open the list and…") before moving on. -->

- **D1** (2026-10-14) A list belongs to a household; every member sees and edits the same list. Supersedes: none. Changed: model.md Item relationships, brief.md A1. Evidence: anecdote: the owner's own household (A1, owner-only and unvalidated); counter-argument: couples often keep personal lists alongside a shared one. Dissent: none.

**Choice: What happens to an item when it is ticked?** (asked 2026-10-21)

- **A.** It stays on the list, struck through, until the list is cleared. Shown: `prototypes/tick-stays.mov` on a phone, next to Apple Reminders with "show completed" on. Tradeoff: a mistaken tick is visible and easy to undo, but a long trip leaves a longer list.
- **B.** It leaves the list at once and goes to History. Shown: `prototypes/tick-leaves.mov`, next to Bring!. Tradeoff: the list shrinks as you shop, but a wrong tick vanishes from view.
- Recommendation: A, because the M0 walkthrough of an earlier pilot found items disappearing without a visible outcome, and undo needs the item in view.
- Evidence: practitioner consensus: Reminders, Things and AnyList keep completed items visible or one tap away; the vanishing-item finding is anecdote.
- Strongest counter-argument: in a big shop the struck-through rows push unticked items below the fold.
- Reversible: yes before launch; after launch it changes a habit, so it needs a D and a playback.
- Decided: A (owner, 2026-10-21). Recorded as D4.

- **D4** (2026-10-21) Ticked items stay on the list, struck through, until it is cleared. Supersedes: the earlier draft where "bought items disappear" ("removed when bought"). Changed: model.md M2, story-map.md Tick off step, termbase.tsv tick row. Evidence: practitioner consensus: Reminders, Things and AnyList keep completed items in view; counter-argument: long lists push open items below the fold. Dissent: none.
