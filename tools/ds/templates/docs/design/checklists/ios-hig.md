# Apple HIG checklist: iOS

<!-- The short list every iOS brief and review checks. Apple's pages are the source of truth: read the linked page when a change touches that area. Replace the example names with the product's own; delete items that cannot apply and say why in the review. -->

Benchmarks: Apple's own apps (Mail, Reminders, Wallet, Files, Settings, Fitness). Before building a screen, find the Apple app that does the same job and match how it does it. Where the product's own information architecture and the HIG differ, the iOS app follows the HIG.

## Navigation and structure

- [ ] Tab bar for top-level sections only (`TabView`): no action tab, no centre "+". Tabs stay stable: never hide or disable a tab when its content is unavailable; the tab opens and explains why it is empty and what fixes it. A tab removed by permission or plan is a labelled project exception, not HIG.
      [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- [ ] Each tab has its own navigation stack: a large title on the root screen, inline titles deeper in, the system back button with the previous title, swipe-back everywhere.
      [Navigation bars](https://developer.apple.com/design/human-interface-guidelines/navigation-bars)
- [ ] Primary actions sit in the toolbar, at most one prominent action per bar.
      [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- [ ] Views of the same content inside a tab use a segmented control or a picker, not a second tab bar. A sequential flow (step 1, 2, 3) is a navigation push or a paged sheet, never a segmented control.
      [Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)
- [ ] Search is placed by scope: a search tab in the tab bar for app-wide search; a field in a bottom toolbar when search is a priority and there is room (the top toolbar when bottom content must stay clear); an inline field above a list to filter just that list. Prefer the bottom, within thumb reach.
      [Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields)

## Presentation

- [ ] Self-contained tasks open as sheets: Cancel on the leading edge, the confirm action on the trailing edge. Unsaved input is never lost: Cancel or swipe-down keeps it as a draft that reopens with the sheet (as Mail and Notes do), or discarding offers undo. A discard prompt alone is not enough.
      [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets),
      [Modality](https://developer.apple.com/design/human-interface-guidelines/modality)
- [ ] Deleting the person's own work is recoverable (undo, or a Recently Deleted area like Notes and Photos); confirmation alone is not enough. Costly or external actions that cannot be taken back use a confirmation dialog with the destructive role, naming what will happen. Alerts are only for problems the person must act on now.
      [Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets),
      [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)

## Lists and actions

- [ ] Lists use the system inset-grouped or plain style; rows read like Mail or Wallet rows: title, secondary line, trailing value, status as words plus colour.
      [Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- [ ] Row actions are swipe actions (destructive on the trailing edge, with the destructive role) and the same actions in a context menu. Every swipe action is also reachable without swiping.
      [Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)
- [ ] Pull to refresh on every list that shows server data.
- [ ] Empty states follow the content-unavailable layout: what is missing, why, and the one action that fixes it.
- [ ] The system share sheet for anything sent out of the app.
      [Activity views](https://developer.apple.com/design/human-interface-guidelines/activity-views)

## Data entry

- [ ] Forms use sections; every field has a label, the right keyboard (decimal pad for amounts) and a text content type for autofill. Return moves to the next field.
      [Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields),
      [Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data)
- [ ] Numbers, dates and placeholders follow the region: an example value never shows "." next to a keyboard that types ",". Check every shipped region.
- [ ] Dates use the system date picker; short choices use a menu picker; on/off settings use toggles.
      [Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)
- [ ] Validation shows next to the field when the person leaves it or submits, never as an alert.

## Feedback and state

- [ ] Loading shows placeholders or an in-place progress view, never a spinner over the whole screen. Offline work queues and says so in the row.
      [Loading](https://developer.apple.com/design/human-interface-guidelines/loading),
      [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)
- [ ] Success feedback is quiet: the row updates, with a haptic for meaningful actions. No celebratory modals.
      [Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)
- [ ] Undo is offered for reversible actions, through shake-to-undo or an explicit control where the system offers it.
- [ ] Acceptance tests drive the loss paths through the UI and restore the exact contents: discard a half-filled sheet and reopen its draft; delete an item and restore it from undo or Recently Deleted; empty Recently Deleted and undo it.

## Visual design

- [ ] SF Symbols for every icon, matching the weight and scale of the adjacent text. No custom icons except the brand mark and symbols with no SF equivalent, drawn as custom symbols.
      [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- [ ] Icon map: every icon in the product is listed in the component catalog with its meaning and the HIG or SF Symbols reference behind it. One meaning per symbol, one symbol per meaning; a symbol whose meaning is not obvious gets a text label.
      [Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- [ ] Semantic colours and system materials; brand colours come from the token source and are checked in light, dark and Increase Contrast.
      [Color](https://developer.apple.com/design/human-interface-guidelines/color),
      [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- [ ] Text styles only, so Dynamic Type works up to the largest accessibility size. Layouts reflow at accessibility sizes: rows stack, decorative images drop out.
      [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [ ] Standard margins and safe areas: controls and text at rest never sit under the home indicator or the bars; scrolling content and backgrounds may run beneath them.
      [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [ ] Native controls and custom UI read as one design: no custom control sits next to a system control it imitates.

## Liquid Glass

- [ ] Built with the current SDK, so system bars, tab bars, toolbars, sheets and menus get Liquid Glass automatically. No custom backgrounds or blurs painted behind them.
      [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- [ ] Glass is for the navigation layer that floats above content (controls, bars), never for the content itself, and never glass on glass.
      [Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [ ] Tint glass sparingly, only to mark a primary action; a screen full of tinted glass has no hierarchy.
- [ ] Content runs edge to edge under the bars; scroll edge effects, not opaque bars, keep controls legible.
- [ ] Custom shapes are concentric with the device corners and the sheets around them.
- [ ] Checked with Reduce Transparency, Increase Contrast and Reduce Motion on: glass becomes frosted or opaque and every control stays legible.
- [ ] Decorative glass effects outside the system layer need a written reason in the review.

## Accessibility

- [ ] Every control has a VoiceOver label in the person's language; values read as money, dates or units, status reads as words. A row is one element, with custom actions for its swipe actions.
      [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility),
      [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover)
- [ ] Hit targets are at least 44 × 44 pt.
- [ ] Reduce Motion, Reduce Transparency, Increase Contrast and Bold Text are honoured. Status never relies on colour alone.
- [ ] The accessibility audit in the UI tests runs with no skips.

## Privacy and system

- [ ] Ask for camera, microphone, photos, location, notifications or local network only when the person starts the feature that needs it, with a purpose string that says why in plain words. Denial has a working recovery path.
      [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [ ] Passkeys for sign-in where there is an account.
      [Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)
- [ ] Notifications only for things that need the person, deep-linking to the thing.
      [Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications)

## Writing

- [ ] Copy follows [voice.md](../voice.md) and [termbase.tsv](../termbase.tsv): plain verbs, sentence case, buttons named after what they do.
      [Writing](https://developer.apple.com/design/human-interface-guidelines/writing)

## Review

- [ ] Every changed screen is screenshotted on the smallest and largest supported iPhone, at the default text size and the largest accessibility size, in light and dark, in every shipped region, and checked against this list before anyone else sees it.
