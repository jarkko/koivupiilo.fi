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
- **M1** Every work item shows exactly one status: `in use` (käytössä),
  `in pilot` (pilotissa), `in development` (kehitteillä) or `in progress`
  (kesken), with the date the status was last checked next to it, wherever
  the item is listed. Status is never omitted or inflated (D6, D21).
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
- Contact: a real address, business ID, and a reply time once Jarkko has
  given one (J5, D22).

## Walkthroughs

- **W0 First arrival.** A visitor opens a shared link to `/` on a phone in
  dark mode. *Pass when:* within the first viewport they can read what
  Koivupiilo is in one sentence, see at least one real product, and reach the
  language link; the page follows the system theme with no toggle; nothing
  overflows at 390 px; the same holds for `/en/` in light mode.
- **W1 Referral to email (J1).** Front → a product → contact → mail client.
  *Pass when:* ≤ 3 taps; the product page shows status and Jarkko's role; the
  contact page lists what to include, and the reply time once Jarkko has
  given one (D22); the mailto opens with a subject.
- **W2 Club visitor (J3).** FI phone visitor → offers → coaching →
  Magistician proof → contact. *Pass when:* coaching is findable in one tap
  from the front; it links to at least one sports product; the whole path is
  in Finnish.
- **W3 Language switch (S-2).** On any page, switch language. *Pass when:* you
  land on the same page in the other language (never the front page unless
  you were on it); the link is labelled in the target language; `hreflang`
  pairs exist on every page.
- **W4 Agency lead (J2).** Desktop, EN → offers → software offer. *Pass
  when:* stacks, availability (the capacity line, D22) and how it starts are
  visible without opening more than one page.
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
  include, whether Jarkko has capacity now and, once he has given a reply
  time (D22), how fast you'll get a reply, with one-tap mailto per offer. *Quality bar:* no site in the teardown does
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

- **D16 (2026-11-01, Jarkko).** Voice: the company speaks in the third person by name ("Koivupiilo tekee …");
  Jarkko says "I" only in the founder note and on Valmennus; never "we". Supersedes D2's first-person rule.
- **D17 (2026-11-01, Jarkko).** The grove story may be told publicly, without the children's names; the house
  and the children are not shown (D10).
- **D18 (2026-11-01, Jarkko).** The street address appears only on `/yritys/` (`/en/company/`); the footer says
  "Kangasala".

- **D19 (2026-11-02, Jarkko).** Strategy signed: the message hierarchy (`strategy.md` §3) and the sitemap (§5).
  The places table above is superseded by `strategy.md` §5 until it is rewritten here.

- **D20 (2026-11-05, kit adoption brief).** Adopt the vendored design kit on
  `kit-adopt`, based on `design/spike`. Accept the existing term, imagery,
  untested model and web findings that `ds retrofit add --decision D20` records in
  `retrofit.tsv`. M1–M3 and W0–W5 have no tagged JUnit tests yet; keep each gap
  on the shrink-only list until its acceptance test passes. Keep model,
  review and critique on. This adoption preserves the current site and the
  design groundwork; it does not approve the spike for publication.
  Supersedes: none.

Superseded concepts (forbidden terms in new copy): "Human-Centered
Technologist", "three core service areas", "Fortune 500", "success stories",
"championship-level" as an adjective, emoji as section icons.

- **D21 (2026-11-12, launch follow-up brief).** A work item's status is one of
  four states. `in use` (käytössä): released, and people use it. `in pilot`
  (pilotissa): in real use by a first, limited group before general release.
  `in development` (kehitteillä): being built, not yet released for regular
  use. `in progress` (kesken): unfinished work that is not software (the rules
  translation); the word says nothing about how fast it moves. The first two
  show a filled mark, the other two an open one. An item whose state Jarkko
  has not confirmed is left out (D6, M3). A fifth state needs a new decision.
  The date next to a status is the day it was last checked against the
  product, its repository or Jarkko; it shows in every list of work items
  (review 2b66b9b3, F2 and F3).
  Supersedes: M1's set `live`, `in use`, `in development`, `prototype`,
  `dormant` and its "date it was last true"; `live` folds into `in use`;
  `prototype` and `dormant` are retired, and no published item used them.
  Changed: M1 above; the status rows of `termbase.tsv`; `src/_data/work.yml`
  (a `checked` date per item); `src/_partials/_work_list.erb`.
  Evidence: anecdote or opinion: the statuses verified in
  `content/fi/tyot.md` on 2026-10-31 and 2026-11-02, rechecked on 2026-11-12.
  Dissent: the brief names three states (käytössä, pilotissa, kehitteillä).
  `kesken` stays as the fourth because the translation's repository has not
  changed since 2026-05-15, so `kehitteillä` would overstate it (D6). Jarkko
  can fold it into `in development` with one line in `work.yml`.

- **D22 (2026-11-12, Jarkko, relayed in the launch follow-up brief).** Jarkko
  approved the Studio capacity line (`capacity` in `src/_data/jarkko.yml`);
  it is the availability answer that W4 and S-3 ask for. The reply time is
  open: Jarkko has not given one, so `/studio/` and `/en/studio/` promise
  none, and the reply line only says who answers. When he gives a time, it
  goes into `reply` in `jarkko.yml` and a new decision replaces this one.
  Supersedes: the reply-time requirement in W1, in S-3 and in the Contact
  trust moment, until Jarkko gives a time.
  Changed: W1, W4, S-3 and the Contact trust moment above.
  Evidence: anecdote or opinion: Jarkko's approval of the capacity line,
  relayed on 2026-11-12; there is no reply time to publish (D6, M3).
  Dissent: review 2b66b9b3 (F5) asks for a reply expectation before launch. A
  time Jarkko has not given would be an invented claim (D6).
