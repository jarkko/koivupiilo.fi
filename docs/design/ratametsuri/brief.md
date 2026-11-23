# Ratametsuri product page: brief

Scope: the page at `/ratametsuri/` and `/en/ratametsuri/` (D24), not the app.
Facts come from `../content/ratametsuri.md` (fact log and problem card). The
page carries Ratametsuri's own brand, not koivupiilo.fi's (D24). Groundwork
for the design sprint, written 2026-11-21. Nothing here is user-tested.

## The problem, in the user's words

No requester has been heard yet, so these words are an assumption (A1, A2),
written as a Finnish setter would say them:

> "Kuulin, että Jarkko on tehnyt Macille sovelluksen, jolla voi suunnitella
> ratoja. Mikä se oikein on, pyöriikö se mun Macilla ja miten sitä pääsee
> kokeilemaan?"

Jarkko's side, from his request through the coordinator: a course setter who
hears of Ratametsuri has nowhere to see it or ask for the beta, and he has no
list of people to send the build to.

## Who, and the moment they reach for it

- **A club course setter (ratamestari)** with a Mac. Jarkko's own persona
  for the app is Liisa, who sets a forest event from a PDF or a scan a few
  times a season (Ratametsuri `docs/design/stories.md`, owner-written). She
  hears of the app from Jarkko, a club mate or a link in a club chat or email.
- **A coach** setting weeknight trainings on whatever map file the club has
  (Kalle in the same file).
- **Jarkko**, who sends the link, collects the addresses and invites testers
  through TestFlight (D26).

## What changes for them

- Setter: "Näin sovelluksen oikealla kartalla, tajusin heti, että se toimii mun
  Macilla, ja jätin osoitteen. Kun beta aukesi, kutsu tuli sähköpostiin."
- Jarkko: "Lähetän yhden linkin enkä selitä sovellusta joka viestissä
  uudestaan, ja mulla on lista oikeista ratamestareista TestFlightia varten."

## Success measures

- **Primary:** beta requests from course setters, counted by the launch kit
  (D25). No target exists; Jarkko sets one, or the first month sets the
  baseline.
- **Follow-through:** requesters who install the TestFlight build (App Store
  Connect, once D26 is set up).
- **Signal of failure:** emails asking what the app does, whether it runs on
  Windows or how to get it, from people who saw the page.
- **Guardrails:** the web-quality budgets and invariants pass; no third-party
  request except the launch kit's own, no cookies; the request works at 390 px.

## Appetite

Small: one page in two languages, a few days of agent work and two owner
gates. The app is at 0.1 with no distribution yet, so the page is worth no
more than that now. (Assumption: Jarkko confirms.)

## Non-goals and no-gos

- No price, release date, licence, user counts or testimonials: all unknown (D6).
- No Windows or Intel claims; no feature that is not built (OCAD, score
  courses, relays stay off the page).
- No tracking beyond what the launch kit supplies; no third-party script, no cookies.
- No koivupiilo.fi header, navigation or footer wordmark (D24).
- No changelog, documentation, support or blog pages.
- No app icon: none exists, and the page's wordmark is not one. If a mark
  from the chosen direction is worth turning into an icon, that is a later
  decision for the app.
- No own domain in this work (see Domain below).

## Job stories

- **J1** When someone mentions Ratametsuri and sends me the link, I want to
  see what it does on a real map within seconds, so I can tell whether it fits
  the courses I set.
- **J2** When I'm interested, I want to know at once whether it runs on my
  Mac and in my language, so I don't ask for something I can't use.
- **J3** When I decide to try it, I want to leave my address in one step and
  know what happens to it, so I get the beta without signing up for anything else.
- **J4** When the request form is not live yet or fails, I want another way
  to ask that works, so my request is not lost.
- **J5** (Jarkko) When a setter asks about the app, I want one link that
  shows it and collects the request, so I stop writing the same email and have
  a list for TestFlight.

## Scenes

- **Phone, from a chat or an email link.** A minute's attention, one hand,
  possibly outdoors after a training; the address typed on a phone keyboard.
