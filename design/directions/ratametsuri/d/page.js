(() => {
  const root = document.documentElement;
  const course = document.getElementById('course');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const syms = [...course.querySelectorAll('.sym')];

  // ---- The course line: legs between the symbols, stopping short of each circle's edge.
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'legs');
  svg.setAttribute('aria-hidden', 'true');
  course.prepend(svg);
  const legs = syms.slice(1).map(() => {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('pathLength', '1');
    svg.append(l);
    return l;
  });
  const GAP = 3;
  const layout = () => {
    const cr = course.getBoundingClientRect();
    svg.setAttribute('width', cr.width);
    svg.setAttribute('height', cr.height);
    const pts = syms.map((s) => {
      const r = s.getBoundingClientRect();
      return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top, r: r.width / 2 + GAP };
    });
    legs.forEach((l, i) => {
      const a = pts[i], b = pts[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      l.setAttribute('x1', (a.x + ux * a.r).toFixed(2));
      l.setAttribute('y1', (a.y + uy * a.r).toFixed(2));
      l.setAttribute('x2', (b.x - ux * b.r).toFixed(2));
      l.setAttribute('y2', (b.y - uy * b.r).toFixed(2));
    });
  };
  layout();
  new ResizeObserver(layout).observe(course);
  if (document.fonts) document.fonts.ready.then(layout);

  // ---- Arrival: each leg draws, then its control appears, in course order.
  if (!reduce) {
    root.classList.add('motion');
    syms.slice(1).forEach((s) => s.classList.add('pre'));
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const seen = syms.map(() => null);
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { const i = syms.indexOf(e.target); seen[i] && seen[i](); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    const whenSeen = (i) => new Promise((res) => { seen[i] = res; io.observe(syms[i]); });
    (async () => {
      await wait(220);
      for (let i = 1; i < syms.length; i++) {
        await whenSeen(i);
        legs[i - 1].classList.add('on');
        await wait(300);
        syms[i].classList.remove('pre');
        await wait(110);
      }
    })();
  }

  // ---- The request block.
  const beta = document.getElementById('beta');
  const form = beta.querySelector('form');
  const input = form.elements.email;
  const btn = form.querySelector('button');
  const params = new URLSearchParams(location.search);
  const msgId = { default: 'm-default', sending: 'm-default', 'error-validation': 'm-validation', 'error-server': 'm-server', 'not-live': 'm-notlive', success: 'm-success' };
  const set = (state, focus) => {
    beta.dataset.state = state;
    input.setAttribute('aria-describedby', msgId[state]);
    if (state === 'error-validation') input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    btn.setAttribute('aria-disabled', state === 'sending' ? 'true' : 'false');
    if (focus) input.focus();
  };
  const valid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const ok = (confirm) => { if (confirm) beta.dataset.success = 'confirm'; else delete beta.dataset.success; set('success'); };
  input.addEventListener('input', () => {
    const s = beta.dataset.state;
    if (s === 'error-validation' || s === 'error-server') set('default');
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (beta.dataset.state === 'sending') return;
    const email = input.value.trim();
    if (!valid(email)) return set('error-validation', true);
    if (form.elements.website.value) return ok(false); // honeypot: pretend, send nothing
    set('sending');
    const mock = params.get('mock'), endpoint = beta.dataset.endpoint;
    if (mock) {
      await new Promise((r) => setTimeout(r, +params.get('delay') || 1500));
      if (mock === 'fail') return set('error-server', true);
      return ok(mock === 'confirm');
    }
    if (endpoint) {
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) });
        if (!r.ok) throw new Error(r.status);
        const j = await r.json().catch(() => ({}));
        return ok(!!j.confirm);
      } catch { return set('error-server', true); }
    }
    await new Promise((r) => setTimeout(r, 450));
    set('not-live');
  });
  const st = params.get('state');
  if (params.get('email')) input.value = params.get('email');
  if (st && msgId[st]) { if (params.get('confirm')) beta.dataset.success = 'confirm'; set(st); } else set('default');
})();
