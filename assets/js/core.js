/* House of Flavors — shared shell, cart store and scroll scenes */
(function () {
  const HOF = (window.HOF = window.HOF || {});
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  HOF.$ = $; HOF.$$ = $$;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  HOF.reduceMotion = reduce;

  /* ---------- helpers ---------- */
  HOF.icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="assets/icons.svg#${id}"/></svg>`;
  HOF.img = (slug, size = "sm") => `assets/img/${slug}${size === "sm" ? "-sm" : ""}.webp`;
  HOF.srcset = (slug) => `assets/img/${slug}-sm.webp 720w, assets/img/${slug}.webp 1600w`;
  HOF.money = (n, cents = false) => {
    const v = cents ? n.toFixed(2) : String(Math.round(n));
    const [i, d] = v.split(".");
    return "R" + i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + (d ? "." + d : "");
  };
  HOF.dish = (id) => HOF.menu.find((d) => d.id === id);
  HOF.event = (id) => HOF.events.find((e) => e.id === id);
  HOF.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  HOF.ref = (prefix = "HOF") => {
    const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = ""; for (let i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
    return `${prefix}-${s}`;
  };
  const tagLabel = { spicy: ["flame", "Spicy"], veg: ["leaf", "Veg"], share: ["share", "To share"] };
  HOF.tagHTML = (tags = [], only = ["spicy", "veg", "share"]) =>
    tags.filter((t) => only.includes(t)).map((t) => `<span class="tag ${t}">${HOF.icon(tagLabel[t][0])}${tagLabel[t][1]}</span>`).join("");

  /* ---------- storage (fails soft) ---------- */
  const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: keep in memory */ } }
  };
  HOF.store = store;

  /* ---------- cart ---------- */
  const KEY = "hof-cart-v2";
  let cart = store.get(KEY, []);
  const subs = new Set();
  const emit = () => { store.set(KEY, cart); subs.forEach((f) => f(cart)); };
  HOF.cart = {
    items: () => cart,
    on: (f) => { subs.add(f); f(cart); },
    find: (key) => cart.find((l) => l.key === key),
    lookup(line) {
      if (line.type === "ticket") { const e = HOF.event(line.id); return e && { name: e.name + " ticket", price: e.price, img: e.img, sub: fmtDate(e.date) + " · " + e.time }; }
      const d = HOF.dish(line.id); return d && { name: d.name, price: d.price, img: d.img, sub: HOF.categories.find((c) => c.id === d.cat)?.name };
    },
    add(id, qty = 1, type = "dish") {
      const key = type + ":" + id;
      const l = cart.find((x) => x.key === key);
      if (l) l.qty = Math.min(99, l.qty + qty); else cart.push({ key, id, type, qty });
      emit(); bumpCount();
      const info = HOF.cart.lookup({ id, type });
      HOF.toast(`<img src="${HOF.img(info.img)}" alt=""><div class="msg"><b>${HOF.esc(info.name)} added</b>Cart total is now ${HOF.money(HOF.cart.subtotal())} before VAT</div><button class="btn small dark" data-open-cart>View cart</button>`);
    },
    setQty(key, q) { const l = cart.find((x) => x.key === key); if (!l) return; if (q <= 0) cart = cart.filter((x) => x.key !== key); else l.qty = Math.min(99, q); emit(); },
    remove(key) { cart = cart.filter((x) => x.key !== key); emit(); },
    clear() { cart = []; emit(); },
    count: () => cart.reduce((s, l) => s + l.qty, 0),
    subtotal: () => cart.reduce((s, l) => s + (HOF.cart.lookup(l)?.price || 0) * l.qty, 0)
  };
  function fmtDate(iso) { return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  HOF.fmtDate = fmtDate;

  /* ---------- toast ---------- */
  let toastEl, toastT;
  HOF.toast = (html, ms = 3800) => {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.append(toastEl); }
    toastEl.innerHTML = html; requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), ms);
  };

  /* ---------- shell ---------- */
  const PAGES = [["menu.html", "Menu", "menu"], ["events.html", "Events", "events"], ["about.html", "Our house", "about"], ["cart.html#book", "Book a table", "book"]];
  function shell() {
    const page = document.body.dataset.page;
    const over = document.body.hasAttribute("data-nav-over");
    const navLinks = PAGES.slice(0, 3).map(([h, l, p]) => `<li><a href="${h}"${p === page ? ' aria-current="page"' : ""}>${l}</a></li>`).join("");
    const nav = document.createElement("header");
    nav.className = "nav" + (over ? " over" : "");
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html" aria-label="House of Flavors home"><span class="brand-mark"></span><span class="brand-name">House of Flavors</span></a>
      <nav aria-label="Main"><ul class="nav-links">${navLinks}</ul></nav>
      <a class="btn small book-btn" href="cart.html#book">Book a table</a>
      <button class="icon-btn cart-btn" data-open-cart aria-label="Open cart">${HOF.icon("bag")}<span class="cart-count num">0</span></button>
      <button class="icon-btn nav-toggle" aria-label="Open menu" aria-expanded="false">${HOF.icon("menu")}</button>
    </div>`;
    document.body.prepend(nav);

    const sheet = document.createElement("div");
    sheet.className = "sheet"; sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = `<div class="top"><a class="brand" href="index.html"><span class="brand-mark"></span><span class="brand-name">House of Flavors</span></a><button class="icon-btn" data-close-sheet aria-label="Close menu">${HOF.icon("x")}</button></div>
      <nav aria-label="Mobile">${[["index.html", "Home", "home"], ...PAGES].map(([h, l, p]) => `<a href="${h}"${p === page ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</nav>
      <div class="foot"><span>Open daily 11:00–23:00 · Kitchen closes 22:15</span><span>Av. Marginal 4120, Maputo · +258 84 300 4120</span></div>`;
    document.body.append(sheet);

    const scrim = document.createElement("div"); scrim.className = "scrim"; document.body.append(scrim);
    const drawer = document.createElement("aside");
    drawer.className = "drawer paper"; drawer.setAttribute("aria-label", "Your cart"); drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `<header><h2>Your order</h2><button class="icon-btn" data-close-cart aria-label="Close cart">${HOF.icon("x")}</button></header><div class="lines"></div><footer></footer>`;
    document.body.append(drawer);

    const footer = $("footer[data-shell]");
    if (footer) {
      footer.className = "footer";
      footer.innerHTML = `<div class="wrap">
        <div class="cols">
          <div class="stack" style="max-width:36ch">
            <a class="brand" href="index.html"><span class="brand-mark"></span><span class="brand-name">House of Flavors</span></a>
            <p class="muted">A big kitchen with a long table. Burgers, coal-grill, sushi and the sea, cooked by people from twelve countries since 2013.</p>
            <div class="socials"><a class="icon-btn" href="https://instagram.com" aria-label="Instagram">${HOF.icon("instagram")}</a><a class="icon-btn" href="https://facebook.com" aria-label="Facebook">${HOF.icon("facebook")}</a></div>
          </div>
          <div><h4>Eat</h4><ul><li><a href="menu.html">Full menu</a></li><li><a href="menu.html#signature">Signatures</a></li><li><a href="menu.html#drinks">Bar & cellar</a></li><li><a href="cart.html">Order for delivery</a></li></ul></div>
          <div><h4>Visit</h4><ul><li><a href="cart.html#book">Book a table</a></li><li><a href="events.html">Events</a></li><li><a href="about.html#houses">Our houses</a></li><li><a href="about.html#join">Work with us</a></li></ul></div>
          <div><h4>Maputo house</h4><ul class="muted"><li>Av. Marginal 4120</li><li>+258 84 300 4120</li><li>Daily 11:00–23:00</li></ul></div>
        </div>
        <div class="big" aria-hidden="true">House of Flavors</div>
        <div class="legal"><span>© 2026 House of Flavors. Menu prices exclude VAT; 15% is added at checkout.</span><span>Designed &amp; built by Francisco Lourenço do Ó da Silva · OS.Design</span></div>
      </div>`;
    }

    /* behaviour */
    const toggle = $(".nav-toggle", nav);
    const openSheet = (o) => { sheet.classList.toggle("open", o); sheet.setAttribute("aria-hidden", String(!o)); toggle.setAttribute("aria-expanded", String(o)); document.documentElement.style.overflow = o ? "hidden" : ""; };
    toggle.addEventListener("click", () => openSheet(true));
    $("[data-close-sheet]", sheet).addEventListener("click", () => openSheet(false));

    const openCart = (o) => { drawer.classList.toggle("open", o); scrim.classList.toggle("show", o); drawer.setAttribute("aria-hidden", String(!o)); document.documentElement.style.overflow = o ? "hidden" : ""; if (o) $("[data-close-cart]", drawer).focus(); };
    HOF.openCart = openCart;
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-open-cart]")) { e.preventDefault(); toastEl?.classList.remove("show"); openCart(true); }
      if (e.target.closest("[data-close-cart]")) openCart(false);
      const add = e.target.closest("[data-add]");
      if (add) { e.preventDefault(); HOF.cart.add(add.dataset.add, Number(add.dataset.qty || 1), add.dataset.type || "dish"); add.classList.add("done"); setTimeout(() => add.classList.remove("done"), 1200); }
      const q = e.target.closest("[data-qty-key]");
      if (q) { const l = HOF.cart.find(q.dataset.qtyKey); if (l) HOF.cart.setQty(l.key, l.qty + Number(q.dataset.delta)); }
    });
    scrim.addEventListener("click", () => openCart(false));
    addEventListener("keydown", (e) => { if (e.key === "Escape") { openCart(false); openSheet(false); } });

    const countEl = $(".cart-count", nav);
    HOF.cart.on(() => {
      const n = HOF.cart.count();
      countEl.textContent = n; countEl.classList.toggle("has", n > 0);
      renderDrawer(drawer);
    });

    if (over) {
      const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
      addEventListener("scroll", onScroll, { passive: true }); onScroll();
    }
  }
  function bumpCount() { const c = $(".cart-count"); if (!c) return; c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }

  function lineHTML(l, extra = "") {
    const info = HOF.cart.lookup(l); if (!info) return "";
    return `<div class="line">
      <img src="${HOF.img(info.img)}" alt="" loading="lazy">
      <div><div class="t">${HOF.esc(info.name)}</div><div class="meta">${HOF.esc(info.sub || "")} · ${HOF.money(info.price)}</div>${extra}</div>
      <div class="end"><strong class="num">${HOF.money(info.price * l.qty)}</strong>
        <div class="qty"><button data-qty-key="${l.key}" data-delta="-1" aria-label="One less">${HOF.icon(l.qty === 1 ? "trash" : "minus")}</button><output>${l.qty}</output><button data-qty-key="${l.key}" data-delta="1" aria-label="One more">${HOF.icon("plus")}</button></div>
      </div></div>`;
  }
  HOF.lineHTML = lineHTML;
  function renderDrawer(d) {
    const items = HOF.cart.items();
    const lines = $(".lines", d), foot = $("footer", d);
    if (!items.length) {
      lines.innerHTML = `<div class="empty"><div class="plate">${HOF.icon("bag")}</div><h3>Nothing on the table yet</h3><p>Add a dish from the menu and it will wait here while you browse.</p><a class="btn dark" href="menu.html">Open the menu</a></div>`;
      foot.innerHTML = ""; return;
    }
    lines.innerHTML = items.map((l) => lineHTML(l)).join("");
    const sub = HOF.cart.subtotal();
    foot.innerHTML = `<div class="sum-row"><span>Subtotal</span><span class="num">${HOF.money(sub, true)}</span></div>
      <div class="sum-row muted"><span>VAT 15%</span><span class="num">${HOF.money(sub * HOF.VAT, true)}</span></div>
      <div class="sum-row total"><span>Total</span><span class="num">${HOF.money(sub * (1 + HOF.VAT), true)}</span></div>
      <a class="btn dark block" href="cart.html">Choose delivery & pay</a>`;
  }

  /* ---------- dish card ---------- */
  HOF.dishCard = (d, opts = {}) => `<article class="dish">
    <div class="ph">
      <img src="${HOF.img(d.img)}" srcset="${HOF.srcset(d.img)}" sizes="(max-width:700px) 90vw, 320px" alt="${HOF.esc(d.name)}" loading="lazy" decoding="async" width="720" height="900">
      <div class="tags">${HOF.tagHTML(d.tags)}</div>
      <button class="add" data-add="${d.id}" aria-label="Add ${HOF.esc(d.name)} to cart">${HOF.icon("plus")}</button>
    </div>
    <div class="leader"><span class="name">${HOF.esc(d.name)}</span><span class="dots"></span><span class="price">${HOF.money(d.price)}</span></div>
    ${opts.desc === false ? "" : `<p class="d-desc">${HOF.esc(d.desc)}</p>`}
    <span class="rating">${HOF.icon("star")}${d.rate}% liked it</span>
    <a class="cover" href="dish.html#${d.id}" aria-label="${HOF.esc(d.name)} details"></a>
  </article>`;

  /* ---------- scroll scenes ----------
     Any [data-scene] gets --p (0→1) while it scrolls through the viewport,
     and data-step = the active chapter when data-steps="n" is set. */
  HOF.scenes = () => {
    const scenes = $$("[data-scene]");
    if (!scenes.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight;
      for (const el of scenes) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const mode = el.dataset.scene;
        let p;
        if (mode === "pin") p = (-r.top) / Math.max(1, r.height - vh);          // sticky scenes
        else p = (vh - r.top) / (vh + r.height);                                  // pass-through
        p = Math.min(1, Math.max(0, p));
        el.style.setProperty("--p", p.toFixed(4));
        const steps = Number(el.dataset.steps || 0);
        if (steps) {
          const s = Math.min(steps - 1, Math.floor(p * steps * 0.999));
          if (el.dataset.step !== String(s)) { el.dataset.step = s; el.dispatchEvent(new CustomEvent("step", { detail: s })); }
        }
        el.dispatchEvent(new CustomEvent("progress", { detail: p }));
      }
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    update();
  };

  document.addEventListener("DOMContentLoaded", () => { shell(); if (!reduce) HOF.scenes(); else HOF.$$("[data-scene]").forEach((s) => s.classList.add("static")); });
})();
