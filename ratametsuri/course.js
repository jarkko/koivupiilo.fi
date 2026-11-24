// The course line on the Ratametsuri page: legs between the symbols in course order (start,
// controls 1 to n, finish), stopping short of each circle's edge like the app's own leg gaps,
// drawn in order on arrival. Decoration only: without it the page is whole, just without legs.
// The sign-up form is not here; launchpad's kit/form.js handles it.
(() => {
  const root = document.documentElement;
  const course = document.getElementById("course");
  if (!course || !window.ResizeObserver) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const all = [...course.querySelectorAll(".sym[data-order]")];
  // The finish has two places (at the request on desktop, after the features on a phone); only
  // the one that is shown takes part.
  const shown = () => all.filter((s) => s.getClientRects().length).sort((a, b) => a.dataset.order - b.dataset.order);

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "legs");
  svg.setAttribute("aria-hidden", "true");
  course.prepend(svg);
  const legs = all.slice(1).map(() => {
    const l = document.createElementNS(NS, "line");
    l.setAttribute("pathLength", "1");
    svg.append(l);
    return l;
  });

  const GAP = 3;
  let syms = shown();
  let arrived = reduce;
  const finishAll = () => {
    arrived = true;
    all.forEach((s) => s.classList.remove("pre"));
    legs.forEach((l) => l.classList.add("on"));
  };
  const layout = () => {
    const now = shown();
    if (now.length !== syms.length || now.some((s, i) => s !== syms[i])) {
      syms = now;
      finishAll(); // the layout switched mid-arrival: show the whole course at once
    }
    const cr = course.getBoundingClientRect();
    const pts = syms.map((s) => {
      const r = s.getBoundingClientRect();
      return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top, r: r.width / 2 + GAP };
    });
    // The overlay covers the gutter only, never the text beside it.
    svg.setAttribute("width", Math.ceil(Math.max(0, ...pts.map((p) => p.x + p.r)) + 2));
    svg.setAttribute("height", cr.height);
    legs.forEach((l, i) => {
      const a = pts[i], b = pts[i + 1];
      l.style.display = a && b ? "" : "none";
      if (!a || !b) return;
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      l.setAttribute("x1", (a.x + ux * a.r).toFixed(2));
      l.setAttribute("y1", (a.y + uy * a.r).toFixed(2));
      l.setAttribute("x2", (b.x - ux * b.r).toFixed(2));
      l.setAttribute("y2", (b.y - uy * b.r).toFixed(2));
    });
  };
  layout();
  new ResizeObserver(layout).observe(course);
  if (document.fonts) document.fonts.ready.then(layout);

  // Arrival: each leg draws, then its control appears, in course order; below the fold, when the
  // control scrolls into view.
  if (reduce) return;
  root.classList.add("motion");
  // Reduce Motion turned on mid-visit: show the whole course now rather than leave the controls
  // below the fold hidden until scrolled to, with no motion left to bring them in.
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  const onReduce = (e) => { if (e.matches) finishAll(); };
  if (mq.addEventListener) mq.addEventListener("change", onReduce);
  else if (mq.addListener) mq.addListener(onReduce);
  syms.slice(1).forEach((s) => s.classList.add("pre"));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const seen = new Map();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting && seen.has(e.target)) { seen.get(e.target)(); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -12% 0px" });
  const whenSeen = (s) => new Promise((res) => { seen.set(s, res); io.observe(s); });
  (async () => {
    await wait(220);
    const order = syms;
    for (let i = 1; i < order.length && !arrived; i++) {
      await whenSeen(order[i]);
      if (arrived) return;
      legs[i - 1].classList.add("on");
      await wait(300);
      order[i].classList.remove("pre");
      await wait(110);
    }
    arrived = true;
  })();
})();
