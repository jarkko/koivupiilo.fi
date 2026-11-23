import json, hashlib, subprocess, statistics
from pathlib import Path

directory = Path('docs/design/reviews/evidence/f42b0d0f')
prefix = str(directory) + '/'
ui_hash = 'f42b0d0f558bdbfff9ef50ad1a4337a93b7d1313849e2e5f0021fd64926b45ea'
head = '248cbea000ee9c2da39ff9860448607e58d9ecdc'
assert subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode().strip() == head
assert subprocess.check_output(['node', 'tools/ds/ds.mjs', 'review', 'hash']).decode().strip() == ui_hash
walk = json.loads((directory/'walk-report.json').read_text())
extra = json.loads((directory/'extra-report.json').read_text())
gate = json.loads((directory/'gate.json').read_text())
perf = json.loads((directory/'perf-summary.json').read_text())
assert len(walk['matrix']) == 16 and all('locale' in c for c in walk['matrix'])
assert len(walk['nojs']) == 48 and len(walk['motion']) == 8
assert len(extra['long']) == 24 and len(extra['axe']) == 32
assert not any(c['overflow'] for c in extra['long'])
assert not any(c['violations'] for c in extra['axe'])
assert gate['ok']

fixes = [
    {'id':'F1','result':'fixed','note':'24 fresh accepted long-address cells: 320/390, default fonts 16/24/32 px, FI/EN and light/dark; zero horizontal overflow. All addresses had the honeypot filled and POST replies were intercepted.','evidence':[prefix+'extra-report.json',prefix+'shots/long-en-320-light-font16-after.jpg',prefix+'shots/long-fi-390-dark-font24-after.jpg']},
    {'id':'F2','result':'fixed','note':'All 16 product-list walks find one locale-correct Ratametsuri link and arrive at the matching page. Front -> Work -> Ratametsuri also walked in both languages.','evidence':[prefix+'walk-report.json',prefix+'paths-report.json',prefix+'shots/fi-1440-dark-font16-work.jpg']},
    {'id':'F3','result':'fixed','note':'48 committed new/changed baselines cover product, privacy and linked work lists; the fresh visual comparison has zero findings. A failing verdict cannot approve baseline hashes; none are approved here.','evidence':[prefix+'visual.json',prefix+'baseline-manifest.json']},
    {'id':'F4','result':'fixed','note':'Both product routes pass the unchanged 2000 ms LCP budget: FI median 1727.403 ms, EN median 1727.073 ms; CLS 0 in all six runs. The full module passes.','evidence':[prefix+'perf.json',prefix+'perf-summary.json',prefix+'lighthouse/ratametsuri-run-1.html',prefix+'lighthouse/en-ratametsuri-run-1.html']},
    {'id':'F5','result':'fixed','note':'All 16 invalid fixtures put the explanation immediately under the field, focus email and describe it with signup-error. At 390/24 px the explanation is visible at about y=90..201 in both languages/themes.','evidence':[prefix+'walk-report.json',prefix+'shots/fi-390-light-font24-invalid-after.jpg',prefix+'shots/en-390-dark-font24-invalid-after.jpg']},
    {'id':'F6','result':'fixed','note':'Server/offline/rate-limit replies and no-JS signup-try-later show the direct email fallback with a beta-invite subject. Values survive failure and retry.','evidence':[prefix+'walk-report.json',prefix+'shots/en-390-light-font16-offline-after.jpg',prefix+'shots/nojs-fi-390-dark-font24-signup-try-later-after.jpg']},
    {'id':'F7','result':'fixed','note':'Per the lead decision in this dispatch, the desktop button shares the input row. At 1440x900 their bottoms match at y=883.156 FI / 862.266 EN in both themes; phone order remains field, consent, button.','evidence':[prefix+'walk-report.json',prefix+'shots/fi-1440-light-font16-first.jpg',prefix+'shots/en-1440-dark-font16-first.jpg']},
]
(directory/'fix-verification.json').write_text(json.dumps(fixes,indent=2)+'\n')
(directory/'build-result.json').write_text(json.dumps({'head':head,'observed_commands':[{'command':'npm run esbuild','exit_code':0,'result':'Frontend bundling completed; index.FWV7EXXZ.js and index.NMHSGCKI.css generated.'},{'command':'BRIDGETOWN_ENV=production bin/bridgetown build','exit_code':0,'result':'Bridgetown 2.0.3 production build completed into output/.'}],'warnings':['npm user config 14.18 is unknown','baseline-browser-mapping data is over two months old','caniuse-lite browser data is 12 months old']},indent=2)+'\n')
(directory/'review-ownership.json').write_text(json.dumps({'head':head,'branch':'jarkko/ratametsuri-landing','reviewer_run_id':'ctx_a817d04dcd01 / term_ed6e60fa-999b-4cfb-a1d1-95fe057e3366','task_id':'task_41540da08796','reviewer_family':'gpt','implementer_family':'claude','independence':'Fresh dispatched reviewer; did not write or plan the implementation. HEAD credits Claude Opus 5.5. Orca inventory shows only the Claude lead and this Codex worker in the worktree. UI was frozen by the dispatch.','authorization':'No source edits or commits; artifacts deliberately uncommitted per task.'},indent=2)+'\n')

