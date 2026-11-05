# WCAG 2.2 AA checklist

<!-- The success criteria a UI change most often breaks, phrased as checks. The standard is the truth: the number links to its Understanding page. Machine checks catch roughly a third of these; the rest need the review to do them by hand. -->

Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), W3C Recommendation. Level AA is the floor for every product, web and native, in light and dark. A fix beats an exception; an exception needs a written reason in the review.

## Perceivable

- [ ] **1.1.1** Every meaningful image and icon-only control has a text alternative; decorative ones are hidden from assistive tech.
- [ ] **1.2.2 / 1.2.5** Video with speech has captions; essential visual information is described.
- [ ] **1.3.1** Structure is in the markup or accessibility tree: headings, lists, tables with headers, labelled fields, landmarks.
- [ ] **1.3.4** Content works in portrait and landscape.
- [ ] **1.3.5** Fields about the user have the right autocomplete purpose.
- [ ] **1.4.1** Colour is never the only way to convey information.
- [ ] **1.4.3** Text contrast at least 4.5:1, large text (24 px, or 18.66 px bold) 3:1. Computed per theme.
- [ ] **1.4.4** Text resizes to 200 % without loss of content.
- [ ] **1.4.10** Content reflows at 320 CSS px wide with no horizontal scroll (data tables and maps excepted).
- [ ] **1.4.11** UI components, input borders, focus indicators and meaningful graphics reach 3:1 against what is next to them.
- [ ] **1.4.12** Nothing breaks with increased line, paragraph, letter and word spacing.
- [ ] **1.4.13** Hover and focus popups can be dismissed, hovered and stay until dismissed.

## Operable

- [ ] **2.1.1 / 2.1.2** Everything works with the keyboard, and focus never gets trapped.
- [ ] **2.2.1** Time limits can be turned off, adjusted or extended (warn at least 20 seconds before).
- [ ] **2.2.2** Moving content that starts automatically and lasts over 5 seconds can be paused, stopped or hidden.
- [ ] **2.3.1** Nothing flashes more than three times a second.
- [ ] **2.4.1** A skip link or landmarks let keyboard users bypass repeated blocks.
- [ ] **2.4.2** Every page or screen has a descriptive title.
- [ ] **2.4.3** Focus order follows the meaning and layout.
- [ ] **2.4.6** Headings and labels describe their topic or purpose.
- [ ] **2.4.7** Focus is always visible.
- [ ] **2.4.11** The focused element is never entirely hidden by sticky headers, footers or overlays.
- [ ] **2.5.1** Multi-point and path gestures have a single-pointer alternative.
- [ ] **2.5.2** Actions fire on release, so a press can be cancelled by moving away.
- [ ] **2.5.3** A control's accessible name contains its visible label.
- [ ] **2.5.7** Every drag has a non-dragging alternative.
- [ ] **2.5.8** Targets are at least 24 × 24 CSS px, or spaced so a 24 px circle fits. (The house rules ask 44 for touch.)

## Understandable

- [ ] **3.1.1 / 3.1.2** The page language is set, and passages in another language are marked.
- [ ] **3.2.1 / 3.2.2** Focusing or changing a field never triggers an unexpected change of context.
- [ ] **3.2.3 / 3.2.4** Navigation and components that repeat across screens stay in the same place and have the same names.
- [ ] **3.2.6** Help, where offered, is in the same place on every screen.
- [ ] **3.3.1 / 3.3.3** Errors are identified in text, next to the field, with a suggestion for fixing them.
- [ ] **3.3.2** Every input has a visible label or instructions.
- [ ] **3.3.4** Legal, financial and data-deleting submissions can be reversed, checked or confirmed. The house rule is stricter for the person's own work: it must be recoverable, and confirmation alone is not enough.
- [ ] **3.3.7** Information already entered in a flow is not asked for again.
- [ ] **3.3.8** Sign-in needs no cognitive test: paste, password managers and passkeys work.

## Robust

- [ ] **4.1.2** Custom controls expose name, role, state and value to assistive tech.
- [ ] **4.1.3** Status messages are announced without moving focus.

## Native platforms

- [ ] The same criteria apply through the platform's equivalents: VoiceOver labels and traits, Dynamic Type to the largest accessibility size, Full Keyboard Access, Reduce Motion, Reduce Transparency, Increase Contrast and Bold Text.
