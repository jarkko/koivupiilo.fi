# Product model (light): koivupiilo.fi

One home per fact: places, rules, walkthroughs and decisions for the site live
here only. Other docs reference `M`/`W`/`S`/`D` ids.

## Visitor's mental model

"Koivupiilo is Jarkko's company. He builds his own apps, mostly around sport,
and you can also hire him: for software, to coach volleyball, or to work with
a team or a leader." Vocabulary follows from that: *products / work*, *offers*
(not "service lines", not "solutions"), *Jarkko* (first person on the site,
not "we": it is one person, D2).

## Objects (content, not user data)

| Object | Attributes | Relationships |
|---|---|---|
| **Work item** (product or project) | name, one-line what, for whom, platform, stack, years, role, **status**, hero image, body (FI + EN) | belongs to 0–n offers as proof |
| **Offer** | name, who it's for, how it starts, format, optional price floor | proven by work items |
| **Person** (Jarkko) | name, photo, short bio, verified CV lines | owns everything |

Lifecycle rules:
- **M1** Every work item shows exactly one status from `live`, `in use`,
  `in development`, `prototype`, `dormant`, with the date it was last true.
  Status is never omitted or inflated (D6).
- **M2** Every work item and page exists in both languages before it is
  published; a page never falls back to the other language mid-page (D3).
- **M3** A claim (number, client, award, title) appears only if it has a
  source recorded in `docs/design/content/` or Jarkko confirmed it (D6).

## Places and navigation

Finnish at `/`, English under `/en/` (D3). Header: name/logo, 4 places,
language link. Footer: email, business ID, imprint, language link.

| Place | FI path | EN path | Primary task | Secondary | Rare | Density |
|---|---|---|---|---|---|---|
| Front | `/` | `/en/` | Grasp what Koivupiilo is and see real products (J1, J4) | Jump to an offer | — | Low: one sentence, products, three offers, contact line |
| Work (index) | `/tyot/` | `/en/work/` | Pick a product to look at | Scan everything built | — | Medium: list with status |
| Work item | `/tyot/<slug>/` | `/en/work/<slug>/` | Judge competence from one real product (J1–J3) | Contact from the end | Open the product's own site | Reading page, 400–700 words |
| Offers | `/palvelut/` | `/en/services/` | Find the matching offer and how it starts (J2, J3) | See proof per offer | — | Medium: three blocks |
| About | `/tietoa/` | `/en/about/` | Verify the person (J4, J5) | — | Business ID | Low |
| Contact | `/yhteys/` | `/en/contact/` | Write a good first email (J1–J3) | Other channels | Imprint | Low |
| 404 | `/404.html` | — | Get back on track, in both languages | | | Minimal |

## Trust moments

- Front page first viewport: a real product screen, not decoration (S-1).
- Work item header strip with honest status (M1).
- Contact: a real address, reply time, business ID (J5).

## Walkthroughs

- **W0 First arrival.** A visitor opens a shared link to `/` on a phone in
  dark mode. *Pass when:* within the first viewport they can read what
  Koivupiilo is in one sentence, see at least one real product, and reach the
  language link; the page follows the system theme with no toggle; nothing
  overflows at 390 px; the same holds for `/en/` in light mode.
- **W1 Referral to email (J1).** Front → a product → contact → mail client.
  *Pass when:* ≤ 3 taps; the product page shows status and Jarkko's role; the
  contact page lists what to include and the reply time; the mailto opens
  with a subject.
- **W2 Club visitor (J3).** FI phone visitor → offers → coaching →
  Magistician proof → contact. *Pass when:* coaching is findable in one tap
  from the front; it links to at least one sports product; the whole path is
  in Finnish.
- **W3 Language switch (S-2).** On any page, switch language. *Pass when:* you
  land on the same page in the other language (never the front page unless
  you were on it); the link is labelled in the target language; `hreflang`
  pairs exist on every page.
- **W4 Agency lead (J2).** Desktop, EN → offers → software offer. *Pass
  when:* stacks, availability and how it starts are visible without opening
  more than one page.
- **W5 Product user (J5).** From a product's footer to `/tietoa/`. *Pass
  when:* the business ID, registered office and email are visible.

## Signature moments

- **S-1 "The work is real."** The front page and every work item lead with
  the actual product screen and an honest status line. *Quality bar:* a
  visitor who sees only the first viewport can name one product and what it
  does; no stock imagery, no mock device frames with lorem text; synthetic
  demo data is labelled as such.
