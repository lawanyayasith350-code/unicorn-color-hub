(() => {
  // How many pages you have in each category now
  const MAX = { cute: 20, princess: 20, baby: 20 };

  const grid = document.getElementById("moreLikeGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const currentSlug = params.get("slug") || "";

  // Detect category from slug
  const getCategory = (slug) => {
    if (slug.startsWith("cute-unicorn-")) return "cute";
    if (slug.startsWith("princess-unicorn-")) return "princess";
    if (slug.startsWith("baby-unicorn-")) return "baby";
    return "cute";
  };

  const category = getCategory(currentSlug);

  const pad3 = (n) => String(n).padStart(3, "0");

  const label = (cat) =>
    cat === "cute" ? "Cute" : cat === "princess" ? "Princess" : "Baby";

  const titleText = (cat, n) => `${label(cat)} #${pad3(n)}`;
  const slugFrom = (cat, n) => `${cat}-unicorn-${pad3(n)}`;

  const currentNum = (() => {
    const m = currentSlug.match(/-(\d{3})$/);
    return m ? parseInt(m[1], 10) : null;
  })();

  // Candidate numbers
  const candidates = [];
  for (let i = 1; i <= (MAX[category] || 1); i++) {
    if (currentNum !== null && i === currentNum) continue;
    candidates.push(i);
  }

  // Shuffle
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  // Pick 4 random
  const pick = candidates.slice(0, 4);

  // Render cards
  grid.innerHTML = pick
    .map((n) => {
      const slug = slugFrom(category, n);
      const t = titleText(category, n);
      const titleParam = encodeURIComponent(t);
      const imgSrc = `assets/pages/${slug}.png`;

      return `
        <a class="thumb" href="page.html?slug=${slug}&title=${titleParam}">
          <div class="thumb-img">
            <img src="${imgSrc}" alt="${t} thumbnail"
                 onerror="this.style.display='none'; this.parentElement.classList.add('placeholder');">
          </div>
          <div class="thumb-meta"><strong>${t}</strong><small>Easy</small></div>
        </a>
      `;
    })
    .join("");
})();
