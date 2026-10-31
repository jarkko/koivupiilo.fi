# Infrastructure

Last verified against the providers: 2026-10-31 by Claude (Opus 5.5), read-only:
DNSimple API (account 726), `dig`. GitHub repo settings not checked.

| Resource | Provider / account | Region | Identifier (hostname, IP, app) | Purpose | Secrets live in (never values) | ~€/month | Created (who, when) |
|---|---|---|---|---|---|---|---|
| Domain `koivupiilo.fi` | DNSimple account 726 (registrar Key-Systems) | – | `koivupiilo.fi`, auto-renew on, expires 2027-11-04 | Company domain | `DNSIMPLE_TOKEN` (laptop env) | ~1–2 (yearly fee) | Jarkko, before 2026 |
| DNS zone `koivupiilo.fi` (apex + mail records) | DNSimple account 726 | – | apex: **no A/AAAA**; `www`: **no record**; MX `eu1/eu2-smtp.messagingengine.com`; DKIM CNAME `fm1–3._domainkey`; TXT SPF `include:spf.messagingengine.com` | Website (not yet pointed anywhere) and company mail (Fastmail) | `DNSIMPLE_TOKEN` | 0 (in DNSimple plan) | Jarkko |
| Code repository | GitHub `jarkko/koivupiilo.fi` | – | `git@github.com:jarkko/koivupiilo.fi.git` | Current remote. **To be moved** to GitLab `jarkster-group` (see below) | – | 0 | Jarkko, 2025 |
| Deploy workflow | GitHub Actions + GitHub Pages | – | `.github/workflows/deploy.yml` → `gh-pages` branch, `cname: koivupiilo.fi` | Builds and publishes `output/`. Not serving: the apex has no record | `GITHUB_TOKEN` (Actions) | 0 | Jarkko, May 2026 |

Mail provider (Fastmail) account and billing are not recorded here; add the
account owner when verified.

## Deploy
Currently: push to `main` on GitHub → Actions builds with `bundle exec rake
deploy` → `gh-pages`. Nothing is live because DNS does not point at it.

Proposed (BLOCKED on Jarkko, not part of the 2026-10-31 spike): move the repo
to GitLab `jarkster-group/koivupiilo-fi`, build in GitLab CI, publish the
static `output/` to an EU host (Bunny Storage + CDN, Hetzner Object Storage
or a small Hetzner/UpCloud box with Caddy), then set apex `A`/`ALIAS` and
`www` through the DNSimple API and drop `deploy.yml` and the GitHub remote.

## Not ours
Records in this zone owned by other repos (do not touch from here):
- `*.monitoring` (logs, errors, ntfy, umami, support, poc, mx) and their
  Brevo DKIM/DMARC records: `~/code/monitoring/docs/infra.md`.
- `kulut` (A 80.47.224.240, MX, SPF, Brevo DKIM/DMARC) and the apex-level
  `brevo1/brevo2._domainkey` CNAMEs (point at `kulut-koivupiilo-fi`):
  Kuittinen (`~/code/kuittinen`); monitoring manages the `kulut` MX.
