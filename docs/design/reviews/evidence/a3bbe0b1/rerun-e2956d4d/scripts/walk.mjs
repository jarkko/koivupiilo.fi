// Independent reviewer walk of the frozen kit-adopt snapshot.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://127.0.0.1:4719";
const PROD = "https://koivupiilo.fi";
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const routes = {
  en_GB: ["/", "/about/", "/services/", "/portfolio/", "/contact/", "/services/sports-coaching/", "/404.html"],
  fi_FI: ["/fi/", "/fi/tietoa/", "/fi/palvelut/", "/fi/portfolio/", "/fi/yhteystiedot/"],
};
const locales = { en_GB: "en-GB", fi_FI: "fi-FI" };
const widths = { phone: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const slug = (r) => (r === "/" ? "root" : r.replace(/^\/|\/$/g, "").replace(/[\/.]/g, "_"));

const report = { base: BASE, combos: [], zoom: [], prod_compare: [], frames: [], langswitch: [] };

async function fontIdentity(page, cdp) {
  await page.evaluate(() => document.fonts.ready);
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const probes = { heading: "h1", body: "main p", strong: "main strong", em: "main em, main i", nav: "header a, nav a" };
  const out = {};
  for (const [k, sel] of Object.entries(probes)) {
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: sel });
    if (!nodeId) { out[k] = null; continue; }
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    const computed = await page.$eval(sel, (el) => { const s = getComputedStyle(el); return { family: s.fontFamily, weight: s.fontWeight, style: s.fontStyle, size: s.fontSize }; });
    out[k] = { computed, platform: fonts };
  }
  return out;
}

async function geometry(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflowX = de.scrollWidth - de.clientWidth;
    const wide = [];
    for (const el of document.querySelectorAll("main *")) {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > de.clientWidth + 1) wide.push({ tag: el.tagName.toLowerCase(), text: (el.textContent || "").trim().slice(0, 60), right: Math.round(r.right) });
    }
    return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflowX, wide: wide.slice(0, 8), lang: de.lang, title: document.title };
  });
}

