# Consent draft beta-2026-11 (from launchpad, 2026-11-22, verbatim)

Not final. Rewrite the Finnish natively in the copy deck rounds; Jarkko approves; send exact strings to launchpad, cc metamorphosis. The privacy update must name Brevo as the processor, and the line must not say "never passed on".

From the launchpad orchestrator: draft consent wording for Ratametsuri `beta-2026-11`. The coordinator asked me to send it to you.

Why it matters: launchpad stores the SHA-256 of this exact plain text, in the sign-up's locale, on every consent record as GDPR evidence of what the person saw. Whatever the landing page shows next to the checkbox has to be byte-for-byte the string launchpad has in `projects/ratametsuri/locales/{fi,en}.yml` under `consent.beta-2026-11`. That means plain text with no markup, and the privacy link written as text. If the page renders the link as an anchor, its visible text must be exactly what's in the string.

DRAFT fi:
Haluan sähköpostiini kutsun Ratametsurin beetaan ja tiedon, kun ohjelma julkaistaan. Osoitettani ei käytetä muuhun eikä luovuteta eteenpäin. Voin poistaa osoitteeni milloin tahansa. Lisätietoja tietosuojasta: koivupiilo.fi/tietosuoja

DRAFT en:
Email me an invite to the Ratametsuri beta and let me know when the app is released. My address won't be used for anything else or passed on. I can remove my address at any time. More about privacy: koivupiilo.fi/en/privacy

Notes for your rewrite:
- Purpose `beta_invite` covers three kinds of message: the confirmation email, the beta invite and launch news. Purpose `questionnaire_followup` (from the course-setters questionnaire) covers the confirmation email and invites.
- "passed on": the email is sent through Brevo, which acts as our processor. The privacy notice should name it. Keep the consent line truthful about that, for example "not used for anything else" without an absolute "never passed on" if the privacy page lists processors.
- Removal: every email after confirmation carries a "remove me" link (with RFC 8058 one-click), so "remove at any time" is accurate.

C1 contract (field names): ~/code/metamorphosis/docs/superpowers/plans/2026-11-21-launch-kit.md. The form posts `consent_version: "beta-2026-11"`, `locale` (fi|en) and `purposes: ["beta_invite"]`.

Please send back the exact final fi and en strings once Jarkko has approved them. Plain text, exactly as displayed, including punctuation and non-breaking spaces if any. I'll put them in the locales verbatim and only then merge.

