# Strategy (phase 2), 2026-11-01

Input: `discovery.md`. Jarkko signed off the problem on 2026-11-01. Gate for this phase: Jarkko signs **the message
(§3)** and **the sitemap (§5)**. Once signed, `model.md` (places, walkthroughs) is updated to match; until then
the current places table in `model.md` stands.

## 1. The site's job, in priority order

1. **Pass the company check in ten seconds.** Partners, app stores, payment providers, a club board or a
   small company's buyer look for:
   - a real company: name, business ID, where it is, a contact and who runs it
   - what it makes
   - privacy terms

   They should leave with the sense of an established, careful company.
2. **Give the company standing of its own.** Jarkko's name vouches for Koivupiilo; it does not stand in for it.
3. **Point onward.** Each product's own site, the right way to work with Koivupiilo, or an email.

What the site is *not*: a portfolio, a product marketing site (D14), a blog or a lead machine.

## 2. Audiences

| # | Who | Arrives from | What they need | Language |
|---|---|---|---|---|
| A1 | **The checker**: a partner programme, app store reviewer, bank, payment provider, accounting firm | A store listing, an application form, a product's footer | Company facts, products, privacy, a contact; seconds, desktop | FI, EN |
| A2 | **Club decision-maker**: chair, treasurer, board, coach | Jarkko's message, a product site, a federation event | Is this a real company I can bring to the board? What else do they make? Coaching? | FI |
| A3 | **Small-company buyer** (Kvitti, client software) | A product site, a referral | The same as A1, plus how to start a project | FI, EN |
| A4 | **Someone who met Jarkko** | His card, a link, a search for Koivupiilo | What the company is now, and how to reach it | FI, EN |

A1 sets the floor (facts must be complete and findable). A2 sets the tone (Finnish, warm, trustworthy, not
corporate). Most visits will be on a phone except A1.

## 3. Message hierarchy (substance; wording comes later)

These are what each level must say, not the copy. Lines marked **J** must start from Jarkko's own words; the
agent shapes the rest in Finnish first (suomen-kieli) and derives English.

1. **What Koivupiilo is, in one sentence (J).** A Kangasala software company that makes its own products for
   sports clubs and small companies, and coaches. The sentence must work for A1 and A2 alike, and must not
   be a register entry ("Jarkko Laineen ohjelmistoyritys …" is rejected).
2. **Proof it makes real things.** The work, each item with its name, one plain line, an honest status and a
   link out:
   - Kvitti: käytössä
   - the court map: käytössä, public
   - Magistician: kehitteillä
   - qwertec: kehitteillä

   No figures, prices, user counts or accuracy claims (discovery §1).
3. **Two ways to work with it.**
   - Studio: software projects, selected.
   - Valmennus: volleyball coaching, coach education, coaching for new team leads.

   Each says who it is for and how to start.
4. **Who is behind it.** Jarkko as founder: a photo, a short verified bio, the volleyball roles and the
   software past (D6, D7). One sentence in his voice (J).
5. **The place.** The grove that gives the company its name, told in one or two lines, and in the season's
   photo (D10). Needs his OK (open item).
6. **The facts.** Koivupiilo Oy, Y-tunnus 3458206-1 (links to YTJ), Kangasala, email, privacy.