notes = '''# Independent UX defect re-review, PR #3

Reviewed HEAD `248cbea000ee9c2da39ff9860448607e58d9ecdc`; UI diff hash `f42b0d0f558bdbfff9ef50ad1a4337a93b7d1313849e2e5f0021fd64926b45ea`.
Verdict: **FAIL**, sole blocking finding **F8**. Previous F1–F7 are verified fixed, with fresh evidence in `fix-verification.json`.

F8 is a product-model compliance finding, not a Finnish language/tone judgment: neither product landing page shows the status checked date required by M1. The linked work-list row shows 12 Nov 2026 (the `checked` field in `work.yml`); the landing status has no date in either theme or language. Render the verified checked date next to the landing status, or obtain an explicit model exception through the owner decision workflow. No consent wording change is proposed. No additional non-blocking findings.

## Coverage and limits

Walked W0, W1, W3 and W5; product pages and privacy additions, incoming product links, language switching, privacy and Back, maker -> privacy -> company trust route. Final matrix runs use `fi-FI` / Europe/Helsinki and `en-GB` / Europe/London browser settings, 390x844 / 1440x900, light/dark, browser default font sizes 16/24 px. These are large default fonts, not CSS-root overrides. Form outcomes: native empty/consent validation, invalid address, accepted, rate limit, server failure, offline, sending, retained-value retry and long address. No real valid address was submitted: all real POSTs used `a@b`; long fixture addresses had a filled honeypot and were intercepted. No emulators or simulators were started.

There are before/about-300-ms/settled frames for every fixture outcome, no-JS fragment and arrival motion. 48 no-JS cells cover the three named return fragments with JS disabled. Native POST/303 recovery was additionally walked with JS disabled and with the remote script unavailable, using a local invalid-email fixture. A real mouse press while aria-disabled/sending produces one POST, not a duplicate (`native-post-report.json`). The two earlier automation click sequences waited for aria-disabled to clear before making their second allowed submission; their POST count of two is not evidence of duplicate pending requests.

The extra runner completed 24 long-address cells and 32 axe cells before its localhost-only live-response wait timed out. `live-report.json` records the diagnosis: the service correctly excludes an arbitrary localhost origin from CORS. `live-production-origin-report.json` tests the local built bytes via browser interception at `https://koivupiilo.fi`, leaving the real sign-up endpoint unmocked: form script/token 200, POST 422, value retained and email focused in both languages. This is a production-origin integration test, not a claim that the candidate page is already deployed. The remaining trust-route and mid-visit reduced-motion checks ran successfully in `paths-report.json`.

Native Chrome zoom was set through chrome://settings/appearance at every offered step 100/110/125/150/175/200%, across product/privacy, both languages and both themes: 48 cells without overflow or clipped text. 320/390/1440 increased-text-spacing checks passed. Use `native200-report.json` and `shots/native200-*` for scrolled 200% screenshots: direct CDP captures avoid a Playwright full-page/browser-zoom capture artifact. Chrome has no text-only zoom mode. No Safari/iOS hardware or screen-reader speech pass is claimed; native semantics, labels, focus, live regions and keyboard order were inspected in Chromium, alongside axe. No physical-device workflow is present on these static pages.

The course reveals in order, ordinary motion leaves no hidden symbols after scrolling, reduced motion shows all symbols, and turning reduced motion on mid-visit leaves zero animations/hidden symbols. The phone and desktop hierarchy, alignment, controls, contrast and state changes were reviewed against direction D and the interaction checklist. The known archived prototypes, screenshot inspector and allowed skip-link warnings are excluded. Finnish editorial quality is excluded; consent strings remain untouched.

## Checks

Production frontend and Bridgetown builds passed. Fresh `ds gate`: pass, zero errors, 42 warnings. Fresh visual comparison: pass, zero findings. Fresh perf module: pass; six product Lighthouse reports are preserved under `lighthouse/`, with product medians around 1.73 s and CLS 0. Extra axe: 32 runs, zero AA violations. All 48 changed baseline hashes are recorded in `baseline-manifest.json`; a failed verdict approves none. The separate quality critique remains outside this defect-review task.

## Every gate warning

'''
for i,f in enumerate(gate['findings'],1):
    location = f.get('file','')
    if f.get('line'): location += ':'+str(f['line'])
    notes += f"{i}. `{f['rule']}` {location}: {f['message']}\n"
