# Ratametsuri copy, round 2: notes

Written Finnish first from `docs/design/content/ratametsuri.md`, the brief and
the termbase; the earlier `copy.json` was not opened. English was written
afterwards from the meaning of the finished Finnish.

## Finnish choices weighed

- Headline "Suunnittele suunnistusradat Macilla": an imperative with a verb reads as Finnish; rejected the noun stacks "Mac-ohjelma suunnistusratojen suunnitteluun" and "Suunnistusratojen suunnitteluohjelma Macille" (the "X-sovellus Z:aan" pattern). The suunn-/suunn- sound is audible but natural; fallback if Jarkko dislikes it: "Tee suunnistusradat Macilla".
- Features in second-person indicative ("Avaat…", "Kun siirrät…", "viet…"): this is how Finnish describes what you do in a program; it avoids both the passive and an English-style "Kartaksi kelpaa…" opening.
- Feature 1 "kerrot sen mittakaavan": the fact is that the setter types the print scale; "kerrot" is plainer than "syötät" or "annat".
- Feature 2 "kaikilla radoilla, joilla se on": shorter and more spoken than "jotka käyttävät sitä", and keeps the same "rasti" subject.
- Feature 3 made Ratametsuri the actor ("piirtää … ja päivittää ne aina, kun muokkaat rataa"); dropped "sitä mukaa kuin" because it needs a comma that looks wrong in any position.
- Feature 4 split into two sentences (PDF, then XML) instead of one "saat X:n ja Y:n" list; "viet" says what the setter does with the file. The PDF detail (one course per page with its descriptions) is in the fact log.
- "Tämä toimii jo" as features heading: honest about a 0.1 app without saying "ominaisuudet"; set it to null if the design reads without it.
- Status "Betaan pääsee mukaan kutsulla": rejected "yksityinen beta" (calque) and "suljettu beta" (gaming jargon).
- "kun beta alkaa" everywhere instead of "aukeaa": more natural with "beta" in Finnish, and used the same way in the lead and both success states.
- privacy_line "Käytämme osoitetta vain betakutsuun.": short and in the "me" voice. It doesn't mention the double-opt-in confirmation email, which the success_confirm state explains.
- not_live is written as the normal way to ask ("Otamme pyynnöt toistaiseksi vastaan sähköpostilla"), with no apology; "aiheella" matches the "Aihe" field in Finnish mail clients.
- maker_line kept as "Ratametsuri on Koivupiilo Oy:n tuote": idiomatic and it matches D24's maker line; split into text, business ID and link text so the separators stay in the markup.
- course_words: "rastikoodi" (also just "koodi" on maps); "rastiväli" for leg.

## Skills, in order

1. suomen-kieli (the Finnish was drafted under it), plus otsikointi for the headline
2. stop-slop over the Finnish (made Ratametsuri the actor in feature 3; kept Finnish-natural intransitives like "siirtyy", which suomen-kieli outranks)
3. read-aloud pass as a setter: fixed the "sitä mukaa kuin" comma; checked the termbase and that the copy has no "!" and no "minä"
suomi-finnish was not needed: no spelling question came up that suomen-kieli's norms didn't settle.

## Wanted to say, not supported

- Light and dark appearance: it is in the fact log but left out as page noise; it can be added to requirements.
- Event file save and reopen, undo and redo, typed climb, leg gaps: built, but left out to keep the four items.
- Anything about who gets the beta, how many, or when: UNKNOWN.
- TestFlight (D26): not named. The page only promises an email, and TestFlight needs no explaining before the invite.
- Map credit: the map is now one of Tampereen Pyrintö's (which one is unknown), so the alt text names no map and `map_credit` is "Kartta: %{credit}" / "Map: %{credit}".
