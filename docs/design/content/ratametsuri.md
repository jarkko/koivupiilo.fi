# Ratametsuri: fact log and problem card

Sources are the Ratametsuri repository (`R` = `/Users/jarkko/code/ratametsuri`,
`main` at `c3e951e`, read 2026-11-21) unless named. Grades: **H** stated in the
repo, **M** read from code or config, not a product claim. Nothing marked
UNKNOWN goes on the page (D6, M3).

## Fact log

### What it is and for whom

| Fact | Source | Grade |
|---|---|---|
| "Native macOS app for setting orienteering courses." | R/README.md:3 | H |
| For course setters (ratamestari) at clubs: a club setter planning a forest event from a PDF or scanned map a few times a season, and a coach setting weeknight trainings on whatever map file the club has. Personas written by the owner; no one has been observed using the app yet. | R/docs/design/stories.md:32-34, 86-92 | H |
| Model: an event is one background map and a set of shared controls; each course visits controls in order, and moving a shared control moves it on every course. | R/docs/research/2026-10-18-course-setting.md:15-19 | H |
| Built: open a map, place start, controls and finish; several courses sharing controls; circle and leg gaps; draggable control numbers; typed climb; live control-description sheet with IOF 2024 symbols; zoom; undo and redo; save and reopen an event file. | R/docs/handoff.md:15-21; commits 638c9d7, 0c9e41e, 5bc5f53, 1556901, 7e90bb5, 25b288c, d9123aa | H (commits), M (owner has not walked all of them) |
| Maps in: PDF, PNG, JPEG, TIFF (the setter types the print scale). | R/macos/Ratametsuri/Ratametsuri/CourseWindow.swift:195; stories.md S1 | H |
| Out: a course PDF (one page per course, purple overprint and description sheet) and IOF XML 3.0 course data. | R/docs/handoff.md:21; CoursePDF.swift; CourseDataXML.swift | H |
| Planned, not built: OCAD maps (after a licence decision), score courses, several starts, relays and map exchange. | R/docs/design/stories.md:61-66 | H |
| No differentiator chosen against Purple Pen, Condes or OCAD. | R/docs/research/2026-10-18-course-setting.md:8-12 | H |
| Finnish and English UI; light and dark. | Info.plist CFBundleLocalizations; Localizable.xcstrings | H |

### Platform and status

| Fact | Source | Grade |
|---|---|---|
| macOS 14 Sonoma or later; Swift 6, SwiftUI; sandboxed, hardened runtime, no network entitlement. | R/macos/Ratametsuri/project.yml; Ratametsuri.entitlements | H |
| Apple silicon only has been built (arm64 Debug); Intel support UNKNOWN. | R/output/demo-preview/…/README.md (local) | M |
| Not released: no tags, no release pipeline; version 0.1 build 1 in build settings (Info.plist still says 1.0). | `git tag` empty; R/docs/infra.md:19-21; project.yml | H |
| koivupiilo.fi status: `development` (kehitteillä), checked 2026-11-12. | src/_data/work.yml | H |

### Beta distribution

| Fact | Source | Grade |
|---|---|---|
| Nothing set up: no App Store Connect, Fastlane, team ID or distribution signing; ad-hoc signed (`CODE_SIGN_IDENTITY "-"`). | R/docs/infra.md:84-87; project.yml | H |
| No TestFlight, notarization, Sparkle, appcast or DMG anywhere in the repo or its GitLab issues. | grep of R; `glab issue list --all` | H |
| This Mac holds only Apple Development certificates (no Developer ID Application). Kvitti signs with another team (DSXEHULFB3, "O'Design"), so Jarkko has access to a paid team, but not one in Koivupiilo Oy's name as far as the repos show. | `security find-identity -v -p codesigning`; kuittinen/docs/demo.md:106-111 | M |
| An ad-hoc signed build is blocked by Gatekeeper on other Macs; on macOS 15 and later the tester has to allow it in System Settings → Privacy & Security. | Apple platform behaviour | M |

### Images

| Fact | Source | Grade |
|---|---|---|
| No app icon (AppIcon is referenced; no asset catalog exists). | project.pbxproj:597, 638 | H |
| Real UI screenshots exist only as local, gitignored XCUITest captures on blank test maps; none is marketing grade. | R/output/evidence/issue25-native/screenshots/ | H |
| Committed map fixtures: Bygholm-Skov.png (CC BY-SA 3.0, Tage Baun and Preben Jørgensen; credit and share-alike), helsinki-central-park.pdf (OpenStreetMap-derived, attribution must stay). The demo forest sample is a GPLv3 OpenOrienteering Mapper example. | R/macos/Ratametsuri/Fixtures/MapImport/README.md | H |

### Name

| Fact | Source | Grade |
|---|---|---|
| "Ratametsuri", one word, capital R only; same name in English. | project.yml CFBundleDisplayName | H |
| Bundle id `fi.ratametsuri.mac`; documents `.ratametsuri`. | project.yml; Info.plist | H |
| Meaning, trademark and domain: UNKNOWN; no ® or ™ anywhere. | grep of R | H (absence) |

### Unknowns (not on the page)

Release or beta date; price and licence; who the beta is for and how many;
Intel support; whether MeOS accepts the XML beyond one narrow test; the
name's meaning; a domain. No user counts exist.

## Problem card

```
Problem: Someone who hears about Ratametsuri has nowhere to see what it is or
  ask for the beta, and Jarkko has no list of who to send the build to.
Who: A club course setter or coach with a Mac who hears of Ratametsuri from
  Jarkko, a club or a shared link; and Jarkko, sending the beta out.
What goes wrong: The products page gives one line and no link. The only way
  in is the footer address, with no hint of what the app does, what Mac it
  needs or what to write. How often: unknown; no requests have been counted.
Already handled by: the footer email (reaches Jarkko, explains nothing);
  D14's own product site (none exists for Ratametsuri; no domain); nothing
  collects requests. Checked: work.yml, routes.yml, the Ratametsuri repo.
Smallest fix: one page per language in Ratametsuri's own brand, not the
  site's (D24): what it does today (built features only), one real screen on
  the Kauppi map (Tampereen Pyrintö), the Mac it needs, an honest status, and one way to ask for
  the beta. A small maker line names Koivupiilo Oy, its business ID and the
  privacy page, which says what happens to those emails.
Evidence: Jarkko's request via the coordinator (anecdote, owner); the fact
  log above (H); no observed users (R/docs/design/stories.md:32-34, H).
```
