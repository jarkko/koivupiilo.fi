// Ratametsuri landing: three static design directions (a, b, c), fi + en.
// Usage: node design/directions/ratametsuri/build.mjs   (needs a built site in output/ for the header and footer)
// Writes {a,b,c}/index.html and {a,b,c}/en.html. Site CSS and font are copies in shared/.
// Form states: add ?state=default|sending|success|error-validation|error-server|not-live and optionally ?email=...
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..', '..');
const copy = JSON.parse(readFileSync(join(here, 'copy.json'), 'utf8'));
const EMAIL = 'jarkko@koivupiilo.fi';
const PLACEHOLDER = { fi: 'Ratametsuri-ikkuna: kuvakaappaus tulossa', en: 'Ratametsuri window: screenshot to come' };
const OTHER = { fi: 'en.html', en: 'index.html' };
const ENDPOINT = ''; // not deployed (D25): empty means the "not live yet" state, never a fake success

// ---- site chrome, lifted from the production build so the page sits in the real header and footer
const site = {
  fi: readFileSync(join(root, 'output/tyot/index.html'), 'utf8'),
  en: readFileSync(join(root, 'output/en/work/index.html'), 'utf8'),
};
const slice = (h, a, b) => { const i = h.indexOf(a); return h.slice(i, h.indexOf(b, i) + b.length); };
const chrome = (lang) => {
  // only the language links change
  let head = slice(site[lang], '<header class="site-head">', '</header>');
  let foot = slice(site[lang], '<footer class="site-foot">', '</footer>');
  head = head.replace(/<li class="lang"><a href="[^"]*"/, `<li class="lang"><a href="${OTHER[lang]}"`);
  foot = foot.replace(/(<ul class="foot-links">[\s\S]*?<li><a href=")\/(?:en\/work|tyot)\/"/, `$1${OTHER[lang]}"`);
  return { head, foot };
};
const arriveScript = readFileSync(join(root, 'output/tyot/index.html'), 'utf8').match(/<script>try\{var n=performance[\s\S]*?<\/script>/)[0];

// A space before a Finnish -compound suffix ("2024 -symboleilla") becomes a no-break space so the hyphen never starts a line.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\d) -(?=\p{L})/gu, '$1\u00a0-\u2060');
const mail = (lang, label = EMAIL) => `<a href="mailto:${EMAIL}?subject=${encodeURIComponent('Ratametsuri beta')}">${label}</a>`;
const sub = (s, lang) => esc(s).replace('%{email}', mail(lang));

// ---- shared: placeholder frame
const frame = (lang, cls) => `<figure class="${cls}">
  <div class="ph" role="img" aria-label="${esc(PLACEHOLDER[lang])}"><p class="ph-text"><span>${esc(PLACEHOLDER[lang])}</span></p></div>
</figure>`;

const ico = '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.4v4.3M8 11.1v.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

// ---- shared: the beta request block. Heading class and wrapper class differ per direction.
const beta = (lang, o = {}) => {
  const b = copy[lang].beta;
  return `<section class="beta ${o.cls || ''}" id="beta" aria-labelledby="beta-h" data-state="default" data-view="form" data-endpoint="${ENDPOINT}">
  <h2 id="beta-h" class="${o.h || 'beta-h'}">${esc(b.heading)}</h2>
  <div class="beta-main${o.main ? ' ' + o.main : ''}">
    <div class="beta-stack">
      <form class="beta-form" novalidate method="post" action="#beta">
        <p class="beta-lead">${esc(b.lead)}</p>
        <div class="beta-field">
          <label class="beta-label" for="email">${esc(b.field_label)}</label>
          <div class="beta-controls">
            <input id="email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required aria-describedby="privacy" aria-invalid="false">
            <button type="submit" class="beta-btn">${esc(b.button)}</button>
          </div>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="beta-msgs">
          <p class="msg msg--err" id="m-val">${ico}<span>${esc(b.error_validation)}</span></p>
          <p class="msg msg--err" id="m-srv">${ico}<span>${sub(b.error_server, lang)}</span></p>
          <p class="msg msg--wait" id="m-send"><span class="dot" aria-hidden="true"></span><span>${esc(b.sending)}</span></p>
        </div>
      </form>
      <div class="beta-result" tabindex="-1">
        <p class="result result--ok" id="r-ok">${esc(b.success)}</p>
        <p class="result result--live" id="r-live">${sub(b.not_live, lang)}</p>
      </div>
    </div>
    <p class="beta-privacy" id="privacy"><span>${esc(b.privacy_line)}</span> <a href="/tietosuoja/">${esc(b.privacy_link_text)}</a></p>
    <p class="vh beta-live" role="status" aria-live="polite"></p>
  </div>
</section>`;
};

const betaJs = `(()=>{const r=document.querySelector('.beta');if(!r)return;
const f=r.querySelector('form'),i=f.elements.email,hp=f.elements.website,b=f.querySelector('button'),live=r.querySelector('.beta-live');
const V={'default':'form','sending':'form','error-validation':'form','error-server':'form','success':'result','not-live':'result'};
const M={'sending':'m-send','error-validation':'m-val','error-server':'m-srv','success':'r-ok','not-live':'r-live'};
function set(s,focus){r.dataset.state=s;r.dataset.view=V[s];
 i.setAttribute('aria-invalid',s==='error-validation'?'true':'false');
 i.setAttribute('aria-describedby',((s==='error-validation'||s==='error-server')?M[s]+' ':'')+'privacy');
 b.setAttribute('aria-disabled',s==='sending'?'true':'false');r.setAttribute('aria-busy',s==='sending'?'true':'false');
 const m=M[s]&&document.getElementById(M[s]);live.textContent=m?m.textContent.trim():'';
 if(focus){(V[s]==='result'?r.querySelector('.beta-result'):i).focus();}}
const q=new URLSearchParams(location.search);if(q.get('email'))i.value=q.get('email');
if(V[q.get('state')])set(q.get('state'));
i.addEventListener('input',()=>{if(r.dataset.state==='error-validation'||r.dataset.state==='error-server')set('default');});
f.addEventListener('submit',async e=>{e.preventDefault();if(r.dataset.state==='sending')return;
 if(hp.value)return;
 if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(i.value.trim())){set('error-validation',true);return;}
 if(!r.dataset.endpoint){set('not-live',true);return;}
 set('sending');
 try{const x=await fetch(r.dataset.endpoint,{method:'POST',body:new FormData(f)});set(x.ok?'success':'error-server',true);}catch(_){set('error-server',true);}});
})();`;

// ---- shared form mechanics. Directions set the look through custom properties.
const betaCss = `
:root{--op:#a626a4;--op-fg:#fff;--err:#a8281e;--ring:var(--accent);
  --t-state:160ms;--e-state:cubic-bezier(.2,.7,.1,1);--t-msg:160ms}
@media (prefers-color-scheme:dark){:root{--op:#dc84da;--op-fg:#121210;--err:#f2988c}}
.vh,.hp{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hp{left:-10000px}
.beta-stack{display:grid}
.beta-stack>*{grid-area:1/1;min-width:0}
.beta-msgs{display:grid;margin-block-start:var(--sp-2)}
.beta-msgs>*{grid-area:1/1}
.beta-result{display:grid;align-content:start}
.beta-result>*{grid-area:1/1}
.beta-result:focus{outline:none}
/* every candidate is laid out, only one is visible: the block never changes height between states */
.beta-form,.beta-result,.msg,.result{opacity:0;visibility:hidden;transition:opacity var(--t-state) var(--e-state),visibility 0s linear var(--t-state)}
.beta[data-view=form] .beta-form,.beta[data-view=result] .beta-result,
.beta[data-state=error-validation] #m-val,.beta[data-state=error-server] #m-srv,.beta[data-state=sending] #m-send,
.beta[data-state=success] #r-ok,.beta[data-state=not-live] #r-live{opacity:1;visibility:visible;transition-delay:0s}
.beta-lead{max-width:var(--measure)}
.beta-label{display:block;font-size:var(--fs-meta);font-weight:var(--w-strong);margin-block-end:var(--sp-2)}
.beta-controls{display:flex;flex-wrap:wrap;gap:var(--sp-3)}
.beta input[type=email]{flex:1 1 15rem;min-width:0;min-height:var(--f-h,2.75rem);padding-inline:var(--sp-4);
  font:inherit;font-size:max(1rem,var(--fs-body));color:var(--ink);background:var(--field,var(--paper));
  border:1px solid var(--ink);border-radius:var(--f-radius,var(--radius));appearance:none;text-overflow:ellipsis}
.beta input[type=email]::placeholder{color:var(--muted)}
.beta input[aria-invalid=true]{border-color:var(--err);box-shadow:0 0 0 1px var(--err)}
.beta-btn{flex:0 0 auto;min-height:var(--f-h,2.75rem);min-width:var(--target);padding-inline:var(--sp-5);font:inherit;font-weight:var(--w-strong);
  color:var(--btn-fg,var(--paper));background:var(--btn-bg,var(--ink));border:1px solid var(--btn-bg,var(--ink));border-radius:var(--f-radius,var(--radius));cursor:pointer;
  transition:background-color var(--link-time)}
.beta-btn[aria-disabled=true]{cursor:progress;opacity:.55}
.beta input:focus-visible,.beta-btn:focus-visible,.beta-privacy a:focus-visible{outline:var(--focus) solid var(--ring);outline-offset:var(--focus-offset)}
.msg{display:flex;gap:var(--sp-2);align-items:flex-start;font-size:var(--fs-meta);line-height:var(--lh-small);overflow-wrap:anywhere}
.msg--err{color:var(--err);font-weight:var(--w-medium)}
.msg a,.result a{color:inherit;padding-block:12px;margin-block:-12px}
.msg .ico{flex:0 0 1.1em;width:1.1em;height:1.1em;margin-block-start:.12em}
.dot{flex:0 0 .55em;width:.55em;height:.55em;margin-block-start:.4em;border-radius:50%;background:var(--ink)}
.beta[data-state=sending] .dot{animation:pulse 900ms ease-in-out infinite}
@keyframes pulse{50%{opacity:.25}}
.result{font-size:var(--fs-large);line-height:var(--lh-large);letter-spacing:var(--ls-large);max-width:var(--measure);font-weight:var(--w-medium)}
.result a{overflow-wrap:anywhere}
.beta-privacy{display:flex;flex-wrap:wrap;align-items:center;column-gap:var(--sp-3);margin-block-start:var(--sp-2);font-size:var(--fs-meta);color:var(--muted)}
.beta-privacy a{display:inline-flex;align-items:center;min-height:var(--target);min-width:var(--target);color:var(--ink)}
.beta-btn{}
@media (max-width:43.99rem){.beta-btn{flex:1 1 100%}}
@media (prefers-reduced-motion:reduce){
  .beta-form,.beta-result,.msg,.result{transition:none}
  .beta[data-state=sending] .dot{animation:none}
  .beta-btn{transition:none}}
`;

// ---- placeholder frame: dashed, hatched, labelled. Never a drawn UI.
const phCss = `
.ph{position:relative;aspect-ratio:16/10;display:grid;place-items:center;padding:var(--sp-4);
  border:2px dashed var(--muted);border-radius:var(--ph-radius,var(--radius));
  background:repeating-linear-gradient(135deg,transparent 0 9px,color-mix(in srgb,var(--ink) 13%,transparent) 9px 10px)}
.ph-text{max-width:22rem;text-align:center;text-wrap:balance;font-size:var(--fs-meta);font-weight:var(--w-medium);line-height:var(--lh-small)}
.ph-text span{display:inline;padding:var(--sp-2) var(--sp-3);background:var(--paper);box-decoration-break:clone;-webkit-box-decoration-break:clone;line-height:2}
`;

const dirs = {};

// =========================================================================================
// A  The screen is the pitch
// =========================================================================================
dirs.a = {
  css: `
:root{--stage:#ebe8e0;--field:#fff;--ring:var(--accent);--f-h:3.5rem;--f-radius:10px;--ph-radius:12px;--a-name:clamp(2.25rem,1.4rem + 3.6vw,4rem)}
@media (prefers-color-scheme:dark){:root{--stage:#1b1b18;--field:#1b1b18}}
${phCss}
.a-hero{display:grid;gap:var(--sp-3) var(--sp-6);width:min(100%,calc((100svh - 12.5rem) * 1.6));padding-block:var(--sp-4) var(--sp-5)}
.a-name{font-size:var(--a-name);font-weight:var(--w-display);line-height:var(--lh-display);letter-spacing:var(--ls-display)}
.a-lead{max-width:30rem}
.a-lead .lede{font-size:var(--fs-large);line-height:var(--lh-large);letter-spacing:var(--ls-large)}
.a-status{margin-block-start:var(--sp-1);color:var(--muted);font-size:var(--fs-meta)}
.a-stage{width:min(100%,calc((100svh - 12.5rem) * 1.6));min-width:min(100%,20rem)}
.a-stage .ph{background-color:var(--stage)}
.beta--a{display:grid;gap:var(--sp-4) var(--sp-7);padding-block:var(--sp-6) var(--sp-section)}
.beta--a .beta-h{font-size:var(--fs-lede);line-height:var(--lh-lede);letter-spacing:var(--ls-lede);font-weight:var(--w-display);max-width:14ch}
.beta--a .beta-lead{margin-block-end:var(--sp-4);color:var(--muted)}
.beta--a .beta-btn{min-width:9rem}
.a-facts{padding-block:var(--sp-5) var(--sp-section);border-block-start:var(--hair) solid var(--ink)}
.a-facts h2{font-size:var(--fs-meta);font-weight:var(--w-strong);margin-block-end:var(--sp-5)}
.a-list{display:grid;gap:var(--sp-5) var(--sp-6)}
.a-list li{font-size:var(--fs-large);line-height:var(--lh-large);letter-spacing:var(--ls-large);font-weight:var(--w-medium);max-width:24rem}
.a-req{margin-block-start:var(--sp-6);color:var(--muted);max-width:var(--measure)}
@media (min-width:44rem){
  .a-hero{grid-template-columns:minmax(0,1fr) minmax(0,26rem);align-items:end;padding-block:var(--sp-3) var(--sp-5)}
  .a-list{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (min-width:62rem){
  .beta--a{grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);align-items:start}
  .a-list{grid-template-columns:repeat(4,minmax(0,1fr))}
}
@media (prefers-reduced-motion:no-preference){
  .a-stage{animation:a-reveal 800ms var(--grow-ease) 250ms backwards}
  @keyframes a-reveal{from{clip-path:inset(0 0 100% 0);opacity:.0}to{clip-path:inset(0);opacity:1}}
}`,
  main: (lang) => {
    const c = copy[lang];
    return `<section class="a-hero">
  <h1 class="a-name">${esc(c.name)}</h1>
  <div class="a-lead"><p class="lede">${esc(c.intro)}</p><p class="a-status">${esc(c.status)}</p></div>
</section>
${frame(lang, 'a-stage')}
${beta(lang, { cls: 'beta--a' })}
<section class="a-facts" aria-labelledby="facts-h">
  <h2 id="facts-h">${esc(c.features_heading)}</h2>
  <ul class="a-list">${c.features.map((f) => `<li>${esc(f)}</li>`).join('\n')}</ul>
  <p class="a-req">${esc(c.requirements)}</p>
</section>`;
  },
};

// =========================================================================================
// B  A control-description sheet
// =========================================================================================
const tri = '<svg class="sym" viewBox="0 0 28 28" aria-hidden="true" focusable="false"><path d="M14 3.5 25 23H3Z" fill="var(--paper)" stroke="var(--op)" stroke-width="2.4" stroke-linejoin="miter"/></svg>';
const circ = '<svg class="sym" viewBox="0 0 28 28" aria-hidden="true" focusable="false"><circle cx="14" cy="14" r="10.5" fill="var(--paper)" stroke="var(--op)" stroke-width="2.4"/></svg>';
const fin = '<svg class="sym" viewBox="0 0 28 28" aria-hidden="true" focusable="false"><circle cx="14" cy="14" r="12" fill="var(--paper)" stroke="var(--op)" stroke-width="2.4"/><circle cx="14" cy="14" r="7" fill="none" stroke="var(--op)" stroke-width="2.4"/></svg>';

dirs.b = {
  css: `
:root{--f-radius:0px;--ph-radius:0px;--btn-bg:var(--op);--btn-fg:var(--op-fg);--ring:var(--op);--field:var(--paper);--f-h:2.75rem;--sym-col:3.25rem;--cell-x:var(--sp-3);--cell-y:.625rem}
${phCss}
.b-wrap{display:grid;gap:var(--sp-5);padding-block:var(--sp-2) var(--sp-section);align-items:start}
.b-screen .ph{border-color:var(--ink)}
.b-sheet{border:1px solid var(--ink);font-size:var(--fs-meta);line-height:1.45}
.b-row{position:relative;display:grid;grid-template-columns:var(--sym-col) minmax(0,1fr);border-block-start:1px solid var(--ink)}
.b-row:first-child{border-block-start:0}
.b-sym{position:relative;border-inline-end:1px solid var(--ink)}
.b-sym::before{content:"";position:absolute;inset-block:0;inset-inline-start:calc(50% - 1px);width:2px;background:var(--op);transform-origin:top}
.b-sym .sym{position:relative;display:block;width:1.75rem;height:1.75rem;margin:calc(var(--cell-y) + .1rem) auto 0}
.b-row--start .b-sym::before{inset-block-start:calc(var(--cell-y) + 1rem)}
.b-row--end .b-sym::before{inset-block-end:auto;height:calc(var(--cell-y) + 1rem)}
.b-row--end .b-sym .sym{margin-top:calc(var(--cell-y) + .1rem - 2px)}
.b-cell{padding:var(--cell-y) var(--cell-x);min-width:0}
.b-cell p{max-width:var(--measure)}
.b-cell--title{padding-block:.8rem 1rem}
.b-name{font-size:clamp(2rem,1.2rem + 3vw,3rem);font-weight:var(--w-display);line-height:1;letter-spacing:var(--ls-display);margin-block-end:var(--sp-2)}
.b-intro{font-size:var(--fs-body);font-weight:var(--w-medium);line-height:1.35}
.b-feat{font-size:var(--fs-meta);font-weight:var(--w-medium)}
.b-note{color:var(--muted)}
.b-note--status{color:var(--ink);font-weight:var(--w-strong)}
.b-cell--finish{padding-block:.55rem var(--sp-4)}
.beta--b .beta-h{font-size:var(--fs-body);font-weight:var(--w-strong);line-height:1.5rem;margin-block-end:var(--sp-2)}
.beta--b .beta-lead{margin-block-end:var(--sp-3)}
.beta--b .beta-controls{display:grid;gap:var(--sp-2)}
.beta--b .beta-btn{width:100%}
.beta--b .beta-label{margin-block-end:var(--sp-1)}
.beta--b .beta-msgs{min-height:0}
@media (min-width:62rem){
  .b-wrap{grid-template-columns:minmax(0,3fr) minmax(24rem,2fr);gap:var(--sp-6)}
  .b-screen{position:sticky;inset-block-start:var(--sp-4)}
}
/* the course is laid once: legs draw from the start down, each row after the last */
@media (prefers-reduced-motion:no-preference){
  .b-sym::before{animation:b-leg 520ms var(--grow-ease) calc(150ms + var(--i,0) * 160ms) backwards}
  .b-sym .sym{animation:b-ctl 300ms ease-out calc(150ms + var(--i,0) * 160ms) backwards}
  .b-screen{animation:b-screen 360ms ease-out 150ms backwards}
  @keyframes b-leg{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  @keyframes b-ctl{from{opacity:0}to{opacity:1}}
  @keyframes b-screen{from{opacity:0}to{opacity:1}}
}`,
  main: (lang) => {
    const c = copy[lang];
    const f = c.features;
    return `<div class="b-wrap">
${frame(lang, 'b-screen')}
<div class="b-sheet">
  <div class="b-row b-row--start" style="--i:0"><div class="b-sym">${tri}</div><div class="b-cell b-cell--title"><h1 class="b-name">${esc(c.name)}</h1><p class="b-intro">${esc(c.intro)}</p></div></div>
  <div class="b-row" style="--i:1"><div class="b-sym" aria-hidden="true"></div><h2 class="b-cell b-note">${esc(c.features_heading)}</h2></div>
  ${f.map((t, n) => `<div class="b-row" style="--i:${n + 2}"><div class="b-sym" aria-hidden="true">${circ}</div><p class="b-cell b-feat">${esc(t)}</p></div>`).join('\n  ')}
  <div class="b-row" style="--i:6"><div class="b-sym" aria-hidden="true"></div><p class="b-cell b-note">${esc(c.requirements)}</p></div>
  <div class="b-row" style="--i:7"><div class="b-sym" aria-hidden="true"></div><p class="b-cell b-note b-note--status">${esc(c.status)}</p></div>
  <div class="b-row b-row--end" style="--i:8"><div class="b-sym" aria-hidden="true">${fin}</div><div class="b-cell b-cell--finish">${beta(lang, { cls: 'beta--b' })}</div></div>
</div>
</div>`;
  },
};

// =========================================================================================
// C  One more row in the register
// =========================================================================================
dirs.c = {
  css: `
:root{--f-h:3rem;--ring:var(--accent)}
${phCss}
.c-intro{padding-block-end:var(--sp-6)}
.c-status{font-size:var(--fs-meta);font-weight:var(--w-medium);color:var(--muted)}
.row--shot .row-body{grid-column:1}
.row--shot .ph{border-width:1px}
.row--shot .c-shot{max-width:44rem}
.c-req{color:var(--muted);font-size:var(--fs-meta)}
.row .beta-h{font-size:var(--fs-meta);font-weight:var(--w-strong);line-height:var(--lh-small)}
.beta--c .beta-controls{flex-wrap:wrap}
.beta--c .beta-lead{margin-block-end:var(--sp-3)}
.beta--c .beta-field{max-width:34rem}
@container (min-width:32rem){.beta--c .beta-controls{flex-wrap:nowrap}}
@media (min-width:62rem){.row--shot .row-body{grid-column:2}}
@media (prefers-reduced-motion:no-preference){
  .arrive .row--shot .ph{animation:c-reveal 240ms ease-out 150ms backwards}
  @keyframes c-reveal{from{opacity:0}to{opacity:1}}
}`,
  main: (lang) => {
    const c = copy[lang];
    return `<section class="intro c-intro">
  <h1 class="display">${esc(c.name)}</h1>
  <p class="lede">${esc(c.intro)}</p>
  <p class="c-status">${esc(c.status)}</p>
</section>
<section class="row row--shot" aria-label="${esc(PLACEHOLDER[lang])}">
  <div class="row-body">${frame(lang, 'c-shot')}</div>
</section>
<section class="row" aria-labelledby="feat-h">
  <h2 class="row-label" id="feat-h">${esc(c.features_heading)}</h2>
  <div class="row-body">
    <ul class="plain-list">${c.features.map((f) => `<li>${esc(f)}</li>`).join('\n')}</ul>
    <p class="c-req">${esc(c.requirements)}</p>
  </div>
</section>
${beta(lang, { cls: 'row beta--c', h: 'row-label beta-h', main: 'row-body' })}`;
  },
};

// ---- page assembly
const page = (id, lang) => {
  const c = copy[lang];
  const { head, foot } = chrome(lang);
  const d = dirs[id];
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <title>${esc(c.page_title)}</title>
    <meta name="description" content="${esc(c.meta_description)}">
    <meta name="robots" content="noindex">
    <link rel="preload" href="../shared/hanken-grotesk-latin-400-650-I2QHATHG.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="icon" href="data:,">
    <link rel="stylesheet" href="../shared/site.css">
    ${arriveScript}
    <style>${betaCss}${d.css}</style>
  </head>
  <body>
    <a class="skip" href="#main">${lang === 'fi' ? 'Siirry sisältöön' : 'Skip to content'}</a>
    <div class="page">
      <div class="trunk" aria-hidden="true"></div>
      <div class="page-body">
        ${head}
        <main id="main" tabindex="-1">
${d.main(lang)}
        </main>
        ${foot}
      </div>
    </div>
    <script>${betaJs}</script>
  </body>
</html>
`;
};

for (const id of Object.keys(dirs)) {
  writeFileSync(join(here, id, 'index.html'), page(id, 'fi'));
  writeFileSync(join(here, id, 'en.html'), page(id, 'en'));
}
console.log('built', Object.keys(dirs).join(','));
