// Real-network (CDP-throttled, cache disabled) first paint, LCP, CLS and final-font time on the
// preload snapshot, with the shipped preloads and with the three preload tags stripped from the HTML
// (probe only; no source change). Same server, same files, so the only difference is the preload.
import { createRequire } from "node:module";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const BASE = process.env.BASE;
const profiles = {
  "400kbps-150ms": { latency: 150, down: 400 * 1024 / 8, up: 750000 / 8 },
  "1.6Mbps-150ms": { latency: 150, down: 1.6 * 1024 * 1024 / 8, up: 750 * 1024 / 8 },
};
const N = +(process.env.N || 5);
const b = await chromium.launch(); const rows = [];
for (const route of (process.env.ROUTES || "/,/fi/,/portfolio/").split(",")) for (const [pn, pr] of Object.entries(profiles)) for (const variant of ["preload", "no-preload"]) {
  const vals = [];
  for (let i = 0; i < N; i++) {
    const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    await p.addInitScript(() => {
      window.__m = { cls: 0, lcp: 0, fcp: 0 };
      new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.name === "first-contentful-paint") window.__m.fcp = e.startTime; }).observe({ type: "paint", buffered: true });
      new PerformanceObserver(l => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    });
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Network.enable"); await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: pr.latency, downloadThroughput: pr.down, uploadThroughput: pr.up });
    const done = {};
    cdp.on("Network.loadingFinished", e => { done[e.requestId] = e.timestamp; });
    const urls = {};
    cdp.on("Network.requestWillBeSent", e => { urls[e.requestId] = { url: e.request.url, t: e.timestamp }; });
    if (variant === "no-preload") await p.route(u => u.pathname === route || u.pathname === route + "index.html", async r => {
      const res = await r.fetch(); const body = (await res.text()).replace(/<link rel="preload"[^>]*as="font"[^>]*>\n?/g, "");
      await r.fulfill({ response: res, body });
    });
    await p.goto(BASE + route, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
    const m = await p.evaluate(() => window.__m);
    const nav = Object.values(urls).find(u => u.url === BASE + route)?.t;
    const fin = k => { const id = Object.keys(urls).find(i => urls[i].url.includes(k)); return id && done[id] ? Math.round((done[id] - nav) * 1000) : null; };
    vals.push({ fcp: Math.round(m.fcp), lcp: Math.round(m.lcp), cls: +m.cls.toFixed(4), css_done: fin(".css"), last_font_done: Math.max(...Object.keys(urls).filter(i => /\.woff2$/.test(urls[i].url)).map(i => done[i] ? Math.round((done[i] - nav) * 1000) : 0)) });
    await ctx.close();
  }
  const med = k => { const s = vals.map(v => v[k]).sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
  rows.push({ route, profile: pn, variant, median: { fcp: med("fcp"), lcp: med("lcp"), cls: med("cls"), css_done: med("css_done"), last_font_done: med("last_font_done") }, max_cls: Math.max(...vals.map(v => v.cls)), runs: vals });
  console.error(route, pn, variant, JSON.stringify(rows.at(-1).median), "maxCLS", rows.at(-1).max_cls);
}
await b.close(); console.log(JSON.stringify(rows, null, 1));
