# W0 on the Ratametsuri product page, head ceb724b (independent review, term_91722319)

Steps for `.ds/reviews/steps/W0.md`; kept here because this review commits only its verdict and evidence.

1. Build with `BRIDGETOWN_ENV=production bundle exec rake deploy`; serve a copy of `output/` locally, every other origin blocked or stubbed.
2. Open `/ratametsuri/` (fi-FI) and `/en/ratametsuri/` (en-GB) at 390×844 and 1440×900, system light and dark; read the status pill “kehitteillä” / “in development”, the tagline “Kotonaan Macissa. / Kotonaan suunnistuksen sovellusekosysteemissä.” / “At home on the Mac. / At home in orienteering's software ecosystem.”, the line under it, the map, “Mitä tarvitset” / “What you need”, “Yksityinen beta” / “Private beta”.
3. Repeat at 320, 768, 1024, 1280, 1728, 1920 and 2560 px wide; measure horizontal overflow and the width of each tagline line against its box.
4. Repeat at 390 and 320 px with Chrome's default text size at 32 px, and at 1920/2048 px with 24/32 px.
5. Repeat at 1440×900 with page zoom 110, 125, 150, 175 and 200 %.
6. Read which map file each width and pixel density loads (`currentSrc`) and compare its pixel width with the slot in device pixels.
7. Press Tab from the top: “Siirry sisältöön” / “Skip to content”, “In English” / “Suomeksi”, “Hae betaan” / “Apply for the beta”, “Tietosuoja” / “Privacy”.
8. With “Hae betaan” / “Apply for the beta” focused, press Enter; capture before, about 300 ms and after. The request to join.koivupiilo.fi was answered by a local stub, so launchpad was never contacted and nothing was entered.
9. Separately, a plain GET of both survey URLs confirms each answers 200 with `<html lang="fi">` “Kysely ratamestareille” and `<html lang="en">` “Survey for course setters”.

Not done: a screen reader, real iOS/Android text scaling, hardware. The beta survey itself was not walked (it is launchpad's, out of this diff).
