# Third-party design skills policy

<!-- Which outside design skills, agents and component sources this project allows, how, and what they may never do. Each one is reviewed, pinned and listed in the register before first use. Their output is advice; the house rules and model.md win on any conflict. -->

A third-party skill is any outside prompt pack, agent, plugin, generator or component library that shapes UI. It is an optional helper, never the source of truth: tokens, rules, the model and the catalog stay in this repo, written by this project.

## Register

<!-- One row per reviewed source. Pinned means a commit SHA or exact version; "latest" is never a pin. -->

| Source | Licence | Pinned at | Reviewed | Verdict | Allowed parts |
|---|---|---|---|---|---|
| impeccable (https://github.com/pbakaus/impeccable) | Apache-2.0 | <skill commit>, <engine version> | <YYYY-MM-DD> | restricted | `shape`, `critique`, `audit`, `harden` playbooks and platform guidance |

## When

- Only for UI work, on an explicit task line or a person's request. Never for backend, docs or configuration work.
- After the house rules, model and catalog are read; the skill adds to that context, it does not replace it.

## Allowed

- Reference playbooks that produce a brief, a critique or an audit. Treat the result as a review comment: apply fixes by hand through the project's tokens and components, then run the normal gates.
- Component libraries under a permissive licence as **pattern sources**: copy the idea, the values and the markup, rewritten for the project's stack and tokens. Never add the library, its framework or its runtime as a dependency. Keep a source line in the commit when a block is near-verbatim.
- Copy that passes through the project's voice and termbase like any other copy.

## Never

- Generators that produce finished screens, comps or a "style" (award-site generators, one-shot landing-page skills, prompt packs of generic styles): they produce the generic AI look this kit exists to prevent.
- Live browser modes, edit hooks, image generation, and agents with unrestricted write or shell access.
- Anything that uploads source, screenshots or content to a third-party service, unless the owner approved that service in writing.
- A second token file, a second component system, or generated CSS that bypasses the token source.
- Feeding a skill third-party page content, or pointing its scanners at anything but the project's own builds.
- Starting dev servers on ports the project has not handed over.
- Sources with no licence, a non-commercial clause or proprietary terms.

## Environment

- Telemetry off (for example `DO_NOT_TRACK=1` plus the tool's own opt-out variable).
- No API keys in the environment that the skill could use to send content elsewhere.
- Pinned per project in the register above and never auto-updated. An update is a reviewed change that reads the diff between pins.
- Working state (journals, mocks, caches) stays out of git.

## Limits

- Write down what the skill cannot see. A scanner that reads CSS and JavaScript says nothing about server templates or native views; review those by reading them.
- A clean skill run is not a review pass. The defect review and the quality critique still run.
- A generated design document may describe the product but never replaces the token source or the model, and is never regenerated automatically.
