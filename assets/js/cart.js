/* Checkout (delivery/collection, coupons, VAT, reference) and table booking */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$, t } = HOF;

  /* ---------- tabs via hash ---------- */
  const showTab = () => {
    const book = location.hash === "#book";
    $("#orderPanel").hidden = book; $("#bookPanel").hidden = !book;
    $("#tabOrder").setAttribute("aria-selected", String(!book));
    $("#tabBook").setAttribute("aria-selected", String(book));
    document.title = (book ? t("Reservar mesa", "Book a table") : t("Finalizar pedido", "Checkout")) + " · House of Flavors";
    scrollTo({ top: 0 });
  };
  addEventListener("hashchange", showTab); showTab();

  /* ---------- time slot helpers ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const slotsFrom = (startMin, endMin, step = 15) => { const out = []; for (let m = startMin; m <= endMin; m += step) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`); return out; };
  const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
  const fillTimes = (sel, lead) => {
    const start = Math.max(11 * 60 + 30, Math.ceil((nowMin + lead) / 15) * 15);
    const list = slotsFrom(start, 22 * 60 + 15);
    sel.innerHTML = list.length ? list.map((x) => `<option>${x}</option>`).join("") : `<option value="">${t("Cozinha fechada hoje, peça para amanhã por telefone", "Kitchen closed for today, choose tomorrow by phone")}</option>`;
  };
  fillTimes($("#schedTime"), 60); fillTimes($("#pickTime"), 25);

  /* ---------- saved for later ---------- */
  let saved = HOF.store.get("hof-saved", []);
  const saveSaved = () => HOF.store.set("hof-saved", saved);

  /* ---------- order state ---------- */
  let coupon = null;
  const state = () => {
    const mode = $('input[name="mode"]:checked').value;
    const speed = mode === "collect" ? "collect" : $('input[name="speed"]:checked').value;
    const sub = HOF.cart.subtotal();
    let discount = 0, fee = HOF.delivery[speed].fee;
    if (coupon) {
      const c = HOF.coupons[coupon];
      if (c.type === "percent") discount = sub * c.value / 100;
      if (c.type === "delivery") fee = 0;
    }
    const net = sub - discount + fee;
    const vat = net * HOF.VAT;
    return { mode, speed, sub, discount, fee, vat, total: net + vat };
  };

  function renderLines() {
    const items = HOF.cart.items();
    $("#itemCount").textContent = items.length ? `${HOF.cart.count()} ${HOF.cart.count() === 1 ? t("artigo", "item") : t("artigos", "items")}` : "";
    $("#coLines").innerHTML = items.length ? items.map((l) => HOF.lineHTML(l, `<button type="button" class="save-later" data-save="${l.key}">${t("Guardar para depois", "Save for later")}</button>`)).join("")
      : `<div class="empty-cart"><h3>${t("O seu pedido está vazio", "Your order is empty")}</h3><p class="muted">${t("Comece pelas assinaturas, ou abra qualquer secção do menu.", "Start with the signatures, or open any section of the menu.")}</p><a class="btn dark" href="menu.html">${t("Abrir o menu", "Open the menu")}</a></div>`;
    const box = $("#savedBox");
    box.hidden = !saved.length;
    box.innerHTML = saved.length ? `<h3>${t("Guardado para depois", "Saved for later")}</h3>` + saved.map((s) => {
      const info = HOF.cart.lookup(s); if (!info) return "";
      return `<div class="saved-item"><img src="${HOF.img(info.img)}" alt=""><span>${HOF.esc(info.name)} · ${HOF.money(info.price)}</span><button type="button" class="btn small ghost" data-restore="${s.key}">${t("Mover para o pedido", "Move to order")}</button><button type="button" class="icon-btn" data-drop="${s.key}" aria-label="${t("Remover", "Remove")} ${HOF.esc(info.name)}">${HOF.icon("x")}</button></div>`;
    }).join("") : "";
    $("#fulfilCard").style.opacity = items.length ? "" : ".55";
    $("#confirmBtn").disabled = !items.length;
  }
  function renderSummary() {
    const s = state();
    const row = (l, v, cls = "") => `<div class="sum-row ${cls}"><span>${l}</span><span class="num">${v}</span></div>`;
    $("#sumRows").innerHTML =
      row(t("Subtotal", "Subtotal"), HOF.money(s.sub, true)) +
      (s.discount ? row(`${t("Desconto", "Discount")} (${coupon})`, "−" + HOF.money(s.discount, true), "discount") : "") +
      row(s.mode === "collect" ? t("Levantamento", "Collection") : HOF.L(HOF.delivery[s.speed], "label"), s.fee ? HOF.money(s.fee, true) : (coupon && HOF.coupons[coupon].type === "delivery" && s.mode !== "collect" ? t("Grátis com código", "Free with code") : t("Grátis", "Free")), s.fee ? "" : "discount") +
      row(t("IVA 15%", "VAT 15%"), HOF.money(s.vat, true), "muted") +
      `<div style="border-top:1.5px solid var(--line-ink);margin-top:6px;padding-top:10px">${row("Total", HOF.money(s.total, true), "total")}</div>`;
    $("#confirmBtn").textContent = HOF.cart.count() ? `${t("Confirmar pedido", "Confirm order")} · ${HOF.money(s.total, true)}` : t("Confirmar pedido", "Confirm order");
  }
  HOF.cart.on(() => {
    if (coupon === "YLJF37S05" && HOF.cart.subtotal() < 150) { coupon = null; setMsg(t("O código de 50% exige um pedido de R150 ou mais. Junte mais alguma coisa e aplique de novo.", "The 50% code needs an order of R150 or more. Add a little more and apply it again."), "bad"); }
    renderLines(); renderSummary();
  });

  document.addEventListener("click", (e) => {
    const sv = e.target.closest("[data-save]");
    if (sv) { const l = HOF.cart.find(sv.dataset.save); if (l) { saved = saved.filter((x) => x.key !== l.key).concat({ ...l }); saveSaved(); HOF.cart.remove(l.key); } }
    const rs = e.target.closest("[data-restore]");
    if (rs) { const s = saved.find((x) => x.key === rs.dataset.restore); saved = saved.filter((x) => x.key !== s.key); saveSaved(); HOF.cart.add(s.id, s.qty, s.type); }
    const dr = e.target.closest("[data-drop]");
    if (dr) { saved = saved.filter((x) => x.key !== dr.dataset.drop); saveSaved(); renderLines(); }
  });

  /* fulfilment toggles */
  const syncMode = () => {
    const s = state();
    $("#deliveryBox").hidden = s.mode !== "delivery";
    $("#collectBox").hidden = s.mode !== "collect";
    $("#schedField").hidden = s.speed !== "scheduled";
    renderSummary();
  };
  $$('input[name="mode"], input[name="speed"]').forEach((r) => r.addEventListener("change", syncMode));
  syncMode();

  /* coupons */
  const setMsg = (msg, cls) => { const m = $("#couponMsg"); m.textContent = msg; m.className = "coupon-msg " + (cls || ""); };
  $("#couponBtn").addEventListener("click", () => {
    const code = $("#couponIn").value.trim().toUpperCase();
    if (!code) return setMsg(t("Escreva primeiro um código.", "Type a code first."), "bad");
    const c = HOF.coupons[code];
    if (!c) { coupon = null; renderSummary(); return setMsg(t(`${code} não é um código válido. Confirme a ortografia, os códigos não têm espaços.`, `${code} isn't a valid code. Check the spelling, codes have no spaces.`), "bad"); }
    if (code === "YLJF37S05" && HOF.cart.subtotal() < 150) return setMsg(t(`Este código é válido em pedidos a partir de R150. Vai em ${HOF.money(HOF.cart.subtotal())}.`, `This code works on orders from R150. You're at ${HOF.money(HOF.cart.subtotal())}.`), "bad");
    coupon = code; setMsg(t(`${HOF.L(c, "label")} aplicado.`, `${HOF.L(c, "label")} applied.`), "ok"); renderSummary();
  });
  $("#couponIn").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); $("#couponBtn").click(); } });

  /* validation */
  const setErr = (el, msg) => { const f = el.closest(".field"); f.classList.toggle("invalid", !!msg); $(".err", f).textContent = msg || ""; return !msg; };
  const phoneOk = (v) => /^\+?[\d\s()-]{9,}$/.test(v.trim());

  $("#coForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!HOF.cart.count()) return;
    const s = state();
    let ok = true;
    if (s.mode === "delivery") {
      ok = setErr($("#addr"), $("#addr").value.trim().length < 6 ? t("Escreva a rua e o número para o estafeta o encontrar.", "Enter the street and number so the rider can find you.") : "") && ok;
      ok = setErr($("#suburb"), !$("#suburb").value ? t("Escolha o seu bairro. Entregamos em Maputo e na Matola.", "Choose your neighbourhood. We deliver in Maputo and Matola.") : "") && ok;
    }
    ok = setErr($("#cName"), $("#cName").value.trim().length < 2 ? t("Escreva o nome para o pedido.", "Enter the name for the order.") : "") && ok;
    ok = setErr($("#cPhone"), !phoneOk($("#cPhone").value) ? t("Escreva um telemóvel com o indicativo, ex.: +258 84 000 0000.", "Enter a mobile number with the country code, e.g. +258 84 000 0000.") : "") && ok;
    if (!ok) { $(".invalid input, .invalid select")?.focus(); return; }

    const ref = HOF.ref();
    const eta = s.mode === "collect" ? t(`Levante às ${$("#pickTime").value} na Av. Marginal 4120`, `Collect at ${$("#pickTime").value} from Av. Marginal 4120`) : s.speed === "scheduled" ? t(`Chega às ${$("#schedTime").value}`, `Arrives at ${$("#schedTime").value}`) : t(`Chega em ${HOF.L(HOF.delivery[s.speed], "eta")}`, `Arrives in ${HOF.L(HOF.delivery[s.speed], "eta")}`);
    const items = HOF.cart.items().map((l) => { const i = HOF.cart.lookup(l); return `<div class="sum-row"><span>${l.qty} × ${HOF.esc(i.name)}</span><span>${HOF.money(i.price * l.qty)}</span></div>`; }).join("");
    $("#doneText").textContent = t(`Obrigado, ${$("#cName").value.trim().split(" ")[0]}. ${eta}. Enviámos os detalhes para ${$("#cPhone").value.trim()}.`, `Thanks, ${$("#cName").value.trim().split(" ")[0]}. ${eta}. We've sent the details to ${$("#cPhone").value.trim()}.`);
    $("#receipt").innerHTML = `<span class="muted">${t("Referência do pedido", "Order reference")}</span><span class="ref">${ref}</span>${items}
      <div style="border-top:1px dashed var(--line-ink);margin:6px 0"></div>
      ${s.discount ? `<div class="sum-row"><span>${t("Desconto", "Discount")}</span><span>−${HOF.money(s.discount, true)}</span></div>` : ""}
      <div class="sum-row"><span>${s.mode === "collect" ? t("Levantamento", "Collection") : t("Entrega", "Delivery")}</span><span>${s.fee ? HOF.money(s.fee, true) : t("Grátis", "Free")}</span></div>
      <div class="sum-row"><span>${t("IVA 15%", "VAT 15%")}</span><span>${HOF.money(s.vat, true)}</span></div>
      <div class="sum-row total"><span>${t("Total", "Total")}</span><span>${HOF.money(s.total, true)}</span></div>
      <div class="sum-row muted"><span>${t("Pagamento", "Payment")}</span><span>${{ card: t("Cartão na entrega", "Card on delivery"), mpesa: t("M-Pesa na entrega", "M-Pesa on delivery"), cash: t("Dinheiro", "Cash") }[$('input[name="pay"]:checked').value]}</span></div>`;
    $("#coGrid").hidden = true; $("#doneCard").hidden = false;
    HOF.cart.clear(); coupon = null;
    scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- booking ---------- */
  $("#party").innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<label><input type="radio" name="party" value="${n}"${n === 2 ? " checked" : ""}><span class="num">${n}</span></label>`).join("");
  const dateEl = $("#bDate");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const max = new Date(); max.setDate(max.getDate() + 60);
  dateEl.min = iso(new Date()); dateEl.max = iso(max); dateEl.value = iso(new Date(Date.now() + 864e5));
  const renderSlots = () => {
    const seed = dateEl.value.split("-").reduce((a, b) => a + Number(b), 0);
    const isToday = dateEl.value === iso(new Date());
    const list = slotsFrom(12 * 60, 21 * 60 + 30, 30);
    $("#slots").innerHTML = list.map((x, i) => {
      const [h, m] = x.split(":").map(Number);
      const gone = isToday && h * 60 + m < nowMin + 30;
      const full = (i * 7 + seed) % 5 === 0;
      return `<label><input type="radio" name="slot" value="${x}"${gone || full ? " disabled" : ""}><span>${x}</span></label>`;
    }).join("");
  };
  dateEl.addEventListener("change", renderSlots); renderSlots();

  $("#bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = setErr($("#bName"), $("#bName").value.trim().length < 2 ? t("Escreva o nome para a reserva.", "Enter the name for the booking.") : "");
    ok = setErr($("#bPhone"), !phoneOk($("#bPhone").value) ? t("Escreva um telemóvel com o indicativo.", "Enter a mobile number with the country code.") : "") && ok;
    ok = setErr(dateEl, !dateEl.value || dateEl.value < dateEl.min || dateEl.value > dateEl.max ? t("Escolha uma data nos próximos 60 dias.", "Choose a date within the next 60 days.") : "") && ok;
    const slot = $('input[name="slot"]:checked');
    $("#slotErr").textContent = slot ? "" : t("Escolha uma hora. As horas riscadas estão esgotadas.", "Choose a time. Crossed-out times are fully booked.");
    if (!ok || !slot) { $(".invalid input")?.focus(); return; }
    const people = $('input[name="party"]:checked').value;
    const d = new Date(dateEl.value + "T12:00:00").toLocaleDateString(HOF.locale, { weekday: "long", day: "numeric", month: "long" });
    $("#bookReceipt").innerHTML = `<span class="muted">${t("Referência da reserva", "Booking reference")}</span><span class="ref">${HOF.ref("TBL")}</span>
      <div class="sum-row"><span>${t("Nome", "Name")}</span><span>${HOF.esc($("#bName").value.trim())}</span></div>
      <div class="sum-row"><span>${t("Pessoas", "Guests")}</span><span>${people}</span></div>
      <div class="sum-row"><span>${t("Quando", "When")}</span><span>${d}, ${slot.value}</span></div>
      <div class="sum-row"><span>${t("Ocasião", "Occasion")}</span><span>${$('input[name="occ"]:checked').nextElementSibling.textContent}</span></div>
      <div class="sum-row muted"><span>${t("Onde", "Where")}</span><span>Av. Marginal 4120, Maputo</span></div>`;
    $("#bookForm").hidden = true; $("#bookDone").hidden = false;
  });
  $("#bookAgain").addEventListener("click", () => { $("#bookForm").reset(); dateEl.value = iso(new Date(Date.now() + 864e5)); renderSlots(); $("#bookForm").hidden = false; $("#bookDone").hidden = true; });
});
