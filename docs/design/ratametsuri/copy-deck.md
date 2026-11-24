# Ratametsuri: Finnish copy deck (fi.yml)

2026-11-23. Replaces the placeholder strings in `src/_data/ratametsuri/fi.yml`;
nothing is applied yet. Written in Finnish first, then checked against
`suomen-kieli`, `stop-slop` and `otsikointi`.

Sources: `disc` = `docs/design/ratametsuri/discovery.md`. `R/` =
`/Users/jarkko/code/ratametsuri` (main `206eabb`). `spec10-21` =
`R/docs/superpowers/specs/2026-10-21-first-course-interaction-design.md`.
`xcstrings` = `R/macos/Ratametsuri/Ratametsuri/Localizable.xcstrings`.

## Headline (otsikointi)

Revised 2026-11-23 after Jarkko's verdict on the first two ("they're both
terrible"; "sovellus" or "ohjelmisto", never the plain word for "program"). Category word for
the whole page: **ratamestarisovellus**, short form **sovellus** (Jarkko:
"ratamestariohjelmisto" or "-sovellus"; "sovellus" is the word a Mac user
sees for an app). "tulospalveluohjelmisto" stays, because it names the
results software, not Ratametsuri (termbase.tsv:19).

The reader is a club course setter with a Mac. Angle: what the app is for
them, and that the courses still reach the results software as IOF XML
(disc:369, disc:385). The headline is `white-space:nowrap` on desktop
(`src/ratametsuri/style.css:185`), so it stays under about 35 characters.
The chain half goes in `status`, the line right under it.

| | Option | Angle | Verdict |
|---|---|---|---|
| **1** | **Ratamestarisovellus Macille** | what it is, for whom | **Pick.** The reader finds himself in the first word and his machine in the second; it is Jarkko's own category word, every word is covered (disc:369, project.yml), and `status` adds the IOF XML chain. 27 characters. |
| 2 | Suunnittele seuran radat Macilla | the reader's job | Runner-up, a different angle: the job in the setter's own words and "seuran" places it at club level (disc:375), but the imperative opening leans towards an ad call. 32 characters. |
| 3 | Kartasta tulospalveluun Macilla | the chain | Rejected: it promises the whole path to "the results software" in the headline, where only MeOS 5.0 has been tried (disc:207, must-not-say 8); the status line can carry that limit, a headline can't. |
| 4 | Seuran ratamestarin Mac-sovellus | reader | Rejected: two genitives in a row read like an official title, and it says the same as option 1 in more words. |
| 5 | Näet kartalla, mitä napsautus tekee | click preview (D1) | Rejected: true, but D1 is a proof point now, not the lead (disc:371), and it says nothing about the Mac or the chain. |

