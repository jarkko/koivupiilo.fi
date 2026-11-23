# Provenance: Kauppi app screenshots

Real captures of the native Ratametsuri Mac app showing its own rendering of a
course on a real orienteering map. Nothing was drawn or composited in an image
editor. One capture per UI language and appearance: the Finnish files show the
Finnish UI, the English files the English UI.

Map: © Tampereen Pyrintö (Kauppi), used with Jarkko's approval (see Source map).

## Files

| File | What |
|---|---|
| `kauppi-{fi,en}-{light,dark}.png` | Window only, no shadow, 3000 x 1880 px (1500 x 940 pt at 2x). Masters, gitignored, not in the repo |
| `kauppi-{fi,en}-{light,dark}-shadow.png` | Same, with the system window shadow (transparent). Scratchpad only |
| `kauppi-{fi,en}-{light,dark}.webp` | Web versions, 2400 x 1504 px, quality 82 |

All four are the same event, course and view; only the UI language and the
appearance differ.

### On the page (`src/ratametsuri/`)

| File | Made from | Size |
|---|---|---|
| `screen-{fi,en}-{light,dark}.webp` | The 2400 px WebP above, unchanged (the whole window, inspector included) | 2400 x 1504 px |
| `phone-{fi,en}-{light,dark}.webp` | The PNG master, cropped 1200 x 705 px at x 900, y 1075 (`PHONE_CROP` in `../d/build.mjs`: x 0.30, y 0.572, w 0.40, h 0.375 of the master), `magick … -resize 1200x -strip -quality 82` | 1200 x 705 px |

The phone crop is map canvas only, so the four phone files come out
byte-identical: the app draws the map and course the same way in both languages
and appearances. They keep per-language names so that the layout picks every
image the same way, and a future reshoot can differ.

The desktop shot is not cropped. Cutting the inspector off the right edge would
cut through the window's toolbar and its right corners, and make the image 4:3,
which pushes the e-mail field below the fold at 1440 x 900.

## Capture (2026-11-23)

- Machine: a Mac with macOS 27.
- App: Ratametsuri commit `c3e951e` (main), Debug configuration
  (`xcodebuild -scheme Ratametsuri -configuration Debug`, own derived data folder).
- Each shot is a fresh launch (`open -n Ratametsuri.app --args …`) with the
  language, locale and appearance set as launch arguments for that launch only.
  No system setting was changed.

  | Shot | Launch arguments |
  |---|---|
  | `fi-light` | `-NSRequiresAquaSystemAppearance YES -AppleLanguages (fi) -AppleLocale fi_FI` |
  | `fi-dark` | `-AppleInterfaceStyle Dark -AppleLanguages (fi) -AppleLocale fi_FI` |
  | `en-light` | `-NSRequiresAquaSystemAppearance YES -AppleLanguages (en) -AppleLocale en_FI` |
  | `en-dark` | `-AppleInterfaceStyle Dark -AppleLanguages (en) -AppleLocale en_FI` |

- Window frame 1500 x 940 pt, set through the app's saved-frame default for the
  event, passed as a launch argument; zoom 146% from the app's Fit Map.
- Method: `screencapture -l <windowID> -o` (no shadow) and `screencapture -l <windowID>`
  (shadow); the window ID came from `CGWindowListCopyWindowInfo`.
- The inspector panel is visible on the right; it could not be hidden for the capture.
- Only `fi-dark` was captured with the window active (coloured traffic lights);
  `fi-light`, `en-light` and `en-dark` show the inactive window (grey traffic lights).
- Processing, on the laptop: converted to sRGB (`magick -profile "sRGB Profile.icc"`),
  every metadata chunk removed (`-strip -define png:exclude-chunk=all`: no EXIF, XMP,
  text or profile chunks), then WebP at 2400 px wide, quality 82, method 6, no metadata.
  Phone crops as in the table above. No camera or photo-library asset is involved.

The first capture (2026-11-21, English UI only, `kauppi-{light,dark}`)
is superseded by this one and its files are removed; it is in git history.

## Source map

- File: `~/Dropbox/kartat/KauppiEmoTampere_AK_2013_elokuu.jpg`
- SHA-256: `a1983a6ee4f818516cf14b5ed34b1db2687b6ef373edf81612107a00030a9459`
- 9733 x 3569 px JPEG, 6,928,012 bytes. The map header reads "KAUPPI 1 : 10000", with "Emo-9" beside it.
- Credit (as given): "Kartta: Kauppi, Tampereen Pyrintö."
- No mapper, year or credit box is printed on the map. I looked at the whole sheet at overview size, not every corner at full resolution.
- Approval: Jarkko approved this map for the screenshot on 2026-11-21, relayed by the coordinator.
- The copyrighted map is not in this repo. Copy used by the app: scratchpad only.

### How the scale was set

The JPEG has no usable DPI (72, resolution unit undefined), so the app was told
the paper width explicitly. I assumed 300 dpi, which makes the sheet
824.1 x 302.2 mm. Evidence for 300 dpi at the printed 1:10 000:

- The oval sports field south-west of the course area measures about 17 x 11 mm on the sheet, about 170 x 110 m on the ground, the right size for a running track.
- Symbol sizes (boulder dots about 0.7 mm, road casings about 0.5 mm) match ISOM sizes at 300 dpi; at 150 dpi they would be twice as large.
- The sheet then covers about 8.2 km west to east, which matches the real Kauppi area, and 302 mm tall, about an A3 sheet height.
- The lake Alasjärvi comes out about 0.75 x 0.5 km.

This is an inference, not a measurement against a surveyed distance. The course
lengths below depend on it.

### Crop

To make the app's Fit Map frame the course at a legible size, the app was given a
crop of the bitmap: x 168-405 mm, y 12-227 mm of the full sheet (237 x 215 mm,
2799 x 2539 px), re-saved as JPEG quality 98 with no chroma subsampling. The app
shows the title "KAUPPI 1 : 10000" and "Emo-9" from the original. The crop is
the only change to the map.

## Course

- Event name: Kauppi (the package is named `Kauppi.ratametsuri`; the window title shows only "Kauppi").
- Course A: 11 controls (31-41), 4.5 km straight-line (4.51 km computed from the control positions), no climb set. Climb left empty because it was not estimated from the contours.
- Course B: 7 controls, 3.4 km straight-line (3.36 km), no climb set.
- Shared controls: 31, 32, 37, 38, 39, 40 and 41 (all seven controls of B are also on A). B skips the western loop 33-36.
- Screenshot shows Course A selected: the map with its legs, and the description sheet both on the map and in the sidebar.
- Leg lengths on A (m): 405, 676, 354, 257, 311, 339, 257, 192, 680, 335, 456, 252.
- Control descriptions: column D only (feature): boulder 31, 32, 35, 38, 40; small depression 33; knoll 34, 36, 37, 39, 41. Column C and the other columns are empty.
- Controls sit on boulders and brown knoll dots read from the map at 1:10 000, and 33 on a small depression. Positions were checked on 18 mm crops of the source map with a 6 mm circle around each.
- Course setting checks (script prints them): no two points under 60 m apart, no dogleg under 50 degrees, all inside the map, no forbidden-area hatching in the area used.
- Not checked: whether the controls are fair from a real course setter's view, and the start and finish run-ins.
- Event file: kept outside the repo.

## Pipeline

Scratchpad only, not in the repo: the capture script and spec
(`rm_shoot.py`, `kauppi.json`) and the
`export.sh` (sRGB, strip, WebP), kept outside the repo.
