// Per route: font requests (URL, count, preload or CSS initiated), console warnings
// (incl. "preloaded but not used"), faces rendered, and whether each preloaded face is used.
import { createRequire } from "node:module";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const BASE = process.env.BASE;
const routes = ["/", "/about/", "/portfolio/", "/services/", "/contact/", "/blog/",
  "/services/technical-consulting/", "/services/sports-coaching/", "/services/personal-development/",
  "/fi/", "/fi/tietoa/", "/fi/portfolio/", "/fi/palvelut/", "/fi/yhteystiedot/",
  "/updates/welcome-to-bridgetown/", "/404.html", "/500.html"];
const b = await chromium.launch(); const out = {};
for (const r of routes) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p); await cdp.send("Network.enable"); await cdp.send("Log.enable");
  const reqs = {}; const logs = []; const fails = []; const ext = [];
  cdp.on("Network.requestWillBeSent", e => {
    if (!e.request.url.startsWith(BASE)) ext.push(e.request.url);
    if (/\.woff2?$/.test(e.request.url)) {
      const k = e.request.url.replace(BASE, "");
      reqs[k] = reqs[k] || { n: 0, initiator: [], priority: e.request.initialPriority };
      reqs[k].n++; reqs[k].initiator.push(e.initiator.type + (e.initiator.url ? ":" + e.initiator.url.replace(BASE, "") : ""));
    }
  });
  cdp.on("Network.loadingFailed", e => fails.push(e.errorText));
  cdp.on("Log.entryAdded", e => logs.push(`${e.entry.level}: ${e.entry.text}`));
  p.on("console", m => logs.push(`console.${m.type()}: ${m.text()}`));
  await p.goto(BASE + r, { waitUntil: "networkidle" });
  await p.waitForTimeout(3500); // Chrome logs unused-preload warnings ~3 s after load
  const faces = await p.evaluate(() => {
    const acc = {};
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) {
      const t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || !el.getClientRects().length) continue;
      const fam = s.fontFamily.includes("Serif") ? "PT Serif" : "PT Sans"; const w8 = +s.fontWeight >= 600 ? 700 : 400;
      const k = `${fam} ${w8} ${s.fontStyle}`; acc[k] = (acc[k] || 0) + t.length;
    }
    const loaded = [...document.fonts].filter(f => f.status === "loaded").map(f => `${f.family} ${f.weight} ${f.style} ${f.unicodeRange.slice(0, 12)}`);
    return { acc, loaded };
  });
  out[r] = { fontRequests: reqs, duplicateFetches: Object.entries(reqs).filter(([, v]) => v.n > 1).map(([k]) => k),
    faces: faces.acc, loadedFaces: faces.loaded,
    preloadWarnings: logs.filter(l => /preload/i.test(l)), consoleErrors: logs.filter(l => /^(error|console\.error)/.test(l)),
    failed: fails, external: ext };
  await ctx.close();
}
await b.close();
const sum = {};
for (const [r, v] of Object.entries(out)) sum[r] = { files: Object.keys(v.fontRequests).length, dup: v.duplicateFetches.length,
  preloadWarn: v.preloadWarnings.length, err: v.consoleErrors.length, failed: v.failed.length, ext: v.external.length,
  usesSerif400: !!v.faces["PT Serif 400 normal"], usesSans700: !!v.faces["PT Sans 700 normal"], usesSans400: !!v.faces["PT Sans 400 normal"] };
console.log(JSON.stringify({ summary: sum, routes: out }, null, 1));
