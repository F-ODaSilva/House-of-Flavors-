/* Events: featured next event, filters, ticket dialog */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$ } = HOF;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dateOf = (e) => new Date(e.date + "T00:00:00");
  const isPast = (e) => dateOf(e) < today;
  const sorted = [...HOF.events].sort((a, b) => {
    const pa = isPast(a), pb = isPast(b);
    if (pa !== pb) return pa ? 1 : -1;               // upcoming first
    return pa ? dateOf(b) - dateOf(a) : dateOf(a) - dateOf(b);
  });
  const next = sorted.find((e) => !isPast(e) && e.price > 0) || sorted[0];
  const month = (e) => dateOf(e).toLocaleDateString("en-GB", { month: "short" });
  const day = (e) => dateOf(e).getDate();
  const priceLabel = (e) => (e.price ? HOF.money(e.price) : "Free");
  const inDays = (e) => Math.round((dateOf(e) - today) / 864e5);

  $("#featured").innerHTML = `
    <div class="ph"><img src="${HOF.img(next.img, "lg")}" alt="" width="1600" height="1067"></div>
    <div class="body">
      <p class="kicker">Next up · ${inDays(next) === 0 ? "today" : inDays(next) === 1 ? "tomorrow" : "in " + inDays(next) + " days"}</p>
      <h2>${next.name}</h2>
      <p class="muted">${next.desc}</p>
      <div class="ev" style="gap:0"><div class="meta">
        <span>${HOF.icon("calendar")}${HOF.fmtDate(next.date)}, ${next.time}</span>
        <span>${HOF.icon("pin")}${next.place}</span>
      </div></div>
      <div class="row"><button class="btn" data-ev="${next.id}">Get tickets · ${priceLabel(next)}</button></div>
    </div>`;

  let filter = "all";
  function render() {
    const list = sorted.filter((e) => e.id !== next.id || filter !== "all").filter((e) => {
      if (filter === "all") return true;
      if (filter === "past") return isPast(e);
      if (filter === "upcoming") return !isPast(e);
      return e.kind.includes(filter);
    });
    $("#evCount").textContent = `${list.length} ${list.length === 1 ? "event" : "events"}`;
    $("#evGrid").innerHTML = list.map((e) => {
      const past = isPast(e);
      return `<article class="ev${past ? " is-past" : ""}">
        <div class="ph">
          <img src="${HOF.img(e.img)}" srcset="${HOF.srcset(e.img)}" sizes="(max-width:700px) 92vw, 400px" alt="" loading="lazy" width="720" height="495">
          <div class="date"><b class="num">${day(e)}</b><span>${month(e)}</span></div>
          ${past ? `<span class="past">Took place</span>` : ""}
        </div>
        <h3>${e.name}</h3>
        <div class="meta"><span>${HOF.icon("clock")}${e.time}</span><span>${HOF.icon("pin")}${e.place}</span></div>
        <p>${e.desc}</p>
        <div class="foot">
          <span class="price">${priceLabel(e)}</span>
          ${past ? `<span class="muted" style="font-size:.9rem">See you next year</span>` : `<button class="btn small" data-ev="${e.id}">${e.price ? "Get tickets" : "Save a spot"}</button>`}
        </div>
      </article>`;
    }).join("");
  }
  $$("#evChips .chip").forEach((c) => c.addEventListener("click", () => {
    filter = c.dataset.f;
    $$("#evChips .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    render();
  }));
  render();

  /* dialog */
  const dlg = $("#evModal");
  let qty = 2, cur;
  const buyHTML = () => cur.price ? `
    <div class="dish-buy" style="background:#e4ece6">
      <div class="qty" role="group" aria-label="Tickets"><button data-t="-1" aria-label="One less">${HOF.icon("minus")}</button><output class="num">${qty}</output><button data-t="1" aria-label="One more">${HOF.icon("plus")}</button></div>
      <button class="btn dark" id="mAdd" style="flex:1">Add ${qty} ${qty === 1 ? "ticket" : "tickets"} · ${HOF.money(cur.price * qty)}</button>
    </div>
    <p class="muted" style="font-size:.85rem">Tickets go into your order. Pay at checkout and show the reference at the door.</p>` : `
    <form id="rsvp" class="stack" novalidate>
      <div class="grid-2">
        <div class="field"><label for="rName">Name</label><input class="input" id="rName" required autocomplete="name"><span class="err"></span></div>
        <div class="field"><label for="rPeople">People</label><select class="select" id="rPeople">${[1, 2, 3, 4, 5, 6].map((n) => `<option>${n}</option>`).join("")}</select></div>
      </div>
      <button class="btn dark" type="submit">Save my spot</button>
    </form>`;
  const open = (id) => {
    cur = HOF.event(id); qty = 2;
    $("#mImg").src = HOF.img(cur.img, "lg");
    $("#mWhen").textContent = `${HOF.fmtDate(cur.date)} · ${cur.time} · ${cur.place}`;
    $("#mTitle").textContent = cur.name;
    $("#mDesc").textContent = cur.desc;
    $("#mBuy").innerHTML = buyHTML();
    dlg.showModal();
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ev]"); if (b) open(b.dataset.ev);
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
    const t = e.target.closest("[data-t]");
    if (t) { qty = Math.max(1, Math.min(10, qty + Number(t.dataset.t))); $("#mBuy").innerHTML = buyHTML(); }
    if (e.target.closest("#mAdd")) { HOF.cart.add(cur.id, qty, "ticket"); dlg.close(); }
  });
  dlg.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#rName"); const f = n.closest(".field");
    if (n.value.trim().length < 2) { f.classList.add("invalid"); $(".err", f).textContent = "Enter the name for the guest list."; n.focus(); return; }
    $("#mBuy").innerHTML = `<div class="receipt"><span class="muted">Your spot is saved</span><span class="ref">${HOF.ref("RSVP")}</span><span>${HOF.esc(n.value.trim())} · ${$("#rPeople").value} ${$("#rPeople").value === "1" ? "person" : "people"} · ${HOF.fmtDate(cur.date)}, ${cur.time}</span></div>`;
  });
});
