# Apple HIG checklist: macOS

<!-- The short list every Mac UI change and review checks. Apple's pages are the source of truth: read the linked page when a change touches that area. Name the benchmark apps for this product's job; delete items that cannot apply and say why in the review. -->

Benchmarks: Apple's own Mac apps for the same kind of job (Keynote, Pages, Freeform, Preview, Notes, Mail), plus the best third-party app in the category. Record which control comes from which app in the product's references.

## Lifecycle and window

- [ ] The window and file model follows model.md, and only model.md: document-based (Open, Save, Versions) or library-based (the app owns storage, autosaves, no Save). The checklist never decides it, and the two never coexist.
      [Windows](https://developer.apple.com/design/human-interface-guidelines/windows),
      [File management](https://developer.apple.com/design/human-interface-guidelines/file-management)
- [ ] Work autosaves in place, with truthful failure and retry feedback. Closing a window that holds saved work does not ask to save.
- [ ] Launch offers the way back into recent work, not an empty window.
- [ ] Undo and redo cover every edit, through the standard Edit menu, and go back a long way.
      [Undo and redo](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo)
- [ ] Windows restore their size, position and selection on relaunch.

## Menus and keyboard

- [ ] Every command is in the menu bar, including those with toolbar buttons. Commands found in every Mac app live in the standard menus with the standard shortcuts; custom shortcuts never take those.
      [The menu bar](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar),
      [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- [ ] Everything works from the keyboard: full keyboard access, a visible focus ring, Tab and Shift-Tab order that follows the layout, Esc cancels.
      [Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards)
- [ ] Context menus repeat the commands that apply to the clicked item.
      [Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)

## Controls and layout

- [ ] The toolbar holds the frequent tools, uses standard toolbar items and can be customised.
      [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- [ ] Sidebars and inspectors use system materials and collapse; the content keeps the space.
      [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [ ] One window shows the work and its details together where the job needs both; no separate preview mode.
- [ ] System font, text styles and system controls at their standard sizes. Colour is never the only signal.
      [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [ ] The app follows the system appearance; light and dark both work; no theme toggle in the window chrome. An override, if any, lives in Settings.
      [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- [ ] Settings is a standard Settings window, opened with Command-comma.
      [Settings](https://developer.apple.com/design/human-interface-guidelines/settings)

## Liquid Glass

- [ ] Toolbars, sidebars and sheets use the system materials from the current SDK; no custom backgrounds or blurs behind them, and never glass on glass.
      [Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [ ] Checked with Reduce Transparency and Increase Contrast on.

## Feedback

- [ ] Empty, loading and error states say what to do next, in the language of the screen.
- [ ] Removing the person's own work is undoable or goes to the Trash or version history; confirmation alone is not enough. Emptying the app's trash or clearing history removes work too, so it is undoable or keeps a recoverable copy for a stated period.
- [ ] Only external actions that cannot be taken back (sending, paying, publishing) rely on a confirmation, which names exactly what will happen.
      [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- [ ] Acceptance tests drive the loss paths through the UI and restore the exact contents: delete and undo, close a window with unsaved edits and reopen them, empty the trash and restore from it.
- [ ] Long operations show progress in place and can be cancelled.

## Review

- [ ] Every changed window is screenshotted at its minimum and a large size, in light and dark, at the largest supported text size, in every shipped region, and checked against this list.
