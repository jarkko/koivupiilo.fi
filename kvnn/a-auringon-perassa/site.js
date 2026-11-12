(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  // Screenshot and test runs see the settled page.
  if (!navigator.webdriver && !reduce.matches) root.classList.add("anim");

  /* ---------- language ---------- */
  const ATTRS = ["alt", "aria-label", "placeholder", "title", "content"];
  let lang = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "fi";

  function applyLang(next) {
    lang = next;
    root.lang = lang;
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.dataset.fi === undefined) el.dataset.fi = el.innerHTML;
      el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.fi;
    });
    ATTRS.forEach((a) => {
      document.querySelectorAll(`[data-en-${a}]`).forEach((el) => {
        const key = "fi" + a.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
        if (el.dataset[key] === undefined) el.dataset[key] = el.getAttribute(a) ?? "";
        el.setAttribute(a, lang === "en" ? el.getAttribute(`data-en-${a}`) : el.dataset[key]);
      });
    });
    document.querySelectorAll("[data-lang]").forEach((a) => {
      a.setAttribute("aria-current", a.dataset.lang === lang ? "true" : "false");
    });
    // keep the language on links between the mockup pages
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*=".html?"]').forEach((a) => {
      const url = new URL(a.getAttribute("href"), location.href);
      if (lang === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      a.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
    });
    updateSun();
  }

  // mockup placeholders (shop, terms, payment) stay put instead of jumping to the top
  document.addEventListener("click", (e) => {
    if (e.target.closest('a[href="#"]')) e.preventDefault();
  });

  document.addEventListener("click", (e) => {
    const sw = e.target.closest("[data-lang]");
    if (!sw) return;
    e.preventDefault();
    const url = new URL(location.href);
    if (sw.dataset.lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    applyLang(sw.dataset.lang);
  });

  /* ---------- following the sun: place, local time, sun and sky ----------
     Each section carries where KVNN is and the local light there:
     data-place, data-time ("16.40"), data-month / data-month-en, data-elev (sun elevation, degrees)
     and data-sky (the sky token). Between two sections in the same place and month the clock runs;
     across a journey (Valencia to Helsinki) the label changes over at the midpoint. */
  const sections = [...document.querySelectorAll("[data-time]")];
  const toMin = (t) => {
    const [h, m] = t.split(".").map(Number);
    return h * 60 + m;
  };
  const fmt = (raw) => {
    const min = Math.round(raw); // round first, so 17.59,6 reads 18.00 and never 17.60
    const h = Math.floor(min / 60) % 24;
    const m = min % 60;
    const mm = String(m).padStart(2, "0");
    return lang === "en" ? `${h}:${mm}` : `${h}.${mm}`;
  };
  const month = (el) => (lang === "en" ? el.dataset.monthEn : el.dataset.month) || "";
  const place = (el) => (lang === "en" && el.dataset.placeEn) || el.dataset.place;
  // where an anchor jump parks a section: the stamp on screen and the clock must then agree
  const PARK = parseFloat(getComputedStyle(root).scrollPaddingTop) || 80;
  const sameStop = (a, b) => b && a.dataset.place === b.dataset.place && a.dataset.month === b.dataset.month;

  const hex = (h) => h.trim().replace("#", "").match(/../g).map((x) => parseInt(x, 16));
  const mix = (a, b, t) => {
    const A = hex(a), B = hex(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  let skyCache = {};
  const skyOf = (el) => {
    const key = el.dataset.sky;
    if (!key) return null;
    if (!skyCache[key]) skyCache[key] = getComputedStyle(root).getPropertyValue("--" + key) || "#cfe4df";
    return skyCache[key];
  };
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { skyCache = {}; updateSun(); });

  const rail = document.querySelector(".sunrail");
  const railSun = rail?.querySelector(".sunrail-sun");
  const railTime = rail?.querySelector(".sunrail-time");
  const mini = document.querySelector(".minisun");
  const miniDisc = mini?.querySelector(".minisun-disc");
  const miniTime = mini?.querySelector(".minisun-time");
  const top = document.querySelector(".top");
  const hero = document.querySelector(".hero");

  let ticking = false;
  function updateSun() {
    ticking = false;
    if (!sections.length) return;
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const tops = sections.map((s) => s.getBoundingClientRect().top + scrollY);

    // the sky is judged mid-screen
    const probe = scrollY + innerHeight * 0.45;
    let s = 0;
    for (let k = 0; k < tops.length; k++) if (tops[k] <= probe) s = k;
    const sEnd = s + 1 < tops.length ? tops[s + 1] : tops[s] + sections[s].offsetHeight;
    const skyA = skyOf(sections[s]), skyB = sections[s + 1] ? skyOf(sections[s + 1]) : skyA;
    if (skyA && skyB) root.style.setProperty("--sky-now", mix(skyA, skyB, clamp01((probe - tops[s]) / Math.max(1, sEnd - tops[s]))));

    // the clock is judged where a section parks under the header, so it reads exactly what the
    // stamp on screen says: 16.40 at the top of the page, 17.30 after a jump to #leirit
    const maxY = Math.max(0, root.scrollHeight - innerHeight);
    const park = tops.map((t, k) => (k === 0 ? 0 : Math.min(Math.max(0, t - PARK), maxY)));
    let i = 0;
    for (let k = 0; k < park.length; k++) if (park[k] <= scrollY + 1) i = k;
    const a = sections[i], b = sections[i + 1];
    const f = b ? clamp01((scrollY - park[i]) / Math.max(1, park[i + 1] - park[i])) : 0;

    // the clock runs within one place; a journey switches place and time when the next stamp arrives
    let at = a, min = toMin(a.dataset.time);
    if (sameStop(a, b)) {
      let mb = toMin(b.dataset.time);
      if (mb < min) mb += 1440; // past midnight in Helsinki
      min = min + (mb - min) * f;
    } else if (b && tops[i + 1] - scrollY <= innerHeight * 0.5) {
      at = b; min = toMin(b.dataset.time); // the next stop's stamp has reached mid-screen
    }
    const ea = Number(a.dataset.elev || 0), eb = b ? Number(b.dataset.elev || 0) : ea;
    const e = ea + (eb - ea) * f; // degrees
    // square-root scale: the golden hours near the horizon get most of the travel
    const lift = (e >= 0 ? 1 : -1) * Math.sqrt(Math.min(1, Math.abs(e) / 32));
    const label = `<small><span class="p">${place(at)}</span><span class="m">${month(at)}</span></small>${fmt(min)}`;
    const setLabel = (el) => {
      if (el.innerHTML === label) return;
      const placeChanged = el.dataset.stop !== at.dataset.place + month(at);
      el.dataset.stop = at.dataset.place + month(at);
      if (placeChanged && el.innerHTML && !reduce.matches) {
        el.classList.add("swap");
        setTimeout(() => { el.innerHTML = label; el.classList.remove("swap"); }, 160);
      } else el.innerHTML = label;
    };
    if (rail && railSun) {
      const h = rail.clientHeight, horizon = h * 0.64;
      const y = lift >= 0 ? horizon - lift * horizon : horizon - lift * (h - horizon) * 1.6;
      railSun.style.setProperty("--sun-y", Math.min(h - 28, Math.max(0, y - 14)) + "px");
      railSun.classList.toggle("below", e < 0);
      rail.style.setProperty("--glow", String(Math.max(0.25, 1 - Math.abs(e) / 10)));
      setLabel(railTime);
    }
    if (mini && miniDisc) {
      const y = 11 - lift * 15; // px within a 28px window, horizon at ~17px
      miniDisc.style.setProperty("--mini-y", Math.max(-4, Math.min(24, y)) + "px");
      miniDisc.classList.toggle("below", e < 0);
      setLabel(miniTime);
    }

    if (top) {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      top.classList.toggle("is-solid", scrollY > 24 || !(heroBottom > 72)); // nothing may slide under a clear bar
      // the rail's label sits at 16vh, so judge it there, not at the header line
      document.body.classList.toggle("on-hero", heroBottom > innerHeight * 0.16 + 24);
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateSun); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- menu sheet ---------- */
  const sheet = document.querySelector(".sheet");
  const openBtn = document.querySelector(".menu-btn");
  function setMenu(open) {
    if (!sheet) return;
    sheet.classList.toggle("open", open);
    sheet.setAttribute("aria-hidden", open ? "false" : "true");
    sheet.inert = !open;
    openBtn?.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) sheet.querySelector(".sheet-close")?.focus();
    else openBtn?.focus({ preventScroll: true });
  }
  if (sheet) sheet.inert = true;
  openBtn?.addEventListener("click", () => setMenu(true));
  sheet?.querySelector(".sheet-close")?.addEventListener("click", () => setMenu(false));
  sheet?.querySelectorAll("ul a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet?.classList.contains("open")) setMenu(false); });
  // keep Tab inside the open sheet so focus never moves to the page hidden behind it
  sheet?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const stops = [...sheet.querySelectorAll("a[href], button")].filter((el) => el.offsetParent);
    const first = stops[0], last = stops[stops.length - 1];
    if (!first) return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- hero video ---------- */
  const video = document.querySelector(".hero video");
  if (video) {
    const still = () => { video.pause(); video.removeAttribute("autoplay"); };
    if (reduce.matches) still();
    reduce.addEventListener("change", (e) => (e.matches ? still() : video.play().catch(() => {})));
  }

  /* ---------- camp page buy bar ---------- */
  const buybar = document.querySelector(".buybar");
  if (buybar && hero) {
    const pk = document.querySelector("#paketit");
    let heroGone = false, pkSeen = false, endSeen = false;
    const set = () => {
      const show = heroGone && !pkSeen && !endSeen;
      buybar.classList.toggle("show", show);
      buybar.inert = !show;
      buybar.setAttribute("aria-hidden", String(!show));
    };
    set();
    new IntersectionObserver(([en]) => { heroGone = !en.isIntersecting; set(); }, { rootMargin: "-30% 0px 0px 0px" }).observe(hero);
    if (pk) new IntersectionObserver(([en]) => { pkSeen = en.isIntersecting; set(); }).observe(pk);
    // the closing call to action has its own button, and the footer note must stay readable
    const seen = new Set();
    const ends = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
      endSeen = seen.size > 0; set();
    });
    document.querySelectorAll(".dawn-cta, .foot").forEach((el) => ends.observe(el));
  }

  /* ---------- password album ---------- */
  document.querySelectorAll(".pw").forEach((form) => {
    const input = form.querySelector("input");
    const err = form.querySelector(".pw-err");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const empty = !input.value.trim();
      err.hidden = false;
      err.querySelector("span").innerHTML = empty
        ? (lang === "en" ? err.dataset.emptyEn : err.dataset.emptyFi)
        : (lang === "en" ? err.dataset.wrongEn : err.dataset.wrongFi);
      input.setAttribute("aria-invalid", "true");
      input.focus();
    });
    input.addEventListener("input", () => { err.hidden = true; input.removeAttribute("aria-invalid"); });
  });

  /* ---------- lightbox ---------- */
  const viewer = document.querySelector(".viewer");
  const thumbs = [...document.querySelectorAll("[data-full]")];
  if (viewer && thumbs.length) {
    const track = viewer.querySelector(".v-track");
    const count = viewer.querySelector(".v-count");
    const dl = viewer.querySelector(".v-download");
    const prev = viewer.querySelector(".v-prev");
    const next = viewer.querySelector(".v-next");
    const stage = viewer.querySelector(".v-stage");
    let idx = 0, opener = null;

    track.innerHTML = thumbs.map((_, n) =>
      `<div class="v-slide" role="group" aria-roledescription="slide" aria-label="${n + 1} / ${thumbs.length}"><img alt="" decoding="async" draggable="false"></div>`).join("");
    const slides = [...track.children];

    const load = (n) => {
      const img = slides[n]?.querySelector("img");
      if (img && !img.getAttribute("src")) img.src = thumbs[n].dataset.full;
      if (img) img.alt = thumbs[n].querySelector("img").alt;
    };
    const go = (n, animate = true) => {
      idx = Math.max(0, Math.min(thumbs.length - 1, n));
      [idx - 1, idx, idx + 1].forEach(load);
      track.style.transition = animate && !reduce.matches ? "transform .45s cubic-bezier(.16,1,.3,1)" : "none";
      track.style.transform = `translateX(${-idx * 100}%)`;
      count.textContent = `${idx + 1} / ${thumbs.length}`;
      dl.href = thumbs[idx].dataset.full;
      dl.setAttribute("download", "syysturnaus-2026-" + String(idx + 1).padStart(3, "0") + ".webp");
      prev.disabled = idx === 0;
      next.disabled = idx === thumbs.length - 1;
    };
    thumbs.forEach((t, n) => t.addEventListener("click", () => {
      opener = t;
      viewer.showModal();
      go(n, false);
      viewer.querySelector(".v-close").focus();
    }));
    prev.addEventListener("click", () => go(idx - 1));
    next.addEventListener("click", () => go(idx + 1));
    viewer.querySelector(".v-close").addEventListener("click", () => viewer.close());
    viewer.addEventListener("close", () => opener?.focus({ preventScroll: true }));
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });

    // swipe: the photo follows the finger
    let x0 = null, y0 = 0, dx = 0, w = 1, horizontal = null;
    stage.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest("button")) return;
      x0 = e.clientX; y0 = e.clientY; dx = 0; w = stage.clientWidth; horizontal = null;
      track.style.transition = "none";
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => {
      if (x0 === null) return;
      dx = e.clientX - x0;
      if (horizontal === null && (Math.abs(dx) > 6 || Math.abs(e.clientY - y0) > 6)) horizontal = Math.abs(dx) > Math.abs(e.clientY - y0);
      if (!horizontal) return;
      const edge = (idx === 0 && dx > 0) || (idx === thumbs.length - 1 && dx < 0) ? 0.35 : 1;
      track.style.transform = `translateX(calc(${-idx * 100}% + ${dx * edge}px))`;
    });
    const end = () => {
      if (x0 === null) return;
      const moved = horizontal ? dx : 0;
      x0 = null;
      if (moved < -w * 0.18) go(idx + 1);
      else if (moved > w * 0.18) go(idx - 1);
      else go(idx);
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  }

  applyLang(lang);
  updateSun();
})();
