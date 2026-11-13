// Font-swap CLS probe: blocked fonts (what design/spike renders in the ds container, Google Fonts
// blocked by allow_origins = []), current self-hosted fonts, and current + preload of the four latin faces.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const BASE = "http://127.0.0.1:4719";
const css = fs.readFileSync("/tmp/kit-adopt-font-review-site/_bridgetown/static/index.LNRWDYOH.css", "utf8");
const latin = [...new Set(css.match(/pt-(?:sans|serif)-latin-(?:400|700)-normal-[A-Z0-9]+\.woff2/g))];
const preload = latin.map((f) => `<link rel="preload" href="/_bridgetown/static/${f}" as="font" type="font/woff2" crossorigin>`).join("");
const out = [];
const browser = await chromium.launch();
for (const route of ["/", "/portfolio/", "/services/", "/fi/"]) {
  for (const variant of ["fonts-blocked", "current", "current+preload"]) {
    const vals = [];
    for (let i = 0; i < 3; i++) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "fi-FI" });
      const page = await ctx.newPage();
      await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
      if (variant === "fonts-blocked") await page.route(/\.woff2?$/, (r) => r.abort());
      if (variant === "current+preload") await page.route((u) => u.pathname === route || u.pathname === route + "index.html", async (r) => { const res = await r.fetch(); const body = (await res.text()).replace("<head>", "<head>" + preload); await r.fulfill({ response: res, body }); });
      await page.goto(BASE + route, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(800);
      vals.push(await page.evaluate(() => window.__cls));
      await ctx.close();
    }
    out.push({ route, variant, cls: vals.map((v) => Math.round(v * 1000) / 1000) });
  }
}
await browser.close();
console.log(JSON.stringify({ preloaded: latin, results: out }, null, 1));