**Voice (proposal, supersedes D2's "first person, not we"):**
- The company speaks in the third person by name ("Koivupiilo tekee …").
- Jarkko speaks in the first person only in the founder note and on Valmennus, where the coach is the offer.
- Never "me / we": that fakes a team, and the first person singular makes it a personal site again.

## 4. Structure

**One company site, short pages, no product pages (D14).** Each product's own site carries its pitch, and
links back with a "Koivupiilo Oy" credit (see §6).

**jlaine.net stays Jarkko's personal writing** (coaching, endurance, the occasional tech post).
- koivupiilo.fi links to it from the founder note.
- jlaine.net's about page is replaced by a short bio that names Koivupiilo.
- The court map stays at its URL for now and gains a "Koivupiilo" credit. Its long-term domain is settled with
  the other product sites.

## 5. Sitemap

Finnish at the root, English under `/en/` (D3); same page, other language (S-2).

| Page | FI | EN | Job | Contents |
|---|---|---|---|---|
| Front | `/` | `/en/` | Pass the check; show the work; route on | The one sentence · the work (4 items) · Studio and Valmennus · founder line · the grove, quietly · facts footer |
| Work | `/tyot/` | `/en/work/` | "What does it make?", complete | Every public item (D8 list + the court map), one line, status, link out; no item pages |
| Studio | `/studio/` | `/en/studio/` | Software work: who it suits, how it starts | What Koivupiilo takes on, how it works, stack, current capacity, email with a subject |
| Valmennus | `/valmennus/` | `/en/coaching/` | Coaching: what, for whom, how to start | Volleyball coaching and coach education · team-lead coaching · credentials (award, roles, rules translation) · email |
| Company | `/yritys/` | `/en/company/` | The full check in one place | The grove story · founder (photo, bio, link to jlaine.net) · company facts (name, business ID, address, contact) |
| Privacy | `/tietosuoja/` | `/en/privacy/` | Required; also a trust signal | No cookies, the page-count tool, email handling, contact |
| 404 | | | Get back on track | Both languages |

Header: Koivupiilo · Työt · Studio · Valmennus · Yritys · English. Footer on every page: Koivupiilo Oy ·
Y-tunnus · Kangasala · email · Tietosuoja · English.

Changes from `model.md`:
- `/palvelut/` splits into Studio and Valmennus (D9).
- `/tietoa/` and `/yhteys/` merge into `/yritys/`. The contact lives in the footer and in each offer.
- Work item pages are dropped (D14).
- The blog is a non-goal (jlaine.net).

## 6. Outside this site (needed for the job; Jarkko's go per item)

| Where | What | Why |
|---|---|---|
| kvitti.fi, magistician.com | Footer: "Koivupiilo Oy · Y-tunnus" linking to koivupiilo.fi | The products name no maker today |
| The court map | A small "Koivupiilo" credit and link | Its strongest proof, unattributed |
| YTJ | Set the website field to koivupiilo.fi | The first place a careful checker looks |
| App Store / Play (later) | Seller = Koivupiilo Oy, site = koivupiilo.fi | Same check |
| GitHub, Mastodon, jlaine.net about | One-line bio naming Koivupiilo | Five bios from five eras (discovery) |

## 7. Content inventory (who writes what)

| Content | Source | Who | Status |
|---|---|---|---|
| The one sentence (§3.1) | Jarkko's words | **Jarkko**, then shaped by the agent | needed |
| Founder sentence (§3.4) | Jarkko's words | **Jarkko** | needed |
| Grove lines | Jarkko's OK and words | **Jarkko** | needed |
| Work items: line, status, link | Project repos and agents (discovery §1) | Agent, Jarkko checks | ready to draft |
| Status of Jumbo Volley, Resultifi, Ratametsuri, BeachDesk | Their repos | Agent | to verify |
| Studio offer: what it takes on, stack, capacity | Earlier brief, repo stacks | Agent drafts, **Jarkko** confirms capacity | to draft |
| Valmennus: offers, credentials | Federation pages (verified), rules translation, D9 | Agent drafts, **Jarkko** confirms offers and medals (brief claims audit) | to draft |
| Founder bio, CV lines | Claims audit in `brief.md` | Agent drafts, **Jarkko** confirms each line | to draft |
| Company facts | YTJ (verified 2026-11-01) | Agent | ready |
| Privacy | Site set-up (no cookies, page counts) | Agent | to draft |
| Photos | Grove series (per-photo OK), founder portrait (none yet) | **Jarkko** picks or shoots | needed |
| English | Derived from Finnish | Agent, Jarkko skims | after FI |

## 8. Measures

As in `discovery.md` §4. The first one is the launch gate: a cold check of the company passes in ten seconds.
Test it with three people who don't know Koivupiilo: "Is this a real company, what does it make, how do I
reach it?"

## 9. Appetite

All six pages at launch, short. Legitimacy needs completeness more than depth. Craft goes into type, the grove
photo, the work list and the details of the facts footer. No page needs more than one screen of reading except
Valmennus and Yritys.

## 10. For Jarkko to sign or answer

1. **Sign the message (§3) and the sitemap (§5).**
2. **Voice:** the company in the third person; "I" only in the founder note and Valmennus; never "we". OK?
3. **Address:** the street address is already public in YTJ. Proposal: show it on `/yritys/` only (it is
   expected for a company's service information), and only "Kangasala" in the footer. Or should only the
   business ID link appear?
4. **Your words** for §3.1 and §3.4. A rough spoken version is enough: how you'd say it to a club chair over
   coffee.
5. **The grove story:** OK to tell it publicly, without names?
6. **§6 changes** on kvitti.fi, magistician.com, the court map, YTJ and your bios: go, now or at launch?
