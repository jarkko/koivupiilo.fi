# Ratametsuri product page: references (the bar)

Step 3 of the design process. Written 2026-11-21. It compares pages doing
the same job as ours, not pages with the same look. Jobs J1 to J3 come from
`brief.md`. Facts about the app come from `../content/ratametsuri.md`.

**How to mark favourites:** put a star or a short note in the `Jarkko ★`
column of any row. Rows without a mark are not rejected; they are just not
yet chosen. Pick the rows whose mechanic you want the directions to use.

**Sources and rules.**

- Library entries are linked by file and heading. They were captured
  2026-10-31 (library README) and are third-party work: private reference
  only, never shipped.
- Fresh captures were made 2026-11-21 with Chrome, light scheme, 1440x900
  and 390x844, viewport only, JPEG q70, in `refs/`. Cookie notices were
  left alone, except that the script tries to dismiss them. No form was
  submitted and nobody was logged in. The `refs/` folder is gitignored (third-party screenshots stay out of the public repo); it lives in the working copy on this Mac.
- Outside the library there are two pages: Apple Final Cut Pro (J1) and Dave
  Cleaner beta test (J3). The library has no beta-waitlist page.
- Every claim below is visible in a shot or quoted from the page or its
  library entry. Where a mechanic is not visible in a shot, the row says so.
- Library paths are under
  `/Users/jarkko/code/metamorphosis/kit/references/awards/`; shots there are
  `.webp` in `shots/ios-app-landing/`.
- **Gap:** no page here shows its error or success state, because we may
  not submit a form. The directions must design those states themselves.

## J1 Proof on a real screen

The app window leads, and the visitor sees the domain (a map, a course).

