# Voice

<!-- How the product sounds, in every language it ships. The house rules (README.md) hold the checkable copy rules; this page is how to read them. Terms live in termbase.tsv. Every example is real copy from the product or its brief; this page invents none. -->

Languages: <first language, written first> · <others>. Each language is written for its readers, not translated word for word from another.

## Traits

<!-- 3–5 traits, each with what it sounds like and what it is not. The "not" column does most of the work. -->

| Trait | Sounds like | Not |
|---|---|---|
| Calm | Short sentences; the fact, then what happens next | Cold, clinical, alarmist |

## Rules

<!-- Numbered, checkable where possible. Start from these; add the product's own. -->

1. **Buttons say the action** and name the object: "Clear ticked items", not "OK" or "Continue".
2. **A destructive button names what is lost**, beside an equally visible cancel.
3. **Errors have three beats:** what happened, why in one clause, the fix. Never a bare "Error"; never blame the user.
4. **Empty states** name the emptiness, say why, and offer one next action.
5. **Loading states say what is happening** and end with an ellipsis: "Saving…".
6. **One term per concept.** Look it up in the termbase before coining a word; a new word goes there first.
7. **No concatenated sentences.** Use interpolation and plural rules so every language orders its own words.
8. **Concrete over vague:** numbers, names and dates. No filler, no "just", no exclamation marks.
9. **Sentence case** for headings, buttons and menu items.

## Examples

<!-- Real strings, one row per situation, in every shipped language. Add a row whenever a new kind of message ships. -->

| Situation | <first language> | English |
|---|---|---|
| Empty list | <…> | Nothing to buy. Add the first item and everyone at home sees it. |
| Clear, confirm | <…> | Clear 6 ticked items? They move to History. |
| Offline tick | <…> | Not synced yet. It will sync when you're back online. |
