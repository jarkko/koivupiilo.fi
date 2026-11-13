# Web interface checklist

<!-- The short list every web UI change and review checks. It summarises the Web Interface Guidelines at the pinned commit below; the source page is the truth, read it when a change touches that area. Update the pin deliberately, reading the diff, never automatically. -->

Source: [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/434b7f91364665f2f733b310ec54809bf8f37937/README.md) by Vercel Labs, commit `434b7f91364665f2f733b310ec54809bf8f37937` (2026-10-05), MIT licence. Summarised and rewritten; the text is not vendored. Checked 2026-10-31.

Benchmarks: Linear and Stripe for product UI. Before building a screen, find the best web product that does the same job and match how it does it.

Where this list and the house rules differ, the house rules win: contrast is gated on WCAG 2.2 AA ([wcag22-aa.md](wcag22-aa.md)), with APCA as an optional extra reading; copy is sentence case per [voice.md](../voice.md), not the source's vendor-specific Title Case; and where the source allows confirming a destructive action instead of undo, the house rule asks for recovery of user work, with confirmation only on top.

## Interactions

- [ ] Every flow works with the keyboard and follows the WAI-ARIA Authoring Practices patterns; focus moves into and back out of dialogs and menus.
- [ ] Every focusable element shows a visible `:focus-visible` ring that sticky headers and overlays never cover.
- [ ] Hit targets match the visual target; below 24 px the hit area grows to 24 px; touch targets are at least 44 px.
- [ ] Inputs use at least 16 px text on mobile; zoom is never disabled; paste is never blocked.
- [ ] Loading buttons keep their label and add an indicator. Spinners and skeletons wait ~150–300 ms before showing and stay ~300–500 ms, so fast responses don't flicker.
- [ ] State lives in the URL (filters, tabs, pagination, open panels), so share, refresh and Back work; Back restores scroll position.
- [ ] Optimistic updates when success is likely; on failure, roll back with an error or offer Undo.
- [ ] Deleting the user's own work offers Undo with a safe window or a restorable trash; confirmation alone does not meet the house rule. Confirm costly or external actions that cannot be undone.
- [ ] Links are `<a>` elements, so Cmd-click, middle-click and open-in-new-tab work; never a button or div for navigation.
- [ ] Every drag, swipe or pinch has a click and keyboard alternative.
- [ ] Async updates (toasts, inline validation) are announced with a polite live region.
- [ ] `overscroll-behavior: contain` in modals and drawers; no dead zones on anything that looks interactive.
- [ ] Keyboard shortcuts work on non-QWERTY layouts and show the platform's symbols.

## Animation

- [ ] `prefers-reduced-motion` has a reduced variant for every animation.
- [ ] Animate `transform` and `opacity` only; never `transition: all`. Prefer CSS, then the Web Animations API, then a library.
- [ ] Animate only to show cause and effect or for deliberate delight; animations are interruptible by input and start from where the element physically comes from.
- [ ] No autoplay except muted, non-essential loops; motion longer than 5 seconds has pause, stop or hide.

## Layout

- [ ] Every element aligns deliberately to a grid, baseline, edge or optical centre; adjust ±1 px where perception beats geometry.
- [ ] Verified at phone, laptop and ultra-wide widths; safe-area insets respected.
- [ ] No unwanted scrollbars (test with "Show scroll bars: Always" on macOS); flex and grid size things, not JavaScript measurement.

## Content

- [ ] Every state is designed: empty, sparse, dense, error. Every screen has a next step or a way back.
- [ ] Skeletons match the final layout exactly; images have explicit dimensions, so nothing shifts.
- [ ] `<title>` reflects the current page; headings are hierarchical with a skip link.
- [ ] Layouts survive short, average and very long user content.
- [ ] Dates, times, numbers and currency follow the user's locale; language comes from `Accept-Language`, never from IP or location.
- [ ] Tabular numbers for anything compared in columns; `…` not `...`; curly quotes; non-breaking spaces in `10 MB` and `⌘ K`.
- [ ] Status has text, never colour alone; icon-only buttons have an accessible name; native elements before ARIA.
- [ ] Brand names, product names and code are marked `translate="no"`.

## Forms

- [ ] Every control has a label, and clicking the label focuses it.
- [ ] Enter submits single-field forms; in a textarea, Cmd/Ctrl-Enter submits.
- [ ] Submit stays enabled until submission starts, then shows progress and sends an idempotency key; incomplete forms can be submitted to reveal errors.
- [ ] Never block keystrokes; accept the input and explain what is wrong.
- [ ] Errors sit next to their fields; on submit, focus moves to the first error.
- [ ] Correct `type`, `inputmode`, `autocomplete` and `name`; spellcheck off for emails, codes and usernames; values are trimmed.
- [ ] Placeholders are example values ending with `…`, never labels.
- [ ] Warn before leaving a page with unsaved changes.
- [ ] Password managers and pasted one-time codes work; non-auth fields don't trigger the password manager.

## Performance

- [ ] Test in macOS Safari and with iOS Low Power Mode, with CPU and network throttling.
- [ ] Mutations (`POST`, `PATCH`, `DELETE`) complete in under 500 ms.
- [ ] Large lists are virtualised or use `content-visibility: auto`.
- [ ] Only above-the-fold images are preloaded; fonts are preloaded for critical text and subset to the scripts used.
- [ ] Expensive work runs off the main thread; video instead of animated GIF.

## Design

- [ ] Layered shadows (ambient plus direct), crisp borders, nested radii concentric with their parent.
- [ ] Hover, active and focus states have more contrast than rest.
- [ ] `color-scheme` set for dark themes; `theme-color` matches the page background.
- [ ] Charts use colour-blind-safe palettes.
