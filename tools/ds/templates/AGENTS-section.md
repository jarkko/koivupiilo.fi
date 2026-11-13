<!-- ds:begin -->
## Design kit

- Before any UI work, read `docs/design/kit.toml`. It lists the modules that are on and, under `[docs]`, where each design document lives (product model, house rules, voice, termbase, platform checklist). Read the ones the modules that are on use.
- With `model` on, the product model lives only in the file `[docs].model` names (`model.md` by default). Plans, stories and tests reference its M/W/D ids and never restate it.
- With `model` on, a model change (object, lifecycle state, term or navigation) is discussed with the owner first, as A/B options, and recorded as a `D` that supersedes the old text.
- With `model` on, write the tagged acceptance test first: its name carries the `M<n>`/`W<n>` id and it drives the real UI control.
- What rejects what (each check only when its module is on): lint rejects raw colours, fonts and spacing; terms rejects forbidden terms; contrast rejects pairs below WCAG 2.2 AA; model check rejects an M or W with no passing test, except a `device:` W, which stays a pending warning until its Pass when line is met on a real device at the milestone (never fake a simulator pass); review verify rejects UI changes without a reviewer's verdict.
- Before you finish, run `node tools/ds/ds.mjs gate`, fix every error, and report every warning in your hand-off instead of hiding it.
<!-- ds:end -->
