// Design sandbox build: renders directions a/b/c × fi/en × 4 pages into design/out/, plus a comparison board.
// Serve design/out/ as web root (assets are absolute /assets/...). `node design/build.mjs && npx serve design/out`
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, pages, langs, esc } from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'out');
const dirs = ['a', 'b', 'c'];
const mods = Object.fromEntries(await Promise.all(dirs.map(async (d) => [d, await import(`./directions/${d}.mjs`)])));

rmSync(out, { recursive: true, force: true });
cpSync(join(here, 'assets'), join(out, 'assets'), { recursive: true, filter: (p) => !p.endsWith('PROVENANCE.md') });

cpSync(join(here, 'comps'), join(out, 'comps'), { recursive: true });
cpSync(join(here, 'boards'), join(out, 'boards'), { recursive: true });
const write = (path, html) => { const f = join(out, path, 'index.html'); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
const list = [];
for (const d of dirs) for (const lang of langs) for (const key of pages) {
  write(`/${d}${routes[lang][key]}`, mods[d].render(`/${d}`, lang, key));
  list.push(`/${d}${routes[lang][key]}`);
}
writeFileSync(join(out, 'routes.json'), JSON.stringify(list, null, 2));

// Comparison board: three iframes side by side, one page/language selector drives all of them.
const metas = dirs.map((d) => ({ id: d, ...mods[d].meta }));
const opts = langs.flatMap((l) => pages.map((k) => `<option value="${routes[l][k]}">${l.toUpperCase()} · ${k}</option>`)).join('');
writeFileSync(join(out, 'index.html'), `<!doctype html><html lang="fi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><title>Koivupiilo · three directions</title>
<style>
:root{--bg:#f4f4f2;--ink:#151515;--muted:#5d5d5a;--rule:#d9d9d4;--card:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#121212;--ink:#ededea;--muted:#a3a39e;--rule:#2c2c2a;--card:#1b1b1a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,-apple-system,sans-serif}
header{display:flex;flex-wrap:wrap;gap:1rem 2rem;align-items:center;padding:16px 20px;border-bottom:1px solid var(--rule)}
h1{font-size:1rem;margin:0}select,label{font:inherit}select{padding:.35rem .5rem;border-radius:6px;border:1px solid var(--rule);background:var(--card);color:var(--ink)}
.cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:16px 20px}
.col h2{font-size:1rem;margin:0 0 .25rem}.col p{margin:0 0 .6rem;color:var(--muted);min-height:3.6em}.col a{color:inherit}
.frame{width:100%;height:calc(100vh - 210px);min-height:520px;border:1px solid var(--rule);border-radius:10px;background:var(--card)}
.sw{display:inline-flex;gap:4px;vertical-align:middle;margin-left:.4rem}.sw i{width:14px;height:14px;border-radius:3px;border:1px solid var(--rule)}
@media (max-width:900px){.cols{grid-template-columns:1fr}.frame{height:80vh}}
</style></head><body>
<header><h1>Koivupiilo: kolme suuntaa / three directions</h1>
<label>Sivu / page <select id="pg">${opts}</select></label>
<span style="color:var(--muted)">Vaalea ja tumma seuraavat järjestelmää. Light and dark follow the system.</span></header>
<div class="cols">${metas.map((m) => `<div class="col"><h2>${m.id.toUpperCase()} · ${esc(m.name)} / ${esc(m.nameEn)}<span class="sw">${['light', 'dark'].map((s) => `<i style="background:${Object.values(m.colors[s])[0]}"></i>`).join('')}</span></h2>
<p>${esc(m.pitch.fi)}</p><a href="/${m.id}/" target="_blank" rel="noopener">Avaa koko ikkunaan ↗</a>
<iframe class="frame" data-d="${m.id}" src="/${m.id}/" title="${esc(m.name)}"></iframe></div>`).join('')}</div>
<script>document.getElementById('pg').addEventListener('change',e=>{document.querySelectorAll('iframe').forEach(f=>f.src='/'+f.dataset.d+e.target.value)})</script>
</body></html>`);
console.log(`built ${list.length} pages → ${out}`);
