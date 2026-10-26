(() => {
  const WORKS = window.WORKS;
  const CATS = window.CATEGORIES;
  const catLabel = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
  const videoSrc = (w) => `assets/video/${w.id}.mp4`;
  const posterSrc = (w) => `assets/img/posters/${w.id}.webp`;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Hero: tres reels destacados ----------
  const heroIds = ["reel-urbano-hermanas", "reel-decisiones-dificiles", "reel-moto-benelli"];
  const heroPhones = document.getElementById("heroPhones");
  heroIds.forEach((id) => {
    const w = WORKS.find((x) => x.id === id);
    const el = document.createElement("div");
    el.className = "phone";
    el.innerHTML = `<video muted loop playsinline ${reducedMotion ? "" : "autoplay"} preload="metadata" poster="${posterSrc(w)}" src="${videoSrc(w)}"></video>`;
    el.addEventListener("click", () => openLightbox(WORKS.indexOf(w), WORKS));
    heroPhones.appendChild(el);
  });

  // ---------- Marquee ----------
  const marquee = document.getElementById("marquee");
  const words = ["Moda", "Gastronomía", "Autos & motos", "Deco", "Salud", "Eventos", "Alimentación natural", "Música en vivo", "Retail"];
  marquee.innerHTML = [...words, ...words].map((t) => `<span>${t}</span>`).join("");

  // ---------- Clientes ----------
  document.getElementById("clients").innerHTML = window.CLIENTS.map(
    (c) => `<li><a href="https://www.instagram.com/${c.handle}/" target="_blank" rel="noopener"><strong>${c.name}</strong><span>@${c.handle}</span></a></li>`
  ).join("");

  // ---------- Filtros + grilla ----------
  const filtersEl = document.getElementById("filters");
  const grid = document.getElementById("grid");
  let current = "all";
  let visible = [];

  const counts = WORKS.reduce((acc, w) => ((acc[w.cat] = (acc[w.cat] || 0) + 1), acc), {});
  const filterDefs = [{ id: "featured", label: "Destacados" }, { id: "all", label: "Todos", n: WORKS.length }, ...CATS.map((c) => ({ ...c, n: counts[c.id] }))];
  filtersEl.innerHTML = filterDefs
    .map((f) => `<button class="filter" role="tab" data-f="${f.id}" aria-selected="${f.id === current}">${f.label}${f.n ? `<sup>${f.n}</sup>` : ""}</button>`)
    .join("");
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    current = b.dataset.f;
    filtersEl.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-selected", x === b));
    render();
  });

  function render() {
    visible =
      current === "all" ? orderAll() : current === "featured" ? WORKS.filter((w) => w.featured) : WORKS.filter((w) => w.cat === current);
    grid.innerHTML = "";
    visible.forEach((w, i) => {
      const t = document.createElement("button");
      t.className = `tile${w.format === "h" ? " tile--h" : ""}${w.format === "wide" ? " tile--wide" : ""}`;
      t.style.animationDelay = `${Math.min(i, 12) * 45}ms`;
      t.setAttribute("aria-label", `Ver ${w.title}${w.client ? " para " + w.client : ""}`);
      t.innerHTML = `
        <img src="${posterSrc(w)}" alt="" loading="lazy" decoding="async">
        <span class="tile__play" aria-hidden="true">▶</span>
        <span class="tile__info">
          <span class="tile__cat">${catLabel[w.cat]}</span>
          <span class="tile__title">${w.title}</span>
          ${w.client ? `<span class="tile__client">${w.client}</span>` : ""}
        </span>`;
      t.addEventListener("click", () => openLightbox(i, visible));
      if (canHover) attachHoverPreview(t, w);
      grid.appendChild(t);
    });
  }

  // En "Todos": primero lo destacado, después intercalando rubros para que la grilla se vea variada.
  function orderAll() {
    const feat = WORKS.filter((w) => w.featured);
    const rest = WORKS.filter((w) => !w.featured);
    const byCat = CATS.map((c) => rest.filter((w) => w.cat === c.id));
    const mixed = [];
    while (byCat.some((a) => a.length)) byCat.forEach((a) => a.length && mixed.push(a.shift()));
    return [...feat, ...mixed];
  }

  function attachHoverPreview(tile, w) {
    let v;
    let timer;
    tile.addEventListener("mouseenter", () => {
      timer = setTimeout(() => {
        if (!v) {
          v = document.createElement("video");
          v.muted = true;
          v.loop = true;
          v.playsInline = true;
          v.preload = "auto";
          v.src = videoSrc(w);
          tile.insertBefore(v, tile.children[1]);
        }
        v.play().then(() => tile.classList.add("is-playing")).catch(() => {});
      }, 180);
    });
    tile.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      tile.classList.remove("is-playing");
      if (v) v.pause();
    });
  }

  render();

  // ---------- Lightbox ----------
  const lb = document.getElementById("lightbox");
  const lbVideo = document.getElementById("lbVideo");
  const lbCaption = document.getElementById("lbCaption");
  let lbList = [];
  let lbIndex = 0;
  let lastFocus = null;

  function openLightbox(i, list) {
    lbList = list;
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    document.getElementById("lbClose").focus();
  }
  function show(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    const w = lbList[lbIndex];
    lbVideo.poster = posterSrc(w);
    lbVideo.src = videoSrc(w);
    lbVideo.muted = false;
    lbVideo.play().catch(() => {});
    lbCaption.innerHTML = `<strong>${w.title}</strong><span>${[w.client, catLabel[w.cat], ...(w.tags || [])].filter(Boolean).join(" · ")}</span>`;
  }
  function close() {
    lbVideo.pause();
    lbVideo.removeAttribute("src");
    lbVideo.load();
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", () => show(lbIndex - 1));
  document.getElementById("lbNext").addEventListener("click", () => show(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(lbIndex + 1);
    if (e.key === "ArrowLeft") show(lbIndex - 1);
  });
  // swipe en mobile
  let x0 = null;
  lb.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) show(lbIndex + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // ---------- Video del bento: se carga y reproduce sólo cuando está a la vista ----------
  const lazyVideos = document.querySelectorAll("video[data-src]");
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        if (!reducedMotion) v.play().catch(() => {});
      } else v.pause();
    });
  }, { threshold: 0.25 });
  lazyVideos.forEach((v) => vio.observe(v));

  // Pausar los teléfonos del hero cuando salen de pantalla
  const hio = new IntersectionObserver(([en]) => {
    heroPhones.querySelectorAll("video").forEach((v) => (en.isIntersecting && !reducedMotion ? v.play().catch(() => {}) : v.pause()));
  });
  hio.observe(heroPhones);

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".section-head, .stat, .card, .bento__item, .timeline li, .clients, .contact > *");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const rio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        rio.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => rio.observe(el));

  // ---------- Nav: se esconde al bajar, aparece al subir ----------
  const nav = document.getElementById("nav");
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("is-hidden", y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
})();
