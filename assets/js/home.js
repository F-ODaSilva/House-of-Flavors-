/* Home: hero video, story chapters, horizontal kitchens, signature hover, coupon */
document.addEventListener("DOMContentLoaded", () => {
  const { $, $$, t } = HOF;

  /* hero video toggle (respects reduced motion) */
  const video = $(".hero-video"), vbtn = $(".video-toggle");
  const setVideo = (play) => {
    play ? video.play().catch(() => {}) : video.pause();
    vbtn.innerHTML = HOF.icon(play ? "pause" : "play");
    vbtn.setAttribute("aria-label", play ? t("Pausar o vídeo de fundo", "Pause background video") : t("Reproduzir o vídeo de fundo", "Play background video"));
  };
  if (HOF.reduceMotion) setVideo(false);
  vbtn.addEventListener("click", () => setVideo(video.paused));

  /* story: chapter state */
  const story = $(".story");
  const steps = $$(".story-steps li", story);
  story.addEventListener("step", (e) => steps.forEach((li, i) => li.classList.toggle("is-on", i <= e.detail)));

  /* kitchens track */
  const track = $("#serveTrack");
  track.innerHTML = HOF.categories.map((c, i) => {
    const n = HOF.menu.filter((d) => d.cat === c.id).length;
    return `<a class="kitchen" href="menu.html#${c.id}">
      <img src="${HOF.img(c.img)}" alt="" loading="lazy" width="720" height="900">
      <span class="k-n num">${String(i + 1).padStart(2, "0")} / ${HOF.categories.length}</span>
      <span class="k-body"><span class="k-name">${HOF.L(c, "name")}</span><span class="k-line">${HOF.L(c, "line")}</span><span class="k-count">${n} ${t("pratos", "dishes")}</span></span>
    </a>`;
  }).join("");
  const serve = $(".serve");
  const sizeServe = () => {
    if (innerWidth < 760 || HOF.reduceMotion) { serve.style.height = ""; serve.classList.add("static"); return; }
    serve.classList.remove("static");
    const extra = track.scrollWidth - innerWidth;
    serve.style.setProperty("--shift", Math.max(0, extra) + "px");
    serve.style.height = innerHeight + Math.max(0, extra) + "px";
  };
  sizeServe(); addEventListener("resize", sizeServe);

  /* dish count */
  const dc = $("#dishCount"); if (dc) dc.textContent = t(`Ver os ${HOF.menu.length} pratos`, `See all ${HOF.menu.length} dishes`);

  /* signature list with hover image */
  const sig = HOF.menu.filter((d) => d.tags.includes("signature"));
  $("#sigList").innerHTML = sig.map((d) => `<li>
    <a href="dish.html#${d.id}" data-img="${HOF.img(d.img)}">
      <img class="sig-thumb" src="${HOF.img(d.img)}" alt="" loading="lazy" width="720" height="900">
      <span class="sig-main">
        <span class="leader"><span class="name">${d.name}</span><span class="dots"></span><span class="price">${HOF.money(d.price)}</span></span>
        <span class="sig-desc">${HOF.L(d, "desc")}</span>
      </span>
    </a>
    <button class="btn small dark" data-add="${d.id}">${t("Adicionar", "Add")}</button>
  </li>`).join("");
  const float = $(".sig-float"), fimg = $("img", float);
  if (matchMedia("(hover: hover)").matches && !HOF.reduceMotion) {
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const loop = () => { x += (tx - x) * 0.16; y += (ty - y) * 0.16; float.style.transform = `translate(${x}px, ${y}px) rotate(${(tx - x) * 0.03}deg)`; raf = requestAnimationFrame(loop); };
    $$("#sigList a").forEach((a) => {
      a.addEventListener("mouseenter", () => { fimg.src = a.dataset.img; float.classList.add("show"); cancelAnimationFrame(raf); loop(); });
      a.addEventListener("mouseleave", () => { float.classList.remove("show"); setTimeout(() => cancelAnimationFrame(raf), 300); });
      a.addEventListener("mousemove", (e) => { tx = e.clientX + 24; ty = e.clientY - 120; });
    });
  }

  /* quotes */
  $("#quotes").innerHTML = HOF.reviews.map((r) => `<figure class="quote">
    <blockquote>${HOF.L(r, "text")}</blockquote>
    <figcaption><img src="${HOF.img(r.img)}" alt="" loading="lazy" width="72" height="72"><span><b>${r.name}</b>${HOF.L(r, "where")}</span></figcaption>
  </figure>`).join("");

  /* coupon copy */
  $("#copyCode").addEventListener("click", async (e) => {
    const code = $("#couponCode").textContent;
    try { await navigator.clipboard.writeText(code); e.target.textContent = t("Copiado", "Copied"); }
    catch { const r = document.createRange(); r.selectNodeContents($("#couponCode")); getSelection().removeAllRanges(); getSelection().addRange(r); e.target.textContent = t("Seleccionado, prima Ctrl+C", "Selected, press Ctrl+C"); }
    setTimeout(() => (e.target.textContent = t("Copiar código", "Copy code")), 2400);
  });
});