Rejected before shortlisting: the two first-round headlines (Jarkko: both
terrible; both used the plain word for "program", and one used the ad frame
"Oikea X Y:lle"), "Radat Macilla ilman virtuaalikonetta" (Purple Pen 4 already runs
without a VM on Apple silicon, disc:90), "Radat Macilla, IOF XML
tulospalveluun" (a slogan, and IOF XML means nothing to a coach in a
headline) and anything with "nyt" (it isn't released).

## Strings

Unchanged keys: `skip_link`, `lang_link`, `map_credit`, `beta.heading`,
`beta.field_label`, `beta.button`, `beta.sending`, `beta.invalid_email`,
`beta.honeypot_label`, `maker_line.*`, `course_words.*`. **`consent.*` stays
byte for byte** (beta-2026-11).

| Key | Finnish | Source |
|---|---|---|
| page_title | Ratametsuri – ratamestarisovellus Macille | disc:369; R/docs/superpowers/specs/2026-10-18-course-setter-design.md:17-19 |
| meta_description | Ratametsuri on ratamestarisovellus Macille. Suunnittelet sillä suunnistusradat ja viet ne tulospalveluun IOF XML 3.0 -tiedostona. Sovellus on kehitteillä. | disc:369, disc:207 (IOF XML 3.0 export), disc:378; R/docs/design/stories.md:319-320 |
| headline | Ratamestarisovellus Macille | disc:369, disc:385; R/docs/superpowers/specs/2026-10-18-course-setter-design.md:17-19 ("in a Mac document window"); R/macos/Ratametsuri/project.yml:5 |
| status | Viet radat tulospalveluun IOF XML 3.0 -tiedostona niin kuin muistakin ratamestarisovelluksista. Sovellus on kehitteillä. | disc:369 ("as they do now"), disc:66-71 and disc:75-77 (the other tools write IOF XML 3), disc:378; stories.md:319-320 |
| screenshot_alt | Ratametsurin ikkuna: Kaupin kartalla rata A ja sen rastinmääritteet. Sivupalkissa ovat radat ja radan rastit. | src/ratametsuri/screen-light.webp (looked at) |
| requirements.heading | Mitä tarvitset | (unchanged) |
| requirements.items[0] | Mac, jossa on macOS 14 Sonoma tai uudempi | R/macos/Ratametsuri/project.yml:5; disc:357 |
| requirements.items[1] | Kartta PDF-, PNG-, JPEG- tai TIFF-tiedostona | disc:200, disc:323 |
| features_heading | Mitä Ratametsuri jo osaa | disc:378 (in development) |
| beta.lead | Beta on seurojen ratamestareille, joilla on Mac. Aluksi mukaan mahtuu 10–20 ratamestaria, joten emme voi luvata kutsua kaikille. | disc:375 |
| beta.check_email | Lähetimme osoitteeseesi vahvistusviestin. Vahvista pyyntösi viestissä olevasta linkistä. | no claim; drops the old promise "Kutsu tulee" (disc:375) |
| beta.failed | Pyyntö ei mennyt perille. Yritä hetken päästä uudelleen. | no claim |
| beta.rate_limited | Verkostasi on tullut lyhyessä ajassa liian monta pyyntöä. Yritä uudelleen muutaman minuutin päästä. | no claim |
| beta.offline | Pyyntö ei lähtenyt. Tarkista verkkoyhteys ja yritä uudelleen. | no claim |

### Features (the numbered controls, one demo each)

Three features since the critic round of 2026-11-23: the old feature 2
("Rasti ei katoa muilta radoilta") is cut, see "Critic rounds" below.

**1. Osoitin kertoo, mitä napsautus tekee**
Kun osoitin on toisen radan rastin päällä, sen vieressä lukee esimerkiksi ”Lisää 31 rastiksi 4” ja rastivälin päällä ”Lisää rastien 2 ja 3 väliin”. Jos osut rastiin, joka on jo radalla, napsautus vain valitsee sen eikä lisää sitä toista kertaa.
- Source: disc:104-107 (D1: over another course's control, over a leg, over a control already on this course); R/macos/RatametsuriCore/Sources/RatametsuriCore/CourseInteraction.swift:92, :94-96, :118 (the two strings and the already-on-course case); R/macos/Ratametsuri/Ratametsuri/MapCanvas.swift:149 ("The text next to the pointer"). Purple Pen is not named on the page (Jarkko, 2026-11-23).
- Demo: disc §5 D1 loop, 5 s, Finnish UI: the pointer over a leg ("Lisää rastien 2 ja 3 väliin"), then over another course's 31 ("Lisää 31 rastiksi 4"), click, list and numbers update; subtitle "Lisätään rasteja · Esc lopettaa" in view.

**2. Suomeksi**
Sovellus käyttää SSL:n termejä, kuten ”rastinmääritteet” ja ”rastipisteen kohde”.
- Source: xcstrings (fi: Rastinmääritteet, Rastipisteen kohde); spec10-21:182-183 ("Finnish strings use the terms in the SSL Rastinmääritteet translation"); disc:153-162.
- 2026-11-23: the arrow-key sentence is cut (Jarkko: obvious). It was the only thing behind "Macin tapaan" (critic pass 1), so the title is now "Suomeksi", and the body no longer repeats "on suomeksi".
- Lead review (2026-11-23): removed "Tallennat tapahtuman tavallisena Mac-dokumenttina". The event is a named project that autosaves (course-setter spec :87, :250), not a document you save, and the autosave crash #80 is open, so the page makes no saving claim.
- Demo: still, 2x crop of the Finnish window: sidebar "Radat" / "Radan rastit" / "Rastinmääritteet", the toolbar's three tools.

**3. PDF ja IOF XML 3.0**
Jokaisesta radasta tulee oma PDF, jossa rastinmääritteet ovat kartalla. Sarakkeita E, G ja H ei voi vielä muokata. MeOS 5.0 on lukenut Ratametsurin radat ilman varoituksia. Muita tulospalveluohjelmistoja ei ole kokeiltu.
- Source: disc:206 (one course per file, sheet on the map; RatametsuriCore/CoursePDF.swift:8-45, one page per course), disc:203 (E read-only, G and H not editable), disc:207 (MeOS 5.0; other timing systems untested); #13 note 4132751349 ("actual UI import finished with two courses and no import warning/error shown", MeOS 5.0.1851 under Wine; the XML came from the Core export code, not from the app's menu); stories.md:319-320.
- Demo: still: the File menu open on "Vie PDF…" and "Vie IOF XML…", next to one page of an exported course PDF.

Left out on purpose: shared controls, live sheet, map from a PDF (table stakes,
disc:183-185); map detail over the purple (disc:377); any time saving,
Windows, iPad, Intel, OCAD, price or date (disc:259-284, disc:379).

## Self-check (suomen-kieli, stop-slop) and what it changed

- Word order: "Tulospalveluun viet radat…" and the sentence about not exporting an unfinished course put the object or adverbial first for no reason. The first became "Viet radat…", then moved to `status` as "Radat menevät tulospalveluun…". The second sentence was cut (an eye-roll detail). "Koko tapahtumasta rastin voi poistaa" became "Rastin voi poistaa koko tapahtumasta".
- ja + kielto: "ja emme voi luvata" became "emmekä voi luvata".
- Repetition: feature 1's text repeated the title ("mitä napsautus tekee"), so it now says "näet tuloksen ennen napsautusta".
- Ambiguous reference: "joilta se poistuu" could point at the app, so it now says "joilta rasti poistuu".
- Mac terms: "kohdistin" (the text cursor) became "osoitin" (the mouse pointer). "Kumoa palauttaa" became "⌘Z tuo… takaisin", which is the Mac key and needs no explaining.
- Overpromise: `check_email` no longer says "Kutsu tulee, kun beta alkaa" (decision 3: not everyone gets an invite).
- Wording: "ilmoittautuminen" became "pyyntö" in the error strings, to match the button "Pyydä kutsu".
- The requirement that the app is in Finnish and English was dropped. It isn't a requirement, and Finnish is now feature 3. The map file formats took its place.
- Spelling: rastinmääritteet with the n throughout (termbase). Quotes ”…”, en dash 10–20, "IOF XML 3.0 -tiedostona", "SSL:n".
- stop-slop: no em dashes, no "ei X vaan Y", and no pull-quote lines (option 3 was rejected for that). The only adverbs left are "vain" and "vielä", and each one carries meaning.

## For whoever applies this

- `tidy` in `src/_layouts/ratametsuri.erb:16-26` adds soft hyphens for "astimääritteet" and "ulospalveluohjelmistoon". Neither matches the new copy. It needs "rastin&shy;määritteet", "tulospalvelu&shy;ohjelmistoja" (feature 3) and "ratamestari&shy;sovellus" / "ratamestari&shy;sovelluksista" (headline on narrow screens, status, meta), and "tulos&shy;palveluun" if the narrow column needs it.
- The hero screenshot shows the **English** UI. On the Finnish page, and with feature 2 claiming SSL terms, it should be the Finnish UI. The alt text above fits either.
- The word is "beta" (betaan, betakutsu), never the double-e spelling (Jarkko, 2026-11-23). The page strings already say "beta". The consent text, which uses the double-e spelling, is being reissued separately and is not touched here.
- en.yml is not touched.

## Critic rounds (2026-11-23)

An independent critic, who did not write the deck, ran four passes in
order, each on the result of the one before. Line numbers refer to the deck
as it was handed over (old feature numbering). Sources were read, not
taken from the deck's citations: disc, R at `206eabb`, the Finnish values in
xcstrings, the code lines cited, the screenshot, and the GitLab note on #13.

### Pass 1: toimittajan-tarkistus (claims against sources)

| Line | Problem | Fix |
|---|---|---|
| 41 status, 39 meta | "Radat menevät tulospalveluun … niin kuin nytkin" reads as "works with the results software you use now". Only MeOS 5.0 has been tried, once (disc:207, must-not-say 8). "Radat menevät" also leaves out who does it. | The claim is now about the format, which is true: "Viet radat tulospalveluun IOF XML 3.0 -tiedostona niin kuin muistakin …" (category word replaced 2026-11-23; Purple Pen and Condes write IOF XML 3, disc:75-77). The meta description says the same in the passive. |
| 56 feature 1 | "Jos olet tehnyt ratoja Purple Penillä, perusidea on tuttu" can't be checked. It is a design goal (spec10-21:45-46), and nobody has been watched using the app (disc:12-14). It also says nothing a setter can use. | Replaced with the factual comparison that disc §3 D1 already sources: "Purple Pen lisää radalle jo kartalla olevan rastin, jos napsautat sen lähelle" (DVO club guide: "will jump to the existing control if you are close", R/docs/research/2026-10-21-course-building-interaction.md:36). This is the one Purple Pen mention (decision 4). |
| 56 feature 1 | "näet tuloksen ennen napsautusta": on an orienteering page, "tulos" reads as the race result. | "osoittimen vieressä lukee etukäteen esimerkiksi …". The quoted strings are checked: CourseInteraction.swift:92, :118. The already-on-course behaviour is checked at :94-96 (a plain click selects it, ⌥-click adds it again). |
| 60-64 feature 2 | True (spec10-21:247-253, :275-278; xcstrings "Se poistetaan myös näiltä radoilta: %@."), but it is the line Jarkko already rolled his eyes at. Purple Pen and Condes keep "remove from course" and "delete from event" apart too (disc:129-131; Purple Pen also asks before it deletes an unused control, course-building research:40-41). What's left as news is "no dialog, and ⌘Z", and every Mac program has Undo. | **Cut.** It can't be both true and non-obvious to a Purple Pen user. Three features stay. If Jarkko wants it back for OCAD users, it has to name OCAD's Delete, and naming OCAD hasn't been approved (decision 4 covers Purple Pen only). |
| 67 feature 3 | "Näppäimet S, C ja F …" is true (MapCanvas.swift:1377-1379), but tool shortcuts aren't Mac-specific, so the title's "Macin tapaan" had nothing behind it. | In pass 2/3 it was replaced with the arrow-key nudge: 1 mm on paper, 0.1 mm with Shift (course-setter spec:226-227; MapCanvas.swift:1366; CourseWindow.swift:506). That is the Keynote-style detail a setter actually uses. |
| 67 feature 3 | "käyttää SSL:n termejä": the app's spec says the Finnish strings follow the SSL Rastinmääritteet translation (spec10-21:182-183). I could check that the two named terms appear in the app (xcstrings: Rastinmääritteet, Rastipisteen kohde), but not the whole catalogue against the SSL document. | The claim stays narrow, as "kuten ”rastinmääritteet” ja ”rastipisteen kohde”", and isn't widened to "all terms". |
| 73 feature 4 | "MeOS 5.0 luki … ilman varoituksia": true for the import (#13 note 4132751349: "actual UI import finished with two courses and no import warning/error shown", MeOS 5.0.1851). A separate printing advisory about name length did appear. The XML came from the Core export code, not from the app's menu, and MeOS ran under Wine. | Kept, in the perfect tense ("on lukenut"), with the limit a Finnish setter needs: "Muita tulospalveluohjelmistoja ei ole kokeiltu." Whoever uses Pirilä or another program now knows where they stand. |
| 73 feature 4 | "Jokaisesta radasta tulee oma PDF, jossa rastinmääritteet ovat kartalla" and "E, G ja H ei voi vielä muokata". | Checked: one page per course (CoursePDF.swift:8-45; disc:206), E read-only and G and H not editable (disc:203). Unchanged. |
| 42 screenshot_alt | Checked against screen-light.webp: Kauppi map, course A selected, the sheet on the map, sidebar "Courses" and the visit list. | Unchanged. "Kaupin" is the right genitive of Kauppi. |
| 47 beta.lead | 10–20 at first and no promise of an invite for everyone (decision 3). | True. The wording changed in pass 2. |

**Couldn't verify:**
- How Purple Pen behaves today. The "jumps to the existing control" sentence comes from a DVO club guide quoted in the app's research, not from our own trial. Jarkko should confirm it matches his Purple Pen.
- The whole Finnish symbol catalogue against the SSL document. A few app strings look doubtful ("Kuiva pieni uoma", "Pieni kaivettu kuoppa", "Pienimuotoinen alue"). This affects the app, not the page, because the page names only the two terms that are certainly right.
- That the first-round category word is what club setters call Purple Pen, OCAD and Condes as a group. Moot since 2026-11-23: Jarkko chose "ratamestarisovellus".

### Pass 2: suomen-kieli (kielentarkastaja)

| Line | Problem | Fix |
|---|---|---|
| 41 status | "Radat menevät tulospalveluun" leaves out who does it, and "niin kuin nytkin" overclaims (pass 1). | "Viet radat tulospalveluun … niin kuin muistakin …" (category word replaced 2026-11-23). The verb comes first, with no inverted object, and the second person matches the feature texts. |
| 47 beta.lead | "emmekä voi luvata kutsua kaikille": the -kä is correct, but the link between the clauses is cause, not addition. "pääsee" also says less about capacity than "mahtuu". | "Aluksi mukaan mahtuu 10–20 ratamestaria, joten emme voi luvata kutsua kaikille." |
| 56 feature 1 | "Purple Penissä rasti hyppää …" (first rewrite): it was unclear which control jumps. | Named the actor: "Purple Pen lisää radalle jo kartalla olevan rastin, jos napsautat sen lähelle." "Ratametsurissa" opens the next sentence as a contrastive topic, which is ordinary Finnish and not an inversion. "jo kartalla" (the event) and "jo radalla" (this course) are kept apart on purpose. |
| 67 feature 3 | "termejä, kuten rastinmääritteet ja rastipisteen kohde": nominatives after "kuten" with a partitive head read like a case error. | Quoted as names: "kuten ”rastinmääritteet” ja ”rastipisteen kohde”". |
| new feature 3 | the short form (without -isto) is forbidden in the termbase (Jarkko, 21.11.2026). | "tulospalveluohjelmistoja". |
| new feature 2 | The nudge: "paperilla 1 mm" put the unit after an odd adverbial. | "1 mm kartalla, vaihtonäppäimen kanssa 0,1 mm". Setters think in map millimetres. |
| all | Checked every sentence for ja + kielto, compounds (IOF XML 3.0 -tiedostona, PDF-, PNG-, JPEG- tai TIFF-tiedostona, the Mac- compound), commas before joten, jos, joka and kuten, and quotes ”…”. | No other changes. `check_email`, `failed`, `rate_limited`, `offline`, `requirements.*` and `page_title` stay. They are normal Finnish service wording. |

### Pass 3: stop-slop

| Line | Problem | Fix |
|---|---|---|
| status, meta | "vielä kehitteillä": "vielä" adds nothing that "kehitteillä" doesn't already say. | "… on kehitteillä." (now "Sovellus on kehitteillä.") "vielä" stays in "ei voi vielä muokata", where it says the limit is temporary without promising a date. |
| new feature 2 | Three sentences of the same length, one after another. The S/C/F sentence was the weakest, and it puts English letters on Finnish tools (S = Start, not Lähtö). | Cut the S/C/F sentence. Two sentences, uneven lengths. |
| meta | The passive "viedään". stop-slop wants an actor, but the Finnish implicit-agent passive is normal in a third-person description (suomen-kieli outranks it). | Kept. |
| all | Checked for em dashes, "ei X vaan Y", pull-quote lines, triplets and throat-clearing. | None found. Feature 3's two negatives are facts the reader needs, not a negative listing. |

### Pass 4: otsikointi (headline)

| Line | Problem | Fix |
|---|---|---|
| 40 headline | The writer's headline used the stock ad frame "Oikea X Y:lle" ("Oikea vakuutus yrittäjälle"), so it read as "the right Mac app for you", which the page can't back (kate test). | The critic picked a plainer native-angle line instead. Jarkko rejected both on 2026-11-23 (the plain word for "program"); see the revision below. |

Tests on the pick: every word is covered, a setter could say it as it
stands, no stock phrase, no teaser, no front-loaded modifiers.

### Still for the owner

- Headline: "Ratamestarisovellus Macille" (pick) or "Suunnittele seuran radat Macilla" (runner-up), see the 2026-11-23 revision below.
- Feature 2 ("Rasti ei katoa muilta radoilta") is cut. Restore it only if OCAD may be named.
- ~~Confirm the Purple Pen sentence~~: Purple Pen is off the page (2026-11-23).
- ~~beta, double-e spelling~~: "beta" (2026-11-23); the consent is reissued separately.
- The screenshot is the English UI on the Finnish page, while feature 2 is titled "Suomeksi". This is your call.
- Outside the deck's scope, but noticed: consent-draft.md says the line must not say "never passed on" because Brevo is a processor, and the fixed consent says "eikä luovuteta eteenpäin". It is fixed, so it is not touched here. Launchpad and you should know.

## Revision 2026-11-23 (after Jarkko's verdicts)

Jarkko's verdicts: both headlines were terrible; the product is a
"sovellus" or "ohjelmisto", never the plain word for "program"; the category
word is "ratamestariohjelmisto" or "-sovellus"; Purple Pen comes off the
page ("why would we talk about PP here?"); the arrow-key sentence is
obvious; the spelling is "beta" (betaan, betakutsu). The consent text is
being reissued separately and is not touched. fi.yml and en.yml are not
edited.

### Changed strings

| Key | Before | After |
|---|---|---|
| page_title | Ratametsuri – Mac-[program] suunnistusratojen suunnitteluun | Ratametsuri – ratamestarisovellus Macille |
| meta_description | Ratametsuri on Macille tehty [program] … niin kuin muistakin rata[program]ista. [Program] on kehitteillä. | Ratametsuri on ratamestarisovellus Macille. Suunnittelet sillä suunnistusradat ja viet ne tulospalveluun IOF XML 3.0 -tiedostona. Sovellus on kehitteillä. |
| headline | Macille tehty rata[program] | Ratamestarisovellus Macille |
| status | … niin kuin muistakin rata[program]ista. [Program] on kehitteillä. | Viet radat tulospalveluun IOF XML 3.0 -tiedostona niin kuin muistakin ratamestarisovelluksista. Sovellus on kehitteillä. |
| feature 1 text | Purple Pen lisää radalle … Ratametsurissa osoittimen vieressä lukee etukäteen … | Kun osoitin on toisen radan rastin päällä, sen vieressä lukee esimerkiksi ”Lisää 31 rastiksi 4” ja rastivälin päällä ”Lisää rastien 2 ja 3 väliin”. Jos osut rastiin, joka on jo radalla, napsautus vain valitsee sen eikä lisää sitä toista kertaa. |
| feature 2 title | Suomeksi ja Macin tapaan | Suomeksi |
| feature 2 text | [Program] on suomeksi ja käyttää SSL:n termejä, … Nuolinäppäin siirtää … | Sovellus käyttää SSL:n termejä, kuten ”rastinmääritteet” ja ”rastipisteen kohde”. |

Category word: **ratamestarisovellus**, short form **sovellus**, on every
line. "tulospalveluohjelmisto" (feature 3) is the results software, not
Ratametsuri, and stays per termbase.tsv:19. No page string names Purple Pen
any more.

### suomen-kieli pass

- Feature 1, first draft: "Rastivälin päällä lukee ”…”" as its own sentence read as if the text were printed on the leg. Joined to the first sentence with an elided verb ("… lukee esimerkiksi ”Lisää 31 rastiksi 4” ja rastivälin päällä ”…”"), so "sen vieressä" (the pointer) covers both. No comma before "ja", because the second part has no verb of its own.
- Feature 1: "sen" now has one possible antecedent, "osoitin", the subject of the kun clause. The old version's "etukäteen" went with the title, which already says it.
- Feature 2: "Sovellus on suomeksi" under a title "Suomeksi" repeated the title, so the body starts with the SSL terms. Nominative quoted terms after "kuten" stay in quotes, as in pass 2.
- Meta: shortened from 217 to about 155 characters; "niin kuin muistakin ratamestarisovelluksista" stays in `status` only, so the meta no longer repeats the category word twice.
- Compounds: ratamestarisovellus and ratamestarisovelluksista one word; "IOF XML 3.0 -tiedostona" with a space and hyphen. "sovellus Macille" follows the Finnish Mac usage ("sovellukset Macille").
- Ran the basic-error list on every changed sentence: no ja + kielto ("eikä lisää" is right), no double että, no mixed person (second person throughout: suunnittelet, viet, osut), no zeugma.

### stop-slop pass

- Adverbs: "esimerkiksi" (31 and 4 are an example) and "vain" (a click selects, it does not add) carry meaning; nothing else.
- No em dashes, no "ei X vaan Y", no pull-quote line. The headline is a plain noun phrase, not a slogan.
- Rhythm: feature 1 is now one long sentence and one shorter one; feature 2 is a single sentence. Features 1–3 no longer have matching lengths.
- Inanimate actors ("Sovellus käyttää", "napsautus valitsee") are normal Finnish for software and were kept (suomen-kieli outranks stop-slop on this).

### Headline (otsikointi)

Five options, the pick and the runner-up are in the Headline section at the
top. Pick: "Ratamestarisovellus Macille". Runner-up with a different angle:
"Suunnittele seuran radat Macilla".

### Open for Jarkko

- Headline: the pick or the runner-up.
- Feature 2's title changed from "Suomeksi ja Macin tapaan" to "Suomeksi": with the arrow keys gone, nothing on the page backed "Macin tapaan".
- The hero screenshot still shows the English UI under a feature titled "Suomeksi".
