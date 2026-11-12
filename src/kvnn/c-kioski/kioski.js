(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Language (FI / EN, stays on the same page) ---------- */
  const T = {
    fi: {
      pause: 'Pysäytä video', play: 'Toista video',
      photo: (i, n) => `Kuva ${i} / ${n}`,
      zip: 'Mallisivu: albumin ZIP-tiedostoa ei ladata.',
      orig: 'Mallisivu: alkuperäistä kuvaa ei ladata.',
      more: 'Mallisivulla näytetään 18 esimerkkikuvaa.',
      pwEmpty: 'Kirjoita salasana. Löydät sen leirin vahvistusviestistä.',
      pwWrong: 'Salasana ei kelpaa. Tarkista se leirin vahvistusviestistä ja yritä uudelleen.',
      shop: 'Mallisivu: kauppa avautuu Holvissa tai KVNN:n omassa kassassa.',
    },
    en: {
      pause: 'Pause video', play: 'Play video',
      photo: (i, n) => `Photo ${i} of ${n}`,
      zip: 'Mockup: the album ZIP is not downloaded.',
      orig: 'Mockup: the original photo is not downloaded.',
      more: 'This mockup shows 18 sample photos.',
      pwEmpty: 'Enter the password. You\'ll find it in your camp confirmation email.',
      pwWrong: 'That password did not work. Check your camp confirmation email and try again.',
      shop: 'Mockup: the shop will open in Holvi or KVNN\'s own checkout.',
    },
  };
  const ATTRS = ['aria-label', 'alt', 'placeholder', 'content'];
  let lang = 'fi';
  const t = () => T[lang];

  function readLang() {
    const q = new URLSearchParams(location.search).get('lang');
    return q === 'en' ? 'en' : 'fi';
  }

  function applyLang(next) {
    lang = next;
    root.lang = next;
    document.querySelectorAll('[data-en]').forEach(el => {
      if (el.dataset.fi === undefined) el.dataset.fi = el.innerHTML;
      el.innerHTML = next === 'en' ? el.dataset.en : el.dataset.fi;
    });
    ATTRS.forEach(a => {
      const camel = a.replace(/-(\w)/g, (_m, c) => c.toUpperCase());
      const enKey = 'en' + camel[0].toUpperCase() + camel.slice(1);
      const fiKey = 'fi' + camel[0].toUpperCase() + camel.slice(1);
      document.querySelectorAll(`[data-en-${a}]`).forEach(el => {
        if (el.dataset[fiKey] === undefined) el.dataset[fiKey] = el.getAttribute(a) || '';
        el.setAttribute(a, next === 'en' ? el.dataset[enKey] : el.dataset[fiKey]);
      });
    });
    // keep the language when moving between pages
    document.querySelectorAll('a[href]').forEach(a => {
      if (a.closest('.k-lang')) return;
      if (a.dataset.base === undefined) a.dataset.base = a.getAttribute('href');
      const base = a.dataset.base;
      const m = base.match(/^([\w-]+\.html)(#.*)?$/);
      if (!m) return;
      a.setAttribute('href', next === 'en' ? `${m[1]}?lang=en${m[2] || ''}` : base);
    });
    document.querySelectorAll('.k-lang a').forEach(a => a.setAttribute('aria-current', String(a.dataset.lang === next)));
    document.dispatchEvent(new CustomEvent('k:lang'));
  }

  document.querySelectorAll('.k-lang a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const next = a.dataset.lang;
      const url = new URL(location.href);
      if (next === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
      applyLang(next);
    });
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.k-menu-btn');
  const mnav = document.getElementById('k-mnav');
  if (menuBtn && mnav) {
    const set = open => { menuBtn.setAttribute('aria-expanded', String(open)); mnav.dataset.open = String(open); };
    menuBtn.addEventListener('click', () => set(menuBtn.getAttribute('aria-expanded') !== 'true'));
    mnav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mnav.dataset.open === 'true') { set(false); menuBtn.focus(); } });
  }

  /* ---------- Toast (tape note) ---------- */
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector('.k-toast');
    if (!el) { el = document.createElement('div'); el.className = 'k-toast'; el.setAttribute('role', 'status'); document.body.append(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }
  document.querySelectorAll('[data-toast]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); toast(t()[b.dataset.toast]); }));

  /* ---------- Hero video (muted loop, off under reduced motion) ---------- */
  const video = document.querySelector('[data-hero-video]');
  const vBtn = document.querySelector('[data-video-toggle]');
  if (video) {
    const setBtn = paused => {
      if (!vBtn) return;
      vBtn.setAttribute('aria-pressed', String(paused));
      vBtn.setAttribute('aria-label', paused ? t().play : t().pause);
    };
    const start = () => {
      if (reduce.matches) { video.pause(); setBtn(true); return; }
      video.preload = 'auto';
      const p = video.play();
      if (p && p.catch) p.catch(() => setBtn(true));
      setBtn(false);
    };
    start();
    reduce.addEventListener?.('change', start);
    vBtn?.addEventListener('click', () => { if (video.paused) { video.play(); setBtn(false); } else { video.pause(); setBtn(true); } });
    document.addEventListener('k:lang', () => setBtn(video.paused));
  }

  /* ---------- Letterboard: rows snap into their grooves ---------- */
  const boards = [...document.querySelectorAll('[data-board]')];
  if (boards.length && !reduce.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('k-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    boards.forEach(b => {
      const parts = [...b.querySelectorAll('.k-board-title, .k-row, .k-pkg')];
      parts.forEach((p, i) => { p.style.setProperty('--i', i); p.style.setProperty('--tilt', (i % 2 ? .7 : -.8) + 'deg'); });
      const r = b.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) { b.classList.add('k-snap'); requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('k-in'))); }
      else { b.classList.add('k-snap'); io.observe(b); }
    });
  }

  /* ---------- Sticky hatch bar on phones ---------- */
  const bar = document.querySelector('[data-hatchbar]');
  const counter = document.querySelector('[data-hatch-counter]');
  if (bar) {
    const btn = bar.querySelector('a');
    const show = on => { bar.dataset.show = String(on); bar.setAttribute('aria-hidden', String(!on)); btn.tabIndex = on ? 0 : -1; };
    const foot = document.querySelector('.k-foot');
    let counterGone = !counter, footIn = false, hideIn = false;
    const update = () => show(counterGone && !footIn && !hideIn);
    const hide = document.querySelector('[data-hatch-hide]');
    if (hide && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { hideIn = e.isIntersecting; update(); }).observe(hide);
    }
    if (counter && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { counterGone = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(counter);
    }
    if (foot && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { footIn = e.isIntersecting; update(); }).observe(foot);
    }
    if (!counter) {
      const onScroll = () => { counterGone = scrollY > 240; update(); };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
  }

  /* ---------- Gallery ---------- */
  const gal = document.querySelector('[data-gallery]');
  if (gal) {
    const views = [...gal.querySelectorAll('[data-album-view]')];
    const links = [...document.querySelectorAll('[data-album-link]')];
    const ids = views.map(v => v.dataset.albumView);
    function openAlbum(id, scroll) {
      if (!ids.includes(id)) id = ids[0];
      views.forEach(v => { v.hidden = v.dataset.albumView !== id; });
      links.forEach(l => l.setAttribute('aria-current', String(l.dataset.albumLink === id)));
      const target = gal.querySelector(`[data-album-view="${id}"]`);
      if (scroll && target) target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      const input = target?.querySelector('input');
      if (scroll && input) setTimeout(() => input.focus({ preventScroll: true }), 350);
    }
    links.forEach(l => l.addEventListener('click', e => {
      e.preventDefault();
      const id = l.dataset.albumLink;
      history.replaceState(null, '', `${location.search}#${id}`);
      openAlbum(id, true);
    }));
    openAlbum(location.hash.slice(1), !!location.hash);

    // password album
    gal.querySelectorAll('[data-pw-form]').forEach(form => {
      const input = form.querySelector('input');
      const err = form.querySelector('.k-err');
      const errTxt = err.querySelector('span');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const empty = !input.value.trim();
        errTxt.textContent = empty ? t().pwEmpty : t().pwWrong;
        err.hidden = false;
        input.setAttribute('aria-invalid', 'true');
        input.focus();
      });
      input.addEventListener('input', () => { err.hidden = true; input.removeAttribute('aria-invalid'); });
    });

    // viewer
    const dlg = document.querySelector('.kv-viewer');
    const grid = gal.querySelector('.k-grid');
    if (dlg && grid) {
      const track = dlg.querySelector('.kv-track');
      const count = dlg.querySelector('.kv-count');
      const prev = dlg.querySelector('.kv-prev');
      const next = dlg.querySelector('.kv-next');
      const thumbs = [...grid.querySelectorAll('button')];
      const N = thumbs.length;
      track.replaceChildren(...thumbs.map(b => {
        const s = document.createElement('div');
        s.className = 'kv-slide';
        const img = document.createElement('img');
        img.dataset.src = b.dataset.full;
        img.alt = b.querySelector('img').alt;
        img.decoding = 'async';
        s.append(img);
        return s;
      }));
      let idx = 0;
      const load = i => { const img = track.children[i]?.querySelector('img'); if (img && !img.src) img.src = img.dataset.src; };
      const render = () => {
        count.textContent = t().photo(idx + 1, N);
        prev.disabled = idx === 0; next.disabled = idx === N - 1;
        [idx - 1, idx, idx + 1].forEach(load);
      };
      const go = (i, smooth) => {
        idx = Math.max(0, Math.min(N - 1, i));
        track.scrollTo({ left: idx * track.clientWidth, behavior: smooth && !reduce.matches ? 'smooth' : 'auto' });
        render();
      };
      let opener = null;
      thumbs.forEach((b, i) => b.addEventListener('click', () => {
        opener = b;
        dlg.showModal();
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => go(i, false));
      }));
      let st;
      track.addEventListener('scroll', () => {
        clearTimeout(st);
        st = setTimeout(() => {
          const i = Math.round(track.scrollLeft / track.clientWidth);
          if (i !== idx) { idx = i; render(); }
        }, 80);
      }, { passive: true });
      prev.addEventListener('click', () => go(idx - 1, true));
      next.addEventListener('click', () => go(idx + 1, true));
      dlg.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1, true); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1, true); }
      });
      dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
      dlg.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
      addEventListener('resize', () => { if (dlg.open) go(idx, false); });
      document.addEventListener('k:lang', () => { if (dlg.open) render(); });
    }
  }

  applyLang(readLang());
})();
