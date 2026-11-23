// Builds index.html (fi) and en.html for direction F "Ikkuna". Run: node design/directions/ratametsuri/f/build.mjs
// If ../screens/kauppi-light.webp and kauppi-dark.webp exist they are copied into assets/ and replace the placeholder window.
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const here = dirname(fileURLToPath(import.meta.url));
const copy = JSON.parse(readFileSync(join(here, '..', 'copy2.json'), 'utf8'));
const EMAIL = 'jarkko@koivupiilo.fi', CREDIT = 'Kauppi, Tampereen Pyrintö';
const PH = { fi: 'Kuvakaappaus tulossa', en: 'Screenshot to come' };
const PRIV = { fi: '/tietosuoja/', en: '/en/privacy/' };
const FILE = { fi: 'index.html', en: 'en.html' };
const OTHER = { fi: 'en.html', en: 'index.html' };

// Soft hyphens only at the compound boundary, never changing the words.
const SHY = [['tulospalveluohjelmisto', 'tulospalvelu&shy;ohjelmisto'], ['rastimääritte', 'rasti&shy;määritte'], ['Rastimääritte', 'Rasti&shy;määritte'], ['sähköpostiosoite', 'sähköposti&shy;osoite'], ['suunnistusradat', 'suunnistus&shy;radat'], ['käyttävät samoja', 'käyttävät samoja']];
const shy = (h) => SHY.reduce((t, [a, b]) => t.split(a).join(b), h);
const esc0 = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\d) -(?=\p{L})/gu, '$1 -⁠');
const esc = (s) => shy(esc0(s));
const mail = `<a href="mailto:${EMAIL}?subject=${encodeURIComponent('Ratametsuri beta')}">${EMAIL}</a>`;
const sub = (s) => esc(s).replace('%{email}', mail);

