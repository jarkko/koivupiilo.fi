# Ratametsuri product page: discovery

Written 2026-11-21, before any more copy or design. Jarkko turned down copy2
because it told experts what they already know ("Radat käyttävät samoja
rasteja": "jesus christ, no kidding") and listed capabilities instead of
value. This note sets out what the app is for, what it does better and what
is worth saying.

**Sources.** `R` = the Ratametsuri repository (`main` at `c3e951e`), read
only. `#n` = a GitLab issue in that project. "Built" means merged on main
with acceptance tests. None of it has passed Jarkko's own walkthrough yet:
#19 and #25 are open. Nobody has been observed using the app
(R/docs/design/stories.md "How to read this": "There is no observed session
of someone setting a course in this app yet"). **UNKNOWN** means the docs
don't say. Unknowns stay off the page.

---

## 1. What the app was built to solve

What the docs say:

- **The same job, in a real Mac window.** "Purple Pen, OCAD and Condes
  already do the job. Purple Pen 4 even runs on Apple silicon, with a
  Windows window brought across. Ratametsuri exists to do that job in a Mac
  document window: the same course, different controls."
  (R/docs/superpowers/specs/2026-10-18-course-setter-design.md, Intent.)
  "The product bet … a best-in-class native Mac experience"
  (R/docs/research/2026-10-18-macos-interaction.md, intro). S8's job is "so
  that I am not driving a Windows program with a trackpad"
  (R/docs/design/stories.md, S8).
- **Fewer surprises when building a course.** "It should feel familiar to a
  Purple Pen or Condes user and smoother than either: fewer modes, and every
  action previewed before it happens." Under "Where we go further": "every
  click is previewed; repeat visits need ⌥; the mode is named in the window
  subtitle; one hit-test drives both preview and click."
  (R/docs/superpowers/specs/2026-10-21-first-course-interaction-design.md,
  Intent and "What we take from other tools".) This came from the first
  build failing Jarkko's own trial on 2026-10-21 (#19; same spec, "Why this
  exists").
- **Who it is for.** Two personas, written by the owner and not observed:
  Liisa, a club ratamestari who sets a forest event from a PDF or a scan "a
  few times a season", and Kalle, a coach who sets weeknight trainings
  "on whatever map file the club has" (R/docs/design/stories.md, People).
  Only Liisa's slice (P0) is built. Kalle's training work (score courses,
  corridors, whiteout: S10) is P1 and not built.

Gaps:

- **The differentiator was never formally chosen.** "What this app should
  do better than that beta [Purple Pen 4] is still unanswered. Candidates
  named in the research, not chosen: the way courses are drawn and edited,
  the training-map workflow, or the handoff into a Finnish race weekend"
  (R/docs/research/2026-10-18-course-setting.md, intro). The 10-21 spec in
  practice picked the first: drawing and editing. Training maps are P1.
  There is no story for the Finnish race-weekend handoff.
- **No problem in the user's words.** R/docs/design/brief.md, model.md,
  voice.md, opportunity-tree.md and termbase.tsv are all empty kit
  templates. The docs record no motivating moment, success measure, outcome
  or user quote.
- No first users, beta audience or must-not-promise list is documented (see
  §9).

## 2. How setters work today, and the pains

What an event produces: a course map at print scale with purple that must
not hide black, brown or blue; a control-description sheet in IOF 2024
symbols; an all-controls map for hanging the flags; IOF XML CourseData (v3,
sometimes v2) for MeOS, SportSoftware, Emit or SPORTident; and the length,
plus a climb the setter types (R/docs/research/2026-10-18-course-setting.md,
"What an event produces").

| Tool | What it is good at | Concrete pains (source) |
|---|---|---|
| **Purple Pen** (free; v3 Windows, v4 beta also on macOS 14+ Apple silicon) | "De facto club standard", "simplest interface". Takes a PDF or bitmap when there is no OCAD file, so clubs use it for trainings. Shared controls, live descriptions, IOF XML 2 and 3, relay variations. | "Crude" (Attackpoint message_1153285). Add Control "will jump to the existing control if you are close" (DVO planners' guide): reuse happens silently by snapping. Other controls show in light purple only while Add Control is on. Moving a shared control opens a three-way dialog. v4: "the interface is deliberately the old one", no direct printing yet, Intel Macs left out, "a Windows program brought across, not a Mac app". (course-setting.md, "The tools people use now"; 2026-10-21-course-building-interaction.md §1) |
| **OCAD Course Setting** (professional, Windows) | Puts the purple under black, brown and blue so the map stays readable: "Big events still finish in OCAD for that last reason." Climb from a terrain model. Relays. | Removing a control from a course is "scary" because Delete can remove it from every course. Adding an existing control by double-click "can move the control". Insert mode starts by moving the pointer into and out of a circle, a hidden mode. (course-building §1) |
| **Condes** (Windows) | Relays: Farsta, leg and coupled forks, fairness. IOF XML both ways. Deleting a used control lists the affected courses. | Modes exist "to facilitate editing without accidentally selecting and moving the wrong type of object". "Less intuitive" than Purple Pen (Attackpoint message_262755). (course-building §1) |
| **xcorso** (browser) | A modern core: PDF, OCAD, IOF XML 3. | Course mode can't create a control. Controls only go before the finish, with no insert on a leg. Only its author has used it at real events. (course-building §1) |
| **Paper** | UNKNOWN | The docs don't describe setting on paper. |

Pains shared by every tool: "Delete silently removing a control from every
course; hidden modes; double-click adding that moves the control; 'less
intuitive' or 'confusing' first use; near-duplicate controls"
(course-building §1, "Complaints across tools").

**On a Mac:** "For years the Mac answer was to run Purple Pen or Condes in
Windows" (course-setting.md, Purple Pen paragraph). "Windows-only (Mac users
ran Parallels, VMware or Wine)" (course-building §1). Attackpoint threads on
Boot Camp and Condes are cited (course-setting.md, Sources). Purple Pen 4
removes the VM, but on Apple silicon only, with the Windows interface
and no direct printing (course-setting.md).

## 3. What Ratametsuri does better

Measured against Purple Pen, which every Finnish club setter knows. Each
difference names what it replaces, its evidence and its status.

### Built and working (merged with tests; not yet accepted by Jarkko, #19)

**D1. Every click on the map says what it will do before you click.** With
the Control tool on, the pointer shows the outcome first:

- Over empty map: a ghost ring with the code it will get ("35").
- Over a control from another course: "Add 31 as 4" / "Lisää 31 rastiksi 4".
- Over a leg: "Insert between 2 and 3" / "Lisää rastien 2 ja 3 väliin".
- Over a control already on this course: "32 is already 2 · ⌥-click to
  visit again". A plain click only selects it, so a near miss can't add a
  control twice.

The window subtitle names the mode ("Adding controls · Esc to stop" /
"Lisätään rasteja · Esc lopettaa"). One function decides both the preview
and the click.

- Replaces: Purple Pen's silent snap to a nearby control, OCAD's
  double-click that can move the control, and hidden modes. Near-duplicate
  controls are a complaint across tools (course-building §1).
- Evidence: R/macos/RatametsuriCore/Sources/RatametsuriCore/CourseInteraction.swift
  (`label(_:language:in:)`, shown by MapCanvas.swift:156); spec 2026-10-21
  "Cursor and preview (feedforward)"; #21, #22 closed; #42 (preview no
  longer hides the target) closed.

**D2. Taking a control off one course never deletes it from the others.**
⌫ removes the visit, with no dialog, and Undo brings it back. The control
stays in the event under "Other controls". Deleting from the event is a
separate command (⌘⌫). If other courses use the control, the alert names
them ("It will also be removed from these courses: …").

- Replaces: OCAD's "scary" Delete, and the "Delete silently removing a
  control from every course" complaint (course-building §1). Purple Pen and
  Condes already keep the two apart, so against them the gain is smaller:
  no question for an ordinary removal, and Undo instead.
- Evidence: spec 2026-10-21 "The visit list" 4 and "The controls list" 3;
  Localizable.xcstrings ("Remove from Course", "Delete Control from
  Event…"); #23 closed.

**D3. The map stays readable under the course.** On a forest map, the
map's black, brown and full blue are drawn back over the purple, as OCAD
does. This works on a PDF or a scan, both on screen and in the exported
PDF. Circle and leg gaps follow a control onto every course. A control
number moved off a path on one course stays where it was on the others.

- Replaces: plain purple drawn on top of a PDF, the reason "big events
  still finish in OCAD" (course-setting.md, OCAD paragraph and "The course,
  as data").
- Evidence: R/.../RatametsuriCore/MapDetail.swift (header comment);
  CoursePDF.swift:34-36; MapCanvas.swift drawCourse; #47 closed ("Manual
  number layout belongs to each course's layout context"); S4 (#4) closed.
- **Limit, in the code's own words:** the colours are sorted "by their RGB
  values alone… It is not separated-colour printing… the result needs a
  person's review on the real map." Forest only. **UNKNOWN:** whether
  Purple Pen 4 does anything similar, so don't write it as a comparison.

**D4. A Mac document window in Finnish.** Sidebar, inspector, toolbar tools
with S/C/F keys and Esc, arrow-key nudge (1 mm, Shift 0.1 mm), named Undo
and Redo, events as Mac documents with Versions, and a Finnish interface
that uses the SSL terms (Rastinmääritteet, Rastipisteen kohde).

- Replaces: Windows in Parallels or Boot Camp, and Purple Pen 4's Windows
  interface on a Mac (§2).
- Evidence: S8 (#8) closed; spec 2026-10-21 "Toolbar and tools" and
  "Undo"; Localizable.xcstrings (fi); R/macos/Ratametsuri/project.yml
  (macOS 14.0).
- **Limits:** trackpad pinch zoom and visible zoom controls are still open
  (#43; ⌘+ and ⌘− work). Opening an online-only Dropbox PDF fails (#17).
  Saving, closing and reopening crashed once (#80). Intel is UNKNOWN.

Smaller things that are built. Each helps but doesn't carry the page:

- The course length updates as you build, before there is a finish (#44).
- You can edit a control code, and the change follows to every course (#46).
- Drag to reorder, drag in from Other controls, and drop a control on a
  visit to replace it (#23, #45).
- A taped finish is drawn as a path with bend points, and its length counts
  along the route (S5, #5).
- The description sheet goes onto the map by itself and gains a column when
  it would run off the page (S6, #6, #24).
- Export is refused with a reason while a course is unfinished
  (ExportGate.swift; strings "The course is not finished.").
- Length is rounded to 0.1 km and climb to 5 m, as the IOF heading rules
  say (S5, #5; #13 note 4132751349: "climbs 87/63 m; PDFs print rounded
  85/65 m").

Table stakes (every tool has these, so they are no difference): shared
controls, a live description sheet, a map from a PDF or a bitmap, a course
PDF and IOF XML 3.0.

### Planned, not built (stays off the page)

OCAD and OpenOrienteering Mapper maps (S9, #9; waits on a licence
decision). Score courses, corridors and whiteout (S10). Several starts or
finishes (S13). Relays and fork fairness (S11). Map exchange. Reading the
feature under the ring (S12). The rest of the description catalogue, C to H
(#2: "The remaining D/E and wider C–H catalog references … still need
evidence"). Loose description sheets and an all-controls print (S4, S6).

## 4. The setter's workflow, map to printed courses and IOF XML

| Step | In Ratametsuri today | Saves time or prevents an error |
|---|---|---|
| 1. Get the map | New Event (name and place first), then Open Map: a PDF's first page, or a PNG/JPEG/TIFF plus its paper width. 1:10 000 forest by default. The map bytes are copied into the event package and the original file is left alone (S1, #1; lifecycle spec). | Prevents: exports from a bitmap with no scale are refused (S1). |
| 2. Place the course | S, then C (stays on), then F. Every click previewed (D1). Insert on a leg. ⌥-click for a deliberate repeat visit. | **Prevents** wrong reuse, double adds and lost insert positions (D1). Length shown while building (#44). |
| 3. Next courses | New Course, then click existing controls or drag them in from Other controls. Remove a visit with ⌫ (D2). | **Prevents** deleting a control from other courses (D2). Moving a shared control moves it everywhere (S3). |
| 4. Descriptions | Live sheet. Columns C (partly), D (landforms, cliff, boulder) and F (height) can be edited. **E is read-only. G and H can't be edited.** | Partial. A real event needs column G on most controls, so **a full sheet can't be made yet.** |
| 5. Readability | Black, brown and blue over the purple on forest maps (D3). Gaps; numbers dragged per course; numbers sized to ISOM 704. | **Prevents** purple hiding detail on a PDF map. Human review still needed (MapDetail.swift). |
| 6. Length and climb | Straight-line length, a taped finish counted along its route, climb typed and rounded (S5). | Saves adding up legs by hand. |
| 7. Print | Export PDF: **one course per file**, one page, map plus purple plus sheet on the map. No direct printing, no all-courses PDF, no all-controls print (S6 out of scope; CoursePDF.swift). | Export refused with a reason while a course is unfinished. |
| 8. Timing system | Export IOF XML 3.0 CourseData: codes, order, length, climb, positions in paper millimetres, no latitude or longitude (S6). MeOS 5.0 imported both test courses with no warnings (#13 note 4132751349). | Other timing systems are untested: UNKNOWN. |
| 9. Hang the flags | All-controls is a view in the window, with no export (S4). | Gap: the all-controls map can't be printed yet. |

No time saving has been measured anywhere. Don't put numbers on it.

## 5. Proof and demo candidates

All from the real app on the Kauppi map (approved in brief.md), Finnish UI,
no mock-ups.

| Difference | 3–6 s loop or still | Why a setter believes it |
|---|---|---|
| D1 Click preview | **Loop (5 s):** Control tool on; the pointer glides over empty map (ghost ring "36"), then onto a leg ("Lisää rastien 2 ja 3 väliin"), then onto another course's control ("Lisää 31 rastiksi 4"); click; the visit list and the numbers update. Subtitle "Lisätään rasteja · Esc lopettaa" visible. | They see the outcome before the click. That is exactly what Purple Pen's snapping hides. |
| D2 Safe remove | **Loop (4 s):** visit 32 selected in the list; ⌫; 32 leaves the course and shows under "Muut rastit"; ⌘Z puts it back. **Or still:** the delete alert naming "Rata 2". | A setter who has lost a control from every course in OCAD sees at once that it can't happen here. |
| D3 Readable map | **Still, 2x crop:** a control circle on a cliff or boulder with the black over the purple, a gap opened for a path, a number moved clear. Taken from the exported PDF at 100%, not the screen. | Experts check exactly this on a printed map. Check it on Kauppi first: the code warns that the colour sort is approximate. |
| D4 Mac window | **Still (hero):** the full window, sidebar with "Radat" and "Radan rastit", map, sheet on the map, Finnish toolbar, system light or dark. | No Windows chrome. Finnish words they already use. |

Known risks to the shoot: pinch zoom (#43). Use ⌘+ or Fit Map. Kauppi must
be a local file, not an online-only Dropbox one (#17).

## 6. The setters' words (fi / en) and app terms that differ

| Concept | Setters, fi | Setters, en | App, fi (Localizable.xcstrings) | Note |
|---|---|---|---|---|
| person | ratamestari | course setter (UK: planner; "Purple Pen for Planners", DVO) | n/a | landing termbase: ratamestari |
| course | rata | course | Rata | |
| class | sarja | class | n/a | spec 2026-10-21 "categories (sarjat)"; not built |
| control | rasti | control | Rasti | |
| control code | koodi, rastikoodi | control code | Koodi; "Vaihda rastikoodi" | |
| visit number | UNKNOWN (rastin järjestysnumero?) | control number | "rastiksi 5"; list heading "Radan rastit" | ask the Finnish writer to check |
| start (triangle, 701) | K-piste, kolmiopiste; *lähtö* is where timing starts (SSL 11.33, 11.34) | start | Lähtö | **The app's "Lähtö" places the triangle, which SSL calls the K-piste.** Fine for an ordinary club event; note it for the copy. |
| finish | maali | finish | Maali (code M1) | |
| leg | rastiväli | leg | n/a | copy2 course_words |
| control descriptions | **rastinmääritteet** (SSL, with n) | control descriptions | Rastinmääritteet | copy2 and copy3 spell it "rastimääritteet": wrong |
| control feature (column D) | rastipisteen kohde | control feature | Rastipisteen kohde | |
| gap | UNKNOWN | gap | katko ("Lisää katko") | |
| insertion point | n/a | insertion point | Lisäyskohta | app concept |
| all controls | kaikki rastit | all controls | Rastit / Muut rastit | |
| taped finish | UNKNOWN (viitoitus?) | taped route | "Suunnista maaliin" (navigate) | |
| overprint purple | UNKNOWN | overprint / course purple | n/a | |
| results software | tulospalveluohjelmisto | results software | n/a | landing termbase (Jarkko) |
| event | kilpailu / tapahtuma | event | Tapahtuma | |

## 7. App state and the page's must-not-say list

**State:** version 0.1, build 1, not released. Ad-hoc signed and not
notarized: Gatekeeper needs right-click › Open, or Privacy & Security on
macOS 15 and later. Only an arm64 build has been made. macOS 14.0 is the
deployment target (project.yml). Jarkko's walkthrough is pending (#19,
#25). Open P0 bugs: #80 crash after save, close and reopen; #43 pinch zoom;
#17 online-only Dropbox PDF.

**Do not say or imply:**

1. Stable, reliable, safe for your files, or "never lose work" (#80;
   autosave works, but the crash is open).
2. Notarized, from the App Store, or "just download and open". TestFlight
   (brief D26) needs App Store signing, which doesn't exist yet
   (fact log, Beta distribution).
3. Windows, iPad or Intel Macs (Intel is UNKNOWN).
4. Full or complete IOF 2024 control descriptions. The catalogue is partial
   and G and H can't be edited. "IOF 2024 symbols" is true only for what is
   in it.
5. OCAD or OMAP maps, a multi-page PDF, choosing the PDF page, Dropbox or
   iCloud maps (#17), or georeferencing.
6. Relays, butterflies, score courses, corridors, several starts, map
   exchange. The model allows repeat visits, but there is no butterfly
   workflow.
7. "Prints all your courses" or "every course on its own page" in one file:
   it is one PDF per course. No direct printing, and no all-controls or
   loose-sheet print.
8. Compatible with SportSoftware, Emit or SPORTident, or IOF XML 2. Only
   MeOS 5.0 has been tried, once.
9. Climb computed (it is typed). Sprint as a feature: lower purple is
   forest only, and sprint support hasn't been checked.
10. Any comparison claim not in §3 ("better than OCAD", "faster than Purple
    Pen"), and any time saving.
11. Price, licence, date, user counts, testimonials (brief, Non-goals).

## 8. Draft message hierarchy (English, for the Finnish writer)

**Positioning (one line):** A Mac app for setting club courses on your own
PDF or scanned map, where every click on the map shows what it will do
before you make it. It works the way you set courses in Purple Pen, in a
real Mac window.

*Eye-roll check:* "plan courses on your Mac" alone (copy2) tells a setter
nothing new. The preview clause is the news. The Purple Pen clause stays
only if Jarkko agrees to name it (Q4).

**Supporting points, ranked:**

1. **You see the result of a click before you make it.** The pointer shows
   the new control's code, or "add 31 as control 4", or "insert between 2
   and 3". A near miss on a control that is already on the course selects
   it. It doesn't add it again. *(D1. Evidence: CourseInteraction.swift,
   spec 10-21, #22.)* Eye-roll? No. Purple Pen snaps silently and OCAD's
   double-click can move the control. A setter learns something.
2. **Removing a control from one course can't delete it from the others.**
   Removing takes one key and Undo brings it back. Deleting from the event
   is a separate command that names the courses it affects. *(D2. Spec
   10-21, #23.)* Eye-roll? Low for OCAD users. Purple Pen users already
   have the split, so this is #2, not #1.
3. **The map's detail stays on top of the purple, even on a PDF map.**
   Black, brown and blue are drawn over the course on screen and in the
   print. Gaps and number positions are per course where it matters.
   *(D3. MapDetail.swift, #47.)* Eye-roll? No: it is why setters go back to
   OCAD. **Only after checking it on the Kauppi map and Jarkko's OK (Q5)**,
   because the code calls it an approximation.
4. **A Mac app in Finnish, not a Windows program on a Mac.** Native window,
   keyboard tools, Undo, macOS 14, the SSL terms. *(D4. S8, xcstrings,
   project.yml.)* Eye-roll? Low for Mac users who ran Windows or a VM. But
   Purple Pen 4 now runs on Apple silicon, so "it runs on a Mac" alone is no
   longer news. "Mac-made and in Finnish" is.

Handoff and requirement lines, not benefits: course PDF at print scale with
the sheet on the map; IOF XML 3.0 (MeOS tested); maps from PDF, PNG, JPEG
or TIFF; macOS 14; Finnish and English.

## 9. Questions for Jarkko

Ordered by how much the answer changes the page. Each can be answered in a
sentence.

1. What made you start building Ratametsuri: what went wrong in Purple Pen,
   OCAD, Condes or Windows on your Mac?
2. Have you set a real course or event with it yet? If so, what was better
   than your old tool?
3. Who is the beta for: Finnish club ratamestarit, coaches, setters abroad,
   and roughly how many?
4. Can the page name Purple Pen (or OCAD) as the comparison, or should it
   stay unnamed?
5. Can the page say the map's black, brown and blue stay on top of the
   purple, given the code calls the colour sort an approximation?
6. How will testers install it: TestFlight (needs App Store signing) or a
   downloaded build with the right-click › Open step?
7. Should the page wait until your walkthrough (#19) and the save crash
   (#80) are done, or go up now?
8. Is there anything else it must never promise, beyond the list in §7?

## 10. copy2 features against this

| copy2 item | Verdict | Why |
|---|---|---|
| headline "Suunnittele suunnistusradat Macilla" | **Reframe** | Says what, not why it is better. Carry the D1 news (see positioning). |
| features_heading "Tämä toimii jo" | **Reframe** | The honesty is right. Head benefits, not an inventory. |
| Kartta (PDF/PNG/JPEG/TIFF + scale) | **Drop as a feature, keep as a requirement line** | Table stakes. Purple Pen does the same. Also a PDF needs no scale typed; a bitmap needs its paper width. |
| Yhteiset rastit | **Drop** | The line Jarkko rolled his eyes at. Every tool has it. D2 (safe remove) is the expert-level version. |
| Rastimääritteet (IOF 2024, live) | **Drop as a point, fix the facts** | Wrong spelling (rastinmääritteet). The catalogue is partial (G and H can't be edited). A live sheet is table stakes. |
| PDF ja IOF XML | **Reframe into a handoff line** | Wrong as written: one PDF per course, not "jokainen rata omalle sivulleen" in one file. Say IOF XML 3.0, MeOS tested. Not a benefit. |
| requirements.mac | **Keep** | True: macOS 14 (project.yml). Don't add "Apple silicon" or "Intel". |
| requirements.languages | **Keep, fold into D4** | The Finnish UI with SSL terms is part of the Mac point. |
| status | **Keep, extend after Q6 and Q7** | Add the install step if the build stays ad-hoc signed. |
| beta block (field, states, privacy) | **Keep** | Out of this note's scope. "Kutsu tulee sähköpostiin" depends on Q6. |
| screenshot_alt | **Reframe** | Rewrite for the chosen D4 hero or D1 loop. |
| course_words.control_description "rastimäärite" | **Fix** | rastinmäärite. |

`copy3.json` (untracked, in progress) keeps the same four features and the
"rastimääritteet" spelling, so the same verdicts apply to it.

## Update 2026-11-21: Jarkko's main point (relayed by the Ratametsuri session)

Jarkko's main point, in his own words: "building a truly native app that's still compatible with all the other tools in the pipeline". The Ratametsuri session's phrasing for the questionnaire: a real Mac program, not a Windows program in a virtual machine, that still fits the same chain as the other tools, with courses going on in IOF XML to results services and other programs as they do now.

This replaces the draft positioning in section 8 as the lead. The page leads with native Mac + compatible with the pipeline (IOF XML 3.0 out to the results software). The click-preview, safe removal and map-on-top points become supporting proof of "truly native", each still subject to its evidence check. Question 1 for Jarkko is now partly answered; still ask what situation made him start.

## Decisions on questions 3–7 (2026-11-23, Jarkko via launchpad: "decide what you can", the recommendations stand)

- 3: the beta is for club course setters with a Mac, 10–20 at first; the page does not promise everyone an invite.
- 4: the page names Purple Pen, factually.
- 5: no claim that black, brown and blue map detail stays on top of the purple.
- 6: the page goes live without waiting for the walkthrough or #80, and says the app is in development.
- 7: must not promise: release dates, Windows or iPad, price, full IOF 2024 descriptions (columns G–H not done), OCAD import.

Questions 1 (why he started) and 2 (real-course use) are still with Jarkko; the copy keeps placeholders for those two lines.

## Questions 1–2 (2026-11-23): already answered by Jarkko; do not ask again

- 1, why he started: the course-setter spec's intent: the same job in a real Mac window, not a Windows program driven with a trackpad; every click previewed before it happens; plus his own words "a truly native app that's still compatible with all the other tools in the pipeline".
- 2, real use: his own trial on 2026-10-21 (ratametsuri #19). No "tested at real events" claim.
