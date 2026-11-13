# Interaction-craft checklist

<!-- The feel bar: what separates a correct product from one people love using. Every item carries its evidence grade (research, practitioner consensus or anecdote) so a reviewer knows how hard to push. Keep the grade honest when adding an item. -->

The bar is the best product in the category (Linear, Stripe, Apple's own apps). A flow that passes every other checklist can still fail here.

## Response

- [ ] Every input gets visible feedback within 100 ms, so the person feels the interface reacted to them. Evidence: research ([Nielsen, response-time limits](https://www.nngroup.com/articles/response-times-3-important-limits/), after Miller 1968 and Card et al. 1991).
- [ ] Anything taking longer than about 1 second shows progress in place; beyond about 10 seconds it shows percent or steps and can be cancelled. Evidence: research (same source).
- [ ] Likely-to-succeed actions update the UI optimistically and reconcile afterwards; a failure rolls back visibly with the reason and a retry. Evidence: practitioner consensus.
- [ ] Spinners and skeletons wait ~150–300 ms before showing and stay at least ~300–500 ms, so fast responses don't flicker. Evidence: practitioner consensus.

## Motion

- [ ] Every animation has a written purpose: show where something came from or went, confirm an action, or connect two states. Decoration alone is not a purpose. Evidence: practitioner consensus.
- [ ] Small UI transitions run about 150–250 ms, larger moves and sheets about 250–400 ms; nothing the person waits on runs longer. Evidence: practitioner consensus.
- [ ] Entering elements ease out, leaving elements ease in; physical motion uses springs that can be interrupted mid-flight. Evidence: practitioner consensus.
- [ ] Only `transform` and `opacity` (or the native equivalents) animate, so motion never drops frames. Evidence: practitioner consensus.
- [ ] Reduced-motion settings replace movement with a fade or an instant change, never with nothing. Evidence: research (vestibular disorders; [WCAG 2.2 SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- [ ] The 3–5 key transitions are specified as trigger, property, duration, curve and purpose before they are built. Evidence: practitioner consensus.

## Input

- [ ] Web: every action is reachable from the keyboard, frequent ones have shortcuts, and a command menu covers the rest. Evidence: practitioner consensus.
- [ ] Native: haptics confirm meaningful actions (a tick, a commit, an error) and stay silent for everything else. Evidence: practitioner consensus.
- [ ] Hit areas are generous and forgiving; a near miss lands on the control the person meant. Evidence: research (Fitts's law).
- [ ] Number, date and decimal entry follows the region the person is in, including the keyboard and the example value. Evidence: anecdote (field findings from earlier pilots).

## Risk

- [ ] Anything that removes work the person made (an item, a note, a whole list) is recoverable: it happens at once with undo, or lands in a trash or history they can restore from. Confirmation alone never meets this; add it on top only when the loss is large. Evidence: practitioner consensus (house rule, never relaxed).
- [ ] Confirmation alone is for external actions that cannot be taken back (sending, paying, publishing, cancelling a subscription), never for removing the person's own work, and it names exactly what will happen. Evidence: practitioner consensus.
- [ ] Each destructive path has a tagged acceptance test that removes the work through the UI (delete, discard unsaved input, empty the trash or history), restores it through the UI, and asserts the exact contents are back. Evidence: anecdote (data loss passed review in an earlier pilot).
- [ ] Finishing, closing and exporting never delete; deletion is its own explicit action. Evidence: anecdote (data loss found in an earlier pilot's first field walkthrough).
- [ ] A flow interrupted by a call, a lock or a crash resumes where it stopped, with nothing typed lost. Evidence: practitioner consensus.

## Continuity

- [ ] Items never vanish without a visible outcome: a moved, finished or deleted item shows where it went or how to get it back. Evidence: anecdote (earlier pilot walkthrough).
- [ ] Sound, speech and haptics stay in sync with what the screen shows. Evidence: anecdote (earlier pilot walkthrough).
- [ ] A start or transition never shows a blank or black frame; the next state is prepared before the switch. Evidence: anecdote (earlier pilot walkthrough).
- [ ] A screen has one primary action, and a sequential task looks sequential (steps, not tabs). Evidence: practitioner consensus.
