(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- FI / EN on the same page ---------- */
  function applyLang(lang) {
    doc.lang = lang;
    var t = doc.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    ["alt", "aria-label", "placeholder", "title"].forEach(function (attr) {
      document.querySelectorAll("[data-" + lang + "-" + attr + "]").forEach(function (el) {
        el.setAttribute(attr, el.getAttribute("data-" + lang + "-" + attr));
      });
    });
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!/^[a-z-]+\.html/.test(href)) return;
      var parts = href.split("#");
      var path = parts[0].split("?")[0];
      a.setAttribute("href", path + (lang === "en" ? "?lang=en" : "") + (parts[1] ? "#" + parts[1] : ""));
    });
    try {
      var url = new URL(window.location.href);
      if (lang === "en") url.searchParams.set("lang", "en"); else url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    } catch (e) { /* file:// */ }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-lang]");
    if (b) applyLang(b.getAttribute("data-set-lang"));
  });
  applyLang(doc.lang === "en" ? "en" : "fi");

  /* ---------- Header over the cover ---------- */
  var mast = document.querySelector(".mast");
  if (mast && document.body.classList.contains("on-cover")) {
    var cover = document.querySelector(".cover");
    var onScroll = function () { mast.classList.toggle("is-solid", window.scrollY > cover.offsetHeight - 72); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------- Menu sheet ---------- */
  var sheet = document.getElementById("menu");
  var opener = null;
  var behind = Array.prototype.slice.call(document.querySelectorAll("body > header, body > main, body > footer"));
  function setMenu(open, refocus) {
    if (!sheet || sheet.classList.contains("open") === open) return;
    sheet.classList.toggle("open", open);
    sheet.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    /* the page behind the sheet is out of reach while it is open */
    behind.forEach(function (el) { if (open) el.setAttribute("inert", ""); else el.removeAttribute("inert"); });
    document.querySelectorAll("[aria-controls='menu']").forEach(function (b) { b.setAttribute("aria-expanded", String(open)); });
    if (open) { var c = sheet.querySelector("[data-menu='close']"); if (c) c.focus(); }
    else if (refocus && opener) opener.focus();
  }
  document.querySelectorAll("[data-menu]").forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("data-menu") === "open";
      if (open) opener = b;
      setMenu(open, true);
    });
  });
  if (sheet) {
    sheet.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false, false); });
    document.addEventListener("keydown", function (e) {
      if (!sheet.classList.contains("open")) return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      if (e.key !== "Tab") return;
      /* keep Tab inside the sheet */
      var f = Array.prototype.slice.call(sheet.querySelectorAll("a[href], button"));
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    /* the sheet is a phone and tablet pattern: close it when the full nav takes over */
    var wide = window.matchMedia("(min-width: 1100px)");
    if (wide.addEventListener) wide.addEventListener("change", function () { if (wide.matches) setMenu(false, false); });
  }

  /* ---------- Cover video: muted loop, poster first, still under reduced motion ---------- */
  var media = document.querySelector(".cover-media");
  var video = media && media.querySelector("video");
  if (video) {
    var tall = window.matchMedia("(max-aspect-ratio: 4/5)");
    var pick = function () {
      var src = video.getAttribute(tall.matches ? "data-src-tall" : "data-src-wide");
      if (video.getAttribute("src") !== src) video.setAttribute("src", src);
    };
    var sync = function () {
      if (reduce.matches) { video.pause(); media.classList.remove("playing"); return; }
      pick();
      var p = video.play(); if (p && p.catch) p.catch(function () {});
    };
    video.addEventListener("playing", function () { media.classList.add("playing"); });
    if (reduce.addEventListener) { reduce.addEventListener("change", sync); tall.addEventListener("change", sync); }
    sync();
  }

  /* ---------- Seat sheets: one box per place ---------- */
  document.querySelectorAll("[data-seats]").forEach(function (el) {
    var v = el.getAttribute("data-seats").split("/");
    var free = +v[0], total = +v[1], html = "";
    if (el.classList.contains("compact")) {
      /* coupons: one row, the free places plus a count of the taken ones */
      for (var k = 0; k < free; k++) html += "<i></i>";
      var taken = total - free;
      if (taken) html += '<span class="taken"><span data-l="fi">+' + taken + ' varattu</span><span data-l="en">+' + taken + " taken</span></span>";
    } else {
      for (var i = 0; i < total; i++) html += i < total - free ? '<i class="t"></i>' : "<i></i>";
    }
    el.innerHTML = html;
  });

  /* ---------- Print registration: the pink plate settles as a photo enters ---------- */
  var prints = Array.prototype.slice.call(document.querySelectorAll(".rz"));
  if (prints.length && "IntersectionObserver" in window && !reduce.matches) {
    var vh = window.innerHeight;
    prints.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.9) el.classList.add("off", "snap");
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { prints.forEach(function (el) { el.classList.remove("snap"); }); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("off"); io.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    prints.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Buy bar on phones: shows when no button for the same camp is in view ---------- */
  var buybar = document.querySelector(".buybar");
  var hideFor = Array.prototype.slice.call(document.querySelectorAll(".coupon .btn, .feature .buy .btn, .camp-open .cta-row .btn, #paketit"));
  var setBar = function (hide) {
    buybar.classList.toggle("hide", hide);
    buybar.setAttribute("aria-hidden", String(hide));
    if (hide) buybar.setAttribute("inert", ""); else buybar.removeAttribute("inert");
  };
  if (buybar && "IntersectionObserver" in window) {
    var seen = new Map();
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen.set(en.target, en.isIntersecting); });
      var any = false;
      seen.forEach(function (v) { if (v) any = true; });
      setBar(any);
    }, { threshold: 0 });
    hideFor.forEach(function (el) { bio.observe(el); });
    if (!hideFor.length) setBar(false);
  } else if (buybar) { setBar(false); }

  /* ---------- Password album ---------- */
  document.querySelectorAll("form.pw-form").forEach(function (form) {
    var input = form.querySelector("input");
    var err = form.querySelector(".pw-err");
    var icon = '<svg class="i" aria-hidden="true"><use href="#i-alert"/></svg>';
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      input.setAttribute("aria-invalid", "true");
      err.innerHTML = icon + (input.value.trim()
        ? '<span><span data-l="fi">Salasana ei täsmää. Tarkista se leirin sähköpostista ja yritä uudelleen.</span><span data-l="en">That password doesn’t match. Check it in the camp email and try again.</span></span>'
        : '<span><span data-l="fi">Kirjoita ensin albumin salasana.</span><span data-l="en">Type the album password first.</span></span>');
      input.focus();
    });
    input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); err.innerHTML = ""; });
  });

  /* ---------- Photo viewer ---------- */
  var viewer = document.getElementById("viewer");
  var all = Array.prototype.slice.call(document.querySelectorAll("[data-photo]"));
  if (viewer && all.length && viewer.showModal) {
    var track = viewer.querySelector(".vw-track");
    var stage = viewer.querySelector(".vw-stage");
    var countEl = viewer.querySelector(".vw-count");
    var dl = viewer.querySelector(".vw-dl");
    var index = 0, thumbs = [], slides = [];
    var openAt = function (t) {
      thumbs = Array.prototype.slice.call(t.closest(".photos").querySelectorAll("[data-photo]"));
      track.innerHTML = "";
      slides = thumbs.map(function (th) {
        var s = document.createElement("div");
        s.className = "vw-slide";
        var img = document.createElement("img");
        img.decoding = "async";
        img.alt = th.querySelector("img").alt;
        img.setAttribute("data-src", th.getAttribute("data-photo"));
        s.appendChild(img);
        track.appendChild(s);
        return s;
      });
      var h = t.closest("section").querySelector("h2");
      if (h) viewer.querySelector(".vw-name").innerHTML = h.innerHTML;
      viewer.showModal();
      go(thumbs.indexOf(t), false);
    };
    var load = function (i) {
      var img = slides[i] && slides[i].querySelector("img");
      if (img && !img.getAttribute("src")) img.src = img.getAttribute("data-src");
    };
    var go = function (i, animate) {
      index = (i + slides.length) % slides.length;
      [index - 1, index, index + 1].forEach(function (k) { load((k + slides.length) % slides.length); });
      track.style.transition = animate && !reduce.matches ? "transform .45s cubic-bezier(.16,1,.3,1)" : "none";
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      countEl.textContent = (index + 1) + " / " + slides.length;
      var src = thumbs[index].getAttribute("data-photo");
      dl.setAttribute("href", src);
      dl.setAttribute("download", "KVNN-" + String(index + 1).padStart(3, "0") + ".webp");
    };
    all.forEach(function (t) { t.addEventListener("click", function () { openAt(t); }); });
    viewer.querySelector(".vw-prev").addEventListener("click", function () { go(index - 1, true); });
    viewer.querySelector(".vw-nextbtn").addEventListener("click", function () { go(index + 1, true); });
    viewer.querySelector(".vw-close").addEventListener("click", function () { viewer.close(); });
    viewer.addEventListener("close", function () { if (thumbs[index]) thumbs[index].focus(); });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1, true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1, true); }
    });
    var sx = 0, sy = 0, dx = 0, drag = false, w = 1;
    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest("button")) return;
      drag = true; sx = e.clientX; sy = e.clientY; dx = 0; w = stage.clientWidth;
      track.style.transition = "none";
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", function (e) {
      if (!drag) return;
      dx = e.clientX - sx;
      if (Math.abs(e.clientY - sy) > Math.abs(dx) && Math.abs(dx) < 10) return;
      track.style.transform = "translateX(calc(" + (-index * 100) + "% + " + dx + "px))";
    });
    var end = function () {
      if (!drag) return;
      drag = false;
      if (dx < -w * 0.18) go(index + 1, true);
      else if (dx > w * 0.18) go(index - 1, true);
      else go(index, true);
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  }
})();
