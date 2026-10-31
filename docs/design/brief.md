# koivupiilo.fi: product brief

Status: draft from the 2026-10-31 spike (bootstrap steps 1–2). Source: three
interview rounds with Jarkko on 2026-10-31 (decisions in `model.md`, D1–D8),
the repo inventory and the teardown in `references.md`.

## 1. Frame

**Problem, in the visitor's words.** "Someone told me Jarkko could help. Is
he the right person for this, what does he actually do now, and how do I
start without wasting his time?" Today's site cannot answer that. It sells
three equal service lines with invented-looking numbers and stock consultant
copy, it shows none of the products Jarkko is building, and it has no Finnish
front page even though the domain is `.fi`.

**Who, and the moment they reach for it.** Almost nobody arrives cold. Work
reaches Jarkko through his personal network, the volleyball world and his
public reputation (D5). The visitor is usually holding a link from a message,
a talk or a product page, often on a phone, and is checking him out before
writing.

**What changes for them** (as they would say it afterwards): "In two minutes I
saw he builds real products: video stats for volleyball, an expense app for
clubs, a jump tester on an iPhone. He also coaches. He told me exactly what to
send, and he answered the next day."

**What Koivupiilo is** (D1, D2). A one-person studio that builds its own
software for sport and everyday life, and takes on selected work: software
projects, volleyball coaching and coach education, and development work for
leaders and teams. Products come first; the offers follow, ordered by fit.
Jarkko is mainly building his own products for the next 12 months (D4), so
the site's job is **credibility and a low-friction first step for warm leads**,
not lead generation at volume.

**Success measures.**
- A warm lead can name what Koivupiilo does and one real product within
  30 seconds on a phone (test: W1, five-second test with 3 people).
- Every inbound email says what the sender needs, because the contact page
  told them what to include (Jarkko's judgement over the first 10 emails).
- Each product page is good enough to send on its own as "this is what I
  built" (Jarkko sends one within a month).
- Finnish and English have full parity; no page falls back to the other
  language.
- Zero unverifiable claims (D6).

**Appetite.** Small: a few days of agent work for the build after the
direction is chosen, plus 2–3 short sessions with Jarkko. It is a showcase;
it must be excellent rather than large.

**Non-goals.** A blog or newsletter at launch. A booking system, contact form
or CRM. Price lists for every service. Analytics beyond privacy-respecting
page counts. Client logos. Testimonials that don't exist yet.

**No-gos.** Invented numbers or clients. Anything about Selma beyond one CV
line (D7). Client work shown without permission (KVNN, D8). Real athletes',
players' or club members' names or faces without consent. US megacorp
hosting, fonts or trackers (Google Fonts, GitHub Pages, Google Analytics).
A theme toggle.

## 2. Users and jobs

Evidence grade for all of this: owner interview (`owner-only`) plus the
practitioner consensus in `references.md`. No other users were interviewed
in this spike.

### Scenes

| # | Who | Scene | Language |
|---|---|---|---|
| S1 | Founder or SME owner with a stuck or unbuilt product | A friend's message with a link; phone, between meetings; two minutes | FI or EN |
| S2 | Agency or studio lead who needs a senior hand | Desk, laptop, comparing two or three people; wants stack, availability, how to engage | EN, FI |
| S3 | Club, federation or venue person (volleyball world) | Evening, phone, after practice; heard of Magistician or Jumbo Volley, or wants a coach clinic | FI |
| S4 | Someone who just met Jarkko (court, talk, meetup) | Phone, standing, "who is this?" | FI or EN |
| S5 | A user of a Koivupiilo product checking who is behind it | Comes from the product's footer; wants a real company, business ID, contact | FI or EN |

### Job stories

- **J1** When a friend recommends Jarkko for my product problem, I want to see
  in two minutes that he has shipped things like mine, so I can write to him
  without feeling I'm wasting his time. (S1)
- **J2** When I need a senior engineer for a client project, I want to see the
  stacks he really uses, whether he has capacity and how he likes to work,
  so I can decide whether to call him or the next person. (S2)
- **J3** When our club wants better stats, a big-screen setup or a coach
  clinic, I want to see what he has built for volleyball and what working
  with him looks like, so I can bring it to our board. (S3)
- **J4** When I've just met Jarkko, I want one page that tells me what he does
  now, so I can remember him and follow up. (S4)
- **J5** When I start using a Koivupiilo product, I want to see the real
  company and person behind it, so I can trust it with my data. (S5)
- **J6** (Jarkko) When I've built something new, I want to add a product page
  in Markdown in both languages in under an hour, so the site stays current.

### Assumptions log

| # | Assumption | Risk if wrong | Evidence |
|---|---|---|---|
| A1 | Visitors arrive warm (link from someone), not from search | Medium: cold visitors need more context and SEO | `owner-only` (D5) |
| A2 | Products persuade better than service descriptions | High: whole structure rests on it | `owner-only` + practitioner (thoughtbot, Panic) |
| A3 | Finnish-first fits the visitor mix | Medium | `owner-only` (D3); `.fi` domain |
| A4 | Coaching and personal development fit on the same site without diluting software credibility | Medium-high | `owner-only` (D2); counter-evidence: teardown (single-niche H1s) |
| A5 | A visible email beats a form for this audience | Low | practitioner (Clearleft, Kisko) |
| A6 | Showing honest status ("prototype", "in use at one venue") builds more trust than hiding it | Medium | practitioner (CSS Wizardry admits what didn't move) |
| A7 | Phone is the main first-visit device | Medium | `owner-only`; scenes S1, S3, S4 |

### Claims audit (D6: rebuild from verified facts)

Everything below is in the current site and is **dropped until Jarkko confirms
it with a source**. Verified items stay.

Verified: GitHub user id 439, account created 2008-02-19 (GitHub API,
2026-10-31). Koivupiilo Oy, Kangasala. The products and their status (repo
docs, see `docs/design/content/`).

To confirm (keep / drop / reword):
1. Co-author of *Beginning Ruby on Rails E-Commerce* (Apress, 2006).
2. Wildfire (acquired by Google): role and years; the "$350M" figure is dropped.
3. Hubtran (acquired by TriumphPay): role and years.
4. "30+ years" of building for the web.
5. Finnish Championship medals as a beach volleyball coach; which years, which pairs (pairs are not named without consent).
6. Head coach, Finnish Volleyball Federation, South-West Finland: current title.
7. Conference talks: which conferences and years.
8. Education: TUT business economics and software engineering, ETH Zurich exchange 2002–03.
9. Languages: Finnish, English, Swedish.

Dropped outright (no source, read as invented): the "Fortune 500 telecom"
case and its 75 % / 50 % / 40 % / $2M figures; the VC due-diligence "4x
return"; "10,000 monthly blog readers"; "open source with 1000+ stars";
"mentored 50+ developers"; "trained 15+ coaches"; "90 % athlete retention";
the coaching and development success stories; all price lists; Selma figures
(customers, rating, trades).
