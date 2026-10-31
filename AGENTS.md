# AGENTS.md: koivupiilo.fi

Koivupiilo Oy's website: a static Bridgetown site, Finnish at `/`, English at
`/en/` (see `docs/design/model.md` D3). Owner: Jarkko Laine.

## Design process

This repo is the web pilot of the cross-project design process
(metamorphosis `docs/specs/2026-10-25-design-process-design.md`). Groundwork
lives in `docs/design/` (`brief.md`, `references.md`, `story-map.md`,
`model.md`, `termbase.tsv`, `kit.toml`). The model is stated only in
`model.md`; reference `M`/`W`/`S`/`D` ids elsewhere. Visual directions live in
`design/directions/`.

House rules:
- No light/dark toggle anywhere; follow `prefers-color-scheme`.
- No claim (number, client, title, award) without a source (D6).
- Nothing about Selma beyond one CV line (D7). No client work without permission (D8).
- No real athletes', players' or club members' names or faces without consent.
- Repo and hosting: GitHub + GitHub Pages (D13). Self-host fonts and add no
  third-party trackers (privacy and speed), so no Google Fonts or Google Analytics.
- Finnish copy goes through the `suomen-kieli` skill; English through `stop-slop`.
- Every page in both languages before publishing (M2).

## Standing authority

The orchestrator may always do these without asking Jarkko:

- Take an MR out of Draft and merge it once every merge gate in this repo's
  workflow passes (independent approval, resolved discussions, up-to-date
  target, current-head CI green).
- Remove worktrees whose branch is merged and that have no live agent.
- Start the next ready task in the plan or backlog.
- Re-run flaky CI, rebase-free target updates, and other routine MR upkeep.
- Deploy to production through the project's normal pipeline (merge to main,
  CI deploy jobs, re-running a failed deploy job), including the migrations
  that pipeline applies. Shipping is the daily job, not an exception.
- Bring a broken production service back: restart crashed machines or
  databases, and restore from the latest backup or snapshot when it will not
  come back otherwise. Report afterwards what was lost, if anything.
- Finish infrastructure work that was already started (a migration, rebuild
  or switch with a runbook or plan in the repo): DNS changes in our own zones
  through the DNSimple API, a short maintenance window, and deleting the old
  resource once the rollback period in the runbook has passed. Steps a
  runbook marks "USER" are yours unless they need a login only Jarkko has.
  Never leave two production servers running half-switched.

Always ask Jarkko first for:

- Spending money (new or larger paid resources, paid compute).
- Production data while production is healthy (writes, migrations run by
  hand, exports, deletions). Recovering a broken production is listed above.
- Deleting unmerged work (branches, worktrees, stashes with unmerged commits).
- Irreversible actions outside git that start something new (registering or
  transferring domains, app-store submissions, emails to real people).

When you do need Jarkko, end with one line: `BLOCKED: <item above>: <question>`.
Never end a turn with a question the list above already answers.

## Infrastructure

Before creating, resizing or deleting any paid or external resource (servers,
databases, object storage, DNS records, domains, app-store or SaaS accounts):

1. Read `docs/infra.md`.
2. List what the provider already has (for example `upctl server list`,
   `upctl database list`, `hcloud server list`, `fly apps list`). The provider
   is the truth; the doc can be stale.
3. Ask Jarkko before anything that costs money.

After any change, update `docs/infra.md` in the same commit or MR.
