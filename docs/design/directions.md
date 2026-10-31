# Visual directions: A / B / C (spike step 6)

Status: **awaiting Jarkko's choice.** Built 2026-10-31 on branch `design/spike`.

## How to look

```sh
node design/build.mjs
python3 -m http.server -d design/out 4788   # then open http://localhost:4788/
```

The board at `/` shows the three directions side by side. One selector switches all of them between the same page in FI or EN. Every page follows the system's light/dark setting and has no theme toggle. Each direction renders the same content (`design/content.mjs`, `design/case.mjs`) on four pages: front, services, the Magistician case, and contact.

Review evidence:

- `node design/shoot.mjs`: 96 shots (24 routes × 390/1440 px × light/dark). No horizontal overflow and no broken images.
- `node design/contrast.mjs`: every text/background token pair is ≥ 4.5:1 in both schemes.
- One fix round, then one confirm round:
  - Magistician thumbnail recropped.
  - B's bark texture replaced with photos.
  - C's "other work" rows restacked on phones.
  - B's services headings resized.
  - Phone screenshot capped.

## The choice

| | A · Hakemisto / Index | B · Koivu / Birch | C · Kenttä / Court |
|---|---|---|---|
| Feel | Quiet, cool neutrals, one ultramarine accent. Reads like a well-kept index of work. | Leaf-green field, a serif with personality, your own forest photos. Warm and particular to a Finnish one-person studio. | Court blue, ball yellow, condensed uppercase. Scoreboard tiles. Loud and sporty. |
| Type | Familjen Grotesk | Young Serif + Figtree | Big Shoulders Display + Archivo |
| Signature | Index rows with a sticky preview that swaps on hover | Contact page "letter": a pre-filled message you edit, then open in mail or copy | Products as scoreboard tiles; match-sheet strip on the case |
| Best at | Proof-first scanning (J1/J2), ages well | Being remembered; carries the name *Koivupiilo* | Volleyball audience (clubs, coaches) |
| Weak at | Could be anyone's studio; small type at desktop | Bold green field may split opinion; serif is one weight | Says "sports company" to an SME or agency buyer, which works against the studio-first framing (D1) |

**Recommendation: B.**

- It is the only direction where the name, the place and the person show up without being stated. The photos are yours, the leaf green comes from the name, and the letter-style contact page answers S-3 "What to write" directly.
- It keeps software and volleyball on equal footing, which C does not.
- Evidence grade: designer judgement plus the teardown (`docs/design/research/teardown-2026-10-31.md`). It has not been tested with real visitors.
- Counter-argument: A is the safer choice for agency and SME buyers who skim for credibility, and it will date the slowest.
- Reversibility: high. All three render the same content model, so switching direction later means swapping the CSS and templates, not rewriting copy.

Mixes are possible. For example, B's world could take A's index rows on the work list.

## Fonts and paid assets

All five fonts are OFL-1.1 and self-hosted, so the spike has no licence cost. **No purchase is proposed yet.** The one place a paid font would clearly help is B's serif: Young Serif has a single weight. Once a direction is chosen, I'll bring one bundled proposal covering:

- prices
- web/app scope
- seats
- perpetual vs. subscription
- the free fallback

## CONFIRM items for Jarkko

1. Contact address: `jarkko@jlaine.net`, or a new `@koivupiilo.fi` address (Fastmail MX already exists).
2. Reply-time promise: "within two working days".
3. Claims list in `brief.md` (what is kept and what is dropped).
4. Whether "official" may be used for the beach-rules translation.
5. Own-device camera list used for photo filtering (`design/assets/photos/PROVENANCE.md`).
6. Each photo (three, none showing people): OK to publish?
7. Renaming the current "personal development" offer to "Johtajuus ja tiimit / Leadership and teams" (`termbase.tsv`).
8. Story-map slice: A (four full product pages, recommended) or B (minimum).
9. The Fav column in `references.md`.
10. Product statuses as now shown:
    - Magistician and Kvitti: live, early days
    - Jumbo Volley: in development
    - Resultifi: live
    - BeachDesk: in development