const browser = await chromium.launch();
try {
  // 1. Matrix: region x width x scheme.
  for (const [region, rs] of Object.entries(routes)) {
    for (const [wname, vp] of Object.entries(widths)) {
      for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: vp, locale: locales[region], colorScheme: scheme, deviceScaleFactor: 1 });
        const page = await ctx.newPage();
        const requests = [];
        page.on("requestfinished", async (req) => { const res = await req.response(); requests.push({ url: req.url(), type: req.resourceType(), status: res ? res.status() : null }); });
        page.on("requestfailed", (req) => requests.push({ url: req.url(), type: req.resourceType(), failed: req.failure()?.errorText }));
        const consoleErrors = [];
        page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
        for (const r of rs) {
          requests.length = 0; consoleErrors.length = 0;
          await page.goto(BASE + r, { waitUntil: "networkidle" });
          const fonts = await fontIdentity(page, cdp);
          const geo = await geometry(page);
          const shot = `${region}-${wname}-${scheme}-${slug(r)}.jpg`;
          await page.screenshot({ path: path.join(OUT, "shots", shot), type: "jpeg", quality: 60, fullPage: false });
          const external = requests.filter((q) => !q.url.startsWith(BASE));
          const failed = requests.filter((q) => q.failed || (q.status && q.status >= 400));
          const fontReqs = requests.filter((q) => q.type === "font").map((q) => q.url.replace(BASE, ""));
          report.combos.push({ region, width: wname, scheme, route: r, shot, geo, fonts, fontReqs, external, failed, consoleErrors: [...consoleErrors] });
        }
        await ctx.close();
      }
    }
  }

  // 2. Browser zoom 100-200% at desktop width (viewport shrinks by z, DPR = z), both regions.
  const zoomRoutes = ["/", "/contact/", "/fi/", "/fi/yhteystiedot/"];
  for (const z of [1, 1.1, 1.25, 1.5, 1.75, 2]) {
    const ctx = await browser.newContext({ viewport: { width: Math.round(1440 / z), height: Math.round(900 / z) }, deviceScaleFactor: z, locale: "fi-FI", colorScheme: "light" });
    const page = await ctx.newPage();
    for (const r of zoomRoutes) {
      await page.goto(BASE + r, { waitUntil: "networkidle" });
      const geo = await geometry(page);
      const nav = await page.evaluate(() => [...document.querySelectorAll("header a")].map((a) => { const b = a.getBoundingClientRect(); return { t: a.textContent.trim(), visible: b.width > 0 && b.right <= innerWidth + 1 && b.bottom > 0 }; }));
      let shot = null;
      if (z === 2 || geo.overflowX > 0) {
        shot = `zoom${Math.round(z * 100)}-${slug(r)}.jpg`;
        await page.screenshot({ path: path.join(OUT, "shots", shot), type: "jpeg", quality: 55 });
      }
      report.zoom.push({ zoom: z, route: r, geo, nav, shot });
    }
    await ctx.close();
  }

  // 3. Before/after: production (main == design/spike site code, Google Fonts) vs snapshot at 390 px.
  for (const r of ["/", "/contact/", "/services/technical-consulting/", "/fi/", "/fi/palvelut/", "/fi/yhteystiedot/"]) {
    const row = { route: r };
    for (const [label, base] of [["prod_google_fonts", PROD], ["snapshot_self_hosted", BASE]]) {
      const ctx = await browser.newContext({ viewport: widths.phone, locale: "fi-FI" });
      const page = await ctx.newPage();
      const fontHosts = new Set();
      page.on("request", (q) => { if (q.resourceType() === "font" || /fonts\.(googleapis|gstatic)/.test(q.url())) fontHosts.add(new URL(q.url()).host); });
      try {
        await page.goto(base + r, { waitUntil: "networkidle", timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);
        const geo = await geometry(page);
        const h = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, h1: document.querySelector("h1")?.getBoundingClientRect().height }));
        row[label] = { overflowX: geo.overflowX, scrollWidth: geo.scrollWidth, height: h.height, h1Height: h.h1, fontHosts: [...fontHosts], wide: geo.wide.slice(0, 3) };
      } catch (e) { row[label] = { error: String(e).slice(0, 200) }; }
      await ctx.close();
    }
    report.prod_compare.push(row);
  }

  // 4. Frame strip: first load with a cold cache (font swap) and the language switch (W3).
  for (const [region, r, linkText] of [["fi_FI", "/fi/", null], ["en_GB", "/", null]]) {
    const ctx = await browser.newContext({ viewport: widths.phone, locale: locales[region], colorScheme: "dark" });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 400 * 1024 / 8, uploadThroughput: 750000 / 8 });
    const t0 = Date.now();
    const nav = page.goto(BASE + r, { waitUntil: "load" });
    await page.waitForTimeout(120);
    const names = [];
    for (const [i, wait] of [[0, 0], [1, 300], [2, null]]) {
      if (wait === null) { await nav; await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(200); }
      else if (wait) await page.waitForTimeout(wait);
      const n = `strip-load-${region}-${i}.jpg`;
      try { await page.screenshot({ path: path.join(OUT, "shots", n), type: "jpeg", quality: 55 }); names.push({ frame: n, ms: Date.now() - t0 }); } catch (e) { names.push({ frame: n, error: String(e).slice(0, 120) }); }
    }
    report.frames.push({ kind: "cold-load-font-swap", region, route: r, names });
    await ctx.close();
  }

  // W3 language switch, from a content page in each language.
  for (const [region, start] of [["en_GB", "/services/"], ["fi_FI", "/fi/palvelut/"], ["en_GB", "/contact/"], ["fi_FI", "/fi/tietoa/"]]) {
    const ctx = await browser.newContext({ viewport: widths.phone, locale: locales[region], colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(BASE + start, { waitUntil: "networkidle" });
    const links = await page.evaluate(() => [...document.querySelectorAll("a")].filter((a) => /^(Suomeksi|English|In English|FI|EN|Suomi)$/i.test(a.textContent.trim()) || a.hreflang).map((a) => ({ text: a.textContent.trim(), href: a.getAttribute("href"), hreflang: a.hreflang, lang: a.lang, visible: a.getBoundingClientRect().width > 0 })));
    const hreflang = await page.evaluate(() => [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => `${l.hreflang} ${l.href}`));
    const row = { region, start, links, hreflang };
    const target = links.find((l) => l.visible);
    if (target) {
      const tag = `strip-lang-${slug(start)}`;
      await page.screenshot({ path: path.join(OUT, "shots", `${tag}-0.jpg`), type: "jpeg", quality: 55 });
      const t0 = Date.now();
      const click = page.locator(`a[href="${target.href}"]:visible`).first().click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT, "shots", `${tag}-1.jpg`), type: "jpeg", quality: 55 });
      await click; await page.waitForLoadState("networkidle");
      await page.screenshot({ path: path.join(OUT, "shots", `${tag}-2.jpg`), type: "jpeg", quality: 55 });
      row.clicked = target; row.landed = page.url().replace(BASE, ""); row.landedLang = await page.evaluate(() => document.documentElement.lang); row.ms = Date.now() - t0; row.frames = [0, 1, 2].map((i) => `${tag}-${i}.jpg`);
    }
    report.langswitch.push(row);
    await ctx.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "walk-report.json"), JSON.stringify(report, null, 2));
console.log("ok", report.combos.length, "combos");