| Reference | Mechanic | Steal / reject | Ours must beat X at Y | Jarkko ★ |
|---|---|---|---|---|
| **Apple Final Cut Pro**, https://www.apple.com/final-cut-pro/, captured 2026-11-21. Shots: `refs/final-cut-pro-1440.jpg`, `refs/final-cut-pro-390.jpg` | The first screen is the product on screen: a Mac display and an iPad, both showing a timeline with real footage. Below it: app icon, name, headline "Reel intelligence." and one paragraph. The window takes the top 60% of the viewport; the words come after. | **Steal:** the window is the hero and the domain content (footage, not a gradient) fills it. Order is picture, name, one line. **Reject:** the global Apple nav bar above it, and a headline that says nothing about the job. | Ours must beat Final Cut Pro at **showing the domain in the window**: its footage is a stock clip and could be any video; ours is a named Finnish map with a purple course and its description sheet, which only a setter reads at a glance. | |
| **Flighty**, [ios-app-landing.md#flighty](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shots `shots/ios-app-landing/flighty-desktop.webp`, `flighty-phone.webp` | Per the entry: a real hand holds an iPhone showing the map; notification cards float around it and "the notification cards are the copy" ("Mom landed in New York 6:32am (22m early)"). | **Steal:** the app's own output as the supporting copy. For us: a real control description line or a leg length, not a feature list. **Reject:** floating cards, a cookie card over the first screen, LCP 10.4 s. | Ours must beat Flighty at **load time**: it measures LCP 10.4 s and 3.2 MB (entry); our window shot must paint in under 2.5 s on a phone. | |
| **Mela**, [ios-app-landing.md#mela](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shot `shots/ios-app-landing/mela-desktop.webp` | A recipe page is shown in a plain window frame with a real photo, but only after the fold, under a yellow band, store badges and an award ribbon (visible in the shot). | **Steal:** plain window frame with no device bezel; one sentence says what it is. **Reject:** the app screen below the fold; unsized images (CLS 0.160 in the entry). | Ours must beat Mela at **where the window sits**: Mela's first screen has no app screen; ours must show the window above the fold at 1440 and 390. | |

## J2 Trust before the ask

System requirements, status and maker are shown near the action.

| Reference | Mechanic | Steal / reject | Ours must beat X at Y | Jarkko ★ |
|---|---|---|---|---|
| **CoolDock**, [ios-app-landing.md#cooldock](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shots `shots/ios-app-landing/cooldock-desktop.webp`, `cooldock-phone.webp` | One black button "Get CoolDock for your Mac"; under it a row of four facts, the last "macOS Sonoma 14.0 or later". In both shots the row is small and low contrast, and on the phone it sits over a photo. | **Steal:** the requirement is one line directly under the button, same width as the button. **Reject:** low-contrast grey on a photographic background; the line is hard to read in the shot. | Ours must beat CoolDock at **legibility of the requirement**: ours needs the macOS 14 requirement in body-size text with contrast of at least 4.5:1, not a footnote. | |
| **Supaste**, [ios-app-landing.md#supaste](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shot `shots/ios-app-landing/supaste-phone.webp` | Same trust row under "Download for macOS". In the phone shot the row is cut off at both edges ("ime purchase", "macOS Sonoma"), and a side tab covers part of it. | **Steal:** the row sits right under the button. **Reject:** letting the requirement clip on a phone; the "5 spots left" scarcity (entry). | Ours must beat Supaste at **the requirement on a 390 px phone**: it must wrap, never clip. | |
| **Wispr Flow**, [ios-app-landing.md#wispr-flow](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shot `shots/ios-app-landing/wispr-flow-desktop.webp` | Button reads "Get started on macOS" and names the platform; below it, "Available on Mac, Windows, iPhone, and Android". | **Steal:** the button names the Mac, so a Windows visitor leaves early. **Reject:** the list of other platforms; ours is Mac only and must say so plainly. | Ours must beat Wispr Flow at **honesty about what is not there**: we write "Mac only. Windows, iPhone: not planned" style facts from the fact log, with no claim we cannot back. | |

## J3 One-field request

A beta field, its states and its privacy line.

| Reference | Mechanic | Steal / reject | Ours must beat X at Y | Jarkko ★ |
|---|---|---|---|---|
| **Dave Cleaner beta test**, https://getlaunchlist.com/pages/maccleaner-beta-test, captured 2026-11-21. Shots: `refs/dave-cleaner-1440.jpg`, `refs/dave-cleaner-390.jpg` | A native Mac app beta. Headline, one line, a "Join the Waitlist" button; then a second block "Join Beta Waitlist" with one field, placeholder "Enter your email", and a full-width "Sign Up" button. | **Steal:** one field, one button, nothing else asked. **Reject:** the button that scrolls to a form that repeats it; the generic "Sign Up" label; no privacy line, no Mac requirement and no maker in the shot. States not captured. | Ours must beat Dave Cleaner at **what the visitor knows when they press the button**: our field says what the address is used for, which Mac it needs and who sends the invite, within the same block. | |
| **Mela**, [ios-app-landing.md#mela](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md) (privacy line only) | Per the entry, privacy is one sentence: "Mela does not collect any data." | **Steal:** one plain sentence, no policy link needed to understand it. **Reject:** it is not near an input; for us the sentence must sit under the field. | Ours must beat Mela at **placing the privacy line**: Mela's sits in the body; ours is the line under the field, naming what we do keep (the address) and for how long. | |
| **CleanShot X**, [ios-app-landing.md#cleanshot-x](/Users/jarkko/code/metamorphosis/kit/references/awards/ios-app-landing.md), shot `shots/ios-app-landing/cleanshot-x-desktop.webp` | Under the buttons "Get CleanShot for Mac" and "How it works" sits one line, "30-Day Money-Back Guarantee", with an arrow. | **Steal:** the reassurance is a single line directly under the action. **Reject:** a guarantee has nothing to match in a free beta; do not invent one. | Ours must beat CleanShot at **the line under the action telling the truth about the risk**: ours says it is a 0.1 beta that can break, and files may need saving by hand. | |

## Category baseline: course-setting tools today

These set the default to beat. They are not models. Captured 2026-11-21;
shots in `refs/`.

| Reference | What the first screen shows | Steal / reject | Ours must beat X at Y | Jarkko ★ |
|---|---|---|---|---|
| **Purple Pen**, https://purplepen.golde.org/. `refs/purplepen-1440.jpg`, `refs/purplepen-390.jpg` | Purple background, a ten-item left menu, the name, "Simple, versatile, and free course setting software for orienteering", a Microsoft Store badge, "Direct download", "Learn more". Text: "Purple Pen version 3 is a Windows-only application. Purple Pen 4 runs on Windows, Mac, or Linux natively, without emulation." No app window in the shot. | **Steal:** the purple, which every setter knows. **Reject:** no picture of the app; a menu longer than the page; requirements as a grey paragraph under the buttons. | Ours must beat Purple Pen at **showing the product**: its first screen has no screenshot, ours is mostly screenshot. | |
| **Condes**, https://www.condes.net/. `refs/condes-1440.jpg`, `refs/condes-390.jpg` | Logo, a row of eight links, a forest photo, a boxed "Download Condes 10" and "Ordering Information". Headline "EASY TO USE COURSE PLANNING SOFTWARE FOR ORIENTEERING". The app window is a small image at the fold and is cut off. A cookie bar covers the foot. | **Steal:** the app window is shown at all, with a menu bar and a map. **Reject:** a stock forest photo above it; a thumbnail too small to read. | Ours must beat Condes at **the size of the window**: the one it shows is about 640 px wide with text that cannot be read in the shot; ours is the largest thing on the page. | |
| **OCAD**, https://www.ocad.com/. `refs/ocad-1440.jpg`, `refs/ocad-390.jpg` | A laptop with a real orienteering map and, in front, a phone with a "Course Setting" screen and a purple control circle numbered 36. "Software for Cartography and Orienteering", buttons "Try for free" and "Discover the OCAD App". | **Steal:** a real map in a real window, in the hero, with the purple circle visible. It is the best of the three. **Reject:** the two-device collage where neither window can be read; "Try for free" with no word on what Mac or Windows it needs. | Ours must beat OCAD at **legibility**: its map is shrunk to about 590 px with a toolbar of tiny icons; ours is a window wide enough to read a control number and its description. | |

**What the whole category gets wrong:** it sells a download, not a look at
the work. Two of the three first screens show no readable course, none says
in the first screen what Mac it needs or what state the software is in, and
none has a request field for a person who is not ready to download today.

## What this means for the directions

1. **The window leads.** Put the real Ratametsuri window on Tampereen
   Pyrintö's Kauppi map above the fold at 1440 and at 390. Use a plain frame, no device bezel
   (Final Cut Pro, Mela). It must be larger than OCAD's laptop.
2. **Show the domain, not a stand-in.** A purple course with numbered controls
   and the description sheet beside it. A setter should name the map type and
   the course at a glance. No stock forest (Condes).
3. **Use the purple.** Purple Pen and OCAD both use overprint purple; it is
   the category's language, and Jarkko named it the page's natural accent.
   Use it with restraint, so that it still reads as the course colour of the
   screen.
4. **Requirement next to the action, in body text.** The Mac requirement
   (copy slot `requirements.mac`) visible near the field and before it in
   reading order, wrapping on 390 px, contrast at least 4.5:1 (CoolDock and
   Supaste fail one or both). Don't add "Apple silicon": Intel support is
   unknown (fact log).
5. **The copy is fixed.** Use `design/directions/ratametsuri/copy2.json`
   verbatim (Finnish written natively, English derived). Don't add button
   wording, "what is missing" lists or anything from the unknowns list.
6. **One field, one button, one privacy line, one status line.** Field,
   button, the privacy line, the status. Do not add a second form or a
   button that scrolls to the form (Dave Cleaner).
7. **Design the missing states.** No reference shows error, success, or
   "not live yet". Draw empty, typing, sending, sent, invalid and failed, and
   the mailto fallback for J4, before choosing a direction.
8. **Budget.** Library winners often fail the mobile bar (Flighty LCP 10.4 s,
   Mela 8.9 s). Ship the window as one sized, compressed image; no script is
   needed for it.
