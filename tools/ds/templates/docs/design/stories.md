# <Product> stories

<!-- One entry per user story, each with an S id that never changes or gets reused. The order of work is story, then its failing acceptance test, then code. Decisions about spend, services, infrastructure and architecture name the story they serve by its S id (decision-format, step 0). The story map arranges stories into slices; this file gives each one its id, budget and test. Reference model ids (M, W) instead of restating the model. -->

Status: draft · <YYYY-MM-DD>

## Stories

### S1 · Tick an item off while shopping

- When: in the aisle, one hand on the trolley, phone in the other.
- I want: to tick an item with one tap,
- so I can: see what's left without stopping.
- Budget: instant (under 100 ms to the ticked state), works offline, no data leaves the phone. (M3)
- Acceptance test: `test/features/tick_item_test.exs` "S1 ticks an item with one tap offline"
- Status: built · acceptance test passing
