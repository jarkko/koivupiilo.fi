# Discovery (phase 1), 2026-10-31

Sources:
- Two desk-research tracks: web presence, and competitors/search/landscape. Search was done through a US
  engine, so the Finnish ranking claims need a check on google.fi.
- Interviews with the Kvitti, Magistician and qwertec project agents, read-only from their repos.
- Jarkko's answers in `discovery-interview.md`.

Where something is not verified, it says so.

## 1. Findings

### The products

| | Kvitti | Magistician | qwertec (JumpReach, working name) |
|---|---|---|---|
| What | Expense claims for clubs and small companies: receipts, mileage, per diems, approval | Volleyball match video → per-touch stats and clips | iPhone replaces a Vertec: reach height off the net antenna |
| Buyer | Club treasurers; small companies; later accounting firms | Clubs/teams, junior to Mestaruusliiga | Hypothesis: club coaches, then academies, federations |
| Status | App live at kvitti.fi since 2026-10-27; pilot = his own club + his company; iOS not in the App Store | In development at magistician.com; no users recorded; merges frozen since 2026-10-28 | In development; all measurements still simulated |
| Own domain | kvitti.fi (the app; marketing site planned, no owner or date) | magistician.com (.fi redirects); no marketing site planned | none; qwertec.com is a domain-for-sale page |
| Brand | "Perforaatio" chosen | "Valvomo" chosen | app look "Datum"; no brand |
| Money (Jarkko) | most important | important | important |

**Also shipped: the beach volleyball court map** at https://jlaine.net/beach-volleyball/ (missed by the
first research pass; pointed out by Jarkko 2026-11-01).
- An interactive map of about 40 hand-checked indoor sand halls and about 3,500 outdoor courts across
  Finland, Sweden, Norway, Denmark, Iceland, Estonia, Latvia and Lithuania.
- Built from LIPAS (CC BY 4.0) and OpenStreetMap (ODbL). Free, no accounts.
- Live since May 2026. The launch post is still a draft (`_drafts/beach-volleyball-court-map.md`).
- It is the only product that is public, finished and usable by anyone today, so it is Koivupiilo's strongest
  shipped proof right now. It names no maker either.
- Open: does it stay on jlaine.net, move under Koivupiilo, or get its own domain (D14)? Existing links must keep
  working (a redirect, as `/indoor-beach/` already does).

**What must not be said publicly yet** (from the agents):
- Prices for any product.
- User counts, or pilot club names.
- Accuracy claims (Magistician, qwertec).
- "Replaces a Vertec" stated as fact.
- "JumpReach" as a final name.
- Kvitti as a cleared trademark: there is a PRV "Kvittr" conflict in Sweden.
- App Store availability.
- Anything about players' video (minors).

### Jarkko online

- **Invisible in search.** "Jarkko Laine" belongs to the poet (1947–2006) and three namesakes. "Koivupiilo",
  "Magistician" and "Kvitti" return cottages, "magician" and Kvitt (a Swedish bill-splitting app).
  koivupiilo.fi does not resolve.
- **Five bios from five eras:**
  - jlaine.net/jarkko: 2004, student, with an old Tampere address and phone.
  - GitHub: Bear Metal, "hireable".
  - Apress: O'Design CEO.
  - Speaker Deck: Bear Metal OÜ.
  - Mastodon: coach.

  None mentions Koivupiilo.
- **The products name no maker.** kvitti.fi and magistician.com show no company, business ID or person.
  Finnish clubs and companies buying a money tool or handing over match video will look for exactly that.
- **The public proof is volleyball, not software:**
  - Lentopalloliitto's "Kauden seuratoimija" award (May 2025).
  - Regional girls' head coach.
  - LP Kangasala chair; Pyynikki beach tournaments.
  - The FIVB beach rules translation.
  - The 2026 coaching posts on jlaine.net.

  The software proof (Rails book 2006, Frozen Rails talks, Wildfire) is 15–20 years old.
- jlaine.net: 222 posts, English, mostly 2004–2008; two new coaching posts in 2026.
- Stale pages still linked: Forgotten SVG, projekti45.

### The market around him

- **Finnish search is empty on his subjects.** "lentopallo videoanalyysi", "hyppytesti sovellus" and "lentopallo
  tulostaulu" bring up only theses and federation PDFs, no vendor. Expense claims are the exception: Kululaskut.fi
  (€6/month), Luovu, Piilo, and the Procountor and Netvisor blogs own "kilometrikorvaus 2026".
- **Competitors all speak English:** Hudl (sold through the Nordic federations, €1,300+ per team), DataVolley
  (the Finnish standard; .dvw is a must) and Volleystation.
- **Clubs probably buy in May–August, with a second window in December–January.** This is an inference.
  Coaches gather at the federation's courses, the Suomen Cup seminar and Seurainfo.
