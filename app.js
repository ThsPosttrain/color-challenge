(function () {
  const data = window.COLOR_CHALLENGE_DATA;
  if (!data) return;

  const placeholderSvgs = {
    black: "#171717", white: "#f7f4ed", red: "#f04e3e", green: "#35a66f", blue: "#3d73e8", yellow: "#f7c843"
  };

  function placeholder(colorId, index) {
    const bg = placeholderSvgs[colorId] || "#f2efe7";
    const fg = ["black", "blue", "green"].includes(colorId) ? "#ffffff" : "#171717";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 700'><rect width='900' height='700' fill='${bg}'/><circle cx='710' cy='120' r='170' fill='rgba(255,255,255,.16)'/><circle cx='150' cy='610' r='230' fill='rgba(0,0,0,.08)'/><text x='70' y='165' font-family='Arial, sans-serif' font-size='44' font-weight='700' fill='${fg}'>PHOTO ${index}</text><text x='70' y='225' font-family='Arial, sans-serif' font-size='24' fill='${fg}' opacity='.78'>待上传照片</text></svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function imagePath(filename) {
    if (!filename) return "";
    const relativePath = filename.includes("/") ? filename : `data/${filename}`;
    return encodeURI(relativePath);
  }

  function renderPalette() {
    const root = document.querySelector("#palette-grid");
    if (!root) return;
    root.innerHTML = data.pairs.map((pair, index) => `
      <a class="palette-card palette-card-${index + 1}" href="challenge.html?pair=${pair.id}" style="--left:${pair.left.hex};--right:${pair.right.hex}">
        <span class="palette-card-top"><span>0${index + 1}</span><span>OPEN DUO ↗</span></span>
        <span class="palette-swatch"><i></i><i></i></span>
        <span class="palette-card-bottom"><strong>${pair.left.name} <b>/</b> ${pair.right.name}</strong><small>COLOR CHALLENGE</small></span>
      </a>
    `).join("");
  }

  function renderChallenge() {
    const root = document.querySelector("#challenge-root");
    if (!root) return;
    const id = new URLSearchParams(window.location.search).get("pair") || data.pairs[0].id;
    const pair = data.pairs.find((item) => item.id === id) || data.pairs[0];
    document.title = `${pair.left.name} / ${pair.right.name} · 颜色挑战`;

    root.innerHTML = `
      <section class="challenge-heading">
        <div><p class="eyebrow">COLOR DUO / ${pair.id.toUpperCase()}</p><h1>${pair.left.name} <span>/</span> ${pair.right.name}</h1></div>
        <p class="challenge-description">在办公室里，分别寻找属于${pair.left.name}色和${pair.right.name}色的 9 个瞬间。</p>
      </section>
      <section class="duo-wall" style="--left:${pair.left.hex};--right:${pair.right.hex}">
        ${renderColorWall(pair.left, 0)}
        ${renderColorWall(pair.right, 1)}
      </section>
    `;
    document.querySelectorAll(".photo-tile").forEach((tile) => tile.addEventListener("click", () => openLightbox(tile)));
  }

  function renderColorWall(color, side) {
    const images = data.images[color.id] || [];
    const photographers = data.photographers?.[color.id] || [];
    const credit = photographers.length ? `照片主要由 ${photographers.join(" 和 ")} 拍摄。` : "照片拍摄者待补充。";
    const tiles = Array.from({ length: 9 }, (_, index) => {
      const filename = images[index];
      const src = filename ? imagePath(filename) : placeholder(color.id, index + 1);
      return `<button class="photo-tile" type="button" data-src="${src}" data-alt="${color.name}色照片 ${index + 1}" style="--delay:${index * 35}ms"><span class="photo-index">${String(index + 1).padStart(2, "0")}</span><img src="${src}" alt="${color.name}色照片 ${index + 1}" loading="lazy" /><span class="photo-overlay">查看大图 ↗</span></button>`;
    }).join("");
    return `<article class="color-wall color-wall-${side === 0 ? "left" : "right"}" style="--accent:${color.hex}"><header class="color-wall-heading"><div class="color-title"><span class="color-dot"></span><h2>${color.name}</h2></div><span>09 PHOTOS</span></header><p class="color-credit">${credit}</p><div class="photo-grid">${tiles}</div></article>`;
  }

  function openLightbox(tile) {
    const lightbox = document.querySelector("#lightbox");
    const image = document.querySelector("#lightbox-image");
    const caption = document.querySelector("#lightbox-caption");
    image.src = tile.dataset.src;
    image.alt = tile.dataset.alt;
    caption.textContent = tile.dataset.alt;
    lightbox.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    const lightbox = document.querySelector("#lightbox");
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("modal-open");
  }

  renderPalette();
  renderChallenge();
  document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  document.querySelector("#lightbox")?.addEventListener("click", (event) => { if (event.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });
})();
