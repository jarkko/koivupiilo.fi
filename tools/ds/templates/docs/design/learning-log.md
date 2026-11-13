# Learning log

Every problem that reached the owner, a tester or a user when an earlier step should have caught it. One row per escape. The row records the history; the fix lives in the rule, eval case, guide or template it links to. The process is in the kit's `learning-loop` guide.

## How to add an escape

<!-- Add a row when you fix an escape, not later. Fill every column. -->

- **date:** when the escape was found, `YYYY-MM-DD`.
- **finding:** what went wrong, as the person who hit it would say it. Name the screen or flow and its `M<n>`/`W<n>` id.
- **found by:** where it surfaced: `owner`, `tester`, `user`, `milestone`, `drift audit` or `bug report`.
- **earliest step:** the first step that had the information to catch it, using the step names in the learning-loop table (e.g. `Product model`, `Defect review`, `Edit-time lint`).
- **why it missed:** one sentence. The rule didn't exist, the check was too narrow, the guide didn't ask, the reviewer didn't look.
- **became:** at least one of `rule+check`, `eval case`, `guide change`, `template change`, most automatic first. Separate two with a comma.
- **link:** the commit or merge that added the fix. A row without a link is not done.

## Escapes

| date | finding | found by | earliest step | why it missed | became | link |
|---|---|---|---|---|---|---|
| 2026-10-26 | Ending a session deleted its results (W3, M4). | milestone | Product model | The lifecycle had no rule that a finished session is kept. | `rule+check`, `eval case` | `a1b2c3d` |