notes += '''
## Artifact hand-off

No product source file was edited and nothing was committed. Updated only `.ds/reviews/steps/W0.md`, `W1.md`, `W3.md`, `W5.md`, the new hash-named verdict and this evidence directory. `artifacts.json` lists all review artifacts. Uncommitted-input/evidence warnings are expected because the task explicitly forbids commits; CI cannot consume these artifacts until the coordinator commits them. The implementer must not edit the verdict. Next action: fix F8, obtain a fresh defect review for the resulting hash and separate quality critique, then commit the accepted evidence/verdict for CI.
'''
(directory/'review-notes.md').write_text(notes)

def item(id,result,blocking,note,evidence):
    return {'id':id,'result':result,'blocking':blocking,'note':note,'evidence':[prefix+e for e in evidence]}

review = {
    'kind':'defect','ui_diff_hash':ui_hash,'head_sha':head,
    'reviewer_run_id':'ctx_a817d04dcd01 / term_ed6e60fa-999b-4cfb-a1d1-95fe057e3366',
    'implementer_family':'claude','reviewer_family':'gpt',
    'walked':['W0','W1','W3','W5'],'regions':['fi_FI','en_GB'],
    'rubric':[
        item('house-rules','pass',True,'One primary action, system appearance, no visible UUID, sourced claims and independent product branding hold. Form outcomes, touch targets, reflow, focus, themes and motion were checked. Tokens/lint are explicitly off. Finnish editorial wording and fixed consent text are outside the review. The model-specific omission is F8 below.',['walk-report.json','gate.json','review-notes.md']),
        item('model','fail',True,'F8: the landing pages omit the checked date that M1 requires next to the work-item status. No D24/D25/D26 exception removes that requirement. The incoming D24 product links and W3 language parity now work; no destructive lifecycle or unapproved new model object was found.',['shots/fi-1440-light-font16-first.jpg','shots/en-390-dark-font24-first.jpg','walk-report.json','fix-verification.json']),
        item('heuristics','pass',True,'The user can identify every outcome, correct the field beside its error, retry with retained values, and reach a direct alternate email route after service failures. Privacy, language switching and the maker/company trust route are coherent. No destructive action exists.',['walk-report.json','paths-report.json','native-post-report.json','live-production-origin-report.json']),
        item('interaction-craft','pass',True,'Native inputs/checkbox/buttons respond, keyboard order and visible focus work, sending has a later status announcement, and repeated physical mouse presses while sending produce one request. Course motion is purposeful and completes under mid-visit reduced-motion changes. The first press expands a reserved answer area; this previously documented limited shift is not a new blocking defect.',['native-post-report.json','walk-report.json','paths-report.json','shots/keyboard-3.jpg']),
        item('platform','pass',True,'No new WCAG AA failure found. Real native Chrome zoom 100..200%, 320 px reflow, 16/24/32 px default-text long addresses, increased text spacing, labels, focus order, live regions and targets were checked. 32 additional axe cells have zero violations. Native Safari/iOS and speech output were not tested; Chrome lacks text-only zoom.',['gate.json','extra-report.json','zoom-report.json','native200-report.json','shots/native200-en-light-field.jpg','shots/native200-fi-dark-button.jpg']),
        item('owner-rules','pass',True,'No theme toggle, visible UUID, third-party tracker, prohibited face/name or unauthorized client claim was found on the affected pages. Appearance follows the system; assets are self-hosted except the permitted first-party sign-up integration.',['shots/fi-1440-light-font16-full.jpg','shots/en-390-dark-font24-full.jpg','review-notes.md']),
        item('web-quality','pass',True,'Fresh gate and visual/perf modules pass. Product median LCP is 1727.403 ms FI / 1727.073 ms EN under 2000 ms; CLS zero. All changed baseline files exist and compare without visual findings. The 42 gate warnings are preserved individually in the notes; none is hidden or reclassified as a new defect.',['gate.json','visual.json','perf.json','perf-summary.json','extra-report.json','review-notes.md']),
        item('plan-conformance','fail',True,'F8 contradicts the unchanged status-date requirement M1. The requested D24 place/navigation, D25 sign-up states and privacy scope, J4 fallback, and lead-decided desktop field/button row otherwise conform. F1–F7 fixes have fresh evidence.',['fix-verification.json','walk-report.json','shots/en-1440-dark-font16-first.jpg']),
        item('approved-design','pass',True,'Direction D is retained: Barlow, purple course rail/start/control/finish symbols, real window, print marks and independent product brand. Desktop button beside field is the decision supplied in this dispatch. No unexplained drift from the chosen composition was found; wording/tone is not judged.',['shots/fi-1440-light-font16-full.jpg','shots/en-390-dark-font24-full.jpg','paths-report.json']),
        item('baseline','pass',True,'48 added/modified product/privacy/work-list baselines are intentional and the fresh comparison reports no differences. Their committed hashes are inventoried for hand-off. Per the guide no baseline is approved under this failing verdict.',['visual.json','baseline-manifest.json','shots/fi-390-light-font16-privacy.jpg','shots/en-1440-dark-font16-work.jpg']),
    ],
    'findings':[{
        'id':'F8','severity':'blocking','rubric':'model','walk':'W0',
        'message':'On /ratametsuri/ and /en/ratametsuri/, the introductory status says the app is in development but shows no status checked date, in either theme or text size. M1 explicitly requires the checked date next to the status wherever the work item appears; D24 adds this page without exempting it. The linked products-list row already has checked: 2026-11-12. Render the verified checked date beside the landing-page status in each locale, ideally from the same work metadata, or obtain an explicit owner-approved model exception. This is missing status metadata, not a Finnish editorial or consent wording change.',
        'evidence':[prefix+'shots/fi-1440-light-font16-first.jpg',prefix+'shots/en-390-dark-font24-first.jpg',prefix+'shots/fi-1440-dark-font16-work.jpg',prefix+'walk-report.json','docs/design/model.md','src/_data/work.yml']
    }],
    'no_further_issues_reason':'Walked W0/W1/W3/W5 across Finnish and English product/privacy pages, 390/1440, light/dark, normal/large defaults, native validation, sending, confirmation, invalid email, rate limit, server/offline errors, retry, long addresses, no-JS/failed-script 303 recovery, all three no-JS fragments, language/navigation/trust paths, keyboard/focus, normal/reduced/mid-visit reduced motion, every native 100–200% zoom step and 320 px/text-spacing stress. Previous F1–F7 are fixed; gate/visual/perf pass, 24 long-address cells have no overflow, 32 extra axe cells have no violations, and production-origin invalid submissions return 422 with value retained. The remaining reproducible defect is M1 checked-date omission; no additional blocking or non-blocking defect was established. Finnish wording/tone, fixed consent wording, archived prototypes, the screenshot inspector and allowed skip-link warnings are excluded.',
    'model_changes':[
        {'description':'Add a bilingual independently branded hosted Ratametsuri product place and product-list navigation exception.','decision_ref':'D24'},
        {'description':'Permit the email beta-request form, shared first-party sign-up service, privacy disclosures and progressive HTML/JS return states.','decision_ref':'D25'},
        {'description':'Document email-invited Mac TestFlight beta distribution under the existing team.','decision_ref':'D26'},
    ],'baselines_approved':[],'verdict':'fail'
}
path=Path('.ds/reviews')/(ui_hash+'.defect.json')
path.write_text(json.dumps(review,indent=2)+'\n')
for r in review['rubric']:
    for e in r['evidence']: assert Path(e).is_file(),e
for f in review['findings']:
    for e in f['evidence']: assert Path(e).is_file(),e
print(str(path))