- **Mac, an evening at home** before setting a course, with map files open.
  More time; wants to see the window large and read what it exports.
- System light or dark, Finnish first; English for setters from other
  countries (A9).

## Assumptions log

| Id | Assumption | Risk | Evidence |
|---|---|---|---|
| A1 | Visitors arrive warm (from Jarkko, a club, a shared link), not from search. | Medium | owner-only (strategy D4/D5: warm network) |
| A2 | Most first visits are on a phone, opened from a chat or an email. | Medium | owner-only; no analytics exist |
| A3 | A real app screen on a Finnish map is the strongest proof the page can give. | Medium | practitioner consensus (Mac app pages lead with the window); owner-only for this audience |
| A4 | Setters recognise overprint purple, the course symbols and the control flag at a glance. | Low | practitioner knowledge: ISOM 2017-2 and ISSprOM overprint purple, IOF control descriptions |
| A5 | Enough Finnish club setters use a Mac for a waitlist to matter. | High | none; unknown |
| A6 | One email field is enough; TestFlight needs nothing else. | Low | D26: external testers are invited by email |
| A7 | Setters know what a beta and TestFlight are, or don't need to. | Medium | none; owner-only |
| A8 | A page at koivupiilo.fi/ratametsuri/ still reads as an independent product. | Medium | owner-only; Jarkko's gate 2 remark points the other way for branding |
| A9 | The English page has readers. | Low | owner-only |

## Story map and product model: switched off

- **Story map: off.** The page has one activity (see the app, then ask) and
  one flow. A map with one column adds nothing; the walking skeleton is the
  page itself.
- **Product model: no new model.** The page is a place in koivupiilo.fi's
  `model.md` (places table, D24 to D26). The request itself belongs to the
  launch kit, which owns its lifecycle: consent, double opt-in, deletion (D25).

## Signature moment

The real Ratametsuri window on Tampereen Pyrintö's Kauppi map (Jarkko approved it for the screenshot, 2026-11-21; credit "Kartta: Kauppi, Tampereen Pyrintö."), a course in overprint purple
and its description sheet beside it, followed directly by the request field.
Quality bar: the screen is sharp at 2x and legible at 390 px; at 1440x900 the
field is on the first screen; on a phone the Mac requirement comes before the
field; the field accepts a 70-character address without clipping; no state
change moves the layout.

## Domain

The page stays at `/ratametsuri/` for the private beta (D24). An own domain
(say `ratametsuri.fi`, availability unchecked) would make the URL match the
brand and survive a later move, but costs a yearly fee, DNS changes, a second
Pages site or a redirect, and its own privacy page; all need Jarkko's approval.
The page is built self-contained (own layout, own assets) so that moving it
later is a copy, not a rewrite.

## Request block without JS (launchpad contract, 2026-11-21)

With JS off, the launchpad form POST answers 303 to the landing URL plus a fragment: `#signup-check-email` (success), `#signup-error` (validation), `#signup-try-later` (server error or rate limit). The request block carries elements with those ids, shown with CSS `:target`. With JS on, the block uses the JSON response mode and the in-page data-state states. Source: metamorphosis coordinator.
- Consent text (beta-2026-11): launchpad (term_b2f58247-6b58-4f5a-8821-ec0ffea907dc) sends a draft; the field contract is C1 in ~/code/metamorphosis/docs/superpowers/plans/2026-11-21-launch-kit.md. Final strings, Finnish written natively and approved by Jarkko, go back to launchpad byte-exact (they are hashed), cc the metamorphosis coordinator.
- Consent beta-2026-11 stays byte for byte (launchpad, 2026-11-23): "luovuttaa" means disclosure to another controller; a processor (GDPR art. 28) acting on our behalf is not luovutus, matching the privacy text. No new version.
- Consent version beta-2026-11-23 (fi: "betaan", "kun sovellus julkaistaan"; en unchanged) is in launchpad !78. Switch the form to it, and recopy kit/privacy/ratametsuri.*.md and kit/form/ratametsuri.*.html from launchpad main, only after launchpad says !78 is merged; until then production rejects the version.