- Per the market analysis, Magistician's unfair advantage is the founder: a Mestaruusliiga club chair and
  federation coach.

## 2. What this changes

1. **Each product gets its own site and domain (Jarkko, 2026-10-31).** koivupiilo.fi does not host product
   marketing. It introduces each product in a line or two and links out. The "Magistician page at full finish"
   in D11 moves off this site. The first rich product page belongs on kvitti.fi, the product that matters most
   financially. That is a separate project, and nobody owns it yet.
2. **koivupiilo.fi's real job is to be the maker behind the products.** Three young products with no public
   proof need somewhere that says who stands behind them: name, face, business ID, Kangasala, track record.
   Each product site should link back ("Koivupiilon tekemä"). This is the trust layer that the Finnish clubs and
   treasurers will check.
3. **Build the company's brand, not Jarkko's (corrected by Jarkko, 2026-11-01).** "My personal brand is already
   much better than the company's." The first draft read search invisibility as a weak personal brand. That was
   wrong: his name already carries weight where his buyers are (the volleyball world, clubs, his network), and
   that works without Google. What is missing is Koivupiilo as an entity worth trusting on its own. The site has to
   give the company the standing he already has, so that the products and the work do not rest on his name alone.
   He appears as the founder, not as the headline.
4. **Claims stay modest until the products earn them.** For now that means status ("käytössä", "kehitteillä"),
   the maker and a link. No figures. That fits D6.
5. **Legitimacy is the main job (Jarkko, 2026-11-01).** "For many things a proper web presence is expected from a
   company." Partners, platforms and buyers check the company before they deal with it. Examples (inferred, typical):
   - Netvisor and accounting-software partner programmes (Kvitti's integration).
   - App Store and Google Play developer listings, which show the seller's name and site.
   - Banks, insurers and payment providers.
   - A club board or treasurer approving a purchase, and a federation or KIHU partnership.
   - A small company's procurement check.

   They don't read deeply. They look for a real company: name, business ID, address, contact, who runs it, what
   it makes, and privacy terms. The bar is that this check passes in ten seconds and leaves the impression of an
   established, careful company. Craft serves that; it is not a portfolio piece first.
6. **Search:** don't chase "Jarkko Laine". Own "Koivupiilo", and make sure each product name, plus
   "lentopallo …", resolves to him.

## 3. The problem, in one paragraph

Jarkko is known; Koivupiilo is not, and a company is expected to have a proper web presence. People in volleyball and his network know him, but the company behind his
three products and his coaching has no face. It has no site, the products don't name it, and his bios don't
mention it. Koivupiilo needs standing of its own: a studio with a point of view, work it can show, and a reason to
trust it with a club's money or match video. His name should vouch for it, not stand in for it. First of all, the site has to pass the quick check that partners, platforms and buyers make before dealing with a company. The audience is
club people and small-company buyers who arrive through his own outreach or a product link. Each product carries
its own pitch on its own domain.

## 4. Goals and measures (proposed)

| Goal | Measure | Check |
|---|---|---|
| Passes the company check | Name, business ID, address, contact, founder, products, privacy policy and terms on the site; product sites and store listings point to it | at launch |
| Findable | "Koivupiilo" #1 on google.fi; "Kvitti Koivupiilo" and "Magistician lentopallo" lead to him | 3 months after launch |
| Credible maker | Every product site links to koivupiilo.fi; the company name and business ID are on both sides | at launch |
| Carries outreach | Cookie-free counts show arrivals from his links and product sites; the share that goes on to a product or an email | 30 days, then quarterly |
| One consistent bio | GitHub, Mastodon, jlaine.net and the federation profile point to the same one-line bio and koivupiilo.fi | at launch |
| Leads | First inbound enquiry (none so far) | 12 months; Jarkko to confirm the target |

## 5. Gate

Jarkko: is §3 the right problem? Also open, and only he can answer:

1. ~~Why the company needs its own brand~~: answered 2026-11-01. All of these: buyers trust a company with a
   money tool or match video, it keeps the business apart from his club and federation roles, and the products
   should be able to outgrow him. **The main reason: "for many things a proper web presence is expected from a
   company."** See §2.6.
2. **His own sentences:** how he introduces himself at a club meeting, and at a client meeting.
3. **The grove story:** OK to tell it publicly, without names?
4. **jlaine.net:** keep it as the personal writing (coaching, endurance) and link both ways? Or move the
   writing to koivupiilo.fi?
5. **What success looks like in 12 months** (the leads row above).

Outside this site, for his to-do list: replace jlaine.net/jarkko (2004, with an old address and phone); the
mobile number on the federation regional page; and maker attribution on kvitti.fi and magistician.com.