// A critically damped spring sampled into CSS linear(): settles without overshoot.
const spring = (() => { const w = 13, pts = []; for (let i = 0; i <= 24; i++) { const t = i / 24 * 0.7; pts.push((1 - (1 + w * t) * Math.exp(-w * t)).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')); } pts[24] = '1'; return `linear(${pts.join(',')})`; })();

// ---- screen: real screenshots when present, else a marked placeholder drawn from abstract course symbols only
const shotL = join(here, '..', 'screens', 'kauppi-light.webp'), shotD = join(here, '..', 'screens', 'kauppi-dark.webp');
const real = existsSync(shotL) && existsSync(shotD);
let dims = [1600, 1000];
if (real) {
  copyFileSync(shotL, join(here, 'assets', 'kauppi-light.webp')); copyFileSync(shotD, join(here, 'assets', 'kauppi-dark.webp'));
  const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', shotL]).toString();
  dims = [+o.match(/pixelWidth: (\d+)/)[1], +o.match(/pixelHeight: (\d+)/)[1]];
}
const screen = (lang) => {
  const c = copy[lang];
  const inner = real
    ? `<picture><source media="(prefers-color-scheme: dark)" srcset="assets/kauppi-dark.webp"><img src="assets/kauppi-light.webp" width="${dims[0]}" height="${dims[1]}" alt="" fetchpriority="high"></picture>`
    : `<svg class="win-bar" viewBox="0 0 96 28" aria-hidden="true" focusable="false"><circle cx="14" cy="14" r="5.5" fill="#ff5f57"/><circle cx="32" cy="14" r="5.5" fill="#febc2e"/><circle cx="50" cy="14" r="5.5" fill="#28c840"/></svg><p class="ph"><span>${esc(PH[lang])}</span></p>`;
  return `<figure class="stage">
  <div class="win${real ? ' win--img' : ''}" role="img" aria-label="${esc0(c.screenshot_alt)}">${inner}</div>
  <figcaption>${esc(c.map_credit.replace('%{credit}', CREDIT))}</figcaption>
</figure>`;
};

const ico = '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.4v4.3M8 11.1v.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
const beta = (lang) => {
  const b = copy[lang].beta;
  return `<section class="beta" id="beta" aria-labelledby="beta-h" data-state="default" data-view="form" data-variant="plain" data-endpoint="">
  <h2 id="beta-h">${esc(b.heading)}</h2>
  <div class="beta-stack">
    <form class="beta-form" novalidate method="post" action="#beta">
      <p class="beta-lead">${esc(b.lead)}</p>
      <label class="beta-label" for="email">${esc(b.field_label)}</label>
      <div class="beta-controls">
        <input id="email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required aria-describedby="privacy" aria-invalid="false">
        <button type="submit" class="beta-btn">${esc(b.button)}</button>
      </div>
      <div class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="beta-slot">
        <p class="beta-privacy" id="privacy"><span>${esc(b.privacy_line)}</span> <a href="${PRIV[lang]}">${esc(b.privacy_link_text)}</a></p>
        <p class="msg msg--err" id="m-val">${ico}<span>${esc(b.error_validation)}</span></p>
        <p class="msg msg--err" id="m-srv">${ico}<span>${sub(b.error_server)}</span></p>
        <p class="msg msg--wait" id="m-send"><span class="dot" aria-hidden="true"></span><span>${esc(b.sending)}</span></p>
      </div>
    </form>
    <div class="beta-result" tabindex="-1">
      <p class="result" id="r-ok">${esc(b.success_plain)}</p>
      <p class="result" id="r-cf">${esc(b.success_confirm)}</p>
      <p class="result" id="r-live">${sub(b.not_live)}</p>
    </div>
  </div>
  <p class="vh" role="status" aria-live="polite" id="beta-live"></p>
</section>`;
};

const betaJs = `(()=>{const r=document.querySelector('.beta');if(!r)return;
const f=r.querySelector('form'),i=f.elements.email,hp=f.elements.website,b=f.querySelector('button'),live=document.getElementById('beta-live');
const V={'default':'form','sending':'form','error-validation':'form','error-server':'form','success':'result','not-live':'result'};
const q=new URLSearchParams(location.search),mock=q.get('mock');
function msgId(s){return s==='success'?(r.dataset.variant==='confirm'?'r-cf':'r-ok'):({'sending':'m-send','error-validation':'m-val','error-server':'m-srv','not-live':'r-live'})[s];}
function set(s,focus,variant){if(variant)r.dataset.variant=variant;r.dataset.state=s;r.dataset.view=V[s];
 i.setAttribute('aria-invalid',s==='error-validation'?'true':'false');
 const m=msgId(s);
 i.setAttribute('aria-describedby',((s==='error-validation'||s==='error-server')?m+' ':'')+'privacy');
 b.setAttribute('aria-disabled',s==='sending'?'true':'false');r.setAttribute('aria-busy',s==='sending'?'true':'false');
 const el=m&&document.getElementById(m);live.textContent=el?el.textContent.trim():'';
 if(focus){(V[s]==='result'?r.querySelector('.beta-result'):i).focus();}}
if(q.get('email'))i.value=q.get('email');
if(q.get('variant')==='confirm')r.dataset.variant='confirm';
if(V[q.get('state')])set(q.get('state'));
i.addEventListener('input',()=>{if(r.dataset.state==='error-validation'||r.dataset.state==='error-server')set('default');});
f.addEventListener('submit',async e=>{e.preventDefault();if(r.dataset.state==='sending')return;
 if(hp.value)return;
 if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(i.value.trim())){set('error-validation',true);return;}
 // prototype only: ?mock=ok|confirm|fail&delay=ms fakes the endpoint. Remove with the sign-up service wiring.
 if(mock){set('sending');await new Promise(t=>setTimeout(t,+q.get('delay')||1500));
  set(mock==='fail'?'error-server':'success',true,mock==='confirm'?'confirm':'plain');return;}
 if(!r.dataset.endpoint){set('not-live',true);return;}
 set('sending');
 try{const x=await fetch(r.dataset.endpoint,{method:'POST',body:new FormData(f)});set(x.ok?'success':'error-server',true);}catch(_){set('error-server',true);}});
})();`;

const css = `
:root{color-scheme:light dark;
 --stage:#f5f5f7;--surface:#fff;--ink:#1d1d1f;--muted:#6e6e73;--hair:rgba(0,0,0,.12);--accent:#a626a4;--on-accent:#fff;--field:#fff;--field-line:#86868b;--err:#b3261e;
 --win-bg:#fff;--win-bar:#ececec;--win-side:#f6f6f6;--win-hair:rgba(0,0,0,.14);--win-ink:#1d1d1f;--win-soft:#d9d9de;
 --sys:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro",system-ui,"Segoe UI Variable Text","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
 --ease-out:cubic-bezier(.2,.8,.2,1);--spring:cubic-bezier(.16,1,.3,1);
 --gutter:clamp(1rem,.4rem + 2.6vw,2rem);--wrap:min(100% - 2 * var(--gutter),75rem);
 --shadow:0 0 0 1px rgba(0,0,0,.12),0 2px 6px rgba(0,0,0,.06),0 24px 48px -12px rgba(0,0,0,.22),0 60px 120px -30px rgba(0,0,0,.28)}
@supports (animation-timing-function:linear(0,1)){:root{--spring:${spring}}}
@media (prefers-color-scheme:dark){:root{--stage:#1c1c1e;--surface:#2c2c2e;--ink:#f5f5f7;--muted:#a1a1a6;--hair:rgba(255,255,255,.16);--accent:#dc84da;--on-accent:#1c1c1e;--field:#2c2c2e;--field-line:#8e8e93;--err:#ff9f95;
 --win-bg:#1e1e20;--win-bar:#323234;--win-side:#262628;--win-hair:rgba(255,255,255,.14);--win-ink:#f5f5f7;--win-soft:#48484c;
 --shadow:0 0 0 1px rgba(255,255,255,.14),0 2px 6px rgba(0,0,0,.3),0 24px 48px -12px rgba(0,0,0,.6),0 60px 120px -30px rgba(0,0,0,.7)}}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--stage);color:var(--ink);font:400 1.0625rem/1.5 var(--sys);font-optical-sizing:auto;letter-spacing:-.011em;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
p,h1,h2,h3,ol,figure,dl,dd{margin:0}
a{color:inherit;text-decoration-thickness:1px;text-underline-offset:.2em}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:4px}
.vh,.hp{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hp{left:-10000px}
.skip{position:absolute;left:1rem;top:-4rem;z-index:9;padding:.6rem 1rem;background:var(--ink);color:var(--stage);border-radius:8px;text-decoration:none}
.skip:focus{top:1rem}
.bar{width:var(--wrap);margin-inline:auto;min-height:3.75rem;display:flex;align-items:center;justify-content:space-between}
.wordmark{display:flex;align-items:center;gap:.5rem;font-size:1.375rem;font-weight:600;letter-spacing:-.015em;line-height:1}
.wordmark svg{width:1.25rem;height:1.25rem;color:var(--accent);flex:none}
.lang{display:inline-flex;align-items:center;min-height:2.75rem;padding-inline:.25rem;color:var(--muted);font-size:.9375rem;text-decoration:none}
.lang:hover{color:var(--ink);text-decoration:underline}
main{display:block}
.hero{width:var(--wrap);margin-inline:auto;display:grid;gap:2rem 3rem;padding-block:1.25rem 2rem}
.headline{font-size:clamp(2.125rem,1.3rem + 3.1vw,3.5rem);font-weight:650;line-height:1.04;letter-spacing:-.034em;text-wrap:balance;hyphens:manual;overflow-wrap:break-word}
.status{margin-block-start:1.25rem;color:var(--muted);max-width:30rem;padding-inline-start:1.1rem;position:relative;text-wrap:pretty}
.status::before{content:"";position:absolute;left:0;top:.5em;width:.5rem;height:.5rem;border-radius:50%;border:2px solid var(--accent)}
.req{margin-block-end:1.25rem;padding-block-end:1.25rem;background:linear-gradient(var(--hair),var(--hair)) bottom/100% 1px no-repeat}
.req h2{font-size:.8125rem;font-weight:600;letter-spacing:.02em;text-transform:none;color:var(--muted);margin-block-end:.4rem}
.req p{font-weight:500;line-height:1.4}
.req p+p{margin-block-start:.15rem;color:var(--muted);font-weight:400}
/* the window */
.stage{width:var(--wrap);margin-inline:auto;padding-block-end:3.5rem}
.win{position:relative;aspect-ratio:16/10;box-sizing:border-box;border-radius:12px;overflow:hidden;background:var(--win-bg);box-shadow:var(--shadow);isolation:isolate}
.win--img picture,.win--img img{display:block;width:100%;height:100%}
.win--img img{object-fit:cover;object-position:var(--crop-x,0%) 50%}
.win-bar{position:absolute;left:0;top:0;width:100%;height:2.4rem;padding:0;background:var(--win-bar);box-shadow:0 1px 0 var(--win-hair);z-index:1}
.win-bar{width:auto;aspect-ratio:96/28;height:auto;position:absolute;background:none;box-shadow:none;left:.5rem;top:.5rem;height:1.5rem}
.win:not(.win--img){background:var(--win-side);display:grid;place-items:center}
.win:not(.win--img)::before{content:"";position:absolute;inset:0 0 auto;height:2.4rem;background:var(--win-bar);box-shadow:0 1px 0 var(--win-hair)}
.win:not(.win--img) .win-bar{top:.45rem;left:.65rem;z-index:1}
.ph{margin:0;font-size:1rem;font-weight:600;text-align:center}
.ph span{display:inline-block;padding:.65rem 1.1rem;background:var(--surface);color:var(--ink);border:1.5px dashed var(--muted);border-radius:10px}
figcaption{margin-block-start:.9rem;text-align:center;font-size:.8125rem;color:var(--muted)}
/* beta */
.beta{display:grid;align-content:start}
.beta h2{font-size:1.375rem;font-weight:650;letter-spacing:-.022em;line-height:1.2}
.beta-stack{display:grid;margin-block-start:.4rem}
.beta-stack>*{grid-area:1/1;min-width:0}
.beta-lead{color:var(--muted);margin-block-end:.9rem;max-width:32rem;text-wrap:pretty}
.beta-label{display:block;font-size:.875rem;font-weight:600;margin-block-end:.4rem}
.beta-controls{display:flex;flex-wrap:wrap;gap:.6rem}
.beta input[type=email]{flex:1 1 14rem;min-width:0;min-height:2.75rem;padding-inline:.9rem;font:inherit;font-size:max(1rem,1.0625rem);letter-spacing:-.011em;color:var(--ink);background:var(--field);border:1px solid var(--field-line);border-radius:10px;appearance:none;text-overflow:ellipsis}
.beta input::placeholder{color:var(--muted)}
.beta input[type=email]:focus-visible{outline:3px solid var(--accent);outline-offset:1px;border-color:var(--accent)}
.beta input[aria-invalid=true]{border-color:var(--err);box-shadow:0 0 0 1px var(--err)}
.beta-btn{flex:0 0 auto;min-height:2.75rem;padding-inline:1.35rem;font:inherit;font-weight:600;letter-spacing:-.011em;color:var(--on-accent);background:var(--accent);border:0;border-radius:10px;cursor:pointer;transition:filter 120ms var(--ease-out)}
.beta-btn:hover{filter:brightness(1.08)}
.beta-btn:active{filter:brightness(.94)}
.beta-btn[aria-disabled=true]{cursor:progress;opacity:.55}
.beta-slot{display:grid;margin-block-start:.6rem}
.beta-slot>*{grid-area:1/1;min-width:0}
.msg{display:flex;gap:.45rem;align-items:flex-start;font-size:.875rem;line-height:1.35;overflow-wrap:anywhere}
.msg--err{color:var(--err);font-weight:500}
.msg a,.result a{padding-block:12px;margin-block:-12px}
.msg .ico{flex:0 0 1.1em;width:1.1em;height:1.1em;margin-block-start:.1em}
.dot{flex:0 0 .55em;width:.55em;height:.55em;margin-block-start:.4em;border-radius:50%;background:var(--accent)}
.beta[data-state=sending] .dot{animation:pulse 900ms ease-in-out infinite}
@keyframes pulse{50%{opacity:.25}}
.beta-result{display:grid;align-content:start}
.beta-result>*{grid-area:1/1}
.beta-result:focus{outline:none}
.result{font-size:1.125rem;line-height:1.4;font-weight:500;letter-spacing:-.014em;overflow-wrap:anywhere;max-width:32rem}
.beta-form,.beta-result,.msg,.result{opacity:0;visibility:hidden;transition:opacity 180ms var(--ease-out),visibility 0s linear 180ms}
.beta[data-view=form] .beta-form,.beta[data-view=result] .beta-result,
.beta[data-state=error-validation] #m-val,.beta[data-state=error-server] #m-srv,.beta[data-state=sending] #m-send,
.beta[data-state=success][data-variant=plain] #r-ok,.beta[data-state=success][data-variant=confirm] #r-cf,.beta[data-state=not-live] #r-live{opacity:1;visibility:visible;transition-delay:0s}
.beta-privacy{font-size:.875rem;color:var(--muted);display:flex;flex-wrap:wrap;column-gap:.6rem;align-items:center}
.beta-privacy a{display:inline-flex;align-items:center;min-height:2.75rem;margin-block:-.8rem;color:var(--ink)}
.beta-privacy{opacity:0;visibility:hidden;transition:opacity 180ms var(--ease-out),visibility 0s linear 180ms}
.beta[data-state=default] .beta-privacy{opacity:1;visibility:visible;transition-delay:0s}
/* features: a course leg, four controls */
.features{width:var(--wrap);margin-inline:auto;padding-block:1rem 4.5rem;background:linear-gradient(var(--hair),var(--hair)) top/100% 1px no-repeat}
.features>h2{font-size:clamp(1.5rem,1.1rem + 1.4vw,2.25rem);font-weight:650;letter-spacing:-.03em;line-height:1.1;padding-block:3rem 2rem}
.fl{list-style:none;padding:0;display:grid;gap:2rem 2.5rem}
.fl li{position:relative;display:grid;align-content:start;gap:.25rem 1rem;grid-template-columns:2.25rem 1fr}
.fl .ring{grid-row:1/3;width:2.25rem;height:2.25rem;border:2px solid var(--accent);border-radius:50%;display:grid;place-items:center;color:var(--accent);font-weight:650;font-size:.9375rem;font-variant-numeric:tabular-nums;background:var(--stage);z-index:1}
.fl h3{font-size:1.375rem;font-weight:650;letter-spacing:-.02em;line-height:1.25;align-self:center}
.fl p{grid-column:2;color:var(--muted);hyphens:manual;overflow-wrap:break-word;text-wrap:pretty}
@media (min-width:40rem){.fl{grid-template-columns:repeat(2,1fr)}}
@media (min-width:64rem){
 .hero{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);align-items:start;padding-block:2rem 2.5rem}
 .fl{grid-template-columns:repeat(4,1fr);gap:2rem}
 .fl li{grid-template-columns:1fr;gap:.9rem}
 .fl .ring{grid-row:auto}.fl p{grid-column:auto}
 .fl li:not(:last-child)::after{content:"";position:absolute;top:1.125rem;left:2.75rem;width:calc(100% + 2rem - 3.5rem);height:2px;background:var(--accent);opacity:.55}
}
@media (max-width:39.99rem){
 .win{aspect-ratio:4/3;border-radius:10px}
 .win--img{--crop-x:100%}
 .win--img img{transform:scale(1.55);transform-origin:50% 82%}
 .stage{width:calc(100% - 1rem)}
 .hero{padding-block-end:1.5rem}
 .beta-btn{flex:1 1 100%}
}
footer{width:var(--wrap);margin-inline:auto;padding-block:1.5rem 2.5rem;border-top:1px solid var(--hair);display:flex;flex-wrap:wrap;gap:.25rem 1.25rem;align-items:center;font-size:.875rem;color:var(--muted)}
footer a{display:inline-flex;align-items:center;min-height:2.75rem;color:var(--ink)}
/* motion: the window rises once, content fades in after it */
@keyframes rise{from{opacity:0;transform:translateY(28px) scale(.965)}}
@keyframes fade{from{opacity:0}}
@media (prefers-reduced-motion:no-preference){
 .win{animation:rise 700ms var(--spring) both;transform-origin:50% 100%}
 .hero>*{animation:fade 420ms var(--ease-out) 260ms backwards}
 figcaption{animation:fade 420ms var(--ease-out) 500ms backwards}
}
@media (prefers-reduced-motion:reduce){.beta-form,.beta-result,.msg,.result,.beta-privacy{transition:none}.beta[data-state=sending] .dot{animation:none}.beta-btn{transition:none}}
`;

const page = (lang) => {
  const c = copy[lang], m = c.maker_line;
  const mark = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="8.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="10" r="4.8" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc0(c.page_title)}</title>
<meta name="description" content="${esc0(c.meta_description).replace(/"/g, '&quot;')}">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Ccircle cx=%2710%27 cy=%2710%27 r=%278.6%27 fill=%27none%27 stroke=%27%23a626a4%27 stroke-width=%271.8%27/%3E%3Ccircle cx=%2710%27 cy=%2710%27 r=%274.8%27 fill=%27none%27 stroke=%27%23a626a4%27 stroke-width=%271.8%27/%3E%3C/svg%3E">
<meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1c1e" media="(prefers-color-scheme: dark)">
<style>${css}</style>
</head>
<body>
<a class="skip" href="#main">${esc(c.skip_link)}</a>
<header class="bar">
  <h1 class="wordmark">${mark}<span>Ratametsuri</span></h1>
  <a class="lang" href="${OTHER[lang]}" hreflang="${lang === 'fi' ? 'en' : 'fi'}" lang="${lang === 'fi' ? 'en' : 'fi'}">${esc(c.lang_link)}</a>
</header>
<main id="main">
  <div class="hero">
    <div class="hero-copy">
      <h2 class="headline">${esc(c.headline)}</h2>
      <p class="status">${esc(c.status.text)}</p>
    </div>
    <div class="hero-act">
      <section class="req" aria-labelledby="req-h">
        <h2 id="req-h">${esc(c.requirements.heading)}</h2>
        <p>${esc(c.requirements.mac)}</p>
        <p>${esc(c.requirements.languages)}</p>
      </section>
      ${beta(lang)}
    </div>
  </div>
  ${screen(lang)}
  <section class="features" aria-labelledby="feat-h">
    <h2 id="feat-h">${esc(c.features_heading)}</h2>
    <ol class="fl">
${c.features.map((f, i) => `      <li><span class="ring" aria-hidden="true">${i + 1}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`).join('\n')}
    </ol>
  </section>
</main>
<footer>
  <span>${esc(m.text)}</span><span>${esc(m.business_id)}</span><a href="${PRIV[lang]}">${esc(m.privacy_link_text)}</a>
</footer>
<script>${betaJs}</script>
</body>
</html>
`;
};
for (const l of ['fi', 'en']) writeFileSync(join(here, FILE[l]), page(l));
console.log('built', real ? 'with real screenshots' : 'with placeholder window');
