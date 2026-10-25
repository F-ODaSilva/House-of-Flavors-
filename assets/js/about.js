/* About: pinned timeline, count-up stats, join forms with validation */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$ } = HOF;

  /* timeline */
  const tl = $(".timeline");
  const years = [2013, 2016, 2019, 2022, 2026];
  const entries = $$(".tl-entry", tl), photos = $$(".tl-photos img", tl), rail = $$(".tl-rail span", tl);
  const yearEl = $("#yearBig");
  let shown = 2013, raf;
  const animateYear = (to) => {
    cancelAnimationFrame(raf);
    const from = shown, t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 600); shown = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); yearEl.textContent = shown; if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  tl.addEventListener("step", (e) => {
    const s = e.detail;
    entries.forEach((el, i) => el.classList.toggle("on", i === s));
    photos.forEach((el, i) => el.classList.toggle("on", i === s));
    rail.forEach((el, i) => el.classList.toggle("on", i <= s));
    animateYear(years[s]);
  });
  if (HOF.reduceMotion) { tl.classList.add("static"); photos.forEach((p, i) => p.classList.toggle("on", i === 0)); }

  /* count-up stats when visible */
  const io = new IntersectionObserver((list) => list.forEach((en) => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const el = en.target, to = Number(el.dataset.count); if (HOF.reduceMotion) return;
    const t0 = performance.now();
    const f = (t) => { const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString("en"); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }), { threshold: .6 });
  $$("[data-count]").forEach((el) => io.observe(el));

  /* join forms */
  const form = $("#joinForm"), done = $("#joinDone");
  let mode = "team";
  const setMode = (m) => {
    mode = m;
    $("#tab-team").setAttribute("aria-selected", String(m === "team"));
    $("#tab-comm").setAttribute("aria-selected", String(m === "comm"));
    $$(".team-only", form).forEach((el) => (el.hidden = m !== "team"));
    $("#jRole").required = m === "team";
    $("#joinSubmit").textContent = m === "team" ? "Send application" : "Join the community";
    $("#joinImg").src = HOF.img(m === "team" ? "about2" : "comunity");
    form.hidden = false; done.hidden = true;
  };
  $("#tab-team").addEventListener("click", () => setMode("team"));
  $("#tab-comm").addEventListener("click", () => setMode("comm"));

  const rules = {
    jFirst: (v) => v.trim().length >= 2 || "Enter your first name.",
    jLast: (v) => v.trim().length >= 2 || "Enter your last name.",
    jEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Enter an email like name@example.com.",
    jPhone: (v) => !v || /^\+?[\d\s()-]{8,}$/.test(v) || "Use digits only, with the country code, e.g. +258 84 000 0000.",
    jHouse: (v) => !!v || "Choose the house nearest to you.",
    jRole: (v) => mode !== "team" || !!v || "Choose the role you're applying for."
  };
  const check = (id) => {
    const el = $("#" + id), r = rules[id](el.value), f = el.closest(".field");
    f.classList.toggle("invalid", r !== true); $(".err", f).textContent = r === true ? "" : r; return r === true;
  };
  Object.keys(rules).forEach((id) => $("#" + id).addEventListener("blur", () => check(id)));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { form.querySelector(".invalid input, .invalid select")?.focus(); return; }
    const name = $("#jFirst").value.trim(), house = $("#jHouse").value;
    $("#joinDoneTitle").textContent = mode === "team" ? "Application sent" : "You're on the list";
    $("#joinDoneText").textContent = mode === "team"
      ? `Thanks, ${name}. The ${house} house manager reads every application and replies within five working days. Your reference is ${HOF.ref("JOB")}.`
      : `Welcome, ${name}. You'll hear about ${house} events a week before tickets go on sale.`;
    form.reset(); form.hidden = true; done.hidden = false;
  });
  $("#joinAgain").addEventListener("click", () => setMode(mode));
  if (location.hash === "#join") setTimeout(() => $("#join").scrollIntoView(), 60);
});