- **S-2 "Same page, other language."** Translated slugs, a switch that
  preserves place, full parity. *Quality bar:* beats every Finnish studio in
  `references.md`: no English fallback anywhere under `/`, no Finnish under
  `/en/`.
- **S-3 "What to write."** The contact page tells you the three things to
  include, how fast you'll get a reply and whether Jarkko has capacity now,
  with one-tap mailto per offer. *Quality bar:* no site in the teardown does
  this; the first ten real emails need no clarifying round-trip.

## Product non-goals

Blog, contact form, booking, newsletter, CMS, client logos, theme toggle.

## Decisions

- **D1 (2026-10-31, Jarkko).** The front page frames Koivupiilo **studio
  first, offers second**: the products lead, the offers follow, ordered by
  fit. Supersedes the current site's "three core service areas" front page and
  the tagline "Full-Stack Web Development • Sports Coaching • Personal
  Development". Evidence: practitioner consensus (teardown). Counter-argument
  recorded: his network already knows him for all three.
- **D2 (2026-10-31, Jarkko).** All three offers stay on the site: software,
  volleyball coaching, personal development. The agent's evidence pointed to
  one offer; Jarkko kept three. D1 orders them. Revisit if A4 fails.
- **D3 (2026-10-31, Jarkko).** Finnish is the default at `/`; English under
  `/en/`; full parity, translated slugs, `hreflang`. Supersedes "English is
  default, Finnish uses /fi/ prefix" in `config/initializers.rb`.
- **D4 (2026-10-31, Jarkko).** For the next 12 months Koivupiilo mainly builds
  its own products; client work only when it fits. The site's job is
  credibility and an easy first step for warm leads, not lead volume.
- **D5 (2026-10-31, Jarkko).** Real engagements have started through his
  personal network, the volleyball world and public reputation; not RFPs.
- **D6 (2026-10-31, Jarkko).** Rebuild all claims from verified facts; drop
  anything without a source. Supersedes all numeric claims in the current
  `src/*.md` (list in `brief.md`, claims audit).
- **D7 (2026-10-31, Jarkko).** Selma Finance appears as one CV line in About
  ("Lead developer at Selma Finance since 2018"), with no figures or details.
  Supersedes the Selma case in `src/portfolio.md` and the figures in
  `src/about.md` and `src/services/technical-consulting.md`.
- **D8 (2026-10-31, Jarkko).** Public: Magistician, Kvitti, qwertec/JumpReach,
  Jumbo Volley, the Finnish beach volleyball rules translation, Ratametsuri,
  Resultifi, BeachDesk. Not now: KVNN (client work, ask later).
- **D9 (2026-10-31, Jarkko).** Two crafts under one entrance: **Koivupiilo Studio** (products and client
  software) and **Koivupiilo Valmennus** (volleyball coaching, coach education, team-lead coaching).
  Supersedes D1 and D2's single-front-page framing. See `positioning.md`.
- **D10 (2026-10-31, Jarkko).** The concept is the real Koivupiilo grove (named by his children; the house
  stands there). Imagery comes from that spot; the front photo follows the season.
- **D11 (2026-10-31, Jarkko).** The site is both business card and proof of craft; clarity wins any conflict.
  Appetite: front page + Magistician page at full finish first.
- **D12 (2026-10-31, Jarkko).** Visual bar: Werklig, Koto; clarity bar: Panic.
- **D13 (2026-10-31, Jarkko).** The repo stays on GitHub and the site on GitHub Pages. The earlier
  "no GitHub / US services" rule was wrongly generalised from other projects and does not apply here. A move can be revisited later; not now.

- **D14 (2026-10-31, Jarkko).** Each product (Kvitti, Magistician, qwertec) gets its own site and domain.
  koivupiilo.fi introduces them briefly and links out; it does not host product marketing. Supersedes the
  "Magistician page" part of D11. See `discovery.md` §2.

- **D15 (2026-11-01, Jarkko).** Discovery gate passed: the problem is a proper company web presence that passes
  the legitimacy check, with Jarkko's name vouching for Koivupiilo rather than standing in for it (`discovery.md` §3).

Superseded concepts (forbidden terms in new copy): "Human-Centered
Technologist", "three core service areas", "Fortune 500", "success stories",
"championship-level" as an adjective, emoji as section icons.
