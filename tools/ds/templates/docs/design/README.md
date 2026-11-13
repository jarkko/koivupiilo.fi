# Design house rules

<!-- The rules every UI change follows, each with how it is checked. A rule without a check is a wish: give it one, or move it to voice.md or a checklist. A violation is a review finding. Add project rules below the global ones; never weaken a global rule. -->

Read with: [model.md](model.md) (the product model), [voice.md](voice.md), [termbase.tsv](termbase.tsv), the platform checklist (where `kit.toml` maps its `checklist_*` role; by default under [checklists/](checklists/wcag22-aa.md)), and [policies/third-party-skills.md](policies/third-party-skills.md). The model wins over everything here; a conflict is raised with the owner, not resolved in code.

## Global rules

These hold in every project and are never switched off.

| Rule | Check |
|---|---|
| **One primary action per view.** Secondary actions are visibly quieter. | Count primary-styled controls per screen in the review screenshots: at most one. Lint flags a second primary component in one view where the stack allows. |
| **No theme toggle in app chrome.** The app follows the system appearance; an override (System / Light / Dark) lives in the user's settings. | Search the header, navbar, footer and toolbar markup for an appearance control: any hit is a defect. The settings page has the override. |
| **No UUIDs anywhere users see:** URLs, screens, emails, PDFs, notifications. User-facing records get a short readable id (a per-account sequence or a slug). | The defect review reads every URL and visible string on walked screens; a 36-character hex id is blocking. Route definitions take the readable id. |
| **Nothing a user made is lost without an explicit, undoable action.** Finish, close, export and delete are different actions; delete names what is lost. | Every lifecycle rule in model.md has a tagged test that drives the control and asserts the data is still there (`ds model check`). The review walks each destructive path and its undo. |
| **Screens are checked at phone and desktop width, in light and dark** (or the smallest and largest device, for native apps), at the largest text size, in every shipped region. | Screenshots across that matrix are attached to the review; a missing cell is a finding. |
| **Tokens only.** Colours, type, spacing, radius, elevation and motion come from the token source; no raw values in UI code. | Project lint (`ds run lint`) fails on raw values outside the design-system module; suppression needs an inline reason. |
| **Contrast meets WCAG 2.2 AA in both themes:** text 4.5:1, large text 3:1, UI components and focus rings 3:1. | `ds contrast` over [contrast-pairs.json](contrast-pairs.json); computed, never eyeballed. |
| **One term per concept**, the same on every screen and in every language. | `ds terms` fails on any forbid pattern in [termbase.tsv](termbase.tsv). |
| **Status is never colour alone.** It has words or an icon too. | The review checks status elements in a greyscale screenshot. |
| **Every interactive component has all its states:** default, hover, pressed, focus-visible, disabled, loading, error, or a note on why one cannot occur. | The component catalog shows each state; a component missing from the catalog fails its coverage test. |
| **Every list and form has its empty, loading, error, long-text, many-items and offline states.** | W0 covers the empty states; the review walks the rest with worst-case data (long names, long compound words, extreme counts). |
| **Targets are at least 44 × 44** points or pixels for anything touched, 24 × 24 for pointer-only controls. | Deterministic UI invariant on changed screens; the review measures any control that looks small. |
| **Motion has a purpose and honours reduced motion.** No autoplay, no parallax. | The motion spec lists trigger, property, duration, curve and purpose; the review repeats each walked transition with reduced motion on. |
| **Text reflows:** no clipped or truncated text at 320 px width, 200 % zoom or the largest accessibility text size; truncation only when the element's own title, aria-label or aria-labelledby holds the full text, or a `data-ds-allow` reason says where a reader finds it. | Deterministic UI invariant on changed screens; screenshots at the largest text size. |
| **Errors say what happened, why in one clause, and how to fix it,** next to the field, never blaming the user. | The review triggers each error on walked screens and reads the copy against [voice.md](voice.md). |

## Project rules

<!-- Rules specific to this product's direction, written so a reviewer can check them against a diff or a screenshot. One row each, same format. -->

| Rule | Check |
|---|---|
| **Accent means "still to buy".** The accent colour appears only on unticked items' tick targets. | Search the diff for the accent token: any other use is a defect. |

## Source

The generic rules are generalised from the house rules of earlier projects that used this kit, which adapted parts of `design-taste` by madebymustafa (MIT licence, https://github.com/madebymustafa/design-taste, commit `c4a6bff0871eb4b15371b0e7d2751628b0ed4608`). The text is rewritten; nothing is vendored.
