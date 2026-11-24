# Ratametsuri page: milestone walkthrough runbook

Pipeline step 17. Jarkko walks the Ratametsuri product page on his own Mac and his own iPhone, the
way a club course setter would.

- **Label: owner-validated only.** No outside testers have seen the page. See
  [Outside test](#outside-test-optional) for a cheap way to change that.
- **Time:** about 28 minutes. If time is short, do W0 and the iPhone section; they matter most.
- **Build:** the merged `main` at <https://koivupiilo.fi/ratametsuri/> and
  <https://koivupiilo.fi/en/ratametsuri/>. The page and its labels were checked at commit
  `4323320` (branch `jarkko/ratametsuri-landing`, PR #3). After the merge, that commit is in `main`.
- **Before the merge:** build and serve it locally.
  1. `BRIDGETOWN_ENV=production bundle exec rake deploy`
  2. `python3 -m http.server 4000 --directory output`
  3. Open <http://localhost:4000/ratametsuri/>.

  Locally, everything except the real sign-up works: launchpad accepts sign-ups only from
  `https://koivupiilo.fi`, so step W0.6 and the iPhone section need the live page.
- **Sources:** built only from the executed step scripts in `.ds/reviews/steps/W0.md`, `W1.md`,
  `W3.md` and `W5.md` (the PR #3 sections), and the review handoffs in
  `../reviews/evidence/{4ea83fe1,f42b0d0f,eef7d25e}/`. Every label below was checked in the built
  HTML and on the rendered page. See [Label check](#label-check).
- **How to take notes:** write what happened next to the step number, in your own words. Nobody
  defends the design while you walk.

## W0 First arrival to a beta request (Mac, about 10 min)

A course setter opens a shared link and asks for a beta invite. Use Safari or Chrome, in Finnish.

1. Open <https://koivupiilo.fi/ratametsuri/>. Read, top to bottom:
   - the headline "Ratamestarisovellus Macille";
   - the status line, which ends "Tilanne tarkistettu 23.11.2026.";
   - the app screenshot;
   - "Mitä tarvitset".
2. Under "Pyydä betakutsu", leave the field empty and click "Pyydä kutsu". The cursor should move
   to the "Sähköpostiosoite" field.
3. Type `a@b` in "Sähköpostiosoite" and click "Pyydä kutsu" with the checkbox unticked. The browser
   should point you at the checkbox.
4. Tick the checkbox. Its text starts "Haluan sähköpostiini kutsun Ratametsurin betaan…". Click
   "Pyydä kutsu". Expect the following:
   - "Tämä ei näytä sähköpostiosoitteelta. Tarkista osoite." appears right under the field;
   - `a@b` is still in the field;
   - the cursor is back in the field.
5. Turn Wi-Fi off and click "Pyydä kutsu". Expect:
   - "Pyyntö ei lähtenyt. Tarkista verkkoyhteys ja yritä uudelleen.";
   - under it, "Voit pyytää kutsun myös sähköpostilla: jarkko@koivupiilo.fi".

   Turn Wi-Fi back on. Your text and the tick should still be there.
6. **The real sign-up (optional, your choice).** Replace `a@b` with your own address and click
   "Pyydä kutsu". This is the one end-to-end check of the whole chain: launchpad, the email, the
   button and the welcome. Expect:
   - "Lähetetään…" for a moment;
   - then "Lähetimme vahvistusviestin osoitteeseen *your address*. Vahvista osoitteesi viestin
     painikkeella."
   - An email from "Ratametsuri" (hello@join.koivupiilo.fi) with the subject "Ratametsuri: vahvista
     ilmoittautumisesi" and a button "Vahvista ilmoittautuminen". If it isn't in your inbox, look
     in the spam folder.
   - The button opens a page with the button "Vahvista ilmoittautuminen". Click it.
   - The next page says "Olet mukana". Under "Mitä seuraavaksi?" it reads "Kutsumme sinut
     Ratametsurin betaan, kun se avautuu, ja kerromme, kun sovellus julkaistaan."
   - A second email follows: "Ratametsuri: olet mukana". To take your address out again, use its
     "Poista osoitteeni" link.

   The page message comes from `src/_data/ratametsuri/fi.yml`. The email and confirmation page
   wording comes from launchpad's Finnish locale (launchpad `main` at `8d01e7f`). Nobody has seen
   these in a real email yet; that is the point of this step.
7. Scroll through "Mitä Ratametsuri jo osaa" to the bottom line: "Ratametsuri on Koivupiilo Oy:n
   tuote · Y-tunnus 3458206-1 · Tietosuoja".
8. Switch the Mac to dark: System Settings → Appearance → Dark. The page should follow, with no
   theme switch on the page itself. Switch back when done.
9. Reload and press Tab. In Safari, use Option-Tab, or turn on "Press Tab to highlight each item"
   under Safari Settings → Advanced. Expect:
   - "Siirry sisältöön" appears first;
   - Tab then goes through "In English", "Sähköpostiosoite", the checkbox,
     "koivupiilo.fi/tietosuoja", "Pyydä kutsu", and finally "Tietosuoja" at the bottom.
   - You can always see where the focus is.

**Pass when:**

- The headline, the status with its date, the requirements and the form tell you what this is and
  whether your Mac qualifies, before you scroll far.
- Each problem in steps 2–5 is explained where you are already looking, and your text survives it.
- If you did step 6, the email arrives within a few minutes and its button ends at "Olet mukana".
- The page follows the system theme, and nothing is cut off or scrolls sideways.

## W1 From Koivupiilo's work list to the product (Mac, about 3 min)

Someone who knows Koivupiilo finds Ratametsuri from the company site.

1. Open <https://koivupiilo.fi/> and click "Työt" in the header.
2. Find the row "Ratametsuri" with "kehitteillä" and "23.11.2026".
3. Click "Ratametsuri". You should land on the product page, which reads "Tilanne tarkistettu
   23.11.2026." The date is the same.
4. In English: open <https://koivupiilo.fi/en/>, click "Work", and find "Ratametsuri" with "in
   development" and "23 Nov 2026". Click "Ratametsuri". The page reads "Status checked 23 Nov 2026."

**Pass when:** the product is two clicks from the front page in either language, and the list and
the page show the same date.

## W3 Language switch (Mac, about 3 min)

A reader switches language and stays on the same page.

1. On <https://koivupiilo.fi/ratametsuri/>, click "In English" in the top right. You should be on
   `/en/ratametsuri/`, with "Status checked 23 Nov 2026." beside the status.
2. Click "Suomeksi". You should be back on `/ratametsuri/`.
3. In the checkbox text, click "koivupiilo.fi/tietosuoja". The privacy page opens, with a section
   "Ratametsuri".
4. Click "English" in the privacy page's header. You should be on `/en/privacy/`, with its own
   "Ratametsuri" section.
5. Press Back twice. You should be on the product page again.

**Pass when:**

- Every language link lands on the same page in the other language, never on the front page.
- Each language link is written in the language it leads to.

## W5 Who makes this (Mac, about 2 min)

A careful setter checks the company behind the app before giving an address.

1. On <https://koivupiilo.fi/en/ratametsuri/>, scroll to the bottom line: "Ratametsuri is a product
   of Koivupiilo Oy · Business ID 3458206-1 · Privacy".
2. Click "Privacy", then "Company" in that page's header.
3. Read the company name, the business ID, the address and the email on `/en/company/`:
   - "Koivupiilo Oy";
   - "3458206-1";
   - "Sopentie, 36200 Kangasala, Finland";
   - "jarkko@koivupiilo.fi".

   In Finnish, the same path is "Tietosuoja", then "Yritys".

**Pass when:** from the product page you reach the business ID, the registered address and an email
in two clicks.

## iPhone, real Safari (device only, about 8 min)

No desktop browser or simulator can pass this section. It needs a real touch screen, the real iOS
keyboard covering half the screen, and real text-size settings. Use the live page, after the merge.

1. Open <https://koivupiilo.fi/ratametsuri/> in Safari. On the first screen, read:
   - "Ratametsuri";
   - "In English";
   - the headline;
   - the status with its date.

   Scroll once to the map and "Mitä tarvitset".
2. Tap the "Sähköpostiosoite" field. Check that:
   - the keyboard is the email keyboard, with @ and .;
   - the page does not zoom in;
   - the field you are typing in stays visible above the keyboard.

   If Safari offers your address above the keyboard, that is AutoFill working.
3. Type `a@b`. Tap the checkbox text "Haluan sähköpostiini…". The box should tick; the text is the
   checkbox's label. Avoid the link at its end.
4. Tap "Pyydä kutsu". Expect "Tämä ei näytä sähköpostiosoitteelta. Tarkista osoite." under the
   field. You should be able to read it without hunting behind the keyboard.
5. Text size: tap "aA" in Safari's address bar, then the larger "A" until it reads 150%, then
   175%. At each size, scroll the whole page. iOS Dynamic Type doesn't change web pages that don't
   opt in, and this one doesn't, so Safari's text size is the real large-text setting for it.
   Check that:
   - the numbered circles beside "Osoitin kertoo, mitä napsautus tekee", "Suomeksi" and "PDF ja IOF
     XML 3.0" don't touch the headings;
   - nothing scrolls sideways;
   - "Pyydä kutsu" is still easy to hit.

   Set the size back to 100%.
6. Open Control Centre and turn on Dark Mode. The page should follow without a reload. Turn it off.
7. Tap "In English". The English page should open, with "Status checked 23 Nov 2026.".

**Pass when:**

- Tapping the field doesn't zoom the page, and the keyboard never hides the field or its message.
- Every tap target is easy to hit with a thumb.
- At 175% text, everything reads without sideways scrolling, and no circle touches its heading.
- Dark Mode follows the phone.

## One question about the page as built

The defect review `eef7d25e` approved 16 new screenshots of the page (phone and desktop, light and
dark, both languages) as taste-relevant. Together they amount to one question, not sixteen.

**Decision:** keep the page's proof as built, or replace the hero screenshot with a responsive panel
that shows the app in action?

**Why now:** this is the page's main proof. Changing it after setters have seen the page costs
little, but it is easier to decide before the first invites go out.

**Today:** the hero shows a still screenshot of the app on the Kauppi map; on a phone it is cropped
to the map. The click preview, the app's most distinctive behaviour, is described in words as
feature 1, "Osoitin kertoo, mitä napsautus tekee".

**A. Keep the page as built.** It works like a still product shot on an App Store or Mac product
page.

- Shown: `../baselines/ratametsuri/phone-light-fi-FI.png` and
  `../baselines/ratametsuri/desktop-light-fi-FI.png`. The dark and English versions are beside them.
- Tradeoff: you gain a page that is done, tested and fast. You pay with a phone first screen that
  shows a map but not the Mac app, and with the click preview being told rather than shown.

**B. A responsive real-app proof panel (S-r1 from the critique).** The critique compares Flighty,
Final Cut Pro and Mela.

- The hero becomes one compact, static panel cut from a real window: the pointer over a control,
  with the preview "Lisää 31 rastiksi 4" readable at phone width.
- Shown: not built. The proposal is described in `../opportunity-tree.md` (S-r1) and in the
  critique `.ds/reviews/eef7d25e8c6941de8e882619974b890fb73b53ec535d060b77af029feab7f054.critique.json`
  (`two_x`). A mockup is the next step only if you pick B.
- Tradeoff: you gain a setter who sees the app's difference within seconds. You pay with new
  capture and layout work, and you risk a panel too small to read the course, or one that pushes
  the field below the first screen.

**Recommendation:** A, for now. Revisit B if setters in the outside test can't say what the app
does differently. The page's job at this stage is to reach 10–20 club setters, and it already
names the click preview in words. B is a hypothesis without a mockup.

**Evidence:** anecdote or opinion. One reviewer's critique, with comparisons to other apps' pages,
and no setter has seen either version.

**Strongest counter-argument:** setters already have OCAD, Purple Pen or Condes. A page that only
says "a course setting app for the Mac" shows nothing they couldn't assume. The one thing that
would make them ask for an invite, the app feeling like a real Mac app, is exactly what a still
map crop hides on a phone.

**Undo:** easy. It is a static page with no user data, so either option can be swapped later in a
day's work.

Your answer goes into `../model.md` or `brief.md` as a D entry.

## Outside test (optional)

A new page for users beyond Jarkko is worth a cheap test. It never blocks the milestone. Nobody
has been recruited.

- **Who:** 2–3 club course setters who own a Mac and haven't seen the page.
- **How:** send each one the design kit's tester brief (`tester-brief.md`) with the
  link <https://koivupiilo.fi/ratametsuri/>. They do a 10-minute task, think aloud, and make a
  screen recording. You recruit; the agent analyses the recordings.
- **Task:** "You heard a course setting app for the Mac is coming. Open the link and work out
  whether it would suit you. Stop before pressing 'Pyydä kutsu' unless you really want an invite."
- **What it tells us:**
  - whether a setter can say in their own words what the app does differently (the test for
    question B);
  - whether they can tell that their Mac qualifies;
  - whether they find the request without help.

## Findings

<!-- Filled after the walkthrough, from the design kit's findings-summary template. Observations (what happened, with the step) stay apart from inferences. -->

Device: <Mac model, macOS version; iPhone model, iOS version> · Build: main at <commit> · Testers: owner only · Date: <YYYY-MM-DD>
Outcome: <one line>
Label: owner-validated only
Raw notes and recordings: <path or link>

### Findings

| Area | Evidence / required outcome |
|---|---|
| | |

### Observations

-

### Inferences

-

### Coverage and limits

- Reached: <W0, W1, W3, W5, iPhone>. Not run: <…>.
- Owner only: no evidence about first-time visitors or other course setters.
- Already covered by the reviews and not repeated here:
  - the server-error, rate-limit and no-JS states (intercepted fixtures, Chrome);
  - Chrome zoom at 110–200 %;
  - reduced motion.
- Not covered anywhere yet: VoiceOver or another screen reader.

### Next

- Record the answer to the question above as a D entry. Add each finding to
  `../opportunity-tree.md`.

## Label check

Checked on 2026-11-24 at `4323320`, in two ways:

1. In the built `output/` HTML.
2. By walking the steps above in Chrome against the built site, with the sign-up intercepted, so
   nothing was sent. "OK" means the text was found visible on screen, or as the link, button or
   field's accessible name.

| Label | Found where |
|---|---|
| "Työt" / "Work" | `/` and `/en/` header link |
| "Ratametsuri", "kehitteillä", "23.11.2026" | `/tyot/` list row; link goes to `/ratametsuri/` |
| "Ratametsuri", "in development", "23 Nov 2026" | `/en/work/` list row; link goes to `/en/ratametsuri/` |
| "Ratamestarisovellus Macille" / "Course setting app for the Mac" | product page headline |
| "Tilanne tarkistettu 23.11.2026." / "Status checked 23 Nov 2026." | product page, end of the status line |
| "Mitä tarvitset" / "What you need" | product page |
| "Pyydä betakutsu" / "Ask for a beta invite" | product page, form heading |
| "Sähköpostiosoite" / "Email address" | product page, field label (textbox accessible name) |
| "Haluan sähköpostiini kutsun Ratametsurin betaan…" | product page, checkbox label |
| "Pyydä kutsu" / "Ask for an invite" | product page, button |
| "Tämä ei näytä sähköpostiosoitteelta. Tarkista osoite." / "That doesn't look like an email address. Please check it." | after the button, with `a@b` (intercepted 422) |
| "Pyyntö ei lähtenyt. Tarkista verkkoyhteys ja yritä uudelleen." | after the button while offline (in the HTML; the shoot's offline shots) |
| "Voit pyytää kutsun myös sähköpostilla: jarkko@koivupiilo.fi" | under the offline answer (in the HTML; the shoot's offline shots) |
| "Lähetetään…" / "Sending…" | while the request is pending (in the HTML; the shoot's sending shots) |
| "Lähetimme vahvistusviestin osoitteeseen …" / "We sent a confirmation email to …" | after the button (intercepted 202) |
| "Mitä Ratametsuri jo osaa" / "What Ratametsuri can already do" | product page |
| "Osoitin kertoo, mitä napsautus tekee", "Suomeksi", "PDF ja IOF XML 3.0" | product page, the three numbered features (in the HTML) |
| "Ratametsuri on Koivupiilo Oy:n tuote" / "Ratametsuri is a product of Koivupiilo Oy" | product page, bottom line |
| "Y-tunnus 3458206-1" / "Business ID 3458206-1" | product page, bottom line |
| "Tietosuoja" / "Privacy" | product page, bottom-line link |
| "koivupiilo.fi/tietosuoja" / "koivupiilo.fi/en/privacy" | product page, link at the end of the checkbox text |
| "In English" / "Suomeksi" | product page header link; goes to the other language's product page |
| "Siirry sisältöön" / "Skip to content" | product page, on the first Tab |
| "Ratametsuri" | `/tietosuoja/` and `/en/privacy/`, section heading |
| "English" / "Suomeksi" | privacy page header link. The step script `W3.md` (5501c2a) calls it "In English"; the page says "English", and this runbook uses "English". |
| "Yritys" / "Company" | privacy page header link |
| "3458206-1", "jarkko@koivupiilo.fi", "Sopentie, 36200 Kangasala, Finland" | `/yritys/` and `/en/company/` |
| "Ratametsuri: vahvista ilmoittautumisesi", "Vahvista ilmoittautuminen", "Olet mukana", "Mitä seuraavaksi?", "Ratametsuri: olet mukana", "Poista osoitteeni" | launchpad's Finnish locale only (`priv/locales/fi.yml` and `projects/ratametsuri/locales/fi.yml` at `8d01e7f`). Not checked in a sent email; step W0.6 is that check. |

The label check found one mismatch, the privacy header link, and the runbook was fixed to match the
page.
