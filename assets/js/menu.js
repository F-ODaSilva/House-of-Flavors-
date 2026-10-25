/* Menu: sections, sticky category nav, search, filters, sort, rotating plate */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$, t } = HOF;
  const sectionsEl = $("#menuSections"), chipsEl = $("#catChips"), search = $("#menuSearch");
  const filters = { spicy: $("#fSpicy"), veg: $("#fVeg"), share: $("#fShare"), cheap: $("#fCheap") };
  const sortSel = $("#sortSel");

  const groups = [
    { id: "signature", name: t("Assinatura", "Signatures"), line: t("Os seis pratos que a chef pediria.", "The six plates the head chef would order."), items: HOF.menu.filter((d) => d.tags.includes("signature")) },
    ...HOF.categories.map((c) => ({ id: c.id, name: HOF.L(c, "name"), line: HOF.L(c, "line"), items: HOF.menu.filter((d) => d.cat === c.id) }))
  ];

  chipsEl.innerHTML = groups.map((g, i) => `<a class="chip${i === 0 ? " is-active" : ""}" href="#${g.id}" data-chip="${g.id}">${g.name} <span class="count num">${g.items.length}</span></a>`).join("");

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function render() {
    const q = norm(search.value.trim());
    const want = Object.entries(filters).filter(([k, el]) => el.checked && k !== "cheap").map(([k]) => k);
    const cheap = filters.cheap.checked;
    const sort = sortSel.value;
    let total = 0;
    sectionsEl.innerHTML = groups.map((g) => {
      let items = g.items.filter((d) =>
        (!q || norm(d.name + " " + d.desc + " " + d.desc_en).includes(q)) &&
        want.every((tg) => d.tags.includes(tg)) &&
        (!cheap || d.price < 80));
      if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
      if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
      if (sort === "rate") items = [...items].sort((a, b) => b.rate - a.rate);
      total += items.length;
      if (!items.length) return "";
      return `<section class="menu-section" id="${g.id}" aria-labelledby="h-${g.id}">
        <div class="menu-section-head"><h2 id="h-${g.id}">${g.name}</h2><p>${g.line} · ${items.length} ${items.length === 1 ? t("prato", "dish") : t("pratos", "dishes")}</p></div>
        <div class="dishes">${items.map((d) => HOF.dishCard(d)).join("")}</div>
      </section>`;
    }).join("");
    $("#noResults").hidden = total > 0;
    observe();
  }

  /* active chip follows scroll */
  let io;
  function observe() {
    io?.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".chip", chipsEl).forEach((c) => c.classList.toggle("is-active", c.dataset.chip === e.target.id));
        const active = $(`.chip[data-chip="${e.target.id}"]`, chipsEl);
        active && chipsEl.scrollTo({ left: active.offsetLeft - 24, behavior: "smooth" });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    $$(".menu-section").forEach((s) => io.observe(s));
  }

  let timer;
  search.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(render, 120); });
  Object.values(filters).forEach((el) => el.addEventListener("change", render));
  sortSel.addEventListener("change", render);
  $("#clearFilters").addEventListener("click", () => { search.value = ""; Object.values(filters).forEach((el) => (el.checked = false)); sortSel.value = "menu"; render(); });
  render();
  if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 80);

  /* rotating plate in the hero */
  const plates = [
    { img: "burguernobg-1", id: "texas-double-decker" },
    { img: "noodlesnobg", id: "pork-kyoto-ramen" }
  ];
  const img = $("#plateImg"), label = $("#plateLabel");
  let i = 0;
  if (!HOF.reduceMotion) setInterval(() => {
    i = (i + 1) % plates.length;
    const p = plates[i], d = HOF.dish(p.id);
    img.classList.add("out");
    setTimeout(() => {
      img.src = HOF.img(p.img, "lg"); img.alt = d.name;
      label.textContent = `${d.name} · ${HOF.money(d.price)}`; label.href = `dish.html#${d.id}`;
      img.classList.remove("out");
    }, 550);
  }, 4200);
});
