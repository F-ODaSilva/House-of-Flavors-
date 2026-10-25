/* Events: featured next event, filters, ticket dialog */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$, t } = HOF;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dateOf = (e) => new Date(e.date + "T00:00:00");
  const isPast = (e) => dateOf(e) < today;
  const sorted = [...HOF.events].sort((a, b) => {
    const pa = isPast(a), pb = isPast(b);
    if (pa !== pb) return pa ? 1 : -1;               // upcoming first
    return pa ? dateOf(b) - dateOf(a) : dateOf(a) - dateOf(b);
  });
  const next = sorted.find((e) => !isPast(e) && e.price > 0) || sorted[0];
  const month = (e) => dateOf(e).toLocaleDateString(HOF.locale, { month: "short" }).replace(".", "");
  const day = (e) => dateOf(e).getDate();
  const priceLabel = (e) => (e.price ? HOF.money(e.price) : t("Grátis", "Free"));
  const inDays = (e) => Math.round((dateOf(e) - today) / 864e5);

  $("#featured").innerHTML = `
    <div class="ph"><img src="${HOF.img(next.img, "lg")}" alt="" width="1600" height="1067"></div>
    <div class="body">
      <p class="kicker">${t("A seguir", "Next up")} · ${inDays(next) === 0 ? t("hoje", "today") : inDays(next) === 1 ? t("amanhã", "tomorrow") : t(`daqui a ${inDays(next)} dias`, `in ${inDays(next)} days`)}</p>
      <h2>${HOF.L(next, "name")}</h2>
      <p class="muted">${HOF.L(next, "desc")}</p>
      <div class="ev" style="gap:0"><div class="meta">
        <span>${HOF.icon("calendar")}${HOF.fmtDate(next.date)}, ${next.time}</span>
        <span>${HOF.icon("pin")}${HOF.L(next, "place")}</span>
      </div></div>
      <div class="row"><button class="btn" data-ev="${next.id}">${t("Comprar bilhetes", "Get tickets")} · ${priceLabel(next)}</button></div>
    </div>`;

  let filter = "all";
  function render() {
    const list = sorted.filter((e) => e.id !== next.id || filter !== "all").filter((e) => {
      if (filter === "all") return true;
      if (filter === "past") return isPast(e);
      if (filter === "upcoming") return !isPast(e);
      return e.kind.includes(filter);
    });
    $("#evCount").textContent = `${list.length} ${list.length === 1 ? t("evento", "event") : t("eventos", "events")}`;
    $("#evGrid").innerHTML = list.map((e) => {
      const past = isPast(e);
      return `<article class="ev${past ? " is-past" : ""}">
        <div class="ph">
          <img src="${HOF.img(e.img)}" srcset="${HOF.srcset(e.img)}" sizes="(max-width:700px) 92vw, 400px" alt="" loading="lazy" width="720" height="495">
          <div class="date"><b class="num">${day(e)}</b><span>${month(e)}</span></div>
          ${past ? `<span class="past">${t("Já aconteceu", "Took place")}</span>` : ""}
        </div>
        <h3>${HOF.L(e, "name")}</h3>
        <div class="meta"><span>${HOF.icon("clock")}${e.time}</span><span>${HOF.icon("pin")}${HOF.L(e, "place")}</span></div>
        <p>${HOF.L(e, "desc")}</p>
        <div class="foot">
          <span class="price">${priceLabel(e)}</span>
          ${past ? `<span class="muted" style="font-size:.9rem">${t("Até para o ano", "See you next year")}</span>` : `<button class="btn small" data-ev="${e.id}">${e.price ? t("Comprar bilhetes", "Get tickets") : t("Reservar lugar", "Save a spot")}</button>`}
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
      <div class="qty" role="group" aria-label="${t("Bilhetes", "Tickets")}"><button data-t="-1" aria-label="${t("Menos um", "One less")}">${HOF.icon("minus")}</button><output class="num">${qty}</output><button data-t="1" aria-label="${t("Mais um", "One more")}">${HOF.icon("plus")}</button></div>
      <button class="btn dark" id="mAdd" style="flex:1">${t(`Adicionar ${qty} ${qty === 1 ? "bilhete" : "bilhetes"}`, `Add ${qty} ${qty === 1 ? "ticket" : "tickets"}`)} · ${HOF.money(cur.price * qty)}</button>
    </div>
    <p class="muted" style="font-size:.85rem">${t("Os bilhetes entram no seu pedido. Pague no checkout e mostre a referência à entrada.", "Tickets go into your order. Pay at checkout and show the reference at the door.")}</p>` : `
    <form id="rsvp" class="stack" novalidate>
      <div class="grid-2">
        <div class="field"><label for="rName">${t("Nome", "Name")}</label><input class="input" id="rName" required autocomplete="name"><span class="err"></span></div>
        <div class="field"><label for="rPeople">${t("Pessoas", "People")}</label><select class="select" id="rPeople">${[1, 2, 3, 4, 5, 6].map((n) => `<option>${n}</option>`).join("")}</select></div>
      </div>
      <button class="btn dark" type="submit">${t("Reservar o meu lugar", "Save my spot")}</button>
    </form>`;
  const open = (id) => {
    cur = HOF.event(id); qty = 2;
    $("#mImg").src = HOF.img(cur.img, "lg");
    $("#mWhen").textContent = `${HOF.fmtDate(cur.date)} · ${cur.time} · ${HOF.L(cur, "place")}`;
    $("#mTitle").textContent = HOF.L(cur, "name");
    $("#mDesc").textContent = HOF.L(cur, "desc");
    $("#mBuy").innerHTML = buyHTML();
    dlg.showModal();
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ev]"); if (b) open(b.dataset.ev);
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
    const tb = e.target.closest("[data-t]");
    if (tb) { qty = Math.max(1, Math.min(10, qty + Number(tb.dataset.t))); $("#mBuy").innerHTML = buyHTML(); }
    if (e.target.closest("#mAdd")) { HOF.cart.add(cur.id, qty, "ticket"); dlg.close(); }
  });
  dlg.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#rName"); const f = n.closest(".field");
    if (n.value.trim().length < 2) { f.classList.add("invalid"); $(".err", f).textContent = t("Escreva o nome para a lista de convidados.", "Enter the name for the guest list."); n.focus(); return; }
    $("#mBuy").innerHTML = `<div class="receipt"><span class="muted">${t("O seu lugar está reservado", "Your spot is saved")}</span><span class="ref">${HOF.ref("RSVP")}</span><span>${HOF.esc(n.value.trim())} · ${$("#rPeople").value} ${$("#rPeople").value === "1" ? t("pessoa", "person") : t("pessoas", "people")} · ${HOF.fmtDate(cur.date)}, ${cur.time}</span></div>`;
  });
});
