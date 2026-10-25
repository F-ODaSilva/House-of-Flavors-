/* Dish detail page — reads the dish id from the hash (dish.html#texas-double-decker) or ?id= */
document.addEventListener("DOMContentLoaded", () => {
  const { $ } = HOF;
  const station = { burgers: "Burger bar", chicken: "Fry station", pizza: "Wood oven", steak: "Coal grill", seafood: "Sea station", sushi: "Sushi counter", drinks: "Bar" };
  const ready = { burgers: "12 min", chicken: "15 min", pizza: "9 min", steak: "18 min", seafood: "16 min", sushi: "10 min", drinks: "4 min" };
  const pool = [
    ["Amina S.", "Matola", "Exactly as good as last time. Arrived hot, which is rare for delivery."],
    ["Diego F.", "Maputo", "Portion is generous. I'd order it again without thinking."],
    ["Naledi P.", "Durban", "Ordered it for the table and it disappeared in five minutes."],
    ["Joaquim R.", "Beira", "Well seasoned, not too salty. The sauce on the side is a nice touch."],
    ["Chloé B.", "Lisbon", "Visited the Lisbon house and had to try it here too. Same recipe, same quality."],
    ["Sipho N.", "Pretoria", "Good value for the price. Staff suggested the pairing and they were right."]
  ];
  let qty = 1, d;

  function load() {
    const id = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("id");
    d = HOF.dish(id) || HOF.dish("texas-double-decker");
    const cat = HOF.categories.find((c) => c.id === d.cat);
    document.title = `${d.name} · House of Flavors`;
    $("#dPhoto").src = HOF.img(d.img, "lg"); $("#dPhoto").alt = d.name;
    $("#dName").textContent = d.name;
    $("#dTags").innerHTML = HOF.tagHTML(d.tags) + (d.tags.includes("signature") ? `<span class="tag" style="color:var(--accent)">${HOF.icon("star")}Signature</span>` : "");
    $("#dPrice").textContent = HOF.money(d.price);
    $("#dRate").innerHTML = `${HOF.icon("star")} ${d.rate}% of ${120 + (d.name.length * 37) % 900} guests liked it`;
    $("#dDesc").textContent = d.desc;
    $("#dCatLink").textContent = cat.name; $("#dCatLink").href = `menu.html#${cat.id}`;
    $("#fStation").textContent = station[d.cat];
    $("#fReady").textContent = ready[d.cat];
    $("#fServes").textContent = d.tags.includes("share") ? "2–4 people" : "1 person";
    qty = 1; syncQty();

    const drink = HOF.menu.filter((x) => x.cat === "drinks")[d.name.length % 16];
    const sameCat = HOF.menu.filter((x) => x.cat === d.cat && x.id !== d.id);
    const other = HOF.menu.filter((x) => x.cat !== d.cat && x.cat !== "drinks" && x.price < 90);
    const pairs = [drink, other[(d.price * 3) % other.length], other[(d.price * 7 + 5) % other.length]].filter(Boolean);
    $("#dPairs").innerHTML = pairs.map((p) => `<a class="pair" href="dish.html#${p.id}"><img src="${HOF.img(p.img)}" alt="" loading="lazy" width="720" height="720"><span>${p.name}<br><b>${HOF.money(p.price)}</b></span></a>`).join("");

    const start = d.name.length % pool.length;
    $("#dReviews").innerHTML = [0, 1, 2].map((k) => {
      const [n, w, t] = pool[(start + k * 2) % pool.length];
      const stars = 5 - ((d.rate < 90 && k === 1) ? 1 : 0);
      return `<div class="review"><div class="stars" aria-label="${stars} out of 5">${HOF.icon("star").repeat(stars)}</div><p>${t}</p><span class="who">${n} · ${w}</span></div>`;
    }).join("");

    $("#moreTitle").textContent = `More from the ${station[d.cat].toLowerCase()}`;
    $("#moreLink").href = `menu.html#${cat.id}`;
    $("#dMore").innerHTML = sameCat.slice(0, 4).map((x) => HOF.dishCard(x)).join("");
    scrollTo({ top: 0, behavior: "instant" });
  }
  function syncQty() {
    $("#qOut").textContent = qty;
    $("#addBtn").textContent = `Add ${qty} to order · ${HOF.money(d.price * qty)}`;
  }
  $("#qMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); syncQty(); });
  $("#qPlus").addEventListener("click", () => { qty = Math.min(20, qty + 1); syncQty(); });
  $("#addBtn").addEventListener("click", () => { HOF.cart.add(d.id, qty); qty = 1; syncQty(); });
  addEventListener("hashchange", load);
  load();
});
