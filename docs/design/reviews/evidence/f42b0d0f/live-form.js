// Launchpad kit form script (C5): progressive submit for the kit's sign-up
// form (kit/form/<slug>.<lc>.html), served at /kit/form.js. Hand-written
// ES2018 with no build step and no dependencies. Without fetch, FormData or
// URLSearchParams it does nothing, and the form posts natively (C1's 303).
//
// For each form[data-launchpad-form] (the kit form contract, slice 2 plan):
// - The fill-time token: GET data-token-url when the page loads and after
//   every submit, asking for JSON (a stranger origin's 403 is then JSON, and
//   unreadable: no token). Its `t` goes in the form; its `min_ms` is waited
//   out from the moment it arrived before a press is sent, since C1 drops a
//   younger token silently (M4). A token older than 50 minutes (they last an
//   hour) is fetched afresh at the press. A press waits at most 2 s for a
//   token on its way; without one (late, refused, 429) it sends without `t`.
// - A press is taken at once: later presses are ignored until the answer,
//   the values sent are the ones pressed, and nothing visible changes during
//   the wait. data-state="sending" and aria-disabled start with the POST;
//   after a second in flight the status says it's sending.
// - The answer goes in the one [data-launchpad-status] (role=status, so it
//   is announced), as text: 202 is data-msg-check-email with the address
//   and data-project-name; 422 invalid_email is data-msg-invalid-email with
//   the field marked invalid, described by the status and focused; 429 is
//   data-msg-rate-limited; offline is data-msg-offline; anything else, a
//   timeout (data-timeout-ms, default 10 s) included, is data-msg-failed.
//   The values stay. The same answer twice still changes the text, so it is
//   announced again.
// - No layout shift: at a press, the status reserves the height of its
//   tallest answer (a shift at a press isn't one a person minds; CLS leaves
//   it out), so the answer appears without moving anything.
// - It never touches the honeypot.
(() => {
  "use strict";
  if (!(window.fetch && window.FormData && window.URLSearchParams)) return;

  const STALE_MS = 50 * 60 * 1000;
  const TOKEN_WAIT_MS = 2000;
  const SAY_SENDING_MS = 1000;
  const MESSAGES = ["msgSending", "msgCheckEmail", "msgInvalidEmail", "msgRateLimited", "msgFailed", "msgOffline"];
  const now = () => performance.now();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let ids = 0;

  // Rejects after `ms`, aborting the request when the browser can.
  const timed = (promise, ms, controller) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (controller) controller.abort();
        reject(new Error("timeout"));
      }, ms);
      const settle = (fn) => (value) => {
        clearTimeout(timer);
        fn(value);
      };
      promise.then(settle(resolve), settle(reject));
    });

  function init(form) {
    if (form.launchpad) return;
    form.launchpad = true;
    const data = form.dataset;
    const field = form.elements.email;
    const tField = form.elements.t;
    const button = form.querySelector("[type=submit]");
    const status = form.querySelector("[data-launchpad-status]");
    const statusId = status.id || (status.id = "launchpad-status-" + ++ids);
    let token = null; // {t, min, at}
    let pending = null; // the token fetch on its way
    let fetches = 0;
    let busy = false;
    let reserved = null; // the address the status's height is reserved for

    const fill = (text, email) =>
      (text || "").replace(/%\{(email|project)\}/g, (_, key) => (key === "email" ? email : data.projectName || ""));

    function fetchToken() {
      const mine = ++fetches;
      const done = (tok) => {
        if (mine !== fetches) return pending;
        token = tok;
        tField.value = tok ? tok.t : "";
        pending = null;
        return tok;
      };
      pending = fetch(data.tokenUrl, { credentials: "omit", headers: { Accept: "application/json" } })
        .then((res) => (res.ok ? res.json() : null))
        .then((body) => (body && typeof body.t === "string" ? { t: body.t, min: Number(body.min_ms) || 0, at: now() } : null))
        .catch(() => null)
        .then(done);
      return pending;
    }

    function reserve(email) {
      reserved = email;
      const probe = status.cloneNode(false);
      probe.removeAttribute("id");
      probe.setAttribute("aria-hidden", "true");
      Object.assign(probe.style, { position: "absolute", visibility: "hidden", minHeight: "0", width: getComputedStyle(status).width });
      status.after(probe);
      let height = 0;
      for (const key of MESSAGES) {
        probe.textContent = fill(data[key], email);
        height = Math.max(height, parseFloat(getComputedStyle(probe).height) || 0);
      }
      probe.remove();
      status.style.minHeight = height + "px";
    }

    function say(text) {
      // The same text again wouldn't be announced: vary it invisibly.
      status.textContent = status.textContent === text ? text + " " : text;
    }

    function describe(invalid) {
      const others = (field.getAttribute("aria-describedby") || "").split(" ").filter((id) => id && id !== statusId);
      if (invalid) {
        field.setAttribute("aria-invalid", "true");
        others.push(statusId);
      } else field.removeAttribute("aria-invalid");
      if (others.length) field.setAttribute("aria-describedby", others.join(" "));
      else field.removeAttribute("aria-describedby");
    }

    async function send(body, email) {
      let tok = token;
      if (tok && now() - tok.at > STALE_MS) {
        tok = token = null;
        fetchToken();
      }
      if (!tok && pending) tok = await Promise.race([pending, sleep(TOKEN_WAIT_MS)]);
      // Single use: whatever happens to this POST, the next press waits for
      // the token fetched after it.
      if (tok === token) token = null;
      tField.value = "";
      if (tok) {
        const left = tok.min - (now() - tok.at);
        if (left > 0) await sleep(left);
        body.set("t", tok.t);
      } else body.set("t", "");

      data.state = "sending";
      button.setAttribute("aria-disabled", "true");
      const slow = setTimeout(() => say(data.msgSending), SAY_SENDING_MS);
      const controller = window.AbortController ? new AbortController() : null;
      let kind = "Failed";
      try {
        // The deadline covers the whole answer, its body too: headers in time
        // and a body that stalls is still a timeout.
        kind = await timed(
          fetch(form.action, {
            method: "POST",
            body,
            headers: { Accept: "application/json" },
            credentials: "omit",
            signal: controller ? controller.signal : undefined,
          }).then((res) =>
            res.status === 202
              ? "CheckEmail"
              : res.status === 429
                ? "RateLimited"
                : res.status === 422
                  ? res.json().then((answer) => (answer && answer.error === "invalid_email" ? "InvalidEmail" : "Failed"))
                  : "Failed",
          ),
          Number(data.timeoutMs) || 10000,
          controller,
        );
      } catch (error) {
        if (error.message !== "timeout" && navigator.onLine === false) kind = "Offline";
      }
      clearTimeout(slow);
      data.state = kind === "CheckEmail" ? "accepted" : "error";
      button.removeAttribute("aria-disabled");
      describe(kind === "InvalidEmail");
      say(fill(data["msg" + kind], email));
      if (kind === "InvalidEmail") field.focus();
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (busy) return;
      busy = true;
      const body = new URLSearchParams(new FormData(form));
      const email = (body.get("email") || "").trim();
      reserve(email);
      send(body, email).finally(() => {
        busy = false;
        fetchToken();
      });
    });

    let frame = 0;
    window.addEventListener("resize", () => {
      if (reserved === null || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        reserve(reserved);
      });
    });

    fetchToken();
  }

  const start = () => document.querySelectorAll("form[data-launchpad-form]").forEach(init);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
